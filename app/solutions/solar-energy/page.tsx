"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, SunMedium, Check, Home, Building2, Factory, Zap, Shield, BarChart3, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "@/components/shared/navigation"

export default function SolarEnergyPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("residential")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const solarTypes = {
    residential: [
      {
        title: "Rooftop Solar Systems",
        description:
          "Custom designed solar panel systems for residential rooftops, optimized for your home's energy needs.",
        features: [
          "Customized system design",
          "High-efficiency panels",
          "Minimal maintenance",
          "25+ year lifespan",
          "Smart monitoring system",
        ],
      },
      {
        title: "Solar + Storage",
        description: "Integrated solar and battery storage solutions for energy independence and backup power.",
        features: [
          "Backup power during outages",
          "Time-of-use optimization",
          "Reduced grid dependence",
          "Scalable capacity",
          "Smart energy management",
        ],
      },
      {
        title: "Solar Water Heating",
        description: "Efficient solar thermal systems for domestic hot water and space heating needs.",
        features: [
          "Reduced water heating costs",
          "Works even in cloudy conditions",
          "Compatible with existing systems",
          "Low maintenance requirements",
          "Year-round operation",
        ],
      },
    ],
    commercial: [
      {
        title: "Commercial Rooftop",
        description: "Large-scale solar installations for commercial buildings, warehouses, and office complexes.",
        features: [
          "Reduced operational costs",
          "Minimal business disruption",
          "Custom designed for load profile",
          "Enhanced property value",
          "Corporate sustainability goals",
        ],
      },
      {
        title: "Carport Solar",
        description: "Dual-purpose solar installations that provide both clean energy and covered parking.",
        features: [
          "Utilizes unused parking space",
          "Weather protection for vehicles",
          "Visible sustainability commitment",
          "Optional EV charging integration",
          "Enhanced customer experience",
        ],
      },
      {
        title: "Building Integrated PV",
        description: "Seamlessly integrated solar solutions that become part of the building's architecture.",
        features: [
          "Aesthetic integration",
          "Replaces conventional materials",
          "Dual functionality",
          "Modern architectural statement",
          "Maximizes available space",
        ],
      },
    ],
    utility: [
      {
        title: "Ground-Mounted Solar Farms",
        description: "Large-scale solar installations designed for maximum energy production and grid support.",
        features: [
          "Megawatt-scale capacity",
          "Optimized for high yield",
          "Remote monitoring and control",
          "Grid stabilization capabilities",
          "Low maintenance requirements",
        ],
      },
      {
        title: "Floating Solar",
        description: "Innovative solar installations deployed on water bodies, maximizing land use efficiency.",
        features: [
          "No land use required",
          "Enhanced cooling efficiency",
          "Reduced water evaporation",
          "Minimal environmental impact",
          "Dual-use of water resources",
        ],
      },
      {
        title: "Solar + Storage Microgrids",
        description: "Integrated power systems that can operate independently or in conjunction with the main grid.",
        features: [
          "Energy resilience and security",
          "Peak demand management",
          "Frequency and voltage support",
          "Islanding capability",
          "Scalable and modular design",
        ],
      },
    ],
  }

  const technologies = [
    {
      icon: <SunMedium className="h-6 w-6" />,
      title: "Monocrystalline Panels",
      description:
        "High-efficiency silicon panels with excellent performance and longevity, ideal for limited space applications.",
    },
    {
      icon: <SunMedium className="h-6 w-6" />,
      title: "Polycrystalline Panels",
      description:
        "Cost-effective solar panels with good efficiency, suitable for larger installations with ample space.",
    },
    {
      icon: <SunMedium className="h-6 w-6" />,
      title: "Thin-Film Solar",
      description:
        "Flexible, lightweight solar technology that can be integrated into various surfaces and building materials.",
    },
    {
      icon: <SunMedium className="h-6 w-6" />,
      title: "Bifacial Panels",
      description:
        "Double-sided panels that capture reflected light from the ground, increasing energy yield by up to 30%.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Microinverters",
      description:
        "Panel-level power conversion that optimizes performance and provides detailed monitoring capabilities.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "String Inverters",
      description: "Cost-effective power conversion for multiple panels, ideal for installations with minimal shading.",
    },
  ]

  const processSteps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We assess your energy needs, site conditions, and goals to determine the best solar solution.",
    },
    {
      number: "02",
      title: "Custom Design",
      description: "Our engineers create a tailored solar system design optimized for your specific requirements.",
    },
    {
      number: "03",
      title: "Permitting & Approvals",
      description: "We handle all necessary permits, utility applications, and regulatory requirements.",
    },
    {
      number: "04",
      title: "Professional Installation",
      description: "Our certified technicians install your solar system with minimal disruption to your property.",
    },
    {
      number: "05",
      title: "System Commissioning",
      description: "We thoroughly test the system to ensure everything is functioning correctly and safely.",
    },
    {
      number: "06",
      title: "Monitoring & Support",
      description:
        "Ongoing performance monitoring and maintenance support to maximize your system's lifespan and output.",
    },
  ]

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0a1628] text-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0a1628] to-[#0a1628]/80 z-0"></div>
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 0 10 L 40 10 M 10 0 L 10 40" stroke="#3DD56D" strokeWidth="0.5" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-6 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20">
                Solar Energy Solutions
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Harness the Power of the <span className="text-[#3DD56D]">Sun</span>
              </h1>
              <p className="text-slate-300 text-lg mb-8">
                Our advanced solar energy solutions convert abundant sunlight into clean, renewable electricity for
                homes, businesses, and utilities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits of Solar Energy</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Solar power offers numerous advantages for the environment, your finances, and energy independence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Zap className="h-6 w-6" />,
                  title: "Reduced Energy Costs",
                  description: "Lower your electricity bills by generating your own clean power from the sun.",
                },
                {
                  icon: <Shield className="h-6 w-6" />,
                  title: "Energy Independence",
                  description: "Decrease reliance on the grid and protect against rising utility rates.",
                },
                {
                  icon: <Leaf className="h-6 w-6" />,
                  title: "Environmental Impact",
                  description: "Reduce your carbon footprint with zero-emission electricity generation.",
                },
                {
                  icon: <BarChart3 className="h-6 w-6" />,
                  title: "Increased Property Value",
                  description: "Solar installations can increase your property's market value and appeal.",
                },
                {
                  icon: <SunMedium className="h-6 w-6" />,
                  title: "Reliable Performance",
                  description: "Solar systems operate reliably for 25+ years with minimal maintenance.",
                },
                {
                  icon: <Building2 className="h-6 w-6" />,
                  title: "Available Incentives",
                  description: "Take advantage of tax credits, rebates, and incentives to reduce costs.",
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50 hover:border-[#3DD56D]/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-[#3DD56D]/10 flex items-center justify-center mb-4 text-[#3DD56D]">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-slate-300 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Solar Solutions Tabs */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Solar Solutions for Every Need</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                We offer customized solar energy systems for residential, commercial, and utility-scale applications.
              </p>
            </motion.div>

            <Tabs defaultValue="residential" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 gap-2 bg-transparent mb-8">
                <TabsTrigger
                  value="residential"
                  className="data-[state=active]:bg-[#3DD56D] data-[state=active]:text-white"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Residential
                </TabsTrigger>
                <TabsTrigger
                  value="commercial"
                  className="data-[state=active]:bg-[#3DD56D] data-[state=active]:text-white"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Commercial
                </TabsTrigger>
                <TabsTrigger
                  value="utility"
                  className="data-[state=active]:bg-[#3DD56D] data-[state=active]:text-white"
                >
                  <Factory className="h-4 w-4 mr-2" />
                  Utility-Scale
                </TabsTrigger>
              </TabsList>

              {Object.keys(solarTypes).map((type) => (
                <TabsContent key={type} value={type}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {solarTypes[type as keyof typeof solarTypes].map((solution, index) => (
                      <motion.div
                        key={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50 hover:border-[#3DD56D]/30 transition-all h-full flex flex-col"
                      >
                        <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                        <p className="text-slate-300 text-sm mb-4">{solution.description}</p>
                        <div className="mt-auto">
                          <h4 className="text-sm font-medium text-[#3DD56D] mb-2">Key Features</h4>
                          <ul className="space-y-2">
                            {solution.features.map((feature, i) => (
                              <li key={i} className="flex items-start">
                                <Check className="h-4 w-4 text-[#3DD56D] mr-2 mt-0.5" />
                                <span className="text-slate-300 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Technologies Section */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Solar Technologies</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                We utilize the latest solar technologies to ensure optimal performance, efficiency, and reliability.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50 hover:border-[#3DD56D]/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-[#3DD56D]/10 flex items-center justify-center mb-4 text-[#3DD56D]">
                    {tech.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{tech.title}</h3>
                  <p className="text-slate-300 text-sm">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Solar Installation Process</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                We follow a comprehensive approach to ensure your solar energy system is perfectly tailored to your
                needs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800/30 backdrop-blur-sm p-6 rounded-lg border border-slate-700/50 hover:border-[#3DD56D]/30 transition-all"
                >
                  <div className="text-4xl font-bold text-[#3DD56D]/30 mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-slate-300 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern-cta" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 0 10 L 40 10 M 10 0 L 10 40" stroke="#3DD56D" strokeWidth="0.5" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern-cta)" />
            </svg>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Harness Solar Energy?</h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Contact us today to schedule a free consultation and learn how solar energy can benefit your home or
                business.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact">
                  <Button className="bg-[#3DD56D] hover:bg-[#2bb757] text-white px-8 py-6 text-lg">
                    Get a Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/solutions">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                    Explore Other Solutions
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
