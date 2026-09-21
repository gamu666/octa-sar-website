create schema if not exists private;

-- Supabase's automatic-RLS helper is an internal maintenance function. Keep it
-- unavailable to browser roles when it exists in the target project.
do $migration$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    execute 'revoke all on function public.rls_auto_enable() from public, anon, authenticated';
  end if;
end;
$migration$;

-- Only a verified owner can be placed in this table, using the Supabase SQL editor.
-- Never grant INSERT/UPDATE/DELETE to browser roles.
create table if not exists public.site_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.site_admins enable row level security;
alter table public.site_admins force row level security;
revoke all on public.site_admins from anon, authenticated;
grant select on public.site_admins to authenticated;

create policy "Admins may see their own membership"
on public.site_admins for select to authenticated
using ((select auth.uid()) = user_id);

create or replace function private.is_site_admin()
returns boolean language sql stable security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.site_admins
    where user_id = (select auth.uid())
      and (select auth.uid()) is not null
  );
$$;

revoke all on function private.is_site_admin() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.is_site_admin() to authenticated;

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 120),
  email text not null check (char_length(email) between 3 and 254),
  organisation text check (char_length(organisation) <= 160),
  message text not null check (char_length(trim(message)) between 1 and 5000),
  status text not null default 'new' check (status in ('new', 'in_progress', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contact_requests_user_created_idx
on public.contact_requests (user_id, created_at desc);
create index if not exists contact_requests_created_idx
on public.contact_requests (created_at desc);

alter table public.contact_requests enable row level security;
alter table public.contact_requests force row level security;
revoke all on public.contact_requests from anon, authenticated;
grant select on public.contact_requests to authenticated;
grant insert (user_id, name, email, organisation, message) on public.contact_requests to authenticated;
grant update (status) on public.contact_requests to authenticated;

create policy "Clients see their own requests and admins see all"
on public.contact_requests for select to authenticated
using ((select auth.uid()) = user_id or (select private.is_site_admin()));

create policy "Clients submit requests for themselves"
on public.contact_requests for insert to authenticated
with check (
  (select auth.uid()) = user_id
  and lower(email) = lower((select auth.jwt() ->> 'email'))
);

create policy "Only admins update request status"
on public.contact_requests for update to authenticated
using ((select private.is_site_admin()))
with check ((select private.is_site_admin()));

create or replace function private.touch_contact_request()
returns trigger language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

revoke all on function private.touch_contact_request() from public, anon, authenticated;

create trigger contact_requests_touch_updated_at
before update on public.contact_requests
for each row execute function private.touch_contact_request();
