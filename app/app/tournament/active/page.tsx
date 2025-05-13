"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import TradingGraph from "@/components/trading-graph"
import PixelatedProgressBar from "@/components/pixelated-progress-bar"
import { Trophy, Medal, Clock, Send, AlertTriangle } from "lucide-react"
import AnimatedNumber from "@/components/animated-number"

// Define agent types
interface Agent {
  id: number
  name: string
  type: string
  avatar: string
  performance: number
  isKnockedOut: boolean
}

export default function LoadingPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [tradeCount, setTradeCount] = useState(0)
  const [playerScore, setPlayerScore] = useState(10000)
  const [initialPlayerScore] = useState(10000) // Store initial score for ROI calculation
  const [tournamentComplete, setTournamentComplete] = useState(false)
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(0.01 * 60) // 15 minutes in seconds
  const [chatMessages, setChatMessages] = useState<{ sender: string; message: string; timestamp: string }[]>([
    {
      sender: "System",
      message: "Welcome to the Agent Royale Tournament! Your agent is ready to trade.",
      timestamp: formatTimestamp(new Date()),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Define the three agents (1 active, 2 backups)
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 1,
      name: "TradeGPT",
      type: "Balanced Trader",
      avatar: "🤖",
      performance: 0,
      isKnockedOut: false,
    },
    {
      id: 2,
      name: "RiskMaster",
      type: "Aggressive Trader",
      avatar: "🚀",
      performance: 0,
      isKnockedOut: false,
    },
    {
      id: 3,
      name: "SafeHaven",
      type: "Conservative Trader",
      avatar: "🛡️",
      performance: 0,
      isKnockedOut: false,
    },
  ])

  // Track the current active agent
  const [activeAgentIndex, setActiveAgentIndex] = useState(0)

  // Total duration in seconds (15 minutes)
  const totalDuration = 15 * 60

  // Handle countdown timer and redirection
  useEffect(() => {
    if (tournamentComplete) {
      // Add a small delay before redirecting to allow final state updates
      const redirectTimer = setTimeout(() => {
        router.push("/results")
      }, 2000) // 2 second delay

      return () => clearTimeout(redirectTimer)
    }

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setTournamentComplete(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [tournamentComplete, router])

  // Update progress based on time
  useEffect(() => {
    // Calculate progress as percentage of time elapsed
    const elapsed = totalDuration - timeRemaining
    const newProgress = (elapsed / totalDuration) * 100
    setProgress(newProgress)
  }, [timeRemaining, totalDuration])

  // Update trade count - stop when tournament is complete
  useEffect(() => {
    if (tournamentComplete) return

    const interval = setInterval(() => {
      setTradeCount((prev) => prev + Math.floor(Math.random() * 3) + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [tournamentComplete])

  // Update player score based on simulated trading - stop when tournament is complete
  useEffect(() => {
    if (tournamentComplete) return

    const interval = setInterval(() => {
      // Different performance for different agents
      let performanceModifier = 1.0

      if (activeAgentIndex === 0)
        performanceModifier = 1.0 // Balanced
      else if (activeAgentIndex === 1)
        performanceModifier = 1.5 // Aggressive (higher volatility)
      else if (activeAgentIndex === 2) performanceModifier = 0.7 // Conservative (lower volatility)

      const change = Math.floor(Math.random() * 500 * performanceModifier) - 200 * performanceModifier

      setPlayerScore((prev) => {
        const newScore = Math.max(5000, prev + change)
        return newScore
      })

      // Update agent performance
      setAgents((prevAgents) => {
        const updatedAgents = [...prevAgents]
        const currentAgent = updatedAgents[activeAgentIndex]

        // Calculate ROI as percentage change from initial
        const roi = ((playerScore - initialPlayerScore) / initialPlayerScore) * 100
        currentAgent.performance = roi

        return updatedAgents
      })
    }, 1500)

    return () => clearInterval(interval)
  }, [tournamentComplete, activeAgentIndex, playerScore, initialPlayerScore])

  // Check if agent needs to be switched (every 30 seconds)
  useEffect(() => {
    if (tournamentComplete) return

    const checkInterval = setInterval(() => {
      // Only check after 5 minutes (300 seconds) have passed
      const elapsed = totalDuration - timeRemaining
      if (elapsed >= 300) {
        const currentAgent = agents[activeAgentIndex]

        // If ROI is negative by more than 5%, consider switching
        if (currentAgent.performance < -5) {
          // Find next available agent
          const nextAgentIndex = findNextAvailableAgent()

          if (nextAgentIndex !== -1 && nextAgentIndex !== activeAgentIndex) {
            // Mark current agent as knocked out
            setAgents((prevAgents) => {
              const updatedAgents = [...prevAgents]
              updatedAgents[activeAgentIndex].isKnockedOut = true
              return updatedAgents
            })

            // Switch to next agent
            setActiveAgentIndex(nextAgentIndex)

            // Add system message about agent switch
            const newMessage = {
              sender: "System",
              message: `${currentAgent.name} has been knocked out due to poor performance. ${agents[nextAgentIndex].name} is now taking over!`,
              timestamp: formatTimestamp(new Date()),
            }
            setChatMessages((prev) => [...prev, newMessage])
          }
        }
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(checkInterval)
  }, [tournamentComplete, agents, activeAgentIndex, timeRemaining, totalDuration])

  // Find the next available (not knocked out) agent
  const findNextAvailableAgent = () => {
    for (let i = 0; i < agents.length; i++) {
      if (i !== activeAgentIndex && !agents[i].isKnockedOut) {
        return i
      }
    }
    return -1 // No available agents
  }

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Format timestamp for chat messages
  function formatTimestamp(date: Date) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Handle sending a new chat message
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    // Add user message
    const userMessage = {
      sender: "You",
      message: inputMessage,
      timestamp: formatTimestamp(new Date()),
    }
    setChatMessages((prev) => [...prev, userMessage])

    // Simulate agent response
    setTimeout(() => {
      const currentAgent = agents[activeAgentIndex]
      const responses = [
        "I'll adjust my trading strategy based on your suggestion.",
        "Analyzing market conditions now. Will implement your advice.",
        "Interesting perspective. I'll factor that into my next trades.",
        "Thank you for the guidance. Optimizing trading parameters.",
        "I see your point. Recalibrating my approach accordingly.",
      ]
      const agentResponse = {
        sender: currentAgent.name,
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: formatTimestamp(new Date()),
      }
      setChatMessages((prev) => [...prev, agentResponse])
    }, 1000)

    // Clear input
    setInputMessage("")
  }

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])

  // Create a dynamic leaderboard that updates based on player earnings
  const [leaderboardData, setLeaderboardData] = useState([
    {
      rank: 1,
      player: "RoyaleChamp",
      agent: "Shadow",
      roi: 83,
      earnings: 18300,
      medalColor: "#ffcc5c", // Updated to #ffcc5c
    },
    {
      rank: 2,
      player: "CubeMaster",
      agent: "Phoenix",
      roi: 18,
      earnings: 11800,
      medalColor: "#C0C0C0", // Silver
    },
    {
      rank: 3,
      player: "AgentKing",
      agent: "Viper",
      roi: 8,
      earnings: 10800,
      medalColor: "#CD7F32", // Bronze
    },
  ])

  // Update leaderboard based on player earnings
  useEffect(() => {
    // Create a copy of the current leaderboard
    const updatedLeaderboard = [...leaderboardData]

    // Calculate ROI
    const roi = ((playerScore - initialPlayerScore) / initialPlayerScore) * 100

    // Update Player entry or add it if it doesn't exist
    const playerIndex = updatedLeaderboard.findIndex((item) => item.agent === agents[activeAgentIndex].name)

    if (playerIndex >= 0) {
      updatedLeaderboard[playerIndex].earnings = playerScore
      updatedLeaderboard[playerIndex].roi = Number(roi.toFixed(1))
    } else {
      updatedLeaderboard.push({
        rank: 0,
        player: "You",
        agent: agents[activeAgentIndex].name,
        roi: Number(roi.toFixed(1)),
        earnings: playerScore,
        medalColor: "#d94d8a", // Updated to landing page pink
      })
    }

    // Sort by ROI (highest first)
    updatedLeaderboard.sort((a, b) => b.roi - a.roi)

    // Update ranks
    updatedLeaderboard.forEach((item, index) => {
      item.rank = index + 1

      // Update medal colors based on rank
      if (index === 0)
        item.medalColor = "#ffcc5c" // Gold - updated to #ffcc5c
      else if (index === 1)
        item.medalColor = "#C0C0C0" // Silver
      else if (index === 2) item.medalColor = "#CD7F32" // Bronze
    })

    // Keep only top 3
    const top3 = updatedLeaderboard.slice(0, 3)

    setLeaderboardData(top3)
  }, [playerScore, initialPlayerScore, agents, activeAgentIndex])

  // Get current active agent
  const currentAgent = agents[activeAgentIndex]

  return (
    <main className="min-h-screen relative">
      {/* Header with pink background */}
      <div className="bg-[#d94d8a] py-8 px-4 relative overflow-hidden z-10">
        <div className="text-center">
          <div className="flex justify-center items-center gap-3">
            <Trophy className="h-10 w-10 md:h-16 md:w-16 text-[#78c4f7] animate-bounce-slow" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 font-pixelify tracking-wider pixel-text-shadow text-heading-xl">
              AGENT ROYALE
            </h1>
            <Trophy className="h-10 w-10 md:h-16 md:w-16 text-[#78c4f7] animate-bounce-slow" />
          </div>
          <p className="text-2xl md:text-3xl font-pixelify px-4 py-1 inline-block pixel-text-shadow rounded-md text-heading-sm text-[#78c4f7]">
            Watch your AI agent compete in real-time
          </p>
        </div>
      </div>

      {/* Main content area */}
      <div className="container mx-auto px-4 pb-8 relative z-0">
        {/* Trading graph - floating card with shadow */}
        <div className="mb-8 floating-card shadow-lg relative z-0">
          <div className="p-4" style={{ minHeight: "400px" }}>
            <TradingGraph singlePlayerMode={true} />
          </div>
        </div>

        {/* Progress section */}
        <div className="mb-8 relative z-0">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-pixelify text-[#d94d8a] pixel-text-shadow text-heading-md">
              {!tournamentComplete ? "TOURNAMENT IN PROGRESS" : "TOURNAMENT COMPLETED"}
            </h2>
            <span className="text-2xl font-pixelify text-white pixel-text-shadow text-heading-md">
              {Math.floor(progress)}%
            </span>
          </div>
          <PixelatedProgressBar progress={progress} />
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 relative z-0">
          <StatCard title="Trades" value={tradeCount} prefix="" color="#78c4f7" />
          <StatCard title="Your Earnings" value={playerScore} prefix="$" color="#d94d8a" />
          <StatCard
            title="Time Remaining"
            value={formatTime(timeRemaining)}
            isTime={true}
            color="#ffcc5c"
            icon={<Clock className="h-5 w-5 inline-block mr-1" />}
          />
        </div>

        {/* Chat Box */}
        <div className="mb-8 relative z-0">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-pixelify text-[#d94d8a] pixel-text-shadow text-heading-md">AGENT CHAT</h2>
            <div className="flex items-center">
              <span className="text-lg font-pixelify bg-[#78c4f7] text-white px-3 py-1 rounded-md text-content-md">
                Active: {currentAgent.avatar} {currentAgent.name} ({currentAgent.type})
              </span>
              {currentAgent.performance < 0 && (
                <span className="ml-2 text-lg font-pixelify bg-[#d94d8a] text-white px-3 py-1 rounded-md flex items-center text-content-md">
                  <AlertTriangle className="h-4 w-4 mr-1" /> ROI: {currentAgent.performance.toFixed(1)}%
                </span>
              )}
            </div>
          </div>

          {/* Chat Messages Container */}
          <div className="floating-card mb-2 relative z-0">
            <div ref={chatContainerRef} className="h-48 overflow-y-auto p-4 font-pixelify text-md">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-3 ${msg.sender === "You" ? "text-right" : ""}`}>
                  <div
                    className={`inline-block px-4 py-3 rounded-md ${
                      msg.sender === "You"
                        ? "chat-message-user"
                        : msg.sender === "System"
                          ? "chat-message-system"
                          : "chat-message-agent"
                    }`}
                  >
                    <div className="font-bold text-md">{msg.sender}</div>
                    <div className="text-md">{msg.message}</div>
                    <div className="text-sm opacity-70 text-deep-blue">{msg.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="flex relative z-0">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Send instructions to your agent..."
              className="flex-grow p-3 font-pixelify text-md rounded-l-lg focus:outline-none border-4 border-[#0ea5e9] bg-[rgba(224,242,254,0.8)] text-[#082f49]"
            />
            <button
              onClick={handleSendMessage}
              className="landing-pink text-white px-5 rounded-r-lg hover:bg-[#e05e97] transition-colors border-y-4 border-r-4 border-[#0ea5e9]"
            >
              <Send className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Live ROI Leaderboard Section */}
        <div className="relative z-0">
          <h2 className="text-2xl font-pixelify text-[#d94d8a] mb-3 pixel-text-shadow text-heading-md">
            LIVE ROI LEADERBOARD
          </h2>

          {/* Leaderboard Table */}
          <div className="floating-card overflow-hidden transition-all duration-300 hover:shadow-lg">
            {/* Table Header */}
            <div className="grid grid-cols-5 leaderboard-header p-4">
              <div className="font-pixelify text-[#082f49] font-bold text-xl">Rank</div>
              <div className="font-pixelify text-[#082f49] font-bold text-xl">Player</div>
              <div className="font-pixelify text-[#082f49] font-bold text-xl">Agent</div>
              <div className="font-pixelify text-[#082f49] font-bold text-center text-xl">ROI</div>
              <div className="font-pixelify text-[#082f49] font-bold text-right text-xl">Earnings</div>
            </div>

            {/* Table Rows - All with light blue background */}
            {leaderboardData.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-5 p-4 border-b border-[#0ea5e9] items-center transition-all duration-200 cursor-pointer leaderboard-row ${
                  hoveredRow === index ? "leaderboard-row-hover" : "leaderboard-row-bg"
                } ${item.player === "You" ? "leaderboard-row-highlight" : ""}`}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => console.log(`Clicked on ${item.player}`)}
              >
                <div className="flex items-center">
                  <Medal
                    className={`h-7 w-7 mr-3 transition-transform duration-300 ${
                      hoveredRow === index ? "scale-125" : ""
                    }`}
                    style={{ color: item.medalColor }}
                  />
                </div>
                <div className="font-pixelify font-bold text-md text-[#082f49]">{item.player}</div>
                <div className="font-pixelify font-bold text-md text-[#082f49]">{item.agent}</div>
                <div className="font-pixelify font-bold text-center text-md">
                  <span className={item.roi >= 0 ? "text-green-600" : "text-red-600"}>
                    {item.roi >= 0 ? "+" : ""}
                    {item.roi}%
                  </span>
                </div>
                <div className="font-pixelify font-bold text-right text-md text-[#082f49]">
                  ${item.earnings.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

interface StatCardProps {
  title: string
  value: number | string
  prefix?: string
  isTime?: boolean
  color: string
  icon?: React.ReactNode
}

function StatCard({ title, value, prefix = "", isTime = false, color, icon }: StatCardProps) {
  return (
    <Card
      className="p-4 text-center shadow-md hover-card transition-all duration-300"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <h3 className="font-pixelify text-lg flex items-center justify-center" style={{ color }}>
        {icon && icon}
        {title}
      </h3>
      <p className="font-pixelify text-2xl font-bold mt-1 text-[#082f49]">
        {isTime ? (
          value
        ) : (
          <>
            {prefix}
            <AnimatedNumber value={typeof value === "number" ? value : 0} />
          </>
        )}
      </p>
    </Card>
  )
} 