"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Zap, BarChart3, Globe, Award } from "lucide-react"

export const ImpactSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Auto-rotate through impact cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 4)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Check if section is visible in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    const section = document.getElementById("impact-section")
    if (section) {
      observer.observe(section)
    }

    return () => {
      if (section) {
        observer.unobserve(section)
      }
    }
  }, [])

  const impactData = [
    {
      icon: <Zap className="h-6 w-6 text-green-400" />,
      title: "Energy Efficiency",
      description:
        "Our systems achieve up to 97% energy conversion efficiency, maximizing the power generated from every solar panel.",
      stat: "97%",
      statLabel: "Conversion Efficiency",
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-green-400" />,
      title: "Cost Savings",
      description:
        "Customers save an average of 65% on their energy bills after installing our intelligent energy systems.",
      stat: "65%",
      statLabel: "Average Bill Reduction",
    },
    {
      icon: <Globe className="h-6 w-6 text-green-400" />,
      title: "Environmental Impact",
      description: "Our installations have prevented over 50,000 tons of CO₂ emissions from entering the atmosphere.",
      stat: "50K+",
      statLabel: "Tons CO₂ Prevented",
    },
    {
      icon: <Award className="h-6 w-6 text-green-400" />,
      title: "Reliability",
      description:
        "With a 99.9% uptime guarantee, our systems provide consistent, reliable power when you need it most.",
      stat: "99.9%",
      statLabel: "System Uptime",
    },
  ]

  return (
    <div className="py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          At gean World Energy, we're committed to creating measurable impact through our intelligent energy solutions.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {impactData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            className={`relative overflow-hidden rounded-xl p-6 ${
              activeIndex === index
                ? "bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-500/30"
                : "bg-slate-800/30 border border-slate-700/50"
            } transition-all duration-300`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-4">
                <div
                  className={`p-2 rounded-lg ${
                    activeIndex === index ? "bg-green-500/20" : "bg-slate-700/50"
                  } transition-colors duration-300`}
                >
                  {item.icon}
                </div>
                <h3 className="ml-3 text-lg font-semibold">{item.title}</h3>
              </div>

              <p className="text-sm text-gray-300 mb-4 flex-grow">{item.description}</p>

              <div className="mt-auto">
                <div className="text-2xl sm:text-3xl font-bold text-green-400">{item.stat}</div>
                <div className="text-xs text-gray-400">{item.statLabel}</div>
              </div>

              {activeIndex === index && (
                <motion.div
                  className="absolute -bottom-2 -right-2 w-24 h-24 bg-green-400/10 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          {impactData.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-green-400 w-6" : "bg-gray-600"
              }`}
              aria-label={`View impact card ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
