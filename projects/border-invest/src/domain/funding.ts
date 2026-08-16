import type { FundingModel, InvestmentProject } from "@/src/domain/project";

export type FundingSourceKind =
  | "Multilateral grant"
  | "Corporate CSR"
  | "Foundation grant"
  | "Impact fund"
  | "Philanthropy platform";

export type FundingReviewState = "published" | "needs_review" | "paused";

export type FundingSource = {
  id: string;
  name: string;
  kind: FundingSourceKind;
  countries: string[];
  sectors: string[];
  fundingModels: FundingModel[];
  operatorTypes: InvestmentProject["operatorType"][];
  fundingRange: string;
  minUsd?: number;
  maxUsd?: number;
  stage: "Concept" | "Pilot" | "Growth" | "Expansion";
  nextWindow: string;
  description: string;
  eligibility: string;
  applicationMode: "Open call" | "Partner referral" | "Rolling review";
  officialUrl: string;
  applicationUrl: string;
  verificationStatus: string;
  reviewState: FundingReviewState;
  lastVerified: string;
  sourceNotes: string;
};

export type FundingMatch = {
  source: FundingSource;
  score: number;
  reasons: string[];
};
