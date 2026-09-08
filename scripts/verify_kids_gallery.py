"""
Verifies the Kids Selection gallery: the collection rename, the photo set, and
the lightbox the thumbnails open.

This covers the surface added on 27 Aug 2026 that the other gates do not reach:
verify_routes.py checks status and served text, verify_a11y.py runs axe over the
page, but neither one clicks a kids thumbnail and reads what the lightbox says.
"""
import asyncio, json, os, re, sys, urllib.request, urllib.parse
from playwright.async_api import async_playwright

B = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3000"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

work = json.load(open(f"{ROOT}/data/work.json"))["items"]
site = json.load(open(f"{ROOT}/data/site.json"))
designs = json.load(open(f"{ROOT}/data/designs.json"))["items"]

expected = [w for w in work if w.get("kids_item")]
expected_sippy = [w for w in expected if w["kids_item"] == "sippy"]
expected_flip = [w for w in expected if w["kids_item"] == "fliptop"]
# The design library section added 8 Sep 2026 (client: Kids Selection must
# land on "the images of the kids bottles all the designs").
expected_kd = [d for d in designs if d.get("group") in ("sippy", "fliptop")]
expected_kd_sippy = [d for d in expected_kd if d["group"] == "sippy"]
expected_kd_flip = [d for d in expected_kd if d["group"] == "fliptop"]

fails = []
console = []


def check(cond, label):
    if cond:
        print(f"  ok   {label}")
    else:
        print(f"  FAIL {label}")
        fails.append(label)


def get(path):
    req = urllib.request.Request(B + path, headers={"User-Agent": "kids-gallery-check"})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.status, r.read().decode("utf-8", "replace"), r.geturl()


def visible(html):
    """Strip the RSC payload and tags so checks read what a human sees."""
    html = re.sub(r"<script.*?</script>", " ", html, flags=re.S)
    html = re.sub(r"<!--.*?-->", " ", html, flags=re.S)
    html = re.sub(r"<[^>]+>", " ", html)
    html = html.replace("&nbsp;", " ")
    return re.sub(r"\s+", " ", html)


async def main():
    print("=== data expectations ===")
    check(len(expected) == 14, f"14 kids photographs tagged in work.json (found {len(expected)})")
    check(len(expected_sippy) == 11, f"11 sippy cups (found {len(expected_sippy)})")
    check(len(expected_flip) == 3, f"3 flip-top bottles (found {len(expected_flip)})")

    col = [c for c in site["collections"] if c["slug"] == "kids-selection"]
    check(len(col) == 1, "collection slug kids-selection exists in site.json")
    check(bool(col) and col[0]["name"] == "Kids Selection", "collection is named Kids Selection")
    check(not any(c["slug"] == "celebrate" for c in site["collections"]), "no collection slug 'celebrate' remains")
    check(
        sum(1 for p in site["products"] if p.get("collection") == "kids-selection") == 7,
        "all 7 kids products point at the new slug",
    )

    print("\n=== the old URL still resolves ===")
    st, _, final = get("/collections/celebrate")
    check(st == 200, f"/collections/celebrate resolves (status {st})")
    check(final.endswith("/collections/kids-selection"), f"it lands on the new URL ({final})")

    print("\n=== served page ===")
    st, html, _ = get("/collections/kids-selection")
    check(st == 200, "/collections/kids-selection returns 200")
    check("Kids Selection" in html, "page says Kids Selection")
    check("Flip-top bottles and sippy cups" in html, "gallery heading present")
    for w in expected:
        check(f"{w['file']}%40sm" in html, f"{w['file']} thumbnail in served HTML")

    print("\n=== in the browser ===")
    async with async_playwright() as p:
        br = await p.chromium.launch(args=["--no-sandbox", "--disable-dev-shm-usage"])
        ctx = await br.new_context(viewport={"width": 1280, "height": 900})
        pg = await ctx.new_page()
        pg.on("console", lambda m: console.append(f"{m.type}: {m.text}") if m.type == "error" else None)
        pg.on("pageerror", lambda e: console.append(f"pageerror: {e}"))

        await pg.goto(f"{B}/collections/kids-selection", wait_until="load")

        # ---- the design library section (leads the page since 8 Sep 2026)
        kd = pg.locator(".kd-grid .wg-cell")
        n_kd = await kd.count()
        check(n_kd == len(expected_kd), f"{len(expected_kd)} kids design wraps rendered (found {n_kd})")
        check(
            (await pg.locator(".kd-grid .wg-cell img").first.evaluate("el => getComputedStyle(el).objectFit"))
            == "contain",
            "design thumbnails use object-fit: contain",
        )
        await pg.locator(".kd-grid .wg-cell").last.scroll_into_view_if_needed()
        await pg.wait_for_load_state("networkidle")
        broken_kd = None
        for _ in range(30):
            broken_kd = await pg.locator(".kd-grid .wg-cell img").evaluate_all(
                "els => els.filter(e => !e.complete || e.naturalWidth === 0).length"
            )
            if broken_kd == 0:
                break
            await pg.wait_for_timeout(300)
        check(broken_kd == 0, f"every design thumbnail decoded (broken: {broken_kd})")

        # The stats chip and the section copy must quote the real subset sizes.
        _, html_kd, _ = get("/collections/kids-selection")
        txt_kd = visible(html_kd)
        check(
            f"{len(expected_kd)} designs" in txt_kd,
            f"stats chip quotes the real kids design count ({len(expected_kd)})",
        )
        check(
            f"{len(expected_kd_sippy)} sippy cup wraps" in txt_kd
            and f"{len(expected_kd_flip)} flip-top bottle wraps" in txt_kd,
            "section intro quotes the real sippy and flip-top wrap counts",
        )

        # Tap the first design: full-size view, item named, confirmed price.
        # The page renders the library in its interleaved order, so read the
        # reference off the caption instead of assuming which design is first.
        await kd.first.click()
        lb = pg.locator(".lb[data-open='true']")
        await lb.wait_for(state="visible", timeout=8000)
        check(await lb.is_visible(), "design lightbox opens on click")
        cap_kd = (await lb.locator("figcaption").inner_text()).strip()
        kd_ids = {d["id"].upper() for d in expected_kd}
        m_ref = re.search(r"\b(?:SIPPY|FLIPTOP)-\d+\b", cap_kd.upper())
        check(
            bool(m_ref) and m_ref.group(0) in kd_ids,
            f"design caption carries a real kids reference code ({cap_kd[:60]!r})",
        )
        ref = m_ref.group(0) if m_ref else ""
        href_kd = await lb.locator("a.lb-cta").get_attribute("href")
        check(bool(href_kd) and href_kd.startswith("https://wa.me/"), "design lightbox offers a WhatsApp order link")
        check(bool(href_kd) and ref in urllib.parse.unquote(href_kd), "the link names the design clicked")
        check(bool(href_kd) and "N%24230" in href_kd, "the link quotes the confirmed N$230 kids price")
        await pg.keyboard.press("Escape")
        await pg.wait_for_timeout(400)

        # ---- the photographed examples gallery (14 real finished kids items)
        cells = pg.locator(".kg-grid .wg-cell")
        n = await cells.count()
        check(n == len(expected), f"{len(expected)} photo thumbnails rendered (found {n})")

        # Every photo must be fully visible, not cropped: the client asked for
        # nothing to be cut off, so these cells must letterbox rather than fill.
        fit = await pg.locator(".kg-grid .wg-cell img").first.evaluate(
            "el => getComputedStyle(el).objectFit"
        )
        check(fit == "contain", f"thumbnails use object-fit: contain (got {fit})")

        # Images must actually decode, not 404 into an empty box. Most of the grid
        # is lazy-loaded and below the fold, so scroll it all into view and wait
        # for decoding before judging: testing before that only measures laziness.
        await pg.locator(".kg-grid .wg-cell").last.scroll_into_view_if_needed()
        await pg.wait_for_load_state("networkidle")
        broken = None
        for _ in range(30):
            broken = await pg.locator(".kg-grid .wg-cell img").evaluate_all(
                "els => els.filter(e => !e.complete || e.naturalWidth === 0).length"
            )
            if broken == 0:
                break
            await pg.wait_for_timeout(300)
        check(broken == 0, f"every thumbnail decoded (broken: {broken})")
        await pg.locator(".kg-grid .wg-cell").first.scroll_into_view_if_needed()

        # Open the lightbox from the first photo.
        await cells.first.click()
        lb = pg.locator(".lb[data-open='true']")
        await lb.wait_for(state="visible", timeout=8000)
        check(await lb.is_visible(), "lightbox opens on click")

        cap = (await lb.locator("figcaption").inner_text()).strip()
        check(
            expected[0]["alt"][:40].lower() in cap.lower(),
            f"caption describes the photo clicked ({cap[:60]!r})",
        )

        href = await lb.locator("a.lb-cta").get_attribute("href")
        check(bool(href) and href.startswith("https://wa.me/"), "lightbox offers a WhatsApp order link")
        check(bool(href) and "Kids%20Sippy%20Cup" in href, "the link names the item being ordered")
        check(bool(href) and "N%24230" in href, "the link quotes the confirmed N$230 price")

        # Escape must close it, and focus must not be left stranded.
        await pg.keyboard.press("Escape")
        await pg.wait_for_timeout(400)
        check(not await pg.locator(".lb[data-open='true']").is_visible(), "Escape closes the lightbox")

        await br.close()

    print("\n=== console ===")
    check(not console, f"no console errors ({len(console)} seen)")
    for c in console[:5]:
        print("   ", c[:160])

    print()
    if fails:
        print(f"FAIL ({len(fails)}):")
        for f in fails:
            print(" -", f)
        sys.exit(1)
    print("KIDS GALLERY PASS")


asyncio.run(main())
