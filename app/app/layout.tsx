import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { SolanaProvider } from "@/components/solana-provider"

export const metadata: Metadata = {
  title: "Pixel Realm - Adventure in the Pixel World",
  description: "Explore a vibrant pixel universe filled with challenges, treasures, and epic quests.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <SolanaProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </SolanaProvider>
      </body>
    </html>
  )
}