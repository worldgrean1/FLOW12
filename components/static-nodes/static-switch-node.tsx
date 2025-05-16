"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface StaticSwitchNodeProps {
  position: { x: number; y: number }
  switchOn: boolean
  onSwitchChange?: (value: boolean) => void
  scale?: number
}

export default function StaticSwitchNode({
  position,
  switchOn = false,
  onSwitchChange,
  scale = 1,
}: StaticSwitchNodeProps) {
  const [pressed, setPressed] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Calculate dimensions based on scale
  const nodeWidth = 128 * scale // w-32 = 8rem = 128px
  const nodeHeight = 128 * scale // h-32 = 8rem = 128px

  // Toggle switch on click
  const handleToggle = () => {
    setPressed(true)
    if (typeof onSwitchChange === "function") {
      onSwitchChange(!switchOn)
    }
    setTimeout(() => setPressed(false), 150)
  }

  return (
    <div
      data-node-id="switch"
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: `${nodeWidth}px`,
        height: `${nodeHeight}px`,
      }}
    >
      <motion.div
        className={`relative w-full h-full flex flex-col items-center justify-center select-none cursor-pointer`}
        onClick={handleToggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: "transparent", // Ensure background is transparent
        }}
      >
        {/* Switch PNG image with transparent background */}
        <div className="relative w-full h-full">
          <img
            src="/images/light-switch.png"
            alt="Light Switch"
            className="w-full h-full object-contain"
            style={{
              filter: switchOn ? "brightness(1.1)" : "brightness(0.9)",
            }}
          />
        </div>

        {/* Power ON message when switch is on - moved to right side */}
        {switchOn && (
          <motion.div
            className="absolute top-1/2 left-full transform -translate-y-1/2 bg-sky-900/90 text-sky-300 px-3 py-1.5 rounded-md text-sm font-medium"
            style={{
              marginLeft: "-2px", // Negative margin to move it left
              boxShadow: "0 0 10px rgba(56, 189, 248, 0.3), 0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              zIndex: 10,
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-sky-300 animate-pulse"></span>
              <span>Power ON</span>
            </div>
            {/* Arrow pointing left toward the switch */}
            <motion.div
              className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-3 h-3 bg-sky-900/90"
              style={{ transform: "translateY(-50%) rotate(45deg)" }}
            />
          </motion.div>
        )}

        {/* Hover indicator tooltip - only shown when switch is off */}
        {hovered && !switchOn && (
          <motion.div
            className="absolute top-1/2 left-full transform -translate-y-1/2 text-xs font-medium px-3 py-1.5 rounded-md shadow-lg"
            style={{
              marginLeft: "-2px", // Negative margin to move it left
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              color: "#94a3b8",
              border: "1px solid #334155",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              zIndex: 10,
            }}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.2 }}
          >
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-slate-400 mr-1"></span>
              <span>Inactive • Click to turn on</span>
            </span>
            {/* Arrow pointing left toward the switch */}
            <motion.div
              className="absolute top-1/2 -left-2 transform -translate-y-1/2 w-3 h-3 bg-slate-900/95"
              style={{ transform: "translateY(-50%) rotate(45deg)" }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
