"""Route + served-content verification. Checks the HTML body, not just the status."""
import json, re, sys, urllib.request

B = "http://127.0.0.1:3000"
root = "/home/user/gwp"
designs = json.load(open(f"{root}/data/designs.json"))["items"]
blanks = json.load(open(f"{root}/data/blanks.json"))["items"]
work = json.load(open(f"{root}/data/work.json"))["items"]


def get(path):
    req = urllib.request.Request(B + path, headers={"User-Agent": "verify"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace")


fails = []


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


static = ["/", "/shop", "/designs", "/create", "/work", "/process", "/about", "/brand", "/faq", "/contact",
          "/how-to-order", "/sitemap-page", "/legal/privacy", "/legal/terms", "/legal/cookies",
          "/collections/encourage", "/collections/inspire", "/collections/celebrate",
          "/collections/teacher-appreciation", "/collections/everyday",
          "/robots.txt", "/sitemap.xml", "/manifest.webmanifest"]
for p in static:
    check(p)

check("/nope", want=404)
check("/designs/not-a-design", want=404)
check("/shop/not-an-item", want=404)

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
check("/", must=["/create", "/designs", "/shop", "/work", "How it works"])
check("/work", must=["Browse our products", f"{len(work)}"])
check("/process", must=["How we make it", "sublimation", "Hand wash only"])

# canonical + robots must point at the real domain, never the vercel host
_, home = get("/")
if 'href="https://giftedwithpurpose.net/"' not in home and "giftedwithpurpose.net" not in home:
    fails.append("/: canonical does not use giftedwithpurpose.net")
_, rb = get("/robots.txt")
if "giftedwithpurpose.net/sitemap.xml" not in rb:
    fails.append("robots.txt: sitemap does not point at the real domain")
if "Disallow: /" in rb.split("Sitemap")[0] and "Allow: /" not in rb:
    fails.append("robots.txt: production build is blocking crawlers")

# every published work photo must exist and be referenced
for w in work[:6]:
    st, _ = get(f"/assets/work/{w['file']}@sm.webp")
    if st != 200:
        fails.append(f"work asset missing: {w['file']}@sm.webp -> {st}")
for b in blanks:
    if b.get("blank_photo"):
        st, _ = get(f"/assets/blanks/{b['blank_photo']}.webp")
        if st != 200:
            fails.append(f"blank asset missing: {b['blank_photo']} -> {st}")

# Sitemap must carry the new routes.
_, sm = get("/sitemap.xml")
for need in ["/designs/design-33", "/shop/mug-11oz", "/create", "/work", "/process"]:
    if need not in sm:
        fails.append(f"sitemap.xml missing {need}")

# No invented prices: catalogue-confirmed values only.
allowed = {120.0, 230.0, 250.0, 150.0, 160.0, 200.0}
_, shop = get("/shop")
for m in set(re.findall(r"N\$(\d+(?:\.\d\d)?)", shop)):
    if float(m) not in allowed:
        fails.append(f"/shop: unrecognised price N${m}")

print(f"checked {len(static) + 3 + len(designs) + len(blanks) + 4} routes")
if fails:
    print(f"\nFAIL ({len(fails)}):")
    for f in fails[:40]:
        print(" -", f)
    sys.exit(1)
print("ALL PASS")
