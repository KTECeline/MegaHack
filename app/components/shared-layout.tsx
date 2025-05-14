"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

interface SharedLayoutProps {
  children: React.ReactNode
}

export function SharedLayout({ children }: SharedLayoutProps) {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-sky-300 font-pixel relative">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern z-[-1] opacity-30"></div>

      {/* Header */}
      <header className="relative z-20 border-b-4 border-sky-500 bg-sky-400 px-4 py-3 flex items-center justify-between">
        <nav className="flex gap-2 md:gap-4">
          {[
            { label: "HOW IT WORKS", href: "/#how-it-works", width: "min-w-[120px]" },
            {
              label: (
                <>
                  JOIN
                  <br />
                  ARENA
                </>
              ),
              href: "/#tournaments",
              width: "min-w-[100px]",
            },
            { label: "LEADERBOARD", href: "/leaderboard", width: "min-w-[120px]" },
          ].map((item) => (
            <Link
              key={typeof item.label === 'string' ? item.label : 'JOIN ARENA'}
              href={item.href}
              className={`bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 font-bold border-b-4 border-pink-700 hover:border-pink-800 transition-colors pixelated text-center flex items-center justify-center ${item.width}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-8 flex gap-3">
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 font-bold border-b-4 border-yellow-600 hover:border-yellow-700 transition-colors pixelated">
            CONNECT WALLET
          </button>
          <button
            onClick={() => router.push("/profile")}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 font-bold border-b-4 border-yellow-600 hover:border-yellow-700 transition-colors pixelated flex items-center justify-center"
          >
            PROFILE
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>

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