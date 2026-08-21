import Link from 'next/link';
import { Chev } from '@/components/Icons';
import ShopClient from './ShopClient';
import { products, collections, brand, SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Shop All Personalised Gifts',
  description:
    'Every Gifted with Purpose design in one place: affirmation tumblers, faith-based drinkware, kids’ cups and teacher gifts. Filter by collection and order on WhatsApp.',
  alternates: { canonical: '/shop' },
};

export default function ShopPage() {
  const priced = products.filter((p) => p.price).map((p) => p.price);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` },
    ],
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="cblock" style={{ '--accent': 'var(--ink)' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <span aria-current="page">Shop</span>
          </nav>
          <p className="sub">Everything we make</p>
          <h1>Shop all designs</h1>
          <p>
            Every design in one place. Filter by collection, then send your gift bag to us in a single WhatsApp
            message.
          </p>
          <ul className="stats">
            <li>{products.length} designs</li>
            <li>{collections.length} collections</li>
            <li>
              From {brand.currency}
              {Math.min(...priced).toFixed(2)}
            </li>
          </ul>
        </div>
      </section>

      <ShopClient />
    </main>
  );
}
