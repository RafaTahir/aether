"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { InvestmentProject } from "@/src/domain/project";
import { AETHER_STORAGE_KEYS, useAetherStorage } from "../lib/aether-storage";
import { ProjectCard } from "./project-card";

type FilterKey =
  | "q"
  | "country"
  | "sector"
  | "cadence"
  | "model"
  | "risk"
  | "saved"
  | "sort";

type SortKey = "recent" | "funded" | "progress" | "minimum";

const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: "recent", label: "Recently updated" },
  { value: "funded", label: "Most funded" },
  { value: "progress", label: "Closest to target" },
  { value: "minimum", label: "Lowest entry amount" },
];

function sortProjects(
  projects: InvestmentProject[],
  sort: SortKey
): InvestmentProject[] {
  const sorted = [...projects];
  switch (sort) {
    case "funded":
      return sorted.sort((a, b) => b.fundedUsd - a.fundedUsd);
    case "progress":
      return sorted.sort(
        (a, b) =>
          b.fundedUsd / b.targetUsd - a.fundedUsd / a.targetUsd
      );
    case "minimum":
      return sorted.sort((a, b) => a.minimumUsd - b.minimumUsd);
    default:
      return sorted.sort((a, b) =>
        b.lastUpdated.localeCompare(a.lastUpdated)
      );
  }
}

export function ProjectDiscovery({
  projects,
}: {
  projects: InvestmentProject[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [savedProjects] = useAetherStorage<string[]>(
    AETHER_STORAGE_KEYS.savedProjects,
    []
  );
  const query = searchParams.get("q") ?? "";
  const country = searchParams.get("country") ?? "all";
  const sector = searchParams.get("sector") ?? "all";
  const cadence = searchParams.get("cadence") ?? "all";
  const model = searchParams.get("model") ?? "all";
  const risk = searchParams.get("risk") ?? "all";
  const sort = (searchParams.get("sort") as SortKey | null) ?? "recent";
  const savedOnly = searchParams.get("saved") === "1";
  const countries = useMemo(
    () => unique(projects.map((project) => project.country)),
    [projects]
  );
  const sectors = useMemo(
    () => unique(projects.map((project) => project.sector)),
    [projects]
  );
  const filteredProjects = useMemo(
    () =>
      sortProjects(
        projects.filter((project) => {
          const normalizedQuery = query.trim().toLowerCase();
          const searchable = [
            project.name,
            project.country,
            project.sector,
            project.operator,
            project.summary,
          ]
            .join(" ")
            .toLowerCase();
          return (
            (!normalizedQuery || searchable.includes(normalizedQuery)) &&
            (country === "all" || project.country === country) &&
            (sector === "all" || project.sector === sector) &&
            (cadence === "all" || project.fundingCadence === cadence) &&
            (model === "all" || project.fundingModel === model) &&
            (risk === "all" || project.riskGrade === risk) &&
            (!savedOnly || savedProjects.includes(project.slug))
          );
        }),
        sort
      ),
    [
      cadence,
      country,
      model,
      projects,
      query,
      risk,
      savedOnly,
      savedProjects,
      sector,
      sort,
    ]
  );

  function updateFilter(key: FilterKey, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (!value || value === "all" || (key === "saved" && value === "0"))
      next.delete(key);
    else next.set(key, value);
    const queryString = next.toString();
    router.replace(
      `${pathname}${queryString ? `?${queryString}` : ""}#opportunities`,
      { scroll: false }
    );
  }

  function resetFilters() {
    router.replace(`${pathname}#opportunities`, { scroll: false });
  }

  return (
    <section
      id="opportunities"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 md:px-6 lg:px-8"
    >
      <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Current briefs
          </p>
          <h2 className="mt-4 font-serif text-4xl font-medium tracking-tight md:text-6xl">
            Capital tied to visible work.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground lg:col-span-5">
          Each listing starts with an operator, a defined use of funds,
          verification evidence, release milestones, and plain-language risks.
        </p>
      </div>
      <div className="border-y py-5" aria-label="Project filters">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
          <label className="lg:col-span-2">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Search
            </span>
            <input
              value={query}
              onChange={(event) => updateFilter("q", event.target.value)}
              placeholder="Project, operator, country"
              type="search"
              className="min-h-11 w-full border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          <Filter
            label="Country"
            value={country}
            onChange={(value) => updateFilter("country", value)}
            options={countries}
          />
          <Filter
            label="Sector"
            value={sector}
            onChange={(value) => updateFilter("sector", value)}
            options={sectors}
          />
          <Filter
            label="Funding model"
            value={model}
            onChange={(value) => updateFilter("model", value)}
            options={["Revenue share", "Grant", "Debt", "Equity"]}
          />
          <Filter
            label="Risk"
            value={risk}
            onChange={(value) => updateFilter("risk", value)}
            options={["A", "B", "C"]}
          />
          <Filter
            label="Sort by"
            value={sort}
            onChange={(value) => updateFilter("sort", value)}
            options={SORT_OPTIONS.map((option) => option.value)}
            optionLabels={Object.fromEntries(
              SORT_OPTIONS.map((option) => [option.value, option.label])
            )}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Toggle
              label="One-time projects"
              active={cadence === "One-time project"}
              onClick={() =>
                updateFilter(
                  "cadence",
                  cadence === "One-time project" ? "all" : "One-time project"
                )
              }
            />
            <Toggle
              label="Continuous programs"
              active={cadence === "Continuous program"}
              onClick={() =>
                updateFilter(
                  "cadence",
                  cadence === "Continuous program"
                    ? "all"
                    : "Continuous program"
                )
              }
            />
            <Toggle
              label="Saved only"
              active={savedOnly}
              onClick={() => updateFilter("saved", savedOnly ? "0" : "1")}
            />
          </div>
          {(query ||
            country !== "all" ||
            sector !== "all" ||
            cadence !== "all" ||
            model !== "all" ||
            risk !== "all" ||
            savedOnly ||
            sort !== "recent") && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex min-h-10 items-center gap-1.5 rounded border border-dashed border-primary/40 bg-primary/5 px-3 text-xs font-semibold text-primary transition-colors hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span>✕</span> Reset all filters
            </button>
          )}
        </div>
      </div>
      <div className="mt-8 flex items-baseline justify-between gap-4">
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            <span className="font-mono font-semibold tabular-nums text-foreground">
              {filteredProjects.length}
            </span>{" "}
            {filteredProjects.length === 1 ? "brief" : "briefs"} match your
            filters.
          </p>
          {filteredProjects.length < projects.length && (
            <span className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
              Filtered from {projects.length}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          All figures are fictional catalog data.
        </p>
      </div>
      {filteredProjects.length === 0 ? (
        <div className="mt-8 border border-dashed p-10 text-center">
          <h3 className="font-serif text-3xl font-medium">
            No briefs match yet.
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            Try widening the filters or clear them to see the full catalog.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 min-h-11 bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Show all briefs
          </button>
        </div>
      ) : (
        <div className="mt-8">
          <ProjectCard project={filteredProjects[0]} variant="feature" />
          {filteredProjects.length > 1 && (
            <div className="mt-10">
              {filteredProjects.slice(1).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
  optionLabels,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  optionLabels?: Record<string, string>;
}) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 w-full border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
      >
        {label === "Sort by" ? null : <option value="all">All</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {optionLabels?.[option] ?? option}
          </option>
        ))}
      </select>
    </label>
  );
}
function Toggle({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-10 border px-3 text-xs font-semibold focus-visible:ring-2 focus-visible:ring-ring ${active ? "bg-primary text-primary-foreground" : "bg-card hover:bg-accent"}`}
    >
      {label}
    </button>
  );
}
function unique(values: string[]) {
  return [...new Set(values)].sort();
}
