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
