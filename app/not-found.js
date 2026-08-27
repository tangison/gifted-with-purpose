import Link from 'next/link';
import Image from 'next/image';
import { Icon, Chev } from '@/components/Icons';
import { collections, wa } from '@/lib/site';

export const metadata = {
  title: 'Page not found',
  description: 'That page does not exist. Browse our personalised gift collections or message us on WhatsApp.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="main">
      <section className="sec" style={{ paddingTop: 48 }}>
        <div className="wrap" style={{ textAlign: 'center', maxWidth: 640 }}>
          <Image
            src="/assets/logos/gifted-with-purpose-logo.svg"
            alt=""
            width={132}
            height={131}
            style={{ margin: '0 auto 20px', opacity: 0.92 }}
          />
          <p className="eyebrow" style={{ marginInline: 'auto' }}>
            <Icon name="sparkle" /> Error 404
          </p>
          <h1 style={{ fontSize: 'clamp(30px,8vw,50px)', marginBottom: 12 }}>
            We couldn&rsquo;t find that page
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '15.5px', marginBottom: 24 }}>
            The link may be old or mistyped. Nothing is lost, here is the way back.
          </p>
          <div className="hero-cta" style={{ marginInline: 'auto', justifyContent: 'center' }}>
            <Link className="btn btn-pink" href="/">
              Back to the homepage
            </Link>
            <a
              className="btn btn-wa"
              href={wa("Hi Gifted with Purpose! I couldn't find a page on your website.")}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="wa" /> Ask us on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="sec sec-alt" style={{ paddingTop: 10 }}>
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">
              Try these
            </span>
            <h2>Browse our collections</h2>
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
