"use client"

import { useRef } from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  GreenBackgroundAnimation,
  ParticleWaveAnimation,
  Card3DEffect,
  AnimatedBlobBackground,
  TypingTextAnimation,
} from "@/components/animations/shared-animations"
import { SunMedium, Wind, ArrowRight, Search, X, Filter, Flame, Home, Star, Battery, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navigation from "@/components/shared/navigation"
import { FloatingIconAnimation } from "@/components/animations/shared-animations"
import StaticSolarPanelNode from "@/components/static-nodes/static-solar-panel-node"
import StaticInverterNode from "@/components/static-nodes/static-inverter-node"
import StaticBatteryNode from "@/components/static-nodes/static-battery-node"
import StaticAccessoryNode from "@/components/static-nodes/static-accessory-node"
import { cn } from "@/lib/utils"

// Define component-specific prop types
type SolarPanelType = "mono" | "bifacial"
type BatteryType = "lithium" | "flow" | "standard"
type StaticAccessoryType = "mounting" | "cable" | "connector" | "protector"
type CustomAccessoryType = "stove" | "ethanol" | "fuel"
type AccessoryType = StaticAccessoryType | CustomAccessoryType

type Product = {
  id: string
  name: string
  category: string
  price: number
  oldPrice?: number
  rating: number
  component: string
  componentProps: {
    type: string
    scale: number
  }
  tags: string[]
  description: string
}

export default function ProductsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const productRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Product categories
  const categories = [
    { id: "all", name: "All Products" },
    { id: "solar", name: "Solar Systems" },
    { id: "mirt", name: "Mirt Stove" },
    { id: "ethanol", name: "Ethanol Products" },
    { id: "accessories", name: "Accessories" },
  ]

  // Product data
  const products = [
    {
      id: "pico-solar-5w",
      name: "Pico Solar 5Wp System",
      category: "solar",
      price: 29.99,
      rating: 4.7,
      component: "solar-panel",
      componentProps: { type: "mono", scale: 0.3 },
      tags: ["Lighting", "Radio", "Portable"],
      description: "Compact 5Wp solar system for basic lighting and radio charging needs.",
    },
    {
      id: "solar-100wp",
      name: "Home Solar 100Wp Kit",
      category: "solar",
      price: 199.99,
      oldPrice: 249.99,
      rating: 4.9,
      component: "solar-panel",
      componentProps: {
        type: "standard",
        scale: 1
      },
      tags: ["100Wp", "AC/DC", "Home System"],
      description: "Complete solar home system with battery backup and multiple outlets."
    },
    {
      id: "battery-5kwh",
      name: "PowerVault Lithium 5kWh",
      category: "battery",
      price: 2499.99,
      rating: 4.8,
      component: "battery",
      componentProps: {
        type: "lithium",
        scale: 1
      },
      tags: ["5kWh", "Lithium", "Smart BMS"],
      description: "High-capacity lithium battery system with advanced battery management."
    },
    {
      id: "mirt-basic",
      name: "Mirt Basic Injera Stove",
      category: "stove",
      price: 49.99,
      oldPrice: 59.99,
      rating: 4.6,
      component: "accessory",
      componentProps: {
        type: "stove",
        scale: 0.9
      },
      tags: ["Electric", "Injera", "Energy Saving"],
      description: "Energy-efficient electric stove designed for perfect Injera making."
    },
    {
      id: "ethanol-stove",
      name: "CleanCook Ethanol Stove",
      category: "stove",
      price: 79.99,
      rating: 4.8,
      component: "accessory",
      componentProps: {
        type: "ethanol",
        scale: 0.9
      },
      tags: ["Ethanol", "Clean Cooking", "Portable"],
      description: "Clean and safe ethanol cooking stove for modern households."
    }
  ]

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "solar":
        return <SunMedium className="h-5 w-5" />
      case "mirt":
        return <Flame className="h-5 w-5" />
      case "ethanol":
        return <Flame className="h-5 w-5" />
      case "accessories":
        return <Wind className="h-5 w-5" />
      default:
        return <SunMedium className="h-5 w-5" />
    }
  }

  // Update the renderProductComponent function to better center and scale components
  const renderProductComponent = (product: any, isHovered: boolean) => {
    // Center position for all components
    const position = { x: 0, y: 0 }

    switch (product.component) {
      case "solar-panel":
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="transform scale-75">
              <StaticSolarPanelNode
                position={position}
                scale={product.componentProps.scale || 0.5}
                panelOn={isHovered}
                sunIntensity={isHovered ? 80 : 50}
                {...product.componentProps}
              />
            </div>
          </div>
        )
      case "inverter":
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="transform scale-75">
              <StaticInverterNode position={position} scale={0.6} inverterOn={isHovered} {...product.componentProps} />
            </div>
          </div>
        )
      case "battery":
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="transform scale-75">
              <StaticBatteryNode
                position={position}
                scale={0.5}
                batteryOn={isHovered}
                isCharging={isHovered}
                type={product.componentProps.type}
              />
            </div>
          </div>
        )
      case "accessory":
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="transform scale-75">
              {product.componentProps.type === "stove" ? (
                <div className="relative">
                  <div
                    className={`w-32 h-32 rounded-full ${isHovered ? "bg-orange-600/30" : "bg-gray-700/30"} flex items-center justify-center`}
                  >
                    <Flame className={`h-16 w-16 ${isHovered ? "text-orange-500" : "text-gray-500"}`} />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-gray-800 rounded-lg"></div>
                </div>
              ) : product.componentProps.type === "ethanol" ? (
                <div className="relative">
                  <div
                    className={`w-32 h-20 rounded-lg ${isHovered ? "bg-blue-600/30" : "bg-gray-700/30"} flex items-center justify-center`}
                  >
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gray-600 rounded-t-lg"></div>
                    <Flame className={`h-12 w-12 ${isHovered ? "text-blue-400" : "text-gray-500"}`} />
                  </div>
                </div>
              ) : product.componentProps.type === "fuel" ? (
                <div className="relative">
                  <div
                    className={`w-20 h-32 rounded-lg ${isHovered ? "bg-green-600/30" : "bg-gray-700/30"} flex items-center justify-center`}
                  >
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gray-600 rounded-t-lg"></div>
                    <div className={`w-16 h-24 rounded-lg ${isHovered ? "bg-green-500/50" : "bg-gray-600/50"}`}></div>
                  </div>
                </div>
              ) : (
                <StaticAccessoryNode
                  position={position}
                  scale={0.6}
                  type={product.componentProps.type}
                  showDetails={isHovered}
                />
              )}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0a1628] text-white custom-scrollbar overflow-y-auto relative">
        {/* Animated Background */}
        <GreenBackgroundAnimation intensity="low" theme="products" />

        {/* Floating Icons */}
        <FloatingIconAnimation icon={<SunMedium />} delay={0} />
        <FloatingIconAnimation icon={<Flame />} delay={2} />
        <FloatingIconAnimation icon={<Home />} delay={4} />

        {/* Products Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 overflow-hidden mt-16">
          {/* Add animated blob background */}
          <AnimatedBlobBackground color="#4ade80" opacity={0.05} count={3} speed="slow" />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                  Clean Energy Solutions
                </motion.span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <TypingTextAnimation text="Explore Our Products" speed="medium" className="text-white" />
              </h1>

              <motion.p
                className="text-slate-300 text-lg mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Grean World supplies clean, efficient, and locally-appropriate energy solutions for communities across
                Ethiopia.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 px-4 sm:px-6 relative">
          <ParticleWaveAnimation color="#4ade80" density="low" speed="slow" />

          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Our most popular and innovative energy solutions, designed for Ethiopian communities.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              {/* Featured Product 1 */}
              <Card3DEffect depth="medium">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden h-full"
                >
                  <div className="h-64 bg-gradient-to-br from-green-900/50 to-slate-900/50 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <SunMedium className="h-32 w-32 text-[#3DD56D]/50" />
                    </motion.div>
                    <div className="absolute top-4 left-4 bg-[#3DD56D] text-white text-xs font-bold px-2 py-1 rounded">
                      BESTSELLER
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">Solar Home System 200W</h3>
                    <p className="text-[#3DD56D] font-medium mb-4">Complete Home Energy Solution</p>
                    <p className="text-slate-300 mb-4">
                      Our flagship solar home system with everything needed to power a small household, including
                      lighting, phone charging, and TV capability.
                    </p>

                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">
                          <div className="w-4 h-4 rounded-full bg-[#3DD56D]/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#3DD56D]"></div>
                          </div>
                        </div>
                        <span className="text-slate-300">200W solar panel with mounting hardware</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">
                          <div className="w-4 h-4 rounded-full bg-[#3DD56D]/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#3DD56D]"></div>
                          </div>
                        </div>
                        <span className="text-slate-300">4 LED lights and mobile charging ports</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">
                          <div className="w-4 h-4 rounded-full bg-[#3DD56D]/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-[#3DD56D]"></div>
                          </div>
                        </div>
                        <span className="text-slate-300">2-year warranty with local support</span>
                      </li>
                    </ul>

                    <div className="flex justify-between items-center">
                      <span className="text-white text-2xl font-bold">$299.99</span>
                      <Button className="bg-[#3DD56D] hover:bg-[#2bb757] text-white">View Details</Button>
                    </div>
                  </div>
                </motion.div>
              </Card3DEffect>

              {/* Featured Product 2 */}
              <Card3DEffect depth="medium">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden h-full"
                >
                  <div className="h-64 bg-gradient-to-br from-orange-900/50 to-slate-900/50 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        scale: [1, 1.05, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Flame className="h-32 w-32 text-orange-500/50" />
                    </motion.div>
                    <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                      POPULAR
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">Mirt Stove Deluxe</h3>
                    <p className="text-orange-400 font-medium mb-4">Efficient Injera Baking Solution</p>
                    <p className="text-slate-300 mb-4">
                      The enhanced Mirt stove made from durable sand and cement mortar, designed specifically for
                      Ethiopian households to bake injera efficiently.
                    </p>

                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">
                          <div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          </div>
                        </div>
                        <span className="text-slate-300">Bakes up to 30 injeras per day</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">
                          <div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          </div>
                        </div>
                        <span className="text-slate-300">Reduces fuel consumption by 50%</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">
                          <div className="w-4 h-4 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          </div>
                        </div>
                        <span className="text-slate-300">5+ year lifespan with proper maintenance</span>
                      </li>
                    </ul>

                    <div className="flex justify-between items-center">
                      <span className="text-white text-2xl font-bold">$79.99</span>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">View Details</Button>
                    </div>
                  </div>
                </motion.div>
              </Card3DEffect>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
            >
              <div className="relative w-full md:w-auto md:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400 w-full"
                />
                {searchTerm && (
                  <motion.button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-700/50 md:hidden"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </motion.div>

                <div className={`md:flex items-center gap-2 w-full ${showFilters ? "flex" : "hidden"}`}>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white w-full md:w-[180px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700 text-white">
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {categoryFilter !== "all" && (
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white p-2 h-auto"
                        onClick={() => setCategoryFilter("all")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Results summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-between items-center mb-6"
            >
              <p className="text-slate-300 text-sm">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              {categoryFilter !== "all" && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <Badge variant="outline" className="bg-[#3DD56D]/10 text-[#3DD56D] border-[#3DD56D]/20">
                    {categories.find((c) => c.id === categoryFilter)?.name}
                    <button className="ml-2" onClick={() => setCategoryFilter("all")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="py-16 px-4 sm:px-6 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">All Products</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Browse our complete collection of sustainable energy solutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <Card3DEffect depth="low">
                    <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700/50 overflow-hidden h-full hover:border-[#3DD56D]/50 transition-colors duration-300">
                      <div className="h-48 bg-gradient-to-br from-slate-800/50 to-slate-900/50 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {renderProductComponent(product, hoveredProduct === product.id)}
                        </div>
                        {product.tags.map((tag, tagIndex) => (
                          <div
                            key={tagIndex}
                            className={cn(
                              "absolute top-4 left-4 text-xs font-bold px-2 py-1 rounded",
                              tagIndex === 0 ? "bg-[#3DD56D] text-white" : "bg-slate-700 text-white ml-20"
                            )}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-white">{product.name}</h3>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="text-slate-300">{product.rating}</span>
                          </div>
                        </div>

                        <p className="text-[#3DD56D] font-medium mb-4">{product.category}</p>
                        <p className="text-slate-300 mb-4 line-clamp-2">{product.description}</p>

                        <div className="flex justify-between items-center">
                          <div className="flex items-baseline gap-2">
                            <span className="text-white text-2xl font-bold">${product.price}</span>
                            {product.oldPrice && (
                              <span className="text-slate-400 line-through">${product.oldPrice}</span>
                            )}
                          </div>
                          <Button className="bg-[#3DD56D] hover:bg-[#2bb757] text-white">View Details</Button>
                        </div>
                      </div>
                    </div>
                  </Card3DEffect>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Comparison Section */}
        <section className="py-16 px-4 sm:px-6 bg-slate-900/50 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <motion.div
              className="absolute rounded-full"
              style={{
                backgroundColor: "rgb(74, 222, 128)",
                opacity: 0.05,
                filter: "blur(50px)",
                width: "27.4223%",
                height: "23.524%",
                left: "32.024%",
                top: "62.8802%",
                borderRadius: "40% 60% 65.9722% 34.0278% / 54.0278% 47.9167% 46.111% 51.9445%",
              }}
              animate={{
                x: [-40, 0, -40],
                y: [-43, 0, -43],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                backgroundColor: "rgb(74, 222, 128)",
                opacity: 0.05,
                filter: "blur(50px)",
                width: "26.3157%",
                height: "29.3121%",
                left: "44.8283%",
                top: "48.7357%",
                borderRadius: "40% 60% 65.9722% 34.0278% / 54.0278% 47.9167% 46.111% 51.9445%",
              }}
              animate={{
                x: [11, -11, 11],
                y: [-38, 0, -38],
              }}
              transition={{
                duration: 18,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Product Comparison</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Compare our most popular solar home systems to find the perfect fit for your energy needs.
              </p>
            </motion.div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr>
                    <th className="p-4 text-left text-slate-300 border-b border-slate-700"></th>
                    <th className="p-4 text-center text-white border-b border-slate-700">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        Pico Solar
                      </motion.div>
                    </th>
                    <th className="p-4 text-center text-white border-b border-slate-700">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                      >
                        Solar Home System
                        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-[#3DD56D] text-white text-xs px-2 py-0.5 rounded-full">
                          POPULAR
                        </div>
                      </motion.div>
                    </th>
                    <th className="p-4 text-center text-white border-b border-slate-700">
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        Advanced System
                      </motion.div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 text-left text-slate-300 border-b border-slate-700/50">Power Output</td>
                    <td className="p-4 text-center text-white border-b border-slate-700/50">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        5Wp
                      </motion.div>
                    </td>
                    <td className="p-4 text-center text-white border-b border-slate-700/50">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        100Wp
                      </motion.div>
                    </td>
                    <td className="p-4 text-center text-white border-b border-slate-700/50">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        350Wp
                      </motion.div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 text-left text-slate-300 border-b border-slate-700/50">Capabilities</td>
                    <td className="p-4 text-center text-white border-b border-slate-700/50">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        Lighting, Radio
                      </motion.div>
                    </td>
                    <td className="p-4 text-center text-white border-b border-slate-700/50">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        Lighting, TV, Charging
                      </motion.div>
                    </td>
                    <td className="p-4 text-center text-white border-b border-slate-700/50">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        Full Home Power
                      </motion.div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 text-left text-slate-300 border-b border-slate-700/50">Warranty</td>
                    <td className="p-4 text-center text-white border-b border-slate-700/50">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        1 year
                      </motion.div>
                    </td>
                    <td className="p-4 text-center text-white border-b border-slate-700/50">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        2 years
                      </motion.div>
                    </td>
                    <td className="p-4 text-center text-white border-b border-slate-700/50">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        3 years
                      </motion.div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 text-left text-slate-300 border-b border-slate-700/50">Price</td>
                    <td className="p-4 text-center text-white border-b border-slate-700/50">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        $29.99
                      </motion.div>
                    </td>
                    <td className="p-4 text-center text-white border-b border-slate-700/50">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        $199.99
                      </motion.div>
                    </td>
                    <td className="p-4 text-center text-white border-b border-slate-700/50">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        $499.99
                      </motion.div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 text-left text-slate-300 border-b border-slate-700/50"></td>
                    <td className="p-4 text-center text-white border-b border-slate-700/50">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <Button className="bg-green-500 hover:bg-green-700 text-white">View Details</Button>
                      </motion.div>
                    </td>
                    <td className="p-4 text-center text-white border-b border-slate-700/50">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <Button className="bg-green-500 hover:bg-green-700 text-white">View Details</Button>
                      </motion.div>
                    </td>
                    <td className="p-4 text-center text-white border-b border-slate-700/50">
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <Button className="bg-green-500 hover:bg-green-700 text-white">View Details</Button>
                      </motion.div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Need Help Section */}
        <section className="py-16 px-4 sm:px-6 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Need Help Choosing the Right Products?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Our energy experts can help you find the perfect clean energy solution for your home, business, or community.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    className="bg-[#3DD56D] hover:bg-[#2bb757] text-white px-8 py-6 text-lg"
                  >
                    Get Expert Advice
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                  >
                    Explore Solutions
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="py-8 px-4 sm:px-6 border-t border-slate-800">
          <div className="max-w-7xl mx-auto text-center text-slate-400">
          </div>
        </footer>
      </div>
    </>
  )
}

// Product Card Component
function ProductCard({ product, onHover, isHovered }: { 
  product: any, 
  onHover: (id: string | null) => void,
  isHovered: boolean 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-slate-800/50 rounded-lg overflow-hidden backdrop-blur-sm border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300"
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="aspect-video relative overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${product.image})` }}
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-emerald-400">{product.name}</h3>
          <span className="text-emerald-400 font-semibold">${product.price}</span>
        </div>
        <p className="text-gray-300 mb-4">{product.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="bg-emerald-500/20 text-emerald-300">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-gray-300">{product.rating}</span>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-500">
            Learn More
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
