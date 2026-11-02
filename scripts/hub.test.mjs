import test from "node:test";
import assert from "node:assert/strict";
import { home } from "../src/home.mjs";
import { projects } from "../src/content.mjs";

test("portrait hub provides six real destinations and leads with the startup", () => {
  const html = home(projects, true);
  assert.equal((html.match(/data-chapter=/g) ?? []).length, 6);
  for (const href of [
    "#entrepreneurship",
    "#side-projects",
    "#experience",
    "/accomplishments/#sports",
    "/accomplishments/#co-curricular",
    "/about/",
  ])
    assert(html.includes(`href="${href}"`));
  assert(
    html.indexOf('id="entrepreneurship"') < html.indexOf('id="side-projects"'),
  );
  assert(
    html.indexOf('id="entrepreneurship"') < html.indexOf('id="experience"') &&
      html.indexOf('id="experience"') < html.indexOf('id="side-projects"'),
  );
  assert.match(
    html,
    /class="hub-incoming small">Incoming Associate Consultant Intern · Bain &amp; Company · 2027/,
  );
  for (const slug of ["great-bengaluru", "stucred", "ceos-summit"])
    assert(html.includes(`href="/accomplishments/#${slug}"`));
  assert.match(html, /Funded startup/);
  assert.match(html, /id="side-projects"/);
  assert.match(html, /portrait-primary.webp/);
});

test("Optimus is a funded startup; Weave and BookHop remain side projects", () => {
  assert.equal(projects.find((p) => p.slug === "optimus")?.category, "Startup");
  assert.equal(
    projects.find((p) => p.slug === "optimus")?.funding,
    "Funded startup",
  );
  assert(
    projects
      .filter((p) => ["weave", "bookhop"].includes(p.slug))
      .every((p) => p.category === "Side project"),
  );
});
