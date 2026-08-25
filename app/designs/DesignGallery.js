'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useMemo, useState, useDeferredValue } from 'react';
import { Icon } from '@/components/Icons';
import {
  designs,
  designThemes,
  searchDesigns,
  fromLabel,
  themeLabel,
} from '@/lib/catalog';

const GROUPS = [
  { id: 'all', label: 'Everything' },
  { id: 'design', label: 'Print designs' },
  { id: 'sippy', label: 'Sippy cup wraps' },
  { id: 'fliptop', label: 'Bottle wraps' },
];

const STEP = 30;

export default function DesignGallery({ initialTheme = 'all' }) {
  const [group, setGroup] = useState('all');
  const [theme, setTheme] = useState(initialTheme);
  const [q, setQ] = useState('');
  const [shown, setShown] = useState(STEP);
  const [allThemes, setAllThemes] = useState(false);
  const dq = useDeferredValue(q);

  const reset = () => setShown(STEP);

  const list = useMemo(() => {
    let out = designs;
    if (group !== 'all') out = out.filter((d) => d.group === group);
    if (theme !== 'all') out = out.filter((d) => d.themes.includes(theme));
    return searchDesigns(out, dq);
  }, [group, theme, dq]);

  const groupCounts = useMemo(() => {
    const c = { all: designs.length };
    for (const d of designs) c[d.group] = (c[d.group] || 0) + 1;
    return c;
  }, []);

  const themeCounts = useMemo(() => {
    const c = new Map();
    for (const d of designs) for (const t of d.themes) c.set(t, (c.get(t) || 0) + 1);
    return c;
  }, []);

  const topThemes = useMemo(
    () => designThemes.slice().sort((a, b) => (themeCounts.get(b) || 0) - (themeCounts.get(a) || 0)),
    [themeCounts]
  );

  const visible = list.slice(0, shown);
  const filtered = group !== 'all' || theme !== 'all' || q.trim() !== '';

  return (
    <>
      <div className="shop-bar">
        <div className="wrap dgbar">
          <div className="tabs" role="group" aria-label="Filter by design type">
            {GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={group === g.id}
                className="tab"
                onClick={() => {
                  setGroup(g.id);
                  reset();
                }}
              >
                {g.label}
                <span className="n">{groupCounts[g.id] || 0}</span>
              </button>
            ))}
          </div>

          <div className="dgsearch">
            <label htmlFor="dq" className="sr-only">
              Search designs
            </label>
            <input
              id="dq"
              type="search"
              value={q}
              placeholder="Search: faith, dinosaurs, Afrikaans, teacher"
              onChange={(e) => {
                setQ(e.target.value);
                reset();
              }}
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      <section className="sec" style={{ paddingTop: 'var(--s-3)' }}>
        <div className="wrap">
          <div className="chips" role="group" aria-label="Filter by theme">
            <button
              type="button"
              className="chip"
              aria-pressed={theme === 'all'}
              onClick={() => {
                setTheme('all');
                reset();
              }}
            >
              All themes
            </button>
            {(allThemes ? topThemes : topThemes.slice(0, 6)).map((t) => (
              <button
                key={t}
                type="button"
                className="chip"
                aria-pressed={theme === t}
                onClick={() => {
                  setTheme(t);
                  reset();
                }}
              >
                {themeLabel(t)} <span className="n">{themeCounts.get(t)}</span>
              </button>
            ))}
            {topThemes.length > 6 && (
              <button
                type="button"
                className="chip chip-more"
                aria-expanded={allThemes}
                onClick={() => setAllThemes((v) => !v)}
              >
                {allThemes ? 'Fewer filters' : `All ${topThemes.length} filters`}
              </button>
            )}
          </div>

          <p className="shop-count" aria-live="polite">
            {list.length === 0
              ? 'No designs match that. Try a different word, or ask us for it.'
              : `Showing ${visible.length} of ${list.length} design${list.length === 1 ? '' : 's'}`}
            {filtered && list.length > 0 && (
              <button
                type="button"
                className="linkish"
                onClick={() => {
                  setGroup('all');
                  setTheme('all');
                  setQ('');
                  reset();
                }}
              >
                Clear filters
              </button>
            )}
          </p>

          {list.length === 0 ? (
            <p className="dg-empty">
              We can also draw something from scratch. Tell us what you are picturing and we will quote the artwork.{' '}
              <Link href="/create">Start a custom design</Link>.
            </p>
          ) : (
            <>
              <h2 className="sr-only">Design library</h2>
              <ul className="dg">
                {visible.map((d, i) => (
                  <li key={d.id}>
                    <Link href={`/designs/${d.id}`} className="dg-cell">
                      <Image
                        src={`/assets/designs/${d.file}@sm.webp`}
                        alt={d.alt}
                        width={d.sw}
                        height={d.sh}
                        sizes="(min-width:1100px) 240px, (min-width:600px) 30vw, 46vw"
                        loading={i < 6 ? 'eager' : 'lazy'}
                      />
                      <span className="dg-cap">
                        <b>{d.name}</b>
                        <i>{d.id.toUpperCase()}</i>
                        <em>{fromLabel(d)}</em>
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
          )}

          <div className="dg-custom">
            <div>
              <h2>Not in the library</h2>
              <p>
                We draw custom designs too: a photo, a name, a verse, an inside joke. Artwork is quoted per job, and the
                item price stays the same.
              </p>
            </div>
            <p>
              <Link href="/create" className="btn btn-primary">
                <Icon name="gift" /> Start a custom design
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
