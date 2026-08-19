"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createSupabaseBrowserClient } from "../lib/supabase/client";
import { hasSupabaseEnv } from "../lib/supabase/config";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMagicLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!hasSupabaseEnv()) {
      setError(
        "Supabase is not configured yet. Add the project URL and anon key to .env.local."
      );
      return;
    }

    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const next =
        new URLSearchParams(window.location.search).get("next") ?? "/portfolio";
      const safeNext =
        next.startsWith("/") && !next.startsWith("//") ? next : "/portfolio";
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext)}`,
        },
      });
      if (authError) setError(authError.message);
      else setMessage("Check your email for a secure sign-in link.");
    } catch {
      setError(
        "Could not start sign-in. Check the Supabase configuration and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-20 md:px-6 lg:px-8">
      <Link
        href="/"
        className="inline-flex min-h-10 items-center text-sm font-medium text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        &lt;- Back to Aether
      </Link>
      <div className="mt-12 border bg-card p-6 md:p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Aether account
        </p>
        <h1 className="mt-4 font-serif text-4xl font-medium">
          Sign in to continue.
        </h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          Use a magic link to access your saved projects, operator drafts, and
          protected review tools.
        </p>
        <form onSubmit={sendMagicLink} className="mt-8">
          <label>
            <span className="mb-2 block text-sm font-semibold">
              Email address
            </span>
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="min-h-11 w-full border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
          {error && (
            <p
              role="alert"
              className="mt-4 text-sm font-medium text-destructive"
            >
              {error}
            </p>
          )}
          {message && (
            <p role="status" className="mt-4 text-sm font-medium text-primary">
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 min-h-11 w-full bg-primary px-4 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {loading ? "Sending link..." : "Send magic link"}
          </button>
        </form>
        <p className="mt-6 text-xs leading-5 text-muted-foreground">
          Aether will not make a legal eligibility determination through this
          sign-in. Identity checks require approved providers.
        </p>
      </div>
    </main>
  );
}
