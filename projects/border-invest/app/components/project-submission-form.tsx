"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { ProjectDraft } from "@/src/domain/investment";
import { AETHER_STORAGE_KEYS, useAetherStorage } from "../lib/aether-storage";

const countries = [
  "Philippines",
  "Indonesia",
  "Laos",
  "Vietnam",
  "Thailand",
  "Other",
];
const sectors = [
  "Clean infrastructure",
  "Community health",
  "Coastal resilience",
  "Circular manufacturing",
  "Education",
  "Other",
];

type FormState = Omit<
  ProjectDraft,
  "id" | "createdAt" | "status" | "targetUsd"
> & { targetUsd: string };

const emptyForm: FormState = {
  projectName: "",
  operatorName: "",
  operatorType: "Company",
  country: "Philippines",
  sector: "Clean infrastructure",
  fundingCadence: "One-time project",
  fundingModel: "Grant",
  targetUsd: "",
  summary: "",
};

export function ProjectSubmissionForm() {
  const [drafts, setDrafts, ready] = useAetherStorage<ProjectDraft[]>(
    AETHER_STORAGE_KEYS.projectDrafts,
    []
  );
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [savedId, setSavedId] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function saveDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (
      !form.projectName.trim() ||
      !form.operatorName.trim() ||
      !form.summary.trim() ||
      !form.targetUsd
    ) {
      setError(
        "Add a project name, operator, funding target, and short summary."
      );
      return;
    }

    const targetUsd = Number(form.targetUsd);
    if (!Number.isFinite(targetUsd) || targetUsd <= 0) {
      setError("Enter a funding target greater than zero.");
      return;
    }

    const id = `draft-${Date.now()}`;
    const draft: ProjectDraft = {
      ...form,
      targetUsd,
      id,
      createdAt: new Date().toISOString(),
      status: "draft",
    };
    setDrafts([...drafts, draft]);
    setSavedId(id);
    setError("");
  }

  if (savedId) {
    return (
      <div className="border border-primary/40 bg-primary/5 p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Draft saved locally
        </p>
        <h2 className="mt-3 font-serif text-4xl font-medium">
          Your project has a review starting point.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
          Draft {savedId} is stored in this browser only. It has not been
          submitted to Aether, reviewed, verified, or published.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            View project briefs
          </Link>
          <button
            type="button"
            onClick={() => {
              setSavedId(null);
              setForm(emptyForm);
            }}
            className="min-h-11 border bg-card px-5 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
          >
            Create another draft
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={saveDraft} className="border bg-card p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Operator intake
          </p>
          <h2 className="mt-3 font-serif text-3xl font-medium">
            Start a project brief
          </h2>
        </div>
        <span className="bg-secondary px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">
          Local draft only
        </span>
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
        Give participants enough context to inspect the work. A production
        submission would add KYB, documents, legal review, and evidence uploads
        later.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Field
          label="Project name"
          value={form.projectName}
          onChange={(value) => update("projectName", value)}
          placeholder="Solar irrigation network"
        />
        <Field
          label="Operator or entity name"
          value={form.operatorName}
          onChange={(value) => update("operatorName", value)}
          placeholder="Your name or organization"
        />
        <SelectField
          label="Operator type"
          value={form.operatorType}
          onChange={(value) =>
            update("operatorType", value as FormState["operatorType"])
          }
          options={[
            "Individual",
            "Company",
            "Cooperative",
            "Public-interest entity",
          ]}
        />
        <SelectField
          label="Country"
          value={form.country}
          onChange={(value) => update("country", value)}
          options={countries}
        />
        <SelectField
          label="Sector"
          value={form.sector}
          onChange={(value) => update("sector", value)}
          options={sectors}
        />
        <SelectField
          label="Project shape"
          value={form.fundingCadence}
          onChange={(value) =>
            update("fundingCadence", value as FormState["fundingCadence"])
          }
          options={["One-time project", "Continuous program"]}
        />
        <SelectField
          label="Funding model"
          value={form.fundingModel}
          onChange={(value) =>
            update("fundingModel", value as FormState["fundingModel"])
          }
          options={["Grant", "Revenue share", "Debt", "Equity"]}
        />
        <label>
          <span className="mb-2 block text-sm font-semibold">
            Funding target (USD)
          </span>
          <input
            required
            type="number"
            min="1"
            step="1"
            inputMode="decimal"
            value={form.targetUsd}
            onChange={(event) => update("targetUsd", event.target.value)}
            placeholder="250000"
            className="min-h-11 w-full border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
      </div>
      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-semibold">
          Project summary
        </span>
        <textarea
          required
          rows={5}
          value={form.summary}
          onChange={(event) => update("summary", event.target.value)}
          placeholder="What will this project change, who operates it, and what will funding pay for?"
          className="w-full resize-y border bg-background px-3 py-3 text-sm leading-6 focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>
      {error && (
        <p role="alert" className="mt-4 text-sm font-medium text-destructive">
          {error}
        </p>
      )}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-5">
        <p className="max-w-md text-xs leading-5 text-muted-foreground">
          No files, identity documents, wallet signatures, or network requests
          are collected by this demo form.
        </p>
        <button
          type="submit"
          disabled={!ready}
          className="min-h-11 bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
        >
          Save local draft
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      <input
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-h-11 w-full border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
      />
    </label>
  );
}
function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-11 w-full border bg-background px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
