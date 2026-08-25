'use client';

import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icons';
import { waDesignOrder, blankPriceLabel, money } from '@/lib/catalog';

/**
 * Pick the item, add a name, send it. No backend, no stored lead.
 * The price shown is always the chosen blank's own price, never computed
 * or estimated. Unpriced blanks say so and the message asks for a quote.
 */
export default function DesignOrder({ design, blanks }) {
  const [blankId, setBlankId] = useState(blanks[0]?.id || '');
  const [name, setName] = useState('');
  const [qty, setQty] = useState(1);

  const blank = useMemo(() => blanks.find((b) => b.id === blankId), [blanks, blankId]);

  const total =
    blank && blank.price != null && qty > 0 ? money(blank.price * Number(qty)) : null;

  const href = waDesignOrder({
    design,
    blank,
    name: design.personalisable ? name.trim() : '',
    qty: Number(qty) || 1,
  });

  return (
    <div className="dord">
      <fieldset className="dord-set">
        <legend>Choose the item</legend>
        <div className="dord-opts">
          {blanks.map((b) => (
            <label key={b.id} className="dord-opt" data-on={blankId === b.id}>
              <input
                type="radio"
                name="blank"
                value={b.id}
                checked={blankId === b.id}
                onChange={() => setBlankId(b.id)}
              />
              <span className="dord-opt-name">{b.name}</span>
              <span className={`dord-opt-price${b.price == null ? ' ask' : ''}`}>
                {blankPriceLabel(b)}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="dord-row">
        {design.personalisable && (
          <p className="fld">
            <label htmlFor="dord-name">Name to print</label>
            <input
              id="dord-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Exact spelling"
              maxLength={40}
              autoComplete="off"
            />
          </p>
        )}
        <p className="fld fld-qty">
          <label htmlFor="dord-qty">Quantity</label>
          <input
            id="dord-qty"
            type="number"
            min="1"
            max="99"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            inputMode="numeric"
          />
        </p>
      </div>

      <p className="dord-total" aria-live="polite">
        {blank == null
          ? 'Choose an item to see the price.'
          : blank.price == null
            ? `${blank.name}: price on request. We will confirm on WhatsApp.`
            : `${qty} \u00d7 ${blank.name} at ${money(blank.price)} each. Total ${total}.`}
      </p>

      <a className="btn btn-wa dord-cta" href={href} target="_blank" rel="noopener noreferrer">
        <Icon name="wa" /> Order this on WhatsApp
      </a>
      <p className="dord-fine">
        Opens WhatsApp with the design reference, the item and the price already written out. Nothing is
        charged here and nothing is stored on this site.
      </p>
    </div>
  );
}
