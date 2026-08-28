import Link from 'next/link';
import Image from 'next/image';
import { Chev, Icon } from '@/components/Icons';
import { SITE_URL } from '@/lib/site';
import {
  shapes,
  shapesByFamily,
  shapesSource,
  designsForShape,
  nearestItem,
  blankPriceLabel,
} from '@/lib/catalog';

export const metadata = {
  title: 'The Blank Range',
  description:
    'The unprinted containers we print on: steel mugs, skinny tumblers, ring-pull cans, kids flip-top bottles and baby sippy cups. Real capacities and print areas from the maker. Ask us for a price.',
  alternates: { canonical: '/blanks' },
  openGraph: {
    title: 'The Blank Range | Gifted with Purpose',
    description:
      'Nine unprinted shapes, with the real capacity and print area of each. See the container before it carries a design.',
    url: `${SITE_URL}/blanks`,
  },
};

export default function BlanksPage() {
  const groups = shapesByFamily();

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blank range', item: `${SITE_URL}/blanks` },
    ],
  };

  const list = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Gifted with Purpose blank range',
    numberOfItems: shapes.length,
    itemListElement: shapes.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.name,
      url: `${SITE_URL}/blanks/${s.id}`,
    })),
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(list) }} />

      <section className="cblock cblock-tight" style={{ '--accent-ink': '#2F5D62' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <span aria-current="page">Blank range</span>
          </nav>
          <div className="cb-head">
            <p className="sub">Before the design goes on</p>
            <h1>The blank range</h1>
            <p>
              These are the containers themselves, unprinted, straight from the maker. {shapes.length} shapes across
              mugs, tumblers, cans and kids bottles. Every capacity, dimension and print area below is the maker&rsquo;s
              own figure, not our estimate.
            </p>
          </div>
          <p className="cblock-cta">
            <Link href="/shop" className="btn btn-ghost">
              Or see what we sell printed
            </Link>
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <p className="blk-note">
            <Icon name="cup" />
            <span>
              We have not published a price for any shape on this page. Message us with the shape and the size and we
              confirm the price and stock before you commit to anything.
            </span>
          </p>

          {groups.map((g) => (
            <section className="blk-fam" key={g.family} aria-labelledby={`fam-${g.family}`}>
              <div className="blk-fam-head">
                <h2 id={`fam-${g.family}`}>{g.label}</h2>
                <p>
                  {g.items.length} shape{g.items.length === 1 ? '' : 's'}
                </p>
              </div>
              <ul className="blanks blanks-blk">
                {g.items.map((s, i) => {
                  const n = designsForShape(s).length;
                  return (
                    <li key={s.id}>
                      <Link href={`/blanks/${s.id}`} className="blank">
                        <span className="blank-media blank-media-white">
                          <Image
                            src={`/assets/blanks/${s.photo}@sm.jpg`}
                            alt={`${s.name}, unprinted. ${s.material}, ${s.lid.toLowerCase()}.`}
                            fill
                            sizes="(min-width:1000px) 300px, 46vw"
                            priority={g.family === 'mug' && i === 0}
                            style={{ objectFit: 'contain' }}
                          />
                          <span className="blk-sku">{s.sku_label}</span>
                        </span>
                        <span className="blank-body">
                          <span className="blank-top">
                            <b className="blank-name">{s.name}</b>
                            <span className="blank-price ask">Price on request</span>
                          </span>
                          <span className="blank-spec">
                            {s.capacity} &middot; {s.material}
                          </span>
                          
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          <div className="shop-next">
            <div>
              <h2>Already know what you want printed</h2>
              <p>
                The shop is the shorter list: the items we keep, priced and ready. Several of them are these same
                shapes with a design already on them.
              </p>
            </div>
            <p className="shop-next-cta">
              <Link href="/shop" className="btn btn-primary">
                <Icon name="grid" /> Shop printed items
              </Link>
              <Link href="/designs" className="btn btn-ghost">
                Browse the designs
              </Link>
            </p>
          </div>

          <table className="blk-table">
            <caption>
              Every figure below is the maker&rsquo;s own, read from {shapesSource}.
            </caption>
            <thead>
              <tr>
                <th scope="col">Shape</th>
                <th scope="col">Code</th>
                <th scope="col">Capacity</th>
                <th scope="col">Print area</th>
                <th scope="col">Closest priced item</th>
              </tr>
            </thead>
            <tbody>
              {shapes.map((s) => {
                const near = nearestItem(s);
                return (
                  <tr key={s.id}>
                    <th scope="row">
                      <Link href={`/blanks/${s.id}`}>{s.name}</Link>
                    </th>
                    <td>{s.sku_label}</td>
                    <td>{s.capacity}</td>
                    <td>{s.print_area || 'Ask us'}</td>
                    <td>
                      {near ? (
                        <Link href={`/shop/${near.id}`}>
                          {near.name}, {blankPriceLabel(near).toLowerCase()}
                        </Link>
                      ) : (
                        'Not in the printed range yet'
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
