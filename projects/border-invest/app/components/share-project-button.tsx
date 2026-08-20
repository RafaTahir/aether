"use client";

import { useState } from "react";

export function ShareProjectButton() {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
      }
      setState("copied");
      window.setTimeout(() => setState("idle"), 1800);
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === "AbortError") return;
      setState("error");
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex min-h-10 items-center border bg-card px-3 text-xs font-semibold transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {state === "copied"
        ? "Link copied"
        : state === "error"
          ? "Copy unavailable"
          : "Share brief"}
    </button>
  );
}
