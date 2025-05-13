"use client"

import Image from "next/image"
import { TrendingUp, Award, Shield, Zap, Target } from "lucide-react"

interface TopAgentsShowcaseProps {
  season: string
  tournament: string
}

// Sample top agents data
const topAgents = [
  {
    id: 1,
    name: "Shadow",
    roi: 2.35,
    usageRate: 42,
    winRate: 68,
    specialty: "Stealth",
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 2,
    name: "Phoenix",
    roi: 2.12,
    usageRate: 38,
    winRate: 65,
    specialty: "Revival",
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 3,
    name: "Viper",
    roi: 1.98,
    usageRate: 35,
    winRate: 62,
    specialty: "Control",
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 4,
    name: "Cipher",
    roi: 1.85,
    usageRate: 30,
    winRate: 58,
    specialty: "Intel",
    image: "/placeholder.svg?height=48&width=48",
  },
  {
    id: 5,
    name: "Ghost",
    roi: 1.76,
    usageRate: 28,
    winRate: 55,
    specialty: "Evasion",
    image: "/placeholder.svg?height=48&width=48",
  },
]

// Get specialty icon
const getSpecialtyIcon = (specialty: string) => {
  switch (specialty.toLowerCase()) {
    case "stealth":
      return <Zap className="h-4 w-4 text-purple-500" />
    case "revival":
      return <Award className="h-4 w-4 text-orange-500" />
    case "control":
      return <Target className="h-4 w-4 text-blue-500" />
    case "intel":
      return <Shield className="h-4 w-4 text-green-500" />
    case "evasion":
      return <Zap className="h-4 w-4 text-yellow-500" />
    default:
      return <Award className="h-4 w-4 text-gray-500" />
  }
}

export function TopAgentsShowcase({ season, tournament }: TopAgentsShowcaseProps) {
  // In a real app, you would filter agents based on season and tournament
  // For this example, we'll just use the sample data

  return (
    <div className="space-y-4">
      {topAgents.map((agent, index) => (
        <div key={agent.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
          {/* Rank */}
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-500">#{index + 1}</span>
          </div>

          {/* Avatar */}
          <div className="flex-shrink-0 w-10 h-10 relative">
            <Image
              src={agent.image || "/placeholder.svg"}
              alt={agent.name}
              width={40}
              height={40}
              className="rounded-full pixelated"
            />
          </div>

          {/* Agent info */}
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">{agent.name}</h3>
              <div className="flex items-center gap-1">
                <TrendingUp className={`h-4 w-4 ${agent.roi >= 2.0 ? "text-green-500" : "text-blue-500"}`} />
                <span className={`text-sm font-medium ${agent.roi >= 2.0 ? "text-green-600" : "text-blue-600"}`}>
                  {agent.roi.toFixed(2)}x ROI
                </span>
              </div>
            </div>

            {/* Specialty */}
            <div className="flex items-center gap-1 mt-1">
              {getSpecialtyIcon(agent.specialty)}
              <span className="text-xs text-gray-600">{agent.specialty} Specialist</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex-shrink-0 text-right">
            <div className="text-xs font-medium text-gray-500">Win / Usage</div>
            <div className="font-bold">
              {agent.winRate}% / {agent.usageRate}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
