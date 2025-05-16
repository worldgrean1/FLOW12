"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ArrowRight, Zap, SunMedium, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Navigation from "@/components/shared/navigation"
import {
  GreenBackgroundAnimation,
  ParticleWaveAnimation,
  AnimatedBlobBackground,
  Card3DEffect,
  TypingTextAnimation,
  FloatingIconAnimation,
} from "@/components/animations/shared-animations"
import gsap from "gsap"

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    interest: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const formControls = useAnimation()
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    // Initialize map animation
    if (mapRef.current) {
      const mapAnimation = () => {
        const pins = mapRef.current?.querySelectorAll(".map-pin")
        const pulses = mapRef.current?.querySelectorAll(".map-pulse")

        if (pins && pulses) {
          pins.forEach((pin, index) => {
            gsap.to(pin, {
              y: -5,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: index * 0.2,
            })

            gsap.to(pulses[index], {
              scale: 1.5,
              opacity: 0,
              duration: 2,
              repeat: -1,
              ease: "sine.out",
              delay: index * 0.2,
            })
          })
        }
      }

      mapAnimation()
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, interest: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("submitting")

    // Animate form submission
    await formControls.start({
      scale: [1, 0.98, 1],
      transition: { duration: 0.3 },
    })

    // Simulate API call
    setTimeout(() => {
      // 90% chance of success for demo purposes
      if (Math.random() > 0.1) {
        setFormStatus("success")
        setFormState({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          interest: "",
        })
      } else {
        setFormStatus("error")
      }

      // Reset form status after 3 seconds
      setTimeout(() => {
        setFormStatus("idle")
      }, 3000)
    }, 1500)
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      <Navigation />
      <style jsx global>{`
        html, body {
          overflow: hidden !important;
          height: 100%;
        }
        #__next {
          height: 100%;
        }
      `}</style>
      <div className="min-h-screen bg-[#0a1628] text-white relative">
        {/* Animated Background */}
        <GreenBackgroundAnimation intensity="low" theme="contact" />

        {/* Floating Icons */}
        <FloatingIconAnimation icon={<Mail />} delay={0} />
        <FloatingIconAnimation icon={<SunMedium />} delay={2} />
        <FloatingIconAnimation icon={<Leaf />} delay={4} />
        <FloatingIconAnimation icon={<Zap />} delay={6} />

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
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
                  Get in Touch
                </motion.span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                <TypingTextAnimation text="We're Here to Help" speed="medium" className="text-white" />
              </h1>

              <motion.p
                className="text-slate-300 text-lg mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                Have questions, feedback, or want to work with us?
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-16 px-4 sm:px-6 relative">
          <ParticleWaveAnimation color="#4ade80" density="low" speed="slow" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <Card3DEffect depth="medium">
                  <motion.div
                    className="bg-slate-800/30 backdrop-blur-sm p-8 rounded-lg border border-slate-700/50"
                    animate={formControls}
                  >
                    <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

                    {formStatus === "success" ? (
                      <motion.div
                        className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                        <p className="text-slate-300">Thank you for reaching out. We'll get back to you shortly.</p>
                      </motion.div>
                    ) : formStatus === "error" ? (
                      <motion.div
                        className="bg-red-500/20 border border-red-500/30 rounded-lg p-6 text-center"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Something went wrong</h3>
                        <p className="text-slate-300">Please try again or contact us directly.</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6" id="contact-form">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={formState.name}
                              onChange={handleInputChange}
                              placeholder="John Doe"
                              required
                              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formState.email}
                              onChange={handleInputChange}
                              placeholder="john@example.com"
                              required
                              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number (Optional)</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={formState.phone}
                              onChange={handleInputChange}
                              placeholder="+1 (555) 123-4567"
                              className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="interest">I'm interested in</Label>
                            <Select value={formState.interest} onValueChange={handleSelectChange}>
                              <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                                <SelectValue placeholder="Select an option" />
                              </SelectTrigger>
                              <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                <SelectItem value="solar">Solar Energy</SelectItem>
                                <SelectItem value="mirt">Mirt Stove</SelectItem>
                                <SelectItem value="ethanol">Ethanol Products</SelectItem>
                                <SelectItem value="training">Training Programs</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formState.subject}
                            onChange={handleInputChange}
                            placeholder="How can we help you?"
                            required
                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleInputChange}
                            placeholder="Tell us about your project or inquiry..."
                            required
                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[120px]"
                          />
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button
                            type="submit"
                            className="w-full bg-[#3DD56D] hover:bg-[#2bb757] text-white relative overflow-hidden group"
                            disabled={formStatus === "submitting"}
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              {formStatus === "submitting" ? (
                                <div className="flex items-center">
                                  <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    ></circle>
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                  </svg>
                                  Sending...
                                </div>
                              ) : (
                                <>
                                  Send Message
                                  <Send className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </span>
                            <motion.span
                              className="absolute inset-0 bg-[#2bb757]"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          </Button>
                        </motion.div>
                      </form>
                    )}
                  </motion.div>
                </Card3DEffect>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <p className="text-slate-300 mb-8">
                    Our support team is available to assist with any questions regarding our clean energy products,
                    installations, or entrepreneurship programs.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card3DEffect depth="low">
                    <motion.div
                      className="flex items-start p-4 bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700/50"
                      whileHover={{ borderColor: "rgba(61, 213, 109, 0.5)" }}
                    >
                      <div className="mr-4 mt-1">
                        <div className="w-10 h-10 rounded-full bg-[#3DD56D]/10 flex items-center justify-center text-[#3DD56D]">
                          <Mail className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                        <p className="text-slate-300 text-sm mb-1">For all inquiries:</p>
                        <a href="mailto:info@greanworld.com" className="text-[#3DD56D] hover:underline">
                          info@greanworld.com
                        </a>
                      </div>
                    </motion.div>
                  </Card3DEffect>

                  <Card3DEffect depth="low">
                    <motion.div
                      className="flex items-start p-4 bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700/50"
                      whileHover={{ borderColor: "rgba(61, 213, 109, 0.5)" }}
                    >
                      <div className="mr-4 mt-1">
                        <div className="w-10 h-10 rounded-full bg-[#3DD56D]/10 flex items-center justify-center text-[#3DD56D]">
                          <Phone className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                        <p className="text-slate-300 text-sm mb-1">Main Office:</p>
                        <a href="tel:+251913330000" className="text-[#3DD56D] hover:underline">
                          +251 913 330000
                        </a>
                      </div>
                    </motion.div>
                  </Card3DEffect>

                  <Card3DEffect depth="low">
                    <motion.div
                      className="flex items-start p-4 bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700/50"
                      whileHover={{ borderColor: "rgba(61, 213, 109, 0.5)" }}
                    >
                      <div className="mr-4 mt-1">
                        <div className="w-10 h-10 rounded-full bg-[#3DD56D]/10 flex items-center justify-center text-[#3DD56D]">
                          <MapPin className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Visit Us</h3>
                        <p className="text-slate-300 text-sm mb-1">Office Address:</p>
                        <p className="text-white">
                          Kirkos Sub City Wereda 02, Deberezeit road,
                          <br />
                          Sierra Leone street, Tegene Building (Global Hotel),
                          <br />
                          6th floor
                          <br />
                          Addis Ababa, Ethiopia
                        </p>
                        <a
                          href="https://www.google.com/maps/place/Global+Hotel/@8.993469,38.759743,13z/data=!4m9!3m8!1s0x164b84498584ab35:0xddeb9038db0622ce!5m2!4m1!1i2!8m2!3d8.9934693!4d38.7597428!16s%2Fg%2F1pycd36tr?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center text-[#3DD56D] hover:underline"
                        >
                          Get Directions
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </a>
                      </div>
                    </motion.div>
                  </Card3DEffect>
                </div>
              </motion.div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Start Your Sustainable Energy Journey?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Contact us today to schedule a consultation with one of our energy experts and take the first step
                toward a greener future.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className="bg-[#3DD56D] hover:bg-[#2bb757] text-white px-8 py-6 text-lg"
                    onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Send Us a Message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                    onClick={() => (window.location.href = "/products")}
                  >
                    Explore Products
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
