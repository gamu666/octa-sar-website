'use client';

import { FormEvent, useState } from 'react';

const investorEmail = 'hello@octasar.mn';

export function InvestorForm() {
  const [prepared, setPrepared] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Investor enquiry — ${form.get('name') || 'OCTA SAR website'}`;
    const body = [
      `Name: ${form.get('name')}`,
      `Email: ${form.get('email')}`,
      `Organisation: ${form.get('organisation') || 'Not provided'}`,
      `Interest: ${form.get('interest')}`,
      '',
      String(form.get('message') || ''),
    ].join('\n');

    window.dispatchEvent(new CustomEvent('octasar:analytics', {
      detail: { event: 'investor_lead_started', source: 'contact_form' },
    }));
    setPrepared(true);
    window.location.href = `mailto:${investorEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="investor-form" onSubmit={handleSubmit} data-analytics-event="investor_lead_submit">
      <div className="form-grid">
        <label>
          <span>Name *</span>
          <input name="name" autoComplete="name" required placeholder="Your name" />
        </label>
        <label>
          <span>Work email *</span>
          <input name="email" type="email" autoComplete="email" required placeholder="name@company.com" />
        </label>
        <label>
          <span>Organisation</span>
          <input name="organisation" autoComplete="organization" placeholder="Fund or company" />
        </label>
        <label>
          <span>I’m interested in *</span>
          <select name="interest" required defaultValue="">
            <option value="" disabled>Select one</option>
            <option>MANAI CERCLE</option>
            <option>OCTA SAR portfolio</option>
            <option>Strategic partnership</option>
            <option>Other</option>
          </select>
        </label>
      </div>
      <label>
        <span>Message *</span>
        <textarea name="message" required rows={5} placeholder="Tell us what you would like to discuss." />
      </label>
      <div className="form-submit">
        <button className="button button--dark" type="submit">Prepare enquiry <span>↗</span></button>
        <p>
          {prepared
            ? 'Your email app should now be open with the enquiry prepared.'
            : 'Submitting opens a prepared email. Sensitive materials are shared privately after review.'}
        </p>
      </div>
    </form>
  );
}
