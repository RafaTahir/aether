import type { EligibilityStatus } from "@/src/domain/investment";

export type EligibilityRequest = {
  investorId: string;
  offeringId: string;
  residenceCountry: string;
  walletAddress: string;
};

export interface EligibilityService {
  check(request: EligibilityRequest): Promise<EligibilityStatus>;
}

// Production implementations must call approved KYC/AML and offering-rule providers.
export class DemoEligibilityService implements EligibilityService {
  async check(): Promise<EligibilityStatus> {
    return "manual_review";
  }
}
