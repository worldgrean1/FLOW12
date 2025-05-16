"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { playSound } from "../../utils/audio-utils"

interface StaticInverterNodeProps {
  position: { x: number; y: number }
  inverterOn: boolean
  onInverterChange: (value: boolean) => void
  gridConnected?: boolean
  solarConnected?: boolean
  batteryConnected?: boolean
  loadPercentage?: number
  efficiency?: number
  inputVoltage?: number
  outputVoltage?: number
  frequency?: number
  batteryLevel?: number
  batteryCharging?: boolean
  totalEnergyGenerated?: number
  temperature?: number
  fanSpeed?: number
  mode?: "normal" | "pv" | "battery"
  scale?: number
  showHousing?: boolean
}

export default function StaticInverterNode({
  position,
  inverterOn,
  onInverterChange,
  gridConnected: initialGridConnected = false,
  solarConnected: initialSolarConnected = false,
  batteryConnected: initialBatteryConnected = false,
  loadPercentage: initialLoadPercentage = 0,
  efficiency: initialEfficiency = 97,
  inputVoltage: initialInputVoltage = 48,
  outputVoltage: initialOutputVoltage = 230,
  frequency: initialFrequency = 50,
  batteryLevel: initialBatteryLevel = 80,
  batteryCharging: initialBatteryCharging = false,
  totalEnergyGenerated: initialTotalEnergyGenerated = 23.5,
  temperature: initialTemperature = 45,
  fanSpeed: initialFanSpeed = 40,
  mode: initialMode = "normal",
  scale = 0.35,
  showHousing = true,
}: StaticInverterNodeProps) {
  // State for inverter operation
  const [gridConnected, setGridConnected] = useState(initialGridConnected)
  const [solarConnected, setSolarConnected] = useState(initialSolarConnected)
  const [batteryConnected, setBatteryConnected] = useState(initialBatteryConnected)
  const [temperature, setTemperature] = useState(initialTemperature)
  const [loadPercentage, setLoadPercentage] = useState(initialLoadPercentage)
  const [efficiency, setEfficiency] = useState(initialEfficiency)
  const [inputVoltage, setInputVoltage] = useState(initialInputVoltage)
  const [outputVoltage, setOutputVoltage] = useState(initialOutputVoltage)
  const [inputFrequency, setInputFrequency] = useState(0)
  const [outputFrequency, setOutputFrequency] = useState(initialFrequency || 50)
  const [batteryLevel, setBatteryLevel] = useState(initialBatteryLevel)
  const [batteryCharging, setBatteryCharging] = useState(initialBatteryCharging)
  const [totalEnergyGenerated, setTotalEnergyGenerated] = useState(initialTotalEnergyGenerated)
  const [fanSpeed, setFanSpeed] = useState(initialFanSpeed)
  const [mode, setMode] = useState<"normal" | "pv" | "battery">(initialMode)
  const [selectedMode, setSelectedMode] = useState<number>(initialMode === "normal" ? 0 : initialMode === "pv" ? 1 : 2)
  const [faultCondition, setFaultCondition] = useState(false)
  const [screenActive, setScreenActive] = useState(false)
  const [configMode, setConfigMode] = useState(false)
  const [displayOption, setDisplayOption] = useState(0)
  const [screenBrightness, setScreenBrightness] = useState(1)
  const [bootupPhase, setBootupPhase] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)
  const [showActivatePrompt, setShowActivatePrompt] = useState(!inverterOn)

  // Audio references
  const inverterHumRef = useRef<HTMLAudioElement>(null)
  const fanNoiseRef = useRef<HTMLAudioElement>(null)
  const buttonClickRef = useRef<HTMLAudioElement>(null)
  const alarmRef = useRef<HTMLAudioElement>(null)
  const nodeRef = useRef<HTMLDivElement>(null)
  const connectionPointRef = useRef<HTMLDivElement>(null)

  // Audio volume states
  const [humVolume, setHumVolume] = useState(0)
  const [fanVolume, setFanVolume] = useState(0)

  // Calculate the inverter dimensions
  const inverterWidth = 400 * scale
  const inverterHeight = 590 * scale

  // Calculate connection point position
  const connectionPointSize = scale * 12 // Smaller, more precise connection point
  const connectionPointBottom = scale * 2 // Precise positioning from bottom

  // Find the parent container to ensure the component stays within bounds
  useEffect(() => {
    if (nodeRef.current) {
      let parent: HTMLElement | null = nodeRef.current.parentElement
      while (parent) {
        if (
          parent instanceof HTMLDivElement &&
          (parent.classList.contains("relative") || parent.style.position === "relative")
        ) {
          setContainerRef(parent as HTMLDivElement)
          break
        }
        parent = parent.parentElement
      }
    }
  }, [])

  // Export connection point coordinates for precise cable alignment
  useEffect(() => {
    if (connectionPointRef.current && typeof window !== "undefined") {
      // Store the exact coordinates of the connection point in a custom attribute
      // This can be used by the connection component to align cables perfectly
      const rect = connectionPointRef.current.getBoundingClientRect()
      connectionPointRef.current.setAttribute("data-x", rect.left + rect.width / 2 + "")
      connectionPointRef.current.setAttribute("data-y", rect.top + rect.height / 2 + "")
    }
  }, [position, scale, inverterWidth, inverterHeight])

  // Update showActivatePrompt when inverterOn changes
  useEffect(() => {
    setShowActivatePrompt(!inverterOn)
  }, [inverterOn])

  const activateScreen = useCallback(() => {
    if (screenActive) return

    setScreenActive(true)
    setBootupPhase(0) // Start with loading phase
    setScreenBrightness(0.1) // Dim initial brightness

    // Simulate screen bootup sequence with loading phase
    setTimeout(() => setScreenBrightness(0.2), 100)

    // Loading phase
    setTimeout(() => {
      setBootupPhase(1)
      setScreenBrightness(0.3)
    }, 1200)

    // Initialization phase
    setTimeout(() => {
      setBootupPhase(2)
      setScreenBrightness(0.6)
    }, 2400)

    // Main interface phase
    setTimeout(() => {
      setBootupPhase(3)
      setScreenBrightness(1)
    }, 3500)
  }, [screenActive])

  // Handle inverter toggle
  const toggleInverter = useCallback(() => {
    const newState = !inverterOn
    onInverterChange(newState)

    if (newState) {
      // Activate screen first
      if (!screenActive) {
        activateScreen()
      }

      // Screen is already active by default

      // Power on sequence
      setTimeout(() => setLoadPercentage(initialLoadPercentage || 0), 500)
      setTimeout(() => setFanSpeed(20), 1000)
      setTimeout(() => setOutputFrequency(initialFrequency || 50), 1500)

      // Automatically set connections based on mode
      if (mode === "pv") {
        setSolarConnected(true)
        setBatteryConnected(true)
        setGridConnected(false)
      } else if (mode === "normal") {
        setGridConnected(true)
        setSolarConnected(false)
      } else if (mode === "battery") {
        setBatteryConnected(true)
        setGridConnected(false)
        setSolarConnected(false)
      }
    } else {
      // Power off sequence
      setLoadPercentage(0)
      setFanSpeed(0)
      setOutputFrequency(0)
      setInputFrequency(0)

      // Turn screen completely off
      setScreenActive(false)
      setScreenBrightness(0)
    }
  }, [inverterOn, initialLoadPercentage, initialFrequency, onInverterChange, mode, screenActive, activateScreen])

  // Handle mode change
  const changeMode = useCallback(() => {
    const modes: ("normal" | "pv" | "battery")[] = ["normal", "pv", "battery"]
    const newModeIndex = (selectedMode + 1) % 3
    setSelectedMode(newModeIndex)
    setMode(modes[newModeIndex])
  }, [selectedMode])

  // Temperature simulation
  useEffect(() => {
    if (!inverterOn) {
      const cooldownInterval = setInterval(() => {
        setTemperature((prev) => {
          // More realistic cooldown curve
          const cooldownRate = (prev - 35) / 10 // Faster cooldown when hotter
          return Math.max(prev - cooldownRate, 35)
        })
      }, 1000)
      return () => clearInterval(cooldownInterval)
    }

    const heatupInterval = setInterval(() => {
      if (inverterOn) {
        // Calculate target temperatures based on load with more variability
        const loadFactor = loadPercentage / 100
        const randomVariation = Math.random() * 2 - 1 // -1 to +1 degree variation
        const targetTemp = 35 + loadFactor * 30 + randomVariation

        // Update temperature with cooling effect
        setTemperature((prev) => {
          const coolingEffect = fanSpeed / 100
          // More dramatic temperature changes
          const heatRate = loadFactor * 1.5
          const coolRate = coolingEffect * 2.5

          const newTemp =
            prev < targetTemp ? Math.min(prev + heatRate, targetTemp) : Math.max(prev - coolRate, targetTemp)

          return newTemp
        })

        // Adjust fan speed based on temperature with more aggressive curve
        if (temperature > 65) {
          setFanSpeed(100)
        } else if (temperature > 55) {
          setFanSpeed(80 + Math.round(Math.random() * 5)) // Add slight variation
        } else if (temperature > 45) {
          setFanSpeed(60 + Math.round(Math.random() * 5))
        } else if (temperature > 40) {
          setFanSpeed(40 + Math.round(Math.random() * 5))
        } else {
          setFanSpeed(20 + Math.round(Math.random() * 5))
        }

        // Simulate energy generation with small random fluctuations
        if (solarConnected && mode === "pv") {
          const generationRate = 0.001 * (1 + (Math.random() * 0.2 - 0.1)) // ±10% variation
          setTotalEnergyGenerated((prev) => prev + generationRate)
        }

        // Simulate battery charging/discharging with more realistic behavior
        if (batteryConnected) {
          if (solarConnected && loadPercentage < 80) {
            // Charging - slower as battery gets fuller
            const chargeRate = 0.01 * (1 - batteryLevel / 150) // Slows down as battery fills
            setBatteryCharging(true)
            setBatteryLevel((prev) => Math.min(prev + chargeRate, 100))
          } else if (loadPercentage > 0) {
            // Discharging - faster as load increases
            const dischargeRate = 0.02 * (loadPercentage / 50)
            setBatteryCharging(false)
            setBatteryLevel((prev) => Math.max(prev - dischargeRate, 0))

            // Set fault condition if battery gets too low
            if (batteryLevel < 10 && !faultCondition && mode === "battery") {
              setFaultCondition(true)
              // Reset fault after 5 seconds
              setTimeout(() => setFaultCondition(false), 5000)
            }
          } else {
            setBatteryCharging(false)
          }
        }

        // Update input frequency based on mode with slight variations
        if (mode === "normal" && gridConnected) {
          setInputFrequency(49.8 + Math.random() * 0.4) // 49.8-50.2 Hz variation
        } else if (mode === "pv" && solarConnected) {
          setInputFrequency(0) // DC input
        } else {
          setInputFrequency(0)
        }

        // Update output frequency with slight variations when on
        if (inverterOn && outputFrequency > 0) {
          setOutputFrequency(49.9 + Math.random() * 0.2) // 49.9-50.1 Hz variation
        }

        // Random fault condition (very rare)
        if (inverterOn && Math.random() < 0.001 && !faultCondition) {
          // 0.1% chance per second
          setFaultCondition(true)
          // Reset fault after 3 seconds
          setTimeout(() => setFaultCondition(false), 3000)
        }
      }
    }, 1000)

    return () => clearInterval(heatupInterval)
  }, [
    inverterOn,
    loadPercentage,
    temperature,
    fanSpeed,
    mode,
    solarConnected,
    gridConnected,
    batteryConnected,
    batteryLevel,
    batteryCharging,
    faultCondition,
    outputFrequency,
    inputVoltage,
  ])

  // Play button click sound
  const playButtonClick = useCallback(() => {
    playSound(buttonClickRef.current)
  }, [])

  // Format number with leading zeros
  const formatNumber = (num: number, digits: number) => {
    return num.toString().padStart(digits, "0")
  }

  return (
    <div
      ref={nodeRef}
      data-node-id="inverter"
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%)`, // Changed from -40% to -50%
        width: `${inverterWidth}px`,
        height: `${inverterHeight}px`,
        maxHeight: "100%", // Changed from 45% to 70%
      }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          overflow: "visible",
          zIndex: 1,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Audio elements for sound effects */}
        <audio
          ref={inverterHumRef}
          src="/sounds/inverter-hum.mp3"
          loop
          preload="auto"
          onError={(e) => {
            // Create a silent audio blob as fallback
            const target = e.target as HTMLAudioElement;
            const silentBlob = new Blob([new Uint8Array([0, 0, 0, 0, 0])], { type: 'audio/mp3' });
            target.src = URL.createObjectURL(silentBlob);
            console.warn("Sound file not found: inverter-hum.mp3 - Audio features disabled");
            setHumVolume(0);
          }}
        />
        <audio
          ref={fanNoiseRef}
          src="/sounds/fan-noise.mp3"
          loop
          preload="none"
          onError={(e) => {
            // Create a silent audio blob as fallback
            const target = e.target as HTMLAudioElement;
            const silentBlob = new Blob([new Uint8Array([0, 0, 0, 0, 0])], { type: 'audio/mp3' });
            target.src = URL.createObjectURL(silentBlob);
            console.warn("Sound file not found: fan-noise.mp3 - Fan sound disabled");
            setFanVolume(0);
          }}
        />
        <audio
          ref={buttonClickRef}
          src="/sounds/button-click.mp3"
          preload="none"
          onError={(e) => {
            // Create a silent audio blob as fallback
            const target = e.target as HTMLAudioElement;
            const silentBlob = new Blob([new Uint8Array([0, 0, 0, 0, 0])], { type: 'audio/mp3' });
            target.src = URL.createObjectURL(silentBlob);
            console.warn("Sound file not found: button-click.mp3 - Button click sound disabled");
          }}
        />
        <audio
          ref={alarmRef}
          src="/sounds/alarm.mp3"
          preload="none"
          onError={(e) => {
            // Create a silent audio blob as fallback
            const target = e.target as HTMLAudioElement;
            const silentBlob = new Blob([new Uint8Array([0, 0, 0, 0, 0])], { type: 'audio/mp3' });
            target.src = URL.createObjectURL(silentBlob);
            console.warn("Sound file not found: alarm.mp3 - Alarm sound disabled");
          }}
        />

        {/* Main inverter housing - only show if showHousing is true */}
        {showHousing && (
          <motion.div
            className="relative"
            style={{
              width: "400px",
              height: "590px",
              background: "linear-gradient(145deg, rgb(217 218 222), rgb(150 156 167))",
              borderRadius: "15px",
              boxShadow:
                "0 10px 20px rgba(0,0,0,0.3), 0 6px 6px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)",
              border: "1px solid rgb(107 112 131)",
            }}
            animate={{
              boxShadow: inverterOn
                ? "0 10px 25px rgba(0,0,0,0.3), 0 6px 6px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1), 0 0 15px rgba(74, 222, 128, 0.3), 0 0 30px rgba(74, 222, 128, 0.2)"
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

            {/* Add metallic texture overlay */}
            <div
              className="absolute inset-0 rounded-[15px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 100%)",
                mixBlendMode: "overlay",
              }}
            />
          </motion.div>
        )}

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
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3), 0 5px 15px rgba(0,0,0,0.2)",
            position: showHousing ? "absolute" : "relative",
            top: showHousing ? "25%" : "50%",
            left: showHousing ? "50%" : "50%",
            transform: showHousing ? "translate(-50%, -25%)" : "translate(-50%, -50%)",
          }}
        >
          {/* Status indicators */}
          <div className="w-full flex justify-between mb-4">
            {/* Solar connection indicator - green when solar is connected */}
            <motion.div
              className="w-6 h-6 rounded-full flex items-center justify-center relative"
              animate={{
                backgroundColor: solarConnected ? "#22c55e" : "#1e293b",
                boxShadow: solarConnected ? "0 0 10px rgba(74, 222, 128, 0.7)" : "none",
              }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
              >
                <rect x="6" y="8" width="12" height="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <line x1="8" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" />
                <line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" />
                <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {solarConnected && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-green-500/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.3, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>

            {/* Grid connection indicator - amber when grid is connected */}
            <motion.div
              className="w-6 h-6 rounded-full flex items-center justify-center relative"
              animate={{
                backgroundColor: gridConnected ? "#f59e0b" : "#1e293b",
                boxShadow: gridConnected ? "0 0 10px rgba(245, 158, 11, 0.7)" : "none",
              }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
              >
                <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 19L19 5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {gridConnected && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-amber-500/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.3, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                />
              )}
            </motion.div>

            {/* Battery indicator - amber when battery is connected */}
            <motion.div
              className="w-6 h-6 rounded-full flex items-center justify-center relative"
              animate={{
                backgroundColor: batteryConnected ? "#f59e0b" : "#1e293b",
                boxShadow: batteryConnected ? "0 0 10px rgba(245, 158, 11, 0.7)" : "none",
              }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
              >
                <rect x="6" y="7" width="12" height="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <line x1="10" y1="4" x2="10" y2="7" stroke="currentColor" strokeWidth="1.5" />
                <line x1="14" y1="4" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" />
                <line x1="9" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.5" />
                <line x1="9" y1="14" x2="15" y2="14" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {batteryConnected && batteryCharging && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-amber-500/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 0.3, 0.7],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.25,
                  }}
                />
              )}
            </motion.div>

            {/* Warning indicator - red when fault condition exists */}
            <motion.div
              className="w-6 h-6 rounded-full flex items-center justify-center relative"
              animate={{
                backgroundColor: faultCondition ? "#ef4444" : "#1e293b",
                boxShadow: faultCondition ? "0 0 10px rgba(239, 68, 68, 0.7)" : "none",
              }}
              transition={{ duration: 0.3 }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black"
              >
                <path d="M12 4L22 20H2L12 4Z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <line x1="12" y1="10" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="16" x2="12" y2="18" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {faultCondition && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-500/50"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>
          </div>

          {/* LCD Display with enhanced glass effect */}
          <motion.div
            className={`w-full h-[280px] mb-4 p-2 relative overflow-hidden lcd-screen ${bootupPhase === 0 ? "power-on-screen" : ""}`}
            style={{
              background: "linear-gradient(to bottom, #052e16, #064e3b)",
              borderRadius: "5px",
              border: "1px solid #064e3b",
              opacity: screenActive ? screenBrightness : 0,
              filter: `brightness(${screenBrightness * 100}%)`,
              visibility: screenActive ? "visible" : "hidden", // Use visibility instead of display
              boxShadow: "inset 0 0 2px rgba(255, 255, 255, 0.2), 0 0 5px rgba(0, 0, 0, 0.5)",
            }}
            animate={{
              boxShadow: screenActive
                ? "inset 0 0 10px rgba(0, 255, 128, 0.2), 0 0 15px rgba(0, 255, 128, 0.1)"
                : "none",
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Add glass reflection effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 100%)",
                mixBlendMode: "overlay",
              }}
            />

            {bootupPhase === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-emerald-400/70 text-sm mb-6">POWER INITIALIZING</div>

                {/* Loading animation */}
                <div className="w-4/5 h-1 bg-emerald-900/50 rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="h-full bg-emerald-500/50"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, ease: "linear" }}
                  />
                </div>

                {/* Flickering text */}
                <motion.div
                  className="text-[10px] text-emerald-600/70 mt-2"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                >
                  SYSTEM BOOT SEQUENCE
                </motion.div>

                {/* Diagnostic text */}
                <motion.div
                  className="absolute bottom-8 left-0 right-0 text-[8px] text-emerald-700/70 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex flex-col items-center">
                    <div>CHECKING HARDWARE...</div>
                    <div className="mt-1">LOADING FIRMWARE v3.2.1</div>
                    <motion.div
                      className="mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      INITIALIZING POWER MODULES
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            )}
            {bootupPhase === 1 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-emerald-400 text-xl"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  INITIALIZING...
                </motion.div>
                <motion.div
                  className="absolute bottom-4 left-0 right-0 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <motion.div
                    className="text-xs text-emerald-600"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                  >
                    GEAN ENERGY SYSTEMS v3.2.1
                  </motion.div>
                </motion.div>
              </div>
            )}

            {bootupPhase === 2 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-emerald-400 text-lg mb-2">SYSTEM CHECK</div>
                <div className="w-3/4 h-2 bg-emerald-900 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-emerald-400"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </div>

                <motion.div
                  className="mt-4 w-full px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px]">
                    <motion.div
                      className="flex justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <span>CPU</span>
                      <span className="text-emerald-500">OK</span>
                    </motion.div>
                    <motion.div
                      className="flex justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.3 }}
                    >
                      <span>MEMORY</span>
                      <span className="text-emerald-500">OK</span>
                    </motion.div>
                    <motion.div
                      className="flex justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.3 }}
                    >
                      <span>SENSORS</span>
                      <span className="text-emerald-500">OK</span>
                    </motion.div>
                    <motion.div
                      className="flex justify-between"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.0, duration: 0.3 }}
                    >
                      <span>CALIBRATION</span>
                      <span className="text-emerald-500">OK</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            )}

            {bootupPhase >= 3 && (
              <div className="flex flex-col h-full text-emerald-400 relative">
                {/* Occasional screen glitch effect */}
                {inverterOn && (
                  <motion.div
                    className="absolute inset-0 bg-emerald-400/5 z-10 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0, 0.2, 0],
                    }}
                    transition={{
                      duration: 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: Math.random() * 20 + 10,
                    }}
                  />
                )}

                {/* Mode selection bar */}
                <div className="w-full flex justify-between border-b border-emerald-900 pb-1 mb-1">
                  <div
                    className={`text-xs flex flex-col items-center ${
                      selectedMode === 0 ? "text-emerald-400" : "text-emerald-700"
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <path d="M8 13C8.5 15 10 16 12 16C14 16 15.5 15 16 13" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                      <circle cx="15" cy="9" r="1.5" fill="currentColor" />
                    </svg>
                    <span className="text-[10px]">Normal</span>
                  </div>
                  <div
                    className={`text-xs flex flex-col items-center ${
                      selectedMode === 1 ? "text-emerald-400" : "text-emerald-700"
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="6" y="8" width="12" height="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <line x1="8" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="text-[10px]">PV Mode</span>
                  </div>
                  <div
                    className={`text-xs flex flex-col items-center ${
                      selectedMode === 2 ? "text-emerald-400" : "text-emerald-700"
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="6" width="8" height="12" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      <line x1="10" y1="4" x2="10" y2="6" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="14" y1="4" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="10" y1="9" x2="14" y2="9" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="text-[10px]">Batt. Mode</span>
                  </div>
                </div>

                {/* Main content area - 2 columns */}
                <div className="grid grid-cols-2 gap-1 flex-1">
                  {/* Left column */}
                  <div className="flex flex-col justify-between">
                    {/* AC Input */}
                    <div className="mb-1">
                      <div className="text-xs flex items-center">
                        <span>AC INPUT</span>
                        {gridConnected && inverterOn && (
                          <motion.span
                            className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}
                      </div>
                      <div className="flex items-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-emerald-400 mr-1"
                        >
                          <path d="M12 3L12 7M12 7L9 7M12 7L15 7" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M5 21L19 21" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M5 7L7 7M17 7L19 7" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M7 7L7 16M17 7L17 16" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M7 11L17 11" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <motion.div
                          className="text-2xl font-digital"
                          animate={
                            inverterOn && gridConnected
                              ? {
                                  opacity: [1, 0.9, 1],
                                }
                              : {}
                          }
                          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                        >
                          {formatNumber(Math.round(inputFrequency), 2)}
                          <span className="text-xs ml-1">Hz</span>
                        </motion.div>
                      </div>
                    </div>

                    {/* Total Energy Generated */}
                    <div className="mb-1">
                      <div className="text-xs flex items-center">
                        <span>TOTAL ENERGY</span>
                        {inverterOn && (
                          <motion.span
                            className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                          />
                        )}
                      </div>
                      <motion.div
                        className="text-2xl font-digital"
                        animate={
                          inverterOn && solarConnected
                            ? {
                                opacity: [1, 0.9, 1],
                              }
                            : {}
                        }
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                      >
                        {formatNumber(Math.floor(totalEnergyGenerated * 100), 5)}
                        <span className="text-xs ml-1">kWh</span>
                      </motion.div>
                    </div>

                    {/* PV Input */}
                    <div className="mb-1">
                      <div className="text-xs flex items-center">
                        <span>PV INPUT</span>
                        {solarConnected && inverterOn && (
                          <motion.span
                            className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.6 }}
                          />
                        )}
                      </div>
                      <div className="flex items-center">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-emerald-400 mr-1"
                        >
                          <rect x="6" y="8" width="12" height="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                          <line x1="8" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        <motion.div
                          className="text-2xl font-digital"
                          animate={
                            inverterOn && solarConnected
                              ? {
                                  opacity: [1, 0.9, 1],
                                }
                              : {}
                          }
                          transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                        >
                          {formatNumber(Math.round(inputVoltage), 2)}
                          <span className="text-xs ml-1">Vdc</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="flex flex-col justify-between">
                    {/* AC Output */}
                    <div className="mb-1">
                      <div className="text-xs flex items-center">
                        <span>AC OUTPUT</span>
                        {inverterOn && (
                          <motion.span
                            className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                          />
                        )}
                      </div>
                      <motion.div
                        className="text-2xl font-digital"
                        animate={
                          inverterOn
                            ? {
                                opacity: [1, 0.9, 1],
                              }
                            : {}
                        }
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                      >
                        {formatNumber(Math.round(outputFrequency), 2)}
                        <span className="text-xs ml-1">Hz</span>
                      </motion.div>
                      <div className="text-xs mt-0.5">
                        {inverterOn && (
                          <motion.span
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            {formatNumber(Math.round(outputVoltage), 3)}
                            <span className="text-[9px] ml-0.5">Vac</span>
                          </motion.span>
                        )}
                      </div>
                    </div>

                    {/* Load Capacity */}
                    <div className="mb-1">
                      <div className="text-xs">LOAD CAP</div>
                      <motion.div
                        className="text-2xl font-digital"
                        animate={
                          inverterOn
                            ? {
                                opacity: [1, 0.9, 1],
                              }
                            : {}
                        }
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                      >
                        {formatNumber(Math.round(loadPercentage), 3)}
                        <span className="text-xs ml-1">%</span>
                      </motion.div>
                      {inverterOn && loadPercentage > 0 && (
                        <div className="w-full h-1 bg-emerald-900/50 mt-1 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-emerald-400"
                            style={{ width: `${loadPercentage}%` }}
                            animate={
                              loadPercentage > 80
                                ? {
                                    opacity: [0.7, 1, 0.7],
                                  }
                                : {}
                            }
                            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Battery Capacity */}
                    <div className="mb-1">
                      <div className="text-xs flex items-center">
                        <span>BATT CAP</span>
                        {batteryConnected && batteryCharging && (
                          <motion.span
                            className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-amber-400"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}
                      </div>
                      <motion.div
                        className="text-2xl font-digital"
                        animate={
                          inverterOn && batteryConnected
                            ? {
                                opacity: [1, 0.9, 1],
                              }
                            : {}
                        }
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                      >
                        {formatNumber(Math.round(batteryLevel), 3)}
                        <span className="text-xs ml-1">%</span>
                      </motion.div>
                      {inverterOn && batteryConnected && (
                        <div className="w-full h-1 bg-emerald-900/50 mt-1 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-emerald-400"
                            style={{ width: `${batteryLevel}%` }}
                            animate={
                              batteryCharging
                                ? {
                                    opacity: [0.7, 1, 0.7],
                                  }
                                : {}
                            }
                            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* System status bar */}
                <div className="mt-auto mb-1 border-t border-emerald-900/50 pt-1 text-[10px] flex justify-between">
                  <div>
                    TEMP: {formatNumber(Math.round(temperature), 2)}°C
                    {temperature > 60 && (
                      <motion.span
                        className="ml-1 text-red-400"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        !
                      </motion.span>
                    )}
                  </div>
                  <div>FAN: {formatNumber(Math.round(fanSpeed), 2)}%</div>
                  <motion.div
                    animate={
                      inverterOn
                        ? {
                            opacity: [0.7, 1, 0.7],
                          }
                        : {}
                    }
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {mode === "normal" ? "GRID MODE" : mode === "pv" ? "SOLAR MODE" : "BATTERY MODE"}
                  </motion.div>
                </div>

                {/* System Diagram - centered at bottom */}
                <div className="h-16 flex-shrink-0">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 240 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-emerald-400"
                  >
                    {/* Inverter box in center */}
                    <rect x="100" y="10" width="40" height="40" stroke="currentColor" strokeWidth="1" fill="none" />
                    <text x="120" y="35" textAnchor="middle" className="text-[8px]" fill="currentColor">
                      MPPT
                    </text>

                    {/* Solar panel */}
                    <rect x="20" y="15" width="40" height="15" stroke="currentColor" strokeWidth="1" fill="none" />
                    <line x1="30" y1="15" x2="30" y2="30" stroke="currentColor" strokeWidth="1" />
                    <line x1="40" y1="15" x2="40" y2="30" stroke="currentColor" strokeWidth="1" />
                    <line x1="50" y1="15" x2="50" y2="30" stroke="currentColor" strokeWidth="1" />
                    <line x1="20" y1="22" x2="60" y2="22" stroke="currentColor" strokeWidth="1" />

                    {/* Solar panel glow when active */}
                    {inverterOn && solarConnected && (
                      <motion.rect
                        x="20"
                        y="15"
                        width="40"
                        height="15"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="currentColor"
                        fillOpacity="0.2"
                        animate={{ fillOpacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      />
                    )}

                    {/* House/load */}
                    <rect x="180" y="15" width="40" height="15" stroke="currentColor" strokeWidth="1" fill="none" />
                    <line x1="190" y1="30" x2="190" y2="20" stroke="currentColor" strokeWidth="1" />
                    <line x1="210" y1="30" x2="210" y2="20" stroke="currentColor" strokeWidth="1" />
                    <path d="M185 20L215 20" stroke="currentColor" strokeWidth="1" />
                    <path d="M200 15L200 10" stroke="currentColor" strokeWidth="1" />

                    {/* House glow when active */}
                    {inverterOn && loadPercentage > 0 && (
                      <motion.rect
                        x="180"
                        y="15"
                        width="40"
                        height="15"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="currentColor"
                        fillOpacity="0.2"
                        animate={{ fillOpacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                      />
                    )}

                    {/* Battery */}
                    <rect
                      x="100"
                      y="55"
                      width="40"
                      height="10"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                      transform="translate(0, -15)"
                    />
                    <line x1="110" y1="40" x2="110" y2="50" stroke="currentColor" strokeWidth="1" />
                    <line x1="130" y1="40" x2="130" y2="50" stroke="currentColor" strokeWidth="1" />

                    {/* Battery glow when active */}
                    {inverterOn && batteryConnected && (
                      <motion.rect
                        x="100"
                        y="40"
                        width="40"
                        height="10"
                        stroke="currentColor"
                        strokeWidth="1"
                        fill="currentColor"
                        fillOpacity="0.2"
                        animate={{ fillOpacity: [0.1, 0.3, 0.1] }}
                        transition={{ duration: batteryCharging ? 1 : 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                      />
                    )}

                    {/* Connections */}
                    <line x1="60" y1="22" x2="100" y2="22" stroke="currentColor" strokeWidth="1" />
                    <line x1="140" y1="22" x2="180" y2="22" stroke="currentColor" strokeWidth="1" />
                    <line x1="120" y1="50" x2="120" y2="40" stroke="currentColor" strokeWidth="1" />

                    {/* Flow indicators when inverter is on */}
                    {inverterOn && (
                      <>
                        {solarConnected && (
                          <motion.circle
                            cx="80"
                            cy="22"
                            r="2"
                            fill="currentColor"
                            animate={{
                              opacity: [0.3, 1, 0.3],
                              scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                          />
                        )}
                        <motion.circle
                          cx="160"
                          cy="22"
                          r="2"
                          fill="currentColor"
                          animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [0.8, 1.2, 0.8],
                          }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                        />
                        {batteryConnected && (
                          <motion.circle
                            cx="120"
                            cy="45"
                            r="2"
                            fill="currentColor"
                            animate={{
                              opacity: [0.3, 1, 0.3],
                              scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                          />
                        )}

                        {/* Additional flow particles */}
                        {solarConnected && (
                          <>
                            <motion.circle
                              cx="70"
                              cy="22"
                              r="1.5"
                              fill="currentColor"
                              initial={{ opacity: 0, x: -40 }}
                              animate={{
                                opacity: [0, 0.8, 0],
                                x: [-10, 30],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: 0.7,
                              }}
                            />
                            <motion.circle
                              cx="90"
                              cy="22"
                              r="1.5"
                              fill="currentColor"
                              initial={{ opacity: 0, x: -40 }}
                              animate={{
                                opacity: [0, 0.8, 0],
                                x: [-10, 30],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: 1.4,
                              }}
                            />
                          </>
                        )}

                        {/* Output flow particles */}
                        <motion.circle
                          cx="150"
                          cy="22"
                          r="1.5"
                          fill="currentColor"
                          initial={{ opacity: 0, x: -40 }}
                          animate={{
                            opacity: [0, 0.8, 0],
                            x: [0, 40],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: 0.3,
                          }}
                        />
                        <motion.circle
                          cx="170"
                          cy="22"
                          r="1.5"
                          fill="currentColor"
                          initial={{ opacity: 0, x: -40 }}
                          animate={{
                            opacity: [0, 0.8, 0],
                            x: [0, 40],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: 1.1,
                          }}
                        />

                        {/* Battery flow particles */}
                        {batteryConnected && (
                          <>
                            <motion.circle
                              cx="120"
                              cy="42"
                              r="1.5"
                              fill="currentColor"
                              initial={{ opacity: 0, y: batteryCharging ? 10 : -10 }}
                              animate={{
                                opacity: [0, 0.8, 0],
                                y: batteryCharging ? [-5, -15] : [5, 15],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: 0.5,
                              }}
                            />
                            <motion.circle
                              cx="120"
                              cy="47"
                              r="1.5"
                              fill="currentColor"
                              initial={{ opacity: 0, y: batteryCharging ? 10 : -10 }}
                              animate={{
                                opacity: [0, 0.8, 0],
                                y: batteryCharging ? [-5, -15] : [5, 15],
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: 1.2,
                              }}
                            />
                          </>
                        )}
                      </>
                    )}
                  </svg>
                </div>
              </div>
            )}
          </motion.div>

          {/* Control buttons with enhanced styling */}
          <div className="w-full flex justify-between mt-4">
            {/* CONF Button */}
            <div className="flex flex-col items-center">
              <motion.button
                className="w-12 h-12 relative focus:outline-none"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playButtonClick()
                  // Toggle configuration mode
                  setConfigMode(!configMode)
                  if (!screenActive) {
                    activateScreen()
                  }

                  // In config mode, cycle through different settings
                  if (configMode) {
                    setDisplayOption((prev) => (prev + 1) % 3)
                  }
                }}
              >
                <motion.div
                  className="w-10 h-10 mx-auto bg-gray-900 rounded-full flex items-center justify-center"
                  animate={{
                    backgroundColor: configMode ? "#1e293b" : "#0f172a",
                    y: configMode ? 1 : 0,
                    boxShadow: configMode
                      ? "inset 0 2px 4px rgba(0,0,0,0.5)"
                      : "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1), 0 0 5px rgba(0,0,0,0.2)",
                  }}
                  transition={{ duration: 0.1 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                  >
                    <path
                      d="M14 6L8 12L14 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
                <div className="absolute inset-0 rounded-full pointer-events-none"></div>
              </motion.button>
              <span className="text-xs text-gray-400 mt-1">CONF</span>
            </div>

            {/* First SELECT Button */}
            <div className="flex flex-col items-center">
              <motion.button
                className="w-12 h-12 relative focus:outline-none"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playButtonClick()
                  if (screenActive) {
                    changeMode()

                    // Update display based on mode
                    if (mode === "pv") {
                      setSolarConnected(true)
                      setGridConnected(false)
                    } else if (mode === "normal") {
                      setGridConnected(true)
                    } else if (mode === "battery") {
                      setBatteryConnected(true)
                      setGridConnected(false)
                    }
                  } else {
                    activateScreen()
                  }
                }}
              >
                <div
                  className="w-10 h-10 mx-auto bg-gray-900 rounded-full flex items-center justify-center"
                  style={{
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                  >
                    <path
                      d="M19 12H5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 5L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-full pointer-events-none"></div>
              </motion.button>
              <span className="text-xs text-gray-400 mt-1">SELECT</span>
            </div>

            {/* Second SELECT Button */}
            <div className="flex flex-col items-center">
              <motion.button
                className="w-12 h-12 relative focus:outline-none"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playButtonClick()
                  if (screenActive) {
                    // Cycle through display options
                    setDisplayOption((prev) => (prev + 1) % 3)

                    // Update some values to simulate changing readings
                    setInputVoltage((prev) => (prev === 48 ? 52 : prev === 52 ? 56 : 48))
                    setLoadPercentage((prev) => Math.min(100, prev + 10))
                    if (loadPercentage > 90) {
                      setLoadPercentage(0)
                    }
                  } else {
                    activateScreen()
                  }
                }}
              >
                <div
                  className="w-10 h-10 mx-auto bg-gray-900 rounded-full flex items-center justify-center"
                  style={{
                    boxShadow: "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                  >
                    <circle cx="12" cy="12" r="2" fill="currentColor" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-full pointer-events-none"></div>
              </motion.button>
              <span className="text-xs text-gray-400 mt-1">SELECT</span>
            </div>

            {/* ENTER Button - Highlighted when inverter is off */}
            <div className="flex flex-col items-center">
              <motion.button
                className="w-12 h-12 relative focus:outline-none"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playButtonClick()
                  toggleInverter()

                  // Always ensure screen is active when inverter is on
                  if (!inverterOn && !screenActive) {
                    activateScreen()
                  }

                  // Update connection status based on mode when turning on
                  if (!inverterOn) {
                    if (mode === "pv") {
                      setSolarConnected(true)
                    } else if (mode === "normal") {
                      setGridConnected(true)
                    } else if (mode === "battery") {
                      setBatteryConnected(true)
                    }
                  }
                }}
              >
                <motion.div
                  className="w-10 h-10 mx-auto bg-gray-900 rounded-full flex items-center justify-center"
                  animate={{
                    backgroundColor: inverterOn ? "#1e293b" : "#0f172a",
                    y: inverterOn ? 1 : 0,
                    boxShadow: inverterOn
                      ? "inset 0 2px 4px rgba(0,0,0,0.5)"
                      : "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.1)",
                  }}
                  transition={{ duration: 0.1 }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`text-gray-400 ${!inverterOn ? "text-green-400" : ""}`}
                  >
                    <path
                      d="M7 17L17 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 7H17V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
                {/* Pulsing highlight effect for the ENTER button when inverter is off */}
                {!inverterOn && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-green-500/20 pointer-events-none"
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.button>
              <span className={`text-xs mt-1 ${!inverterOn ? "text-green-400 font-medium" : "text-gray-400"}`}>
                {!inverterOn ? "START" : "ENTER"}
              </span>
            </div>
          </div>
        </div>

        {/* Connection point with enhanced glow effect */}
        <motion.div
          ref={connectionPointRef}
          className="absolute rounded-full border-2"
          style={{
            right: "0",
            top: "50%",
            transform: "translate(50%, -50%)",
            width: `${scale * 12}px`,
            height: `${scale * 12}px`,
            zIndex: 2,
          }}
          animate={{
            backgroundColor: inverterOn ? "#4ade80" : "#475569",
            borderColor: inverterOn ? "#22c55e" : "#334155",
            boxShadow: inverterOn
              ? "0 0 8px 2px rgba(74, 222, 128, 0.5), 0 0 15px 5px rgba(74, 222, 128, 0.2)"
              : "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
          transition={{ duration: 0.3 }}
          data-handle-id="inverter-output"
          data-connection-point="true"
        />

        {/* Ambient particles around the inverter when active */}
        {inverterOn && (
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={`inverter-particle-${i}`}
                className="absolute rounded-full bg-green-400/40"
                style={{
                  width: 2 + Math.random() * 3,
                  height: 2 + Math.random() * 3,
                  filter: "blur(1px)",
                  left: `${50 + (Math.random() * 40 - 20)}%`,
                  top: `${50 + (Math.random() * 40 - 20)}%`,
                }}
                animate={{
                  x: [0, Math.random() * 20 - 10],
                  y: [0, Math.random() * 20 - 10],
                  opacity: [0, 0.7, 0],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Activation prompt with enhanced styling */}
      {showActivatePrompt && (
        <motion.div
          className="absolute bottom-0 left-[120%] transform -translate-x-[50px] translate-y-[160%] bg-gradient-to-r from-orange-600 to-orange-500 text-white px-3 py-1.5 rounded-md text-xs font-medium shadow-lg z-10 overflow-hidden cursor-pointer"
          initial={{ opacity: 0, y: -5 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 0.5,
            scale: {
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
          }}
          onClick={() => toggleInverter()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            boxShadow: "0 0 15px rgba(249, 115, 22, 0.4), 0 4px 6px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <div className="flex items-center gap-1 relative z-10">
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="animate-pulse"
            >
              <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M19 12L5 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Activate</span>
          </div>
          <motion.div
            className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-orange-500 rotate-45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          />

          {/* Glass effect overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 100%)",
              mixBlendMode: "overlay",
            }}
          />

          {/* Ripple effect */}
          <motion.div
            className="ripple absolute inset-0 pointer-events-none"
            initial={{ scale: 0, opacity: 0.7 }}
            whileHover={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            style={{ backgroundColor: "rgba(255, 165, 0, 0.3)" }}
          />
        </motion.div>
      )}

      {/* CSS for animations and display */}
      <style jsx>{`
        @keyframes vibrate {
          0%, 100% { transform: translate(0, 0) rotate(0); }
          25% { transform: translate(-0.5px, 0.5px) rotate(0.1deg); }
          50% { transform: translate(0.5px, -0.5px) rotate(-0.1deg); }
          75% { transform: translate(-0.5px, -0.5px) rotate(0.2deg); }
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); opacity: 0.2; }
          50% { opacity: 0.3; }
          100% { transform: translateY(100%); opacity: 0.2; }
        }

        @keyframes flicker {
          0%, 100% { opacity: 1.0; }
          92% { opacity: 0.95; }
          96% { opacity: 0.9; }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0, 0) skew(0deg); }
          20% { transform: translate(-2px, 0) skew(0.5deg); }
          40% { transform: translate(2px, 0) skew(-0.5deg); }
          60% { transform: translate(0, 0) skew(0deg); }
          80% { transform: translate(1px, -1px) skew(0.25deg); }
        }

        .font-digital {
          font-family: monospace;
          letter-spacing: 1px;
          font-weight: 500;
        }

        /* Add scanline effect to the display */
        .lcd-screen::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(to bottom, rgba(0, 255, 128, 0.15), transparent);
          animation: scanline 8s linear infinite;
          pointer-events: none;
          zIndex: 10;
        }
        
        /* Add second scanline effect */
        .lcd-screen::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(to bottom, rgba(0, 255, 128, 0.1), transparent);
          animation: scanline 12s linear infinite;
          animation-delay: 4s;
          pointer-events: none;
          zIndex: 10;
        }

        /* Add subtle flicker to the display */
        .lcd-screen {
          animation: flicker 4s infinite;
        }
        
        /* Occasional glitch effect */
        .lcd-screen:hover {
          animation: glitch 0.2s ease-in-out;
        }

        /* Add this to the existing style jsx section */
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .ripple {
          background-color: rgba(255, 165, 0, 0.3);
          border-radius: 50%;
          transform-origin: center;
        }

        /* Add hover effect for the activate button */
        .activate-button:hover {
          box-shadow: 0 0 15px rgba(249, 115, 22, 0.7);
        }

        @keyframes powerOnFlicker {
          0% { opacity: 0.1; }
          5% { opacity: 0.3; }
          10% { opacity: 0.1; }
          15% { opacity: 0.5; }
          20% { opacity: 0.2; }
          25% { opacity: 0.7; }
          30% { opacity: 0.3; }
          35% { opacity: 0.8; }
          40% { opacity: 0.4; }
          45% { opacity: 0.9; }
          50% { opacity: 1; }
          55% { opacity: 0.8; }
          60% { opacity: 1; }
          100% { opacity: 1; }
        }

        .power-on-screen {
          animation: powerOnFlicker 1.2s ease-in-out;
        }
      `}</style>
    </div>
  )
}
