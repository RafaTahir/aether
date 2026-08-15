"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useConnectedWallet } from "@solana/kit-plugin-wallet/react";
import type {
  DemoEligibilityRecord,
  SandboxCommitment,
} from "@/src/domain/investment";
import type { InvestmentProject } from "@/src/domain/project";
import { formatDetailedCurrency } from "@/src/lib/format-number";
import { AETHER_STORAGE_KEYS, useAetherStorage } from "../lib/aether-storage";
import { useAppClient } from "../lib/client-provider";

export function SandboxCommitmentPanel({
  project,
}: {
  project: InvestmentProject;
}) {
  const client = useAppClient();
  const wallet = useConnectedWallet(client);
  const [eligibility] = useAetherStorage<DemoEligibilityRecord | null>(
    AETHER_STORAGE_KEYS.eligibility,
    null
  );
  const [commitments, setCommitments, ready] = useAetherStorage<
    SandboxCommitment[]
  >(AETHER_STORAGE_KEYS.commitments, []);
  const [amount, setAmount] = useState(String(project.minimumUsd));
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function recordCommitment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    const parsedAmount = Number(amount);

    if (!wallet?.account.address) {
      setError(
        "Connect a Solana devnet wallet from the header before recording a sandbox commitment."
      );
      return;
    }
    if (eligibility?.status !== "demo_eligible") {
      setError(
        "Complete demo eligibility first. This is a local prototype check, not legal eligibility."
      );
      return;
    }
    if (!Number.isFinite(parsedAmount) || parsedAmount < project.minimumUsd) {
      setError(
        `Enter at least ${formatDetailedCurrency(project.minimumUsd)} for this demo project.`
      );
      return;
    }
    if (parsedAmount > project.targetUsd - project.fundedUsd) {
      setError("The demo amount cannot exceed the remaining fictional target.");
      return;
    }

    setCommitments([
      ...commitments,
      {
        id: `sandbox-${Date.now()}`,
        projectSlug: project.slug,
        projectName: project.name,
        walletAddress: wallet.account.address,
        amountUsd: parsedAmount,
        createdAt: new Date().toISOString(),
        status: "sandbox_recorded",
      },
    ]);
    setMessage(
      "Sandbox commitment recorded. No wallet signature, token transfer, or funds moved."
    );
  }

  return (
    <div className="mt-8 border-t pt-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Sandbox action
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium">
            Model a commitment
          </h2>
        </div>
        <span className="bg-secondary px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">
          No funds
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        This demonstrates the intended product sequence. It stores a local
        record only and never prepares or sends a transaction.
      </p>
      <form onSubmit={recordCommitment} className="mt-6">
        <label>
          <span className="mb-2 block text-sm font-semibold">
            Demo amount (USD)
          </span>
          <input
            type="number"
            min={project.minimumUsd}
            max={project.targetUsd - project.fundedUsd}
            step="1"
            inputMode="decimal"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            className="min-h-11 w-full border bg-background px-3 font-mono text-sm tabular-nums focus-visible:ring-2 focus-visible:ring-ring"
            disabled={!ready}
          />
        </label>
        <div className="mt-4 grid gap-2 text-xs text-muted-foreground">
          <p>
            Minimum:{" "}
            <span className="font-mono tabular-nums">
              {formatDetailedCurrency(project.minimumUsd)}
            </span>
          </p>
          <p>
            Remaining fictional target:{" "}
            <span className="font-mono tabular-nums">
              {formatDetailedCurrency(project.targetUsd - project.fundedUsd)}
            </span>
          </p>
        </div>
        {error && (
          <p role="alert" className="mt-4 text-sm font-medium text-destructive">
            {error}
          </p>
        )}
        {message && (
          <p role="status" className="mt-4 text-sm font-medium text-primary">
            {message}
          </p>
        )}
        <button
          type="submit"
          disabled={!ready}
          className="mt-6 min-h-11 w-full bg-primary px-4 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
        >
          Record sandbox commitment
        </button>
      </form>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold">
        {!wallet?.account.address && (
          <span className="text-muted-foreground">
            Connect wallet in the header
          </span>
        )}
        {eligibility?.status !== "demo_eligible" && (
          <Link
            href="/onboarding"
            className="text-primary underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring"
          >
            Run demo eligibility
          </Link>
        )}
      </div>
    </div>
  );
}
