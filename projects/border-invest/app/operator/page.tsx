import Link from "next/link";
import { OperatorWorkspace } from "../components/operator-workspace";

export default function OperatorPage() {
  return (
    <main>
      <section className="border-b bg-brand-bg">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Operator workspace
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl">
            A project room starts as a clear brief.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
            Review local drafts, refine the scope, and prepare the evidence an
            independent reviewer would need. Nothing here is submitted or
            published.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects/submit"
              className="inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Start a new draft
            </Link>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center border bg-card px-5 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              View public briefs
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <OperatorWorkspace />
      </section>
      <section className="border-t bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 text-xs leading-5 text-muted-foreground md:px-6 lg:px-8">
          <strong className="text-foreground">Local-only prototype.</strong>{" "}
          Drafts are stored in this browser. Production intake requires
          authentication, KYB, document storage, review workflows, and
          jurisdiction-specific legal approval.
        </div>
      </section>
    </main>
  );
}
