"use client"

import { useState, useEffect } from "react"
import { Palette, Video, Code, Wrench } from "lucide-react"
import SectionHeading from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

export default function Skills() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const skillCategories = [
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Graphic Design",
      percentage: "90%",
      skills: ["Adobe Photoshop", "Adobe InDesign", "Adobe Illustrator", "Brand Identity", "Print Design"],
    },
    {
      icon: <Video className="h-6 w-6" />,
      title: "Motion Graphics",
      percentage: "85%",
      skills: ["Adobe After Effects", "Animation", "Video Editing", "Visual Effects", "Motion Design"],
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Web Development",
      percentage: "95%",
      skills: ["HTML", "CSS", "PHP", "Ajax", "Next.js", "TypeScript", "Supabase", "PostgreSQL", "MySQL"],
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Creative Tools",
      percentage: "90%",
      skills: ["Adobe Creative Suite", "UI/UX Design", "Responsive Design", "Creative Direction"],
      logos: [
        {
          name: "Adobe Creative Suite",
          logo: "🎨",
          description: "Professional design software suite"
        },
        {
          name: "Cursor",
          logo: "🚀",
          description: "AI-powered code editor"
        }
      ]
    },
  ]

  return (
    <section id="skills" className="py-20 relative scroll-mt-16">
      <SectionHeading title="Skills" subtitle="Creative expertise and technical abilities" />

      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className={cn(
              "bg-white/80 dark:bg-gray-900/30 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-xl p-6 hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-all duration-500 opacity-0 transform translate-y-8 shadow-lg hover:shadow-xl",
              mounted && "opacity-100 translate-y-0",
            )}
            style={{
              transitionDelay: mounted ? `${index * 150}ms` : "0ms",
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100/80 dark:bg-gray-800/50 rounded-lg text-teal-600 dark:text-teal-400">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200">{category.title}</h3>
                </div>
                <span className="text-teal-600 dark:text-teal-400 font-semibold">{category.percentage}</span>
              </div>

              <div className="mb-4">
                <div className="w-full bg-gray-200/80 dark:bg-gray-800/50 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: mounted ? category.percentage : "0%",
                      transitionDelay: mounted ? `${index * 150 + 300}ms` : "0ms",
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-gray-100/80 dark:bg-gray-800/30 px-3 py-1 rounded-full text-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-teal-500/30 hover:shadow-[0_0_10px_rgba(45,212,191,0.15)] transition-all duration-300 text-gray-700 dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Creative Tools Logos */}
                {category.logos && (
                  <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Featured Tools</h4>
                    <div className="flex flex-wrap gap-4">
                      {category.logos.map((tool, toolIndex) => (
                        <div
                          key={toolIndex}
                          className="flex items-center gap-3 bg-gray-50/80 dark:bg-gray-800/20 px-4 py-3 rounded-lg border border-gray-200/50 dark:border-gray-700/30 hover:border-teal-500/30 transition-all duration-300"
                        >
                          <div className="text-2xl">{tool.logo}</div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-gray-200 text-sm">{tool.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{tool.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
