import type { Commitment } from "@/src/domain/investment";

export type CreateCommitmentInput = {
  investorId: string;
  offeringId: string;
  amountMinor: bigint;
  walletAddress: string;
};

export interface CommitmentService {
  create(input: CreateCommitmentInput): Promise<Commitment>;
}

export class DisabledCommitmentService implements CommitmentService {
  async create(): Promise<Commitment> {
    throw new Error(
      "Commitments are disabled in the devnet architecture prototype."
    );
  }
}
