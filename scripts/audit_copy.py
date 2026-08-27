"""
Copy consistency audit. Looks for the same idea expressed in conflicting ways
across pages: product naming, currency format, phone format, tone slips.
"""
import re, sys, os, json, urllib.request, collections

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:3000"
# Derived from this file's own location. It was hardcoded to one checkout path,
# so the audit could not run from a clone anywhere else.
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
site = json.load(open(f"{ROOT}/data/site.json"))
brand = site["brand"]

ROUTES = ["/", "/shop", "/designs", "/create", "/work", "/blanks", "/how-to-order",
          "/about", "/faq", "/contact", "/brand", "/sitemap-page",
          "/legal/privacy", "/legal/terms", "/legal/cookies",
          "/collections/encourage", "/collections/kids-selection",
          "/shop/mug-11oz", "/shop/sippy-cup", "/designs/design-33"]


def get(p):
    try:
        with urllib.request.urlopen(urllib.request.Request(BASE + p, headers={"User-Agent": "a"}), timeout=40) as r:
            return r.read().decode("utf-8", "replace")
    except Exception as e:
        return f"__ERR__{e}"


def vis(h):
    h = re.sub(r'<script.*?</script>|<style.*?</style>|<!--.*?-->', ' ', h, flags=re.S)
    h = re.sub(r'<[^>]+>', ' ', h)
    for a, b in [('&rsquo;', "'"), ('&ldquo;', '"'), ('&rdquo;', '"'), ('&amp;', '&'),
                 ('&nbsp;', ' '), ('&middot;', '.'), ('&mdash;', '--'), ('&ndash;', '-')]:
        h = h.replace(a, b)
    return re.sub(r'\s+', ' ', h)


issues = []
pages = {}
raw = {}
for r in ROUTES:
    h = get(r)
    if h.startswith("__ERR__"):
        issues.append(("FETCH", r, h[:100]))
        continue
    raw[r] = re.sub(r'<script.*?</script>', ' ', h, flags=re.S)
    pages[r] = vis(h)

# 1. currency format must be N$ consistently, never NAD or mixed
for r, t in pages.items():
    for bad in re.finditer(r'\bNAD\s?\d', t):
        issues.append(("CURRENCY", r, f"uses NAD instead of N$: ...{t[max(0,bad.start()-50):bad.end()+30]}..."))
    # NOTE: do not test for "N$ 123" on stripped text. Replacing tags with a
    # space inserts one between the symbol and the number, so that check only
    # ever reports its own artifact. Test the raw HTML instead.
    if re.search(r'N\$\s', raw[r]):
        issues.append(("CURRENCY", r, "real space between N$ and the amount in the served HTML"))

# 2. phone must be the one canonical format
phone_variants = collections.defaultdict(set)
for r, t in pages.items():
    for m in re.finditer(r'\+?264[\s\-]?\d{2}[\s\-]?\d{3}[\s\-]?\d{4}|0\d{2}\s?\d{3}\s?\d{4}', t):
        phone_variants[m.group(0).strip()].add(r)

# 3. em dashes are against house style.
# One exception: the client supplied the Our Story copy with an em dash in it.
# Client-approved wording is not rewritten to satisfy our own style rule, so
# that exact phrase is allowlisted. Anything else still reports.
CLIENT_EM_DASH = 'made with intention, heart and purpose — because we believe'
for r, t in pages.items():
    scan = t.replace(CLIENT_EM_DASH, '')
    if '—' in scan:
        i = scan.index('—')
        issues.append(("EM_DASH", r, f"...{scan[max(0,i-60):i+60]}..."))

# 4. exclamation points
for r, t in pages.items():
    for m in re.finditer(r'\w!', t):
        issues.append(("EXCLAMATION", r, f"...{t[max(0,m.start()-60):m.end()+40]}..."))

# 5. the same item must be named identically everywhere
blanks = json.load(open(f"{ROOT}/data/blanks.json"))["items"]
for b in blanks:
    variants = set()
    for r, t in pages.items():
        if b["name"] in t:
            variants.add(b["name"])
    # look for near-miss naming of the same thing
    if b["id"] == "mug-11oz":
        for r, t in pages.items():
            for bad in ["11oz Coffee Mug", "11oz Mug", "11oz coffee mug"]:
                if bad in t:
                    issues.append(("NAMING", r, f"'{bad}' but the item is '{b['name']}'"))

# 6. tagline / brand phrasing drift
tag = brand["tagline"]
for r, t in pages.items():
    if "Thoughtful" in t and tag not in t and "Thoughtful. Meaningful. Yours" not in t:
        issues.append(("TAGLINE", r, "partial tagline without the canonical form"))

print("=== PHONE FORMATS SEEN ===")
for v, rs in sorted(phone_variants.items()):
    print(f"  {v!r:24} on {len(rs)} page(s)")
if len(phone_variants) > 1:
    print("  <-- more than one format in use")

print(f"\n=== ISSUES ({len(issues)}) ===")
bykind = collections.defaultdict(list)
for k, r, d in issues:
    bykind[k].append((r, d))
for k in sorted(bykind):
    print(f"\n[{k}] {len(bykind[k])}")
    for r, d in bykind[k][:8]:
        print(f"   {r}\n      {d[:190]}")
if not issues:
    print("  none")
