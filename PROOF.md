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
