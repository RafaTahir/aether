"use client";

import { useState, useTransition } from "react";
import { reviewProjectSubmission, type ProjectReviewStatus } from "./actions";

export type ReviewSubmission = {
  id: string;
  project_name: string;
  operator_name: string;
  operator_type: string;
  country: string;
  sector: string;
  funding_cadence: string;
  funding_model: string;
  target_usd: number;
  summary: string;
  status: string;
  reviewer_notes: string | null;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
};

const reviewStatuses: ProjectReviewStatus[] = [
  "under_review",
  "needs_changes",
  "approved",
  "rejected",
];

export function ProjectReviewQueue({
  submissions,
}: {
  submissions: ReviewSubmission[];
}) {
  if (submissions.length === 0) {
    return (
      <div className="border border-dashed p-10 text-center">
        <h2 className="font-serif text-3xl font-medium">No submissions yet.</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Submitted project rooms will appear here for review.
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y border-y">
      {submissions.map((submission) => (
        <ReviewCard key={submission.id} submission={submission} />
      ))}
    </div>
  );
}

function ReviewCard({ submission }: { submission: ReviewSubmission }) {
  const [status, setStatus] = useState<ProjectReviewStatus>(
    reviewStatuses.includes(submission.status as ProjectReviewStatus)
      ? (submission.status as ProjectReviewStatus)
      : "under_review"
  );
  const [notes, setNotes] = useState(submission.reviewer_notes ?? "");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function saveReview() {
    setMessage("");
    startTransition(async () => {
      const result = await reviewProjectSubmission(
        submission.id,
        status,
        notes
      );
      setMessage(result.ok ? "Review saved." : result.error);
    });
  }

  return (
    <article className="grid gap-8 py-8 lg:grid-cols-[1fr_22rem]">
      <div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="bg-primary/10 px-2 py-1 capitalize text-primary">
            {submission.status.replaceAll("_", " ")}
          </span>
          <span className="bg-secondary px-2 py-1">
            {submission.funding_model}
          </span>
          <span className="bg-secondary px-2 py-1">{submission.country}</span>
        </div>
        <h2 className="mt-4 font-serif text-4xl font-medium">
          {submission.project_name}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {submission.operator_name} / {submission.operator_type} /{" "}
          {submission.sector}
        </p>
        <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground">
          {submission.summary}
        </p>
        <dl className="mt-8 grid gap-4 border-y py-5 sm:grid-cols-3">
          <Detail
            label="Target"
            value={`$${Number(submission.target_usd).toLocaleString()}`}
          />
          <Detail label="Shape" value={submission.funding_cadence} />
          <Detail
            label="Submitted"
            value={
              submission.submitted_at
                ? formatDate(submission.submitted_at)
                : "Draft"
            }
          />
        </dl>
      </div>
      <div className="border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Review decision
        </p>
        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-semibold">Status</span>
          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as ProjectReviewStatus)
            }
            className="min-h-11 w-full border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
          >
            {reviewStatuses.map((value) => (
              <option key={value} value={value}>
                {value.replaceAll("_", " ")}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-semibold">
            Reviewer note
          </span>
          <textarea
            rows={6}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="What should the operator clarify or provide next?"
            className="w-full resize-y border bg-background px-3 py-3 text-sm leading-6 focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
        {message && (
          <p role="status" className="mt-4 text-sm font-medium text-primary">
            {message}
          </p>
        )}
        <button
          type="button"
          onClick={saveReview}
          disabled={isPending}
          className="mt-5 min-h-11 w-full bg-primary px-4 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
        >
          {isPending ? "Saving review..." : "Save review"}
        </button>
      </div>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-2 text-sm font-medium">{value}</dd>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(value)
  );
}
