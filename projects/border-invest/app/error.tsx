"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Could not load the prototype</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The project data or network connection failed. Try the request again.
      </p>
      <button
        onClick={reset}
        className="mt-6 min-h-11 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Try again
      </button>
    </main>
  );
}
