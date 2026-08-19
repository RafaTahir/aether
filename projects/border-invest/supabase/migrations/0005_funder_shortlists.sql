create table if not exists public.funder_shortlists (
  user_id uuid not null references auth.users(id) on delete cascade,
  project_slug text not null references public.projects(slug) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, project_slug)
);

alter table public.funder_shortlists enable row level security;

create policy "funders manage their shortlists"
  on public.funder_shortlists for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create index if not exists funder_shortlists_user_idx
  on public.funder_shortlists(user_id, created_at desc);
