import * as anchor from "@coral-xyz/anchor";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { Connection, Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const PROGRAM_ID = new PublicKey(
  "BzxhTouVDYHDurdAV5J2fi1paES87nKY9WXVFPZ3eGKj"
);
const RPC_URL =
  process.env.AETHER_SMOKE_RPC_URL ?? "https://api.devnet.solana.com";
const MINT = new PublicKey(requiredEnv("AETHER_SMOKE_MINT"));
const DEPOSITOR_TOKEN_ACCOUNT = new PublicKey(
  requiredEnv("AETHER_SMOKE_DEPOSITOR_TOKEN_ACCOUNT")
);
const walletPath = requiredEnv("AETHER_WALLET_PATH");
const payer = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(readFileSync(walletPath, "utf8")))
);
const idl = JSON.parse(
  readFileSync(
    resolve(process.cwd(), "target/idl/aether_contracts.json"),
    "utf8"
  )
);
const connection = new Connection(RPC_URL, "confirmed");
const provider = new anchor.AnchorProvider(
  connection,
  new anchor.Wallet(payer),
  { commitment: "confirmed" }
);
const program = new anchor.Program(idl as anchor.Idl, provider);

const DECIMALS = 6;
const ONE_TOKEN = 10 ** DECIMALS;

async function main() {
  const recipient = payer.publicKey;
  const emergencyAdmin = Keypair.generate();
  const recipientTokenAccount = DEPOSITOR_TOKEN_ACCOUNT;
  const releaseProjectId = projectId("release");
  const refundProjectId = projectId("refund");
  const releaseEscrow = await initializeEscrow(
    releaseProjectId,
    recipient,
    emergencyAdmin
  );
  const refundEscrow = await initializeEscrow(
    refundProjectId,
    recipient,
    emergencyAdmin
  );

  await createMilestones(releaseEscrow, [60 * ONE_TOKEN, 40 * ONE_TOKEN]);
  await createMilestones(refundEscrow, [50 * ONE_TOKEN, 50 * ONE_TOKEN]);

  const releaseDepositSignature = await deposit(releaseEscrow, 100 * ONE_TOKEN);
  const releaseSignature = await releaseMilestone(
    releaseEscrow,
    0,
    recipientTokenAccount
  );
  const releaseVault = await tokenBalance(releaseEscrow.vault);

  const refundDepositSignature = await deposit(refundEscrow, 50 * ONE_TOKEN);
  const pauseSignature = await pause(refundEscrow, emergencyAdmin);
  const refundSignature = await refund(refundEscrow, recipientTokenAccount);
  const refundVault = await tokenBalance(refundEscrow.vault);

  console.log(
    JSON.stringify(
      {
        programId: PROGRAM_ID.toBase58(),
        mint: MINT.toBase58(),
        payer: payer.publicKey.toBase58(),
        releaseScenario: {
          escrow: releaseEscrow.address.toBase58(),
          vault: releaseEscrow.vault.toBase58(),
          depositSignature: releaseDepositSignature,
          releaseSignature,
          remainingVaultTokens: releaseVault,
        },
        refundScenario: {
          escrow: refundEscrow.address.toBase58(),
          vault: refundEscrow.vault.toBase58(),
          depositSignature: refundDepositSignature,
          pauseSignature,
          refundSignature,
          remainingVaultTokens: refundVault,
        },
      },
      null,
      2
    )
  );
}

async function initializeEscrow(
  project: number[],
  recipient: PublicKey,
  emergencyAdmin: Keypair
) {
  const [escrow] = PublicKey.findProgramAddressSync(
    [Buffer.from("escrow"), Buffer.from(project)],
    PROGRAM_ID
  );
  const [escrowAuthority] = PublicKey.findProgramAddressSync(
    [Buffer.from("authority"), escrow.toBuffer()],
    PROGRAM_ID
  );
  const vault = getAssociatedTokenAddressSync(
    MINT,
    escrowAuthority,
    true,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );
  await program.methods
    .initializeEscrow(project, 2)
    .accountsPartial({
      admin: payer.publicKey,
      emergencyAdmin: emergencyAdmin.publicKey,
      recipient,
      mint: MINT,
      escrow,
      escrowAuthority,
      vault,
      systemProgram: SystemProgram.programId,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .signers([emergencyAdmin])
    .rpc();
  return { address: escrow, authority: escrowAuthority, vault };
}

async function createMilestones(
  escrow: { address: PublicKey },
  amounts: number[]
) {
  for (const [index, amount] of amounts.entries()) {
    const [milestone] = PublicKey.findProgramAddressSync(
      [
        Buffer.from("milestone"),
        escrow.address.toBuffer(),
        Buffer.from([index]),
      ],
      PROGRAM_ID
    );
    await program.methods
      .createMilestone(index, new anchor.BN(amount))
      .accountsPartial({
        admin: payer.publicKey,
        escrow: escrow.address,
        milestone,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
  }
}

async function deposit(
  escrow: { address: PublicKey; vault: PublicKey },
  amount: number
) {
  const [receipt] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("deposit"),
      escrow.address.toBuffer(),
      payer.publicKey.toBuffer(),
    ],
    PROGRAM_ID
  );
  return program.methods
    .deposit(new anchor.BN(amount))
    .accountsPartial({
      depositor: payer.publicKey,
      escrow: escrow.address,
      depositorTokenAccount: DEPOSITOR_TOKEN_ACCOUNT,
      vault: escrow.vault,
      mint: MINT,
      receipt,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .rpc();
}

async function releaseMilestone(
  escrow: { address: PublicKey; authority: PublicKey; vault: PublicKey },
  index: number,
  recipientTokenAccount: PublicKey
) {
  const [milestone] = PublicKey.findProgramAddressSync(
    [Buffer.from("milestone"), escrow.address.toBuffer(), Buffer.from([index])],
    PROGRAM_ID
  );
  return program.methods
    .releaseMilestone(index)
    .accountsPartial({
      admin: payer.publicKey,
      escrow: escrow.address,
      milestone,
      vault: escrow.vault,
      mint: MINT,
      recipient: payer.publicKey,
      recipientTokenAccount,
      escrowAuthority: escrow.authority,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .rpc();
}

async function pause(escrow: { address: PublicKey }, emergencyAdmin: Keypair) {
  return program.methods
    .pause()
    .accountsPartial({
      emergencyAdmin: emergencyAdmin.publicKey,
      escrow: escrow.address,
    })
    .signers([emergencyAdmin])
    .rpc();
}

async function refund(
  escrow: { address: PublicKey; authority: PublicKey; vault: PublicKey },
  depositorTokenAccount: PublicKey
) {
  const [receipt] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("deposit"),
      escrow.address.toBuffer(),
      payer.publicKey.toBuffer(),
    ],
    PROGRAM_ID
  );
  return program.methods
    .refund()
    .accountsPartial({
      depositor: payer.publicKey,
      escrow: escrow.address,
      receipt,
      depositorTokenAccount,
      vault: escrow.vault,
      mint: MINT,
      escrowAuthority: escrow.authority,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .rpc();
}

async function tokenBalance(address: PublicKey) {
  const account = await getAccount(connection, address);
  return Number(account.amount) / ONE_TOKEN;
}

function projectId(label: string) {
  const bytes = Buffer.alloc(32);
  Buffer.from(`aether-smoke-${label}`).copy(bytes);
  return [...bytes];
}

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
