import Link from 'next/link';
import { Chev, Icon } from '@/components/Icons';
import WorkGallery from './WorkGallery';
import { SITE_URL, brand } from '@/lib/site';
import { work, designs, blanks } from '@/lib/catalog';

export const metadata = {
  title: 'Browse Our Products',
  description: `Real orders we have printed and handed over in Windhoek. ${work.length} photographs of finished tumblers, mugs, sippy cups and gift boxes, each one made to order by Gifted with Purpose.`,
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Browse Our Products | Gifted with Purpose',
    description: `${work.length} photographs of real finished orders, printed in Windhoek.`,
    url: `${SITE_URL}/work`,
    images: [{ url: '/assets/work/work-09.webp', width: 1200, height: 2599 }],
  },
};

export default async function WorkPage({ searchParams }) {
  const sp = await searchParams;
  const raw = typeof sp?.tag === 'string' ? sp.tag : 'all';

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Our products', item: `${SITE_URL}/work` },
    ],
  };

  const gallery = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Gifted with Purpose finished work',
    description: `${work.length} photographs of real orders printed in Windhoek, Namibia.`,
    url: `${SITE_URL}/work`,
    image: work.slice(0, 12).map((w) => `${SITE_URL}/assets/work/${w.file}.webp`),
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallery) }} />

      <section className="cblock cblock-tight" style={{ '--accent-ink': '#8A3A3C' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <span aria-current="page">Our products</span>
          </nav>
          <div className="cb-head">
            <p className="sub">Real orders, real customers</p>
            <h1>Browse our products</h1>
            <p>
              {work.length} pieces we have actually printed and handed over. Not mockups, not stock photography. Every
              one of these started as someone picking a cup and a design.
            </p>
          </div>
          <p className="cblock-cta">
            <Link href="/create" className="btn btn-ghost">
              Make one like these
            </Link>
          </p>
        </div>
      </section>

      <WorkGallery initialTag={raw} />

      <section className="sec sec-alt">
        <div className="wrap">
          <div className="dg-custom">
            <div>
              <h2>Yours could be next</h2>
              <p>
                Pick from {blanks.length} items and {designs.length} designs, or send us your own idea. Custom artwork
                is quoted per job.
              </p>
            </div>
            <p>
              <Link href="/create" className="btn btn-primary">
                <Icon name="gift" /> Start your order
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
