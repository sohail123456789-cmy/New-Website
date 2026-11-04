# Technical SEO Report — DigitalDot

## Site architecture (implemented)

```
/                                           Home
/services/                                  Services hub
/services/website-development.html          Business Website Development
/services/website-design-redesign.html      Website Design & Redesign
/services/ecommerce-development.html        Ecommerce Development
/services/custom-web-applications.html      Custom Web Applications
/services/wordpress-development.html        WordPress Development
/services/website-maintenance.html          Website Maintenance
/portfolio.html                             Work / portfolio
/about.html                                 About
/contact.html                               Contact / request a quote
/privacy.html                               Privacy policy
/terms.html                                 Terms of service
```

No city-specific, country-specific, or other doorway pages were created, consistent with the execution rules (the agency has no genuine local offices).

## Crawlability and indexing

- `robots.txt` allows all crawling and points to `sitemap.xml`. **Status: done.**
- `sitemap.xml` lists every indexable page above with the placeholder production domain. **Status: done, needs domain swap before launch.**
- No `noindex` directives are present anywhere; nothing was deleted or redirected, since no live URLs exist yet. **Status: n/a (no prior live site).**
- All internal links use relative paths and plain `<a href>` tags (no JavaScript-only navigation), so content is reachable without executing JS. **Status: done.**

## On-page SEO (implemented per page)

Every new/updated page has: a unique `<title>`, a unique meta description, a canonical URL, Open Graph tags, one H1, logical H2 structure, and descriptive internal links. No meta keywords tag was added. **Status: done** for all 12 pages listed above.

## Structured data (implemented)

- `Organization` + `WebSite` JSON-LD on the home page.
- `Service` + `BreadcrumbList` JSON-LD on each of the 6 service pages.
- `BreadcrumbList` on the services hub.
- All JSON-LD is valid JSON (manually reviewed) and reflects only information actually present on the page — no invented ratings, reviews, prices, or addresses.

**Not yet added:** `LocalBusiness` schema (deliberately omitted — no verified office address) and `AggregateRating`/`Review` schema (deliberately omitted — no real reviews exist).

## Unmeasured / unavailable

- **Core Web Vitals / Lighthouse scores**: not measured. No Node.js, Python, or headless browser with Lighthouge was available in this environment. Do not treat the site's plain CSS/vanilla-JS approach as a proxy for a passing score — it should be measured directly once the site is hosted.
- **Image optimization**: the site currently uses only inline SVG (no raster images), so there is nothing to compress; this will need review once real photography/screenshots are added.
- **Mobile rendering**: visually verified in-browser at mobile and ~800px widths during this session (see `implementation-log.md`), but not measured against a formal device lab.
- **HTTPS / hostname consistency**: not applicable yet — no hosting or domain is configured.

## Known limitations of the current setup

- Fully static HTML with duplicated header/footer markup per page (no templating/build step, since Node.js is unavailable in this environment). If the project later moves to a framework, the content here should carry over directly instead of being rewritten.
- `services/*.html` and root pages reference `css/styles.css` and `js/main.js` via relative paths (`../css/styles.css` from one level deep); verify these still resolve correctly if the folder structure changes.
