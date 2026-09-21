/* ==========================================================================
   Arangkada Philippines — content data
   Edit this file to update site content; no HTML changes required.
   ========================================================================== */

const SITE = {
  name: "Arangkada Philippines",
  tagline: "Move Twice As Fast",
  year: new Date().getFullYear(),
  email: "info@arangkadaphilippines.com",
  phone: "+63 2 8845 1324",
  address: "Joint Foreign Chambers of the Philippines, 3rd Floor, PDCP Bank Centre, Corner V.A. Rufino cor. L.P. Leviste Streets, Salcedo Village, Makati City, Metro Manila, Philippines",
  social: {
    facebook: "https://www.facebook.com/ArangkadaPH",
    twitter: "https://twitter.com/ArangkadaPH",
    linkedin: "https://www.linkedin.com/company/arangkada-philippines",
    youtube: "https://www.youtube.com/@ArangkadaPhilippines"
  }
};

const NAV = [
  { label: "Home", route: "/" },
  {
    label: "About us", route: "/about",
    children: [
      { label: "The Arangkada Project (TAPP)", route: "/about/tapp" },
      { label: "The Joint Foreign Chambers", route: "/about/jfc" },
      { label: "The Arangkada Internship Program", route: "/about/internship" },
      { label: "Our Team", route: "/about/team" }
    ]
  },
  {
    label: "Publications", route: "/publications",
    children: [
      { label: "Statements &amp; Press Releases", route: "/publications/statements" },
      { label: "Multimedia News", route: "/publications/multimedia" },
      { label: "Arangkada Newsclips", route: "/publications/newsclips" },
      { label: "Legislative Priorities", route: "/publications/legislative" }
    ]
  },
  {
    label: "Programs &amp; Projects", route: "/programs",
    children: [
      { label: "List of Programs", route: "/programs/list" },
      { label: "Calendar of Events", route: "/programs/calendar" }
    ]
  },
  {
    label: "Arangkada Forum", route: "/forum",
    children: [
      { label: "2026 Arangkada — Registration", route: "/forum/2026" },
      { label: "2025 Arangkada Forum: Investment", route: "/forum/2025" }
    ]
  }
];

/* Joint Foreign Chambers member organizations */
const JFC_MEMBERS = [
  { abbr: "AmCham", name: "American Chamber of Commerce of the Philippines" },
  { abbr: "ANZCHAM", name: "Australian-New Zealand Chamber of Commerce (Philippines)" },
  { abbr: "CanCham", name: "Canadian Chamber of Commerce of the Philippines" },
  { abbr: "ECCP", name: "European Chamber of Commerce of the Philippines" },
  { abbr: "JCCIPI", name: "Japanese Chamber of Commerce and Industry of the Philippines" },
  { abbr: "KCCP", name: "Korean Chamber of Commerce Philippines" },
  { abbr: "PAMURI", name: "Philippine Association of Multinational Companies Regional Headquarters" }
];

/* Key facts used across the site */
const STATS = [
  { value: "2010", label: "Year Arangkada was launched" },
  { value: "7", label: "Founding chambers of the JFC" },
  { value: "2,000+", label: "Member companies represented" },
  { value: "15", label: "Years of policy advocacy" },
  { value: "6M+", label: "Website pageviews since 2011" }
];

/* Flagship publications */
const PUBLICATIONS = [
  {
    id: "pub-2010",
    year: 2010,
    category: "reports",
    title: "Arangkada Philippines 2010: A Business Perspective",
    subtitle: "Move Twice As Fast!",
    summary: "The founding policy document identifying seven priority sectors and hundreds of recommendations to accelerate investment and job creation in the Philippines.",
    accent: "#1f3a63"
  },
  {
    id: "pub-2017",
    year: 2017,
    category: "reports",
    title: "Arangkada Philippines: Implementing the 10-Point Agenda",
    subtitle: "September 2017 update",
    summary: "A progress report tracking reform implementation against a refreshed 10-point legislative and policy agenda.",
    accent: "#1f9e8f"
  },
  {
    id: "pub-rrr",
    year: 2021,
    category: "reports",
    title: "Reform, Rebuild, Recover",
    subtitle: "Post-pandemic recovery agenda",
    summary: "Recommendations to help the Philippine economy rebuild and recover competitiveness in the wake of the COVID-19 pandemic.",
    accent: "#2f6fb0"
  },
  {
    id: "pub-reform-in-motion",
    year: 2025,
    category: "reports",
    title: "Reform in Motion: 15 Years of Arangkada and the Road Ahead",
    subtitle: "Updating the recommendations of Arangkada Philippines 2010",
    summary: "A fifteen-year retrospective revisiting the original Business Perspective recommendations and charting priorities for the next decade.",
    accent: "#7a4fb5"
  }
];

/* Statements & press releases */
const STATEMENTS = [
  {
    id: "st-sona-2026",
    date: "2026-07-27",
    category: "statements",
    title: "JFC Statement on the 2026 State of the Nation Address",
    summary: "The Joint Foreign Chambers welcomes the administration's continued commitment to economic reform and infrastructure investment outlined in the President's address."
  },
  {
    id: "st-forum-push",
    date: "2025-09-10",
    category: "statements",
    title: "Arangkada Forum to Push Faster Reforms for PH Competitiveness",
    summary: "Ahead of its annual forum, the JFC calls for accelerated action on remaining items in its legislative and policy reform agenda."
  },
  {
    id: "st-tax-incentives",
    date: "2025-03-18",
    category: "statements",
    title: "JFC Position Paper on Tax and Investment Predictability",
    summary: "A position paper urging consistent, predictable implementation of fiscal incentive rules to sustain investor confidence."
  },
  {
    id: "st-ease-of-business",
    date: "2024-11-05",
    category: "statements",
    title: "Statement on Ease of Doing Business Implementation",
    summary: "The JFC recognizes progress on permit processing timelines while flagging areas that still require streamlining at the local government level."
  }
];

const MULTIMEDIA = [
  { id: "mm-1", date: "2025-10-02", category: "multimedia", title: "Highlights: The 14th Arangkada Philippines Forum", summary: "Video recap of forum plenaries on investment, infrastructure, and workforce competitiveness." },
  { id: "mm-2", date: "2025-06-14", category: "multimedia", title: "Panel Discussion: Digitalizing Trade Facilitation", summary: "Recorded panel featuring customs officials and logistics executives on paperless trade." },
  { id: "mm-3", date: "2024-09-20", category: "multimedia", title: "Explainer: What the CREATE MORE Act Means for Investors", summary: "A short explainer video breaking down fiscal incentive reforms for foreign investors." }
];

const NEWSCLIPS = [
  { id: "nc-1", date: "2025-09-13", category: "newsclips", title: "Arangkada advocacy", source: "Manila Bulletin", summary: "Coverage of the JFC's continued push for regulatory reform ahead of the annual forum." },
  { id: "nc-2", date: "2025-07-29", category: "newsclips", title: "Foreign chambers laud infrastructure push", source: "BusinessWorld", summary: "Business press coverage of JFC reactions to the government's infrastructure agenda." },
  { id: "nc-3", date: "2024-12-03", category: "newsclips", title: "JFC urges swift passage of remaining reform bills", source: "Philippine Star", summary: "News coverage of JFC engagement with Congress on pending economic legislation." }
];

/* Legislative & policy priority agenda */
const LEGISLATIVE_PRIORITIES = [
  { title: "Tax & Fiscal Incentive Predictability", note: "Consistent, timely implementation of incentive rules following the CREATE and CREATE MORE reforms." },
  { title: "Ease of Doing Business", note: "Faster permit processing and expanded digital government transactions nationwide." },
  { title: "Infrastructure & Public-Private Partnerships", note: "A stable, transparent PPP framework to sustain the “Build Better More” pipeline." },
  { title: "Foreign Equity & Market Access", note: "Full implementation of the amended Public Service Act, Retail Trade Liberalization Act, and Foreign Investment Act." },
  { title: "Land Administration & Property Rights", note: "Modernized land titling and streamlined rules on condominium and long-term lease ownership." },
  { title: "Trade Facilitation & Customs Modernization", note: "Paperless, single-window customs processing to cut trade transaction costs." },
  { title: "Energy Security & Renewables", note: "Full foreign participation in renewable energy development and grid modernization." },
  { title: "Agriculture Modernization", note: "Continued implementation of rice tariffication and support for farm productivity programs." },
  { title: "Digital Economy & Data Governance", note: "Clear rules for e-commerce, digital payments, and cross-border data flows." },
  { title: "Labor Market Competitiveness", note: "Skills training and labor policies aligned with emerging industries." },
  { title: "Human Capital: Health & Education", note: "Sustained investment in universal health care and workforce-ready education." },
  { title: "Anti-Corruption & Judicial Efficiency", note: "Faster commercial dispute resolution and stronger anti-red-tape enforcement." }
];

/* Programs & projects */
const PROGRAMS = [
  {
    id: "prog-legislative-tracking",
    title: "Legislative Tracking & Policy Briefs",
    summary: "Ongoing monitoring of priority bills in Congress, with regular policy briefs shared with member chambers and government partners."
  },
  {
    id: "prog-roundtables",
    title: "Sector Roundtable Dialogues",
    summary: "Recurring roundtables that bring together regulators, industry associations, and investors to unblock sector-specific reform issues."
  },
  {
    id: "prog-internship",
    title: "Arangkada Internship Program",
    summary: "A structured internship placing university students within the JFC secretariat to support policy research and advocacy communications."
  },
  {
    id: "prog-forum",
    title: "Arangkada Philippines Forum",
    summary: "The flagship annual forum convening business leaders, diplomats, and government officials to discuss the reform agenda."
  },
  {
    id: "prog-regional",
    title: "Regional Investment Missions",
    summary: "Coordinated missions and briefings that connect prospective investors with regional economic zones and local governments."
  }
];

/* Calendar of events — ISO dates */
const EVENTS = [
  { id: "ev-1", date: "2026-02-11", title: "JFC Roundtable: Ease of Doing Business", location: "Makati City", type: "Roundtable" },
  { id: "ev-2", date: "2026-03-05", title: "Legislative Priorities Briefing for Congress Staff", location: "Pasay City", type: "Briefing" },
  { id: "ev-3", date: "2026-04-22", title: "Sector Dialogue: Renewable Energy Investment", location: "Taguig City", type: "Roundtable" },
  { id: "ev-4", date: "2026-06-17", title: "Arangkada Internship Program — Orientation Day", location: "Makati City", type: "Program" },
  { id: "ev-5", date: "2026-09-16", title: "Pre-Forum Media Briefing", location: "Makati City", type: "Media" },
  { id: "ev-6", date: "2026-10-14", title: "The 15th Arangkada Philippines Forum", location: "Manila", type: "Forum" }
];

/* Forum info */
const FORUM = {
  current: {
    edition: "15th",
    year: 2026,
    theme: "Sustaining Reform Momentum",
    date: "October 14, 2026",
    venue: "Manila, Philippines",
    registrationNote: "Registration for the 2026 Arangkada Philippines Forum will open in the months ahead of the event. Submit your details below and we will notify you the moment registration goes live."
  },
  previous: {
    edition: "14th",
    year: 2025,
    theme: "Investment",
    summary: "The 14th Arangkada Philippines Forum convened business leaders, diplomats, and senior government officials to discuss strategies for sustaining investment momentum, covering infrastructure financing, fiscal incentive reform, and workforce competitiveness.",
    highlights: [
      "Keynote dialogue with senior economic officials on the investment climate",
      "Panel on financing the country's infrastructure pipeline",
      "Sector spotlight on manufacturing and semiconductor investment",
      "Release of the “Reform in Motion” 15-year retrospective report"
    ]
  }
};

/* Team — roles only; add real names/photos when available */
const TEAM = [
  { role: "Executive Director", desc: "Leads the Arangkada Project secretariat and overall advocacy strategy on behalf of the JFC." },
  { role: "Deputy Executive Director", desc: "Oversees policy research and coordinates legislative tracking across priority reform areas." },
  { role: "Policy & Advocacy Manager", desc: "Develops position papers and coordinates roundtable dialogues with regulators and industry groups." },
  { role: "Communications Manager", desc: "Manages publications, press relations, and the Arangkada Philippines Forum communications." },
  { role: "Programs Coordinator", desc: "Runs the Arangkada Internship Program and day-to-day program logistics." },
  { role: "Research Associate", desc: "Supports data analysis and drafting for Arangkada policy briefs and reports." }
];

const TAPP_CONTENT = {
  title: "The Arangkada Project (TAPP)",
  paragraphs: [
    "The Arangkada Philippines Project (TAPP) is the flagship advocacy initiative of the Joint Foreign Chambers of the Philippines (JFC), launched in 2010 to increase investment and employment in the country.",
    "Its founding policy document, “Arangkada Philippines 2010: A Business Perspective,” identified seven priority sectors and put forward hundreds of recommendations for government action &mdash; giving the project its name, “arangkada,” a Filipino term meaning to move or shift into gear.",
    "Since then, TAPP has tracked legislative and regulatory reform progress, published regular updates including the 10-point agenda (2017) and the 15-year retrospective “Reform in Motion” (2025), and convened the annual Arangkada Philippines Forum as a platform for dialogue between business, government, and civil society."
  ]
};

const JFC_CONTENT = {
  title: "The Joint Foreign Chambers of the Philippines (JFC)",
  paragraphs: [
    "The Joint Foreign Chambers of the Philippines (JFC) is a coalition of leading foreign chambers of commerce and business associations operating in the country, representing more than 2,000 member companies.",
    "The JFC supports and promotes open international trade, increased foreign investment, and improved conditions for doing business &mdash; benefiting both the Philippines and the home countries of its member chambers.",
    "Through Arangkada, the JFC advocates its legislative and policy reform agenda together with leading Philippine business groups, engaging Congress, the Executive branch, and regulators through roundtables, policy briefs, and public statements."
  ]
};

const INTERNSHIP_CONTENT = {
  title: "The Arangkada Internship Program",
  paragraphs: [
    "The Arangkada Internship Program offers university students hands-on experience in policy research, advocacy communications, and event coordination within the JFC secretariat.",
    "Interns support the drafting of policy briefs, help track legislative developments, and assist in organizing the Arangkada Philippines Forum and roundtable dialogues.",
    "The program runs multiple intakes per year and is open to undergraduate and graduate students with an interest in economics, public policy, political science, or communications."
  ]
};
