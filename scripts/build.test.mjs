import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { build } from "./build.mjs";
import { mediaSlot, artifactLink } from "../src/components.mjs";
import { profile, projects, achievements } from "../src/content.mjs";

/** @param {string} directory @returns {Promise<string[]>} */
async function filesWithin(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? filesWithin(path.join(directory, entry.name))
        : [path.join(directory, entry.name)],
    ),
  );
  return nested.flat();
}

test("release output retains achievements and omits private routes, placeholders and verification notes", async () => {
  const { output, routes } = await build(false);
  assert.equal(routes.length, 12);
  assert(!routes.includes("/review/"));
  assert(routes.includes("/work/effivity-ai/"));
  assert.equal(achievements.length, 13);
  const accomplishmentHtml = await readFile(
    path.join(output, "accomplishments/index.html"),
    "utf8",
  );
  for (const value of [
    "State level cricketer",
    "Bangalore Zone",
    "Team gold",
    "The Great Bengaluru Hackathon",
    "National semifinalist",
  ])
    assert(accomplishmentHtml.includes(value));
  assert(
    accomplishmentHtml.indexOf('id="bangalore-zone"') <
      accomplishmentHtml.indexOf('id="inter-iit"'),
  );
  assert.match(
    await readFile(path.join(output, "robots.txt"), "utf8"),
    /Allow: \//,
  );
  const files = await filesWithin(output);
  assert(
    files.every(
      (f) =>
        !f.includes(".private") &&
        !f.endsWith(".mjs") &&
        !f.endsWith(".map") &&
        !f.endsWith(".json") &&
        !f.endsWith(".pdf"),
    ),
  );
  for (const file of files.filter((f) => f.endsWith(".html"))) {
    const html = await readFile(file, "utf8");
    assert.doesNotMatch(
      html,
      /data-slot=|asset-slot|review desk|review entry|to confirm|confirmed|to be checked|under review|last reviewed|my role|asset to be supplied|\[mcp_servers|api.key/i,
      file,
    );
    assert.deepEqual(
      [...html.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/g)].map((m) => m[0]),
      ['<script type="module" src="/assets/motion.js"></script>'],
    );
    assert.match(
      html,
      /<meta\s+name="robots"\s+content="(?:index,follow|noindex,nofollow)"\s*\/?>/,
    );
    assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
    for (const [, attribute, url] of html.matchAll(/\b(href|src)="([^"]+)"/g)) {
      if (!url.startsWith("/") && !url.startsWith("#")) continue;
      const [pathname, fragment] = url.split("#");
      let target = pathname ? path.join(output, pathname) : file;
      const info = await stat(target);
      if (info.isDirectory()) target = path.join(target, "index.html");
      const bytes = await readFile(target);
      if (fragment)
        assert(
          bytes.toString().includes(`id="${fragment}"`),
          `${file}: unresolved #${fragment}`,
        );
      if (attribute === "src") assert(bytes.length > 0);
    }
  }
});

test("missing and uncleared media never become broken public images", () => {
  const missing = {
    slot: "missing-test",
    src: "/assets/does-not-exist.webp",
    alt: "Example",
    caption: "Only a slot",
    width: 1600,
    height: 1000,
    publication: /** @type {const} */ ("approved"),
  };
  assert.equal(mediaSlot(missing, false), "");
  assert.match(mediaSlot(missing, true), /Asset to be supplied/);
  assert.doesNotMatch(mediaSlot(missing, true), /<img/);
  assert.equal(
    mediaSlot(
      {
        ...missing,
        src: "/assets/portrait-primary.webp",
        publication: "draft",
      },
      false,
    ),
    "",
  );
});

test("PDF links carry a descriptive fallback label, type and known size", () => {
  const html = artifactLink({
    label: "Read the competition submission",
    href: "/assets/approved-submission.pdf",
    publication: "approved",
    type: "PDF",
    bytes: 1572864,
  });
  assert.match(html, /Read the competition submission \(PDF, 1.5 MB\)/);
  assert.match(html, /href="\/assets\/approved-submission.pdf"/);
});

test("uncleared portrait bytes are excluded as well as their markup", async () => {
  const state = profile.portrait.publication;
  try {
    profile.portrait.publication = "draft";
    const { output } = await build(false);
    await assert.rejects(
      stat(path.join(output, "assets/portrait-primary.webp")),
      { code: "ENOENT" },
    );
    assert.doesNotMatch(
      await readFile(path.join(output, "index.html"), "utf8"),
      /portrait-primary\.webp/,
    );
  } finally {
    profile.portrait.publication = state;
    await build(false);
  }
});

test("private draft records are excluded even when adjacent to public content", async () => {
  const canary = {
    ...projects[0],
    slug: "private-canary",
    title: "PRIVATE_CANARY_TITLE",
    summary: "PRIVATE_CANARY_SUMMARY",
    publication: /** @type {const} */ ("draft"),
  };
  projects.push(canary);
  try {
    const { output, routes } = await build();
    assert(!routes.includes("/work/private-canary/"));
    for (const file of (await filesWithin(output)).filter((f) =>
      f.endsWith(".html"),
    ))
      assert.doesNotMatch(await readFile(file, "utf8"), /PRIVATE_CANARY/);
  } finally {
    projects.pop();
    await build();
  }
});

test("Vercel builds only the release directory with local-script security headers", async () => {
  const config = JSON.parse(
    await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
  );
  assert.equal(config.outputDirectory, "dist");
  assert.equal(config.buildCommand, "npm run build");
  assert.equal(config.trailingSlash, true);
  const csp = config.headers[0].headers.find(
    /** @param {{key:string}} h */ (h) => h.key === "Content-Security-Policy",
  );
  assert.match(csp.value, /script-src 'self'/);
  assert.doesNotMatch(csp.value, /unsafe-inline|unsafe-eval/);
});
