'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface MainLayoutWrapperProps {
  children: React.ReactNode
  className?: string
}

const MainLayoutWrapper = ({ children, className = '' }: MainLayoutWrapperProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`min-h-screen bg-slate-900 ${className}`}
    >
      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="eco-glass fixed inset-0 z-0" />
        <div className="relative z-10 flex-1">
          {children}
        </div>
      </div>
    </motion.div>
  )
}

export default MainLayoutWrapper 