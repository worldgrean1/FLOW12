"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X, ArrowRight, SunMedium, Leaf, Zap, Battery, Wind } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)

    // Set active nav item based on current path
    const path = pathname.split("/")[1]
    if (path) {
      setActiveNavItem(`/${path}`)
    } else {
      setActiveNavItem("/")
    }
  }, [pathname])

  // Navigation items with enhanced animations
  const navItems = [
    { name: "Home", icon: <SunMedium size={12} className="text-green-400" />, href: "/home" },
    { name: "About", icon: <Leaf size={12} className="text-green-400" />, href: "/about" },
    {
      name: "Solutions",
      icon: <Zap size={12} className="text-green-400" />,
      href: "/solutions",
      submenu: [
        { name: "Solar Energy", href: "/solutions/solar-energy" },
        { name: "Energy Storage", href: "/solutions/energy-storage" },
        { name: "Biomass", href: "/solutions/biomass" },
        { name: "Training", href: "/solutions/training" },
      ],
    },
    { name: "Products", icon: <Battery size={12} className="text-green-400" />, href: "/products" },
    { name: "Contact", icon: <Wind size={12} className="text-green-400" />, href: "/contact" },
  ]

  return (
    <motion.header
      className={`py-4 px-4 sm:px-6 border-b transition-all duration-500 fixed top-0 left-0 right-0 z-50 ${
        scrolled ? "bg-[#0a1628]/90 backdrop-blur-md border-slate-700/30" : "border-slate-700/20"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <motion.div className="flex items-center gap-3">
              <motion.div className="logo-container relative" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <div className="logo-glow-effect"></div>
                <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                  <Image
                    src="/images/grean-logo-icon.png"
                    alt="GREAN WORLD Logo"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              </motion.div>
              <div>
                <motion.div className="flex flex-col" transition={{ duration: 0.5 }}>
                  <div className="flex items-center">
                    <span className="text-[#3DD56D] text-xl sm:text-2xl font-bold tracking-wide">GREAN</span>
                    <span className="text-xl sm:text-2xl font-bold text-gray-200 tracking-wide ml-1">WORLD</span>
                  </div>
                  <p className="text-xs text-gray-400 tracking-wide">ENERGY TECHNOLOGY PLC</p>
                </motion.div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Enhanced Navigation with smooth animations */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block"
        >
          <ul className="flex gap-6 lg:gap-8">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="relative group"
              >
                <Link href={item.href}>
                  <motion.div
                    className={`cursor-pointer nav-item rounded-lg px-4 py-2 shadow-md bg-slate-900/80 border border-slate-700/40 transition-all duration-300 ${activeNavItem === item.href ? "bg-green-500/20 border-green-400 text-green-400" : "hover:bg-slate-800/80 hover:border-green-400"}`}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <motion.div
                      className="flex items-center gap-1.5 relative"
                      initial={false}
                      animate={
                        activeNavItem === item.href
                          ? {
                              color: "#4ade80",
                              textShadow: "0 0 8px rgba(74, 222, 128, 0.5)",
                            }
                          : { color: "#f8fafc", textShadow: "none" }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.name}</span>
                      {item.submenu && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-1"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      )}
                      {/* Animated underline indicator */}
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-green-500"
                        initial={{ width: 0 }}
                        animate={{
                          width: activeNavItem === item.href ? "100%" : 0,
                          opacity: activeNavItem === item.href ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>
                </Link>
                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-2 bg-slate-800/95 rounded-md shadow-xl border border-slate-700/50">
                      {item.submenu.map((subItem) => (
                        <Link key={subItem.name} href={subItem.href}>
                          <div className="block px-4 py-2 text-sm text-slate-300 hover:bg-green-500/10 hover:text-[#3DD56D] rounded-md transition-all duration-200">
                            {subItem.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        <motion.div
          className="hidden md:flex items-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/contact">
            <Button className="bg-[#3DD56D] hover:bg-[#2bb757] text-white">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Mobile menu button */}
        <motion.button
          className="md:hidden text-gray-400 hover:text-green-400"
          whileTap={{ scale: 0.95 }}
          whileHover={{
            color: "#4ade80",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-[#0a1628]/95 backdrop-blur-md"
        >
          <div className="px-4 pt-2 pb-6 space-y-4">
            {navItems.map((item) => (
              <div key={item.name} className="py-3">
                <Link
                  href={item.href}
                  className={`flex items-center justify-between text-base font-medium ${
                    activeNavItem === item.href ? "text-[#3DD56D]" : "text-white"
                  }`}
                  onClick={(e) => {
                    if (item.submenu) {
                      e.preventDefault()
                      setActiveSubmenu(activeSubmenu === item.name ? null : item.name)
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                  {item.submenu && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform ${activeSubmenu === item.name ? "rotate-180" : ""}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </Link>

                {/* Mobile Submenu */}
                {item.submenu && activeSubmenu === item.name && (
                  <div className="mt-2 ml-6 space-y-2 border-l-2 border-slate-700 pl-4">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block py-2 text-sm text-slate-300 hover:text-[#3DD56D]"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4">
              <Link href="/contact">
                <Button className="w-full bg-[#3DD56D] hover:bg-[#2bb757] text-white">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      <style jsx global>{`
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
          background-color: #4ade80;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        
        .nav-item:hover::after {
          transform: translateX(0);
        }
        
        .nav-item.active::after {
          transform: translateX(0);
        }

        .logo-container {
          position: relative;
          overflow: visible;
        }

        .logo-glow-effect {
          position: absolute;
          inset: -5px;
          background: radial-gradient(circle, rgba(74, 222, 128, 0.4) 0%, rgba(74, 222, 128, 0) 70%);
          opacity: 0;
          transition: opacity 0.5s ease;
          border-radius: 50%;
          z-index: -1;
        }

        .logo-container:hover .logo-glow-effect {
          opacity: 1;
        }
      `}</style>
    </motion.header>
  )
}
