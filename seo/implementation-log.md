# Implementation Log

## 2026-10-23 — Web development agency pivot

**Context:** Project repurposed from a digital marketing agency ("DigitalDot") site into a US-focused web development agency, per the user's decision to repurpose the existing site rather than start a new project.

### Files created
- `seo/keyword-research-us.csv` — raw US keyword data from the connected Ubersuggest integration
- `seo/keyword-mapping.csv` — keyword-to-page assignments
- `seo/keyword-opportunities.md` — ranked opportunity analysis
- `seo/seo-audit-report.md`
- `seo/technical-seo-report.md`
- `seo/analytics-audit.md`
- `seo/content-roadmap.md`
- `seo/launch-checklist.md`
- `seo/implementation-log.md` (this file)
- `services/index.html` — services hub page
- `services/website-development.html`
- `services/website-design-redesign.html`
- `services/ecommerce-development.html`
- `services/custom-web-applications.html`
- `services/wordpress-development.html`
- `services/website-maintenance.html`
- `portfolio.html`
- `about.html`
- `contact.html`

### Files substantially rewritten
- `index.html` — rebranded hero, services, approach, process, work, project-planner tool, about teaser, FAQ, and final CTA around web development services; added Organization + WebSite JSON-LD; removed the old contact form section (now lives on `contact.html`)
- `js/main.js` — updated the interactive assessment's questions and groups (`need`, `businessType`, `priority`, `platform`) and its rule-based recommendation logic to map to the new service pages instead of marketing services
- `sitemap.xml` — rebuilt to list all 12 current pages

### Files left unchanged
- `privacy.html`, `terms.html` — content is brand-agnostic and still accurate
- `robots.txt` — already correct (allow all, points to sitemap)
- `css/styles.css` — existing design tokens and components reused as-is; new classes added (breadcrumbs, page-hero, content-block, checklist, services-index-grid) without modifying existing selectors
- `serve.ps1`, `README.md` (see below for README note)

### Keyword research method
Used the connected Ubersuggest MCP (`keyword_suggestions`) with `locId: 2840` (United States) across 5 seed-keyword batches covering: website development company/web design agency, small business website development, ecommerce development, custom web development, website redesign, web application development, and website maintenance. Full results in `seo/keyword-research-us.csv`; city-specific and international variants were excluded from the mapping per the execution rules (no local office, US-only scope).

### Testing performed
- Verified the project-planner tool (formerly "growth assessment") on the home page still advances correctly through all 4 steps with the new questions and produces a recommendation.
- Visually checked `index.html`, `services/index.html`, and one service page in the browser pane after the rewrite.
- Did not run a build/lint/type-check step — none exists for this static site (see `technical-seo-report.md` for why).

### Known gaps (see `launch-checklist.md` for the full list)
- Placeholder domain (`www.digitaldot.com`) used throughout; must be replaced once a real domain is purchased.
- Contact form has no backend.
- GA4/Search Console not configured (no live domain to verify against).
- No Lighthouse/Core Web Vitals data (no tooling available in this environment).
