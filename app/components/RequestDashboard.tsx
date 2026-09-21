'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { AccountAccess, useAccountSession } from './AccountAccess';
import { ContactRequest, databaseRequest } from '../lib/account';

const statusLabels: Record<ContactRequest['status'], string> = {
  new: 'Шинэ',
  in_progress: 'Хариуцаж байна',
  closed: 'Хаасан',
};

export function RequestDashboard({ admin = false }: { admin?: boolean }) {
  const { session, setSession, logOut } = useAccountSession();
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setError('');
    try {
      const membershipResponse = await databaseRequest(`site_admins?select=user_id&user_id=eq.${session.user.id}&limit=1`);
      if (!membershipResponse.ok) throw new Error('Эрхийн мэдээллийг шалгаж чадсангүй.');
      const memberships = await membershipResponse.json() as { user_id: string }[];
      const hasAdminRole = memberships.length > 0;
      setIsAdmin(hasAdminRole);

      if (admin && !hasAdminRole) {
        setRequests([]);
        return;
      }

      const response = await databaseRequest('contact_requests?select=id,user_id,name,email,organisation,message,status,created_at&order=created_at.desc&limit=100');
      if (!response.ok) throw new Error('Хүсэлтүүдийг ачаалж чадсангүй.');
      setRequests(await response.json() as ContactRequest[]);

    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Мэдээлэл ачаалж чадсангүй.');
    } finally {
      setLoading(false);
    }
  }, [admin, session]);

  useEffect(() => { void load(); }, [load]);

  async function changeStatus(request: ContactRequest, status: ContactRequest['status']) {
    setUpdatingId(request.id);
    setError('');
    try {
      const response = await databaseRequest(`contact_requests?id=eq.${request.id}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Төлөвийг өөрчилж чадсангүй.');
      setRequests((current) => current.map((item) => item.id === request.id ? { ...item, status } : item));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Төлөвийг өөрчилж чадсангүй.');
    } finally {
      setUpdatingId(null);
    }
  }

  if (session === undefined) return <section className="request-dashboard ap-shell" role="status">Бүртгэлийг шалгаж байна…</section>;
  if (!session) return <div className="request-dashboard ap-shell"><AccountAccess onSignedIn={setSession} /></div>;

  return (
    <section className="request-dashboard ap-shell" aria-labelledby="request-dashboard-title">
      <header className="request-dashboard__header">
        <div>
          <p className="ap-eyebrow">{admin ? 'НАЙМАН САР · Админ' : 'НАЙМАН САР · Хувийн орчин'}</p>
          <h1 id="request-dashboard-title">{admin ? 'Ирсэн хүсэлтүүд' : 'Миний хүсэлтүүд'}</h1>
          <p>{session.user.email}</p>
        </div>
        <div className="request-dashboard__actions">
          {!admin && <Link href="/request">Шинэ хүсэлт</Link>}
          {!admin && isAdmin && <Link href="/admin">Админ хэсэг</Link>}
          {admin && <Link href="/dashboard">Миний dashboard</Link>}
          <button type="button" onClick={() => { void logOut(); }}>Гарах</button>
        </div>
      </header>

      {error && <p className="request-dashboard__error" role="alert">{error}</p>}
      {loading ? <p className="request-dashboard__empty">Мэдээллийг ачаалж байна…</p> : admin && !isAdmin ? (
        <p className="request-dashboard__empty">Энэ хэсэгт зөвхөн админ эрхтэй бүртгэл нэвтэрнэ.</p>
      ) : (
        <>
          <div className="request-dashboard__toolbar">
            <span>{requests.length} хүсэлт</span>
            <button type="button" onClick={() => { void load(); }}>Шинэчлэх ↻</button>
          </div>
          {requests.length === 0 ? <p className="request-dashboard__empty">Одоогоор хүсэлт алга.</p> : (
            <div className="request-dashboard__list">
              {requests.map((request) => (
                <article className="request-card" key={request.id}>
                  <div className="request-card__top">
                    <span className={`request-card__status request-card__status--${request.status}`}>{statusLabels[request.status]}</span>
                    <time dateTime={request.created_at}>{new Intl.DateTimeFormat('mn-MN', { dateStyle: 'medium' }).format(new Date(request.created_at))}</time>
                  </div>
                  <h2>{request.name}</h2>
                  {admin && <a href={`mailto:${request.email}`}>{request.email}</a>}
                  {request.organisation && <p className="request-card__organisation">{request.organisation}</p>}
                  <p className="request-card__message">{request.message}</p>
                  {admin && (
                    <label className="request-card__select">
                      Төлөв
                      <select value={request.status} disabled={updatingId === request.id} onChange={(event) => { void changeStatus(request, event.target.value as ContactRequest['status']); }}>
                        <option value="new">Шинэ</option>
                        <option value="in_progress">Хариуцаж байна</option>
                        <option value="closed">Хаасан</option>
                      </select>
                    </label>
                  )}
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
