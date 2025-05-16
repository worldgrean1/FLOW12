"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Leaf, SunMedium, Wind, Droplets, Zap, Battery } from "lucide-react"

type FlowPoint = {
  from: { x: number; y: number };
  to: { x: number; y: number };
};

// Optimized background animation with improved performance
export function GreenBackgroundAnimation({ intensity = "medium", theme = "energy" }) {
  // Different icon sets based on theme
  const getThemeIcons = () => {
    switch (theme) {
      case "solutions":
        return [<Zap key="zap" />, <SunMedium key="sun" />, <Battery key="battery" />]
      case "about":
        return [<Leaf key="leaf" />, <SunMedium key="sun" />]
      case "products":
        return [<Battery key="battery" />, <Zap key="zap" />]
      case "contact":
        return [<Leaf key="leaf" />, <Wind key="wind" />]
      case "energy":
      default:
        return [<Leaf key="leaf" />, <SunMedium key="sun" />, <Wind key="wind" />, <Droplets key="droplets" />]
    }
  }

  const themeIcons = getThemeIcons()

  // Intensity settings - reduced number of elements for better performance
  const particleCount =
    {
      low: 5,
      medium: 8,
      high: 12,
    }[intensity] || 8

  const opacityLevel =
    {
      low: 0.15,
      medium: 0.25,
      high: 0.35,
    }[intensity] || 0.25

  return (
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {/* Simplified grid pattern using CSS instead of SVG for better performance */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(74, 222, 128, ${opacityLevel / 2}) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(74, 222, 128, ${opacityLevel / 2}) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Reduced number of animated particles for better performance */}
      <div className="absolute inset-0">
        {Array.from({ length: particleCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full particle" // Add "particle" class here
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              backgroundColor: `hsl(${140 + Math.random() * 40}, 80%, 65%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Simplified theme elements - reduced quantity for better performance */}
      <div className="absolute inset-0">
        {Array.from({ length: Math.min(6, themeIcons.length * 2) }).map((_, i) => (
          <motion.div
            key={`eco-element-${i}`}
            className="absolute text-green-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
              fontSize: `${Math.random() * 16 + 12}px`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {themeIcons[i % themeIcons.length]}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Optimized energy flow animation
export function EnergyFlowAnimation({
  active = false,
  flowPoints = [],
  color = "#4ade80",
}: {
  active?: boolean;
  flowPoints?: FlowPoint[];
  color?: string;
}) {
  // Skip rendering if not active
  if (!active || flowPoints.length === 0) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-5">
      {/* Energy connection paths - simplified for better performance */}
      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        {flowPoints.map((flow, index) => (
          <motion.path
            key={`flow-${index}`}
            d={`M ${flow.from.x},${flow.from.y} Q ${(flow.from.x + flow.to.x) / 2},${
              (flow.from.y + flow.to.y) / 2 - 30
            } ${flow.to.x},${flow.to.y}`}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeDasharray="5,5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: index * 0.2 }}
          />
        ))}
      </svg>

      {/* Energy particles - reduced quantity for better performance */}
      {flowPoints.map((flow, flowIndex) => (
        <div key={`particles-${flowIndex}`} className="absolute inset-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`particle-${flowIndex}-${i}`}
              className="absolute rounded-full"
              style={{
                width: 5 - i * 0.5,
                height: 5 - i * 0.5,
                backgroundColor: color,
                left: flow.from.x,
                top: flow.from.y,
                opacity: 0,
              }}
              animate={{
                left: [flow.from.x, flow.to.x],
                top: [flow.from.y, flow.to.y],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.3 + flowIndex * 0.5,
                ease: "linear",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// Simplified pulsing element animation
export function PulsingElementAnimation({
  x,
  y,
  size = 100,
  color = "#4ade80",
  intensity = "medium",
  children,
}: {
  x: number
  y: number
  size?: number
  color?: string
  intensity?: "low" | "medium" | "high"
  children?: React.ReactNode
}) {
  // Intensity settings
  const intensitySettings: Record<"low" | "medium" | "high", { scale: number[]; opacity: number[] }> = {
    low: { scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] },
    medium: { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] },
    high: { scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] },
  }

  const settings = intensitySettings[intensity] || intensitySettings.medium

  return (
    <div className="absolute" style={{ left: x, top: y }}>
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: `${color}20`,
        }}
        animate={{
          scale: settings.scale,
          opacity: settings.opacity,
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <div className="absolute -translate-x-1/2 -translate-y-1/2">{children}</div>
    </div>
  )
}

// Simplified floating icon animation
export function FloatingIconAnimation({
  icon,
  delay = 0,
  size = 24,
  color = "#4ade80",
}: {
  icon: React.ReactNode
  delay?: number
  size?: number
  color?: string
}) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 90 + 5}%`,
        color: color,
        fontSize: size,
      }}
      initial={{ opacity: 0, y: 0 }}
      animate={{
        opacity: [0, 0.7, 0],
        y: [0, -30],
        rotate: [0, Math.random() * 20 - 10],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 5,
      }}
    >
      {icon}
    </motion.div>
  )
}

// Optimized particle wave animation
export function ParticleWaveAnimation({ color = "#4ade80", density = "medium", speed = "medium" }) {
  // Density settings - reduced for better performance
  const particleCount =
    {
      low: 15,
      medium: 25,
      high: 40,
    }[density] || 25

  // Speed settings
  const animationDuration =
    {
      slow: 25,
      medium: 15,
      fast: 8,
    }[speed] || 15

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: particleCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            backgroundColor: `hsl(${140 + Math.random() * 30}, 80%, 60%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3,
          }}
          animate={{
            y: [0, Math.sin(i) * 30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: animationDuration / 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}

// Simplified 3D card effect
export function Card3DEffect({
  children,
  depth = "medium",
  className = "",
}: {
  children: React.ReactNode
  depth?: "low" | "medium" | "high"
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  // Depth settings
  const depthFactor =
    {
      low: 5,
      medium: 10,
      high: 15,
    }[depth] || 10

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const mouseX = e.clientX
    const mouseY = e.clientY

    const rotateXFactor = ((mouseY - centerY) / (rect.height / 2)) * depthFactor
    const rotateYFactor = ((centerX - mouseX) / (rect.width / 2)) * depthFactor

    setRotateX(rotateXFactor)
    setRotateY(rotateYFactor)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative transition-transform ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

// Simplified animated gradient background
export function AnimatedGradientBackground({ colors = ["#4ade80", "#3b82f6", "#8b5cf6"], speed = "medium" }) {
  // Speed settings
  const animationDuration =
    {
      slow: 15,
      medium: 10,
      fast: 5,
    }[speed] || 10

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(45deg, ${colors.join(", ")})`,
          backgroundSize: "400% 400%",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: animationDuration,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </div>
  )
}

// Simplified animated icon grid
export function AnimatedIconGrid({ icons = [], columns = 4, opacity = 0.1, animate = true }) {
  const defaultIcons = [
    <SunMedium key="sun" />,
    <Leaf key="leaf" />,
    <Wind key="wind" />,
    <Battery key="battery" />,
    <Zap key="zap" />,
    <Droplets key="droplets" />,
  ]

  const displayIcons = icons.length > 0 ? icons : defaultIcons

  // Reduce the number of icons for better performance
  const totalIcons = Math.min(columns * 2, displayIcons.length * 2)

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 p-8">
        {Array.from({ length: totalIcons }).map((_, i) => {
          const IconComponent = displayIcons[i % displayIcons.length]
          return (
            <motion.div
              key={i}
              className="flex items-center justify-center"
              style={{ opacity }}
              animate={
                animate
                  ? {
                      y: [0, -10, 0],
                      opacity: [opacity, opacity * 2, opacity],
                    }
                  : {}
              }
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            >
              {IconComponent}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Typing text animation
export function TypingTextAnimation({
  text,
  speed = "medium",
  className = "",
}: {
  text: string
  speed?: "slow" | "medium" | "fast"
  className?: string
}) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  // Speed settings in milliseconds
  const typingSpeed =
    {
      slow: 150,
      medium: 100,
      fast: 50,
    }[speed] || 100

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, typingSpeed])

  return (
    <div className={className}>
      {displayText}
      {currentIndex < text.length && (
        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}>
          |
        </motion.span>
      )}
    </div>
  )
}

// Simplified parallax scroll effect
export function ParallaxScrollEffect({
  children,
  speed = 0.5,
  className = "",
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const [scrollY, setScrollY] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        y: scrollY * speed,
      }}
    >
      {children}
    </motion.div>
  )
}

// Animated counter
export function AnimatedCounter({ from = 0, to = 100, duration = 2, prefix = "", suffix = "", className = "" }) {
  const nodeRef = useRef(null)
  const [value, setValue] = useState(from)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (nodeRef.current) {
      observer.observe(nodeRef.current)
    }

    return () => {
      if (nodeRef.current) {
        observer.unobserve(nodeRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!inView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const currentValue = Math.floor(from + progress * (to - from))

      setValue(currentValue)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [from, to, duration, inView])

  return (
    <div ref={nodeRef} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </div>
  )
}

// Simplified animated SVG path
export function AnimatedSvgPath({
  paths,
  width = "100%",
  height = "100%",
  strokeWidth = 2,
  strokeColor = "#4ade80",
  fillColor = "none",
  duration = 2,
  delay = 0,
}: {
  paths: string[]
  width?: string | number
  height?: string | number
  strokeWidth?: number
  strokeColor?: string
  fillColor?: string
  duration?: number
  delay?: number
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {paths.map((path: string, index: number) => (
        <motion.path
          key={index}
          d={path}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill={fillColor}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration,
            delay: delay + index * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  )
}

// Simplified animated blob background
export function AnimatedBlobBackground({ color = "#4ade80", opacity = 0.1, count = 3, speed = "medium" }) {
  // Reduce count for better performance
  const blobCount = Math.min(count, 2)

  // Speed settings
  const animationDuration =
    {
      slow: 25,
      medium: 15,
      fast: 8,
    }[speed] || 15

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: blobCount }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            opacity: opacity,
            filter: "blur(50px)",
            width: `${Math.random() * 30 + 20}%`,
            height: `${Math.random() * 30 + 20}%`,
            left: `${Math.random() * 70}%`,
            top: `${Math.random() * 70}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            borderRadius: [
              "40% 60% 60% 40% / 60% 30% 70% 40%",
              "40% 60% 70% 30% / 50% 60% 30% 60%",
              "40% 60% 60% 40% / 60% 30% 70% 40%",
            ],
          }}
          transition={{
            duration: animationDuration,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
