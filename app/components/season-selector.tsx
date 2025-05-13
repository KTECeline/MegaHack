"use client"

import { useState } from "react"
import { Filter, Calendar, Trophy } from "lucide-react"

interface SeasonSelectorProps {
  selectedSeason: string
  onSeasonChange: (season: string) => void
  selectedTournament: string
  onTournamentChange: (tournament: string) => void
}

export function SeasonSelector({
  selectedSeason,
  onSeasonChange,
  selectedTournament,
  onTournamentChange,
}: SeasonSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Season data
  const seasons = ["Season 4 - 2024", "Season 1 - 2025", "Season 2 - 2025", "Season 3 - 2025"]

  // Tournament data
  const tournaments = ["All Tournaments", "Weekly Challenge", "Monthly Championship", "Grand Prix", "Invitational"]

  const getSeasonDates = (season: string) => {
    const [seasonNum, year] = season.split(" - ")
    const num = Number.parseInt(seasonNum.split(" ")[1])

    switch (num) {
      case 1:
        return `Jan 15 - Apr 14, ${year}`
      case 2:
        return `Apr 15 - Jul 14, ${year}`
      case 3:
        return `Jul 15 - Oct 14, ${year}`
      case 4:
        return `Oct 15 - Jan 14, ${Number.parseInt(year) + 1}`
      default:
        return ""
    }
  }

  return (
    <div className="rounded-xl border-4 border-[#78d0f9] overflow-hidden shadow-lg bg-white">
      <div className="bg-[#78d0f9] p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-white" />
          <h2 className="text-xl font-bold text-white dimensional-text">Filter Showcase</h2>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-gray-100 transition-colors text-sm font-bold"
        >
          {isOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {isOpen && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Season Selector */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-[#78d0f9]" />
              <h3 className="font-bold">Select Season</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {seasons.map((season) => (
                <button
                  key={season}
                  onClick={() => onSeasonChange(season)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedSeason === season ? "bg-[#78d0f9] text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {season}
                </button>
              ))}
            </div>
            {selectedSeason && <p className="text-xs text-gray-500 mt-2">{getSeasonDates(selectedSeason)}</p>}
          </div>

          {/* Tournament Selector */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="h-4 w-4 text-[#e15a97]" />
              <h3 className="font-bold">Select Tournament</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {tournaments.map((tournament) => (
                <button
                  key={tournament}
                  onClick={() => onTournamentChange(tournament)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedTournament === tournament ? "bg-[#e15a97] text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {tournament}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 p-3 flex justify-between items-center">
        <div>
          <span className="font-bold">Current Filter:</span> <span className="text-[#78d0f9]">{selectedSeason}</span>
          {selectedTournament !== "All Tournaments" && (
            <span>
              {" "}
              • <span className="text-[#e15a97]">{selectedTournament}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
