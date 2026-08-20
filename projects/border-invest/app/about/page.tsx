import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Aether",
  description:
    "Aether connects cross-border projects with the people and institutions that can help them move.",
};

const principles = [
  [
    "Context before conviction",
    "A project is more than a headline. Place, operator, economics, evidence, and risk belong in the same room.",
  ],
  [
    "Local work, wider reach",
    "Aether starts with Southeast Asian projects and builds the rails for capital to travel further without losing local context.",
  ],
  [
    "Progress you can follow",
    "The relationship should continue after a funding decision. Updates and milestones keep the work visible.",
  ],
];

export default function AboutPage() {
  return (
    <main>
      <section className="border-b bg-brand-bg">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            About Aether
          </p>
          <h1 className="mt-6 max-w-5xl font-serif text-3xl font-medium leading-[0.94] tracking-tight sm:text-5xl md:text-7xl">
            Make good projects easier to find, understand, and fund.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            Aether sits between ambitious projects and the people, companies,
            foundations, and institutions looking for meaningful places to put
            capital.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              The idea
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-none tracking-tight md:text-6xl">
              Aether is a bridge, not a black box.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-8 text-muted-foreground lg:col-span-7">
            <p>
              Projects with real local value often face a fragmented funding
              landscape. Investment platforms speak to investors. Grant
              directories speak to applicants. Corporate programs speak to
              reporting teams. The project is left to translate itself across
              all three.
            </p>
            <p>
              Aether brings those paths together through a project room that
              makes the work legible: who is operating it, what it needs, how
              progress will be measured, what can go wrong, and which kind of
              capital fits.
            </p>
            <p>
              We begin in Southeast Asia, with a view toward a wider network of
              projects and funders over time.
            </p>
          </div>
        </div>
      </section>
      <section id="funders" className="border-y bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-background/65">
                For funders
              </p>
              <h2 className="mt-4 font-serif text-4xl font-medium leading-none tracking-tight md:text-6xl">
                A clearer pipeline for capital with a point of view.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-px border border-background/20 bg-background/20 sm:grid-cols-2">
                <FunderCard
                  title="Corporations"
                  body="Find projects for investment, CSR, sponsorship, procurement, or employee participation."
                />
                <FunderCard
                  title="Foundations"
                  body="Review defined programs with evidence plans, local operators, and reporting structures."
                />
                <FunderCard
                  title="Impact funds"
                  body="Surface opportunities with comparable terms, milestones, and operating context."
                />
                <FunderCard
                  title="Development partners"
                  body="Build a monitored pipeline for blended finance and regional initiatives."
                />
              </div>
              <Link
                href="/how-it-works#funding-routes"
                className="mt-8 inline-flex min-h-11 items-center border-b border-background text-sm font-semibold focus-visible:ring-2 focus-visible:ring-background"
              >
                See the capital routes{" "}
                <span className="ml-3" aria-hidden="true">
                  -&gt;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              What guides us
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-none tracking-tight md:text-6xl">
              The standard behind the surface.
            </h2>
          </div>
          <div className="lg:col-span-7">
            {principles.map(([title, body], index) => (
              <div
                key={title}
                className="grid gap-4 border-t py-6 sm:grid-cols-[3rem_1fr_2fr]"
              >
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  0{index + 1}
                </span>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-12 md:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Three ways to participate
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium">
              Explore, build, or fund.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#opportunities"
              className="inline-flex min-h-11 items-center border bg-background px-5 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Explore projects
            </Link>
            <Link
              href="/projects/submit"
              className="inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Submit a project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FunderCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="bg-background p-6 text-foreground">
      <h3 className="font-serif text-2xl font-medium">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}
