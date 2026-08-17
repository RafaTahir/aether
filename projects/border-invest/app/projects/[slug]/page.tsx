import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/src/data/projects";
import { DevnetEscrowPanel } from "../../components/devnet-escrow-panel";
import { SaveProjectButton } from "../../components/save-project-button";
import { ShareProjectButton } from "../../components/share-project-button";
import {
  formatCompactCurrency,
  formatDetailedCurrency,
  formatPercent,
} from "@/src/lib/format-number";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) notFound();
  const fundedPercent = (project.fundedUsd / project.targetUsd) * 100;

  return (
    <main>
      <section className="border-b bg-brand-bg">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
          <Link
            href="/#opportunities"
            className="inline-flex min-h-10 items-center text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            &lt;- All project briefs
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {project.city}, {project.country} / {project.sector}
              </p>
              <h1 className="mt-5 max-w-5xl font-serif text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl">
                {project.name}
              </h1>
            </div>
            <div className="gold-edge border-l pl-6 lg:col-span-4">
              <p className="text-xs text-muted-foreground">Operated by</p>
              <p className="mt-2 text-lg font-semibold">{project.operator}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.operatorType} / {project.fundingCadence}
              </p>
            </div>
          </div>
          <div className="relative mt-12 aspect-[16/7] min-h-80 overflow-hidden">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <span className="bg-secondary px-2 py-1">{project.status}</span>
              <span className="bg-secondary px-2 py-1">
                {project.fundingModel}
              </span>
              <span className="bg-secondary px-2 py-1">
                Updated {project.lastUpdated}
              </span>
            </div>
            <div className="flex gap-2">
              <SaveProjectButton projectSlug={project.slug} />
              <ShareProjectButton />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b bg-card">
        <dl className="mx-auto grid max-w-7xl divide-y px-4 md:grid-cols-5 md:divide-x md:divide-y-0 md:px-6 lg:px-8">
          <BriefMetric
            label="Target"
            value={formatCompactCurrency(project.targetUsd)}
          />
          <BriefMetric label="Funded" value={formatPercent(fundedPercent)} />
          <BriefMetric
            label="Revenue share"
            value={
              project.revenueSharePercent > 0
                ? formatPercent(project.revenueSharePercent)
                : "None"
            }
          />
          <BriefMetric label="Risk grade" value={project.riskGrade} />
          <BriefMetric
            label={project.impactLabel}
            value={project.impactValue}
          />
        </dl>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-6 lg:grid-cols-12 lg:px-8">
        <article className="lg:col-span-8">
          <section className="grid gap-6 border-b pb-12 md:grid-cols-3">
            <h2 className="font-serif text-3xl font-medium">The case</h2>
            <p className="text-base leading-7 text-muted-foreground md:col-span-2">
              {project.description}
            </p>
          </section>

          <section className="grid gap-6 border-b py-12 md:grid-cols-3">
            <h2 className="font-serif text-3xl font-medium">Use of funds</h2>
            <ol className="md:col-span-2">
              {project.useOfFunds.map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] border-t py-4 first:border-t-0"
                >
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    0{index + 1}
                  </span>
                  <span className="text-sm leading-6">{item}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-6 border-b py-12 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Project room
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium">Updates</h2>
            </div>
            <ol className="md:col-span-2">
              {project.updates.map((update) => (
                <li
                  key={`${update.date}-${update.title}`}
                  className="border-t py-5 first:border-t-0"
                >
                  <p className="font-mono text-xs tabular-nums text-muted-foreground">
                    {update.date}
                  </p>
                  <h3 className="mt-2 font-semibold">{update.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {update.body}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-6 border-b py-12 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Release plan
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium">
                Milestones
              </h2>
            </div>
            <ol className="md:col-span-2">
              {project.milestones.map((milestone, index) => (
                <li
                  key={milestone.title}
                  className="grid gap-3 border-t py-5 first:border-t-0 sm:grid-cols-[2.5rem_1fr_auto]"
                >
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{milestone.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {milestone.evidence}
                    </p>
                  </div>
                  <span className="font-mono text-sm font-medium tabular-nums">
                    {formatPercent(milestone.releasePercent)}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-6 py-12 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-destructive">
                Read before proceeding
              </p>
              <h2 className="mt-3 font-serif text-3xl font-medium">
                Material risks
              </h2>
            </div>
            <ul className="md:col-span-2">
              {project.risks.map((risk) => (
                <li
                  key={risk}
                  className="border-t py-4 text-sm leading-6 text-muted-foreground first:border-t-0"
                >
                  {risk}
                </li>
              ))}
            </ul>
          </section>
        </article>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 border bg-card p-6">
            <div className="flex items-center justify-between gap-4 border-b pb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Prototype terms
              </p>
              <span className="bg-secondary px-2 py-1 text-xs font-semibold">
                Grade {project.riskGrade}
              </span>
            </div>
            <dl className="mt-2">
              <Term
                label="Minimum"
                value={formatDetailedCurrency(project.minimumUsd)}
              />
              <Term
                label="Target"
                value={formatDetailedCurrency(project.targetUsd)}
              />
              <Term label="Term" value={`${project.termMonths} months`} />
              <Term label="Verification" value={project.verificationStatus} />
            </dl>
            <Link
              href="/onboarding"
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center bg-primary px-4 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Review eligibility
            </Link>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Demo only. No investment, ownership right, or expected return is
              offered. Wallet connection does not establish legal eligibility.
            </p>
            <DevnetEscrowPanel project={project} />
          </div>
        </aside>
      </div>
    </main>
  );
}

function BriefMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-5 md:px-5 md:first:pl-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-2 font-mono text-lg font-medium tabular-nums">
        {value}
      </dd>
    </div>
  );
}
function Term({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-5 border-b py-4">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-right font-mono text-sm font-medium tabular-nums">
        {value}
      </dd>
    </div>
  );
}
