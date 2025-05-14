'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react'
import '../styles/globals.css'

export function WalletConnection() {
  const { connected, publicKey } = useWallet()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="bg-pink-500 px-4 py-2 font-bold border-b-4 border-pink-700 pixelated text-white">
        LOADING...
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <WalletMultiButton className="pixelated font-bold">
        {!connected ? 'Connect Wallet' : undefined}
      </WalletMultiButton>
      {/* Optional: Show connection status for debugging */}
      {process.env.NODE_ENV === 'development' && connected && publicKey && (
        <span className="ml-2 text-xs text-green-600">
        </span>
      )}
    </div>
  )
} 