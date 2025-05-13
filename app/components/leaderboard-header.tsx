import { Trophy } from "lucide-react"

export function LeaderboardHeader() {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="h-12 w-12 text-[#ffcc5c] animate-pulse-slow" />
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wide pixel-text uppercase">AGENT ROYALE</h1>
        <Trophy className="h-12 w-12 text-[#ffcc5c] animate-pulse-slow" />
      </div>
      <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider pixel-text">Results & Ranking</h2>
    </div>
  )
}
