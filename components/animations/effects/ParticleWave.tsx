"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

type WaveType = "sine" | "cosine" | "square"
type Color = "green" | "blue" | "purple"

interface ParticleWaveProps {
  type?: WaveType
  color?: Color
  count?: number
  className?: string
}

export function ParticleWave({
  type = "sine",
  color = "green",
  count = 20,
  className = ""
}: ParticleWaveProps) {
  // Memoize color and particle configurations
  const config = useMemo(() => ({
    color: {
      green: "bg-green-400",
      blue: "bg-blue-400",
      purple: "bg-purple-400"
    }[color],
    particles: Array.from({ length: count }).map((_, i) => ({
      x: (i / count) * 100,
      delay: i * 0.1,
      amplitude: type === "square" ? 20 : 15,
      frequency: type === "square" ? 2 : 1
    }))
  }), [type, color, count])

  return (
    <div className={`relative w-full h-20 ${className}`}>
      {config.particles.map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${config.color}`}
          style={{
            left: `${particle.x}%`,
            top: "50%"
          }}
          animate={{
            y: [
              0,
              type === "square" 
                ? particle.amplitude 
                : Math.sin(i * particle.frequency) * particle.amplitude,
              0
            ]
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}
    </div>
  )
} 