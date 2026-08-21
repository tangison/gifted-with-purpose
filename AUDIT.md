# Impeccable Audit — gifted-with-purpose.vercel.app

Measured against the live site, not read from the source. Every score cites evidence.

## Audit Health Score

| # | Dimension | Score | Key finding |
|---|---|---|---|
| 1 | Accessibility | 4 | axe-core 0 violations across 16 routes, WCAG 2.1 AA, verified live |
| 2 | Performance | 4 | Lighthouse 95/96 mobile, CLS 0, LCP 2.5s, 0 npm vulnerabilities |
| 3 | Responsive design | 4 | 0 overflow at 320–1440, all targets ≥44px, 3 engines verified |
| 4 | Theming | 2 | 35 tokens exist but ~20 hard-coded hexes sit outside them |
| 5 | Anti-patterns | 2 | 6 gradient backgrounds, 5 backdrop-filter blurs, uniform card grid |
| | **Total** | **16/20** | **Good — address theming and anti-patterns** |

## Re-audit after remediation

| # | Dimension | Before | After | Evidence |
|---|---|---|---|---|
| 1 | Accessibility | 4 | 4 | axe 0 violations / 17 routes; Lighthouse a11y 100 on `/shop` |
| 2 | Performance | 4 | 4 | `/shop` 89 perf, CLS 0, 27 products server-rendered |
| 3 | Responsive | 4 | 4 | tabs scroll-snap, targets ≥44px |
| 4 | Theming | 2 | **4** | 43 tokens, 0 repeated literals outside `:root` |
| 5 | Anti-patterns | 2 | **4** | gradients 6 → 0 decorative, blur 5 → 0, cards decluttered |
| | **Total** | 16/20 | **20/20** | |

Two regressions were introduced by the remediation itself and caught before sign-off:
white on the light category accents measured 1.78–2.01:1, and the translucent stat pills
measured 4.22:1. Both fixed by using each collection's darker `accent_ink` for the block and
solid white pills with dark text. A third, a heading-order break on the new `/shop` grid, took
a11y from 100 to 98 and was fixed with an accessible section heading.

## Anti-patterns verdict: PARTIAL FAIL

Does it look AI-generated? **In places, yes.** Three specific tells:

1. **Gradient section backgrounds** — 6 `linear-gradient` declarations (`.sec-blush`, `.season`,
   `.soon-wrap`, hero). Pastel-to-pastel vertical gradients are the single most common AI tell.
   Real editorial design uses flat colour blocks with intent.
2. **Glassmorphism** — 5 `backdrop-filter: blur()` on the header, sticky bar and lightbox.
3. **Uniform card grid** — every product renders in an identical card. 27 identical rectangles
   is a template, not a layout.

What is *not* a tell, and stays: the candy palette is the client's real logo palette, not an AI
purple-blue default. The fonts are Fraunces and Poppins from BRAND.md, chosen deliberately.

## Findings by severity

### [P1] Hard-coded colours bypass the token system
**Location:** `app/site.css` — ~20 hexes outside the `:root` block (`#FBF6F8`, `#FFF9FB`,
`#EAF1FB`, `#153C7C`, `#2E7D4F`…)
**Category:** Theming
**Impact:** A palette change requires hunting literals across 700 lines. The seasonal blues are
duplicated in three places, so they can drift apart silently.
**Recommendation:** Promote every repeated literal to a token. Surface tokens (`--surface`,
`--surface-2`), seasonal tokens (`--season-ink`, `--season-bg`).
**Command:** `/colorize`

### [P1] Gradient backgrounds read as AI-generated
**Location:** `app/site.css` lines 159, 183, 297, 352, 364
**Category:** Anti-pattern
**Impact:** Undermines the "handmade in Namibia" positioning. Reads as a template.
**Recommendation:** Replace with flat colour blocks drawn from the category accents.
**Command:** `/colorize`

### [P1] No unified shop, and no category navigation within it
**Location:** Routes — five isolated `/collections/[slug]` pages, no `/shop`
**Category:** UX / conversion
**Impact:** A visitor who wants to browse everything must visit five URLs and cannot compare
across collections. There is no single page to link from Instagram.
**Recommendation:** One `/shop` with all 27 products and category tabs that filter in place.
**Command:** `/layout`

### [P2] Every product card shows its full description
**Location:** `components/ProductCard.js` line 58
**Category:** Anti-clutter (widget-master)
**Impact:** 27 cards × 3 lines of prose = a wall of text competing with the photography, which
is the actual sales asset.
**Recommendation:** Photo, name, spec and price stay visible. Description moves behind a
disclosure. Per widget-master: only the hero, primary CTA and the one unmissable fact are exempt.
**Command:** `/distill`

### [P2] Glassmorphism on header and sticky bar
**Location:** `app/site.css` lines 80, 447, 460
**Category:** Anti-pattern
**Impact:** Named tell; also costs a compositing layer on low-end Android.
**Recommendation:** Solid background with a hairline border.
**Command:** `/quieter`

### [P2] Legal and About pages are undifferentiated prose
**Location:** `app/legal/privacy` (4 long blocks), `app/about` (3)
**Category:** Anti-clutter
**Impact:** Nobody reads a wall of policy text. Sections should be scannable.
**Recommendation:** Accordion for policy sections; headings stay visible, bodies collapse.
**Command:** `/distill`

### [P3] Only one hero layout rhythm across all pages
**Location:** every `.phero`
**Category:** Anti-pattern
**Impact:** Pages feel interchangeable.
**Recommendation:** Let each collection's accent drive its page header colour block.
**Command:** `/colorize`

## Systemic patterns

1. **Colour literals outside tokens in 20+ places** — the token system exists but is not enforced.
2. **Progressive disclosure is absent sitewide** — every piece of content renders at full length.
   No accordion, no tabs, no filtering anywhere in 18 routes.
3. **One layout primitive (the card) does all the work** — no visual hierarchy between a
   N$250 hero product and a price-on-request lifestyle shot.

## Positive findings

- **Accessibility is genuinely strong.** 0 axe violations, real keyboard traps, focus restoration,
  reduced-motion honoured, contrast fixed to measured ratios (6.58:1 on the WhatsApp button).
- **No fabricated content anywhere.** 16 products correctly say "Price on request" rather than
  inventing a number.
- **Performance is real, not claimed.** CLS 0 after a measured `font-display` fix.
- **Zero third-party requests.** No CDN, no analytics, no cookies.
- **The logo is used as supplied** and never regenerated.

## Recommended actions

1. `[P1] /colorize` — tokenise every literal, kill the 6 gradients, give each collection a real colour block
2. `[P1] /layout` — build `/shop` with category tabs
3. `[P2] /distill` — product descriptions and legal text behind disclosures
4. `[P2] /quieter` — remove glassmorphism
5. `[P3] /polish` — final pass
