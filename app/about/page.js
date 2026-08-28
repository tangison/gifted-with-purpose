import Link from 'next/link';
import Image from 'next/image';
import { Icon, Chev, Check, NaFlag } from '@/components/Icons';
import { collections, wa, SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Our Story: A Mother and Daughter Team in Namibia',
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
          <h1>Our Story</h1>
          <p>
            <strong>GIFTED WITH PURPOSE</strong> is a mother-and-daughter dream brought to life by{' '}
            <strong>Geneveve and Payton</strong>.
          </p>
        </div>
      </section>

      <section className="sec">
        <div className="wrap about-grid">
          <div className="about-photo">
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
          <div className="about-copy">
            <p className="script">Our story</p>
            <h2>Seen, valued and celebrated</h2>
            <p>
              What started as a love for creativity grew into a passion for creating personalised gifts that make
              people feel <strong>seen, valued and celebrated</strong>.
            </p>
            <p>
              Every item we create is made with intention, heart and purpose &mdash; because we believe the best gifts
              are the ones that carry meaning.
            </p>
            <p>
              For us, this journey is about more than business. It is about building something special together,
              creating memories, and growing a legacy one thoughtful gift at a time.
            </p>
            <p className="story-sign">
              <strong>GIFTED WITH PURPOSE</strong>
              <br />
              <em>Thoughtful. Meaningful. Yours.</em>
            </p>
            <ul className="about-pills">
              <li>
                <NaFlag /> Made with love in Namibia
              </li>
              <li>
                <Check /> A team of two
              </li>
              <li>
                <Check /> Printed on order
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sec sec-blush">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">
              What we stand for
            </span>
            <h2>Thoughtful. Meaningful. Yours.</h2>
            <p>Three words on our logo, and the actual brief for every design we print.</p>
          </div>
          <div className="steps">
            <div className="step step-plain">
              <h3>Thoughtful</h3>
              <p>
                A gift should sound like the person giving it. We&rsquo;ll help you get the wording right before
                anything is printed.
              </p>
            </div>
            <div className="step step-plain">
              <h3>Meaningful</h3>
              <p>Affirmations, scripture, names, inside jokes. The things people keep on their desk for years.</p>
            </div>
            <div className="step step-plain">
              <h3>Yours</h3>
              <p>Printed on order, one at a time. Not something they&rsquo;ll see on a shelf somewhere else.</p>
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
              Start here
            </span>
            <h2>Browse the collections</h2>
          </div>
          <div className="cats">
            {collections.map((o) => (
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
