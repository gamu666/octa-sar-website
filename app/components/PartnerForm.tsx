'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { AccountAccess, useAccountSession } from './AccountAccess';
import { databaseRequest } from '../lib/account';

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error';

export function PartnerForm() {
  const { session, setSession, logOut } = useAccountSession();
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session || status === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await databaseRequest('contact_requests', {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({
          user_id: session.user.id,
          email: session.user.email,
          name: String(data.get('name') ?? '').trim(),
          organisation: String(data.get('organisation') ?? '').trim() || null,
          message: String(data.get('message') ?? '').trim(),
        }),
      });
      if (response.status === 401) {
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

  if (session === undefined) return <div className="contact-form" role="status">Бүртгэлийг шалгаж байна…</div>;
  if (!session) return <AccountAccess onSignedIn={setSession} />;

  return (
    <form className="contact-form" onSubmit={handleSubmit} onInput={() => { if (status !== 'sending') setStatus('idle'); }}>
      <p className="contact-form__account">{session.user.email} · <Link href="/dashboard">Миний хүсэлтүүд</Link></p>
      <div className="form-grid">
        <label>
          <span>Нэр *</span>
          <input name="name" autoComplete="name" required maxLength={120} placeholder="Таны нэр" />
        </label>
        <label>
          <span>Цахим шуудан</span>
          <input type="email" value={session.user.email} readOnly />
        </label>
        <label className="form-grid__wide">
          <span>Байгууллага</span>
          <input name="organisation" autoComplete="organization" maxLength={160} placeholder="Байгууллага эсвэл баг" />
        </label>
      </div>
      <label>
        <span>Зурвас *</span>
        <textarea name="message" required maxLength={5000} rows={5} placeholder="Ярилцах сэдэв, хамтын зорилгоо товч бичнэ үү." />
      </label>
      <div className="form-submit">
        <button className="button button--dark" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Илгээж байна…' : 'Хүсэлт илгээх'} <span>↗</span>
        </button>
        <p className={status === 'error' ? 'contact-form__feedback--error' : ''} role={status === 'error' ? 'alert' : 'status'}>
          {status === 'sent' ? 'Хүсэлт илгээгдлээ. Явцыг dashboard-аас харж болно.' : status === 'error' ? errorMessage : 'Хүсэлтийг зөвхөн таны бүртгэл болон админ харна.'}
        </p>
      </div>
    </form>
  );
}
