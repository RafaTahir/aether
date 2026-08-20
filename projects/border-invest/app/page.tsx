import Link from "next/link";
import { Suspense } from "react";
import { ProjectDiscovery } from "./components/project-discovery";
import { IntroHero } from "./components/intro-hero";
import { projects } from "@/src/data/projects";
import { formatCompactCurrency } from "@/src/lib/format-number";
import { hasSupabaseEnv } from "./lib/supabase/config";

export default function Home() {
  const totalTarget = projects.reduce(
    (sum, project) => sum + project.targetUsd,
    0
  );
  const countries = new Set(projects.map((project) => project.country)).size;

  return (
    <main>
      <IntroHero accountStorage={hasSupabaseEnv()} />

      <section aria-label="Catalog evidence" className="border-b bg-card">
        <dl className="mx-auto grid max-w-7xl divide-y px-4 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-6 lg:px-8">
          <Proof
            label="Seeded catalog value"
            value={formatCompactCurrency(totalTarget)}
          />
          <Proof
            label="Project rooms"
            value={`${projects.length} active briefs`}
          />
          <Proof label="Markets represented" value={`${countries} countries`} />
        </dl>
      </section>

      <Suspense fallback={<DiscoveryFallback />}>
        <ProjectDiscovery projects={projects} />
      </Suspense>

      <section id="method" className="border-y bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-background/65">
                The Aether Standard
              </p>
              <h2 className="mt-4 font-serif text-4xl font-medium leading-none tracking-tight md:text-6xl">
                Clarity before capital.
              </h2>
            </div>
            <div className="lg:col-span-7">
              {[
                [
                  "01",
                  "Verify the operator",
                  "Identity, entity ownership, operating history, counterparties, and sanctions checks stay private and off-chain.",
                ],
                [
                  "02",
                  "Define the work",
                  "Funding is attached to a scoped project or program period, not an unexplained wallet or open-ended treasury.",
                ],
                [
                  "03",
                  "Release against evidence",
                  "Milestone approvals reference documents, field evidence, and auditable transaction records before funds move.",
                ],
                [
                  "04",
                  "Report what changed",
                  "Operators publish financial and impact updates in the same brief so outcomes can be compared with the original case.",
                ],
              ].map(([number, title, body]) => (
                <div
                  key={number}
                  className="grid gap-4 border-t border-background/25 py-6 sm:grid-cols-[3rem_1fr_2fr]"
                >
                  <p className="font-mono text-xs tabular-nums text-background/65">
                    {number}
                  </p>
                  <h3 className="text-base font-semibold">{title}</h3>
                  <p className="text-sm leading-6 text-background/65">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              For project owners
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-4xl font-medium leading-none tracking-tight md:text-6xl">
              Bring a plan people can inspect.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base leading-7 text-muted-foreground">
              Projects can be one-time builds or continuous programs. What
              matters is a credible operator, a measurable scope, evidence for
              each release, and terms that comply with every market involved.
            </p>
            <Link
              href="/projects/submit"
              className="mt-7 inline-flex min-h-11 items-center gap-4 border-b border-foreground text-sm font-semibold focus-visible:ring-2 focus-visible:ring-ring"
            >
              Submit a project <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y bg-card" aria-labelledby="ecosystem-paths">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                One room, different next steps
              </p>
              <h2
                id="ecosystem-paths"
                className="mt-4 max-w-xl font-serif text-4xl font-medium leading-none tracking-tight md:text-6xl"
              >
                Everyone sees the work from the side they own.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-muted-foreground lg:col-span-5 lg:col-start-8">
              Aether keeps the project context stable while operators, funders,
              and participants move through different decisions.
            </p>
          </div>
          <ol className="mt-12 grid border-y md:grid-cols-3 md:divide-x">
            <StakeholderPath
              number="01"
              eyebrow="For operators"
              title="Build the room"
              body="Define the work, evidence, milestones, and funding need."
              href="/projects/submit"
              label="Submit a project"
            />
            <StakeholderPath
              number="02"
              eyebrow="For funders"
              title="Read the pipeline"
              body="Compare project context, capital lanes, risk, and readiness."
              href="/funder"
              label="Open funder workspace"
            />
            <StakeholderPath
              number="03"
              eyebrow="For participants"
              title="Keep the thread"
              body="Save rooms, review readiness, and follow the evidence trail."
              href="/portfolio"
              label="Open portfolio"
            />
          </ol>
        </div>
      </section>

      <section className="border-t bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 text-xs leading-5 text-muted-foreground md:px-6 lg:px-8">
          <strong className="text-foreground">Current product boundary.</strong>{" "}
          All projects, operators, metrics, and terms are fictional. No
          investment or security is offered. Production launch requires
          jurisdiction-specific counsel and licensed identity, offering,
          custody, and payments partners.
        </div>
      </section>
    </main>
  );
}

function Proof({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-6 md:px-6 md:first:pl-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-2 font-mono text-xl font-medium tabular-nums">
        {value}
      </dd>
    </div>
  );
}

function StakeholderPath({
  number,
  eyebrow,
  title,
  body,
  href,
  label,
}: {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <li className="flex min-h-64 flex-col justify-between p-6 md:p-8">
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {number}
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {eyebrow}
          </span>
        </div>
        <h3 className="mt-12 font-serif text-3xl font-medium">{title}</h3>
        <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
          {body}
        </p>
      </div>
      <Link
        href={href}
        className="mt-8 inline-flex min-h-10 items-center self-start border-b border-foreground text-sm font-semibold focus-visible:ring-2 focus-visible:ring-ring"
      >
        {label}{" "}
        <span className="ml-3" aria-hidden="true">
          -&gt;
        </span>
      </Link>
    </li>
  );
}

function DiscoveryFallback() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
      <div className="h-12 w-72 animate-pulse bg-secondary" />
      <div className="mt-8 h-72 animate-pulse bg-secondary" />
    </section>
  );
}
