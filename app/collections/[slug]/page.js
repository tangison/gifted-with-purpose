import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon, Chev } from '@/components/Icons';
import ProductCard, { SoonCard } from '@/components/ProductCard';
import { collections, collectionBySlug, productsIn, brand, wa, SITE_URL } from '@/lib/site';

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

/**
 * Only the five real collections exist. Without this, Next renders any slug on
 * demand, which returned the 404 page body with an HTTP 200 status and an
 * indexable robots tag, so search engines could index unlimited junk URLs.
 */
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = collectionBySlug(slug);
  if (!c) return {};
  const ps = productsIn(c.slug);
  const priced = ps.filter((p) => p.price).map((p) => p.price);
  const from = priced.length ? ` From ${brand.currency}${Math.min(...priced).toFixed(2)}.` : '';
  return {
    title: `${c.name} — ${c.sub}`,
    description: `${c.blurb}${from} Personalised ${c.sub.toLowerCase()} made with love in Namibia. Order on WhatsApp.`,
    alternates: { canonical: `/collections/${c.slug}` },
    openGraph: {
      title: `${c.name} — ${c.sub} | Gifted with Purpose`,
      description: c.blurb,
      url: `${SITE_URL}/collections/${c.slug}`,
      images: [{ url: `/assets/products/${ps[0]?.image}.jpg` }],
    },
  };
}

const EXTRA = {
  celebrate: {
    title: 'More kids designs coming soon',
    body: "We're photographing more personalised kids' cups. Message us for what's available today.",
    msg: "Hi Gifted with Purpose! What kids' designs do you have available right now?",
  },
  everyday: {
    title: 'More novelty designs coming soon',
    body: 'New retro and everyday designs are added regularly — ask us what’s on the shelf.',
    msg: 'Hi Gifted with Purpose! What novelty / Old School Vibes designs do you have right now?',
  },
  'teacher-appreciation': {
    title: 'Need a bigger order?',
    body: 'Doing a whole staff room? Message us about multiples of the teacher set.',
    msg: "Hi Gifted with Purpose! I'd like to order multiple Teacher Appreciation sets. Could you help me with a quote?",
  },
};

export default async function CollectionPage({ params }) {
  const { slug } = await params;
  const c = collectionBySlug(slug);
  if (!c) notFound();

  const ps = productsIn(c.slug);
  const priced = ps.filter((p) => p.price).map((p) => p.price);
  const extra = EXTRA[c.slug];
  const hasLicensed = ps.some((p) => p.licensed);

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Collections', item: `${SITE_URL}/#collections` },
      { '@type': 'ListItem', position: 3, name: c.name, item: `${SITE_URL}/collections/${c.slug}` },
    ],
  };

  /* Product schema: offers only where a price is confirmed from the client's own artwork. */
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${c.name} — ${c.sub}`,
    numberOfItems: ps.length,
    itemListElement: ps.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        description: p.desc,
        image: `${SITE_URL}/assets/products/${p.image}.jpg`,
        brand: { '@type': 'Brand', name: brand.name },
        category: `${c.name} / ${c.sub}`,
        ...(p.price
          ? {
              offers: {
                '@type': 'Offer',
                price: p.price.toFixed(2),
                priceCurrency: 'NAD',
                availability: 'https://schema.org/InStock',
                seller: { '@type': 'Organization', name: brand.name },
                url: `${SITE_URL}/collections/${c.slug}`,
              },
            }
          : {}),
      },
    })),
  };

  return (
    <main id="main" style={{ '--accent': c.accent, '--accent-soft': c.accent_soft, '--accent-ink': c.accent_ink }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <section className="cblock">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <Link href="/#collections">Collections</Link>
            <Chev />
            <span aria-current="page">{c.name}</span>
          </nav>
          <p className="sub">{c.sub}</p>
          <h1>{c.name}</h1>
          <p>{c.blurb}</p>
          <ul className="stats">
            <li>
              {ps.length} design{ps.length !== 1 ? 's' : ''}
            </li>
            {priced.length > 0 && (
              <li>
                From {brand.currency}
                {Math.min(...priced).toFixed(2)}
              </li>
            )}
            {c.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          {c.seasonal && (
            <div
              className="confirm"
              style={{ marginBottom: 22, background: '#EAF1FB', borderColor: '#C9DBF5' }}
            >
              <Icon name="apple" />
              <div>
                <h2>Seasonal collection</h2>
                <p style={{ color: '#274E86' }}>
                  This set is offered around the school calendar. Message us to check current availability before term
                  ends.
                </p>
              </div>
            </div>
          )}

          {hasLicensed && (
            <div className="confirm" style={{ marginBottom: 22 }}>
              <Icon name="sparkle" />
              <div>
                <h2>About our character designs</h2>
                <p>
                  Character artwork shown in this collection is printed onto purchasable blank cups. Gifted with Purpose
                  is an independent small business and is not affiliated with, endorsed by, or licensed by any character
                  or entertainment brand.
                </p>
              </div>
            </div>
          )}

          <h2 className="sr-only">{c.name} products</h2>
          <div className="grid">
            {ps.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 2} index={i} />
            ))}
            {extra && <SoonCard {...extra} />}
          </div>

          <div className="soon-wrap" style={{ marginTop: 36 }}>
            <h2 style={{ fontSize: 23 }}>Don&rsquo;t see exactly what you want?</h2>
            <p>
              We print to order. Send us the wording, the name or the verse and we&rsquo;ll tell you what&rsquo;s
              possible.
            </p>
            <a
              className="btn btn-wa"
              href={wa(
                `Hi Gifted with Purpose! I'm interested in your ${c.name} (${c.sub}) range. Do you have other designs available?`
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="wa" /> Ask about a custom design
            </a>
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">
              Keep browsing
            </span>
            <h2>Other collections</h2>
          </div>
          <div className="cats">
            {collections
              .filter((o) => o.slug !== c.slug)
              .map((o) => (
                <Link
                  key={o.slug}
                  className="cat"
                  style={{ '--c': o.accent, '--cs': o.accent_soft, '--ci': o.accent_ink }}
                  href={`/collections/${o.slug}`}
                >
                  <div className="cat-ico">
                    <Icon name={o.icon} />
                  </div>
                  <h3>{o.name}</h3>
                  <div className="sub">{o.sub}</div>
                  <p>{o.blurb}</p>
                  <span className="go">
                    Browse <Chev />
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
