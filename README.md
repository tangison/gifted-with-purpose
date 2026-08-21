# Gifted with Purpose — website

Mobile-first marketing and catalogue site for **Gifted with Purpose** (registered as Geneveve Gift Shop),
a Namibian mother–daughter personalised-gifts business.

- **Live:** https://gifted-with-purpose.vercel.app
- **Repo:** https://github.com/tangison/gifted-with-purpose (private)
- **Checklist status:** see `CHECKLIST.md`
- **Open questions for the client:** see `NEEDS_CONFIRMATION.md`

## Stack

Next.js 14 (App Router) · React 18 · plain CSS · no UI framework · no third-party runtime scripts.
All 18 routes are prerendered as static HTML. The gift bag is client-side only (localStorage).

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Editing content

`data/site.json` is the single source of truth for every product, price, collection and description.
Change it, commit, and Vercel redeploys. Do not hand-edit rendered markup.

```
data/site.json          products, collections, brand facts
lib/site.js             helpers: WhatsApp links, price labels, lookups
app/                    routes (App Router)
components/             Header, Footer, ProductCard, Lightbox, Icons
public/assets/          logo, product photos, self-hosted fonts
```

To change a price: find the product in `data/site.json`, set `"price": 230`, commit.
To mark a product as unpriced: set `"price": null` and it renders "Price on request via WhatsApp".

## Routes

| Route | Purpose |
|---|---|
| `/` | Hero, collections, featured, teacher set, about, how it works, coming soon, contact |
| `/collections/[slug]` | 5 collections: encourage, inspire, celebrate, teacher-appreciation, everyday |
| `/about` | Our story |
| `/how-to-order` | Ordering guide, HowTo schema |
| `/faq` | 8 questions, FAQPage schema |
| `/contact` | WhatsApp, call, service area |
| `/legal/privacy`, `/legal/terms`, `/legal/cookies` | Legal |
| `/sitemap.xml`, `/robots.txt` | SEO |
| 404 | Custom, with recovery links |

## Catalogue

27 products across 5 collections. **11 have confirmed prices** taken from the client's own ad artwork;
**16 show "Price on request"**. Every product card opens WhatsApp pre-filled with its name, spec and price.

## Gift bag (cart)

A cart that batches an order instead of taking payment. `components/CartProvider.js` holds
`[{id, qty}]` in `localStorage` under `gwp.giftbag.v1` and resolves product facts from
`data/site.json` on every render, so a price edit is never served from stale storage.

"Send bag on WhatsApp" composes one message listing each item, quantity, spec and unit price,
plus a subtotal **for the priced items only**. Unpriced items are listed as "price on request"
and the message asks for a quote. If any item is personalised, the message ends with a prompt
for the name to print.

There is no payment, no shipping calculation and no stock count, because none of those are
confirmed. See `NEEDS_CONFIRMATION.md`.

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap and schema. Falls back to the Vercel production URL, then localhost. **Set this once a custom domain is connected.** |

## Deployment

Pushed to Vercel via CLI. To redeploy:

```bash
npx vercel deploy --prod --token "$VERCEL_TOKEN"
```

Vercel keeps every deployment immutable, so rollback is instant from the dashboard.

## Guarantees held in this build

- No invented prices, shipping terms, returns policy, testimonials or reviews
- No AI-generated or fabricated product photography
- Logo SVG used exactly as supplied, never regenerated
- No claim of partnership with any character brand; a disclaimer appears wherever character prints are shown
- Afrikaans product text preserved verbatim, never auto-translated
- Teacher Appreciation palette isolated to that collection, per BRAND.md §3
- Zero cookies, zero analytics, zero third-party requests
- Security headers including CSP and HSTS, verified on the live site
- WCAG 2.1 AA: zero axe-core violations across all 14 routes, verified on the live site
