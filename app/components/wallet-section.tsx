'use client'
import { WalletConnection } from './wallet-connection'
import { useWallet } from '@solana/wallet-adapter-react'

export function WalletSection() {
  const { connected } = useWallet()

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Connect Your Wallet</h2>
      <WalletConnection />
      {connected && (
        <div className="mt-6 text-center">
          <p className="text-green-600">✅ Wallet Connected Successfully!</p>
          <p className="text-sm text-gray-600 mt-2">
            You can now interact with the game using your Solana wallet
          </p>
        </div>
      )}
    </div>
  )
} 