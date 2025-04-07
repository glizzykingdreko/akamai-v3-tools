"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ExternalLink, X } from "lucide-react"

export function TakionAd() {
  const [isMinimized, setIsMinimized] = useState(false)

  // Load minimized state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("takionAdMinimized")
    if (savedState) {
      setIsMinimized(savedState === "true")
    }
  }, [])

  // Save minimized state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("takionAdMinimized", isMinimized.toString())
  }, [isMinimized])

  const handleMinimize = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsMinimized(true)
  }

  const handleExpand = () => {
    setIsMinimized(false)
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div
          className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl"
          onClick={handleExpand}
        >
          <Image
            src="https://takionapi.tech/assets/takion_logo.svg"
            alt="TakionAPI"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://takionapi.tech/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl group"
      >
        <div className="relative w-6 h-6">
          <Image
            src="https://takionapi.tech/assets/takion_logo.svg"
            alt="TakionAPI"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        <span className="font-medium">Need help with antibots?</span>
        <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        <button onClick={handleMinimize} className="ml-1 p-1 rounded-full hover:bg-white/20" aria-label="Minimize">
          <X size={14} />
        </button>
      </a>
    </div>
  )
}

