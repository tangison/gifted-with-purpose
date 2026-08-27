import Link from 'next/link';
import Image from 'next/image';
import { Chev, Icon } from '@/components/Icons';
import { SITE_URL, brand, wa } from '@/lib/site';
import { blanks, designs, work, blankPriceLabel, money, priceFloorLabel } from '@/lib/catalog';

export const metadata = {
  title: 'How to Order',
  description:
    'How a Gifted with Purpose order is made, start to finish: you choose the item and design, we print it with sublimation in Windhoek, then it is packed and handed over. Turnaround and care included.',
  alternates: { canonical: '/how-to-order' },
  openGraph: {
    title: 'How to Order | Gifted with Purpose',
    description: 'From your message to a finished gift, printed to order in Windhoek.',
    url: `${SITE_URL}/how-to-order`,
  },
};

const STEPS = [
  {
    n: 1,
    name: 'You choose',
    text: 'Pick the item and the design on the website, or just send us a photo of what you have in mind. The item sets the price.',
    detail: `${blanks.length} items, ${designs.length} ready-made designs, or something drawn from scratch.`,
  },
  {
    n: 2,
    name: 'We confirm',
    text: 'Geneveve replies on WhatsApp with the price and how long it will take. Nothing is made until you say yes to what is written.',
    detail: 'No account, no card details on a website, no surprises at handover.',
  },
  {
    n: 3,
    name: 'We set the artwork',
    text: 'Your design is laid out to the exact wrap size of the item you chose, so nothing important lands on a seam or disappears under a handle.',
    detail: 'Custom artwork is quoted separately and shown to you before it is printed.',
  },
  {
    n: 4,
    name: 'We print and press',
    text: 'The design is printed with sublimation ink, then heat-pressed into the coating on the cup. The colour becomes part of the surface rather than a sticker sitting on top of it.',
    detail: 'This is why it does not peel. It is in the coating, not on it.',
  },
  {
    n: 5,
    name: 'We check it',
    text: 'Every piece is checked by hand for alignment, colour and finish before it is packed. If it is not right, it does not go out.',
    detail: 'Names are checked against your message, letter by letter.',
  },
  {
    n: 6,
    name: 'You collect it',
    text: 'It is wrapped and boxed, ready to hand over as a gift. We arrange collection or delivery with you on WhatsApp.',
    detail: 'Delivery areas and costs are being confirmed. Ask us and we will tell you exactly what applies to you.',
  },
];

export default function HowToOrderPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'How to order', item: `${SITE_URL}/how-to-order` },
    ],
  };

  const howto = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How a Gifted with Purpose order is made',
    description: 'From choosing an item to collecting a finished, personalised gift printed in Windhoek.',
    step: STEPS.map((s) => ({
      '@type': 'HowToStep',
      position: s.n,
      name: s.name,
      text: s.text,
    })),
  };

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Will the print peel or fade?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Sublimation bonds the ink into the coating on the cup rather than laying it on top, so there is no edge to lift. Hand wash it and keep it out of the dishwasher and it stays as printed.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I put my own photo on a cup?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Send the photo on WhatsApp once we are chatting. The clearer the original, the better it prints. Custom artwork is quoted per job.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The item sets the price. Prices start at ${priceFloorLabel}. Custom artwork is quoted separately.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Are you in Windhoek?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Gifted with Purpose is a mother and daughter print studio in Windhoek, Namibia, trading as Geneveve Gift Shop. Everything is printed here to order.',
        },
      },
    ],
  };

  const priced = blanks.filter((b) => b.price != null);

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howto) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />

      <section className="cblock cblock-tight" style={{ '--accent-ink': '#1F6F66' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <span aria-current="page">How to order</span>
          </nav>
          <div className="cb-head">
            <p className="sub">Start to finish</p>
            <h1>How to order</h1>
            <p>
              Six steps between your first message and a finished gift. Printed to order in Windhoek, checked by hand,
              packed to hand over.
            </p>
          </div>
          <p className="cblock-cta">
            <Link href="/create" className="btn btn-ghost">
              Start an order
            </Link>
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="sr-only">The six steps</h2>
          <ol className="proc">
            {STEPS.map((s) => (
              <li key={s.n}>
                <span className="proc-n" aria-hidden="true">
                  {String(s.n).padStart(2, '0')}
                </span>
                <div>
                  <h3>{s.name}</h3>
                  <p>{s.text}</p>
                  <p className="proc-detail">{s.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <h2 className="dp-h2">What it costs</h2>
          <div className="fits">
            {blanks.map((b) => (
              <Link key={b.id} href={`/shop/${b.id}`} className="fit">
                <span className="fit-name">{b.name}</span>
                <span className="fit-spec">
                  {b.capacity} &middot; {b.spec}
                </span>
                <span className={`fit-price${b.price == null ? ' ask' : ''}`}>{blankPriceLabel(b)}</span>
              </Link>
            ))}
          </div>
          <p className="proc-note">
            Custom artwork is quoted per job and shown to you before anything is printed. Prices marked &ldquo;price on
            request&rdquo; have not been published yet, so ask and we will confirm before you commit.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="dp-h2">Looking after it</h2>
          <ul className="care-grid">
            <li>
              <b>Hand wash only</b>
              <span>A dishwasher will dull the finish over time. Warm water and a soft cloth is all it needs.</span>
            </li>
            <li>
              <b>No microwave</b>
              <span>Every item here is stainless steel or glass with a metal component. None of it belongs in a microwave.</span>
            </li>
            <li>
              <b>Lids come apart</b>
              <span>Straws, spouts and seals pull out so you can clean behind them properly.</span>
            </li>
            <li>
              <b>The print is in the coating</b>
              <span>Sublimation bonds the ink into the surface, so there is no edge to peel and nothing to scratch off.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <div className="dg-custom">
            <div>
              <h2>See it done</h2>
              <p>
                {work.length} photographs of real orders we have printed and handed over, so you can judge the finish
                before you commit to anything.
              </p>
            </div>
            <p>
              <Link href="/work" className="btn btn-primary">
                <Icon name="grid" /> Browse our products
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
