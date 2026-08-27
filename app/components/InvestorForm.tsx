'use client';

import { FormEvent, useState } from 'react';

export function InvestorForm() {
  const [prepared, setPrepared] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent('octasar:analytics', {
      detail: { event: 'investor_lead_prototype', source: 'contact_form' },
    }));
    setPrepared(true);
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
        <button className="button button--dark" type="submit" disabled={prepared}>
          {prepared ? 'Загвар хүсэлт бэлэн' : 'Хүсэлтийн загвар шалгах'} <span>{prepared ? '✓' : '↗'}</span>
        </button>
        <p aria-live="polite">
          {prepared
            ? 'UX урсгал зөв ажиллаж байна. Албан ёсны домэйн, цахим шуудан баталгаажмагц бодит илгээлтийн сувгийг холбоно.'
            : 'Энэ бол хувийн дизайн prototype. Одоогоор мэдээлэл илгээгдэхгүй, хадгалагдахгүй.'}
        </p>
      </div>
    </form>
  );
}
