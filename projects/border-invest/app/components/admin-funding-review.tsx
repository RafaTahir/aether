"use client";

import { useMemo, useState } from "react";
import type { FundingReviewState, FundingSource } from "@/src/domain/funding";
import { AETHER_STORAGE_KEYS, useAetherStorage } from "../lib/aether-storage";
import { reviewFundingSource } from "../admin/funding/actions";

type ReviewOverride = { state: FundingReviewState; reviewedAt: string };

export function AdminFundingReview({
  sources,
  backendEnabled = false,
}: {
  sources: FundingSource[];
  backendEnabled?: boolean;
}) {
  const [overrides, setOverrides, ready] = useAetherStorage<
    Record<string, ReviewOverride>
  >(AETHER_STORAGE_KEYS.fundingReviewOverrides, {});
  const [filter, setFilter] = useState<FundingReviewState | "all">("all");
  const [query, setQuery] = useState("");
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const records = useMemo(
    () =>
      sources
        .map((source) => ({
          source,
          review: overrides[source.id],
          state: overrides[source.id]?.state ?? source.reviewState,
        }))
        .filter(({ source, state }) => {
          const normalized = query.trim().toLowerCase();
          return (
            (!normalized ||
              `${source.name} ${source.kind}`
                .toLowerCase()
                .includes(normalized)) &&
            (filter === "all" || state === filter)
          );
        }),
    [filter, overrides, query, sources]
  );

  function updateState(sourceId: string, state: FundingReviewState) {
    setOverrides((current) => ({
      ...current,
      [sourceId]: { state, reviewedAt: new Date().toISOString() },
    }));
    if (!backendEnabled) return;
    setSavingId(sourceId);
    setError("");
    void reviewFundingSource(sourceId, state)
      .then((result) => {
        if (!result.ok) setError(result.error ?? "Review failed.");
      })
      .finally(() => setSavingId(""));
  }

  const counts = sources.reduce<Record<FundingReviewState, number>>(
    (accumulator, source) => {
      const state = overrides[source.id]?.state ?? source.reviewState;
      accumulator[state] += 1;
      return accumulator;
    },
    { published: 0, needs_review: 0, paused: 0 }
  );

  return (
    <div className="mt-10">
      <div className="grid gap-4 sm:grid-cols-3">
        <AdminMetric label="Published" value={counts.published} />
        <AdminMetric label="Needs review" value={counts.needs_review} />
        <AdminMetric label="Paused" value={counts.paused} />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search source names"
          className="min-h-11 min-w-64 border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
        />
        <select
          value={filter}
          onChange={(event) =>
            setFilter(event.target.value as FundingReviewState | "all")
          }
          className="min-h-11 border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="all">All review states</option>
          <option value="published">Published</option>
          <option value="needs_review">Needs review</option>
          <option value="paused">Paused</option>
        </select>
      </div>
      {error && (
        <p role="alert" className="mt-4 text-sm font-medium text-destructive">
          {error}
        </p>
      )}
      {!ready ? (
        <div className="mt-8 h-48 animate-pulse bg-secondary" />
      ) : (
        <div className="mt-8 divide-y border-y">
          {records.map(({ source, review, state }) => (
            <article
              key={source.id}
              className="grid gap-6 py-6 lg:grid-cols-[1fr_auto]"
            >
              <div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="bg-secondary px-2 py-1">{source.kind}</span>
                  <span
                    className={
                      state === "published"
                        ? "bg-primary/10 px-2 py-1 text-primary"
                        : state === "paused"
                          ? "bg-destructive/10 px-2 py-1 text-destructive"
                          : "bg-secondary px-2 py-1"
                    }
                  >
                    {state.replace("_", " ")}
                  </span>
                </div>
                <h2 className="mt-3 font-serif text-3xl font-medium">
                  {source.name}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {source.verificationStatus}. Last source check:{" "}
                  {source.lastVerified}.{" "}
                  {review
                    ? `Local review: ${formatDate(review.reviewedAt)}.`
                    : "No local review override."}
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold">
                  <a
                    href={source.officialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Open official source
                  </a>
                  <a
                    href={source.applicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Open application page
                  </a>
                </div>
              </div>
              <div className="flex flex-wrap items-start gap-2 lg:flex-col lg:items-end">
                <select
                  disabled={savingId === source.id}
                  aria-label={`Review state for ${source.name}`}
                  value={state}
                  onChange={(event) =>
                    updateState(
                      source.id,
                      event.target.value as FundingReviewState
                    )
                  }
                  className="min-h-10 border bg-background px-3 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                >
                  <option value="published">Publish</option>
                  <option value="needs_review">Needs review</option>
                  <option value="paused">Pause</option>
                </select>
                <button
                  disabled={savingId === source.id}
                  type="button"
                  onClick={() => updateState(source.id, "published")}
                  className="min-h-10 border px-3 text-xs font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                >
                  {savingId === source.id ? "Saving..." : "Mark checked today"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="border bg-card p-5">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 font-mono text-2xl font-medium tabular-nums">
        {value}
      </p>
    </div>
  );
}
function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(value)
  );
}
