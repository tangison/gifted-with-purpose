'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Icon, Expand } from './Icons';
import { collectionBySlug, priceLabel, waProduct, img, imgSm } from '@/lib/site';
import { useLightbox } from './LightboxProvider';
import { useCart } from './CartProvider';
import Disclosure from './Disclosure';

/**
 * Editorial "gift ticket" card.
 *
 * Deliberately not the standard photo-box-then-text-stack every shop uses:
 * the price sits on the photo as a punched tag, the collection name runs
 * vertically up the spine, and a perforated rule separates the stub. The
 * index numeral gives the grid a rhythm so 27 cards do not read as 27
 * identical rectangles.
 */
export default function ProductCard({ product: p, priority = false, index = 0 }) {
  const c = collectionBySlug(p.collection);
  const pl = priceLabel(p);
  const { open } = useLightbox();
  const { add, items } = useCart();
  const inBag = items.some((i) => i.id === p.id);
  const contain = p.shot === 'studio' || p.shot === 'flyer';

  return (
    <article
      className="tkt"
      style={{ '--accent': c.accent, '--accent-soft': c.accent_soft, '--accent-ink': c.accent_ink }}
    >
      <div className={`tkt-media${contain ? ' contain' : ''}`}>
        <div className="ar">
          <Image
            src={imgSm(p.image)}
            alt={`${p.name}, ${p.spec}`}
            fill
            sizes="(min-width:900px) 360px, 50vw"
            priority={priority}
            style={{ objectFit: contain ? 'contain' : 'cover' }}
          />
        </div>

        <span className="tkt-spine" aria-hidden="true">
          {c.name}
        </span>

        <span className="tkt-no" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>

        {pl ? (
          <span className="tkt-price">{pl}</span>
        ) : (
          <span className="tkt-price tkt-price-ask">Ask us</span>
        )}

        <div className="tkt-flags">
          {p.lang && <span className="flag-lang">{p.lang}</span>}
          {p.personalised && <span className="flag-pers">Add a name</span>}
        </div>

        <button
          className="zoom"
          type="button"
          onClick={() =>
            open({
              img: img(p.image),
              title: p.name,
              spec: `${p.spec}${pl ? ` · ${pl}` : ' · Price on request'}`,
              wa: waProduct(p),
            })
          }
          aria-label={`Enlarge photo of ${p.name}`}
        >
          <Expand />
        </button>
      </div>

      <div className="tkt-perf" aria-hidden="true" />

      <div className="tkt-stub">
        <h3>{p.name}</h3>
        <p className="tkt-spec">{p.spec}</p>

        {p.includes && (
          <ul className="tkt-inc">
            {p.includes.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}

        {!pl && <p className="tkt-ask">We will quote you on WhatsApp before anything is made.</p>}

        <Disclosure summary="What is on it">
          <p>{p.desc}</p>
          {p.licensed && (
            <p style={{ marginTop: 8 }}>
              Character artwork printed onto a blank cup. See our <Link href="/legal/terms">terms</Link>.
            </p>
          )}
        </Disclosure>

        <div className="tkt-actions">
          <button className="btn btn-add btn-sm btn-block" data-in={inBag} onClick={() => add(p.id)}>
            {inBag ? 'In your bag' : 'Add to bag'}
          </button>
          <a className="btn btn-wa btn-sm btn-block" href={waProduct(p)} target="_blank" rel="noopener noreferrer">
            <Icon name="wa" /> Order now
          </a>
        </div>
      </div>
    </article>
  );
}

export function SoonCard({ title, body, msg }) {
  return (
    <article className="tkt tkt-soon">
      <div className="tkt-soon-in">
        <span className="tkt-soon-mark" aria-hidden="true">
          +
        </span>
        <h3>{title}</h3>
        <p>{body}</p>
        <a
          className="btn btn-ghost btn-sm"
          href={`https://wa.me/264814076649?text=${encodeURIComponent(msg)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ask what is new
        </a>
      </div>
    </article>
  );
}
