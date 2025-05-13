"use client"

import Image from "next/image"
import { Medal, Star, Shield, Zap, Brain, Target, Flame } from "lucide-react"

interface TopPlayersShowcaseProps {
  season: string
  tournament: string
}

// Badge definitions
const badges = {
  strategist: {
    name: "Strategist",
    icon: <Brain className="h-4 w-4 text-blue-500" />,
    color: "bg-blue-100 text-blue-700",
    description: "Exceptional strategic decision making",
  },
  momentum: {
    name: "Momentum Master",
    icon: <Zap className="h-4 w-4 text-yellow-500" />,
    color: "bg-yellow-100 text-yellow-700",
    description: "Maintains winning streaks",
  },
  consistent: {
    name: "Consistent Performer",
    icon: <Target className="h-4 w-4 text-green-500" />,
    color: "bg-green-100 text-green-700",
    description: "Consistently high performance",
  },
  rising: {
    name: "Rising Star",
    icon: <Flame className="h-4 w-4 text-orange-500" />,
    color: "bg-orange-100 text-orange-700",
    description: "Rapid improvement in recent games",
  },
  defensive: {
    name: "Defensive Expert",
    icon: <Shield className="h-4 w-4 text-purple-500" />,
    color: "bg-purple-100 text-purple-700",
    description: "Exceptional defensive strategies",
  },
}

// Sample top players data
const topPlayers = [
  {
    id: 1,
    name: "RoyaleChamp",
    score: 28750,
    winRate: 78,
    badges: ["strategist", "momentum"],
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 2,
    name: "CubeMaster",
    score: 26400,
    winRate: 72,
    badges: ["consistent", "defensive"],
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 3,
    name: "AgentKing",
    score: 25800,
    winRate: 70,
    badges: ["strategist"],
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 4,
    name: "PixelHunter",
    score: 23500,
    winRate: 65,
    badges: ["rising", "momentum"],
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 5,
    name: "BlockyChamp",
    score: 22900,
    winRate: 63,
    badges: ["defensive"],
    avatar: "/placeholder.svg?height=48&width=48",
  },
]

export function TopPlayersShowcase({ season, tournament }: TopPlayersShowcaseProps) {
  // In a real app, you would filter players based on season and tournament
  // For this example, we'll just use the sample data

  return (
    <div className="space-y-4">
      {topPlayers.map((player, index) => (
        <div key={player.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          {/* Rank */}
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            {index < 3 ? (
              <Medal
                className={`h-6 w-6 ${
                  index === 0 ? "text-yellow-400" : index === 1 ? "text-gray-400" : "text-amber-600"
                }`}
              />
            ) : (
              <span className="text-lg font-bold text-gray-500">{index + 1}</span>
            )}
          </div>

          {/* Avatar */}
          <div className="flex-shrink-0 w-10 h-10 relative">
            <Image
              src={player.avatar || "/placeholder.svg"}
              alt={player.name}
              width={40}
              height={40}
              className="rounded-full pixelated"
            />
          </div>

          {/* Player info */}
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">{player.name}</h3>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-[#ffcc5c]" />
                <span className="text-sm font-medium">{player.score.toLocaleString()}</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-1">
              {player.badges.map((badgeKey) => {
                const badge = badges[badgeKey as keyof typeof badges]
                return (
                  <div
                    key={badgeKey}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${badge.color}`}
                    title={badge.description}
                  >
                    {badge.icon}
                    <span>{badge.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Win rate */}
          <div className="flex-shrink-0 text-right">
            <div className="text-sm font-medium text-gray-500">Win Rate</div>
            <div className="font-bold">{player.winRate}%</div>
          </div>
        </div>
      ))}
    </div>
  )
}
