"""axe-core across every page type plus interactive states, and a responsive overflow sweep."""
import asyncio, json, sys, urllib.request
from playwright.async_api import async_playwright

B = "http://127.0.0.1:3000"
AXE = "https://cdn.jsdelivr.net/npm/axe-core@4.10.2/axe.min.js"
ROUTES = ["/", "/shop", "/shop/mug-11oz", "/shop/kids-fliptop", "/shop/frosted-mug",
          "/designs", "/designs/design-33", "/designs/sippy-18", "/designs/design-19",
          "/blanks", "/blanks/sb893", "/blanks/sb8072", "/blanks/sb889",
          "/create", "/about", "/faq", "/contact", "/how-to-order", "/brand",
          "/collections/encourage", "/collections/teacher-appreciation",
          "/legal/privacy", "/sitemap-page"]
WIDTHS = [320, 375, 414, 768, 1024, 1280, 1440]

axe_src = urllib.request.urlopen(AXE, timeout=60).read().decode()
fails = []


async def run_axe(pg, label):
    await pg.add_script_tag(content=axe_src)
    res = await pg.evaluate(
        """async () => {
            const r = await axe.run(document, {
              runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice'] }
            });
            return r.violations.map(v => ({ id: v.id, impact: v.impact, n: v.nodes.length,
                                            target: v.nodes[0] && v.nodes[0].target }));
        }"""
    )
    for v in res:
        fails.append(f"a11y {label}: {v['id']} ({v['impact']}, {v['n']} nodes) {v['target']}")
    return len(res)


async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch(args=["--no-sandbox", "--disable-dev-shm-usage"])

        # a11y at desktop and mobile
        for vw, tag in ((1280, "d"), (375, "m")):
            ctx = await br.new_context(viewport={"width": vw, "height": 900})
            pg = await ctx.new_page()
            for r in ROUTES:
                await pg.goto(B + r, wait_until="networkidle")
                n = await run_axe(pg, f"{r}[{tag}]")
                print(f"  {tag} {r}: {n} violations")
            await ctx.close()

        # interactive states
        ctx = await br.new_context(viewport={"width": 1280, "height": 900})
        pg = await ctx.new_page()

        await pg.goto(f"{B}/create", wait_until="networkidle")
        await pg.get_by_role("button", name="11oz Mug", exact=False).first.click()
        await pg.get_by_role("button", name="Choose a ready-made design").click()
        await pg.wait_for_timeout(600)
        print("  state builder-library:", await run_axe(pg, "create[library]"), "violations")

        await pg.get_by_role("button", name="Ask us to draw one").click()
        await pg.wait_for_timeout(400)
        print("  state builder-custom:", await run_axe(pg, "create[custom]"), "violations")

        await pg.goto(f"{B}/create", wait_until="networkidle")
        await pg.locator("button.bld-send").click()
        await pg.wait_for_timeout(400)
        print("  state builder-errors:", await run_axe(pg, "create[errors]"), "violations")

        await pg.goto(f"{B}/designs", wait_until="networkidle")
        await pg.get_by_role("button", name="Faith", exact=False).first.click()
        await pg.wait_for_timeout(500)
        print("  state designs-filtered:", await run_axe(pg, "designs[theme]"), "violations")

        await pg.fill("#dq", "zzzznothing")
        await pg.wait_for_timeout(700)
        print("  state designs-empty:", await run_axe(pg, "designs[empty]"), "violations")

        await pg.goto(f"{B}/shop/kids-fliptop", wait_until="networkidle")
        await pg.locator(".dg-more button").first.click()
        await pg.wait_for_timeout(600)
        print("  state blank-showmore:", await run_axe(pg, "shop/kids-fliptop[more]"), "violations")
        await ctx.close()

        # responsive overflow
        for w in WIDTHS:
            ctx = await br.new_context(viewport={"width": w, "height": 900})
            pg = await ctx.new_page()
            for r in ["/", "/shop", "/shop/mug-11oz", "/designs", "/designs/design-33", "/create",
                      "/blanks", "/blanks/sb893", "/blanks/sb8072"]:
                await pg.goto(B + r, wait_until="networkidle")
                over = await pg.evaluate(
                    """() => {
                        const d = document.documentElement;
                        const wide = [...document.querySelectorAll('body *')]
                          .filter(e => e.getBoundingClientRect().right > d.clientWidth + 1)
                          .slice(0,3).map(e => e.tagName + '.' + (e.className || '').toString().slice(0,40));
                        return { scroll: d.scrollWidth, client: d.clientWidth, wide };
                    }"""
                )
                if over["scroll"] > over["client"] + 1:
                    fails.append(f"overflow {r}@{w}: {over['scroll']}>{over['client']} {over['wide']}")
            await ctx.close()
            print(f"  overflow {w}px: ok")

        await br.close()

    if fails:
        print(f"\nFAIL ({len(fails)}):")
        for f in fails[:40]:
            print(" -", f)
        sys.exit(1)
    print("\nA11Y + RESPONSIVE PASS")


asyncio.run(main())
