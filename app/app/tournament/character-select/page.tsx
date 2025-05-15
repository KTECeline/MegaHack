"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Trophy, Check, BarChartIcon as ChartBar, Brain, Zap, Shield, X, Play, Edit } from "lucide-react"

// Character data with trading-focused details
const characters = [
  {
    id: 1,
    name: "QUANTUM KNIGHT",
    image: "/images/quantum-knight.png",
    color: "from-sky-500 to-sky-700",
    borderColor: "border-sky-600",
    bgColor: "bg-sky-500",
    description:
      "A powerful defender with quantum computing abilities. Specializes in defensive strategies and counter-attacks.",
    tradingCapabilities: {
      marketAnalysis: "Advanced pattern recognition using quantum algorithms",
      decisionMaking: "Conservative approach with high-probability setups",
      execution: "Precise entry and exit with minimal slippage",
      riskManagement: "Exceptional risk control with dynamic position sizing",
    },
  },
  {
    id: 2,
    name: "CYBER MAGE",
    image: "/images/cyber-mage.png",
    color: "from-pink-500 to-pink-700",
    borderColor: "border-pink-600",
    bgColor: "bg-pink-500",
    description: "A master of digital spells and market prediction. Excels at high-risk, high-reward strategies.",
    tradingCapabilities: {
      marketAnalysis: "Predictive modeling with sentiment analysis",
      decisionMaking: "Aggressive approach with calculated risk-taking",
      execution: "High-frequency trading capabilities",
      riskManagement: "Strategic hedging with advanced derivatives",
    },
  },
  {
    id: 3,
    name: "DATA NINJA",
    image: "/images/data-ninja.png",
    color: "from-green-500 to-green-700",
    borderColor: "border-green-600",
    bgColor: "bg-green-500",
    description:
      "Lightning-fast execution and pattern recognition. Specializes in arbitrage and swift market movements.",
    tradingCapabilities: {
      marketAnalysis: "Real-time data processing across multiple exchanges",
      decisionMaking: "Rapid adaptation to changing market conditions",
      execution: "Ultra-fast order execution for arbitrage opportunities",
      riskManagement: "Automated stop-loss and take-profit mechanisms",
    },
  },
  {
    id: 4,
    name: "PIXEL TRADER",
    image: "/images/pixel-trader.png",
    color: "from-yellow-500 to-yellow-700",
    borderColor: "border-yellow-600",
    bgColor: "bg-yellow-500",
    description:
      "A balanced trader with exceptional pattern recognition. Adapts to changing market conditions with ease.",
    tradingCapabilities: {
      marketAnalysis: "Technical analysis with multi-timeframe approach",
      decisionMaking: "Balanced strategy with trend-following bias",
      execution: "Efficient order routing and position building",
      riskManagement: "Portfolio diversification with correlation analysis",
    },
  },
]

export default function CharacterSelect() {
  const router = useRouter()
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [inputPrompt, setInputPrompt] = useState("")
  const [characterPrompts, setCharacterPrompts] = useState<{ [key: number]: string }>({})
  const [showPreview, setShowPreview] = useState(false)
  const [previewCharacter, setPreviewCharacter] = useState<number | null>(null)
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({})

  // Function to handle character selection
  const selectCharacter = (index: number) => {
    setSelectedCharacter(index)
    setConfirmed(false)
    // Reset any flipped cards when selecting a character
    setFlippedCards({})
  }

  // Function to confirm character selection and navigate to staking page
  const confirmSelection = () => {
    setConfirmed(true)
    // Navigate to staking page with selected character and prompt
    if (selectedCharacter !== null) {
      const characterData = {
        character: characters[selectedCharacter],
        prompt: characterPrompts[selectedCharacter] || "",
      }
      // Store character data in localStorage for the staking page
      localStorage.setItem("selectedCharacterData", JSON.stringify(characterData))
      // Navigate to staking page
      setTimeout(() => {
        router.push("/tournament/staking")
      }, 1000)
    }
  }

  // Function to open modal for a specific character
  const openPromptModal = (characterIndex: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the character selection
    setSelectedCharacter(characterIndex)
    setInputPrompt(characterPrompts[characterIndex] || "")
    setShowModal(true)
  }

  // Function to save the prompt
  const savePrompt = () => {
    if (selectedCharacter !== null) {
      setCharacterPrompts({
        ...characterPrompts,
        [selectedCharacter]: inputPrompt,
      })
    }
    setShowModal(false)
  }

  // Function to show preview
  const showAgentPreview = (characterIndex: number) => {
    setPreviewCharacter(characterIndex)
    setShowPreview(true)
  }

  // Function to close preview
  const closePreview = () => {
    setShowPreview(false)
    setPreviewCharacter(null)
  }

  // Function to toggle card flip
  const toggleCardFlip = (index: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the character selection
    setFlippedCards({
      ...flippedCards,
      [index]: !flippedCards[index],
    })
  }

  // Function to edit prompt from the green edit button
  const editPrompt = (characterIndex: number, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the character selection
    setSelectedCharacter(characterIndex)
    setInputPrompt(characterPrompts[characterIndex] || "")
    setShowModal(true)
  }

  return (
    <main className="min-h-screen bg-sky-300 font-pixel relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern z-[-1] opacity-30"></div>

      {/* Fixed Animated Pixel Blocks - will stay visible when scrolling */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Large slow-moving blocks */}
        <div className="absolute w-24 h-24 bg-sky-400 opacity-40 pixelated animate-float-slow left-[10%] top-[20%] border-2 border-sky-500"></div>
        <div className="absolute w-20 h-20 bg-pink-400 opacity-35 pixelated animate-float-slow-reverse right-[15%] top-[30%] border-2 border-pink-500"></div>
        <div className="absolute w-28 h-16 bg-yellow-400 opacity-30 pixelated animate-float-medium left-[20%] bottom-[25%] border-2 border-yellow-500"></div>

        {/* Medium blocks */}
        <div className="absolute w-16 h-16 bg-green-400 opacity-35 pixelated animate-float-medium-reverse right-[25%] bottom-[20%] border-2 border-green-500"></div>
        <div className="absolute w-20 h-12 bg-purple-400 opacity-40 pixelated animate-float-medium left-[30%] top-[40%] border-2 border-purple-500"></div>
        <div className="absolute w-14 h-14 bg-blue-400 opacity-35 pixelated animate-float-medium-reverse right-[35%] top-[60%] border-2 border-blue-500"></div>

        {/* Small faster blocks */}
        <div className="absolute w-10 h-10 bg-sky-300 opacity-45 pixelated animate-float-fast right-[40%] top-[15%] border-2 border-sky-400"></div>
        <div className="absolute w-8 h-12 bg-pink-300 opacity-40 pixelated animate-float-fast-reverse left-[35%] bottom-[30%] border-2 border-pink-400"></div>
        <div className="absolute w-12 h-8 bg-yellow-300 opacity-35 pixelated animate-float-fast right-[30%] bottom-[40%] border-2 border-yellow-400"></div>
        <div className="absolute w-9 h-9 bg-teal-300 opacity-40 pixelated animate-float-fast left-[15%] top-[60%] border-2 border-teal-400"></div>

        {/* Tiny blocks */}
        <div className="absolute w-6 h-6 bg-green-300 opacity-50 pixelated animate-float-fast left-[45%] top-[50%] border-2 border-green-400"></div>
        <div className="absolute w-7 h-5 bg-purple-300 opacity-45 pixelated animate-float-fast-reverse right-[45%] bottom-[10%] border-2 border-purple-400"></div>
        <div className="absolute w-5 h-7 bg-red-300 opacity-40 pixelated animate-float-fast left-[25%] top-[10%] border-2 border-red-400"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 border-b-4 border-sky-500 bg-sky-400 px-4 py-3 flex items-center">
        <Link
          href="/"
          className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 font-bold border-b-4 border-pink-700 hover:border-pink-800 transition-colors pixelated"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>BACK</span>
        </Link>

        <div className="flex items-center gap-4 mx-auto">
          <Trophy className="h-6 w-6 text-yellow-300" />
          <h1 className="text-xl text-white font-bold drop-shadow-[2px_2px_0px_#0ea5e9]">
            TOURNAMENT: MOMENTUM MASTERS
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <h2 className="text-4xl md:text-5xl text-center text-white font-bold mb-12 drop-shadow-[3px_3px_0px_#0284c7]">
          SELECT YOUR AGENT
        </h2>

        {/* Character Selection Grid - 2 per row */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {characters.map((character, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-72 h-96 md:w-80 md:h-96 perspective-1000 cursor-pointer group ${
                    selectedCharacter === index ? "scale-105" : ""
                  }`}
                  onClick={() => selectCharacter(index)}
                >
                  {/* Character Box Container */}
                  <div className="relative w-full h-full">
                    {/* Shadow Box - Positioned behind and slightly to bottom right */}
                    <div className="absolute w-full h-full bg-black/40 transform translate-x-2 translate-y-2 pixelated"></div>

                    {/* Flip Card Container */}
                    <div
                      className={`absolute inset-0 transition-transform duration-700 transform-style-preserve-3d ${
                        flippedCards[index] ? "rotate-y-180" : ""
                      }`}
                    >
                      {/* Front Face */}
                      <div className="absolute w-full h-full backface-hidden">
                        <div
                          className={`w-full h-full ${character.bgColor} pixelated border-4 ${character.borderColor} flex flex-col items-center justify-center p-4`}
                        >
                          {/* Character Image with Border */}
                          <div className="w-4/5 h-3/5 border-4 border-white/30 bg-black/20 rounded-lg flex items-center justify-center overflow-hidden">
                            <img
                              src={character.image || "/placeholder.svg"}
                              alt={character.name}
                              className="w-4/5 h-4/5 object-contain pixelated"
                            />
                          </div>

                          {/* Character Name - Now clickable to flip card */}
                          <button
                            onClick={(e) => toggleCardFlip(index, e)}
                            className="mt-6 text-white font-bold text-xl text-center hover:underline flex items-center gap-1"
                          >
                            {character.name}
                            <span className="text-xs bg-white/20 px-1 rounded">info</span>
                          </button>

                          {/* Replace Stake Amount with Add Input Prompt Button */}
                          <button
                            onClick={(e) => openPromptModal(index, e)}
                            className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded-lg border-b-2 border-yellow-600 flex items-center gap-1"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="text-sm">Add Input Prompt/Market Bias</span>
                          </button>

                          {/* Preview Button - Only show if a prompt has been added */}
                          {characterPrompts[index] && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                showAgentPreview(index)
                              }}
                              className="mt-2 bg-green-400 hover:bg-green-500 text-black px-3 py-1 rounded-lg border-b-2 border-green-600 flex items-center gap-1"
                            >
                              <Play className="h-4 w-4" />
                              <span className="text-sm">Preview Agent</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Back Face */}
                      <div className="absolute w-full h-full backface-hidden rotate-y-180">
                        <div
                          className={`w-full h-full bg-gradient-to-br ${character.color} pixelated border-4 ${character.borderColor} p-4 flex flex-col overflow-hidden`}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-bold text-white">{character.name}</h3>
                            <button
                              onClick={(e) => toggleCardFlip(index, e)}
                              className="bg-white/20 hover:bg-white/30 text-white text-xs px-2 py-1 rounded"
                            >
                              Back
                            </button>
                          </div>

                          <div className="bg-black/20 p-2 rounded-lg mb-3 flex-shrink-0 overflow-auto max-h-24">
                            <p className="text-white text-xs">{character.description}</p>
                          </div>

                          {/* Trading Capabilities */}
                          <div className="space-y-2 mt-auto overflow-auto">
                            <div className="flex items-start gap-1">
                              <ChartBar className="h-4 w-4 text-yellow-300 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="text-white text-xs font-bold block">Market Analysis:</span>
                                <p className="text-white text-xs">{character.tradingCapabilities.marketAnalysis}</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-1">
                              <Brain className="h-4 w-4 text-yellow-300 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="text-white text-xs font-bold block">Decision Making:</span>
                                <p className="text-white text-xs">{character.tradingCapabilities.decisionMaking}</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-1">
                              <Zap className="h-4 w-4 text-yellow-300 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="text-white text-xs font-bold block">Execution:</span>
                                <p className="text-white text-xs">{character.tradingCapabilities.execution}</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-1">
                              <Shield className="h-4 w-4 text-yellow-300 flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="text-white text-xs font-bold block">Risk Management:</span>
                                <p className="text-white text-xs">{character.tradingCapabilities.riskManagement}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Selection indicator - Changed back to checkmark */}
                    {selectedCharacter === index && (
                      <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-400 rounded-full border-2 border-yellow-600 flex items-center justify-center z-20">
                        <Check className="h-6 w-6 text-black" />
                      </div>
                    )}

                    {/* Prompt indicator - Show if a prompt has been added - Now clickable to edit prompt */}
                    {characterPrompts[index] && (
                      <div
                        className="absolute -bottom-3 -right-3 w-10 h-10 bg-green-400 rounded-full border-2 border-green-600 flex items-center justify-center z-20 cursor-pointer hover:bg-green-500 transition-colors"
                        onClick={(e) => editPrompt(index, e)}
                      >
                        <Edit className="h-5 w-5 text-black" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmation Button - Only visible when a character is selected */}
        {selectedCharacter !== null && (
          <div className="flex justify-center mt-8">
            <button
              onClick={confirmSelection}
              disabled={!characterPrompts[selectedCharacter!] || confirmed}
              className={`bg-pink-500 hover:bg-pink-600 text-white text-xl md:text-2xl px-12 py-4 font-bold border-b-4 border-pink-700 hover:border-pink-800 transition-all pixelated transform ${
                confirmed ? "scale-110 bg-green-500 hover:bg-green-600 border-green-700 hover:border-green-800" : ""
              } ${!characterPrompts[selectedCharacter!] ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {confirmed ? (
                <span className="flex items-center gap-2">
                  <Check className="h-6 w-6" /> CONFIRMED!
                </span>
              ) : (
                "CONFIRM SELECTION"
              )}
            </button>
          </div>
        )}

        {/* Prompt requirement notice */}
        {selectedCharacter !== null && !characterPrompts[selectedCharacter] && (
          <p className="text-center text-yellow-200 mt-2 bg-black/20 max-w-md mx-auto p-2 rounded-lg">
            Please add an input prompt for your agent before confirming
          </p>
        )}

        {/* Tournament Info */}
        <div className="mt-16 max-w-2xl mx-auto bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6">
          <h3 className="text-2xl text-white font-bold mb-4 text-center drop-shadow-[2px_2px_0px_#0ea5e9]">
            TOURNAMENT DETAILS
          </h3>

          <div className="space-y-4 text-white">
            <div className="flex items-center gap-3 bg-sky-500/50 p-3 rounded-lg">
              <Trophy className="h-6 w-6 text-yellow-300 flex-shrink-0" />
              <div>
                <p className="font-bold">Prize Pool: 50,000 SOL</p>
                <p className="text-sm">Top 3 agents share the rewards</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-sky-500/50 p-3 rounded-lg">
              <Zap className="h-6 w-6 text-yellow-300 flex-shrink-0" />
              <div>
                <p className="font-bold">Duration: 7 Days</p>
                <p className="text-sm">Starts: May 10, 2025 - Ends: May 17, 2025</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-sky-500/50 p-3 rounded-lg">
              <Shield className="h-6 w-6 text-yellow-300 flex-shrink-0" />
              <div>
                <p className="font-bold">Entry Fee: 0.05 SOL</p>
                <p className="text-sm">Stake to join the competition</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 relative">
                <div className="absolute w-full h-full bg-yellow-400 transform rotate-3d(1, 1, 1, 45deg) pixelated"></div>
                <div className="absolute w-full h-full bg-yellow-500 transform translate-x-1 translate-y-1 rotate-3d(1, 1, 1, 45deg) pixelated -z-10"></div>
              </div>
              <h2 className="text-xl font-bold tracking-wide">AGENT ROYALE</h2>
            </div>

            <p className="text-gray-400 text-sm text-center">© 2025 AGENT ROYALE. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>

      {/* Input Prompt Modal */}
      {showModal && selectedCharacter !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-sky-400 border-4 border-sky-500 rounded-lg p-6 max-w-2xl w-full pixelated">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Input Prompt for {characters[selectedCharacter].name}</h3>
              <button onClick={() => setShowModal(false)} className="bg-pink-500 hover:bg-pink-600 p-1 rounded-full">
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-white text-sm mb-2">
                Enter your market bias or trading strategy prompt. This will guide how your agent behaves during the
                tournament.
              </p>
              <textarea
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                className="w-full h-40 p-3 bg-sky-100 border-2 border-sky-500 rounded-lg font-mono text-sm"
                placeholder="Example: Focus on momentum trading with tight stop losses. Look for breakouts above key resistance levels and prioritize risk management with a maximum 2% risk per trade."
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg border-b-2 border-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={savePrompt}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg border-b-2 border-green-700"
              >
                Save Prompt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Agent Preview Modal */}
      {showPreview && previewCharacter !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-sky-400 border-4 border-sky-500 rounded-lg p-6 max-w-4xl w-full pixelated">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{characters[previewCharacter].name} Preview</h3>
              <button onClick={closePreview} className="bg-pink-500 hover:bg-pink-600 p-1 rounded-full">
                <X className="h-5 w-5 text-white" />
              </button>
            </div>

            <div className="bg-sky-300 border-2 border-sky-500 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-16 h-16 flex-shrink-0">
                  <img
                    src={characters[previewCharacter].image || "/placeholder.svg"}
                    alt={characters[previewCharacter].name}
                    className="w-full h-full object-contain pixelated"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">{characters[previewCharacter].name}</h4>
                  <p className="text-sm text-white/80">Your Input Prompt:</p>
                  <p className="text-xs bg-black/20 p-2 rounded-lg text-white">{characterPrompts[previewCharacter]}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border-2 border-gray-700 rounded-lg p-4 mb-6 h-64 overflow-y-auto">
              <h4 className="text-green-400 font-mono text-sm mb-2">// Agent Simulation Preview</h4>
              <div className="font-mono text-xs text-white space-y-2">
                <p>
                  {">"} Initializing {characters[previewCharacter].name} with custom parameters...
                </p>
                <p>{">"} Analyzing market conditions...</p>
                <p>{">"} Applying trading strategy based on input prompt...</p>
                <p>{">"} Running simulation...</p>
                <p className="text-yellow-300">
                  {">"} Agent would prioritize{" "}
                  {characters[previewCharacter].tradingCapabilities.marketAnalysis.toLowerCase()}
                </p>
                <p className="text-yellow-300">
                  {">"} Decision making style:{" "}
                  {characters[previewCharacter].tradingCapabilities.decisionMaking.toLowerCase()}
                </p>
                <p className="text-yellow-300">
                  {">"} Execution method: {characters[previewCharacter].tradingCapabilities.execution.toLowerCase()}
                </p>
                <p className="text-yellow-300">
                  {">"} Risk management approach:{" "}
                  {characters[previewCharacter].tradingCapabilities.riskManagement.toLowerCase()}
                </p>
                <p className="text-green-400">
                  {">"} Custom bias applied: {characterPrompts[previewCharacter].substring(0, 100)}...
                </p>
                <p>{">"} Simulation complete. Agent ready for tournament deployment.</p>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={closePreview}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg border-b-2 border-gray-700"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  closePreview()
                  selectCharacter(previewCharacter)
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg border-b-2 border-green-700 flex items-center gap-2"
              >
                <Check className="h-5 w-5" />
                Select This Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
