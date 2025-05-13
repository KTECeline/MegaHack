import type { ReactNode } from "react"

interface AgentTooltipProps {
  isVisible: boolean
  children: ReactNode
}

export function AgentTooltip({ isVisible, children }: AgentTooltipProps) {
  if (!isVisible) return null

  return (
    <div className="fixed transform -translate-x-1/2 left-1/2 top-1/2 -translate-y-1/2 z-[9999] w-64 md:w-80">
      <div className="rounded-xl border-4 border-[#ffcc5c] bg-white p-4 shadow-lg">
        <div className="text-sm md:text-base">{children}</div>
      </div>
    </div>
  )
}
