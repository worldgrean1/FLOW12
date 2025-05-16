"use client"

import { useState, useEffect, useRef } from "react"
import { useWindowDimensions } from "@/hooks/useWindowDimensions"
import { useEnergySystemStore } from "@/store/energySystemStore"
import PremiumBackground from "@/components/premium/PremiumBackground"
import PremiumHeader from "@/components/premium/PremiumHeader"
import PremiumHeroSection from "@/components/premium/PremiumHeroSection"
import PremiumInteractiveDemo from "@/components/premium/PremiumInteractiveDemo"
import FeatureButtons from "@/components/landing/FeatureButtons"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ThreeDBackground from "@/components/landing/ThreeDBackground"

export default function LandingPage() {
  // Local UI state
  const [showInfoPanel, setShowInfoPanel] = useState(false)
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [prevBulbState, setPrevBulbState] = useState(false)
  const [animationCompleted, setAnimationCompleted] = useState(false)
  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(true)

  // Refs for interactive components
  const demoRef = useRef<HTMLDivElement>(null)
  const diagramRef = useRef<HTMLDivElement>(null)
  const featureRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Get window dimensions and scroll state
  const { windowHeight, windowWidth, scrolled } = useWindowDimensions()

  // Get energy system state from store
  const { inverterActive, switchActive, bulbActive, wordActive } = useEnergySystemStore()

  // Track previous bulb state for animations
  useEffect(() => {
    setPrevBulbState(bulbActive)
  }, [bulbActive])

  // Cycle through feature buttons when switch is active
  useEffect(() => {
    if (!switchActive) {
      setActiveFeature(null)
      return
    }

    const features = ["solarPower", "energyStorage", "smartGrids", "sustainability", "cleanEnergy"]
    let currentIndex = 0

    const interval = setInterval(() => {
      setActiveFeature(features[currentIndex])
      currentIndex = (currentIndex + 1) % features.length
    }, 3000)

    return () => clearInterval(interval)
  }, [switchActive])

  // Apply global styles - MODIFIED: Added styles to prevent white flash during transitions
  useEffect(() => {
    if (typeof document !== "undefined") {
      const style = document.createElement("style")
      style.innerHTML = `
      /* Prevent white flash during transitions */
      * {
        border-color: transparent !important;
      }
      
      /* Ensure all borders are transparent during transitions */
      *::before, *::after {
        border-color: transparent !important;
      }
      
      /* Ensure background transitions are smooth */
      * {
        transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
      }
      
      .text-glow {
        text-shadow: 0 0 10px rgba(16, 185, 129, 0.8), 0 0 20px rgba(16, 185, 129, 0.5);
      }
      .filter-glow {
        filter: drop-shadow(0 0 8px rgba(16, 185, 129, 0.8));
      }
      .logo-glow {
        box-shadow: 0 0 15px rgba(16, 185, 129, 0.8);
      }
      .particle {
        position: absolute;
        background: rgba(16, 185, 129, 0.6);
        border-radius: 50%;
        pointer-events: none;
        border: none !important;
      }
      
      /* Eco-tech glass effect */
      .eco-glass {
        background: rgba(30, 41, 59, 0.5);
        backdrop-filter: blur(10px);
        border: none !important;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      }
      
      /* Energy pulse effect */
      @keyframes energyPulse {
        0%, 100% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.1); opacity: 0.9; }
      }
      
      /* Wave animation */
      @keyframes waveAnimation {
        0% { transform: translateX(0); }
        100% { transform: translateX(-100px); }
      }
      
      /* Pulse animation */
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 0.3; }
        50% { transform: scale(1.05); opacity: 0.5; }
      }

      /* Energy flow animation */
      @keyframes energyFlow {
        0% { stroke-dashoffset: 1000; }
        100% { stroke-dashoffset: 0; }
      }

      /* Button glow effect */
      .btn-glow {
        box-shadow: 0 0 10px rgba(16, 185, 129, 0.6), 0 0 20px rgba(16, 185, 129, 0.4);
        transition: all 0.3s ease;
      }
      
      .btn-glow:hover {
        box-shadow: 0 0 15px rgba(16, 185, 129, 0.8), 0 0 30px rgba(16, 185, 129, 0.6);
      }

      /* Energy particle animation */
      @keyframes particleMove {
        0% { transform: translateY(0) translateX(0); opacity: 1; }
        100% { transform: translateY(-20px) translateX(var(--x-offset)); opacity: 0; }
      }

      .energy-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: #10b981;
        border-radius: 50%;
        filter: blur(2px);
        opacity: 0;
        pointer-events: none;
        border: none !important;
      }
      
      /* Nav item hover effect */
      .nav-item {
        position: relative;
        overflow: hidden;
      }
      
      .nav-item::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #10b981;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }
      
      .nav-item:hover::after {
        transform: translateX(0);
      }
      
      .nav-item.active::after {
        transform: translateX(0);
      }

      /* Logo animation */
      @keyframes logoRotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }

      .logo-spin {
        animation: logoRotate 30s linear infinite;
      }

      .logo-spin:hover {
        animation-duration: 15s;
      }

      /* Logo glow effect */
      .logo-container {
        position: relative;
        overflow: visible;
      }

      .logo-glow-effect {
        position: absolute;
        inset: -5px;
        background: radial-gradient(circle, rgba(16, 185, 129, 0.6) 0%, rgba(16, 185, 129, 0) 70%);
        opacity: 0;
        transition: opacity 0.5s ease;
        border-radius: 50%;
        z-index: -1;
      }

      .logo-container:hover .logo-glow-effect {
        opacity: 1;
      }

    /* Enhanced bulb lighting effects */
    @keyframes bulbFlash {
      0% { opacity: 0; transform: scale(0.2); }
      20% { opacity: 0.8; transform: scale(1.5); }
      100% { opacity: 0; transform: scale(1); }
    }
    
    @keyframes energyRipple {
      0% { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    
    @keyframes energyParticle {
      0% { transform: translateY(0) translateX(0); opacity: 0.9; }
      100% { transform: translateY(-30px) translateX(var(--x-offset, 0)); opacity: 0; }
    }
    
    .bulb-flash {
      animation: bulbFlash 0.6s ease-out forwards;
    }
    
    .energy-ripple {
      animation: energyRipple 2s ease-out infinite;
    }
    
    .energy-particle {
      width: 4px;
      height: 4px;
      background: #10b981;
      border-radius: 50%;
      position: absolute;
      filter: blur(2px);
      animation: energyParticle 1.5s ease-out forwards;
      border: none !important;
    }

    /* LED Text Animation Styles */
    .led-text-container {
      position: relative;
      mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
      -webkit-mask-image: linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%);
    }

    @keyframes ledFlicker {
      0%, 100% { opacity: 1; }
      3% { opacity: 0.8; }
      6% { opacity: 1; }
      9% { opacity: 0.9; }
      12% { opacity: 1; }
      50% { opacity: 1; }
      54% { opacity: 0.8; }
      57% { opacity: 1; }
    }

    .led-text-container::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(16, 185, 129, 0.7), transparent);
      z-index: 5;
      animation: ledFlicker 5s infinite;
      border: none !important;
    }

    .led-text-container::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(16, 185, 129, 0.7), transparent);
      z-index: 5;
      animation: ledFlicker 5s infinite;
      animation-delay: 0.5s;
      border: none !important;
    }
    `
      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [])

  // Animation variants
  const demoVariants = {
    center: {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.5,
      },
    },
    floatOut: {
      y: -20,
      scale: 0.95,
      opacity: 0.9,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.5,
      },
    },
  }

  const heroVariants = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.2,
        duration: 0.6,
      },
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const featureVariants = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.4,
        duration: 0.6,
      },
    },
    exit: {
      x: 100,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const metricsVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.6,
        duration: 0.6,
      },
    },
    exit: {
      y: 50,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const footerVariants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.8,
        duration: 0.6,
      },
    },
    exit: {
      y: 50,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  // Add this effect to reset animationCompleted when bulb state changes
  useEffect(() => {
    // Reset animation completion state when bulb is turned off
    if (!bulbActive) {
      setAnimationCompleted(false)
    }
  }, [bulbActive])

  useEffect(() => {
    // Simulate page loading (replace with actual logic if needed)
    const timer = setTimeout(() => {
      setIsPageLoaded(true)
      setShowLoadingOverlay(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const router = useRouter()

  return (
    <>
      <ThreeDBackground />
      <div style={{
        width: '100%',
        minHeight: '100vh',
        paddingTop: '1rem',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative'
      }} className="relative content-wrapper w-full bg-transparent">
        <section className="text-white w-full bg-transparent min-h-screen">
      <PremiumBackground />
        <PremiumHeader scrolled={scrolled} />
          <div style={{ marginBottom: '-300px' }}>
            <PremiumHeroSection />
          </div>
          <div className="w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <section className="h-[550px] sm:h-[600px] lg:h-[550px] w-full max-w-7xl text-white flex flex-col overflow-hidden relative">
            <PremiumInteractiveDemo
              showInfoPanel={showInfoPanel}
              setShowInfoPanel={setShowInfoPanel}
              windowWidth={windowWidth}
              windowHeight={windowHeight}
            />
            </section>
        </div>
          <div className="w-full flex justify-center pb-10 z-20 relative flex-shrink-0 px-4 sm:px-6 lg:px-8">
            <FeatureButtons 
              switchActive={switchActive}
              activeFeature={activeFeature}
              setActiveFeature={setActiveFeature}
              featureRefs={featureRefs}
            />
                </div>
          <footer style={{
            width: '100%',
            minHeight: 'fit-content',
            backgroundColor: 'rgb(255 255 255 / 80%)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            zIndex: 50
          }} className="footer-container">
            <div className="footer-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/images/grean-world-logo.png" alt="GREAN WORLD" className="h-8 w-auto object-contain" />
                <div className="text-[rgb(16,125,35)] text-sm whitespace-nowrap font-medium">
                  © 2025 GREAN WORLD Energy Technology
                </div>
              </div>
              <nav className="footer-links flex gap-6">
                <a href="/privacy" className="text-[rgb(16,125,35)] hover:text-emerald-500 text-sm transition-colors duration-200 font-medium">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-[rgb(16,125,35)] hover:text-emerald-500 text-sm transition-colors duration-200 font-medium">
                  Terms of Service
                </a>
                <a href="/contact" className="text-[rgb(16,125,35)] hover:text-emerald-500 text-sm transition-colors duration-200 font-medium">
                  Contact
                </a>
              </nav>
            </div>
          </footer>
            </section>
          </div>
    </>
  )
}
