'use client'
import { useAnchorWallet, useConnection } from '@solana/wallet-adapter-react';
import { AnchorProvider, Program } from '@project-serum/anchor';
import { Idl } from '@project-serum/anchor';

import tradingGameIdl from '../../trading-game/target/idl/trading_game.json' assert { type: "json" };

import { PublicKey } from '@solana/web3.js';
import { createContext, useContext } from 'react';

const idl: Idl = tradingGameIdl as any;
const programID = new PublicKey(idl.metadata.address);
const ProgramContext = createContext<Program<any> | null>(null);

export const TradingProgramProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  
  if (!wallet) {
    throw new Error('Wallet not connected');
  }

  const provider = new AnchorProvider(connection, wallet, {});
  const program = new Program(idl, programID, provider);

  return (
    <ProgramContext.Provider value={program}>
      {children}
    </ProgramContext.Provider>
  );
};

export const useTradingProgram = () => useContext(ProgramContext);
