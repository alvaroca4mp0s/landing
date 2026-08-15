# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> This is a subproject of `~/Projects` (Álvaro's RedLocal workspace). The workspace-root
> `CLAUDE.md` still applies; this file is authoritative for `landing/`.

## What this is

`www.redlocal.cl` — the RedLocal marketing site and Álvaro's public "vitrina" (showcase of
what RedLocal builds). It is a **hand-written static site** (plain HTML/CSS/vanilla JS, no
framework, no build step, no bundler) deployed to **Cloudflare Pages**. The `.next/`, `out/`,
`node_modules/` entries in `.gitignore` are vestigial from an abandoned Next attempt — do not
reintroduce a framework.

Copy is Chilean/neutral Spanish; identifiers are English. The site's thesis: RedLocal builds
systems that **detect events, filter noise, and alert the right person on the right channel**.

## Serve & test locally

No install, no build. Serve the root over HTTP (needed for the manifest/fetch to behave):

```bash
python3 -m http.server 8080   # then open http://localhost:8080
```

Tests are **Python stdlib `unittest`** (not pytest), and they assert on the *rendered HTML as
text* — they are a content/SEO contract, not JS unit tests:

```bash
python3 -m unittest discover -s tests          # all
python3 -m unittest tests.test_diagnostico_ot  # one module
```

`tests/test_diagnostico_ot.py` locks down the `/diagnostico-ot/` offer landing: required scope
phrases and explicit **exclusions** ("No incluye" pentesting / IEC 62443 / cambios en producción),
the presence of WhatsApp/email/`#reunion`/privacy links, canonical + OG + `Service` JSON-LD, and
that the home page and `sitemap.xml` link to the offer. **If you change offer copy, scope, the
canonical URL, or those links, update the test in the same change** — it will otherwise fail.

## Deploy

Push to the repo; Cloudflare Pages serves the root of the branch as-is. There is no `dist/` build
— every file at the repo root that isn't gitignored is published. `_headers` (CSP + security
headers), `robots.txt`, `sitemap.xml`, and `manifest.webmanifest` are all live production config.
Outward-facing; confirm before pushing changes that alter copy, pricing, or the CSP.

## Layout & the pieces that matter

- **`index.html` + `styles.css` + `app.js`** — the home page. One CSS file, one JS file (an IIFE,
  progressive-enhancement; the page must work with JS disabled). Design tokens are CSS custom
  properties (`--signal`, `--ink-faint`, `--line-strong`, …).
- **`diagnostico-ot/`** — a standalone offer landing (its own `index.html` + `styles.css`), guarded
  by the unittest contract above.
- **`legacy/`** — the previous version of the site, kept for reference only. **Not deployed, not a
  fallback.** Don't edit it or copy patterns from it into the live pages.
- **`remotion/`** — a separate React/[Remotion](https://remotion.dev) project for rendering
  explainer/video assets; its own `package.json` (`npm install` there). Unrelated to serving the
  site; not part of the static deploy.
- **`assets/`** — hero + OG images, each shipped as `.webp` and a fallback. `privacidad.html` is the
  only other real page.

### `app.js` — two non-obvious systems

Both are gated on `prefers-reduced-motion` and degrade to a static state.

1. **Signal-flow diagram** (`signalFlow`) — programmatically builds an SVG animation of sources →
   noise filter → chosen channel → action, cycling through `SCENARIOS`. Pure decoration driven by
   the `Y[]` coordinate table and hand-tuned Bézier paths; edit the data arrays, not the geometry,
   for content changes.
2. **6-step conversational lead form** (`leadForm`) — the site's one conversion path. On submit it:
   - builds a Spanish WhatsApp message from the answers and opens `wa.me/<WA_NUMBER>`;
   - **best-effort** POSTs the lead to **Twenty CRM** via a public webhook-workflow URL
     (`TWENTY_LEAD_URL`, splitting name into first/last). CRM failure must never block the WhatsApp
     hand-off — keep that `.catch(() => {})` / `keepalive` shape.
   - Non-sensitive answers are drafted to `localStorage` (`rl_lead_draft`); PII is not persisted.
     A hidden `website` field is a **honeypot** — if filled, silently fake success.

## Conventions specific to this repo

- **Analytics: Plausible**, loaded from `index.html` with `data-domain="redlocal.cl"`. Custom
  events fire through `track()` / `[data-track]` attributes (`form_started`, `form_step_completed`,
  `form_submitted`, `contact_channel_selected`). Reuse that mechanism; don't add other trackers.
- **CSP is strict** (see `_headers`): scripts only `self` + `plausible.io`; `connect-src` allows
  only `plausible.io` and `crm.redlocal.cl`. Any new external origin (script, font, image, fetch
  endpoint) must be added to `_headers` or it will be blocked in production.
- Contact constants live in `app.js` (`WA_NUMBER = "56945818860"`, `hola@redlocal.cl`) and are also
  hard-coded across the HTML — grep for all occurrences when changing a number, email, or the CRM
  webhook.
- When adding/removing a public URL, update **`sitemap.xml`** (and its `lastmod`) and, if the offer
  page is affected, the unittest.
