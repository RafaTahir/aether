import type { FundingReviewState, FundingSource } from "@/src/domain/funding";

export type FundingSourceReview = {
  sourceId: string;
  state: FundingReviewState;
  reviewedAt: string;
  reviewerId: string;
  note?: string;
};

export interface FundingSourceRepository {
  listPublished(): Promise<FundingSource[]>;
  listForReview(): Promise<FundingSource[]>;
  saveReview(review: FundingSourceReview): Promise<void>;
}

// Replace this adapter with a database implementation after auth and RLS exist.
export class InMemoryFundingSourceRepository implements FundingSourceRepository {
  constructor(private readonly sources: FundingSource[]) {}

  async listPublished() {
    return this.sources.filter((source) => source.reviewState === "published");
  }

  async listForReview() {
    return this.sources.filter((source) => source.reviewState !== "published");
  }

  async saveReview() {
    // The current admin demo persists overrides in browser storage instead.
  }
}
