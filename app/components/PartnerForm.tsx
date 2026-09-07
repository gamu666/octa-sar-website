'use client';

import { FormEvent, useState } from 'react';

export function PartnerForm() {
  const [brief, setBrief] = useState('');
  const [copied, setCopied] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const preparedBrief = [
      'НАЙМАН САР · Холбоо барих хүсэлт',
      '',
      `Нэр: ${data.get('name')}`,
      `Цахим шуудан: ${data.get('email')}`,
      `Байгууллага: ${data.get('organisation') || '—'}`,
      '',
      'Зурвас:',
      String(data.get('message')),
    ].join('\n');

    window.dispatchEvent(new CustomEvent('naimansar:analytics', {
      detail: { event: 'collaboration_lead_prototype', source: 'contact_form' },
    }));
    setBrief(preparedBrief);
    setCopied(false);
  }

  async function copyBrief() {
    await navigator.clipboard.writeText(brief);
    setCopied(true);
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      onInput={() => { if (brief) setBrief(''); }}
      data-analytics-event="collaboration_lead_submit"
    >
      <div className="form-grid">
        <label>
          <span>Нэр *</span>
          <input name="name" autoComplete="name" required placeholder="Таны нэр" />
        </label>
        <label>
          <span>Цахим шуудан *</span>
          <input name="email" type="email" autoComplete="email" required placeholder="name@company.com" />
        </label>
        <label className="form-grid__wide">
          <span>Байгууллага</span>
          <input name="organisation" autoComplete="organization" placeholder="Байгууллага эсвэл баг" />
        </label>
      </div>
      <label>
        <span>Зурвас *</span>
        <textarea name="message" required rows={5} placeholder="Ярилцах сэдэв, хамтын зорилгоо товч бичнэ үү." />
      </label>
      <div className="form-submit">
        <button className="button button--dark" type="submit">
          Бриф бэлдэх <span>↗</span>
        </button>
        <p aria-live="polite">
          Одоогоор мэдээлэл илгээгдэхгүй. Хуулж ашиглах бриф бэлдэнэ.
        </p>
      </div>
      {brief && (
        <section className="prepared-brief" aria-live="polite" aria-label="Бэлэн болсон хүсэлтийн бриф">
          <div>
            <p className="section-label">Таны бриф бэлэн</p>
            <button type="button" onClick={copyBrief}>{copied ? 'Хууллаа ✓' : 'Бриф хуулах'}</button>
          </div>
          <pre>{brief}</pre>
          <p>Албан ёсны холбоо барих суваг баталгаажмагц энэ брифийг шууд илгээх боломжтой болно.</p>
        </section>
      )}
    </form>
  );
}
