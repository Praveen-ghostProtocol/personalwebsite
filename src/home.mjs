import {
  profile,
  hubChapters,
  lifeMedia,
  lifeCopy,
  experience,
  achievements,
} from "./content.mjs";
import {
  forPublication,
  escapeHtml as e,
  safeHref,
} from "./content-policy.mjs";
import { link, mediaSlot, projectRow } from "./components.mjs";

/** @param {import('./types.js').Project[]} projects @param {boolean} draft */
export function home(projects, draft) {
  const portrait = mediaSlot(profile.portrait, draft, true);
  const startup = projects.find((p) => p.category === "Startup");
  const sideProjects = projects.filter((p) => p.category === "Side project");
  const roles = forPublication(experience, draft).slice(0, 3);
  const incoming = roles.find((role) => role.incoming);
  const competitionHighlights = forPublication(achievements, draft).filter(
    (item) =>
      item.category === "Co-curricular" &&
      ["great-bengaluru", "stucred", "ceos-summit"].includes(item.slug),
  );
  return /* HTML */ `<section
      class="hub-scene"
      aria-labelledby="hub-name"
      data-hub-scene
    >
      <div class="hub-stage" data-hub-stage>
        <div class="hub-heading">
          <p class="small">Student. Builder. Cricketer.</p>
          <h1 id="hub-name">Praveen <em>Kumar S</em></h1>
        </div>
        <nav class="hub-map" aria-label="Explore my work and life" data-hub-map>
          <svg
            class="hub-connections"
            viewBox="0 0 1040 440"
            aria-hidden="true"
            focusable="false"
            preserveAspectRatio="none"
          >
            <path d="M275 65 C350 65 350 145 425 170" />
            <path d="M765 65 C690 65 690 145 615 170" />
            <path d="M275 220 H425" />
            <path d="M765 220 H615" />
            <path d="M275 375 C350 375 350 295 425 270" />
            <path d="M765 375 C690 375 690 295 615 270" />
          </svg>
          <div class="hub-portrait">
            <div class="portrait-frame">
              ${portrait || '<div class="portrait-monogram" aria-label="Praveen Kumar S">PK</div>'}
            </div>
            <p class="hub-focus" data-hub-focus aria-hidden="true">
              Work & life
            </p>
          </div>
          ${hubChapters.map((chapter, i) => `<a class="hub-chapter hub-${chapter.position}" data-chapter="${chapter.key}" href="${e(safeHref(chapter.href))}"><span class="chapter-kicker"><span>0${i + 1}</span><span class="chapter-arrow" aria-hidden="true">↗</span></span><span class="chapter-title">${e(chapter.label)}</span><span class="chapter-detail">${e(chapter.detail)}</span></a>`).join("")}
        </nav>
        <p class="hub-thought">${e(profile.headline)}</p>
        <p class="hub-context small">
          Engineering Design & Data Science · IIT Madras
        </p>
        ${incoming ? `<p class="hub-incoming small">${e(incoming.role)} · ${e(incoming.company)} · ${e(incoming.period)}</p>` : ""}
        <p class="hub-scroll small">
          Scroll to explore <span aria-hidden="true">↓</span>
        </p>
      </div>
    </section>
    ${startup ? `<section id="entrepreneurship" class="startup-chapter" tabindex="-1" data-reveal><div class="chapter-margin"><span>01 / Entrepreneurship</span><span>${e(startup.funding ?? "Startup")}</span></div><div class="startup-story"><p class="startup-intro">The company I’m building.</p><h2>${e(startup.title)}<span aria-hidden="true">.</span></h2><p class="startup-lead">Investing education,<br><em>learned through practice.</em></p><p class="startup-description">A gamified investing-education startup I’m building with my co-founders. We’re using virtual money to help people practise, and conversations with potential users to decide what to build.</p><div class="startup-context"><span>Co-founder</span><span>Funded startup</span><span>Product development & validation</span></div>${link("/work/optimus/", "Inside Optimus")}</div><aside class="startup-note"><span class="note-line" aria-hidden="true"></span><p class="waitlist-number">~100</p><p>waitlist responses</p><p class="small">An early signal of interest. We’re still validating the idea, not claiming active-user traction or proven learning outcomes.</p></aside></section>` : ""}
    <section
      id="experience"
      class="experience-chapter"
      tabindex="-1"
      data-reveal
    >
      <div class="section-title">
        <h2>Inside other teams.</h2>
        <span class="small">02 / Professional experience</span>
      </div>
      <p class="chapter-description">
        Founder’s office, product work and engineering.
      </p>
      <div class="experience-preview">
        ${roles.map((role) => `<article><span class="small">${e(role.period)}${role.incoming ? " · Incoming" : ""}</span><h3>${e(role.company)}</h3><p>${e(role.role)}</p></article>`).join("")}
      </div>
      ${link("/experience/", "My professional experience")}
    </section>
    <section
      id="side-projects"
      class="side-projects-chapter"
      tabindex="-1"
      data-reveal
    >
      <div class="section-title">
        <h2>Built on the side.</h2>
        <span class="small">03 / Side projects</span>
      </div>
      <p class="chapter-description">
        Smaller projects I’m exploring alongside the startup.
      </p>
      <div class="project-index">${sideProjects.map(projectRow).join("")}</div>
      ${link("/work/", "All work & project stories")}
    </section>
    <section class="life-preview hub-life" data-reveal>
      <div class="life-copy">
        <span class="folio">04 / Life beyond the work</span>
        <h2>And then,<br /><em>there’s cricket.</em></h2>
        <p>${e(lifeCopy)}</p>
        <div class="life-links">
          ${link("/accomplishments/#sports", "On the field")}${link("/about/", "More about me")}
        </div>
      </div>
      ${draft || lifeMedia[0].publication === "approved" ? mediaSlot(lifeMedia[0], draft) : '<div class="life-note"><p>Student.<br>Builder.<br>Cricketer.</p></div>'}
    </section>
    ${competitionHighlights.length ? `<section class="competitions-chapter" aria-labelledby="competition-highlights-title" data-reveal><div class="section-title"><h2 id="competition-highlights-title">Cases. Ideas. Competition.</h2><span class="small">05 / Competitions</span></div><p class="chapter-description">A few results from business cases and hackathons.</p><div class="competition-highlights">${competitionHighlights.map((item) => `<article class="competition-highlight"><div><p class="competition-result small">${e(item.result)}</p><h3>${link(`/accomplishments/#${item.slug}`, item.event, "competition-link")}</h3>${item.attribution ? `<p class="small">${e(item.attribution)}</p>` : ""}</div><p class="competition-summary">${e(item.summary)}</p></article>`).join("")}</div>${link("/accomplishments/#co-curricular", "All competition results")}</section>` : ""}`;
}
