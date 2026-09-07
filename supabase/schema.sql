create table if not exists public.project_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_name text not null,
  stage text not null,
  status text not null default 'Хөгжүүлж байна',
  progress integer not null default 0 check (progress between 0 and 100),
  next_step text,
  updated_at timestamptz not null default now()
);

alter table public.project_progress enable row level security;

create policy "Users can view only their own projects"
on public.project_progress
for select
to authenticated
using (auth.uid() = user_id);

revoke insert, update, delete on public.project_progress from authenticated;
grant select on public.project_progress to authenticated;
