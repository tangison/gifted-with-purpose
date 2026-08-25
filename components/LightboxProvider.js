'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Icon } from './Icons';

const Ctx = createContext({ open: () => {} });
export const useLightbox = () => useContext(Ctx);

export default function LightboxProvider({ children }) {
  const [item, setItem] = useState(null);
  const closeRef = useRef(null);
  const lastFocus = useRef(null);

  const open = useCallback((data) => {
    lastFocus.current = document.activeElement;
    setItem(data);
  }, []);

  const close = useCallback(() => {
    setItem(null);
    lastFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    document.body.style.overflow = item ? 'hidden' : '';
    // The dialog animates out of visibility:hidden. focus() is a no-op until the
    // element is actually visible, and one rAF is not always enough, so poll a
    // few frames and stop as soon as focus lands.
    let raf;
    if (item) {
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
      if (e.key === 'Escape' && item) close();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [item, close]);

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <div
        className="lb"
        data-open={!!item}
        role="dialog"
        aria-modal="true"
        aria-label="Product image"
        aria-hidden={!item}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <button className="lb-x" ref={closeRef} onClick={close} aria-label="Close">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {item && <img src={item.img} alt={item.title} />}
          <figcaption>
            <b>{item?.title}</b>
            <span>{item?.spec}</span>
          </figcaption>
          {item && (
            <a className="btn btn-wa lb-cta" href={item.wa} target="_blank" rel="noopener noreferrer">
              <Icon name="wa" /> Order this on WhatsApp
            </a>
          )}
        </figure>
      </div>
    </Ctx.Provider>
  );
}
