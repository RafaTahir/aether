import type { Metadata } from "next";
import Link from "next/link";
import { FundingDirectory } from "../components/funding-directory";
import { projects } from "@/src/data/projects";
import { fundingSources } from "@/src/data/funding-sources";

export const metadata: Metadata = {
  title: "Funding Directory | Aether",
  description:
    "Match Aether project rooms with grants, CSR programs, philanthropy, and impact capital.",
};

export default function FundingPage() {
  return (
    <main>
      <section className="border-b bg-brand-bg">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8 lg:py-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Funding directory / verified references
          </p>
          <h1 className="mt-6 max-w-5xl font-serif text-5xl font-medium leading-[0.94] tracking-tight md:text-7xl">
            Find the money that fits the work.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
            Explore official reference pages for grants, philanthropy, and
            impact capital. Select a project to see why a source may fit and
            what an application room needs next.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects/submit"
              className="inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Submit a project
            </Link>
            <Link
              href="/funder"
              className="inline-flex min-h-11 items-center border bg-card px-5 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Open funder workspace
            </Link>
          </div>
        </div>
      </section>
      <section className="border-b bg-card">
        <dl className="mx-auto grid max-w-7xl divide-y px-4 md:grid-cols-3 md:divide-x md:divide-y-0 md:px-6 lg:px-8">
          <Metric label="Source records" value={`${fundingSources.length}`} />
          <Metric label="Capital lanes" value="4" />
          <Metric label="Project rooms" value={`${projects.length}`} />
        </dl>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <FundingDirectory sources={fundingSources} projects={projects} />
      </section>
      <section className="border-t bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 text-xs leading-5 text-muted-foreground md:px-6 lg:px-8">
          <strong className="text-foreground">Directory boundary.</strong>{" "}
          Aether verifies the source page and records when it was checked; it
          does not guarantee an open call, eligibility, funding, or approval.
          Confirm current terms on the official source before applying.
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-6 md:px-6 md:first:pl-0">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-2 font-mono text-xl font-medium tabular-nums">
        {value}
      </dd>
    </div>
  );
}
