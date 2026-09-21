'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useAccountSession } from './AccountAccess';
import { databaseRequest, publicDatabaseRequest } from '../lib/account';

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

export function PartnerForm() {
  const { session, logOut } = useAccountSession();
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    setErrorMessage('');

    try {
      const email = session?.user.email ?? String(data.get('email') ?? '').trim();
      const request = session ? databaseRequest : publicDatabaseRequest;
      const response = await request('contact_requests', {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({
          ...(session ? { user_id: session.user.id } : {}),
          email,
          name: String(data.get('name') ?? '').trim(),
          phone: String(data.get('phone') ?? '').trim(),
          organisation: String(data.get('organisation') ?? '').trim() || null,
          message: String(data.get('message') ?? '').trim(),
        }),
      });
      if (session && response.status === 401) {
        await logOut();
        throw new Error('Нэвтрэх хугацаа дууссан байна. Дахин нэвтэрнэ үү.');
      }
      if (!response.ok) throw new Error('Хүсэлт илгээгдсэнгүй. Дахин оролдоно уу.');

      form.reset();
      setStatus('sent');
      window.dispatchEvent(new CustomEvent('naimansar:analytics', {
        detail: { event: 'collaboration_lead_sent', source: 'contact_form' },
      }));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Сүлжээний алдаа гарлаа. Дахин оролдоно уу.');
      setStatus('error');
    }
  }

  if (session === undefined) return <div className="contact-form" role="status">Формыг ачаалж байна…</div>;

  return (
    <form className="contact-form" onSubmit={handleSubmit} onInput={() => { if (status !== 'sending') setStatus('idle'); }}>
      {session && <p className="contact-form__account">{session.user.email} · <Link href="/dashboard">Миний хүсэлтүүд</Link></p>}
      <div className="form-grid">
        <label>
          <span>Нэр *</span>
          <input name="name" autoComplete="name" required maxLength={120} placeholder="Таны нэр" />
        </label>
        <label>
          <span>Цахим шуудан *</span>
          {session ? <input type="email" value={session.user.email} readOnly /> : <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="name@company.com" />}
        </label>
        <label>
          <span>Эргэж холбогдох утас *</span>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={8} maxLength={24} placeholder="+976 8011 4941" />
        </label>
        <label className="form-grid__wide">
          <span>Байгууллага</span>
          <input name="organisation" autoComplete="organization" maxLength={160} placeholder="Байгууллага эсвэл баг" />
        </label>
      </div>
      <label>
        <span>Төслийн санаа *</span>
        <textarea name="message" required maxLength={5000} rows={5} placeholder="Санаа, зорилго болон хэрэгцээгээ товч бичнэ үү." />
      </label>
      <div className="form-submit">
        <button className="button button--dark" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Илгээж байна…' : 'Хүсэлт илгээх'} <span>↗</span>
        </button>
        <p className={status === 'error' ? 'contact-form__feedback--error' : ''} role={status === 'error' ? 'alert' : 'status'}>
          {status === 'sent' ? (session ? 'Хүсэлт илгээгдлээ. Явцыг dashboard-аас харж болно.' : 'Хүсэлт амжилттай илгээгдлээ. Бид 1–2 цагийн дотор эргэж холбогдоно.') : status === 'error' ? errorMessage : 'Илгээсэн мэдээллийг зөвхөн НАЙМАН САР-ын админ харна.'}
        </p>
      </div>
    </form>
  );
}
