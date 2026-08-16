use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Escrow {
    pub version: u8,
    pub admin: Pubkey,
    pub emergency_admin: Pubkey,
    pub recipient: Pubkey,
    pub mint: Pubkey,
    pub vault: Pubkey,
    pub project_id: [u8; 32],
    pub total_deposited: u64,
    pub total_released: u64,
    pub total_refunded: u64,
    pub milestone_count: u8,
    pub milestones_created: u8,
    pub paused: bool,
    pub authority_bump: u8,
}

impl Escrow {
    pub fn available(&self) -> Option<u64> {
        self.total_deposited
            .checked_sub(self.total_released)?
            .checked_sub(self.total_refunded)
    }
}

#[account]
#[derive(InitSpace)]
pub struct Milestone {
    pub escrow: Pubkey,
    pub index: u8,
    pub amount: u64,
    pub status: u8,
    pub bump: u8,
}

#[account]
#[derive(InitSpace)]
pub struct DepositReceipt {
    pub escrow: Pubkey,
    pub depositor: Pubkey,
    pub amount: u64,
    pub bump: u8,
}
