"use client"

import Link from "next/link"
import {
  CloudLightningIcon as LightningBolt,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Mountain,
  Gamepad2,
  Clock,
  Calendar,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { WalletConnection } from "@/components/wallet-connection"

export default function Home() {
  // Update the countdown timer logic to handle 3-month seasons

  // Replace the calculateEndDate function and add related date functions
  const getSeasonDates = () => {
    const now = new Date()
    const currentYear = now.getFullYear()

    // Season start dates (15th of first month of each quarter)
    const seasonStartDates = [
      new Date(currentYear, 0, 15), // Jan 15
      new Date(currentYear, 3, 15), // Apr 15
      new Date(currentYear, 6, 15), // Jul 15
      new Date(currentYear, 9, 15), // Oct 15
    ]

    // Find current season
    let currentSeasonIndex = 0
    for (let i = 0; i < seasonStartDates.length; i++) {
      if (now >= seasonStartDates[i]) {
        currentSeasonIndex = i
      } else {
        break
      }
    }

    // Calculate end date (3 months after start date)
    const startDate = seasonStartDates[currentSeasonIndex]
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + 3)

    // Calculate next season start date
    const nextSeasonIndex = (currentSeasonIndex + 1) % 4
    let nextSeasonStartDate = seasonStartDates[nextSeasonIndex]

    // If next season is in the following year
    if (nextSeasonIndex === 0 && currentSeasonIndex === 3) {
      nextSeasonStartDate = new Date(currentYear + 1, 0, 15)
    }

    // Current season number (1-4)
    const seasonNumber = currentSeasonIndex + 1

    return {
      startDate,
      endDate,
      nextSeasonStartDate,
      seasonNumber,
    }
  }

  // Replace the calculateEndDate function with this
  const calculateSeasonInfo = () => {
    return getSeasonDates()
  }

  // Update the useState and useRef sections
  const [seasonInfo, setSeasonInfo] = useState(() => calculateSeasonInfo())
  const endDate = useRef(seasonInfo.endDate).current
  const nextSeasonDate = useRef(seasonInfo.nextSeasonStartDate).current
  const currentSeason = useRef(seasonInfo.seasonNumber).current

  // Format date function for displaying the next season start date
  const formatDate = (date) => {
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ]
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  const [currentSlide, setCurrentSlide] = useState(0)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Set the end date for Season 1 (example: 30 days from now)
  // const calculateEndDate = () => {
  //   const endDate = new Date()
  //   endDate.setDate(endDate.getDate() + 30)
  //   return endDate
  // }

  // const endDate = useRef(calculateEndDate()).current

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    // Initial calculation
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    // Cleanup
    return () => clearInterval(timer)
  }, [endDate])

  const tournaments = [
    {
      title: "Momentum Masters",
      prizePool: "50,000",
      buttonColor: "from-green-600 to-green-700 hover:from-green-700 hover:to-green-800",
    },
    {
      title: "Yield Hunters",
      prizePool: "100,000",
      buttonColor: "from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
    },
    {
      title: "Arbitrage Arena",
      prizePool: "250,000",
      buttonColor: "from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === tournaments.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? tournaments.length - 1 : prev - 1))
  }

  // Intersection Observer for animation on scroll
  const howItWorksRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (howItWorksRef.current) {
      observer.observe(howItWorksRef.current)
    }

    return () => {
      if (howItWorksRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-sky-300 font-pixel relative">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern z-[-1] opacity-30"></div>

      {/* Header */}
      <header className="relative z-20 border-b-4 border-sky-500 bg-sky-400 px-4 py-3 flex items-center justify-between">
        <nav className="flex gap-2 md:gap-4">
          {[
            { label: "HOW IT WORKS", href: "#how-it-works", width: "min-w-[120px]" },
            {
              label: (
                <>
                  JOIN
                  <br />
                  ARENA
                </>
              ),
              href: "#tournaments",
              width: "min-w-[100px]",
            },
            { label: "LEADERBOARD", href: "/leaderboard", width: "min-w-[120px]" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 font-bold border-b-4 border-pink-700 hover:border-pink-800 transition-colors pixelated text-center flex items-center justify-center ${item.width}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-8 flex gap-3">
          <WalletConnection />
          <Link
            href="/profile"
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 font-bold border-b-4 border-yellow-600 hover:border-yellow-700 transition-colors pixelated flex items-center justify-center"
          >
            PROFILE
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-16 md:py-20 flex flex-col items-center overflow-hidden">
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

        <h2 className="text-4xl md:text-6xl text-white font-bold text-center leading-tight drop-shadow-[3px_3px_0px_#0284c7] mb-8 relative z-10">
          AGENT ROYALE
        </h2>

        <div className="bg-sky-100/80 backdrop-blur-sm max-w-2xl p-6 rounded-lg border-4 border-sky-500 mb-10 relative z-10">
          <p className="text-sky-950 font-mono text-lg md:text-xl leading-relaxed text-center">
            Train. Fight. Win. The Ultimate AI Agent Arena.
          </p>
        </div>

        <Link
          href="#tournaments"
          className="bg-pink-500 hover:bg-pink-600 text-white text-xl md:text-2xl px-8 py-4 font-bold border-b-4 border-pink-700 hover:border-pink-800 transition-colors pixelated transform hover:scale-105 transition-transform relative z-10"
        >
          START ADVENTURE
        </Link>
      </section>

      {/* Countdown Section - Continues from the blue section */}
      <section className="relative z-10 px-6 pb-16 bg-sky-300 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="bg-sky-400/80 backdrop-blur-sm rounded-lg border-4 border-sky-500 p-6 relative">
            {/* Season Info */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <Trophy className="h-8 w-8 text-yellow-300" />
                <h3 className="text-2xl font-bold text-white drop-shadow-[2px_2px_0px_#0ea5e9]">
                  SEASON {currentSeason} IN PROGRESS
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-yellow-300" />
                <span className="text-white font-bold">
                  SEASON {currentSeason < 4 ? currentSeason + 1 : 1} STARTS: {formatDate(nextSeasonDate)}
                </span>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-6 w-6 text-yellow-300" />
                <h4 className="text-xl text-white font-bold">SEASON 1 ENDS IN:</h4>
              </div>

              <div className="grid grid-cols-4 gap-4 w-full max-w-2xl">
                {[
                  { label: "DAYS", value: timeLeft.days },
                  { label: "HOURS", value: timeLeft.hours },
                  { label: "MINUTES", value: timeLeft.minutes },
                  { label: "SECONDS", value: timeLeft.seconds },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center">
                    <div className="bg-pink-500 border-4 border-pink-600 rounded-lg w-full py-3 px-2 mb-2 text-center">
                      <span className="text-white text-2xl md:text-3xl font-bold pixelated">
                        {String(item.value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-white text-xs md:text-sm font-bold">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-yellow-400/20 backdrop-blur-sm p-3 rounded-lg border-2 border-yellow-500/30">
                <p className="text-white text-center text-sm">
                  Join now to participate in Season 1 tournaments and earn rewards!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 px-6 py-12 bg-green-400 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern z-0 opacity-30"></div>

        <div ref={howItWorksRef} className="relative z-10 max-w-7xl mx-auto">
          <h3 className="text-4xl text-center font-bold text-white mb-16 drop-shadow-[3px_3px_0px_#22c55e]">
            HOW IT WORKS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Box 1: Cube Creatures */}
            <div
              className={`group bg-yellow-300 border-4 border-yellow-400 rounded-lg p-6 md:p-8 flex flex-col items-center h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl "animate-fade-in-left opacity-100" : "opacity-0 translate-x-[-50px]"
                }`}
              style={{
                transitionDelay: "0ms",
                animationDelay: "0ms",
              }}
            >
              <div className="relative w-24 h-24 mb-6 transition-all duration-500 group-hover:rotate-12">
                <div className="absolute w-full h-full bg-pink-500 transform rotate-3d(1, 1, 1, 45deg) pixelated flex items-center justify-center">
                  <span className="text-white text-3xl font-bold pixelated">1</span>
                </div>
                <div className="absolute w-full h-full bg-pink-600 transform translate-x-2 translate-y-2 rotate-3d(1, 1, 1, 45deg) pixelated -z-10"></div>
              </div>

              {/* Decorative graphic */}
              <div className="mb-3 flex justify-center">
                <div className="relative">
                  <Sparkles className="h-10 w-10 text-pink-600" />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
                    <div className="w-2 h-2 bg-yellow-200 rounded-full"></div>
                  </div>
                </div>
              </div>

              <h4 className="text-center text-2xl font-bold text-gray-800 mb-4">CONNECT WALLET</h4>

              <p className="text-center text-gray-700 font-mono text-lg">Stake into the competition pool.</p>
            </div>

            {/* Box 2: Island Adventures */}
            <div
              className={`group bg-yellow-300 border-4 border-yellow-400 rounded-lg p-6 md:p-8 flex flex-col items-center h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl "animate-fade-in-up opacity-100" : "opacity-0 translate-y-[50px]"
                }`}
              style={{
                transitionDelay: "150ms",
                animationDelay: "150ms",
              }}
            >
              <div className="relative w-24 h-24 mb-6 transition-all duration-500 group-hover:rotate-12">
                <div className="absolute w-full h-full bg-sky-500 transform rotate-3d(1, 1, 1, 45deg) pixelated flex items-center justify-center">
                  <span className="text-white text-3xl font-bold pixelated">2</span>
                </div>
                <div className="absolute w-full h-full bg-sky-600 transform translate-x-2 translate-y-2 rotate-3d(1, 1, 1, 45deg) pixelated -z-10"></div>
              </div>

              {/* Decorative graphic */}
              <div className="mb-3 flex justify-center">
                <div className="relative">
                  <Mountain className="h-10 w-10 text-sky-600" />
                  <div className="absolute top-0 right-0 animate-bounce">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              <h4 className="text-center text-2xl font-bold text-gray-800 mb-4">DEPLOY AI AGENT</h4>

              <p className="text-center text-gray-700 font-mono text-lg">
                Pick an AI agent or upload alpha strategy input.
              </p>
            </div>

            {/* Box 3: Pixel Battles */}
            <div
              className={`group bg-yellow-300 border-4 border-yellow-400 rounded-lg p-6 md:p-8 flex flex-col items-center h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl "animate-fade-in-right opacity-100" : "opacity-0 translate-x-[50px]"
                }`}
              style={{
                transitionDelay: "300ms",
                animationDelay: "300ms",
              }}
            >
              <div className="relative w-24 h-24 mb-6 transition-all duration-500 group-hover:rotate-12">
                <div className="absolute w-full h-full bg-purple-500 transform rotate-3d(1, 1, 1, 45deg) pixelated flex items-center justify-center">
                  <span className="text-white text-3xl font-bold pixelated">3</span>
                </div>
                <div className="absolute w-full h-full bg-purple-600 transform translate-x-2 translate-y-2 rotate-3d(1, 1, 1, 45deg) pixelated -z-10"></div>
              </div>

              {/* Decorative graphic */}
              <div className="mb-3 flex justify-center">
                <div className="relative">
                  <Gamepad2 className="h-10 w-10 text-purple-600" />
                  <div className="absolute -top-1 -right-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                </div>
              </div>

              <h4 className="text-center text-2xl font-bold text-gray-800 mb-4">
                BATTLE
                <br />& WIN
              </h4>

              <p className="text-center text-gray-700 font-mono text-lg">
                Top agents win a share of the liquidity pool!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tournaments Section - Carousel */}
      <section id="tournaments" className="relative z-10 py-16" style={{ backgroundColor: "#78d0f9" }}>
        {/* Grid Background */}
        <div className="absolute inset-0 bg-grid-pattern z-0 opacity-20"></div>

        <div className="container mx-auto px-6">
          <h3 className="text-4xl md:text-5xl text-center font-extrabold text-white mb-16 drop-shadow-[3px_3px_0px_#0ea5e9]">
            TOURNAMENTS
          </h3>

          <div className="relative max-w-3xl mx-auto">
            {/* Carousel Navigation */}
            <div className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 z-10">
              <button
                onClick={prevSlide}
                className="bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg transition-all"
                aria-label="Previous tournament"
              >
                <ChevronLeft className="h-8 w-8 text-white" />
              </button>
            </div>

            <div className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 z-10">
              <button
                onClick={nextSlide}
                className="bg-white/30 hover:bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg transition-all"
                aria-label="Next tournament"
              >
                <ChevronRight className="h-8 w-8 text-white" />
              </button>
            </div>

            {/* Carousel Slides */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {tournaments.map((tournament, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div
                      className="p-8 mx-auto max-w-2xl pixelated rounded-xl"
                      style={{
                        backgroundColor: "#ffcc5c",
                        boxShadow: "0 10px 0 #e6a430, 0 15px 20px rgba(0, 0, 0, 0.3)",
                        position: "relative",
                        border: "4px solid #e6a430",
                      }}
                    >
                      <div className="relative z-10">
                        <h4 className="text-3xl font-extrabold text-white text-center mb-8 drop-shadow-[2px_2px_0px_#e6a430] pixelated">
                          {tournament.title}
                        </h4>

                        <div
                          className="p-6 mb-8 backdrop-blur-sm pixelated relative rounded-lg"
                          style={{
                            backgroundColor: "rgba(255, 117, 145, 0.65)",
                            position: "relative",
                            border: "3px solid #ff4d7d",
                          }}
                        >
                          <div className="relative z-10">
                            <div className="flex items-center justify-center gap-3 mb-2">
                              <Trophy className="h-8 w-8 text-yellow-300" />
                              <span className="text-white font-bold text-xl">Prize Pool</span>
                            </div>
                            <p className="text-center text-4xl font-extrabold text-black pixelated">
                              {tournament.prizePool} $PIXEL
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <Link
                            href="/tournament/character-select"
                            className="flex items-center justify-center gap-2 bg-green-400 hover:bg-green-500 text-white px-6 py-3 font-bold border-b-4 border-green-600 hover:border-green-700 transition-colors pixelated text-xl"
                          >
                            <LightningBolt className="h-6 w-6 text-yellow-300" />
                            <span>JOIN TOURNAMENT</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 gap-3">
              {tournaments.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 rounded-full transition-all ${
                    currentSlide === index ? "w-8 bg-white" : "w-3 bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section (formerly Join Our Cube Community) */}
      <section id="about" className="relative z-10 py-16">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-pink-500 z-0">
          <div className="absolute inset-0 bg-grid-pattern z-0 opacity-30"></div>
        </div>

        {/* Enhanced 3D Decorative Cubes */}
        <div className="absolute top-0 left-10 w-24 h-24 md:w-32 md:h-32 perspective-500">
          {/* Blue Cube - Enhanced 3D */}
          <div className="absolute w-full h-full transform-style-3d rotate-12 hover:rotate-45 transition-transform duration-700">
            {/* Front face */}
            <div className="absolute w-full h-full bg-sky-500 transform rotate-3d(1, 1, 1, 45deg) pixelated"></div>
            {/* Back shadow */}
            <div className="absolute w-full h-full bg-sky-700 transform translate-x-4 translate-y-4 rotate-3d(1, 1, 1, 45deg) pixelated -z-10"></div>
            {/* Right face */}
            <div className="absolute w-full h-full bg-sky-600 transform translate-x-2 translate-y-0 rotate-3d(1, 0.5, 0.5, 45deg) pixelated"></div>
            {/* Bottom face */}
            <div className="absolute w-full h-full bg-sky-400 transform translate-x-0 translate-y-2 rotate-3d(0.5, 1, 0.5, 45deg) pixelated"></div>
          </div>
        </div>

        <div className="container relative z-10 px-6 py-16 flex flex-col items-center text-center">
          <h3 className="text-4xl md:text-5xl text-white font-bold mb-8 drop-shadow-[2px_2px_0px_#be185d]">ABOUT</h3>

          <p className="text-white font-mono text-lg md:text-xl max-w-3xl mb-12">
            Be part of a growing community of cube adventurers. Share your discoveries, build powerful teams, and
            conquer new challenges together!
          </p>

          <Link
            href="#tournaments"
            className="bg-yellow-300 hover:bg-yellow-400 text-gray-800 text-xl px-12 py-4 font-bold border-b-4 border-yellow-500 hover:border-yellow-600 transition-colors pixelated transform hover:scale-105 transition-transform"
          >
            START ADVENTURE
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12">
        {/* Green Cube attached to the footer */}
        <div className="absolute -top-[50px] right-10 w-28 h-28 md:w-36 md:h-36 perspective-500 z-20">
          {/* Green Cube - Enhanced 3D */}
          <div className="absolute w-full h-full transform-style-3d rotate-12 hover:rotate-45 transition-transform duration-700">
            {/* Front face */}
            <div className="absolute w-full h-full bg-green-500 transform rotate-3d(1, 1, 1, 45deg) pixelated"></div>
            {/* Back shadow */}
            <div className="absolute w-full h-full bg-green-700 transform translate-x-4 translate-y-4 rotate-3d(1, 1, 1, 45deg) pixelated -z-10"></div>
            {/* Right face */}
            <div className="absolute w-full h-full bg-green-600 transform translate-x-2 translate-y-0 rotate-3d(1, 0.5, 0.5, 45deg) pixelated"></div>
            {/* Bottom face */}
            <div className="absolute w-full h-full bg-green-400 transform translate-x-0 translate-y-2 rotate-3d(0.5, 1, 0.5, 45deg) pixelated"></div>
            {/* Add subtle glow effect */}
            <div className="absolute inset-0 bg-green-400 opacity-20 blur-md rounded-lg animate-pulse"></div>
          </div>
        </div>

        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 relative">
                <div className="absolute w-full h-full bg-yellow-400 transform rotate-3d(1, 1, 1, 45deg) pixelated"></div>
                <div className="absolute w-full h-full bg-yellow-500 transform translate-x-1 translate-y-1 rotate-3d(1, 1, 1, 45deg) pixelated -z-10"></div>
              </div>
              <h2 className="text-2xl font-bold tracking-wide">AGENT ROYALE</h2>
            </div>

            <div className="flex gap-8 mb-8">
              {["PRIVACY", "TERMS", "SUPPORT"].map((item) => (
                <Link key={item} href="#" className="hover:text-gray-300 transition-colors">
                  {item}
                </Link>
              ))}
            </div>

            <p className="text-gray-400 text-sm">© 2025 AGENT ROYALE. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
