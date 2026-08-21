import LegalPage from '@/components/LegalPage';
import { brand } from '@/lib/site';

export const metadata = {
  title: 'Privacy Policy',
  description:
    'How Gifted with Purpose handles your personal information. This website collects no personal data, uses no cookies and runs no analytics or tracking.',
  alternates: { canonical: '/legal/privacy' },
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy policy" sub="Legal" updated="21 August 2026">
      <h2>The short version</h2>
      <p>
        This website does not collect any personal information about you. There are no forms, no accounts, no cookies,
        no analytics and no advertising or tracking scripts of any kind. Nothing you do on this site is recorded by us.
      </p>

      <h2>What we do not collect</h2>
      <ul className="bullets">
        <li>No names, email addresses or phone numbers are requested or stored by this website.</li>
        <li>No cookies are set by us, and no local storage is used to identify you.</li>
        <li>No analytics platform, advertising pixel or third-party tracker is installed.</li>
        <li>No profiling, behavioural tracking or automated decision-making takes place.</li>
      </ul>

      <h2>What happens when you contact us</h2>
      <p>
        Every order button on this site opens WhatsApp with a pre-written message. When you choose to send it, your
        message and phone number reach us through WhatsApp, not through this website.
      </p>
      <p>
        At that point your information is handled inside WhatsApp, which is operated by Meta Platforms and governed by
        its own privacy policy and terms. We use the details you send us only to quote, confirm, produce and hand over
        your order, and to answer follow-up questions about it.
      </p>
      <p>
        We keep those conversations for as long as we need them to service your order and to handle any later query
        about it. We do not sell, rent or share your details with third parties for marketing.
      </p>

      <h2>Calls</h2>
      <p>
        If you call the number listed on this site, standard mobile network handling applies. We do not record calls.
      </p>

      <h2>Hosting</h2>
      <p>
        This site is hosted by Vercel. Like almost all web hosts, Vercel processes technical request data such as IP
        address and browser type to serve pages and protect against abuse. We do not have access to an analytics
        dashboard for this site and we do not build any profile from that data.
      </p>

      <h2>Children</h2>
      <p>
        We sell gifts intended for children, but this site is aimed at adults making a purchase. We do not knowingly
        collect information from children.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us what information we hold about you from our WhatsApp conversation, ask us to correct it, or ask
        us to delete it. Message us on WhatsApp at {brand.phone_local} and we will action it.
      </p>

      <h2>Changes</h2>
      <p>
        If we ever add a contact form, analytics or online payment to this site, this policy will be updated before
        that feature goes live.
      </p>

      <h2>Contact</h2>
      <p>
        Geneveve Gift Shop t/a Gifted with Purpose, {brand.location}. WhatsApp or call {brand.phone_local}.
      </p>
    </LegalPage>
  );
}
