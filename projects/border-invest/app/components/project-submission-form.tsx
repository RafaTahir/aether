"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  createProjectSubmission,
  type ProjectSubmissionInput,
  type ProjectSubmissionStatus,
} from "../projects/submit/actions";

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

type FormState = ProjectSubmissionInput;

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
  termsAccepted: false,
};

export function ProjectSubmissionForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState<{
    id: string;
    status: ProjectSubmissionStatus;
  } | null>(null);
  const [savingStatus, setSavingStatus] =
    useState<ProjectSubmissionStatus | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function saveSubmission(
    event: FormEvent<HTMLFormElement>,
    status: ProjectSubmissionStatus
  ) {
    event.preventDefault();
    setError("");
    setSavingStatus(status);
    const result = await createProjectSubmission(form, status);
    if (result.ok) {
      setSaved({ id: result.submission.id, status });
    } else {
      setError(result.error);
    }
    setSavingStatus(null);
  }

  if (saved) {
    return (
      <div className="border border-primary/40 bg-primary/5 p-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          {saved.status === "submitted"
            ? "Submitted for review"
            : "Draft saved"}
        </p>
        <h2 className="mt-3 font-serif text-4xl font-medium">
          Your project room has a durable starting point.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground">
          Submission {saved.id} is stored in Aether. It is now visible in your
          operator workspace with its current review state.
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
              setSaved(null);
              setForm(emptyForm);
            }}
            className="min-h-11 border bg-card px-5 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
          >
            Create another project room
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        const submitter = (event.nativeEvent as SubmitEvent).submitter;
        const status =
          submitter?.getAttribute("data-status") === "submitted"
            ? "submitted"
            : "draft";
        void saveSubmission(event, status);
      }}
      className="border bg-card p-6 md:p-8"
    >
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
          Pilot intake
        </span>
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
        Give participants enough context to inspect the work. A submitted room
        enters a reviewer queue; evidence, identity checks, and legal review are
        handled as separate review stages.
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
      <label className="mt-6 flex items-start gap-3 text-sm leading-6">
        <input
          required
          type="checkbox"
          checked={form.termsAccepted}
          onChange={(event) => update("termsAccepted", event.target.checked)}
          className="mt-1 size-4 accent-primary focus-visible:ring-2 focus-visible:ring-ring"
        />
        <span>
          I understand this is a project intake for review. It does not create
          legal eligibility, an investment offering, or a request for funds.
        </span>
      </label>
      {error && (
        <p role="alert" className="mt-4 text-sm font-medium text-destructive">
          {error}
        </p>
      )}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-5">
        <p className="max-w-md text-xs leading-5 text-muted-foreground">
          No wallet signature or funds are requested at intake. Review may
          require evidence and identity information through approved providers.
        </p>
        <div className="flex flex-wrap justify-end gap-3">
          <button
            type="submit"
            data-status="draft"
            disabled={savingStatus !== null}
            className="min-h-11 border bg-card px-5 text-sm font-semibold hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
          >
            {savingStatus === "draft" ? "Saving..." : "Save draft"}
          </button>
          <button
            type="submit"
            data-status="submitted"
            disabled={savingStatus !== null}
            className="min-h-11 bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {savingStatus === "submitted"
              ? "Submitting..."
              : "Submit for review"}
          </button>
        </div>
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
