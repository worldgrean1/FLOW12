"use client"

import { motion } from "framer-motion"
import { InverterState } from "./types"

interface InverterDisplayProps {
  state: InverterState
  inverterOn: boolean
  scale: number
}

export function InverterDisplay({ state, inverterOn, scale }: InverterDisplayProps) {
  const formatNumber = (num: number, digits: number) => {
    return num.toString().padStart(digits, "0")
  }

  return (
    <motion.div
      className="relative"
      style={{
        width: "400px",
        height: "590px",
        background: "linear-gradient(145deg, rgb(217 218 222), rgb(150 156 167))",
        borderRadius: "15px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.3), 0 6px 6px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)",
        border: "1px solid rgb(107 112 131)",
      }}
      animate={{
        boxShadow: inverterOn
          ? "0 10px 25px rgba(0,0,0,0.3), 0 6px 6px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1), 0 0 15px rgba(74, 222, 128, 0.3)"
          : "0 10px 20px rgba(0,0,0,0.3), 0 6px 6px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)",
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Top mounting bracket */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "300px",
          height: "20px",
          background: "#0f172a",
          borderRadius: "5px 5px 0 0",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 40px",
        }}
      >
        {/* Mounting holes */}
        <div className="w-4 h-8 bg-gray-700 rounded-full" style={{ transform: "translateY(-4px)" }}></div>
        <div className="w-4 h-8 bg-gray-700 rounded-full" style={{ transform: "translateY(-4px)" }}></div>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24"
        style={{
          background: "#0f172a",
          borderRadius: "0 0 15px 15px",
          clipPath: "polygon(0 40%, 100% 40%, 100% 100%, 0 100%)",
        }}
      ></div>

      {/* Control panel */}
      <div
        className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/4"
        style={{
          width: "280px",
          height: "400px",
          background: "#0f172a",
          borderRadius: "15px",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid #1e293b",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
        }}
      >
        {/* Display screen */}
        <div
          className="w-full h-48 mb-4 rounded-lg overflow-hidden relative"
          style={{
            background: "#000",
            border: "1px solid #1e293b",
          }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)",
              opacity: state.screenBrightness,
            }}
          >
            {state.screenActive && (
              <div className="p-4 text-white">
                <div className="text-sm mb-2">Mode: {state.mode.toUpperCase()}</div>
                <div className="text-sm mb-2">Load: {formatNumber(state.loadPercentage, 3)}%</div>
                <div className="text-sm mb-2">Temp: {formatNumber(state.temperature, 2)}°C</div>
                <div className="text-sm mb-2">Fan: {formatNumber(state.fanSpeed, 3)}%</div>
                <div className="text-sm mb-2">Batt: {formatNumber(state.batteryLevel, 3)}%</div>
                <div className="text-sm">Energy: {state.totalEnergyGenerated.toFixed(1)} kWh</div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Status indicators */}
        <div className="w-full flex justify-between mb-4">
          {/* Status indicators will be rendered by InverterStatus component */}
        </div>

        {/* Control buttons */}
        <div className="w-full flex justify-between mt-auto">
          <button
            className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            style={{
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            <span className="sr-only">Mode</span>
          </button>
          <button
            className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            style={{
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            <span className="sr-only">Config</span>
          </button>
          <button
            className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
            style={{
              boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
            }}
          >
            <span className="sr-only">Display</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
} 