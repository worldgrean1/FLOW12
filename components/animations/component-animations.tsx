"use client"

import { useEffect, useRef, useMemo } from "react"
import { motion, useAnimation } from "framer-motion"
import gsap from "gsap"

interface ComponentAnimationsProps {
  inverterOn: boolean
  switchOn: boolean
  bulbOn: boolean
  wordIlluminated: boolean
  animationPhase: number
}

export default function ComponentAnimations({
  inverterOn,
  switchOn,
  bulbOn,
  wordIlluminated,
  animationPhase,
}: ComponentAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()
  const timelineRef = useRef<gsap.core.Timeline>()
  const prevBulbStateRef = useRef(bulbOn)

  // Memoize animation configurations
  const animationConfig = useMemo(() => ({
    switch: {
      overlay: { opacity: 0.8, duration: 0.5 },
      pulse: { scale: 1.2, opacity: 0.7, duration: 1.2 },
      arc: { height: "random(10, 20)", opacity: "random(0.4, 0.8)", duration: 0.2 },
    },
    bulb: {
      flash: { opacity: 0.9, scale: 1.5, duration: 0.2 },
      overlay: { opacity: 0.9, duration: 0.5 },
      pulse: { scale: 1.25, opacity: 0.8, duration: 1.5 },
      ray: { scaleY: 1.5, opacity: 0.8, duration: 1 },
      ripple: { scale: 2.5, opacity: 0, duration: 2 },
      particle: { y: -30, x: "random(-20, 20)", opacity: 0, duration: "random(1, 2)" },
    },
  }), [])

  // GSAP animations for component effects
  useEffect(() => {
    if (!containerRef.current) return

    // Kill existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // Create new timeline
    const tl = gsap.timeline({ paused: true })
    timelineRef.current = tl

    // Inverter animations - enhanced with more dynamic effects
    if (inverterOn) {
      tl.to(".inverter-overlay", {
        opacity: 0.8,
        duration: 0.5,
        ease: "power2.inOut",
      })

      tl.to(
        ".inverter-pulse",
        {
          scale: 1.15,
          opacity: 0.7,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        "<",
      )

      // Add ripple effect
      tl.to(
        ".inverter-ripple",
        {
          scale: 2,
          opacity: 0,
          duration: 2,
          repeat: -1,
          ease: "power1.out",
          stagger: 0.5,
        },
        "<",
      )
    } else {
      tl.to(".inverter-overlay", {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      })

      tl.to(
        ".inverter-pulse",
        {
          scale: 1,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "<",
      )

      tl.to(
        ".inverter-ripple",
        {
          scale: 1,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "<",
      )
    }

    // Switch animations - enhanced with more dynamic effects
    if (switchOn) {
      tl.to(
        ".switch-overlay",
        animationConfig.switch.overlay,
        "<",
      )

      tl.to(
        ".switch-pulse",
        animationConfig.switch.pulse,
        "<",
      )

      // Add electric arcs effect
      tl.to(
        ".switch-arc",
        {
          ...animationConfig.switch.arc,
          repeat: -1,
          yoyo: true,
          ease: "steps(1)",
          stagger: {
            each: 0.1,
            from: "random",
          },
        },
        "<",
      )
    } else {
      tl.to(
        ".switch-overlay",
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "<",
      )

      tl.to(
        ".switch-pulse",
        {
          scale: 1,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "<",
      )

      tl.to(
        ".switch-arc",
        {
          height: 0,
          opacity: 0,
          duration: 0.1,
          ease: "power2.out",
        },
        "<",
      )
    }

    // Bulb animations - enhanced with more dynamic effects
    if (bulbOn) {
      // Initial flash effect when bulb first turns on
      if (!prevBulbStateRef.current) {
        tl.to(
          ".bulb-flash",
          animationConfig.bulb.flash,
          "<",
        )

        tl.to(".bulb-flash", {
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "power2.in",
        })
      }

      // Regular bulb glow animation
      tl.to(
        ".bulb-overlay",
        animationConfig.bulb.overlay,
        "<",
      )

      tl.to(
        ".bulb-pulse",
        {
          ...animationConfig.bulb.pulse,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        "<",
      )

      // Enhanced light rays pulsing with more dramatic effect
      tl.to(
        ".bulb-ray",
        {
          ...animationConfig.bulb.ray,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: {
            each: 0.1,
            from: "center",
          },
        },
        "<",
      )

      // Add ripple effect
      tl.to(
        ".bulb-ripple",
        {
          ...animationConfig.bulb.ripple,
          repeat: -1,
          ease: "power1.out",
          stagger: 0.7,
        },
        "<",
      )

      // Add light particles effect
      tl.to(
        ".bulb-particle",
        {
          ...animationConfig.bulb.particle,
          repeat: -1,
          repeatRefresh: true,
          ease: "power1.out",
          stagger: 0.1,
        },
        "<",
      )
    } else {
      tl.to(
        ".bulb-overlay",
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "<",
      )

      tl.to(
        ".bulb-pulse",
        {
          scale: 1,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "<",
      )

      tl.to(
        ".bulb-ray",
        {
          scaleY: 0.5,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "<",
      )

      tl.to(
        ".bulb-ripple",
        {
          scale: 1,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "<",
      )

      tl.to(
        ".bulb-particle",
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        "<",
      )
    }

    // Store previous bulb state to detect changes
    prevBulbStateRef.current = bulbOn

    // Word animations - enhanced with more dynamic effects
    if (wordIlluminated) {
      tl.to(
        ".word-overlay",
        {
          opacity: 0.8,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "<",
      )

      tl.to(
        ".word-pulse",
        {
          scale: 1.15,
          opacity: 0.7,
          duration: 1.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
        "<",
      )

      // Text glow animation - enhanced
      tl.to(
        ".word-text",
        {
          textShadow:
            "0 0 15px rgba(74, 222, 128, 0.9), 0 0 30px rgba(74, 222, 128, 0.6), 0 0 45px rgba(74, 222, 128, 0.3)",
          color: "#4ade80",
          duration: 0.5,
          ease: "power2.inOut",
        },
        "<",
      )

      // Add letter-by-letter animation
      tl.to(
        ".word-letter",
        {
          y: -3,
          opacity: 1,
          textShadow: "0 0 10px rgba(74, 222, 128, 0.8)",
          duration: 0.3,
          stagger: {
            each: 0.05,
            from: "start",
            repeat: -1,
            yoyo: true,
          },
          ease: "power2.inOut",
        },
        "<",
      )
    } else {
      tl.to(
        ".word-overlay",
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "<",
      )

      tl.to(
        ".word-pulse",
        {
          scale: 1,
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "<",
      )

      tl.to(
        ".word-text",
        {
          textShadow: "none",
          color: "#94a3b8",
          duration: 0.3,
          ease: "power2.out",
        },
        "<",
      )

      tl.to(
        ".word-letter",
        {
          y: 0,
          opacity: 0.7,
          textShadow: "none",
          duration: 0.2,
          ease: "power2.out",
        },
        "<",
      )
    }

    tl.play()

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [inverterOn, switchOn, bulbOn, wordIlluminated, animationPhase, animationConfig])

  // Framer Motion animations for bulb movement
  useEffect(() => {
    controls.start({
      x: animationPhase === 0 ? 0 : animationPhase === 1 ? 0 : -700,
      y: animationPhase === 0 ? 0 : animationPhase === 1 ? -50 : -165,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1,
      },
    })
  }, [animationPhase, controls])

  const switchActive = switchOn && inverterOn

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-5">
      {/* Inverter enhancement overlays - enhanced with more dynamic effects */}
      <div
        className="inverter-overlay absolute rounded-full bg-green-500/30"
        style={{
          width: "220px",
          height: "220px",
          left: "340px",
          top: "730px",
          filter: "blur(30px)",
          opacity: 0,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(74, 222, 128, 0.4) 0%, rgba(74, 222, 128, 0.1) 70%)",
        }}
      />

      <div
        className="inverter-pulse absolute rounded-full bg-green-500/20"
        style={{
          width: "260px",
          height: "260px",
          left: "340px",
          top: "730px",
          filter: "blur(20px)",
          opacity: 0,
          transform: "translate(-50%, -50%) scale(1)",
        }}
      />

      {/* Inverter ripple effects */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`inverter-ripple-${i}`}
          className="inverter-ripple absolute rounded-full border-2 border-green-400/30"
          style={{
            width: "200px",
            height: "200px",
            left: "340px",
            top: "730px",
            opacity: 0,
            transform: "translate(-50%, -50%) scale(1)",
          }}
        />
      ))}

      {/* Switch enhancement overlays - enhanced with more dynamic effects */}
      <div
        className="switch-overlay absolute rounded-full bg-green-500/30"
        style={{
          width: "130px",
          height: "130px",
          left: "975px",
          top: "595px",
          filter: "blur(20px)",
          opacity: 0,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(74, 222, 128, 0.4) 0%, rgba(74, 222, 128, 0.1) 70%)",
        }}
      />

      <div
        className="switch-pulse absolute rounded-full bg-green-500/20"
        style={{
          width: "160px",
          height: "160px",
          left: "975px",
          top: "595px",
          filter: "blur(15px)",
          opacity: 0,
          transform: "translate(-50%, -50%) scale(1)",
        }}
      />

      {/* Electric arcs for switch */}
      <div className="absolute" style={{ left: "975px", top: "595px", transform: "translate(-50%, -50%)" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`switch-arc-${i}`}
            className="switch-arc absolute bg-green-400/80"
            style={{
              width: "2px",
              height: "0px",
              left: `${-10 + i * 5}px`,
              bottom: "0px",
              opacity: 0,
              filter: "blur(1px)",
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>

      {/* Bulb enhancement overlays - enhanced with more dynamic effects */}
      {/* Initial flash effect when bulb first turns on */}
      <motion.div
        className="bulb-flash absolute rounded-full bg-white"
        style={{
          width: "300px",
          height: "300px",
          left: "680px",
          top: "155px",
          filter: "blur(30px)",
          opacity: 0,
          transform: "translate(-50%, -50%) scale(0.2)",
        }}
        animate={controls}
      />

      {/* Bulb ripple effects */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`bulb-ripple-${i}`}
          className="bulb-ripple absolute rounded-full border-2 border-green-400/30"
          style={{
            width: "200px",
            height: "200px",
            left: "680px",
            top: "155px",
            opacity: 0,
            transform: "translate(-50%, -50%) scale(1)",
          }}
          animate={controls}
        />
      ))}

      {/* Light particles */}
      <motion.div
        className="absolute"
        style={{
          width: "200px",
          height: "200px",
          left: bulbPosition().x,
          top: bulbPosition().y,
          transform: "translate(-50%, -50%)",
        }}
        animate={controls}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="bulb-particle absolute bg-green-400/80"
            style={{
              width: "3px",
              height: "3px",
              left: "50%",
              top: "50%",
              borderRadius: "50%",
              filter: "blur(1px)",
              opacity: 0,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="bulb-overlay absolute rounded-full"
        style={{
          width: "160px",
          height: "160px",
          left: "680px",
          top: "155px",
          filter: "blur(25px)",
          opacity: 0,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(74, 222, 128, 0.5) 0%, rgba(74, 222, 128, 0.1) 70%)",
        }}
        animate={controls}
      />

      <motion.div
        className="bulb-pulse absolute rounded-full bg-green-500/30"
        style={{
          width: "200px",
          height: "200px",
          left: "680px",
          top: "155px",
          filter: "blur(20px)",
          opacity: 0,
          transform: "translate(-50%, -50%) scale(1)",
        }}
        animate={controls}
      />

      {/* Light rays for bulb - enhanced with more rays */}
      {bulbOn && (
        <motion.div
          className="absolute"
          style={{
            width: "300px",
            height: "300px",
            left: bulbPosition().x,
            top: bulbPosition().y,
            transform: "translate(-50%, -50%)",
          }}
          animate={controls}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={`ray-${i}`}
              className="bulb-ray absolute bg-gradient-to-t from-green-400/40 to-transparent"
              style={{
                width: i % 2 === 0 ? "3px" : "2px",
                height: i % 2 === 0 ? "120px" : "100px",
                left: "50%",
                top: "50%",
                transformOrigin: "center bottom",
                transform: `translate(-50%, -100%) rotate(${i * 22.5}deg)`,
                opacity: 0,
                filter: "blur(1px)",
              }}
            />
          ))}

          {/* Add light flare effect */}
          <motion.div
            className="absolute rounded-full bg-green-400/40"
            style={{
              width: "60px",
              height: "60px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              filter: "blur(10px)",
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Add lens flare effect */}
          <motion.div
            className="absolute"
            style={{
              width: "100px",
              height: "10px",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%) rotate(45deg)",
              background: "linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.8), transparent)",
              filter: "blur(2px)",
            }}
            animate={{
              opacity: [0, 0.7, 0],
              rotate: [45, 225, 405],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </motion.div>
      )}

      {/* Energy connection lines when system is active */}
      {inverterOn && (
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
          <defs>
            <linearGradient id="energyLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(74, 222, 128, 0.1)" />
              <stop offset="50%" stopColor="rgba(74, 222, 128, 0.3)" />
              <stop offset="100%" stopColor="rgba(74, 222, 128, 0.1)" />
            </linearGradient>

            <filter id="energyGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {switchActive && (
            <motion.path
              d="M 340,730 Q 650,650 975,595"
              fill="none"
              stroke="url(#energyLineGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              filter="url(#energyGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}

          {bulbOn && (
            <motion.path
              d="M 975,595 Q 900,400 680,155"
              fill="none"
              stroke="url(#energyLineGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              filter="url(#energyGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
          )}

          {wordIlluminated && (
            <motion.path
              d="M 680,155 Q 800,155 920,155"
              fill="none"
              stroke="url(#energyLineGradient)"
              strokeWidth="2"
              strokeDasharray="5,5"
              filter="url(#energyGlow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
            />
          )}
        </svg>
      )}
    </div>
  )

  // Helper function to get bulb position based on animation phase
  function bulbPosition() {
    switch (animationPhase) {
      case 0:
        return { x: 680, y: 235 }
      case 1:
        return { x: 680, y: 185 }
      case 2:
        return { x: -20, y: 70 }
      default:
        return { x: 680, y: 235 }
    }
  }
}
