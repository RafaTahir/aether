# Aether Escrow Program

Anchor program for a devnet-only milestone escrow demonstration.

## Status

- Current scaffold program ID: `BzxhTouVDYHDurdAV5J2fi1paES87nKY9WXVFPZ3eGKj`
- Cluster target: devnet
- Build: compiles with Anchor `1.1.2`
- Deployment: deployed to devnet
- Upgrade authority: `23jEz9Fs2cUomTRaC6WFVYgfWnhphixsLT9BnvXosFqE`
- IDL: generated locally; on-chain IDL upload is pending
- Token flow: devnet smoke-tested with a disposable test mint

This is not an investment contract. It has no revenue-share, equity, pricing, KYC, or securities logic.

## State Machine

```text
initialize_escrow
  -> create_milestone (ordered)
  -> deposit (after every milestone exists)
  -> release_milestone (admin, one time per milestone)

pause (emergency authority)
  -> refund (each depositor can recover their receipt)
unpause (admin)
```

## Accounts

- `Escrow`: admin, emergency authority, fixed recipient, mint, vault, totals, milestone count, pause state
- `Milestone`: ordered amount and one-way release status
- `DepositReceipt`: per-depositor refundable balance
- Vault authority: PDA derived from the escrow, never a private key

## WSL Commands

```bash
cd /mnt/c/solana-workshop-kit/projects/border-invest/aether-contracts
anchor build
cargo test
```

Before a devnet deployment, create or select a dedicated deployer wallet, fund it with devnet SOL, review the generated IDL, and verify the token mint. Do not use a production wallet.

The deploy keypair is intentionally ignored. Before the first deployment from a fresh clone, run `anchor keys sync`, review the resulting program ID changes, then build and deploy. Never commit the generated program keypair.

## Devnet Smoke Test

The smoke client uses a disposable test mint and token account supplied through environment variables:

```powershell
$env:AETHER_WALLET_PATH="\\wsl.localhost\Ubuntu\home\rafa\.config\solana\id.json"
$env:AETHER_SMOKE_MINT="YOUR_TEST_MINT"
$env:AETHER_SMOKE_DEPOSITOR_TOKEN_ACCOUNT="YOUR_TOKEN_ACCOUNT"
npm run smoke
```

It creates two escrows: one deposits and releases a milestone, and the other pauses before refunding. It never uses mainnet or real USDC.
