# Funding Source Operations

## Current State

The public funding directory uses four official reference records checked on 2026-08-16:

- [GEF Small Grants Programme](https://sgp.undp.org/)
- [ASEAN Foundation calls for applications](https://aseanfoundation.org/call-for-applications/)
- [Global Innovation Fund](https://www.globalinnovation.fund/)
- [GlobalGiving](https://www.globalgiving.org/)

These records verify the source organization and its official programme pages. They do not guarantee that a call is open, that a project is eligible, or that a source will fund a project. The public UI links to the official source and application pages so applicants can confirm current terms.

## Source Lifecycle

```text
discovered -> needs_review -> published -> needs_review -> paused
```

- `discovered`: found during research; never public.
- `needs_review`: official source exists, but current terms or call status require confirmation.
- `published`: source page, scope, eligibility summary, and last verification date are recorded.
- `paused`: stale, closed, withdrawn, or otherwise not safe to recommend.

Every published record needs an official URL, application URL, last-verified date, reviewer identity, source notes, eligibility summary, and an explicit statement of whether a current call is confirmed.

## Current Admin Prototype

`/admin/funding` uses Supabase Auth when configured. Reviewers can filter sources, open official pages, mark a source published/needs-review/paused, and record a review event. Without Supabase, the route renders setup instructions and never exposes the local-only review controls. The public directory falls back to checked-in references when the database is empty.

## Production Data Model

Use a server-side database with these tables:

- `funding_sources`: canonical current source record and publication state
- `funding_source_versions`: immutable snapshots of description, eligibility, links, and terms
- `funding_source_reviews`: reviewer, timestamp, evidence URL, decision, and notes
- `funding_source_changes`: audit log for every publish, pause, and edit action
- `admin_users`: role and organization membership

Required controls:

- Server-side authentication and role-based access
- Row-level security so only authorized reviewers can mutate records
- Two-person approval for high-risk or regulated source updates
- No client-side source state accepted as publication truth
- Automatic `needs_review` transition after a configurable verification interval
- Dead-link and HTTP-status monitoring with manual confirmation before republishing

## Local Supabase Bootstrap

Run `supabase/migrations/0001_aether_core.sql`, then `0002_rls_hardening.sql`, then `supabase/seed.sql`. After the first magic-link sign-in, promote the reviewed operator manually:

```sql
update public.profiles set role = 'admin' where id = 'AUTH_USER_UUID';
```

This manual promotion is intentional for the prototype. Production needs an invitation flow, organization membership, reviewer separation, and recovery procedures.

## Matching Rules

The current match score is explainable and advisory only. It compares country, sector, operator type, funding model, and target range. Production matching must also consider legal entity type, geography restrictions, prior awards, call deadline, beneficiary restrictions, co-funding requirements, and current capacity.

Never present a score as a probability of funding or an endorsement by the source.

## Source Research Notes

- The GEF Small Grants Programme states that regular grants usually range from US$25,000 to US$50,000, with a maximum regular grant of US$75,000, and that national CBOs/NGOs apply through country programmes.
- The ASEAN Foundation call page lists programme-specific calls and deadlines, including closed calls. Aether must not infer an open call from the existence of the directory page.
- Global Innovation Fund describes grants, equity, and debt across Africa and Asia, with investment decisions based on impact and scale. Its programme page does not mean every project can apply directly.
- GlobalGiving describes a pathway and due-diligence process for nonprofit partners and publishes fees. It is a philanthropic platform, not a government grant.
