"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative pt-16" id="hero">
      {/* Animated background glow */}
      <div
        className={cn(
          "absolute w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px] opacity-0 transition-opacity duration-1000",
          mounted && "opacity-30",
        )}
      ></div>

      <div
        className={cn(
          "text-center space-y-6 max-w-4xl px-4 opacity-0 transform translate-y-8 transition-all duration-1000",
          mounted && "opacity-100 translate-y-0",
        )}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400 dark:from-teal-400 dark:to-teal-200 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)]">
            Obokeng Makwati
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light">
          Creative Powerhouse · Graphic Designer · Motion Graphics · Web Developer
        </p>

        <div className="text-lg text-gray-500 dark:text-gray-500 italic font-light max-w-2xl mx-auto">
          "You can only fight the way you practice"
          <span className="block text-sm text-gray-600 dark:text-gray-600 mt-1">— Miyamoto Musashi</span>
        </div>

        <div className="pt-4 flex flex-wrap gap-4 justify-center">
          <a
            href="https://www.linkedin.com/in/obokeng-makwati-963304151/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-medium px-6 py-3 rounded-full hover:shadow-[0_0_15px_rgba(45,212,191,0.5)] transition-all duration-300"
          >
            LinkedIn
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-gray-100/80 dark:bg-gray-800/50 text-teal-600 dark:text-teal-400 border border-teal-500/30 font-medium px-6 py-3 rounded-full hover:shadow-[0_0_15px_rgba(45,212,191,0.5)] transition-all duration-300"
          >
            Contact Me
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link href="#about" aria-label="Scroll to About section">
          <ArrowDown className="text-teal-600 dark:text-teal-400 h-8 w-8" />
        </Link>
      </div>
    </section>
  )
}
