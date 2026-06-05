# From Civic Learning to Civic Power — Internal Site README

**Network Delaware · Civic Education Initiative · 2026**  
**Research Fellows:** Nathan Sanchez & Constanza Perez  
**Status:** Active — fellowship research complete; implementation and funding phase in progress  
**Live site:** https://syndorzaldrizes.github.io/networkdelaware-civicpower/

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

This site is the public-facing home for the Network Delaware **Civic Power** fellowship — a statewide K–12 civic education initiative. It serves four audiences simultaneously:

| Audience | Primary Goal | Key Pages |
|---|---|---|
| Youth / Students | Understand the framework and civic action cycle | `index.html`, `framework.html` |
| Educators & School Admins | Access toolkits, workshop guides | `resources.html` |
| Community Organizations | Access partnership tools, understand priority communities | `resources.html`, `communities.html` |
| Funders & Policy Audience | Understand framework, access policy docs | `framework.html`, `resources.html`, `presentation.html` |

The site is static HTML — no backend, no CMS, no build step. Everything runs directly in the browser. Deployment is via GitHub Pages from the `main` branch.

---

## 2. Site Architecture

```
index.html            ← Homepage (hero, stats, cycle explorer, get involved)
framework.html        ← Four Fronts, Eight Principles, Non-Negotiables, Cycle overview
communities.html      ← Six priority communities with barriers + framework responses
program.html          ← Six-session arc, leadership pipeline, evidence base, contact
resources.html        ← All fellowship deliverables, filter system, citation library
about.html            ← Fellowship structure, phases, team, institutional partners
presentation.html     ← Summary presentation (replaces standalone slide deck)
initiative-overview.html ← Print-to-PDF one-pager for distribution

styles/main.css       ← Universal stylesheet (all design tokens, layout, components)
scripts/main.js       ← Universal JS (nav injection, footer injection, reveal, counters, tabs)

docs/                 ← PDF deliverables folder (see Section 6)
```

**Note: `learn.html` was removed.** Its content — the Civic Action Cycle deep dive, vocabulary definitions, and Power Map Builder — was redistributed. The Civic Action Cycle interactive is on `index.html`. Framework depth is on `framework.html`. If this content needs a dedicated page in a future iteration, rebuild from those sources rather than from memory.

**No page-specific JavaScript files.** Any page-specific JS is written inline at the bottom of each HTML file in a `<script>` tag. This keeps the codebase flat and auditable.

**No external JavaScript dependencies.** Zero npm packages, no React, no bundler. Pure HTML/CSS/JS.

---

## 3. File Structure

Current repo structure:

```
networkdelaware-civicpower/
├── index.html
├── framework.html
├── communities.html
├── program.html
├── resources.html
├── about.html
├── presentation.html
├── initiative-overview.html
├── README.md
├── styles/
│   └── main.css
├── scripts/
│   └── main.js
└── docs/
    ├── policy-brief.pdf
    ├── policy-brief-perez.pdf
    ├── standards-review.pdf
    ├── standards-review-perez.pdf
    ├── comparative-analysis.pdf
    ├── comparative-analysis-perez.pdf
    ├── strategic-nonviolence.pdf
    ├── strategic-nonviolence-perez.pdf
    ├── youth-civic-engagement.pdf
    ├── partnership-toolkit.pdf
    ├── partnership-toolkit-perez.pdf
    ├── workshop-framework.pdf
    ├── workshop-framework-perez.pdf
    ├── grant_narrative_writing.pdf
    ├── grant-narrative-perez.pdf
    ├── annotated_bibliography.pdf
    ├── citation-library-perez.pdf
    └── initiative-overview.pdf
```

All 18 PDFs listed above are present in `docs/` and verified against `resources.html` download links.

---

## 4. Page-by-Page Reference

### `index.html` — Homepage

**Purpose:** Entry point. Establishes the initiative's argument, surfaces key statistics, previews the Four Fronts, and gives visitors entry points into the framework and communities.

**Key sections:**
- **Hero** — Initiative title, sub-statement, two CTA buttons (Explore the Framework → `framework.html`, See the Communities → `communities.html`), stat ticker (4 statistics with animated counters)
- **Marquee** — Gold scrolling text strip with key framework terms (decorative, aria-hidden)
- **The Argument** — Two-column layout: problem statement left, three CIRCLE data blocks right
- **Four Fronts** — 2×2 hover-invert card grid, each links to `framework.html#front1` through `#front4`
- **Civic Action Cycle** — Click through all six stages; detail panel updates on the right
- **Stats Strip** — Four animated counters (states analyzed, priority communities, guiding principles, strategic fronts)
- **Get Involved** — Three cards linking to Framework, Resources, and Program

**Page-specific JS (inline at bottom):**
- `cycleData` array — content for each of the six cycle stages
- Stage button click handler — updates `#cycle-title`, `#cycle-desc`, `#cycle-example`

---

### `framework.html` — The Framework

**Purpose:** Policy-facing deep dive. Written for educators, administrators, and funders who need the structural logic before reading the policy brief.

**Key sections:**
- **Hero** — Dark background with grid pattern
- **Four Non-Negotiables Strip** — Red background, 4-cell grid with the filter questions
- **Four Fronts** — Full detail on all four fronts; each section has anchor IDs `#front1` through `#front4`
- **Eight Guiding Principles** — 4×2 grid on black background
- **Civic Action Cycle Summary** — 6-column timeline (hover inverts each stage)

**No page-specific JS.** All interactivity is CSS hover only.

---

### `communities.html` — Priority Communities

**Purpose:** Establishes who the initiative is built for and why. Written for community organization staff, advocates, and funders.

**Key sections:**
- **Hero** — Dark background
- **Design Callout Strip** — Gold background with core design principle statement
- **Six Community Blocks** — Each: left column (black, community name + why tag), right column (barriers + framework response). Communities: Multilingual Families, Immigrant & Mixed-Status Families, Black and Brown Youth, Disabled Students, LGBTQIA+ Youth, Hispanic and Latino Communities

**Note:** The expanded 14-community analysis exists as a fellowship document (`docs/`) but the page currently reflects the original six. Update when the pilot accountability structure is finalized.

---

### `program.html` — The Program

**Purpose:** Operational detail for school and community partners evaluating a Year 1 pilot. Most text-dense page on the site.

**Key sections:**
- **Hero** — Program overview
- **Six-Session Arc** — Accordion showing each session's activities and between-session work
- **Three-Tier Leadership Pipeline** — How participants progress from cohort members to co-facilitators
- **Evidence Base** — Five key research findings driving program design; links to `resources.html`
- **Contact / Partner With Us** — Form section (`id="contact"`) — this is the nav CTA destination

**Page-specific JS (inline at bottom):**
- Accordion logic (duplicates and extends the `initAccordion()` in `main.js` for program-specific panels)

---

### `resources.html` — Resource Library

**Purpose:** Central access point for all fellowship deliverables, PDFs, partner links, and the citation library.

**Key sections:**
- **Hero** — Library overview
- **Presentation Block** — Links to `presentation.html`. Button is styled disabled until the file is live; once `presentation.html` exists, remove the `pointer-events:none` and `opacity:0.5` inline styles and the `aria-disabled` attribute
- **Document Cards** — Filterable by type (All, Policy, Research, Toolkit, Framework); each card has Sanchez PDF and Perez PDF buttons. One Perez PDF (Youth Civic Engagement Best Practices Memo) is still pending — button reads "Coming Soon"
- **Partner Organizations** — External links to CIRCLE, DCCE, La Esperanza, Equality Delaware, Generation Citizen
- **Citation Library** — Full annotated bibliography access; both Sanchez and Perez versions linked

**Page-specific JS (inline):**
- `filterDocs(type, btn)` — shows/hides `.doc-card` elements by `data-type`; also hides parent `.docs-section` when all cards within are hidden

---

### `about.html` — About the Fellowship

**Purpose:** Explains the fellowship structure, Network Delaware's role, and the research team.

**Key sections:**
- **Hero** — Fellowship context
- **Fellowship Phases** — Three-phase arc (Research → Analysis → Implementation)
- **Team** — Nathan Sanchez and Constanza Perez bios and roles
- **Institutional Partners** — Organizations cited throughout the research

---

### `presentation.html` — Summary Presentation

**Purpose:** Replaces a standalone PowerPoint deck. Serves as the summary document for school leadership, policy audiences, and funding partners. This page is the destination for the "View Presentation" button on `resources.html`.

**Status:** File must exist in the repo root for the `resources.html` button to work. Once live, update `resources.html` to remove the disabled state from the button (remove `pointer-events:none`, `opacity:0.5`, and `aria-disabled="true"`).

---

### `initiative-overview.html` — One-Pager

**Purpose:** Print-to-PDF one-pager for distribution at meetings, to funders, and to legislators. A companion editable `.docx` version exists separately. This page is not in the main nav.

---

## 5. How to Add / Update Content

### Updating text on any page

Open the relevant `.html` file. Text is in standard HTML — paragraphs in `<p>`, headings in `<h2>`/`<h3>`, lists in `<ul>/<li>`. No templating language.

### Adding a new section to an existing page

Copy the nearest similar section block as a starting pattern. Every content section follows the same wrapper:

```html
<section class="[color-class] section-pad" aria-labelledby="[unique-id]">
  <div class="container">
    <!-- content here -->
  </div>
</section>
```

Background color classes: `class="section-pad"` (paper/light), add `style="background:var(--black);color:var(--white)"` for dark sections, `style="background:var(--gold)"` for gold accent sections.

### Updating statistics or data points

All animated counters use `data-count` attributes:

```html
<span data-count="27" data-suffix="%">27%</span>
```

Change the `data-count` value and the fallback text content. The counter animates to whatever `data-count` is set to.

---

## 6. Uploading Deliverable PDFs

The `docs/` folder is already created and populated with 18 PDFs. All download buttons on `resources.html` point to paths inside `docs/`. To add a new PDF:

1. Name it using the existing convention: `kebab-case.pdf` (e.g., `new-document.pdf`)
2. Drop it in `docs/`
3. Add or update the corresponding card in `resources.html`
4. Commit and push — GitHub Pages serves it automatically

**Do not rename existing PDFs** without updating every reference in `resources.html` and any other pages that link to them.

---

## 7. Navigation & Footer (Shared Components)

Both the `<nav>` and `<footer>` are injected by `scripts/main.js` at page load. They are not written into individual HTML files.

### How injection works

Every HTML page has two placeholder divs:

```html
<div id="nav-placeholder"></div>
<!-- ... page content ... -->
<div id="footer-placeholder"></div>
```

`main.js` replaces `#nav-placeholder` with the full `NAV_HTML` string and `#footer-placeholder` with `FOOTER_HTML`. Active nav link detection (`aria-current="page"`) runs immediately after injection by comparing `window.location.pathname` to each link's `href`.

### Current navigation structure

```
Home (index.html)
Framework (framework.html)
Communities (communities.html)
The Program (program.html)
Resources (resources.html)
About (about.html)
Partner With Us → program.html#contact  [CTA button, gold]
```

`learn.html` is not in the nav and does not exist in the repo.

### To add a new nav item

Edit the `NAV_HTML` string in `scripts/main.js`:

```javascript
<li><a href="new-page.html">New Page</a></li>
```

Add it before the `Partner With Us` `<li>`. One edit in `main.js` updates nav on all pages simultaneously.

### Footer links

Footer has two columns: **Explore** (Home, Framework, Communities, Program, Resources) and **Resources** (Research Library, Resources & Deliverables, About, Contact). Edit the `FOOTER_HTML` string in `main.js` to update both columns site-wide.

---

## 8. Styling System

### Design tokens (`:root` in `main.css`)

```css
--black:      #0f1c14    /* Primary dark background */
--ink:        #16241c    /* Secondary dark — hover states */
--gray:       #3f4d46    /* Body text on light backgrounds */
--gray-lt:    #5a665f    /* Secondary body text */
--gold:       #3f815a    /* Primary accent — buttons, labels, borders */
--gold-lt:    #5aa17a    /* Hover state for gold elements */
--red:        #21695a    /* Data accent, Non-Negotiables strip */
--paper:      #f4f5f4    /* Page background */
--white:      #f4f5f4    /* Text on dark backgrounds */

--font-display: 'Bebas Neue'         /* All-caps display type */
--font-body:    'Syne'               /* Body copy, UI labels */
--font-serif:   'Libre Baskerville'  /* Pull quotes, hero sub-text */
--font-mono:    'Syne Mono'          /* Labels, tags, section markers */
```

**Always use token variables. Never hardcode hex or rgba values in page-specific styles.** This ensures any future color change propagates from one place.

### Button classes

| Class | Use |
|---|---|
| `.btn-gold` | Primary CTA — dark backgrounds |
| `.btn-ghost` | Secondary CTA — dark backgrounds |
| `.btn-black` | CTA on light backgrounds |
| `.btn-outline` | Tertiary / neutral |
| `.btn-red` | Data accent contexts |

All buttons require the base `.btn` class plus one modifier: `<a href="..." class="btn btn-gold">Label</a>`

### Section pattern

Content sections alternate backgrounds for visual rhythm: black (hero) → gold (marquee) → paper (argument) → paper (fronts) → black (cycle) → gold (stats) → paper-dk (get involved).

### Responsive breakpoints

- `max-width: 900px` — collapses multi-column grids, shows hamburger menu
- `max-width: 600px` — reduces padding, collapses remaining two-column layouts

Defined at the bottom of `main.css` in the `/* ── RESPONSIVE */` block, and in `<style>` blocks within individual pages for page-specific adjustments.

### Adding page-specific styles

Put them in a `<style>` block in the `<head>` of the relevant page. Do not add page-specific styles to `main.css`. Rule: `main.css` handles universal components (nav, footer, buttons, cards, utilities); page `<style>` blocks handle layout and unique components for that page only.

---

## 9. Interactive Components

### Scroll Reveal (`.reveal` / `.reveal-left`)

Add class `reveal` to any element to fade + slide up on scroll. Use `reveal-left` for horizontal slide. Stagger with `reveal-delay-1` through `reveal-delay-4` (100ms–400ms delay increments). Handled by `initReveal()` via `IntersectionObserver`.

```html
<div class="reveal">Fades in on scroll</div>
<div class="reveal reveal-delay-2">Fades in 200ms later</div>
```

### Animated Counters (`data-count`)

Any element with `data-count` animates from 0 to target when scrolled into view. Supports `data-prefix` and `data-suffix`. The text content is the no-JS fallback.

```html
<span data-count="27" data-suffix="%">27%</span>
<span data-count="1100" data-prefix="$">$1,100</span>
```

### Civic Action Cycle (index.html)

Six `<button class="cycle-step-btn">` elements with `data-step` attributes (0–5). Click handler reads `cycleData[i]` and updates `#cycle-title`, `#cycle-desc`, `#cycle-example`. The `cycleData` array is defined inline in `index.html`.

### Accordion (program.html)

`.accordion-trigger` buttons toggle `.accordion-panel` visibility using `aria-expanded` and the `hidden` attribute. Handled by `initAccordion()` in `main.js`. Only one panel open at a time.

### Document Filter (resources.html)

`filterDocs(type, btn)` shows/hides `.doc-card` elements by their `data-type` attribute. Also hides parent `.docs-section` containers when all child cards are hidden. Type `'all'` shows everything.

### Tabs (`role="tablist"`)

Any element with `role="tablist"` containing `role="tab"` children is wired by `initTabs()`. Tabs toggle `aria-selected` and show/hide their associated `role="tabpanel"` via the `hidden` attribute.

### Hamburger Menu

`initHamburger()` wires the `.nav-toggle` button: toggles `aria-expanded` on the button and `.open` on `#nav-menu`. Outside-click closes the menu. ARIA attributes are correct throughout.

---

## 10. Fellowship Deliverables Status

| Deliverable | Authors | PDF in docs/ | Perez Version |
|---|---|---|---|
| Delaware Civic Education Standards Review | Sanchez, Perez | ✅ `standards-review.pdf` | ✅ `standards-review-perez.pdf` |
| Comparative State Analysis | Sanchez, Perez | ✅ `comparative-analysis.pdf` | ✅ `comparative-analysis-perez.pdf` |
| Youth Civic Engagement Best Practices Memo | Sanchez | ✅ `youth-civic-engagement.pdf` | ⏳ Coming Soon |
| Strategic Nonviolence Research Brief | Sanchez, Perez | ✅ `strategic-nonviolence.pdf` | ✅ `strategic-nonviolence-perez.pdf` |
| School and Community Partnership Toolkit | Sanchez, Perez | ✅ `partnership-toolkit.pdf` | ✅ `partnership-toolkit-perez.pdf` |
| Workshop Implementation Framework | Sanchez, Perez | ✅ `workshop-framework.pdf` | ✅ `workshop-framework-perez.pdf` |
| K–12 Civic Education Policy Brief | Sanchez, Perez | ✅ `policy-brief.pdf` | ✅ `policy-brief-perez.pdf` |
| Grant Narrative | Sanchez, Perez | ✅ `grant_narrative_writing.pdf` | ✅ `grant-narrative-perez.pdf` |
| Annotated Bibliography / Citation Library | Sanchez, Perez | ✅ `annotated_bibliography.pdf` | ✅ `citation-library-perez.pdf` |
| Initiative Overview (one-pager) | Sanchez | ✅ `initiative-overview.pdf` | — |

**One item pending:** Youth Civic Engagement Best Practices Memo — Perez version. When ready: add `youth-civic-engagement-perez.pdf` to `docs/`, then update the `resources.html` card to replace the "Coming Soon" span with a live `<a>` button matching the other Perez PDF buttons.

---

## 11. Deployment (GitHub Pages)

The site deploys automatically from the `main` branch. No build step. GitHub Pages serves files as-is from the repo root.

### Pushing updates

```bash
git add .
git commit -m "describe what changed"
git push origin main
```

Changes are live within 1–3 minutes. The repo has 29+ deployments as of June 2026.

### If GitHub Pages stops working

Go to repo Settings → Pages → confirm Source is set to "Deploy from a branch" → Branch: `main` → Folder: `/ (root)`.

### For iterative editing: Claude Code

```bash
npm install -g @anthropic-ai/claude-code
cd networkdelaware-civicpower
claude
```

Claude Code reads actual repo files and makes targeted edits directly. Faster than copy-paste for iterative changes.

---

## 12. Known Limitations & Planned Work

### Current limitations

- **No analytics** — no visitor tracking implemented
- **No search** — `resources.html` has a type filter but no full-text search across documents
- **Mission Tracker does not persist** — state resets on page reload (fixable with ~10 lines of localStorage JS)

### Pending content

- **`presentation.html`** — file must be added to repo root for the `resources.html` button to activate. Once live, remove `pointer-events:none`, `opacity:0.5`, and `aria-disabled="true"` from the button on `resources.html` (line ~165)
- **Youth Civic Engagement Perez PDF** — one remaining Perez co-author deliverable; "Coming Soon" badge is live on `resources.html`
- **Communities page** — currently reflects the original six priority communities. The expanded 14-community analysis (fellowship document) is available in `docs/` but not yet reflected on the page

### Future pages under consideration

- **Delaware Student Legislature page** — the voluntary side initiative developed through the fellowship; noted in `about.html` but no dedicated page built
- **Pilot program updates** — once Year 1 pilot begins, a page tracking site-level outcomes and community partner documentation

### Font loading note

The site loads four Google Fonts families via `@import` in `main.css`. On slow connections there may be a brief flash of unstyled text. Mitigate by adding `font-display: swap` or `<link rel="preload">` tags in `<head>` of each page.

---

*Last updated: June 2026 — Nathan Sanchez & Constanza Perez, Network Delaware Research Fellowship*
