# Industry-standard website checklist — status

Live: https://gifted-with-purpose.vercel.app
Repo: https://github.com/tangison/gifted-with-purpose (private)

Legend: **Done** · **Partial** — needs a client decision or input · **Blocked** — cannot be done from the
build alone, needs account access or a business decision · **N/A** — does not apply to a WhatsApp catalogue.

Nothing below is marked Done unless it is actually verifiable on the live site.

---

## 1. Strategy and planning

| Item | Status | Notes |
|---|---|---|
| Primary business objective | Done | Move the catalogue off Instagram/WhatsApp status into a permanent home, and convert to a WhatsApp order. |
| Target audience | Done | Namibian/South African mobile buyers arriving from social links; bilingual English/Afrikaans. |
| Main conversion action | Done | One action sitewide: WhatsApp order enquiry, pre-filled per product. |
| Customer journey | Done | Social link → collection → product card → pre-filled WhatsApp → personal confirmation. |
| Competitor research | Partial | ohsothankful.co.za reviewed as the structural reference the client named. No broader competitive study commissioned. |
| Brand positioning | Done | From BRAND.md: warm, faith-friendly, small-business-personal, mother–daughter. |
| Site structure and sitemap | Done | 13 indexable routes + 404. `sitemap.xml` generated. |
| Essential pages prioritised | Done | Home, 5 collections, About, How to order, FAQ, Contact, 3 legal, 404. |
| Measurable success metrics | Blocked | Needs analytics, which is deliberately not installed. See §15. |
| Content and maintenance plan | Done | `README.md` documents the JSON-driven content workflow. |

## 2. Essential pages

| Item | Status | Notes |
|---|---|---|
| Homepage | Done | `/` |
| About page | Done | `/about` |
| Products page | Done | 5 collection pages, 27 products. |
| Individual service/product pages | Partial | Products are full cards inside collection pages with own schema, photo, spec, price and CTA. Per-product URLs are the obvious next step once names and prices are confirmed. |
| Contact page | Done | `/contact` |
| FAQ | Done | `/faq`, 8 questions, FAQPage schema. |
| Testimonials / case studies | Blocked | None supplied. Fabricating them is prohibited by SYSTEM.md. |
| Privacy policy | Done | `/legal/privacy` |
| Terms and conditions | Done | `/legal/terms` |
| Cookie policy | Done | `/legal/cookies` — states plainly that no cookies are set. |
| Refund / delivery / cancellation policy | Partial | Not published because no policy was supplied. Terms state openly that these are confirmed per order. |
| Custom 404 | Done | `/nope` returns a real 404 with recovery links. |
| Human-readable sitemap | Done | `/sitemap-page`, linked from the footer. |
| Brand guide page | Done | `/brand`, deliberately `noindex` as internal reference. |
| Thank-you / confirmation pages | N/A | Conversion completes inside WhatsApp, not on the site. |

## 3. Brand and visual design

| Item | Status | Notes |
|---|---|---|
| Official logo used correctly | Done | Supplied SVG, byte-identical, never regenerated. |
| Consistent colours | Done | Only BRAND.md colours. Teacher palette isolated to that collection per §3. |
| Clear typography system | Done | Fraunces display, Poppins body, Caveat script, Baloo 2 accents. Max 3 families per page. |
| Consistent spacing | Done | CSS custom-property scale. |
| Professional visual hierarchy | Done | Verified in screenshots at 320–1440px. |
| High-quality relevant images | Done | Only real client photography, recropped for portrait cards. |
| No unnecessary clutter | Done | |
| Consistent buttons and components | Done | Shared `.btn` system and React components. |
| Design suits the industry | Done | |
| Trust-building visual elements | Done | Real team photo, real product shots, honest disclaimers. |
| Light and dark environments | Partial | Single light theme, consistent with the candy-pastel brand. No dark mode requested. |
| Brand consistency across pages | Done | Shared layout, header and footer. |

## 4. User experience

All **Done**: predictable nav, clear headings, descriptive links, no pop-ups, no interstitials, contact visible in
header/footer/sticky bar, one clear CTA, readable sizes, generous spacing, clear success/error states via the 404
and WhatsApp handoff, homepage reachable from every page, and no dead ends. No forms exist to shorten — WhatsApp
replaces them by design.

## 5. Mobile responsiveness

All **Done**: designed mobile-first, verified at 320/390/768/1440px, all tap targets ≥44px, zero horizontal
overflow on every route, drawer nav tested open/close/Escape, text readable without zoom, `srcset`-sized images,
sticky order bar keeps the primary action in reach. Real Android/iPhone hardware testing is **Partial** — verified
in Chromium device emulation, not on physical handsets.

## 6. Accessibility

| Item | Status | Notes |
|---|---|---|
| Colour contrast | Done | Body `#2A2A2A` on light; dark footer. |
| Alt text on meaningful images | Done | Verified: zero images missing `alt`. Decorative SVGs `aria-hidden`. |
| Keyboard accessible | Done | Drawer and lightbox trap, close on Escape, restore focus. |
| Visible focus states | Done | 3px pink outline. |
| Structured headings | Done | Exactly one `h1` per route, verified. |
| Form labels | N/A | No forms. |
| Meaningful link text | Done | No "click here". |
| Not relying on colour alone | Done | Icons and text labels accompany colour. |
| Accessible buttons and menus | Done | `aria-expanded`, `aria-controls`, `aria-modal`, `aria-current`. |
| Captions/transcripts | N/A | No audio or video. |
| Reduced motion respected | Done | `prefers-reduced-motion` disables animation and reveals. |
| Semantic HTML | Done | `header/nav/main/section/article/footer`, `details/summary` FAQ. |
| Tested with tools | Done | axe-core (WCAG 2.1 AA) run on all 14 routes and with the gift bag open: zero violations, verified live. No screen-reader pass yet. |
| WCAG | Done | Zero axe-core violations against wcag2a, wcag2aa, wcag21a and wcag21aa on every route, live. Contrast failures found and fixed: WhatsApp button 1.98:1 to 6.58:1, pink CTA 3.86:1 to 5.79:1, category labels 1.87:1 to 5.46-7.03:1, legal links 3.71:1 to 6.12:1. |

## 7. Search engine optimisation

**Since the last pass:** a web app manifest, a 1200x630 Open Graph image built from the real logo and a real
product photo (it was previously a portrait product shot at 0.89 ratio, which social platforms cropped badly),
plus `favicon.ico`, a 180px Apple touch icon and 192/512px PNG icons, all rasterised from the supplied SVG.

**Done:** unique titles and meta descriptions per route, one `h1` each, H2/H3 structure, clean slugs, descriptive
alt text, descriptive image filenames, internal linking between collections, no duplicate content, original copy,
location keywords ("Namibia", "Windhoek"), consistent business name and phone, LocalBusiness + Organization +
Product/Offer + FAQPage + HowTo + ContactPage + BreadcrumbList schema, `sitemap.xml`, `robots.txt`, canonical URLs
on every page, no broken links, no accidental noindex, HTML-first content, intent-led copy, no keyword stuffing.

**Blocked (needs your accounts):** Google Business Profile, Search Console connection, sitemap submission, rank
monitoring, backlink building. **Partial:** keyword research was inferred from the brief, not from a keyword tool.
Service-area pages are not built — one Namibia-wide service area is currently accurate.

## 8. Content quality

All **Done**: customer-focused copy, the business is explained in the hero, audience is clear, value proposition is
stated, copy is outcome-focused, claims are specific and sourced from real assets, CTAs throughout, text broken into
scannable sections, consistent terminology, no outdated info, **no placeholder content anywhere**, objections
answered in the FAQ, pricing shown where confirmed, authentic Namibian context. **Blocked:** proof elements such as
testimonials, statistics and case studies — none supplied, and inventing them is prohibited.

## 9. Conversion optimisation

**Done:** one primary CTA per page, CTA above the fold, logically repeated, clear button wording, click-to-call,
WhatsApp integration as the core mechanic, response-time expectation stated ("usually same day"), trust indicators
beside CTAs, obvious next step, no distractions from the primary action. A gift bag lets a visitor collect
several designs and send them as one WhatsApp message, which is the multi-item path the single-product buttons
could not cover. **N/A:** enquiry forms, booking engine, form-field reduction, thank-you redirects — WhatsApp
replaces the form entirely. **Blocked:** form-submission tracking, campaign landing pages and A/B testing of
headlines all require analytics.

## 10. Trust and credibility

**Done:** complete business info, real trading and registered names, real mother–daughter story, HTTPS enforced,
privacy/terms/cookies published, no exaggerated claims, verifiable contact channels, current copyright year,
Namibia service area shown, authentic photography throughout.
**Partial:** professional domain — currently on `vercel.app`, awaiting your domain.
**Blocked:** domain-based email address, registration number display, partnerships/certifications, social links
(see below), testimonials and case studies.

## 11. Performance and speed

**Done:** images compressed and correctly sized, AVIF/WebP enabled via `next/image`, lazy loading below the fold,
CSS/JS minified by Next, no unused frameworks, **zero third-party scripts**, immutable caching on fonts and images,
Vercel CDN, self-hosted subset fonts, careful preloading of two critical fonts, static prerendering for near-zero
server response, restrained animation, explicit image dimensions to prevent layout shift.
**Partial:** Lighthouse and slow-network testing not run in this environment; live routes respond in 0.18–0.58s.
**Blocked:** post-launch monitoring needs an analytics or monitoring account.

## 12. Technical SEO

**Done:** fully server-rendered and crawlable, every public page indexable, valid status codes including a true
404, no redirect chains, no duplicate URL variations, canonical tags, structured data, logical internal linking,
breadcrumbs with schema, no orphan pages, descriptive slugs, Open Graph and Twitter Card metadata.
**N/A:** pagination, hreflang — single locale, product-level Afrikaans only, per BRAND.md §6.
**Blocked:** crawl-error monitoring and 301 mapping of removed pages need Search Console and a live domain history.

## 13. Security

**Done:** SSL enforced by Vercel, HTTP→HTTPS automatic, framework current (Next 14.2.15), no unused plugins, no
admin surface to protect, **no user input to validate or sanitise**, no database so no SQL injection surface, XSS
surface minimised with no user content and a strict CSP, secure headers configured and verified live, no API keys
in the client, no secrets in the repo (verified before push), no file uploads, Git version control with full
history.
**Partial:** rate limiting and spam protection are not configured because there is no form or API endpoint to
abuse. **Blocked (your responsibility):** strong passwords and MFA on the GitHub, Vercel and Google accounts;
automated backup policy beyond Git; monitoring and incident response.

## 14. Forms and lead handling

**N/A by design** — the site has no forms. Leads arrive in WhatsApp with the product, spec and price already in the
message. Fallback contact methods (call, WhatsApp) are provided. Consent checkboxes, SMTP, confirmation emails and
recipient testing do not apply. **Blocked:** WhatsApp-click conversion tracking requires analytics.

## 15. Analytics and tracking

**Blocked, deliberately.** SYSTEM.md prohibits adding analytics or marketing pixels without separate written
authorisation, so none is installed and the cookie policy honestly states this. Everything in this section —
page views, conversion events, WhatsApp click tracking, Search Console, consent management, reporting — is ready
to add the moment you authorise it. Say the word and I will wire up a privacy-friendly, cookieless analytics
setup and update the cookie policy in the same change.

## 16. Social and sharing integration

**Done:** Open Graph images configured, Twitter Card metadata, consistent brand previews, no heavy social widgets,
no embedded feeds harming performance.
**Blocked:** correct social profile links. Your flyer's QR codes are **physically cropped in the supplied image**
(126px wide but only 54px tall — under half the code), so they cannot be decoded. Facebook and Instagram are both
login-walled to automated lookups, and no public profile exists under "Gifted with Purpose" or "Geneveve Gift
Shop". Rather than guess a URL that could point at a stranger's page, the social icons link to `/contact`, which
explains the links are not published yet. **Send me the two URLs and this becomes a one-line change.**

## 17. Local business optimisation

**Done:** consistent business information sitewide, accurate contact details, Namibia service area stated, local
keywords used naturally, LocalBusiness schema with telephone and country, location context in the copy.
**Blocked (needs your Google account and a business decision):** Google Business Profile creation, category,
operating hours, business photos, review requests and responses, local directory registration.
**Partial:** no map embed — no street address was supplied, and Namibia-wide is currently accurate. Opening hours
and address are intentionally omitted from schema rather than invented.

## 18. E-commerce requirements

**Mostly N/A** — this is a catalogue with WhatsApp ordering, the model stated in PRODUCT.md.
**Done:** clear product categories, accurate descriptions, high-quality images, prices displayed where confirmed,
Product schema with Offers, customer support channel, customer information protected by collecting none.
**Done since the last audit:** a gift bag that collects multiple items, holds quantities, persists across
reloads and sends the whole order as one WhatsApp message with a subtotal for the priced items.
**N/A:** secure checkout, payment methods, delivery calculation, order confirmation emails, payment tracking,
revenue tracking — there is no payment gateway, by design. **Partial:** stock availability is confirmed per
enquiry rather than shown live; abandoned-bag recovery is impossible without analytics and an identity.
Returns and delivery policy remain outstanding from you.

## 19. Hosting and infrastructure

**Done:** reliable hosting (Vercel), global edge delivery, automatic HTTPS, Git version control, documented
deployment process, environment variable support (`NEXT_PUBLIC_SITE_URL`), rollback available through Vercel's
immutable deployments, ownership documented here.
**Blocked:** custom domain DNS, professional email records, SPF/DKIM/DMARC, uptime monitoring, error logging and a
formal staging environment all need your domain and account decisions.

## 20. Quality assurance

**Done and evidenced:** every page tested, all internal links resolve, navigation tested, responsive at
320/390/768/1440, spelling and grammar reviewed, phone number verified consistent across every page and link,
published prices cross-checked against your own ad artwork, policy pages reviewed, image quality inspected, live
response times measured, automated accessibility structure checks, SEO metadata verified per route, structured
data parsed and validated, status codes checked, 404 verified, full customer-journey walkthrough.
**N/A:** search functionality, payment and booking flows, email notifications, analytics events.
**Cross-browser: Done.** The full cart journey was run on Chromium 151, Firefox 153 and WebKit 26.5 (the Safari
and iOS engine) at 390px. All three gave identical results: 84px header logo, 350px footer mark, zero overflow,
gift bag opens, badge increments, Escape closes, the bag survives a reload, and the WhatsApp link carries the
right number. Fraunces resolved on every engine, so the self-hosted fonts work outside Chromium.
**Partial:** physical device testing not performed; the above is engine-level, not hardware.

## 21. Launch requirements

**Done:** SSL active, no maintenance mode, **no placeholder content**, no test accounts or test data, indexing
enabled, sitemap generated and served, live routes tested, backups exist via Git and Vercel immutable deployments,
privacy and legal pages published, initial backup created (first commit), ownership recorded below, handover
documentation written.
**Blocked:** final custom domain, Search Console verification, analytics verification, live payment testing (none
exists), client training session.

## 22. Maintenance and ongoing support

Documented in `README.md`. Content updates are a JSON edit plus a commit. Dependency updates, uptime and security
monitoring, backup restoration tests, SEO and analytics review, and a support agreement are ongoing items that need
a maintenance arrangement between us.

## 23. Documentation and ownership

| Item | Status |
|---|---|
| Domain ownership | **Blocked** — no custom domain yet. |
| Hosting account | Done — Vercel `gemsweb-digital`. |
| Code ownership | Done — GitHub `tangison/gifted-with-purpose`, private. |
| Design asset ownership | Done — all source assets are the client's own; logo unmodified. |
| Credential storage | **Your action** — see the security note in the handover. |
| Third-party services | Done — GitHub and Vercel only. No other service, no tracker, no CDN dependency. |
| Subscriptions/renewals | **Blocked** — none yet; domain will be the first. |
| Integrations | Done — WhatsApp deep links only. |
| Backup procedures | Done — Git history plus Vercel immutable deployments. |
| Admin instructions | Done — `README.md`. |
| Brand/content guidelines | Done — carried over from BRAND.md and honoured in the build. |
| Maintenance responsibilities, response times, agreement scope | **Blocked** — commercial terms to agree. |

## 24. Recommended professional deliverables

| Deliverable | Status |
|---|---|
| Discovery document | Done — inherited as PRODUCT.md. |
| Website strategy | Done — §1 above. |
| Sitemap | Done — live `sitemap.xml` and the IA. |
| Competitor analysis | Partial — single named reference reviewed. |
| Keyword research | Partial — inferred, not tool-verified. |
| Content plan | Done — `data/site.json` is the content source of truth. |
| Wireframes | N/A — built directly to the approved brand system. |
| Design system | Done — CSS custom properties plus shared components. |
| Responsive interface designs | Done. |
| Functional website | Done — live. |
| SEO configuration | Done. |
| Analytics configuration | Blocked — awaiting authorisation. |
| Security configuration | Done — headers, CSP, HSTS verified live. |
| Accessibility review | Done — axe-core WCAG 2.1 AA, zero violations on every route including `/brand` and `/sitemap-page`, verified live. Screen-reader pass still outstanding. |
| Performance audit | Done — Lighthouse mobile on live routes: 94 to 96 performance, 100 accessibility, 100 best practices, CLS 0. |
| Browser/device testing report | Partial — Chromium across four viewports. |
| Launch checklist | Done — this document. |
| Client training | Blocked — happy to walk you through it. |
| Website manual | Done — `README.md`. |
| Maintenance and support plan | Blocked — to agree. |

---

## The short version of what is actually outstanding

1. **Confirm the +264 country code** on the WhatsApp number. Everything converts through it.
2. **Send the Facebook and Instagram URLs.** The flyer QR codes are cropped and cannot be recovered.
3. **Delivery, returns and the remaining prices** — 16 products still say "Price on request".
4. **Confirm the "Grow in Grace" product name** — the wrap text is partly hidden in the photo.
5. **Decide on a custom domain**, then Search Console and Google Business Profile follow.
6. **Authorise analytics** if you want conversion tracking; nothing is tracked today.
