"use client";

import Link from "next/link";
import type { InvestmentProject } from "@/src/domain/project";
import type {
  LocalFundingApplication,
  SandboxCommitment,
} from "@/src/domain/investment";
import { formatDetailedCurrency } from "@/src/lib/format-number";
import { AETHER_STORAGE_KEYS, useAetherStorage } from "../lib/aether-storage";
import type { PortfolioApplication, PortfolioState } from "../portfolio/data";
import { ProjectCard } from "./project-card";

export function PortfolioView({
  projects,
  state,
}: {
  projects: InvestmentProject[];
  state: PortfolioState;
}) {
  const [localSavedSlugs, , savedReady] = useAetherStorage<string[]>(
    AETHER_STORAGE_KEYS.savedProjects,
    []
  );
  const [localApplications, , applicationsReady] = useAetherStorage<
    LocalFundingApplication[]
  >(AETHER_STORAGE_KEYS.fundingApplications, []);
  const [commitments, , commitmentsReady] = useAetherStorage<
    SandboxCommitment[]
  >(AETHER_STORAGE_KEYS.commitments, []);
  const browserMode = state.kind === "unconfigured";
  if (state.kind !== "ready" && !browserMode) {
    return (
      <div className="border border-dashed p-10 text-center">
        <h2 className="font-serif text-3xl font-medium">
          {state.kind === "signed_out"
            ? "Sign in to access your portfolio."
            : "The portfolio could not load."}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          {state.kind === "error"
            ? state.message
            : "Saved project rooms are account-backed and are not stored only in this browser."}
        </p>
        <Link
          href={state.kind === "signed_out" ? "/auth?next=/portfolio" : "/"}
          className="mt-6 inline-flex min-h-11 items-center bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {state.kind === "signed_out" ? "Sign in" : "Browse project rooms"}
        </Link>
      </div>
    );
  }

  const savedSlugs =
    browserMode || state.kind !== "ready" ? localSavedSlugs : state.savedSlugs;
  const applications: PortfolioApplication[] = browserMode
    ? localApplications.map((application) => ({
        id: application.id,
        project_slug: application.projectSlug,
        source_id: application.sourceId,
        source_name: application.sourceName,
        status: application.status,
        created_at: application.createdAt,
        updated_at: application.updatedAt,
      }))
    : state.kind === "ready"
      ? state.applications
      : [];
  const saved = projects.filter((project) => savedSlugs.includes(project.slug));
  const ready = commitmentsReady && savedReady && applicationsReady;

  if (!ready) {
    return (
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="h-44 animate-pulse bg-secondary" />
        <div className="h-44 animate-pulse bg-secondary" />
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-16 lg:grid-cols-12">
      <section className="lg:col-span-7">
        <div className="flex items-end justify-between gap-4 border-b pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Watchlist
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium">
              Saved project rooms
            </h2>
          </div>
          <span className="font-mono text-sm tabular-nums text-muted-foreground">
            {saved.length}
          </span>
        </div>
        {saved.length === 0 ? (
          <EmptyState
            title="No saved projects yet"
            body="Save a project brief to keep it close while you compare operators, risks, and milestones."
            href="/#opportunities"
            label="Browse project briefs"
          />
        ) : (
          <div className="mt-6">
            {saved.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>

      <section className="space-y-12 lg:col-span-5">
        <ApplicationList applications={applications} projects={projects} />
        <section className="border-t pt-12">
          <div className="flex items-end justify-between gap-4 border-b pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Devnet activity
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium">
                Wallet activity
              </h2>
            </div>
            <span className="font-mono text-sm tabular-nums text-muted-foreground">
              {commitments.length}
            </span>
          </div>
          {commitments.length === 0 ? (
            <EmptyState
              title="Nothing recorded"
              body="A configured devnet transaction recorded in this browser will appear here."
              href="/onboarding"
              label="Review readiness"
            />
          ) : (
            <div className="mt-6 divide-y border-y">
              {commitments.map((commitment) => (
                <div key={commitment.id} className="py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">
                        {commitment.projectName}
                      </p>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {shorten(commitment.walletAddress)}
                      </p>
                    </div>
                    <span className="bg-secondary px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">
                      {commitment.status === "devnet_confirmed"
                        ? "Devnet"
                        : "Local"}
                    </span>
                  </div>
                  <p className="mt-4 font-mono text-xl font-medium tabular-nums">
                    {commitment.tokenAmount !== undefined
                      ? `${formatTokenAmount(commitment.tokenAmount)} ${commitment.tokenSymbol ?? "TEST"}`
                      : formatDetailedCurrency(commitment.amountUsd)}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {commitment.status === "devnet_confirmed"
                      ? `Confirmed on devnet ${formatDate(commitment.createdAt)}.`
                      : `Recorded ${formatDate(commitment.createdAt)}. No funds moved.`}
                  </p>
                  {commitment.transactionSignature && (
                    <a
                      href={`https://explorer.solana.com/tx/${commitment.transactionSignature}?cluster=devnet`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex min-h-8 items-center text-xs font-semibold underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      View devnet transaction
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </div>
  );
}

function ApplicationList({
  applications,
  projects,
}: {
  applications: PortfolioApplication[];
  projects: InvestmentProject[];
}) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4 border-b pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Funding workflow
          </p>
          <h2 className="mt-2 font-serif text-3xl font-medium">Applications</h2>
        </div>
        <span className="font-mono text-sm tabular-nums text-muted-foreground">
          {applications.length}
        </span>
      </div>
      {applications.length === 0 ? (
        <EmptyState
          title="No applications yet"
          body="Complete a funding readiness checklist to create an application record."
          href="/funding"
          label="Browse funding sources"
        />
      ) : (
        <div className="mt-6 divide-y border-y">
          {applications.map((application) => {
            const project = projects.find(
              (candidate) => candidate.slug === application.project_slug
            );
            return (
              <div key={application.id} className="py-5">
                <p className="text-sm font-semibold">
                  {project?.name ?? application.project_slug}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {application.source_name}
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <span className="bg-secondary px-2 py-1 text-[10px] font-semibold uppercase tracking-wider">
                    {application.status.replaceAll("_", " ")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Updated {formatDate(application.updated_at)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function EmptyState({
  title,
  body,
  href,
  label,
}: {
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <div className="mt-6 border border-dashed p-6">
      <h3 className="font-serif text-2xl font-medium">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
      <Link
        href={href}
        className="mt-5 inline-flex min-h-10 items-center bg-primary px-4 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        {label}
      </Link>
    </div>
  );
}

function shorten(value: string) {
  return value.length > 12
    ? `${value.slice(0, 5)}...${value.slice(-4)}`
    : value;
}
function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(value)
  );
}
function formatTokenAmount(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 6 }).format(
    value
  );
}
