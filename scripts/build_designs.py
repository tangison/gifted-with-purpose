# Rebuilds data/designs.json with full metadata.
# Every row was written from looking at the rendered sheet, not from the filename.
# Contact sheets: /home/user/bar/sheet-fliptop.png, sheet-sippy.png, sheet-design-a.png, sheet-design-b.png
import json, os
from PIL import Image

# id, name, alt, themes, licensed, personalise, photo
F = [
 (1,"Good Job Goals","Kids flip-top bottle wrap covered in reward stickers reading Goals, Good Job and Enjoy Today",["kids","affirmations","school"],0,0,0),
 (2,"Learn and Sing","Kids flip-top bottle wrap with a friendly learning presenter, alphabet blocks and toy animals",["kids","characters","school"],1,0,0),
 (3,"Learn Play Grow","Kids flip-top bottle wrap reading Learn Play Grow with a rainbow train and hot air balloons",["kids","school"],0,0,0),
 (4,"Night Sky Mouse","Kids flip-top bottle wrap with a classic cartoon mouse waving on a starry night stage",["kids","characters"],1,0,0),
 (5,"God Says I Am","Kids flip-top bottle wrap reading God Says I Am with scripture affirmations for children",["kids","faith","affirmations"],0,0,0),
 (6,"I Am Strong Pencils","Kids flip-top bottle wrap with I Am Strong badges above a row of coloured pencils",["kids","affirmations","school"],0,0,0),
 (7,"Weekly Goals","Kids flip-top bottle wrap of study stickers reading Weekly Goals, Let's Study and Enjoy Today",["kids","school","affirmations"],0,0,0),
 (8,"On The Farm","Kids flip-top bottle wrap with a red barn, cows, sheep and sunflowers",["kids","animals"],0,0,0),
 (9,"Countryside","Kids flip-top bottle wrap with a wide farm landscape of horses, cattle and a tractor",["kids","animals"],0,0,0),
 (10,"School Is Cool","Kids flip-top bottle wrap reading School Is Cool on pink checkerboard with stationery icons",["kids","school","retro"],0,0,0),
 (11,"Pink Bow Mouse","Kids flip-top bottle wrap with a bow-wearing cartoon mouse on soft pink polka dots",["kids","characters"],1,0,0),
 (12,"Blue Speedster","Kids flip-top bottle wrap with a blue cartoon hedgehog peeking around the corner",["kids","characters"],1,0,0),
 (13,"Puppet Street","Kids flip-top bottle wrap with a row of colourful street puppet characters",["kids","characters"],1,0,0),
 (14,"Dino Valley","Kids flip-top bottle wrap with dinosaurs in a green prehistoric valley",["kids","animals"],0,0,0),
 (15,"Star Student","Kids flip-top bottle wrap of school reward stickers reading Great Job and Excellent",["kids","school","affirmations"],0,0,0),
 (16,"Blue Dog Days","Kids flip-top bottle wrap with a blue cartoon dog family and Be You lettering",["kids","characters"],1,0,0),
 (17,"Storm Runner","Kids flip-top bottle wrap with a blue cartoon hedgehog against a stormy ocean",["kids","characters"],1,0,0),
 (18,"Good Friends","Kids flip-top bottle wrap with a blue cartoon dog family, rainbows and Good Days lettering",["kids","characters"],1,0,0),
 (19,"Neon Racer","Kids flip-top bottle wrap with a blue cartoon hedgehog in neon racing colours",["kids","characters"],1,0,0),
 (20,"Safari Friends","Kids flip-top bottle wrap with a baby giraffe, rhino, koala and elephant on safari",["kids","animals"],0,0,0),
 (21,"Monster Trucks","Kids flip-top bottle wrap with monster trucks and construction machines on a dark grid",["kids","vehicles"],0,0,0),
 (22,"Meadow Pups","Kids flip-top bottle wrap with cartoon rescue puppies in a flower meadow",["kids","characters"],1,0,0),
 (23,"Race Day","Kids flip-top bottle wrap with cartoon racing cars, chequered flags and balloons",["kids","vehicles"],0,0,0),
 (24,"Pink Rescue Pups","Kids flip-top bottle wrap with cartoon rescue puppies on a pink floral background",["kids","characters"],1,0,0),
 (25,"Mighty Pups","Kids flip-top bottle wrap with a cartoon rescue puppy team in hero costume",["kids","characters"],1,0,0),
 (26,"Under The Sea","Kids flip-top bottle wrap with a mermaid, tropical fish and coral",["kids","animals"],0,0,0),
 (27,"Ballgown Dolls","Kids flip-top bottle wrap with fashion dolls in pink and purple ballgowns",["kids","characters"],1,0,0),
 (28,"Retro Doll","Kids flip-top bottle wrap with a fashion doll on mint and pink memphis shapes",["kids","characters","retro"],1,0,0),
 (29,"Checkerboard School","Kids flip-top bottle wrap reading School Is Cool in bright checkerboard panels",["kids","school","retro"],0,0,0),
 (30,"Alphabet Goals","Kids flip-top bottle wrap of Weekly Goals stickers with alphabet and reward badges",["kids","school","affirmations"],0,0,0),
]

S = [
 (1,"Yellow Sponge","Kids sippy cup wrap with a cheerful yellow cartoon sponge character",["kids","characters"],1,0,0),
 (2,"Bow Mouse","Kids sippy cup wrap with a bow-wearing cartoon mouse on pink",["kids","characters"],1,0,0),
 (3,"Funfair Carousel","Kids sippy cup wrap with a cartoon mouse at a funfair carousel",["kids","characters"],1,0,0),
 (4,"Beige Mouse","Kids sippy cup wrap with a classic cartoon mouse on warm beige",["kids","characters"],1,0,0),
 (5,"Explorer Girl","Kids sippy cup wrap with a cartoon explorer girl and space for a printed name",["kids","characters","personalised"],1,1,0),
 (6,"Winter Sisters","Kids sippy cup wrap with ice princess film characters and a snowman",["kids","characters"],1,0,0),
 (7,"Ice Queen","Kids sippy cup wrap with an ice queen in a purple magical snow scene",["kids","characters"],1,0,0),
 (8,"Snow Play","Kids sippy cup wrap with ice princess sisters, a snowman and falling snow",["kids","characters"],1,0,0),
 (9,"Frozen Night","Kids sippy cup wrap with ice princess film characters on a deep blue winter night",["kids","characters"],1,0,0),
 (10,"Red Tractor","Kids sippy cup wrap with a red barn, tractor and farm chickens in sunshine",["kids","vehicles","animals"],0,0,0),
 (11,"Meadow Rescue Pups","Kids sippy cup wrap with cartoon rescue puppies among pink flowers",["kids","characters"],1,0,0),
 (12,"Farmyard","Kids sippy cup wrap with cartoon chickens, sheep and a cow in a green farmyard",["kids","animals"],0,0,0),
 (13,"Study Stickers","Kids sippy cup wrap of pink study stickers reading Let's Study and Great Job",["kids","school","affirmations"],0,0,0),
 (14,"Alphabet Time","Kids sippy cup wrap with a learning presenter, alphabet letters and soft toys",["kids","characters","school"],1,0,0),
 (15,"Goals and Gold Stars","Kids sippy cup wrap of reward stickers reading Goals, Happy and Excellent",["kids","school","affirmations"],0,0,0),
 (16,"Learn Play Grows","Kids sippy cup wrap reading Learn Play Grows with a rainbow train and stars",["kids","school"],0,0,0),
 (17,"God Says I Am Kids","Kids sippy cup wrap reading God Says I Am with scripture cards for children",["kids","faith","affirmations"],0,0,0),
 (18,"Namibia","Kids sippy cup wrap with the Namibian flag, red dunes and desert wildlife",["kids","namibia"],0,0,0),
 (19,"School Is Cool Cup","Kids sippy cup wrap reading School Is Cool with checkerboard and stationery",["kids","school","retro"],0,0,0),
 (20,"Doll In Purple","Kids sippy cup wrap with a fashion doll on purple with script lettering",["kids","characters"],1,0,0),
 (21,"Doll In Pink","Kids sippy cup wrap with a fashion doll on hot pink panels",["kids","characters"],1,0,0),
 (22,"Pastel Rescue Pups","Kids sippy cup wrap with cartoon rescue puppies on pastel pink",["kids","characters"],1,0,0),
 (23,"Doll Princess","Kids sippy cup wrap with a fashion doll princess in a tiara on sparkling pink",["kids","characters"],1,0,0),
 (24,"Jungle Dinos","Kids sippy cup wrap with dinosaurs in a dark green jungle",["kids","animals"],0,0,0),
 (25,"Pastel Dinos","Kids sippy cup wrap with small pastel dinosaurs and ferns on cream",["kids","animals"],0,0,0),
 (26,"Blue Hedgehog","Kids sippy cup wrap with a blue cartoon hedgehog pointing, on royal blue",["kids","characters"],1,0,0),
 (27,"Ring Runner","Kids sippy cup wrap with a blue cartoon hedgehog holding a gold ring",["kids","characters"],1,0,0),
 (28,"Choose Kindness Dogs","Kids sippy cup wrap with a blue cartoon dog family and Choose Kindness lettering",["kids","characters","affirmations"],1,0,0),
 (29,"Mermaid Reef","Kids sippy cup wrap with a mermaid, seahorses and a coral reef",["kids","animals"],0,0,0),
 (30,"Neon Speed","Kids sippy cup wrap with cartoon hedgehog characters in neon racing colours",["kids","characters"],1,0,0),
 (31,"Baby Safari","Kids sippy cup wrap with baby safari animals in tall grass",["kids","animals"],0,0,0),
 (32,"Truck Grid","Kids sippy cup wrap with monster trucks on a dark industrial grid",["kids","vehicles"],0,0,0),
 (33,"Rescue Team","Kids sippy cup wrap with the full cartoon rescue puppy team and their leader",["kids","characters"],1,0,0),
 (34,"Blue Dog Family","Kids sippy cup wrap with a blue cartoon dog family on pale blue",["kids","characters"],1,0,0),
 (35,"Web Slinger","Kids sippy cup wrap with a red and blue web-slinging superhero and spiderwebs",["kids","characters"],1,0,0),
 (36,"Melon Babies","Kids sippy cup wrap with cartoon nursery-rhyme babies, a school bus and a printed name",["kids","characters","personalised"],1,1,0),
 (37,"Hero Pups","Kids sippy cup wrap with cartoon rescue puppies in hero suits on bright yellow",["kids","characters"],1,0,0),
 (38,"Lookout Crew","Kids sippy cup wrap with the cartoon rescue puppy crew and their lookout tower",["kids","characters"],1,0,0),
 (39,"Night Patrol","Kids sippy cup wrap with cartoon rescue puppies on a deep navy night background",["kids","characters"],1,0,0),
 (40,"Puppy Line-Up","Kids sippy cup wrap with three cartoon rescue puppies side by side",["kids","characters"],1,0,0),
 (41,"Badge Blue","Kids sippy cup wrap with a cartoon rescue puppy badge on gradient blue",["kids","characters"],1,0,0),
 (42,"Yellow Helpers","Kids sippy cup wrap with small yellow goggled cartoon helpers on grey",["kids","characters"],1,0,0),
]

D = [
 (1,"Smiley Daisies","Retro smiley faces and daisies repeating across pastel lilac and pink",["retro","floral"],0,0,0),
 (2,"Work Of Heart","Teacher print reading Teaching Is A Work Of Heart with books, pencils and a bow",["teacher"],0,0,0),
 (3,"Cocktail Hour","Print of six illustrated cocktail recipes including Margarita, Mojito and Pina Colada",["fun","recipes"],0,0,0),
 (4,"Believe In Your Magic","Pastel wave print with hand-lettered lines including Believe in your magic and Do it with kindness",["affirmations","selfcare"],0,0,0),
 (5,"This Is Your Reminder","Bright floral print reading Sometimes amazing people forget how amazing they are",["affirmations"],0,0,0),
 (6,"Juffrou","Afrikaans teacher print reading n Juffrou plant saadjies van kennis wat vir altyd groei, with children reading",["teacher","afrikaans"],0,0,0),
 (7,"Positivity Affirmations","Affirmation print laid out as pastel sticky notes with I am worthy and I choose happiness",["affirmations","selfcare"],0,0,0),
 (8,"Faith Makes It Possible","Print reading Faith does not make things easy it makes them possible, with butterflies and flowers",["faith","affirmations"],0,0,0),
 (9,"Kind Brave Smart","Bold colour-block print reading You are kind, brave, smart, enough, loved and unique",["affirmations","kids"],0,0,0),
 (10,"Bubblegum Alien","Print of a small blue cartoon alien character blowing pink bubblegum",["kids","characters"],1,0,0),
 (11,"Blomme Affirmations","Afrikaans and English floral affirmation print with Jy is mooi and Sterker as jy dink among wildflowers",["affirmations","afrikaans","floral"],0,0,0),
 (12,"Self Love","Retro self-love print with lightning bolts, daisies and Take care of your mind lettering",["selfcare","retro","affirmations"],0,0,0),
 (13,"God Says You Are","Scripture print reading God Says You Are with Unique, Forgiven, Chosen and Beautiful, each with a verse",["faith","affirmations"],0,0,0),
 (14,"Note To Self","Print of pastel note cards reading Take a break, Believe in yourself and Chase your dreams",["affirmations","selfcare"],0,0,0),
 (15,"Spreuke 31","Afrikaans line-art print reading Sy is beklee met krag en waarheid, Spreuke 31",["faith","afrikaans"],0,0,0),
 (16,"So Much Bigger","Print reading God is so much bigger than your doubts, your shame and your worries",["faith","affirmations"],0,0,0),
 (17,"Toolbox Name","Bold personalised name print set across a dark workshop tool background",["personalised","work"],0,1,0),
 (18,"Love Yourself First","Soft floral print with Love yourself first, Progress over perfection and Own your journey",["affirmations","selfcare","floral"],0,0,0),
 (19,"Cola Label","Full-wrap print styled as a classic red cola drinks label",["retro","brands"],1,0,0),
 (20,"Brushstroke","Abstract print of blue and black brushstrokes on white",["abstract"],0,0,0),
 (21,"Strong And Courageous","Scripture print reading Be strong and courageous, Joshua 1:9, around a flower-covered cross",["faith","floral"],0,0,0),
 (22,"My Mental Breakdown Cup","Mental health print with It's okay to feel sad and I'm allowed to have a bad day on pastel shapes",["selfcare","affirmations"],0,0,0),
 (23,"Queen","Pink and black word print with Queen, Confidence, Inner peace and Unstoppable among butterflies",["affirmations","selfcare"],0,0,0),
 (24,"Boss Babe","Pink desk print reading Boss Babe with a laptop, camera, planner and heels",["work","affirmations"],0,0,0),
 (25,"Perfectly Imperfect","Monochrome print with Perfectly imperfect, Be kind always and Positive vibes only",["affirmations","selfcare"],0,0,0),
 (26,"Enjoy The Little Things","Hot pink and black print reading Enjoy the little things and Just be real",["affirmations","retro"],0,0,0),
 (27,"Start Today","Pink watercolour print reading Start today, Dream it, wish it, do it and The future is mine",["affirmations","floral"],0,0,0),
 (28,"She Is Extraordinary","Print reading She is extraordinary, creative, intelligent, confident, framed by poppies and pansies",["affirmations","floral"],0,0,0),
 (29,"Names Of Jesus","Scripture print naming Jesus as The Good Shepherd, The Alpha and Omega and The Bread of Life around a floral cross",["faith","floral"],0,0,0),
 (30,"Extraordinary Roses","Print reading She is extraordinary with I am she, she is me, framed in yellow and pink roses",["affirmations","floral"],0,0,0),
 (31,"It Is Okay To","Colour-blocked print reading It is okay to make mistakes, ask for help, say no and start over",["selfcare","affirmations"],0,0,0),
 (32,"You Can Do Anything","Lightbox-lettered print reading You Can Do Anything on a starry night sky",["affirmations","kids"],0,0,0),
 (33,"Grow In Grace","Print reading Grow in Grace, 2 Peter 3:18, surrounded by poppies and wildflowers",["faith","floral"],0,0,0),
 (34,"New Every Morning","Script print reading His mercies are new every morning among red and pink poppies",["faith","floral"],0,0,0),
 (35,"Change Your Mindset","Affirmation print reading Change your mindset, change your life with self-love notes",["affirmations","selfcare"],0,0,0),
 (36,"Four Frames","Photo template with four blank panels on a pastel tie-dye background, ready for your pictures",["photo"],0,0,1),
 (37,"Pray On It","Rustic print reading Pray on it, Pray over it, Pray through it with a leopard-print cross",["faith","floral"],0,0,0),
 (38,"Just A Girl Who Loves Jesus","Print reading Just a girl who loves Jesus with a floral cross and roses",["faith","floral"],0,0,0),
 (39,"Trust In The Lord","Pink script print reading Trust in the Lord on a watercolour flower field",["faith","floral"],0,0,0),
 (40,"Daily Bible Affirmations","Print of scripture affirmation cards including God's love never fails and Faith over fear",["faith","affirmations"],0,0,0),
 (41,"Jeremiah 29:11","Print reading For I know the plans I have for you, Jeremiah 29:11, across a wildflower meadow",["faith","floral"],0,0,0),
 (42,"Bee Enough","Print reading You are enough, stronger than you think and never alone, with honey bees",["affirmations","kids"],0,0,0),
 (43,"Daily Positive Affirmations","Print of pastel affirmation cards reading I am confident, I am grateful and I am enough",["affirmations","selfcare"],0,0,0),
 (44,"God Is My Strength","Print reading God is my strength with a watercolour butterfly and wildflowers",["faith","floral"],0,0,0),
 (45,"Stay Pawsitive","Print with a blue cartoon dog family reading Stay pawsitive, Be you and Good times",["kids","characters"],1,0,0),
 (46,"Best Pups","Print with blue cartoon dogs reading Good vibes, Play all day and Best pups",["kids","characters"],1,0,0),
 (47,"Jesus Fills My Cup","Doodle print reading Jesus fills my cup, Psalm 23:5, with flowers, hearts and a camper van",["faith","retro"],0,0,0),
 (48,"Social Worker","Appreciation print reading Social Worker, Changing lives, Hearing hearts and Be the change",["work","teacher"],0,0,0),
 (49,"Soccer Night","Print of a football bursting through a floodlit stadium reading Soccer",["sport"],0,0,0),
 (50,"Self-Care Frames","Photo template with blank panels among Me time, Self-care is empowering and Relax lettering",["photo","selfcare"],0,0,1),
 (51,"Sisters","Photo template with nine blank panels labelled laughs, love, forever, memories and trust",["photo","family"],0,0,1),
 (52,"Badass Bestie","Print reading To my badass bestie, thank you for being my unbiological sister, with a leopard-print border",["friendship"],0,0,0),
 (53,"Teacher Qualities","Teacher print listing Inspire, Listen, Motivate, Encourage and Teach beside blank photo panels",["teacher","photo"],0,0,1),
 (54,"Big Heart","Teacher print reading It takes a big heart to shape little minds with a photo panel and coloured pencils",["teacher","photo"],0,1,1),
 (55,"Best Teacher Ever","Teacher print reading Best Teacher Ever with crayons, a photo panel and space for a name",["teacher","photo","personalised"],0,1,1),
 (56,"World's Best Teacher","Teacher print reading World's Best Teacher with a rainbow, an apple and a photo panel",["teacher","photo","personalised"],0,1,1),
 (57,"I Love You Clouds","Photo template with three blank panels, clouds, hearts and I love you lettering",["photo","family"],0,0,1),
 (58,"Good Day","Photo template with blank panels, a smiley face and Good Day lettering on blue",["photo","retro"],0,0,1),
 (59,"Hearts And Sun","Photo template with three blank panels, hearts and a smiling sun on pink",["photo","family"],0,0,1),
 (60,"Island Friends","Print with a blue cartoon alien, a pink alien and an island girl among flowers",["kids","characters"],1,0,0),
 (61,"Love Frames","Photo template with blank panels, rainbows and Love lettering on pink",["photo","family"],0,0,1),
 (62,"Happy Birthday","Photo template with bunting, confetti and Happy Birthday lettering around three blank panels",["photo","occasions"],0,0,1),
 (63,"Poppy Name","Personalised name print in bold red type across a poppy and wildflower meadow",["personalised","floral"],0,1,0),
 (64,"Meadow Name","Personalised name print in soft green script across a pastel wildflower meadow",["personalised","floral"],0,1,0),
 (65,"Bold Rose Name","Personalised name print in heavy black type across full-bloom roses",["personalised","floral"],0,1,0),
 (66,"Daisy Name","Personalised name print in pink type between borders of layered daisies",["personalised","floral"],0,1,0),
 (67,"Purple Bloom Name","Personalised name print in purple script between borders of purple and white flowers",["personalised","floral"],0,1,0),
 (68,"Blue Flower Friends","Print with a blue cartoon alien and an island girl hugging on a blue floral background",["kids","characters"],1,0,0),
 (69,"Choose Joy","Bright print reading Choose Joy with Faith over fear, Dream big and Every day is a fresh start",["affirmations","kids"],0,0,0),
]

GROUPS = {
 "fliptop": ("Kids flip-top bottles", "kids-fliptop", F),
 "sippy":   ("Kids sippy cups",       "sippy-cup",    S),
 "design":  ("Print designs",         None,           D),
}

items = []
for g, (label, drawn_for, rows) in GROUPS.items():
    for n, name, alt, themes, lic, pers, photo in rows:
        did = f"{g}-{n:02d}"
        full = os.path.join(os.path.dirname(__file__), "..", "public/assets/designs", did + ".webp")
        small = os.path.join(os.path.dirname(__file__), "..", "public/assets/designs", did + "@sm.webp")
        w, h = Image.open(full).size
        sw, sh = Image.open(small).size
        items.append({
            "id": did,
            "group": g,
            "group_label": label,
            "n": n,
            "file": did,
            "name": name,
            "alt": alt,
            "themes": themes,
            "drawn_for": drawn_for,
            "licensed": bool(lic),
            "personalisable": bool(pers),
            "photo_upload": bool(photo),
            "w": w, "h": h, "sw": sw, "sh": sh,
        })

assert len(items) == 141, len(items)
assert len({i["id"] for i in items}) == 141
root = os.path.join(os.path.dirname(__file__), "..")
for i in items:
    for suf in (".webp", "@sm.webp"):
        p = os.path.join(root, "public/assets/designs", i["file"] + suf)
        assert os.path.exists(p), p

out = {
    "note": ("Design library converted from the client's Canva PDF exports, 24 Aug 2026. "
             "Names, alt text and themes written from visual inspection of each rendered sheet, "
             "25 Aug 2026. Designs marked licensed depict third-party characters or brands and "
             "are listed generically; Gifted with Purpose is not affiliated with those rights holders."),
    "themes": sorted({t for i in items for t in i["themes"]}),
    "items": items,
}
json.dump(out, open(os.path.join(root, "data/designs.json"), "w"), indent=1, ensure_ascii=False)

from collections import Counter
print("items", len(items))
print("themes", out["themes"])
print("licensed", sum(i["licensed"] for i in items))
print("personalisable", sum(i["personalisable"] for i in items))
print("photo_upload", sum(i["photo_upload"] for i in items))
print(Counter(i["group"] for i in items))
