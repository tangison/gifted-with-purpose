'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Icon } from './Icons';
import { useCart } from './CartProvider';
import { brand, imgSm } from '@/lib/site';

const BagIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M6 8h12l-1 12H7L6 8z" strokeLinejoin="round" />
    <path d="M9 8V6a3 3 0 016 0v2" strokeLinecap="round" />
  </svg>
);

export function CartButton() {
  const { count, setOpen } = useCart();
  return (
    <button className="cart-btn" onClick={() => setOpen(true)} aria-label={`Open gift bag, ${count} item${count === 1 ? '' : 's'}`}>
      <BagIcon />
      {count > 0 && <span className="cart-count" aria-hidden="true">{count}</span>}
    </button>
  );
}

export default function CartDrawer() {
  const { items, count, subtotal, hasUnpriced, waHref, setQty, remove, clear, open, setOpen } = useCart();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const last = useRef(null);

  useEffect(() => {
    if (open) {
      last.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      last.current?.focus?.();
    }
    const onKey = (e) => {
      if (e.key === 'Escape' && open) setOpen(false);
      if (e.key === 'Tab' && open && panelRef.current) {
        const f = panelRef.current.querySelectorAll('a[href],button:not([disabled])');
        if (!f.length) return;
        const first = f[0];
        const lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, setOpen]);

  return (
    <div className="cart" data-open={open} role="dialog" aria-modal="true" aria-label="Your gift bag">
      <div className="cart-bg" onClick={() => setOpen(false)} />
      <div className="cart-panel" ref={panelRef}>
        <div className="cart-head">
          <div>
            <h2>Your gift bag</h2>
            <p>{count === 0 ? 'Nothing added yet' : `${count} item${count === 1 ? '' : 's'} ready to send`}</p>
          </div>
          <button className="x" ref={closeRef} onClick={() => setOpen(false)} aria-label="Close gift bag">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <BagIcon />
            <h3>Your bag is empty</h3>
            <p>Add the designs you like and send them to us in one message.</p>
            <button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>
              Keep browsing
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((i) => (
                <div className="cart-row" key={i.id}>
                  <div className="cart-thumb">
                    <Image
                      src={imgSm(i.image)}
                      alt=""
                      fill
                      sizes="66px"
                      style={{ objectFit: i.shot === 'life' ? 'cover' : 'contain' }}
                    />
                  </div>
                  <div className="cart-info">
                    <h3>{i.name}</h3>
                    <p className="sp">{i.spec}</p>
                    {i.price ? (
                      <p className="pr">
                        {brand.currency}
                        {(i.price * i.qty).toFixed(2)}
                      </p>
                    ) : (
                      <p className="pr ask">Price on request</p>
                    )}
                    <div className="qty">
                      <button onClick={() => setQty(i.id, i.qty - 1)} aria-label={`Decrease quantity of ${i.name}`}>
                        &minus;
                      </button>
                      <span aria-live="polite">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} aria-label={`Increase quantity of ${i.name}`}>
                        +
                      </button>
                    </div>
                    <br />
                    <button className="cart-rm" onClick={() => remove(i.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-foot">
              {subtotal > 0 && (
                <div className="cart-tot">
                  <span>Subtotal{hasUnpriced ? ' (priced items)' : ''}</span>
                  <b>
                    {brand.currency}
                    {subtotal.toFixed(2)}
                  </b>
                </div>
              )}
              <p className="cart-note">
                {hasUnpriced
                  ? 'Some items need a quote. We confirm every price, personalisation and delivery option on WhatsApp before anything is made.'
                  : 'We confirm personalisation and delivery on WhatsApp before anything is made. No payment is taken on this site.'}
              </p>
              <a className="btn btn-wa btn-block" href={waHref} target="_blank" rel="noopener noreferrer">
                <Icon name="wa" /> Send bag on WhatsApp
              </a>
              <button className="cart-rm" style={{ display: 'block', margin: '10px auto 0' }} onClick={clear}>
                Empty bag
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
