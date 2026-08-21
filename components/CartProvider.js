'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { brand, products } from '@/lib/site';

const KEY = 'gwp.giftbag.v1';

/** Safe wa.me URL ceiling. Beyond this some clients silently truncate. */
const MAX_WA_URL = 1900;

/** Reads the saved bag. Returns [] for unusable or absent storage. */
function readStored() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((l) => l && l.qty > 0 && products.some((p) => p.id === l.id));
  } catch {
    return [];
  }
}

/**
 * True only after the client has hydrated. The server and the first client
 * render must produce identical markup, so the bag starts empty on both and
 * the stored contents are applied once hydration is complete.
 */
const subscribeNoop = () => () => {};
const useHydrated = () =>
  useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
const Ctx = createContext(null);
export const useCart = () => useContext(Ctx);

export default function CartProvider({ children }) {
  // lines: [{ id, qty }] — product facts always resolved from site.json, never stored stale
  const hydrated = useHydrated();
  const [stored, setStored] = useState(null);
  const lines = useMemo(() => (hydrated ? stored ?? readStored() : []), [hydrated, stored]);
  const setLines = setStored; // stable: setState identity never changes
  const [open, setOpen] = useState(false);
  // Persist only once the user has actually changed the bag, so a page view
  // never rewrites storage with a value it just read.
  useEffect(() => {
    if (stored === null) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(stored));
    } catch {
      /* private mode or quota exceeded */
    }
  }, [stored]);

  const add = useCallback((id) => {
    setLines((prev) => {
      const ls = prev ?? readStored();
      const hit = ls.find((l) => l.id === id);
      return hit ? ls.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)) : [...ls, { id, qty: 1 }];
    });
    setOpen(true);
  }, [setLines]);

  const setQty = useCallback((id, qty) => {
    setLines((prev) => {
      const ls = prev ?? readStored();
      return qty <= 0 ? ls.filter((l) => l.id !== id) : ls.map((l) => (l.id === id ? { ...l, qty } : l));
    });
  }, [setLines]);

  const remove = useCallback((id) => setLines((prev) => (prev ?? readStored()).filter((l) => l.id !== id)), [setLines]);
  const clear = useCallback(() => setLines([]), [setLines]);

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

  /**
   * One WhatsApp message for the whole bag.
   *
   * Long bags are summarised rather than truncated. A wa.me URL past roughly
   * 2000 characters is silently cut short by some Android browsers and by
   * WhatsApp's own handler, which would deliver an incomplete order without
   * anyone noticing. Past that point we send the item count and totals and
   * ask to confirm the full list in chat.
   */
  const waHref = useMemo(() => {
    if (!items.length) return null;

    const line = (i) => {
      const unit = i.price ? `${brand.currency}${i.price.toFixed(2)}` : 'price on request';
      const qty = i.qty > 1 ? ` x${i.qty}` : '';
      return `\u2022 ${i.name}${qty} (${i.spec}) \u2014 ${unit}`;
    };

    const build = (body) => {
      let msg = `Hi Gifted with Purpose! I'd like to order:\n\n${body}`;
      if (priced.length) {
        msg += `\n\nSubtotal for the priced items: ${brand.currency}${subtotal.toFixed(2)}`;
      }
      if (hasUnpriced) {
        msg += `\n\nPlease confirm the price for the items marked "price on request".`;
      }
      if (items.some((i) => i.personalised)) {
        msg += `\n\nPersonalisation details (names/spelling): `;
      }
      return msg;
    };

    const full = build(items.map(line).join('\n'));
    const url = (m) => `https://wa.me/${brand.wa_number}?text=${encodeURIComponent(m)}`;
    if (url(full).length <= MAX_WA_URL) return url(full);

    // Fit as many itemised lines as the limit allows, then summarise the rest.
    const summarise = (keptItems) => {
      const rest = items.slice(keptItems.length);
      const restQty = rest.reduce((n, i) => n + i.qty, 0);
      return [
        ...keptItems.map(line),
        `\u2022 ...and ${rest.length} more design${rest.length === 1 ? '' : 's'} (${restQty} item${restQty === 1 ? '' : 's'}) \u2014 I'll confirm the full list in chat`,
      ].join('\n');
    };

    // Grow the itemised list only while the *final* message still fits.
    const kept = [];
    for (const i of items) {
      if (url(build(summarise([...kept, i]))).length > MAX_WA_URL) break;
      kept.push(i);
    }
    return url(build(summarise(kept)));
  }, [items, priced.length, subtotal, hasUnpriced]);

  const value = { items, count, subtotal, hasUnpriced, waHref, add, setQty, remove, clear, open, setOpen };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
