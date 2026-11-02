# Praveen Kumar S — personal website

A responsive static portfolio with a centred portrait and six surrounding chapter links. Optimus leads as a funded startup, followed by side projects Weave and BookHop. Professional experience, competitions and cricket have their own pages. The site includes three supplied photographs, accessible native disclosures and optional motion.

## Local development

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4321/. The local server serves the release website, binds only to loopback and rebuilds when source or assets change. Refresh after an edit. Stop with Ctrl+C; restart after changing the server script.

## Build and checks

```sh
npm run check
npm run lint
npm test
npm run build
```

`npm run build` generates the complete static website in `dist/`. This is the only directory to publish. It includes all project pages, accomplishment entries, local fonts, styles, JavaScript and referenced images. No runtime API keys, backend, database or external font service are required.

The optional `npm run build:draft` generates image-slot previews in `dist-draft/` for local asset work. That directory is never the deployment output. Source records marked `publication: 'draft'` are excluded from the normal build.

## Host with Vercel

1. Import `Praveen-ghostProtocol/personalwebsite` from GitHub.
2. Use the repository root. The included `vercel.json` specifies the Other framework preset, `npm run build`, output directory `dist`, trailing slashes and security headers.
3. Deploy when ready. There are no application environment variables to configure.

The repository contains no automatic deployment workflow. Importing it into a hosting account is a separate action. Vercel serves the site from its domain root, which matches the site’s routes. GitHub Pages can also host the static output, but a project site at `/personalwebsite/` needs its URLs adapted for that path first. Vercel is the direct configuration for this version.

## Edit content

- `src/content.mjs`: profile, startup and side projects, experience, competitions, cricket and photo records.
- `src/home.mjs` / `src/home.css`: centred portrait and six chapter links. Keep this layout intact.
- `src/pages.mjs` / `src/components.mjs`: other pages and shared markup.
- `src/site.css`: typography, colours, responsive layout and focus styles.
- `src/motion.mjs` / `src/motion.css`: entrances, scroll movement, disclosures and the pause control. System reduced motion is respected, and navigation works without JavaScript.

Add a project to the typed `projects` array to generate its page. Add accomplishments to `achievements`. Unknown dates or organisers may be empty; they are omitted from the interface. Project and accomplishment pages intentionally omit My role fields. Professional job titles remain part of the experience page.

Real project screenshots can be added to their existing media slots. Set the image path, actual dimensions, alt text and caption. Mark an image `publication: 'approved'` only when it is intended for the website. Missing or draft images are omitted from release HTML. Optional PDF links must have descriptive labels, type and file size; the build fails if a referenced download is missing. Original resumes and competition attachments are not included.

## Privacy and repository boundaries

Builds never read `.private/`. Private notes, source attachments, backups, local environment files, dependency directories and generated output are ignored by Git. The local server serves only the output directory. The production browser module contains generic motion behaviour; it does not serialize private records. The only browser storage is a per-tab motion preference.

Fonts are self-hosted from Fontsource, with their licenses copied into the generated assets. There are no analytics, tracking pixels, forms or credential requirements.

Local backups preserve both the original photo-essay site and the version before release cleanup in `.backups/`. To restore one, copy it into a separate folder and install dependencies there; keep the current workspace intact.
