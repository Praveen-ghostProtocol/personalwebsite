import { mkdir, writeFile, copyFile, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { projects, achievements, profile, lifeMedia } from "../src/content.mjs";
import { forPublication } from "../src/content-policy.mjs";
import { page } from "../src/components.mjs";
import * as pages from "../src/pages.mjs";

export const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

/** @param {string} source @param {string} output @param {string} target */
async function copy(source, output, target) {
  await mkdir(path.dirname(path.join(output, target)), { recursive: true });
  await copyFile(source, path.join(output, target));
}

/** @param {boolean} [draft] */
export async function build(draft = false) {
  const output = path.join(root, draft ? "dist-draft" : "dist");
  // Only generated directories immediately below this checkout can be cleared.
  if (
    path.dirname(output) !== root ||
    !["dist", "dist-draft"].includes(path.basename(output))
  )
    throw new Error("Invalid output directory");
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  const visibleProjects = forPublication(projects, draft);
  const visibleAchievements = forPublication(achievements, draft);
  const media = forPublication(
    [
      ...lifeMedia,
      profile.portrait,
      ...visibleProjects.flatMap((p) => p.media),
      ...visibleAchievements.flatMap((a) => a.media),
    ],
    draft,
  );
  const artifacts = forPublication(
    [
      profile.resume,
      ...visibleProjects.flatMap((p) => p.links),
      ...visibleAchievements.map((a) => a.deck),
    ].filter((a) => a !== undefined),
    draft,
  );
  const files = new Set(
    [...media.map((m) => m.src), ...artifacts.map((a) => a.href)]
      .filter((s) => typeof s === "string")
      .filter((s) => s.startsWith("/assets/")),
  );
  for (const file of files) {
    if (!/^\/assets\/[a-zA-Z0-9/_.-]+$/.test(file) || file.includes(".."))
      throw new Error("Invalid asset path");
    const source = path.join(root, file.slice(1));
    try {
      await stat(source);
      await copy(source, output, file.slice(1));
    } catch (error) {
      if (/** @type {NodeJS.ErrnoException} */ (error).code !== "ENOENT")
        throw error;
      // A missing download is a content error, never a broken PDF link.
      if (artifacts.some((a) => a.href === file))
        throw new Error(`Missing approved download: ${file}`, { cause: error });
    }
  }
  await copy(path.join(root, "src/site.css"), output, "assets/site.css");
  for (const name of ["home.css", "motion.css"])
    await copy(path.join(root, "src", name), output, `assets/${name}`);
  await copy(path.join(root, "src/motion.mjs"), output, "assets/motion.js");
  await copy(
    path.join(root, "assets/favicon.svg"),
    output,
    "assets/favicon.svg",
  );
  for (const file of [
    "instrument-serif-latin-400-normal.woff2",
    "instrument-serif-latin-400-italic.woff2",
  ])
    await copy(
      path.join(root, "node_modules/@fontsource/instrument-serif/files", file),
      output,
      `assets/fonts/${file}`,
    );
  for (const weight of [400, 500])
    await copy(
      path.join(
        root,
        `node_modules/@fontsource/dm-sans/files/dm-sans-latin-${weight}-normal.woff2`,
      ),
      output,
      `assets/fonts/dm-sans-latin-${weight}-normal.woff2`,
    );
  for (const family of ["instrument-serif", "dm-sans"])
    await copy(
      path.join(root, "node_modules/@fontsource", family, "LICENSE"),
      output,
      `assets/fonts/${family}-license.txt`,
    );
  /** @type {{path:string,title:string,description:string,body:string}[]} */
  const routes = [
    {
      path: "/",
      title: "Work, life & the things taking shape",
      description:
        "Praveen’s products, projects, competitions and life around cricket.",
      body: pages.home(visibleProjects, draft),
    },
    {
      path: "/work/",
      title: "Work",
      description:
        "Optimus, a funded startup, and side projects Weave and BookHop.",
      body: pages.work(visibleProjects),
    },
    {
      path: "/experience/",
      title: "Professional experience",
      description:
        "Praveen’s experience in founder’s office, engineering and consulting roles.",
      body: pages.professionalExperience(draft),
    },
    {
      path: "/accomplishments/",
      title: "Accomplishments",
      description:
        "Co-curricular work and cricket, with individual and team attribution.",
      body: pages.accomplishments(visibleAchievements, draft),
    },
    {
      path: "/about/",
      title: "About",
      description:
        "Engineering, data science, building products and cricket. A little about Praveen.",
      body: pages.about(draft),
    },
    ...visibleProjects.map((project) => ({
      path: `/work/${project.slug}/`,
      title: project.title,
      description: project.summary,
      body: pages.projectPage(project, draft, visibleProjects),
    })),
  ];
  for (const route of routes) {
    const destination = path.join(output, route.path, "index.html");
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, page({ ...route, draft }));
  }
  await writeFile(
    path.join(output, "404.html"),
    page({
      path: "/404/",
      title: "Page not found",
      description: "This page is not available.",
      draft,
      body: '<section class="not-found"><h1>Not on this page.</h1><p>This page may have moved. You can find my work and story from the homepage.</p><a class="text-link" href="/">Back home ↗</a></section>',
    }),
  );
  await writeFile(
    path.join(output, "robots.txt"),
    draft ? "User-agent: *\nDisallow: /\n" : "User-agent: *\nAllow: /\n",
  );
  console.log(
    `${draft ? "Asset preview" : "Release"} build: ${routes.length} pages → ${output}. Nothing deployed.`,
  );
  return { output, routes: routes.map((r) => r.path) };
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  await build(process.argv.includes("--draft"));
