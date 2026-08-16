"use client";

import { useState } from "react";
import type { FundingMatch } from "@/src/domain/funding";
import type { InvestmentProject } from "@/src/domain/project";

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
    match?.source.kind === "Government grant"
      ? [
          ...baseItems,
          "Local authority or public-partner coordination is documented",
        ]
      : [
          ...baseItems,
          "The funding model and participant rights have received legal review",
        ];
  const [checked, setChecked] = useState<string[]>([]);
  const progress = Math.round((checked.length / items.length) * 100);

  function toggle(item: string) {
    setChecked((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item]
    );
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
      <div className="mt-5 h-1.5 bg-secondary">
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
    </section>
  );
}
