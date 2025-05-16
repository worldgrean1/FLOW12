"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Shield, Users, Target, Clock, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/shared/navigation"
import { GreenBackgroundAnimation } from "@/components/animations/background/GreenBackgroundAnimation"
import StaticSolarPanelNode from "@/components/static-nodes/static-solar-panel-node"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const coreValues = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Integrity",
      description: "We uphold the highest standards of honesty and ethical conduct in all our operations.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Teamwork",
      description: "We collaborate effectively, leveraging our diverse strengths to achieve common goals.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Persistence",
      description: "We remain steadfast in our commitment to overcome challenges and deliver results.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Responsibility",
      description: "We take ownership of our actions and their impact on communities and the environment.",
    },
  ]

  const impactPoints = [
    {
      title: "270,000+ Clean Energy Products",
      description: "Distributed clean cookstoves and solar products across rural Ethiopia.",
    },
    {
      title: "Women Entrepreneurs",
      description: "Empowered local women entrepreneurs to build sustainable businesses.",
    },
    {
      title: "Community Trust",
      description: "Built strong community trust and sustainable business networks.",
    },
  ]

  const plans = {
    shortTerm: [
      "Strengthen local market linkages to improve distribution efficiency",
      "Enhance database and communication systems for better service delivery",
    ],
    longTerm: [
      "Expand product range to provide broader energy access solutions",
      "Build solar-powered community energy hubs in rural areas",
    ],
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0a1628] text-white custom-scrollbar overflow-y-auto relative">
        {/* Animated Background */}
        <GreenBackgroundAnimation intensity="low" theme="about" />

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 overflow-hidden mt-16">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-6 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20">
                Our Story
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                About <span className="text-[#3DD56D]">GREAN WORLD</span>
              </h1>
              <p className="text-slate-300 text-lg mb-8">
                Founded in 2016 with one mission:{" "}
                <span className="font-bold">to lead Ethiopia's energy transition</span> by providing clean, accessible,
                and sustainable energy to rural and peri-urban communities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Model Section */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.7 }}
                className="order-2 lg:order-1"
              >
                <h2 className="text-3xl font-bold mb-6">Our Distribution Model</h2>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#3DD56D] mb-3">Village-Level Energy Entrepreneurs</h3>
                  <p className="text-slate-300">
                    We use a <span className="font-bold">Village-Level Energy Entrepreneurs Distribution Model</span> to
                    overcome rural infrastructure and distribution challenges. This approach ensures last-mile access
                    and empowers local entrepreneurs—primarily women—while building sustainable energy ecosystems in
                    communities across Ethiopia.
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-[#3DD56D] mb-3">Community-Centered Approach</h3>
                  <p className="text-slate-300">
                    By working directly with local entrepreneurs, we create jobs, build capacity, and ensure that our
                    energy solutions are tailored to the specific needs of each community we serve.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="order-1 lg:order-2 relative h-[500px]"
              >
                {/* The green pulsing animation behind the solar panel */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-96 h-96">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-green-600/20 animate-pulse"></div>
                      <div
                        className="absolute w-3/4 h-3/4 rounded-full bg-green-600/30 animate-pulse"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <div
                        className="absolute w-1/2 h-1/2 rounded-full bg-green-600/40 animate-pulse"
                        style={{ animationDelay: "1s" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Solar Panel Node */}
                <div className="absolute inset-0">
                  <StaticSolarPanelNode
                    position={{ x: 200, y: 220 }}
                    scale={0.7}
                    sunIntensity={80}
                    efficiency={22}
                    tiltAngle={25}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Impact Section */}
        <section className="py-16 px-4 sm:px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                We measure our success by the positive change we create in communities across Ethiopia.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {impactPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50 hover:border-[#3DD56D]/30 transition-all text-center relative"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-[#3DD56D]/10 flex items-center justify-center mx-auto mb-4 text-[#3DD56D]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(61, 213, 109, 0.2)",
                        "0 0 20px rgba(61, 213, 109, 0.4)",
                        "0 0 0 rgba(61, 213, 109, 0.2)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    {index === 0 ? (
                      <Lightbulb className="h-6 w-6" />
                    ) : index === 1 ? (
                      <Users className="h-6 w-6" />
                    ) : (
                      <Shield className="h-6 w-6" />
                    )}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
                  <p className="text-slate-300 text-sm">{point.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Plans Section */}
        <section className="py-16 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Vision</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                From immediate goals to long-term aspirations, we're committed to expanding clean energy access across
                Ethiopia.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.7 }}
                className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-lg border border-slate-700/50"
              >
                <h3 className="text-2xl font-semibold text-[#3DD56D] mb-4">Short-Term Plans</h3>
                <ul className="space-y-4">
                  {plans.shortTerm.map((plan, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 mt-1">
                        <div className="w-4 h-4 rounded-full bg-[#3DD56D]"></div>
                      </div>
                      <p className="text-slate-300">{plan}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-lg border border-slate-700/50"
              >
                <h3 className="text-2xl font-semibold text-[#3DD56D] mb-4">Long-Term Vision</h3>
                <ul className="space-y-4">
                  {plans.longTerm.map((plan, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 mt-1">
                        <div className="w-4 h-4 rounded-full bg-[#3DD56D]"></div>
                      </div>
                      <p className="text-slate-300">{plan}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-16 px-4 sm:px-6 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                These principles guide everything we do at GREAN WORLD, from product development to customer service.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50 hover:border-[#3DD56D]/30 transition-all text-center relative"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-[#3DD56D]/10 flex items-center justify-center mx-auto mb-4 text-[#3DD56D]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        "0 0 0 rgba(61, 213, 109, 0.2)",
                        "0 0 20px rgba(61, 213, 109, 0.4)",
                        "0 0 0 rgba(61, 213, 109, 0.2)",
                      ],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    {value.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-slate-300 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Mission</h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Help us transform Ethiopia's energy landscape and create a sustainable future for all.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-[#3DD56D] hover:bg-[#2bb757] text-white px-6 py-5">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/solutions">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-5">
                    Our Solutions
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
