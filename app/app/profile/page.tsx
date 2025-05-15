"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Trophy,
  Wallet,
  Star,
  Lock,
  Share2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Zap,
  Users,
  Gift,
  Calendar,
  X,
} from "lucide-react"

// Mock data for the profile
const mockUserData = {
  username: "CryptoTrader42",
  trainerLevel: 7,
  trainerScore: 3250,
  wallet: "0x1a2b...3c4d",
  referralCode: "PIXEL-TR42",
  referrals: 3,
}

// Mock data for staked entries
const mockStakedEntries = [
  {
    id: 1,
    tournament: "Momentum Masters",
    agent: "Quantum Knight",
    stake: 500,
    status: "active",
    startDate: "May 10, 2025",
    endDate: "May 17, 2025",
    currentRank: 12,
    totalParticipants: 156,
  },
  {
    id: 2,
    tournament: "Yield Hunters",
    agent: "Cyber Mage",
    stake: 1000,
    status: "completed",
    startDate: "Apr 15, 2025",
    endDate: "Apr 22, 2025",
    finalRank: 3,
    totalParticipants: 128,
    reward: 12500,
  },
]

// Mock data for owned agents
const mockOwnedAgents = [
  {
    id: 1,
    name: "QUANTUM KNIGHT",
    image: "/images/quantum-knight.png",
    color: "from-sky-500 to-sky-700",
    borderColor: "border-sky-600",
    bgColor: "bg-sky-500",
    level: 5,
    tournaments: 8,
    wins: 2,
  },
  {
    id: 2,
    name: "CYBER MAGE",
    image: "/images/cyber-mage.png",
    color: "from-pink-500 to-pink-700",
    borderColor: "border-pink-600",
    bgColor: "bg-pink-500",
    level: 3,
    tournaments: 5,
    wins: 1,
  },
  {
    id: 3,
    name: "DATA NINJA",
    image: "/images/data-ninja.png",
    color: "from-green-500 to-green-700",
    borderColor: "border-green-600",
    bgColor: "bg-green-500",
    level: 2,
    tournaments: 3,
    wins: 0,
  },
  {
    id: 4,
    name: "PIXEL TRADER",
    image: "/images/pixel-trader.png",
    color: "from-yellow-500 to-yellow-700",
    borderColor: "border-yellow-600",
    bgColor: "bg-yellow-500",
    level: 1,
    tournaments: 1,
    wins: 0,
  },
]

// Mock data for locked agents
const mockLockedAgents = [
  {
    id: 5,
    name: "NEURAL SAGE",
    image: "/neural-sage-pixel-art.png",
    color: "from-purple-500 to-purple-700",
    borderColor: "border-purple-600",
    bgColor: "bg-purple-500",
    unlockType: "level",
    requirement: 10,
    description: "Master of neural networks and deep learning strategies.",
  },
  {
    id: 6,
    name: "CRYPTO ORACLE",
    image: "/crypto-oracle-pixel-art.png",
    color: "from-teal-500 to-teal-700",
    borderColor: "border-teal-600",
    bgColor: "bg-teal-500",
    unlockType: "level",
    requirement: 15,
    description: "Predicts market movements with uncanny accuracy.",
  },
  {
    id: 7,
    name: "QUANTUM FLUX",
    image: "/quantum-flux-pixel-art.png",
    color: "from-blue-500 to-blue-700",
    borderColor: "border-blue-600",
    bgColor: "bg-blue-500",
    unlockType: "purchase",
    price: 2500,
    description: "Harnesses quantum computing for superior trading strategies.",
  },
  {
    id: 8,
    name: "ALPHA HUNTER",
    image: "/alpha-hunter-pixel-art.png",
    color: "from-red-500 to-red-700",
    borderColor: "border-red-600",
    bgColor: "bg-red-500",
    unlockType: "purchase",
    price: 3000,
    description: "Specialized in finding hidden alpha in any market condition.",
  },
]

// Mock data for claimable rewards
const mockClaimableRewards = [
  {
    id: 1,
    type: "tournament",
    name: "Yield Hunters",
    amount: 12500,
    currency: "SOL",
    date: "Apr 22, 2025",
    claimed: false,
  },
  {
    id: 2,
    type: "referral",
    name: "Referral Bonus",
    amount: 500,
    currency: "SOL",
    date: "May 5, 2025",
    claimed: false,
  },
  {
    id: 3,
    type: "daily",
    name: "Daily Login",
    amount: 100,
    currency: "Trainer Score",
    date: "May 11, 2025",
    claimed: true,
  },
]

export default function ProfilePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedEntry, setExpandedEntry] = useState<number | null>(null)
  const [copiedReferral, setCopiedReferral] = useState(false)
  const [showReferralModal, setShowReferralModal] = useState(false)

  // Function to copy referral code
  const copyReferralCode = () => {
    navigator.clipboard.writeText(mockUserData.referralCode)
    setCopiedReferral(true)
    setTimeout(() => setCopiedReferral(false), 2000)
  }

  // Function to toggle entry expansion
  const toggleEntryExpansion = (id: number) => {
    if (expandedEntry === id) {
      setExpandedEntry(null)
    } else {
      setExpandedEntry(id)
    }
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
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 font-bold border-b-4 border-pink-700 hover:border-pink-800 transition-colors pixelated"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>BACK</span>
        </button>

        <div className="flex items-center gap-4 mx-auto">
          <Star className="h-6 w-6 text-yellow-300" />
          <h1 className="text-xl text-white font-bold drop-shadow-[2px_2px_0px_#0ea5e9]">TRAINER PROFILE</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Profile Header */}
        <div className="bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar/Level Display */}
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-yellow-400 rounded-lg border-4 border-yellow-500 flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-bold text-white drop-shadow-[2px_2px_0px_#ca8a04]">
                  {mockUserData.trainerLevel}
                </span>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-pink-500 rounded-full px-2 py-1 border-2 border-pink-600">
                <Star className="h-5 w-5 text-yellow-300" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{mockUserData.username}</h2>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex items-center gap-2 bg-sky-500/50 px-3 py-1 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-300" />
                  <span className="text-white">Trainer Level: {mockUserData.trainerLevel}</span>
                </div>
                <div className="flex items-center gap-2 bg-sky-500/50 px-3 py-1 rounded-lg">
                  <Trophy className="h-5 w-5 text-yellow-300" />
                  <span className="text-white">Trainer Score: {mockUserData.trainerScore}</span>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex items-center gap-2 bg-sky-500/50 px-3 py-1 rounded-lg">
                  <Wallet className="h-5 w-5 text-yellow-300" />
                  <span className="text-white">Wallet: {mockUserData.wallet}</span>
                </div>
                <div className="flex items-center gap-2 bg-sky-500/50 px-3 py-1 rounded-lg">
                  <Users className="h-5 w-5 text-yellow-300" />
                  <span className="text-white">Referrals: {mockUserData.referrals}</span>
                </div>
              </div>
            </div>

            {/* Referral Button */}
            <button
              onClick={() => setShowReferralModal(true)}
              className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 font-bold border-b-4 border-green-600 hover:border-green-700 transition-colors pixelated flex items-center gap-2"
            >
              <Share2 className="h-5 w-5" />
              <span>REFER FRIENDS</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: "overview", label: "OVERVIEW" },
            { id: "agents", label: "MY AGENTS" },
            { id: "rewards", label: "REWARDS" },
            { id: "tournaments", label: "TOURNAMENTS" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-bold border-b-4 transition-colors pixelated ${
                activeTab === tab.id
                  ? "bg-pink-500 text-white border-pink-700"
                  : "bg-sky-400 text-white border-sky-600 hover:bg-sky-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Active Tournaments */}
            <div className="bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-[2px_2px_0px_#0ea5e9]">
                ACTIVE TOURNAMENTS
              </h3>

              {mockStakedEntries.filter((entry) => entry.status === "active").length > 0 ? (
                <div className="space-y-4">
                  {mockStakedEntries
                    .filter((entry) => entry.status === "active")
                    .map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-sky-500/50 rounded-lg p-4 cursor-pointer"
                        onClick={() => toggleEntryExpansion(entry.id)}
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div>
                            <h4 className="text-xl font-bold text-white">{entry.tournament}</h4>
                            <p className="text-white text-sm">Agent: {entry.agent}</p>
                          </div>
                          <div className="flex items-center gap-4 mt-2 md:mt-0">
                            <div className="bg-yellow-400/30 px-3 py-1 rounded-lg border border-yellow-500/50">
                              <span className="text-white font-bold">Stake: {entry.stake} SOL</span>
                            </div>
                            <button>
                              {expandedEntry === entry.id ? (
                                <ChevronUp className="h-5 w-5 text-white" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-white" />
                              )}
                            </button>
                          </div>
                        </div>

                        {expandedEntry === entry.id && (
                          <div className="mt-4 pt-4 border-t border-sky-400">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-sky-600/50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                  <Trophy className="h-4 w-4 text-yellow-300" />
                                  <span className="text-white text-sm font-bold">Current Rank</span>
                                </div>
                                <p className="text-white text-lg">
                                  {entry.currentRank} / {entry.totalParticipants}
                                </p>
                              </div>
                              <div className="bg-sky-600/50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                  <Calendar className="h-4 w-4 text-yellow-300" />
                                  <span className="text-white text-sm font-bold">Start Date</span>
                                </div>
                                <p className="text-white text-lg">{entry.startDate}</p>
                              </div>
                              <div className="bg-sky-600/50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                  <Calendar className="h-4 w-4 text-yellow-300" />
                                  <span className="text-white text-sm font-bold">End Date</span>
                                </div>
                                <p className="text-white text-lg">{entry.endDate}</p>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <button
                                onClick={() => router.push("/tournament/active")}
                                className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 font-bold border-b-2 border-green-600 hover:border-green-700 transition-colors pixelated text-sm"
                              >
                                VIEW DETAILS
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="bg-sky-500/30 p-4 rounded-lg text-center">
                  <p className="text-white">You have no active tournaments.</p>
                  <button
                    onClick={() => router.push("/#tournaments")}
                    className="mt-4 inline-block bg-green-400 hover:bg-green-500 text-white px-4 py-2 font-bold border-b-4 border-green-600 hover:border-green-700 transition-colors pixelated"
                  >
                    JOIN A TOURNAMENT
                  </button>
                </div>
              )}
            </div>

            {/* Recent Rewards */}
            <div className="bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-[2px_2px_0px_#0ea5e9]">RECENT REWARDS</h3>

              {mockClaimableRewards.length > 0 ? (
                <div className="space-y-3">
                  {mockClaimableRewards.slice(0, 3).map((reward) => (
                    <div
                      key={reward.id}
                      className={`flex justify-between items-center p-3 rounded-lg ${
                        reward.claimed ? "bg-gray-500/30" : "bg-sky-500/50"
                      }`}
                    >
                      <div>
                        <h4 className="font-bold text-white">{reward.name}</h4>
                        <p className="text-white text-sm">{reward.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div
                          className={`px-3 py-1 rounded-lg ${
                            reward.claimed
                              ? "bg-gray-600/30 border border-gray-500/50"
                              : "bg-yellow-400/30 border border-yellow-500/50"
                          }`}
                        >
                          <span className="text-white font-bold">
                            {reward.amount} {reward.currency}
                          </span>
                        </div>
                        {!reward.claimed && (
                          <button className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 font-bold border-b-2 border-green-600 hover:border-green-700 transition-colors pixelated text-sm">
                            CLAIM
                          </button>
                        )}
                        {reward.claimed && (
                          <div className="bg-gray-600 text-white px-3 py-1 font-bold border-b-2 border-gray-700 pixelated text-sm">
                            CLAIMED
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-sky-500/30 p-4 rounded-lg text-center">
                  <p className="text-white">No rewards available.</p>
                </div>
              )}

              <div className="mt-4 text-center">
                <button
                  onClick={() => setActiveTab("rewards")}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 font-bold border-b-4 border-pink-700 hover:border-pink-800 transition-colors pixelated"
                >
                  VIEW ALL REWARDS
                </button>
              </div>
            </div>

            {/* Agent Showcase */}
            <div className="bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-[2px_2px_0px_#0ea5e9]">YOUR AGENTS</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {mockOwnedAgents.slice(0, 4).map((agent) => (
                  <div
                    key={agent.id}
                    className={`${agent.bgColor} pixelated border-4 ${agent.borderColor} p-4 rounded-lg flex flex-col items-center`}
                  >
                    <div className="w-16 h-16 border-2 border-white/30 bg-black/20 rounded-lg flex items-center justify-center overflow-hidden mb-2">
                      <img
                        src={agent.image || "/placeholder.svg"}
                        alt={agent.name}
                        className="w-4/5 h-4/5 object-contain pixelated"
                      />
                    </div>
                    <h4 className="text-white font-bold text-center text-sm mb-1">{agent.name}</h4>
                    <div className="bg-black/20 px-2 py-1 rounded-lg w-full text-center mb-2">
                      <span className="text-white text-xs">Level {agent.level}</span>
                    </div>
                    <div className="flex justify-between w-full text-xs text-white">
                      <span>Tournaments: {agent.tournaments}</span>
                      <span>Wins: {agent.wins}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => setActiveTab("agents")}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 font-bold border-b-4 border-pink-700 hover:border-pink-800 transition-colors pixelated"
                >
                  VIEW ALL AGENTS
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Agents Tab */}
        {activeTab === "agents" && (
          <div className="space-y-8">
            {/* Owned Agents */}
            <div className="bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-[2px_2px_0px_#0ea5e9]">OWNED AGENTS</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockOwnedAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`${agent.bgColor} pixelated border-4 ${agent.borderColor} p-4 rounded-lg flex flex-col items-center`}
                  >
                    <div className="w-24 h-24 border-4 border-white/30 bg-black/20 rounded-lg flex items-center justify-center overflow-hidden mb-3">
                      <img
                        src={agent.image || "/placeholder.svg"}
                        alt={agent.name}
                        className="w-4/5 h-4/5 object-contain pixelated"
                      />
                    </div>
                    <h4 className="text-white font-bold text-center mb-2">{agent.name}</h4>
                    <div className="bg-black/20 px-3 py-1 rounded-lg w-full text-center mb-3">
                      <span className="text-white">Level {agent.level}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 w-full">
                      <div className="bg-black/20 px-2 py-1 rounded-lg text-center">
                        <span className="text-white text-sm">Tournaments: {agent.tournaments}</span>
                      </div>
                      <div className="bg-black/20 px-2 py-1 rounded-lg text-center">
                        <span className="text-white text-sm">Wins: {agent.wins}</span>
                      </div>
                    </div>
                    <button className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-3 py-1 font-bold border-b-2 border-yellow-600 hover:border-yellow-700 transition-colors pixelated text-sm w-full">
                      UPGRADE
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Locked Agents */}
            <div className="bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-[2px_2px_0px_#0ea5e9]">LOCKED AGENTS</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mockLockedAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className={`${agent.bgColor} pixelated border-4 ${agent.borderColor} p-4 rounded-lg flex flex-col items-center relative`}
                  >
                    {/* Lock overlay */}
                    <div className="absolute inset-0 bg-black/60 rounded-lg flex flex-col items-center justify-center p-4">
                      <Lock className="h-8 w-8 text-white mb-2" />
                      {agent.unlockType === "level" ? (
                        <div className="text-center">
                          <p className="text-white font-bold mb-1">UNLOCK AT</p>
                          <div className="bg-yellow-400/30 px-3 py-1 rounded-lg border border-yellow-500/50 mb-2">
                            <span className="text-white">Trainer Level {agent.requirement}</span>
                          </div>
                          <p className="text-white text-sm">
                            {mockUserData.trainerLevel >= (agent.requirement ?? 0)
                              ? "You can unlock this agent!"
                              : `You need ${(agent.requirement ?? 0) - mockUserData.trainerLevel} more levels`}
                          </p>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-white font-bold mb-1">PREMIUM AGENT</p>
                          <div className="bg-yellow-400/30 px-3 py-1 rounded-lg border border-yellow-500/50 mb-2">
                            <span className="text-white">{agent.price} SOL</span>
                          </div>
                          <button className="mt-2 bg-green-400 hover:bg-green-500 text-white px-3 py-1 font-bold border-b-2 border-green-600 hover:border-green-700 transition-colors pixelated text-sm">
                            PURCHASE
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="w-24 h-24 border-4 border-white/30 bg-black/20 rounded-lg flex items-center justify-center overflow-hidden mb-3">
                      <img
                        src={agent.image || "/placeholder.svg"}
                        alt={agent.name}
                        className="w-4/5 h-4/5 object-contain pixelated"
                      />
                    </div>
                    <h4 className="text-white font-bold text-center mb-2">{agent.name}</h4>
                    <div className="bg-black/20 px-3 py-2 rounded-lg w-full text-center mb-3">
                      <span className="text-white text-sm">{agent.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === "rewards" && (
          <div className="space-y-8">
            {/* Claimable Rewards */}
            <div className="bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-[2px_2px_0px_#0ea5e9]">
                CLAIMABLE REWARDS
              </h3>

              {mockClaimableRewards.filter((reward) => !reward.claimed).length > 0 ? (
                <div className="space-y-3">
                  {mockClaimableRewards
                    .filter((reward) => !reward.claimed)
                    .map((reward) => (
                      <div key={reward.id} className="bg-sky-500/50 p-4 rounded-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div>
                            <h4 className="font-bold text-white text-lg">{reward.name}</h4>
                            <p className="text-white text-sm">{reward.date}</p>
                          </div>
                          <div className="flex items-center gap-3 mt-2 md:mt-0">
                            <div className="bg-yellow-400/30 px-3 py-1 rounded-lg border border-yellow-500/50">
                              <span className="text-white font-bold">
                                {reward.amount} {reward.currency}
                              </span>
                            </div>
                            <button className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 font-bold border-b-2 border-green-600 hover:border-green-700 transition-colors pixelated text-sm">
                              CLAIM
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="bg-sky-500/30 p-4 rounded-lg text-center">
                  <p className="text-white">No claimable rewards available.</p>
                </div>
              )}
            </div>

            {/* Claimed Rewards History */}
            <div className="bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-[2px_2px_0px_#0ea5e9]">REWARD HISTORY</h3>

              {mockClaimableRewards.filter((reward) => reward.claimed).length > 0 ? (
                <div className="space-y-3">
                  {mockClaimableRewards
                    .filter((reward) => reward.claimed)
                    .map((reward) => (
                      <div key={reward.id} className="bg-gray-500/30 p-4 rounded-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div>
                            <h4 className="font-bold text-white text-lg">{reward.name}</h4>
                            <p className="text-white text-sm">{reward.date}</p>
                          </div>
                          <div className="flex items-center gap-3 mt-2 md:mt-0">
                            <div className="bg-gray-600/30 px-3 py-1 rounded-lg border border-gray-500/50">
                              <span className="text-white font-bold">
                                {reward.amount} {reward.currency}
                              </span>
                            </div>
                            <div className="bg-gray-600 text-white px-3 py-1 font-bold border-b-2 border-gray-700 pixelated text-sm">
                              CLAIMED
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="bg-sky-500/30 p-4 rounded-lg text-center">
                  <p className="text-white">No reward history available.</p>
                </div>
              )}
            </div>

            {/* Trainer Score */}
            <div className="bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-[2px_2px_0px_#0ea5e9]">TRAINER SCORE</h3>

              <div className="bg-sky-500/50 p-4 rounded-lg">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-white text-lg">Current Score</h4>
                    <p className="text-white text-sm">
                      Earn Trainer Score by participating in tournaments and completing daily tasks
                    </p>
                  </div>
                  <div className="bg-yellow-400/30 px-4 py-2 rounded-lg border border-yellow-500/50">
                    <span className="text-white font-bold text-2xl">{mockUserData.trainerScore}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-sky-400">
                  <h4 className="font-bold text-white mb-2">Next Level Rewards</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-sky-600/50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="h-4 w-4 text-yellow-300" />
                        <span className="text-white text-sm font-bold">Level {mockUserData.trainerLevel + 1}</span>
                      </div>
                      <p className="text-white text-sm">Unlock new tournament types</p>
                    </div>
                    <div className="bg-sky-600/50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Gift className="h-4 w-4 text-yellow-300" />
                        <span className="text-white text-sm font-bold">Bonus Rewards</span>
                      </div>
                      <p className="text-white text-sm">+10% tournament rewards</p>
                    </div>
                    <div className="bg-sky-600/50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="h-4 w-4 text-yellow-300" />
                        <span className="text-white text-sm font-bold">Agent Boost</span>
                      </div>
                      <p className="text-white text-sm">Unlock agent upgrades</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tournaments Tab */}
        {activeTab === "tournaments" && (
          <div className="space-y-8">
            {/* Active Tournaments */}
            <div className="bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-[2px_2px_0px_#0ea5e9]">
                ACTIVE TOURNAMENTS
              </h3>

              {mockStakedEntries.filter((entry) => entry.status === "active").length > 0 ? (
                <div className="space-y-4">
                  {mockStakedEntries
                    .filter((entry) => entry.status === "active")
                    .map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-sky-500/50 rounded-lg p-4 cursor-pointer"
                        onClick={() => toggleEntryExpansion(entry.id)}
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div>
                            <h4 className="text-xl font-bold text-white">{entry.tournament}</h4>
                            <p className="text-white text-sm">Agent: {entry.agent}</p>
                          </div>
                          <div className="flex items-center gap-4 mt-2 md:mt-0">
                            <div className="bg-yellow-400/30 px-3 py-1 rounded-lg border border-yellow-500/50">
                              <span className="text-white font-bold">Stake: {entry.stake} SOL</span>
                            </div>
                            <button>
                              {expandedEntry === entry.id ? (
                                <ChevronUp className="h-5 w-5 text-white" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-white" />
                              )}
                            </button>
                          </div>
                        </div>

                        {expandedEntry === entry.id && (
                          <div className="mt-4 pt-4 border-t border-sky-400">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-sky-600/50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                  <Trophy className="h-4 w-4 text-yellow-300" />
                                  <span className="text-white text-sm font-bold">Current Rank</span>
                                </div>
                                <p className="text-white text-lg">
                                  {entry.currentRank} / {entry.totalParticipants}
                                </p>
                              </div>
                              <div className="bg-sky-600/50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                  <Calendar className="h-4 w-4 text-yellow-300" />
                                  <span className="text-white text-sm font-bold">Start Date</span>
                                </div>
                                <p className="text-white text-lg">{entry.startDate}</p>
                              </div>
                              <div className="bg-sky-600/50 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                  <Calendar className="h-4 w-4 text-yellow-300" />
                                  <span className="text-white text-sm font-bold">End Date</span>
                                </div>
                                <p className="text-white text-lg">{entry.endDate}</p>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <button
                                onClick={() => router.push("/tournament/active")}
                                className="bg-green-400 hover:bg-green-500 text-white px-3 py-1 font-bold border-b-2 border-green-600 hover:border-green-700 transition-colors pixelated text-sm"
                              >
                                VIEW DETAILS
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="bg-sky-500/30 p-4 rounded-lg text-center">
                  <p className="text-white">You have no active tournaments.</p>
                  <button
                    onClick={() => router.push("/#tournaments")}
                    className="mt-4 inline-block bg-green-400 hover:bg-green-500 text-white px-4 py-2 font-bold border-b-4 border-green-600 hover:border-green-700 transition-colors pixelated"
                  >
                    JOIN A TOURNAMENT
                  </button>
                </div>
              )}
            </div>

            {/* Tournament History */}
            <div className="bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6">
              <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-[2px_2px_0px_#0ea5e9]">
                TOURNAMENT HISTORY
              </h3>

              {mockStakedEntries.filter((entry) => entry.status === "completed").length > 0 ? (
                <div className="space-y-4">
                  {mockStakedEntries
                    .filter((entry) => entry.status === "completed")
                    .map((entry) => (
                      <div
                        key={entry.id}
                        className="bg-gray-500/30 rounded-lg p-4 cursor-pointer"
                        onClick={() => toggleEntryExpansion(entry.id)}
                      >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div>
                            <h4 className="text-xl font-bold text-white">{entry.tournament}</h4>
                            <p className="text-white text-sm">Agent: {entry.agent}</p>
                          </div>
                          <div className="flex items-center gap-4 mt-2 md:mt-0">
                            <div className="bg-gray-600/30 px-3 py-1 rounded-lg border border-gray-500/50">
                              <span className="text-white font-bold">Final Rank: {entry.finalRank}</span>
                            </div>
                            <button>
                              {expandedEntry === entry.id ? (
                                <ChevronUp className="h-5 w-5 text-white" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-white" />
                              )}
                            </button>
                          </div>
                        </div>

                        {expandedEntry === entry.id && (
                          <div className="mt-4 pt-4 border-t border-gray-500">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="bg-gray-600/30 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                  <Trophy className="h-4 w-4 text-yellow-300" />
                                  <span className="text-white text-sm font-bold">Reward</span>
                                </div>
                                <p className="text-white text-lg">{entry.reward} SOL</p>
                              </div>
                              <div className="bg-gray-600/30 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                  <Calendar className="h-4 w-4 text-yellow-300" />
                                  <span className="text-white text-sm font-bold">Start Date</span>
                                </div>
                                <p className="text-white text-lg">{entry.startDate}</p>
                              </div>
                              <div className="bg-gray-600/30 p-3 rounded-lg">
                                <div className="flex items-center gap-2 mb-1">
                                  <Calendar className="h-4 w-4 text-yellow-300" />
                                  <span className="text-white text-sm font-bold">End Date</span>
                                </div>
                                <p className="text-white text-lg">{entry.endDate}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <div className="bg-sky-500/30 p-4 rounded-lg text-center">
                  <p className="text-white">You have no tournament history.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Referral Modal */}
      {showReferralModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-sky-400 border-4 border-sky-500 rounded-lg p-6 max-w-md w-full pixelated">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">REFER FRIENDS</h3>
              <button
                onClick={() => setShowReferralModal(false)}
                className="bg-pink-500 hover:bg-pink-600 p-1 rounded-full"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <div className="bg-sky-500/50 p-4 rounded-lg mb-4">
              <p className="text-white text-sm mb-3">
                Share your referral code with friends. You'll both receive rewards when they join!
              </p>
              <div className="flex items-center gap-2 bg-sky-600/50 p-2 rounded-lg">
                <span className="text-white font-bold flex-1">{mockUserData.referralCode}</span>
                <button
                  onClick={copyReferralCode}
                  className={`p-1 rounded ${copiedReferral ? "bg-green-500" : "bg-yellow-400 hover:bg-yellow-500"}`}
                >
                  {copiedReferral ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <Copy className="h-5 w-5 text-gray-800" />
                  )}
                </button>
              </div>
            </div>

            <div className="bg-sky-500/50 p-4 rounded-lg mb-4">
              <h4 className="font-bold text-white mb-2">REWARDS</h4>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <Gift className="h-4 w-4 text-yellow-300 mt-0.5 flex-shrink-0" />
                  <span>You get 10 SOL for each friend who joins</span>
                </li>
                <li className="flex items-start gap-2">
                  <Gift className="h-4 w-4 text-yellow-300 mt-0.5 flex-shrink-0" />
                  <span>Your friend gets 5 SOL welcome bonus</span>
                </li>
                <li className="flex items-start gap-2">
                  <Gift className="h-4 w-4 text-yellow-300 mt-0.5 flex-shrink-0" />
                  <span>Earn 5% of your friends' tournament winnings</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setShowReferralModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 font-bold border-b-2 border-gray-700 transition-colors pixelated"
              >
                CLOSE
              </button>
              <button className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 font-bold border-b-2 border-green-600 hover:border-green-700 transition-colors pixelated flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                SHARE LINK
              </button>
            </div>
          </div>
        </div>
      )}

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
