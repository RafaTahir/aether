# Aether Escrow Program

The first custom Solana program is a narrowly scoped milestone escrow for a devnet demonstration. It is deployed to devnet but not connected to the frontend. It is not a securities contract and does not encode revenue share, equity, investment returns, or identity eligibility.

## What It Guarantees

- A vault is controlled by a PDA derived from the escrow account.
- The release recipient is fixed when the escrow is initialized.
- Milestones must be created in order before deposits are accepted.
- Each milestone can be released once by the admin.
- An emergency authority can pause deposits and releases.
- Depositors can refund their recorded balance while paused.
- The token mint and token-account owners are checked on every token path.

## What It Does Not Guarantee

- It does not verify legal identity or investment eligibility.
- It does not calculate revenue, returns, taxes, or ownership.
- It does not resolve disputes or judge milestone evidence.
- It is not audited and is not ready for mainnet or real funds.
- The current frontend still records sandbox commitments locally and does not call the program.

## Build Walkthrough

1. `initialize_escrow` creates the escrow state and PDA-owned token vault.
2. `create_milestone` creates ordered release accounts with fixed amounts.
3. `deposit` transfers the configured SPL mint into the vault and updates a depositor receipt.
4. `release_milestone` checks authority, pause state, status, and available balance before a PDA-signed transfer to the fixed recipient token account.
5. `pause` stops release/deposit paths through the emergency authority.
6. `refund` returns a depositor's recorded balance while paused.

The program lives in `aether-contracts/`. Run Anchor commands from WSL because Solana program development on Windows uses WSL.

Devnet verification:

```text
Program: BzxhTouVDYHDurdAV5J2fi1paES87nKY9WXVFPZ3eGKj
Authority: 23jEz9Fs2cUomTRaC6WFVYgfWnhphixsLT9BnvXosFqE
```

## Next Contract Milestone

Add an integration test that creates a devnet-like SPL mint and accounts, initializes an escrow, creates two milestones, deposits tokens, releases one milestone, pauses, and refunds. Only after that test is stable should the frontend prepare real devnet instructions.
