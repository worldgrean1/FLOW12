"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, SunMedium, ClipboardList, GraduationCap, Network, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/shared/navigation"
import {
  GreenBackgroundAnimation,
  EnergyFlowAnimation,
  PulsingElementAnimation,
} from "@/components/animations/shared-animations"

export default function SolutionsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [flowActive, setFlowActive] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    // Activate flow animation after a delay
    const timer = setTimeout(() => {
      setFlowActive(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const solutions = [
    {
      id: "solar",
      icon: <SunMedium className="h-6 w-6" />,
      title: "Solar Panel Services",
      description: "Complete solar energy solutions from specification and design to installation and ongoing support.",
      benefits: [
        "Specification & Design",
        "Professional Installation",
        "Aftersales Support",
        "System Monitoring",
        "Maintenance & Repairs",
      ],
      link: "/solutions/solar-energy",
      position: { x: 150, y: 150 },
    },
    {
      id: "consultancy",
      icon: <ClipboardList className="h-6 w-6" />,
      title: "Energy Consultancy",
      description: "Expert guidance to optimize your energy usage and transition to sustainable energy solutions.",
      benefits: [
        "Energy Surveys & Audits",
        "Usage Analysis",
        "Compliance Support",
        "ROI Calculations",
        "Sustainability Planning",
      ],
      link: "/solutions/energy-consultancy",
      position: { x: 300, y: 150 },
    },
    {
      id: "training",
      icon: <GraduationCap className="h-6 w-6" />,
      title: "Training Programs",
      description: "Comprehensive training in renewable energy technologies for professionals and communities.",
      benefits: [
        "Engineering Design",
        "Manufacturing & Installation Skills",
        "Maintenance Training",
        "Certification Programs",
        "Hands-on Workshops",
      ],
      link: "/solutions/training",
      position: { x: 450, y: 150 },
    },
    {
      id: "hubs",
      icon: <Network className="h-6 w-6" />,
      title: "Energy Hubs Support",
      description: "Community-focused energy centers providing multiple services and infrastructure support.",
      benefits: [
        "Charging Stations",
        "Cooling & Refrigeration",
        "Retail Sales of Solar Parts",
        "Community Internet Access",
        "Energy Education Centers",
      ],
      link: "/solutions/energy-hubs",
      position: { x: 150, y: 300 },
    },
  ]

  // Create flow points for energy animation
  const flowPoints = [
    { from: solutions[0].position, to: solutions[3].position }, // Solar to Hubs
    { from: solutions[1].position, to: solutions[0].position }, // Consultancy to Solar
    { from: solutions[2].position, to: solutions[3].position }, // Training to Hubs
  ]

  const integrationCases = [
    {
      title: "Community Solar Projects",
      description:
        "Combining solar installation services with energy hub support to create sustainable community energy centers.",
      solutions: ["Solar Panel Services", "Energy Hubs Support"],
    },
    {
      title: "Commercial Energy Transition",
      description:
        "Comprehensive energy consultancy paired with solar solutions to help businesses reduce costs and carbon footprint.",
      solutions: ["Energy Consultancy", "Solar Panel Services"],
    },
    {
      title: "Workforce Development",
      description:
        "Training programs that prepare local technicians to support the growing network of energy hubs and solar installations.",
      solutions: ["Training Programs", "Energy Hubs Support"],
    },
    {
      title: "Sustainable Campus Initiative",
      description:
        "Integrated approach combining consultancy, solar implementation, and training for educational institutions.",
      solutions: ["Energy Consultancy", "Solar Panel Services", "Training Programs"],
    },
  ]

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0a1628] text-white custom-scrollbar overflow-y-auto relative">
        {/* Animated Background */}
        <GreenBackgroundAnimation intensity="medium" theme="solutions" />

        {/* Energy Flow Animation */}
        <div className="absolute inset-0 pointer-events-none z-5">
          <EnergyFlowAnimation active={flowActive} flowPoints={flowPoints} color="#3DD56D" />
        </div>

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
                Comprehensive Energy Solutions
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Our <span className="text-[#3DD56D]">Services</span> & Solutions
              </h1>
              <p className="text-slate-300 text-lg mb-8">
                Grean World offers end-to-end services to bring clean energy solutions closer to communities and
                businesses.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-[#3DD56D] hover:bg-[#2bb757] text-white">
                    Explore Solutions
                    <ArrowDown className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
                <Link href="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="border-white text-white hover:bg-white/10">
                      Contact Us
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Solutions Overview Tabs */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                We provide comprehensive services to support the transition to renewable energy, from consultation to
                implementation and ongoing support.
              </p>
            </motion.div>

            <Tabs
              defaultValue="overview"
              className="w-full"
              onValueChange={(value) => {
                setActiveTab(value)
                // Reactivate flow animation when changing tabs
                setFlowActive(false)
                setTimeout(() => setFlowActive(true), 300)
              }}
            >
              <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2 bg-transparent mb-8">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-[#3DD56D] data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                {solutions.map((solution) => (
                  <TabsTrigger
                    key={solution.id}
                    value={solution.id}
                    className="data-[state=active]:bg-[#3DD56D] data-[state=active]:text-white"
                  >
                    {solution.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {solutions.map((solution, index) => (
                    <motion.div
                      key={solution.id}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={fadeIn}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50 hover:border-[#3DD56D]/30 transition-all relative"
                    >
                      <PulsingElementAnimation x={30} y={30} size={40} color="#3DD56D" intensity="low">
                        <div className="text-[#3DD56D]">{solution.icon}</div>
                      </PulsingElementAnimation>
                      <div className="pl-12">
                        <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                        <p className="text-slate-300 text-sm mb-4">{solution.description}</p>
                        <Link href={solution.link}>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="outline"
                              className="mt-2 border-[#3DD56D] text-[#3DD56D] hover:bg-[#3DD56D]/10"
                            >
                              Learn More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </motion.div>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              {solutions.map((solution) => (
                <TabsContent key={solution.id} value={solution.id}>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
                  >
                    <div className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50">
                      <h3 className="text-2xl font-semibold mb-4">{solution.title}</h3>
                      <p className="text-slate-300 mb-6">{solution.description}</p>
                      <h4 className="text-lg font-medium text-[#3DD56D] mb-3">Key Benefits</h4>
                      <ul className="space-y-2">
                        {solution.benefits.map((benefit, index) => (
                          <motion.li
                            key={index}
                            className="flex items-start"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            <ArrowRight className="h-5 w-5 text-[#3DD56D] mr-2 mt-0.5" />
                            <span className="text-slate-300">{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                      <div className="mt-6">
                        <Link href={solution.link}>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="bg-[#3DD56D] hover:bg-[#2bb757] text-white">
                              Explore {solution.title}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </motion.div>
                        </Link>
                      </div>
                    </div>

                    <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden bg-slate-800/30 backdrop-blur-sm border border-slate-700/50">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#3DD56D]/10 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          className="w-32 h-32 text-[#3DD56D]/20"
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        >
                          {solution.icon}
                        </motion.div>
                      </div>

                      {/* Animated energy pulses */}
                      {[...Array(5)].map((_, i) => (
                        <PulsingElementAnimation
                          key={i}
                          x={200 + Math.cos(i * Math.PI * 0.4) * 150}
                          y={200 + Math.sin(i * Math.PI * 0.4) * 150}
                          size={20 + i * 10}
                          color="#3DD56D"
                          intensity="medium"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#3DD56D]" />
                        </PulsingElementAnimation>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Integration Section */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Integrated Service Approach</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Our services work together seamlessly to provide comprehensive energy solutions tailored to your
                specific needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrationCases.map((integration, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50 hover:border-[#3DD56D]/30 transition-all"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 30px rgba(61, 213, 109, 0.1)",
                  }}
                >
                  <h3 className="text-xl font-semibold mb-3">{integration.title}</h3>
                  <p className="text-slate-300 text-sm mb-4">{integration.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {integration.solutions.map((sol, i) => (
                      <motion.span
                        key={i}
                        className="text-xs bg-[#3DD56D]/10 text-[#3DD56D] px-3 py-1 rounded-full border border-[#3DD56D]/20"
                        whileHover={{
                          backgroundColor: "rgba(61, 213, 109, 0.2)",
                          scale: 1.05,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        {sol}
                      </motion.span>
                    ))}
                  </div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Energy Future?</h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Contact us today to discuss how GREAN WORLD's services can help you achieve your energy goals with
                sustainable, efficient solutions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-[#3DD56D] hover:bg-[#2bb757] text-white px-8 py-6 text-lg">
                      Request a Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/about">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                      Learn About Us
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
