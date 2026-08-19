import Link from "next/link";
import { formatDetailedCurrency } from "@/src/lib/format-number";
import type { OperatorWorkspaceState } from "../operator/data";

export function OperatorWorkspace({
  state,
}: {
  state: OperatorWorkspaceState;
}) {
  if (state.kind === "unconfigured") {
    return (
      <WorkspaceMessage
        title="Connect the intake workspace"
        body="Supabase is not configured for this deployment. Add the project URL and anon key before accepting operator submissions."
        href="/auth"
        label="Open sign in"
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
