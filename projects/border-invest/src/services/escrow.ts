export type EscrowRelease = {
  offeringId: string;
  milestoneId: string;
  amountMinor: bigint;
  recipientAddress: string;
};

export const AETHER_ESCROW_PROGRAM_ID =
  "BzxhTouVDYHDurdAV5J2fi1paES87nKY9WXVFPZ3eGKj";
export const AETHER_ESCROW_CLUSTER = "devnet" as const;
export const AETHER_ESCROW_STATUS = "devnet_deposit_integrated" as const;

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
    throw new Error(
      "Aether escrow is deployed to devnet but not integrated into the frontend yet."
    );
  }

  async prepareRelease(): Promise<Uint8Array> {
    throw new Error("Escrow is not configured.");
  }
}
