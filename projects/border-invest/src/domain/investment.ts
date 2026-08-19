export type EligibilityStatus =
  "not_started" | "pending" | "eligible" | "ineligible" | "manual_review";

export type CommitmentStatus =
  "draft" | "awaiting_signature" | "submitted" | "confirmed" | "failed";

export type Commitment = {
  id: string;
  investorId: string;
  offeringId: string;
  amountMinor: bigint;
  currency: "USDC";
  status: CommitmentStatus;
  transactionSignature?: string;
};

export type SandboxCommitment = {
  id: string;
  projectSlug: string;
  projectName: string;
  walletAddress: string;
  amountUsd: number;
  tokenAmount?: number;
  tokenSymbol?: string;
  tokenMint?: string;
  transactionSignature?: string;
  createdAt: string;
  status: "sandbox_recorded" | "devnet_confirmed";
};

export type EligibilityReadinessRecord = {
  status: "readiness_acknowledged";
  country: string;
  participantType: "individual" | "organization";
  confirmedAt: string;
};

export type ProjectDraft = {
  id: string;
  projectName: string;
  operatorName: string;
  operatorType:
    "Individual" | "Company" | "Cooperative" | "Public-interest entity";
  country: string;
  sector: string;
  fundingCadence: "One-time project" | "Continuous program";
  fundingModel: "Revenue share" | "Grant" | "Debt" | "Equity";
  targetUsd: number;
  summary: string;
  createdAt: string;
  status: "draft";
};
