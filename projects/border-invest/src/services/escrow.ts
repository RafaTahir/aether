export type EscrowRelease = {
  offeringId: string;
  milestoneId: string;
  amountMinor: bigint;
  recipientAddress: string;
};

export interface EscrowService {
  prepareDeposit(
    offeringId: string,
    investorAddress: string,
    amountMinor: bigint
  ): Promise<Uint8Array>;
  prepareRelease(release: EscrowRelease): Promise<Uint8Array>;
}

// Implement only after a regulated custody model and audited program are selected.
export class DisabledEscrowService implements EscrowService {
  async prepareDeposit(): Promise<Uint8Array> {
    throw new Error("Escrow is not configured.");
  }

  async prepareRelease(): Promise<Uint8Array> {
    throw new Error("Escrow is not configured.");
  }
}
