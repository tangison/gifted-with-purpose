import Link from 'next/link';
import Image from 'next/image';
import { Icon, Chev, Check, NaFlag } from '@/components/Icons';
import ProductCard from '@/components/ProductCard';
import { brand, collections, featured, products, productsIn, comingSoon, wa, waProduct, SITE_URL } from '@/lib/site';

export const metadata = {
  title: 'Personalised Gifts in Namibia — Tumblers, Mugs & Kids’ Cups',
  description:
    'Beautiful personalized gifts made with love in Namibia. Affirmation tumblers, faith-based drinkware, kids’ cups and teacher gifts from a mother–daughter team. Order on WhatsApp.',
  alternates: { canonical: '/' },
};

const STRIP =
  "Personalised drinkware   ✦   Made with love in Namibia   ✦   Order on WhatsApp   ✦   Self love · Faith · Kids   ✦   Thoughtful. Meaningful. Yours.   ✦   ";

export default function HomePage() {
  const feat = featured();
  const tset = products.find((p) => p.id === 'teacher-appreciation-set');

  return (
    <main id="main">
      <section className="hero">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <span className="blob blob-c" />
        <div className="wrap hero-in">
          <div className="hero-copy">
            <h1>
              Gifts that say the thing
              <br />
              <em>you can&rsquo;t always say.</em>
            </h1>
            <p className="hero-tag">Thoughtful. Meaningful. Yours.</p>
            <p className="hero-sub">
              Beautiful personalized gifts made with love — affirmation tumblers, faith-based drinkware and kids&rsquo;
              cups, printed by a mother–daughter team right here in Namibia.
            </p>
            <div className="hero-cta">
              <a
                className="btn btn-wa"
                href={wa('Hi Gifted with Purpose! I saw your website and I would like to order.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="wa" /> Order on WhatsApp
              </a>
              <Link className="btn btn-ghost" href="#collections">
                Browse the collections <Chev />
              </Link>
            </div>
            <ul className="hero-trust">
              <li>
                <Check /> Mother–daughter run
              </li>
              <li>
                <Check /> Personalised with any name
              </li>
              <li>
                <Check /> English &amp; Afrikaans designs
              </li>
            </ul>
          </div>
          <div className="hero-art">
            <Image
              className="hero-badge"
              src="/assets/logos/gifted-with-purpose-logo.svg"
              alt="Gifted with Purpose — Thoughtful, Meaningful, Yours"
              width={330}
              height={327}
              priority
            />
          </div>
        </div>
      </section>

      <div className="strip" aria-hidden="true">
        <div className="strip-track">
          <span>{STRIP.repeat(2)}</span>
          <span>{STRIP.repeat(2)}</span>
        </div>
      </div>

      <section className="sec" id="collections">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">
              <Icon name="gift" /> Shop by collection
            </span>
            <h2>Find the one that fits them</h2>
            <p>
              Every design is printed to order on quality stainless steel, glass and ceramic drinkware. Tap a collection
              to see what&rsquo;s available right now.
            </p>
          </div>
          <div className="cats">
            {collections.map((c) => {
              const n = productsIn(c.slug).length;
              return (
                <Link
                  key={c.slug}
                  className="cat rv"
                  style={{ '--c': c.accent, '--cs': c.accent_soft }}
                  href={`/collections/${c.slug}`}
                >
                  <span className="count">
                    {n} design{n !== 1 ? 's' : ''}
                  </span>
                  <div className="cat-ico">
                    <Icon name={c.icon} />
                  </div>
                  <h3>{c.name}</h3>
                  <div className="sub">{c.sub}</div>
                  <p>{c.blurb}</p>
                  <ul>
                    {c.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <span className="go">
                    Browse {c.name} <Chev />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">
              <Icon name="sparkle" /> Most loved
            </span>
            <h2>Our featured designs</h2>
            <p>Real products, photographed by us. Tap any photo to see it larger.</p>
          </div>
          <div className="grid">
            {feat.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 2} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 26 }}>
            <Link className="btn btn-ghost" href="#collections">
              See all collections <Chev />
            </Link>
          </div>
        </div>
      </section>

      <section className="sec season">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">
              <Icon name="apple" /> Seasonal collection
            </span>
            <h2>Teacher Appreciation</h2>
            <p>A complete, ready-to-give set for the teacher who shaped your child&rsquo;s year.</p>
          </div>
          <div className="season-card rv">
            <div className="pic">
              <Image
                src="/assets/products/flyer-teacher-appreciation.jpg"
                alt="Teacher Appreciation Gift set — Libby glass, pencil case and gift bag"
                width={854}
                height={1281}
                sizes="(min-width:600px) 50vw, 100vw"
              />
            </div>
            <div className="txt">
              <h3>Teacher Appreciation Gift Set</h3>
              <p className="quote">&ldquo;Teachers plant seeds of knowledge that grow forever&rdquo;</p>
              <ul>
                <li>Libby glass</li>
                <li>Pencil case</li>
                <li>Gift bag</li>
              </ul>
              <div className="price-row">
                <span className="price">N$150.00</span>
                <span style={{ fontSize: 13, color: 'var(--muted)' }}>complete set</span>
              </div>
              <a
                className="btn btn-season btn-block"
                style={{ marginTop: 14 }}
                href={waProduct(tset)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="wa" /> Order the set on WhatsApp
              </a>
              <Link
                className="btn btn-ghost btn-sm btn-block"
                style={{ marginTop: 9 }}
                href="/collections/teacher-appreciation"
              >
                View collection <Chev />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" id="about">
        <div className="wrap about-grid">
          <div className="about-photo rv">
            <Image
              src="/assets/products/about-team-photo.jpg"
              alt="The mother–daughter team behind Gifted with Purpose"
              width={800}
              height={743}
              sizes="(min-width:900px) 40vw, 90vw"
            />
            <span className="heart">
              <Icon name="heart" />
            </span>
          </div>
          <div className="about-copy rv">
            <p className="script">About us</p>
            <h2>A mother–daughter team, making gifts with purpose</h2>
            <p>
              We&rsquo;re a proud <strong>mother–daughter team</strong> creating personalized gifts made with love and
              purpose. What started as gifts for the people closest to us grew into something we now get to make for
              you.
            </p>
            <p>
              Every tumbler, mug and cup is printed to order — which means the name, the verse or the affirmation on it
              is chosen for one specific person. That&rsquo;s the whole point.
            </p>
            <p>
              <strong>Thank you for supporting our business!</strong>
            </p>
            <ul className="about-pills">
              <li>
                <NaFlag /> Made with love in Namibia
              </li>
              <li>
                <Check /> Personalised to order
              </li>
              <li>
                <Check /> English &amp; Afrikaans
              </li>
            </ul>
            <Link className="btn btn-ghost" style={{ marginTop: 18 }} href="/about">
              Read our story <Chev />
            </Link>
          </div>
        </div>
      </section>

      <section className="sec sec-blush" id="how">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">
              <Icon name="wa" /> How it works
            </span>
            <h2>From &ldquo;I like that&rdquo; to ordered, in one tap</h2>
            <p>No cart, no checkout, no account. You message us and we handle it personally.</p>
          </div>
          <div className="steps">
            <div className="step rv">
              <h3>Pick your design</h3>
              <p>Browse the collections and find the one that fits the person you&rsquo;re gifting.</p>
            </div>
            <div className="step rv">
              <h3>Tap &ldquo;Order on WhatsApp&rdquo;</h3>
              <p>Your message opens already filled in with the product name and price — just hit send.</p>
            </div>
            <div className="step rv">
              <h3>We confirm the details</h3>
              <p>We&rsquo;ll confirm the name to print, availability, payment and how to get it to you.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 26 }}>
            <Link className="btn btn-ghost" href="/how-to-order">
              See the full ordering guide <Chev />
            </Link>
          </div>
        </div>
      </section>

      <section className="sec" id="soon">
        <div className="wrap">
          <div className="soon-wrap rv">
            <span className="eyebrow">
              <Icon name="sparkle" /> Coming soon
            </span>
            <h2>More than drinkware</h2>
            <p>
              {comingSoon.note} Message us if you&rsquo;d like to be told first when these go live.
            </p>
            <ul className="soon-list">
              {comingSoon.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <a
              className="btn btn-pink"
              style={{ marginTop: 20 }}
              href={wa(
                'Hi Gifted with Purpose! Please let me know when your new products (t-shirts, caps, bags, wallets, mousepads, deskpads) are available.'
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="wa" /> Tell me when they launch
            </a>
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">
              <Icon name="pin" /> Contact
            </span>
            <h2>Let&rsquo;s make something meaningful</h2>
            <p>We&rsquo;re a small team and we answer our own messages — usually the same day.</p>
          </div>
          <div className="contact-grid">
            <a className="ccard rv" href={wa('Hi Gifted with Purpose!')} target="_blank" rel="noopener noreferrer">
              <span className="ci" style={{ background: 'var(--wa)' }}>
                <Icon name="wa" />
              </span>
              <span>
                <h3>WhatsApp</h3>
                <p>{brand.phone_local} — fastest way to reach us</p>
              </span>
            </a>
            <a className="ccard rv" href={`tel:+${brand.wa_number}`}>
              <span className="ci" style={{ background: 'var(--cat-pink)' }}>
                <Icon name="phone" />
              </span>
              <span>
                <h3>Call us</h3>
                <p>{brand.phone_local}</p>
              </span>
            </a>
            <div className="ccard rv">
              <span className="ci" style={{ background: 'var(--cat-teal)' }}>
                <Icon name="pin" />
              </span>
              <span>
                <h3>Where we are</h3>
                <p>{brand.location} — made with love, right here</p>
              </span>
            </div>
            <Link className="ccard rv" href="/faq">
              <span className="ci" style={{ background: 'var(--lavender)' }}>
                <Icon name="sparkle" />
              </span>
              <span>
                <h3>Questions?</h3>
                <p>Read the FAQ before you order</p>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
