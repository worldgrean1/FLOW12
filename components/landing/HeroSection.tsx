"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Zap, ChevronDown } from "lucide-react"

interface HeroSectionProps {
  bulbActive: boolean
  switchActive: boolean
}

export default function HeroSection({ bulbActive, switchActive }: HeroSectionProps) {
  return (
    <AnimatePresence mode="wait">
      {!bulbActive ? (
        <div className="text-center py-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-green-400 text-lg font-medium"
          >
            <p>Click the inverter and toggle the switch to illuminate the system</p>
            <div className="mt-4 flex justify-center">
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ChevronDown className="h-6 w-6 text-green-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      ) : (
        <motion.section
          className={`px-4 sm:px-6 transition-all duration-500 ${bulbActive ? "py-2" : "py-4"}`}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }} // Delay to ensure first animation completes
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }} // Increased delay
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-4 bg-green-600 text-white"
              >
                Powering a Sustainable Future
              </motion.div>

              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-4xl text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.0 }} // Increased delay
              >
                <motion.span
                  className="inline-block"
                  animate={
                    switchActive
                      ? {
                          y: [0, -5, 0],
                          textShadow: switchActive ? "0 0 10px rgba(74, 222, 128, 0.5)" : "none",
                        }
                      : {}
                  }
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.1,
                  }}
                >
                  Intelligent
                </motion.span>{" "}
                <motion.span
                  className="inline-block"
                  animate={
                    switchActive
                      ? {
                          y: [0, -5, 0],
                          textShadow: switchActive ? "0 0 10px rgba(74, 222, 128, 0.5)" : "none",
                        }
                      : {}
                  }
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                >
                  Energy
                </motion.span>{" "}
                <motion.span
                  className={`inline-block ${switchActive ? "text-glow" : ""} text-green-400`}
                  animate={
                    switchActive
                      ? {
                          y: [0, -5, 0],
                          textShadow: [
                            "0 0 10px rgba(74, 222, 128, 0.5)",
                            "0 0 20px rgba(74, 222, 128, 0.8)",
                            "0 0 10px rgba(74, 222, 128, 0.5)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  Systems
                </motion.span>{" "}
                <motion.span
                  animate={
                    switchActive
                      ? {
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.2, 1],
                          filter: [
                            "drop-shadow(0 0 5px rgba(74, 222, 128, 0.5))",
                            "drop-shadow(0 0 10px rgba(74, 222, 128, 0.8))",
                            "drop-shadow(0 0 5px rgba(74, 222, 128, 0.5))",
                          ],
                        }
                      : {}
                  }
                  transition={switchActive ? { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 } : {}}
                >
                  <Zap
                    className={`inline-block h-8 w-8 ${switchActive ? "text-green-400 filter-glow" : "text-green-400"}`}
                  />
                </motion.span>
              </motion.h2>

              <motion.p
                className="text-slate-300 text-base md:text-lg max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1 }} // Increased delay
              >
                <span className="italic text-[#3DD56D]">"At GREAN WORLD</span> Energy Technology, we don't just sell
                solar — we deliver intelligent energy systems built for reliability, efficiency, and a{" "}
                <span className="text-[#3DD56D] font-medium">sustainable future</span>
                ."
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 justify-center mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.2 }} // Increased delay
              >
                {/* Buttons removed as requested in the original */}
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
