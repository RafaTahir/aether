use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("The caller is not authorized for this action")]
    Unauthorized,
    #[msg("The escrow is paused")]
    EscrowPaused,
    #[msg("The escrow is not paused")]
    EscrowNotPaused,
    #[msg("The amount must be greater than zero")]
    InvalidAmount,
    #[msg("The milestone count is invalid")]
    InvalidMilestoneCount,
    #[msg("Milestones must be created in order")]
    InvalidMilestoneIndex,
    #[msg("All milestones must be created before deposits")]
    MilestonesIncomplete,
    #[msg("The milestone has already been released")]
    MilestoneAlreadyReleased,
    #[msg("The escrow does not have enough available tokens")]
    InsufficientEscrowBalance,
    #[msg("The token mint does not match the escrow mint")]
    InvalidMint,
    #[msg("The token account does not belong to the expected owner")]
    InvalidTokenOwner,
    #[msg("The deposit receipt has no refundable balance")]
    NothingToRefund,
    #[msg("Refunds are disabled after a milestone release has started")]
    ReleasesAlreadyStarted,
    #[msg("Arithmetic operation overflowed")]
    MathOverflow,
    #[msg("Admin and emergency authorities must be different")]
    AuthoritiesMustDiffer,
}
