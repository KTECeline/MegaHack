'use client'
import { WalletConnection } from './wallet-connection'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState, useEffect } from 'react'

export function WalletSection() {
  const { connected } = useWallet()
  const [authenticated, setAuthenticated] = useState(false)

  // Check if the wallet is authenticated via the window object
  useEffect(() => {
    const checkAuthentication = () => {
      // Listen for authentication events from the WalletConnection component
      const handleAuthenticated = (event: CustomEvent) => {
        setAuthenticated(event.detail.authenticated)
      }
      
      window.addEventListener('wallet-authenticated', handleAuthenticated as EventListener)
      
      return () => {
        window.removeEventListener('wallet-authenticated', handleAuthenticated as EventListener)
      }
    }
    
    return checkAuthentication()
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Connect Your Wallet</h2>
      <WalletConnection onAuthenticated={(state) => setAuthenticated(state)} />
      
      {connected && !authenticated && (
        <div className="mt-6 text-center">
          <p className="text-orange-500">⚠️ Please authenticate your wallet</p>
          <p className="text-sm text-gray-600 mt-2">
            You need to sign a message to verify wallet ownership
          </p>
        </div>
      )}
      
      {connected && authenticated && (
        <div className="mt-6 text-center">
          <p className="text-green-600">✅ Wallet Connected and Authenticated!</p>
          <p className="text-sm text-gray-600 mt-2">
            You can now interact with the game using your Solana wallet
          </p>
        </div>
      )}
    </div>
  )
} 