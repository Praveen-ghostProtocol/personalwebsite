/** Normalised progress through a sticky scene. @param {number} top @param {number} travel */
export function scrollProgress(top, travel) {
  return travel > 0 ? Math.max(0, Math.min(1, -top / travel)) : 0;
}

if (typeof document !== "undefined") {
  const system = window.matchMedia("(prefers-reduced-motion: reduce)");
  const wide = window.matchMedia("(min-width: 768px)");
  const scene = document.querySelector("[data-hub-scene]");
  const stage = document.querySelector("[data-hub-stage]");
  const focus = document.querySelector("[data-hub-focus]");
  const toggle = document.querySelector(".motion-toggle");
  const photos = [...document.querySelectorAll("main .photo")].filter(
    (photo) => !photo.closest(".hub-portrait"),
  );
  const reveals = [
    ...document.querySelectorAll(
      ".startup-story, .startup-note, .section-title, .life-copy, .project-row, .achievement, .competition-highlight, .experience-preview article, .experience-list article, .case-prose > section, .life-statement, main .photo",
    ),
  ].filter((element) => !element.closest(".hub-portrait"));
  let paused = false;
  try {
    paused = window.sessionStorage.getItem("portfolio-motion") === "paused";
  } catch {
    /* Storage is optional. */
  }
  let frame = 0;
  /** @type {IntersectionObserver | undefined} */
  let observer;
  /** @type {Set<Animation>} */
  const active = new Set();
  const disabled = () => paused || system.matches;

  /** @param {Element} element @param {Keyframe[]} keyframes @param {number} [delay] @param {number} [duration] */
  function play(element, keyframes, delay = 0, duration = 1000) {
    if (disabled() || typeof element.animate !== "function") return;
    const animation = element.animate(keyframes, {
      duration,
      delay,
      easing: "cubic-bezier(.16,1,.3,1)",
      fill: "backwards",
    });
    active.add(animation);
    animation.onfinish = animation.oncancel = () => active.delete(animation);
  }

  function updateScroll() {
    frame = 0;
    const reduced = disabled();
    const travel = document.documentElement.scrollHeight - window.innerHeight;
    document.documentElement.style.setProperty(
      "--reading-progress",
      String(reduced ? 0 : scrollProgress(-window.scrollY, travel)),
    );
    if (scene instanceof HTMLElement && stage instanceof HTMLElement) {
      const box = scene.getBoundingClientRect();
      const progress =
        reduced || !wide.matches
          ? 0
          : scrollProgress(box.top - 12, box.height - stage.offsetHeight);
      scene.style.setProperty("--hub-progress", progress.toFixed(4));
    }
    for (const photo of photos) {
      if (!(photo instanceof HTMLElement)) continue;
      const box = photo.getBoundingClientRect();
      const progress = scrollProgress(
        box.top - window.innerHeight,
        window.innerHeight + box.height,
      );
      const shift = reduced ? 0 : (0.5 - progress) * (wide.matches ? 48 : 28);
      photo.style.setProperty("--photo-shift", shift.toFixed(2) + "px");
    }
  }
  function schedule() {
    if (!frame) frame = window.requestAnimationFrame(updateScroll);
  }

  function openHub() {
    if (
      !(scene instanceof HTMLElement) ||
      scene.getBoundingClientRect().top > window.innerHeight ||
      scene.getBoundingClientRect().bottom < 0
    )
      return;
    const portrait = scene.querySelector(".portrait-frame");
    const box = portrait?.getBoundingClientRect();
    if (!portrait || !box) return;
    play(
      portrait,
      [
        { opacity: 0, transform: "scale(.65) rotate(-12deg)" },
        { opacity: 1, transform: window.getComputedStyle(portrait).transform },
      ],
      0,
      1400,
    );
    scene.querySelectorAll("[data-chapter]").forEach((chapter, index) => {
      const chapterBox = chapter.getBoundingClientRect();
      const x =
        (box.left + box.width / 2 - chapterBox.left - chapterBox.width / 2) *
        0.4;
      const y =
        (box.top + box.height / 2 - chapterBox.top - chapterBox.height / 2) *
        0.4;
      play(
        chapter,
        [
          { opacity: 0, transform: `translate(${x}px, ${y}px) scale(.8)` },
          { opacity: 1, transform: window.getComputedStyle(chapter).transform },
        ],
        150 + index * 100,
        1200,
      );
    });
  }

  function configure() {
    observer?.disconnect();
    for (const animation of active) animation.cancel();
    active.clear();
    document.documentElement.classList.toggle("motion-paused", disabled());
    document.documentElement.classList.toggle("motion-live", !disabled());
    if (toggle instanceof HTMLButtonElement) {
      toggle.hidden = system.matches;
      toggle.setAttribute("aria-pressed", String(paused));
      toggle.textContent = paused ? "Resume motion" : "Pause motion";
    }
    if (!disabled() && "IntersectionObserver" in window) {
      const inView = new WeakSet();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              inView.delete(entry.target);
              continue;
            }
            if (inView.has(entry.target)) continue;
            inView.add(entry.target);
            const siblings = [...(entry.target.parentElement?.children ?? [])];
            const delay = Math.max(0, siblings.indexOf(entry.target) % 5) * 90;
            const photo = entry.target.classList.contains("photo");
            play(
              entry.target,
              [
                {
                  opacity: 0.08,
                  transform: `translateY(${photo ? 80 : 60}px)`,
                  ...(photo ? { clipPath: "inset(16% 0 0 0)" } : {}),
                },
                {
                  opacity: 1,
                  transform: "translateY(0)",
                  ...(photo ? { clipPath: "inset(0% 0 0 0)" } : {}),
                },
              ],
              delay,
              photo ? 1400 : 1100,
            );
          }
        },
        { rootMargin: "0px 0px -24px 0px", threshold: 0.08 },
      );
      reveals.forEach((element) => observer?.observe(element));
      openHub();
    }
    schedule();
  }

  toggle?.addEventListener("click", () => {
    paused = !paused;
    try {
      window.sessionStorage.setItem(
        "portfolio-motion",
        paused ? "paused" : "running",
      );
    } catch {
      /* Retain the current-page choice. */
    }
    configure();
  });
  for (const details of document.querySelectorAll("details.achievement")) {
    details.addEventListener("toggle", () => {
      if (!details.hasAttribute("open")) return;
      const body = details.querySelector(".achievement-body");
      if (body)
        play(
          body,
          [
            {
              opacity: 0,
              transform: "translateY(-18px)",
              clipPath: "inset(0 0 100% 0)",
            },
            {
              opacity: 1,
              transform: "translateY(0)",
              clipPath: "inset(0 0 0% 0)",
            },
          ],
          0,
          650,
        );
    });
  }
  system.addEventListener("change", configure);
  wide.addEventListener("change", schedule);
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
  for (const chapter of document.querySelectorAll("[data-chapter]")) {
    const show = () => {
      if (focus)
        focus.textContent =
          chapter.querySelector(".chapter-title")?.textContent ?? "Work & life";
    };
    const reset = () => {
      if (focus) focus.textContent = "Work & life";
    };
    chapter.addEventListener("mouseenter", show);
    chapter.addEventListener("focus", show);
    chapter.addEventListener("mouseleave", reset);
    chapter.addEventListener("blur", reset);
  }
  configure();
}
