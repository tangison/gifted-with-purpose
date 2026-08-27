"""Drives the real builder in Chromium and asserts the composed WhatsApp URL."""
import asyncio, sys, urllib.parse
from playwright.async_api import async_playwright

B = "http://127.0.0.1:3000"
fails = []
console = []


async def main():
    async with async_playwright() as p:
        br = await p.chromium.launch(args=["--no-sandbox", "--disable-dev-shm-usage"])
        ctx = await br.new_context(viewport={"width": 1280, "height": 900})
        pg = await ctx.new_page()
        pg.on("console", lambda m: console.append(f"{m.type}: {m.text}") if m.type in ("error", "warning") else None)
        pg.on("pageerror", lambda e: console.append(f"pageerror: {e}"))

        # ---- flow 1: ready-made design on a chosen item
        await pg.goto(f"{B}/create", wait_until="domcontentloaded")
        await pg.get_by_role("button", name="12oz Coffee Mug", exact=False).first.click()
        await pg.get_by_role("button", name="Choose a ready-made design").click()
        await pg.fill("#bq", "Grow In Grace")
        await pg.wait_for_timeout(500)
        await pg.locator(".bld-pick").first.click()
        await pg.fill("#bname", "Geneveve")
        await pg.fill("#bqty", "3")
        await pg.wait_for_timeout(300)

        total = await pg.locator(".bld-total").inner_text()
        if "690.00" not in total:
            fails.append(f"flow1 total wrong: {total!r} (3 x N$230 should be N$690.00)")

        href = await pg.locator("a.bld-send").get_attribute("href")
        if not href:
            fails.append("flow1: send button is not a link, so the form did not validate")
        else:
            msg = urllib.parse.unquote_plus(href.split("text=")[1])
            for need in ["12oz Coffee Mug", "N$230.00", "DESIGN-33", "Grow In Grace", "Geneveve", "Quantity: 3", "N$690.00"]:
                if need not in msg:
                    fails.append(f"flow1 message missing {need!r}")
            if "wa.me/264814076649" not in href:
                fails.append("flow1: wrong WhatsApp number")

        # ---- flow 2: custom brief, unpriced item
        await pg.goto(f"{B}/create", wait_until="domcontentloaded")
        await pg.get_by_role("button", name="12oz Gin Tumbler", exact=False).first.click()
        await pg.get_by_role("button", name="Ask us to draw one").click()
        await pg.fill("#brief", "A protea wreath with my mother's name in Afrikaans script")
        await pg.wait_for_timeout(300)
        total2 = await pg.locator(".bld-total").inner_text()
        if "price on request" not in total2.lower():
            fails.append(f"flow2: unpriced item did not say price on request: {total2!r}")
        plus = await pg.locator(".bld-plus").inner_text()
        if "quoted per job" not in plus.lower():
            fails.append(f"flow2: custom artwork not marked as quoted per job: {plus!r}")
        href2 = await pg.locator("a.bld-send").get_attribute("href")
        if not href2:
            fails.append("flow2: did not validate")
        else:
            msg2 = urllib.parse.unquote_plus(href2.split("text=")[1])
            if "please confirm" not in msg2 or "custom" not in msg2.lower():
                fails.append(f"flow2 message wrong: {msg2!r}")
            if "N$" in msg2:
                fails.append(f"flow2: invented a price for an unpriced item: {msg2!r}")

        # ---- flow 3: validation actually blocks
        await pg.goto(f"{B}/create", wait_until="domcontentloaded")
        await pg.locator("button.bld-send").click()
        await pg.wait_for_timeout(300)
        errs = await pg.locator(".bld-errs li").count()
        if errs < 2:
            fails.append(f"flow3: empty submit showed only {errs} errors")

        # ---- flow 4: design page price table joins to the blank
        await pg.goto(f"{B}/designs/sippy-18", wait_until="domcontentloaded")
        fits = await pg.locator(".fit-name").all_inner_texts()
        if "Kids Sippy Cup" not in fits:
            fails.append(f"flow4: sippy design does not offer the sippy cup: {fits}")
        if "20oz Skinny Tumbler" in fits:
            fails.append("flow4: a sippy-cup wrap was offered on a tumbler it was not drawn for")
        d_href = await pg.locator("a.dord-cta").get_attribute("href")
        dmsg = urllib.parse.unquote_plus(d_href.split("text=")[1])
        for need in ["SIPPY-18", "Namibia", "N$230.00"]:
            if need not in dmsg:
                fails.append(f"flow4 message missing {need!r}")

        # ---- flow 5: gallery search + theme filter
        await pg.goto(f"{B}/designs", wait_until="domcontentloaded")
        await pg.fill("#dq", "afrikaans")
        await pg.wait_for_timeout(700)
        n = await pg.locator(".dg li").count()
        if n < 1:
            fails.append("flow5: searching afrikaans returned nothing")
        await pg.fill("#dq", "")
        await pg.get_by_role("button", name="Faith", exact=False).first.click()
        await pg.wait_for_timeout(500)
        cnt = await pg.locator(".shop-count").inner_text()
        if "Showing" not in cnt:
            fails.append(f"flow5: theme filter broke the count: {cnt!r}")

        await br.close()

    hard = [c for c in console if "pageerror" in c or c.startswith("error")]
    if hard:
        fails.append(f"console errors: {hard[:5]}")

    if fails:
        print(f"FAIL ({len(fails)}):")
        for f in fails:
            print(" -", f)
        sys.exit(1)
    print("FLOWS PASS")


asyncio.run(main())
