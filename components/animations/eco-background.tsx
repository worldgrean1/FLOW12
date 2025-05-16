"use client"

import { useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { Leaf, SunMedium, Wind, Droplets } from "lucide-react"

interface EcoBackgroundProps {
  active: boolean
}

export default function EcoBackground({ active }: EcoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  // Memoize animation configurations
  const animationConfig = useMemo(() => ({
    leaf: {
      opacity: 0.15,
      scale: 1,
      rotation: gsap.utils.random(-10, 10),
      y: gsap.utils.random(-20, -40),
      duration: 2,
      stagger: { each: 0.2, from: "random" as const },
      ease: "power2.out",
    },
    sun: {
      opacity: 0.15,
      scale: 1.2,
      rotation: gsap.utils.random(-5, 5),
      duration: 3,
      stagger: { each: 0.3, from: "random" as const },
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    },
    wind: {
      opacity: 0.12,
      x: gsap.utils.random(100, 200),
      scale: gsap.utils.random(0.8, 1.2),
      duration: 8,
      stagger: { each: 0.5, from: "random" as const },
      ease: "power1.inOut",
      repeat: -1,
      repeatDelay: 1,
    },
    drop: {
      opacity: 0.15,
      y: gsap.utils.random(30, 60),
      scale: gsap.utils.random(0.8, 1.2),
      duration: 4,
      stagger: { each: 0.3, from: "random" as const },
      ease: "power1.in",
      repeat: -1,
      repeatDelay: 2,
    },
  }), [])

  useEffect(() => {
    if (!containerRef.current) return

    // Kill existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill()
    }

    // Create new timeline with default configuration
    const tl = gsap.timeline({ paused: true })
    timelineRef.current = tl

    // Get elements
    const leafElements = containerRef.current.querySelectorAll(".leaf")
    const sunElements = containerRef.current.querySelectorAll(".sun")
    const windElements = containerRef.current.querySelectorAll(".wind")
    const dropElements = containerRef.current.querySelectorAll(".drop")

    // Animate eco elements
    if (active) {
      tl.to(leafElements, animationConfig.leaf, "<")
      tl.to(sunElements, animationConfig.sun, "<")
      tl.to(windElements, animationConfig.wind, "<")
      tl.to(dropElements, animationConfig.drop, "<")
      tl.play()
    } else {
      // Hide eco elements when inactive
      tl.to([leafElements, sunElements, windElements, dropElements], {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      }, "<")
      tl.play()
    }

    // Cleanup
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
    }
  }, [active, animationConfig])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0">
      {/* Enhanced eco-friendly grid pattern */}
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <radialGradient id="grid-point-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
          </radialGradient>

          <filter id="eco-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <pattern id="eco-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#4ade80"
              strokeWidth="0.5"
              className="grid-line"
              style={{ opacity: 0.05 }}
            />
            <circle cx="0" cy="0" r="1.5" fill="#4ade80" className="grid-point" style={{ opacity: 0.05 }} />
          </pattern>

          {/* Leaf pattern */}
          <pattern id="leaf-pattern" width="200" height="200" patternUnits="userSpaceOnUse">
            <g className="eco-leaf" style={{ opacity: 0, transform: "scale(0.8)" }}>
              <path
                d="M10,20 Q15,5 30,15 Q40,25 30,40 Q20,50 10,40 Q0,30 10,20 Z"
                fill="#4ade80"
                opacity="0.2"
                transform="translate(80, 80)"
              />
            </g>
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#eco-grid)" />

        {/* Additional grid lines for more organic pattern */}
        {Array.from({ length: 25 }).map((_, i) => (
          <line
            key={`h-line-${i}`}
            x1="0"
            y1={i * 40}
            x2="100%"
            y2={i * 40}
            stroke="#4ade80"
            strokeWidth="0.3"
            className="grid-line"
            style={{ opacity: 0.05 }}
          />
        ))}

        {Array.from({ length: 40 }).map((_, i) => (
          <line
            key={`v-line-${i}`}
            x1={i * 40}
            y1="0"
            x2={i * 40}
            y2="100%"
            stroke="#4ade80"
            strokeWidth="0.3"
            className="grid-line"
            style={{ opacity: 0.05 }}
          />
        ))}

        {/* Grid intersection points */}
        {Array.from({ length: 25 }).map((_, y) =>
          Array.from({ length: 40 }).map((_, x) => (
            <circle
              key={`point-${x}-${y}`}
              cx={x * 40}
              cy={y * 40}
              r="1"
              fill="#4ade80"
              className="grid-point"
              style={{ opacity: 0.05 }}
            />
          )),
        )}
      </svg>

      {/* Eco-friendly background elements */}
      <div className="absolute inset-0">
        {/* Scattered leaves */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`leaf-${i}`}
            className="absolute leaf text-green-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            <Leaf size={Math.random() * 20 + 15} className="text-green-500" />
          </div>
        ))}

        {/* Scattered suns */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`sun-${i}`}
            className="absolute sun text-yellow-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <SunMedium size={Math.random() * 25 + 20} className="text-yellow-500" />
          </div>
        ))}

        {/* Wind elements */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={`wind-${i}`}
            className="absolute wind text-blue-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Wind size={Math.random() * 20 + 15} className="text-blue-300" />
          </div>
        ))}

        {/* Water drops */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`drop-${i}`}
            className="absolute drop text-blue-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Droplets size={Math.random() * 15 + 10} className="text-blue-400" />
          </div>
        ))}
      </div>

      {/* Enhanced animated background particles with eco-friendly colors */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              filter: "blur(1px)",
              backgroundColor: `hsl(${140 + Math.random() * 40}, 70%, 60%)`, // Green to teal range
            }}
            initial={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0.1,
            }}
            animate={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: active ? [0.1, 0.4, 0.1] : [0.05, 0.15, 0.05],
              scale: active ? [1, 1.3, 1] : [0.8, 1, 0.8],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            {/* Particle trail effect */}
            {active && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: `hsl(${140 + Math.random() * 40}, 70%, 60%)` }}
                initial={{ scale: 1, opacity: 0.3 }}
                animate={{
                  scale: [1, 3],
                  opacity: [0.3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeOut",
                }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Enhanced radial gradient overlay with natural feel */}
      <div
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#071426]/80"
        style={{
          opacity: active ? 0.9 : 0.6,
          transition: "opacity 1s ease-in-out",
          transform: active ? "perspective(1000px) rotateX(5deg)" : "none",
          transformOrigin: "center center",
        }}
      />

      {/* Energy field effect when active - enhanced with eco-friendly colors */}
      {active && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-emerald-500/5"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.15, 0],
              scale: [0.9, 1.05, 0.9],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          {/* Concentric pulse waves with natural colors */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={`pulse-${i}`}
                className="absolute rounded-full border border-green-400/20"
                style={{
                  left: "-50%",
                  top: "-50%",
                  width: "100%",
                  height: "100%",
                  borderColor: `hsl(${140 + i * 10}, 70%, 60%, 0.2)`,
                }}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{
                  scale: [0, 2],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 1.3,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Organic noise overlay */}
          <motion.div
            className="absolute inset-0 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              opacity: 0.05,
            }}
            animate={{
              opacity: [0.03, 0.05, 0.03],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </>
      )}

      {/* Natural light beams effect when active */}
      {active && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`beam-${i}`}
              className="absolute"
              style={{
                width: "3px",
                height: "100%",
                left: `${20 + i * 30}%`,
                top: 0,
                background: `linear-gradient(to bottom, hsla(${140 + i * 20}, 70%, 60%, 0.2), transparent)`,
                filter: "blur(3px)",
              }}
              initial={{ opacity: 0, height: "0%" }}
              animate={{
                opacity: [0, 0.8, 0],
                height: ["0%", "100%", "0%"],
                left: [`${20 + i * 30}%`, `${25 + i * 30}%`, `${20 + i * 30}%`],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
