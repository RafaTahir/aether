# Aether Escrow Program

The first custom Solana program is a narrowly scoped milestone escrow for a devnet demonstration. It is deployed to devnet but not connected to the frontend. It is not a securities contract and does not encode revenue share, equity, investment returns, or identity eligibility.

## What It Guarantees

- A vault is controlled by a PDA derived from the escrow account.
- The release recipient is fixed when the escrow is initialized.
- Milestones must be created in order before deposits are accepted.
- Each milestone can be released once by the admin.
- An emergency authority can pause deposits and releases.
- Depositors can refund their recorded balance while paused.
- Refunds are disabled once any milestone release has started; proportional refund accounting is a later protocol milestone.
- The token mint and token-account owners are checked on every token path.

## What It Does Not Guarantee

- It does not verify legal identity or investment eligibility.
- It does not calculate revenue, returns, taxes, or ownership.
- It does not resolve disputes or judge milestone evidence.
- It is not audited and is not ready for mainnet or real funds.
- The current frontend still records sandbox commitments locally and does not call the program.

## Devnet Smoke Result

On 2026-08-17, the deployed program passed a disposable-token smoke run:

- Release scenario: deposited 100 test tokens, released 60, and observed 40 remaining in the vault.
- Emergency scenario: deposited 50 test tokens, paused the escrow, and refunded the full 50.

The smoke client is `aether-contracts/scripts/smoke.ts`. Its temporary mint keypair was kept outside the repository and removed after the run.

## Build Walkthrough

1. `initialize_escrow` creates the escrow state and PDA-owned token vault.
2. `create_milestone` creates ordered release accounts with fixed amounts.
3. `deposit` transfers the configured SPL mint into the vault and updates a depositor receipt.
4. `release_milestone` checks authority, pause state, status, and available balance before a PDA-signed transfer to the fixed recipient token account.
5. `pause` stops release/deposit paths through the emergency authority.
6. `refund` returns a depositor's recorded balance while paused, provided no milestone has released yet.

The program lives in `aether-contracts/`. Run Anchor commands from WSL because Solana program development on Windows uses WSL.

Devnet verification:

```text
Program: BzxhTouVDYHDurdAV5J2fi1paES87nKY9WXVFPZ3eGKj
Authority: 23jEz9Fs2cUomTRaC6WFVYgfWnhphixsLT9BnvXosFqE
```

## Next Contract Milestone

Publish or bundle the generated IDL, add explicit frontend instruction builders, and keep the current UI in sandbox mode until a user-facing devnet flow has transaction previews, status timelines, and a security review.
