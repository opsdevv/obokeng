"use client"

import { useState, useEffect } from "react"
import SectionHeading from "@/components/ui/section-heading"
import AchievementCard from "@/components/ui/achievement-card"
import { cn } from "@/lib/utils"

export default function OtherSkills() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const otherSkills = [
    {
      icon: "💻",
      title: "Programming",
      description: "Advanced programming skills in multiple languages and frameworks",
    },
    {
      icon: "🔧",
      title: "Data Engineering",
      description: "Building scalable data pipelines and ETL processes",
    },
    {
      icon: "🗄️",
      title: "Databases",
      description: "Expertise in Supabase, PostgreSQL, and MySQL database systems",
    },
    {
      icon: "⚡",
      title: "Automation",
      description: "Creating efficient automated workflows and processes",
    },
  ]

  return (
    <section id="other-skills" className="py-20 relative scroll-mt-16">
      <SectionHeading title="Other Skills" subtitle="Technical expertise and specialized knowledge" />

      <div className="grid md:grid-cols-2 gap-6">
        {otherSkills.map((skill, index) => (
          <div
            key={index}
            className={cn(
              "opacity-0 transform translate-y-8 transition-all duration-700",
              mounted && "opacity-100 translate-y-0",
            )}
            style={{
              transitionDelay: mounted ? `${index * 150}ms` : "0ms",
            }}
          >
            <AchievementCard icon={skill.icon} title={skill.title} description={skill.description} />
          </div>
        ))}
      </div>
    </section>
  )
}
