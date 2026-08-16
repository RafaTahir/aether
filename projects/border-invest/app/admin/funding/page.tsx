import type { Metadata } from "next";
import Link from "next/link";
import { AdminFundingReview } from "../../components/admin-funding-review";
import { fundingSources } from "@/src/data/funding-sources";

export const metadata: Metadata = {
  title: "Funding Source Review | Aether",
  description: "Review and publish Aether funding-source references.",
};

export default function AdminFundingPage() {
  return (
    <main>
      <section className="border-b bg-brand-bg">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8 lg:py-24">
          <Link
            href="/funding"
            className="inline-flex min-h-10 items-center text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            &lt;- Public funding directory
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Admin / source governance
          </p>
          <h1 className="mt-5 max-w-5xl font-serif text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl">
            Keep the directory worthy of trust.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
            Review official source pages, pause stale references, and record the
            last local check before a source appears in the public directory.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="border border-destructive/30 bg-destructive/5 p-5 text-sm leading-6">
          <strong>Prototype admin boundary.</strong> This route has no
          authentication and stores review overrides in this browser. Do not
          expose it publicly until server-side auth, roles, audit logs, and
          database row-level security exist.
        </div>
        <AdminFundingReview sources={fundingSources} />
      </section>
    </main>
  );
}
