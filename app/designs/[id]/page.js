import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Chev, Icon } from '@/components/Icons';
import { SITE_URL, brand } from '@/lib/site';
import {
  designs,
  designById,
  blanksForDesign,
  priceFromDesign,
  relatedDesigns,
  money,
  blankPriceLabel,
  themeLabel,
} from '@/lib/catalog';
import DesignOrder from './DesignOrder';

export const dynamicParams = false;

export function generateStaticParams() {
  return designs.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const d = designById(id);
  if (!d) return {};
  const p = priceFromDesign(d);
  const price = p == null ? 'Price on request.' : `From ${money(p)}.`;
  return {
    title: `${d.name}: design ${d.id.toUpperCase()}`,
    description: `${d.alt}. ${price} Printed to order in Windhoek on a mug, tumbler or kids cup. Reference ${d.id.toUpperCase()}.`,
    alternates: { canonical: `/designs/${d.id}` },
    openGraph: {
      title: `${d.name} | Gifted with Purpose`,
      description: d.alt,
      url: `${SITE_URL}/designs/${d.id}`,
      images: [{ url: `/assets/designs/${d.file}.webp`, width: d.w, height: d.h, alt: d.alt }],
    },
  };
}

export default async function DesignPage({ params }) {
  const { id } = await params;
  const d = designById(id);
  if (!d) notFound();

  const fits = blanksForDesign(d);
  const from = priceFromDesign(d);
  const related = relatedDesigns(d, 6);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Designs', item: `${SITE_URL}/designs` },
      { '@type': 'ListItem', position: 3, name: d.name, item: `${SITE_URL}/designs/${d.id}` },
    ],
  };

  const priced = fits.filter((b) => b.price != null);
  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${d.name}, printed to order`,
    description: d.alt,
    sku: d.id.toUpperCase(),
    image: `${SITE_URL}/assets/designs/${d.file}.webp`,
    brand: { '@type': 'Brand', name: brand.name },
    ...(priced.length
      ? {
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'NAD',
            lowPrice: Math.min(...priced.map((b) => b.price)),
            highPrice: Math.max(...priced.map((b) => b.price)),
            offerCount: priced.length,
            availability: 'https://schema.org/InStock',
            seller: { '@type': 'Organization', name: brand.name },
          },
        }
      : {}),
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }} />

      <section className="sec dp-top">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <Link href="/designs">Designs</Link>
            <Chev />
            <span aria-current="page">{d.name}</span>
          </nav>

          <div className="dp">
            <div className="dp-fig">
              <Image
                src={`/assets/designs/${d.file}.webp`}
                alt={d.alt}
                width={d.w}
                height={d.h}
                sizes="(min-width:900px) 620px, 94vw"
                priority
              />
              <p className="dp-ref">Reference {d.id.toUpperCase()}</p>
            </div>

            <div className="dp-body">
              <p className="dp-group">{d.group_label}</p>
              <h1>{d.name}</h1>
              <p className="dp-price">
                {from == null ? 'Price on request' : <>From <b>{money(from)}</b></>}
              </p>
              <p className="dp-alt">{d.alt}</p>

              <ul className="dp-themes">
                {d.themes.map((t) => (
                  <li key={t}>
                    <Link href={`/designs?theme=${t}`}>{themeLabel(t)}</Link>
                  </li>
                ))}
              </ul>

              {d.personalisable && (
                <p className="dp-note">
                  <b>Add a name.</b> This design is drawn with space for a name. Tell us the exact spelling when you order.
                </p>
              )}
              {d.photo_upload && (
                <p className="dp-note">
                  <b>Add your photo.</b> This design has blank panels for your own pictures. Send them to us on WhatsApp after you order.
                </p>
              )}
              {d.licensed && (
                <p className="dp-note dp-note-flag">
                  This design shows a character or brand owned by someone else. See our{' '}
                  <Link href="/legal/terms">terms</Link> for the full position.
                </p>
              )}

              <DesignOrder design={d} blanks={fits} />
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <h2 className="dp-h2">Print it on</h2>
          <p className="dp-lead">
            The design is your choice. The item sets the price. Every item below fits this design.
          </p>

          <div className="fits">
            {fits.map((b) => (
              <Link key={b.id} href={`/shop/${b.id}`} className="fit">
                <span className="fit-name">{b.name}</span>
                <span className="fit-spec">{b.spec}</span>
                <span className={`fit-price${b.price == null ? ' ask' : ''}`}>{blankPriceLabel(b)}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <h2 className="dp-h2">Designs like this one</h2>
            <ul className="dg dg-rel">
              {related.map((r) => (
                <li key={r.id}>
                  <Link href={`/designs/${r.id}`} className="dg-cell">
                    <Image
                      src={`/assets/designs/${r.file}@sm.webp`}
                      alt={r.alt}
                      width={r.sw}
                      height={r.sh}
                      sizes="(min-width:1100px) 200px, 40vw"
                      loading="lazy"
                    />
                    <span className="dg-cap">
                      <b>{r.name}</b>
                      <i>{r.id.toUpperCase()}</i>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="dp-back">
              <Link href="/designs" className="btn btn-ghost">
                <Icon name="grid" /> Back to all {designs.length} designs
              </Link>
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
