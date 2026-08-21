'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/Icons';
import { brand } from '@/lib/site';

const WA = `https://wa.me/${brand.wa_number}?text=${encodeURIComponent(
  'Hi Gifted with Purpose! Something went wrong on your website and I could not finish what I was doing.'
)}`;

export default function Error({ error, reset }) {
  useEffect(() => {
    // Surfaced in the browser console and in Vercel's function logs.
    // No third-party error reporting is installed, per the no-tracking rule.
    console.error('Application error:', error);
  }, [error]);

  return (
    <main id="main">
      <section className="sec" style={{ paddingTop: 48 }}>
        <div className="wrap" style={{ textAlign: 'center', maxWidth: 620 }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>
            Something went wrong
          </p>
          <h1 style={{ fontSize: 'clamp(28px,7.5vw,44px)', marginBottom: 12 }}>
            That didn&rsquo;t load properly
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '15.5px', marginBottom: 24 }}>
            Sorry about that. Nothing you added to your gift bag is lost. Try again, and if it keeps happening please
            message us so we can take your order directly.
          </p>
          <div className="hero-cta" style={{ marginInline: 'auto', justifyContent: 'center' }}>
            <button className="btn btn-pink" onClick={reset}>
              Try again
            </button>
            <a className="btn btn-wa" href={WA} target="_blank" rel="noopener noreferrer">
              <Icon name="wa" /> Order on WhatsApp
            </a>
          </div>
          <p style={{ marginTop: 22, fontSize: 14 }}>
            <Link href="/">Back to the homepage</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
