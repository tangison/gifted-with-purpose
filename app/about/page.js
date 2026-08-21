import Link from 'next/link';
import Image from 'next/image';
import { Icon, Chev, Check, NaFlag } from '@/components/Icons';
import { collections, wa, SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Our Story — A Mother–Daughter Team in Namibia',
  description:
    'Gifted with Purpose is a proud mother–daughter team in Namibia creating personalized gifts made with love and purpose. Registered as Geneveve Gift Shop.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Our Story', item: `${SITE_URL}/about` },
    ],
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="phero" style={{ '--accent': 'var(--cat-pink)', '--accent-soft': '#FFEFF4' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <span aria-current="page">Our Story</span>
          </nav>
          <p className="sub">About us</p>
          <h1>
            Made by two people who
            <br />
            actually know your name
          </h1>
          <p>
            We&rsquo;re a proud mother–daughter team creating personalized gifts made with love and purpose, right here
            in Namibia.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap about-grid">
          <div className="about-photo rv">
            <Image
              src="/assets/products/about-team-photo.jpg"
              alt="The mother–daughter team behind Gifted with Purpose"
              width={800}
              height={743}
              priority
              sizes="(min-width:900px) 40vw, 90vw"
            />
            <span className="heart">
              <Icon name="heart" />
            </span>
          </div>
          <div className="about-copy rv">
            <p className="script">Our story</p>
            <h2>Gifted with Purpose</h2>
            <p>
              We&rsquo;re a proud <strong>mother–daughter team</strong> creating personalized gifts made with love and
              purpose.
            </p>
            <p>
              Everything we make is printed to order. That means the affirmation, the scripture or the name on the cup
              was chosen for one specific person — a daughter starting a hard year, a friend who needs reminding that
              she&rsquo;s enough, a teacher finishing a long term, a little one who wants their own name on their
              bottle.
            </p>
            <p>
              We work mostly in drinkware today — stainless steel tumblers, wine tumblers, glass tumblers with bamboo
              lids, mugs and kids&rsquo; sippy cups — in English and in Afrikaans.
            </p>
            <p>
              <strong>Thank you for supporting our business!</strong>
            </p>
            <ul className="about-pills">
              <li>
                <NaFlag /> Made with love in Namibia
              </li>
              <li>
                <Check /> A team of two
              </li>
              <li>
                <Check /> Printed to order
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sec sec-blush">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">
              <Icon name="heart" /> What we stand for
            </span>
            <h2>Thoughtful. Meaningful. Yours.</h2>
            <p>Three words on our logo, and the actual brief for every design we print.</p>
          </div>
          <div className="steps" style={{ counterReset: 'none' }}>
            <div className="step rv" style={{ paddingLeft: 20 }}>
              <h3>Thoughtful</h3>
              <p>
                A gift should sound like the person giving it. We&rsquo;ll help you get the wording right before
                anything is printed.
              </p>
            </div>
            <div className="step rv" style={{ paddingLeft: 20 }}>
              <h3>Meaningful</h3>
              <p>Affirmations, scripture, names, inside jokes — the things people keep on their desk for years.</p>
            </div>
            <div className="step rv" style={{ paddingLeft: 20 }}>
              <h3>Yours</h3>
              <p>Printed to order, one at a time. Not something they&rsquo;ll see on a shelf somewhere else.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 30 }}>
            <a
              className="btn btn-wa"
              href={wa('Hi Gifted with Purpose! I would like to chat about a gift.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="wa" /> Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">
              <Icon name="gift" /> Start here
            </span>
            <h2>Browse the collections</h2>
          </div>
          <div className="cats">
            {collections.map((o) => (
              <Link
                key={o.slug}
                className="cat rv"
                style={{ '--c': o.accent, '--cs': o.accent_soft }}
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
