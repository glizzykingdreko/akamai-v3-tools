import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { TakionAd } from "@/components/takion-ad"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
}

export const metadata: Metadata = {
  title: "Akamai v3 Tools - Sensor Data Encryption, Decryption & Hash Extraction",
  description: "Free online tools for working with Akamai v3 sensor data - encrypt, decrypt and extract cookie hashes. Perfect for developers working with Akamai bot detection.",
  keywords: "akamai, v3, sensor data, encryption, decryption, bot detection, bm_sz, cookie hash, javascript, web security",
  generator: 'v0.dev',
  openGraph: {
    title: "Akamai v3 Tools - Sensor Data Encryption, Decryption & Hash Extraction",
    description: "Free online tools for working with Akamai v3 sensor data - encrypt, decrypt and extract cookie hashes.",
    type: "website",
    url: "https://akamai-v3-tools.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akamai v3 Tools",
    description: "Free online tools for working with Akamai v3 sensor data",
  },
  robots: "index, follow",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <TakionAd />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'