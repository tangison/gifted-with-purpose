# BRAND.md

Derived from the client's own supplied assets: the logo, social flyer, product photography and
product ad templates. A designed public version of this document lives at `/brand`.

Marked **Verified** where taken directly from a supplied file, **Decision** where chosen during the
build and recorded here so it is not silently re-litigated.

## 1. Identity

| Field | Value | Source |
|---|---|---|
| Trading name | Gifted with Purpose | Verified |
| Registered name | Geneveve Gift Shop | Verified, footer and legal use only |
| Tagline | Thoughtful. Meaningful. Yours. | Verified, on the logo |
| Sub-line | Beautiful personalized gifts made with love. | Verified, social flyer |
| Team | A proud mother and daughter team | Verified, flyer "About Us" |
| Location | Made with love in Namibia | Verified, flyer |

## 2. Logo

The supplied SVG is a circular badge that **already contains the wordmark and the tagline**.

- **Decision:** the logo is never paired with the brand name set in type beside it. Doing so repeats
  the words that are already inside the mark. This was corrected during the build.
- Header: 84px, centred.
- Footer: the closing signature, 350px on mobile and 558px on desktop, placed below the links so the
  sticky header never clips it.
- Minimum clear space: 10 percent of the badge diameter on all sides.
- Never stretch non-uniformly, recolour the letters, or alter the geometry.
- Never place on busy photography. White, cream or a solid colour block only.
- **Never regenerate it with an image model.** Only the supplied vector is authentic. Raster icons
  are rasterised from that SVG at density 400, never upscaled from a bitmap.

## 3. Colour

### Logo palette, sampled from the source file

| Name | Hex | Use |
|---|---|---|
| Blush pink | `#FEDDE8` | Logo background, soft sections |
| Hot pink | `#F78AAF` | Headings, accents |
| Gold | `#F9C85A` | Accent |
| Teal | `#94D2CC` | Accent |
| Maroon | `#A64C4E` | Accent letter, sparing |
| Lavender | `#B69FB9` | Accent letter, sparing |
| Taupe | `#A19088` | Accent letter, sparing |
| Deep brown | `#625042` | Accent letter, sparing |
| Near black | `#0A0A0A` | Body copy, "WITH" wordmark |

### Category accents and their accessible text variants

The flyer accents are correct as shapes but fail contrast as small text. Each collection therefore
carries a darkened `accent_ink` used for labels and links. Both live in `data/site.json`.

| Collection | Accent | Text variant | Contrast on its soft background |
|---|---|---|---|
| Encourage | `#E8407A` | `#B32359` | 5.73:1 |
| Inspire | `#3FB6A8` | `#1F6F66` | 5.46:1 |
| Celebrate | `#F0A93A` | `#8A5A05` | 5.52:1 |
| Teacher Appreciation | `#1F4E9C` | `#1F4E9C` | 7.03:1 |
| Old School Vibes | `#A64C4E` | `#8A3A3C` | 6.80:1 |

### Action colours

| Token | Hex | Contrast with white |
|---|---|---|
| `--wa` brand green, identity only | `#25D366` | 1.98:1, never used behind text |
| `--wa-btn` WhatsApp buttons | `#0B6B41` | 6.58:1 |
| Pink call to action | `#C21F57` | 5.79:1 |

The Teacher Appreciation blue and green palette stays scoped to that one collection. It never enters
the global chrome.

## 4. Typography

Four self-hosted faces, never more than three on a page.

| Face | Role | Notes |
|---|---|---|
| Fraunces 700/900 | Display headings | H1 and section headings only |
| Poppins 400 to 700 | Body and UI | Default for everything readable |
| Caveat 600 | Tagline and quotes | Never body copy or buttons |
| Baloo 2 700 | One or two word emphasis | Used sparingly |

`font-display: optional` on all faces. `swap` was measured causing 0.158 cumulative layout shift on
a cold load, so the four above-the-fold faces are preloaded and the rest fall back silently.

## 5. Motion

Motion is a system, not decoration.

- **Purpose:** motion only confirms a state change the person triggered. The menu drawer, the gift
  bag, the lightbox and the sticky order bar.
- **Nothing animates on scroll.** An earlier build had 40 scroll-reveal wrappers; they were removed
  because they animated to prove animation existed.
- **Timing:** 180ms to 320ms. Easing `cubic-bezier(.32,.72,.3,1)` for panels, `ease` for colour.
- **Reduced motion:** every transition and the skeleton shimmer stop under
  `prefers-reduced-motion: reduce`.
- **Performance:** transform and opacity only. No layout-triggering animation.
- **Cleanup:** every listener and observer is removed on unmount.

## 6. Voice

Warm, encouraging, faith friendly without being preachy, small-business personal. Short affirming
phrases as headlines. Afrikaans product text is printed exactly as designed and never auto
translated. Never invent testimonials, review counts, or staff beyond the two real people.

## 7. What this brand is not

No gradient headline text. No glassmorphism. No floating blobs or decorative grids. No purple
default palette. No repeated rounded-card grids with an icon in every section. No pill buttons
everywhere. No stock photography of people. No fake metrics or animated counters. No large dark
footer containing a second sales page.
