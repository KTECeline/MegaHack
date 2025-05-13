"use client"

import { useEffect, useRef } from "react"

interface TradingGraphProps {
  singlePlayerMode?: boolean
}

export default function TradingGraph({ singlePlayerMode = false }: TradingGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dataRef = useRef<number[]>([])
  const maxPoints = 50

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Initialize data
    if (dataRef.current.length === 0) {
      dataRef.current = Array(maxPoints).fill(1000)
    }

    // Animation function
    const animate = () => {
      // Update data
      const lastValue = dataRef.current[dataRef.current.length - 1]
      const newValue = Math.max(500, lastValue + (Math.random() * 100 - 50))
      dataRef.current = [...dataRef.current.slice(1), newValue]

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set canvas size
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      // Draw grid
      ctx.strokeStyle = "rgba(0, 0, 0, 0.1)"
      ctx.lineWidth = 1
      for (let i = 0; i < canvas.height; i += 30) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Draw line
      ctx.beginPath()
      ctx.strokeStyle = "#d94d8a"
      ctx.lineWidth = 2

      const xStep = canvas.width / (maxPoints - 1)
      const yScale = canvas.height / 2000 // Scale to fit values between 500-1500

      dataRef.current.forEach((value, index) => {
        const x = index * xStep
        const y = canvas.height - (value - 500) * yScale

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Draw gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(217, 77, 138, 0.2)") // #d94d8a with opacity
      gradient.addColorStop(1, "rgba(217, 77, 138, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.moveTo(0, canvas.height)
      dataRef.current.forEach((value, index) => {
        const x = index * xStep
        const y = canvas.height - (value - 500) * yScale
        ctx.lineTo(x, y)
      })
      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()
      ctx.fill()

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      // No cleanup needed for canvas
    }
  }, [singlePlayerMode])

  return (
    <div className="h-full w-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: "rgba(224, 242, 254, 0.8)" }}
      />
    </div>
  )
}
