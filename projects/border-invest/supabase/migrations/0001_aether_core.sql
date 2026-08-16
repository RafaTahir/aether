create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  role text not null default 'participant' check (role in ('participant', 'operator', 'funder', 'reviewer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.email));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'reviewer')
  );
$$;

create table if not exists public.funding_sources (
  id text primary key,
  name text not null,
  kind text not null,
  countries jsonb not null default '[]'::jsonb,
  sectors jsonb not null default '[]'::jsonb,
  funding_models jsonb not null default '[]'::jsonb,
  operator_types jsonb not null default '[]'::jsonb,
  funding_range text not null,
  min_usd numeric,
  max_usd numeric,
  stage text not null,
  next_window text not null,
  description text not null,
  eligibility text not null,
  application_mode text not null,
  official_url text not null,
  application_url text not null,
  verification_status text not null,
  review_state text not null default 'needs_review' check (review_state in ('published', 'needs_review', 'paused')),
  last_verified date not null,
  source_notes text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.funding_source_reviews (
  id uuid primary key default gen_random_uuid(),
  source_id text not null references public.funding_sources(id) on delete cascade,
  reviewer_id uuid not null references auth.users(id) on delete restrict,
  state text not null check (state in ('published', 'needs_review', 'paused')),
  note text,
  reviewed_at timestamptz not null default now()
);

create table if not exists public.projects (
  slug text primary key,
  name text not null,
  country text not null,
  sector text not null,
  operator_name text not null,
  operator_type text not null,
  funding_model text not null,
  status text not null default 'submitted',
  target_usd numeric,
  summary text,
  data jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_submissions (
  id uuid primary key default gen_random_uuid(),
  submitted_by uuid not null references auth.users(id) on delete cascade,
  project_name text not null,
  operator_name text not null,
  operator_type text not null,
  country text not null,
  sector text not null,
  funding_cadence text not null,
  funding_model text not null,
  target_usd numeric not null check (target_usd > 0),
  summary text not null,
  status text not null default 'draft' check (status in ('draft', 'submitted', 'under_review', 'needs_changes', 'approved', 'rejected')),
  reviewer_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_updates (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null references public.projects(slug) on delete cascade,
  title text not null,
  body text not null,
  published_by uuid references auth.users(id) on delete set null,
  published_at timestamptz not null default now()
);

create table if not exists public.saved_projects (
  user_id uuid not null references auth.users(id) on delete cascade,
  project_slug text not null references public.projects(slug) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, project_slug)
);

create table if not exists public.funding_applications (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null references public.projects(slug) on delete cascade,
  source_id text not null references public.funding_sources(id) on delete restrict,
  applicant_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'draft' check (status in ('draft', 'ready', 'submitted', 'in_review', 'approved', 'declined', 'withdrawn')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  event_type text not null,
  entity_type text not null,
  entity_id text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.funding_sources enable row level security;
alter table public.funding_source_reviews enable row level security;
alter table public.projects enable row level security;
alter table public.project_submissions enable row level security;
alter table public.project_updates enable row level security;
alter table public.saved_projects enable row level security;
alter table public.funding_applications enable row level security;
alter table public.audit_events enable row level security;

create policy "profiles are visible to their owner" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "owners can update their profile" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

create policy "published funding sources are public" on public.funding_sources for select using (review_state = 'published' or public.is_admin());
create policy "reviewers manage funding sources" on public.funding_sources for all using (public.is_admin()) with check (public.is_admin());
create policy "reviewers manage source reviews" on public.funding_source_reviews for all using (public.is_admin()) with check (public.is_admin());

create policy "published projects are public" on public.projects for select using (status in ('published', 'in_progress', 'funding_complete', 'completed') or public.is_admin());
create policy "reviewers manage projects" on public.projects for all using (public.is_admin()) with check (public.is_admin());

create policy "submitters manage their submissions" on public.project_submissions for all using (submitted_by = auth.uid() or public.is_admin()) with check (submitted_by = auth.uid() or public.is_admin());
create policy "published updates are public" on public.project_updates for select using (true);
create policy "reviewers manage updates" on public.project_updates for all using (public.is_admin()) with check (public.is_admin());

create policy "users manage their saved projects" on public.saved_projects for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "applicants manage their applications" on public.funding_applications for all using (applicant_id = auth.uid() or public.is_admin()) with check (applicant_id = auth.uid() or public.is_admin());
create policy "admins read audit events" on public.audit_events for select using (public.is_admin());
create policy "authenticated users create audit events" on public.audit_events for insert with check (actor_id = auth.uid());

create index if not exists funding_sources_review_state_idx on public.funding_sources(review_state);
create index if not exists funding_source_reviews_source_idx on public.funding_source_reviews(source_id, reviewed_at desc);
create index if not exists project_submissions_owner_idx on public.project_submissions(submitted_by, updated_at desc);
create index if not exists funding_applications_applicant_idx on public.funding_applications(applicant_id, updated_at desc);
