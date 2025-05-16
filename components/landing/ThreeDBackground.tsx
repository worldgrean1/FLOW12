"use client"

import { motion } from "framer-motion"

export default function ThreeDBackground() {
  return (
    <div className="fixed inset-0 w-full h-full -z-1 overflow-hidden pointer-events-none">
      {/* Main gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.25) 0%, transparent 70%),
            radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.25) 0%, transparent 60%)
          `
        }}
      />

      {/* Floor effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[600px]"
        style={{
          perspective: "2000px",
          perspectiveOrigin: "50% 0%",
          transform: "translateZ(0)"
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.12) 40%, rgba(16, 185, 129, 0.2))
            `,
            transform: "rotateX(75deg) translateY(100px) scale(2.5)",
            transformOrigin: "50% 0%",
            backgroundImage: `
              radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.3) 0%, transparent 70%),
              linear-gradient(90deg, 
                rgba(16, 185, 129, 0) 0%, 
                rgba(16, 185, 129, 0.15) 25%, 
                rgba(16, 185, 129, 0.15) 75%, 
                rgba(16, 185, 129, 0) 100%
              )
            `
          }}
        >
          {/* Grid lines */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px),
                linear-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
              transform: 'scale(2)'
            }}
          />
        </div>
      </div>

      {/* Wall effect - left */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-[400px]"
        style={{
          background: `
            linear-gradient(to right, 
              rgba(16, 185, 129, 0.25), 
              transparent
            )
          `,
          boxShadow: 'inset 30px 0 50px -10px rgba(16, 185, 129, 0.3)'
        }}
      />

      {/* Wall effect - right */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-[400px]"
        style={{
          background: `
            linear-gradient(to left, 
              rgba(16, 185, 129, 0.25), 
              transparent
            )
          `,
          boxShadow: 'inset -30px 0 50px -10px rgba(16, 185, 129, 0.3)'
        }}
      />

      {/* Ambient light effects */}
      <motion.div
        className="absolute inset-0 opacity-70"
        animate={{
          background: [
            'radial-gradient(1000px circle at 30% 40%, rgba(16, 185, 129, 0.25), transparent 50%)',
            'radial-gradient(1000px circle at 70% 60%, rgba(16, 185, 129, 0.25), transparent 50%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-emerald-500/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(2px)'
          }}
          animate={{
            y: [-30, -60, -30],
            x: [0, Math.random() * 60 - 30, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Additional glow spots */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute rounded-full"
          style={{
            width: '400px',
            height: '400px',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
            filter: 'blur(30px)'
          }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
} 