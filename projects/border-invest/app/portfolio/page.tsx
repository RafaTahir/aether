import Link from "next/link";
import { PortfolioView } from "../components/portfolio-view";
import { projects } from "@/src/data/projects";

export default function PortfolioPage() {
  return (
    <main>
      <section className="border-b bg-brand-bg">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Participant workspace
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl">
            Keep the projects you want to understand.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
            Your watchlist and sandbox records stay in this browser. Connect a
            devnet wallet only when you want to test the prototype flow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#opportunities"
              className="inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Browse projects
            </Link>
            <Link
              href="/onboarding"
              className="inline-flex min-h-11 items-center border bg-card px-5 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Run demo eligibility
            </Link>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <PortfolioView projects={projects} />
      </div>
    </main>
  );
}
