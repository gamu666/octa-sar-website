alter table public.contact_requests
  alter column user_id drop not null,
  add column if not exists phone text;

update public.contact_requests
set phone = 'Мэдээлэлгүй'
where phone is null;

alter table public.contact_requests
  alter column phone set not null;

do $migration$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'contact_requests_phone_length_check'
      and conrelid = 'public.contact_requests'::regclass
  ) then
    alter table public.contact_requests
      add constraint contact_requests_phone_length_check
      check (char_length(trim(phone)) between 8 and 24) not valid;
  end if;
end;
$migration$;

alter table public.contact_requests
  validate constraint contact_requests_phone_length_check;

revoke insert on public.contact_requests from anon, authenticated;
grant insert (user_id, name, email, phone, organisation, message)
on public.contact_requests to authenticated;
grant insert (name, email, phone, organisation, message)
on public.contact_requests to anon;

drop policy if exists "Visitors submit contact requests" on public.contact_requests;
create policy "Visitors submit contact requests"
on public.contact_requests for insert to anon
with check (user_id is null);
