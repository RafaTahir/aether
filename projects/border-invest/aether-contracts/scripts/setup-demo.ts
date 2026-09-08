/**
 * One-off devnet demo setup for the Aether escrow.
 * Creates: payer wallet, test SPL mint (6 decimals), escrow instance
 * (project_id = "aether-demo-clsi"), 3 milestones, mints demo tokens to payer.
 *
 * Run: cd aether-contracts && npx tsx scripts/setup-demo.ts
 */
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createMint,
  getAssociatedTokenAddressSync,
  mintTo,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";

const OUT_DIR = "/data/workspace/output/aether-devnet-demo";
const RPC_URL = "https://api.devnet.solana.com";
const PROGRAM_ID = new PublicKey(
  "BzxhTouVDYHDurdAV5J2fi1paES87nKY9WXVFPZ3eGKj"
);
const DECIMALS = 6;

const connection = new Connection(RPC_URL, "confirmed");

function discriminator(name: string): Buffer {
  // sha256("global:<name>")[:8] — verified against the frontend deposit ix
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createHash } = require("node:crypto") as typeof import("node:crypto");
  return Buffer.from(createHash("sha256").update(`global:${name}`).digest().slice(0, 8));
}

async function airdrop(pk: PublicKey, sol: number) {
  const sig = await connection.requestAirdrop(pk, sol * LAMPORTS_PER_SOL);
  const latest = await connection.getLatestBlockhash();
  await connection.confirmTransaction({ signature: sig, ...latest }, "confirmed");
}

async function confirm(sig: string) {
  const latest = await connection.getLatestBlockhash();
  await connection.confirmTransaction({ signature: sig, ...latest }, "confirmed");
}

async function send(instructions: TransactionInstruction[], signers: Keypair[], payer: Keypair) {
  const tx = new Transaction().add(
    ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 20_000 }),
    ...instructions
  );
  return sendAndConfirmTransaction(connection, tx, [payer, ...signers], {
    commitment: "confirmed",
  });
}

async function main() {
  // 1. payer wallet (resume-safe: reuse if a previous run created one)
  let payer: Keypair;
  const payerFile = `${OUT_DIR}/demo-wallet.json`;
  if (existsSync(payerFile)) {
    payer = Keypair.fromSecretKey(
      Uint8Array.from(JSON.parse(readFileSync(payerFile, "utf8")))
    );
    console.log("Resuming with existing payer:", payer.publicKey.toBase58());
  } else {
    payer = Keypair.generate();
    mkdirSync(OUT_DIR, { recursive: true });
    writeFileSync(payerFile, JSON.stringify(Array.from(payer.secretKey)));
    console.log("Created payer:", payer.publicKey.toBase58());
  }
  console.log("Payer:", payer.publicKey.toBase58());
  for (let i = 0; i < 6; i++) {
    try {
      await airdrop(payer.publicKey, 1);
      console.log(`Airdropped 1 SOL (${i + 1}/6)`);
    } catch (e) {
      console.warn(`Airdrop ${i + 1} failed:`, (e as Error).message);
    }
    await new Promise((r) => setTimeout(r, 12_000));
    const bal = await connection.getBalance(payer.publicKey);
    if (bal >= 3 * LAMPORTS_PER_SOL) break;
  }
  const bal = await connection.getBalance(payer.publicKey);
  console.log("Balance:", bal / LAMPORTS_PER_SOL, "SOL");
  if (bal < 0.5 * LAMPORTS_PER_SOL) throw new Error("Insufficient SOL to continue");

  // 2. test mint
  const mint = await createMint(connection, payer, payer.publicKey, null, DECIMALS);
  console.log("Mint:", mint.toBase58());

  // payer token account + mint 1,000,000 test tokens
  const payerAta = getAssociatedTokenAddressSync(mint, payer.publicKey);
  await mintTo(connection, payer, mint, payerAta, payer, 1_000_000 * 10 ** DECIMALS);
  console.log("Minted 1,000,000 test tokens to payer ATA:", payerAta.toBase58());

  // 3. escrow instance
  const projectId = Buffer.alloc(32);
  Buffer.from("aether-demo-clsi").copy(projectId);

  const [escrow] = PublicKey.findProgramAddressSync(
    [Buffer.from("escrow"), projectId],
    PROGRAM_ID
  );
  const [escrowAuthority] = PublicKey.findProgramAddressSync(
    [Buffer.from("authority"), escrow.toBuffer()],
    PROGRAM_ID
  );
  const vault = getAssociatedTokenAddressSync(
    mint,
    escrowAuthority,
    true,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  const emergencyAdmin = Keypair.generate();
  const initIx = new TransactionInstruction({
    programId: PROGRAM_ID,
    keys: [
      { pubkey: payer.publicKey, isSigner: true, isWritable: true }, // admin
      { pubkey: emergencyAdmin.publicKey, isSigner: true, isWritable: false }, // emergency_admin
      { pubkey: payer.publicKey, isSigner: false, isWritable: false }, // recipient
      { pubkey: mint, isSigner: false, isWritable: false },
      { pubkey: escrow, isSigner: false, isWritable: true },
      { pubkey: escrowAuthority, isSigner: false, isWritable: false },
      { pubkey: vault, isSigner: false, isWritable: true },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    ],
    data: Buffer.concat([
      discriminator("initialize_escrow"),
      projectId,
      Buffer.from([3]), // milestone_count
    ]),
  });
  let sig = await send([initIx], [emergencyAdmin], payer);
  console.log("initialize_escrow:", sig);

  // 4. milestones: 3 x 250,000 tokens (matching 750k target)
  for (const [index, amount] of [
    [0, 250_000],
    [1, 250_000],
    [2, 250_000],
  ].entries()) {
    const [milestone] = PublicKey.findProgramAddressSync(
      [Buffer.from("milestone"), escrow.toBuffer(), Buffer.from([index])],
      PROGRAM_ID
    );
    const amountBuf = Buffer.alloc(8);
    amountBuf.writeBigUInt64LE(BigInt(amount) * 10n ** BigInt(DECIMALS));
    const ix = new TransactionInstruction({
      programId: PROGRAM_ID,
      keys: [
        { pubkey: payer.publicKey, isSigner: true, isWritable: true },
        { pubkey: escrow, isSigner: false, isWritable: false },
        { pubkey: milestone, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
      ],
      data: Buffer.concat([
        discriminator("create_milestone"),
        Buffer.from([index]),
        amountBuf,
      ]),
    });
    sig = await send([ix], [], payer);
    console.log(`create_milestone[${index}]:`, sig);
  }

  // 5. write outputs
  mkdirSync("/data/workspace/output/aether-devnet-demo", { recursive: true });
  writeFileSync(
    "/data/workspace/output/aether-devnet-demo/env-values.txt",
    [
      "# Paste into Vercel → Settings → Environment Variables, then redeploy.",
      `NEXT_PUBLIC_AETHER_ESCROW_PROJECT_SLUG=central-luzon-solar-irrigation`,
      `NEXT_PUBLIC_AETHER_ESCROW_ADDRESS=${escrow.toBase58()}`,
      `NEXT_PUBLIC_AETHER_ESCROW_MINT=${mint.toBase58()}`,
      `NEXT_PUBLIC_AETHER_ESCROW_DECIMALS=${DECIMALS}`,
      "",
      "# Devnet demo wallet (DISPOSABLE - devnet only, never fund with real SOL)",
      `PAYER_PUBLIC_KEY=${payer.publicKey.toBase58()}`,
      `PAYER_SECRET_KEY=[${Array.from(payer.secretKey).join(",")}]`,
      `EMERGENCY_ADMIN_PUBLIC_KEY=${emergencyAdmin.publicKey.toBase58()}`,
      `VAULT=${vault.toBase58()}`,
      `PAYER_TOKEN_ACCOUNT=${payerAta.toBase58()}`,
    ].join("\n") + "\n"
  );
  writeFileSync(
    "/data/workspace/output/aether-devnet-demo/demo-wallet.json",
    JSON.stringify(Array.from(payer.secretKey))
  );
  console.log("\n=== DEMO READY ===");
  console.log("Escrow:", escrow.toBase58());
  console.log("Mint:", mint.toBase58());
  console.log("Vault:", vault.toBase58());
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
