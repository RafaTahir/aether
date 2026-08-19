"use client";

import { useState, useTransition } from "react";
import type { FundingMatch } from "@/src/domain/funding";
import type { InvestmentProject } from "@/src/domain/project";
import { createFundingApplication } from "../funding/actions";

const baseItems = [
  "Operator identity and entity details are ready",
  "Use of funds and target budget are documented",
  "Milestones have evidence and approval owners",
  "Risks, currency exposure, and assumptions are written plainly",
];

export function FundingReadinessChecklist({
  project,
  match,
}: {
  project: InvestmentProject;
  match?: FundingMatch;
}) {
  const items =
    match?.source.kind === "Multilateral grant"
      ? [
          ...baseItems,
          "Local authority or public-partner coordination is documented",
        ]
      : [
          ...baseItems,
          "The funding model and participant rights have received legal review",
        ];
  const [checked, setChecked] = useState<string[]>([]);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const progress = Math.round((checked.length / items.length) * 100);

  function toggle(item: string) {
    setChecked((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item]
    );
  }

  function createApplicationRecord() {
    if (!match) return;
    if (progress < 100) {
      setMessage(
        "Complete the readiness checklist before creating the record."
      );
      return;
    }
    setMessage("");
    startTransition(async () => {
      const result = await createFundingApplication(
        project.slug,
        match.source.id
      );
      if (result.ok) {
        setApplicationId(result.application.id);
        setMessage(
          result.existing
            ? "This application record already exists in your workspace."
            : "Application record created in your workspace."
        );
      } else {
        setMessage(result.error);
      }
    });
  }

  return (
    <section className="border bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Application readiness
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium">
            Prepare the room.
          </h2>
        </div>
        <span className="font-mono text-sm font-medium tabular-nums">
          {progress}%
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        A local checklist for {project.name}. Completing it does not submit an
        application or establish eligibility.
      </p>
      <div
        className="mt-5 h-1.5 bg-secondary"
        role="progressbar"
        aria-label="Application readiness"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
      >
        <div
          className="h-full bg-primary transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-5 divide-y border-y">
        {items.map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-start gap-3 py-4 text-sm leading-6"
          >
            <input
              type="checkbox"
              checked={checked.includes(item)}
              onChange={() => toggle(item)}
              className="mt-1 size-4 accent-primary focus-visible:ring-2 focus-visible:ring-ring"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      {match && (
        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          Selected source:{" "}
          <span className="font-semibold text-foreground">
            {match.source.name}
          </span>
          . Next step: {match.source.applicationMode.toLowerCase()}.
        </p>
      )}
      {match && (
        <div className="mt-6 border-t pt-5">
          <button
            type="button"
            onClick={createApplicationRecord}
            disabled={isPending || progress < 100}
            className="min-h-11 w-full bg-primary px-4 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending
              ? "Creating record..."
              : applicationId
                ? "Application record created"
                : "Create application record"}
          </button>
          <p className="mt-3 text-xs leading-5 text-muted-foreground">
            This records your preparation in Aether. It does not submit an
            external application or establish legal eligibility.
          </p>
          {message && (
            <p role="status" className="mt-3 text-sm font-medium text-primary">
              {message}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
