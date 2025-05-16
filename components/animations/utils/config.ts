import { AnimationSpeed, AnimationEasing, ColorScheme, Size } from "./types"

// Animation durations based on speed
export const getDuration = (speed: AnimationSpeed): number => ({
  slow: 0.8,
  medium: 0.5,
  fast: 0.3
}[speed])

// Animation easings
export const getEasing = (easing: AnimationEasing): string => ({
  linear: "linear",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  easeOut: "cubic-bezier(0, 0, 0.2, 1)",
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)"
}[easing])

// Color configurations
export const getColor = (
  scheme: ColorScheme,
  intensity: "light" | "medium" | "dark" = "medium",
  customColor?: string
): string => {
  if (scheme === "custom" && customColor) {
    return customColor
  }

  const colors = {
    green: {
      light: "rgb(134, 239, 172)",
      medium: "rgb(34, 197, 94)",
      dark: "rgb(22, 163, 74)"
    },
    blue: {
      light: "rgb(147, 197, 253)",
      medium: "rgb(59, 130, 246)",
      dark: "rgb(37, 99, 235)"
    },
    purple: {
      light: "rgb(216, 180, 254)",
      medium: "rgb(168, 85, 247)",
      dark: "rgb(147, 51, 234)"
    }
  } as const

  return colors[scheme as keyof typeof colors]?.[intensity] || colors.green.medium
}

// Size configurations
export const getSize = (size: Size): string => ({
  sm: "0.75rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.5rem"
}[size])

// Animation presets
export const presets = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slide: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 }
  },
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  },
  bounce: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 }
  }
}

// Transition presets
export const transitions = {
  default: {
    duration: 0.3,
    ease: "easeInOut"
  },
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 20
  },
  bounce: {
    type: "spring",
    stiffness: 400,
    damping: 10
  }
} 