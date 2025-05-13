"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LeaderboardTable } from "@/components/leaderboard-table"
import { LeaderboardHeader } from "@/components/leaderboard-header"
import { Trophy, ArrowLeft, TrendingUp, Crown } from "lucide-react"
import { TopPlayersShowcase } from "@/components/top-players-showcase"
import { TopAgentsShowcase } from "@/components/top-agents-showcase"
import { SeasonSelector } from "@/components/season-selector"

export default function LeaderboardPage() {
  const router = useRouter()
  const [selectedSeason, setSelectedSeason] = useState("Season 3 - 2025")
  const [selectedTournament, setSelectedTournament] = useState("All Tournaments")

  return (
    <main className="min-h-screen bg-[#a3d8f8] relative overflow-hidden">
      {/* Pink header across the screen */}
      <div className="w-full bg-[#e15a97] p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <LeaderboardHeader />
        </div>
      </div>

      {/* Content container */}
      <div className="max-w-4xl mx-auto p-4 md:p-8 relative z-10">
        {/* Back button */}
        <div className="mb-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-[#e15a97] hover:text-[#d14a87] transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-bold">Go Back</span>
          </button>
        </div>

        {/* Leaderboard */}
        <div className="rounded-xl border-4 border-[#ffcc5c] overflow-hidden shadow-lg bg-white mb-8">
          <div className="bg-[#ffcc5c] p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-white" />
              <h2 className="text-2xl md:text-3xl font-bold text-white dimensional-text">Leaderboard</h2>
            </div>
          </div>
          <div className="p-0">
            <LeaderboardTable />
          </div>
        </div>

        {/* Season Selector */}
        <div className="mb-6">
          <SeasonSelector
            selectedSeason={selectedSeason}
            onSeasonChange={setSelectedSeason}
            selectedTournament={selectedTournament}
            onTournamentChange={setSelectedTournament}
          />
        </div>

        {/* Showcases Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Top Players Showcase */}
          <div className="rounded-xl border-4 border-[#e15a97] overflow-hidden shadow-lg bg-white">
            <div className="bg-[#e15a97] p-3 flex items-center gap-2">
              <Crown className="h-5 w-5 text-[#ffcc5c]" />
              <h2 className="text-xl font-bold text-white dimensional-text">Top Players of {selectedSeason}</h2>
            </div>
            <div className="p-4">
              <TopPlayersShowcase season={selectedSeason} tournament={selectedTournament} />
            </div>
          </div>

          {/* Top Agents Showcase */}
          <div className="rounded-xl border-4 border-[#78d0f9] overflow-hidden shadow-lg bg-white">
            <div className="bg-[#78d0f9] p-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-white" />
              <h2 className="text-xl font-bold text-white dimensional-text">Top AI Agents by ROI</h2>
            </div>
            <div className="p-4">
              <TopAgentsShowcase season={selectedSeason} tournament={selectedTournament} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
