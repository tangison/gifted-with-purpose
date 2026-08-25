'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Icon } from '@/components/Icons';
import { brand, collections } from '@/lib/site';

const PRODUCTS = [
  '600ml stainless steel tumbler',
  '450ml stainless steel tumbler',
  '400ml stainless steel tumbler',
  '355ml stainless steel tumbler',
  '355ml wine tumbler',
  '450ml glass tumbler with bamboo lid',
  '11oz mug',
  'Kids sippy cup',
  'Kids flip-top bottle',
  'Teacher Appreciation gift set',
  'Not sure yet, please advise',
];

/**
 * Builds a WhatsApp message from structured fields and opens it.
 * Nothing is posted to a server: there is no backend, no stored lead and no
 * third party. The submit action is a wa.me deep link, so the customer keeps
 * the whole order in one thread.
 */
export default function OrderForm() {
  const [f, setF] = useState({
    name: '',
    product: '',
    collection: '',
    design: '',
    personalise: '',
    qty: '1',
    notes: '',
  });
  const [touched, setTouched] = useState(false);

  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  const valid = f.name.trim().length > 1 && f.product !== '';

  const href = useMemo(() => {
    const L = [];
    L.push(`Hi Gifted with Purpose! I would like to order.`);
    L.push('');
    L.push(`Name: ${f.name.trim()}`);
    if (f.product) L.push(`Product: ${f.product}`);
    if (f.collection) L.push(`Collection: ${f.collection}`);
    if (f.design.trim()) L.push(`Design reference: ${f.design.trim()}`);
    if (f.personalise.trim()) L.push(`Personalisation to print: ${f.personalise.trim()}`);
    if (f.qty && f.qty !== '1') L.push(`Quantity: ${f.qty}`);
    if (f.notes.trim()) L.push(`Notes: ${f.notes.trim()}`);
    L.push('');
    L.push('Please confirm the price and how soon it can be ready.');
    return `https://wa.me/${brand.wa_number}?text=${encodeURIComponent(L.join('\n'))}`;
  }, [f]);

  return (
    <form
      className="ofm"
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
        if (!valid) return;
        window.open(href, '_blank', 'noopener,noreferrer');
      }}
      noValidate
    >
      <div className="ofm-row">
        <label htmlFor="of-name">
          Your name <span aria-hidden="true">*</span>
        </label>
        <input
          id="of-name"
          type="text"
          autoComplete="name"
          value={f.name}
          onChange={set('name')}
          onBlur={() => setTouched(true)}
          aria-required="true"
          aria-invalid={touched && f.name.trim().length < 2 ? 'true' : undefined}
          aria-describedby={touched && f.name.trim().length < 2 ? 'of-name-err' : undefined}
          placeholder="Who are we speaking to?"
        />
        {touched && f.name.trim().length < 2 && (
          <p className="ofm-err" id="of-name-err" role="alert">
            Please tell us your name so we know who we are helping.
          </p>
        )}
      </div>

      <div className="ofm-row">
        <label htmlFor="of-product">
          What would you like <span aria-hidden="true">*</span>
        </label>
        <select
          id="of-product"
          value={f.product}
          onChange={set('product')}
          onBlur={() => setTouched(true)}
          aria-required="true"
          aria-invalid={touched && !f.product ? 'true' : undefined}
          aria-describedby={touched && !f.product ? 'of-product-err' : undefined}
        >
          <option value="">Choose a product</option>
          {PRODUCTS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
        {touched && !f.product && (
          <p className="ofm-err" id="of-product-err" role="alert">
            Pick a product, or choose &ldquo;Not sure yet&rdquo; and we will advise.
          </p>
        )}
      </div>

      <div className="ofm-two">
        <div className="ofm-row">
          <label htmlFor="of-col">Collection</label>
          <select id="of-col" value={f.collection} onChange={set('collection')}>
            <option value="">Any</option>
            {collections.map((c) => (
              <option key={c.slug} value={`${c.name} (${c.sub})`}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="ofm-row">
          <label htmlFor="of-qty">How many</label>
          <input id="of-qty" type="number" min="1" max="200" inputMode="numeric" value={f.qty} onChange={set('qty')} />
        </div>
      </div>

      <div className="ofm-row">
        <label htmlFor="of-design">Design reference</label>
        <input
          id="of-design"
          type="text"
          value={f.design}
          onChange={set('design')}
          placeholder="For example DESIGN-33, from the design library"
          aria-describedby="of-design-help"
        />
        <p className="ofm-help" id="of-design-help">
          Found one you like on the <Link href="/designs">pick your design</Link> page? Put its reference here.
        </p>
      </div>

      <div className="ofm-row">
        <label htmlFor="of-pers">Name or wording to print</label>
        <input
          id="of-pers"
          type="text"
          value={f.personalise}
          onChange={set('personalise')}
          placeholder="Exact spelling, please"
          aria-describedby="of-pers-help"
        />
        <p className="ofm-help" id="of-pers-help">
          We print exactly what you send, so check the spelling.
        </p>
      </div>

      <div className="ofm-row">
        <label htmlFor="of-notes">Anything else</label>
        <textarea
          id="of-notes"
          rows={3}
          value={f.notes}
          onChange={set('notes')}
          placeholder="When you need it, who it is for, a colour you prefer"
        />
      </div>

      <button className="btn btn-wa btn-block" type="submit">
        <Icon name="wa" /> Send this on WhatsApp
      </button>

      <p className="ofm-note">
        This opens WhatsApp with your answers already written out. Nothing is sent or stored anywhere until you press
        send in WhatsApp yourself.
      </p>
    </form>
  );
}
