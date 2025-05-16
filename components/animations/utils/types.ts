// Common animation types
export type AnimationDirection = "up" | "down" | "left" | "right"
export type AnimationSpeed = "slow" | "medium" | "fast"
export type AnimationEasing = "linear" | "easeIn" | "easeOut" | "easeInOut"

// Color types
export type ColorScheme = "green" | "blue" | "purple" | "custom"
export type ColorIntensity = "light" | "medium" | "dark"

// Size types
export type Size = "sm" | "md" | "lg" | "xl"
export type ResponsiveSize = {
  sm?: Size
  md?: Size
  lg?: Size
  xl?: Size
}

// Animation configuration interfaces
export interface BaseAnimationProps {
  className?: string
  delay?: number
  duration?: number
  easing?: AnimationEasing
}

export interface ColorProps {
  color?: ColorScheme
  intensity?: ColorIntensity
  customColor?: string
}

export interface SizeProps {
  size?: Size | ResponsiveSize
}

// Animation state types
export interface AnimationState {
  isAnimating: boolean
  isPaused: boolean
  progress: number
}

// Animation event types
export interface AnimationEvents {
  onStart?: () => void
  onComplete?: () => void
  onUpdate?: (progress: number) => void
}

// Combined animation props
export interface AnimationProps extends BaseAnimationProps, ColorProps, SizeProps, AnimationEvents {
  direction?: AnimationDirection
  speed?: AnimationSpeed
  repeat?: number | "infinity"
  yoyo?: boolean
} 