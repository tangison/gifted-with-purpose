import { SITE_URL, collections } from '@/lib/site';

export default function sitemap() {
  const now = new Date();
  const staticRoutes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' },
    { url: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/how-to-order', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/faq', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/legal/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/legal/terms', priority: 0.3, changeFrequency: 'yearly' },
    { url: '/legal/cookies', priority: 0.3, changeFrequency: 'yearly' },
  ];
  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_URL}${r.url}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...collections.map((c) => ({
      url: `${SITE_URL}/collections/${c.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    })),
  ];
}
