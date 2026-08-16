import type { FundingReviewState, FundingSource } from "@/src/domain/funding";

export function fundingSourceFromRecord(
  record: Record<string, unknown>
): FundingSource {
  return {
    id: String(record.id),
    name: String(record.name),
    kind: record.kind as FundingSource["kind"],
    countries: strings(record.countries),
    sectors: strings(record.sectors),
    fundingModels: strings(
      record.funding_models
    ) as FundingSource["fundingModels"],
    operatorTypes: strings(
      record.operator_types
    ) as FundingSource["operatorTypes"],
    fundingRange: String(record.funding_range ?? "Varies by source"),
    minUsd: optionalNumber(record.min_usd),
    maxUsd: optionalNumber(record.max_usd),
    stage: record.stage as FundingSource["stage"],
    nextWindow: String(record.next_window),
    description: String(record.description),
    eligibility: String(record.eligibility),
    applicationMode:
      record.application_mode as FundingSource["applicationMode"],
    officialUrl: String(record.official_url),
    applicationUrl: String(record.application_url),
    verificationStatus: String(record.verification_status),
    reviewState: record.review_state as FundingReviewState,
    lastVerified: String(record.last_verified),
    sourceNotes: String(record.source_notes),
  };
}

function strings(value: unknown) {
  return Array.isArray(value) ? value.map(String) : [];
}

function optionalNumber(value: unknown) {
  if (value === null || value === undefined || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}
