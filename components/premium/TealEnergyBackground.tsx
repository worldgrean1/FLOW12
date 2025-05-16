"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function TealEnergyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Grid parameters
    const gridSize = 80 // Larger grid size for the sparse star-like effect
    const pointSize = 1.5

    // Animation parameters
    let animationFrame: number
    let time = 0

    // Draw the teal energy background
    const draw = () => {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create deep teal background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8,
      )
      gradient.addColorStop(0, "#003a40") // Slightly lighter teal at center
      gradient.addColorStop(1, "#001a20") // Darker teal/blue at edges

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw star-like points
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          // Add some randomness to positions for natural star effect
          const offsetX = (Math.random() - 0.5) * gridSize * 0.8
          const offsetY = (Math.random() - 0.5) * gridSize * 0.8

          const posX = x + offsetX
          const posY = y + offsetY

          // Only draw some points (sparse effect)
          if (Math.random() > 0.6) {
            const distanceToCenter = Math.sqrt(
              Math.pow((posX - canvas.width / 2) / canvas.width, 2) +
                Math.pow((posY - canvas.height / 2) / canvas.height, 2),
            )

            // Animate point size based on time
            const animatedSize =
              pointSize * (0.3 + 0.7 * Math.sin(time * 0.2 + distanceToCenter * 5)) * (1 - distanceToCenter * 0.5)

            if (animatedSize > 0.1) {
              // Create a glow effect for the stars
              const glow = ctx.createRadialGradient(posX, posY, 0, posX, posY, animatedSize * 3)
              glow.addColorStop(0, `rgba(0, 255, 200, ${0.3 + 0.4 * Math.sin(time + distanceToCenter * 10)})`)
              glow.addColorStop(1, "rgba(0, 255, 200, 0)")

              ctx.beginPath()
              ctx.fillStyle = glow
              ctx.arc(posX, posY, animatedSize * 3, 0, Math.PI * 2)
              ctx.fill()

              // Draw the star point
              ctx.beginPath()
              ctx.fillStyle = `rgba(0, 255, 200, ${0.5 + 0.5 * Math.sin(time + distanceToCenter * 10)})`
              ctx.arc(posX, posY, animatedSize, 0, Math.PI * 2)
              ctx.fill()
            }
          }
        }
      }

      // Update time
      time += 0.01

      // Continue animation
      animationFrame = requestAnimationFrame(draw)
    }

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    // Initialize canvas and start animation
    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Start animation
    draw()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Canvas for animated background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Add floating energy particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-teal-400/30"
          style={{
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
            filter: "blur(1px)",
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* Add subtle glow effects in key areas */}
      <div
        className="absolute w-1/3 h-1/3 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(0,255,200,0.3) 0%, rgba(0,255,200,0) 70%)",
          top: "60%",
          right: "30%",
          filter: "blur(40px)",
        }}
      />

      <div
        className="absolute w-1/4 h-1/4 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, rgba(0,255,200,0.4) 0%, rgba(0,255,200,0) 70%)",
          top: "20%",
          left: "20%",
          filter: "blur(50px)",
        }}
      />
    </div>
  )
}
