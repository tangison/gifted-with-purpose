import data from '@/data/site.json';

/**
 * Canonical origin.
 *
 * Vercel serves the site on www and 307s the apex to it, so the canonical
 * must be www too. Pointing it at the apex made every page declare a
 * canonical that immediately redirects, which Google treats as a conflicting
 * signal. Every canonical tag,
 * sitemap entry, JSON-LD @id and Open Graph URL derives from this, so a
 * single env var moves the whole site. Preview deploys keep their own
 * hostname so they never claim canonical over production.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  (process.env.VERCEL_ENV === 'production'
    ? 'https://www.giftedwithpurpose.net'
    : process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000');

/** True only on the real domain. Preview builds must not be indexed. */
export const IS_PRODUCTION_HOST = SITE_URL === 'https://www.giftedwithpurpose.net';

export const brand = data.brand;
export const collections = data.collections;
export const products = data.products;
export const comingSoon = data.coming_soon;

export const collectionBySlug = (slug) => collections.find((c) => c.slug === slug);
export const productsIn = (slug) => products.filter((p) => p.collection === slug);
export const featured = () => products.filter((p) => p.featured);

export function priceLabel(p) {
  return p.price ? `${brand.currency}${p.price.toFixed(2)}` : null;
}

export function wa(text) {
  return `https://wa.me/${brand.wa_number}?text=${encodeURIComponent(text)}`;
}

export function waProduct(p) {
  const pl = priceLabel(p);
  let msg = `Hi Gifted with Purpose! I'd like to order the *${p.name}*`;
  if (p.spec) msg += ` (${p.spec})`;
  msg += pl ? `, ${pl}.` : '. Could you please confirm the price?';
  if (p.personalised) msg += ' The name I\u2019d like printed is: ';
  return wa(msg);
}

export const img = (name) => `/assets/products/${name}.jpg`;
export const imgSm = (name) => `/assets/products/${name}@sm.jpg`;

/** Prices that appear in the client's own supplied ad artwork. */
export const confirmedPrices = products.filter((p) => p.price).length;
