import Link from 'next/link';
import { Chev } from '@/components/Icons';
import DesignGallery from './DesignGallery';
import { SITE_URL, brand } from '@/lib/site';
import { designs, blanks, designThemes } from '@/lib/catalog';

export const metadata = {
  title: 'Pick Your Design',
  description: `Browse all ${designs.length} designs Gifted with Purpose can print on your mug, tumbler or kids cup. Faith, affirmations, Afrikaans, kids, teacher and personalised name designs. From N$120.`,
  alternates: { canonical: '/designs' },
  openGraph: {
    title: 'Pick Your Design | Gifted with Purpose',
    description: `Browse ${designs.length} designs and put any of them on the item you choose.`,
    url: `${SITE_URL}/designs`,
    images: [{ url: '/assets/designs/design-13.webp', width: 1400, height: 1219 }],
  },
};

export default async function DesignsPage({ searchParams }) {
  const sp = await searchParams;
  const raw = typeof sp?.theme === 'string' ? sp.theme : 'all';
  const initialTheme = designThemes.includes(raw) ? raw : 'all';

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Pick your design', item: `${SITE_URL}/designs` },
    ],
  };

  const gallery = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Gifted with Purpose design library',
    description: `${designs.length} print designs available to order in Windhoek, Namibia.`,
    url: `${SITE_URL}/designs`,
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallery) }} />

      <section className="cblock cblock-tight" style={{ '--accent-ink': '#1F6F66' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <span aria-current="page">Pick your design</span>
          </nav>
          <div className="cb-head">
            <p className="sub">Step two of two</p>
            <h1>Pick the design</h1>
            <p>
              Any design here can go on any item that fits it. The item sets the price, so switching designs costs
              nothing. If it is not here, we draw it.
            </p>
          </div>
          <p className="cblock-cta">
            <Link href="/shop" className="btn btn-ghost">
              Or start from the item
            </Link>
          </p>
        </div>
      </section>

      <DesignGallery initialTheme={initialTheme} />

      <section className="sec sec-alt">
        <div className="wrap">
          <p className="disclaim">
            Some designs show characters or brands owned by other people. Gifted with Purpose is an independent print
            studio in Windhoek and is not affiliated with, endorsed by or connected to any of those rights holders.
            Those designs are listed by description only.
          </p>
        </div>
      </section>
    </main>
  );
}
