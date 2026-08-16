use anchor_lang::prelude::*;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token_interface::{self, Mint, TokenAccount, TokenInterface, TransferChecked};

use crate::{
    constants::{AUTHORITY_SEED, DEPOSIT_SEED, ESCROW_SEED, MAX_MILESTONES, MILESTONE_PENDING, MILESTONE_RELEASED, MILESTONE_SEED},
    error::ErrorCode,
    state::{DepositReceipt, Escrow, Milestone},
};

#[derive(Accounts)]
#[instruction(project_id: [u8; 32])]
pub struct InitializeEscrow<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    pub emergency_admin: Signer<'info>,
    /// CHECK: The recipient is stored as the only release destination.
    pub recipient: UncheckedAccount<'info>,
    pub mint: InterfaceAccount<'info, Mint>,
    #[account(
        init,
        payer = admin,
        space = 8 + Escrow::INIT_SPACE,
        seeds = [ESCROW_SEED, &project_id],
        bump
    )]
    pub escrow: Account<'info, Escrow>,
    /// CHECK: This PDA is the authority of the escrow token account.
    #[account(seeds = [AUTHORITY_SEED, escrow.key().as_ref()], bump)]
    pub escrow_authority: UncheckedAccount<'info>,
    #[account(
        init,
        payer = admin,
        associated_token::mint = mint,
        associated_token::authority = escrow_authority,
        associated_token::token_program = token_program
    )]
    pub vault: InterfaceAccount<'info, TokenAccount>,
    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Interface<'info, TokenInterface>,
}

pub fn handle_initialize_escrow(
    ctx: Context<InitializeEscrow>,
    project_id: [u8; 32],
    milestone_count: u8,
) -> Result<()> {
    require!(milestone_count > 0 && milestone_count <= MAX_MILESTONES, ErrorCode::InvalidMilestoneCount);
    require!(ctx.accounts.admin.key() != ctx.accounts.emergency_admin.key(), ErrorCode::AuthoritiesMustDiffer);
    let escrow = &mut ctx.accounts.escrow;
    escrow.version = 1;
    escrow.admin = ctx.accounts.admin.key();
    escrow.emergency_admin = ctx.accounts.emergency_admin.key();
    escrow.recipient = ctx.accounts.recipient.key();
    escrow.mint = ctx.accounts.mint.key();
    escrow.vault = ctx.accounts.vault.key();
    escrow.project_id = project_id;
    escrow.total_deposited = 0;
    escrow.total_released = 0;
    escrow.total_refunded = 0;
    escrow.milestone_count = milestone_count;
    escrow.milestones_created = 0;
    escrow.paused = false;
    escrow.authority_bump = ctx.bumps.escrow_authority;
    Ok(())
}

#[derive(Accounts)]
#[instruction(index: u8)]
pub struct CreateMilestone<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(mut, has_one = admin)]
    pub escrow: Account<'info, Escrow>,
    #[account(
        init,
        payer = admin,
        space = 8 + Milestone::INIT_SPACE,
        seeds = [MILESTONE_SEED, escrow.key().as_ref(), &[index]],
        bump
    )]
    pub milestone: Account<'info, Milestone>,
    pub system_program: Program<'info, System>,
}

pub fn handle_create_milestone(
    ctx: Context<CreateMilestone>,
    index: u8,
    amount: u64,
) -> Result<()> {
    require!(amount > 0, ErrorCode::InvalidAmount);
    let escrow = &mut ctx.accounts.escrow;
    require!(index < escrow.milestone_count, ErrorCode::InvalidMilestoneIndex);
    require!(index == escrow.milestones_created, ErrorCode::InvalidMilestoneIndex);
    let milestone = &mut ctx.accounts.milestone;
    milestone.escrow = escrow.key();
    milestone.index = index;
    milestone.amount = amount;
    milestone.status = MILESTONE_PENDING;
    milestone.bump = ctx.bumps.milestone;
    escrow.milestones_created = escrow.milestones_created.checked_add(1).ok_or(ErrorCode::MathOverflow)?;
    Ok(())
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub depositor: Signer<'info>,
    #[account(mut, constraint = !escrow.paused @ ErrorCode::EscrowPaused, constraint = escrow.milestones_created == escrow.milestone_count @ ErrorCode::MilestonesIncomplete)]
    pub escrow: Account<'info, Escrow>,
    #[account(mut, constraint = depositor_token_account.owner == depositor.key() @ ErrorCode::InvalidTokenOwner, constraint = depositor_token_account.mint == escrow.mint @ ErrorCode::InvalidMint)]
    pub depositor_token_account: InterfaceAccount<'info, TokenAccount>,
    #[account(mut, address = escrow.vault, constraint = vault.mint == escrow.mint @ ErrorCode::InvalidMint)]
    pub vault: InterfaceAccount<'info, TokenAccount>,
    #[account(address = escrow.mint)]
    pub mint: InterfaceAccount<'info, Mint>,
    #[account(init_if_needed, payer = depositor, space = 8 + DepositReceipt::INIT_SPACE, seeds = [DEPOSIT_SEED, escrow.key().as_ref(), depositor.key().as_ref()], bump)]
    pub receipt: Account<'info, DepositReceipt>,
    pub system_program: Program<'info, System>,
    pub token_program: Interface<'info, TokenInterface>,
}

pub fn handle_deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
    require!(amount > 0, ErrorCode::InvalidAmount);
    let receipt = &mut ctx.accounts.receipt;
    if receipt.escrow == Pubkey::default() {
        receipt.escrow = ctx.accounts.escrow.key();
        receipt.depositor = ctx.accounts.depositor.key();
        receipt.bump = ctx.bumps.receipt;
    } else {
        require!(receipt.escrow == ctx.accounts.escrow.key(), ErrorCode::Unauthorized);
        require!(receipt.depositor == ctx.accounts.depositor.key(), ErrorCode::Unauthorized);
    }
    receipt.amount = receipt.amount.checked_add(amount).ok_or(ErrorCode::MathOverflow)?;
    ctx.accounts.escrow.total_deposited = ctx.accounts.escrow.total_deposited.checked_add(amount).ok_or(ErrorCode::MathOverflow)?;
    let cpi_accounts = TransferChecked {
        from: ctx.accounts.depositor_token_account.to_account_info(),
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.vault.to_account_info(),
        authority: ctx.accounts.depositor.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(ctx.accounts.token_program.key(), cpi_accounts);
    token_interface::transfer_checked(cpi_ctx, amount, ctx.accounts.mint.decimals)
        .map_err(Into::into)
}

#[derive(Accounts)]
#[instruction(index: u8)]
pub struct ReleaseMilestone<'info> {
    #[account(mut)]
    pub admin: Signer<'info>,
    #[account(mut, has_one = admin, constraint = !escrow.paused @ ErrorCode::EscrowPaused)]
    pub escrow: Box<Account<'info, Escrow>>,
    #[account(mut, seeds = [MILESTONE_SEED, escrow.key().as_ref(), &[index]], bump = milestone.bump, constraint = milestone.escrow == escrow.key() @ ErrorCode::Unauthorized, constraint = milestone.index == index @ ErrorCode::InvalidMilestoneIndex)]
    pub milestone: Box<Account<'info, Milestone>>,
    #[account(mut, address = escrow.vault, constraint = vault.mint == escrow.mint @ ErrorCode::InvalidMint)]
    pub vault: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(address = escrow.mint)]
    pub mint: Box<InterfaceAccount<'info, Mint>>,
    /// CHECK: The escrow account fixes the only valid release recipient.
    #[account(address = escrow.recipient)]
    pub recipient: UncheckedAccount<'info>,
    #[account(mut, constraint = recipient_token_account.owner == recipient.key() @ ErrorCode::InvalidTokenOwner, constraint = recipient_token_account.mint == mint.key() @ ErrorCode::InvalidMint)]
    pub recipient_token_account: Box<InterfaceAccount<'info, TokenAccount>>,
    /// CHECK: PDA authority verified by seeds and escrow state.
    #[account(seeds = [AUTHORITY_SEED, escrow.key().as_ref()], bump = escrow.authority_bump)]
    pub escrow_authority: UncheckedAccount<'info>,
    pub token_program: Interface<'info, TokenInterface>,
}

pub fn handle_release_milestone(ctx: Context<ReleaseMilestone>, _index: u8) -> Result<()> {
    require!(ctx.accounts.milestone.status == MILESTONE_PENDING, ErrorCode::MilestoneAlreadyReleased);
    let amount = ctx.accounts.milestone.amount;
    let available = ctx.accounts.escrow.available().ok_or(ErrorCode::MathOverflow)?;
    require!(available >= amount, ErrorCode::InsufficientEscrowBalance);
    ctx.accounts.milestone.status = MILESTONE_RELEASED;
    ctx.accounts.escrow.total_released = ctx.accounts.escrow.total_released.checked_add(amount).ok_or(ErrorCode::MathOverflow)?;
    let escrow_key = ctx.accounts.escrow.key();
    let signer_seeds: &[&[u8]] = &[AUTHORITY_SEED, escrow_key.as_ref(), &[ctx.accounts.escrow.authority_bump]];
    let cpi_accounts = TransferChecked {
        from: ctx.accounts.vault.to_account_info(),
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.recipient_token_account.to_account_info(),
        authority: ctx.accounts.escrow_authority.to_account_info(),
    };
    let signer_seed_groups = [signer_seeds];
    let cpi_ctx = CpiContext::new_with_signer(ctx.accounts.token_program.key(), cpi_accounts, &signer_seed_groups);
    token_interface::transfer_checked(cpi_ctx, amount, ctx.accounts.mint.decimals).map_err(Into::into)
}

#[derive(Accounts)]
pub struct Pause<'info> {
    pub emergency_admin: Signer<'info>,
    #[account(mut, has_one = emergency_admin)]
    pub escrow: Account<'info, Escrow>,
}

#[derive(Accounts)]
pub struct Unpause<'info> {
    pub admin: Signer<'info>,
    #[account(mut, has_one = admin)]
    pub escrow: Account<'info, Escrow>,
}

#[derive(Accounts)]
pub struct Refund<'info> {
    #[account(mut)]
    pub depositor: Signer<'info>,
    #[account(mut, constraint = escrow.paused @ ErrorCode::EscrowNotPaused)]
    pub escrow: Account<'info, Escrow>,
    #[account(mut, seeds = [DEPOSIT_SEED, escrow.key().as_ref(), depositor.key().as_ref()], bump = receipt.bump, constraint = receipt.escrow == escrow.key() @ ErrorCode::Unauthorized, constraint = receipt.depositor == depositor.key() @ ErrorCode::Unauthorized)]
    pub receipt: Account<'info, DepositReceipt>,
    #[account(mut, constraint = depositor_token_account.owner == depositor.key() @ ErrorCode::InvalidTokenOwner, constraint = depositor_token_account.mint == escrow.mint @ ErrorCode::InvalidMint)]
    pub depositor_token_account: InterfaceAccount<'info, TokenAccount>,
    #[account(mut, address = escrow.vault, constraint = vault.mint == escrow.mint @ ErrorCode::InvalidMint)]
    pub vault: InterfaceAccount<'info, TokenAccount>,
    #[account(address = escrow.mint)]
    pub mint: InterfaceAccount<'info, Mint>,
    /// CHECK: PDA authority verified by seeds and escrow state.
    #[account(seeds = [AUTHORITY_SEED, escrow.key().as_ref()], bump = escrow.authority_bump)]
    pub escrow_authority: UncheckedAccount<'info>,
    pub token_program: Interface<'info, TokenInterface>,
}

pub fn handle_refund(ctx: Context<Refund>) -> Result<()> {
    let amount = ctx.accounts.receipt.amount;
    require!(amount > 0, ErrorCode::NothingToRefund);
    let available = ctx.accounts.escrow.available().ok_or(ErrorCode::MathOverflow)?;
    require!(available >= amount, ErrorCode::InsufficientEscrowBalance);
    ctx.accounts.receipt.amount = 0;
    ctx.accounts.escrow.total_refunded = ctx.accounts.escrow.total_refunded.checked_add(amount).ok_or(ErrorCode::MathOverflow)?;
    let escrow_key = ctx.accounts.escrow.key();
    let signer_seeds: &[&[u8]] = &[AUTHORITY_SEED, escrow_key.as_ref(), &[ctx.accounts.escrow.authority_bump]];
    let cpi_accounts = TransferChecked {
        from: ctx.accounts.vault.to_account_info(),
        mint: ctx.accounts.mint.to_account_info(),
        to: ctx.accounts.depositor_token_account.to_account_info(),
        authority: ctx.accounts.escrow_authority.to_account_info(),
    };
    let signer_seed_groups = [signer_seeds];
    let cpi_ctx = CpiContext::new_with_signer(ctx.accounts.token_program.key(), cpi_accounts, &signer_seed_groups);
    token_interface::transfer_checked(cpi_ctx, amount, ctx.accounts.mint.decimals).map_err(Into::into)
}
