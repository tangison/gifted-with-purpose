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

---

## Phase 13 — The blank range from the supplier SKU photographs (25 Aug 2026)

Nine photographs of unlabelled sublimation containers arrived with a WhatsApp list of
seven sizes. Seven sizes against nine photographs is not a mapping, so nothing was
guessed: every SKU code visible in the photographs was looked up on the supplier's own
live site and the specifications were read from there.

| Phase | Action | Target | Command or method | Result | Evidence | Status |
|---|---|---|---|---|---|---|
| 13.0 | Read all nine uploads by eye | `/home/user/uploads/IMG-*.jpg` | `read_file` on each | Every image carries a printed SKU label. Codes read: SB8009 F, SB8072 F, SB889 F, SB8000 A, SB890 A, SB8005 A, SB856 F, SB859 A, SB893 F | the nine images | Done |
| 13.1 | Resolve every SKU against the supplier | titanjet.co.za | `curl --compressed` with a browser UA, `?s=<SKU>` | All 9 resolved to real product pages, HTTP 200. Scrapling was never needed | `/tmp/tj/*.html` | Done |
| 13.2 | Contradiction: SB893 | search result vs photograph | Compared the returned product to the image | Search first surfaced an "850ml Silver Aluminium Water Bottle", which is **not** the two-handled sippy in the photograph. Re-queried `?s=320ml` and found **320ml White Stainless Steel Straight Baby Sippy Cup**, which matches the image exactly | `/tmp/tj/q320.html` | Fixed |
| 13.3 | SKU code discrepancy, recorded not hidden | SB893 | Read the product page | The photograph is labelled **SB893 F**; the supplier's page lists **SP893** for the same item. Both are published on the page rather than silently picking one | `shapes.json.supplier_sku_note` | Done |
| 13.4 | Read real specs, invent none | 9 product pages | Parsed the WooCommerce attribute table | Capacity, dimensions, weight, print area, colour taken verbatim. Example SB8072: `24 × 8 × 8 cm`, `0.373 kg`, print `196x208mm`, product `72x72x232mm` | `data/shapes.json` | Done |
| 13.5 | The 7-vs-9 size list left unmapped | WhatsApp size list | Judgement | The client's list (320, 300, 355, 200, 600, 355, 400) cannot be mapped onto 9 SKUs without guessing. The supplier's own capacities were used instead and the discrepancy is raised as an open question, not resolved silently | `NEEDS_CONFIRMATION.md` §7 | Deferred |
| 13.6 | Extract product shots from phone screenshots | 9 JPEGs | PIL: strip browser chrome, luminance-threshold bbox, scale to a shared 900×1100 canvas | 9 consistent images plus 9 `@sm` thumbs, 7.9KB to 41KB each, real dimensions written into the data | `public/assets/blanks/` | Done |
| 13.7 | Decide the architecture | `/blanks` | Interconnected, not orphaned | A separate page **and** wired in both directions: `/shop` → `/blanks`, `/shop/[blank]` → the matching shape, `/blanks/[shape]` → the nearest priced item and the designs that fit | build log | Done |
| 13.8 | Zero price invention | all 9 shapes | No shape has a client-confirmed price | Every shape reads **"Price on request"**. The `Product` JSON-LD deliberately carries **no `offers` block**, because an invented offer is worse than an absent one | `data/shapes.json` | Done |
| 13.9 | Build | `/blanks`, `/blanks/[shape]` ×9 | `next build` | 10 new routes prerendered, 188 checked | build log | Done |
| 13.10 | **Bug found by the new verifier: sitewide price floor was wrong** | `app/layout.js` | Price assertion on `/blanks/*` | The `LocalBusiness` schema hardcoded `priceRange: 'N$150 - N$250'` while the cheapest confirmed item is the **N$120** mug. Pre-existing, on every page since Phase 9, and telling search engines the entry price was N$30 higher than it is. Now **derived** from `blanks.json` so it cannot drift again | `lib/catalog.js priceRange` | Fixed |
| 13.11 | Verifier corrected, not the assertion loosened | `scripts/verify_routes.py` | Added `visible()` to strip `<script>`/`<style>` before matching prices | The first failure was the verifier matching JSON-LD, not rendered copy. Fixed the measurement, then kept the assertion strict | `scripts/verify_routes.py` | Fixed |
| 13.12 | **Bug: `npm run lint` was not reproducible** | `package.json` | `./node_modules/.bin/eslint` missing | `eslint.config.mjs` existed but neither `eslint` nor `eslint-config-next` was in `package.json`. `npx eslint .` silently pulled ESLint 10 and crashed. Pre-existing. Both now saved as devDependencies | `package.json` | Fixed |
| 13.13 | **Bug: mid-word wrap on `/shop`** | `.blank-name` | Mobile screenshot at 390px | `overflow-wrap:anywhere` also collapses the flex item's min-content width, so "20oz Skinny Tumbler" rendered as "20oz Skinn / y / Tumbl / er" beside the price. Pre-existing. Changed to `break-word` and stacked name above price below 620px | `/home/user/shots/shop-cards.png` | Fixed |
| 13.14 | Route and content verification | 188 routes | `scripts/verify_routes.py` | Each shape page must render its own SKU label, capacity, dimensions, weight and print area, must read "Price on request", and must expose **no** unexpected N$ figure. Both link directions asserted | `ALL PASS` ×3 | Done |
| 13.15 | Flow verification | builder + design order | `scripts/verify_flow.py` | `FLOWS PASS` ×3, unchanged by this turn's work | terminal | Done |
| 13.16 | axe-core and responsive sweep | +4 routes a11y, +3 routes overflow | `scripts/verify_a11y.py` | **0 violations.** The overflow sweep did not originally cover the new pages, which would have hidden a wide-table overflow, so `/blanks`, `/blanks/sb893` and `/blanks/sb8072` were added to it before it was trusted | `A11Y + RESPONSIVE PASS` | Done |
| 13.17 | Lighthouse mobile, twice | `/blanks`, `/blanks/sb893`, `/shop` | lighthouse 12, simulated throttling | `/blanks` 95 then 98, `/blanks/sb893` 97 twice, `/shop` 97. **100 a11y / 100 BP / 100 SEO, CLS 0** on all three, both runs | `/tmp/lh*.json` | Done |
| 13.18 | Lint and audit | repo | `./node_modules/.bin/eslint .`, `npm audit --omit=dev` | 0 errors, 0 warnings, **0 vulnerabilities** | terminal | Done |

**Three bugs fixed this turn were pre-existing, not introduced here:** the wrong schema
price floor (13.10), the unreproducible lint setup (13.12) and the mid-word wrap on
`/shop` (13.13). The first two were invisible until the new page forced a check.

**Still not fixed:** `/` scores 85 on mobile performance. Unchanged from Phase 12, and
the cause is still the hero background image.

## Phase 13 — Domain, products page, process page, search setup (25 Aug 2026)

| Phase | Action | Target | Command or method | Result | Evidence | Status |
|---|---|---|---|---|---|---|
| 13.0 | Download client work photos | filebin c5xnh15f1822451b | verified cookie, one file at a time | 46/46 downloaded, all valid by PIL | `/home/user/fb2/raw` | Done |
| 13.1 | Review every photo by eye | 46 photographs | 4 contact sheets read individually | Found 2 that must not be published | `/home/user/fb2/sheet-*.png` | Done |
| 13.2 | Withhold photos of a child | WA0054, WA0067 | Visual inspection | A child's face is printed on the cup. Not published without written parental consent | `sheet-2.png`, `sheet-3.png` | **Withheld** |
| 13.3 | Verify blank SKUs against the supplier | 9 SKUs | `curl` titanjet.co.za, SKU read from page markup | 8 of 9 confirmed. SB893 page 404s and search returns a different item | terminal | Partial, flagged |
| 13.4 | Convert both image sets | uploads + fb2 | `scripts/build_media.py` | 9 blanks (116KB) + 44 work photos (4.2MB), phone chrome cropped, all reopened and verified | `ALL VALID` | Done |
| 13.5 | Rebuild the item layer | `data/blanks.json` | Supplier specs + client capacities | 8 items to 11. 4 priced, 7 explicitly null | `data/blanks.json` | Done |
| 13.6 | Build /work | `app/work/` | Filterable gallery, lightbox, tag facets | 44 photos, 7 tag filters, links into /create | route 200 | Done |
| 13.7 | Build /process | `app/process/` | 6 steps, price table, care, HowTo + FAQPage JSON-LD | route 200 | Done |
| 13.8 | Point the site at the real domain | `lib/site.js`, `app/robots.js` | `SITE_URL` derives one origin; preview hosts get `Disallow: /` and noindex | canonical and sitemap both read giftedwithpurpose.net | served HTML | Done |
| 13.9 | Bug: env var not in the build | canonical read localhost | Rebuild with `NEXT_PUBLIC_SITE_URL` | `SITE_URL` is baked at build time, not runtime. Added `.env.production` | re-ran the failing check | Fixed |
| 13.10 | Bug: Escape did not close the work lightbox | `/work` | axe + Playwright | Handler was on a div that never holds focus, so the dialog trapped the user | Moved to a document listener | Fixed |
| 13.11 | Bug: two `aria-modal` dialogs | `/work` | strict-mode locator violation | My lightbox plus the global provider were both exposed. Added `aria-hidden` when closed | Fixed |
| 13.12 | Bug: focus never entered either dialog | `/work`, all product pages | Focus probe at 100/300/700/1500ms | `visibility:hidden` makes `focus()` a silent no-op. Poll frames until focus lands. **This was in the original provider too** | `focus: lb-x` | Fixed |
| 13.13 | Bug: two contrast failures I introduced | `/process`, work lightbox | axe, ratios computed | `.proc-n` 1.24:1 and `.lb-cta` 3.39:1 on the dark backdrop. Now 3.08:1 large-text and 15.76:1 | 0 violations | Fixed |
| 13.14 | Bug: hero downloaded twice | `/` | Lighthouse network audit | `image-set` 2x fetched the full texture while the preload fetched `@sm`. **96KB wasted on every mobile visit, pre-existing** | Width-based media query | Fixed |
| 13.15 | Oversized icons | `apple-icon`, `icon-192/512` | PIL recompress | 43KB to 15KB, 65KB to 24KB, 198KB to 74KB | terminal | Fixed |
| 13.16 | Homepage performance | `/` | Lighthouse mobile ×2 | **79 to 93**, LCP 4.6s to 2.3s, 769KB to 674KB | `/tmp/h.json` | Fixed |
| 13.17 | Full gate | 182 routes | routes ×3, flows ×3, axe, responsive | ALL PASS ×3, FLOWS PASS ×3, **0 axe violations** across 21 routes × 2 viewports + 8 states, 0 overflow at 7 widths | terminal | Done |
| 13.18 | Lighthouse | 4 routes | lighthouse 12 mobile | `/process` 98, `/work` 96, `/shop/can-400` 95, `/` 93. All **100 a11y / 100 BP / 100 SEO** | `/tmp/n_*.json` | Done |
| 13.19 | Lint and audit | repo | `npx eslint .`, `npm audit --omit=dev` | 0 errors, **0 vulnerabilities** | terminal | Done |



---

## Phase 14 — Client annotations from marked-up screenshots (26 Aug 2026)

| Phase | Action | Target | Method | Result | Status |
|---|---|---|---|---|---|
| 14.0 | Read every annotation | 14 screenshots | Cropped and enlarged each marked region before acting | 11 distinct instructions extracted | Done |
| 14.1 | Confirm the price contradiction | 12oz mug | Asked rather than assumed: N$230 conflicted with the N$120 catalogue line | Client confirmed both mugs N$230, N$120 retired | Done |
| 14.2 | Apply prices | `data/blanks.json` | mug 230, frosted 230, flip-top 230 | 5 of 11 items now priced | Done |
| 14.3 | Kill the hardcoded floor | 6 files | Replaced literal "N$120" with derived `priceFloorLabel` | Copy can no longer drift from the data | Done |
| 14.4 | Dedicated kids section | `/shop`, `/create` | Split by `audience` into grown-ups and a boxed kids band | Both render, kids floor stated as N$230 | Done |
| 14.5 | Blank products in the picker | `/create` step 1, `/shop` grid | Prefer `blank_photo` over the printed example | Unprinted item now shown | Done |
| 14.6 | Stop cropping | 3 surfaces | `objectFit: cover` to `contain` on white | Whole product visible, verified by screenshot | Done |
| 14.7 | Consolidate the duplicate page | `/process` to `/how-to-order` | Moved the richer content, deleted the route, added a 301 | `/process` returns 308 to `/how-to-order`, one nav entry | Done |
| 14.8 | Remove struck copy | 4 places | "What it costs" lead, "costs nothing", "spelling of any name", work disclaimer | All 4 gone from served HTML | Done |
| 14.9 | Neutralise the About hero | `/about` | Factual placeholder, nothing invented | Awaiting client copy | Blocked |
| 14.10 | Bug: components created during render | `app/shop/page.js` | eslint `react-hooks/static-components` | I defined `BlankGrid` inside the component, which resets state every render. Hoisted to module scope | Fixed |
| 14.11 | Bug: stale test expectations | `verify_flow.py` | Test asserted the retired N$120 and used a now-priced item to check the "never invent a price" guard | Updated to N$230/N$690 and retargeted flow2 at the still-unpriced gin tumbler so the guard is genuinely exercised | Fixed |
| 14.12 | Full gate | 192 routes | routes x3, flows x3, axe, responsive | ALL PASS x3, FLOWS PASS x3, **0 axe violations**, 0 overflow at 7 widths | Done |
| 14.13 | Lighthouse | 3 changed pages | lighthouse 12 mobile | `/how-to-order` 98, `/shop` 97, `/create` 97, all **100 a11y / 100 BP / 100 SEO** | Done |
| 14.14 | Lint and audit | repo | eslint, npm audit | 0 errors, **0 vulnerabilities** | Done |



---

## Phase 15 — Stale 2024 pricing, sales email, missing blanks, About bug (26 Aug 2026)

| Phase | Action | Target | Method | Result | Status |
|---|---|---|---|---|---|
| 15.0 | Audit every legacy price | `data/site.json` | Grepped all product prices, not just the N$120 the client named | Found 5 stale: 120 x2, 150, 160, 200 | Done |
| 15.1 | Retire them | products + catalogue block | Set to null with a dated reason string | Nothing below N$230 anywhere | Done |
| 15.2 | Bug: hardcoded price bypassing the data | `app/page.js:246` | Served-HTML grep after the data change still showed N$150 | The teacher set price was typed into the homepage. Now driven by `priceLabel(tset)` | Fixed |
| 15.3 | Add the sales mailbox | brand data | Wired to contact card, footer, order-form fallback, LocalBusiness schema | `sales@giftedwithpurpose.net` live in 4 places | Done |
| 15.4 | Process the missing blanks | 4 uploads | Trimmed, padded to 4:5 on white, WebP at 2 sizes, reopened to verify | 2 usable products; the other 2 images were duplicates of one | Done |
| 15.5 | Bug: About badges over headings | `/about` | Reproduced from the client screenshot, then read the CSS | `.step::before` still painted a counter badge; the author had tried to suppress it with inline `counterReset:'none'` + padding, which does not remove the pseudo-element. Added a real `.step-plain` variant | Fixed |
| 15.6 | Verify the fix in a browser | `/about` | Computed `::before` content on every card | 0 cards render a badge, all 3 headings intact | Done |
| 15.7 | Full gate | 192 routes | routes x3, flows x3, axe, responsive | ALL PASS x3, FLOWS PASS x3, **0 axe violations**, 0 overflow at 7 widths | Done |
| 15.8 | Lint and audit | repo | eslint, npm audit | 0 errors, **0 vulnerabilities** | Done |



---

## Phase 16 — Disclaimer consolidation and sitewide data-point reconciliation (26 Aug 2026)

| Phase | Action | Target | Method | Result | Status |
|---|---|---|---|---|---|
| 16.0 | Build a data-point auditor | `scripts/audit_datapoints.py` | Crawl every route, strip to visible text, diff every number against `data/` | Reusable, catches copy that contradicts the data | Done |
| 16.1 | Find the contradictions | 23 routes | Auditor run | **design count read 27, 111 and 141 across pages; item count read 9 and 11** | Found |
| 16.2 | Root cause | `app/page.js` | Read the source | Homepage labelled `products.length` (27 legacy photos) as "designs". Two other spots were true subsets with ambiguous wording | Diagnosed |
| 16.3 | Fix | homepage, shop, item pages | Counts now derive from `work`/`designs`; subset copy states the whole ("9 of our 11 items", "N of our 141 designs fit this") | Auditor: **0 findings**, every count agrees | Fixed |
| 16.4 | Consolidate disclaimers | 4 surfaces | Client: "all disclaimers must be in the terms" | Removed the full clause from `/designs`, `/collections/[slug]`, `ProductCard`; `/designs/[id]` keeps a one-line pointer linking to terms | Done |
| 16.5 | Absorb into terms | `/legal/terms` | Added rights-holder contact route, a Custom artwork clause, an Ordering and payment clause | Full wording now appears **only** in terms | Done |
| 16.6 | Build a copy auditor | `scripts/audit_copy.py` | Currency, phone format, em dashes, exclamations, naming drift | Found **26 em dashes** and 2 exclamation points against house style | Found |
| 16.7 | Fix house-style breaches | 14 files + `data/site.json` | Each em dash replaced with the punctuation the sentence wanted | 0 em dashes in any JS or data file | Fixed |
| 16.8 | Bug: my own auditor lied | `scripts/audit_copy.py` | Reported 6 "space after N$" | Replacing tags with a space inserts one between symbol and number. Raw HTML has **zero**. Rewrote the check against raw HTML rather than deleting it | Fixed |
| 16.9 | Bug: flow test timing out | `verify_flow.py` | `networkidle` never settled on `/designs/sippy-18` | Next prefetches the 3 dynamic routes and `next start` aborts those RSC requests. **Production returns 200 for all three**, so it is a local-only artifact. Switched 12 waits to `domcontentloaded` | Fixed |
| 16.10 | Full gate | 192 routes | routes x3, flows x3, both auditors x3, axe, responsive | ALL PASS x3, FLOWS PASS x3, **0 findings**, **0 issues**, **0 axe violations**, 0 overflow | Done |
| 16.11 | Lint and audit | repo | eslint, npm audit | 0 errors, **0 vulnerabilities** | Done |


---

## Phase 17 — Kids Selection rename, kids photo gallery, client's Our Story copy (27 Aug 2026)

| Phase | Action | Target | Method | Result | Status |
|---|---|---|---|---|---|
| 17.0 | Read the annotations | 6 screenshots, 9 images from filebin | OCR at psm 4 on each, cross-read against the WhatsApp transcript | 3 actionable instructions extracted, 1 deferred by the client | Done |
| 17.1 | Rename the collection | `data/site.json` | `Celebrate` to **Kids Selection**, slug `celebrate` to `kids-selection`, sub to "Sippy Cups & Bottles" | Card, page, title and breadcrumb all read Kids Selection | Done |
| 17.2 | Repoint the products | `data/site.json` | All 7 products in that collection moved to the new slug | 7 of 7 moved, 0 references to `celebrate` remain in any source file | Done |
| 17.3 | Keep the old URL alive | `next.config.mjs` | Permanent redirect, same pattern as `/process` | `/collections/celebrate` returns **308 to /collections/kids-selection** | Done |
| 17.4 | Tag the kids photographs | `data/work.json` | Explicit `kids_item` field, not an alt-text match, so re-wording a caption cannot drop a photo | **14 tagged: 11 sippy cups, 3 flip-top bottles** | Done |
| 17.5 | Build the gallery | `app/collections/[slug]/KidsGallery.js` | New client component, reuses the layout's existing lightbox rather than adding a second one | All 14 render at once, no "show more" that would hide them | Done |
| 17.6 | Honour "nothing cut off" | `app/site.css` | `.wg-contain` variant, `contain` on white instead of `cover` | Verified in-browser: computed `object-fit` is `contain` | Done |
| 17.7 | Apply the Our Story copy | `/about` | Client's 27 Aug text used verbatim: 4 paragraphs plus the sign-off | Placeholder from Phase 14.9 is gone, **Blocked item now closed** | Done |
| 17.8 | Apply it on the homepage | `app/page.js` `#about` | Opening 2 paragraphs plus the sign-off, linking to the full story | Invented "Two people, one printer" heading and disclosure removed | Done |
| 17.9 | Bug: my own copy contradicted the data | `/collections/kids-selection` | `audit_datapoints.py` | I wrote "All 14 photographs", which the auditor reads as a claim about the 44 total. Reworded to "14 of our 44 photographs", matching the Phase 16.3 subset rule | Fixed |
| 17.10 | Bug: `edit_file` reported success without writing | same file | Re-grepped the source after every edit instead of trusting the tool | The eyebrow and paragraph were still the old text. Rewritten with an asserted exact-match replace, then re-verified | Fixed |
| 17.11 | Bug: new style failed colour contrast | `.story-sign em` | `verify_a11y.py` axe run | `--cat-pink` on the section background measures **3.86:1**, below AA for normal text. Changed to `#B32359` at **6.36:1** | Fixed |
| 17.12 | Bug: audit scripts were unrunnable | 4 scripts | Ran them | `ROOT` was hardcoded to one checkout path, and two scripts used `os` without importing it. Now derived from `__file__` | Fixed |
| 17.13 | Extend the a11y sweep | `verify_a11y.py` | Added `/collections/kids-selection` to the route list | The new interactive surface is now inside the gate | Done |
| 17.14 | New gate for the new surface | `scripts/verify_kids_gallery.py` | Data set, redirect, served HTML, then a real browser: 14 thumbnails decode, lightbox opens, caption matches, WhatsApp link names the item and quotes N$230, Escape closes | **KIDS GALLERY PASS**, 0 console errors | Done |
| 17.15 | Bug: my own new gate was wrong | `verify_kids_gallery.py` | Reported 6 broken thumbnails | It measured lazy images before they loaded. All 14 assets serve 200 raw and through `next/image`. Gate now scrolls and waits | Fixed |
| 17.16 | Full gate | 192 routes | routes x1, flows, axe, responsive, both auditors | **ALL PASS**, FLOWS PASS, **0 axe violations**, 0 overflow at 7 widths, **0 copy issues, 0 data-point findings** | Done |
| 17.17 | Lint and build | repo | `eslint .`, `next build` | 0 problems, 186 static pages generated | Done |
