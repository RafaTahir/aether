"use client";

import { useMemo, useState } from "react";
import type {
  FundingMatch,
  FundingSource,
  FundingSourceKind,
} from "@/src/domain/funding";
import type { InvestmentProject } from "@/src/domain/project";
import { formatPercent } from "@/src/lib/format-number";
import { matchFundingSources } from "@/src/lib/funding-match";
import { FundingReadinessChecklist } from "./funding-readiness-checklist";

export function FundingDirectory({
  sources,
  projects,
}: {
  sources: FundingSource[];
  projects: InvestmentProject[];
}) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<FundingSourceKind | "all">("all");
  const [country, setCountry] = useState("all");
  const [selectedProjectSlug, setSelectedProjectSlug] = useState("");
  const [selectedSourceId, setSelectedSourceId] = useState("");
  const selectedProject = projects.find(
    (project) => project.slug === selectedProjectSlug
  );
  const matches = useMemo(
    () =>
      selectedProject ? matchFundingSources(selectedProject, sources) : [],
    [selectedProject, sources]
  );
  const matchBySource = useMemo(
    () => new Map(matches.map((match) => [match.source.id, match])),
    [matches]
  );
  const countries = useMemo(
    () =>
      [
        ...new Set(
          sources.flatMap((source) =>
            source.countries.filter((value) => value !== "Southeast Asia")
          )
        ),
      ].sort(),
    [sources]
  );
  const filteredSources = useMemo(
    () =>
      sources
        .filter((source) => {
          const normalized = query.trim().toLowerCase();
          const searchable =
            `${source.name} ${source.kind} ${source.description} ${source.sectors.join(" ")}`.toLowerCase();
          return (
            (!normalized || searchable.includes(normalized)) &&
            (kind === "all" || source.kind === kind) &&
            (country === "all" ||
              source.countries.includes(country) ||
              source.countries.includes("Southeast Asia"))
          );
        })
        .sort(
          (a, b) =>
            (matchBySource.get(b.id)?.score ?? 0) -
            (matchBySource.get(a.id)?.score ?? 0)
        ),
    [country, kind, matchBySource, query, sources]
  );
  const selectedMatch = selectedSourceId
    ? matchBySource.get(selectedSourceId)
    : matches[0];

  return (
    <div className="mt-12 grid gap-12 lg:grid-cols-12">
      <section className="lg:col-span-8">
        <div className="border-y py-5">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <label className="lg:col-span-2">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Search funding sources
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Climate, grants, corporate..."
                className="min-h-11 w-full border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Source type
              </span>
              <select
                value={kind}
                onChange={(event) =>
                  setKind(event.target.value as FundingSourceKind | "all")
                }
                className="min-h-11 w-full border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="all">All source types</option>
                <option>Multilateral grant</option>
                <option>Corporate CSR</option>
                <option>Foundation grant</option>
                <option>Impact fund</option>
                <option>Philanthropy platform</option>
              </select>
            </label>
            <label>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Country
              </span>
              <select
                value={country}
                onChange={(event) => setCountry(event.target.value)}
                className="min-h-11 w-full border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="all">All countries</option>
                {countries.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            </label>
            <label className="md:col-span-2">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Match to a project
              </span>
              <select
                value={selectedProjectSlug}
                onChange={(event) => {
                  setSelectedProjectSlug(event.target.value);
                  setSelectedSourceId("");
                }}
                className="min-h-11 w-full border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Browse all sources</option>
                {projects.map((project) => (
                  <option key={project.slug} value={project.slug}>
                    {project.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="mt-8 flex items-baseline justify-between gap-4">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            <span className="font-mono tabular-nums text-foreground">
              {filteredSources.length}
            </span>{" "}
            sources in the verified reference directory
          </p>
          <p className="text-xs text-muted-foreground">
            Confirm every call before applying.
          </p>
        </div>
        <div className="mt-6 space-y-4">
          {filteredSources.map((source) => (
            <FundingSourceCard
              key={source.id}
              source={source}
              match={matchBySource.get(source.id)}
              selected={source.id === selectedSourceId}
              onSelect={() => setSelectedSourceId(source.id)}
            />
          ))}
        </div>
        {filteredSources.length === 0 && (
          <div className="mt-6 border border-dashed p-8 text-center">
            <h2 className="font-serif text-2xl font-medium">
              No sources match.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try another country, source type, or search term.
            </p>
          </div>
        )}
      </section>
      <aside className="lg:col-span-4">
        {selectedProject ? (
          <FundingReadinessChecklist
            key={`${selectedProject.slug}-${selectedMatch?.source.id ?? "none"}`}
            project={selectedProject}
            match={selectedMatch}
          />
        ) : (
          <div className="border border-dashed p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Project matching
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium">
              Choose a project to see fit.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Aether compares country, sector, operator type, funding model, and
              target size against each source record.
            </p>
            <div className="mt-6 space-y-3">
              {[
                "Country and sector",
                "Capital type",
                "Operator readiness",
                "Funding range",
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    0{index + 1}
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

function FundingSourceCard({
  source,
  match,
  selected,
  onSelect,
}: {
  source: FundingSource;
  match?: FundingMatch;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      className={`border bg-card p-6 ${selected ? "border-primary" : ""}`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="bg-secondary px-2 py-1">{source.kind}</span>
            <span className="bg-secondary px-2 py-1">Official reference</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-medium">
            {source.name}
          </h2>
        </div>
        {match && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Advisory fit</p>
            <p className="mt-1 font-mono text-2xl font-medium tabular-nums">
              {formatPercent(match.score)}
            </p>
          </div>
        )}
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
        {source.description}
      </p>
      <div className="mt-6 grid gap-4 border-y py-4 sm:grid-cols-3">
        <Detail label="Funding range" value={source.fundingRange} />
        <Detail label="Stage" value={source.stage} />
        <Detail label="Next window" value={source.nextWindow} />
      </div>
      {match && (
        <div className="mt-5 flex flex-wrap gap-2">
          {match.reasons.slice(0, 4).map((reason) => (
            <span key={reason} className="text-xs text-muted-foreground">
              + {reason}
            </span>
          ))}
        </div>
      )}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-xl text-xs leading-5 text-muted-foreground">
          <p>
            {source.verificationStatus} / checked {source.lastVerified}
          </p>
          <p className="mt-1">{source.eligibility}</p>
          <p className="mt-1">{source.sourceNotes}</p>
          <div className="mt-2 flex gap-3 font-semibold">
            <a
              href={source.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring"
            >
              Official source
            </a>
            <a
              href={source.applicationUrl}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring"
            >
              Application details
            </a>
          </div>
        </div>
        <button
          type="button"
          onClick={onSelect}
          disabled={!match}
          className="min-h-11 border px-4 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          {match
            ? selected
              ? "Added to checklist"
              : "Prepare application"
            : "Select a project first"}
        </button>
      </div>
    </article>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-2 font-mono text-sm font-medium tabular-nums">
        {value}
      </dd>
    </div>
  );
}
