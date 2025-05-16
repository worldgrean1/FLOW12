import { useEffect, useRef, useState } from "react"
import { AnimationState, AnimationEvents } from "./types"

export function useAnimationState(
  isActive: boolean = true,
  events?: AnimationEvents
): AnimationState {
  const [state, setState] = useState<AnimationState>({
    isAnimating: false,
    isPaused: false,
    progress: 0
  })

  const animationRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (!isActive) {
      setState(prev => ({ ...prev, isAnimating: false, isPaused: false }))
      return
    }

    let startTime: number
    let pausedTime: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      if (state.isPaused) {
        pausedTime = timestamp
        return
      }

      const progress = Math.min((timestamp - startTime) / 1000, 1)
      setState(prev => ({ ...prev, isAnimating: true, progress }))
      events?.onUpdate?.(progress)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setState(prev => ({ ...prev, isAnimating: false }))
        events?.onComplete?.()
      }
    }

    animationRef.current = requestAnimationFrame(animate)
    events?.onStart?.()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, state.isPaused, events])

  return state
}

export function useAnimationFrame(callback: (time: number) => void) {
  const requestRef = useRef<number | undefined>(undefined)
  const previousTimeRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        callback(time - previousTimeRef.current)
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [callback])
}

export function useAnimationProgress(
  duration: number,
  isActive: boolean = true
): number {
  const [progress, setProgress] = useState(0)

  useAnimationFrame((deltaTime) => {
    if (!isActive) return
    setProgress(prev => {
      const newProgress = prev + deltaTime / (duration * 1000)
      return newProgress > 1 ? 1 : newProgress
    })
  })

  return progress
} 