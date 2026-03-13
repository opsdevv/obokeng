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
            I am a creative technologist with over 10 years of experience spanning graphic design, 
            motion graphics, web development, and AI-powered systems. I specialize in turning ideas into intelligent digital experiences, 
            combining bold visuals, seamless animation, and scalable technology.
            </p>
            <p className="text-[#9ba1a6] leading-relaxed mt-4 text-sm">
            My work goes beyond traditional design. I integrate models and APIs to create tools, workflows, and 
            products that solve real problems. Having served twice as a Creative Director, I bring both creative vision and strategic thinking to every project, 
            crafting impactful marketing campaigns, immersive content, and digital platforms that deliver real results.
            <br />
            <br />
            I thrive at the intersection of creativity and technology, constantly pushing boundaries and transforming ambitious ideas into powerful solutions.
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
