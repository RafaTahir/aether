"use client";

import { AETHER_STORAGE_KEYS, useAetherStorage } from "../lib/aether-storage";

export function SaveProjectButton({ projectSlug }: { projectSlug: string }) {
  const [savedProjects, setSavedProjects, ready] = useAetherStorage<string[]>(
    AETHER_STORAGE_KEYS.savedProjects,
    []
  );
  const saved = savedProjects.includes(projectSlug);

  function toggleSaved() {
    setSavedProjects((current) =>
      current.includes(projectSlug)
        ? current.filter((slug) => slug !== projectSlug)
        : [...current, projectSlug]
    );
  }

  return (
    <button
      type="button"
      onClick={toggleSaved}
      disabled={!ready}
      aria-pressed={saved}
      aria-label={saved ? "Remove project from saved projects" : "Save project"}
      className="inline-flex min-h-10 items-center gap-2 border bg-card px-3 text-xs font-semibold transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
    >
      <span aria-hidden="true">{saved ? "Saved" : "Save"}</span>
      <span aria-hidden="true">{saved ? "*" : "+"}</span>
    </button>
  );
}
