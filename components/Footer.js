import Link from 'next/link';
import Image from 'next/image';
import { Icon, NaFlag } from './Icons';
import { brand, collections, wa } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="ftr" id="contact">
      <div className="wrap ftr-in">
        <nav className="ftr-nav" aria-label="Collections">
          <Link href="/shop">Shop all</Link>
          <Link href="/designs">Pick your design</Link>
<Link href="/work">Our products</Link>
          <Link href="/create">Make your own</Link>
          <Link href="/blanks">Blank range</Link>
          {collections.map((c) => (
            <Link key={c.slug} href={`/collections/${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </nav>

        <nav className="ftr-contact" aria-label="Company">
          <Link href="/about">Our Story</Link>
          <Link href="/how-to-order">How to order</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <a href={wa('Hi Gifted with Purpose!')} target="_blank" rel="noopener noreferrer">
            WhatsApp {brand.phone_intl}
          </a>
        </nav>

        <div className="ftr-soc">
          <a href={wa('Hi Gifted with Purpose!')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <Icon name="wa" />
          </a>
          <a href={brand.facebook} target="_blank" rel="noopener noreferrer" aria-label="Gifted with Purpose on Facebook">
            <Icon name="fb" />
          </a>
          <a href={brand.instagram} target="_blank" rel="noopener noreferrer" aria-label="Gifted with Purpose on Instagram">
            <Icon name="ig" />
          </a>
        </div>

        <nav className="ftr-legal" aria-label="Legal">
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/cookies">Cookies</Link>
          <Link href="/sitemap-page">Sitemap</Link>
        </nav>

        <Image
          className="ftr-mark"
          src="/assets/logos/gifted-with-purpose-logo.svg"
          alt="Gifted with Purpose — Thoughtful, Meaningful, Yours"
          width={640}
          height={634}
          sizes="(min-width:900px) 640px, 92vw"
        />

        <div className="ftr-bot">
          <span>© {new Date().getFullYear()} Geneveve Gift Shop t/a Gifted with Purpose</span>
          <span className="flag">
            <NaFlag /> Made with love in Namibia
          </span>
          <a
            className="ftr-credit"
            href="https://studio.tangison.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Site designed and built by Tangison Studio
          </a>
        </div>
      </div>
    </footer>
  );
}
