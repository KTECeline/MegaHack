"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Trophy, Wallet, Check, Shield, Zap, LockIcon, PlayCircle } from "lucide-react"
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js"

// Add proper TypeScript declarations for Solana wallets
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean
      connect: (opts?: any) => Promise<{ publicKey: { toString: () => string } }>
      disconnect: () => Promise<void>
      on: (event: string, callback: (args: any) => void) => void
      request: (args: { method: string; params?: any }) => Promise<any>
      publicKey: { toString: () => string } | null
      isConnected: boolean
    }
  }
}

// Add wallet types
interface WalletInfo {
  address: string
  balance: string
  isConnected: boolean
}

export default function StakingPage() {
  const router = useRouter()
  const [characterData, setCharacterData] = useState<any>(null)
  const [wallet, setWallet] = useState<WalletInfo>({
    address: '',
    balance: '0',
    isConnected: false
  })
  const [staked, setStaked] = useState(false)
  const [staking, setStaking] = useState(false)
  const [starting, setStarting] = useState(false)
  const [connection, setConnection] = useState<Connection | null>(null)

  // Initialize Solana connection
  useEffect(() => {
    // Use devnet for testing or mainnet-beta for production
    const conn = new Connection(clusterApiUrl('devnet'), 'confirmed')
    setConnection(conn)
  }, [])

  // Check for existing wallet connection on mount
  useEffect(() => {
    if (connection) {
      checkWalletConnection()
      const storedData = localStorage.getItem("selectedCharacterData")
      if (storedData) {
        setCharacterData(JSON.parse(storedData))
      }

      // Set up periodic wallet connection checks
      const checkInterval = setInterval(checkWalletConnection, 2000)
      
      return () => clearInterval(checkInterval)
    }
  }, [connection])

  // Function to check if wallet is already connected
  const checkWalletConnection = async () => {
    if (typeof window !== 'undefined' && window.solana && connection) {
      try {
        if (window.solana.isConnected && window.solana.publicKey) {
          const address = window.solana.publicKey.toString()
          const balance = await getWalletBalance(address)
          setWallet({
            address,
            balance,
            isConnected: true
          })
        } else {
          // No wallet connected
          setWallet({
            address: '',
            balance: '0',
            isConnected: false
          })
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error)
        setWallet({
          address: '',
          balance: '0',
          isConnected: false
        })
      }
    } else {
      // No Solana wallet provider found
      setWallet({
        address: '',
        balance: '0',
        isConnected: false
      })
    }
  }

  // Function to get wallet balance (for SOL token)
  const getWalletBalance = async (address: string): Promise<string> => {
    try {
      if (!connection) return "0"
      
      // Create a PublicKey from the address string
      const publicKey = new PublicKey(address)
      
      // Get the account balance in lamports
      const lamports = await connection.getBalance(publicKey)
      
      // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
      const solBalance = lamports / LAMPORTS_PER_SOL
      
      // Format to 2 decimal places
      return solBalance.toFixed(2)
    } catch (error) {
      console.error('Error getting balance:', error)
      return "0"
    }
  }

  // Function to connect Solana wallet
  const connectWallet = async () => {
    if (typeof window !== 'undefined' && window.solana && connection) {
      try {
        const response = await window.solana.connect()
        if (response.publicKey) {
          const address = response.publicKey.toString()
          const balance = await getWalletBalance(address)
          
          setWallet({
            address,
            balance,
            isConnected: true
          })

          // Listen for disconnect events
          window.solana.on('disconnect', handleDisconnect)
          window.solana.on('accountChanged', handleAccountChanged)
        }
      } catch (error) {
        console.error('Error connecting wallet:', error)
        alert('Failed to connect wallet. Please try again.')
      }
    } else {
      alert('No Solana wallet detected. Please install Phantom, Solflare, or another Solana wallet.')
    }
  }

  // Handle account changes
  const handleAccountChanged = async (publicKey: any) => {
    if (publicKey && connection) {
      const address = publicKey.toString()
      const balance = await getWalletBalance(address)
      setWallet({
        address,
        balance,
        isConnected: true
      })
    } else {
      setWallet({ address: '', balance: '0', isConnected: false })
      setStaked(false)
    }
  }

  // Handle wallet disconnect
  const handleDisconnect = () => {
    setWallet({ address: '', balance: '0', isConnected: false })
    setStaked(false) // Reset staking status when wallet disconnects
  }

  // Cleanup event listeners on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.solana) {
        window.solana.on('disconnect', () => {}) // Remove listener
        window.solana.on('accountChanged', () => {}) // Remove listener
      }
    }
  }, [])

  // Function to simulate staking
  const stakeTokens = () => {
    setStaking(true)
    // Simulate staking delay
    setTimeout(() => {
      setStaking(false)
      setStaked(true)
    }, 2000)
  }

  // Function to start tournament
  const startTournament = () => {
    setStarting(true)
    // Simulate loading delay
    setTimeout(() => {
      // In a real app, this would navigate to the tournament page
      router.push("/tournament/active")
    }, 2000)
  }

  if (!characterData) {
    return (
      <div className="min-h-screen bg-sky-300 font-pixel flex items-center justify-center">
        <div className="bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6 max-w-md">
          <p className="text-white text-center">Loading character data...</p>
          <Link
            href="/tournament/character-select"
            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 font-bold border-b-4 border-pink-700 hover:border-pink-800 transition-colors pixelated block text-center"
          >
            Return to Character Selection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-sky-300 font-pixel relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern z-[-1] opacity-30"></div>

      {/* Fixed Animated Pixel Blocks - will stay visible when scrolling */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Large slow-moving blocks */}
        <div className="absolute w-24 h-24 bg-sky-400 opacity-40 pixelated animate-float-slow left-[10%] top-[20%] border-2 border-sky-500"></div>
        <div className="absolute w-20 h-20 bg-pink-400 opacity-35 pixelated animate-float-slow-reverse right-[15%] top-[30%] border-2 border-pink-500"></div>
        <div className="absolute w-28 h-16 bg-yellow-400 opacity-30 pixelated animate-float-medium left-[20%] bottom-[25%] border-2 border-yellow-500"></div>

        {/* Medium blocks */}
        <div className="absolute w-16 h-16 bg-green-400 opacity-35 pixelated animate-float-medium-reverse right-[25%] bottom-[20%] border-2 border-green-500"></div>
        <div className="absolute w-20 h-12 bg-purple-400 opacity-40 pixelated animate-float-medium left-[30%] top-[40%] border-2 border-purple-500"></div>
        <div className="absolute w-14 h-14 bg-blue-400 opacity-35 pixelated animate-float-medium-reverse right-[35%] top-[60%] border-2 border-blue-500"></div>

        {/* Small faster blocks */}
        <div className="absolute w-10 h-10 bg-sky-300 opacity-45 pixelated animate-float-fast right-[40%] top-[15%] border-2 border-sky-400"></div>
        <div className="absolute w-8 h-12 bg-pink-300 opacity-40 pixelated animate-float-fast-reverse left-[35%] bottom-[30%] border-2 border-pink-400"></div>
        <div className="absolute w-12 h-8 bg-yellow-300 opacity-35 pixelated animate-float-fast right-[30%] bottom-[40%] border-2 border-yellow-400"></div>
        <div className="absolute w-9 h-9 bg-teal-300 opacity-40 pixelated animate-float-fast left-[15%] top-[60%] border-2 border-teal-400"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 border-b-4 border-sky-500 bg-sky-400 px-4 py-3 flex items-center">
        <Link
          href="/tournament/character-select"
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 font-bold border-b-4 border-pink-700 hover:border-pink-800 transition-colors pixelated"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>BACK</span>
        </Link>

        <div className="flex items-center gap-4 mx-auto">
          <Trophy className="h-6 w-6 text-yellow-300" />
          <h1 className="text-xl text-white font-bold drop-shadow-[2px_2px_0px_#0ea5e9]">
            TOURNAMENT: MOMENTUM MASTERS
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <h2 className="text-4xl md:text-5xl text-center text-white font-bold mb-12 drop-shadow-[3px_3px_0px_#0284c7]">
          STAKE TO ENTER
        </h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Selected Agent Card */}
          <div className="bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6">
            <h3 className="text-2xl text-white font-bold mb-4 text-center drop-shadow-[2px_2px_0px_#0ea5e9]">
              YOUR AGENT
            </h3>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-24 h-24 flex-shrink-0 border-4 border-white/30 bg-black/20 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={characterData.character.image || "/placeholder.svg"}
                  alt={characterData.character.name}
                  className="w-4/5 h-4/5 object-contain pixelated"
                />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-1">{characterData.character.name}</h4>
                <p className="text-sm text-white/80 mb-2">{characterData.character.description}</p>
                <div className="bg-black/20 p-2 rounded-lg">
                  <p className="text-xs text-white font-bold mb-1">Your Input Prompt:</p>
                  <p className="text-xs text-white">{characterData.prompt}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                <p className="text-white text-sm">
                  <span className="font-bold">Risk Management:</span>{" "}
                  {characterData.character.tradingCapabilities.riskManagement}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-300 flex-shrink-0" />
                <p className="text-white text-sm">
                  <span className="font-bold">Execution:</span> {characterData.character.tradingCapabilities.execution}
                </p>
              </div>
            </div>
          </div>

          {/* Staking Card */}
          <div className="bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6">
            <h3 className="text-2xl text-white font-bold mb-4 text-center drop-shadow-[2px_2px_0px_#0ea5e9]">
              TOURNAMENT ENTRY
            </h3>

            <div className="bg-yellow-400/20 backdrop-blur-sm p-4 rounded-lg border-2 border-yellow-500/30 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <LockIcon className="h-6 w-6 text-yellow-300" />
                <p className="text-white font-bold">Entry Fee: 5 SOL</p>
              </div>
              <p className="text-white text-sm">
                Stake SOL tokens to enter the tournament. Your stake will be locked for the duration of the
                tournament.
              </p>
            </div>

            {/* Wallet Connection */}
            {!wallet.isConnected ? (
              <button
                onClick={connectWallet}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-3 font-bold border-b-4 border-yellow-600 hover:border-yellow-700 transition-colors pixelated flex items-center justify-center gap-2"
              >
                <Wallet className="h-5 w-5" />
                CONNECT WALLET
              </button>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-400/20 backdrop-blur-sm p-3 rounded-lg border-2 border-green-500/30">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-green-400" />
                    <p className="text-white text-sm font-bold">Wallet Connected</p>
                  </div>
                  <p className="text-white text-xs mt-1">
                    Address: {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}
                  </p>
                  <p className="text-white text-xs">Balance: {wallet.balance} SOL</p>
                </div>

                {/* Staking Button */}
                {!staked ? (
                  <button
                    onClick={stakeTokens}
                    disabled={staking}
                    className={`w-full bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 font-bold border-b-4 border-pink-700 hover:border-pink-800 transition-colors pixelated flex items-center justify-center gap-2 ${
                      staking ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {staking ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                        STAKING...
                      </>
                    ) : (
                      <>
                        <Shield className="h-5 w-5" />
                        STAKE 0.05 SOL
                      </>
                    )}
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-green-400/20 backdrop-blur-sm p-3 rounded-lg border-2 border-green-500/30">
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-400" />
                        <p className="text-white text-sm font-bold">0.05 SOL Staked Successfully</p>
                      </div>
                      <p className="text-white text-xs mt-1">Your agent is ready to enter the tournament!</p>
                    </div>

                    {/* Start Tournament Button */}
                    <button
                      onClick={startTournament}
                      disabled={starting}
                      className={`w-full bg-green-400 hover:bg-green-500 text-white px-4 py-3 font-bold border-b-4 border-green-600 hover:border-green-700 transition-colors pixelated flex items-center justify-center gap-2 ${
                        starting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {starting ? (
                        <>
                          <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                          STARTING...
                        </>
                      ) : (
                        <>
                          <PlayCircle className="h-5 w-5" />
                          START TOURNAMENT
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tournament Info */}
        <div className="mt-16 max-w-2xl mx-auto bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6">
          <h3 className="text-2xl text-white font-bold mb-4 text-center drop-shadow-[2px_2px_0px_#0ea5e9]">
            TOURNAMENT DETAILS
          </h3>

          <div className="space-y-4 text-white">
            <div className="flex items-center gap-3 bg-sky-500/50 p-3 rounded-lg">
              <Trophy className="h-6 w-6 text-yellow-300 flex-shrink-0" />
              <div>
                <p className="font-bold">Prize Pool: 50,000 SOL</p>
                <p className="text-sm">Top 3 agents share the rewards</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-sky-500/50 p-3 rounded-lg">
              <Zap className="h-6 w-6 text-yellow-300 flex-shrink-0" />
              <div>
                <p className="font-bold">Duration: 7 Days</p>
                <p className="text-sm">Starts: May 10, 2025 - Ends: May 17, 2025</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-sky-500/50 p-3 rounded-lg">
              <Shield className="h-6 w-6 text-yellow-300 flex-shrink-0" />
              <div>
                <p className="font-bold">Entry Fee: 0.05 SOL</p>
                <p className="text-sm">Stake to join the competition</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 relative">
                <div className="absolute w-full h-full bg-yellow-400 transform rotate-3d(1, 1, 1, 45deg) pixelated"></div>
                <div className="absolute w-full h-full bg-yellow-500 transform translate-x-1 translate-y-1 rotate-3d(1, 1, 1, 45deg) pixelated -z-10"></div>
              </div>
              <h2 className="text-xl font-bold tracking-wide">AGENT ROYALE</h2>
            </div>

            <p className="text-gray-400 text-sm text-center">© 2025 AGENT ROYALE. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
