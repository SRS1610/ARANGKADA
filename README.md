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
- `assets/favicon.svg` — hexagon brand mark

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
