import Link from 'next/link';
import { Icon, Chev, Check } from '@/components/Icons';
import { wa, SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'How to Order',
  description:
    'Ordering from Gifted with Purpose takes one tap. Pick a design, send the pre-filled WhatsApp message, and we confirm the name, price and timing with you personally.',
  alternates: { canonical: '/how-to-order' },
};

const STEPS = [
  {
    name: 'Pick your design',
    text: 'Browse the collections and find the design that fits the person you are gifting. Every product page shows the size we photographed it in.',
  },
  {
    name: 'Tap “Order on WhatsApp”',
    text: 'The button opens WhatsApp with your message already written, including the product name, the size and the price where it is confirmed.',
  },
  {
    name: 'Tell us the personalisation',
    text: 'Send us the exact name, spelling or wording you want printed. This is the step where we get it right, so take your time.',
  },
  {
    name: 'We confirm and make it',
    text: 'We confirm availability, the final price, payment and how you will receive it. Then we print your item to order.',
  },
];

export default function HowToOrderPage() {
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to order a personalised gift from Gifted with Purpose',
    description: 'Ordering is done over WhatsApp. There is no cart or online checkout.',
    totalTime: 'PT5M',
    step: STEPS.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      url: `${SITE_URL}/how-to-order#step-${i + 1}`,
    })),
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'How to order', item: `${SITE_URL}/how-to-order` },
    ],
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="phero" style={{ '--accent': 'var(--gold)', '--accent-soft': '#FFF6E6' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <span aria-current="page">How to order</span>
          </nav>
          <p className="sub">Ordering</p>
          <h1>How to order</h1>
          <p>
            No cart, no checkout, no account. You message us on WhatsApp and we handle your order personally from
            there.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div className="steps">
            {STEPS.map((s, i) => (
              <div className="step" key={s.name} id={`step-${i + 1}`}>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>

          <div className="confirm" style={{ marginTop: 28 }}>
            <Icon name="sparkle" />
            <div>
              <h4>What is not on this site yet</h4>
              <p>
                Delivery areas, delivery costs and our returns terms are still being confirmed and are deliberately not
                published here. Ask us on WhatsApp and we will give you the current answer for your order.
              </p>
            </div>
          </div>

          <div className="soon-wrap" style={{ marginTop: 30 }}>
            <h2 style={{ fontSize: 24 }}>Ready to start?</h2>
            <p>Send us a message and tell us who the gift is for.</p>
            <a
              className="btn btn-wa"
              href={wa('Hi Gifted with Purpose! I would like to place an order.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="wa" /> Order on WhatsApp
            </a>
            <ul className="hero-trust" style={{ justifyContent: 'center', marginTop: 20 }}>
              <li>
                <Check /> We reply personally
              </li>
              <li>
                <Check /> Usually same day
              </li>
            </ul>
          </div>

          <div style={{ textAlign: 'center', marginTop: 26 }}>
            <Link className="btn btn-ghost" href="/faq">
              Read the FAQ <Chev />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
