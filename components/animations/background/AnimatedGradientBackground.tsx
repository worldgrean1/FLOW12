"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

type Speed = "slow" | "medium" | "fast"

interface AnimatedGradientBackgroundProps {
  colors?: string[]
  speed?: Speed
}

export function AnimatedGradientBackground({ 
  colors = ["#4ade80", "#3b82f6", "#8b5cf6"],
  speed = "medium"
}: AnimatedGradientBackgroundProps) {
  // Memoize animation duration based on speed
  const duration = useMemo(() => ({
    slow: 15,
    medium: 10,
    fast: 5,
  }[speed] || 10), [speed])

  // Memoize gradient string
  const gradientString = useMemo(() => 
    `linear-gradient(45deg, ${colors.join(", ")})`,
  [colors])

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <motion.div
        className="absolute inset-0"
        style={{
          background: gradientString,
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
} 