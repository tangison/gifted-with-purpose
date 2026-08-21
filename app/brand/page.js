import Link from 'next/link';
import Image from 'next/image';
import { Chev } from '@/components/Icons';
import { brand, collections, SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Brand Guide',
  description:
    'The Gifted with Purpose brand guide: logo usage, colour palette, typography and tone of voice, taken from the client’s own supplied assets.',
  alternates: { canonical: '/brand' },
  robots: { index: false, follow: true },
};

const LOGO_COLOURS = [
  { name: 'Blush pink', hex: '#FEDDE8', use: 'Logo background, soft section backgrounds' },
  { name: 'Hot pink', hex: '#F78AAF', use: 'Headings, CTA accents' },
  { name: 'Gold', hex: '#F9C85A', use: 'Accent' },
  { name: 'Teal', hex: '#94D2CC', use: 'Accent' },
  { name: 'Maroon', hex: '#A64C4E', use: 'Accent letter, sparing use' },
  { name: 'Lavender', hex: '#B69FB9', use: 'Accent letter, sparing use' },
  { name: 'Taupe', hex: '#A19088', use: 'Accent letter, sparing use' },
  { name: 'Deep brown', hex: '#625042', use: 'Accent letter, sparing use' },
  { name: 'Near black', hex: '#0A0A0A', use: 'Body copy, “WITH” wordmark' },
];

const TYPE = [
  { face: 'Fraunces', role: 'Display headings', sample: 'Gifts that say the thing', cls: 'brand-type-display' },
  { face: 'Poppins', role: 'Body and UI', sample: 'Beautiful personalized gifts made with love.', cls: 'brand-type-body' },
  { face: 'Caveat', role: 'Tagline and quotes only', sample: 'Thoughtful. Meaningful. Yours.', cls: 'brand-type-script' },
  { face: 'Baloo 2', role: 'Short emphasis, 1 to 2 words', sample: 'WITH', cls: 'brand-type-round' },
];

export default function BrandPage() {
  return (
    <main id="main">
      <section className="phero" style={{ '--accent': 'var(--cat-pink)', '--accent-soft': '#FFEFF4', '--accent-ink': '#B32359' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <span aria-current="page">Brand guide</span>
          </nav>
          <p className="sub">Internal reference</p>
          <h1>Brand guide</h1>
          <p>
            Everything on this page is taken from the assets {brand.legal} supplied. Nothing here was invented, and the
            logo has never been redrawn or regenerated.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap legal" style={{ maxWidth: 860 }}>
          <h2>Logo</h2>
          <p>
            The supplied SVG already contains the wordmark and the tagline. It is used as one complete mark and is never
            paired with the brand name set in type beside it, which would repeat the words.
          </p>
          <div className="brand-logo-row">
            <div className="brand-logo-cell">
              <Image src="/assets/logos/gifted-with-purpose-logo.svg" alt="Gifted with Purpose logo on white" width={200} height={198} />
              <span>On white</span>
            </div>
            <div className="brand-logo-cell" style={{ background: '#FEDDE8' }}>
              <Image src="/assets/logos/gifted-with-purpose-logo.svg" alt="Gifted with Purpose logo on blush" width={200} height={198} />
              <span>On blush</span>
            </div>
            <div className="brand-logo-cell" style={{ background: '#0A0A0A' }}>
              <Image src="/assets/logos/gifted-with-purpose-logo.svg" alt="Gifted with Purpose logo on near black" width={200} height={198} />
              <span style={{ color: '#fff' }}>On near black</span>
            </div>
          </div>
          <ul className="bullets">
            <li>Keep at least 10 percent of the badge diameter as clear space on all sides.</li>
            <li>Never stretch it non-uniformly, recolour the letters, or alter the geometry.</li>
            <li>Never place it on busy photography. Use white, cream, or a solid colour block.</li>
            <li>Never regenerate it with an image model. Only the supplied vector is authentic.</li>
          </ul>

          <h2>Colour</h2>
          <p>Sampled directly from the source logo. These are the only colours used across the site.</p>
          <div className="swatches">
            {LOGO_COLOURS.map((c) => (
              <div className="swatch" key={c.hex}>
                <span className="chip-c" style={{ background: c.hex }} aria-hidden="true" />
                <b>{c.name}</b>
                <code>{c.hex}</code>
                <small>{c.use}</small>
              </div>
            ))}
          </div>

          <h3>Category accents</h3>
          <p>
            Each collection carries one accent from the flyer. Small text uses a darkened variant so it clears WCAG AA
            contrast, while the original accent stays for larger shapes and rules.
          </p>
          <div className="swatches">
            {collections.map((c) => (
              <div className="swatch" key={c.slug}>
                <span className="chip-c" style={{ background: c.accent }} aria-hidden="true" />
                <b>{c.name}</b>
                <code>{c.accent}</code>
                <small>
                  Text variant <code>{c.accent_ink}</code>
                </small>
              </div>
            ))}
          </div>
          <p>
            The Teacher Appreciation blue and green stays scoped to that one collection. It never enters the site
            chrome.
          </p>

          <h2>Typography</h2>
          <p>Four faces, self hosted, never more than three on a single page.</p>
          <div className="type-specs">
            {TYPE.map((t) => (
              <div className="type-spec" key={t.face}>
                <div className="meta">
                  <b>{t.face}</b>
                  <small>{t.role}</small>
                </div>
                <p className={t.cls}>{t.sample}</p>
              </div>
            ))}
          </div>

          <h2>Voice</h2>
          <ul className="bullets">
            <li>Warm, encouraging, faith friendly without being preachy.</li>
            <li>Short affirming phrases work best as headlines.</li>
            <li>Afrikaans product text is printed exactly as designed and never auto translated.</li>
            <li>Never invent testimonials, review counts, or staff beyond the mother and daughter.</li>
          </ul>

          <h2>Motion</h2>
          <p>
            Motion is limited to state changes a person triggers: the menu drawer, the gift bag, the lightbox and the
            sticky order bar. There is no decorative or scroll triggered animation. Every transition is under 320ms and
            all of them stop under <code>prefers-reduced-motion</code>.
          </p>

          <h2>What this brand is not</h2>
          <ul className="bullets">
            <li>No gradient headline text, glass panels, floating blobs or purple default palettes.</li>
            <li>No stock photography of people. Only real product and the real team photo.</li>
            <li>No invented prices, delivery promises, stock counts or partnership claims.</li>
          </ul>

          <p style={{ marginTop: 26 }}>
            <Link href="/">Back to the shop</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
