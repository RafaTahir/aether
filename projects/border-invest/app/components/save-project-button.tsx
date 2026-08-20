"use client";

import { useState, useTransition } from "react";
import { toggleSavedProject } from "../projects/saved";
import { AETHER_STORAGE_KEYS, useAetherStorage } from "../lib/aether-storage";

export function SaveProjectButton({
  projectSlug,
  initialSaved = false,
  storageMode = "account",
}: {
  projectSlug: string;
  initialSaved?: boolean;
  storageMode?: "account" | "browser";
}) {
  const [localSaved, setLocalSaved, localReady] = useAetherStorage<string[]>(
    AETHER_STORAGE_KEYS.savedProjects,
    []
  );
  const [saved, setSaved] = useState(
    initialSaved ||
      (storageMode === "browser" && localSaved.includes(projectSlug))
  );
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const isSaved =
    storageMode === "browser" ? localSaved.includes(projectSlug) : saved;

  function toggleSaved() {
    setMessage("");
    if (storageMode === "browser") {
      const nextSaved = !isSaved;
      setLocalSaved((current) =>
        nextSaved
          ? [...new Set([...current, projectSlug])]
          : current.filter((slug) => slug !== projectSlug)
      );
      setSaved(nextSaved);
      return;
    }
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
        disabled={isPending || (storageMode === "browser" && !localReady)}
        aria-pressed={isSaved}
        aria-label={
          isSaved ? "Remove project from saved projects" : "Save project"
        }
        className="inline-flex min-h-10 items-center gap-2 border bg-card px-3 text-xs font-semibold transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
      >
        <span aria-hidden="true">
          {isPending ? "Saving..." : isSaved ? "Saved" : "Save"}
        </span>
        <span aria-hidden="true">{isSaved ? "*" : "+"}</span>
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
