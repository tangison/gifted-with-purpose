"""
data/work.json - 44 photographs of finished orders.

Alt text written from visual inspection of each photograph on 25 Aug 2026
(contact sheets in /home/user/fb2/sheet-*.png). Source order preserved:
work-NN maps to the Nth kept file in sorted order.

Withheld and never published:
  IMG-20260825-WA0054  Instagram screenshot, and a child's face is printed on the cup
  IMG-20260825-WA0067  a child's face is printed on the cup
Both need written consent from the parent before they go on a public website.
"""
import json, os
from PIL import Image

ROOT = "/home/user/gwp"

# n, alt, tags, licensed
ROWS = [
 (1,  "Stainless steel mug printed You Are Loved in bright colour-block lettering", ["affirmations"], 0),
 (2,  "White gin tumbler printed Sy is beklee met krag en waarheid, Spreuke 31, with orange florals", ["faith","afrikaans"], 0),
 (3,  "Navy can tumbler printed with a blue cartoon hedgehog character", ["kids","characters"], 1),
 (4,  "Teal can tumbler printed Weekly Goals with Great Job and Excellent reward stickers", ["kids","school"], 0),
 (5,  "Kids sippy cup with two handles printed with a learning presenter, a rainbow and toy blocks", ["kids","characters"], 1),
 (6,  "White handled mug printed Take Care Of Your Mind with a daisy, lightning bolt and I Matter", ["selfcare","affirmations"], 0),
 (7,  "Tall can tumbler printed with ginger kittens and the name JAYN in blue", ["kids","personalised"], 0),
 (8,  "Round self-love sticker sheet printed with hearts, flowers and affirmation words", ["selfcare","affirmations"], 0),
 (9,  "Frosted glass tumbler with bamboo lid printed She Is Fearfully And Wonderfully Made, Wise and Brave", ["faith","affirmations"], 0),
 (10, "Kids sippy cup with two handles printed with cartoon racing cars and a truck", ["kids","characters","vehicles"], 1),
 (11, "Kids flip-top bottle with a pink lid printed with a fashion doll in a tiara", ["kids","characters"], 1),
 (12, "Tall tumbler printed Sy is beklee met krag en waarheid, Spreuke 31, with a line-art face and wildflowers", ["faith","afrikaans","floral"], 0),
 (13, "White gin tumbler printed in Afrikaans Jy is gemaak om spore te los, Sterker as die storm, with bright flowers", ["affirmations","afrikaans","floral"], 0),
 (14, "Kids sippy cup with two handles printed with a bow-wearing cartoon mouse on pink polka dots", ["kids","characters"], 1),
 (15, "Kids sippy cup with two handles printed with street puppet characters and a 123 sign", ["kids","characters"], 1),
 (16, "Three tumblers side by side printed Choose Joy, Spreuke 31 and It Is Okay affirmations", ["affirmations","faith"], 0),
 (17, "Frosted glass water bottle printed Sometimes amazing people forget how amazing they are", ["affirmations","selfcare"], 0),
 (18, "Kids sippy cup with two handles printed with a blue cartoon dog family and paw prints", ["kids","characters"], 1),
 (19, "Frosted glass tumbler with bamboo lid printed with a soft floral monogram", ["floral","personalised"], 0),
 (20, "Tall skinny tumbler printed with six illustrated cocktail recipes including Margarita and Pina Colada", ["fun","recipes"], 0),
 (21, "Glass tumbler with bamboo lid printed You Are Enough, Stronger Than You Think, Never Alone", ["affirmations"], 0),
 (22, "Kids sippy cup with two handles printed with a mermaid and an underwater scene", ["kids"], 0),
 (23, "Two tumblers printed with retro Old School Vibes graffiti and cassette tape artwork", ["retro","fun"], 0),
 (24, "Insulated mug printed Jesus Fills My Cup, Psalm 23:5, with rainbows and doodle flowers", ["faith","retro"], 0),
 (25, "Tall tumbler printed It's Okay To Feel Your Feelings and Self-care Is Empowering", ["selfcare","affirmations"], 0),
 (26, "Tall bottle printed Daily Positive Affirmations with a rainbow and pastel quote cards", ["affirmations"], 0),
 (27, "Glass tumbler with bamboo lid printed You Are Enough in stacked colour blocks", ["affirmations"], 0),
 (28, "Kids flip-top bottle in pastel stripes printed with a cartoon rescue puppy", ["kids","characters"], 1),
 (29, "Kids flip-top bottle printed with the name Duan Richard Moritz over a wheat field", ["kids","personalised"], 0),
 (30, "Frosted glass mug printed Trust In Him with scripture and small stars", ["faith"], 0),
 (31, "Tall tumbler printed Faith Does Not Make Things Easy It Makes Them Possible with butterflies", ["faith","floral"], 0),
 (32, "Tall skinny tumbler printed Best Mom In The World inside a floral wreath", ["floral","occasions"], 0),
 (33, "Red-lined mug printed Self-loving affirmations with My Happiness Comes From Within", ["selfcare","affirmations"], 0),
 (34, "Gift box holding a frosted glass tumbler printed with the name Riekie and a matching flower coaster", ["personalised","floral"], 0),
 (35, "Gift box holding a frosted glass tumbler printed with the name Luche beside a Brave Capable coaster", ["personalised","floral"], 0),
 (36, "Frosted glass tumbler printed with the name Luche in bold type, packed in its gift box", ["personalised"], 0),
 (37, "Tall skinny tumbler printed in Afrikaans Droom groot, Vlieg hoog, Jy is mooi with a bold flower", ["affirmations","afrikaans","floral"], 0),
 (38, "Frosted glass mug printed with an Afrikaans Spreuke 31 verse above a wildflower border", ["faith","afrikaans","floral"], 0),
 (39, "Tall travel tumbler printed as a classic red cola label", ["retro","brands"], 1),
 (40, "Kids sippy cup with two handles printed with cartoon racing cars and the name JADON", ["kids","characters","personalised"], 1),
 (41, "Kids sippy cup with two handles printed with a blue truck in a desert canyon and the name Asher B", ["kids","vehicles","personalised"], 0),
 (42, "Kids sippy cup with two handles printed with a cartoon rescue puppy badge and the name JUAN", ["kids","characters","personalised"], 1),
 (43, "Kids sippy cup with two handles printed with cartoon racing cars and the name JADON on pink", ["kids","characters","personalised"], 1),
 (44, "Kids sippy cup with two handles printed with a red spiderweb pattern and a name", ["kids","personalised"], 0),
]

items = []
for n, alt, tags, lic in ROWS:
    sid = f"work-{n:02d}"
    full = f"{ROOT}/public/assets/work/{sid}.webp"
    small = f"{ROOT}/public/assets/work/{sid}@sm.webp"
    assert os.path.exists(full) and os.path.exists(small), sid
    w, h = Image.open(full).size
    sw, sh = Image.open(small).size
    items.append({
        "id": sid, "n": n, "file": sid, "alt": alt,
        "tags": tags, "licensed": bool(lic),
        "w": w, "h": h, "sw": sw, "sh": sh,
    })

assert len(items) == 44, len(items)

out = {
    "note": ("Photographs of real finished orders, supplied by the client 25 Aug 2026. "
             "Alt text written from visual inspection of each photograph. Two further "
             "photographs were withheld because a child's face is printed on the item; "
             "those need written parental consent before publication."),
    "withheld": 2,
    "items": items,
}
json.dump(out, open(f"{ROOT}/data/work.json", "w"), indent=1, ensure_ascii=False)

from collections import Counter
print("items", len(items))
print("licensed", sum(i["licensed"] for i in items))
print("tags", Counter(t for i in items for t in i["tags"]).most_common())
