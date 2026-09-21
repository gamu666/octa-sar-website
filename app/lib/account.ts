const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').replace(/\/$/, '');
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const sessionKey = 'naiman-sar-account-session';

export const accountConfigured = Boolean(url && key);

export type AccountSession = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: { id: string; email: string };
};

export type ContactRequest = {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  phone: string;
  organisation: string | null;
  message: string;
  status: 'new' | 'in_progress' | 'closed';
  created_at: string;
};

function requireConfig() {
  if (!accountConfigured) throw new Error('Бүртгэлийн систем хараахан тохируулагдаагүй байна.');
}

function authHeaders(token?: string): HeadersInit {
  return {
    apikey: key,
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function responseError(response: Response, fallback: string): Promise<Error> {
  if (response.status === 429) return new Error('Түр хугацаанд хэт олон оролдлого хийсэн байна. Хэсэг хүлээгээд дахин оролдоно уу.');
  const result = await response.json().catch(() => null) as { error_code?: string; code?: string } | null;
  if (result?.error_code === 'email_not_confirmed' || result?.code === 'email_not_confirmed') {
    return new Error('Эхлээд цахим шуудан руу ирсэн баталгаажуулах холбоосыг нээнэ үү.');
  }
  return new Error(fallback);
}

function saveSession(result: Partial<AccountSession> & { expires_in?: number }): AccountSession {
  if (!result.access_token || !result.refresh_token || !result.user?.id || !result.user.email) {
    throw new Error('Нэвтрэх мэдээлэл бүрэн ирсэнгүй. Дахин оролдоно уу.');
  }
  const session: AccountSession = {
    access_token: result.access_token,
    refresh_token: result.refresh_token,
    expires_at: result.expires_at ?? Math.floor(Date.now() / 1000) + (result.expires_in ?? 3600),
    user: { id: result.user.id, email: result.user.email },
  };
  window.localStorage.setItem(sessionKey, JSON.stringify(session));
  window.dispatchEvent(new Event('naimansar:session-change'));
  return session;
}

export async function signUp(email: string, password: string): Promise<AccountSession | null> {
  requireConfig();
  const redirectTo = `${window.location.origin}/dashboard/`;
  const response = await fetch(`${url}/auth/v1/signup?redirect_to=${encodeURIComponent(redirectTo)}`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw await responseError(response, 'Бүртгэл үүсгэж чадсангүй. Мэдээллээ шалгаад дахин оролдоно уу.');
  const result = await response.json() as Partial<AccountSession> & { expires_in?: number };
  return result.access_token ? saveSession(result) : null;
}

export async function signIn(email: string, password: string): Promise<AccountSession> {
  requireConfig();
  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw await responseError(response, 'И-мэйл эсвэл нууц үг буруу байна.');
  return saveSession(await response.json() as Partial<AccountSession> & { expires_in?: number });
}

async function fromEmailRedirect(): Promise<AccountSession | null> {
  const params = new URLSearchParams(window.location.hash.slice(1));
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');
  if (!accessToken || !refreshToken) return null;
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
  const response = await fetch(`${url}/auth/v1/user`, { headers: authHeaders(accessToken) });
  if (!response.ok) throw new Error('Баталгаажуулалтын холбоос хүчингүй байна. Дахин нэвтэрнэ үү.');
  const user = await response.json() as { id: string; email: string };
  return saveSession({
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: Number(params.get('expires_in') || 3600),
    user,
  });
}

export async function getSession(): Promise<AccountSession | null> {
  if (!accountConfigured) return null;
  const redirected = await fromEmailRedirect();
  if (redirected) return redirected;
  const raw = window.localStorage.getItem(sessionKey);
  if (!raw) return null;
  let stored: AccountSession;
  try {
    stored = JSON.parse(raw) as AccountSession;
    if (!stored.refresh_token || !stored.user?.id) throw new Error();
  } catch {
    window.localStorage.removeItem(sessionKey);
    return null;
  }
  if (stored.expires_at > Math.floor(Date.now() / 1000) + 60) return stored;

  const response = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ refresh_token: stored.refresh_token }),
  });
  if (!response.ok) {
    window.localStorage.removeItem(sessionKey);
    return null;
  }
  return saveSession(await response.json() as Partial<AccountSession> & { expires_in?: number });
}

export async function signOut(): Promise<void> {
  const raw = window.localStorage.getItem(sessionKey);
  window.localStorage.removeItem(sessionKey);
  window.dispatchEvent(new Event('naimansar:session-change'));
  if (!raw || !accountConfigured) return;
  try {
    const session = JSON.parse(raw) as AccountSession;
    await fetch(`${url}/auth/v1/logout`, { method: 'POST', headers: authHeaders(session.access_token) });
  } catch {
    // Local sign-out still succeeds if the network is unavailable.
  }
}

export async function databaseRequest(path: string, init: RequestInit = {}): Promise<Response> {
  requireConfig();
  const session = await getSession();
  if (!session) throw new Error('Хүсэлтээ үзэхийн тулд дахин нэвтэрнэ үү.');
  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: { ...authHeaders(session.access_token), ...(init.headers ?? {}) },
    cache: 'no-store',
  });
}

export async function publicDatabaseRequest(path: string, init: RequestInit = {}): Promise<Response> {
  requireConfig();
  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: { ...authHeaders(), ...(init.headers ?? {}) },
    cache: 'no-store',
  });
}
