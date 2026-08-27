# BUILD_PLAN.md

Scope actually delivered, plus the interpretations chosen and the alternatives set aside.

## Mode

Full build. Not a demo. Deployed to production on Vercel with client authorisation given in chat.

## Architecture

| Decision | Choice | Alternative set aside |
|---|---|---|
| Framework | Next.js 16.3.2 App Router | Started on 14.2.15; upgraded after a security audit found a critical advisory. Safe because the site uses no middleware, Server Actions, API routes or i18n, which is where most Next advisories land. |
| Rendering | All routes prerendered static | SSR was unnecessary; no per-request data exists. |
| Styling | Plain CSS with custom properties | Tailwind would add a build dependency for no gain at this size. |
| State | React context plus localStorage | A state library is unjustified for one cart. |
| Content | `data/site.json` as single source of truth | A CMS was not requested and adds a service to maintain. |
| Images | `next/image` with AVIF and WebP | Manual `<picture>` tags would duplicate what the framework does. |
| Cart | Batches into one WhatsApp message | A real checkout needs a payment gateway plus delivery and returns terms, none of which exist yet. |

## Routes delivered

18 public, all verified 200 live, plus a real 404.

Home, About, How to order, FAQ, Contact, Brand guide, Human sitemap.
Collections: Encourage, Inspire, Kids Selection, Teacher Appreciation, Old School Vibes.
Legal: Privacy, Terms, Cookies.
Machine: robots.txt, sitemap.xml, manifest.webmanifest.

## Operational states

| State | Implementation |
|---|---|
| Loading | `app/loading.js`, skeletons matching real card geometry so the swap causes no shift |
| Error | `app/error.js`, recoverable with a reset button and a WhatsApp fallback |
| Fatal error | `app/global-error.js`, inline styles because it replaces the document |
| Not found | `app/not-found.js`, real 404 status with recovery links |
| Empty | Gift bag empty state |
| Success | Handoff into WhatsApp with a pre-filled message |

Offline, maintenance, access denied and session expired do not apply: there is no service worker,
no auth, no session and no admin surface.

## Interpretations recorded

1. **"Add a cart"** was built as a gift bag that batches a WhatsApp order, not a checkout. Taking
   payment would require inventing delivery costs and returns terms. Flagged rather than fabricated.
2. **"Footer logo 10 times bigger"** became 350px mobile and 558px desktop, from 42px. A literal
   420px on mobile overflows a 390px viewport. The mark is also placed below the links so the sticky
   header cannot clip it.
3. **"Menu logo 2 times bigger"** is a literal 42px to 84px.
4. **Licensed character products** are shown, labelled generically, with a visible independence
   disclaimer, never in hero imagery. Confirmed with the client.
5. **Prices** use every figure legible in the client's own ad artwork. Confirmed with the client.
   Everything else says "Price on request".
6. **"Remove celebrate and replace with kids selection"** was applied as a rename of the existing
   collection, not a deletion and rebuild. That collection was already the kids one (`sub: "Kids
   Gifts"`), so its 7 products, artwork and accent colour carry over untouched. The slug moved to
   `kids-selection` and the old URL redirects permanently, because it was already live and indexed.
7. **"Add all the photos of the flip top and sippy cups"** was read as the 14 photographs of those
   two items already in `data/work.json`, 11 sippy cups and 3 flip-top bottles. They are now shown
   on the collection page as well as on `/work`. No new photograph was invented or generated.

## Verification gate applied to each slice

Type-check and lint via `next build`, production build, live route status, responsive sweep at
320/375/414/768/1024/1280/1440, axe-core WCAG 2.1 AA, Lighthouse mobile, cross-browser on Chromium,
Firefox and WebKit, browser console inspection, and a manual read of the rendered page.

## Out of scope until the client provides input

Analytics and conversion tracking, Google Business Profile, Search Console, a custom domain,
domain-based email with SPF, DKIM and DMARC, testimonials, delivery and returns policy text, and
the remaining 16 prices.
