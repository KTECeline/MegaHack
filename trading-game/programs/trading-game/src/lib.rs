use anchor_lang::prelude::*;

declare_id!("5ovwUPvT2ksgd7suJBRtnYyZktN5yBcaY6mGPxhd9k3T");

#[program]
pub mod trading_game {
    use super::*;

    pub fn initialize_player(ctx: Context<InitializePlayer>) -> Result<()> {
        ctx.accounts.player_account.player = ctx.accounts.user.key();
        ctx.accounts.player_account.balance = 10000;
        ctx.accounts.player_account.portfolio = vec![0; 5];
        ctx.accounts.player_account.staked_amount = 0;
        Ok(())
    }

    pub fn execute_trade(
        ctx: Context<ExecuteTrade>,
        asset_index: u8,
        amount: u64,
        is_buy: bool
    ) -> Result<()> {
        require!(asset_index < 5, ErrorCode::InvalidAsset);
        
        let player = &mut ctx.accounts.player_account;
        if is_buy {
            require!(player.balance >= amount, ErrorCode::InsufficientFunds);
            player.balance -= amount;
            player.portfolio[asset_index as usize] += amount;
        } else {
            require!(
                player.portfolio[asset_index as usize] >= amount,
                ErrorCode::InsufficientAssets
            );
            player.balance += amount;
            player.portfolio[asset_index as usize] -= amount;
        }

        Ok(())
    }

    pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
        let player = &mut ctx.accounts.player_account;
        require!(player.balance >= amount, ErrorCode::InsufficientFunds);

        player.balance -= amount;
        player.staked_amount += amount;

        Ok(())
    }
}

#[error_code]
pub enum ErrorCode {
    #[msg("Invalid asset index")]
    InvalidAsset,
    #[msg("Insufficient funds")]
    InsufficientFunds,
    #[msg("Insufficient assets")]
    InsufficientAssets,
}

#[derive(Accounts)]
pub struct InitializePlayer<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 8 + 40 + 8, // account discriminator + pubkey + balance + portfolio vec (5 * 8) + staked_amount
        seeds = [b"player", user.key().as_ref()],
        bump
    )]
    pub player_account: Account<'info, PlayerAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ExecuteTrade<'info> {
    #[account(mut, has_one = player)]
    pub player_account: Account<'info, PlayerAccount>,
    #[account(mut)]
    pub player: Signer<'info>,
}

#[derive(Accounts)]
pub struct Stake<'info> {
    #[account(mut, has_one = player)]
    pub player_account: Account<'info, PlayerAccount>,
    #[account(mut)]
    pub player: Signer<'info>,
}

#[account]
pub struct PlayerAccount {
    pub player: Pubkey,
    pub balance: u64,
    pub portfolio: Vec<u64>,
    pub staked_amount: u64,
}
