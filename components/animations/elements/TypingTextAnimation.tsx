"use client"

import { motion, useAnimationControls } from "framer-motion"
import { useEffect, useState } from "react"

interface TypingTextAnimationProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  cursorColor?: string
  cursorWidth?: number
  cursorHeight?: number
  repeat?: boolean
  repeatDelay?: number
  onComplete?: () => void
  typingSound?: boolean
}

export function TypingTextAnimation({
  text,
  speed = 50,
  delay = 0,
  className = "",
  cursorColor = "currentColor",
  cursorWidth = 2,
  cursorHeight = 20,
  repeat = false,
  repeatDelay = 2000,
  onComplete,
  typingSound = false,
}: TypingTextAnimationProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const controls = useAnimationControls()

  useEffect(() => {
    if (isTyping && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
        
        if (typingSound) {
          // Play typing sound
          const audio = new Audio("/sounds/typing.mp3")
          audio.volume = 0.2
          audio.play().catch(() => {}) // Ignore errors if sound can't play
        }
      }, speed)

      return () => clearTimeout(timeout)
    } else if (currentIndex >= text.length) {
      setIsTyping(false)
      onComplete?.()
      
      if (repeat) {
        setTimeout(() => {
          setDisplayText("")
          setCurrentIndex(0)
          setIsTyping(true)
        }, repeatDelay)
      }
    }
  }, [currentIndex, text, speed, isTyping, repeat, repeatDelay, onComplete, typingSound])

  useEffect(() => {
    controls.start("animate")
  }, [controls])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={controls}
      variants={{
        animate: { opacity: 1 }
      }}
      transition={{ delay }}
      className={className}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        style={{
          display: "inline-block",
          width: cursorWidth,
          height: cursorHeight,
          backgroundColor: cursorColor,
          marginLeft: 4,
          verticalAlign: "middle",
        }}
      />
    </motion.div>
  )
} 