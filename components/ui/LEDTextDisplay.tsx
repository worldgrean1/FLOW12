"use client"

import { useEffect, useRef } from "react"

interface LEDTextDisplayProps {
  messages: string[]
  compact?: boolean
}

export function LEDTextDisplay({ messages, compact = false }: LEDTextDisplayProps) {
  const height = compact ? "h-6" : "h-8"
  const textSize = compact ? "text-xs" : "text-sm"
  const padding = compact ? "px-2" : "px-4"
  const gradientWidth = compact ? "w-4" : "w-6"

  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Simple marquee effect with requestAnimationFrame instead of CSS animations
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    let animationId: number
    let position = 0
    const speed = compact ? 0.5 : 0.3 // pixels per frame
    const container = containerRef.current
    const content = contentRef.current

    // Clone content for seamless looping
    const clone = content.cloneNode(true) as HTMLDivElement
    container.appendChild(clone)

    // Set initial positions
    content.style.transform = `translateX(0)`
    clone.style.transform = `translateX(${content.offsetWidth}px)`

    const animate = () => {
      position -= speed

      // Reset when first element is completely out of view
      if (position <= -content.offsetWidth) {
        position = 0
      }

      content.style.transform = `translateX(${position}px)`
      clone.style.transform = `translateX(${position + content.offsetWidth}px)`

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [compact])

  // Combine all messages into a single string with separators
  const displayText = messages.join(" • ")

  return (
    <div className={`relative overflow-hidden ${height} bg-slate-800/20 border border-teal-500/30 rounded-md`}>
      <div ref={containerRef} className="led-text-container w-full h-full overflow-hidden whitespace-nowrap">
        <div ref={contentRef} className={`inline-flex items-center h-full ${textSize} font-medium text-teal-400`}>
          <span className={padding}>{displayText}</span>
        </div>
      </div>

      {/* Edge Gradient Fade - Static elements, no animation */}
      <div
        className={`absolute left-0 top-0 bottom-0 ${gradientWidth} bg-gradient-to-r from-[#001a20] to-transparent z-10`}
      ></div>
      <div
        className={`absolute right-0 top-0 bottom-0 ${gradientWidth} bg-gradient-to-l from-[#001a20] to-transparent z-10`}
      ></div>
    </div>
  )
}
