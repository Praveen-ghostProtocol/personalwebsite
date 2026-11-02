import { escapeHtml as e, safeHref } from "./content-policy.mjs";
import { profile } from "./content.mjs";
import { existsSync } from "node:fs";

/** @param {string} href @param {string} label @param {string} [className] */
export function link(href, label, className = "text-link") {
  return /* HTML */ `<a class="${className}" href="${e(safeHref(href))}"
    >${e(label)}<span aria-hidden="true"> ↗</span></a
  >`;
}

/** @param {import('./types.js').Media} media @param {boolean} draft @param {boolean} [priority] */
export function mediaSlot(media, draft, priority = false) {
  if (!draft && media.publication !== "approved") return "";
  if (
    media.src &&
    existsSync(new URL(`..${safeHref(media.src)}`, import.meta.url))
  )
    return /* HTML */ `<figure class="photo">
      <div class="photo-window">
        <img
          src="${e(safeHref(media.src))}"
          width="${media.width}"
          height="${media.height}"
          alt="${e(media.alt)}"
          ${priority ? 'fetchpriority="high"' : 'loading="lazy"'}
          decoding="async"
        />
      </div>
      <figcaption>${e(media.caption)}</figcaption>
    </figure>`;
  if (!draft) return "";
  return /* HTML */ `<figure class="asset-slot" data-slot="${e(media.slot)}">
    <div>
      <span class="slot-mark" aria-hidden="true">＋</span
      ><strong>${e(media.slot)}</strong
      ><span>Asset to be supplied · ${media.width} × ${media.height}</span>
    </div>
    <figcaption>${e(media.caption)}</figcaption>
  </figure>`;
}

/** @param {import('./types.js').ArtifactLink} artifact */
export function artifactLink(artifact) {
  const size = artifact.bytes
    ? `, ${(artifact.bytes / 1024 / 1024).toFixed(1)} MB`
    : "";
  return link(
    artifact.href,
    `${artifact.label}${artifact.type ? ` (${artifact.type}${size})` : ""}`,
  );
}

/** @param {import('./types.js').Project} project @param {number} index */
export function projectRow(project, index) {
  return /* HTML */ `<article
    class="project-row ${index === 0 ? "project-featured" : ""}"
  >
    <span class="project-number" aria-hidden="true">0${index + 1}</span>
    <div class="project-name">
      <h3><a href="/work/${e(project.slug)}/">${e(project.title)}</a></h3>
      <span class="stage">${e(project.stage)}</span>
    </div>
    <div class="project-description">
      <p>${e(project.summary)}</p>
      ${link(`/work/${project.slug}/`, `Inside ${project.title}`)}
    </div>
  </article>`;
}

/** @param {import('./types.js').Achievement} item @param {boolean} draft */
export function achievementEntry(item, draft) {
  return /* HTML */ `<details class="achievement" id="${e(item.slug)}">
    <summary>
      <span class="achievement-heading"
        >${item.year ? `<span class="small">${e(item.year)}</span>` : ""}<span
          class="achievement-title"
          >${e(item.event)}</span
        >${item.subtitle ? `<span class="achievement-subtitle small">${e(item.subtitle)}</span>` : ""}</span
      ><span class="result">${e(item.result)}</span
      ><span class="expand" aria-hidden="true">＋</span>
    </summary>
    <div class="achievement-body">
      <p>${e(item.summary)}</p>
      ${item.attribution || item.organiser ? `<dl class="facts">${item.attribution ? `<div><dt>Attribution</dt><dd>${e(item.attribution)}</dd></div>` : ""}${item.organiser ? `<div><dt>Organiser</dt><dd>${e(item.organiser)}</dd></div>` : ""}</dl>` : ""}
      ${item.project ? link(`/work/${item.project}/`, "Read the project summary") : ""}${item.deck ? artifactLink(item.deck) : ""}${item.media.map((m) => mediaSlot(m, draft)).join("")}
    </div>
  </details>`;
}

/** @param {{title:string, description:string, path:string, body:string, draft:boolean}} props */
export function page({ title, description, path, body, draft }) {
  const nav = [
    ["/", "Home"],
    ["/work/", "Work"],
    ["/accomplishments/", "Accomplishments"],
    ["/about/", "About"],
  ];
  const active =
    path.startsWith("/work/") || path === "/experience/" ? "/work/" : path;
  return /* HTML */ `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>${e(title)} | Praveen Kumar S</title>
        <meta name="description" content="${e(description)}" />
        <meta
          name="robots"
          content="${draft || path === "/404/" ? "noindex,nofollow" : "index,follow"}"
        />
        <meta property="og:title" content="${e(title)} | Praveen Kumar S" />
        <meta property="og:description" content="${e(description)}" />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#f4f1e9" />
        <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml" />
        <link
          rel="preload"
          href="/assets/fonts/instrument-serif-latin-400-normal.woff2"
          as="font"
          type="font/woff2"
          crossorigin
        />
        <link rel="stylesheet" href="/assets/site.css" />
        <link rel="stylesheet" href="/assets/home.css" />
        <link rel="stylesheet" href="/assets/motion.css" />
        <script type="module" src="/assets/motion.js"></script>
      </head>
      <body>
        <div class="reading-progress" aria-hidden="true"></div>
        <a class="skip-link" href="#main">Skip to content</a>
        <div class="site-shell">
          <header class="site-header">
            <a class="wordmark" href="/" aria-label="Praveen Kumar S, home"
              >pk<span aria-hidden="true">.</span></a
            >
            <nav aria-label="Main navigation">
              ${nav.map(([href, label]) => `<a href="${href}"${href === active ? ' aria-current="page"' : ""}>${label}</a>`).join("")}
            </nav>
            <a class="header-contact" href="#contact"
              >Say hello <span aria-hidden="true">↗</span></a
            >
          </header>
          <main id="main" tabindex="-1">${body}</main>
          <footer id="contact" class="footer">
            <p class="small">
              For a conversation, a project, or a good problem.
            </p>
            <div class="footer-heading">
              <h2>Let’s talk.</h2>
              ${link(`mailto:${profile.email}`, profile.email, "email-link")}
            </div>
            <div class="footer-bottom">
              <p>Praveen Kumar S <span>·</span> A few things I’m working on.</p>
              <div>
                ${link(profile.linkedin, "LinkedIn")}${link(profile.github, "GitHub")}${profile.resume && (draft || profile.resume.publication === "approved") ? artifactLink(profile.resume) : ""}
              </div>
              <button
                class="motion-toggle"
                type="button"
                aria-pressed="false"
                hidden
              >
                Pause motion</button
              ><a class="back-top" href="#main">Back to top ↑</a>
            </div>
          </footer>
        </div>
      </body>
    </html>`;
}
