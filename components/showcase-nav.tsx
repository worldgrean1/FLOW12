"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

const sections = [
  { id: "green-innovation", label: "Green Innovation" },
  { id: "green-energy", label: "Green Energy" },
  { id: "modern-innovation", label: "Modern Innovation" },
  { id: "math-innovation", label: "Math Innovation" },
  { id: "tech-innovation", label: "Tech Innovation" },
]

export default function ScrollNav() {
  const [activeSection, setActiveSection] = useState("")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const [activeShowcase, setActiveShowcase] = useState("")

  // Only show section navigation on the showcase page
  const isShowcasePage = pathname === "/showcase"

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleScroll = () => {
      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 300)

      // Determine active section
      if (isShowcasePage) {
        const scrollPosition = window.scrollY + window.innerHeight / 3

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = document.getElementById(sections[i].id)
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(sections[i].id)
            setActiveShowcase(sections[i].id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [isShowcasePage])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      })
    }
  }

  // If not on showcase page, show a simplified navigation
  if (!isShowcasePage) {
    return (
      <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/grean-logo-icon.png"
                    alt="GREAN WORLD Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <span className="text-white font-medium">GREAN WORLD</span>
              </Link>
            </div>
            <nav className="flex items-center space-x-4 sm:space-x-6">
              <Link
                href="/home"
                className={`text-sm font-medium transition-colors hover:text-green-400 ${
                  activeShowcase === "green-innovation" ? "text-green-400" : "text-gray-300"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-sm font-medium transition-colors hover:text-green-400 ${
                  activeShowcase === "green-energy" ? "text-green-400" : "text-gray-300"
                }`}
              >
                About
              </Link>
              <Link
                href="/services"
                className={`text-sm font-medium transition-colors hover:text-green-400 ${
                  activeShowcase === "math" ? "text-green-400" : "text-gray-300"
                }`}
              >
                Services
              </Link>
              <Link
                href="/products"
                className={`text-sm font-medium transition-colors hover:text-green-400 ${
                  activeShowcase === "modern" ? "text-green-400" : "text-gray-300"
                }`}
              >
                Products
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-medium transition-colors hover:text-green-400 ${
                  activeShowcase === "tech" ? "text-green-400" : "text-gray-300"
                }`}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      {/* Mobile Navigation */}
      {isMobile && (
        <div className="fixed top-4 left-0 right-0 z-50 px-4">
          <select
            className="w-full p-2 bg-slate-800/90 text-white rounded-lg border border-slate-700 backdrop-blur-sm"
            value={activeSection}
            onChange={(e) => scrollToSection(e.target.value)}
          >
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
          <div className="flex flex-col items-center space-y-6">
            {sections.map((section) => (
              <div
                key={section.id}
                className="group relative flex items-center"
                onClick={() => scrollToSection(section.id)}
              >
                <div
                  className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
                    activeSection === section.id ? "bg-green-500 scale-125" : "bg-slate-400 hover:bg-green-400"
                  }`}
                />
                <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  <span className="bg-slate-800/80 text-white px-3 py-1 rounded-md text-sm">{section.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </button>
    </>
  )
}
