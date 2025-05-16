"use client"

import { useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"

export default function PremiumBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const timeRef = useRef(0)
  const scanlineRef = useRef(0)

  // Memoize static values
  const gridConfig = useMemo(() => ({
    size: 60,
    lineWidth: 0.5,
    pointSize: 1.5,
    flowPaths: [] // Remove flow paths as they're now handled by SVG
  }), [])

  // Memoize ambient particle configurations
  const ambientParticles = useMemo(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      width: 3 + (i % 4),
      height: 3 + (i % 4),
      x: 20 + (i * 5),
      y: 20 + (i * 5),
      targetX: 20 + ((i + 4) * 5),
      targetY: 20 + ((i + 4) * 5),
      duration: 8 + (i % 4),
    }))
  , [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { size: gridSize, lineWidth, pointSize } = gridConfig

    const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      ctx.strokeStyle = "rgba(16, 185, 129, 0.05)"
      ctx.lineWidth = lineWidth

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const drawPoints = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number) => {
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const distanceToCenter = Math.sqrt(
            Math.pow((x - canvas.width / 2) / canvas.width, 2) +
            Math.pow((y - canvas.height / 2) / canvas.height, 2)
          )

          if (distanceToCenter < 0.7) {
            const animatedSize =
              pointSize * (0.5 + 0.7 * Math.sin(time * 0.3 + distanceToCenter * 3)) * (1 - distanceToCenter * 0.7)

            let pointOpacity = 0.1 + 0.2 * (1 - distanceToCenter)

            if (animatedSize > 0.1) {
              const pointGradient = ctx.createRadialGradient(x, y, 0, x, y, animatedSize * 2)
              pointGradient.addColorStop(0, `rgba(16, 185, 129, ${pointOpacity})`)
              pointGradient.addColorStop(1, "rgba(16, 185, 129, 0)")

              ctx.beginPath()
              ctx.fillStyle = pointGradient
              ctx.arc(x, y, animatedSize, 0, Math.PI * 2)
              ctx.fill()
            }
          }
        }
      }
    }

    const draw = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create subtle background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.8
      )
      gradient.addColorStop(0, "rgba(15, 23, 42, 0.8)")
      gradient.addColorStop(1, "rgba(15, 23, 42, 1)")
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawGrid(ctx, canvas)
      drawPoints(ctx, canvas, timeRef.current)

      timeRef.current += 0.016
      scanlineRef.current = (scanlineRef.current + 1) % canvas.height
      animationRef.current = requestAnimationFrame(draw)
    }

    const setCanvasDimensions = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)
    draw()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gridConfig])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />
      <div className="absolute inset-0 pointer-events-none">
        {ambientParticles.map((particle, i) => (
          <motion.div
            key={`ambient-particle-${i}`}
            className="absolute rounded-full bg-teal-400/40"
            style={{
              width: particle.width,
              height: particle.height,
              filter: "blur(1px)",
              x: `${particle.x}%`,
              y: `${particle.y}%`,
            }}
            animate={{
              x: `${particle.targetX}%`,
              y: `${particle.targetY}%`,
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.2) 100%)",
        }}
      />
    </div>
  )
}
