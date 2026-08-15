"use client";

import Link from "next/link";
import type { ProjectDraft } from "@/src/domain/investment";
import { formatDetailedCurrency } from "@/src/lib/format-number";
import { AETHER_STORAGE_KEYS, useAetherStorage } from "../lib/aether-storage";

export function OperatorWorkspace() {
  const [drafts, setDrafts, ready] = useAetherStorage<ProjectDraft[]>(
    AETHER_STORAGE_KEYS.projectDrafts,
    []
  );

  if (!ready) return <div className="mt-10 h-56 animate-pulse bg-secondary" />;

  if (drafts.length === 0) {
    return (
      <div className="mt-10 border border-dashed p-10 text-center">
        <h2 className="font-serif text-3xl font-medium">
          No local drafts yet.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          Start a project brief to create an inspectable starting point for
          operator review.
        </p>
        <Link
          href="/projects/submit"
          className="mt-6 inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Start a project brief
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 divide-y border-y">
      {drafts.map((draft) => (
        <article
          key={draft.id}
          className="grid gap-5 py-6 md:grid-cols-[1fr_auto] md:items-start"
        >
          <div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="bg-secondary px-2 py-1">Draft</span>
              <span className="bg-secondary px-2 py-1">
                {draft.fundingModel}
              </span>
              <span className="bg-secondary px-2 py-1">
                {draft.fundingCadence}
              </span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-medium">
              {draft.projectName}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {draft.operatorName} / {draft.country} / {draft.sector}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              {draft.summary}
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-xs text-muted-foreground">Funding target</p>
            <p className="mt-2 font-mono text-xl font-medium tabular-nums">
              {formatDetailedCurrency(draft.targetUsd)}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Saved {formatDate(draft.createdAt)}
            </p>
            <button
              type="button"
              onClick={() =>
                setDrafts(drafts.filter((item) => item.id !== draft.id))
              }
              className="mt-5 min-h-10 border px-3 text-xs font-semibold text-destructive hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-ring"
            >
              Delete draft
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(value)
  );
}
