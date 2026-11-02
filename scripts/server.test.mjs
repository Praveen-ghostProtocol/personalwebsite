import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import {
  mkdtemp,
  cp,
  mkdir,
  copyFile,
  readFile,
  writeFile,
  rm,
} from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { setTimeout as delay } from "node:timers/promises";
import { root } from "./build.mjs";

test(
  "preview serves only output, rejects private paths, and rebuilds edited content without stale imports",
  { timeout: 15000 },
  async () => {
    const temporary = await mkdtemp(
      path.join(os.tmpdir(), "praveen-portfolio-test-"),
    );
    await cp(path.join(root, "src"), path.join(temporary, "src"), {
      recursive: true,
    });
    await cp(path.join(root, "assets"), path.join(temporary, "assets"), {
      recursive: true,
    });
    await mkdir(path.join(temporary, "scripts"));
    for (const file of ["build.mjs", "serve.mjs"])
      await copyFile(
        path.join(root, "scripts", file),
        path.join(temporary, "scripts", file),
      );
    const fontFiles = [
      "instrument-serif/LICENSE",
      "dm-sans/LICENSE",
      "instrument-serif/files/instrument-serif-latin-400-normal.woff2",
      "instrument-serif/files/instrument-serif-latin-400-italic.woff2",
      "dm-sans/files/dm-sans-latin-400-normal.woff2",
      "dm-sans/files/dm-sans-latin-500-normal.woff2",
    ];
    for (const file of fontFiles) {
      const target = path.join(temporary, "node_modules/@fontsource", file);
      await mkdir(path.dirname(target), { recursive: true });
      await copyFile(path.join(root, "node_modules/@fontsource", file), target);
    }
    await mkdir(path.join(temporary, ".private"));
    await writeFile(
      path.join(temporary, ".private/review-content.json"),
      JSON.stringify({
        profileNotes: [{ title: "PRIVATE_CANARY", text: "NEVER_SHIP_THIS" }],
      }),
    );
    const child = spawn(
      process.execPath,
      ["scripts/serve.mjs", "--port=4330"],
      { cwd: temporary, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] },
    );
    let logs = "";
    child.stdout.on("data", (chunk) => {
      logs += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      logs += chunk.toString();
    });
    try {
      for (let i = 0; i < 80 && !logs.includes("Local:"); i++) await delay(50);
      assert.match(logs, /Local:/, logs);
      const origin = "http://127.0.0.1:4330";
      for (const route of [
        "/",
        "/work/weave/",
        "/work/bookhop/",
        "/work/optimus/",
        "/accomplishments/",
        "/about/",
        "/experience/",
        "/work/effivity-ai/",
        "/work/namma-yatri/",
        "/work/nykaabridge/",
        "/work/blue-monitor/",
      ]) {
        const response = await fetch(origin + route);
        assert.equal(response.status, 200, route);
        assert.doesNotMatch(
          await response.text(),
          /PRIVATE_CANARY|NEVER_SHIP_THIS|review desk/i,
        );
        assert.equal(response.headers.get("x-robots-tag"), "noindex, nofollow");
      }
      for (const route of [
        "/.private/review-content.json",
        "/src/content.mjs",
        "/review/",
        "/work/private-canary/",
        "/.git/config",
        "/vercel.json",
        "/%2e%2e%2f.private/review-content.json",
        "/assets/absent.pdf",
        "/.backups/before-portrait-hub-2026-11-02/BACKUP-MANIFEST.json",
      ])
        assert.equal((await fetch(origin + route)).status, 404, route);
      assert.equal((await fetch(origin, { method: "POST" })).status, 405);
      const image = await fetch(origin + "/assets/portrait-primary.webp");
      assert.equal(image.status, 200);
      assert.equal(image.headers.get("content-type"), "image/webp");
      const motion = await fetch(origin + "/assets/motion.js");
      assert.equal(motion.status, 200);
      assert.equal(
        motion.headers.get("content-type"),
        "text/javascript; charset=utf-8",
      );
      assert.match(
        motion.headers.get("content-security-policy") ?? "",
        /script-src 'self'/,
      );
      assert.doesNotMatch(
        await motion.text(),
        /PRIVATE_CANARY|NEVER_SHIP_THIS/,
      );
      const contentPath = path.join(temporary, "src/content.mjs");
      await writeFile(
        contentPath,
        (await readFile(contentPath, "utf8")).replace(
          "I notice what could work better.",
          "Fresh edit visible.",
        ),
      );
      let html = "";
      for (let i = 0; i < 80; i++) {
        await delay(50);
        html = await (await fetch(origin)).text();
        if (html.includes("Fresh edit visible.")) break;
      }
      assert.match(
        html,
        /Fresh edit visible\./,
        "Preview reused stale content after a source edit",
      );
    } finally {
      if (child.exitCode === null && child.signalCode === null) {
        const closed = once(child, "exit");
        child.kill();
        await closed;
      }
      if (
        path.dirname(temporary) === os.tmpdir() &&
        path.basename(temporary).startsWith("praveen-portfolio-test-")
      )
        await rm(temporary, { recursive: true, force: true });
    }
  },
);
