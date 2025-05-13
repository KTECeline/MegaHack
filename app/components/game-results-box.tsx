"use client"

import { useState } from "react"
import { Trophy, ArrowRight, TrendingUp, Award, Star, User, Gift } from "lucide-react"
import Image from "next/image"
import { RewardsPopup } from "./rewards-popup"
import Link from "next/link"
import { useRouter } from "next/navigation"

type AgentResult = {
  name: string
  roi: number
  performance: "excellent" | "good" | "average" | "poor"
}

export function GameResultsBox() {
  const router = useRouter()
  const [showRewardsPopup, setShowRewardsPopup] = useState(false)

  // Sample data - in a real app this would come from props or API
  const gameResults = {
    gameId: "AR-28475",
    duration: "15:00",
    trainerScore: 8750,
    previousScore: 12500,
    totalScore: 21250, // Previous + current game
    rank: 3,
    agents: [
      { name: "Shadow", roi: 1.85, performance: "excellent" as const },
      { name: "Phoenix", roi: 1.32, performance: "good" as const },
      { name: "Viper", roi: 0.78, performance: "average" as const },
    ],
  }

  // Sample unlockable agents data
  const unlockableAgents = [
    { name: "Dragon", requiredScore: 15000, image: "/placeholder.svg?height=64&width=64", unlocked: true },
    { name: "Titan", requiredScore: 20000, image: "/placeholder.svg?height=64&width=64", unlocked: true },
    { name: "Specter", requiredScore: 25000, image: "/placeholder.svg?height=64&width=64", unlocked: false },
    { name: "Nova", requiredScore: 30000, image: "/placeholder.svg?height=64&width=64", unlocked: false },
  ]

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "text-green-500"
      case "good":
        return "text-blue-500"
      case "average":
        return "text-yellow-500"
      case "poor":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getROIColor = (roi: number) => {
    if (roi >= 1.5) return "text-green-500"
    if (roi >= 1.0) return "text-blue-500"
    if (roi >= 0.5) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="rounded-xl border-4 border-[#e15a97] overflow-hidden shadow-lg bg-white">
      <div className="bg-[#e15a97] p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-[#ffcc5c]" />
          <h2 className="text-2xl md:text-3xl font-bold text-white dimensional-text">Results & Ranking</h2>
        </div>
      </div>

      <div className="p-6">
        {/* Game Info - Now stacked vertically with wider boxes */}
        <div className="space-y-4">
          {/* Game Summary */}
          <div className="bg-[#d4f0ff] p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-3 dimensional-text">Game Summary</h3>
            <div className="flex flex-wrap justify-between">
              <div className="flex gap-4 w-full md:w-auto">
                <div>
                  <span className="dimensional-text block">Game ID:</span>
                  <span className="font-bold">{gameResults.gameId}</span>
                </div>
                <div>
                  <span className="dimensional-text block">Duration:</span>
                  <span className="font-bold">{gameResults.duration}</span>
                </div>
                <div>
                  <span className="dimensional-text block">Final Rank:</span>
                  <span className="font-bold">{gameResults.rank}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trainer Score */}
          <div className="bg-[#d4f0ff] p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-3 dimensional-text">Trainer Score</h3>
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-[#ffcc5c]" />
              <div className="text-4xl font-bold text-[#e15a97] dimensional-text">{gameResults.trainerScore}</div>
              <p className="text-sm ml-4">Points earned this game</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-[#d4f0ff] p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-3 dimensional-text">See Where You Rank</h3>
            <div className="flex justify-between items-center">
              <p className="text-sm max-w-md">
                Check your position on the global leaderboard and see how you compare to other players.
              </p>
              <Link href="/leaderboard">
                <button className="bg-[#e15a97] text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-[#d14a87] transition-colors">
                  View Leaderboard
                  <ArrowRight className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 dimensional-text">Agent Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {gameResults.agents.map((agent, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 relative">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt={agent.name}
                    width={48}
                    height={48}
                    className="pixelated"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg dimensional-text">{agent.name}</h4>
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`h-4 w-4 ${getROIColor(agent.roi)}`} />
                    <span className={`font-bold ${getROIColor(agent.roi)}`}>ROI: {agent.roi.toFixed(2)}x</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className={`h-4 w-4 ${getPerformanceColor(agent.performance)}`} />
                    <span className={`${getPerformanceColor(agent.performance)} capitalize`}>{agent.performance}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Navigation and Rewards */}
        <div className="mt-6">
          <div className="bg-[#d4f0ff] p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-3 dimensional-text">Claim Your Rewards</h3>
            <div className="flex justify-between items-center">
              <div className="max-w-md">
                <p className="text-sm mb-2">
                  With the Trainer Score you've earned in this game, you may have unlocked new AI agents and special
                  rewards!
                </p>
                <button
                  onClick={() => setShowRewardsPopup(true)}
                  className="flex items-center gap-2 text-[#e15a97] hover:text-[#d14a87] transition-colors cursor-pointer group"
                >
                  <Gift className="h-5 w-5 group-hover:animate-bounce" />
                  <span className="font-bold underline">Potential rewards available to claim</span>
                </button>
              </div>
              <button
                className="bg-[#ffcc5c] text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-[#e6b94f] transition-colors"
                onClick={() => router.push("/profile")}
              >
                Go to Profile
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Popup */}
      {showRewardsPopup && (
        <RewardsPopup
          onClose={() => setShowRewardsPopup(false)}
          gameScore={gameResults.trainerScore}
          previousScore={gameResults.previousScore}
          totalScore={gameResults.totalScore}
          unlockableAgents={unlockableAgents}
        />
      )}
    </div>
  )
}
