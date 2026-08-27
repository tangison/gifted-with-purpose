import Link from 'next/link';
import Image from 'next/image';
import { Icon, Chev, Check, NaFlag } from '@/components/Icons';
import ProductCard from '@/components/ProductCard';
import Disclosure from '@/components/Disclosure';
import { brand, collections, featured, products, productsIn, comingSoon, wa, waProduct, priceLabel, SITE_URL } from '@/lib/site';
import { blanks, designs, work, workMarketingSafe, blankPriceLabel, money } from '@/lib/catalog';

export const metadata = {
  title: 'Personalised Gifts in Namibia: Tumblers, Mugs and Kids Cups',
  description:
    'Beautiful personalized gifts made with love in Namibia. Affirmation tumblers, faith-based drinkware, kids’ cups and teacher gifts from a mother–daughter team. Order on WhatsApp.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const feat = featured();
  const tset = products.find((p) => p.id === 'teacher-appreciation-set');

  return (
    <main id="main">
      <section className="hero">
        <div className="wrap hero-in">
          <div className="hero-copy">
            <h1>
              Her name on it.
              <br />
              <em>Her verse on it.</em>
            </h1>
            <p className="hero-tag">Printed to order in Windhoek</p>
            <p className="hero-sub">
              Pick the cup. Pick the design. We print it. {designs.length} designs ready to go, or we draw you a new
              one. Made by a mother and daughter in Windhoek, from {brand.currency}
              {Math.min(...blanks.filter((b) => b.price != null).map((b) => b.price))}.
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
              <Link className="btn btn-ghost" href="/create">
                Make your own <Chev />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec how2">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">How it works</span>
            <h2>Two choices, one message</h2>
            <p>
              The item sets the price. The design is yours to pick, and there is no extra charge for choosing a
              different one.
            </p>
          </div>

          <ol className="h2-steps">
            <li>
              <span className="h2-n">1</span>
              <h3>Pick the item</h3>
              <p>
                {blanks.length} to choose from: mugs, tumblers, sippy cups and kids bottles. From {brand.currency}
                {Math.min(...blanks.filter((b) => b.price != null).map((b) => b.price))}.
              </p>
              <Link href="/shop">See the items <Chev /></Link>
            </li>
            <li>
              <span className="h2-n">2</span>
              <h3>Pick the design</h3>
              <p>
                {designs.length} ready-made designs, filtered by what fits your item. Or describe your own and we draw
                it, quoted per job.
              </p>
              <Link href="/designs">Browse the designs <Chev /></Link>
            </li>
            <li>
              <span className="h2-n">3</span>
              <h3>Send it on WhatsApp</h3>
              <p>
                Your choices arrive as one message with the reference and the price written out. Geneveve replies to
                confirm before anything is made.
              </p>
              <Link href="/create">Start building <Chev /></Link>
            </li>
          </ol>

          <div className="h2-strip">
            <p className="h2-strip-lead">Print it on</p>
            <ul>
              {blanks.map((b) => (
                <li key={b.id}>
                  <Link href={`/shop/${b.id}`}>
                    <b>{b.name}</b>
                    <span className={b.price == null ? 'ask' : undefined}>{blankPriceLabel(b)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Our work</span>
            <h2>Things we have actually made</h2>
            <p>
              {work.length} photographs of real orders, printed here and handed over. Judge the finish before you
              commit to anything.
            </p>
          </div>
          <ul className="wg wg-strip">
            {workMarketingSafe()
              .slice(0, 6)
              .map((w) => (
                <li key={w.id}>
                  <Link href="/work" className="wg-cell">
                    <Image
                      src={`/assets/work/${w.file}@sm.webp`}
                      alt={w.alt}
                      width={w.sw}
                      height={w.sh}
                      sizes="(min-width:1100px) 260px, (min-width:600px) 31vw, 47vw"
                      loading="lazy"
                    />
                  </Link>
                </li>
              ))}
          </ul>
          <div style={{ textAlign: 'center', marginTop: 26 }}>
            <Link className="btn btn-ghost" href="/work">
              Browse our products <Chev />
            </Link>
          </div>
        </div>
      </section>

      <section className="sec pat pat-confetti pat-fade" id="collections">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">
              Shop by collection
            </span>
            <h2>Or start from who it is for</h2>
            <p>
              Five collections of pieces we have already made and photographed. Pick the person and we will show you
              what fits.
            </p>
          </div>
          <div className="cats">
            {collections.map((c) => {
              const n = productsIn(c.slug).length;
              return (
                <Link
                  key={c.slug}
                  className="cat"
                  style={{ '--c': c.accent, '--cs': c.accent_soft, '--ci': c.accent_ink }}
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
              Most loved
            </span>
            <h2>What people order most</h2>
            <p>Photographed on our own table, not a stock library. Tap any photo to see the print up close.</p>
          </div>
          <div className="rail-head">
            <p className="rail-hint">Swipe to browse</p>
            <Link href="/work">View all {work.length} &rarr;</Link>
          </div>
          <div className="rail">
            {feat.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 2} index={i} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 26 }}>
            <Link className="btn btn-ghost" href="/shop">
              See all {work.length} pieces we have made <Chev />
            </Link>
          </div>
        </div>
      </section>

      <section className="sec season">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">
              Seasonal collection
            </span>
            <h2>Teacher Appreciation</h2>
            <p>Glass, pencil case and gift bag in one box. Nothing left to wrap the night before.</p>
          </div>
          <div className="season-card">
            <div className="pic">
              <Image
                src="/assets/products/flyer-teacher-appreciation.jpg"
                alt="Teacher Appreciation Gift set: Libby glass, pencil case and gift bag"
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
                <span className="price">{priceLabel(tset) || 'Price on request'}</span>
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
          <div className="about-photo">
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
          <div className="about-copy">
            <p className="script">About us</p>
            <h2>Two people, one printer, every order checked twice</h2>
            <p>
              We are a <strong>mother and daughter in Windhoek</strong>. This started as gifts for people we know, and
              the orders kept coming, so now we make them for you too.
            </p>
            <Disclosure summary="More about how we work">
              <p>
                Every tumbler, mug and cup is printed to order, which means the name, the verse or the affirmation on
                it is chosen for one specific person. That is the whole point.
              </p>
              <p style={{ marginTop: 8 }}>
                <strong>Thank you for supporting our business.</strong>
              </p>
            </Disclosure>
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

      <section className="sec sec-blush pat pat-hearts pat-fade" id="how">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">
              How it works
            </span>
            <h2>You message us. We do the rest.</h2>
            <p>No account, no card details on a website. Geneveve answers the messages herself.</p>
          </div>
          <div className="steps">
            <div className="step">
              <h3>Choose the design</h3>
              <Disclosure summary="What this means">
                <p>
                  Browse all {designs.length} designs, or tell us the wording you want and we will check what is
                  possible.
                </p>
              </Disclosure>
            </div>
            <div className="step">
              <h3>Send the message</h3>
              <Disclosure summary="What this means">
                <p>The message opens already written, with the design, the size and the price in it. Press send.</p>
              </Disclosure>
            </div>
            <div className="step">
              <h3>We confirm before we print</h3>
              <Disclosure summary="What this means">
                <p>Spelling of the name, the price, payment and how it reaches you. Nothing is printed until you say yes.</p>
              </Disclosure>
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
          <div className="soon-wrap">
            <span className="eyebrow">
              Coming soon
            </span>
            <h2>Coming past drinkware</h2>
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
              Contact
            </span>
            <h2>Tell us who it is for</h2>
            <p>Two of us, both in Windhoek. Messages are usually answered the same day.</p>
          </div>
          <div className="contact-grid">
            <a className="ccard" href={wa('Hi Gifted with Purpose!')} target="_blank" rel="noopener noreferrer">
              <span className="ci" style={{ background: 'var(--wa)' }}>
                <Icon name="wa" />
              </span>
              <span>
                <h3>WhatsApp</h3>
                <p>{brand.phone_intl}, fastest way to reach us</p>
              </span>
            </a>
            <a className="ccard" href={`tel:+${brand.wa_number}`}>
              <span className="ci" style={{ background: 'var(--cat-pink)' }}>
                <Icon name="phone" />
              </span>
              <span>
                <h3>Call us</h3>
                <p>{brand.phone_intl}</p>
              </span>
            </a>
            <div className="ccard">
              <span className="ci" style={{ background: 'var(--cat-teal)' }}>
                <Icon name="pin" />
              </span>
              <span>
                <h3>Where we are</h3>
                <p>{brand.location}, made with love right here</p>
              </span>
            </div>
            <Link className="ccard" href="/faq">
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
