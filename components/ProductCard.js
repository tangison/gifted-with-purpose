'use client';

import Image from 'next/image';
import { Icon, Ruler, Expand } from './Icons';
import { collectionBySlug, priceLabel, waProduct, img, imgSm } from '@/lib/site';
import { useLightbox } from './LightboxProvider';
import { useCart } from './CartProvider';
import Disclosure from './Disclosure';

export default function ProductCard({ product: p, priority = false }) {
  const c = collectionBySlug(p.collection);
  const pl = priceLabel(p);
  const { open } = useLightbox();
  const { add, items } = useCart();
  const inBag = items.some((i) => i.id === p.id);
  const contain = p.shot === 'studio' || p.shot === 'flyer';

  return (
    <article className="card" style={{ '--accent': c.accent, '--accent-soft': c.accent_soft, '--accent-ink': c.accent_ink }}>
      <div className={`card-media${contain ? ' contain' : ''}`}>
        <div className="ar">
          <Image
            src={imgSm(p.image)}
            alt={`${p.name} — ${p.spec}`}
            fill
            sizes="(min-width:900px) 360px, 50vw"
            priority={priority}
            style={{ objectFit: contain ? 'contain' : 'cover' }}
          />
        </div>
        <div className="tags">
          {p.shot === 'studio' && <span className="tag tag-studio">Studio shot</span>}
          {p.lang && <span className="tag tag-lang">{p.lang}</span>}
          {p.personalised && <span className="tag tag-pers">Personalise it</span>}
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

      <div className="card-body">
        <h3>{p.name}</h3>
        <p className="spec">
          <Ruler />
          {p.spec}
        </p>

        {p.includes && (
          <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 5, margin: '2px 0 0' }}>
            {p.includes.map((i) => (
              <li
                key={i}
                style={{ fontSize: 12, background: 'var(--accent-soft)', padding: '4px 9px', borderRadius: 999 }}
              >
                {i}
              </li>
            ))}
          </ul>
        )}

        <div className="price-row">
          {pl ? (
            <span className="price">{pl}</span>
          ) : (
            <span className="price-ask">
              Price on request
              <br />
              <span style={{ fontWeight: 500, color: 'var(--muted)', fontSize: '12.5px' }}>Ask us on WhatsApp</span>
            </span>
          )}
        </div>

        <Disclosure summary="Details">
          <p>{p.desc}</p>
          {p.licensed && (
            <p style={{ marginTop: 8 }}>
              Character artwork is printed onto a purchasable blank cup. We are not affiliated with, or endorsed
              by, any character brand.
            </p>
          )}
        </Disclosure>

        <div className="card-actions">
          <button className="btn btn-add btn-sm btn-block" data-in={inBag} onClick={() => add(p.id)}>
            {inBag ? 'Added to bag' : 'Add to gift bag'}
          </button>
          <a className="btn btn-wa btn-sm btn-block" href={waProduct(p)} target="_blank" rel="noopener noreferrer">
            <Icon name="wa" /> Order this now
          </a>
        </div>
      </div>
    </article>
  );
}

export function SoonCard({ title, body, msg }) {
  return (
    <article className="card card-soon">
      <div className="ico">
        <Icon name="gift" />
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
      <a
        className="btn btn-ghost btn-sm"
        href={`https://wa.me/264814076649?text=${encodeURIComponent(msg)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ask what&rsquo;s new
      </a>
    </article>
  );
}
