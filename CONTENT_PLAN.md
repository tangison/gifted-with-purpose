# CONTENT_PLAN.md

## Source of truth

`data/site.json` holds every product, collection, price and description. Page copy lives in the
route files. Nothing is fetched at runtime.

## Provenance rules

Every factual claim traces to a supplied asset:

| Content | Source | Status |
|---|---|---|
| Business name, tagline, phone, location | Logo, flyer, product ads | Verified |
| Team story | **Client's own Our Story copy, sent 27 Aug 2026, used verbatim** | Verified |
| Collection names and bullets | Flyer section headers | Verified |
| 11 prices | Legible in the client's own studio ads | Verified |
| Product sizes | Lavender spec pill in each ad | Verified |
| Product names | Read from the printed artwork | Descriptive, needs client confirmation |
| Product descriptions | Written from what is visibly printed | Descriptive, no material claims |
| 16 prices | Not in any asset | Shown as "Price on request" |
| Delivery, returns, testimonials | Not in any asset | Absent, flagged |

## Copy status by page

| Page | Status |
|---|---|
| Home | Written, brand-derived |
| About | **The client's Our Story copy, verbatim.** Hero carries the opening line, body carries the remaining 3 paragraphs and the sign-off |
| Collections | Blurbs written per collection, product copy from artwork |
| How to order | Written, describes the real WhatsApp flow |
| FAQ | 8 questions, delivery and returns answered honestly as unconfirmed |
| Contact | Written, states plainly that social links are not published yet |
| Brand guide | Written from BRAND.md |
| Legal | Written to match reality: no cookies, no analytics, no payment |

## Language

English default. Afrikaans appears only as printed product text, tagged `lang: "Afrikaans"` at
product level and never auto translated. The site is not a full bilingual build; that was not
requested.

## Tone rules applied

No em dashes in copy we write. One exception: the client's own Our Story copy contains an em dash,
and client-approved wording is not rewritten to satisfy our style rule, so `audit_copy.py`
allowlists that exact phrase and still reports every other one. No invented metrics or testimonials. No "revolutionary", "seamless" or "elevate".
Short affirming headlines. Specific claims over marketing language. Every price either real or
openly marked unconfirmed.

## Maintenance

To change a price: edit `data/site.json`, commit, Vercel redeploys.
To add a product: add the object plus a photo in `public/assets/products/` at 1000px and 560px.
Never hand-edit rendered markup.
