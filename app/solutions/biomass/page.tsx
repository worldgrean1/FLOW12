"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Leaf, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/shared/navigation"
import { GreenBackgroundAnimation } from "@/components/animations/background/GreenBackgroundAnimation"

export default function BiomassPage() {
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
              Biomass Energy Solutions
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Clean & Efficient <span className="text-[#3DD56D]">Biomass</span> for Rural Communities
            </h1>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Discover how our biomass solutions provide sustainable, affordable, and clean energy for cooking and heating, reducing deforestation and improving health outcomes.
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
              <h2 className="text-2xl font-bold mb-4 text-[#3DD56D]">Why Biomass?</h2>
              <ul className="list-disc list-inside text-slate-300 space-y-3">
                <li>Reduces reliance on traditional wood fuels and deforestation</li>
                <li>Improves indoor air quality and health</li>
                <li>Affordable and accessible for rural households</li>
                <li>Supports local economies and job creation</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex justify-center"
            >
              <Leaf className="h-32 w-32 text-[#3DD56D]" />
            </motion.div>
          </div>
        </section>
        <section className="relative z-10 py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Embrace Biomass Energy?</h2>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Contact our team to learn more about our biomass cookstoves, fuel briquettes, and community programs.
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