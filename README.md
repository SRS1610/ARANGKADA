# Arangkada Philippines — Website

A dynamic, dependency-free static website for **Arangkada Philippines**, the advocacy arm of the
Joint Foreign Chambers of the Philippines (JFC). Built with plain HTML/CSS/JS (no build step,
no external CDN dependencies) so it can be hosted anywhere — GitHub Pages, Netlify, or a plain
web server.

Content structure mirrors the current site's navigation (Home, About us, Publications,
Programs & Projects, Arangkada Forum, Contact) as captured in the 2026 website recommendation
brief, with real background on Arangkada/JFC filled in from public sources.

## Structure

- `index.html` — single shell page (header, nav mount point, `<main>`, footer)
- `css/styles.css` — full design system and responsive layout
- `js/data.js` — all site content (nav, publications, programs, events, forum info, team, JFC
  members, legislative priorities). **Edit this file to update content** — no HTML changes needed.
- `js/app.js` — client-side hash router and rendering/interaction logic (dropdown nav, mobile
  menu, publication search, events calendar, forms)
- `js/hero3d.js` — the homepage's 3D hero centerpiece (Three.js): a rotating cluster of hexagonal
  prisms echoing the brand mark, with gentle pointer-parallax. Lazy-loaded only on the Home route.
- `js/ambient3d.js` — a persistent, site-wide ambient 3D layer (Three.js): a single fixed WebGL
  canvas behind the whole page that survives every route change, visible only through the site's
  translucent navy zones (hero, page banners, CTA band, footer) — opaque white sections sit on top
  of it, so body text is never affected. This is what ties every page into one continuous 3D
  identity, not just the homepage.
- `js/tilt.js` — 3D pointer-tilt for publication/program/member/team cards and info panels.
- Route changes in `js/app.js` also run a short 3D "card-flip" transition (`#main` rotates in
  perspective as content swaps).
- All of the above only engage for precise, hover-capable pointers (desktop mice, never touch)
  and fully respect `prefers-reduced-motion` (transitions and animation are skipped outright);
  WebGL failure anywhere degrades gracefully to the plain CSS design with no error.
- `assets/favicon.svg` — hexagon brand mark
- `assets/vendor/three.module.min.js` — Three.js (MIT), vendored locally so the site has no
  runtime CDN dependency. Fetched via `npm` and copied in as a static asset; there is no build
  step and nothing to install to run the site.

## Running locally

No build tools required. From this directory, serve the folder with any static file server, e.g.:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Notes for content owners

- Team member names/photos are placeholders (roles only) — replace real names/bios in
  `TEAM` inside `js/data.js`.
- Publications, statements, events, and the legislative priority list are illustrative and
  should be reviewed/replaced with current, verified content from the organization.
- Forms (forum registration, contact, newsletter) are client-side only; wire them to a real
  backend or form service (e.g. an email API or CRM webhook) before going live.
