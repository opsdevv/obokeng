"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowDown, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section
      className="min-h-screen flex flex-col justify-center items-center relative pt-20 pb-24"
      id="hero"
    >
      {/* Hero-only background: stronger focal glow */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-1500",
          mounted && "opacity-100",
        )}
      >
        <div className="absolute w-[min(90vw,600px)] h-[min(80vw,500px)] bg-brand/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-brand-accent/15 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-brand/10 rounded-full blur-[90px]" />
      </div>

      <div
        className={cn(
          "relative z-10 text-center max-w-4xl px-4 space-y-8 opacity-0 transform translate-y-6 transition-all duration-700 delay-100",
          mounted && "opacity-100 translate-y-0",
        )}
      >
        {/* Small intro line */}
        <p
          className={cn(
            "text-sm uppercase tracking-[0.2em] text-brand font-medium transition-opacity duration-700",
            mounted ? "opacity-100" : "opacity-0",
          )}
          style={{ transitionDelay: "200ms" }}
        >
          Creative Portfolio
        </p>

        {/* Name: big and confident */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[1.05]">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand to-brand-accent">
            Obokeng
          </span>
          <br />
          <span className="text-[#11181c] dark:text-[#ecedee]">Makwati</span>
        </h1>

        {/* Tagline */}
        <p
          className={cn(
            "text-lg sm:text-xl md:text-2xl text-[#11181c] dark:text-[#ecedee] font-medium max-w-2xl mx-auto transition-all duration-700",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: "350ms" }}
        >
          Clarity is the ultimate advantage
        </p>

        {/* Quote: proper blockquote treatment */}
        <blockquote
          className={cn(
            "relative max-w-xl mx-auto pt-6 transition-all duration-700",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: "550ms" }}
        >
          <Quote className="absolute -top-1 left-1/2 -translate-x-1/2 h-8 w-8 text-brand/30" aria-hidden />
          <p className="text-[#687076] dark:text-[#9ba1a6] text-base sm:text-lg italic">
            &ldquo;You can only fight the way you practice.&rdquo;
          </p>
          <cite className="not-italic text-sm text-[#687076] dark:text-[#9ba1a6] mt-2 block">
            — Miyamoto Musashi
          </cite>
        </blockquote>

        {/* CTAs */}
        <div
          className={cn(
            "flex flex-wrap gap-4 justify-center pt-4 transition-all duration-700",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
          style={{ transitionDelay: "650ms" }}
        >
          <a
            href="https://www.linkedin.com/in/obokeng-makwati-963304151/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand text-white font-medium text-sm px-6 py-3 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-brand/25"
          >
            LinkedIn
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#11181c] dark:bg-[#ecedee] text-[#f8f9fa] dark:text-[#11181c] font-medium text-sm px-6 py-3 rounded-lg hover:opacity-90 transition-opacity border border-[#2b2f31] dark:border-[#d0d3d6]"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-700",
          mounted ? "opacity-100" : "opacity-0",
        )}
        style={{ transitionDelay: "900ms" }}
      >
        <Link
          href="#about"
          aria-label="Scroll to About section"
          className="inline-flex flex-col items-center gap-1 text-[#687076] dark:text-[#9ba1a6] hover:text-brand transition-colors"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </Link>
      </div>
    </section>
  )
}
