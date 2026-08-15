import Image from "next/image";
import Link from "next/link";
import type { InvestmentProject } from "@/src/domain/project";
import { formatCompactCurrency, formatPercent } from "@/src/lib/format-number";

type ProjectCardProps = {
  project: InvestmentProject;
  variant?: "feature" | "row";
};

export function ProjectCard({ project, variant = "row" }: ProjectCardProps) {
  const fundedPercent = (project.fundedUsd / project.targetUsd) * 100;

  if (variant === "feature") {
    return (
      <article className="project-link group grid overflow-hidden border bg-card lg:grid-cols-2">
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
          <dl className="mt-8 grid grid-cols-3 gap-4 border-y py-5">
            <Metric
              label="Target"
              value={formatCompactCurrency(project.targetUsd)}
            />
            <Metric label="Funded" value={formatPercent(fundedPercent)} />
            <Metric label="Impact" value={project.impactValue} />
          </dl>
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
    <article className="project-link group border-t">
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
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {project.country} / {project.operatorType}
          </p>
          <h3 className="mt-3 font-serif text-3xl font-medium leading-none tracking-tight">
            {project.name}
          </h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {project.summary}
          </p>
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
