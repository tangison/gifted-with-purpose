import Link from 'next/link';
import { Icon, Chev } from '@/components/Icons';
import { wa, SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Frequently Asked Questions',
  description:
    'How to order personalised gifts from Gifted with Purpose in Namibia, what sizes we stock, personalisation, Afrikaans designs, pricing and delivery.',
  alternates: { canonical: '/faq' },
};

export const FAQS = [
  {
    q: 'How do I order?',
    a: 'Tap any “Order on WhatsApp” button. It opens a WhatsApp message already filled in with the product you are looking at, so all you have to do is press send. We reply personally and confirm everything from there.',
  },
  {
    q: 'Can I put a name on it?',
    a: 'Yes, that is what we do. Tell us the name, spelling and any wording you would like when you message us, and we will confirm the design before we print.',
  },
  {
    q: 'What sizes are available?',
    a: 'The sizes shown on each product are the ones we have photographed: 355ml, 400ml, 450ml and 600ml stainless steel, plus glass tumblers with bamboo lids and handled mugs. Ask us on WhatsApp about a size you do not see listed.',
  },
  {
    q: 'Why do some products say “price on request”?',
    a: 'We only publish a price here once it is confirmed. For anything still marked “price on request”, message us and we will quote you right away.',
  },
  {
    q: 'Do you deliver?',
    a: 'Yes, we deliver across Namibia for an extra cost. The exact amount depends on where you are, so we confirm it with you on WhatsApp when we confirm your order. Message us your area and we will quote delivery before anything is made.',
  },
  {
    q: 'Can I return a personalised item?',
    a: 'Because personalised items are made specifically for you, please check the spelling and wording with us before you approve. Once you have approved the proof and made payment, the order goes to production and cannot be changed or cancelled, so we confirm every detail with you first.',
  },
  {
    q: 'Are the cups dishwasher safe?',
    a: 'They are dishwasher safe. That said, warm water and a soft cloth is all they really need, and gentle hand washing keeps the print looking its best for longer.',
  },
  {
    q: 'Do you make Afrikaans designs?',
    a: 'Ons doen, yes. Our Spreuke 31 line is printed in Afrikaans exactly as designed, and we are happy to discuss other Afrikaans wording.',
  },
  {
    q: 'How do I pay?',
    a: 'There is no online checkout on this site. We agree payment with you directly over WhatsApp when we confirm your order.',
  },
  {
    q: 'Can I return a personalised item?',
    a: 'Our returns and exchange terms are still being confirmed and are not published yet. Because personalised items are made specifically for you, please check with us on WhatsApp before ordering.',
  },
];

export default function FaqPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE_URL}/faq` },
    ],
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="phero" style={{ '--accent': 'var(--cat-teal)', '--accent-soft': '#EAF8F6' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <span aria-current="page">FAQ</span>
          </nav>
          <p className="sub">Good to know</p>
          <h1>Frequently asked questions</h1>
          <p>Everything people usually ask us before they order. If yours is not here, just message us.</p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <div className="ans">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="soon-wrap" style={{ marginTop: 34 }}>
            <h2 style={{ fontSize: 23 }}>Still not sure?</h2>
            <p>Ask us anything. We would rather answer a question than have you guess.</p>
            <a
              className="btn btn-wa"
              href={wa('Hi Gifted with Purpose! I have a question about your products.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="wa" /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
