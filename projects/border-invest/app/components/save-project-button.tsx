"use client";

import { useState, useTransition } from "react";
import { toggleSavedProject } from "../projects/saved";

export function SaveProjectButton({
  projectSlug,
  initialSaved = false,
}: {
  projectSlug: string;
  initialSaved?: boolean;
}) {
  const [saved, setSaved] = useState(initialSaved);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function toggleSaved() {
    setMessage("");
    startTransition(async () => {
      const result = await toggleSavedProject(projectSlug);
      if (result.ok) setSaved(result.saved);
      else setMessage(result.error);
    });
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={toggleSaved}
        disabled={isPending}
        aria-pressed={saved}
        aria-label={
          saved ? "Remove project from saved projects" : "Save project"
        }
        className="inline-flex min-h-10 items-center gap-2 border bg-card px-3 text-xs font-semibold transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
      >
        <span aria-hidden="true">
          {isPending ? "Saving..." : saved ? "Saved" : "Save"}
        </span>
        <span aria-hidden="true">{saved ? "*" : "+"}</span>
      </button>
      {message && (
        <p
          role="alert"
          className="absolute right-0 top-full z-10 mt-2 w-56 border bg-card p-2 text-xs leading-5 text-destructive shadow-sm"
        >
          {message}
        </p>
      )}
    </div>
  );
}
