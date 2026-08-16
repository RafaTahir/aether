-- Remove broad self-update policies before enabling the production workflow.
drop policy if exists "owners can update their profile" on public.profiles;
drop policy if exists "submitters manage their submissions" on public.project_submissions;
drop policy if exists "applicants manage their applications" on public.funding_applications;
drop policy if exists "authenticated users create audit events" on public.audit_events;

create policy "reviewers manage profiles"
  on public.profiles for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "submitters read their submissions"
  on public.project_submissions for select
  using (submitted_by = auth.uid() or public.is_admin());

create policy "submitters create open submissions"
  on public.project_submissions for insert
  with check (submitted_by = auth.uid() and status in ('draft', 'submitted'));

create policy "submitters update open submissions"
  on public.project_submissions for update
  using (submitted_by = auth.uid() and status in ('draft', 'needs_changes'))
  with check (submitted_by = auth.uid() and status in ('draft', 'submitted'));

create policy "reviewers manage submissions"
  on public.project_submissions for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "applicants read their applications"
  on public.funding_applications for select
  using (applicant_id = auth.uid() or public.is_admin());

create policy "applicants create draft applications"
  on public.funding_applications for insert
  with check (applicant_id = auth.uid() and status = 'draft');

create policy "applicants update open applications"
  on public.funding_applications for update
  using (applicant_id = auth.uid() and status in ('draft', 'ready'))
  with check (applicant_id = auth.uid() and status in ('draft', 'ready', 'submitted'));

create policy "reviewers manage applications"
  on public.funding_applications for all
  using (public.is_admin())
  with check (public.is_admin());

create policy "reviewers create audit events"
  on public.audit_events for insert
  with check (public.is_admin() and actor_id = auth.uid());
