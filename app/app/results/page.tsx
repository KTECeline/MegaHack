import { GameResultsBox } from "@/components/game-results-box"
import { LeaderboardHeader } from "@/components/leaderboard-header"

export default function Home() {
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
        {/* Game Results Box */}
        <GameResultsBox />
      </div>
    </main>
  )
}
