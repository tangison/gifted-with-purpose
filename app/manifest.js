import { brand } from '@/lib/site';

export default function manifest() {
  return {
    name: `${brand.name}: Personalised Gifts in Namibia`,
    short_name: brand.name,
    description:
      'Personalised tumblers, mugs and kids’ cups made with love in Namibia. Order on WhatsApp.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF9FB',
    theme_color: '#FEDDE8',
    lang: 'en-NA',
    categories: ['shopping', 'lifestyle'],
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
