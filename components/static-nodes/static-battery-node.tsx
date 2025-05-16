"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Battery, BatteryCharging } from "lucide-react"

interface StaticBatteryNodeProps {
  position: { x: number; y: number }
  scale?: number
  batteryOn?: boolean
  isCharging?: boolean
  chargeLevel?: number
  type?: "lithium" | "flow" | "standard"
}

export default function StaticBatteryNode({
  position,
  scale = 1,
  batteryOn = false,
  isCharging = false,
  chargeLevel = 80,
  type = "standard",
}: StaticBatteryNodeProps) {
  const [pulseVisible, setPulseVisible] = useState(false)

  useEffect(() => {
    if (batteryOn) {
      const interval = setInterval(() => {
        setPulseVisible((prev) => !prev)
      }, 1500)
      return () => clearInterval(interval)
    }
  }, [batteryOn])

  const getBatteryColor = () => {
    switch (type) {
      case "lithium":
        return "#3DD56D" // Green
      case "flow":
        return "#60A5FA" // Blue
      default:
        return "#F59E0B" // Amber
    }
  }

  const batteryColor = getBatteryColor()

  return (
    <div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      <div className="relative w-40 h-60">
        {/* Battery Container */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 bg-slate-800/80 backdrop-blur-sm"
          style={{
            borderColor: batteryOn ? batteryColor : "rgba(100, 116, 139, 0.5)",
          }}
          animate={{
            borderColor: batteryOn ? [batteryColor, `${batteryColor}80`, batteryColor] : "rgba(100, 116, 139, 0.5)",
            boxShadow: batteryOn
              ? [
                  `0 0 0 rgba(${batteryColor.replace("#", "")}, 0)`,
                  `0 0 15px rgba(${batteryColor.replace("#", "")}, 0.5)`,
                  `0 0 0 rgba(${batteryColor.replace("#", "")}, 0)`,
                ]
              : "none",
          }}
          transition={{
            duration: 2,
            repeat: batteryOn ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
        >
          {/* Battery Terminals */}
          <div className="absolute left-1/2 -top-3 w-10 h-3 bg-slate-600 rounded-t-md transform -translate-x-1/2"></div>

          {/* Battery Level Indicator */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 rounded-b-md"
            style={{
              backgroundColor: batteryOn ? batteryColor : "rgba(100, 116, 139, 0.3)",
              height: `${chargeLevel}%`,
            }}
            animate={{
              height: isCharging ? ["70%", "85%", "70%"] : `${chargeLevel}%`,
              opacity: batteryOn ? 1 : 0.3,
            }}
            transition={{
              height: {
                duration: 3,
                repeat: isCharging ? Number.POSITIVE_INFINITY : 0,
                ease: "easeInOut",
              },
              opacity: {
                duration: 0.5,
              },
            }}
          />

          {/* Battery Icon */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white">
            {isCharging ? <BatteryCharging className="h-8 w-8" /> : <Battery className="h-8 w-8" />}
          </div>

          {/* Battery Type Label */}
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 text-white text-center">
            <div className="text-xs font-semibold">
              {type === "lithium" ? "Lithium-Ion" : type === "flow" ? "Flow Battery" : "Standard"}
            </div>
          </div>

          {/* Battery Status */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 text-white text-center">
            <div className="text-xs">{batteryOn ? (isCharging ? "Charging" : "Discharging") : "Standby"}</div>
            <div className="text-sm font-bold mt-1">{chargeLevel}%</div>
          </div>

          {/* Power Output */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
            <div className="text-xs">Power</div>
            <div className="text-sm font-bold">{batteryOn ? (isCharging ? "+2.5 kW" : "-1.8 kW") : "0.0 kW"}</div>
          </div>
        </motion.div>

        {/* Energy Pulse Effect */}
        {batteryOn && pulseVisible && (
          <motion.div
            className="absolute left-1/2 top-1/2 rounded-full"
            style={{
              backgroundColor: batteryColor,
              width: 40,
              height: 40,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0.7, scale: 0.5 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            onAnimationComplete={() => setPulseVisible(false)}
          />
        )}

        {/* Connection Points */}
        <div
          id="battery-input"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            backgroundColor: batteryOn ? batteryColor : "#475569",
            boxShadow: batteryOn ? `0 0 5px ${batteryColor}` : "none",
          }}
        />
        <div
          id="battery-output"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full"
          style={{
            backgroundColor: batteryOn ? batteryColor : "#475569",
            boxShadow: batteryOn ? `0 0 5px ${batteryColor}` : "none",
          }}
        />
      </div>
    </div>
  )
}
