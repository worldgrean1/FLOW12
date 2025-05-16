"use client"

import type { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"

interface MainLayoutProps {
  children: ReactNode
  scrolled: boolean
}

export default function MainLayout({ children, scrolled }: MainLayoutProps) {
  return (
    <>
      <Header scrolled={scrolled} />
      {children}
      <Footer />

      {/* Global styles */}
      <style jsx global>{`
        html, body {
          height: 100%;
          overflow: hidden;
          scroll-behavior: smooth;
        }
        
        #__next {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        /* Remove scrollbar styles */
        .custom-scrollbar {
          overflow: hidden !important;
        }
        
        /* Prevent horizontal scrollbar */
        .overflow-x-hidden {
          overflow-x: hidden !important;
        }
      `}</style>
    </>
  )
}
