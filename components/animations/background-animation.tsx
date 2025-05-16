"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"

interface BackgroundAnimationProps {
  active: boolean
}

export default function BackgroundAnimation({ active }: BackgroundAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // GSAP animation for grid pattern
  useEffect(() => {
    if (!containerRef.current) return

    const gridLines = containerRef.current.querySelectorAll(".grid-line")
    const gridPoints = containerRef.current.querySelectorAll(".grid-point")

    const tl = gsap.timeline({ paused: true })

    // Animate grid lines with more sophisticated pattern
    tl.to(gridLines, {
      opacity: active ? 0.2 : 0.05,
      duration: 1,
      stagger: {
        each: 0.05,
        from: "random",
      },
      ease: "power2.inOut",
    })

    // Animate grid points with pulsing effect
    tl.to(
      gridPoints,
      {
        opacity: active ? [0.1, 0.3, 0.1] : 0.05,
        scale: active ? [1, 1.5, 1] : 1,
        duration: 2,
        stagger: {
          each: 0.1,
          from: "random",
          grid: "auto",
        },
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      } as any,
      "<",
    )

    tl.play()

    return () => {
      tl.kill()
    }
  }, [active])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-0">
      {/* Enhanced grid pattern with points at intersections */}
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <radialGradient id="grid-point-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
          </radialGradient>

          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <pattern id="enhanced-grid" width="40" height="40" patternUnits="userSpaceOnUse">
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
        </defs>

        <rect width="100%" height="100%" fill="url(#enhanced-grid)" />

        {/* Additional grid lines for more complex pattern */}
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

      {/* Enhanced animated background particles with trails */}
      <div className="absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-500/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              filter: "blur(1px)",
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
                className="absolute inset-0 rounded-full bg-green-400/30"
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

      {/* Enhanced radial gradient overlay with 3D perspective */}
      <div
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#071426]/80"
        style={{
          opacity: active ? 0.9 : 0.6,
          transition: "opacity 1s ease-in-out",
          transform: active ? "perspective(1000px) rotateX(5deg)" : "none",
          transformOrigin: "center center",
        }}
      />

      {/* Energy field effect when active - enhanced with pulse waves */}
      {active && (
        <>
          <motion.div
            className="absolute inset-0 bg-green-500/5"
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

          {/* Concentric pulse waves */}
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

          {/* Digital noise overlay */}
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

      {/* Light beams effect when active */}
      {active && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 2 }).map((_, i) => (
            <motion.div
              key={`beam-${i}`}
              className="absolute bg-gradient-to-b from-green-400/5 to-transparent"
              style={{
                width: "3px",
                height: "100%",
                left: `${30 + i * 40}%`,
                top: 0,
                filter: "blur(3px)",
              }}
              initial={{ opacity: 0, height: "0%" }}
              animate={{
                opacity: [0, 0.8, 0],
                height: ["0%", "100%", "0%"],
                left: [`${30 + i * 40}%`, `${35 + i * 40}%`, `${30 + i * 40}%`],
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
