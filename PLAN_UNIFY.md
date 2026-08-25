# Plan: unify Shop and Designs into one system

**Date:** 25 Aug 2026
**Trigger:** "not everything where design and the shop and design must ve interelated so i want you combine and the site to collaborate perfectly"

---

## 1. The actual problem

The site was built as two disconnected halves.

| | `/shop` | `/designs` |
|---|---|---|
| Contains | 27 product entries | 141 design sheets |
| Says the price | Yes, on 16 of 27 | Never |
| Says what it prints on | Implicitly (one photo) | Never |
| Links to the other half | No | No |

That is wrong for this business. The user's correction: **the products are few (types of mugs and cups), the designs are many (ready-made plus custom).**

So `/shop` was pretending 27 photographs were 27 separate products, when several of them are the *same blank* with a different print on it. And `/designs` was 141 orphans with no price and no route to purchase beyond "ask about this design".

## 2. The corrected model

Three layers, joined:

```
BLANK (few, priced)   ×   DESIGN (many, free choice)   =   ORDER
11oz mug  N$120           141 ready-made                  via WhatsApp
Sippy cup N$230           or custom artwork               with a reference code
20oz tumbler N$250
...
```

Confirmed with the user on 25 Aug 2026:
- **Any design goes on any product. The product sets the price.**
- **Custom artwork is quoted per job**, no published number.
- Publish only prices that trace to the client's own catalogue or artwork. Everything else "Price on request".

## 3. The bar (fetched, not guessed)

Two live references pulled with Scrapling + Playwright on 25 Aug 2026. Evidence in `/home/user/bar/`.

**Casetify** — `https://www.casetify.com/collection/best-selling-prints`, HTTP 200, screenshot `casetify-best.png`.
Card text extracted verbatim from the live DOM:
```
Orchidia | iPhone 17 Pro Max | Impact Case MagSafe Compatible | $64
```
Structure: **design name is the product identity**, the blank is a variant beneath it, price is the blank's. Grid `repeat(3, 1fr)`, gap `10px 20px`. Filter rail is faceted by Style / Artist.

**Papier** — `https://www.papier.com/notebooks`, HTTP 200, screenshot `papier-collection-d.png`.
Card: `Cornflower · £23.00 · Hardback Lined Notebook · 2 bindings`. Named designer credit under the design name. Header carries a live **"154 designs"** count next to filter chips (`Product Type`, `Binding Type`, `Add a photo`, `Foiling`) and a `Sort by` control. Sub-navigation is a rail of *format* cards (Lined / Dotted / Plain / Spiral / Leather) each with three-bullet specs. Body `SuisseIntl 14px` on `rgb(250,247,240)` warm paper, ink `rgb(30,37,37)`.

What we take: structure and information architecture from Casetify, warmth and the format-rail plus design-count pattern from Papier. What we do not take: their fonts, their palette, their photography, review counts we do not have.

## 4. What gets built

### 4.1 Data layer
- **`data/blanks.json`** — new. The few physical items, each with spec, price (or `null`), photo, capacity, audience, care. This becomes the priced layer.
- **`data/designs.json`** — extended. Every design gains `name`, `tags[]`, `themes[]`, `drawn_for`, `licensed`, `personalisable`. The **34 placeholder alt texts** (`sippy-09`…`sippy-42`, currently "full-wrap character design, option 22") get real descriptions written from the images.
- **`lib/catalog.js`** — new. The join: `designsFor(blank)`, `blanksFor(design)`, `priceFrom(design)`, search index.

### 4.2 Pages
| Route | Change |
|---|---|
| `/shop` | Rebuilt as **the blanks**. Few cards, each priced, each showing "141 designs fit this" and linking through. |
| `/shop/[blank]` | **New.** One item: spec, price, care, then the design library filtered to it. |
| `/designs` | Rebuilt: search, theme facets, live count, price-from on every card, links to detail. |
| `/designs/[id]` | **New, 141 static pages.** Big preview, description, **"Print it on"** table of every blank with its price, personalise field, WhatsApp CTA carrying design ref + chosen item, related designs. |
| `/create` | **New.** The builder: item → design (library picker or custom brief) → personalisation → live summary with price → WhatsApp. This is where ready-made and custom meet. |
| `/` | Homepage restructured to teach the model in one screen: "Pick the cup. Pick the design. We print it." |

### 4.3 Correctness rules held throughout
- No invented prices. Blanks without catalogue or artwork evidence read "Price on request".
- Custom artwork reads "quoted per job", never a number.
- Licensed characters stay generically labelled, flagged `licensed: true`, excluded from hero and marketing surfaces, disclaimer visible wherever they appear.
- Afrikaans verbatim.
- No em dashes.
- Tangison Studio credit on every page.

## 5. Verification gate

Not "it builds". Each of these re-run after the last change:
1. Every one of the ~170 routes returns 200, `/nope` returns 404.
2. Served HTML of `/designs/design-33` actually contains the price table and the design name (not just a 200).
3. axe-core across a sampled route set, including new pages and the builder mid-flow. Zero violations.
4. Responsive sweep 320/375/414/768/1024/1440, zero horizontal overflow.
5. Lighthouse mobile on `/`, `/shop`, `/designs`, one detail page, `/create`.
6. Builder flow driven for real in Chromium: pick item, pick design, type a name, read the composed `wa.me` URL and assert it contains the reference, item and price.
7. Run 3×, not once. The CLS and hydration bugs were both single-run-invisible.

## 6. Status

Tracked in `PROOF.md`. Blocked items stay in `NEEDS_CONFIRMATION.md`.
