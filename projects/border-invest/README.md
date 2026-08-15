# Aether

A Solana devnet architecture prototype for connecting global participants with fictional, milestone-led projects created by individuals and organizations.

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
- Fictional project discovery and diligence pages
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
