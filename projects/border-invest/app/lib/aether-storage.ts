"use client";

import {
  useCallback,
  useMemo,
  useRef,
  useSyncExternalStore,
  type SetStateAction,
} from "react";

export const AETHER_STORAGE_KEYS = {
  savedProjects: "aether:saved-projects",
  commitments: "aether:sandbox-commitments",
  eligibility: "aether:demo-eligibility",
  projectDrafts: "aether:project-drafts",
  funderShortlist: "aether:funder-shortlist",
} as const;

const STORAGE_EVENT = "aether-storage-change";

function readSnapshot(key: string, fallback: string) {
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function subscribe(key: string, onChange: () => void) {
  const sync = (event: Event) => {
    if (event.type === "storage" && (event as StorageEvent).key !== key) return;
    onChange();
  };

  window.addEventListener("storage", sync);
  window.addEventListener(STORAGE_EVENT, sync);
  return () => {
    window.removeEventListener("storage", sync);
    window.removeEventListener(STORAGE_EVENT, sync);
  };
}

export function useAetherStorage<T>(key: string, initialValue: T) {
  const fallbackRef = useRef(JSON.stringify(initialValue));
  const getSnapshot = useCallback(
    () => readSnapshot(key, fallbackRef.current),
    [key]
  );
  const getServerSnapshot = useCallback(() => fallbackRef.current, []);
  const snapshot = useSyncExternalStore(
    (onChange) => subscribe(key, onChange),
    getSnapshot,
    getServerSnapshot
  );
  const value = useMemo(() => {
    try {
      return JSON.parse(snapshot) as T;
    } catch {
      return initialValue;
    }
  }, [initialValue, snapshot]);

  const setValue = useCallback(
    (next: SetStateAction<T>) => {
      const current = readSnapshot(key, fallbackRef.current);
      let currentValue: T;
      try {
        currentValue = JSON.parse(current) as T;
      } catch {
        currentValue = initialValue;
      }
      const resolved =
        typeof next === "function"
          ? (next as (previous: T) => T)(currentValue)
          : next;

      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
        window.dispatchEvent(new Event(STORAGE_EVENT));
      } catch {
        // Local storage can be unavailable in private browsing contexts.
      }
    },
    [initialValue, key]
  );

  return [value, setValue, true] as const;
}
