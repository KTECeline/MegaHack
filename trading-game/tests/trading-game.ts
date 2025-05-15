import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";

describe("trading-game", () => {
  // Set the Anchor provider to the local cluster environment
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.trading_game as Program;

  it("Initializes the player account", async () => {
    const [playerPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("player"), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    console.log("Player PDA:", playerPDA.toBase58());

    await program.methods
      .initializePlayer()
      .accounts({
        playerAccount: playerPDA,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const account: any = await program.account.playerAccount.fetch(playerPDA);
    console.log("Account after init:", account);

    assert.ok(account.balance.toNumber() === 10000);
    assert.deepEqual(account.portfolio.map((n: any) => n.toNumber()), [0, 0, 0, 0, 0]);
  });

  it("Executes a buy trade", async () => {
    const [playerPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("player"), provider.wallet.publicKey.toBuffer()],
      program.programId
    );

    await program.methods
      .executeTrade(0, 100, true)
      .accounts({
        playerAccount: playerPDA,
      })
      .rpc();

    const account: any = await program.account.playerAccount.fetch(playerPDA);
    console.log("Account after trade:", account);

    assert.isBelow(account.balance.toNumber(), 10000);
    assert.isAbove(account.portfolio[0].toNumber(), 0);
  });
});
