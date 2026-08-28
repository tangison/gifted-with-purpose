import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Chev, Icon } from '@/components/Icons';
import { SITE_URL, brand } from '@/lib/site';
import {
  shapes,
  shapeById,
  designsForShape,
  relatedShapes,
  nearestItem,
  waShapeEnquiry,
  blankPriceLabel,
  familyLabel,
  fromLabel,
} from '@/lib/catalog';

export const dynamicParams = false;

export function generateStaticParams() {
  return shapes.map((s) => ({ shape: s.id }));
}

export async function generateMetadata({ params }) {
  const { shape: id } = await params;
  const s = shapeById(id);
  if (!s) return {};
  return {
    title: s.name,
    description: `${s.name}, supplier code ${s.sku_label}. ${s.capacity} ${s.material.toLowerCase()}, print area ${
      s.print_area || 'on request'
    }. Unprinted blank. Price on request from Gifted with Purpose, Windhoek.`,
    alternates: { canonical: `/blanks/${s.id}` },
    openGraph: {
      title: `${s.name} | Gifted with Purpose`,
      description: `${s.capacity} ${s.material.toLowerCase()}. Supplier code ${s.sku_label}. Price on request.`,
      url: `${SITE_URL}/blanks/${s.id}`,
      images: [{ url: `/assets/blanks/${s.photo}.jpg` }],
    },
  };
}

export default async function ShapePage({ params }) {
  const { shape: id } = await params;
  const s = shapeById(id);
  if (!s) notFound();

  const fits = designsForShape(s);
  const near = nearestItem(s);
  const related = relatedShapes(s, 3);
  const preview = fits.slice(0, 6);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blank range', item: `${SITE_URL}/blanks` },
      { '@type': 'ListItem', position: 3, name: s.name, item: `${SITE_URL}/blanks/${s.id}` },
    ],
  };

  // No offers block. There is no confirmed price for any blank shape,
  // and a Product without an offer is honest where an invented one is not.
  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: s.name,
    description: `${s.material}, ${s.capacity}. Unprinted sublimation blank, printed on order in Windhoek.`,
    sku: s.sku,
    color: s.colour,
    material: s.material,
    brand: { '@type': 'Brand', name: brand.name },
    image: `${SITE_URL}/assets/blanks/${s.photo}.jpg`,
  };

  const spec = [
    ['Supplier code', s.sku_label],
    ['Capacity', s.capacity],
    ['Material', s.material],
    ['Colour', s.colour],
    ['Lid', s.lid],
    ['Print area', s.print_area || 'Ask us and we will measure it'],
    ['Print position', s.wrap],
    ['Size', s.dimensions],
    ...(s.product_size ? [['Product size', s.product_size]] : []),
    ['Weight', s.weight],
  ];

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />

      <section className="sec dp-top">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <Link href="/blanks">Blank range</Link>
            <Chev />
            <span aria-current="page">{s.name}</span>
          </nav>

          <div className="bp">
            <div className="bp-fig bp-fig-white">
              <Image
                src={`/assets/blanks/${s.photo}.jpg`}
                alt={`${s.name}, unprinted. ${s.material}, ${s.colour.toLowerCase()}, ${s.lid.toLowerCase()}.`}
                width={s.photo_w}
                height={s.photo_h}
                sizes="(min-width:900px) 480px, 94vw"
                priority
                style={{ objectFit: 'contain' }}
              />
              <p className="bp-figcap">Supplied unprinted. This is the blank, not a finished gift.</p>
            </div>

            <div className="bp-body">
              <p className="dp-group">
                {familyLabel(s.family)} &middot; {s.audience === 'kids' ? 'For kids' : 'For grown-ups'}
              </p>
              <h1>{s.name}</h1>
              <p className="bp-price ask">Price on request</p>
              <p className="bp-blurb">{s.blurb}</p>

              <dl className="bp-spec bp-spec-wide">
                {spec.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>

              {s.supplier_note && <p className="dp-note">{s.supplier_note}</p>}
              {s.supplier_sku_note && <p className="dp-note">{s.supplier_sku_note}</p>}

              <p className="dp-note">
                We have not published a price for this blank. Message us with the shape and we confirm the price and
                whether it is in stock before you commit to anything.
              </p>

              <p className="bp-cta">
                <a className="btn btn-wa" href={waShapeEnquiry(s)} target="_blank" rel="noopener noreferrer">
                  <Icon name="wa" /> Ask the price
                </a>
                {near && (
                  <Link href={`/shop/${near.id}`} className="btn btn-ghost">
                    See the printed {near.short.toLowerCase()}
                  </Link>
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {near && (
        <section className="sec sec-alt">
          <div className="wrap">
            <div className="blk-bridge">
              <div className="blk-bridge-body">
                <h2 className="dp-h2">The printed version</h2>
                <p className="dp-lead">
                  The closest thing in our priced range to this shape is the {near.name}. That one has a confirmed
                  price and you can order it today. This page is the bare container behind it.
                </p>
                <p className="bp-cta">
                  <Link href={`/shop/${near.id}`} className="btn btn-primary">
                    {near.name}, {blankPriceLabel(near).toLowerCase()}
                  </Link>
                </p>
              </div>
              {near.photo && (
                <Link href={`/shop/${near.id}`} className="blk-bridge-fig" aria-hidden="true" tabIndex={-1}>
                  <Image
                    src={`/assets/products/${near.photo}@sm.jpg`}
                    alt=""
                    width={near.photo_w}
                    height={near.photo_h}
                    sizes="(min-width:900px) 260px, 40vw"
                    style={{ objectFit: near.shot === 'studio' ? 'contain' : 'cover' }}
                  />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="sec">
        <div className="wrap">
          <h2 className="dp-h2">What can go on it</h2>
          <p className="dp-lead">
            You can also send us
            your own idea, which we quote per job. Here are six to start with.
          </p>
          <ul className="dg dg-rel">
            {preview.map((d) => (
              <li key={d.id}>
                <Link href={`/designs/${d.id}`} className="dg-cell">
                  <Image
                    src={`/assets/designs/${d.file}@sm.webp`}
                    alt={d.alt}
                    width={d.sw}
                    height={d.sh}
                    sizes="(min-width:1100px) 240px, (min-width:600px) 30vw, 46vw"
                    loading="lazy"
                  />
                  <span className="dg-cap">
                    <b>{d.name}</b>
                    <i>{d.id.toUpperCase()}</i>
                    <em>{fromLabel(d)}</em>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="cblock-cta">
            <Link href="/designs" className="btn btn-ghost">
              Browse all designs
            </Link>
          </p>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <h2 className="dp-h2">Other blanks</h2>
          <ul className="fits">
            {related.map((o) => (
              <li key={o.id}>
                <Link href={`/blanks/${o.id}`} className="fit">
                  <span className="fit-name">{o.name}</span>
                  <span className="fit-spec">
                    {o.capacity} &middot; {o.sku_label}
                  </span>
                  <span className="fit-price ask">Price on request</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="cblock-cta">
            <Link href="/blanks" className="btn btn-ghost">
              See the whole blank range
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
