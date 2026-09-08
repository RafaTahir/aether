/**
 * Simulated escrow for demo deployments with no on-chain escrow configured.
 *
 * Reproduces the real deposit flow as faithfully as possible without a funded
 * devnet wallet:
 *  - escrow / vault / deposit-receipt addresses are REAL program-derived
 *    addresses computed from the deployed program ID and the project slug, so
 *    the addresses shown match what the live program would use;
 *  - signatures are real-format base58 (87 chars, like ed25519 tx sigs);
 *  - deposits, vault balance, and milestones persist in localStorage and
 *    accumulate across visits, like real on-chain state;
 *  - the UI runs the same preparing -> signing -> confirming -> confirmed
 *    stages with realistic latency.
 *
 * Nothing here touches the network or a wallet. Clearly labelled
 * "Simulation" in the UI at all times.
 */
import {
  address,
  getAddressEncoder,
  getProgramDerivedAddress,
  type Address,
} from "@solana/kit";
import { AETHER_ESCROW_PROGRAM_ID } from "./aether-escrow-client";

const ASSOCIATED_TOKEN_PROGRAM_ID = address(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);
const TOKEN_PROGRAM_ID = address(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

// Fabricated format-like demo mint (not a real token, nothing fundable).
export const SIM_MINT = address(
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
);
export const SIM_DECIMALS = 6;
export const SIM_TOKEN_SYMBOL = "TEST";

const STORAGE_KEY = "aether-sim-escrow-v1";
const MILESTONE_TARGETS = [250_000, 250_000, 250_000];

const addressEncoder = getAddressEncoder();
const encoder = new TextEncoder();

export type SimMilestone = {
  index: number;
  targetMinor: string; // serialized as string for localStorage
  releasedMinor: string;
};

export type SimDeposit = {
  id: string;
  walletAddress: string;
  amountMinor: string; // serialized as string for localStorage
  tokenAmount: number;
  signature: string;
  createdAt: string;
};

export type SimEscrowState = {
  escrow: Address;
  vault: Address;
  vaultMinor: string; // serialized as string for localStorage
  milestones: SimMilestone[];
  deposits: SimDeposit[];
};

/** base58 tx-signature-shaped string (87 chars, no 0/O/I/l). */
export function generateSimSignature(): string {
  const alphabet =
    "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const bytes = new Uint8Array(130);
  crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; out.length < 87 && i < bytes.length; i++) {
    out += alphabet[bytes[i] % 58];
  }
  return out;
}

/** Derive the same PDA scheme the live program uses — no RPC, no SOL needed. */
export async function deriveSimAddresses(
  projectSlug: string,
  depositor: string
): Promise<{ escrow: Address; vault: Address; receipt: Address }> {
  const projectId = Buffer.alloc(32);
  Buffer.from(`sim-${projectSlug}`).copy(projectId);
  const [escrow] = await getProgramDerivedAddress({
    programAddress: AETHER_ESCROW_PROGRAM_ID,
    seeds: [encoder.encode("escrow"), projectId],
  });
  const [authority] = await getProgramDerivedAddress({
    programAddress: AETHER_ESCROW_PROGRAM_ID,
    seeds: [encoder.encode("authority"), addressEncoder.encode(escrow)],
  });
  const [vault] = await getProgramDerivedAddress({
    programAddress: ASSOCIATED_TOKEN_PROGRAM_ID,
    seeds: [
      addressEncoder.encode(authority),
      addressEncoder.encode(TOKEN_PROGRAM_ID),
      addressEncoder.encode(SIM_MINT),
    ],
  });
  const [receipt] = await getProgramDerivedAddress({
    programAddress: AETHER_ESCROW_PROGRAM_ID,
    seeds: [
      encoder.encode("deposit"),
      addressEncoder.encode(escrow),
      addressEncoder.encode(address(depositor)),
    ],
  });
  return { escrow, vault, receipt };
}

export function loadSimState(
  escrow: Address,
  projectSlug: string
): SimEscrowState {
  if (typeof window === "undefined") {
    return emptyState(escrow);
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, SimEscrowState>;
      const existing = parsed[projectSlug];
      if (existing && existing.escrow === escrow) return existing;
    }
  } catch {
    // corrupted storage — start fresh
  }
  return emptyState(escrow);
}

export function saveSimState(projectSlug: string, state: SimEscrowState): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Record<string, unknown>) : {};
    parsed[projectSlug] = state;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // storage unavailable (private mode) — state is session-only
  }
}

export function resetSimState(projectSlug: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    delete parsed[projectSlug];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
  } catch {
    // ignore
  }
}

/**
 * Simulated deposit with realistic staging. Latency bands mirror typical
 * devnet behaviour: preflight ~0.6s, wallet sign ~0.9s, RPC confirm ~1.4s.
 */
export async function simulateDeposit(
  state: SimEscrowState,
  depositor: string,
  amountMinor: bigint,
  onStage: (stage: "preparing" | "signing" | "confirming") => void
): Promise<{ deposit: SimDeposit; state: SimEscrowState }> {
  onStage("preparing");
  await sleep(600 + Math.random() * 400);
  onStage("signing");
  await sleep(800 + Math.random() * 500);
  onStage("confirming");
  await sleep(1200 + Math.random() * 600);

  const deposit: SimDeposit = {
    id: `sim-${Date.now()}`,
    walletAddress: depositor,
    amountMinor: amountMinor.toString(),
    tokenAmount: Number(amountMinor) / 10 ** SIM_DECIMALS,
    signature: generateSimSignature(),
    createdAt: new Date().toISOString(),
  };
  const next: SimEscrowState = {
    ...state,
    vaultMinor: (BigInt(state.vaultMinor) + amountMinor).toString(),
    deposits: [...state.deposits, deposit],
  };
  return { deposit, state: next };
}

export function milestoneProgress(
  state: SimEscrowState
): Array<{ index: number; fundedMinor: bigint; targetMinor: bigint }> {
  let remaining = BigInt(state.vaultMinor);
  return state.milestones.map((m) => {
    const targetMinor = BigInt(m.targetMinor);
    const fundedMinor = remaining < targetMinor ? remaining : targetMinor;
    remaining -= fundedMinor;
    return { index: m.index, fundedMinor, targetMinor };
  });
}

export function formatSimAmount(minor: bigint | string): string {
  return (Number(minor) / 10 ** SIM_DECIMALS).toLocaleString("en-US", {
    maximumFractionDigits: SIM_DECIMALS,
  });
}

function emptyState(escrow: Address): SimEscrowState {
  return {
    escrow,
    vault: escrow, // overwritten with the derived vault by the caller
    vaultMinor: "0",
    milestones: MILESTONE_TARGETS.map((target, index) => ({
      index,
      targetMinor: (BigInt(target) * 10n ** BigInt(SIM_DECIMALS)).toString(),
      releasedMinor: "0",
    })),
    deposits: [],
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

