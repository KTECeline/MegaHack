"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Medal, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AgentTooltip } from "./agent-tooltip"

type Player = {
  id: number
  rank: number
  name: string
  agent: string
  earnings: number
  strategy?: string
}

const initialPlayers: Player[] = [
  {
    id: 1,
    rank: 1,
    name: "RoyaleChamp",
    agent: "Shadow",
    earnings: 12500,
    strategy:
      "Shadow dominated the competition with an aggressive flanking strategy, utilizing stealth mechanics to ambush opponents from unexpected angles. Their signature move of deploying smoke screens followed by precision strikes led to a 78% win rate in direct confrontations.",
  },
  {
    id: 2,
    rank: 2,
    name: "CubeMaster",
    agent: "Phoenix",
    earnings: 11200,
    strategy:
      "Phoenix excelled with a balanced approach of defense and counter-attacks. Their ability to control strategic choke points and deploy area-denial abilities forced opponents into unfavorable positions. Phoenix's tactical use of revival abilities allowed for high-risk, high-reward plays that paid off in critical moments.",
  },
  {
    id: 3,
    rank: 3,
    name: "AgentKing",
    agent: "Viper",
    earnings: 10800,
    strategy:
      "Viper specialized in zone control and information denial, creating toxic screens that blocked enemy vision while providing team intel. Their methodical approach to each match and exceptional resource management allowed them to outlast opponents in extended engagements, with an average survival time 40% higher than other competitors.",
  },
  { id: 4, rank: 4, name: "PixelHunter", agent: "Cipher", earnings: 9500 },
  { id: 5, rank: 5, name: "BlockyChamp", agent: "Ghost", earnings: 8900 },
  { id: 6, rank: 6, name: "RoyaleQueen", agent: "Nova", earnings: 8200 },
  { id: 7, rank: 7, name: "CubeCollector", agent: "Titan", earnings: 7800 },
  { id: 8, rank: 8, name: "IslandExplorer", agent: "Dragon", earnings: 7200 },
  { id: 9, rank: 9, name: "VoxelViking", agent: "Specter", earnings: 6500 },
  { id: 10, rank: 10, name: "RoyaleNewbie", agent: "Rookie", earnings: 5000 },
]

export function LeaderboardTable() {
  const [players, setPlayers] = useState<Player[]>([])
  const [highlightedRow, setHighlightedRow] = useState<number | null>(null)
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null)

  // Sort players by earnings on initial render
  useEffect(() => {
    const sortedPlayers = [...initialPlayers].sort((a, b) => b.earnings - a.earnings)

    // Update ranks after sorting
    const rankedPlayers = sortedPlayers.map((player, index) => ({
      ...player,
      rank: index + 1,
    }))

    setPlayers(rankedPlayers)
  }, [])

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-400 animate-pulse-slow"
      case 2:
        return "text-gray-400 animate-pulse-slow"
      case 3:
        return "text-amber-600 animate-pulse-slow"
      default:
        return "text-gray-700"
    }
  }

  const getActivePlayer = () => {
    return players.find((player) => player.id === activeTooltip)
  }

  const handleAgentClick = (playerId: number) => {
    setActiveTooltip(playerId)
  }

  const closeTooltip = () => {
    setActiveTooltip(null)
  }

  return (
    <>
      <Table className="[&_td]:py-4 [&_th]:py-4">
        <TableHeader className="bg-[#d4f0ff]">
          <TableRow>
            <TableHead className="w-16 text-center font-bold text-xl md:text-2xl dimensional-text">Rank</TableHead>
            <TableHead className="font-bold text-xl md:text-2xl dimensional-text">Player</TableHead>
            <TableHead className="font-bold text-xl md:text-2xl dimensional-text">Agent</TableHead>
            <TableHead className="font-bold text-xl md:text-2xl dimensional-text">Earnings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow
              key={player.id}
              className={`
                ${player.rank <= 3 ? "bg-[#e8f7ff]" : ""} 
                ${highlightedRow === player.id ? "bg-[#d9f2fd]" : ""}
                transition-colors duration-300
              `}
              onMouseEnter={() => setHighlightedRow(player.id)}
              onMouseLeave={() => setHighlightedRow(null)}
            >
              <TableCell className="text-center font-bold">
                {player.rank <= 3 ? (
                  <Medal className={`h-7 w-7 mx-auto ${getMedalColor(player.rank)}`} />
                ) : (
                  <span className="dimensional-text text-xl md:text-2xl">{player.rank}</span>
                )}
              </TableCell>
              <TableCell className="font-medium text-xl md:text-2xl dimensional-text">{player.name}</TableCell>
              <TableCell>
                {player.rank <= 3 ? (
                  <div className="flex items-center gap-3 relative">
                    <div
                      className={`w-10 h-10 relative cursor-pointer ${
                        highlightedRow === player.id ? "animate-bounce" : ""
                      }`}
                      onClick={() => handleAgentClick(player.id)}
                    >
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt={player.agent}
                        width={40}
                        height={40}
                        className="pixelated"
                      />
                      {/* Add a visual indicator that this is clickable */}
                      <div className="absolute inset-0 bg-[#78d0f9] bg-opacity-20 hover:bg-opacity-0 transition-all duration-200 border-2 border-transparent hover:border-[#78d0f9]"></div>
                    </div>
                    <span className="text-xl md:text-2xl dimensional-text">{player.agent}</span>
                  </div>
                ) : (
                  <span className="text-xl md:text-2xl dimensional-text">{player.agent}</span>
                )}
              </TableCell>
              <TableCell className="font-bold text-xl md:text-2xl dimensional-text">
                ${player.earnings.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {activeTooltip && <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" onClick={closeTooltip} />}

      <AgentTooltip isVisible={activeTooltip !== null}>
        {getActivePlayer() && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg dimensional-text text-[#ffcc5c]">
                {getActivePlayer()?.agent}'s Strategy
              </h3>
              <button onClick={closeTooltip} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <p className="dimensional-text">{getActivePlayer()?.strategy}</p>
          </div>
        )}
      </AgentTooltip>
    </>
  )
}
