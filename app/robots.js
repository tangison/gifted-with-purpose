import { SITE_URL, IS_PRODUCTION_HOST } from '@/lib/site';

export default function robots() {
  // Preview and branch deploys must never compete with the real domain in
  // Google or Bing. Only giftedwithpurpose.net is crawlable.
  if (!IS_PRODUCTION_HOST) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Nothing here is private, but query-string duplicates of /designs
        // would otherwise be crawled as separate URLs.
        disallow: ['/api/', '/_next/static/chunks/'],
      },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
