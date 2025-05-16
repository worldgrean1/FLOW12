"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/shared/navigation"
import { GreenBackgroundAnimation } from "@/components/animations/background/GreenBackgroundAnimation"

export default function TrainingPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0a1628] text-white custom-scrollbar overflow-y-auto relative pt-20">
        <div className="-z-10">
          <GreenBackgroundAnimation intensity="medium" theme="about" />
        </div>
        <section className="relative z-10 py-20 px-4 sm:px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-6 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20"
            >
              Training & Capacity Building
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Empowering <span className="text-[#3DD56D]">Communities</span> through Training
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Learn about our training programs for entrepreneurs, technicians, and community leaders to ensure the success and sustainability of clean energy projects.
            </p>
          </div>
        </section>
        <section className="relative z-10 py-16 px-4 sm:px-6 bg-slate-900/50">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-left"
            >
              <h2 className="text-2xl font-bold mb-4 text-[#3DD56D]">Our Training Focus</h2>
              <ul className="list-disc list-inside text-slate-300 space-y-3">
                <li>Entrepreneurship and business skills for local energy leaders</li>
                <li>Technical training for installation and maintenance</li>
                <li>Community awareness and engagement programs</li>
                <li>Ongoing support and mentorship</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <Users className="h-32 w-32 text-[#3DD56D]" />
            </motion.div>
          </div>
        </section>
        <section className="relative z-10 py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Interested in Our Training Programs?</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Contact us to learn more about upcoming workshops, custom training, and partnership opportunities.
            </p>
            <Link href="/contact">
              <Button className="bg-[#3DD56D] hover:bg-[#2bb757] text-white px-6 py-5">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
} 