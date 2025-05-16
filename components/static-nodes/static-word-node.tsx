"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

interface StaticWordNodeProps {
  position: { x: number; y: number }
  word: string
  illuminated: boolean
  scale?: number
  color?: string
  glowColor?: string
  glowIntensity?: "low" | "medium" | "high"
  cycleWords?: boolean
  words?: string[]
  fontSize?: string
  label?: string
  onClick?: () => void
}

export default function StaticWordNode({
  position,
  word = "GREAN",
  illuminated,
  scale = 1,
  color = "#4ade80",
  glowColor = "#4ade80",
  glowIntensity = "medium",
  cycleWords = false,
  words = ["GREAN", "CLEAN", "GREEN", "SMART", "POWER"],
  fontSize = "3xl",
  label = "",
  onClick,
}: StaticWordNodeProps) {
  const [currentWord, setCurrentWord] = useState(word)
  const [isHovered, setIsHovered] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const connectionPointSize = scale * 12
  const [energyDots, setEnergyDots] = useState<Array<{ left: number; top: number; size: number }>>([])

  // Get glow settings based on intensity
  const getGlowSettings = () => {
    if (!illuminated) return { opacity: 0, blur: 0, shadow: "none" }

    switch (glowIntensity) {
      case "low":
        return {
          opacity: 0.6,
          blur: 5,
          shadow: `0 0 8px ${glowColor}, 0 0 12px ${glowColor}`,
        }
      case "high":
        return {
          opacity: 0.9,
          blur: 10,
          shadow: `0 0 15px ${glowColor}, 0 0 25px ${glowColor}, 0 0 40px ${glowColor}`,
        }
      case "medium":
      default:
        return {
          opacity: 0.8,
          blur: 8,
          shadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
        }
    }
  }

  // Generate random energy dots when illuminated
  useEffect(() => {
    if (illuminated) {
      const newDots = Array.from({ length: 3 }, () => ({
        left: Math.random() * 120,
        top: Math.random() * 40,
        size: Math.random() * 1 + 2,
      }))
      setEnergyDots(newDots)
    } else {
      setEnergyDots([])
    }
  }, [illuminated])

  // Update current word when prop changes
  useEffect(() => {
    if (word !== currentWord && !isTransitioning) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentWord(word)
        setIsTransitioning(false)
      }, 300)
    }
  }, [word, currentWord, isTransitioning])

  // Cycle through words when illuminated
  useEffect(() => {
    if (!illuminated || !cycleWords) {
      // If not illuminated, reset to default word
      if (currentWord !== "GREAN" && !illuminated) {
        setCurrentWord("GREAN")
      }
      return
    }

    // If we're illuminated and cycling, use the word from props
    // which will be updated by the parent component
    if (word !== currentWord && !isTransitioning) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentWord(word)
        setIsTransitioning(false)
      }, 300)
    }
  }, [illuminated, cycleWords, word, currentWord, isTransitioning])

  const glowSettings = getGlowSettings()

  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      <div
        ref={containerRef}
        className="relative flex items-center justify-center cursor-pointer"
        role="button"
        tabIndex={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        style={{
          filter: illuminated ? `drop-shadow(0 0 8px ${glowColor}CC)` : "none",
        }}
      >
        {/* Background panel - MODIFIED: Removed border and changed background to fully transparent */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: illuminated
              ? `linear-gradient(rgba(17, 24, 39, 0.7) 0%, rgba(17, 24, 39, 0.9) 100%)`
              : "rgba(17, 24, 39, 0.4)",
            boxShadow: illuminated
              ? `0 0 ${scale * 15}px ${glowColor}4D, 0 0 ${scale * 10}px ${glowColor}1A inset`
              : "none",
            border: "none", // Removed border that was causing white flash
            padding: "12px 20px",
            width: "100%",
            height: "100%",
            transition: "all 0.3s ease", // Added smooth transition
          }}
        />

        {/* Circuit pattern background */}
        <div className="absolute inset-0 overflow-hidden rounded-lg opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M0,10 L8,10 M12,10 L20,10 M10,0 L10,8 M10,12 L10,20"
                stroke={color}
                strokeWidth="0.5"
                fill="none"
              ></path>
              <circle cx="10" cy="10" r="1.5" fill={color}></circle>
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit)"></rect>
          </svg>
        </div>

        {/* Horizontal line with gradient */}
        <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none" style={{ opacity: 0.1 }}>
          <div
            className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-green-400 to-transparent"
            style={{ top: "7.6%" }}
          ></div>
        </div>

        {/* Word display */}
        <div className="relative px-4 py-2">
          {/* The visible text with individual letter animation */}
          <motion.div
            className="flex items-center justify-center space-x-1"
            animate={isTransitioning ? { opacity: [1, 0.8, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {currentWord.split("").map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                className={`text-${fontSize} font-bold tracking-wider inline-block`}
                style={{
                  color: illuminated ? color : "#fff",
                  textShadow: illuminated ? glowSettings.shadow : "none",
                  transition: "all 0.5s ease",
                }}
                animate={
                  illuminated
                    ? {
                        opacity: [0.9, 1],
                      }
                    : {}
                }
                transition={
                  illuminated
                    ? {
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }
                    : {}
                }
              >
                {letter}
              </motion.span>
            ))}

            {/* Arrow icon - only show when illuminated */}
            {illuminated && (
              <motion.div
                className="ml-2 inline-flex items-center"
                animate={{
                  x: [0, 5, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <ChevronRight className="h-6 w-6" style={{ color }} />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Cycling indicator */}
        {cycleWords && illuminated && (
          <div className="absolute -bottom-5 left-0 right-0 flex justify-center space-x-1">
            {words.map((w, idx) => (
              <div
                key={`indicator-${idx}`}
                className={`h-1.5 w-1.5 rounded-full ${
                  currentWord === w ? `bg-${color} opacity-100` : "bg-gray-400 opacity-40"
                }`}
              />
            ))}
          </div>
        )}

        {/* Energy dots */}
        {energyDots.map((dot, index) => (
          <div
            key={`dot-${index}`}
            className="energy-dot"
            style={{
              left: `${dot.left}px`,
              top: `${dot.top}px`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              backgroundColor: `${color}80`, // Made semi-transparent to avoid white flash
            }}
          />
        ))}

        {/* Connection point - MODIFIED: Removed border */}
        <div
          className="absolute rounded-full"
          data-handle-id="word-input"
          data-connection-point="true"
          style={{
            left: 0,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: `${connectionPointSize}px`,
            height: `${connectionPointSize}px`,
            zIndex: 2,
            backgroundColor: "#475569",
            border: "none", // Removed border
            boxShadow: illuminated ? `0 0 5px ${glowColor}` : "none",
            transition: "all 0.3s ease", // Added smooth transition
          }}
        />

        {/* Left glow point */}
        <div
          className="absolute left-0 top-1/2 transform -translate-x-[5px] -translate-y-1/2 w-2 h-2 rounded-full bg-green-400 glow-point"
          style={{ display: illuminated ? "block" : "none" }}
        />

        {/* Right glow point */}
        <div
          className="absolute right-0 top-1/2 transform translate-x-[5px] -translate-y-1/2 w-2 h-2 rounded-full bg-green-400 glow-point"
          style={{ display: illuminated ? "block" : "none" }}
        />

        {/* Optional label */}
        {label && (
          <div
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs"
            style={{ color: illuminated ? color : "#94a3b8" }}
          >
            {label}
          </div>
        )}
      </div>

      <style jsx>{`
        .glow-point {
          box-shadow: 0 0 8px 2px ${glowColor}CC;
          animation: pulse 2s infinite ease-in-out;
        }
        
        .energy-dot {
          position: absolute;
          background-color: ${glowColor}80; /* Made semi-transparent */
          border-radius: 50%;
          pointer-events: none;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
