'use client'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react'
import '../styles/globals.css'

interface WalletConnectionProps {
  onAuthenticated?: (state: boolean) => void
}

export function WalletConnection({ onAuthenticated }: WalletConnectionProps) {
  const { connected, publicKey, signMessage, disconnect } = useWallet()
  const [mounted, setMounted] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [authenticating, setAuthenticating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // On mount or wallet change, check sessionStorage for authentication
  useEffect(() => {
    if (connected && publicKey) {
      const key = `wallet-authenticated-${publicKey.toBase58()}`
      const isAuthed = sessionStorage.getItem(key) === 'true'
      setAuthenticated(isAuthed)
      if (onAuthenticated) onAuthenticated(isAuthed)
      // Only prompt for signature if not already authenticated
      if (!isAuthed && !authenticating) {
        authenticateWallet()
      }
    }
    // On disconnect, clear authentication state and sessionStorage
    if (!connected && authenticated && publicKey) {
      setAuthenticated(false)
      sessionStorage.removeItem(`wallet-authenticated-${publicKey.toBase58()}`)
      if (onAuthenticated) onAuthenticated(false)
    }
    // eslint-disable-next-line
  }, [connected, publicKey])

  // Authenticate by requiring the user to sign a message
  const authenticateWallet = async () => {
    if (!connected || !publicKey || !signMessage || authenticated) return

    try {
      setAuthenticating(true)
      setError(null)

      const message = `Authenticate this wallet for use with Pixel Game: ${new Date().toISOString()}`
      const encodedMessage = new TextEncoder().encode(message)
      const signature = await signMessage(encodedMessage)

      if (signature) {
        setAuthenticated(true)
        sessionStorage.setItem(`wallet-authenticated-${publicKey.toBase58()}`, 'true')
        if (onAuthenticated) onAuthenticated(true)
        window.dispatchEvent(
          new CustomEvent('wallet-authenticated', { detail: { authenticated: true } })
        )
        console.log('Wallet authenticated successfully')
      } else {
        setError('Wallet connect failed: No signature provided.')
        disconnect()
        if (onAuthenticated) onAuthenticated(false)
      }
    } catch (error: any) {
      setError('Wallet connect failed: ' + (error?.message || 'Unknown error'))
      disconnect()
      if (onAuthenticated) onAuthenticated(false)
    } finally {
      setAuthenticating(false)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCloseError = () => setError(null)

  if (!mounted) {
    return (
      <div className="bg-pink-500 px-4 py-2 font-bold border-b-4 border-pink-700 pixelated text-white">
        LOADING...
      </div>
    )
  }

  return (
    <div className="flex items-center relative">
      <WalletMultiButton className="pixelated font-bold">
        {authenticating
          ? 'Wallet Connecting'
          : !connected
            ? 'Connect Wallet'
            : undefined}
      </WalletMultiButton>
      {error && (
        <div className="absolute left-0 top-12 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          <span>{error}</span>
          <button
            className="ml-4 font-bold"
            onClick={handleCloseError}
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
} 