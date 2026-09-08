import Image from "next/image";
import Link from "next/link";
import type { InvestmentProject } from "@/src/domain/project";
import { formatCompactCurrency, formatPercent } from "@/src/lib/format-number";
import { SaveProjectButton } from "./save-project-button";

const STATUS_STYLES: Record<string, string> = {
  Published: "bg-primary/10 text-primary",
  "In progress": "bg-accent text-accent-foreground",
  "Funding complete": "bg-secondary text-secondary-foreground",
  Completed: "bg-muted text-muted-foreground",
};

function statusStyle(status: string) {
  return STATUS_STYLES[status] ?? "bg-secondary";
}

function FundingBar({ percent }: { percent: number }) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div
      className="h-1.5 w-full bg-secondary"
      role="presentation"
      aria-hidden="true"
    >
      <div
        className="h-full bg-primary"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

type ProjectCardProps = {
  project: InvestmentProject;
  variant?: "feature" | "row";
};

export function ProjectCard({ project, variant = "row" }: ProjectCardProps) {
  const fundedPercent = (project.fundedUsd / project.targetUsd) * 100;

  if (variant === "feature") {
    return (
      <article className="project-link group relative grid overflow-hidden border bg-card lg:grid-cols-2">
        <div className="relative min-h-80 overflow-hidden lg:min-h-full">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:scale-[1.02]"
          />
          <span className="absolute left-4 top-4 bg-card px-3 py-2 text-xs font-semibold">
            Flagship brief
          </span>
          <div className="absolute right-4 top-4">
            <SaveProjectButton projectSlug={project.slug} />
          </div>
        </div>
        <div className="flex flex-col p-6 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {project.city}, {project.country} / {project.sector}
          </p>
          <h3 className="mt-5 font-serif text-4xl font-medium leading-none tracking-tight md:text-5xl">
            {project.name}
          </h3>
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            {project.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="bg-secondary px-2 py-1">
              {project.fundingModel}
            </span>
            <span className={`px-2 py-1 ${statusStyle(project.status)}`}>
              {project.status}
            </span>
            <span className="bg-secondary px-2 py-1">
              Grade {project.riskGrade}
            </span>
          </div>
          <dl className="mt-6 grid grid-cols-3 gap-4 border-y py-5">
            <Metric
              label="Target"
              value={formatCompactCurrency(project.targetUsd)}
            />
            <Metric label="Funded" value={formatPercent(fundedPercent)} />
            <Metric label="Impact" value={project.impactValue} />
          </dl>
          <div className="mt-4 flex items-center gap-3">
            <FundingBar percent={fundedPercent} />
            <span className="whitespace-nowrap text-xs font-medium tabular-nums text-muted-foreground">
              {formatCompactCurrency(project.fundedUsd)} of{" "}
              {formatCompactCurrency(project.targetUsd)}
            </span>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Operated by</p>
              <p className="mt-1 text-sm font-semibold">{project.operator}</p>
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex min-h-11 items-center gap-4 bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Read the brief <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="project-link group relative border-t">
      <div className="absolute right-0 top-6 z-10">
        <SaveProjectButton projectSlug={project.slug} />
      </div>
      <Link
        href={`/projects/${project.slug}`}
        className="grid min-h-44 gap-5 py-6 focus-visible:ring-2 focus-visible:ring-ring lg:grid-cols-12 lg:items-center"
      >
        <div className="relative min-h-44 overflow-hidden lg:col-span-3">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 25vw"
            className="object-cover transition-transform duration-300 ease-out motion-reduce:transition-none group-hover:scale-[1.02]"
          />
        </div>
        <div className="lg:col-span-4">
          <p className="pr-20 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {project.country} / {project.operatorType}
          </p>
          <h3 className="mt-3 font-serif text-3xl font-medium leading-none tracking-tight">
            {project.name}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {project.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="bg-secondary px-2 py-1">
              {project.fundingModel}
            </span>
            <span className={`px-2 py-1 ${statusStyle(project.status)}`}>
              {project.status}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <FundingBar percent={fundedPercent} />
            <span className="whitespace-nowrap text-xs font-medium tabular-nums text-muted-foreground">
              {formatPercent(fundedPercent)} funded
            </span>
          </div>
        </div>
        <dl className="grid grid-cols-2 gap-4 lg:col-span-4 lg:grid-cols-3">
          <Metric
            label="Target"
            value={formatCompactCurrency(project.targetUsd)}
          />
          <Metric label="Funding" value={formatPercent(fundedPercent)} />
          <Metric label="Impact" value={project.impactValue} />
        </dl>
        <span
          className="hidden justify-self-end text-xl lg:block lg:col-span-1"
          aria-hidden="true"
        >
          -&gt;
        </span>
      </Link>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-2 font-mono text-base font-medium tabular-nums">
        {value}
      </dd>
    </div>
  );
}
