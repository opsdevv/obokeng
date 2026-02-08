"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Palette, Video, Code, Award } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

export default function About() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const quickFacts = [
    {
      icon: <Palette className="h-5 w-5 text-brand" />,
      title: "Graphic Design",
      description: "10+ years crafting bold visuals and eye-catching brands",
    },
    {
      icon: <Video className="h-5 w-5 text-brand" />,
      title: "Motion Graphics",
      description: "Dynamic video content and seamless animations",
    },
    {
      icon: <Code className="h-5 w-5 text-brand" />,
      title: "Web Development",
      description: "Pixel-perfect digital experiences with modern tech",
    },
    {
      icon: <Award className="h-5 w-5 text-brand" />,
      title: "Data Engineering",
      description: "I transform raw data into reliable systems that drive decisions.",
    },
  ]

  return (
    <section id="about" className="py-20 relative scroll-mt-16">
      <SectionHeading title="About Me" subtitle="Get to know OBK better" />

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div
          className={cn(
            "relative opacity-0 transform -translate-x-8 transition-all duration-1000",
            mounted && "opacity-100 translate-x-0",
          )}
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-brand/10 rounded-xl -rotate-6 transform scale-95" />
            <div className="absolute inset-0 bg-[#1c1c1c] rounded-xl border border-[#2e2e2e]" />
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              <Image
                src="/images/profile.png"
                alt="Obokeng Makwati"
                width={400}
                height={400}
                className="object-cover h-full w-full"
                priority
              />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "space-y-6 opacity-0 transform translate-x-8 transition-all duration-1000 delay-300",
            mounted && "opacity-100 translate-x-0",
          )}
        >
          <div className="bg-[#1c1c1c] p-6 rounded-xl border border-[#2e2e2e]">
            <p className="text-[#9ba1a6] leading-relaxed text-sm">
              I AM a creative powerhouse with over 10 years of experience in graphic design, motion graphics, and web
              development. I bring ideas to life with bold visuals, seamless animations, and pixel-perfect digital
              experiences.
            </p>
            <p className="text-[#9ba1a6] leading-relaxed mt-4 text-sm">
              Whether it's crafting eye-catching brands, dynamic video content, or interactive websites, I blend
              artistry with tech-savvy precision to create work that grabs attention and gets results. Always ahead of
              trends, I thrive on pushing creative boundaries and turning big ideas into visual magic.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickFacts.map((fact, index) => (
              <div
                key={index}
                className="bg-[#1c1c1c] p-4 rounded-lg border border-[#2e2e2e] hover:border-[#3a3f42] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{fact.icon}</div>
                  <div>
                    <h3 className="font-medium text-[#ecedee] text-sm">{fact.title}</h3>
                    <p className="text-xs text-[#9ba1a6] mt-0.5">{fact.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
