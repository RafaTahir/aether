import type { FundingModel, InvestmentProject } from "@/src/domain/project";

export type FundingSourceKind =
  "Government grant" | "Corporate CSR" | "Foundation grant" | "Impact fund";

export type FundingSource = {
  id: string;
  name: string;
  kind: FundingSourceKind;
  countries: string[];
  sectors: string[];
  fundingModels: FundingModel[];
  operatorTypes: InvestmentProject["operatorType"][];
  minUsd: number;
  maxUsd: number;
  stage: "Concept" | "Pilot" | "Growth" | "Expansion";
  nextWindow: string;
  description: string;
  eligibility: string;
  applicationMode: "Open call" | "Partner referral" | "Rolling review";
};

export type FundingMatch = {
  source: FundingSource;
  score: number;
  reasons: string[];
};
