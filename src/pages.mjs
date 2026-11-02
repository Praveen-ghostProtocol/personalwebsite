import { profile, lifeCopy, lifeMedia, experience } from "./content.mjs";
import { escapeHtml as e, forPublication } from "./content-policy.mjs";
import {
  link,
  mediaSlot,
  projectRow,
  achievementEntry,
  artifactLink,
} from "./components.mjs";

export { home } from "./home.mjs";

/** @param {import('./types.js').Project[]} projects */
export function work(projects) {
  const startups = projects.filter((p) => p.category === "Startup");
  const personal = projects.filter((p) => p.category === "Side project");
  const supporting = projects.filter(
    (p) => !["Startup", "Side project"].includes(p.category),
  );
  return /* HTML */ `<header class="page-intro">
      <p class="small">Work / the things taking shape</p>
      <h1>From noticing<br /><em>to making.</em></h1>
      <p>
        Optimus is the company I’m building with my co-founders. Weave and
        BookHop are side projects I explore alongside it.
      </p>
    </header>
    <section class="work-startup" aria-labelledby="startup-title">
      <p class="small">Entrepreneurship · Funded startup</p>
      <h2 id="startup-title">The company I’m building.</h2>
      ${startups.map(projectRow).join("")}
    </section>
    <section class="work-side-projects" aria-labelledby="products-title">
      <h2 id="products-title" class="index-heading">Side projects</h2>
      <div class="project-index">${personal.map(projectRow).join("")}</div>
    </section>
    ${supporting.length ? `<section class="supporting-work"><h2>In other teams & contexts.</h2><p class="measure">Work from internships, competitions and engineering projects.</p>${supporting.map((p) => `<article><span class="small">${e(p.category)} · ${e(p.stage)}</span><h3>${link(`/work/${p.slug}/`, p.title)}</h3><p>${e(p.summary)}</p></article>`).join("")}</section>` : ""}`;
}

/** @param {boolean} draft */
export function professionalExperience(draft) {
  return `<header class="page-intro"><p class="small">Professional experience</p><h1>Inside<br><em>other teams.</em></h1><p>Founder’s office, engineering and consulting work. Each role brought a different way to understand a problem and move it forward.</p></header><section class="experience-list" aria-label="Roles">${forPublication(
    experience,
    draft,
  )
    .map(
      (role) =>
        `<article data-reveal><p class="small">${e(role.period)}${role.incoming ? " · Incoming" : ""}</p><div><h2>${e(role.company)}</h2><h3>${e(role.role)}</h3><p>${e(role.summary)}</p></div></article>`,
    )
    .join("")}</section>`;
}

/** @param {import('./types.js').Project} project @param {boolean} draft @param {import('./types.js').Project[]} all */
export function projectPage(project, draft, all) {
  const next =
    all[(all.findIndex((p) => p.slug === project.slug) + 1) % all.length];
  return /* HTML */ `<div class="breadcrumbs">
      ${link("/work/", "Work")}<span aria-hidden="true">/</span
      ><span>${e(project.title)}</span>
    </div>
    <header class="case-intro">
      <div class="case-label">
        <span>${e(project.category)}</span
        >${project.funding ? `<span>${e(project.funding)}</span>` : ""}<span
          >${e(project.stage)}</span
        >
      </div>
      <h1>${e(project.title)}<span aria-hidden="true">.</span></h1>
      <p class="case-summary">${e(project.summary)}</p>
      ${project.collaborators || project.dates ? `<dl class="case-facts">${project.collaborators ? `<div><dt>With</dt><dd>${e(project.collaborators)}</dd></div>` : ""}${project.dates ? `<div><dt>Dates</dt><dd>${e(project.dates)}</dd></div>` : ""}</dl>` : ""}
    </header>
    <div class="case-body">
      <aside class="case-contents">
        <p class="small">In this story</p>
        <nav aria-label="Case study sections">
          ${project.body.map((s, i) => `<a href="#section-${i + 1}">${e(s.title)}</a>`).join("")}
        </nav>
      </aside>
      <div class="case-prose">
        ${project.body.map((s, i) => `<section id="section-${i + 1}"><h2>${e(s.title)}</h2>${s.paragraphs.map((p) => `<p>${e(p)}</p>`).join("")}${i === 0 && project.media[0] ? mediaSlot(project.media[0], draft) : ""}</section>`).join("")}${
          project.media.slice(1).length
            ? `<section class="case-media"><h2>Artefacts</h2>${project.media
                .slice(1)
                .map((m) => mediaSlot(m, draft))
                .join("")}</section>`
            : ""
        }${project.links.length ? `<section><h2>Explore the work</h2>${project.links.map(artifactLink).join("")}</section>` : ""}
      </div>
    </div>
    <div class="next-project">
      <p class="small">Another project</p>
      <h2>${link(`/work/${next.slug}/`, next.title)}</h2>
    </div>`;
}

/** @param {import('./types.js').Achievement[]} achievements @param {boolean} draft */
export function accomplishments(achievements, draft) {
  return /* HTML */ `<header class="page-intro">
      <p class="small">Accomplishments / shared work, personal effort</p>
      <h1>In good<br /><em>company.</em></h1>
      <p>
        Case competitions, hackathons and cricket: work I’ve done with teams and
        on the field.
      </p>
      <nav class="anchor-nav" aria-label="Accomplishment categories">
        <a href="#co-curricular">Co-curricular ↓</a
        ><a href="#sports">Cricket ↓</a>
      </nav>
    </header>
    ${["Co-curricular", "Cricket"]
      .map((category, i) => {
        const items = achievements.filter((a) => a.category === category);
        return /* HTML */ `<section
          id="${i === 0 ? "co-curricular" : "sports"}"
          class="achievement-section"
        >
          <div class="section-title">
            <h2>${category}</h2>
            <span class="small"
              >${i === 0 ? "Cases & prototypes" : "Team & individual results"}</span
            >
          </div>
          ${items.length ? items.map((a) => achievementEntry(a, draft)).join("") : `<p class="measure">${i === 0 ? "I take part in case competitions and hackathons, working on product and business problems with teams." : "Cricket is a big part of my life, alongside the products I’m building."}</p>`}${category === "Cricket" && (draft || lifeMedia[1].publication === "approved") ? mediaSlot(lifeMedia[1], draft) : ""}
        </section>`;
      })
      .join("")}`;
}

/** @param {boolean} draft */
export function about(draft) {
  const portrait = mediaSlot(profile.portrait, draft);
  return /* HTML */ `<header class="page-intro">
      <p class="small">About / the person around the projects</p>
      <h1>More than<br /><em>the work.</em></h1>
    </header>
    <section class="about-story${portrait ? "" : " about-text-only"}">
      ${
        portrait
          ? `<div class="about-photo">
        ${portrait}
        <p class="small">Student. Builder. Cricketer.</p>
      </div>`
          : ""
      }
      <div class="about-prose">
        <h2>A little about me.</h2>
        ${profile.story.map((p) => `<p>${e(p)}</p>`).join("")}
        <p>
          I study Engineering Design and Data Science at IIT Madras. My
          interests include startup product management, founder’s office and
          growth work.
        </p>
        ${link("/work/", "What I’m building now")}
        ${link("/experience/", "Professional experience")}
      </div>
    </section>
    <section id="life" class="life-story">
      <div class="section-title">
        <h2>Life, so far.</h2>
        <span class="small">Beyond the project page</span>
      </div>
      <p class="life-statement">
        Cricket is a big part<br />of my life <em>too.</em>
      </p>
      <p class="measure">${e(lifeCopy)}</p>
      ${draft || lifeMedia[0].publication === "approved" ? mediaSlot(lifeMedia[0], draft) : ""}${link("/accomplishments/#sports", "Cricket & team results")}
    </section>
    <section id="resume" class="resume-section">
      <h2>Professional context.</h2>
      <p class="measure">
        Engineering, data science, startup work and team responsibilities are
        parts of the same ongoing story.
      </p>
      ${profile.resume && (draft || profile.resume.publication === "approved") ? artifactLink(profile.resume) : ""}
      <div class="profile-links">
        ${link(profile.linkedin, "LinkedIn")}${link(profile.github, "GitHub")}${link(`mailto:${profile.email}`, "Email me")}
      </div>
    </section>`;
}
