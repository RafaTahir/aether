"use client";

import Link from "next/link";
import { formatDetailedCurrency } from "@/src/lib/format-number";
import type { ProjectDraft } from "@/src/domain/investment";
import type { OperatorWorkspaceState } from "../operator/data";
import { AETHER_STORAGE_KEYS, useAetherStorage } from "../lib/aether-storage";

export function OperatorWorkspace({
  state,
}: {
  state: OperatorWorkspaceState;
}) {
  const [localDrafts, setLocalDrafts, localReady] = useAetherStorage<
    ProjectDraft[]
  >(AETHER_STORAGE_KEYS.projectDrafts, []);

  if (state.kind === "unconfigured") {
    return (
      <LocalOperatorWorkspace
        drafts={localDrafts}
        ready={localReady}
        setDrafts={setLocalDrafts}
      />
    );
  }

  if (state.kind === "signed_out") {
    return (
      <WorkspaceMessage
        title="Sign in to view your rooms"
        body="Your project rooms belong to your account and are not stored in this browser."
        href="/auth?next=/operator"
        label="Sign in"
      />
    );
  }

  if (state.kind === "error") {
    return (
      <div className="mt-10 border border-destructive/40 bg-destructive/5 p-8">
        <h2 className="font-serif text-3xl font-medium">
          The workspace could not load.
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {state.message}
        </p>
      </div>
    );
  }

  if (state.submissions.length === 0) {
    return (
      <WorkspaceMessage
        title="No project rooms yet"
        body="Start an intake, save it as a draft, or submit it for reviewer feedback."
        href="/projects/submit"
        label="Start a project room"
      />
    );
  }

  return (
    <div className="mt-10 divide-y border-y">
      {state.submissions.map((submission) => (
        <article
          key={submission.id}
          className="grid gap-6 py-7 md:grid-cols-[1fr_auto] md:items-start"
        >
          <div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <StatusBadge status={submission.status} />
              <span className="bg-secondary px-2 py-1">
                {submission.funding_model}
              </span>
              <span className="bg-secondary px-2 py-1">
                {submission.funding_cadence}
              </span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-medium">
              {submission.project_name}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {submission.operator_name} / {submission.country} /{" "}
              {submission.sector}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              {submission.summary}
            </p>
            {submission.reviewer_notes && (
              <div className="mt-5 border-l-2 border-primary pl-4 text-sm leading-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Reviewer note
                </p>
                <p className="mt-1">{submission.reviewer_notes}</p>
              </div>
            )}
          </div>
          <div className="md:min-w-44 md:text-right">
            <p className="text-xs text-muted-foreground">Funding target</p>
            <p className="mt-2 font-mono text-xl font-medium tabular-nums">
              {formatDetailedCurrency(Number(submission.target_usd))}
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Updated {formatDate(submission.updated_at)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {submission.submitted_at
                ? `Submitted ${formatDate(submission.submitted_at)}`
                : "Not submitted for review"}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}

function LocalOperatorWorkspace({
  drafts,
  ready,
  setDrafts,
}: {
  drafts: ProjectDraft[];
  ready: boolean;
  setDrafts: (
    next: ProjectDraft[] | ((current: ProjectDraft[]) => ProjectDraft[])
  ) => void;
}) {
  if (!ready) return <div className="mt-10 h-56 animate-pulse bg-secondary" />;
  if (drafts.length === 0) {
    return (
      <WorkspaceMessage
        title="No browser rooms yet"
        body="Create a project room to explore the full intake flow on this device. Connect Supabase later to make it account-backed and reviewable by your team."
        href="/projects/submit"
        label="Start a project room"
      />
    );
  }

  return (
    <div className="mt-10 border-y divide-y">
      <div className="flex flex-wrap items-center justify-between gap-3 py-4 text-xs text-muted-foreground">
        <span className="font-semibold uppercase tracking-widest">
          Browser workspace
        </span>
        <span>
          {drafts.length} room{drafts.length === 1 ? "" : "s"}
        </span>
      </div>
      {drafts.map((draft) => (
        <article
          key={draft.id}
          className="grid gap-5 py-6 md:grid-cols-[1fr_auto]"
        >
          <div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="bg-primary/10 px-2 py-1 capitalize text-primary">
                {draft.status}
              </span>
              <span className="bg-secondary px-2 py-1">
                {draft.fundingModel}
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
            <button
              type="button"
              onClick={() =>
                setDrafts(drafts.filter((item) => item.id !== draft.id))
              }
              className="mt-5 min-h-10 border px-3 text-xs font-semibold text-destructive hover:bg-destructive/10 focus-visible:ring-2 focus-visible:ring-ring"
            >
              Remove room
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function WorkspaceMessage({
  title,
  body,
  href,
  label,
}: {
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <div className="mt-10 border border-dashed p-10 text-center">
      <h2 className="font-serif text-3xl font-medium">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        {body}
      </p>
      <Link
        href={href}
        className="mt-6 inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {label}
      </Link>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const label = status.replaceAll("_", " ");
  return (
    <span className="bg-primary/10 px-2 py-1 capitalize text-primary">
      {label}
    </span>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(value)
  );
}
