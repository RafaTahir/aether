# Aether

A Solana devnet pilot workspace for connecting participants with milestone-led project rooms created by individuals and organizations.

This repository is educational software, not an investment platform. It accepts no real funds and makes no securities offering.

## Run locally

Requirements: Node.js 22+ and a browser Solana wallet configured for devnet.

```shell
cp .env.example .env.local
npm install
npm run dev
```

Open `http://localhost:3000`.

## Included

- Next.js App Router, TypeScript, and Tailwind CSS
- Solana Wallet Standard integration through `@solana/kit`
- Seeded project discovery and diligence pages
- Searchable, URL-shareable project filters and saved project rooms
- Authenticated operator intake with durable drafts and review submissions
- Account-backed saved project rooms and application records
- Readiness acknowledgement that intentionally collects no identity data
- Project update timelines and shareable project briefs
- Funding-source directory with project-fit matching and readiness checklist
- Funder workspace with sector filters and local shortlists
- Admin funding-source review route with provenance and verification states
- Supabase Auth/Postgres migrations and protected project/source review workflows
- Devnet-only cluster guardrail
- Eligibility, commitment, and escrow service boundaries
- Codex instructions in `AGENTS.md`
- Helius MCP configuration for Codex and Claude-compatible clients
- Production architecture and compliance gates in `docs/ARCHITECTURE.md`

## Deliberately disabled

- Mainnet and real USDC
- Real KYC, KYB, custody, or securities workflows
- Commitments, escrow deposits, and distributions
- Custom tokens or Solana programs

These features require validated legal and product requirements before implementation.

## Supabase setup

1. Create a Supabase project and copy its URL and anon key to `.env.local`.
2. Run `supabase/migrations/0001_aether_core.sql`, `0002_rls_hardening.sql`, `0003_pilot_workflow.sql`, `0004_catalog_project_records.sql`, and `0005_funder_shortlists.sql` in the Supabase SQL editor.
3. Run `supabase/seed.sql` to load the four official reference records.
4. Sign in at `/auth`, then promote the account after verifying it:

```sql
update public.profiles
set role = 'admin'
where id = 'YOUR_AUTH_USER_UUID';
```

5. Open `/admin/funding` to review source records and `/admin/projects` to review project-room submissions.

The app still falls back to checked-in reference data when Supabase is not configured.

## Remaining local state

Devnet wallet activity and the readiness acknowledgement remain browser-local. They are not evidence of identity, legal eligibility, ownership, investment, or payment. Account-backed saved rooms, project intake, reviewer decisions, and funding application records use Supabase when configured.
