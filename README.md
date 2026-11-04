# DigitalDot Website

A static, premium-minimalist website for DigitalDot, a website development company serving US businesses. Built with plain HTML, CSS, and vanilla JavaScript — no build step or dependencies required.

## Running locally

Node.js was not available in the build environment, so no bundler/dev server is configured. Just open `index.html` directly in a browser, or serve the folder with any static server, e.g.:

```bash
# Python 3
python -m http.server 8000

# or Node (if installed later)
npx serve .

# or the included PowerShell server (no dependencies)
powershell -ExecutionPolicy Bypass -File serve.ps1
```

Then visit `http://localhost:8000` (or `http://localhost:8089` for `serve.ps1`).

## Structure

- `index.html` — home page (nav, hero, services, approach, process, work, project planner, about teaser, FAQ, final CTA, footer)
- `services/index.html` — services hub
- `services/website-development.html`, `website-design-redesign.html`, `ecommerce-development.html`, `custom-web-applications.html`, `wordpress-development.html`, `website-maintenance.html` — individual service landing pages
- `portfolio.html`, `about.html`, `contact.html` — supporting pages
- `privacy.html`, `terms.html` — legal pages
- `css/styles.css` — design tokens and all styles
- `js/main.js` — nav/mobile menu, scroll reveal animations, FAQ accordion, project-planner logic, contact form validation
- `robots.txt`, `sitemap.xml` — SEO files
- `seo/` — keyword research, mapping, and audit reports from the October 2026 SEO pass (see `seo/seo-audit-report.md` for a full summary)

## What still needs configuration

See `seo/launch-checklist.md` for the full launch checklist. The short version:

1. **Contact form backend.** The form on `contact.html` currently validates input client-side but has no real backend — submissions are not sent anywhere. To make it functional, either:
   - Point a `fetch()` call (to be added in `js/main.js`, inside the `contactForm` submit handler) at a form service such as Formspree, Getform, or Basin, or
   - Stand up a small serverless function / API route that receives the POST body and emails or stores it.
   Never put API keys or secrets directly in `js/main.js` since it ships to the browser — keep them server-side.

2. **Domain-specific URLs.** Every page's canonical tag, Open Graph tags, and JSON-LD, plus `robots.txt` and `sitemap.xml`, currently use `https://www.digitaldot.com/` as a placeholder. Update these once the real domain is known.

3. **Verify deliverable services.** Confirm ecommerce, custom web applications, WordPress, and maintenance are all genuinely offered before launch — see `seo/launch-checklist.md`.

4. **Real content.** Placeholder/illustrative content was intentionally used instead of fabricated data — the Work/Portfolio section uses clearly labeled illustrative project placeholders, and no fake testimonials, stats, awards, or credentials were included anywhere. No office address or phone number was added since none was verified.

5. **Analytics.** No GA4 or Search Console setup exists yet — see `seo/analytics-audit.md`.

6. **Favicon.** A placeholder empty icon is set; add a real favicon file when brand assets exist.

## Features implemented

- Sticky header with scroll-aware border, accessible mobile menu, breadcrumbs on inner pages
- Multi-page architecture: home, services hub, 6 service pages, portfolio, about, contact
- **Project Planner** — a 4-question, rule-based (non-AI) multi-step tool with progress bar, validation, back/next controls, and a results screen recommending the right service
- Contact form with accessible labels, client-side validation, loading/success/error states, and a honeypot field for basic spam protection
- Scroll-reveal animations and hover/link transitions, all respecting `prefers-reduced-motion`
- Responsive layout tested down to small mobile widths
- On-page SEO: unique titles/meta descriptions per page, Open Graph tags, canonical links, semantic heading hierarchy, `robots.txt`, `sitemap.xml`
- Structured data: Organization + WebSite JSON-LD on the home page, Service + BreadcrumbList JSON-LD on each service page
- Accessibility: skip link, keyboard-operable nav/menu/accordion/assessment, visible focus states, labeled form fields with error messaging

## SEO research

US keyword research was conducted via a connected Ubersuggest integration and used to drive the site's service-page structure and copy priorities. See `seo/keyword-opportunities.md` for the ranked findings and `seo/keyword-mapping.csv` for how each keyword maps to a page.
