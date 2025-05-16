"use client"

import { useEffect, useRef, useMemo, useCallback } from "react"
import { motion } from "framer-motion"

interface PowerFlowAnimationProps {
  inverterOn: boolean
  switchOn: boolean
  bulbOn: boolean
  wordIlluminated: boolean
  animationPhase: number
  inverterPosition: { x: number; y: number }
  switchPosition: { x: number; y: number }
  bulbPosition: { x: number; y: number }
  wordPosition: { x: number; y: number }
  scale?: number
}

export default function PowerFlowAnimation({
  inverterOn,
  switchOn,
  bulbOn,
  wordIlluminated,
  animationPhase,
  inverterPosition,
  switchPosition,
  bulbPosition,
  wordPosition,
  scale = 1,
}: PowerFlowAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const particlesRef = useRef<{ x: number; y: number; progress: number; speed: number }[]>([])

  // Memoize configuration values
  const config = useMemo(() => ({
    lineWidth: 3 * scale,
    particleSize: 4 * scale,
    connectionPointRadius: 6 * scale,
    particleCount: Math.floor(20 * scale), // Reduced particle count
    maxParticles: Math.floor(30 * scale), // Maximum particles per connection
  }), [scale])

  // Initialize particles
  const initializeParticles = useCallback(() => {
    particlesRef.current = []
    const { particleCount } = config

    // Create particles for each active connection
    if (inverterOn) {
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: inverterPosition.x,
          y: inverterPosition.y,
          progress: Math.random(),
          speed: 0.5 + Math.random() * 0.5,
        })
      }
    }
  }, [inverterOn, inverterPosition, config])

  // Draw functions
  const drawConnections = useCallback((ctx: CanvasRenderingContext2D) => {
    const { lineWidth, connectionPointRadius } = config

    // Draw connection lines
    if (inverterOn) {
      ctx.beginPath()
      ctx.moveTo(inverterPosition.x, inverterPosition.y)
      ctx.lineTo(switchPosition.x, switchPosition.y)
      ctx.strokeStyle = "rgba(74, 222, 128, 0.3)"
      ctx.lineWidth = lineWidth
      ctx.stroke()

      if (switchOn) {
        ctx.beginPath()
        ctx.moveTo(switchPosition.x, switchPosition.y)
        ctx.lineTo(bulbPosition.x, bulbPosition.y)
        ctx.stroke()
      }

      if (bulbOn) {
        ctx.beginPath()
        ctx.moveTo(bulbPosition.x, bulbPosition.y)
        ctx.lineTo(wordPosition.x, wordPosition.y)
        ctx.stroke()
      }
    }

    // Draw connection points
    const points = [
      { pos: inverterPosition, active: inverterOn },
      { pos: switchPosition, active: inverterOn && switchOn },
      { pos: bulbPosition, active: inverterOn && switchOn && bulbOn },
      { pos: wordPosition, active: inverterOn && switchOn && bulbOn && wordIlluminated },
    ]

    points.forEach(({ pos, active }) => {
      ctx.beginPath()
      ctx.arc(pos.x, pos.y, connectionPointRadius, 0, Math.PI * 2)
      ctx.fillStyle = active ? "rgba(74, 222, 128, 0.8)" : "rgba(74, 222, 128, 0.2)"
      ctx.fill()
    })
  }, [inverterOn, switchOn, bulbOn, wordIlluminated, inverterPosition, switchPosition, bulbPosition, wordPosition, config])

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    const { particleSize } = config
    const particles = particlesRef.current

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]
      const connectionIndex = Math.floor(i / (particles.length / 3))

      // Update particle position
      particle.progress += 0.01 * particle.speed
      if (particle.progress > 1) {
        particle.progress = 0
        particle.speed = 0.5 + Math.random() * 0.5
      }

      // Calculate position based on connection
      let startPos, endPos
      switch (connectionIndex) {
        case 0:
          startPos = inverterPosition
          endPos = switchPosition
          break
        case 1:
          startPos = switchPosition
          endPos = bulbPosition
          break
        case 2:
          startPos = bulbPosition
          endPos = wordPosition
          break
        default:
          continue
      }

      // Calculate current position
      particle.x = startPos.x + (endPos.x - startPos.x) * particle.progress
      particle.y = startPos.y + (endPos.y - startPos.y) * particle.progress

      // Draw particle if connection is active
      if (
        (connectionIndex === 0 && inverterOn) ||
        (connectionIndex === 1 && inverterOn && switchOn) ||
        (connectionIndex === 2 && inverterOn && switchOn && bulbOn)
      ) {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2)
        
        if (bulbOn && (connectionIndex === 1 || connectionIndex === 2)) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
          ctx.shadowColor = "rgba(74, 222, 128, 0.9)"
          ctx.shadowBlur = 15
          ctx.arc(particle.x, particle.y, particleSize * 1.5, 0, Math.PI * 2)
        } else {
          ctx.fillStyle = "rgba(74, 222, 128, 0.9)"
          ctx.shadowColor = "rgba(74, 222, 128, 0.8)"
          ctx.shadowBlur = 10
        }
        
        ctx.fill()
      }
    }
  }, [inverterOn, switchOn, bulbOn, inverterPosition, switchPosition, bulbPosition, wordPosition, config])

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw elements
    drawConnections(ctx)
    drawParticles(ctx)

    // Continue animation
    animationFrameRef.current = requestAnimationFrame(animate)
  }, [drawConnections, drawParticles])

  // Setup and cleanup
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize particles
    initializeParticles()

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [animate, initializeParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  )
}
