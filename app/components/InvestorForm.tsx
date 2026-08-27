'use client';

import { FormEvent, useState } from 'react';

const investorEmail = 'hello@octasar.mn';

export function InvestorForm() {
  const [prepared, setPrepared] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Хөрөнгө оруулалтын хүсэлт — ${form.get('name') || 'OCTA SAR сайт'}`;
    const body = [
      `Нэр: ${form.get('name')}`,
      `Цахим шуудан: ${form.get('email')}`,
      `Байгууллага: ${form.get('organisation') || 'Мэдээлээгүй'}`,
      `Сонирхож буй чиглэл: ${form.get('interest')}`,
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
          <span>Нэр *</span>
          <input name="name" autoComplete="name" required placeholder="Таны нэр" />
        </label>
        <label>
          <span>Ажлын цахим шуудан *</span>
          <input name="email" type="email" autoComplete="email" required placeholder="name@company.com" />
        </label>
        <label>
          <span>Байгууллага</span>
          <input name="organisation" autoComplete="organization" placeholder="Сан эсвэл компани" />
        </label>
        <label>
          <span>Сонирхож буй чиглэл *</span>
          <select name="interest" required defaultValue="">
            <option value="" disabled>Сонгоно уу</option>
            <option>MANAI CERCLE</option>
            <option>OCTA SAR-ийн төслүүд</option>
            <option>Стратегийн түншлэл</option>
            <option>Бусад</option>
          </select>
        </label>
      </div>
      <label>
        <span>Зурвас *</span>
        <textarea name="message" required rows={5} placeholder="Ярилцах сэдэв, хамтын зорилгоо товч бичнэ үү." />
      </label>
      <div className="form-submit">
        <button className="button button--dark" type="submit">Хүсэлтээ бэлтгэх <span>↗</span></button>
        <p>
          {prepared
            ? 'Таны цахим шуудангийн апп бэлтгэсэн хүсэлттэйгээр нээгдлээ.'
            : 'Товчийг дарахад бэлтгэсэн хүсэлт таны цахим шуудангийн апп-д нээгдэнэ. Нууц материалыг анхан шатны танилцалтын дараа хуваалцана.'}
        </p>
      </div>
    </form>
  );
}
