"use client"

import { useState, useEffect } from "react"

interface Position {
  x: number
  y: number
}

interface RightAngleConnectionProps {
  from: Position
  to: Position
  active: boolean
  id: string
  cornerPosition?: "auto" | "horizontal-first" | "vertical-first"
}

export default function RightAngleConnection({
  from,
  to,
  active,
  id,
  cornerPosition = "horizontal-first", // Set default to horizontal-first to ensure straight horizontal lines
}: RightAngleConnectionProps) {
  const [particles, setParticles] = useState<{ id: number; progress: number; speed: number }[]>([])

  // Calculate the corner position based on the strategy
  const getCornerPosition = (): Position => {
    if (cornerPosition === "horizontal-first") {
      return { x: to.x, y: from.y }
    } else if (cornerPosition === "vertical-first") {
      return { x: from.x, y: to.y }
    } else {
      // Auto - determine the best corner position based on the relative positions
      const horizontalDistance = Math.abs(to.x - from.x)
      const verticalDistance = Math.abs(to.y - from.y)

      if (horizontalDistance > verticalDistance) {
        return { x: from.x, y: to.y } // Vertical first
      } else {
        return { x: to.x, y: from.y } // Horizontal first
      }
    }
  }

  const corner = getCornerPosition()

  // Calculate path lengths for animation timing
  const horizontalLength = Math.abs(corner.x - from.x)
  const verticalLength = Math.abs(corner.y - from.y)
  const horizontalLength2 = Math.abs(to.x - corner.x)
  const verticalLength2 = Math.abs(to.y - corner.y)

  const totalLength = horizontalLength + verticalLength + horizontalLength2 + verticalLength2

  // Animation for particles
  useEffect(() => {
    if (!active) {
      setParticles([])
      return
    }

    // Create initial particles
    const initialParticles = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      progress: (i * 20) % 100, // Distribute particles evenly
      speed: 0.5 + Math.random() * 0.5, // Random speed between 0.5 and 1
    }))

    setParticles(initialParticles)

    // Animation loop
    const interval = setInterval(() => {
      setParticles((currentParticles) =>
        currentParticles.map((particle) => {
          const newProgress = (particle.progress + particle.speed) % 100
          return { ...particle, progress: newProgress }
        }),
      )
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [active])

  // Calculate particle positions along the path
  const getParticlePosition = (progress: number): Position => {
    const segment1Length = Math.sqrt(Math.pow(corner.x - from.x, 2) + Math.pow(corner.y - from.y, 2))
    const segment2Length = Math.sqrt(Math.pow(to.x - corner.x, 2) + Math.pow(to.y - corner.y, 2))
    const totalPathLength = segment1Length + segment2Length

    const progressAlongPath = (progress / 100) * totalPathLength

    // First segment (from -> corner)
    if (progressAlongPath <= segment1Length) {
      const segmentProgress = progressAlongPath / segment1Length
      return {
        x: from.x + segmentProgress * (corner.x - from.x),
        y: from.y + segmentProgress * (corner.y - from.y),
      }
    }
    // Second segment (corner -> to)
    else {
      const segmentProgress = (progressAlongPath - segment1Length) / segment2Length
      return {
        x: corner.x + segmentProgress * (to.x - corner.x),
        y: corner.y + segmentProgress * (to.y - corner.y),
      }
    }
  }

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }} aria-hidden="true">
      {/* First segment */}
      <line
        x1={from.x}
        y1={from.y}
        x2={corner.x}
        y2={corner.y}
        stroke={active ? "#4ade80" : "#475569"}
        strokeWidth={active ? 2 : 1.5}
        strokeDasharray={active ? "none" : "4 2"}
      />

      {/* Second segment */}
      <line
        x1={corner.x}
        y1={corner.y}
        x2={to.x}
        y2={to.y}
        stroke={active ? "#4ade80" : "#475569"}
        strokeWidth={active ? 2 : 1.5}
        strokeDasharray={active ? "none" : "4 2"}
      />

      {/* Particles */}
      {active &&
        particles.map((particle) => {
          const pos = getParticlePosition(particle.progress)
          return (
            <circle
              key={particle.id}
              cx={pos.x}
              cy={pos.y}
              r={2}
              fill="#4ade80"
              opacity={0.8}
              filter="drop-shadow(0 0 2px rgba(74, 222, 128, 0.5))"
            />
          )
        })}
    </svg>
  )
}
