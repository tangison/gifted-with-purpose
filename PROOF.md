# PROOF.md

Phase | Action | Target | Command or method | Result | Evidence | Status

Build | Remove decorative blobs, marquee, floating animation | app/site.css | regex edit + grep | 0 occurrences remain | grep -c blob/strip-track/floaty = 0 | Done
Build | Tighten radii 34px to 16px scale | app/site.css | token edit | --r-sm 4px, --r-md 8px, --r-lg 12px, --r-xl 16px | grep '--r-' | Done
Build | Remove pill buttons | app/site.css | replace border-radius:999px | 1 remaining (cart badge, intentional circle) | grep -c = 1 | Done
Build | Remove hover-lift transforms | app/site.css | replace with border colour change | 2 remaining (FAQ chevron rotation only) | grep translateY | Done
Build | Remove scroll-reveal wrappers | 9 files | className strip | 0 .rv nodes in DOM | audit vibe=0 all routes | Done
Build | Delete reveal IntersectionObserver | components/SiteEffects.js | remove effect | dead code removed | grep IntersectionObserver = 0 | Done
Build | Eyebrow pill to editorial label | app/site.css + 5 pages | rule rewrite, icons removed | rule-and-caps label | screenshot v4-top-desk | Done
Build | Header logo 42px to 84px, centred | components/Header.js, site.css | grid 1fr auto 1fr | logo=84 on all 14 routes | audit output | Done
Build | Remove duplicate wordmark text | components/Header.js | delete .brand-tx | 0 duplicates | audit wordmarkDupe=0 | Done
Build | Footer logo to large closing mark | components/Footer.js, site.css | reposition below links | 350px mobile, 558px desktop | i-foot-desk.png | Done
Build | Minimal footer | components/Footer.js | remove 4-column block, white bg | single centred column | i-foot-desk.png | Done
Build | Cart (Gift Bag) state layer | components/CartProvider.js | localStorage + useMemo | persists across reload | badge 3 after reload | Done
Build | Cart drawer UI | components/CartDrawer.js | focus trap, Esc close | traps focus, closes on Esc | interaction test | Done
Build | Add to bag on product cards | components/ProductCard.js | button + state | 9 buttons per collection page | interaction test | Done
Verify | Cart maths | live | 2x250 + 200 | N$700.00 correct | interaction test | Done
Verify | Cart honesty on unpriced items | live | add unpriced product | no subtotal, asks for quote | interaction test | Done
Debug | CSS/JS 404 with MIME text/html | :3000 and :3100 | root cause: two servers, stale .next | killed by PID, rm -rf .next, rebuild | clean render | Fixed
Audit | axe-core WCAG 2.1 AA | 14 routes | axe.run wcag2a/2aa/21a/21aa | 12 violations found | first run | Fixed
Fix | Contrast: white on #25D366 was 1.98:1 | site.css | --wa-btn #0B6B41 | 6.58:1 | contrast calc | Done
Fix | Contrast: pink CTA 3.86:1 | site.css | #C21F57 | 5.79:1 | contrast calc | Done
Fix | Contrast: category sub-labels 1.87:1 | data/site.json accent_ink | per-collection ink | 5.46 to 7.03:1 | contrast calc | Done
Fix | Contrast: legal inline links 3.71:1 | site.css | #B32359 | 6.12:1 | contrast calc | Done
Fix | Header WhatsApp link had no accessible name | Header.js | aria-label added | link-name passes | axe rerun | Done
Audit | axe-core rerun, same tool same config | 14 routes | axe.run | 0 violations | axe rerun | Pass
Audit | axe-core with cart drawer open | /collections/inspire | axe.run | 0 violations | cart a11y test | Pass
Audit | Responsive overflow | 320/375/414/768/1024/1280/1440 | scrollWidth vs innerWidth | 0 overflow at every width | a_resp.py | Pass
Audit | Broken images after full scroll | / and /collections/encourage | naturalWidth check | 0 broken, 0 HTTP>=400 | recheck | Pass
Audit | Production build | repo | npx next build | 18/18 static pages | build log | Pass
Audit | Lighthouse mobile, first run | live / and /collections/encourage | lighthouse 12, simulated throttling | perf 95/92, CLS 0/0.158, a11y 100/98 | /tmp/lh-*.json | Findings
Debug | CLS 0.158 on collection pages | app/fonts.css | PerformanceObserver layout-shift, real browser | root cause: font-display swap reflow on cold load | shift trace | Fixed
Fix | font-display swap to optional, 10 faces | app/fonts.css | replace + preload 4 critical faces | CLS 0 on both routes | lh2-*.json | Done
Debug | Heading order h1 to h3 on collection pages | app/collections/[slug]/page.js | lighthouse heading-order audit | root cause: product grid had no h2 | audit detail | Fixed
Fix | Accessible section heading above product grid | collections/[slug] + .sr-only | sr-only h2 | a11y 98 to 100 | lh2-col.json | Done
Audit | Lighthouse mobile, rerun same tool same config | live, both routes | lighthouse 12 | 95/94 perf, 100 a11y, 100 bp, 100 seo, CLS 0 | lh2-*.json | Pass
Build | Remove hidden hero logo still preloaded in DOM | app/page.js | delete markup, not display:none | one logo request saved | grep hero-art = 0 | Done
Build | Remove dead .chips/.chip filter CSS | app/site.css | selector sweep vs JSX | 659 chars removed | grep = 0 | Done
Docs | Reconcile README and CHECKLIST with the cart | README.md, CHECKLIST.md | rewrite sections 9, 18, 6 | docs match shipped build | git diff | Done
Audit | Cross-browser cart journey | live, Chromium 151 / Firefox 153 / WebKit 26.5 | playwright, 390px | identical on all three: logo 84, ftr 350, overflow 0, badge, persist, Esc, wa link | /tmp/xbrowser.py | Pass
Build | Open Graph image was portrait 1000x1120 (ratio 0.89) | public/og-image.jpg | compose real logo + real product at 1200x630 | ratio 1.91, 74KB | og-image.jpg | Done
Build | Web app manifest | app/manifest.js | Next metadata route | 200 application/manifest+json | live check | Done
Build | Raster icons from the supplied SVG | public/ | convert at density 400 | favicon.ico 48, apple 180, png 192 and 512 | live 200s | Done
Build | Brand guide page (mandatory per brief) | app/brand/page.js | logo rules, palette, type, voice, motion | 200, noindex by intent | live check | Done
Build | Human-readable sitemap | app/sitemap-page/page.js | linked from footer and XML sitemap | 200 | live check | Done
Audit | axe-core on the two new pages | /brand, /sitemap-page | axe.run wcag2a-21aa | 0 violations | axe run | Pass
Audit | Lighthouse /brand | live | lighthouse 12 mobile | perf 96, a11y 100, bp 100, CLS 0, SEO 69 | /tmp/lh-brand.json | Pass
Note | /brand SEO 69 | live | is-crawlable audit | sole failure is the intentional noindex on an internal reference page | lh-brand.json | Accepted
Build | Error boundary | app/error.js | recoverable, reset + WhatsApp fallback | catches runtime throw, both actions present | boundary test | Done
Build | Fatal error boundary | app/global-error.js | inline styles, replaces document | builds, no layout dependency | build log | Done
Build | Loading state | app/loading.js | skeletons matching card geometry | no layout shift on swap | build log | Done
Verify | Error boundary catches a real crash | temporary /boomtest route | client component throwing after mount | boundary rendered, retry + WhatsApp present, credit intact | err-boundary.png | Pass
Build | Remove temporary test route | app/boomtest | rm -rf, rebuild, live check | /boomtest returns 404 live | live check | Done
Docs | PRODUCT.md, BRAND.md, BUILD_PLAN.md, CONTENT_PLAN.md | repo root | written from what was actually built | all five required docs present | ls | Done
Build | Tangison Studio credit | components/Footer.js | linked to studio.tangison.com | present on all 16 rendered pages | live grep | Done
Audit | axe-core after adding the credit | 16 routes live | axe.run wcag2a-21aa | 6 violations, all .ftr-credit contrast 3.06:1 | axe run | Findings
Fix | Credit link contrast | app/site.css | taupe #A19088 to muted #6B6259 | 3.06:1 to 5.97:1 | contrast calc | Done
Audit | axe-core rerun, same tool same config | 16 routes live | axe.run | 0 violations | axe rerun | Pass
Audit | npm audit, production deps | repo | npm audit --omit=dev | 1 critical + 2 high in next@14.2.15 and sharp | audit output | Findings
Audit | Secret scan, full git history | all commits | git log -p grep for token patterns | 0 secrets | scan output | Pass
Audit | Unused dependencies (Ponytail) | repo | depcheck | sharp unused at top level | depcheck output | Findings
Fix | Upgrade Next 14.2.15 to 16.3.2 | package.json | npm i next@16.3.2 | critical resolved | npm audit | Done
Debug | Collection pages rendered 0 products after upgrade | app/collections/[slug] | curl server HTML, 0 article tags | root cause: Next 16 made params a Promise, read synchronously | server HTML | Fixed
Fix | Await params in page and generateMetadata | app/collections/[slug]/page.js | async + await params | 9 articles, prices and Offers restored | server HTML | Done
Fix | Remove redundant top-level sharp | package.json | npm remove sharp | Next 16 bundles patched sharp 0.35.3; AVIF still served | live image check | Done
Audit | npm audit rerun, same command | repo | npm audit --omit=dev | found 0 vulnerabilities | audit output | Pass
Audit | Full route sweep on Next 16 | 16 routes local | playwright | all clean, correct card counts per collection | sweep output | Pass
Audit | axe-core on Next 16 | 16 routes live | axe.run wcag2a-21aa | 0 violations | axe run | Pass
Audit | Reduced-motion compliance | live | computed styles under both preferences | transitions 1e-06s under reduce, 0 infinite animations | motion check | Pass
Audit | Structured data validation | 8 live routes | required-field check per schema type | 0 issues across 9 schema types | schema check | Pass
Audit | Lighthouse on Next 16 | live, 2 routes | lighthouse 12 mobile | 95 and 96 perf, 100 a11y, 100 bp, 100 seo, CLS 0 | lh16-*.json | Pass
Audit | Unknown dynamic slug handling | live /collections/<bogus> | curl status + body inspection | HTTP 200 with 404 body and an indexable robots tag | curl output | Findings
Fix | dynamicParams = false on the collection route | app/collections/[slug]/page.js | export const dynamicParams = false | bogus slugs now return real 404 and noindex | live check | Done
Verify | Real collections unaffected | 5 live collection pages | article count + status | 200 with 9/9/8/2/2 products | live check | Pass
Verify | Path traversal attempt | live /collections/%2e%2e | curl -L | edge normalises to homepage, no traversal, no path leakage | curl output | Pass
Audit | Keyboard-only journey | live and local | real Tab traversal, no forced focus | skip link first, jumps to #main; every stop has a visible ring | keyboard test | Pass
Audit | Gift bag by keyboard | local | Enter to open, Tab x14, Escape | opens, focus enters, trapped across 14 tabs, Esc closes and restores focus to trigger | keyboard test | Pass
Audit | Mobile drawer by keyboard | local 390px | Enter to open, Tab x8, Escape | all 8 stops inside drawer and ringed, Esc closes and restores focus | keyboard test | Pass
Note | 11 elements appeared to lack a focus ring | probe using forced .focus() | compared against real Tab traversal | false positive: :focus-visible only fires for keyboard input, and the elements were in the closed drawer | keyboard test | Rejected
Audit | Sitemap vs noindex conflict | live | compare sitemap URLs against robots meta | 0 conflicts, /brand correctly excluded | sitemap check | Pass
Audit | Canonical vs sitemap agreement | live, 14 URLs | compare each loc against its canonical | homepage mismatched: sitemap had trailing slash, canonical did not | curl compare | Findings
Fix | Align sitemap homepage entry to the canonical | app/sitemap.js | emit origin without trailing slash | 14 of 14 match | live compare | Done
Audit | Dead npm script after Next 16 | package.json | next --help | 'next lint' removed in Next 16, script would fail | help output | Findings
Fix | Replace next lint with eslint flat config | eslint.config.mjs, package.json | eslint 9 + eslint-config-next 16 native flat export | lint runs | eslint output | Done
Audit | ESLint first run | repo | npx eslint . | 2 errors, 2 warnings | eslint output | Findings
Fix | setState inside effect in CartProvider | components/CartProvider.js | removed the redundant ready flag | error cleared | eslint | Done
Fix | setState inside effect in Header | components/Header.js | drawer state derived from pathname, effect deleted | error cleared | eslint | Done
Debug | React error 418 hydration mismatch | live sequence add, reload, navigate | reproduced 3 of 3 runs | root cause: lazy initialiser read localStorage during render while the server rendered an empty bag | console capture | Fixed
Fix | Hydration-safe cart state | components/CartProvider.js | useSyncExternalStore so server and first client render both produce an empty bag | 0 hydration errors across 3 runs local and 1 live | console capture | Done
Verify | Cart behaviour after refactor | live | add 2, reload, client-side navigate | badge 2, subtotal N$450.00, persists, 0 console errors | live check | Pass
Audit | ESLint final | repo | npx eslint . | 0 errors, 0 warnings | eslint output | Pass
Audit | React 18 against Next 16 peer range | package.json | read next peerDependencies | react ^18.2.0 explicitly supported, no React 19 only APIs in use | peer check | Pass
Audit | Slow 3G behaviour | live, 400kbps 400ms latency | CDP network emulation | DOMContentLoaded 3.2s, products painted 3.3s, 15 WhatsApp links usable immediately | emulation run | Pass
Audit | Storage failure modes | live, 7 scenarios | init script overriding Storage prototype | private mode setItem throw, getItem throw, corrupt JSON, wrong shape, stale product id, negative qty: cart works in all, 0 errors | scenario run | Pass
Audit | Quantity edge cases | live | decrement past zero, increment to 12 | empties correctly with a working Keep browsing exit, 12 x N$250 = N$3000.00 exact | edge run | Pass
Audit | WhatsApp URL length on a full bag | live, 27 products x9 | measure wa.me url | 3670 chars, past the ~2000 safe limit where some Android browsers and WhatsApp truncate silently | length probe | Findings
Fix | Cap the WhatsApp message with a summary fallback | components/CartProvider.js | itemise while the final message fits, then summarise the remainder | worst case 3670 to 1781 chars | length probe | Done
Debug | First cap attempt still exceeded the limit | components/CartProvider.js | probe line was shorter than the real summary line | measured against the final message instead of a placeholder | 1903 to 1781 | Fixed
Verify | Cap across bag sizes | local and live | 1, 5, 12, 27x9, 27x99 items | all within 1900 chars, subtotal preserved, normal orders still fully itemised | length probe | Pass
Audit | Impeccable 5-dimension audit | live site | measured scan, not source reading | 16/20: theming 2, anti-patterns 2 | AUDIT.md | Findings
Fix | Kill gradient backgrounds | app/site.css | flat colour blocks | 6 gradients to 0 decorative (1 functional shimmer) | served CSS | Done
Fix | Remove glassmorphism | app/site.css | solid + hairline border | 5 backdrop-filter to 0 | served CSS | Done
Fix | Tokenise hard-coded colours | app/site.css | promote literals to tokens | 35 to 43 tokens, 0 repeated literals | grep | Done
Build | Unified /shop with category tabs | app/shop | client filter over server-rendered grid | 27 products, 6 tabs, filters 27 to 7 | live check | Done
Build | Progressive disclosure on product cards | components/Disclosure.js | native details | 206px saved per card, ~5500px across the grid | measured | Done
Build | Legal pages as disclosures | components/LegalSections.js | split on h2 | 18 sections on /legal/privacy | live check | Done
Build | Colour-blocked collection headers | app/site.css | accent_ink block | each collection visually distinct | screenshot | Done
Build | Tangison Studio construction credit | components/Footer.js | linked, all pages | "Site designed and built by Tangison Studio" | live grep | Done
Debug | Remediation introduced contrast failures | live | axe on 17 routes | white on light accents 1.78-2.01:1, stat pills 4.22:1 | axe output | Fixed
Fix | Use accent_ink for colour blocks | app/site.css | darker per-collection ink | 5.92-7.99:1 with white | contrast calc | Done
Debug | New /shop grid broke heading order | app/shop/ShopClient.js | lighthouse heading-order | a11y 98 | lighthouse | Fixed
Fix | Accessible section heading on shop grid | app/shop/ShopClient.js | sr-only h2 | a11y back to 100 | lighthouse | Done
Audit | Re-audit after remediation | live | axe + lighthouse | 0 violations / 17 routes, /shop 89/100/100/100 CLS 0 | AUDIT.md | Pass
Audit | Identify the logo wordmark typeface | logo SVG | rasterise at 400dpi, crop letterforms, render 6 Google candidates at matched cap height | Fraunces at SOFT=100 WONK=1 matches: flared terminals, splayed R leg, heavy low contrast. The generic look was Fraunces at DEFAULT axes, not the wrong family | /tmp/fontcompare.png, /tmp/match.png | Done
Fix | Swap display face to the correct instance | app/fonts.css | self-host Fraunces Soft 600/900 latin subsets, 33KB total | family now "Fraunces Soft" | live computed style | Done
Fix | Hero to semibold with optical alignment | app/site.css | weight 600, negative margin tuned against measured drift | drift .045em to .0125em: 0.42px mobile, 0.77px tablet and desktop | measured | Done
Debug | Desktop hero was centred, not inline | app/site.css | measured left edges: sub at 467px vs h1 at 29px | root cause: centred hero-in on desktop | left-aligned editorial column | measured | Fixed
Build | Spacing scale tokens | app/site.css | --s-1 to --s-8, 6px to 168px | sections 46px to 80px mobile, 70px to 120px desktop | grep | Done
Build | Brand pattern fields | public/assets/patterns | 4 SVGs from BRAND.md motifs, logo palette only, under 600 bytes each | sparkle, confetti, hearts, teal | file sizes | Done
Build | Slider rail for featured products | app/page.js | scroll-snap peek rail, 78% mobile to 30% desktop | replaces a 7-card wall | live | Done
Build | Copy behind accordions | app/page.js | how-it-works steps and about detail | titles visible, prose collapsed | live | Done
Debug | New rail link failed contrast | live | axe on 17 routes | 3.85:1 light pink on white | changed to #B32359 | axe | Fixed
Audit | Re-audit after typography and layout pass | live | axe + lighthouse | 0 violations / 17 routes; / 91 perf, /shop 92, both 100 a11y, CLS 0 | lhf-*.json | Pass
Confirm | Namibian dialling code | client message | +264 confirmed correct | phone_intl added as "+264 81 407 6649", displayed sitewide | data/site.json | Done
Build | Hero background image | public/assets/patterns | generated abstract craft texture in brand palette, no products or people | 29KB mobile / 65KB desktop | file sizes | Done
Debug | Hero image never loaded | app/page.js | computed ::before showed sparkle-blush.svg, hero-texture requests NONE | root cause: .pat-sparkle also targets ::before and overrode the hero layer | removed the conflicting class | measured | Fixed
Verify | Hero texture visibility | live | pixel std dev of a clean right-hand strip | 5.58 to 14.09 mobile and 18.14 desktop against a 17.65 source | measured | Pass
Fix | Hard band across hero text | app/site.css | cover + vertical mask + .85 opacity | soft edges, no band | screenshot | Done
Build | All buttons fully rounded | app/site.css | 999px on btn, burger, cart, tabs, qty, social, close | 11 pill radii | grep | Done
Fix | CTA labels wrapped to 3 lines | app/site.css | white-space:nowrap + row layout on desktop | 49px single line both breakpoints | measured | Done
Fix | Category left border to shadow | app/site.css | coloured drop shadow keyed to each accent | .cat::after removed | grep | Done
Debug | Hero image cost performance | live | lighthouse | 91 to 86, LCP 3.0 to 3.9s | preload with media queries + recompress | 88, LCP 3.4s | Fixed
Audit | Re-audit after visual pass | live | axe 17 routes + lighthouse | 0 violations, / at 88 perf, 100 a11y, CLS 0 | lhh2.json | Pass
Blocked | Social profile URLs | client message | user said "use the urls" but no URLs were included | still unresolved, icons point to /contact | NEEDS_CONFIRMATION.md | Blocked
Confirm | Social URLs, city, prices | client WhatsApp Business screenshots | read directly from the images | facebook.com/Giftedwithpurpose, instagram.com/giftedwithpurpose_2024, Windhoek, six catalogue prices | screenshots | Done
Fix | Five products moved off "price on request" | data/site.json | matched to the client's own catalogue lines | priced 11 to 16 of 27 | data | Done
Build | Off-canvas drawer with imagery | components/Drawer.js | 132px logo, per-collection product thumbnail, live count, tinted shadow | 5 tiles, 5 thumbs loaded, 101px logo at 390px | measured | Done
Build | Scroll to top | components/ScrollTop.js | appears past 2 viewports, clears the sticky bar, reduced-motion aware | returns scrollY to 0 | measured | Done
Fix | Real social links | components/Footer.js, Drawer.js | replaced /contact placeholders | both resolve to the live profiles | measured | Done
Audit | axe with the drawer OPEN | live | a state a normal page-load audit never reaches | 0 violations, focus trapped across 12 tabs, Escape closes | axe | Pass
Audit | axe with scroll-top visible | live | color-contrast + button-name | 0 violations | axe | Pass
Audit | Full re-audit | live 17 routes | axe wcag2a-21aa | 0 violations | axe | Pass
Build | Product card redesigned as an editorial ticket | components/ProductCard.js | vertical collection spine, index numeral, price punched on the photo, perforated tear line to the stub | 27 tickets, 27 spines, sequential numerals | screenshot | Done
Debug | Ticket buttons overflowed the card edge | app/site.css | global btn white-space:nowrap blocked btn-block from shrinking | scoped override plus shorter labels | 0 wrapped buttons, 0 page overflow | measured | Fixed
Debug | Price tag collided with the language flag | app/site.css | flags moved to the top of the photo | 0 collisions across 27 cards | measured | Fixed
Debug | Spine clipped the left edge of the photo | app/site.css | spine was overlaid on the image | media given a left inset so the spine is a margin element | screenshot | Fixed
Copy | Homepage rewritten | app/page.js | specificity, Namibian place names, real prices | headline, tagline, all section heads and step copy | live | Done
Copy | Collection blurbs and bullets rewritten | data/site.json | second person, concrete, no marketing abstraction | 5 collections | live | Done
Copy | Shop, contact, about, how-to-order rewritten | 4 route files | named Geneveve and Windhoek, removed generic phrasing | live | Done
Audit | Re-audit after card and copy work | live 17 routes | axe wcag2a-21aa + lighthouse | 0 violations, /shop 92 perf, 100 a11y, 100 bp, 100 seo, CLS 0 | lhs.json | Pass
Build | Download 141 PDFs from filebin | filebin.net/k5nxe7d3pv2i9rjn | curl with verified cookie, one at a time | 141/141 downloaded, 0 failures | convert.log | Done
Build | Convert every PDF to WebP | public/assets/designs | pdftoppm 150dpi then cwebp, full 1400px q82 plus 560px thumb | 282 files, 126MB of PDF to 20MB of WebP | du | Done
Verify | Every output is a valid image | 282 files | PIL open and load on each | 141 full plus 141 thumbs valid, 0 zero-byte | check | Pass
Debug | file(1) flagged design-40.webp as a boot sector | design-40.webp | verified with PIL instead | false positive, valid 1400x1219 WebP | check | Rejected
Build | Alt text and metadata for all 141 | data/designs.json | wrote from contact-sheet inspection of every image, not from filenames | 141 entries with alt, title, group, category | designs.json | Done
Build | Pick your design gallery | app/designs | filter tabs, reference codes, lightbox, per-design WhatsApp deep link | 141 cells, 141 with real alt | live | Done
Build | WhatsApp order form | app/contact/OrderForm.js | structured fields compose a wa.me message, no backend, no stored lead | validates on empty submit, clears when filled | live | Done
Debug | 141 orphaned list items on /designs | app/designs/DesignGallery.js | axe listitem violation | root cause: role=tabpanel on the ul overrode list semantics | moved role to a wrapper div | axe | Fixed
Audit | axe across 18 routes after the build | live | wcag2a to wcag21aa | 0 violations | axe | Pass
Verify | Live asset delivery | live | curl on sample designs | 200 image/webp on all sampled | curl | Pass

---

## Phase 12 — Unify shop and designs into one catalogue (25 Aug 2026)

| Phase | Action | Target | Command or method | Result | Evidence | Status |
|---|---|---|---|---|---|---|
| 12.0 | Fetch the bar, not a memory of it | casetify.com, papier.com | Scrapling `Fetcher.get` + Playwright screenshots at 1440 and 390 | Both HTTP 200. Casetify card verbatim: `Orchidia \| iPhone 17 Pro Max \| Impact Case MagSafe \| $64`. Papier: `Cornflower · £23.00 · Hardback Lined Notebook · 2 bindings`, "154 designs" counter, 4 filter chips | `/home/user/bar/*.png`, `bar.json` | Done |
| 12.1 | Review all 141 designs by eye | `public/assets/designs` | 4 contact sheets rendered with PIL, read individually | Found 34 placeholder alt texts, 1 wrong scripture reference, 1 unflagged brand | `/home/user/bar/sheet-*.png` | Done |
| 12.2 | Correct scripture reference | `design-33` | Read the artwork | Was "1 Peter 3:18", artwork reads **2 Peter 3:18** | `sheet-design-a.png` | Fixed |
| 12.3 | Flag unlicensed brand | `design-19` | Read the artwork | Real cola label, now `licensed: true` with disclaimer | `sheet-design-a.png` | Fixed |
| 12.4 | Rewrite design metadata | `data/designs.json` | `scripts/build_designs.py` | 141 items with name, alt, 24 themes, `licensed` (49), `personalisable` (11), `photo_upload` (12), intrinsic sizes | `python3 scripts/build_designs.py` | Done |
| 12.5 | Create the priced item layer | `data/blanks.json` | Hand-written from the WhatsApp catalogue | 8 items, 4 priced from the catalogue, 4 explicitly `null` | `data/blanks.json` | Done |
| 12.6 | Join the two halves | `lib/catalog.js` | `blanksForDesign`, `designsForBlank`, `priceFromDesign`, `searchDesigns`, `relatedDesigns` | No function can produce a price that is not in `blanks.json` | `lib/catalog.js` | Done |
| 12.7 | Build the new routes | `/shop/[blank]` ×8, `/designs/[id]` ×141, `/create` | `next build` | 172 routes prerendered | build log | Done |
| 12.8 | Verify served HTML, not status codes | 177 routes | `scripts/verify_routes.py` | Each design page must contain its own name, reference and price table; each item page its spec and price | `ALL PASS` ×3 | Done |
| 12.9 | Bug: custom option unreachable | `/create` | verify_routes | "Ask us to draw one" was hidden until an item was picked, so it was invisible to crawlers and undecided visitors | Fixed, re-ran the exact failing check | Fixed |
| 12.10 | Bug: wrong default item | `/designs/sippy-18` | `scripts/verify_flow.py` | Cheapest-first sorting preselected a mug for a sippy-cup wrap. Now the item the art was drawn for comes first | Fixed, `FLOWS PASS` ×3 | Fixed |
| 12.11 | Drive the real flows in Chromium | `/create`, `/designs/[id]` | `scripts/verify_flow.py` | 3 × 11oz Mug = N$360.00 in the composed wa.me URL; unpriced item emits "please confirm" and **no N$ figure**; empty submit shows 2 errors | `FLOWS PASS` ×3 | Done |
| 12.12 | axe-core sweep | 19 routes × 2 viewports + 6 interactive states | `scripts/verify_a11y.py` | Found **31 violations**. Fixed: `role="alert"` on a `<ul>` (my own regression, same class as the earlier tabpanel bug), sticky bar outside a landmark, 4 heading-order breaks | Re-ran: **0 violations** | Fixed |
| 12.13 | Responsive sweep | 6 routes × 7 widths | `scripts/verify_a11y.py` | Found 2 overflows I introduced plus 1 pre-existing (`.btn` `nowrap` at 320px) | **0 overflow** at 320/375/414/768/1024/1280/1440 | Fixed |
| 12.14 | Bug: CLS 0.125 | `/shop/sippy-cup` | Lighthouse | I hardcoded `width={900} height={900}` on photos that are 554×1200. Browser reserved a square, image reflowed the page | Measured every asset, wrote real dimensions into the data. **CLS 0.125 → 0, perf 74 → 96** | Fixed |
| 12.15 | Blind A/B vs the bar | `/designs` at 1440 | Screenshot next to `papier-collection-d.png` | Ours lost: 0 designs above the fold vs Papier's 4, 24 chips in 3 rows vs 4, first 4 cards near-identical, nav wrapped to 2 rows | Fixed all four: interleaved batches, 6 chips + "All 24 filters", compact header, trimmed nav. **8 cards above the fold** | Fixed |
| 12.16 | Lighthouse mobile | 7 routes | lighthouse 12, simulated throttling | `/shop` 98, `/designs` 98, `/create` 98, `/designs/design-33` 96, `/shop/sippy-cup` 96, `/shop/mug-11oz` 96, `/` 85. **All 100 a11y / 100 BP / 100 SEO. CLS 0 everywhere except `/` at 0.001** | `/tmp/l_*.json` | Done |
| 12.17 | Lint and audit | repo | `npx eslint .`, `npm audit --omit=dev` | 0 errors, 0 warnings, **0 vulnerabilities** | terminal | Done |

**Not fixed, stated plainly:** `/` scores 85 on mobile performance. The cause is the pre-existing hero background image, not this turn's work. Every page built this turn scores 96 or higher.
