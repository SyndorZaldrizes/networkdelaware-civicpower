# From Civic Learning to Civic Power — Internal Site README

**Network Delaware · Civic Education Initiative · 2025**
**Research Fellow:** Nathan Sanchez
**Status:** Active development — Phase 2 complete, Phase 3 in progress

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Site Architecture](#2-site-architecture)
3. [File Structure](#3-file-structure)
4. [Page-by-Page Reference](#4-page-by-page-reference)
5. [How to Add / Update Content](#5-how-to-add--update-content)
6. [Uploading Deliverable PDFs](#6-uploading-deliverable-pdfs)
7. [Navigation & Footer (Shared Components)](#7-navigation--footer-shared-components)
8. [Styling System](#8-styling-system)
9. [Interactive Components](#9-interactive-components)
10. [Fellowship Deliverables Status](#10-fellowship-deliverables-status)
11. [Deployment (GitHub Pages)](#11-deployment-github-pages)
12. [Known Limitations & Planned Work](#12-known-limitations--planned-work)

---

## 1. Project Overview

This site is the public-facing home for the **From Civic Learning to Civic Power** fellowship — a statewide K–12 civic education initiative by Network Delaware. It serves four audiences simultaneously:

| Audience | Primary Goal | Key Pages |
|---|---|---|
| Youth / Students | Learn civic concepts, complete missions | `learn.html`, `index.html` |
| Educators & School Admins | Access toolkits, workshop guides | `resources.html` |
| Community Organizations | Access partnership tools, understand priority communities | `resources.html`, `communities.html` |
| Funders & Policy Audience | Understand framework, access policy docs | `framework.html`, `resources.html` |

The site is static HTML — no backend, no CMS, no build step. Everything runs directly in the browser. Deployment is via GitHub Pages.

---

## 2. Site Architecture

```
index.html          ← Homepage (hero, stats, cycle explorer, mission tracker)
learn.html          ← Civic Action Cycle explorer + vocabulary + power map builder
framework.html      ← Four Fronts, Eight Principles, Non-Negotiables, Cycle overview
communities.html    ← Six priority communities with barriers + framework responses
resources.html      ← All fellowship deliverables, filter system, citation library, partners
about.html          ← Fellowship structure, phases, team, institutional partners

styles/main.css     ← Universal stylesheet (all design tokens, layout, components)
scripts/main.js     ← Universal JavaScript (nav injection, footer injection, reveal, counters, tabs)

docs/               ← PDF deliverables folder (you create this — see Section 6)
```

**No page-specific JavaScript files.** Any page-specific JS is written inline at the bottom of each HTML file in a `<script>` tag. This keeps the codebase flat and auditable.

**No external JavaScript dependencies.** The site uses zero npm packages, no React, no bundler. Pure HTML/CSS/JS.

---

## 3. File Structure

After full setup (including the `docs/` folder you create), the repo should look like this:

```
networkdelaware-civicpower/
├── index.html
├── learn.html
├── framework.html
├── communities.html
├── resources.html
├── about.html
├── README.md
├── styles/
│   └── main.css
├── scripts/
│   └── main.js
└── docs/
    ├── policy-brief.pdf
    ├── standards-review.pdf
    ├── comparative-analysis.pdf
    ├── strategic-nonviolence.pdf
    ├── youth-civic-engagement.pdf
    ├── partnership-toolkit.pdf
    ├── workshop-framework.pdf
    └── citation-library.pdf
```

The `docs/` folder does **not** exist yet in the repo. You create it and upload PDFs to it. The site's Download buttons on `resources.html` are already pointing to these exact paths — once the files exist, the buttons work automatically.

---

## 4. Page-by-Page Reference

### `index.html` — Homepage

**Purpose:** Entry point. Establishes the initiative's argument, surfaces key statistics, previews the Four Fronts, and gives visitors two interactive entry points (Civic Action Cycle and Mission Tracker).

**Key sections:**
- **Hero** — Initiative title, sub-statement, hero buttons (Start Learning / Explore the Framework), stat ticker (4 statistics with animated counters)
- **Marquee** — Gold scrolling text strip with key framework terms (decorative, aria-hidden)
- **The Argument** — Two-column layout: left side is the problem statement, right side is three data blocks with CIRCLE statistics
- **Four Fronts** — 2×2 hover-invert card grid, each links to `framework.html#front1` etc.
- **Civic Action Cycle** — Click through all six stages, detail panel updates on the right
- **Stats Strip** — Four animated counters (5 states, 6 communities, 8 principles, 4 fronts)
- **Get Involved** — Three hover-invert cards linking to Learn, Resources, Framework
- **Civic Missions** — Checkable mission list with live progress bar

**Page-specific JS (inline at bottom):**
- `cycleData` array — the content for each of the six cycle stages
- Stage button click handler — updates `#cycle-title`, `#cycle-desc`, `#cycle-example`
- `toggleMission()` / `updateMissions()` — checkbox logic and progress bar update

---

### `learn.html` — Learn

**Purpose:** The educational core. Walks any visitor through the Civic Action Cycle in depth, defines the key vocabulary of the framework, and provides an interactive Power Map Builder tool.

**Key sections:**
- **Hero** — Teal-accented page header
- **Civic Action Cycle Explorer** — Left nav (6 stage buttons), right panel (badge, title, body, in-practice box, research question). All six panels are pre-written; clicking a stage button shows the corresponding panel
- **Vocabulary** — 9-card grid on black background covering: Civic Multiplier, Power Map, Action Civics, Power Literacy, Political Home, Strategic Nonviolence, Civic Efficacy, Supply-Side Gap, Deliberation
- **Power Map Builder** — Form with 5 fields (issue, decision makers, affected, allies, leverage). On submit, generates a formatted output block below the form

**Page-specific JS (inline at bottom):**
- Cycle nav button click handler — toggles `.active` on `.cycle-nav-btn` and `.cycle-panel` elements
- `buildMap()` — reads the five form fields, populates `#out-*` elements, makes `#pm-output` visible

---

### `framework.html` — Framework

**Purpose:** The policy-facing deep dive. Written for educators, administrators, and funders who need to understand the structural logic of the initiative before reading the policy brief.

**Key sections:**
- **Hero** — Dark background with grid pattern
- **Four Non-Negotiables Strip** — Red background, 4-cell grid with the filter questions
- **Four Fronts** — Full detail on all four fronts in a horizontal left-column (number/tag) + right-column (body + deliverables list) layout. Each front block links to `#front1`, `#front2`, etc. via anchor IDs on the section
- **Eight Guiding Principles** — 4×2 grid on black background, each card has number, name, and description
- **Civic Action Cycle Summary** — 6-column timeline (hover inverts each stage), links to `learn.html` for full detail

**No page-specific JS.** All interactivity is CSS hover only.

---

### `communities.html` — Priority Communities

**Purpose:** Establishes who the initiative is built for and why each community was identified. Written to be read by community organization staff, advocates, and funders — not just policy researchers.

**Key sections:**
- **Hero** — Dark background
- **Design Callout Strip** — Gold background with the core design principle statement
- **Six Community Blocks** — Each block: left column (black, icon + community name + why tag), right column (white, barriers paragraph + framework response box). Communities: Multilingual Families, Immigrant & Mixed-Status Families, Black and Brown Youth, Disabled Students, LGBTQIA+ Youth, Hispanic and Latino Communities
- **Structural Note** — Black background, 2×2 grid explaining the three criteria used to identify communities and the asset-based framing

**No page-specific JS.**

---

### `resources.html` — Resource Library

**Purpose:** The document hub. All fellowship deliverables are listed here with metadata and Download PDF buttons. Also contains the citation library summary and partner organization links.

**Key sections:**
- **Hero** — Dark background
- **Filter Bar** — Buttons: All / Policy / Research / Toolkit / Workshop / Analysis. Filters `doc-card` elements by `data-type` attribute
- **Documents** — Organized into four subsections by type. Each `doc-card` has: type tag, front tag, title, description, author/date metadata, and Download PDF button pointing to `docs/[filename].pdf`
- **Citation Library** — Black background, 2×2 grid with 5 sources per thematic category. Links to `docs/citation-library.pdf`
- **Partner Organizations** — 3×2 grid with six key Delaware and national partner organizations, each with a live external link

**Page-specific JS (inline at bottom):**
- `filterDocs(type, btn)` — toggles `.active` on filter buttons, shows/hides `.doc-card` elements and their parent `.docs-section` containers

**Pending documents** (marked "Coming Soon" on the page):
- Grant Narrative Language — Phase 3, not yet complete

---

### `about.html` — About

**Purpose:** Explains the fellowship structure, the research methodology, and who built the initiative. Entry point for anyone who wants context before reading the deliverables.

**Key sections:**
- **Hero** — Dark background
- **Mission Statement Strip** — Gold background, large display type with the core argument
- **What This Is** — Two-column: left is narrative prose, right is three sidebar blocks (the gap, what's different, measure of success)
- **Fellowship Phases** — Timeline layout: three phases with tag (phase name + weeks + theme), title, description, and deliverable tags
- **The Team** — 2-cell grid: Nathan Sanchez (white) and Network Delaware (black)
- **Institutional Partners** — Listed inline at the bottom of the people section

**No page-specific JS.**

---

## 5. How to Add / Update Content

### Editing text on any page

Open the relevant `.html` file and find the section. All copy is inline in the HTML — there is no CMS or templating layer. Search for a distinctive phrase from the text you want to change and edit directly.

### Adding a new document to Resources

1. Add your PDF to `docs/` (see Section 6 for naming)
2. Open `resources.html`
3. Copy an existing `<div class="doc-card">` block
4. Update: `data-type` attribute, type tag class (`tag-policy`, `tag-research`, etc.), front tag, title, description, metadata line, and the `href` on the Download button
5. Place it inside the correct `<div class="docs-section" data-section="[type]">` wrapper

If you're adding a new document type that doesn't fit an existing section, add a new `<div class="docs-section">` block following the same pattern, and add a new filter button to the filter bar.

### Adding a new nav link

Nav and footer are injected by `scripts/main.js`. Find the `NAV_HTML` and `FOOTER_HTML` constants in `main.js` and edit the link lists there. Changes apply to all pages automatically.

### Updating statistics

Statistics appear in two places:
- **Hero ticker** on `index.html` — find the `.ticker-cell` blocks and update the displayed text and the `data-count` attribute (used by the counter animation)
- **Stats Strip** on `index.html` — find the `.stat-n` spans with `data-count` attributes

The `data-count` attribute drives the animated counter. Set it to the numeric value you want the counter to land on. The `data-suffix` and `data-prefix` attributes add non-numeric characters (e.g., `data-suffix="%"`, `data-prefix="$"`).

---

## 6. Uploading Deliverable PDFs

### Step-by-step

1. **Export each deliverable from Google Docs:** File → Download → PDF Document (.pdf)
2. **Rename each file exactly as listed below** — the site's Download buttons already point to these exact filenames
3. **Create a `docs/` folder** at the root of the repo on GitHub (drag-and-drop upload works, or use the GitHub web UI's "Add file" button)
4. **Upload each PDF** into `docs/`

### Required filenames

| Document | Filename | Status |
|---|---|---|
| Delaware K–12 Civic Education Policy Brief | `policy-brief.pdf` | ✅ Ready to upload |
| Delaware Civic Education Standards Review | `standards-review.pdf` | ✅ Ready to upload |
| Comparative State Analysis | `comparative-analysis.pdf` | ✅ Ready to upload |
| Strategic Nonviolence in Civic Education | `strategic-nonviolence.pdf` | ✅ Ready to upload |
| Youth Civic Engagement Best Practices Memo | `youth-civic-engagement.pdf` | ✅ Ready to upload |
| School and Community Partnership Toolkit | `partnership-toolkit.pdf` | ✅ Ready to upload |
| Workshop Implementation Framework | `workshop-framework.pdf` | ✅ Ready to upload |
| Citation Library | `citation-library.pdf` | ✅ Ready to upload |
| Grant Narrative Language | `grant-narrative.pdf` | ⏳ Phase 3 — not yet complete |

### Why PDFs over Google Docs links

Google Docs links depend on permission settings that can change, accounts that can be deactivated, and sharing configurations that expire. PDFs in the repo are permanent, work offline, and will be accessible years from now regardless of what happens to any Google account. They are also downloadable for offline reference by educators and partners who may not have reliable internet access at community meetings.

### After uploading

No code changes are needed. The `href` attributes on all Download buttons already point to the correct `docs/[filename].pdf` paths. Once the files exist in the repo, the buttons work.

If GitHub Pages caching causes a delay, hard refresh (`Ctrl+Shift+R` / `Cmd+Shift+R`) on the resources page to confirm.

---

## 7. Navigation & Footer (Shared Components)

Both the navigation bar and the footer are **injected by JavaScript** — they are not written into individual HTML files. This means you edit them in one place and changes propagate to all pages automatically.

**Location:** `scripts/main.js` — the `NAV_HTML` and `FOOTER_HTML` template literal constants near the top of the file.

### Navigation structure

```
[Network Delaware wordmark] → [Home] [Learn] [Framework] [Communities] [Resources] [About] [Take Action →]
```

- **Take Action** is styled as a CTA button (gold background) and links to `index.html#act`
- Active page detection is automatic — `main.js` reads `window.location.pathname` and sets `aria-current="page"` on the matching nav link, which applies the gold color style
- Mobile hamburger menu is handled by `initHamburger()` in `main.js` — no changes needed

### Footer structure

Three columns: brand statement (left), Explore links (center), Resources links (right). Bottom bar: copyright + fellow credit.

---

## 8. Styling System

All styles live in `styles/main.css`. The file is organized into clearly labeled sections.

### Design tokens (CSS custom properties)

```css
--black:      #0a0a08    /* Primary background for hero / dark sections */
--white:      #f5f0e8    /* Warm off-white — not pure white */
--gold:       #d4a017    /* Primary accent — buttons, labels, borders */
--gold-lt:    #f0c040    /* Lighter gold for dark backgrounds */
--gold-dim:   rgba(212,160,23,0.15)   /* Gold tint for hover states */
--red:        #c0392b    /* Accent for data points, Non-Negotiables strip */
--paper:      #f5f0e8    /* Page background */
--paper-dk:   #ede7d8    /* Slightly darker paper — alternating sections */
--border:     rgba(212,160,23,0.3)    /* Standard border */
--border-str: rgba(212,160,23,0.65)   /* Stronger border */

--font-display: 'Bebas Neue'           /* All-caps display type — headings, stats */
--font-body:    'Syne'                 /* Body copy, UI labels */
--font-serif:   'Libre Baskerville'    /* Pull quotes, hero sub-text */
--font-mono:    'Syne Mono'            /* Labels, tags, metadata, section markers */
```

**Do not hardcode colors in page-specific styles.** Always use the token variables. This ensures any future color change can be made in one place.

### Section pattern

Most content sections alternate between `var(--paper)`, `var(--paper-dk)`, `var(--black)`, and `var(--gold)` backgrounds to create visual rhythm without needing dividers. The pattern across the homepage is: black (hero) → gold (marquee) → paper (argument right col) → paper (fronts) → black (cycle) → gold (stats) → paper-dk (involved) → paper (missions).

### Responsive breakpoints

- `max-width: 900px` — collapses multi-column grids to single column, shows hamburger menu
- `max-width: 600px` — reduces padding, collapses remaining two-column layouts

These are defined at the bottom of `main.css` in the `/* ── RESPONSIVE ──` section, and also in `<style>` blocks within individual pages for page-specific layout adjustments.

### Adding page-specific styles

Put them in a `<style>` block in the `<head>` of the relevant page. Do not add page-specific styles to `main.css`. The pattern throughout the codebase is: `main.css` handles universal components (nav, footer, buttons, cards, utilities), page `<style>` blocks handle layout and unique components for that page.

---

## 9. Interactive Components

### Scroll Reveal (`.reveal` / `.reveal-left`)

Add class `reveal` to any element to make it fade + slide up on scroll into view. Add `reveal-left` for a horizontal slide. Stagger multiple elements with `reveal-delay-1` through `reveal-delay-4` (adds 100ms–400ms delay). Handled by `initReveal()` in `main.js` using `IntersectionObserver`.

```html
<div class="reveal">Fades in on scroll</div>
<div class="reveal reveal-delay-2">Fades in 200ms later</div>
```

### Animated Counters (`data-count`)

Any element with `data-count` will animate from 0 to the target value when scrolled into view. Supports `data-prefix` and `data-suffix` for currency symbols, percent signs, etc. Handled by `initCounters()` in `main.js`.

```html
<span data-count="27" data-suffix="%">27%</span>
<span data-count="1100" data-prefix="$">$1,100</span>
```

The element's text content is used as a fallback before JavaScript runs (for users with JS disabled or on slow connections).

### Civic Action Cycle (index.html)

Six `<button class="cycle-step-btn">` elements, each with a `data-step` attribute (0–5). Click handler reads `cycleData[i]` and updates three elements: `#cycle-title`, `#cycle-desc`, `#cycle-example`. The `cycleData` array is defined inline in `index.html`.

### Civic Action Cycle Explorer (learn.html)

Six `.cycle-nav-btn` buttons, each with a `data-panel` attribute (0–5). Six `.cycle-panel` divs with ids `panel-0` through `panel-5`. Click handler toggles `.active` class. Content is fully pre-written in the HTML — no data array needed.

### Power Map Builder (learn.html)

Form with five `<textarea>`/`<input>` fields. `buildMap()` reads the values, populates five `#out-*` elements, and makes `#pm-output` visible. No data is saved anywhere — the map only exists in the browser session. Future enhancement: add a "Print / Save as PDF" button using `window.print()`.

### Mission Tracker (index.html)

Each `.mission-item` div has an `onclick="toggleMission(this)"` handler. Clicking toggles `.done` on the `.mission-check` div inside it. `updateMissions()` counts done items, updates `#mission-count` text, and sets `#mission-bar` width. No persistence — state resets on page reload. Future enhancement: `localStorage` to persist between sessions.

### Document Filter (resources.html)

`filterDocs(type, btn)` hides/shows `.doc-card` elements by their `data-type` attribute. Also hides parent `.docs-section` containers when all their cards are hidden to prevent orphaned section headers. When type is `'all'`, everything is shown.

---

## 10. Fellowship Deliverables Status

| Deliverable | Phase | Status | PDF Ready |
|---|---|---|---|
| Delaware Civic Education Standards Review | 1 | ✅ Complete | Yes |
| Comparative State Analysis | 1 | ✅ Complete | Yes |
| Youth Civic Engagement Best Practices Memo | 2 | ✅ Complete | Yes |
| Strategic Nonviolence Research Brief | 2 | ✅ Complete | Yes |
| School and Community Partnership Toolkit | 2 | ✅ Complete | Yes |
| Workshop Implementation Framework | 2 | ✅ Complete | Yes |
| Citation Library | 2 | ✅ Complete | Yes |
| K–12 Civic Education Policy Brief | 3 | ✅ Complete | Yes |
| Grant Narrative Language | 3 | ⏳ In Progress | No |
| Summary Presentation Deck | 3 | ⏳ In Progress | No |

The Grant Narrative card on `resources.html` is already marked "Coming Soon." When it's ready: export as PDF, name it `grant-narrative.pdf`, drop it in `docs/`, then update the card in `resources.html` to replace the pending state with a live Download button.

---

## 11. Deployment (GitHub Pages)

The site is hosted on GitHub Pages from the main branch. No build step. GitHub Pages serves the files exactly as they are in the repo.

### Setup (if not already configured)

1. Go to the repo on GitHub
2. Settings → Pages → Source: Deploy from a branch → Branch: `main` → Folder: `/ (root)`
3. Save. The site will be live at `https://[username].github.io/networkdelaware-civicpower/` within a few minutes

### Pushing updates

Standard Git workflow. There is no CI/CD pipeline — every push to `main` deploys automatically via GitHub Pages.

```bash
git add .
git commit -m "Add policy brief PDF + update resources page"
git push origin main
```

### For a better workflow: Claude Code

Instead of pasting code back and forth, install Claude Code to work directly inside the repo:

```bash
npm install -g @anthropic-ai/claude-code
cd networkdelaware-civicpower
claude
```

Claude Code reads the actual files in the repo, makes targeted edits, and you push from the same terminal. Significantly faster for iterative changes.

---

## 12. Known Limitations & Planned Work

### Current limitations

- **Mission Tracker does not persist** — state resets on page reload. Can be fixed with `localStorage` (~10 lines of JS in the existing handler)
- **Power Map Builder does not save** — output only exists in the browser session. A print/export button would be useful
- **No search** — the resources page uses a type filter but has no full-text search across documents
- **No analytics** — no visitor tracking is currently implemented

### Planned pages (not yet built)

- **Youth Civic Engagement page** — a standalone page for youth-specific content and activities, mentioned as a future addition. Will build when content direction is confirmed
- **Delaware Student Legislature page** — the voluntary side initiative developed through the fellowship. Noted in `about.html` but no dedicated page yet

### Content that needs updating when Phase 3 completes

- `resources.html` — Grant Narrative card: replace "Coming Soon" with live Download button once PDF is ready
- `about.html` — Fellowship Phases section: Phase 3 deliverables are listed but should be confirmed once finalized
- `resources.html` — Summary Presentation Deck: not yet listed as a document card; add when complete

### Font loading

The site loads four Google Fonts families (Bebas Neue, Syne, Syne Mono, Libre Baskerville) from `@import` in `main.css`. On slow connections, there may be a brief flash of unstyled text. This is acceptable for a fellowship site but can be mitigated by adding `font-display: swap` or preloading the font URLs in `<head>`.

---

*Last updated: May 2025 — Nathan Sanchez, Network Delaware Research Fellowship*