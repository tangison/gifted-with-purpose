'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icon, Chev, NaFlag } from './Icons';
import { brand, collections, productsIn, products, imgSm, wa } from '@/lib/site';

const ASK = 'Hi Gifted with Purpose! I saw your website and I have a question.';

/**
 * Off-canvas navigation. Each collection carries a real product thumbnail and a
 * live count, so the menu previews the shop instead of listing words.
 */
export default function Drawer({ open, onClose, panelRef, current }) {
  const cur = (href) => (current === href ? 'page' : undefined);

  // one real photo per collection, taken from that collection's first product
  const thumbFor = (slug) => {
    const list = productsIn(slug);
    const studio = list.find((p) => p.shot === 'studio') || list[0];
    return studio ? imgSm(studio.image) : null;
  };

  return (
    <div className="drawer" id="drawer" data-open={open} role="dialog" aria-modal="true" aria-label="Menu">
      <div className="drawer-bg" onClick={onClose} />
      <div className="drawer-panel" ref={panelRef}>
        <div className="dw-top">
          <Image
            src="/assets/logos/gifted-with-purpose-logo.svg"
            alt="Gifted with Purpose"
            width={132}
            height={131}
            className="dw-logo"
          />
          <button className="x" onClick={onClose} aria-label="Close menu">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="dw-scroll">
          <Link className="dw-hero" href="/shop" aria-current={cur('/shop')}>
            <span className="dw-hero-tx">
              <b>Shop all designs</b>
              <small>{products.length} designs across {collections.length} collections</small>
            </span>
            <Chev />
          </Link>

          <Link className="dw-hero" href="/designs" style={{ background: '#1F6F66', marginTop: 'var(--s-2)' }}>
            <span className="dw-hero-tx">
              <b>Pick your design</b>
              <small>141 prints to choose from</small>
            </span>
            <Chev />
          </Link>

          <p className="dw-label">Collections</p>
          <nav className="dw-cols" aria-label="Collections">
            {collections.map((c) => {
              const t = thumbFor(c.slug);
              const n = productsIn(c.slug).length;
              return (
                <Link
                  key={c.slug}
                  href={`/collections/${c.slug}`}
                  aria-current={cur(`/collections/${c.slug}`)}
                  style={{ '--c': c.accent, '--ci': c.accent_ink }}
                >
                  <span className="dw-thumb">
                    {t && <Image src={t} alt="" fill sizes="72px" style={{ objectFit: 'cover' }} />}
                  </span>
                  <span className="dw-meta">
                    <b>{c.name}</b>
                    <small>{c.sub}</small>
                  </span>
                  <span className="dw-n">{n}</span>
                </Link>
              );
            })}
          </nav>

          <p className="dw-label">More</p>
          <nav className="dw-links" aria-label="Pages">
            <Link href="/" aria-current={cur('/')}>Home</Link>
            <Link href="/about" aria-current={cur('/about')}>Our Story</Link>
            <Link href="/how-to-order" aria-current={cur('/how-to-order')}>How to order</Link>
            <Link href="/faq" aria-current={cur('/faq')}>FAQ</Link>
            <Link href="/contact" aria-current={cur('/contact')}>Contact</Link>
          </nav>
        </div>

        <div className="dw-foot">
          <a className="btn btn-wa btn-block" href={wa(ASK)} target="_blank" rel="noopener noreferrer">
            <Icon name="wa" /> WhatsApp {brand.phone_intl}
          </a>
          <div className="dw-soc">
            <a href={brand.facebook} target="_blank" rel="noopener noreferrer" aria-label="Gifted with Purpose on Facebook">
              <Icon name="fb" />
            </a>
            <a href={brand.instagram} target="_blank" rel="noopener noreferrer" aria-label="Gifted with Purpose on Instagram">
              <Icon name="ig" />
            </a>
            <span className="dw-loc">
              <NaFlag /> {brand.location}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
