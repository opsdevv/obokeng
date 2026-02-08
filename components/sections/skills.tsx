"use client"

import { useState, useEffect } from "react"
import { Palette, Video, Code, Wrench, Database, ArrowRight } from "lucide-react"
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
      icon: <Database className="h-6 w-6" />,
      title: "Data Engineering",
      percentage: "88%",
      skills: ["TypeScript", "Supabase", "Azure Blob Storage", "Data Lake", "ETL Pipelines", "Custom BI Dashboards", "PostgreSQL", "Real-time Analytics"],
      process: [
        { label: "Data sources", desc: "APIs, files, streams" },
        { label: "Data lake", desc: "Azure Blob Storage" },
        { label: "Process & store", desc: "Supabase / PostgreSQL" },
        { label: "Custom BI dashboard", desc: "TypeScript, Next.js" },
      ],
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
              "bg-white dark:bg-[#1c1c1c] border border-[#e6e8eb] dark:border-[#2e2e2e] rounded-lg p-6 hover:border-[#3a3f42] dark:hover:border-[#3a3f42] transition-colors opacity-0 transform translate-y-8",
              mounted && "opacity-100 translate-y-0",
            )}
            style={{
              transitionDelay: mounted ? `${index * 150}ms` : "0ms",
            }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#f1f3f5] dark:bg-[#26292b] rounded-md text-brand">{category.icon}</div>
                  <h3 className="text-lg font-semibold text-[#11181c] dark:text-[#ecedee]">{category.title}</h3>
                </div>
                <span className="text-brand font-medium text-sm">{category.percentage}</span>
              </div>

              <div className="mb-4">
                <div className="w-full bg-[#e6e8eb] dark:bg-[#313538] rounded-full h-1.5">
                  <div
                    className="bg-brand h-1.5 rounded-full transition-all duration-1000 ease-out"
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
                      className="bg-[#f1f3f5] dark:bg-[#26292b] px-3 py-1 rounded-md text-xs border border-[#e6e8eb] dark:border-[#313538] text-[#687076] dark:text-[#9ba1a6] hover:border-brand/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {category.process && (
                  <div className="mb-4 pt-4 border-t border-[#e6e8eb] dark:border-[#313538]">
                    <h4 className="text-xs font-medium text-[#687076] dark:text-[#9ba1a6] mb-3">Pipeline: Data source → Custom BI dashboard</h4>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                      {category.process.map((step, stepIndex) => (
                        <span key={stepIndex} className="flex items-center gap-1 sm:gap-2">
                          <div className="bg-[#f8f9fa] dark:bg-[#202425] px-2 py-1.5 rounded border border-[#e6e8eb] dark:border-[#2b2f31] text-left min-w-0">
                            <div className="font-medium text-[#11181c] dark:text-[#ecedee] text-xs leading-tight">{step.label}</div>
                            <div className="text-[10px] text-[#687076] dark:text-[#9ba1a6] truncate">{step.desc}</div>
                          </div>
                          {stepIndex < category.process!.length - 1 && (
                            <ArrowRight className="h-3.5 w-3.5 text-brand flex-shrink-0" />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {category.logos && (
                  <div className="mt-4 pt-4 border-t border-[#e6e8eb] dark:border-[#313538]">
                    <h4 className="text-xs font-medium text-[#687076] dark:text-[#9ba1a6] mb-3">Featured Tools</h4>
                    <div className="flex flex-wrap gap-3">
                      {category.logos.map((tool, toolIndex) => (
                        <div
                          key={toolIndex}
                          className="flex items-center gap-3 bg-[#f8f9fa] dark:bg-[#202425] px-3 py-2 rounded-lg border border-[#e6e8eb] dark:border-[#2b2f31]"
                        >
                          <div className="text-xl">{tool.logo}</div>
                          <div>
                            <div className="font-medium text-[#11181c] dark:text-[#ecedee] text-sm">{tool.name}</div>
                            <div className="text-xs text-[#687076] dark:text-[#9ba1a6]">{tool.description}</div>
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
