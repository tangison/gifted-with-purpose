import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Chev, Icon } from '@/components/Icons';
import { SITE_URL, brand, wa } from '@/lib/site';
import {
  blanks,
  blankById,
  designsForBlank,
  shapesForBlank,
  blankPriceLabel,
  money,
} from '@/lib/catalog';
import BlankDesigns from './BlankDesigns';

export const dynamicParams = false;

export function generateStaticParams() {
  return blanks.map((b) => ({ blank: b.id }));
}

export async function generateMetadata({ params }) {
  const { blank: id } = await params;
  const b = blankById(id);
  if (!b) return {};
  const n = designsForBlank(b).length;
  const price = b.price == null ? 'Price on request.' : `${money(b.price)}.`;
  return {
    title: b.name,
    description: `${b.spec}. ${price} Choose from ${n} designs or send us your own. Printed to order in Windhoek by Gifted with Purpose.`,
    alternates: { canonical: `/shop/${b.id}` },
    openGraph: {
      title: `${b.name} | Gifted with Purpose`,
      description: `${b.spec}. ${price} ${n} designs fit this item.`,
      url: `${SITE_URL}/shop/${b.id}`,
      ...(b.photo ? { images: [{ url: `/assets/products/${b.photo}.jpg` }] } : {}),
    },
  };
}

export default async function BlankPage({ params }) {
  const { blank: id } = await params;
  const b = blankById(id);
  if (!b) notFound();

  const fits = designsForBlank(b);
  const others = blanks.filter((x) => x.id !== b.id);
  const shapesHere = shapesForBlank(b);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/shop` },
      { '@type': 'ListItem', position: 3, name: b.name, item: `${SITE_URL}/shop/${b.id}` },
    ],
  };

  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: b.name,
    description: `${b.spec}. Printed to order with any of ${fits.length} designs.`,
    sku: b.id,
    brand: { '@type': 'Brand', name: brand.name },
    ...(b.photo ? { image: `${SITE_URL}/assets/products/${b.photo}.jpg` } : {}),
    ...(b.price != null
      ? {
          offers: {
            '@type': 'Offer',
            price: b.price,
            priceCurrency: 'NAD',
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/shop/${b.id}`,
            seller: { '@type': 'Organization', name: brand.name },
          },
        }
      : {}),
  };

  const askMsg =
    b.price == null
      ? `Hi Gifted with Purpose, could you please confirm the price of the ${b.name} (${b.spec})?`
      : `Hi Gifted with Purpose, I would like to order a ${b.name} at ${money(b.price)}. I am still choosing a design.`;

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />

      <section className="sec dp-top">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <Link href="/shop">Shop</Link>
            <Chev />
            <span aria-current="page">{b.name}</span>
          </nav>

          <div className="bp">
            <div className="bp-fig">
              {b.photo ? (
                <Image
                  src={`/assets/products/${b.photo}.jpg`}
                  alt={`${b.name}, ${b.spec}`}
                  width={b.photo_w}
                  height={b.photo_h}
                  sizes="(min-width:900px) 480px, 94vw"
                  priority
                  style={{ objectFit: b.shot === 'studio' ? 'contain' : 'cover' }}
                />
              ) : (
                <p className="bp-nophoto">
                  <Icon name="cup" />
                  We have not photographed this item yet. The price is confirmed, the picture is coming.
                </p>
              )}
            </div>

            <div className="bp-body">
              <p className="dp-group">{b.audience === 'kids' ? 'For kids' : 'For grown-ups'}</p>
              <h1>{b.name}</h1>
              <p className={`bp-price${b.price == null ? ' ask' : ''}`}>{blankPriceLabel(b)}</p>
              <p className="bp-blurb">{b.blurb}</p>

              <dl className="bp-spec">
                <div>
                  <dt>Item</dt>
                  <dd>{b.spec}</dd>
                </div>
                <div>
                  <dt>Size</dt>
                  <dd>{b.capacity}</dd>
                </div>
                <div>
                  <dt>Print</dt>
                  <dd>{b.wrap}</dd>
                </div>
                <div>
                  <dt>Designs that fit</dt>
                  <dd>{fits.length}</dd>
                </div>
              </dl>

              {b.blank_photo && (
                <div className="bp-blank">
                  <Image
                    src={`/assets/blanks/${b.blank_photo}@sm.webp`}
                    alt={`The unprinted ${b.name} before we print it`}
                    width={b.blank_sw}
                    height={b.blank_sh}
                    sizes="88px"
                  />
                  <p>
                    <b>Before we print it</b>
                    This is the blank {b.short.toLowerCase()} we start from{b.sku ? `, supplier reference ${b.sku}` : ''}. Your
                    design covers the {b.wrap}.
                  </p>
                </div>
              )}

              <ul className="bp-care">
                {b.care.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>

              {b.price == null && (
                <p className="dp-note">
                  We have not published a price for this item yet. Ask us on WhatsApp and we will confirm it before you
                  commit to anything.
                </p>
              )}

              <p className="bp-cta">
                <a className="btn btn-wa" href={wa(askMsg)} target="_blank" rel="noopener noreferrer">
                  <Icon name="wa" /> {b.price == null ? 'Ask the price' : 'Order on WhatsApp'}
                </a>
                <Link href={`/create?item=${b.id}`} className="btn btn-ghost">
                  Build it step by step
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <h2 className="dp-h2">Designs that fit the {b.short.toLowerCase()}</h2>
          <p className="dp-lead">
            All {fits.length} of these can be printed on this item at {blankPriceLabel(b).toLowerCase()}. Pick one, or
            send us your own idea and we quote the artwork per job.
          </p>
          <BlankDesigns blank={b} designs={fits} />
        </div>
      </section>

      {shapesHere.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <h2 className="dp-h2">The bare container</h2>
            <p className="dp-lead">
              {shapesHere.length === 1
                ? 'This is the unprinted blank this item is printed on, with the maker\u2019s own measurements.'
                : `These are the unprinted blanks closest to this item, with the maker\u2019s own measurements.`}{' '}
              Nothing on the blank range is priced yet.
            </p>
            <ul className="fits">
              {shapesHere.map((sh) => (
                <li key={sh.id}>
                  <Link href={`/blanks/${sh.id}`} className="fit">
                    <span className="fit-name">{sh.name}</span>
                    <span className="fit-spec">
                      {sh.capacity} &middot; {sh.sku_label} &middot; print {sh.print_area || 'on request'}
                    </span>
                    <span className="fit-price ask">Price on request</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="sec sec-alt">
        <div className="wrap">
          <h2 className="dp-h2">Other items</h2>
          <ul className="fits">
            {others.map((o) => (
              <li key={o.id}>
                <Link href={`/shop/${o.id}`} className="fit">
                  <span className="fit-name">{o.name}</span>
                  <span className="fit-spec">{o.spec}</span>
                  <span className={`fit-price${o.price == null ? ' ask' : ''}`}>{blankPriceLabel(o)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
