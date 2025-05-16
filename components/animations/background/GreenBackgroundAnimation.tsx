"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Leaf, SunMedium, Wind, Droplets, Zap, Battery } from "lucide-react"

type Theme = "energy" | "solutions" | "about" | "products" | "contact"
type Intensity = "low" | "medium" | "high"

interface GreenBackgroundAnimationProps {
  intensity?: Intensity
  theme?: Theme
}

export function GreenBackgroundAnimation({ 
  intensity = "medium", 
  theme = "energy" 
}: GreenBackgroundAnimationProps) {
  // Memoize theme icons to prevent unnecessary re-renders
  const themeIcons = useMemo(() => {
    switch (theme) {
      case "solutions":
        return [<Zap key="zap" />, <SunMedium key="sun" />, <Battery key="battery" />]
      case "about":
        return [<Leaf key="leaf" />, <SunMedium key="sun" />]
      case "products":
        return [<Battery key="battery" />, <Zap key="zap" />]
      case "contact":
        return [<Leaf key="leaf" />, <Wind key="wind" />]
      case "energy":
      default:
        return [<Leaf key="leaf" />, <SunMedium key="sun" />, <Wind key="wind" />, <Droplets key="droplets" />]
    }
  }, [theme])

  // Memoize intensity settings
  const settings = useMemo(() => ({
    particleCount: {
      low: 5,
      medium: 8,
      high: 12,
    }[intensity] || 8,
    opacityLevel: {
      low: 0.15,
      medium: 0.25,
      high: 0.35,
    }[intensity] || 0.25
  }), [intensity])

  // Memoize particle configurations
  const particles = useMemo(() => 
    Array.from({ length: settings.particleCount }).map((_, i) => ({
      width: 4 + (i % 4),
      height: 4 + (i % 4),
      x: 20 + (i * 8),
      y: 20 + (i * 8),
      duration: 10 + (i % 5),
      delay: i * 0.5
    }))
  , [settings.particleCount])

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(74, 222, 128, ${settings.opacityLevel / 2}) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(74, 222, 128, ${settings.opacityLevel / 2}) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: particle.width,
              height: particle.height,
              backgroundColor: `hsl(${140 + (i * 10)}, 80%, 65%)`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0.2,
            }}
            animate={{
              x: [0, 50 - (i * 5), 0],
              y: [0, 50 - (i * 5), 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              delay: particle.delay
            }}
          />
        ))}
      </div>

      {/* Theme icons */}
      <div className="absolute inset-0">
        {themeIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400/20"
            style={{
              left: `${20 + (i * 20)}%`,
              top: `${20 + (i * 20)}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>
    </div>
  )
} 