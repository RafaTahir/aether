import {
  AccountRole,
  address,
  getAddressEncoder,
  getProgramDerivedAddress,
  getU64Encoder,
  type Address,
  type Instruction,
} from "@solana/kit";
import type { AppClient } from "./solana-client";

export const AETHER_ESCROW_PROGRAM_ID = address(
  "BzxhTouVDYHDurdAV5J2fi1paES87nKY9WXVFPZ3eGKj"
);
const SYSTEM_PROGRAM_ID = address("11111111111111111111111111111111");
const TOKEN_PROGRAM_ID = address("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
const ASSOCIATED_TOKEN_PROGRAM_ID = address(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);
const addressEncoder = getAddressEncoder();
const encoder = new TextEncoder();
const DEPOSIT_DISCRIMINATOR = new Uint8Array([
  242, 35, 198, 137, 82, 225, 242, 182,
]);

export type DemoEscrowConfig = {
  escrow: Address;
  mint: Address;
  decimals: number;
};

export function getConfiguredDemoEscrow(): DemoEscrowConfig | null {
  const escrow = process.env.NEXT_PUBLIC_AETHER_ESCROW_ADDRESS;
  const mint = process.env.NEXT_PUBLIC_AETHER_ESCROW_MINT;
  if (!escrow || !mint) return null;

  try {
    return {
      escrow: address(escrow),
      mint: address(mint),
      decimals: Number(process.env.NEXT_PUBLIC_AETHER_ESCROW_DECIMALS ?? "6"),
    };
  } catch {
    return null;
  }
}

export async function prepareDemoDeposit(
  client: AppClient,
  depositor: Address,
  amount: bigint
) {
  const config = getConfiguredDemoEscrow();
  if (!config)
    throw new Error("The devnet escrow is not configured for this deployment.");

  const [authority] = await getProgramDerivedAddress({
    programAddress: AETHER_ESCROW_PROGRAM_ID,
    seeds: [encoder.encode("authority"), addressEncoder.encode(config.escrow)],
  });
  const [vault] = await getAssociatedTokenAddress(authority, config.mint);
  const [depositorTokenAccount] = await getAssociatedTokenAddress(
    depositor,
    config.mint
  );
  const [receipt] = await getProgramDerivedAddress({
    programAddress: AETHER_ESCROW_PROGRAM_ID,
    seeds: [
      encoder.encode("deposit"),
      addressEncoder.encode(config.escrow),
      addressEncoder.encode(depositor),
    ],
  });

  const accountInfo = await client.rpc
    .getAccountInfo(depositorTokenAccount)
    .send();
  const instructions: Instruction[] = [];
  if (accountInfo.value === null)
    instructions.push(
      createAssociatedTokenAccountInstruction(
        depositor,
        depositorTokenAccount,
        depositor,
        config.mint
      )
    );
  instructions.push(
    createDepositInstruction({
      depositor,
      escrow: config.escrow,
      depositorTokenAccount,
      vault,
      mint: config.mint,
      receipt,
      amount,
    })
  );
  return { config, instructions, vault, depositorTokenAccount };
}

async function getAssociatedTokenAddress(owner: Address, mint: Address) {
  return getProgramDerivedAddress({
    programAddress: ASSOCIATED_TOKEN_PROGRAM_ID,
    seeds: [
      addressEncoder.encode(owner),
      addressEncoder.encode(TOKEN_PROGRAM_ID),
      addressEncoder.encode(mint),
    ],
  });
}

function createAssociatedTokenAccountInstruction(
  payer: Address,
  associatedTokenAccount: Address,
  owner: Address,
  mint: Address
): Instruction {
  return {
    programAddress: ASSOCIATED_TOKEN_PROGRAM_ID,
    accounts: [
      { address: payer, role: AccountRole.WRITABLE_SIGNER },
      { address: associatedTokenAccount, role: AccountRole.WRITABLE },
      { address: owner, role: AccountRole.READONLY },
      { address: mint, role: AccountRole.READONLY },
      { address: SYSTEM_PROGRAM_ID, role: AccountRole.READONLY },
      { address: TOKEN_PROGRAM_ID, role: AccountRole.READONLY },
    ],
    data: new Uint8Array(),
  };
}

function createDepositInstruction({
  depositor,
  escrow,
  depositorTokenAccount,
  vault,
  mint,
  receipt,
  amount,
}: {
  depositor: Address;
  escrow: Address;
  depositorTokenAccount: Address;
  vault: Address;
  mint: Address;
  receipt: Address;
  amount: bigint;
}): Instruction {
  const amountBytes = getU64Encoder().encode(amount);
  const data = new Uint8Array(
    DEPOSIT_DISCRIMINATOR.length + amountBytes.length
  );
  data.set(DEPOSIT_DISCRIMINATOR);
  data.set(amountBytes, DEPOSIT_DISCRIMINATOR.length);
  return {
    programAddress: AETHER_ESCROW_PROGRAM_ID,
    accounts: [
      { address: depositor, role: AccountRole.WRITABLE_SIGNER },
      { address: escrow, role: AccountRole.WRITABLE },
      { address: depositorTokenAccount, role: AccountRole.WRITABLE },
      { address: vault, role: AccountRole.WRITABLE },
      { address: mint, role: AccountRole.READONLY },
      { address: receipt, role: AccountRole.WRITABLE },
      { address: SYSTEM_PROGRAM_ID, role: AccountRole.READONLY },
      { address: TOKEN_PROGRAM_ID, role: AccountRole.READONLY },
    ],
    data,
  };
}
