import Link from 'next/link';
import { Chev } from '@/components/Icons';
import DesignGallery from './DesignGallery';
import { SITE_URL, brand } from '@/lib/site';
import data from '@/data/designs.json';

export const metadata = {
  title: 'Pick Your Design',
  description:
    'Browse every print design Gifted with Purpose can put on your tumbler, mug or kids cup. Kids flip-top bottles, sippy cups and print sheets. Pick a reference and send it to us on WhatsApp.',
  alternates: { canonical: '/designs' },
  openGraph: {
    title: 'Pick Your Design | Gifted with Purpose',
    description: `Browse ${data.items.length} print designs and send us the one you want.`,
    url: `${SITE_URL}/designs`,
    images: [{ url: '/assets/designs/design-01.webp', width: 1400, height: 1190 }],
  },
};

export default function DesignsPage() {
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
    description: `${data.items.length} print designs available to order.`,
    url: `${SITE_URL}/designs`,
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallery) }} />

      <section className="cblock" style={{ '--accent-ink': '#1F6F66' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <span aria-current="page">Pick your design</span>
          </nav>
          <p className="sub">The full design library</p>
          <h1>Pick your design</h1>
          <p>
            Every print we can put on a tumbler, mug or kids cup. Find the one you want, note its reference, and send it
            to us. We will confirm what it can go on and what it costs.
          </p>
          <ul className="stats">
            <li>{data.items.length} designs</li>
            <li>Printed in {brand.city}</li>
            <li>Add any name</li>
          </ul>
        </div>
      </section>

      <DesignGallery />
    </main>
  );
}
