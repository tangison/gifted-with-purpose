'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { collections, products, productsIn } from '@/lib/site';

/**
 * One shop page, filtered in place. Tabs rather than five separate URLs, because
 * the content is parallel (pick between categories), not sequential.
 */
export default function ShopClient() {
  const [active, setActive] = useState('all');

  const shown = useMemo(
    () => (active === 'all' ? products : products.filter((p) => p.collection === active)),
    [active]
  );

  const tabs = [
    { slug: 'all', name: 'Everything', accent: 'var(--ink)', n: products.length },
    ...collections.map((c) => ({
      slug: c.slug,
      name: c.name,
      accent: c.accent,
      n: productsIn(c.slug).length,
    })),
  ];

  return (
    <>
      <div className="shop-bar">
        <div className="wrap">
          <div className="tabs" role="tablist" aria-label="Filter by collection">
            {tabs.map((t) => (
              <button
                key={t.slug}
                role="tab"
                aria-selected={active === t.slug}
                aria-controls="shop-grid"
                className="tab"
                onClick={() => setActive(t.slug)}
              >
                {t.slug !== 'all' && <i className="dot" style={{ background: t.accent }} />}
                {t.name}
                <span className="n">{t.n}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="sec" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <p className="shop-count" aria-live="polite">
            Showing {shown.length} design{shown.length === 1 ? '' : 's'}
            {active !== 'all' && ` in ${tabs.find((t) => t.slug === active).name}`}
          </p>
          <h2 className="sr-only">
            {active === 'all' ? 'All designs' : `${tabs.find((t) => t.slug === active).name} designs`}
          </h2>
          <div className="grid" id="shop-grid" role="tabpanel">
            {shown.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 2} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
