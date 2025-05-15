'use client'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import { useMemo } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import with no SSR to avoid hydration errors
const DynamicWalletConnection = dynamic(
  () => import('../components/wallet-connection').then(mod => ({ default: mod.WalletConnection })),
  { ssr: false }
)

require('@solana/wallet-adapter-react-ui/styles.css')

export function SolanaProvider({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Devnet
  const endpoint = clusterApiUrl(network)
  
  // Configure Phantom adapter with strict authentication requirements
  const wallets = useMemo(() => [
    new PhantomWalletAdapter({ 
      network, 
      autoConnect: false
    })
  ], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
