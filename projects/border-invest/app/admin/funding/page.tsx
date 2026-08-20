import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminFundingReview } from "../../components/admin-funding-review";
import { loadFundingSources } from "../../lib/funding-source-loader";
import { createSupabaseServerClient } from "../../lib/supabase/server";
import { hasSupabaseEnv } from "../../lib/supabase/config";

export const metadata: Metadata = {
  title: "Funding Source Review | Aether",
  description: "Review and publish Aether funding-source references.",
};

export default async function AdminFundingPage() {
  if (!hasSupabaseEnv())
    return (
      <AdminSetupState
        title="Connect Supabase before opening review tools."
        body="Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, apply the Supabase migration, then sign in with a reviewer account."
      />
    );

  const supabase = await createSupabaseServerClient();
  if (!supabase)
    return (
      <AdminSetupState
        title="Supabase is unavailable."
        body="Check the Supabase environment variables and restart the application."
      />
    );

  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/auth?next=/admin/funding");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userData.user.id)
    .maybeSingle();
  if (profileError)
    return (
      <AdminSetupState
        title="Apply the Supabase migration first."
        body="The profiles table is not available yet. Run the SQL migration in supabase/migrations/0001_aether_core.sql, then sign in again."
      />
    );
  if (!profile || !["admin", "reviewer"].includes(profile.role))
    return (
      <AdminSetupState
        title="Reviewer access required."
        body="Your account is authenticated but does not have the admin or reviewer role. Promote the account in Supabase after verifying the operator."
      />
    );

  const sources = await loadFundingSources({ includeUnpublished: true });
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
          <h1 className="mt-5 max-w-5xl font-serif text-3xl font-medium leading-[0.95] tracking-tight sm:text-5xl md:text-7xl">
            Keep the directory worthy of trust.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground">
            Signed in as {userData.user.email ?? "reviewer"}. Review official
            source pages, pause stale references, and record the last local
            check before a source appears in the public directory.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="border border-primary/30 bg-primary/5 p-5 text-sm leading-6">
          <strong>Protected review mode.</strong> Changes are written to
          Supabase, recorded in review history, and reflected in the public
          directory after revalidation.
        </div>
        <Link
          href="/admin/projects"
          className="mt-6 inline-flex min-h-11 items-center border bg-background px-5 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
        >
          Review project rooms
        </Link>
        <AdminFundingReview sources={sources} backendEnabled />
      </section>
    </main>
  );
}

function AdminSetupState({ title, body }: { title: string; body: string }) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 md:px-6">
      <div className="border bg-card p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Admin setup
        </p>
        <h1 className="mt-4 font-serif text-4xl font-medium">{title}</h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">{body}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/auth"
            className="inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Sign in
          </Link>
          <Link
            href="/funding"
            className="inline-flex min-h-11 items-center border bg-background px-5 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Back to directory
          </Link>
        </div>
      </div>
    </main>
  );
}
