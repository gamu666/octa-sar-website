'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';

type Session = {
  access_token: string;
  user: { email?: string };
};

type ProjectProgress = {
  id: string;
  project_name: string;
  stage: string;
  status: string;
  progress: number;
  next_step: string | null;
  updated_at: string;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const sessionKey = 'naiman-sar-client-session';

async function loadProjects(accessToken: string): Promise<ProjectProgress[]> {
  const response = await fetch(
    `${supabaseUrl}/rest/v1/project_progress?select=id,project_name,stage,status,progress,next_step,updated_at&order=updated_at.desc`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) throw new Error('Төслийн мэдээллийг ачаалж чадсангүй.');
  return response.json() as Promise<ProjectProgress[]>;
}

export function AdminPortal() {
  const [session, setSession] = useState<Session | null>(null);
  const [projects, setProjects] = useState<ProjectProgress[]>([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

  useEffect(() => {
    if (!isConfigured) return;
    let isCurrent = true;

    async function restoreSession() {
      const stored = window.sessionStorage.getItem(sessionKey);
      if (!stored) return;

      try {
        const restored = JSON.parse(stored) as Session;
        const restoredProjects = await loadProjects(restored.access_token);
        if (!isCurrent) return;
        setSession(restored);
        setProjects(restoredProjects);
      } catch {
        if (isCurrent) {
          window.sessionStorage.removeItem(sessionKey);
          setSession(null);
          setMessage('Нэвтрэх хугацаа дууссан байна. Дахин нэвтэрнэ үү.');
        }
      }
    }

    void restoreSession();
    return () => { isCurrent = false; };
  }, [isConfigured]);

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    if (!isConfigured) {
      setMessage('Нэвтрэх системийн холболт хүлээгдэж байна.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          apikey: supabaseAnonKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json() as Session & { error_description?: string; msg?: string };

      if (!response.ok || !result.access_token) throw new Error('И-мэйл эсвэл нууц үг буруу байна.');

      window.sessionStorage.setItem(sessionKey, JSON.stringify(result));
      setSession(result);
      setProjects(await loadProjects(result.access_token));
      setPassword('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Нэвтэрч чадсангүй.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleSignOut() {
    window.sessionStorage.removeItem(sessionKey);
    setSession(null);
    setProjects([]);
    setMessage('');
  }

  if (!session) {
    return (
      <section className="admin-access" aria-labelledby="admin-title">
        <div className="admin-access__copy">
          <p className="ap-eyebrow">Client workspace</p>
          <h1 id="admin-title">Төслийн явцаа<br />нэг дороос.</h1>
          <p>Энэ хэсэгт зөвхөн НАЙМАН САР-аас урилга авсан бүртгэлтэй хэрэглэгч нэвтэрнэ.</p>
        </div>
        <form className="admin-login" onSubmit={handleSignIn}>
          <div className="admin-login__heading">
            <span>Нэвтрэх</span>
            <small>Зөвхөн бүртгэлтэй хэрэглэгч</small>
          </div>
          <label>
            И-мэйл
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
          </label>
          <label>
            Нууц үг
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
          </label>
          {message && <p className="admin-login__message" role="status">{message}</p>}
          <button type="submit" disabled={isLoading}>{isLoading ? 'Нэвтэрч байна…' : 'Нэвтрэх'}</button>
          <Link href="/#contact">Нэвтрэх эрх авах</Link>
        </form>
      </section>
    );
  }

  return (
    <section className="admin-dashboard" aria-labelledby="dashboard-title">
      <header className="admin-dashboard__header">
        <div>
          <p className="ap-eyebrow">Client workspace</p>
          <h1 id="dashboard-title">Төслийн явц</h1>
          <p>{session.user.email}</p>
        </div>
        <button type="button" onClick={handleSignOut}>Гарах</button>
      </header>

      {isLoading ? (
        <p className="admin-dashboard__empty">Мэдээлэл ачаалж байна…</p>
      ) : projects.length === 0 ? (
        <p className="admin-dashboard__empty">Танд холбогдсон төсөл одоогоор алга.</p>
      ) : (
        <div className="admin-projects">
          {projects.map((project) => (
            <article className="admin-project" key={project.id}>
              <div className="admin-project__meta"><span>{project.status}</span><time>{new Intl.DateTimeFormat('mn-MN', { dateStyle: 'medium' }).format(new Date(project.updated_at))}</time></div>
              <h2>{project.project_name}</h2>
              <p>{project.stage}</p>
              <div className="admin-project__progress" aria-label={`${project.progress} хувь`}><i style={{ width: `${Math.min(100, Math.max(0, project.progress))}%` }} /></div>
              <strong>{project.progress}%</strong>
              {project.next_step && <div className="admin-project__next"><span>Дараагийн алхам</span><p>{project.next_step}</p></div>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
