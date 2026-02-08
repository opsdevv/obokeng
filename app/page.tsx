"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/ui/navbar"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Skills from "@/components/sections/skills"
import OtherSkills from "@/components/sections/achievements"
import Contact from "@/components/sections/contact"

export default function Home() {
  const [particlePositions, setParticlePositions] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([])

  useEffect(() => {
    // Generate particle positions only on client side to avoid hydration mismatch
    const positions = Array(20).fill(null).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 4}s`
    }))
    setParticlePositions(positions)
  }, [])

  return (
    <main className="min-h-screen bg-[#f8f9fa] dark:bg-[#151718] text-[#11181c] dark:text-[#ecedee] overflow-hidden transition-colors duration-300">
      {/* Supabase-style background: subtle gradient + brand glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 dark:bg-gradient-to-b from-[#151718] via-[#1a1d1e] to-[#151718]" />
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-brand-accent/8 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px] dark:opacity-50 opacity-30" />
      </div>
      
      <Navbar />
      <div className="container mx-auto px-4 relative z-10">
        <Hero />
        <About />
        <Skills />
        <OtherSkills />
        <Contact />
      </div>
    </main>
  )
}
