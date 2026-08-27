import { SITE_URL, collections } from '@/lib/site';
import { designs, blanks, shapes } from '@/lib/catalog';

export default function sitemap() {
  const now = new Date();
  const staticRoutes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' },
    { url: '/shop', priority: 0.95, changeFrequency: 'weekly' },
    { url: '/designs', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/blanks', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/create', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/work', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/how-to-order', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/faq', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/sitemap-page', priority: 0.3, changeFrequency: 'monthly' },
    { url: '/legal/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/legal/terms', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/legal/cookies', priority: 0.3, changeFrequency: 'yearly' },
  ];
  return [
    ...staticRoutes.map((r) => ({
      // '/' would emit a trailing slash the canonical tag does not use
      url: r.url === '/' ? SITE_URL : `${SITE_URL}${r.url}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...collections.map((c) => ({
      url: `${SITE_URL}/collections/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    })),
    ...blanks.map((b) => ({
      url: `${SITE_URL}/shop/${b.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    })),
    ...shapes.map((s) => ({
      url: `${SITE_URL}/blanks/${s.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })),
    ...designs.map((d) => ({
      url: `${SITE_URL}/designs/${d.id}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
