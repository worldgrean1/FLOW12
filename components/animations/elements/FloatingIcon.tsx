"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

type Size = "sm" | "md" | "lg"
type Direction = "up" | "down" | "left" | "right"

interface FloatingIconProps {
  icon: LucideIcon
  size?: Size
  direction?: Direction
  className?: string
}

export function FloatingIcon({ 
  icon: Icon,
  size = "md",
  direction = "up",
  className = ""
}: FloatingIconProps) {
  // Memoize size and direction configurations
  const config = useMemo(() => ({
    size: {
      sm: "w-4 h-4",
      md: "w-6 h-6",
      lg: "w-8 h-8"
    }[size],
    direction: {
      up: { y: [-10, 0, -10] },
      down: { y: [0, 10, 0] },
      left: { x: [-10, 0, -10] },
      right: { x: [0, 10, 0] }
    }[direction]
  }), [size, direction])

  return (
    <motion.div
      className={`${config.size} ${className}`}
      animate={config.direction}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut"
      }}
    >
      <Icon className="w-full h-full" />
    </motion.div>
  )
} 