'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from './Icons';
import { brand, wa } from '@/lib/site';
import { CartButton } from './CartDrawer';
import Drawer from './Drawer';

const ASK = 'Hi Gifted with Purpose! I saw your website and I have a question.';

export default function Header() {
  const pathname = usePathname();
  const [openFor, setOpenFor] = useState(null);
  const open = openFor === pathname;
  const setOpen = useCallback((v) => setOpenFor(v ? pathname : null), [pathname]);
  const burgerRef = useRef(null);
  const panelRef = useRef(null);

  const cur = (href) => (pathname === href ? 'page' : undefined);

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
  }, [open, setOpen]);

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
            <Link href="/shop" aria-current={cur('/shop')}>
              Shop
            </Link>
            <Link href="/designs" aria-current={cur('/designs')}>
              Designs
            </Link>
<Link href="/work" aria-current={cur('/work')}>
              Our products
            </Link>
            <Link href="/create" aria-current={cur('/create')}>
              Make your own
            </Link>
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

      <Drawer open={open} onClose={() => setOpen(false)} panelRef={panelRef} current={pathname} />
    </>
  );
}
