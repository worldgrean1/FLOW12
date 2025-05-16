"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Cable, Wrench, Plug, Shield } from "lucide-react"

interface StaticAccessoryNodeProps {
  position: { x: number; y: number }
  scale?: number
  type?: "mounting" | "cable" | "connector" | "protector"
  showDetails?: boolean
}

export default function StaticAccessoryNode({
  position,
  scale = 1,
  type = "cable",
  showDetails = false,
}: StaticAccessoryNodeProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (showDetails) {
      setIsAnimating(true)
    } else {
      setIsAnimating(false)
    }
  }, [showDetails])

  const getAccessoryColor = () => {
    switch (type) {
      case "mounting":
        return "#3DD56D" // Green
      case "cable":
        return "#F59E0B" // Amber
      case "connector":
        return "#60A5FA" // Blue
      case "protector":
        return "#EC4899" // Pink
      default:
        return "#3DD56D" // Default green
    }
  }

  const getAccessoryIcon = () => {
    switch (type) {
      case "mounting":
        return <Wrench className="h-8 w-8" />
      case "cable":
        return <Cable className="h-8 w-8" />
      case "connector":
        return <Plug className="h-8 w-8" />
      case "protector":
        return <Shield className="h-8 w-8" />
      default:
        return <Cable className="h-8 w-8" />
    }
  }

  const getAccessoryName = () => {
    switch (type) {
      case "mounting":
        return "Mounting Kit"
      case "cable":
        return "Cable Set"
      case "connector":
        return "Connector"
      case "protector":
        return "Surge Protector"
      default:
        return "Accessory"
    }
  }

  const accessoryColor = getAccessoryColor()
  const accessoryIcon = getAccessoryIcon()
  const accessoryName = getAccessoryName()

  return (
    <div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      <div className="relative w-40 h-40">
        {/* Accessory Container */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 bg-slate-800/80 backdrop-blur-sm flex flex-col items-center justify-center"
          style={{
            borderColor: showDetails ? accessoryColor : "rgba(100, 116, 139, 0.5)",
          }}
          animate={{
            borderColor: showDetails
              ? [accessoryColor, `${accessoryColor}80`, accessoryColor]
              : "rgba(100, 116, 139, 0.5)",
            boxShadow: showDetails
              ? [
                  `0 0 0 rgba(${accessoryColor.replace("#", "")}, 0)`,
                  `0 0 15px rgba(${accessoryColor.replace("#", "")}, 0.5)`,
                  `0 0 0 rgba(${accessoryColor.replace("#", "")}, 0)`,
                ]
              : "none",
          }}
          transition={{
            duration: 2,
            repeat: showDetails ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
        >
          {/* Icon */}
          <motion.div
            style={{ color: showDetails ? accessoryColor : "#64748B" }}
            animate={
              isAnimating
                ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat: isAnimating ? Number.POSITIVE_INFINITY : 0,
              ease: "easeInOut",
            }}
          >
            {accessoryIcon}
          </motion.div>

          {/* Name */}
          <div className="mt-3 text-center">
            <div className="text-sm font-semibold text-white">{accessoryName}</div>
            <div className="text-xs text-slate-400 mt-1">
              {type === "mounting"
                ? "Universal Mounting System"
                : type === "cable"
                  ? "Premium Cable Set"
                  : type === "connector"
                    ? "MC4 Connector"
                    : "Surge Protection Device"}
            </div>
          </div>

          {/* Details (only shown when showDetails is true) */}
          {showDetails && (
            <motion.div
              className="mt-3 text-xs text-center text-slate-300 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {type === "mounting"
                ? "Adjustable racking system for optimal solar panel positioning"
                : type === "cable"
                  ? "Weather-resistant cables for reliable connections"
                  : type === "connector"
                    ? "Industry-standard connectors for solar panels"
                    : "Protects system components from power surges"}
            </motion.div>
          )}
        </motion.div>

        {/* Connection Points */}
        <div
          id="accessory-input"
          className="absolute top-1/2 -left-2 transform -translate-x-1/2 w-3 h-3 rounded-full"
          style={{
            backgroundColor: showDetails ? accessoryColor : "#475569",
            boxShadow: showDetails ? `0 0 5px ${accessoryColor}` : "none",
          }}
        />
        <div
          id="accessory-output"
          className="absolute top-1/2 -right-2 transform translate-x-1/2 w-3 h-3 rounded-full"
          style={{
            backgroundColor: showDetails ? accessoryColor : "#475569",
            boxShadow: showDetails ? `0 0 5px ${accessoryColor}` : "none",
          }}
        />
      </div>
    </div>
  )
}
