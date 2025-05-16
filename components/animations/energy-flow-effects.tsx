"use client"

import { useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { Leaf, SunMedium, Zap } from "lucide-react"

interface EnergyFlowEffectsProps {
  inverterOn: boolean
  switchOn: boolean
  bulbOn: boolean
  wordIlluminated: boolean
  inverterPosition: { x: number; y: number }
  switchPosition: { x: number; y: number }
  bulbPosition: { x: number; y: number }
  wordPosition: { x: number; y: number }
  animationPhase: number
}

export default function EnergyFlowEffects({
  inverterOn,
  switchOn,
  bulbOn,
  wordIlluminated,
  inverterPosition,
  switchPosition,
  bulbPosition,
  wordPosition,
  animationPhase,
}: EnergyFlowEffectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline>()

  // Memoize particle configurations
  const particleConfig = useMemo(() => ({
    count: 8,
    duration: 1.5,
    stagger: 0.1,
    repeatDelay: 0.5,
    ease: "power1.inOut",
  }), [])

  useEffect(() => {
    if (!containerRef.current) return

    // Kill existing timeline if it exists
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // Create new timeline
    const tl = gsap.timeline({ paused: true })
    timelineRef.current = tl

    // Create particle containers
    const createParticleContainer = (className: string) => {
      const container = document.createElement("div")
      container.className = `absolute inset-0 pointer-events-none ${className}`
      containerRef.current?.appendChild(container)
      return container
    }

    const inverterSwitchContainer = createParticleContainer("inverter-switch-particles")
    const switchBulbContainer = createParticleContainer("switch-bulb-particles")
    const bulbWordContainer = createParticleContainer("bulb-word-particles")

    // Create particles
    const createParticles = (container: HTMLElement, count: number) => {
      for (let i = 0; i < count; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"
        container.appendChild(particle)
      }
    }

    createParticles(inverterSwitchContainer, particleConfig.count)
    createParticles(switchBulbContainer, particleConfig.count)
    createParticles(bulbWordContainer, particleConfig.count)

    // Inverter to switch energy flow
    if (inverterOn) {
      tl.to(
        ".inverter-switch-particles .particle",
        {
          startAt: {
            x: inverterPosition.x,
            y: inverterPosition.y,
            opacity: 0,
            scale: 0.5,
          },
          x: switchPosition.x,
          y: switchPosition.y,
          opacity: (i) => 0.7 - i * 0.05,
          scale: 1,
          duration: particleConfig.duration,
          stagger: {
            each: particleConfig.stagger,
            repeat: -1,
            repeatDelay: particleConfig.repeatDelay,
          },
          ease: particleConfig.ease,
        },
        "<"
      )

      // Switch to bulb energy flow
      if (switchOn) {
        tl.to(
          ".switch-bulb-particles .particle",
          {
            startAt: {
              x: switchPosition.x,
              y: switchPosition.y,
              opacity: 0,
              scale: 0.5,
            },
            x: bulbPosition.x,
            y: bulbPosition.y,
            opacity: (i) => 0.7 - i * 0.05,
            scale: 1,
            duration: particleConfig.duration,
            stagger: {
              each: particleConfig.stagger,
              repeat: -1,
              repeatDelay: particleConfig.repeatDelay,
            },
            ease: particleConfig.ease,
          },
          "<0.2"
        )

        // Bulb to word energy flow
        if (bulbOn) {
          tl.to(
            ".bulb-word-particles .particle",
            {
              startAt: {
                x: bulbPosition.x,
                y: bulbPosition.y,
                opacity: 0,
                scale: 0.5,
              },
              x: wordPosition.x,
              y: wordPosition.y,
              opacity: (i) => 0.7 - i * 0.05,
              scale: 1,
              duration: particleConfig.duration,
              stagger: {
                each: particleConfig.stagger,
                repeat: -1,
                repeatDelay: particleConfig.repeatDelay,
              },
              ease: particleConfig.ease,
            },
            "<0.2"
          )
        }
      }
    }

    tl.play()

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      // Remove particle containers
      inverterSwitchContainer.remove()
      switchBulbContainer.remove()
      bulbWordContainer.remove()
    }
  }, [
    inverterOn,
    switchOn,
    bulbOn,
    inverterPosition,
    switchPosition,
    bulbPosition,
    wordPosition,
    particleConfig,
  ])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-5">
      {/* Inverter to switch energy particles */}
      <div className="inverter-switch-particles">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`inverter-switch-${i}`}
            className="particle absolute rounded-full"
            style={{
              width: 6 - i * 0.5,
              height: 6 - i * 0.5,
              backgroundColor: `hsl(${140 + i * 5}, 80%, 60%)`,
              filter: "blur(2px)",
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Switch to bulb energy particles */}
      <div className="switch-bulb-particles">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`switch-bulb-${i}`}
            className="particle absolute rounded-full"
            style={{
              width: 6 - i * 0.5,
              height: 6 - i * 0.5,
              backgroundColor: `hsl(${140 + i * 5}, 80%, 60%)`,
              filter: "blur(2px)",
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Bulb to word energy particles */}
      <div className="bulb-word-particles">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`bulb-word-${i}`}
            className="particle absolute rounded-full"
            style={{
              width: 6 - i * 0.5,
              height: 6 - i * 0.5,
              backgroundColor: `hsl(${140 + i * 5}, 80%, 60%)`,
              filter: "blur(2px)",
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Energy connection paths */}
      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        <defs>
          <linearGradient id="energyPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(74, 222, 128, 0.1)" />
            <stop offset="50%" stopColor="rgba(74, 222, 128, 0.3)" />
            <stop offset="100%" stopColor="rgba(74, 222, 128, 0.1)" />
          </linearGradient>

          <filter id="energyGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Inverter to switch path */}
        {inverterOn && (
          <motion.path
            d={`M ${inverterPosition.x},${inverterPosition.y} Q ${(inverterPosition.x + switchPosition.x) / 2},${
              (inverterPosition.y + switchPosition.y) / 2 - 30
            } ${switchPosition.x},${switchPosition.y}`}
            fill="none"
            stroke="url(#energyPathGradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
            filter="url(#energyGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        )}

        {/* Switch to bulb path */}
        {switchOn && (
          <motion.path
            d={`M ${switchPosition.x},${switchPosition.y} Q ${(switchPosition.x + bulbPosition.x) / 2},${
              (switchPosition.y + bulbPosition.y) / 2 - 20
            } ${bulbPosition.x},${bulbPosition.y}`}
            fill="none"
            stroke="url(#energyPathGradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
            filter="url(#energyGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
          />
        )}

        {/* Bulb to word path */}
        {bulbOn && (
          <motion.path
            d={`M ${bulbPosition.x},${bulbPosition.y} Q ${(bulbPosition.x + wordPosition.x) / 2},${
              (bulbPosition.y + wordPosition.y) / 2 - 15
            } ${wordPosition.x},${wordPosition.y}`}
            fill="none"
            stroke="url(#energyPathGradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
            filter="url(#energyGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
          />
        )}
      </svg>

      {/* Component enhancement effects */}
      {inverterOn && (
        <div className="absolute" style={{ left: inverterPosition.x, top: inverterPosition.y }}>
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <SunMedium size={30} className="text-yellow-400/30" />
          </motion.div>
        </div>
      )}

      {switchOn && (
        <div className="absolute" style={{ left: switchPosition.x, top: switchPosition.y }}>
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <Zap size={20} className="text-green-400/30" />
          </motion.div>
        </div>
      )}

      {bulbOn && (
        <div className="absolute" style={{ left: bulbPosition.x, top: bulbPosition.y }}>
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="rounded-full w-20 h-20 bg-yellow-400/10 filter blur-md" />
          </motion.div>
        </div>
      )}

      {wordIlluminated && (
        <div className="absolute" style={{ left: wordPosition.x, top: wordPosition.y }}>
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            animate={{
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, -10, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <Leaf size={20} className="text-green-400/30" />
          </motion.div>
        </div>
      )}
    </div>
  )
}
