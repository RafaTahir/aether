import Link from "next/link";
import { ProjectCard } from "./components/project-card";
import { projects } from "@/src/data/projects";
import { formatCompactCurrency } from "@/src/lib/format-number";

export default function Home() {
  const totalTarget = projects.reduce(
    (sum, project) => sum + project.targetUsd,
    0
  );
  const countries = new Set(projects.map((project) => project.country)).size;

  return (
    <main>
      <section className="bg-brand-bg border-b">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-12 lg:px-8 lg:py-32">
          <div className="lg:col-span-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Aether / global project capital
            </p>
            <h1 className="mt-8 max-w-5xl font-serif text-5xl font-medium leading-[0.94] tracking-tight md:text-7xl lg:text-8xl">
              Projects worth crossing borders for.
            </h1>
          </div>
          <div className="flex flex-col justify-end border-l pl-6 lg:col-span-4">
            <p className="max-w-md text-base leading-7 text-muted-foreground">
              Discover milestone-led projects created by individuals, companies,
              cooperatives, and public-interest entities. Review the evidence
              before capital moves.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#opportunities"
                className="inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Explore projects
              </Link>
              <Link
                href="#method"
                className="inline-flex min-h-11 items-center border bg-card px-5 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Our method
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Prototype evidence" className="border-b bg-card">
        <dl className="mx-auto grid max-w-7xl divide-y px-4 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-6 lg:px-8">
          <Proof
            label="Fictional project pipeline"
            value={formatCompactCurrency(totalTarget)}
          />
          <Proof label="Markets represented" value={`${countries} countries`} />
          <Proof label="Release structure" value="Milestone based" />
        </dl>
      </section>

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
            Financial models vary by project and jurisdiction.
          </p>
        </div>
        <ProjectCard project={projects[0]} variant="feature" />
        <div className="mt-10">
          {projects.slice(1).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

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
              href="/onboarding"
              className="mt-7 inline-flex min-h-11 items-center gap-4 border-b border-foreground text-sm font-semibold focus-visible:ring-2 focus-visible:ring-ring"
            >
              See what readiness requires <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 text-xs leading-5 text-muted-foreground md:px-6 lg:px-8">
          <strong className="text-foreground">Architecture prototype.</strong>{" "}
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
