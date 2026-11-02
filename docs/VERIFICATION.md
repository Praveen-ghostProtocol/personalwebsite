# Release verification

Prepared 2 November 2026. The website remains a local preview until its owner connects a hosting service and deploys it.

## Completed checks

- Type checking and ESLint pass.
- All 12 regression tests pass, including release-content retention, nested publication filtering, escaping, safe URLs, working internal links/fragments, missing images, unavailable downloads, private canaries, local file-serving boundaries and the Vercel output configuration.
- The static release build contains 12 pages plus a 404 page, seven project stories and 13 accomplishment entries.
- Forty-eight browser checks cover all 12 release pages at 320, 390, 768 and 1440px. No horizontal overflow, broken images, duplicate/missing H1s, authoring controls, review qualifiers or asset placeholders were found.
- The release browser console has no warnings or errors in the inspected navigation flows.
- The system retains the centred portrait and six surrounding homepage chapter links. Home layout and motion files are unchanged during release cleanup.
- The three real photographs load locally. Earlier browser checks also exercised keyboard and mouse disclosure activation, animation frames and pause/resume across navigation.
- `npm audit --audit-level=high` reports zero vulnerabilities.

## Release behaviour

`npm run build` generates `dist/`, containing only site HTML and referenced assets. It never reads `.private/`. Normal pages allow indexing; the 404 page does not. The local HTTP preview adds a noindex response header, while the Vercel configuration uses release security headers without blocking indexing.

The release omits unknown dates, organiser names and team details rather than guessing. My role fields, Last reviewed metadata, authoring strips, review routes and missing-image slots are absent. Product stages, incoming employment and the Optimus waitlist context remain factual site content. Original PDFs, private notes and backups are not in the release or Git allowlist.

Vercel is configured through `vercel.json` for a root-domain static site, with build command `npm run build`, output directory `dist`, trailing slashes and restrictive security headers. No hosting connection or deployment is performed by these checks. Production DNS, TLS, custom domains and real-device behaviour should be checked by the owner after deploying. A full screen-reader audit, automated axe and field performance measurements were not performed; this record does not claim accessibility certification or measured Core Web Vitals.

## Rollback

Local backups preserve the original photo-essay design, the version before the portrait hub and the pre-release version. Keep these backups private. Once hosted from GitHub, a previous source commit can be selected or reverted and rebuilt to restore the website.
