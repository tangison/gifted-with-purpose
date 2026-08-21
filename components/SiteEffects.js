'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Icon } from './Icons';
import { wa } from '@/lib/site';

/** Adds the `js` class, runs scroll reveal, and drives the sticky mobile CTA. */
export default function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add('js');
  }, []);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.rv'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!('IntersectionObserver' in window) || reduce) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en, i) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          setTimeout(() => el.classList.add('in'), Math.min(i * 55, 220));
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    );
    els.forEach((el) => io.observe(el));

    // Safety net so content is never left invisible.
    const t = setTimeout(() => els.forEach((el) => el.classList.add('in')), 2600);
    return () => {
      clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const bar = document.getElementById('stickyWa');
    if (!bar) return;
    const onScroll = () => {
      const show = window.scrollY > 380;
      const atFoot = window.innerHeight + window.scrollY > document.body.offsetHeight - 220;
      bar.setAttribute('data-show', show && !atFoot ? 'true' : 'false');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  return null;
}

export function StickyWa() {
  return (
    <div className="sticky-wa" id="stickyWa" data-show="false">
      <a
        className="btn btn-wa"
        href={wa('Hi Gifted with Purpose! I would like to place an order.')}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon name="wa" /> Order on WhatsApp
      </a>
    </div>
  );
}
