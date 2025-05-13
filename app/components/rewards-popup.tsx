"use client"

import { X, Lock, Check, Star } from "lucide-react"
import Image from "next/image"

type UnlockableAgent = {
  name: string
  requiredScore: number
  image: string
  unlocked: boolean
}

interface RewardsPopupProps {
  onClose: () => void
  gameScore: number
  previousScore: number
  totalScore: number
  unlockableAgents: UnlockableAgent[]
}

export function RewardsPopup({ onClose, gameScore, previousScore, totalScore, unlockableAgents }: RewardsPopupProps) {
  // Sort agents by required score
  const sortedAgents = [...unlockableAgents].sort((a, b) => a.requiredScore - b.requiredScore)

  // Find newly unlocked agents
  const newlyUnlocked = sortedAgents.filter(
    (agent) => agent.unlocked && agent.requiredScore > previousScore && agent.requiredScore <= totalScore,
  )

  // Find next agent to unlock
  const nextToUnlock = sortedAgents.find((agent) => !agent.unlocked)

  // Calculate progress to next unlock
  const progressPercentage = nextToUnlock ? Math.min(100, (totalScore / nextToUnlock.requiredScore) * 100) : 100

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border-4 border-[#ffcc5c] max-w-2xl w-full max-h-[90vh] overflow-auto shadow-lg">
        <div className="bg-[#ffcc5c] p-4 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Star className="h-6 w-6 text-white" />
            <h2 className="text-2xl md:text-3xl font-bold text-white dimensional-text">Agent Unlocks</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            aria-label="Close popup"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Score Summary */}
          <div className="bg-[#d4f0ff] p-4 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-3 dimensional-text">Your Trainer Score</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Previous</p>
                <p className="text-2xl font-bold">{previousScore.toLocaleString()}</p>
              </div>
              <div className="border-x border-gray-200">
                <p className="text-sm text-gray-600">This Game</p>
                <p className="text-2xl font-bold text-[#e15a97]">+{gameScore.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold">{totalScore.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Newly Unlocked Agents */}
          {newlyUnlocked.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3 dimensional-text text-green-500 flex items-center gap-2">
                <Check className="h-5 w-5" />
                Newly Unlocked!
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newlyUnlocked.map((agent, index) => (
                  <div
                    key={index}
                    className="border-2 border-green-500 rounded-lg p-4 flex items-center gap-4 bg-green-50 animate-pulse-slow"
                  >
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image
                        src={agent.image || "/placeholder.svg"}
                        alt={agent.name}
                        width={64}
                        height={64}
                        className="pixelated"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="font-bold text-lg dimensional-text truncate">{agent.name}</h4>
                      <p className="text-sm text-green-600">Required: {agent.requiredScore.toLocaleString()} points</p>
                      <p className="text-sm font-bold text-green-700">UNLOCKED!</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Unlockable Agents */}
          <h3 className="text-xl font-bold mb-3 dimensional-text">Agent Unlock Requirements</h3>
          <div className="space-y-4">
            {sortedAgents.map((agent, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 flex items-center gap-4 ${
                  agent.unlocked ? "border-green-200 bg-green-50" : "border-gray-200"
                }`}
              >
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image
                    src={agent.image || "/placeholder.svg"}
                    alt={agent.name}
                    width={64}
                    height={64}
                    className="pixelated"
                  />
                  <div
                    className={`absolute -bottom-2 -right-2 rounded-full p-1 ${
                      agent.unlocked ? "bg-green-500" : "bg-gray-400"
                    }`}
                  >
                    {agent.unlocked ? (
                      <Check className="h-4 w-4 text-white" />
                    ) : (
                      <Lock className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-lg dimensional-text truncate">{agent.name}</h4>
                    <span className={`text-sm font-bold ${agent.unlocked ? "text-green-600" : "text-gray-600"} flex-shrink-0 ml-2`}>
                      {agent.requiredScore.toLocaleString()} points
                    </span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2.5 w-full">
                    <div
                      className={`h-2.5 rounded-full ${agent.unlocked ? "bg-green-500" : "bg-[#e15a97]"}`}
                      style={{
                        width: `${Math.min(100, agent.unlocked ? 100 : (totalScore / agent.requiredScore) * 100)}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">Your score: {totalScore.toLocaleString()}</span>
                    {!agent.unlocked && (
                      <span className="text-xs text-gray-500">
                        Need {Math.max(0, agent.requiredScore - totalScore).toLocaleString()} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Unlock Progress */}
          {nextToUnlock && (
            <div className="mt-6 bg-[#d4f0ff] p-4 rounded-lg">
              <h3 className="text-lg font-bold mb-2 dimensional-text">Next Agent Unlock</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image
                    src={nextToUnlock.image || "/placeholder.svg"}
                    alt={nextToUnlock.name}
                    width={48}
                    height={48}
                    className="pixelated"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex justify-between">
                    <span className="font-bold truncate">{nextToUnlock.name}</span>
                    <span className="text-sm flex-shrink-0 ml-2">
                      {totalScore.toLocaleString()} / {nextToUnlock.requiredScore.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-2 bg-gray-200 rounded-full h-2.5 w-full">
                    <div className="h-2.5 rounded-full bg-[#e15a97]" style={{ width: `${progressPercentage}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#e15a97] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#d14a87] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
