'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icons';
import { brand } from '@/lib/site';
import data from '@/data/designs.json';

const GROUPS = [
  { id: 'all', label: 'Everything' },
  { id: 'fliptop', label: 'Kids flip-top bottles' },
  { id: 'sippy', label: 'Kids sippy cups' },
  { id: 'design', label: 'Print designs' },
];

function waPick(item) {
  const msg =
    `Hi Gifted with Purpose! I would like this design:\n\n` +
    `Design reference: ${item.id.toUpperCase()}\n` +
    `${item.alt}\n\n` +
    `Please let me know the price and what it can be printed on.`;
  return `https://wa.me/${brand.wa_number}?text=${encodeURIComponent(msg)}`;
}

export default function DesignGallery() {
  const [group, setGroup] = useState('all');
  const [open, setOpen] = useState(null);

  const shown = useMemo(
    () => (group === 'all' ? data.items : data.items.filter((i) => i.group === group)),
    [group]
  );

  const counts = useMemo(() => {
    const c = { all: data.items.length };
    for (const i of data.items) c[i.group] = (c[i.group] || 0) + 1;
    return c;
  }, []);

  return (
    <>
      <div className="shop-bar">
        <div className="wrap">
          <div className="tabs" role="tablist" aria-label="Filter designs">
            {GROUPS.map((g) => (
              <button
                key={g.id}
                role="tab"
                aria-selected={group === g.id}
                aria-controls="design-grid"
                className="tab"
                onClick={() => setGroup(g.id)}
              >
                {g.label}
                <span className="n">{counts[g.id] || 0}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="sec" style={{ paddingTop: 'var(--s-3)' }}>
        <div className="wrap">
          <p className="shop-count" aria-live="polite">
            Showing {shown.length} design{shown.length === 1 ? '' : 's'}
          </p>

          <h2 className="sr-only">Design library</h2>
          <div id="design-grid" role="tabpanel" tabIndex={-1}>
            <ul className="dg">
            {shown.map((item, i) => (
              <li key={item.id}>
                <button
                  className="dg-cell"
                  onClick={() => setOpen(item)}
                  aria-label={`View design ${item.id.toUpperCase()}: ${item.alt}`}
                >
                  <Image
                    src={`/assets/designs/${item.file}@sm.webp`}
                    alt={item.alt}
                    width={560}
                    height={476}
                    sizes="(min-width:1100px) 240px, (min-width:600px) 30vw, 46vw"
                    loading={i < 6 ? 'eager' : 'lazy'}
                  />
                  <span className="dg-ref">{item.id.toUpperCase()}</span>
                </button>
              </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div
        className="lb"
        data-open={!!open}
        role="dialog"
        aria-modal="true"
        aria-label="Design preview"
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setOpen(null);
        }}
      >
        <button className="lb-x" onClick={() => setOpen(null)} aria-label="Close preview">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {open && (
          <figure>
            <Image
              src={`/assets/designs/${open.file}.webp`}
              alt={open.alt}
              width={1400}
              height={1190}
              sizes="(min-width:900px) 760px, 94vw"
            />
            <figcaption>
              <b>{open.id.toUpperCase()}</b>
              <span>{open.alt}</span>
            </figcaption>
            <a className="btn btn-wa lb-cta" href={waPick(open)} target="_blank" rel="noopener noreferrer">
              <Icon name="wa" /> Ask about this design
            </a>
          </figure>
        )}
      </div>
    </>
  );
}
