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
- `app/lib/aether-storage.ts`: browser-local readiness and devnet activity only.
- `aether-contracts/`: Anchor devnet escrow program; compile and test from WSL.

The public catalog remains seeded and fictional. Authenticated operator intake, reviewer decisions, saved project rooms, and funding application records use Supabase when configured. Readiness acknowledgements and devnet activity remain local and must not be described as legal eligibility, investment, or payment.

Prefer existing audited Solana programs and regulated providers over custom programs. Add Anchor only when validated requirements cannot be met through integration.

The current custom program is deployed to devnet with a test-token deposit path only; it is not audited, and initialization/release/admin actions are not frontend-enabled. Never connect real funds, mainnet, or investment rights to it. Keep the broader frontend sandbox flow separate until the token integration tests and security review pass.

## Commands

- `npm run dev`: local development.
- `npm run lint`: lint.
- `npm run build`: production build and type-check.
- `npm run format:check`: formatting verification.

Use Node.js 22 or newer. Copy `.env.example` to `.env.local` and add only local credentials.
