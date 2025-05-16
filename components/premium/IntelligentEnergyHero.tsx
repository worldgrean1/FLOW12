"use client"

import { motion } from "framer-motion"
import TealEnergyBackground from "./TealEnergyBackground"
import { useEffect, useState } from "react"
import { Zap } from "lucide-react"

export default function IntelligentEnergyHero() {
  const [isActive, setIsActive] = useState(false)

  // Auto-activate after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <TealEnergyBackground />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-32">
        {/* Title and Subtitle */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <span className="text-white">Intelligent Energy </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-green-500 ml-2">
              Systems
            </span>
            <Zap className="w-12 h-12 ml-3 text-green-500" />
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-teal-100/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <span className="text-green-400">"At GREAN WORLD</span> Energy Technology, we don't just sell solar — we
            deliver intelligent energy systems built for reliability, efficiency, and a{" "}
            <span className="text-green-400">sustainable future.</span>"
          </motion.p>
        </motion.div>

        {/* Energy Flow Diagram */}
        <div className="relative max-w-5xl mx-auto mt-10 h-[300px] md:h-[400px]">
          {/* Inverter */}
          <motion.div
            className="absolute left-0 bottom-1/2 transform translate-y-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="relative w-[180px] h-[220px] bg-slate-800/80 rounded-lg border border-teal-900 shadow-lg flex flex-col">
              {/* Inverter Screen */}
              <div className="m-3 flex-1 bg-slate-900 rounded-md p-3 overflow-hidden">
                <div className="text-xs text-teal-500 mb-1 flex justify-between">
                  <span>GENERATION</span>
                  <span>EFFICIENCY</span>
                  <span>STATUS</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="text-teal-400 text-sm">
                    <div className="font-mono">10.1 kW</div>
                    <div className="text-xs text-teal-600">CURRENT</div>
                  </div>
                  <div className="text-teal-400 text-sm">
                    <div className="font-mono">98.5%</div>
                    <div className="text-xs text-teal-600">RATE</div>
                  </div>
                  <div className="text-teal-400 text-sm">
                    <div className="font-mono">ACTIVE</div>
                    <div className="text-xs text-teal-600">SYSTEM</div>
                  </div>
                </div>

                <div className="mt-3 border-t border-teal-900/50 pt-2">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="text-teal-400 text-sm">
                      <div className="font-mono">8.2kWh</div>
                      <div className="text-xs text-teal-600">STORED</div>
                    </div>
                    <div className="text-teal-400 text-sm">
                      <div className="font-mono">3.7kW</div>
                      <div className="text-xs text-teal-600">USAGE</div>
                    </div>
                    <div className="text-teal-400 text-sm">
                      <div className="font-mono">13.4h</div>
                      <div className="text-xs text-teal-600">BACKUP</div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 border-t border-teal-900/50 pt-2">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="text-teal-400 text-sm">
                      <div className="font-mono">31.5 kWh</div>
                      <div className="text-xs text-teal-600">TODAY</div>
                    </div>
                    <div className="text-teal-400 text-sm">
                      <div className="font-mono">0.0</div>
                      <div className="text-xs text-teal-600">ALERTS</div>
                    </div>
                    <div className="text-teal-400 text-sm">
                      <div className="font-mono">13.5°C</div>
                      <div className="text-xs text-teal-600">TEMP</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inverter Label */}
              <div className="text-center py-2 text-teal-400 font-medium tracking-widest">INVERTER</div>
            </div>
          </motion.div>

          {/* Switch */}
          <motion.div
            className="absolute left-1/2 bottom-1/2 transform -translate-x-1/2 translate-y-1/2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <div
              className={`w-[80px] h-[80px] rounded-md bg-slate-800/80 border border-teal-900 flex items-center justify-center cursor-pointer transition-all duration-300 ${isActive ? "shadow-[0_0_15px_rgba(0,255,200,0.5)]" : ""}`}
              onClick={() => setIsActive(!isActive)}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? "bg-teal-500/20" : "bg-slate-700"}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? "bg-teal-400/30" : "bg-slate-600"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${isActive ? "bg-teal-300/40" : "bg-slate-500"}`}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`w-5 h-5 transition-all duration-500 ${isActive ? "text-teal-100 rotate-0" : "text-slate-400 rotate-180"}`}
                    >
                      <path
                        d="M12 4V12M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-2 text-teal-400 font-medium">Switch</div>
          </motion.div>

          {/* Light Bulb */}
          <motion.div
            className="absolute right-0 bottom-1/2 transform translate-y-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <div className="relative flex flex-col items-center">
              {/* Bulb */}
              <div className="relative">
                <div
                  className={`w-[100px] h-[150px] transition-all duration-700 ${isActive ? "opacity-100" : "opacity-40"}`}
                >
                  {/* Bulb Glass */}
                  <div className="absolute top-0 w-[60px] h-[60px] left-1/2 transform -translate-x-1/2 rounded-full bg-teal-900/30 backdrop-blur-sm border border-teal-800/50"></div>

                  {/* Bulb Inner */}
                  <div
                    className={`absolute top-0 w-[50px] h-[50px] left-1/2 transform -translate-x-1/2 rounded-full transition-all duration-700 ${isActive ? "bg-teal-400/30" : "bg-slate-800/50"}`}
                  ></div>

                  {/* Bulb Filament */}
                  <div
                    className={`absolute top-[25px] w-[30px] h-[30px] left-1/2 transform -translate-x-1/2 transition-all duration-700 ${isActive ? "bg-teal-300/80" : "bg-slate-700/50"} rounded-full flex items-center justify-center`}
                  >
                    <div
                      className={`w-[20px] h-[20px] rounded-full transition-all duration-700 ${isActive ? "bg-teal-200" : "bg-slate-600/50"} flex items-center justify-center`}
                    >
                      <div
                        className={`w-[10px] h-[10px] rounded-full transition-all duration-700 ${isActive ? "bg-white" : "bg-slate-500/50"}`}
                      ></div>
                    </div>
                  </div>

                  {/* Bulb Base */}
                  <div className="absolute top-[60px] w-[30px] h-[40px] left-1/2 transform -translate-x-1/2 bg-slate-700 rounded-b-md border-t-2 border-slate-600"></div>

                  {/* Bulb Connector */}
                  <div className="absolute top-[100px] w-[15px] h-[20px] left-1/2 transform -translate-x-1/2 bg-yellow-700"></div>
                </div>

                {/* Glow Effect */}
                {isActive && (
                  <div className="absolute top-[25px] left-1/2 transform -translate-x-1/2 w-[100px] h-[100px] rounded-full bg-teal-400/20 filter blur-xl animate-pulse"></div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
            {/* Inverter to Switch */}
            <motion.path
              d={`M 180,${200} L ${window.innerWidth / 2 - 40},${200}`}
              stroke={isActive ? "#5eead4" : "#164e63"}
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 1,
                stroke: isActive ? "#5eead4" : "#164e63",
              }}
              transition={{
                delay: 2,
                duration: 1.5,
                stroke: { duration: 0.5 },
              }}
            />

            {/* Switch to Bulb */}
            <motion.path
              d={`M ${window.innerWidth / 2 + 40},${200} L ${window.innerWidth - 180},${200}`}
              stroke={isActive ? "#5eead4" : "#164e63"}
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 1,
                stroke: isActive ? "#5eead4" : "#164e63",
              }}
              transition={{
                delay: 2.5,
                duration: 1.5,
                stroke: { duration: 0.5 },
              }}
            />

            {/* Animated Energy Particles */}
            {isActive && (
              <>
                <motion.circle
                  cx="0"
                  cy="200"
                  r="4"
                  fill="#5eead4"
                  filter="drop-shadow(0 0 8px #5eead4)"
                  animate={{
                    cx: [180, window.innerWidth / 2 - 40],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                <motion.circle
                  cx="0"
                  cy="200"
                  r="4"
                  fill="#5eead4"
                  filter="drop-shadow(0 0 8px #5eead4)"
                  animate={{
                    cx: [window.innerWidth / 2 + 40, window.innerWidth - 180],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                    delay: 0.5,
                  }}
                />
              </>
            )}
          </svg>
        </div>

        {/* Feature Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
        >
          <button className="px-6 py-3 rounded-full bg-teal-900/30 border border-teal-700/50 text-teal-400 hover:bg-teal-800/40 transition-all duration-300 flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3v4M12 21v-4M5.636 5.636l2.828 2.828M15.536 15.536l2.828 2.828M3 12h4M21 12h-4M5.636 18.364l2.828-2.828M15.536 8.464l2.828-2.828"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Solar Energy
          </button>

          <button className="px-6 py-3 rounded-full bg-teal-900/30 border border-teal-700/50 text-teal-400 hover:bg-teal-800/40 transition-all duration-300 flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M4 10h16M4 14h16M7 4v16M17 4v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Battery Storage
          </button>

          <button className="px-6 py-3 rounded-full bg-teal-900/30 border border-teal-700/50 text-teal-400 hover:bg-teal-800/40 transition-all duration-300 flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 4v4M4 12h4M12 20v-4M20 12h-4M6.343 6.343l2.828 2.828M6.343 17.657l2.828-2.828M17.657 6.343l-2.828 2.828M17.657 17.657l-2.828-2.828"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Smart Grids
          </button>

          <button className="px-6 py-3 rounded-full bg-teal-900/30 border border-teal-700/50 text-teal-400 hover:bg-teal-800/40 transition-all duration-300 flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M12 4v4M4 12h4M12 20v-4M20 12h-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Monitoring
          </button>
        </motion.div>
      </div>
    </div>
  )
}
