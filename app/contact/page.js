import Link from 'next/link';
import { Icon, Chev, Check, NaFlag } from '@/components/Icons';
import { brand, wa, SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Contact Us — WhatsApp, Call or Message',
  description:
    'Contact Gifted with Purpose in Namibia. WhatsApp or call 081 407 6649 to order personalised tumblers, mugs and kids’ cups. We answer our own messages.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
    ],
  };
  const contactPage = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Gifted with Purpose',
    url: `${SITE_URL}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: brand.name,
      legalName: brand.legal,
      telephone: `+${brand.wa_number}`,
      areaServed: { '@type': 'Country', name: 'Namibia' },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: `+${brand.wa_number}`,
          availableLanguage: ['English', 'Afrikaans'],
        },
      ],
    },
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPage) }} />

      <section className="phero" style={{ '--accent': 'var(--cat-pink)', '--accent-soft': '#FFEFF4' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <span aria-current="page">Contact</span>
          </nav>
          <p className="sub">Get in touch</p>
          <h1>Talk to us directly</h1>
          <p>
            There is no contact form here on purpose. WhatsApp reaches us fastest and keeps your order in one thread,
            so nothing gets lost.
          </p>
          <ul className="stats">
            <li>We answer our own messages</li>
            <li>Usually same day</li>
            <li>English &amp; Afrikaans</li>
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="contact-grid">
            <a
              className="ccard"
              href={wa('Hi Gifted with Purpose! I would like to place an order.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="ci" style={{ background: 'var(--wa)' }}>
                <Icon name="wa" />
              </span>
              <span>
                <h3>WhatsApp us</h3>
                <p>{brand.phone_local} — tap to open a chat</p>
              </span>
            </a>

            <a className="ccard" href={`tel:+${brand.wa_number}`}>
              <span className="ci" style={{ background: 'var(--cat-pink)' }}>
                <Icon name="phone" />
              </span>
              <span>
                <h3>Call us</h3>
                <p>{brand.phone_local}</p>
              </span>
            </a>

            <div className="ccard">
              <span className="ci" style={{ background: 'var(--cat-teal)' }}>
                <Icon name="pin" />
              </span>
              <span>
                <h3>Service area</h3>
                <p>{brand.location}. Delivery options are confirmed per order.</p>
              </span>
            </div>

            <div className="ccard">
              <span className="ci" style={{ background: 'var(--gold)' }}>
                <Icon name="gift" />
              </span>
              <span>
                <h3>Business</h3>
                <p>Geneveve Gift Shop t/a Gifted with Purpose</p>
              </span>
            </div>
          </div>

          <div className="confirm" style={{ marginTop: 26 }} id="social">
            <Icon name="sparkle" />
            <div>
              <h4>Our social links are not connected yet</h4>
              <p>
                We are on Facebook and Instagram, but the profile links have not been published on this site yet.
                Message us on WhatsApp and we will send them to you directly.
              </p>
            </div>
          </div>

          <div className="soon-wrap" style={{ marginTop: 30 }}>
            <span className="eyebrow">
              Ready when you are
            </span>
            <h2>Tell us who the gift is for</h2>
            <p>
              Send us the name, the wording or the verse you want printed and we will confirm the design, the price and
              how soon we can have it ready.
            </p>
            <a
              className="btn btn-wa"
              href={wa('Hi Gifted with Purpose! I would like to order a personalised gift. Here is what I have in mind: ')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="wa" /> Start a WhatsApp order
            </a>
            <ul className="hero-trust" style={{ justifyContent: 'center', marginTop: 20 }}>
              <li>
                <Check /> No account needed
              </li>
              <li>
                <Check /> No online payment on this site
              </li>
              <li>
                <NaFlag /> Made in Namibia
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
