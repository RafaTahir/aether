"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { address } from "@solana/kit";
import { useConnectedWallet } from "@solana/kit-plugin-wallet/react";
import type { InvestmentProject } from "@/src/domain/project";
import type { SandboxCommitment } from "@/src/domain/investment";
import { AETHER_STORAGE_KEYS, useAetherStorage } from "../lib/aether-storage";
import { useAppClient } from "../lib/client-provider";
import {
  getConfiguredDevnetEscrow,
  prepareDevnetDeposit,
} from "../lib/aether-escrow-client";
import { useCluster } from "./cluster-context";
import { ellipsify } from "../lib/explorer";

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
  const [status, setStatus] = useState<
    "idle" | "preparing" | "signing" | "confirmed" | "error"
  >("idle");
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");

  if (!config || !projectMapped) return null;

  async function deposit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSignature("");
    if (!config || !projectMapped) {
      setError("This project has no project-bound devnet escrow configured.");
      return;
    }
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

  return (
    <section className="mt-8 border-t pt-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Devnet escrow
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium">
            Sign a test-token deposit
          </h2>
        </div>
        <span className="bg-secondary px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">
          No real funds
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        This calls the deployed Aether escrow program with a configured
        disposable SPL test mint. It is not an investment or a commitment to the
        project.
      </p>
      {config && projectMapped ? (
        <>
          <div className="mt-5 grid gap-3 text-xs text-muted-foreground">
            <p>
              Program{" "}
              <span className="font-mono tabular-nums text-foreground">
                {ellipsify("BzxhTouVDYHDurdAV5J2fi1paES87nKY9WXVFPZ3eGKj", 6)}
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
      ) : (
        <div className="mt-6 border border-dashed p-5">
          <p className="text-sm font-semibold">
            Devnet escrow configuration is not set for this deployment.
          </p>
          <p className="mt-2 text-xs leading-5 text-muted-foreground">
            Set `NEXT_PUBLIC_AETHER_ESCROW_PROJECT_SLUG` together with the
            project-bound escrow, mint, and decimal settings before enabling
            this action.
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
