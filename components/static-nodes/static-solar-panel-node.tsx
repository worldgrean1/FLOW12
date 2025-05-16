"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

interface StaticSolarPanelNodeProps {
  position: { x: number; y: number }
  panelOn?: boolean
  outputPower?: number
  sunIntensity?: number
  efficiency?: number
  temperature?: number
  tiltAngle?: number
  orientation?: "south" | "east" | "west" | "north"
  onPanelChange?: (value: boolean) => void
  onPowerChange?: (value: number) => void
  scale?: number
  t?: (key: string) => string
}

export default function StaticSolarPanelNode({
  position,
  panelOn: initialPanelOn = true,
  outputPower: initialOutputPower = 0,
  sunIntensity: initialSunIntensity = 70,
  efficiency: initialEfficiency = 21,
  temperature: initialTemperature = 45,
  tiltAngle: initialTiltAngle = 30,
  orientation: initialOrientation = "south",
  onPanelChange,
  onPowerChange,
  scale = 1,
  t = (key: string) => key,
}: StaticSolarPanelNodeProps) {
  // State for solar panel operation
  const [panelOn, setPanelOn] = useState(initialPanelOn)
  const [outputPower, setOutputPower] = useState(initialOutputPower)
  const [sunIntensity, setSunIntensity] = useState(initialSunIntensity)
  const [efficiency, setEfficiency] = useState(initialEfficiency)
  const [temperature, setTemperature] = useState(initialTemperature)
  const [tiltAngle, setTiltAngle] = useState(initialTiltAngle)
  const [orientation, setOrientation] = useState<"south" | "east" | "west" | "north">(initialOrientation)
  const [timeOfDay, setTimeOfDay] = useState(12) // 24-hour format
  const [weather, setWeather] = useState<"sunny" | "cloudy" | "rainy" | "night">("sunny")
  const [cellHighlight, setCellHighlight] = useState<number[]>([])
  const [showControls, setShowControls] = useState(false)

  // Calculate power output based on conditions
  useEffect(() => {
    if (!panelOn) {
      setOutputPower(0)
      return
    }

    // Base power calculation
    const maxPower = 350 // Watts for a typical panel

    // Calculate sun factor based on time of day and weather
    let sunFactor = sunIntensity / 100

    // Adjust for time of day (simplified model)
    const hourFactor = Math.sin(((timeOfDay - 6) / 12) * Math.PI)
    sunFactor *= Math.max(0, hourFactor)

    // Adjust for weather
    if (weather === "cloudy") sunFactor *= 0.6
    else if (weather === "rainy") sunFactor *= 0.3
    else if (weather === "night") sunFactor = 0

    // Adjust for tilt and orientation
    let orientationFactor = 1.0
    if (orientation === "east" && timeOfDay < 12) orientationFactor = 0.9
    else if (orientation === "east" && timeOfDay >= 12) orientationFactor = 0.7
    else if (orientation === "west" && timeOfDay < 12) orientationFactor = 0.7
    else if (orientation === "west" && timeOfDay >= 12) orientationFactor = 0.9
    else if (orientation === "north") orientationFactor = 0.6

    // Tilt factor (simplified)
    const optimalTilt = 35 // Example optimal tilt
    const tiltFactor = 1 - Math.abs(tiltAngle - optimalTilt) / 90

    // Temperature effect (panels are less efficient at higher temperatures)
    const tempFactor = 1 - Math.max(0, (temperature - 25) * 0.004) // ~0.4% loss per degree C above 25°C

    // Calculate final power
    const calculatedPower = maxPower * sunFactor * orientationFactor * tiltFactor * tempFactor * (efficiency / 100)
    setOutputPower(Math.round(calculatedPower))

    // Notify parent component if callback exists
    if (onPowerChange) {
      onPowerChange(Math.round(calculatedPower))
    }

    // Randomly highlight cells to simulate sun reflection
    const highlightCount = Math.floor(sunFactor * 5)
    const newHighlights = Array.from({ length: highlightCount }, () => Math.floor(Math.random() * 32))
    setCellHighlight(newHighlights)
  }, [panelOn, sunIntensity, efficiency, temperature, tiltAngle, orientation, timeOfDay, weather, onPowerChange])

  // Toggle panel on/off
  const togglePanel = useCallback(() => {
    setPanelOn((prev) => !prev)

    if (onPanelChange) {
      onPanelChange(!panelOn)
    }
  }, [panelOn, onPanelChange])

  // Change time of day (for simulation)
  const changeTimeOfDay = useCallback((newTime: number) => {
    setTimeOfDay(newTime)

    // Update weather based on time (simplified)
    if (newTime < 6 || newTime > 18) {
      setWeather("night")
    } else if (newTime > 10 && newTime < 16) {
      setWeather(Math.random() > 0.7 ? "cloudy" : "sunny")
    } else {
      setWeather(Math.random() > 0.5 ? "cloudy" : "sunny")
    }

    // Update sun intensity based on time
    const baseIntensity = Math.sin(((newTime - 6) / 12) * Math.PI) * 100
    setSunIntensity(Math.max(0, Math.min(100, baseIntensity)))
  }, [])

  // Change panel tilt
  const changeTilt = useCallback((newTilt: number) => {
    setTiltAngle(Math.max(0, Math.min(90, newTilt)))
  }, [])

  // Toggle controls visibility
  const toggleControls = useCallback(() => {
    setShowControls((prev) => !prev)
  }, [])

  // Calculate scaled dimensions
  const panelWidth = 320 * scale
  const panelHeight = 420 * scale
  const cableWidth = 3 * scale
  const cableHeight = 24 * scale
  const connectorWidth = 8 * scale
  const connectorHeight = 12 * scale

  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%)`,
        width: `${panelWidth}px`,
        height: `${panelHeight + cableHeight}px`,
      }}
    >
      <div
        className="flex flex-col items-center gap-4"
        style={{ transform: `scale(${scale})`, transformOrigin: "center top" }}
      >
        {/* Realistic Solar Panel */}
        <motion.div
          className="relative cursor-pointer"
          onClick={toggleControls}
          style={{
            width: "320px",
            height: "420px",
          }}
          animate={{
            rotateX: tiltAngle,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Panel Frame */}
          <div
            className="absolute inset-0 rounded-md"
            style={{
              background: "linear-gradient(145deg, #e6e6e6, #d9d9d9)",
              boxShadow: "0 15px 25px -3px rgba(0, 0, 0, 0.15), 0 6px 10px -2px rgba(0, 0, 0, 0.1)",
              border: "8px solid #c0c0c0",
              zIndex: 1,
              transition: "all 0.3s ease",
            }}
          >
            {/* Add metallic frame effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.1) 55%, transparent 100%)",
                mixBlendMode: "overlay",
              }}
            />
          </div>

          {/* Solar Cells Grid */}
          <div
            className="absolute inset-[8px] grid grid-cols-4 grid-rows-8 gap-[2px] bg-gray-800 rounded-sm z-10"
            style={{
              boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            {Array.from({ length: 32 }).map((_, i) => (
              <motion.div
                key={`cell-${i}`}
                className="relative overflow-hidden rounded-sm"
                style={{
                  background: "linear-gradient(145deg, #111827, #1f2937)",
                  boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.1)",
                }}
                animate={
                  cellHighlight.includes(i)
                    ? {
                        opacity: [1, 0.8, 1],
                        backgroundColor: ["#1f2937", "#2563eb", "#1f2937"],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: cellHighlight.includes(i) ? Number.POSITIVE_INFINITY : 0 }}
              >
                {/* Add subtle blue tint to cells */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    background: "linear-gradient(145deg, #3b82f6, transparent)",
                    mixBlendMode: "overlay",
                  }}
                />
                {/* Cell bus bars */}
                <div className="absolute inset-0 flex flex-col justify-between items-center opacity-50">
                  <div className="w-[1px] h-full bg-gray-300 opacity-30"></div>
                  <div className="w-full h-[1px] bg-gray-300 opacity-30"></div>
                </div>

                {/* Highlight effect */}
                {cellHighlight.includes(i) && (
                  <motion.div
                    className="absolute inset-0 bg-blue-400"
                    animate={{ opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Sun reflection effect */}
          {panelOn && sunIntensity > 30 && weather !== "night" && (
            <motion.div
              className="absolute inset-0 z-20 rounded-md pointer-events-none"
              style={{
                background: "linear-gradient(145deg, transparent, rgba(255, 255, 255, 0.1))",
              }}
              animate={{ opacity: sunIntensity / 200 }}
              transition={{ duration: 0.5 }}
            />
          )}

          {/* Shadow effect */}
          <div className="absolute -bottom-4 left-0 right-0 h-4 bg-black/20 blur-md rounded-full z-0"></div>

          {/* Junction Box at the bottom of the panel */}
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-10 rounded-md z-15"
            style={{
              background: "linear-gradient(to bottom, #374151, #1f2937)",
              boxShadow: "0 3px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              border: "1px solid #111827",
              transition: "all 0.3s ease",
            }}
          >
            {/* Add subtle metallic effect */}
            <div
              className="absolute inset-0 rounded-md pointer-events-none"
              style={{
                background:
                  "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 55%, transparent 100%)",
                mixBlendMode: "overlay",
              }}
            />
            {/* Junction box screws */}
            <div className="absolute top-1 left-2 w-2 h-2 rounded-full bg-gray-600 border border-gray-700"></div>
            <div className="absolute top-1 right-2 w-2 h-2 rounded-full bg-gray-600 border border-gray-700"></div>
            <div className="absolute bottom-1 left-2 w-2 h-2 rounded-full bg-gray-600 border border-gray-700"></div>
            <div className="absolute bottom-1 right-2 w-2 h-2 rounded-full bg-gray-600 border border-gray-700"></div>

            {/* Cable exit points */}
            <div className="absolute -bottom-1 left-1/3 w-3 h-3 rounded-full bg-gray-800 border border-gray-700"></div>
            <div className="absolute -bottom-1 right-1/3 w-3 h-3 rounded-full bg-gray-800 border border-gray-700"></div>
          </div>
        </motion.div>

        {/* Realistic Solar Panel Cables with MC4 Connectors */}
        <div className="relative w-full h-24 mt-[-16px]">
          {/* Negative Cable (Black) */}
          <div className="absolute left-[calc(50%-30px)] top-0 w-3 h-24">
            {/* Cable */}
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-16"
              style={{
                background: "linear-gradient(to right, #111827, #1f2937, #111827)",
                borderRadius: "2px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            ></div>

            {/* MC4 Connector */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-12"
              style={{
                background: "linear-gradient(to bottom, #1f2937, #111827)",
                borderRadius: "3px",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                border: "1px solid #0f172a",
                transition: "all 0.3s ease",
              }}
            >
              {/* Connector details */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-700 rounded-sm"></div>
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gray-700 rounded-sm"></div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-gray-800 rounded-sm"></div>

              {/* Label */}
              <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-[8px] px-1 rounded">
                NEG (-)
              </div>

              {/* Connection point (replacing ReactFlow Handle) */}
              <motion.div
                className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 rounded-full border-2"
                style={{
                  width: "10px",
                  height: "10px",
                  background: "linear-gradient(to bottom, #1f2937, #000000)",
                  border: "2px solid #374151",
                  boxShadow: "0 0 8px rgba(0, 0, 0, 0.5), 0 0 3px rgba(0, 0, 0, 0.8)",
                }}
                animate={{
                  boxShadow: panelOn
                    ? ["0 0 8px rgba(0, 0, 0, 0.5)", "0 0 12px rgba(0, 0, 0, 0.7)", "0 0 8px rgba(0, 0, 0, 0.5)"]
                    : "0 0 8px rgba(0, 0, 0, 0.5)",
                }}
                transition={{ duration: 2, repeat: panelOn ? Number.POSITIVE_INFINITY : 0 }}
                data-connection-point="true"
                data-handle-id="output-negative"
              />
            </div>
          </div>

          {/* Positive Cable (Red) */}
          <div className="absolute right-[calc(50%-30px)] top-0 w-3 h-24">
            {/* Cable */}
            <div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-16"
              style={{
                background: "linear-gradient(to right, #991b1b, #dc2626, #991b1b)",
                borderRadius: "2px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            ></div>

            {/* MC4 Connector */}
            <div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-12"
              style={{
                background: "linear-gradient(to bottom, #991b1b, #7f1d1d)",
                borderRadius: "3px",
                boxShadow: "0 3px 6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                border: "1px solid #7f1d1d",
                transition: "all 0.3s ease",
              }}
            >
              {/* Connector details */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-red-900 rounded-sm"></div>
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-red-900 rounded-sm"></div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-red-950 rounded-sm"></div>

              {/* Label */}
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-red-900 text-white text-[8px] px-1 rounded">
                POS (+)
              </div>

              {/* Connection point (replacing ReactFlow Handle) */}
              <motion.div
                className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 rounded-full border-2"
                style={{
                  width: "10px",
                  height: "10px",
                  background: "linear-gradient(to bottom, #ef4444, #dc2626)",
                  border: "2px solid #991b1b",
                  boxShadow: "0 0 8px rgba(220, 38, 38, 0.5), 0 0 3px rgba(220, 38, 38, 0.8)",
                }}
                animate={{
                  boxShadow: panelOn
                    ? [
                        "0 0 8px rgba(220, 38, 38, 0.5)",
                        "0 0 12px rgba(220, 38, 38, 0.7)",
                        "0 0 8px rgba(220, 38, 38, 0.5)",
                      ]
                    : "0 0 8px rgba(220, 38, 38, 0.5)",
                }}
                transition={{ duration: 2, repeat: panelOn ? Number.POSITIVE_INFINITY : 0 }}
                data-connection-point="true"
                data-handle-id="output-positive"
              />
            </div>
          </div>
        </div>

        {/* Separate Control UI Card */}
        {showControls && (
          <motion.div
            className="absolute top-full mt-4 w-[320px] bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-30"
            style={{
              background: "linear-gradient(to bottom, #ffffff, #f9fafb)",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              borderColor: "#e5e7eb",
            }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Add subtle highlight effect on top edge */}
            <div
              className="absolute top-0 left-5 right-5 h-[1px] rounded-full"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
              }}
            />
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Solar Panel Controls</h3>
              <button onClick={toggleControls} className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Output</span>
                  <motion.span
                    className="text-sm font-medium text-green-600"
                    animate={panelOn ? { opacity: [0.8, 1, 0.8] } : {}}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {outputPower}W
                  </motion.span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Efficiency</span>
                  <span className="text-sm font-medium">{efficiency}%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Temperature</span>
                  <span className="text-sm font-medium">{temperature}°C</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Sun Intensity</span>
                  <span className="text-sm font-medium">{Math.round(sunIntensity)}%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Orientation</span>
                  <select
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value as any)}
                    className="text-xs bg-gray-50 border border-gray-200 rounded px-1 py-0.5"
                  >
                    <option value="south">South</option>
                    <option value="east">East</option>
                    <option value="west">West</option>
                    <option value="north">North</option>
                  </select>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Weather</span>
                  <span className="text-xs font-medium capitalize">{weather}</span>
                </div>
              </div>
            </div>

            {/* Time of Day Slider */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Time of Day</span>
                <span className="text-xs font-medium">{timeOfDay}:00</span>
              </div>
              <input
                type="range"
                min="0"
                max="23"
                value={timeOfDay}
                onChange={(e) => changeTimeOfDay(Number.parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Tilt Angle Slider */}
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Tilt Angle</span>
                <span className="text-xs font-medium">{tiltAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="90"
                value={tiltAngle}
                onChange={(e) => changeTilt(Number.parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Power Toggle */}
            <div className="mt-3 flex justify-center">
              <motion.button
                onClick={togglePanel}
                className={`px-3 py-1.5 rounded-full text-xs font-medium ${panelOn ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
                style={{
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
                }}
                whileHover={{
                  y: -1,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                }}
                whileTap={{ y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {panelOn ? "Turn Off Panel" : "Turn On Panel"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
