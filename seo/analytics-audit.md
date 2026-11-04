# Analytics & Search Console Audit

## Current state

No GA4 property and no Google Search Console property are configured anywhere in this project. No measurement ID, tracking script, or verification tag exists in the codebase. This is stated plainly rather than inferred, since nothing was found to audit.

## Why nothing was configured in this pass

- There is no live domain yet (confirmed in the project brief), and GA4/Search Console both require a reachable, verifiable site.
- No GA4 measurement ID or Search Console verification method was provided, and none should be invented.

## Setup steps for the site owner (once a domain is live)

### GA4
1. Create a GA4 property in Google Analytics for the production domain.
2. Add the GA4 tag (`gtag.js`) to a single shared location — currently every page loads `js/main.js` independently, so the tag snippet should go in each page's `<head>` right after the Google Fonts `<link>` tags, or be consolidated into one included script if the project moves to a templated/build setup.
3. Configure key events for: contact form submission success (`contact.html`, `#contactForm` in `js/main.js`), and optionally "Request a Quote" button clicks across the service pages.
4. Do not send personally identifiable information (name, email, company name, or project description) as event parameters — only send that the event occurred.
5. Add a cookie-consent banner before enabling GA4 if the business will market to regions requiring one (e.g. California under CCPA/CPRA at minimum, since this is a US-only site).

### Google Search Console
1. Verify the production domain (DNS TXT record or HTML tag method, once the domain is purchased).
2. Submit `sitemap.xml` (already built and listing all 12 current pages) via Search Console's Sitemaps report.
3. Monitor the Coverage/Indexing report for crawl errors after the first submission.
4. Monitor the Performance report for the keyword clusters identified in `keyword-opportunities.md` once data starts accumulating (typically 2–4 weeks after indexing).

## Status

Both are marked **not configured / pending domain selection** — nothing here should be read as "integrated" or "verified."
