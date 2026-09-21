/* ==========================================================================
   Arangkada Philippines — application logic
   Vanilla JS hash router + dynamic rendering. No build step required.
   ========================================================================== */

(function () {
  "use strict";

  const $main = document.getElementById("main");
  const $footer = document.getElementById("site-footer");
  const $navList = document.getElementById("nav-list");
  const $header = document.getElementById("site-header");
  const $navToggle = document.getElementById("nav-toggle");
  const $primaryNav = document.getElementById("primary-nav");
  const $toast = document.getElementById("toast");

  /* ---------------------------------------------------------------------
     Utilities
     --------------------------------------------------------------------- */
  const esc = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));

  const fmtDate = (iso) => {
    const d = new Date(iso + (iso.length <= 10 ? "T00:00:00" : ""));
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const monthName = (m) => ["January","February","March","April","May","June","July","August","September","October","November","December"][m];

  function showToast(message, isError) {
    $toast.textContent = message;
    $toast.classList.toggle("toast-error", !!isError);
    $toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => $toast.classList.remove("show"), 4000);
  }

  function flattenRoutes(items, acc) {
    items.forEach((item) => {
      acc.push(item.route);
      if (item.children) flattenRoutes(item.children, acc);
    });
    return acc;
  }

  /* ---------------------------------------------------------------------
     Navigation rendering
     --------------------------------------------------------------------- */
  function renderNav() {
    $navList.innerHTML = NAV.map((item) => {
      const hasChildren = item.children && item.children.length;
      const childMarkup = hasChildren
        ? `<ul class="dropdown">${item.children.map((c) =>
            `<li><a href="#${c.route}" data-route="${c.route}">${c.label}</a></li>`).join("")}</ul>`
        : "";
      return `<li class="nav-item${hasChildren ? " has-dropdown" : ""}">
        <a href="#${item.route}" data-route="${item.route}" class="nav-link">${item.label}${hasChildren ? '<span class="caret" aria-hidden="true"></span>' : ""}</a>
        ${childMarkup}
      </li>`;
    }).join("");
  }

  function setActiveNav(path) {
    document.querySelectorAll("[data-route]").forEach((a) => {
      const r = a.getAttribute("data-route");
      a.classList.toggle("is-active", r !== "/" && path.indexOf(r) === 0 || r === path);
    });
  }

  /* ---------------------------------------------------------------------
     Shared UI fragments
     --------------------------------------------------------------------- */
  function pageHero(kicker, title, subtitle) {
    return `<section class="page-hero">
      <div class="container">
        <p class="kicker">${kicker}</p>
        <h1>${title}</h1>
        ${subtitle ? `<p class="page-hero-sub">${subtitle}</p>` : ""}
      </div>
    </section>`;
  }

  function tabNav(tabs, current, baseRoute) {
    return `<div class="tab-nav" role="tablist">
      ${tabs.map((t) => `<a role="tab" aria-selected="${t.route === current}" class="tab-link${t.route === current ? " is-active" : ""}" href="#${t.route}" data-route="${t.route}">${t.label}</a>`).join("")}
    </div>`;
  }

  function pubCard(p) {
    return `<article class="pub-card reveal">
      <div class="pub-cover" style="--accent:${p.accent || "#1f3a63"}">
        <span class="pub-year">${p.year}</span>
        <span class="pub-mark" aria-hidden="true"></span>
      </div>
      <div class="pub-body">
        <h3>${esc(p.title)}</h3>
        ${p.subtitle ? `<p class="pub-subtitle">${esc(p.subtitle)}</p>` : ""}
        <p class="pub-summary">${esc(p.summary)}</p>
        <button class="link-btn" data-pub="${p.id}">Read overview &rarr;</button>
      </div>
    </article>`;
  }

  function listItem(entry, metaLabel) {
    return `<article class="list-item reveal">
      <div class="list-item-date">
        <span class="d">${new Date(entry.date + "T00:00:00").getDate()}</span>
        <span class="m">${monthName(new Date(entry.date + "T00:00:00").getMonth()).slice(0,3)} ${new Date(entry.date + "T00:00:00").getFullYear()}</span>
      </div>
      <div class="list-item-body">
        <h3>${esc(entry.title)}</h3>
        ${entry.source ? `<p class="list-item-source">${esc(entry.source)}</p>` : ""}
        <p>${esc(entry.summary)}</p>
      </div>
    </article>`;
  }

  /* ---------------------------------------------------------------------
     View: Home
     --------------------------------------------------------------------- */
  function viewHome() {
    return `
    <section class="hero">
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="container hero-inner">
        <div class="hero-copy reveal">
          <div class="hero-logo">
            ${brandMarkLarge()}
            <div class="hero-logo-text"><strong>ARANGKADA</strong><span>PHILIPPINES</span></div>
          </div>
          <h1>The major advocacy arm of the<br>Joint Foreign Chambers (JFC)</h1>
          <p class="hero-sub">We serve as a bridge between diverse industries, the government, and civil society.</p>
          <div class="hero-actions">
            <a class="btn btn-accent" href="#/forum/2026" data-route="/forum/2026">Arangkada Forum 2026</a>
            <a class="btn btn-outline-light" href="#/publications" data-route="/publications">Explore Publications</a>
          </div>
        </div>
        <div class="hero-stage" id="hero3d-stage" aria-hidden="true"></div>
      </div>
    </section>

    <section class="stats-strip">
      <div class="container stats-grid">
        ${STATS.map((s) => `<div class="stat reveal"><span class="stat-value">${s.value}</span><span class="stat-label">${s.label}</span></div>`).join("")}
      </div>
    </section>

    <section class="section">
      <div class="container two-col">
        <div class="reveal">
          <p class="kicker">About the project</p>
          <h2>Moving the Philippine reform agenda forward since 2010</h2>
          <p>${TAPP_CONTENT.paragraphs[0]}</p>
          <p>${TAPP_CONTENT.paragraphs[2]}</p>
          <a class="link-btn" href="#/about/tapp" data-route="/about/tapp">Learn about TAPP &rarr;</a>
        </div>
        <div class="reveal card-panel">
          <h3>Joint Foreign Chambers</h3>
          <p>Arangkada represents the shared advocacy of seven member chambers of the JFC, together representing more than 2,000 companies operating in the Philippines.</p>
          <ul class="chip-list">
            ${JFC_MEMBERS.map((m) => `<li class="chip" title="${esc(m.name)}">${m.abbr}</li>`).join("")}
          </ul>
          <a class="link-btn" href="#/about/jfc" data-route="/about/jfc">Meet the JFC &rarr;</a>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head reveal">
          <p class="kicker">Publications</p>
          <h2>From data-driven insights to high-impact advocacy</h2>
          <a class="btn btn-outline" href="#/publications" data-route="/publications">View all publications</a>
        </div>
        <div class="pub-grid">
          ${PUBLICATIONS.map(pubCard).join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container two-col reverse">
        <div class="reveal card-panel highlight-panel">
          <p class="kicker">Upcoming</p>
          <h3>${FORUM.current.edition} Arangkada Philippines Forum ${FORUM.current.year}</h3>
          <p><strong>Theme:</strong> ${esc(FORUM.current.theme)}</p>
          <p><strong>Date:</strong> ${esc(FORUM.current.date)} &middot; ${esc(FORUM.current.venue)}</p>
          <a class="btn btn-accent" href="#/forum/2026" data-route="/forum/2026">Register your interest</a>
        </div>
        <div class="reveal">
          <p class="kicker">Legislative priorities</p>
          <h2>A focused, twelve-point reform agenda</h2>
          <p>The JFC's legislative and policy reform agenda spans tax predictability, ease of doing business, infrastructure, market access, and more &mdash; advocated alongside leading Philippine business groups.</p>
          <a class="link-btn" href="#/publications/legislative" data-route="/publications/legislative">See the full agenda &rarr;</a>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="section-head reveal">
          <p class="kicker">Latest</p>
          <h2>Statements &amp; press releases</h2>
          <a class="btn btn-outline" href="#/publications/statements" data-route="/publications/statements">View all statements</a>
        </div>
        <div class="list-stack">
          ${STATEMENTS.slice(0, 3).map((s) => listItem(s)).join("")}
        </div>
      </div>
    </section>

    <section class="cta-band reveal">
      <div class="container cta-inner">
        <div>
          <h2>Connect with us</h2>
          <p>Partner with Arangkada Philippines to advance an investment climate that benefits business, government, and civil society alike.</p>
        </div>
        <a class="btn btn-accent" href="#/contact" data-route="/contact">Contact Us!</a>
      </div>
    </section>
    `;
  }

  function brandMarkLarge() {
    return `<svg viewBox="0 0 120 120" width="72" height="72" aria-hidden="true">
      <polygon points="40,6 62,18 62,42 40,54 18,42 18,18" fill="#2f6fb0"></polygon>
      <polygon points="82,6 104,18 104,42 82,54 60,42 60,18" fill="#7a4fb5"></polygon>
      <polygon points="18,46 40,58 40,82 18,94 -4,82 -4,58" fill="#1f9e8f"></polygon>
      <polygon points="61,46 83,58 83,82 61,94 39,82 39,58" fill="#e0a52c"></polygon>
      <polygon points="104,46 126,58 126,82 104,94 82,82 82,58" fill="#2f6fb0"></polygon>
      <polygon points="40,86 62,98 62,122 40,134 18,122 18,98" fill="#3fae4a"></polygon>
      <polygon points="82,86 104,98 104,122 82,134 60,122 60,98" fill="#d94f4f"></polygon>
    </svg>`;
  }

  /* ---------------------------------------------------------------------
     View: About
     --------------------------------------------------------------------- */
  function viewAbout(sub) {
    const tabs = NAV.find((n) => n.route === "/about").children;
    const current = "/about/" + (sub || "tapp");

    let body = "";
    if (!sub || sub === "tapp") {
      body = contentBlock(TAPP_CONTENT);
    } else if (sub === "jfc") {
      body = contentBlock(JFC_CONTENT) + `
        <h3>Member Chambers</h3>
        <div class="member-grid">
          ${JFC_MEMBERS.map((m) => `<div class="member-card reveal"><span class="member-abbr">${m.abbr}</span><p>${esc(m.name)}</p></div>`).join("")}
        </div>`;
    } else if (sub === "internship") {
      body = contentBlock(INTERNSHIP_CONTENT) + `
        <a class="btn btn-accent" href="#/contact" data-route="/contact">Ask about the next intake</a>`;
    } else if (sub === "team") {
      body = `<p class="reveal">The Arangkada secretariat is staffed by a small, dedicated policy and communications team supporting the JFC's advocacy work.</p>
        <div class="team-grid">
          ${TEAM.map((t) => `<div class="team-card reveal">
            <div class="team-avatar" aria-hidden="true">${initials(t.role)}</div>
            <h3>${esc(t.role)}</h3>
            <p>${esc(t.desc)}</p>
          </div>`).join("")}
        </div>`;
    } else {
      body = notFoundBody();
    }

    return pageHero("About us", "About Arangkada Philippines", "The people and partnership behind the country's leading investment advocacy platform.")
      + `<section class="section"><div class="container">${tabNav(tabs, current)}<div class="tab-panel">${body}</div></div></section>`;
  }

  function contentBlock(content) {
    return `<h2 class="reveal">${esc(content.title)}</h2>` + content.paragraphs.map((p) => `<p class="reveal">${p}</p>`).join("");
  }

  function initials(role) {
    return role.split(" ")
      .filter((w) => /^[A-Za-z]/.test(w))
      .map((w) => w[0].toUpperCase())
      .slice(0, 2)
      .join("");
  }

  /* ---------------------------------------------------------------------
     View: Publications
     --------------------------------------------------------------------- */
  const PUB_TAB_DATA = {
    "": { data: PUBLICATIONS, kind: "pub", title: "Featured Publications" },
    statements: { data: STATEMENTS, kind: "list", title: "Statements &amp; Press Releases" },
    multimedia: { data: MULTIMEDIA, kind: "list", title: "Multimedia News" },
    newsclips: { data: NEWSCLIPS, kind: "list", title: "Arangkada Newsclips" },
    legislative: { data: null, kind: "legislative", title: "Legislative Priorities" }
  };

  function viewPublications(sub) {
    const tabs = [{ label: "Featured Publications", route: "/publications" }].concat(NAV.find((n) => n.route === "/publications").children);
    const key = sub || "";
    const current = key ? "/publications/" + key : "/publications";
    const entry = PUB_TAB_DATA[key] || PUB_TAB_DATA[""];

    let body;
    if (entry.kind === "pub") {
      body = `<div class="pub-grid">${entry.data.map(pubCard).join("")}</div>`;
    } else if (entry.kind === "legislative") {
      body = `<p class="reveal">The JFC's twelve-point legislative and policy reform agenda focuses on the areas below. Progress on each is tracked and reported through Arangkada's regular publications.</p>
        <ol class="priority-list">
          ${LEGISLATIVE_PRIORITIES.map((p, i) => `<li class="reveal"><span class="priority-num">${i + 1}</span><div><h3>${esc(p.title)}</h3><p>${esc(p.note)}</p></div></li>`).join("")}
        </ol>`;
    } else {
      body = `<div class="filter-bar">
          <input type="search" id="pub-search" class="search-input" placeholder="Search ${entry.title.replace(/&amp;/, "&")}&hellip;" aria-label="Search">
        </div>
        <div class="list-stack" id="pub-list">${entry.data.map((e) => listItem(e)).join("")}</div>
        <p class="empty-state" id="pub-empty" hidden>No results found.</p>`;
    }

    return pageHero("Publications", entry.title.replace(/&amp;/, "&"), "From data-driven insights to high-impact advocacy.")
      + `<section class="section"><div class="container">${tabNav(tabs, current)}<div class="tab-panel">${body}</div></div></section>`;
  }

  /* Delegated (bound once) so it never goes stale across re-renders. */
  document.addEventListener("input", (evt) => {
    if (evt.target.id !== "pub-search") return;
    const key = parseHash().split("/").filter(Boolean)[1] || "";
    const entry = PUB_TAB_DATA[key] || PUB_TAB_DATA[""];
    if (entry.kind !== "list") return;
    const q = evt.target.value.trim().toLowerCase();
    const items = document.querySelectorAll("#pub-list .list-item");
    let visible = 0;
    items.forEach((el, i) => {
      const d = entry.data[i];
      const show = !!d && (d.title + " " + d.summary).toLowerCase().indexOf(q) !== -1;
      el.hidden = !show;
      if (show) visible++;
    });
    const $empty = document.getElementById("pub-empty");
    if ($empty) $empty.hidden = visible !== 0;
  });

  /* ---------------------------------------------------------------------
     View: Programs
     --------------------------------------------------------------------- */
  function viewPrograms(sub) {
    const tabs = NAV.find((n) => n.route === "/programs").children;
    const current = "/programs/" + (sub || "list");

    let body;
    if (sub === "calendar") {
      body = `<div id="calendar-root"></div>`;
    } else {
      body = `<div class="program-grid">
        ${PROGRAMS.map((p) => `<div class="program-card reveal">
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.summary)}</p>
        </div>`).join("")}
      </div>`;
    }

    const html = pageHero("Programs &amp; Projects", "Programs &amp; Projects", "Ongoing initiatives that turn recommendations into action.")
      + `<section class="section"><div class="container">${tabNav(tabs, current)}<div class="tab-panel">${body}</div></div></section>`;

    if (sub === "calendar") requestAnimationFrame(() => mountCalendar());
    return html;
  }

  function mountCalendar() {
    const root = document.getElementById("calendar-root");
    if (!root) return;
    const today = new Date();
    let viewYear = today.getFullYear();
    let viewMonth = today.getMonth();

    const eventsByDate = {};
    EVENTS.forEach((e) => {
      (eventsByDate[e.date] = eventsByDate[e.date] || []).push(e);
    });

    function pad(n) { return n < 10 ? "0" + n : "" + n; }

    function render() {
      const first = new Date(viewYear, viewMonth, 1);
      const startDow = first.getDay();
      const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
      const cells = [];
      for (let i = 0; i < startDow; i++) cells.push(null);
      for (let d = 1; d <= daysInMonth; d++) cells.push(d);

      const monthEvents = EVENTS.filter((e) => {
        const dt = new Date(e.date + "T00:00:00");
        return dt.getFullYear() === viewYear && dt.getMonth() === viewMonth;
      }).sort((a, b) => a.date.localeCompare(b.date));

      root.innerHTML = `
        <div class="calendar-toolbar">
          <button class="cal-nav" id="cal-prev" aria-label="Previous month">&larr;</button>
          <h3>${monthName(viewMonth)} ${viewYear}</h3>
          <button class="cal-nav" id="cal-next" aria-label="Next month">&rarr;</button>
        </div>
        <div class="calendar-grid">
          ${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => `<div class="cal-dow">${d}</div>`).join("")}
          ${cells.map((d) => {
            if (d === null) return `<div class="cal-cell cal-empty"></div>`;
            const iso = `${viewYear}-${pad(viewMonth + 1)}-${pad(d)}`;
            const has = eventsByDate[iso];
            const isToday = iso === `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
            return `<div class="cal-cell${has ? " has-event" : ""}${isToday ? " is-today" : ""}">
              <span class="cal-daynum">${d}</span>
              ${has ? has.map((e) => `<span class="cal-dot" title="${esc(e.title)}"></span>`).join("") : ""}
            </div>`;
          }).join("")}
        </div>
        <div class="event-list">
          <h3>Events in ${monthName(viewMonth)}</h3>
          ${monthEvents.length ? monthEvents.map((e) => `
            <div class="event-row reveal">
              <div class="event-date">${new Date(e.date + "T00:00:00").getDate()} ${monthName(viewMonth).slice(0,3)}</div>
              <div class="event-info">
                <h4>${esc(e.title)}</h4>
                <p>${esc(e.type)} &middot; ${esc(e.location)}</p>
              </div>
            </div>`).join("") : `<p class="empty-state">No events scheduled this month.</p>`}
        </div>
      `;

      document.getElementById("cal-prev").addEventListener("click", () => {
        viewMonth--; if (viewMonth < 0) { viewMonth = 11; viewYear--; } render();
      });
      document.getElementById("cal-next").addEventListener("click", () => {
        viewMonth++; if (viewMonth > 11) { viewMonth = 0; viewYear++; } render();
      });
    }

    render();
  }

  /* ---------------------------------------------------------------------
     View: Forum
     --------------------------------------------------------------------- */
  function viewForum(sub) {
    const tabs = NAV.find((n) => n.route === "/forum").children;
    const current = "/forum/" + (sub || "2026");

    let body;
    if (sub === "2025") {
      body = `<div class="card-panel reveal">
        <p class="kicker">${FORUM.previous.edition} Arangkada Philippines Forum &middot; ${FORUM.previous.year}</p>
        <h2>Theme: ${esc(FORUM.previous.theme)}</h2>
        <p>${esc(FORUM.previous.summary)}</p>
        <h3>Highlights</h3>
        <ul class="bullet-list">
          ${FORUM.previous.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}
        </ul>
      </div>`;
    } else {
      body = `<div class="two-col">
        <div class="card-panel reveal">
          <p class="kicker">${FORUM.current.edition} Arangkada Philippines Forum &middot; ${FORUM.current.year}</p>
          <h2>Theme: ${esc(FORUM.current.theme)}</h2>
          <p><strong>Date:</strong> ${esc(FORUM.current.date)}</p>
          <p><strong>Venue:</strong> ${esc(FORUM.current.venue)}</p>
          <p>${esc(FORUM.current.registrationNote)}</p>
        </div>
        <div class="reveal">
          <form id="forum-form" class="form" novalidate>
            <h3>Notify me / Register interest</h3>
            <div class="form-row">
              <label for="f-name">Full name</label>
              <input id="f-name" name="name" type="text" required>
            </div>
            <div class="form-row">
              <label for="f-org">Organization</label>
              <input id="f-org" name="org" type="text" required>
            </div>
            <div class="form-row">
              <label for="f-email">Email address</label>
              <input id="f-email" name="email" type="email" required>
            </div>
            <div class="form-row">
              <label for="f-sector">Sector of interest</label>
              <select id="f-sector" name="sector">
                <option>Manufacturing</option>
                <option>Infrastructure &amp; Construction</option>
                <option>Information Technology / BPO</option>
                <option>Agribusiness</option>
                <option>Energy</option>
                <option>Financial Services</option>
                <option>Other</option>
              </select>
            </div>
            <button type="submit" class="btn btn-accent">Submit</button>
            <p class="form-hint">We'll email you as soon as registration opens.</p>
          </form>
        </div>
      </div>`;
    }

    const html = pageHero("Arangkada Forum", "The Arangkada Philippines Forum", "The country's premier annual platform for investment and reform dialogue.")
      + `<section class="section"><div class="container">${tabNav(tabs, current)}<div class="tab-panel">${body}</div></div></section>`;

    return html;
  }

  /* ---------------------------------------------------------------------
     View: Contact
     --------------------------------------------------------------------- */
  function viewContact() {
    const html = pageHero("Contact", "Get in touch", "Questions about membership, partnerships, or the reform agenda? We'd like to hear from you.")
      + `<section class="section"><div class="container two-col">
        <div class="reveal">
          <form id="contact-form" class="form" novalidate>
            <div class="form-row">
              <label for="c-name">Full name</label>
              <input id="c-name" name="name" type="text" required>
            </div>
            <div class="form-row">
              <label for="c-email">Email address</label>
              <input id="c-email" name="email" type="email" required>
            </div>
            <div class="form-row">
              <label for="c-subject">Subject</label>
              <input id="c-subject" name="subject" type="text" required>
            </div>
            <div class="form-row">
              <label for="c-message">Message</label>
              <textarea id="c-message" name="message" rows="5" required></textarea>
            </div>
            <button type="submit" class="btn btn-accent">Send message</button>
          </form>
        </div>
        <div class="reveal card-panel">
          <h3>Joint Foreign Chambers Secretariat</h3>
          <p>${esc(SITE.address)}</p>
          <p><strong>Email:</strong> <a href="mailto:${SITE.email}">${SITE.email}</a></p>
          <p><strong>Phone:</strong> ${esc(SITE.phone)}</p>
          <h3>Follow Arangkada</h3>
          <div class="social-row">${socialLinks()}</div>
        </div>
      </div></section>`;

    return html;
  }

  function socialLinks() {
    const icons = {
      facebook: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12",
      twitter: "M18.9 2H22l-7.2 8.2L23.3 22h-6.6l-5.2-6.8L5.5 22H2.4l7.7-8.8L1 2h6.8l4.7 6.2Zm-1.1 18h1.8L7.3 3.9H5.4Z",
      linkedin: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3ZM10 9h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4 0 4.8 2.6 4.8 6.1V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4Z",
      youtube: "M23 12s0-3.4-.4-5a3 3 0 0 0-2.1-2.1C18.9 4.5 12 4.5 12 4.5s-6.9 0-8.5.4A3 3 0 0 0 1.4 7C1 8.6 1 12 1 12s0 3.4.4 5a3 3 0 0 0 2.1 2.1c1.6.4 8.5.4 8.5.4s6.9 0 8.5-.4A3 3 0 0 0 22.6 17c.4-1.6.4-5 .4-5ZM9.8 15.5v-7l6 3.5Z"
    };
    return Object.keys(SITE.social).map((key) => `
      <a href="${SITE.social[key]}" target="_blank" rel="noopener" aria-label="${key}" class="social-icon">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="${icons[key]}"/></svg>
      </a>`).join("");
  }

  const FORM_MESSAGES = {
    "forum-form": "Thanks! We'll notify you when registration opens.",
    "contact-form": "Thanks for reaching out! We'll get back to you shortly.",
    "newsletter-form": "Thanks for subscribing!"
  };

  /* Delegated (bound once) so it works for any form rendered now or later. */
  document.addEventListener("submit", (evt) => {
    const form = evt.target;
    const message = FORM_MESSAGES[form.id];
    if (!message) return;
    evt.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    showToast(message, false);
    form.reset();
  });

  /* ---------------------------------------------------------------------
     404
     --------------------------------------------------------------------- */
  function notFoundBody() {
    return `<p>We couldn't find that page. Try one of the links in the navigation above.</p>`;
  }

  function view404() {
    return pageHero("Oops", "Page not found", "The page you're looking for doesn't exist.")
      + `<section class="section"><div class="container"><a class="btn btn-accent" href="#/" data-route="/">Back to home</a></div></section>`;
  }

  /* ---------------------------------------------------------------------
     Footer
     --------------------------------------------------------------------- */
  function renderFooter() {
    $footer.innerHTML = `
      <div class="container footer-grid">
        <div class="footer-brand">
          <div class="brand">
            ${brandMarkLarge()}
            <span class="brand-text"><strong>ARANGKADA</strong><small>PHILIPPINES</small></span>
          </div>
          <p>The major advocacy arm of the Joint Foreign Chambers (JFC) &mdash; bridging industries, government, and civil society since 2010.</p>
          <div class="social-row">${socialLinks()}</div>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="#/about/tapp" data-route="/about/tapp">The Arangkada Project</a></li>
            <li><a href="#/publications" data-route="/publications">Publications</a></li>
            <li><a href="#/programs/list" data-route="/programs/list">Programs &amp; Projects</a></li>
            <li><a href="#/forum/2026" data-route="/forum/2026">Arangkada Forum</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Member Chambers</h4>
          <ul>
            ${JFC_MEMBERS.slice(0, 5).map((m) => `<li>${m.abbr}</li>`).join("")}
          </ul>
        </div>
        <div class="footer-col footer-newsletter">
          <h4>Stay informed</h4>
          <p>Get Arangkada updates and event notices in your inbox.</p>
          <form id="newsletter-form" class="newsletter-form" novalidate>
            <input type="email" name="email" placeholder="Email address" required aria-label="Email address">
            <button type="submit" class="btn btn-outline-light">Subscribe</button>
          </form>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>&copy; ${SITE.year} Arangkada Philippines &mdash; Joint Foreign Chambers of the Philippines. All rights reserved.</p>
      </div>
    `;
  }

  /* ---------------------------------------------------------------------
     Router
     --------------------------------------------------------------------- */
  function parseHash() {
    let h = location.hash.replace(/^#/, "");
    if (!h) h = "/";
    return h.split("?")[0].replace(/\/$/, "") || "/";
  }

  function applyRoute() {
    const path = parseHash();
    const parts = path.split("/").filter(Boolean); // e.g. ["about","tapp"]

    let html;
    if (path === "/") html = viewHome();
    else if (parts[0] === "about") html = viewAbout(parts[1]);
    else if (parts[0] === "publications") html = viewPublications(parts[1]);
    else if (parts[0] === "programs") html = viewPrograms(parts[1]);
    else if (parts[0] === "forum") html = viewForum(parts[1]);
    else if (parts[0] === "contact") html = viewContact();
    else html = view404();

    $main.innerHTML = html;
    setActiveNav(path);
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    initReveal();
    document.title = buildTitle(path);

    if (typeof Hero3D !== "undefined") {
      if (path === "/") Hero3D.mount(document.getElementById("hero3d-stage"));
      else Hero3D.unmount();
    }
  }

  /* 3D card-flip transition between routes; skipped on first load and
     when the viewer prefers reduced motion. */
  let firstRender = true;
  let pendingExitTimer = null;
  let pendingCleanupTimer = null;

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function render() {
    if (pendingExitTimer) { clearTimeout(pendingExitTimer); pendingExitTimer = null; }
    if (pendingCleanupTimer) { clearTimeout(pendingCleanupTimer); pendingCleanupTimer = null; }
    closeMobileNav();

    if (firstRender || prefersReducedMotion()) {
      firstRender = false;
      applyRoute();
      return;
    }

    $main.classList.remove("page-enter", "page-enter-active");
    $main.classList.add("page-exit");

    pendingExitTimer = setTimeout(() => {
      pendingExitTimer = null;
      applyRoute();
      $main.classList.remove("page-exit");
      $main.classList.add("page-enter");
      void $main.offsetWidth; // force reflow so the enter transition runs
      requestAnimationFrame(() => {
        $main.classList.add("page-enter-active");
      });
      pendingCleanupTimer = setTimeout(() => {
        $main.classList.remove("page-enter", "page-enter-active");
        pendingCleanupTimer = null;
      }, 450);
    }, 200);
  }

  function buildTitle(path) {
    if (path === "/") return "Arangkada Philippines — Move Twice As Fast";
    const label = path.split("/").filter(Boolean).map((s) => s.replace(/-/g, " ")).join(" — ");
    return `${label.replace(/\b\w/g, (c) => c.toUpperCase())} — Arangkada Philippines`;
  }

  /* ---------------------------------------------------------------------
     Mobile nav + header scroll state
     --------------------------------------------------------------------- */
  function closeMobileNav() {
    $primaryNav.classList.remove("open");
    $navToggle.setAttribute("aria-expanded", "false");
  }

  $navToggle.addEventListener("click", () => {
    const open = $primaryNav.classList.toggle("open");
    $navToggle.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", (evt) => {
    if (evt.target.closest(".has-dropdown") && window.innerWidth <= 900) {
      const item = evt.target.closest(".has-dropdown");
      if (evt.target.closest(".nav-link")) {
        evt.preventDefault();
        item.classList.toggle("open");
      }
    }
  });

  window.addEventListener("scroll", () => {
    $header.classList.toggle("scrolled", window.scrollY > 10);
  }, { passive: true });

  /* ---------------------------------------------------------------------
     Reveal-on-scroll
     --------------------------------------------------------------------- */
  function initReveal() {
    const els = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
  }

  /* ---------------------------------------------------------------------
     Init
     --------------------------------------------------------------------- */
  renderNav();
  renderFooter();
  window.addEventListener("hashchange", render);
  render();
})();
