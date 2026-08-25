import Link from 'next/link';
import { Chev } from '@/components/Icons';
import { collections, productsIn, brand } from '@/lib/site';

export const metadata = {
  title: 'Sitemap',
  description: 'Every page on the Gifted with Purpose website, in one list.',
  alternates: { canonical: '/sitemap-page' },
};

export default function SitemapPage() {
  return (
    <main id="main">
      <section className="phero" style={{ '--accent': 'var(--taupe)', '--accent-soft': '#F7F3F1', '--accent-ink': '#8A3A3C' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <span aria-current="page">Sitemap</span>
          </nav>
          <p className="sub">Everything in one place</p>
          <h1>Sitemap</h1>
          <p>Every page on this site. If you cannot find something, message us on WhatsApp {brand.phone_intl}.</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap legal" style={{ maxWidth: 820 }}>
          <h2>Shop</h2>
          <ul className="bullets">
            {collections.map((c) => {
              const n = productsIn(c.slug).length;
              return (
                <li key={c.slug}>
                  <Link href={`/collections/${c.slug}`}>
                    {c.name} — {c.sub}
                  </Link>{' '}
                  <small style={{ color: 'var(--muted)' }}>
                    ({n} design{n !== 1 ? 's' : ''})
                  </small>
                </li>
              );
            })}
          </ul>

          <h2>About and ordering</h2>
          <ul className="bullets">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/designs">Pick your design</Link>
            </li>
            <li>
              <Link href="/about">Our Story</Link>
            </li>
            <li>
              <Link href="/how-to-order">How to order</Link>
            </li>
            <li>
              <Link href="/faq">Frequently asked questions</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>

          <h2>Legal</h2>
          <ul className="bullets">
            <li>
              <Link href="/legal/privacy">Privacy policy</Link>
            </li>
            <li>
              <Link href="/legal/terms">Terms and conditions</Link>
            </li>
            <li>
              <Link href="/legal/cookies">Cookie policy</Link>
            </li>
          </ul>

          <h2>For search engines</h2>
          <ul className="bullets">
            <li>
              <a href="/sitemap.xml">XML sitemap</a>
            </li>
            <li>
              <a href="/robots.txt">robots.txt</a>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
