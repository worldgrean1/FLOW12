import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "../styles/layout.css"
import dynamic from 'next/dynamic'

const MainLayoutWrapper = dynamic(() => import('@/components/layout/MainLayoutWrapper'), {
  ssr: true
})

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GREAN WORLD Energy Technology",
  description: "Sustainable energy solutions for a greener future",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayoutWrapper>
          {children}
        </MainLayoutWrapper>
      </body>
    </html>
  )
}
