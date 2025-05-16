"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Battery, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/shared/navigation"
import { GreenBackgroundAnimation } from "@/components/animations/background/GreenBackgroundAnimation"

export default function EnergyStoragePage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0a1628] text-white custom-scrollbar overflow-y-auto relative pt-20">
        <div className="-z-10">
          <GreenBackgroundAnimation intensity="medium" theme="energy" />
        </div>
        <section className="relative z-10 py-20 px-4 sm:px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-6 bg-[#3DD56D]/20 text-[#3DD56D] border border-[#3DD56D]/20"
            >
              Energy Storage Solutions
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Reliable <span className="text-[#3DD56D]">Energy Storage</span> for Every Need
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Explore our advanced battery and storage solutions that ensure uninterrupted power for homes, businesses, and communities.
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
              <h2 className="text-2xl font-bold mb-4 text-[#3DD56D]">Why Energy Storage?</h2>
              <ul className="list-disc list-inside text-slate-300 space-y-3">
                <li>Provides backup power during outages</li>
                <li>Enables use of renewable energy day and night</li>
                <li>Improves energy reliability and independence</li>
                <li>Reduces reliance on diesel generators</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <Battery className="h-32 w-32 text-[#3DD56D]" />
            </motion.div>
          </div>
        </section>
        <section className="relative z-10 py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for Reliable Energy?</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Contact us to learn more about our battery systems, installation services, and how we can help you achieve energy security.
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