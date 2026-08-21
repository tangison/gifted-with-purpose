'use client';

import { useEffect } from 'react';

/**
 * Last-resort boundary: replaces the whole document, so it cannot rely on the
 * root layout, its fonts, or the stylesheet. Styles are inline by necessity.
 */
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Fatal application error:', error);
  }, [error]);

  return (
    <html lang="en-NA">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: '24px',
          background: '#FFF9FB',
          color: '#2A2A2A',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
          textAlign: 'center',
        }}
      >
        <main style={{ maxWidth: '32rem' }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- this boundary
              replaces the document when the app has failed, so next/image and its
              runtime cannot be relied on here. The asset is an SVG, so there is
              nothing for the optimiser to do anyway. */}
          <img
            src="/assets/logos/gifted-with-purpose-logo.svg"
            alt="Gifted with Purpose"
            width="132"
            height="131"
            style={{ display: 'block', margin: '0 auto 22px' }}
          />
          <h1 style={{ fontSize: '1.7rem', lineHeight: 1.2, margin: '0 0 12px', color: '#0A0A0A' }}>
            The site hit an unexpected error
          </h1>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#6B6259', margin: '0 0 24px' }}>
            Sorry about this. You can still order directly on WhatsApp and we will help you personally.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={reset}
              style={{
                font: 'inherit',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '13px 22px',
                borderRadius: '4px',
                border: '1.5px solid #0A0A0A',
                background: '#fff',
                color: '#0A0A0A',
                minHeight: '44px',
              }}
            >
              Try again
            </button>
            <a
              href="https://wa.me/264814076649"
              style={{
                font: 'inherit',
                fontWeight: 600,
                padding: '13px 22px',
                borderRadius: '4px',
                background: '#0B6B41',
                color: '#fff',
                textDecoration: 'none',
                minHeight: '44px',
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              WhatsApp 081 407 6649
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
