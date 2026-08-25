import Link from 'next/link';
import { Chev } from '@/components/Icons';
import Builder from './Builder';
import { SITE_URL } from '@/lib/site';
import { blanks, designs } from '@/lib/catalog';

export const metadata = {
  title: 'Make Your Own',
  description:
    'Build your gift in three steps: pick the item, pick a design or ask us to draw one, add the name. Sends straight to WhatsApp with the price written out. Windhoek, Namibia.',
  alternates: { canonical: '/create' },
  openGraph: {
    title: 'Make Your Own | Gifted with Purpose',
    description: 'Pick the item, pick the design, add the name. We take it from there on WhatsApp.',
    url: `${SITE_URL}/create`,
  },
};

export default async function CreatePage({ searchParams }) {
  const sp = await searchParams;
  const item = typeof sp?.item === 'string' && blanks.some((b) => b.id === sp.item) ? sp.item : null;
  const design =
    typeof sp?.design === 'string' && designs.some((d) => d.id === sp.design) ? sp.design : null;

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Make your own', item: `${SITE_URL}/create` },
    ],
  };

  const howto = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Order a personalised gift from Gifted with Purpose',
    description: 'Pick the item, choose a design or request a custom one, then send it on WhatsApp.',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Pick the item', text: 'Choose the mug, tumbler, sippy cup or bottle. The item sets the price.' },
      { '@type': 'HowToStep', position: 2, name: 'Pick the design', text: `Choose one of ${designs.length} ready-made designs, or describe a custom one for us to draw.` },
      { '@type': 'HowToStep', position: 3, name: 'Add the details', text: 'Add the name, the quantity and anything else we should know.' },
      { '@type': 'HowToStep', position: 4, name: 'Send it', text: 'Your choices go to WhatsApp as one message and we confirm from there.' },
    ],
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howto) }} />

      <section className="cblock cblock-tight" style={{ '--accent-ink': '#8A5A05' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <span aria-current="page">Make your own</span>
          </nav>
          <div className="cb-head">
            <p className="sub">Ready-made or drawn for you</p>
            <h1>Make your own</h1>
            <p>
              Three steps. At the end you get one WhatsApp message with everything written out, and Geneveve replies to
              confirm. Nothing is charged here.
            </p>
          </div>
        </div>
      </section>

      <Builder initialItem={item} initialDesign={design} />
    </main>
  );
}
