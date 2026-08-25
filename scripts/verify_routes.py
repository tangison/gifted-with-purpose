"""Route + served-content verification. Checks the HTML body, not just the status."""
import json, re, sys, urllib.request

B = "http://127.0.0.1:3000"
root = "/home/user/gwp"
designs = json.load(open(f"{root}/data/designs.json"))["items"]
blanks = json.load(open(f"{root}/data/blanks.json"))["items"]
shapes = json.load(open(f"{root}/data/shapes.json"))["shapes"]


def get(path):
    req = urllib.request.Request(B + path, headers={"User-Agent": "verify"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace")


fails = []


def visible(body):
    """Strip script/style so price assertions see rendered copy, not JSON-LD.

    The sitewide LocalBusiness schema carries a priceRange on every page;
    matching raw HTML made every blank page look like it quoted a price.
    """
    return re.sub(r"<(script|style)\b[^>]*>.*?</\1>", " ", body, flags=re.S | re.I)


def check(path, want=200, must=(), mustnot=()):
    st, body = get(path)
    if st != want:
        fails.append(f"{path}: status {st}, wanted {want}")
        return body
    for m in must:
        if m not in body:
            fails.append(f"{path}: missing {m!r}")
    for m in mustnot:
        if m in body:
            fails.append(f"{path}: should not contain {m!r}")
    return body


static = ["/", "/shop", "/designs", "/create", "/about", "/brand", "/faq", "/contact",
          "/how-to-order", "/sitemap-page", "/legal/privacy", "/legal/terms", "/legal/cookies",
          "/blanks",
          "/collections/encourage", "/collections/inspire", "/collections/celebrate",
          "/collections/teacher-appreciation", "/collections/everyday",
          "/robots.txt", "/sitemap.xml", "/manifest.webmanifest"]
for p in static:
    check(p)

check("/nope", want=404)
check("/designs/not-a-design", want=404)
check("/shop/not-an-item", want=404)
check("/blanks/not-a-shape", want=404)

# Every design page must actually render its own name, ref, and a price table.
for d in designs:
    body = check(f"/designs/{d['id']}", must=[d["name"], d["id"].upper(), "Print it on"])
    if body and "Price on request" not in body and "From N$" not in body and "N$" not in body:
        fails.append(f"/designs/{d['id']}: no price signal at all")

# Every blank page must render spec, price label, and the scoped design grid.
for b in blanks:
    want_price = "Price on request" if b["price"] is None else f"N${b['price']:.2f}"
    check(f"/shop/{b['id']}", must=[b["name"], b["spec"], want_price, "Designs that fit"])

# The two halves must link to each other.
check("/shop", must=["/designs", "/create", "design", "fit this"])
check("/designs", must=["/create", "Search designs"])
check("/create", must=["Pick the item", "Pick the design", "Ask us to draw one"])
check("/", must=["/create", "/designs", "/shop", "How it works"])

# Sitemap must carry the new routes.
_, sm = get("/sitemap.xml")
for need in ["/designs/design-33", "/shop/mug-11oz", "/create"]:
    if need not in sm:
        fails.append(f"sitemap.xml missing {need}")

# Every blank shape page must render its real supplier spec and must never
# show a price. No shape has a confirmed price, so a number here is a bug.
for sh in shapes:
    body = check(
        f"/blanks/{sh['id']}",
        must=[sh["name"], sh["sku_label"], sh["capacity"], sh["dimensions"],
              sh["weight"], "Price on request"],
    )
    if body:
        for m in set(re.findall(r"N\$(\d+(?:\.\d\d)?)", visible(body))):
            # The only money allowed on a shape page is the confirmed price of
            # the printed item it links across to.
            if float(m) not in {120.0, 230.0, 250.0}:
                fails.append(f"/blanks/{sh['id']}: unexpected price N${m}")
        if sh["print_area"] and sh["print_area"] not in body:
            fails.append(f"/blanks/{sh['id']}: missing print area {sh['print_area']!r}")

# The blank index must list every shape, link each one, and stay unpriced.
_, blk = get("/blanks")
for sh in shapes:
    if f"/blanks/{sh['id']}" not in blk:
        fails.append(f"/blanks: missing link to {sh['id']}")
    if sh["sku_label"] not in blk:
        fails.append(f"/blanks: missing SKU {sh['sku_label']}")
if blk.count("Price on request") < len(shapes):
    fails.append("/blanks: not every shape reads 'Price on request'")

# Interconnection must work in both directions, not just one.
_, shop_body = get("/shop")
if "/blanks" not in shop_body:
    fails.append("/shop: does not link to /blanks")
if "/shop" not in blk:
    fails.append("/blanks: does not link back to /shop")
for bid in ("sippy-cup", "mug-11oz"):
    _, ib = get(f"/shop/{bid}")
    if "/blanks/" not in ib:
        fails.append(f"/shop/{bid}: no link into the blank range")

# The sitewide schema priceRange must match the real catalogue floor and
# ceiling. It was hardcoded at "N$150 - N$250" while the cheapest confirmed
# item is N$120, so it understated nothing and overstated the entry price.
priced = [b["price"] for b in blanks if b["price"] is not None]
want_range = f"N${min(priced)} - N${max(priced)}"
_, home = get("/")
if want_range not in home:
    fails.append(f"layout: priceRange is not {want_range!r}")

# No invented prices: catalogue-confirmed values only.
allowed = {120.0, 230.0, 250.0, 150.0, 160.0, 200.0}
_, shop = get("/shop")
for m in set(re.findall(r"N\$(\d+(?:\.\d\d)?)", visible(shop))):
    if float(m) not in allowed:
        fails.append(f"/shop: unrecognised price N${m}")

print(f"checked {len(static) + 4 + len(designs) + len(blanks) + len(shapes) + 4} routes")
if fails:
    print(f"\nFAIL ({len(fails)}):")
    for f in fails[:40]:
        print(" -", f)
    sys.exit(1)
print("ALL PASS")
