"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { EligibilityReadinessRecord } from "@/src/domain/investment";
import { AETHER_STORAGE_KEYS, useAetherStorage } from "../lib/aether-storage";

const countries = [
  "United States",
  "Canada",
  "Singapore",
  "Philippines",
  "Indonesia",
  "Vietnam",
  "Laos",
  "Other",
];

export function EligibilityFlow() {
  const [record, setRecord, ready] =
    useAetherStorage<EligibilityReadinessRecord | null>(
      AETHER_STORAGE_KEYS.eligibility,
      null
    );
  const [country, setCountry] = useState("United States");
  const [participantType, setParticipantType] =
    useState<EligibilityReadinessRecord["participantType"]>("individual");
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  function runCheck(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!confirmed) {
      setError(
        "Confirm that you understand this is a readiness acknowledgement, not a legal eligibility decision."
      );
      return;
    }
    setError("");
    setRecord({
      status: "readiness_acknowledged",
      country,
      participantType,
      confirmedAt: new Date().toISOString(),
    });
  }

  if (record) {
    return (
      <div className="border border-primary/40 bg-primary/5 p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Readiness acknowledged
        </p>
        <h2 className="mt-3 font-serif text-3xl font-medium">
          Ready to review project rooms.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
          This status is stored only in this browser. It is not KYC, AML, legal
          eligibility, or permission to invest.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/#opportunities"
            className="inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Browse projects
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex min-h-11 items-center border bg-card px-5 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Open portfolio
          </Link>
          <button
            type="button"
            onClick={() => setRecord(null)}
            className="min-h-11 px-3 text-sm font-semibold text-muted-foreground underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring"
          >
            Reset acknowledgement
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={runCheck} className="border bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Participant readiness
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium">
            Review readiness
          </h2>
        </div>
        <span className="bg-secondary px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">
          No PII collected
        </span>
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
        This teaches the intended sequence without asking for identity documents
        or making a legal determination.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <label>
          <span className="mb-2 block text-sm font-semibold">
            Residence or operating country
          </span>
          <select
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className="min-h-11 w-full border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
            disabled={!ready}
          >
            {countries.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-2 block text-sm font-semibold">
            I am exploring as
          </span>
          <select
            value={participantType}
            onChange={(event) =>
              setParticipantType(
                event.target
                  .value as EligibilityReadinessRecord["participantType"]
              )
            }
            className="min-h-11 w-full border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
            disabled={!ready}
          >
            <option value="individual">An individual</option>
            <option value="organization">An organization</option>
          </select>
        </label>
      </div>
      <label className="mt-6 flex items-start gap-3 border-t pt-5 text-sm leading-6">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(event) => setConfirmed(event.target.checked)}
          className="mt-1 size-4 accent-primary focus-visible:ring-2 focus-visible:ring-ring"
        />{" "}
        <span>
          I understand that this acknowledgement is not KYC, AML, legal
          eligibility, an investment offer, ownership, or a return promise.
        </span>
      </label>
      {error && (
        <p role="alert" className="mt-4 text-sm font-medium text-destructive">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={!ready}
        className="mt-6 min-h-11 bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
      >
        Record readiness
      </button>
    </form>
  );
}
