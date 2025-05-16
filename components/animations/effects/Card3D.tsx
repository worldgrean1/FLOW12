"use client"

import { useMemo, useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"

interface Card3DProps {
  children: React.ReactNode
  className?: string
  perspective?: number
  maxRotate?: number
}

export function Card3D({
  children,
  className = "",
  perspective = 1000,
  maxRotate = 15
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Memoize transform calculations
  const rotateX = useTransform(y, [-100, 100], [maxRotate, -maxRotate])
  const rotateY = useTransform(x, [-100, 100], [-maxRotate, maxRotate])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        perspective,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
} 