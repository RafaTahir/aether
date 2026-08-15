# Aether Agent Guide

## Product

Aether is a devnet-only architecture prototype for cross-border project funding. Projects may be one-time or continuous and may be operated by individuals, companies, cooperatives, or public-interest entities. All current projects and financial figures are fictional.

## Safety Boundaries

- Never enable mainnet, accept real funds, or imply that an investment is available.
- Never bypass `EligibilityService` before preparing a commitment.
- Never store KYC data, legal documents, tax data, or private keys on-chain.
- Never put secrets in `NEXT_PUBLIC_*`, source files, logs, or transaction memos.
- Treat revenue share as a potentially regulated security. Keep jurisdiction rules behind a provider interface and require qualified counsel and licensed partners before production.
- Do not invent expected returns. Distinguish revenue share from return on investment.

## Architecture

- `app/`: Next.js routes and presentation.
- `src/domain/`: framework-independent product types.
- `src/data/`: fictional seed data only.
- `src/services/`: compliance, commitment, custody, and escrow boundaries.
- `app/lib/`: Solana client and wallet integration.

Prefer existing audited Solana programs and regulated providers over custom programs. Add Anchor only when validated requirements cannot be met through integration.

## Commands

- `npm run dev`: local development.
- `npm run lint`: lint.
- `npm run build`: production build and type-check.
- `npm run format:check`: formatting verification.

Use Node.js 22 or newer. Copy `.env.example` to `.env.local` and add only local credentials.
