alter table public.project_submissions
  add column if not exists submitted_at timestamptz,
  add column if not exists reviewed_by uuid references auth.users(id) on delete set null,
  add column if not exists reviewed_at timestamptz,
  add column if not exists terms_accepted_at timestamptz,
  add column if not exists terms_version text;

create index if not exists project_submissions_status_idx
  on public.project_submissions(status, updated_at desc);

create index if not exists project_submissions_reviewer_idx
  on public.project_submissions(reviewed_by, reviewed_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_project_submissions_updated_at on public.project_submissions;
create trigger set_project_submissions_updated_at
  before update on public.project_submissions
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_funding_sources_updated_at on public.funding_sources;
create trigger set_funding_sources_updated_at
  before update on public.funding_sources
  for each row execute procedure public.set_updated_at();

create or replace function public.audit_project_submission_changes()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.audit_events (
    actor_id,
    event_type,
    entity_type,
    entity_id,
    metadata
  )
  values (
    auth.uid(),
    case when tg_op = 'INSERT' then 'project_submission_created'
      else 'project_submission_updated' end,
    'project_submission',
    new.id::text,
    jsonb_build_object('status', new.status)
  );
  return new;
end;
$$;

drop trigger if exists audit_project_submission_changes on public.project_submissions;
create trigger audit_project_submission_changes
  after insert or update on public.project_submissions
  for each row execute procedure public.audit_project_submission_changes();
