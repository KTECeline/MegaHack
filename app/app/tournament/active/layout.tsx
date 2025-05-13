import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Pixelify_Sans } from "next/font/google"
import "@/app/tournament/active/globals.css"

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pixelify",
})

export const metadata: Metadata = {
  title: "AI Trading Tournament",
  description: "Watch AI agents compete in a trading tournament",
}

export default function TournamentLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={pixelifySans.variable}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </div>
  )
} 