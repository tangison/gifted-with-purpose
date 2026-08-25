"""
Converts two image sets to WebP.

1. uploads/  -> the unlabelled blank containers (phone screenshots of titanjet
   product pages). Phone chrome is cropped off, then the white border trimmed.
2. fb2/raw/  -> 46 photographs of real finished work.

Nothing is upscaled. Every output is verified by reopening it.
"""
import os, subprocess, sys
from PIL import Image, ImageChops

ROOT = "/home/user/gwp"
OUT_B = f"{ROOT}/public/assets/blanks"
OUT_W = f"{ROOT}/public/assets/work"
os.makedirs(OUT_B, exist_ok=True)
os.makedirs(OUT_W, exist_ok=True)

# upload file -> titanjet SKU, confirmed by reading the caption strip of each screenshot
BLANKS = [
    ("IMG-20260825-WA0000.jpg", "sb893"),
    ("IMG-20260825-WA0001.jpg", "sb859"),
    ("IMG-20260825-WA0002.jpg", "sb856"),
    ("IMG-20260825-WA0003.jpg", "sb8005"),
    ("IMG-20260825-WA0004.jpg", "sb8000"),
    ("IMG-20260825-WA0005.jpg", "sb890"),
    ("IMG-20260825-WA0006.jpg", "sb8072"),
    ("IMG-20260825-WA0007.jpg", "sb889"),
    ("IMG-20260825-WA0008.jpg", "sb8009"),
]


def trim_white(im, tol=8):
    """Crop uniform near-white margins."""
    bg = Image.new("RGB", im.size, (255, 255, 255))
    diff = ImageChops.difference(im.convert("RGB"), bg)
    diff = ImageChops.add(diff, diff, 2.0, -tol)
    box = diff.getbbox()
    return im.crop(box) if box else im


def to_webp(im, path, width, quality):
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    im.save(path, "WEBP", quality=quality, method=6)


def verify(path):
    im = Image.open(path)
    im.verify()
    im = Image.open(path)
    im.load()
    return im.size


fails = []

# ---- 1. blanks
print("== blanks")
for fn, sku in BLANKS:
    src = f"/home/user/uploads/{fn}"
    im = Image.open(src).convert("RGB")
    w, h = im.size
    # strip phone status bar / omnibox at top and caption + gesture bar at bottom
    # 0.14 clears the faint '1 / 4' pagination line under the omnibox
    im = im.crop((0, int(h * 0.145), w, int(h * 0.885)))
    im = trim_white(im)
    # pad back to a consistent 4:5 frame on white so the grid never jumps
    tw, th = im.size
    side = max(tw, round(th * 0.8))
    canvas = Image.new("RGB", (side, round(side * 1.25)), (255, 255, 255))
    canvas.paste(im, ((side - tw) // 2, (round(side * 1.25) - th) // 2))
    to_webp(canvas.copy(), f"{OUT_B}/{sku}.webp", 900, 84)
    to_webp(canvas.copy(), f"{OUT_B}/{sku}@sm.webp", 440, 80)
    try:
        a = verify(f"{OUT_B}/{sku}.webp")
        b = verify(f"{OUT_B}/{sku}@sm.webp")
        print(f"  {sku}: {a} / {b}")
    except Exception as e:
        fails.append((sku, e))

# ---- 2. work photos
print("== work")
EXCLUDE = {
    # a child's face is printed on the tumbler. Not published without written consent.
    "IMG-20260825-WA0054.jpg",
    "IMG-20260825-WA0067.jpg",
}
raw = sorted(f for f in os.listdir("/home/user/fb2/raw") if f.endswith(".jpg"))
kept = [f for f in raw if f not in EXCLUDE]
print(f"  {len(raw)} downloaded, {len(EXCLUDE)} withheld, {len(kept)} to publish")

for i, fn in enumerate(kept, 1):
    sid = f"work-{i:02d}"
    im = Image.open(f"/home/user/fb2/raw/{fn}").convert("RGB")
    to_webp(im.copy(), f"{OUT_W}/{sid}.webp", 1200, 82)
    to_webp(im.copy(), f"{OUT_W}/{sid}@sm.webp", 560, 78)
    try:
        a = verify(f"{OUT_W}/{sid}.webp")
        b = verify(f"{OUT_W}/{sid}@sm.webp")
        if i <= 3 or i == len(kept):
            print(f"  {sid} <- {fn}: {a} / {b}")
    except Exception as e:
        fails.append((sid, e))

tot = sum(os.path.getsize(f"{OUT_W}/{f}") for f in os.listdir(OUT_W))
totb = sum(os.path.getsize(f"{OUT_B}/{f}") for f in os.listdir(OUT_B))
print(f"\nwork  {len(os.listdir(OUT_W))} files, {tot/1024/1024:.1f} MB")
print(f"blank {len(os.listdir(OUT_B))} files, {totb/1024:.0f} KB")

if fails:
    print("FAILS:", fails)
    sys.exit(1)
print("ALL VALID")
