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
