pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("BzxhTouVDYHDurdAV5J2fi1paES87nKY9WXVFPZ3eGKj");

#[program]
pub mod aether_contracts {
    use super::*;

    pub fn initialize_escrow(
        ctx: Context<InitializeEscrow>,
        project_id: [u8; 32],
        milestone_count: u8,
    ) -> Result<()> {
        handle_initialize_escrow(ctx, project_id, milestone_count)
    }

    pub fn create_milestone(
        ctx: Context<CreateMilestone>,
        index: u8,
        amount: u64,
    ) -> Result<()> {
        handle_create_milestone(ctx, index, amount)
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        handle_deposit(ctx, amount)
    }

    pub fn release_milestone(ctx: Context<ReleaseMilestone>, index: u8) -> Result<()> {
        handle_release_milestone(ctx, index)
    }

    pub fn pause(ctx: Context<Pause>) -> Result<()> {
        ctx.accounts.escrow.paused = true;
        Ok(())
    }

    pub fn unpause(ctx: Context<Unpause>) -> Result<()> {
        ctx.accounts.escrow.paused = false;
        Ok(())
    }

    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        handle_refund(ctx)
    }
}
