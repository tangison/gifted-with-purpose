import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import LegalSections from '@/components/LegalSections';

export const metadata = {
  title: 'Cookie Policy',
  description:
    'Gifted with Purpose sets no cookies. This site uses no analytics, no advertising pixels and no third-party tracking scripts.',
  alternates: { canonical: '/legal/cookies' },
};

export default function Cookies() {
  return (
    <LegalPage title="Cookie policy" sub="Legal" updated="21 August 2026">
      <LegalSections>
      <h2>We do not use cookies</h2>
      <p>
        This website sets no cookies. We have not installed analytics, advertising pixels, heatmaps, session recording,
        chat widgets or any other third-party script that would store or read information on your device.
      </p>
      <p>
        Because nothing is stored, there is no cookie banner to accept and no tracking preference for you to manage.
      </p>

      <h2>Why there is no consent banner</h2>
      <p>
        Consent banners exist so you can refuse non-essential cookies. This site does not set any, essential or
        otherwise, so there is nothing to consent to.
      </p>

      <h2>Fonts and images</h2>
      <p>
        Our fonts and images are served from this website itself, not from an external font or media network. Loading a
        page here does not send a request to Google Fonts, a CDN or any third-party asset host.
      </p>

      <h2>WhatsApp links</h2>
      <p>
        When you tap an order button you are taken to WhatsApp. What happens after that is governed by WhatsApp and Meta
        Platforms, including any cookies or identifiers they use in their own app or website. That is outside this site
        and outside our control.
      </p>

      <h2>Hosting</h2>
      <p>
        Our host, Vercel, processes technical request data such as IP address to deliver pages and protect against
        abuse. This is server-side infrastructure logging, not cookie-based tracking of you as an individual.
      </p>

      <h2>If this changes</h2>
      <p>
        If we ever add analytics, advertising or an embedded third-party tool, we will update this policy and add a
        proper consent mechanism before switching it on.
      </p>

      <h2>Related policies</h2>
      <p>
        See also our <Link href="/legal/privacy">privacy policy</Link> and{' '}
        <Link href="/legal/terms">terms and conditions</Link>.
      </p>
    </LegalSections>
    </LegalPage>
  );
}
