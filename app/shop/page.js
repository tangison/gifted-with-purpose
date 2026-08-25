import Link from 'next/link';
import Image from 'next/image';
import { Chev, Icon } from '@/components/Icons';
import { SITE_URL, brand } from '@/lib/site';
import {
  blanks,
  designs,
  shapes,
  designsForBlank,
  blankPriceLabel,
  money,
} from '@/lib/catalog';

export const metadata = {
  title: 'Shop the Items',
  description:
    'Mugs, tumblers, kids sippy cups and flip-top bottles, printed to order in Windhoek. Pick the item, then pick any of 141 designs or send us your own. Prices from N$120.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop the Items | Gifted with Purpose',
    description: 'Pick the item, then pick the design. Printed to order in Windhoek.',
    url: `${SITE_URL}/shop`,
  },
};

export default function ShopPage() {
  const priced = blanks.filter((b) => b.price != null).map((b) => b.price);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` },
    ],
  };

  const list = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Gifted with Purpose items',
    numberOfItems: blanks.length,
    itemListElement: blanks.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      url: `${SITE_URL}/shop/${b.id}`,
    })),
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(list) }} />

      <section className="cblock cblock-tight" style={{ '--accent-ink': '#B32359' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <span aria-current="page">Shop</span>
          </nav>
          <div className="cb-head">
            <p className="sub">Step one of two</p>
            <h1>Pick the item</h1>
            <p>
              {blanks.length} items, {designs.length} designs, from {brand.currency}
              {Math.min(...priced).toFixed(2)}. The item sets the price. The design is yours to choose.
            </p>
          </div>
          <p className="cblock-cta">
            <Link href="/designs" className="btn btn-ghost">
              Or start from the design
            </Link>
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="sr-only">Items we print on</h2>
          <ul className="blanks">
            {blanks.map((b, i) => {
              const n = designsForBlank(b).length;
              return (
                <li key={b.id}>
                  <Link href={`/shop/${b.id}`} className="blank">
                    <span className="blank-media">
                      {b.photo ? (
                        <Image
                          src={`/assets/products/${b.photo}@sm.jpg`}
                          alt={`${b.name}, ${b.spec}`}
                          fill
                          sizes="(min-width:1000px) 300px, 46vw"
                          priority={i < 2}
                          style={{ objectFit: b.shot === 'studio' ? 'contain' : 'cover' }}
                        />
                      ) : (
                        <span className="blank-nophoto">
                          <Icon name="cup" />
                          Photo coming soon
                        </span>
                      )}
                    </span>
                    <span className="blank-body">
                      <span className="blank-top">
                        <b className="blank-name">{b.name}</b>
                        <span className={`blank-price${b.price == null ? ' ask' : ''}`}>
                          {blankPriceLabel(b)}
                        </span>
                      </span>
                      <span className="blank-spec">{b.spec}</span>
                      <span className="blank-n">
                        {n} design{n === 1 ? '' : 's'} fit this
                        <Chev />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="shop-next">
            <div>
              <h2>Then pick the design</h2>
              <p>
                Every design in the library can go on the item you choose. If you have something else in mind, we draw
                it for you and quote the artwork per job.
              </p>
            </div>
            <p className="shop-next-cta">
              <Link href="/designs" className="btn btn-primary">
                <Icon name="grid" /> Browse {designs.length} designs
              </Link>
              <Link href="/create" className="btn btn-ghost">
                Build it step by step
              </Link>
            </p>
          </div>

          <div className="shop-next">
            <div>
              <h2>Looking for a shape we have not listed</h2>
              <p>
                Behind these items sits the blank range: {shapes.length} unprinted containers from our supplier, with
                the real capacity and print area of each. If the shape you want is on that list we can print it. None
                of them is priced yet, so ask us.
              </p>
            </div>
            <p className="shop-next-cta">
              <Link href="/blanks" className="btn btn-ghost">
                See the {shapes.length} blank shapes
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
