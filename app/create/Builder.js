'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState, useDeferredValue } from 'react';
import { Icon } from '@/components/Icons';
import { brand } from '@/lib/site';
import {
  blanks,
  adultBlanks,
  kidsBlanks,
  designs,
  designsForBlank,
  designById,
  blankById,
  blankPriceLabel,
  money,
  searchDesigns,
  themeLabel,
} from '@/lib/catalog';

const STEP = 18;

/**
 * The whole business model in one flow: few items, many designs, plus a
 * custom route. Nothing invents a price. Custom artwork is always
 * "quoted per job", never a number.
 */
export default function Builder({ initialItem = null, initialDesign = null }) {
  const startDesign = initialDesign ? designById(initialDesign) : null;
  const startItem =
    initialItem ||
    (startDesign ? blanks.find((b) => b.accepts.includes(startDesign.group))?.id : null);

  const [itemId, setItemId] = useState(startItem);
  const [mode, setMode] = useState(startDesign ? 'library' : null);
  const [designId, setDesignId] = useState(startDesign ? startDesign.id : null);
  const [brief, setBrief] = useState('');
  const [q, setQ] = useState('');
  const [shown, setShown] = useState(STEP);
  const [name, setName] = useState('');
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState('');
  const [tried, setTried] = useState(false);

  const dq = useDeferredValue(q);
  const item = itemId ? blankById(itemId) : null;
  const design = designId ? designById(designId) : null;

  // Without an item chosen we still show the whole library, so the custom
  // option and the designs are both reachable (and crawlable) from step one.
  const pool = useMemo(() => (item ? designsForBlank(item) : designs), [item]);
  const list = useMemo(() => searchDesigns(pool, dq), [pool, dq]);
  const visible = list.slice(0, shown);

  const errors = [];
  if (!item) errors.push('Choose an item in step one.');
  if (mode === null) errors.push('Choose a design in step two, or ask us to draw one.');
  if (mode === 'library' && !design) errors.push('Pick a design from the library.');
  if (mode === 'custom' && brief.trim().length < 10)
    errors.push('Describe your custom design in step two, at least a sentence.');

  const ready = errors.length === 0;

  const total = item && item.price != null && qty > 0 ? item.price * Number(qty) : null;

  const message = useMemo(() => {
    const l = ['Hi Gifted with Purpose, I would like to order:', ''];
    if (item) {
      l.push(`Item: ${item.name}`);
      l.push(`Price: ${item.price == null ? 'please confirm' : `${money(item.price)} each`}`);
    }
    if (mode === 'library' && design) {
      l.push(`Design: ${design.name} (${design.id.toUpperCase()})`);
    } else if (mode === 'custom') {
      l.push('Design: custom, please quote the artwork');
      if (brief.trim()) l.push(`What I am picturing: ${brief.trim()}`);
    }
    if (Number(qty) > 1) l.push(`Quantity: ${qty}`);
    if (total != null) l.push(`Item total: ${money(total)}${mode === 'custom' ? ' plus artwork' : ''}`);
    if (name.trim()) l.push(`Name to print: ${name.trim()}`);
    if (note.trim()) l.push(`Note: ${note.trim()}`);
    return l.join('\n');
  }, [item, mode, design, brief, qty, total, name, note]);

  const href = `https://wa.me/${brand.wa_number}?text=${encodeURIComponent(message)}`;

  const chooseItem = (id) => {
    setItemId(id);
    setShown(STEP);
    const d = designId ? designById(designId) : null;
    const b = blankById(id);
    if (d && b && !b.accepts.includes(d.group)) setDesignId(null);
  };

  return (
    <div className="bld">
      <div className="wrap bld-grid">
        <div className="bld-steps">
          {/* Step 1 */}
          <section className="bld-step" aria-labelledby="s1">
            <h2 id="s1">
              <span className="bld-n">1</span> Pick the item
            </h2>
            <p className="bld-hint">This is what sets the price.</p>

            <p className="bld-group">For grown-ups</p>
            <ul className="bld-items">
              {adultBlanks.map((b) => (
                <li key={b.id}>
                  <button
                    type="button"
                    className="bld-item"
                    aria-pressed={itemId === b.id}
                    onClick={() => chooseItem(b.id)}
                  >
                    <span className="bld-item-media">
                      {b.blank_photo ? (
                        <Image
                          src={`/assets/blanks/${b.blank_photo}@sm.webp`}
                          alt=""
                          fill
                          sizes="160px"
                          style={{ objectFit: 'contain' }}
                        />
                      ) : b.photo ? (
                        <Image
                          src={`/assets/products/${b.photo}@sm.jpg`}
                          alt=""
                          fill
                          sizes="160px"
                          style={{ objectFit: 'contain' }}
                        />
                      ) : (
                        <Icon name="cup" />
                      )}
                    </span>
                    <span className="bld-item-name">{b.name}</span>
                    <span className={`bld-item-price${b.price == null ? ' ask' : ''}`}>
                      {blankPriceLabel(b)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <p className="bld-group">For kids</p>
            <ul className="bld-items">
              {kidsBlanks.map((b) => (
                <li key={b.id}>
                  <button
                    type="button"
                    className="bld-item"
                    aria-pressed={itemId === b.id}
                    onClick={() => chooseItem(b.id)}
                  >
                    <span className="bld-item-media">
                      {b.blank_photo ? (
                        <Image
                          src={`/assets/blanks/${b.blank_photo}@sm.webp`}
                          alt=""
                          fill
                          sizes="160px"
                          style={{ objectFit: 'contain' }}
                        />
                      ) : b.photo ? (
                        <Image
                          src={`/assets/products/${b.photo}@sm.jpg`}
                          alt=""
                          fill
                          sizes="160px"
                          style={{ objectFit: 'contain' }}
                        />
                      ) : (
                        <Icon name="cup" />
                      )}
                    </span>
                    <span className="bld-item-name">{b.name}</span>
                    <span className={`bld-item-price${b.price == null ? ' ask' : ''}`}>
                      {blankPriceLabel(b)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </section>

          {/* Step 2 */}
          <section className="bld-step" aria-labelledby="s2">
            <h2 id="s2">
              <span className="bld-n">2</span> Pick the design
            </h2>
            <>
                {!item && (
                  <p className="bld-locked">
                    Pick an item above and this list narrows to the designs that fit it. You can also choose a design
                    first and we will match the item to it.
                  </p>
                )}
                <div className="bld-modes">
                  <button
                    type="button"
                    className="bld-mode"
                    aria-pressed={mode === 'library'}
                    onClick={() => setMode('library')}
                  >
                    <b>Choose a ready-made design</b>
                    <span>
                      {item
                        ? `${pool.length} fit the ${item.short.toLowerCase()}. No extra cost.`
                        : `${pool.length} in the library. No extra cost.`}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="bld-mode"
                    aria-pressed={mode === 'custom'}
                    onClick={() => setMode('custom')}
                  >
                    <b>Ask us to draw one</b>
                    <span>Your photo, name, verse or idea. Artwork quoted per job.</span>
                  </button>
                </div>

                {mode === 'library' && (
                  <div className="bld-lib">
                    <label htmlFor="bq" className="sr-only">
                      Search designs
                    </label>
                    <input
                      id="bq"
                      type="search"
                      className="bld-search"
                      value={q}
                      placeholder="Search: faith, dinosaurs, teacher, name"
                      onChange={(e) => {
                        setQ(e.target.value);
                        setShown(STEP);
                      }}
                      autoComplete="off"
                    />
                    <p className="shop-count" aria-live="polite">
                      {list.length === 0
                        ? 'Nothing matches that. Try another word, or ask us to draw it.'
                        : `${visible.length} of ${list.length} shown`}
                    </p>
                    <ul className="bld-picks">
                      {visible.map((d) => (
                        <li key={d.id}>
                          <button
                            type="button"
                            className="bld-pick"
                            aria-pressed={designId === d.id}
                            onClick={() => {
                              setDesignId(d.id);
                              if (!itemId) {
                                const fit = blanks.find((b) => b.accepts.includes(d.group));
                                if (fit) setItemId(fit.id);
                              }
                            }}
                          >
                            <Image
                              src={`/assets/designs/${d.file}@sm.webp`}
                              alt={d.alt}
                              width={d.sw}
                              height={d.sh}
                              sizes="150px"
                              loading="lazy"
                            />
                            <span>{d.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    {shown < list.length && (
                      <p className="dg-more">
                        <button type="button" className="btn btn-ghost" onClick={() => setShown((s) => s + STEP)}>
                          Show more
                        </button>
                      </p>
                    )}
                  </div>
                )}

                {mode === 'custom' && (
                  <div className="bld-custom">
                    <p className="fld">
                      <label htmlFor="brief">What are you picturing</label>
                      <textarea
                        id="brief"
                        rows={4}
                        value={brief}
                        onChange={(e) => setBrief(e.target.value)}
                        placeholder="A verse in Afrikaans with proteas around it, in soft pink, for my mother's birthday."
                        maxLength={600}
                      />
                    </p>
                    <p className="bld-hint">
                      Photos and reference pictures come across on WhatsApp once we are chatting. Artwork is quoted per
                      job, so you see the number before anything is made.
                    </p>
                  </div>
                )}
            </>
          </section>

          {/* Step 3 */}
          <section className="bld-step" aria-labelledby="s3">
            <h2 id="s3">
              <span className="bld-n">3</span> Add the details
            </h2>
            <div className="bld-fields">
              <p className="fld">
                <label htmlFor="bname">Name to print</label>
                <input
                  id="bname"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Exact spelling, or leave blank"
                  maxLength={40}
                  autoComplete="off"
                />
              </p>
              <p className="fld fld-qty">
                <label htmlFor="bqty">Quantity</label>
                <input
                  id="bqty"
                  type="number"
                  min="1"
                  max="99"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  inputMode="numeric"
                />
              </p>
              <p className="fld fld-wide">
                <label htmlFor="bnote">Anything else</label>
                <input
                  id="bnote"
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="When you need it, colour preferences, who it is for"
                  maxLength={200}
                  autoComplete="off"
                />
              </p>
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="bld-sum" aria-labelledby="sum">
          <h2 id="sum">Your gift so far</h2>

          <dl>
            <div>
              <dt>Item</dt>
              <dd>{item ? item.name : <i>Not chosen</i>}</dd>
            </div>
            <div>
              <dt>Design</dt>
              <dd>
                {mode === 'library' && design ? (
                  `${design.name} (${design.id.toUpperCase()})`
                ) : mode === 'custom' ? (
                  'Custom, quoted per job'
                ) : (
                  <i>Not chosen</i>
                )}
              </dd>
            </div>
            <div>
              <dt>Quantity</dt>
              <dd>{Number(qty) || 1}</dd>
            </div>
            {name.trim() && (
              <div>
                <dt>Name</dt>
                <dd>{name.trim()}</dd>
              </div>
            )}
          </dl>

          <p className="bld-total">
            {item == null
              ? 'Pick an item to see the price.'
              : item.price == null
                ? `${item.name}: price on request.`
                : `${money(item.price)} each. Item total ${money(total)}.`}
          </p>
          {mode === 'custom' && <p className="bld-plus">Plus artwork, quoted per job.</p>}

          {tried && errors.length > 0 && (
            <div className="bld-errs" role="alert">
              <ul>
                {errors.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          {ready ? (
            <a className="btn btn-wa bld-send" href={href} target="_blank" rel="noopener noreferrer">
              <Icon name="wa" /> Send it on WhatsApp
            </a>
          ) : (
            <button type="button" className="btn btn-wa bld-send" onClick={() => setTried(true)}>
              <Icon name="wa" /> Send it on WhatsApp
            </button>
          )}

          <details className="bld-prev">
            <summary>See the message first</summary>
            <pre>{message}</pre>
          </details>

          <p className="bld-fine">
            Opens WhatsApp with this written out. Nothing is charged here, no card details are asked for anywhere on
            this site, and nothing you type is stored.
          </p>
        </aside>
      </div>
    </div>
  );
}
