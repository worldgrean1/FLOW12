"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info, SunMedium, Leaf } from "lucide-react"
import { useEnergySystemStore } from "@/store/energySystemStore"
import StaticSwitchNode from "@/components/static-nodes/static-switch-node"
import StaticBulbNode from "@/components/static-nodes/static-bulb-node"
import StaticWordNode from "@/components/static-nodes/static-word-node"
import PowerFlowAnimation from "@/components/animations/power-flow-animation"
import EnergyFlowEffects from "@/components/animations/energy-flow-effects"
import InfoPanel from "@/components/landing/InfoPanel"
import { useRouter, usePathname } from "next/navigation"
import PremiumHeroSection from "@/components/premium/PremiumHeroSection"

interface PremiumInteractiveDemoProps {
  showInfoPanel: boolean
  setShowInfoPanel: (show: boolean) => void
  windowWidth: number
  windowHeight: number
}

// Define menu item colors with more premium palette
const MENU_COLORS = {
  home: "#10b981", // Emerald
  about: "#0ea5e9", // Sky blue
  solutions: "#8b5cf6", // Violet
  products: "#f59e0b", // Amber
  contact: "#ec4899", // Pink
}

// Add this at the top of the file
const PARTICLE_POSITIONS = Array.from({ length: 8 }).map((_, i) => ({
  width: 6 - i * 0.5,
  height: 6 - i * 0.5,
  color: `rgb(71, 235, ${126 + i * 14})`,
  left: `${30 + i * 5}%`,
  top: `${20 + i * 5}%`
}))

export default function PremiumInteractiveDemo({
  showInfoPanel,
  setShowInfoPanel,
  windowWidth,
  windowHeight,
}: PremiumInteractiveDemoProps) {
  const demoRef = useRef<HTMLDivElement>(null)
  const diagramRef = useRef<HTMLDivElement>(null)
  const [showActivateButton, setShowActivateButton] = useState(true)
  const [menuItems] = useState(["/home", "/about", "/solutions", "/products", "/contact"])
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0)
  const [hiddenTextVisible, setHiddenTextVisible] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false) // Added state for navigation transitions
  const router = useRouter()
  const pathname = usePathname()

  const {
    inverterActive,
    switchActive,
    bulbActive,
    wordActive,
    animationPhase,
    prevBulbActive,
    energySaved,
    co2Reduced,
    setInverterActive,
    setSwitchActive,
    setBulbActive,
    setWordActive,
    setAnimationPhase,
    incrementEnergySaved,
    incrementCo2Reduced,
  } = useEnergySystemStore()

  // Get current menu item color
  const getCurrentMenuColor = () => {
    if (!wordActive || !hiddenTextVisible) return "#10b981" // Default emerald
    const currentItem = menuItems[currentMenuIndex].replace("/", "")
    return MENU_COLORS[currentItem as keyof typeof MENU_COLORS] || "#10b981"
  }

  // Update the inverter activation handler
  const handleInverterChange = (active: boolean) => {
    // Step 1: Inverter Activation - only enables power flow up to the switch
    setInverterActive(active)

    if (active) {
      setShowActivateButton(false)
      // Set animation phase to 1 when inverter is activated
      // Phase 1 means power flows only to the switch
      setAnimationPhase(1)

      // If switch is already active, we need to maintain the power flow
      if (switchActive) {
        // Keep bulb and word active if switch is already on
        // This handles the case where inverter is toggled while switch is on
      } else {
        // Ensure bulb and word are off if switch is off
        setBulbActive(false)
        setWordActive(false)
        setHiddenTextVisible(false)
      }
    } else {
      // If inverter is turned off, cascade to turn off all other components
      setSwitchActive(false)
      setBulbActive(false)
      setWordActive(false)
      setHiddenTextVisible(false)
      setAnimationPhase(0)
    }
  }

  // Update the handleActivate function to toggle the inverter state
  const handleActivate = () => {
    // If turning on, show activation sequence
    if (!inverterActive) {
      // First set animation phase to 1 when inverter is activated
      setAnimationPhase(1)
      setShowActivateButton(false)

      // Toggle the inverter state (on/off) after a slight delay to allow loading effect to be visible
      setTimeout(() => {
        handleInverterChange(true)
      }, 100)
    } else {
      // If turning off, immediately reset everything
      handleInverterChange(false)
      setAnimationPhase(0)
      setSwitchActive(false)
      setBulbActive(false)
      setWordActive(false)
      setHiddenTextVisible(false)
    }
  }

  // Update the switch activation handler
  const handleSwitchChange = (active: boolean) => {
    // Step 2: Switch Activation
    // Only allow switch activation if inverter is on
    if (!inverterActive && active) return

    setSwitchActive(active)

    // When switch is activated, also activate bulb and word with delays
    if (active && inverterActive) {
      // Set animation phase to 2 when switch is activated
      // Phase 2 means power flows to bulb and word
      setAnimationPhase(2)

      // Step 3: Bulb Activation (with delay)
      setTimeout(() => {
        setBulbActive(true)

        // Step 4: Word Activation (with delay)
        setTimeout(() => {
          setWordActive(true)
          setCurrentMenuIndex(0) // Reset to start from Home

          // Step 5: Hidden Text Activation (with additional delay)
          setTimeout(() => {
            setHiddenTextVisible(true)

            // Start menu cycling if needed
            startMenuCycling()
          }, 200)
        }, 300)
      }, 200)
    } else {
      // When switch is deactivated, turn off bulb, word, and hidden text
      // But keep animation phase 1 if inverter is still active
      setAnimationPhase(inverterActive ? 1 : 0)
      setBulbActive(false)
      setWordActive(false)
      setHiddenTextVisible(false)
    }
  }

  // Function to handle menu cycling
  const startMenuCycling = () => {
    // This will be called when the word is activated
    console.log("Menu cycling started")

    // Reset to first menu item when starting cycling
    setCurrentMenuIndex(0)
  }

  // Handle menu cycling when word is active
  useEffect(() => {
    if (!wordActive || !hiddenTextVisible) return

    // Start cycling through menu items more frequently
    const cycleInterval = setInterval(() => {
      setCurrentMenuIndex((prevIndex) => (prevIndex + 1) % menuItems.length)
      console.log(`Cycling to menu item: ${menuItems[(currentMenuIndex + 1) % menuItems.length]}`)
    }, 2000) // Changed from 3000ms to 2000ms for more responsive cycling

    return () => clearInterval(cycleInterval)
  }, [wordActive, hiddenTextVisible, menuItems])

  // Handle component remounting when returning to the landing page
  useEffect(() => {
    // If we're on the landing page and the inverter is active
    if (pathname === "/" && inverterActive) {
      // If switch is active but cycling isn't happening, restart it
      if (switchActive && bulbActive && wordActive) {
        setHiddenTextVisible(true)

        // Reset animation phase to ensure proper visual state
        setAnimationPhase(2)

        // Small delay to ensure DOM is ready
        setTimeout(() => {
          console.log("Restarting menu cycling after navigation return")
          startMenuCycling()
        }, 100)
      }
    }
  }, [pathname, inverterActive, switchActive, bulbActive, wordActive])

  // Create eco-friendly particle effect when system is activated
  useEffect(() => {
    if (!inverterActive || !demoRef.current) return

    const createParticle = () => {
      if (!demoRef.current) return

      const particle = document.createElement("div")
      particle.classList.add("particle")

      // Random size between 2-6px
      const size = Math.random() * 4 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Position randomly within the demo area
      const rect = demoRef.current.getBoundingClientRect()
      const x = Math.random() * rect.width
      const y = Math.random() * rect.height

      particle.style.left = `${x}px`
      particle.style.top = `${y}px`

      // Random opacity and color variation (green to teal)
      particle.style.opacity = (Math.random() * 0.6 + 0.2).toString()

      // Add color variation for eco-friendly feel
      const hue = 140 + Math.random() * 30 // Green to teal range
      particle.style.backgroundColor = `hsla(${hue}, 80%, 60%, 0.6)`

      // Ensure no borders
      particle.style.border = "none"

      // Add to demo container
      demoRef.current.appendChild(particle)

      // Animate upward and fade out with natural movement
      const duration = Math.random() * 3000 + 2000
      const xMovement = Math.random() * 60 - 30 // More natural sideways movement
      const keyframes = [
        { transform: `translate(0, 0) rotate(0deg)`, opacity: particle.style.opacity },
        {
          transform: `translate(${xMovement / 2}px, -${rect.height / 3}px) rotate(${Math.random() * 20 - 10}deg)`,
          opacity: Number.parseFloat(particle.style.opacity) * 0.8,
        },
        {
          transform: `translate(${xMovement}px, -${rect.height / 2}px) rotate(${Math.random() * 40 - 20}deg)`,
          opacity: "0",
        },
      ]

      const animation = particle.animate(keyframes, {
        duration,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      })

      animation.onfinish = () => {
        particle.remove()
      }
    }

    // Create particles at intervals
    const interval = setInterval(createParticle, 200) // More frequent particles

    // Update energy metrics when system is active
    const energyInterval = setInterval(() => {
      incrementEnergySaved()
      incrementCo2Reduced()
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(energyInterval)
      // Clean up any remaining particles
      if (demoRef.current) {
        const particles = demoRef.current.querySelectorAll(".particle")
        particles.forEach((p) => p.remove())
      }
    }
  }, [inverterActive, incrementEnergySaved, incrementCo2Reduced])

  // Handle dramatic transition when bulb turns on
  useEffect(() => {
    if (bulbActive && !prevBulbActive) {
      // Create a dramatic flash effect on the page
      const flashElement = document.createElement("div")
      flashElement.className = "fixed inset-0 bg-green-400/20 z-50 pointer-events-none" // Changed to green with low opacity
      flashElement.style.opacity = "0"
      document.body.appendChild(flashElement)

      // Animate the flash
      const startTime = performance.now()
      const duration = 300 // milliseconds

      const animateFlash = (timestamp: number) => {
        const elapsed = timestamp - startTime
        const progress = Math.min(elapsed / duration, 1)

        // Quick fade in, slower fade out
        let opacity = 0
        if (progress < 0.2) {
          // Fade in (0-20% of animation)
          opacity = (progress / 0.2) * 0.3 // Max opacity 0.3
        } else {
          // Fade out (20-100% of animation)
          opacity = 0.3 * (1 - (progress - 0.2) / 0.8)
        }

        flashElement.style.opacity = opacity.toString()

        if (progress < 1) {
          requestAnimationFrame(animateFlash)
        } else {
          // Remove the element when animation is complete
          document.body.removeChild(flashElement)
        }
      }

      requestAnimationFrame(animateFlash)
    }
  }, [bulbActive, prevBulbActive])

  // Handle word node click with smooth transition
  const handleWordNodeClick = () => {
    if (wordActive && hiddenTextVisible && !isNavigating) {
      setIsNavigating(true);
      const targetPath = menuItems[currentMenuIndex];
      
      // Immediate navigation
      router.push(targetPath);
      
      // Reset navigation state
      setTimeout(() => {
        setIsNavigating(false);
      }, 50);
    }
  };

  // Get current menu text in uppercase
  const getCurrentMenuText = () => {
    if (wordActive && hiddenTextVisible) {
      return menuItems[currentMenuIndex].replace("/", "").toUpperCase()
    }
    return "GREAN"
  }

  // Get component positions based on the diagram layout
  const getComponentPositions = () => {
    // Container dimensions
    const containerWidth = Math.min(windowWidth * 0.95, 1200)
    const containerHeight = Math.min(windowHeight * 0.5, 450) + 5

    const inverterWidth = 220; // or whatever is used in the style
    const wordWidth = 150;     // as in the style

    const marginLeft = inverterWidth / 2;
    const marginRight = wordWidth / 2;
    const spacing = (containerWidth - marginLeft - marginRight) / 3;

    const inverterX = marginLeft;
    const switchX = marginLeft + spacing;
    const bulbX = marginLeft + spacing * 2;
    const wordX = marginLeft + spacing * 3;

    // All components at the same vertical position (middle of container)
    const componentY = containerHeight * 0.5

    // Add vertical offset for bulb to position it higher
    const bulbYOffset = -97 // Move bulb up by 97px from center

    // Scale for components - different scale for inverter since it's larger
    const inverterScale = 0.35 // Adjusted scale to better match original
    const scale = 0.7 // Base scale for other components
    const switchScale = scale * 1.2 // 20% larger scale for the switch

    return {
      inverterPosition: { x: inverterX, y: componentY },
      switchPosition: { x: switchX, y: componentY },
      bulbPosition: { x: bulbX, y: componentY + bulbYOffset }, // Apply vertical offset here
      wordPosition: { x: wordX, y: componentY },
      scale,
      inverterScale,
      containerHeight,
      containerWidth,
      switchScale,
    }
  }

  const {
    inverterPosition,
    switchPosition,
    bulbPosition,
    wordPosition,
    scale,
    inverterScale,
    containerHeight,
    containerWidth,
    switchScale,
  } = getComponentPositions()

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Inside the component
  const particleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: [0, 0.8, 0],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  }

  return (
    <section className="h-screen text-white flex flex-col overflow-hidden relative">
      {/* Remove the duplicate background grid pattern and keep only the power flow lines */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <linearGradient id="powerFlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'rgba(16, 185, 129, 0.1)' }} />
              <stop offset="50%" style={{ stopColor: 'rgba(16, 185, 129, 0.05)' }} />
              <stop offset="100%" style={{ stopColor: 'rgba(16, 185, 129, 0.1)' }} />
            </linearGradient>
            <mask id="powerFlowMask">
              <rect x="0" y="0" width="100%" height="100%" fill="url(#powerFlowGradient)" />
            </mask>
          </defs>
          
          {/* Diagonal Power Lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.line
              key={`power-line-${i}`}
              x1={`${i * 15}%`}
              y1="0"
              x2={`${(i * 15) + 100}%`}
              y2="100%"
              stroke="url(#powerFlowGradient)"
              strokeWidth="1"
              strokeDasharray="4 6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1],
                opacity: [0, 0.5, 0],
                strokeDashoffset: ["0%", "-100%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2
              }}
            />
          ))}
        </svg>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-2 py-16 mt-12">
        <motion.div
          className="w-full max-w-[1300px] bg-transparent rounded-xl p-2 flex flex-col items-center justify-center relative"
          style={{ 
            width: '110%',
            marginTop: '2rem'
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Info panel */}
          <InfoPanel showInfoPanel={showInfoPanel} />

          {/* Floating in/out card animation */}
          <div className="w-full flex justify-center">
            <div
              ref={demoRef}
              className="relative w-full flex items-center justify-center"
              style={{
                height: `${containerHeight}px`,
                maxWidth: "100%",
                background: "transparent",
                border: "none",
                overflow: "visible",
                paddingTop: "3rem"
              }}
            >
              {/* Pulse circles when active */}
              {switchActive && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      className="w-64 h-64 rounded-full bg-emerald-600/10"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    ></motion.div>
                    <motion.div
                      className="absolute inset-0 w-48 h-48 rounded-full bg-emerald-600/15"
                      style={{ left: "8px", top: "8px" }}
                      animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                    ></motion.div>
                    <motion.div
                      className="absolute inset-0 w-32 h-32 rounded-full bg-emerald-600/20"
                      style={{ left: "16px", top: "16px" }}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                    ></motion.div>
                  </div>
                </div>
              )}

              {/* Energy Flow Effects */}
              <EnergyFlowEffects
                inverterOn={inverterActive}
                switchOn={switchActive}
                bulbOn={bulbActive}
                wordIlluminated={wordActive}
                inverterPosition={inverterPosition}
                switchPosition={switchPosition}
                bulbPosition={bulbPosition}
                wordPosition={wordPosition}
                animationPhase={animationPhase}
              />

              {/* Power Flow Animation Layer */}
              <div className="absolute inset-0 overflow-visible">
                <PowerFlowAnimation
                  inverterOn={inverterActive}
                  switchOn={switchActive}
                  bulbOn={bulbActive}
                  wordIlluminated={wordActive}
                  animationPhase={animationPhase}
                  inverterPosition={inverterPosition}
                  switchPosition={switchPosition}
                  bulbPosition={bulbPosition}
                  wordPosition={wordPosition}
                  scale={scale}
                />
              </div>

              {/* Connection Lines */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
                  {/* Segment 1: Inverter to Switch - horizontal line */}
                  <motion.line
                    x1={inverterPosition.x + 50}
                    y1={inverterPosition.y}
                    x2={switchPosition.x - 30}
                    y2={switchPosition.y}
                    stroke={inverterActive ? "#38bdf8" : "#1e293b"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: 1,
                      filter: inverterActive ? "drop-shadow(0 0 5px rgba(56, 189, 248, 0.7))" : "none",
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      filter: { duration: 0.3 },
                    }}
                  />

                  {/* Segment 2: Switch to Bulb - vertical line going up to bulb bottom */}
                  <motion.path
                    d={`M${switchPosition.x + 30} ${switchPosition.y} 
                    L${switchPosition.x + 30} ${switchPosition.y - 50} 
                    L${bulbPosition.x} ${switchPosition.y - 50} 
                    L${bulbPosition.x} ${bulbPosition.y + 50}`}
                    stroke={switchActive && inverterActive ? "#10b981" : "#1e293b"}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: 1,
                      filter: switchActive && inverterActive ? "drop-shadow(0 0 5px rgba(16, 185, 129, 0.7))" : "none",
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      filter: { duration: 0.3 },
                    }}
                  />

                  {/* Segment 3: Bulb to Word - vertical line from bulb bottom to word */}
                  <motion.path
                    d={`M${bulbPosition.x} ${bulbPosition.y + 50}
                    L${bulbPosition.x} ${wordPosition.y + 50}
                    L${wordPosition.x - 50} ${wordPosition.y + 50}
                    L${wordPosition.x - 50},${wordPosition.y}`}
                    stroke={bulbActive && switchActive && inverterActive ? getCurrentMenuColor() : "#1e293b"}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: 1,
                      filter:
                        bulbActive && switchActive && inverterActive
                          ? `drop-shadow(0 0 5px ${getCurrentMenuColor()})`
                          : "none",
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                      filter: { duration: 0.3 },
                    }}
                  />

                  {/* Connection dots - First segment (inverter to switch) */}
                  {Array.from({ length: 3 }).map((_, i) => {
                    const progress = i / 2
                    const x = inverterPosition.x + 50 + progress * (switchPosition.x - 30 - (inverterPosition.x + 50))
                    return (
                      <motion.circle
                        key={`inv-switch-${i}`}
                        cx={x}
                        cy={inverterPosition.y}
                        r="3"
                        fill={inverterActive ? "#38bdf8" : "#1e293b"}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          filter: inverterActive ? "drop-shadow(0 0 3px rgba(56, 189, 248, 0.7))" : "none",
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 0.4 + i * 0.1,
                          filter: { duration: 0.3 },
                        }}
                      />
                    )
                  })}

                  {/* Connection dots - Second segment (switch to bulb) */}
                  {/* Vertical part */}
                  {Array.from({ length: 2 }).map((_, i) => {
                    const progress = i / 1
                    const y = switchPosition.y - progress * 50
                    return (
                      <motion.circle
                        key={`switch-bulb-v1-${i}`}
                        cx={switchPosition.x + 30}
                        cy={y}
                        r="3"
                        fill={switchActive && inverterActive ? "#10b981" : "#1e293b"}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          filter: switchActive && inverterActive ? "drop-shadow(0 0 3px rgba(16, 185, 129, 0.7))" : "none",
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 0.6 + i * 0.1,
                          filter: { duration: 0.3 },
                        }}
                      />
                    )
                  })}
                  {/* Horizontal part */}
                  {Array.from({ length: 2 }).map((_, i) => {
                    const progress = i / 1
                    const x = switchPosition.x + 30 + progress * (bulbPosition.x - (switchPosition.x + 30))
                    return (
                      <motion.circle
                        key={`switch-bulb-h-${i}`}
                        cx={x}
                        cy={switchPosition.y - 50}
                        r="3"
                        fill={switchActive && inverterActive ? "#10b981" : "#1e293b"}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          filter: switchActive && inverterActive ? "drop-shadow(0 0 3px rgba(16, 185, 129, 0.7))" : "none",
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 0.8 + i * 0.1,
                          filter: { duration: 0.3 },
                        }}
                      />
                    )
                  })}
                  {/* Vertical part to bulb */}
                  {Array.from({ length: 2 }).map((_, i) => {
                    const progress = i / 1
                    const y = switchPosition.y - 50 + progress * (bulbPosition.y + 50 - (switchPosition.y - 50))
                    return (
                      <motion.circle
                        key={`switch-bulb-v2-${i}`}
                        cx={bulbPosition.x}
                        cy={y}
                        r="3"
                        fill={switchActive && inverterActive ? "#10b981" : "#1e293b"}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          filter: switchActive && inverterActive ? "drop-shadow(0 0 3px rgba(16, 185, 129, 0.7))" : "none",
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 1.0 + i * 0.1,
                          filter: { duration: 0.3 },
                        }}
                      />
                    )
                  })}

                  {/* Connection dots - Third segment (bulb to word) */}
                  {/* Vertical part from bulb */}
                  {Array.from({ length: 2 }).map((_, i) => {
                    const progress = i / 1
                    const y = bulbPosition.y + 50 + progress * (wordPosition.y + 50 - (bulbPosition.y + 50))
                    return (
                      <motion.circle
                        key={`bulb-word-v1-${i}`}
                        cx={bulbPosition.x}
                        cy={y}
                        r="3"
                        fill={bulbActive && switchActive && inverterActive ? getCurrentMenuColor() : "#1e293b"}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          filter:
                            bulbActive && switchActive && inverterActive
                              ? `drop-shadow(0 0 3px ${getCurrentMenuColor()})`
                              : "none",
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 1.2 + i * 0.1,
                          filter: { duration: 0.3 },
                        }}
                      />
                    )
                  })}
                  {/* Horizontal part to word */}
                  {Array.from({ length: 2 }).map((_, i) => {
                    const progress = i / 1
                    const x = bulbPosition.x + progress * (wordPosition.x - 50 - bulbPosition.x)
                    return (
                      <motion.circle
                        key={`bulb-word-h-${i}`}
                        cx={x}
                        cy={wordPosition.y + 50}
                        r="3"
                        fill={bulbActive && switchActive && inverterActive ? getCurrentMenuColor() : "#1e293b"}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          filter:
                            bulbActive && switchActive && inverterActive
                              ? `drop-shadow(0 0 3px ${getCurrentMenuColor()})`
                              : "none",
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 1.4 + i * 0.1,
                          filter: { duration: 0.3 },
                        }}
                      />
                    )
                  })}
                  {/* Vertical part to word */}
                  {Array.from({ length: 2 }).map((_, i) => {
                    const progress = i / 1
                    const y = wordPosition.y + 50 - progress * 50
                    return (
                      <motion.circle
                        key={`bulb-word-v2-${i}`}
                        cx={wordPosition.x - 50}
                        cy={y}
                        r="3"
                        fill={bulbActive && switchActive && inverterActive ? getCurrentMenuColor() : "#1e293b"}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          filter:
                            bulbActive && switchActive && inverterActive
                              ? `drop-shadow(0 0 3px ${getCurrentMenuColor()})`
                              : "none",
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 1.6 + i * 0.1,
                          filter: { duration: 0.3 },
                        }}
                      />
                    )
                  })}

                  {/* Animated particles - Only show in active segments */}
                  <AnimatePresence>
                    {inverterActive && (
                      <>
                        {/* Particles from inverter to switch */}
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.circle
                            key={`particle-inv-switch-${i}`}
                            r="4"
                            fill="#38bdf8"
                            opacity="0.8"
                            filter="drop-shadow(0 0 5px rgba(56, 189, 248, 0.7))"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <animateMotion
                              dur={`${2 + i * 0.5}s`}
                              repeatCount="indefinite"
                              path={`M${inverterPosition.x + 50},${inverterPosition.y} L${switchPosition.x - 30},${switchPosition.y}`}
                              begin={`${i * 0.5}s`}
                            />
                          </motion.circle>
                        ))}
                      </>
                    )}
                  </AnimatePresence>

                  {/* Particles from switch to bulb - only if switch is active */}
                  <AnimatePresence>
                    {inverterActive && switchActive && (
                      <>
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.circle
                            key={`particle-switch-bulb-${i}`}
                            r="4"
                            fill="#10b981"
                            opacity="0.8"
                            filter="drop-shadow(0 0 5px rgba(16, 185, 129, 0.7))"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <animateMotion
                              dur={`${3 + i * 0.5}s`}
                              repeatCount="indefinite"
                              path={`M${switchPosition.x + 30},${switchPosition.y} 
                          L${switchPosition.x + 30},${switchPosition.y - 50} 
                          L${bulbPosition.x},${switchPosition.y - 50} 
                          L${bulbPosition.x},${bulbPosition.y + 50}`}
                              begin={`${i * 0.5}s`}
                            />
                          </motion.circle>
                        ))}
                      </>
                    )}
                  </AnimatePresence>

                  {/* Particles from bulb to word - only if bulb is active */}
                  <AnimatePresence>
                    {inverterActive && switchActive && bulbActive && (
                      <>
                        {Array.from({ length: 3 }).map((_, i) => (
                          <motion.circle
                            key={`particle-bulb-word-${i}`}
                            r="4"
                            fill={getCurrentMenuColor()}
                            opacity="0.8"
                            filter={`drop-shadow(0 0 5px ${getCurrentMenuColor()})`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.8 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <animateMotion
                              dur={`${3 + i * 0.5}s`}
                              repeatCount="indefinite"
                              path={`M${bulbPosition.x},${bulbPosition.y + 50}
                          L${bulbPosition.x},${wordPosition.y + 50}
                          L${wordPosition.x - 50},${wordPosition.y + 50}
                          L${wordPosition.x - 50},${wordPosition.y}`}
                              begin={`${i * 0.5}s`}
                            />
                          </motion.circle>
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </svg>
              </div>

              {/* Interactive Components */}
              <div className="absolute inset-0 overflow-visible" ref={diagramRef}>
                {/* Component Containers */}
                {/* Inverter Container - with custom housing (Code B) and inverter UI (Code A) */}
                <div
                  className="absolute"
                  style={{
                    left: `150px`,
                    top: `${inverterPosition.y}px`,
                    transform: "translate(-50%, -50%)",
                    width: "220px",
                    height: "320px",
                    border: "none",
                    borderRadius: "0",
                    background: "transparent",
                    boxShadow: "none",
                    transition: "box-shadow 0.3s ease",
                  }}
                >
                  {/* Code B - Housing Container */}
                  <div
                    className="relative mx-auto"
                    style={{
                      width: "400px",
                      height: "590px",
                      background: "linear-gradient(145deg, rgb(217, 218, 222), rgb(150, 156, 167))",
                      borderRadius: "15px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.3) 0px 10px 20px, rgba(0, 0, 0, 0.2) 0px 6px 6px, rgba(255, 255, 255, 0.1) 0px 1px 1px inset",
                      border: "none", // Removed border
                      transformOrigin: "center center",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%) scale(0.5)",
                    }}
                  >
                    {/* Top mounting bracket */}
                    <div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        width: "300px",
                        height: "20px",
                        background: "rgb(15, 23, 42)",
                        borderRadius: "5px 5px 0px 0px",
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "0px 40px",
                        border: "none", // Removed border
                      }}
                    >
                      <div className="w-4 h-8 bg-gray-700 rounded-full" style={{ transform: "translateY(-4px)" }}></div>
                      <div className="w-4 h-8 bg-gray-700 rounded-full" style={{ transform: "translateY(-4px)" }}></div>
                    </div>

                    {/* Bottom section */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-24"
                      style={{
                        background: "rgb(15, 23, 42)",
                        borderRadius: "0px 0px 15px 15px",
                        clipPath: "polygon(0px 40%, 100% 40%, 100% 100%, 0px 100%)",
                        border: "none", // Removed border
                      }}
                    ></div>

                    {/* Code A - Inverter UI - Centered in Code B */}
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        width: "280px",
                        height: "400px",
                        background: "rgb(15, 23, 42)",
                        borderRadius: "15px",
                        padding: "15px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: "none", // Removed border
                        boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 3px inset",
                      }}
                    >
                      {/* Top control buttons */}
                      <div className="w-full flex justify-between mb-4">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center relative"
                          style={{ backgroundColor: "rgb(30, 41, 59)" }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-black"
                          >
                            <rect
                              x="6"
                              y="8"
                              width="12"
                              height="8"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              fill="none"
                            ></rect>
                            <line x1="8" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
                            <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
                            <line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
                            <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5"></line>
                          </svg>
                        </div>
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center relative"
                          style={{ backgroundColor: "rgb(30, 41, 59)" }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-black"
                          >
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5"></path>
                            <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5"></path>
                            <path d="M5 19L19 5" stroke="currentColor" strokeWidth="1.5"></path>
                          </svg>
                        </div>
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center relative"
                          style={{ backgroundColor: "rgb(30, 41, 59)" }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-black"
                          >
                            <rect
                              x="6"
                              y="7"
                              width="12"
                              height="10"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              fill="none"
                            ></rect>
                            <line x1="10" y1="4" x2="10" y2="7" stroke="currentColor" strokeWidth="1.5"></line>
                            <line x1="14" y1="4" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5"></line>
                            <line x1="9" y1="10" x2="15" y2="10" stroke="currentColor" strokeWidth="1.5"></line>
                            <line x1="9" y1="14" x2="15" y2="14" stroke="currentColor" strokeWidth="1.5"></line>
                          </svg>
                        </div>
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center relative"
                          style={{ backgroundColor: "rgb(30, 41, 59)" }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-black"
                          >
                            <path d="M12 4L22 20H2L12 4Z" stroke="currentColor" strokeWidth="1.5" fill="none"></path>
                            <line x1="12" y1="10" x2="12" y2="14" stroke="currentColor" strokeWidth="1.5"></line>
                            <line x1="12" y1="16" x2="12" y2="18" stroke="currentColor" strokeWidth="1.5"></line>
                          </svg>
                        </div>
                      </div>

                      {/* LCD Screen */}
                      <div
                        className="w-full h-[280px] mb-4 p-2 relative overflow-hidden lcd-screen"
                        style={{
                          background: "rgb(5, 46, 22)",
                          borderRadius: "5px",
                          border: "none", // Removed border
                          opacity: inverterActive ? "1" : "0",
                          filter: inverterActive ? "brightness(100%)" : "brightness(0%)",
                          visibility: inverterActive ? "visible" : "hidden",
                          boxShadow: inverterActive ? "inset 0 0 10px rgba(0, 255, 128, 0.2)" : "none",
                        }}
                      >
                        {/* Loading effect - only shown during activation */}
                        {inverterActive && (
                          <div className="flex flex-col h-full text-emerald-400 relative">
                            {/* Power-on loading animation */}
                            <motion.div
                              className="absolute inset-0 flex flex-col items-center justify-center z-10 power-on-screen"
                              initial={{ opacity: 1 }}
                              animate={{ opacity: 0 }}
                              transition={{ duration: 2.5, ease: "easeOut" }}
                            >
                              <div className="text-emerald-400/70 text-sm mb-6">POWER INITIALIZING</div>

                              {/* Loading animation */}
                              <div className="w-4/5 h-1 bg-emerald-900/50 rounded-full overflow-hidden mb-4">
                                <motion.div
                                  className="h-full bg-emerald-500/50"
                                  initial={{ width: "0%" }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 2, ease: "linear" }}
                                />
                              </div>

                              {/* Flickering text */}
                              <motion.div
                                className="text-[10px] text-emerald-600/70 mt-2"
                                animate={{ opacity: [0.3, 0.7, 0.3] }}
                                transition={{ duration: 0.8, repeat: 3 }}
                              >
                                SYSTEM BOOT SEQUENCE
                              </motion.div>

                              {/* Diagnostic text */}
                              <motion.div
                                className="absolute bottom-8 left-0 right-0 text-[8px] text-emerald-700/70 font-mono"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                              >
                                <div className="flex flex-col items-center">
                                  <div>CHECKING HARDWARE...</div>
                                  <div className="mt-1">LOADING FIRMWARE v3.2.1</div>
                                  <motion.div
                                    className="mt-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                  >
                                    INITIALIZING POWER MODULES
                                  </motion.div>
                                </div>
                              </motion.div>
                            </motion.div>

                            {/* Mode indicators */}
                            <div className="w-full flex justify-between border-b border-emerald-900 pb-1 mb-1">
                              <div className="text-xs flex flex-col items-center text-emerald-400">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    fill="none"
                                  ></circle>
                                  <path
                                    d="M8 13C8.5 15 10 16 12 16C14 16 15.5 15 16 13"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                  ></path>
                                  <circle cx="9" cy="9" r="1.5" fill="currentColor"></circle>
                                  <circle cx="15" cy="9" r="1.5" fill="currentColor"></circle>
                                </svg>
                                <span className="text-[10px]">Normal</span>
                              </div>
                              <div
                                className={`text-xs flex flex-col items-center ${inverterActive ? "text-emerald-400" : "text-emerald-700"}`}
                              >
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="6"
                                    y="8"
                                    width="12"
                                    height="8"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    fill="none"
                                  ></rect>
                                  <line x1="8" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
                                  <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
                                  <line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
                                  <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5"></line>
                                </svg>
                                <span className="text-[10px]">PV Mode</span>
                              </div>
                              <div className="text-xs flex flex-col items-center text-emerald-700">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="8"
                                    y="6"
                                    width="8"
                                    height="12"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    fill="none"
                                  ></rect>
                                  <line x1="10" y1="4" x2="10" y2="6" stroke="currentColor" strokeWidth="1.5"></line>
                                  <line x1="14" y1="4" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5"></line>
                                  <line x1="10" y1="9" x2="14" y2="9" stroke="currentColor" strokeWidth="1.5"></line>
                                </svg>
                                <span className="text-[10px]">Batt. Mode</span>
                              </div>
                            </div>

                            {/* Metrics grid */}
                            <div className="grid grid-cols-2 gap-1 flex-1">
                              <div className="flex flex-col justify-between">
                                <div className="mb-1">
                                  <div className="text-xs flex items-center">
                                    <span>AC INPUT</span>
                                  </div>
                                  <div className="flex items-center">
                                    <svg
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="text-emerald-400 mr-1"
                                    >
                                      <path
                                        d="M12 3L12 7M12 7L9 7M12 7L15 7"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                      ></path>
                                      <path d="M5 21L19 21" stroke="currentColor" strokeWidth="1.5"></path>
                                      <path d="M5 7L7 7M17 7L19 7" stroke="currentColor" strokeWidth="1.5"></path>
                                      <path d="M7 7L7 16M17 7L17 16" stroke="currentColor" strokeWidth="1.5"></path>
                                      <path d="M7 11L17 11" stroke="currentColor" strokeWidth="1.5"></path>
                                    </svg>
                                    <div className="text-2xl font-digital">
                                      00<span className="text-xs ml-1">Hz</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="mb-1">
                                  <div className="text-xs flex items-center">
                                    <span>TOTAL ENERGY</span>
                                  </div>
                                  <div className="text-2xl font-digital">
                                    {inverterActive
                                      ? Math.floor(2350 + energySaved)
                                          .toString()
                                          .padStart(5, "0")
                                      : "02350"}
                                    <span className="text-xs ml-1">kWh</span>
                                  </div>
                                </div>
                                <div className="mb-1">
                                  <div className="text-xs flex items-center">
                                    <span>PV INPUT</span>
                                  </div>
                                  <div className="flex items-center">
                                    <svg
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="text-emerald-400 mr-1"
                                    >
                                      <rect
                                        x="6"
                                        y="8"
                                        width="12"
                                        height="8"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        fill="none"
                                      ></rect>
                                      <line x1="8" y1="8" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
                                      <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
                                      <line x1="16" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5"></line>
                                      <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="1.5"></line>
                                    </svg>
                                    <div className="text-2xl font-digital">
                                      {inverterActive ? "48" : "00"}
                                      <span className="text-xs ml-1">Vdc</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col justify-between">
                                <div className="mb-1">
                                  <div className="text-xs flex items-center">
                                    <span>AC OUTPUT</span>
                                  </div>
                                  <div className="text-2xl font-digital">
                                    {inverterActive ? "50" : "00"}
                                    <span className="text-xs ml-1">Hz</span>
                                  </div>
                                  <div className="text-xs mt-0.5"></div>
                                </div>
                                <div className="mb-1">
                                  <div className="text-xs">LOAD CAP</div>
                                  <div className="text-2xl font-digital">
                                    {inverterActive && switchActive ? "060" : "000"}
                                    <span className="text-xs ml-1">%</span>
                                  </div>
                                </div>
                                <div className="mb-1">
                                  <div className="text-xs flex items-center">
                                    <span>BATT CAP</span>
                                  </div>
                                  <div className="text-2xl font-digital">
                                    {inverterActive ? "080" : "000"}
                                    <span className="text-xs ml-1">%</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Status bar */}
                            <div className="mt-auto mb-1 border-t border-emerald-900/50 pt-1 text-[10px] flex justify-between">
                              <div>TEMP: {inverterActive ? "36°C" : "25°C"}</div>
                              <div>FAN: {inverterActive ? "40%" : "0%"}</div>
                              <div>{inverterActive ? "GRID MODE" : "STANDBY"}</div>
                            </div>

                            {/* System diagram */}
                            <div className="h-16 flex-shrink-0">
                              <svg
                                width="100%"
                                height="100%"
                                viewBox="0 0 240 60"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-emerald-400"
                              >
                                <rect
                                  x="100"
                                  y="10"
                                  width="40"
                                  height="40"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                  fill="none"
                                ></rect>
                                <text x="120" y="35" textAnchor="middle" className="text-[8px]" fill="currentColor">
                                  MPPT
                                </text>
                                <rect
                                  x="20"
                                  y="15"
                                  width="40"
                                  height="15"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                  fill="none"
                                ></rect>
                                <line x1="30" y1="15" x2="30" y2="30" stroke="currentColor" strokeWidth="1"></line>
                                <line x1="40" y1="15" x2="40" y2="30" stroke="currentColor" strokeWidth="1"></line>
                                <line x1="50" y1="15" x2="50" y2="30" stroke="currentColor" strokeWidth="1"></line>
                                <line x1="20" y1="22" x2="60" y2="22" stroke="currentColor" strokeWidth="1"></line>
                                <rect
                                  x="180"
                                  y="15"
                                  width="40"
                                  height="15"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                  fill="none"
                                ></rect>
                                <line x1="190" y1="30" x2="190" y2="20" stroke="currentColor" strokeWidth="1"></line>
                                <line x1="210" y1="30" x2="210" y2="20" stroke="currentColor" strokeWidth="1"></line>
                                <path d="M185 20L215 20" stroke="currentColor" strokeWidth="1"></path>
                                <path d="M200 15L200 10" stroke="currentColor" strokeWidth="1"></path>
                                <rect
                                  x="100"
                                  y="55"
                                  width="40"
                                  height="10"
                                  stroke="currentColor"
                                  strokeWidth="1"
                                  fill="none"
                                  transform="translate(0, -15)"
                                ></rect>
                                <line x1="110" y1="40" x2="110" y2="50" stroke="currentColor" strokeWidth="1"></line>
                                <line x1="130" y1="40" x2="130" y2="50" stroke="currentColor" strokeWidth="1"></line>
                                <line x1="60" y1="22" x2="100" y2="22" stroke="currentColor" strokeWidth="1"></line>
                                <line x1="140" y1="22" x2="180" y2="22" stroke="currentColor" strokeWidth="1"></line>
                                <line x1="120" y1="50" x2="120" y2="40" stroke="currentColor" strokeWidth="1"></line>
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Control buttons */}
                      <div className="w-full flex justify-between mt-4">
                        <div className="flex flex-col items-center">
                          <button className="w-12 h-12 relative focus:outline-none" tabIndex={0}>
                            <div
                              className="w-10 h-10 mx-auto bg-gray-900 rounded-full flex items-center justify-center"
                              style={{
                                backgroundColor: "rgb(15, 23, 42)",
                                boxShadow: "rgba(0, 0, 0, 0.3) 0px 2px 4px, rgba(255, 255, 255, 0.1) 0px 1px 1px inset",
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-gray-400"
                              >
                                <path
                                  d="M14 6L8 12L14 18"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </div>
                            <div className="absolute inset-0 rounded-full pointer-events-none"></div>
                          </button>
                          <span className="text-xs text-gray-400 mt-1">CONF</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <button className="w-12 h-12 relative focus:outline-none" tabIndex={0}>
                            <div
                              className="w-10 h-10 mx-auto bg-gray-900 rounded-full flex items-center justify-center"
                              style={{
                                boxShadow: "rgba(0, 0, 0, 0.3) 0px 2px 4px, rgba(255, 255, 255, 0.1) 0px 1px 1px inset",
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-gray-400"
                              >
                                <path
                                  d="M19 12H5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                                <path
                                  d="M12 5L12 19"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </div>
                            <div className="absolute inset-0 rounded-full pointer-events-none"></div>
                          </button>
                          <span className="text-xs text-gray-400 mt-1">SELECT</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <button className="w-12 h-12 relative focus:outline-none" tabIndex={0}>
                            <div
                              className="w-10 h-10 mx-auto bg-gray-900 rounded-full flex items-center justify-center"
                              style={{
                                boxShadow: "rgba(0, 0, 0, 0.3) 0px 2px 4px, rgba(255, 255, 255, 0.1) 0px 1px 1px inset",
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-gray-400"
                              >
                                <circle cx="12" cy="12" r="2" fill="currentColor"></circle>
                              </svg>
                            </div>
                            <div className="absolute inset-0 rounded-full pointer-events-none"></div>
                          </button>
                          <span className="text-xs text-gray-400 mt-1">SELECT</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <motion.button
                            className="w-12 h-12 relative focus:outline-none"
                            tabIndex={0}
                            onClick={handleActivate}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <div
                              className="w-10 h-10 mx-auto bg-gray-900 rounded-full flex items-center justify-center"
                              style={{
                                backgroundColor: inverterActive ? "#0f172a" : "#0f172a",
                                boxShadow: inverterActive
                                  ? "inset 0 2px 4px rgba(0,0,0,0.5)"
                                  : "rgba(0, 0, 0, 0.3) 0px 2px 4px, rgba(255, 255, 255, 0.1) 0px 1px 1px inset",
                                transform: inverterActive ? "translateY(1px)" : "translateY(0)",
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={`${inverterActive ? "text-red-400" : "text-emerald-400"}`}
                              >
                                {inverterActive ? (
                                  // Stop icon (X) when inverter is active
                                  <path
                                    d="M18 6L6 18M6 6L18 18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                ) : (
                                  // Start icon (arrow) when inverter is inactive
                                  <>
                                    <path
                                      d="M7 17L17 7"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M7 7H17V17"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </>
                                )}
                              </svg>
                            </div>
                            <motion.div
                              className={`absolute inset-0 rounded-full pointer-events-none ${
                                inverterActive ? "bg-red-500/20" : "bg-emerald-500/20"
                              }`}
                              animate={
                                showActivateButton && !inverterActive
                                  ? {
                                      scale: [1, 1.1, 1],
                                      opacity: [0.5, 0.8, 0.5],
                                    }
                                  : {}
                              }
                              transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                              }}
                            />
                          </motion.button>
                          <span
                            className={`text-xs mt-1 ${inverterActive ? "text-red-400 font-medium" : "text-emerald-400 font-medium"}`}
                          >
                            {inverterActive ? "STOP" : "START"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-emerald-400 text-xs font-medium">
                    Inverter
                  </div>
                </div>

                {/* Switch Container */}
                <div
                  className="absolute"
                  style={{
                    left: `${switchPosition.x}px`,
                    top: `${switchPosition.y}px`,
                    transform: "translate(-50%, -50%)",
                    width: "144px", // 120px * 1.2
                    height: "144px", // 120px * 1.2
                    border: "none",
                    borderRadius: "0",
                    background: "transparent",
                    boxShadow: "none",
                    transition: "box-shadow 0.3s ease",
                  }}
                >
                  <StaticSwitchNode
                    position={{ x: 60, y: 60 }}
                    switchOn={switchActive}
                    onSwitchChange={handleSwitchChange}
                    scale={switchScale}
                  />
                  <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-sky-400 text-xs font-medium">
                    Switch
                  </div>
                </div>

                {/* Bulb Container - with original StaticBulbNode */}
                <div
                  className="absolute flex items-center justify-center overflow-visible"
                  style={{
                    left: `${bulbPosition.x}px`,
                    top: `${bulbPosition.y}px`,
                    transform: "translate(-50%, -50%)",
                    width: "120px",
                    height: "180px",
                    border: "none",
                    borderRadius: "0",
                    background: "transparent",
                    filter: bulbActive ? "drop-shadow(0 0 40px rgba(16, 185, 129, 0.3))" : "none",
                    WebkitFilter: bulbActive ? "drop-shadow(0 0 40px rgba(16, 185, 129, 0.3))" : "none",
                    transition: "all 0.3s ease",
                    zIndex: 10,
                  }}
                >
                  <div className="flex items-center justify-center w-full h-full overflow-visible">
                    <StaticBulbNode bulbOn={bulbActive} scale={scale} />
                  </div>
                  <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-emerald-400 text-xs font-medium">
                    Bulb
                  </div>
                </div>

                {/* Word Container */}
                <div
                  className="absolute"
                  style={{
                    left: `${wordPosition.x}px`,
                    top: `${wordPosition.y}px`,
                    transform: "translate(-50%, -50%)",
                    width: "150px",
                    height: "80px",
                    border: "none",
                    borderRadius: "0",
                    background: "transparent",
                    boxShadow: "none",
                    transition: "box-shadow 0.3s ease",
                  }}
                >
                  <StaticWordNode
                    position={{ x: 75, y: 40 }}
                    word={getCurrentMenuText()}
                    illuminated={wordActive}
                    scale={scale}
                    cycleWords={wordActive && hiddenTextVisible}
                    words={menuItems.map((item) => item.replace("/", "").toUpperCase())}
                    onClick={handleWordNodeClick}
                    color={getCurrentMenuColor()}
                    glowColor={getCurrentMenuColor()}
                  />
                  <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-emerald-400 text-xs font-medium">
                    Output
                  </div>
                </div>

                {/* Hidden Text - Only visible when all components are active */}
                <AnimatePresence>
                  {hiddenTextVisible && (
                    <motion.div
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-emerald-400 text-sm font-medium bg-slate-800/50 px-4 py-2 rounded-md border-0 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center gap-2">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-emerald-400"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        ></motion.div>
                        <span>Navigation Menu Active</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Compact Animated START Card */}
              <AnimatePresence>
                {showActivateButton && !inverterActive && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none z-30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Pulsing highlight around the START button */}
                    <motion.div
                      className="absolute"
                      style={{
                        left: `${inverterPosition.x + 30}px`,
                        top: `${inverterPosition.y + 20}px`,
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, rgba(16, 185, 129, 0) 70%)",
                        zIndex: 40,
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 0.3, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Animated energy particles flowing toward START button */}
                    <motion.div
                      className="absolute"
                      style={{
                        left: `${inverterPosition.x + 80}px`,
                        top: `${inverterPosition.y}px`,
                        width: "100px",
                        height: "100px",
                        zIndex: 40,
                      }}
                    >
                      {isClient && Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={`particle-${i}`}
                          className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400"
                          style={{
                            left: 0,
                            top: 0,
                            filter: "blur(1px)",
                            border: "none",
                          }}
                          initial={{ 
                            left: 0,
                            top: 0,
                            opacity: 0 
                          }}
                          animate={{
                            left: [0, Math.random() * 100],
                            top: [0, Math.random() * 100],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatDelay: Math.random() * 2
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* Compact message card */}
                    <motion.div
                      className="absolute bg-slate-800/90 backdrop-blur-md border-0 rounded-lg p-3 shadow-lg"
                      style={{
                        left: `${inverterPosition.x + 100}px`,
                        top: `${inverterPosition.y + 10}px`,
                        maxWidth: "160px",
                        zIndex: 40,
                      }}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3,
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <motion.div
                        className="text-emerald-400 font-medium text-sm mb-1 flex items-center"
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                        />
                        Press START
                      </motion.div>
                      <div className="text-white text-xs mb-1 leading-tight">Activate the system to begin</div>
                      <motion.div
                        className="flex items-center justify-center mt-2"
                        animate={{ x: [0, -2, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-emerald-400 mr-1">
                          <path
                            d="M19 12H5M12 5L5 12l7 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-xs text-emerald-300">Bottom right</span>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Replace the particle sections with */}
              <AnimatePresence>
                {isClient && (
                  <motion.div 
                    className="absolute inset-0 pointer-events-none"
                    initial="hidden"
                    animate="visible"
                  >
                    {PARTICLE_POSITIONS.map((particle, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        className="particle absolute rounded-full"
                        variants={particleVariants}
                        style={{
                          width: `${particle.width}px`,
                          height: `${particle.height}px`,
                          backgroundColor: particle.color,
                          filter: 'blur(2px)',
                          left: particle.left,
                          top: particle.top
                        }}
                        transition={{
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Keep the existing styles */}
      <style jsx>{`
        @keyframes powerOnFlicker {
          0% { opacity: 0.1; }
          5% { opacity: 0.3; }
          10% { opacity: 0.1; }
          15% { opacity: 0.5; }
          20% { opacity: 0.2; }
          25% { opacity: 0.7; }
          30% { opacity: 0.3; }
          35% { opacity: 0.8; }
          40% { opacity: 0.4; }
          45% { opacity: 0.9; }
          50% { opacity: 1; }
          55% { opacity: 0.8; }
          60% { opacity: 1; }
          100% { opacity: 1; }
        }

        .power-on-screen {
          animation: powerOnFlicker 1.2s ease-in-out;
        }

        .font-digital {
          font-family: monospace;
          letter-spacing: 1px;
          font-weight: 500;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          border: none !important;
        }

        @keyframes flowAnimation {
          0% {
            transform: translateX(0) translateY(0);
          }
          100% {
            transform: translateX(100%) translateY(100%);
          }
        }
      `}</style>
    </section>
  )
}
