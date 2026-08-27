"""
Crawl the live site and extract every user-visible number/claim, then diff them
against the single source of truth in data/. Finds copy that contradicts itself.
"""
import json, re, sys, urllib.request, collections

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3000"
ROOT = "/home/user/gwp"

blanks = json.load(open(f"{ROOT}/data/blanks.json"))["items"]
designs = json.load(open(f"{ROOT}/data/designs.json"))["items"]
work = json.load(open(f"{ROOT}/data/work.json"))["items"]
try:
    shapes = json.load(open(f"{ROOT}/data/shapes.json"))["shapes"]
except Exception:
    shapes = []
site = json.load(open(f"{ROOT}/data/site.json"))
products = site["products"]

TRUTH = {
    "designs": len(designs),
    "blanks": len(blanks),
    "work": len(work),
    "shapes": len(shapes),
    "kids_blanks": len([b for b in blanks if b.get("audience") == "kids"]),
    "adult_blanks": len([b for b in blanks if b.get("audience") != "kids"]),
    "priced_blanks": len([b for b in blanks if b.get("price") is not None]),
    "price_floor": min([b["price"] for b in blanks if b.get("price") is not None]),
    "price_ceiling": max([b["price"] for b in blanks if b.get("price") is not None]),
    "collections": len(site["collections"]),
    "products": len(products),
    "themes": len(json.load(open(f"{ROOT}/data/designs.json"))["themes"]),
}

ROUTES = ["/", "/shop", "/designs", "/create", "/work", "/blanks", "/how-to-order",
          "/about", "/faq", "/contact", "/brand", "/sitemap-page",
          "/legal/privacy", "/legal/terms", "/legal/cookies",
          "/collections/encourage", "/collections/inspire", "/collections/celebrate",
          "/collections/teacher-appreciation", "/collections/everyday",
          "/shop/mug-11oz", "/shop/sippy-cup", "/designs/design-33"]


def get(path):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "audit"})
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            return r.read().decode("utf-8", "replace")
    except Exception as e:
        return f"__ERR__ {e}"


def visible_text(html):
    """Strip the RSC payload and tags so we only read what a human sees."""
    html = re.sub(r'<script.*?</script>', ' ', html, flags=re.S)
    html = re.sub(r'<style.*?</style>', ' ', html, flags=re.S)
    html = re.sub(r'<!--.*?-->', ' ', html, flags=re.S)
    html = re.sub(r'<[^>]+>', ' ', html)
    html = html.replace('&rsquo;', "'").replace('&ldquo;', '"').replace('&rdquo;', '"')
    html = html.replace('&amp;', '&').replace('&nbsp;', ' ').replace('&middot;', '.')
    return re.sub(r'\s+', ' ', html)


# claims worth cross-checking, as (regex, truth key, human label)
CLAIMS = [
    (r'(\d+)\s+designs\b', "designs", "design count"),
    (r'(\d+)\s+ready-made designs', "designs", "design count"),
    (r'\ball\s+(\d+)\s+designs', "designs", "design count"),
    (r'(\d+)\s+items\b', "blanks", "item count"),
    (r'(\d+)\s+items to print on', "blanks", "item count"),
    (r'(\d+)\s+photographs?\b', "work", "work photo count"),
    (r'(\d+)\s+pieces we have', "work", "work photo count"),
    (r'(\d+)\s+blank shapes', "shapes", "shape count"),
    (r'(\d+)\s+unprinted containers', "shapes", "shape count"),
    (r'(\d+)\s+collections\b', "collections", "collection count"),
]

findings = []
seen = collections.defaultdict(set)

for r in ROUTES:
    html = get(r)
    if html.startswith("__ERR__"):
        findings.append(("FETCH", r, html[:120]))
        continue
    txt = visible_text(html)

    for pat, key, label in CLAIMS:
        for m in re.finditer(pat, txt, re.I):
            n = int(m.group(1))
            seen[label].add((n, r))
            if n != TRUTH[key]:
                ctx = txt[max(0, m.start() - 70):m.end() + 50].strip()
                findings.append(("MISMATCH", r, f"{label}: page says {n}, truth is {TRUTH[key]} | ...{ctx}..."))

    # any price below the confirmed floor is a stale figure
    for m in re.finditer(r'N\$\s?(\d+)', txt):
        v = int(m.group(1))
        if v < TRUTH["price_floor"]:
            ctx = txt[max(0, m.start() - 70):m.end() + 50].strip()
            findings.append(("STALE_PRICE", r, f"N${v} below floor N${TRUTH['price_floor']} | ...{ctx}..."))

print("=== SOURCE OF TRUTH ===")
for k, v in TRUTH.items():
    print(f"  {k:16} {v}")

print("\n=== CLAIMS SEEN ACROSS PAGES ===")
for label, vals in sorted(seen.items()):
    nums = sorted({n for n, _ in vals})
    flag = "  <-- INCONSISTENT" if len(nums) > 1 else ""
    print(f"  {label:20} {nums}{flag}")
    if len(nums) > 1:
        for n, r in sorted(vals):
            print(f"      {n:>5}  {r}")

print(f"\n=== FINDINGS ({len(findings)}) ===")
for kind, route, detail in findings:
    print(f"  [{kind}] {route}\n      {detail}")

if not findings:
    print("  none")
