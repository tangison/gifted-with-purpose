import Link from 'next/link';
import { Icon, Chev } from '@/components/Icons';
import { brand, wa } from '@/lib/site';

export default function LegalPage({ title, sub, updated, children }) {
  return (
    <main id="main">
      <section className="phero" style={{ '--accent': 'var(--taupe)', '--accent-soft': '#F7F3F1' }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <Chev />
            <span aria-current="page">{title}</span>
          </nav>
          <p className="sub">{sub}</p>
          <h1>{title}</h1>
          <p>
            Geneveve Gift Shop t/a Gifted with Purpose · {brand.location} · WhatsApp {brand.phone_local}
          </p>
          <ul className="stats">
            <li>Last updated: {updated}</li>
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap legal" style={{ maxWidth: 780 }}>
          {children}
          <div className="confirm" style={{ marginTop: 30 }}>
            <Icon name="sparkle" />
            <div>
              <h4>Questions about this policy?</h4>
              <p>
                Message us on WhatsApp at {brand.phone_local} and we will answer directly.{' '}
                <a href={wa(`Hi Gifted with Purpose! I have a question about your ${title.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer">
                  Open a chat
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
