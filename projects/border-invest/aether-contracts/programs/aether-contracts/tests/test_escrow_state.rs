use anchor_lang::prelude::Pubkey;
use aether_contracts::state::Escrow;

fn escrow(deposited: u64, released: u64, refunded: u64) -> Escrow {
    Escrow {
        version: 1,
        admin: Pubkey::new_unique(),
        emergency_admin: Pubkey::new_unique(),
        recipient: Pubkey::new_unique(),
        mint: Pubkey::new_unique(),
        vault: Pubkey::new_unique(),
        project_id: [7; 32],
        total_deposited: deposited,
        total_released: released,
        total_refunded: refunded,
        milestone_count: 2,
        milestones_created: 2,
        paused: false,
        authority_bump: 255,
    }
}

#[test]
fn available_balance_excludes_releases_and_refunds() {
    assert_eq!(escrow(1_000, 250, 100).available(), Some(650));
}

#[test]
fn available_balance_returns_none_on_invalid_accounting() {
    assert_eq!(escrow(100, 101, 0).available(), None);
    assert_eq!(escrow(100, 0, 101).available(), None);
}
