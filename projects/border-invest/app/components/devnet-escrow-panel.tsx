"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { address } from "@solana/kit";
import { useConnectedWallet } from "@solana/kit-plugin-wallet/react";
import type { InvestmentProject } from "@/src/domain/project";
import type { SandboxCommitment } from "@/src/domain/investment";
import { AETHER_STORAGE_KEYS, useAetherStorage } from "../lib/aether-storage";
import { useAppClient } from "../lib/client-provider";
import {
  AETHER_ESCROW_PROGRAM_ID,
  getConfiguredDevnetEscrow,
  prepareDevnetDeposit,
} from "../lib/aether-escrow-client";
import {
  SIM_DECIMALS,
  SIM_MINT,
  SIM_TOKEN_SYMBOL,
  deriveSimAddresses,
  formatSimAmount,
  loadSimState,
  milestoneProgress,
  resetSimState,
  saveSimState,
  simulateDeposit,
  type SimEscrowState,
} from "../lib/sim-escrow";
import { useCluster } from "./cluster-context";
import { ellipsify } from "../lib/explorer";

type DepositStatus =
  | "idle"
  | "preparing"
  | "signing"
  | "confirming"
  | "confirmed"
  | "error";

export function DevnetEscrowPanel({ project }: { project: InvestmentProject }) {
  const client = useAppClient();
  const { cluster, getExplorerUrl } = useCluster();
  const wallet = useConnectedWallet(client);
  const config = getConfiguredDevnetEscrow();
  const projectMapped = config?.projectSlug === project.slug;
  const [, setCommitments] = useAetherStorage<SandboxCommitment[]>(
    AETHER_STORAGE_KEYS.commitments,
    []
  );
  const [amount, setAmount] = useState("1");
  const [status, setStatus] = useState<DepositStatus>("idle");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");

  // Simulation state (only active when no on-chain escrow is configured)
  const [sim, setSim] = useState<SimEscrowState | null>(null);
  const [simReceipt, setSimReceipt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const simMode = !config;

  useEffect(() => {
    if (!simMode) return;
    let cancelled = false;
    const depositor = wallet?.account.address;
    (async () => {
      const addresses = await deriveSimAddresses(
        project.slug,
        depositor ?? "11111111111111111111111111111111"
      );
      if (cancelled) return;
      setSim((current) =>
        current && current.escrow === addresses.escrow
          ? current
          : loadSimState(addresses.escrow, project.slug)
      );
      setSim((current) => (current ? { ...current, vault: addresses.vault } : current));
    })();
    return () => {
      cancelled = true;
    };
  }, [simMode, project.slug, wallet?.account.address]);

  async function deposit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSignature("");
    if (config && projectMapped) {
      await depositOnChain();
      return;
    }
    if (simMode) {
      await depositSimulated();
      return;
    }
    setError("This project has no project-bound devnet escrow configured.");
  }

  async function depositOnChain() {
    if (!config) return;
    if (cluster !== "devnet") {
      setError("Switch to Solana devnet before using the devnet escrow.");
      return;
    }
    if (!wallet?.account.address) {
      setError(
        "Connect a Solana wallet before signing a devnet test-token deposit."
      );
      return;
    }
    const tokenAmount = Number(amount);
    if (!Number.isFinite(tokenAmount) || tokenAmount <= 0) {
      setError("Enter a test-token amount greater than zero.");
      return;
    }
    const amountMinor = BigInt(Math.round(tokenAmount * 10 ** config.decimals));
    try {
      setStatus("preparing");
      const prepared = await prepareDevnetDeposit(
        client,
        address(wallet.account.address),
        amountMinor
      );
      setStatus("signing");
      const result = await client.sendTransaction(prepared.instructions);
      const txSignature = result.context.signature;
      setSignature(txSignature);
      setCommitments((current) => [
        ...current,
        {
          id: `devnet-${Date.now()}`,
          projectSlug: project.slug,
          projectName: project.name,
          walletAddress: wallet.account.address,
          amountUsd: 0,
          tokenAmount,
          tokenSymbol: "TEST",
          tokenMint: config.mint,
          transactionSignature: txSignature,
          createdAt: new Date().toISOString(),
          status: "devnet_confirmed",
        },
      ]);
      setStatus("confirmed");
    } catch (cause) {
      setStatus("error");
      setError(
        cause instanceof Error
          ? cause.message
          : "The devnet transaction failed. Confirm that this wallet holds the configured test token."
      );
    }
  }

  async function depositSimulated() {
    if (!sim || !wallet?.account.address) {
      setError("Connect a Solana wallet before recording a simulated deposit.");
      return;
    }
    const tokenAmount = Number(amount);
    if (!Number.isFinite(tokenAmount) || tokenAmount <= 0) {
      setError("Enter a test-token amount greater than zero.");
      return;
    }
    const amountMinor = BigInt(Math.round(tokenAmount * 10 ** SIM_DECIMALS));
    try {
      const { deposit: record, state: next } = await simulateDeposit(
        sim,
        wallet.account.address,
        amountMinor,
        (stage) => setStatus(stage)
      );
      saveSimState(project.slug, next);
      setSim(next);
      setSignature(record.signature);
      setSimReceipt(record.signature);
      setCommitments((current) => [
        ...current,
        {
          id: record.id,
          projectSlug: project.slug,
          projectName: project.name,
          walletAddress: wallet.account.address,
          amountUsd: 0,
          tokenAmount: record.tokenAmount,
          tokenSymbol: SIM_TOKEN_SYMBOL,
          tokenMint: SIM_MINT,
          transactionSignature: record.signature,
          createdAt: record.createdAt,
          status: "sandbox_recorded",
        },
      ]);
      setStatus("confirmed");
    } catch (cause) {
      setStatus("error");
      setError(
        cause instanceof Error ? cause.message : "The simulated deposit failed."
      );
    }
  }

  function resetSimulation() {
    resetSimState(project.slug);
    if (sim) setSim(loadSimState(sim.escrow, project.slug));
    setSimReceipt(null);
    setSignature("");
    setStatus("idle");
    setError("");
  }

  async function copySignature() {
    if (!signature) return;
    try {
      await navigator.clipboard.writeText(signature);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (insecure origin) or permission denied.
    }
  }

  const simulated = simMode && sim;
  const milestones = sim ? milestoneProgress(sim) : [];

  return (
    <section className="mt-8 border-t pt-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Devnet escrow
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium">
            {config && projectMapped
              ? "Sign a test-token deposit"
              : simulated
                ? "Simulate a test-token deposit"
                : "On-chain test deposits"}
          </h2>
        </div>
        <span
          className={
            config && projectMapped
              ? "bg-secondary px-2 py-1 text-[10px] font-semibold uppercase tracking-wider"
              : "border border-dashed px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
          }
        >
          {config && projectMapped ? "No real funds" : "Simulation"}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {config && projectMapped
          ? "This calls the deployed Aether escrow program with a configured disposable SPL test mint. It is not an investment or a commitment to the project."
          : "No on-chain escrow is configured for this deployment, so deposits run through a local simulation of the same escrow flow: real program-derived escrow and vault addresses, wallet-style signing stages, and a persistent vault balance. Nothing touches the network — this is not an investment or a commitment to the project."}
      </p>

      {config && projectMapped ? (
        <>
          <div className="mt-5 grid gap-3 text-xs text-muted-foreground">
            <p>
              Program{" "}
              <span className="font-mono tabular-nums text-foreground">
                {ellipsify(AETHER_ESCROW_PROGRAM_ID, 6)}
              </span>
            </p>
            <p>
              Escrow{" "}
              <span className="font-mono tabular-nums text-foreground">
                {ellipsify(config.escrow, 6)}
              </span>
            </p>
            <p>
              Mint{" "}
              <span className="font-mono tabular-nums text-foreground">
                {ellipsify(config.mint, 6)}
              </span>
            </p>
          </div>
          <form onSubmit={deposit} className="mt-6">
            <label>
              <span className="mb-2 block text-sm font-semibold">
                Test tokens
              </span>
              <input
                type="number"
                min="0.000001"
                step="0.000001"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="min-h-11 w-full border bg-background px-3 font-mono text-sm tabular-nums focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            {error && (
              <p
                role="alert"
                className="mt-4 break-words text-sm font-medium text-destructive"
              >
                {error}
              </p>
            )}
            {status === "confirmed" && signature && (
              <p
                role="status"
                className="mt-4 text-sm font-medium text-primary"
              >
                Confirmed on devnet.{" "}
                <a
                  href={getExplorerUrl(`/tx/${signature}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4"
                >
                  View transaction
                </a>
              </p>
            )}
            <button
              type="submit"
              disabled={status === "preparing" || status === "signing"}
              className="mt-6 min-h-11 w-full bg-primary px-4 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
            >
              {status === "preparing"
                ? "Preparing..."
                : status === "signing"
                  ? "Waiting for wallet..."
                  : "Review and sign deposit"}
            </button>
          </form>
        </>
      ) : simulated ? (
        <>
          <div className="mt-5 grid gap-3 text-xs text-muted-foreground">
            <p>
              Program{" "}
              <span className="font-mono tabular-nums text-foreground">
                {ellipsify(AETHER_ESCROW_PROGRAM_ID, 6)}
              </span>
            </p>
            <p>
              Escrow{" "}
              <span className="font-mono tabular-nums text-foreground">
                {ellipsify(sim.escrow, 6)}
              </span>
            </p>
            <p>
              Vault{" "}
              <span className="font-mono tabular-nums text-foreground">
                {ellipsify(sim.vault, 6)}
              </span>
            </p>
            <p>
              Mint{" "}
              <span className="font-mono tabular-nums text-foreground">
                {ellipsify(SIM_MINT, 6)}
              </span>
            </p>
            <p>
              Vault balance{" "}
              <span className="font-mono tabular-nums text-foreground">
                {formatSimAmount(sim.vaultMinor)} {SIM_TOKEN_SYMBOL}
              </span>
            </p>
          </div>

          <ol className="mt-5 space-y-3">
            {milestones.map((m) => {
              const pct =
                m.targetMinor === 0n
                  ? 0
                  : Math.min(
                      100,
                      Number(
                        (m.fundedMinor * 10000n) / (m.targetMinor || 1n)
                      ) / 100
                    );
              return (
                <li key={m.index}>
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-semibold">
                      Milestone {m.index + 1}
                    </span>
                    <span className="font-mono tabular-nums text-muted-foreground">
                      {formatSimAmount(m.fundedMinor)} /{" "}
                      {formatSimAmount(m.targetMinor)} {SIM_TOKEN_SYMBOL}
                    </span>
                  </div>
                  <div
                    className="mt-1 h-1.5 w-full bg-secondary"
                    role="presentation"
                  >
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ol>

          <form onSubmit={deposit} className="mt-6">
            <label>
              <span className="mb-2 block text-sm font-semibold">
                Test tokens
              </span>
              <input
                type="number"
                min="0.000001"
                step="0.000001"
                inputMode="decimal"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="min-h-11 w-full border bg-background px-3 font-mono text-sm tabular-nums focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            {error && (
              <p
                role="alert"
                className="mt-4 break-words text-sm font-medium text-destructive"
              >
                {error}
              </p>
            )}
            {status === "confirmed" && simReceipt && (
              <div
                role="status"
                className="mt-4 border border-dashed p-3 text-xs"
              >
                <p className="font-semibold text-primary">
                  Confirmed (simulated).
                </p>
                <p className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="font-mono break-all text-muted-foreground">
                    {simReceipt}
                  </span>
                  <button
                    type="button"
                    onClick={copySignature}
                    className="min-h-8 border px-2 font-semibold focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {copied ? "Copied" : "Copy signature"}
                  </button>
                </p>
                <p className="mt-2 text-muted-foreground">
                  Simulated receipt — the signature is local-only and will not
                  resolve on an explorer.
                </p>
              </div>
            )}
            <button
              type="submit"
              disabled={status === "preparing" || status === "signing"}
              className="mt-6 min-h-11 w-full bg-primary px-4 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
            >
              {status === "preparing"
                ? "Preparing..."
                : status === "signing"
                  ? "Waiting for wallet..."
                  : status === "confirming"
                    ? "Confirming deposit..."
                    : "Review and sign deposit"}
            </button>
            {sim.deposits.length > 0 && (
              <button
                type="button"
                onClick={resetSimulation}
                className="mt-3 min-h-9 w-full border px-4 text-xs font-semibold text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                Reset simulation
              </button>
            )}
          </form>

          {sim.deposits.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Deposit history
              </p>
              <ul className="mt-3 divide-y border">
                {[...sim.deposits].reverse().map((d) => (
                  <li
                    key={d.id}
                    className="flex items-baseline justify-between gap-3 px-3 py-2 text-xs"
                  >
                    <span className="font-mono tabular-nums">
                      {formatSimAmount(d.amountMinor)} {SIM_TOKEN_SYMBOL}
                    </span>
                    <span className="truncate font-mono text-muted-foreground">
                      {ellipsify(d.signature, 6)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className="mt-6 border border-dashed p-5">
          <p className="text-sm font-semibold">
            The live devnet escrow is bound to another project room.
          </p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            This deployment carries one project-bound test escrow, so on-chain
            test deposits are enabled only for the {config?.projectSlug} room.
            Local planning commitments stay available here.
          </p>
          <Link
            href="/portfolio"
            className="mt-4 inline-flex min-h-10 items-center border px-3 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-ring"
          >
            Open portfolio
          </Link>
        </div>
      )}
    </section>
  );
}
