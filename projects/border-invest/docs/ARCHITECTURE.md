# Aether Architecture

## Scope

The current application proves discovery, wallet connection, project diligence, and system boundaries on Solana devnet. It does not offer securities or accept funds.

The current prototype also exercises four local-only workflows: URL-backed discovery filters, saved project rooms, operator draft intake, and sandbox commitment records. These are deliberately browser-local until authentication, a database, and compliance providers exist.

Funding discovery is also local demo data. `src/data/funding-sources.ts` models government grants, CSR programs, foundation grants, and impact funds. `src/lib/funding-match.ts` provides an explainable fit score based on country, sector, operator type, funding model, and target size.

## Production Context

```text
Investor browser
  -> Next.js application
  -> Identity and eligibility provider (PII, KYC, AML, sanctions)
  -> Offering service (jurisdiction rules, limits, signed terms)
  -> Payment adapter (USDC transaction preparation)
  -> Regulated custodian or audited escrow
  -> Solana RPC and transaction indexer

Issuer portal
  -> KYB and beneficial-owner verification
  -> Project diligence and legal-document storage
  -> Milestone evidence and approval workflow
  -> Revenue reporting and distribution calculation
```

## Data Placement

Store off-chain in encrypted, access-controlled systems:

- Personal identity and KYC/KYB records
- Tax forms, contracts, financial statements, and diligence files
- Eligibility decisions and their reason codes
- Internal project and revenue records

Store or reference on-chain only when public auditability is useful:

- Wallet-authorized payment transactions
- Escrow deposits and milestone releases
- Distribution transactions
- Non-sensitive offering and agreement hashes

## Required Gates

1. Verify issuer and beneficial owners.
2. Approve legal structure and offering terms per jurisdiction.
3. Verify investor identity, residence, sanctions status, and suitability.
4. Enforce offering eligibility and investment limits server-side.
5. Present final terms and simulated transaction before signature.
6. Reconcile confirmed USDC deposits from indexed transactions.
7. Require documented milestone approval before escrow release.
8. Calculate distributions from verified revenue and apply tax withholding.

## Solana Strategy

Phase 1 uses Wallet Standard, `@solana/kit`, and devnet. A production design should use native USDC only after mint and cluster validation. Escrow should be a regulated custodian or an audited program with multisig governance. Do not deploy a custom token or program merely to make the app appear more on-chain.

## Threat Boundaries

- The client is untrusted; all eligibility and limits are rechecked server-side.
- A transaction signature proves wallet authorization, not legal identity.
- RPC responses are verified against expected cluster, program, mint, amount, and recipient.
- Webhooks are hints; reconciliation queries establish final state.
- Admin release actions require strong authentication, separation of duties, and an audit trail.

## Next Decisions

- Select one issuer country and one investor jurisdiction.
- Obtain legal classification of the revenue-share instrument.
- Select licensed KYC/AML, broker/portal, custody, and payment partners.
- Decide whether milestone escrow can use an existing audited program.
- Define cancellation, refund, default, dispute, and recovery behavior.

## Prototype Routes

- `/`: project discovery with shareable filters
- `/projects/[slug]`: project room, updates, risks, save/share, and no-funds sandbox action
- `/portfolio`: saved projects and local sandbox activity
- `/onboarding`: demo eligibility flow with no identity collection
- `/projects/submit`: local operator draft intake
- `/operator`: local operator workspace for saved drafts
- `/funding`: demo funding-source directory and application checklist
- `/funder`: demo funder pipeline and shortlist workspace
