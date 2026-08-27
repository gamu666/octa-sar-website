import type { Metadata } from 'next';
import { InvestorForm } from '../components/InvestorForm';
import { SiteFooter, SiteHeader } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'Investor contact',
  description: 'Start a private investor or strategic partnership conversation with OCTA SAR.',
};

export default function ContactPage() {
  return (
    <main className="light-page">
      <SiteHeader light />
      <section className="contact-hero shell">
        <div>
          <p className="eyebrow"><span /> Investor relations</p>
          <h1>Let’s explore<br />the right <em>orbit.</em></h1>
        </div>
        <p>We welcome thoughtful conversations with investors, operators and strategic partners who care about responsible, long-term company building.</p>
      </section>
      <section className="contact-body shell">
        <div className="contact-note">
          <p className="section-label">Before you write</p>
          <h2>Tell us what aligns.</h2>
          <p>Choose the venture or relationship you’re interested in. We’ll share the appropriate public or confidential material after an initial review.</p>
          <dl>
            <div><dt>Response target</dt><dd>Within 2 business days</dd></div>
            <div><dt>Location</dt><dd>Ulaanbaatar, Mongolia</dd></div>
            <div><dt>Confidentiality</dt><dd>Sensitive data shared privately</dd></div>
          </dl>
        </div>
        <InvestorForm />
      </section>
      <SiteFooter light />
    </main>
  );
}
