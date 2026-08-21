import Link from 'next/link';
import Image from 'next/image';
import { Icon, NaFlag } from './Icons';
import { brand, collections, wa } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="ftr" id="contact">
      <div className="wrap ftr-in">
        <div className="ftr-brand">
          <Image src="/assets/logos/gifted-with-purpose-logo.svg" alt="Gifted with Purpose" width={70} height={70} />
          <p className="script">Beautiful personalized gifts made with love.</p>
          <p>
            A proud mother–daughter team creating personalized gifts made with love and purpose. Thank you for
            supporting our business!
          </p>
          <div className="ftr-soc">
            <a href={wa('Hi Gifted with Purpose!')} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <Icon name="wa" />
            </a>
            <Link href="/contact#social" aria-label="Facebook — link to be confirmed" title="Facebook — link to be confirmed">
              <Icon name="fb" />
            </Link>
            <Link href="/contact#social" aria-label="Instagram — link to be confirmed" title="Instagram — link to be confirmed">
              <Icon name="ig" />
            </Link>
          </div>
        </div>

        <div>
          <h4>Shop</h4>
          <nav aria-label="Footer collections">
            {collections.map((c) => (
              <Link key={c.slug} href={`/collections/${c.slug}`}>
                {c.name} <span style={{ color: '#8A7F84' }}>· {c.sub}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h4>Company</h4>
          <nav aria-label="Footer pages">
            <Link href="/about">Our Story</Link>
            <Link href="/how-to-order">How to order</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/legal/privacy">Privacy policy</Link>
            <Link href="/legal/terms">Terms and conditions</Link>
            <Link href="/legal/cookies">Cookie policy</Link>
          </nav>
        </div>

        <div>
          <h4>Get in touch</h4>
          <a className="fl" href={wa('Hi Gifted with Purpose!')} target="_blank" rel="noopener noreferrer">
            WhatsApp {brand.phone_local}
          </a>
          <a className="fl" href={`tel:+${brand.wa_number}`}>
            Call {brand.phone_local}
          </a>
          <span className="fl" style={{ color: '#B9AEB3' }}>
            {brand.location}
          </span>
          <a
            className="btn btn-wa btn-sm"
            style={{ marginTop: 12 }}
            href={wa('Hi Gifted with Purpose! I would like to place an order.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="wa" /> Order on WhatsApp
          </a>
        </div>
      </div>

      <div className="wrap">
        <div className="ftr-bot">
          <span>
            © {new Date().getFullYear()} Geneveve Gift Shop t/a Gifted with Purpose. All rights reserved.
          </span>
          <span className="flag">
            <NaFlag /> Made with love in Namibia
          </span>
        </div>
      </div>
    </footer>
  );
}
