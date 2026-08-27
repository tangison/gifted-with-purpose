'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { themeLabel } from '@/lib/catalog';

const STEP = 24;

/**
 * The design library, scoped to one item. Shows a slice and grows on demand
 * rather than mounting 141 images at once on a page that is not the gallery.
 */
export default function BlankDesigns({ blank, designs }) {
  const [theme, setTheme] = useState('all');
  const [shown, setShown] = useState(STEP);

  const themes = useMemo(() => {
    const c = new Map();
    for (const d of designs) for (const t of d.themes) c.set(t, (c.get(t) || 0) + 1);
    return [...c.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  }, [designs]);

  const list = useMemo(
    () => (theme === 'all' ? designs : designs.filter((d) => d.themes.includes(theme))),
    [designs, theme]
  );

  const visible = list.slice(0, shown);

  return (
    <>
      <div className="chips" role="group" aria-label="Filter designs by theme">
        <button
          type="button"
          className="chip"
          aria-pressed={theme === 'all'}
          onClick={() => {
            setTheme('all');
            setShown(STEP);
          }}
        >
          All <span className="n">{designs.length}</span>
        </button>
        {themes.map(([t, n]) => (
          <button
            key={t}
            type="button"
            className="chip"
            aria-pressed={theme === t}
            onClick={() => {
              setTheme(t);
              setShown(STEP);
            }}
          >
            {themeLabel(t)} <span className="n">{n}</span>
          </button>
        ))}
      </div>

      <p className="shop-count" aria-live="polite">
        Showing {visible.length} of {list.length} design{list.length === 1 ? '' : 's'} that fit the{' '}
        {blank.short.toLowerCase()}
      </p>

      <ul className="dg">
        {visible.map((d) => (
          <li key={d.id}>
            <Link href={`/designs/${d.id}`} className="dg-cell">
              <Image
                src={`/assets/designs/${d.file}@sm.webp`}
                alt={d.alt}
                width={d.sw}
                height={d.sh}
                sizes="(min-width:1100px) 240px, (min-width:600px) 30vw, 46vw"
                loading="lazy"
              />
              <span className="dg-cap">
                <b>{d.name}</b>
                <i>{d.id.toUpperCase()}</i>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {shown < list.length && (
        <p className="dg-more">
          <button type="button" className="btn btn-ghost" onClick={() => setShown((s) => s + STEP)}>
            Show {Math.min(STEP, list.length - shown)} more
          </button>
        </p>
      )}
    </>
  );
}
