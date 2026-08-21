import './fonts.css';
import './site.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LightboxProvider from '@/components/LightboxProvider';
import CartProvider from '@/components/CartProvider';
import CartDrawer from '@/components/CartDrawer';
import ScrollTop from '@/components/ScrollTop';
import SiteEffects, { StickyWa } from '@/components/SiteEffects';
import { SITE_URL, brand, products } from '@/lib/site';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Gifted with Purpose — Personalised Gifts in Namibia',
    template: '%s | Gifted with Purpose',
  },
  description:
    'Personalised tumblers, mugs and kids’ cups made with love in Namibia. Self love, faith-based, kids and teacher appreciation gifts. Order on WhatsApp.',
  applicationName: 'Gifted with Purpose',
  authors: [{ name: 'Geneveve Gift Shop t/a Gifted with Purpose' }],
  creator: 'Geneveve Gift Shop',
  publisher: 'Geneveve Gift Shop',
  keywords: [
    'personalised gifts Namibia',
    'personalized tumblers Namibia',
    'custom mugs Windhoek',
    'affirmation tumblers',
    'faith based gifts Namibia',
    'kids sippy cups Namibia',
    'teacher appreciation gifts Namibia',
    'Afrikaans scripture tumbler',
    'Spreuke 31 beker',
    'gifts Windhoek',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_NA',
    url: SITE_URL,
    siteName: 'Gifted with Purpose',
    title: 'Gifted with Purpose — Personalised Gifts in Namibia',
    description:
      'Personalised tumblers, mugs and kids’ cups made with love in Namibia. Order on WhatsApp.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gifted with Purpose — personalised gifts made with love in Namibia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gifted with Purpose — Personalised Gifts in Namibia',
    description: 'Personalised tumblers, mugs and kids’ cups made with love in Namibia.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/assets/logos/gifted-with-purpose-logo.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  category: 'shopping',
};

export const viewport = {
  themeColor: '#FEDDE8',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

/**
 * Structured data. Only facts verified from the client's own assets are emitted:
 * name, legal name, tagline, Namibia location, WhatsApp/phone, currency.
 * No address, no opening hours, no ratings, no reviews — none were supplied.
 */
function schema() {
  const org = {
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: brand.name,
    legalName: brand.legal,
    alternateName: brand.legal,
    description:
      'A mother–daughter team in Namibia creating personalised gifts: affirmation, faith-based, kids and teacher appreciation drinkware.',
    slogan: brand.tagline,
    url: SITE_URL,
    telephone: `+${brand.wa_number}`,
    logo: `${SITE_URL}/assets/logos/gifted-with-purpose-logo.svg`,
    image: `${SITE_URL}/assets/products/studio-god-says-you-are-600ml.jpg`,
    priceRange: 'N$150 - N$250',
    currenciesAccepted: 'NAD',
    address: { '@type': 'PostalAddress', addressCountry: 'NA' },
    areaServed: { '@type': 'Country', name: 'Namibia' },
    knowsLanguage: ['en', 'af'],
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: brand.name,
    publisher: { '@id': `${SITE_URL}/#business` },
    inLanguage: 'en-NA',
  };

  const catalogue = {
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#catalogue`,
    name: 'Gifted with Purpose catalogue',
    numberOfItems: products.length,
    itemListElement: products.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `${SITE_URL}/collections/${p.collection}`,
    })),
  };

  return { '@context': 'https://schema.org', '@graph': [org, website, catalogue] };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-NA">
      <head>
        <link
          rel="preload"
          as="image"
          href="/assets/patterns/hero-texture@sm.jpg"
          media="(max-width: 899px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/patterns/hero-texture.jpg"
          media="(min-width: 900px)"
          fetchPriority="high"
        />
        <link rel="preload" href="/assets/fonts/Fraunces-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/Poppins-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/Poppins-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/Caveat-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema()) }}
        />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <CartProvider>
          <LightboxProvider>
            <Header />
            {children}
            <Footer />
            <StickyWa />
            <CartDrawer />
            <ScrollTop />
          </LightboxProvider>
        </CartProvider>
        <SiteEffects />
      </body>
    </html>
  );
}
