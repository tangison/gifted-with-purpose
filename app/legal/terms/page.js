import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import LegalSections from '@/components/LegalSections';
import { brand } from '@/lib/site';

export const metadata = {
  title: 'Terms and Conditions',
  description:
    'Terms for using the Gifted with Purpose website and ordering personalised gifts from Geneveve Gift Shop in Namibia.',
  alternates: { canonical: '/legal/terms' },
};

export default function Terms() {
  return (
    <LegalPage title="Terms and conditions" sub="Legal" updated="21 August 2026">
      <LegalSections>
      <h2>Who we are</h2>
      <p>
        This website is operated by Geneveve Gift Shop, trading as Gifted with Purpose, based in {brand.location}. You
        can reach us on WhatsApp or by phone at {brand.phone_intl}.
      </p>

      <h2>This website is a catalogue, not a shop checkout</h2>
      <p>
        You cannot buy anything directly on this site. There is no cart, no checkout and no online payment. Everything
        shown here is an invitation for you to contact us and enquire.
      </p>
      <p>
        A sale only exists once we have confirmed your order with you in writing over WhatsApp, including the final
        price, the personalisation details and payment.
      </p>

      <h2>Prices</h2>
      <p>
        Prices shown on this site are in Namibian Dollars (N$) and are taken from our own current product artwork.
        Where a product shows &ldquo;Price on request&rdquo;, no price has been published yet and we will quote you
        directly.
      </p>
      <p>
        We may change prices at any time. The price that applies to your order is the one we confirm with you on
        WhatsApp at the time of ordering, not necessarily the one displayed here.
      </p>

      <h2>Products and personalisation</h2>
      <p>
        Our items are printed to order. Because screens differ, colours you see here may vary slightly from the printed
        item. Product photographs show real items we have produced.
      </p>
      <p>
        You are responsible for the accuracy of any personalisation you send us, including spelling of names and
        wording. We print exactly what you confirm. Please check it carefully before you approve it.
      </p>

      <h2>Availability</h2>
      <p>
        Designs and blank stock can run out. Availability is confirmed when we respond to your enquiry, not by a
        product appearing on this site.
      </p>

      <h2>Payment, delivery and returns</h2>
      <p>
        Payment is agreed with you directly over WhatsApp. Delivery is available across Namibia for an extra cost, which
        we confirm with you when we confirm your order. Delivery areas, costs and timeframes, and our returns and
        exchange terms, are confirmed per order, so please ask us before you order if any of these matter to your
        decision.
      </p>
      <p>
        Once you have approved the proof and made payment, your order goes into production and cannot be changed or
        cancelled. That is why we confirm the design, spelling, price and delivery with you in writing before anything is
        made.
      </p>

      <h2>Character and third-party designs</h2>
      <p>
        Some designs in our library show characters, logos or brands owned by other people. Those designs are printed
        onto purchasable blank items at a customer&rsquo;s request and are listed by description only. Gifted with
        Purpose is an independent print studio in Windhoek and is not affiliated with, endorsed by, sponsored by or
        licensed by any character, entertainment or brand owner. All trade marks remain the property of their
        respective owners.
      </p>
      <p>
        If you are a rights holder and object to a design being offered, contact us at{' '}
        <a href={`mailto:${brand.email}`}>{brand.email}</a> and we will remove it.
      </p>

      <h2>Custom artwork</h2>
      <p>
        Custom artwork is quoted per job. We show you the quote before anything is drawn or printed. By sending us a
        photo, name, logo or wording to print, you confirm you have the right to use it. We may decline a request if we
        believe printing it would infringe someone else&rsquo;s rights.
      </p>

      <h2>Ordering and payment</h2>
      <p>
        There is no checkout on this site. No account is created, no card details are taken anywhere on this site, and
        nothing you type into a form here is stored by us. Every order is confirmed with you on WhatsApp before it is
        made, including the final price and the exact spelling of anything personalised.
      </p>

      <h2>Our content</h2>
      <p>
        The Gifted with Purpose name, logo, product photography and the text on this site belong to us. Please do not
        copy or reuse them commercially without our written permission.
      </p>

      <h2>Liability</h2>
      <p>
        We take care to keep this site accurate, but we do not warrant that it is error-free or continuously available.
        Nothing in these terms limits any right you have under Namibian consumer law.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Republic of Namibia.</p>

      <h2>Related policies</h2>
      <p>
        Please also read our <Link href="/legal/privacy">privacy policy</Link> and{' '}
        <Link href="/legal/cookies">cookie policy</Link>.
      </p>
    </LegalSections>
    </LegalPage>
  );
}
