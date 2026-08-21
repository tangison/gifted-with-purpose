'use client';

import Image from 'next/image';
import { Icon, Ruler, Expand } from './Icons';
import { collectionBySlug, priceLabel, waProduct, img, imgSm } from '@/lib/site';
import { useLightbox } from './LightboxProvider';

export default function ProductCard({ product: p, priority = false }) {
  const c = collectionBySlug(p.collection);
  const pl = priceLabel(p);
  const { open } = useLightbox();
  const contain = p.shot === 'studio' || p.shot === 'flyer';

  return (
    <article className="card rv" style={{ '--accent': c.accent, '--accent-soft': c.accent_soft }}>
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
        <p className="desc">{p.desc}</p>

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

        {p.licensed && (
          <p className="note">
            Character artwork is printed onto a purchasable blank cup. We are not affiliated with, or endorsed by, any
            character brand.
          </p>
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

        <a className="btn btn-wa btn-sm btn-block" href={waProduct(p)} target="_blank" rel="noopener noreferrer">
          <Icon name="wa" /> Order on WhatsApp
        </a>
      </div>
    </article>
  );
}

export function SoonCard({ title, body, msg }) {
  return (
    <article className="card card-soon rv">
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
