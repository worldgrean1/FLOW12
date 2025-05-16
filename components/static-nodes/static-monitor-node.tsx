"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BarChart3, LineChart, Activity, Zap } from "lucide-react"

interface StaticMonitorNodeProps {
  position: { x: number; y: number }
  scale?: number
  monitorOn?: boolean
  type?: "hub" | "meter" | "standard"
}

export default function StaticMonitorNode({
  position,
  scale = 1,
  monitorOn = false,
  type = "standard",
}: StaticMonitorNodeProps) {
  const [chartData, setChartData] = useState<number[]>([50, 60, 55, 65, 70, 65, 75])
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    if (monitorOn) {
      const dataInterval = setInterval(() => {
        setChartData((prev) => {
          const newValue = Math.floor(Math.random() * 30) + 50
          return [...prev.slice(1), newValue]
        })
      }, 2000)

      const timeInterval = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString())
      }, 1000)

      return () => {
        clearInterval(dataInterval)
        clearInterval(timeInterval)
      }
    }
  }, [monitorOn])

  const getMonitorColor = () => {
    switch (type) {
      case "hub":
        return "#3DD56D" // Green
      case "meter":
        return "#60A5FA" // Blue
      default:
        return "#F59E0B" // Amber
    }
  }

  const monitorColor = getMonitorColor()

  return (
    <div
      className="absolute"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      <div className="relative w-60 h-48">
        {/* Monitor Frame */}
        <motion.div
          className="absolute inset-0 rounded-lg border-2 bg-slate-800/80 backdrop-blur-sm"
          style={{
            borderColor: monitorOn ? monitorColor : "rgba(100, 116, 139, 0.5)",
          }}
          animate={{
            borderColor: monitorOn ? [monitorColor, `${monitorColor}80`, monitorColor] : "rgba(100, 116, 139, 0.5)",
            boxShadow: monitorOn
              ? [
                  `0 0 0 rgba(${monitorColor.replace("#", "")}, 0)`,
                  `0 0 15px rgba(${monitorColor.replace("#", "")}, 0.5)`,
                  `0 0 0 rgba(${monitorColor.replace("#", "")}, 0)`,
                ]
              : "none",
          }}
          transition={{
            duration: 2,
            repeat: monitorOn ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
        >
          {/* Monitor Screen */}
          <div className="absolute inset-2 rounded bg-slate-900/80">
            {monitorOn ? (
              <div className="p-3 h-full flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs font-bold text-white">
                    {type === "hub" ? "EnergyHub Pro" : type === "meter" ? "SolarMeter" : "Energy Monitor"}
                  </div>
                  <div className="text-xs text-slate-400">{currentTime}</div>
                </div>

                {/* Chart */}
                <div className="flex-1 flex items-end space-x-1">
                  {chartData.map((value, index) => (
                    <motion.div
                      key={index}
                      className="w-1/7 rounded-t"
                      style={{
                        backgroundColor: monitorColor,
                        height: `${value}%`,
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${value}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center">
                    <Zap className="h-3 w-3 mr-1 text-yellow-500" />
                    <span className="text-white">2.4 kW</span>
                  </div>
                  <div className="flex items-center">
                    <Activity className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-white">18.7 kWh</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-slate-600 text-xs">STANDBY</div>
              </div>
            )}
          </div>

          {/* Monitor Stand */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-slate-700 rounded"></div>
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-4 bg-slate-700 rounded"></div>
        </motion.div>

        {/* Monitor Icon */}
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white">
          {type === "hub" ? (
            <BarChart3 className="h-5 w-5" style={{ color: monitorOn ? monitorColor : "#64748B" }} />
          ) : type === "meter" ? (
            <LineChart className="h-5 w-5" style={{ color: monitorOn ? monitorColor : "#64748B" }} />
          ) : (
            <Activity className="h-5 w-5" style={{ color: monitorOn ? monitorColor : "#64748B" }} />
          )}
        </div>

        {/* Connection Points */}
        <div
          id="monitor-input"
          className="absolute top-1/2 -left-2 transform -translate-x-1/2 w-3 h-3 rounded-full"
          style={{
            backgroundColor: monitorOn ? monitorColor : "#475569",
            boxShadow: monitorOn ? `0 0 5px ${monitorColor}` : "none",
          }}
        />
        <div
          id="monitor-output"
          className="absolute top-1/2 -right-2 transform translate-x-1/2 w-3 h-3 rounded-full"
          style={{
            backgroundColor: monitorOn ? monitorColor : "#475569",
            boxShadow: monitorOn ? `0 0 5px ${monitorColor}` : "none",
          }}
        />
      </div>
    </div>
  )
}
