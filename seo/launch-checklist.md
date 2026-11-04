# Launch Checklist

## Content accuracy (must-do before any traffic arrives)
- [ ] Confirm every service listed (business websites, redesign, ecommerce, custom apps, WordPress, maintenance) is genuinely deliverable
- [ ] Replace illustrative portfolio entries on `/portfolio.html` with real projects, or keep clearly labeled as illustrative
- [ ] Review `/about.html` for accuracy — no invented history, credentials, or team bios are present, but confirm the copy still matches reality
- [ ] Decide on and fill in real contact details (phone/email/address) if the business wants them published — none are currently published

## Domain & infrastructure
- [ ] Purchase the production domain
- [ ] Replace the `https://www.digitaldot.com/` placeholder in: every page's `<link rel="canonical">`, every `og:url`, every JSON-LD block, `sitemap.xml`, `robots.txt`
- [ ] Set up HTTPS hosting
- [ ] Decide on `www` vs. non-`www` canonical hostname and keep it consistent everywhere above

## Analytics & tracking
- [ ] Create and install a GA4 property (see `analytics-audit.md`)
- [ ] Verify the domain in Google Search Console and submit `sitemap.xml`
- [ ] Add a cookie-consent mechanism if required for the business's target users

## Forms & conversion
- [x] Wire `contact.html`'s form to a real backend — now POSTs to Formspree's no-signup email endpoint (`https://formspree.io/f/sohail232@gmail.com`) via `fetch()` in `js/main.js` (`contactForm` handler); honeypot and client-side validation unchanged
- [ ] **Activate the endpoint**: submit the form once for real, then open the Formspree confirmation email sent to `sohail232@gmail.com` and click the activation link — until this is done, every submission fails with "This form isn't set up yet" (confirmed during testing)
- [ ] Decide on a permanent lead email if `sohail232@gmail.com` is not the final business inbox, and update the form `action` in `contact.html` accordingly
- [ ] Re-test the full contact flow end-to-end after activation
- [ ] Confirm the honeypot spam field (`companyWebsite`) still silently drops bot submissions once real submissions are flowing

## Technical QA
- [ ] Re-test all internal links after the domain goes live (relative paths were used throughout, so this should mostly be automatic)
- [ ] Run a real Lighthouse/PageSpeed audit once hosted (not possible in the build environment — see `technical-seo-report.md`)
- [ ] Validate all JSON-LD blocks with Google's Rich Results Test once the domain is live
- [ ] Re-check mobile layout on a real device, not just emulated viewports

## Content
- [ ] Review `seo/content-roadmap.md` and begin the 90-day plan
