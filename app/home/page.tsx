"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, SunMedium, Battery, Zap, Wind, Leaf, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/shared/navigation"
import {
  GreenBackgroundAnimation,
  PulsingElementAnimation,
  FloatingIconAnimation,
  ParticleWaveAnimation,
  AnimatedCounter,
  AnimatedBlobBackground,
  Card3DEffect,
  TypingTextAnimation,
} from "@/components/animations/shared-animations"

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [inverterActive, setInverterActive] = useState(false)
  const [switchActive, setSwitchActive] = useState(false)
  const [bulbActive, setBulbActive] = useState(false)
  const [wordActive, setWordActive] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)
  const [windowHeight, setWindowHeight] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    setWindowHeight(window.innerHeight)
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update the inverter activation handler
  const handleInverterChange = (active: boolean) => {
    setInverterActive(active)

    // If turning off the inverter, turn off all other components
    if (!active) {
      setSwitchActive(false)
      setBulbActive(false)
      setWordActive(false)
    }
  }

  // Update the switch activation handler
  const handleSwitchChange = (active: boolean) => {
    // Only allow switch activation if inverter is on
    if (inverterActive) {
      setSwitchActive(active)

      // When switch is activated, also activate bulb and word
      if (active) {
        setBulbActive(true)
        setWordActive(true)
      } else {
        // When switch is deactivated, turn off bulb and word
        setBulbActive(false)
        setWordActive(false)
      }
    }
  }

  // Update animation phase based on inverter state
  useEffect(() => {
    if (inverterActive) {
      const timer = setTimeout(() => {
        setAnimationPhase(1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setAnimationPhase(0)
    }
  }, [inverterActive])

  // Update the getComponentPositions function to match the diagram layout
  const getComponentPositions = () => {
    // Fixed dimensions for the diagram container
    const containerWidth = Math.min(windowWidth * 0.9, 1000) // 90% of window width, max 1000px

    // Fixed height based on screen size - increased to accommodate inverter
    // Make container height responsive to viewport height
    let containerHeight = Math.min(windowHeight * 0.5, 450) // 50% of viewport height, max 450px
    if (windowWidth < 480) containerHeight = Math.min(windowHeight * 0.4, 300)
    else if (windowWidth < 640) containerHeight = Math.min(windowHeight * 0.45, 350)
    else if (windowWidth < 768) containerHeight = Math.min(windowHeight * 0.5, 400)

    // Calculate positions as percentages of container width
    // Position inverter on the left side
    const inverterX = containerWidth * 0.15

    // Position other components in a horizontal line to the right of the inverter
    const switchX = containerWidth * 0.5 // Middle
    const bulbX = containerWidth * 0.7 // Right of middle
    const wordX = containerWidth * 0.85 // Far right

    // Y positions - align all components on the same horizontal line
    const componentY = containerHeight * 0.5 // Center vertically
    const inverterY = componentY // Keep inverter on same line

    // Calculate inverter scale based on container height
    const maxInverterHeight = containerHeight * 0.7
    const inverterScale = maxInverterHeight / 590

    // Scale factor for other components based on screen width
    let scale = 0.7 // Default scale
    if (windowWidth < 480) scale = 0.2
    else if (windowWidth < 640) scale = 0.25
    else if (windowWidth < 768) scale = 0.3
    else if (windowWidth < 1024) scale = 0.4
    else if (windowWidth < 1280) scale = 0.5

    return {
      inverterPosition: { x: inverterX, y: inverterY },
      switchPosition: { x: switchX, y: componentY },
      bulbPosition: { x: bulbX, y: componentY },
      wordPosition: { x: wordX, y: componentY },
      scale,
      inverterScale,
      containerHeight,
      containerWidth,
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
  } = getComponentPositions()

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0a1628] text-white custom-scrollbar overflow-y-auto relative">
        {/* Animated Background */}
        <GreenBackgroundAnimation intensity="medium" theme="energy" />

        {/* Floating Icons */}
        <FloatingIconAnimation icon={<SunMedium />} delay={0} />
        <FloatingIconAnimation icon={<Leaf />} delay={2} />
        <FloatingIconAnimation icon={<Wind />} delay={4} />
        <FloatingIconAnimation icon={<Battery />} delay={6} />
        <FloatingIconAnimation icon={<Zap />} delay={8} />

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 overflow-hidden mt-16">
          {/* Add animated blob background */}
          <AnimatedBlobBackground color="#4ade80" opacity={0.05} count={4} speed="slow" />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-6 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <motion.span
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  Powering a Sustainable Future
                </motion.span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <motion.span
                  className="inline-block"
                  animate={
                    switchActive
                      ? {
                          y: [0, -5, 0],
                          textShadow: switchActive ? "0 0 10px rgba(74, 222, 128, 0.5)" : "none",
                        }
                      : {}
                  }
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.1,
                  }}
                >
                  Building
                </motion.span>{" "}
                <motion.span
                  className="inline-block"
                  animate={
                    switchActive
                      ? {
                          y: [0, -5, 0],
                          textShadow: switchActive ? "0 0 10px rgba(74, 222, 128, 0.5)" : "none",
                        }
                      : {}
                  }
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                >
                  a Greener
                </motion.span>{" "}
                <motion.span
                  className={`inline-block ${switchActive ? "text-glow" : ""} text-green-400`}
                  animate={
                    switchActive
                      ? {
                          y: [0, -5, 0],
                          textShadow: [
                            "0 0 10px rgba(74, 222, 128, 0.5)",
                            "0 0 20px rgba(74, 222, 128, 0.8)",
                            "0 0 10px rgba(74, 222, 128, 0.5)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  Future
                </motion.span>{" "}
                <motion.span
                  animate={
                    switchActive
                      ? {
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.2, 1],
                          filter: [
                            "drop-shadow(0 0 5px rgba(74, 222, 128, 0.5))",
                            "drop-shadow(0 0 10px rgba(74, 222, 128, 0.8))",
                            "drop-shadow(0 0 5px rgba(74, 222, 128, 0.5)",
                          ],
                        }
                      : {}
                  }
                  transition={switchActive ? { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 } : {}}
                >
                  <Zap
                    className={`inline-block h-8 w-8 ${switchActive ? "text-green-400 filter-glow" : "text-green-400"}`}
                  />
                </motion.span>
              </h1>

              <motion.p
                className="text-slate-300 text-lg mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <span className="italic text-[#3DD56D]">Turning 20 Villages</span> into Green Villages by 2030. Leading
                Ethiopia's energy transition with{" "}
                <span className="text-[#3DD56D] font-medium">sustainable, reliable, and affordable innovations</span>.
              </motion.p>

              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
              >
                <Link href="/solutions">
                  <Button className="bg-[#3DD56D] hover:bg-[#2bb757] text-white relative overflow-hidden group">
                    <span className="relative z-10 flex items-center">
                      Explore Solutions
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </motion.span>
                    </span>
                    <motion.span
                      className="absolute inset-0 bg-[#2bb757]"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-white text-[#3DD56D] hover:bg-white/10 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Contact Us</span>
                    <motion.span
                      className="absolute inset-0 bg-white/10"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </Link>
              </motion.div>

              {/* Add scroll indicator */}
              <motion.div
                className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="flex flex-col items-center text-slate-400 text-sm"
                >
                  <span className="mb-2">Scroll to explore</span>
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 bg-slate-900/50 relative">
          {/* Add particle wave animation */}
          <ParticleWaveAnimation color="#4ade80" density="medium" speed="slow" />

          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">About Us</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Established in 2016, Grean World Energy is transforming rural and remote communities in Ethiopia through
                smart energy systems. Our unique{" "}
                <span className="text-[#3DD56D] font-medium">village-level entrepreneurs distribution model</span>{" "}
                ensures last-mile access and empowers local entrepreneurs—primarily women.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card3DEffect depth="medium" className="h-full">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50 hover:border-[#3DD56D]/30 transition-all h-full"
                >
                  <PulsingElementAnimation x={24} y={24} size={40} color="#4ade80" intensity="low">
                    <SunMedium className="h-6 w-6 text-[#3DD56D]" />
                  </PulsingElementAnimation>
                  <div className="pl-12">
                    <h3 className="text-xl font-semibold mb-3">Energy Hubs</h3>
                    <p className="text-slate-300 text-sm">
                      Install energy hubs for off-grid villages, bringing sustainable power to remote communities.
                    </p>
                    <Link href="/solutions">
                      <Button variant="link" className="text-[#3DD56D] p-0 mt-2 h-auto group">
                        Learn more
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </motion.span>
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </Card3DEffect>

              <Card3DEffect depth="medium" className="h-full">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50 hover:border-[#3DD56D]/30 transition-all h-full"
                >
                  <PulsingElementAnimation x={24} y={24} size={40} color="#4ade80" intensity="low">
                    <Battery className="h-6 w-6 text-[#3DD56D]" />
                  </PulsingElementAnimation>
                  <div className="pl-12">
                    <h3 className="text-xl font-semibold mb-3">Solar Solutions</h3>
                    <p className="text-slate-300 text-sm">
                      Promote solar milling, solar irrigation, and nano-grids to power agricultural and community needs.
                    </p>
                    <Link href="/solutions">
                      <Button variant="link" className="text-[#3DD56D] p-0 mt-2 h-auto group">
                        Learn more
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </motion.span>
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </Card3DEffect>

              <Card3DEffect depth="medium" className="h-full">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50 hover:border-[#3DD56D]/30 transition-all h-full"
                >
                  <PulsingElementAnimation x={24} y={24} size={40} color="#4ade80" intensity="low">
                    <Zap className="h-6 w-6 text-[#3DD56D]" />
                  </PulsingElementAnimation>
                  <div className="pl-12">
                    <h3 className="text-xl font-semibold mb-3">Support Services</h3>
                    <p className="text-slate-300 text-sm">
                      Offer mobile apps and a professional support team to ensure systems run efficiently.
                    </p>
                    <Link href="/solutions">
                      <Button variant="link" className="text-[#3DD56D] p-0 mt-2 h-auto group">
                        Learn more
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </motion.span>
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </Card3DEffect>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                We're making a difference in communities around the world with our sustainable energy solutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50"
              >
                <div className="text-center">
                  <SunMedium className="h-8 w-8 text-[#3DD56D] mx-auto mb-4" />
                  <AnimatedCounter from={0} to={270000} suffix="+" className="text-4xl font-bold text-white mb-2" />
                  <p className="text-slate-300">Clean Cooking Technologies</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50"
              >
                <div className="text-center">
                  <Zap className="h-8 w-8 text-[#3DD56D] mx-auto mb-4" />
                  <AnimatedCounter from={0} to={2016} suffix="" className="text-4xl font-bold text-white mb-2" />
                  <p className="text-slate-300">Year Established</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50"
              >
                <div className="text-center">
                  <Leaf className="h-8 w-8 text-[#3DD56D] mx-auto mb-4" />
                  <AnimatedCounter from={0} to={20} suffix="" className="text-4xl font-bold text-white mb-2" />
                  <p className="text-slate-300">Villages Goal by 2030</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50"
              >
                <div className="text-center">
                  <Wind className="h-8 w-8 text-[#3DD56D] mx-auto mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">ETH</div>
                  <p className="text-slate-300">Serving Ethiopia</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
          {/* Add animated blob background */}
          <AnimatedBlobBackground color="#4ade80" opacity={0.1} count={3} speed="slow" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Energy Future?</h2>

              <TypingTextAnimation
                text="Contact our expert team anytime at (+251) 913 330000 to discuss how GREAN WORLD can help you achieve your energy goals."
                speed="medium"
                className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto"
              />

              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-[#3DD56D] hover:bg-[#2bb757] text-white px-6 py-5 relative overflow-hidden group">
                      <span className="relative z-10 flex items-center">
                        Get in Touch
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.span>
                      </span>
                      <motion.span
                        className="absolute inset-0 bg-[#2bb757]"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/about">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="border-white text-[#3DD56D] hover:bg-white/10 px-6 py-5 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Learn About Us</span>
                      <motion.span
                        className="absolute inset-0 bg-white/10"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
