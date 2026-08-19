import Link from "next/link";
import { createSupabaseServerClient } from "../../lib/supabase/server";
import {
  ProjectReviewQueue,
  type ReviewSubmission,
} from "./project-review-queue";

export default async function AdminProjectsPage() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return <AccessMessage title="Supabase is not configured." />;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return <AccessMessage title="Sign in to review project rooms." />;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (!profile || !["admin", "reviewer"].includes(profile.role)) {
    return <AccessMessage title="Reviewer access is required." />;
  }

  const { data, error } = await supabase
    .from("project_submissions")
    .select(
      "id,project_name,operator_name,operator_type,country,sector,funding_cadence,funding_model,target_usd,summary,status,reviewer_notes,submitted_at,created_at,updated_at"
    )
    .order("updated_at", { ascending: false });

  return (
    <main>
      <section className="border-b bg-brand-bg">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8 lg:py-24">
          <Link
            href="/admin/funding"
            className="inline-flex min-h-10 items-center text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
          >
            &lt;- Funding review
          </Link>
          <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Reviewer workspace
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl">
            Review project rooms before they become public.
          </h1>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        {error ? (
          <div className="border border-destructive/40 bg-destructive/5 p-8">
            <h2 className="font-serif text-3xl font-medium">
              The review queue could not load.
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {error.message}
            </p>
          </div>
        ) : (
          <ProjectReviewQueue
            submissions={(data ?? []) as ReviewSubmission[]}
          />
        )}
      </section>
    </main>
  );
}

function AccessMessage({ title }: { title: string }) {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 md:px-6 lg:px-8">
      <div className="border border-dashed p-8">
        <h1 className="font-serif text-4xl font-medium">{title}</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          This workspace is limited to authenticated Aether reviewers.
        </p>
        <Link
          href="/auth?next=/admin/projects"
          className="mt-6 inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Sign in
        </Link>
      </div>
    </main>
  );
}
