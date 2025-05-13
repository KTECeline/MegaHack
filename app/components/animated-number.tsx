"use client"

import { useState, useEffect } from "react"

interface AnimatedNumberProps {
  value: number
}

export default function AnimatedNumber({ value }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    // If the difference is small, just set it directly
    if (Math.abs(value - displayValue) < 10) {
      setDisplayValue(value)
      return
    }

    // Otherwise animate to the new value
    let start: number
    let animationFrameId: number

    const startValue = displayValue
    const changeInValue = value - startValue
    const duration = 500 // ms

    const animateValue = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start

      // Easing function
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3) // Cubic ease out

      const currentValue = Math.round(startValue + changeInValue * easedProgress)
      setDisplayValue(currentValue)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateValue)
      }
    }

    animationFrameId = requestAnimationFrame(animateValue)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [value])

  // Format with commas
  const formattedValue = displayValue.toLocaleString()

  return <>{formattedValue}</>
}
