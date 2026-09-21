'use client';

import { FormEvent, useEffect, useState } from 'react';
import { accountConfigured, AccountSession, getSession, signIn, signOut, signUp } from '../lib/account';

export function useAccountSession() {
  const [session, setSession] = useState<AccountSession | null | undefined>(undefined);

  useEffect(() => {
    let current = true;
    const restore = async () => {
      try {
        const found = await getSession();
        if (current) setSession(found);
      } catch {
        if (current) setSession(null);
      }
    };
    void restore();
    window.addEventListener('storage', restore);
    window.addEventListener('naimansar:session-change', restore);
    return () => {
      current = false;
      window.removeEventListener('storage', restore);
      window.removeEventListener('naimansar:session-change', restore);
    };
  }, []);

  const logOut = async () => {
    await signOut();
    setSession(null);
  };
  return { session, setSession, logOut };
}

export function AccountAccess({ onSignedIn }: { onSignedIn: (session: AccountSession) => void }) {
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accountConfigured || busy) return;
    setBusy(true);
    setMessage('');
    try {
      const session = mode === 'sign-up' ? await signUp(email.trim(), password) : await signIn(email.trim(), password);
      setPassword('');
      if (session) onSignedIn(session);
      else setMessage('Баталгаажуулах холбоосыг таны цахим шуудан руу илгээлээ. Холбоосыг нээгээд нэвтэрнэ үү.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Дахин оролдоно уу.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="account-access" aria-labelledby="account-access-title">
      <div>
        <p className="ap-eyebrow">НАЙМАН САР · Хувийн орчин</p>
        <h2 id="account-access-title">{mode === 'sign-in' ? 'Нэвтрэх' : 'Бүртгэл үүсгэх'}</h2>
        <p>Хүсэлт илгээх болон явцыг нь харахын тулд өөрийн хаягаар нэвтэрнэ үү.</p>
      </div>
      {!accountConfigured ? (
        <p role="status">Бүртгэлийн систем хараахан идэвхжээгүй байна.</p>
      ) : (
        <form className="account-access__form" onSubmit={submit}>
          <label>Цахим шуудан<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required maxLength={254} /></label>
          <label>Нууц үг<input type="password" autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'} value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} /></label>
          {message && <p role="status" className="account-access__message">{message}</p>}
          <button type="submit" disabled={busy}>{busy ? 'Түр хүлээнэ үү…' : mode === 'sign-in' ? 'Нэвтрэх' : 'Бүртгүүлэх'}</button>
          <button type="button" className="account-access__switch" onClick={() => { setMode(mode === 'sign-in' ? 'sign-up' : 'sign-in'); setMessage(''); }}>
            {mode === 'sign-in' ? 'Бүртгэлгүй юу? Бүртгүүлэх' : 'Бүртгэлтэй юу? Нэвтрэх'}
          </button>
        </form>
      )}
    </section>
  );
}
