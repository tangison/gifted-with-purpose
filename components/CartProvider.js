'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { brand, products } from '@/lib/site';

const KEY = 'gwp.giftbag.v1';
const Ctx = createContext(null);
export const useCart = () => useContext(Ctx);

export default function CartProvider({ children }) {
  // lines: [{ id, qty }] — product facts always resolved from site.json, never stored stale
  const [lines, setLines] = useState([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setLines(parsed.filter((l) => products.some((p) => p.id === l.id) && l.qty > 0));
        }
      }
    } catch {
      /* corrupt storage is not worth crashing over */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* private mode / quota */
    }
  }, [lines, ready]);

  const add = useCallback((id) => {
    setLines((ls) => {
      const hit = ls.find((l) => l.id === id);
      return hit ? ls.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)) : [...ls, { id, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((id, qty) => {
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty } : l))));
  }, []);

  const remove = useCallback((id) => setLines((ls) => ls.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const items = useMemo(
    () =>
      lines
        .map((l) => {
          const p = products.find((x) => x.id === l.id);
          return p ? { ...p, qty: l.qty } : null;
        })
        .filter(Boolean),
    [lines]
  );

  const count = items.reduce((n, i) => n + i.qty, 0);
  const priced = items.filter((i) => i.price);
  const subtotal = priced.reduce((n, i) => n + i.price * i.qty, 0);
  const hasUnpriced = items.some((i) => !i.price);

  /** One WhatsApp message for the whole bag. Prices only where confirmed. */
  const waHref = useMemo(() => {
    if (!items.length) return null;
    const lines_ = items.map((i) => {
      const unit = i.price ? `${brand.currency}${i.price.toFixed(2)}` : 'price on request';
      const qty = i.qty > 1 ? ` x${i.qty}` : '';
      return `• ${i.name}${qty} (${i.spec}) — ${unit}`;
    });
    let msg = `Hi Gifted with Purpose! I'd like to order:\n\n${lines_.join('\n')}`;
    if (priced.length) {
      msg += `\n\nSubtotal for the priced items: ${brand.currency}${subtotal.toFixed(2)}`;
    }
    if (hasUnpriced) {
      msg += `\n\nPlease confirm the price for the items marked "price on request".`;
    }
    if (items.some((i) => i.personalised)) {
      msg += `\n\nPersonalisation details (names/spelling): `;
    }
    return `https://wa.me/${brand.wa_number}?text=${encodeURIComponent(msg)}`;
  }, [items, priced.length, subtotal, hasUnpriced]);

  const value = { items, count, subtotal, hasUnpriced, waHref, add, setQty, remove, clear, open, setOpen, ready };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
