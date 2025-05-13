"use client"

import { useState, useEffect } from "react"

interface AnimatedTimeProps {
  value: string
}

export default function AnimatedTime({ value }: AnimatedTimeProps) {
  const [displayValue, setDisplayValue] = useState(value)

  // Split the time into minutes and seconds
  const [minutes, seconds] = value.split(":").map((part) => Number.parseInt(part, 10))

  // Calculate total seconds for animation
  const totalSeconds = minutes * 60 + seconds

  useEffect(() => {
    // Animate the time change
    setDisplayValue(value)

    // Add a subtle flash effect when the value changes
    const element = document.getElementById("time-display")
    if (element) {
      element.classList.add("text-flash")
      setTimeout(() => {
        element.classList.remove("text-flash")
      }, 300)
    }
  }, [value])

  return (
    <span id="time-display" className="transition-colors duration-300">
      {displayValue}
    </span>
  )
}
