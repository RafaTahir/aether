import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How Aether Works",
  description:
    "How Aether connects cross-border projects with investment and other forms of capital.",
};

const process = [
  [
    "01",
    "Frame the work",
    "Every project starts with a clear operator, place, use of funds, funding model, timeline, and measurable outcome.",
  ],
  [
    "02",
    "Review the evidence",
    "Project rooms bring diligence, milestones, risks, updates, and supporting documents into one readable brief.",
  ],
  [
    "03",
    "Find the right capital",
    "Individuals and corporations can explore investment opportunities. Grants, CSR budgets, philanthropy, and blended finance can support projects where they fit better.",
  ],
  [
    "04",
    "Track what happens",
    "Capital is connected to visible milestones, operating updates, and reporting that keeps progress legible after the initial decision.",
  ],
];

const paths = [
  [
    "Participants",
    "Find projects with a reason to exist, understand the case, compare risk, and follow progress over time.",
    "/#opportunities",
    "Explore project briefs",
  ],
  [
    "Project operators",
    "Turn a real plan into a clear project room with a scope, evidence path, and funding requirement.",
    "/projects/submit",
    "Submit a project",
  ],
  [
    "Corporations and funders",
    "Build a qualified pipeline for investment, CSR, grantmaking, sponsorship, or blended capital programs.",
    "/about#funders",
    "Partner with Aether",
  ],
];

export default function HowItWorksPage() {
  return (
    <main>
      <section className="border-b bg-brand-bg">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            How Aether works
          </p>
          <h1 className="mt-6 max-w-5xl font-serif text-5xl font-medium leading-[0.94] tracking-tight md:text-7xl">
            Capital should move with context.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            Aether is being built as a cross-border project investment
            marketplace with a wider capital lens. We help credible work meet
            the kind of funding that fits it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#opportunities"
              className="inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Explore projects
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-11 items-center border bg-card px-5 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Why Aether
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              The process
            </p>
            <h2 className="mt-4 max-w-md font-serif text-4xl font-medium leading-none tracking-tight md:text-6xl">
              From project room to project progress.
            </h2>
          </div>
          <div className="lg:col-span-7">
            {process.map(([number, title, body]) => (
              <div
                key={number}
                className="grid gap-4 border-t py-6 sm:grid-cols-[3rem_1fr_2fr]"
              >
                <span className="font-mono text-xs tabular-nums text-muted-foreground">
                  {number}
                </span>
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-background/65">
                Three ways in
              </p>
              <h2 className="mt-4 font-serif text-4xl font-medium leading-none tracking-tight md:text-6xl">
                One platform. Different reasons to arrive.
              </h2>
            </div>
            <div className="lg:col-span-7">
              {paths.map(([title, body, href, label], index) => (
                <div key={title} className="border-t border-background/25 py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <span className="font-mono text-xs tabular-nums text-background/60">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-background/65">
                    {body}
                  </p>
                  <Link
                    href={href}
                    className="mt-5 inline-flex min-h-10 items-center gap-3 border-b border-background text-sm font-semibold focus-visible:ring-2 focus-visible:ring-background"
                  >
                    {label} <span aria-hidden="true">-&gt;</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        id="funding-routes"
        className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 md:px-6 lg:px-8"
      >
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              The capital stack
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium leading-none tracking-tight md:text-6xl">
              Not every project needs the same money.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className="divide-y border-y">
              <CapitalRow
                label="Investment"
                body="For eligible participants and corporations seeking defined financial rights, with terms and risks disclosed before any commitment."
              />
              <CapitalRow
                label="Grants, CSR, and philanthropy"
                body="For projects where public benefit, community outcomes, or corporate purpose matter more than financial return."
              />
              <CapitalRow
                label="Blended capital"
                body="For projects that need multiple layers, such as a grant for early work followed by debt, revenue share, or equity for expansion."
              />
            </div>
          </div>
        </div>
      </section>
      <section className="border-t bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-12 md:px-6 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Start where you are
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium">
              Bring the next project into focus.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects/submit"
              className="inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Submit a project
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex min-h-11 items-center border bg-background px-5 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Open portfolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function CapitalRow({ label, body }: { label: string; body: string }) {
  return (
    <div className="grid gap-3 py-6 sm:grid-cols-[12rem_1fr]">
      <h3 className="font-semibold">{label}</h3>
      <p className="text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}
