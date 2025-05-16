"use client"

import { useEffect, type MutableRefObject } from "react"
import { motion } from "framer-motion"
import { SunMedium, Battery, Zap, Leaf, Wind } from "lucide-react"

interface FeatureButtonsProps {
  switchActive: boolean
  activeFeature: string | null
  setActiveFeature: (feature: string | null) => void
  featureRefs: MutableRefObject<{ [key: string]: HTMLDivElement | null }>
}

export default function FeatureButtons({
  switchActive,
  activeFeature,
  setActiveFeature,
  featureRefs,
}: FeatureButtonsProps) {
  // Feature buttons data
  const featureButtons = [
    {
      id: "solarPower",
      icon: <SunMedium className="h-5 w-5" />,
      text: "Solar Power",
    },
    {
      id: "energyStorage",
      icon: <Battery className="h-5 w-5" />,
      text: "Energy Storage",
    },
    {
      id: "smartGrids",
      icon: <Zap className="h-5 w-5" />,
      text: "Smart Grids",
    },
    {
      id: "sustainability",
      icon: <Leaf className="h-5 w-5" />,
      text: "Sustainability",
    },
    {
      id: "cleanEnergy",
      icon: <Wind className="h-5 w-5" />,
      text: "Clean Energy",
    },
  ]

  // Create energy flow particles for feature buttons
  useEffect(() => {
    if (!switchActive || !activeFeature || !featureRefs.current[activeFeature]) return

    const buttonElement = featureRefs.current[activeFeature]
    if (!buttonElement) return

    const createEnergyParticle = () => {
      const particle = document.createElement("div")
      particle.classList.add("energy-particle")

      const rect = buttonElement.getBoundingClientRect()

      // Random position along the button
      const startX = Math.random() * rect.width
      const startY = Math.random() * rect.height

      particle.style.left = `${startX}px`
      particle.style.top = `${startY}px`
      particle.style.setProperty("--x-offset", `${Math.random() * 20 - 10}px`)

      // Random size
      const size = Math.random() * 2 + 1
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random opacity
      particle.style.opacity = (Math.random() * 0.5 + 0.5).toString()

      buttonElement.appendChild(particle)

      // Animate the particle
      const animation = particle.animate(
        [
          { opacity: 1, transform: "translateY(0) translateX(0)" },
          { opacity: 0, transform: `translateY(-${rect.height}px) translateX(${Math.random() * 20 - 10}px)` },
        ],
        {
          duration: Math.random() * 1000 + 500,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        },
      )

      animation.onfinish = () => {
        particle.remove()
      }
    }

    const particleInterval = setInterval(createEnergyParticle, 50)

    return () => {
      clearInterval(particleInterval)
      if (buttonElement) {
        const particles = buttonElement.querySelectorAll(".energy-particle")
        particles.forEach((p) => p.remove())
      }
    }
  }, [switchActive, activeFeature, featureRefs])

  return (
    <section className="py-3 px-4 sm:px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* SVG Energy Flow Lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#4ade80" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4ade80" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {switchActive && activeFeature && (
              <>
                {/* Horizontal connecting line */}
                <path
                  d="M 0,50 H 1000"
                  stroke="url(#energyGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  strokeLinecap="round"
                  className="opacity-30"
                >
                  <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="20s" repeatCount="indefinite" />
                </path>

                {/* Vertical energy pulses */}
                {featureButtons.map((button, index) => (
                  <g key={button.id}>
                    <circle
                      cx={`${(index + 0.5) * (100 / featureButtons.length)}%`}
                      cy="50"
                      r="3"
                      fill="#4ade80"
                      className={`${activeFeature === button.id ? "opacity-80" : "opacity-30"}`}
                    >
                      {activeFeature === button.id && (
                        <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite" />
                      )}
                    </circle>

                    <line
                      x1={`${(index + 0.5) * (100 / featureButtons.length)}%`}
                      y1="50"
                      x2={`${(index + 0.5) * (100 / featureButtons.length)}%`}
                      y2="100"
                      stroke="#4ade80"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className={`${activeFeature === button.id ? "opacity-60" : "opacity-10"}`}
                    >
                      {activeFeature === button.id && (
                        <animate
                          attributeName="stroke-dashoffset"
                          from="100"
                          to="0"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      )}
                    </line>
                  </g>
                ))}
              </>
            )}
          </svg>
        </div>

        {/* Feature Buttons */}
        <div className="flex flex-wrap justify-center gap-4 relative z-10">
          {featureButtons.map((button) => (
            <div
              key={button.id}
              ref={(el) => { featureRefs.current[button.id] = el; }}
              className={`relative overflow-hidden rounded-full border border-green-500 px-4 py-2 flex items-center gap-2 transition-all duration-300 ${
                activeFeature === button.id && switchActive
                  ? "bg-green-500/20 btn-glow"
                  : "bg-transparent hover:bg-green-500/10"
              }`}
              onClick={() => switchActive && setActiveFeature(button.id)}
            >
              <motion.span
                className={`text-green-400 ${activeFeature === button.id && switchActive ? "filter-glow" : ""}`}
                animate={
                  activeFeature === button.id && switchActive
                    ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                {button.icon}
              </motion.span>
              <span
                className={`text-sm font-medium ${
                  activeFeature === button.id && switchActive ? "text-white" : "text-green-400"
                }`}
              >
                {button.text}
              </span>

              {/* Energy pulse overlay */}
              {activeFeature === button.id && switchActive && (
                <motion.div
                  className="absolute inset-0 bg-green-500/10 pointer-events-none"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
