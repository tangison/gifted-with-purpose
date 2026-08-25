'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { work, workTags, themeLabel } from '@/lib/catalog';

const STEP = 18;

export default function WorkGallery({ initialTag = 'all' }) {
  const valid = workTags.includes(initialTag) ? initialTag : 'all';
  const [tag, setTag] = useState(valid);
  const [shown, setShown] = useState(STEP);
  const [open, setOpen] = useState(null);
  const closeRef = useRef(null);
  const lastFocus = useRef(null);

  const show = useCallback((w) => {
    lastFocus.current = document.activeElement;
    setOpen(w);
  }, []);

  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus?.();
  }, []);

  // Escape must work wherever focus is, not only inside the dialog, and the
  // page behind must not scroll while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    // The dialog animates out of visibility:hidden. focus() is a no-op until the
    // element is actually visible, and one rAF is not always enough, so poll a
    // few frames and stop as soon as focus lands.
    let raf;
    if (open) {
      let tries = 0;
      const grab = () => {
        const el = closeRef.current;
        if (el && el.offsetParent !== null) {
          el.focus();
          if (document.activeElement === el) return;
        }
        if (tries++ < 20) raf = requestAnimationFrame(grab);
      };
      raf = requestAnimationFrame(grab);
    }
    const onKey = (e) => {
      if (e.key === 'Escape' && open) close();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  const counts = useMemo(() => {
    const c = new Map();
    for (const w of work) for (const t of w.tags) c.set(t, (c.get(t) || 0) + 1);
    return c;
  }, []);

  const list = useMemo(() => (tag === 'all' ? work : work.filter((w) => w.tags.includes(tag))), [tag]);
  const visible = list.slice(0, shown);

  return (
    <>
      <section className="sec" style={{ paddingTop: 'var(--s-3)' }}>
        <div className="wrap">
          <div className="chips" role="group" aria-label="Filter finished work">
            <button
              type="button"
              className="chip"
              aria-pressed={tag === 'all'}
              onClick={() => {
                setTag('all');
                setShown(STEP);
              }}
            >
              Everything <span className="n">{work.length}</span>
            </button>
            {workTags.slice(0, 7).map((t) => (
              <button
                key={t}
                type="button"
                className="chip"
                aria-pressed={tag === t}
                onClick={() => {
                  setTag(t);
                  setShown(STEP);
                }}
              >
                {themeLabel(t)} <span className="n">{counts.get(t)}</span>
              </button>
            ))}
          </div>

          <p className="shop-count" aria-live="polite">
            Showing {visible.length} of {list.length} photograph{list.length === 1 ? '' : 's'}
          </p>

          <h2 className="sr-only">Finished work</h2>
          <ul className="wg">
            {visible.map((w, i) => (
              <li key={w.id}>
                <button
                  type="button"
                  className="wg-cell"
                  onClick={() => show(w)}
                  aria-label={`View larger: ${w.alt}`}
                >
                  <Image
                    src={`/assets/work/${w.file}@sm.webp`}
                    alt={w.alt}
                    width={w.sw}
                    height={w.sh}
                    sizes="(min-width:1100px) 260px, (min-width:600px) 31vw, 47vw"
                    loading={i < 6 ? 'eager' : 'lazy'}
                  />
                </button>
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
        </div>
      </section>

      <div
        className="lb"
        data-open={!!open}
        role="dialog"
        aria-modal="true"
        aria-label="Photograph of finished work"
        aria-hidden={!open}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <button className="lb-x" ref={closeRef} onClick={close} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {open && (
          <figure>
            <Image
              src={`/assets/work/${open.file}.webp`}
              alt={open.alt}
              width={open.w}
              height={open.h}
              sizes="(min-width:900px) 520px, 94vw"
            />
            <figcaption>
              <span>{open.alt}</span>
            </figcaption>
            <Link className="btn btn-primary lb-cta" href="/create" onClick={close}>
              Make one like this
            </Link>
          </figure>
        )}
      </div>
    </>
  );
}
