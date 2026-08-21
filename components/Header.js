'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icons';
import { brand, collections, wa } from '@/lib/site';
import { CartButton } from './CartDrawer';

const ASK = 'Hi Gifted with Purpose! I saw your website and I have a question.';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const burgerRef = useRef(null);
  const panelRef = useRef(null);

  const cur = (href) => (pathname === href ? 'page' : undefined);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      const first = panelRef.current?.querySelector('a,button');
      first?.focus();
    }
    const onKey = (e) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className="hdr">
        <div className="wrap hdr-in">
          <Link className="brand" href="/">
            <Image
              src="/assets/logos/gifted-with-purpose-logo.svg"
              alt="Gifted with Purpose — Thoughtful, Meaningful, Yours"
              width={84}
              height={84}
              priority
            />
          </Link>

          <nav className="nav-desk" aria-label="Main navigation">
            <Link href="/" aria-current={cur('/')}>
              Home
            </Link>
            {collections.map((c) => (
              <Link key={c.slug} href={`/collections/${c.slug}`} aria-current={cur(`/collections/${c.slug}`)}>
                {c.name}
              </Link>
            ))}
            <Link href="/about" aria-current={cur('/about')}>
              Our Story
            </Link>
            <Link href="/contact" aria-current={cur('/contact')}>
              Contact
            </Link>
          </nav>

          <div className="hdr-actions">
            <a className="hdr-wa" href={wa(ASK)} target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp">
              <Icon name="wa" />
              <span>WhatsApp us</span>
            </a>
            <CartButton />
          </div>

          <button
            ref={burgerRef}
            className="burger"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="drawer"
            onClick={() => setOpen(true)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      <div className="drawer" id="drawer" data-open={open} role="dialog" aria-modal="true" aria-label="Menu">
        <div className="drawer-bg" onClick={() => setOpen(false)} />
        <div className="drawer-panel" ref={panelRef}>
          <div className="drawer-top">
            <Image src="/assets/logos/gifted-with-purpose-logo.svg" alt="" width={46} height={46} />
            <button className="x" onClick={() => setOpen(false)} aria-label="Close menu">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            <Link href="/" aria-current={cur('/')}>
              <i className="dot" style={{ background: 'var(--ink)' }} />
              Home
            </Link>
            {collections.map((c) => (
              <Link key={c.slug} href={`/collections/${c.slug}`} aria-current={cur(`/collections/${c.slug}`)}>
                <i className="dot" style={{ background: c.accent }} />
                {c.name}
                <small style={{ marginLeft: 'auto', color: 'var(--muted)', fontWeight: 500, fontSize: '12.5px' }}>
                  {c.sub}
                </small>
              </Link>
            ))}
            <Link href="/about" aria-current={cur('/about')}>
              <i className="dot" style={{ background: 'var(--lavender)' }} />
              Our Story
            </Link>
            <Link href="/faq" aria-current={cur('/faq')}>
              <i className="dot" style={{ background: 'var(--gold)' }} />
              FAQ
            </Link>
            <Link href="/contact" aria-current={cur('/contact')}>
              <i className="dot" style={{ background: 'var(--taupe)' }} />
              Contact
            </Link>
          </nav>
          <div className="drawer-foot">
            <a className="btn btn-wa" href={wa(ASK)} target="_blank" rel="noopener noreferrer">
              <Icon name="wa" /> Chat on WhatsApp
            </a>
            <small>
              {brand.phone_local} · {brand.location}
            </small>
          </div>
        </div>
      </div>
    </>
  );
}
