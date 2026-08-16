"use client";

import Link from "next/link";
import { useState } from "react";
import type { InvestmentProject } from "@/src/domain/project";
import { formatCompactCurrency, formatPercent } from "@/src/lib/format-number";
import { AETHER_STORAGE_KEYS, useAetherStorage } from "../lib/aether-storage";

export function FunderWorkspace({
  projects,
}: {
  projects: InvestmentProject[];
}) {
  const [shortlist, setShortlist, ready] = useAetherStorage<string[]>(
    AETHER_STORAGE_KEYS.funderShortlist,
    []
  );
  const [sector, setSector] = useState("all");
  const [model, setModel] = useState("all");
  const filtered = projects.filter(
    (project) =>
      (sector === "all" || project.sector === sector) &&
      (model === "all" || project.fundingModel === model)
  );
  const sectors = [
    ...new Set(projects.map((project) => project.sector)),
  ].sort();

  function toggle(projectSlug: string) {
    setShortlist((current) =>
      current.includes(projectSlug)
        ? current.filter((slug) => slug !== projectSlug)
        : [...current, projectSlug]
    );
  }

  return (
    <div className="mt-12 grid gap-12 lg:grid-cols-12">
      <section className="lg:col-span-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Pipeline
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium">
              Project rooms to review
            </h2>
          </div>
          <span className="font-mono text-sm tabular-nums text-muted-foreground">
            {filtered.length} shown
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <select
            value={sector}
            onChange={(event) => setSector(event.target.value)}
            className="min-h-10 border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">All sectors</option>
            {sectors.map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
          <select
            value={model}
            onChange={(event) => setModel(event.target.value)}
            className="min-h-10 border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">All funding models</option>
            <option>Revenue share</option>
            <option>Grant</option>
            <option>Debt</option>
            <option>Equity</option>
          </select>
        </div>
        <div className="mt-6 divide-y border-y">
          {filtered.map((project) => (
            <FunderProjectRow
              key={project.id}
              project={project}
              shortlisted={shortlist.includes(project.slug)}
              onToggle={() => toggle(project.slug)}
            />
          ))}
        </div>
      </section>
      <aside className="lg:col-span-4">
        <div className="border bg-card p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Funder brief
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium">
            A clearer way to build a mandate.
          </h2>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            Use Aether to compare project context, funding model, risk, operator
            type, and milestone evidence before a partnership conversation.
          </p>
          <dl className="mt-6 divide-y border-y">
            <Metric label="Project rooms" value={`${projects.length}`} />
            <Metric label="Shortlisted" value={`${shortlist.length}`} />
            <Metric
              label="Markets"
              value={`${new Set(projects.map((project) => project.country)).size}`}
            />
          </dl>
          <Link
            href="/funding"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center bg-primary px-4 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Explore funding sources
          </Link>
          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            {ready
              ? "Shortlists are saved in this browser."
              : "Loading local shortlist..."}{" "}
            No investment decision is made here.
          </p>
        </div>
      </aside>
    </div>
  );
}

function FunderProjectRow({
  project,
  shortlisted,
  onToggle,
}: {
  project: InvestmentProject;
  shortlisted: boolean;
  onToggle: () => void;
}) {
  const fundedPercent = (project.fundedUsd / project.targetUsd) * 100;
  return (
    <article className="grid gap-5 py-6 lg:grid-cols-[1fr_auto]">
      <div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="bg-secondary px-2 py-1">{project.country}</span>
          <span className="bg-secondary px-2 py-1">{project.fundingModel}</span>
          <span className="bg-secondary px-2 py-1">
            Grade {project.riskGrade}
          </span>
        </div>
        <h3 className="mt-3 font-serif text-3xl font-medium">{project.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {project.operator} / {project.sector}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          {project.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-5 text-xs text-muted-foreground">
          <span>
            Target{" "}
            <strong className="font-mono tabular-nums text-foreground">
              {formatCompactCurrency(project.targetUsd)}
            </strong>
          </span>
          <span>
            Funded{" "}
            <strong className="font-mono tabular-nums text-foreground">
              {formatPercent(fundedPercent)}
            </strong>
          </span>
          <span>
            Impact{" "}
            <strong className="font-mono tabular-nums text-foreground">
              {project.impactValue}
            </strong>
          </span>
        </div>
      </div>
      <div className="flex items-start gap-2 lg:flex-col lg:items-end">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={shortlisted}
          className="min-h-10 border px-3 text-xs font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
        >
          {shortlisted ? "Shortlisted" : "Shortlist"}
        </button>
        <Link
          href={`/projects/${project.slug}`}
          className="inline-flex min-h-10 items-center border-b px-2 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-ring"
        >
          Open room -&gt;
        </Link>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="font-mono text-lg font-medium tabular-nums">{value}</dd>
    </div>
  );
}
