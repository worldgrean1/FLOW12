"use client"

import { motion } from "framer-motion"
import { Leaf, SunMedium, Wind, Zap } from "lucide-react"

// Full Screen Background Component
export default function GreenInnovationBackground() {
  return (
    <div
      className="fixed inset-0 bg-slate-800/90 overflow-hidden -z-10"
      aria-label="Full screen green innovation background"
      role="img"
    >
      {/* Add floating energy icons - reduced for better performance */}
      {[Leaf, SunMedium, Wind, Zap].map((Icon, index) => (
        <motion.div
          key={`icon-${index}`}
          className="absolute text-green-400/30"
          style={{
            fontSize: 20 + Math.random() * 20,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: index * 0.8,
          }}
        >
          <Icon />
        </motion.div>
      ))}

      {/* Green accent on the right side */}
      <div className="absolute top-0 right-0 bottom-0 w-[45%]">
        <div className="absolute inset-0 bg-gradient-to-l from-green-800/40 to-transparent z-0"></div>
      </div>

      {/* Energy flow line in footer */}
      <div className="absolute bottom-0 left-0 right-0 h-16">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line
            x1="0"
            y1="8"
            x2="100%"
            y2="8"
            stroke="#4ade80"
            strokeWidth="2"
            strokeDasharray="10,5"
            strokeLinecap="round"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-15" dur="1s" repeatCount="indefinite" />
          </line>
        </svg>
      </div>
    </div>
  )
}
