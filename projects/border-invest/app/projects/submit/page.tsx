import Link from "next/link";
import { ProjectSubmissionForm } from "../../components/project-submission-form";

export default function SubmitProjectPage() {
  return (
    <main>
      <section className="border-b bg-brand-bg">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8 lg:py-24">
          <Link
            href="/"
            className="inline-flex min-h-10 items-center text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            &lt;- Back to Aether
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                For project operators
              </p>
              <h1 className="mt-5 max-w-5xl font-serif text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl">
                Bring a plan people can inspect.
              </h1>
            </div>
            <p className="border-l pl-6 text-base leading-7 text-muted-foreground lg:col-span-4">
              One-time builds and continuous programs both start with a clear
              scope, a credible operator, and evidence for every release.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Step 01 / project room
            </p>
            <h2 className="mt-4 font-serif text-4xl font-medium">
              Start with the facts.
            </h2>
            <ol className="mt-8 divide-y border-y">
              {[
                "Define the work and funding model",
                "Add the operator and place",
                "Save a draft for later review",
              ].map((item, index) => (
                <li
                  key={item}
                  className="grid grid-cols-[2.5rem_1fr] gap-3 py-4"
                >
                  <span className="font-mono text-xs tabular-nums text-muted-foreground">
                    0{index + 1}
                  </span>
                  <span className="text-sm leading-6">{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-8">
            <ProjectSubmissionForm />
          </div>
        </div>
      </section>
      <section className="border-t bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 text-xs leading-5 text-muted-foreground md:px-6 lg:px-8">
          <strong className="text-foreground">Prototype boundary.</strong>{" "}
          Saving a local draft does not submit a project, create an offering,
          establish eligibility, or request funds.
        </div>
      </section>
    </main>
  );
}
