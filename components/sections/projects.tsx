"use client"

import { useState, useEffect } from "react"
import SectionHeading from "@/components/ui/section-heading"
import ProjectCard from "@/components/ui/project-card"
import { cn } from "@/lib/utils"

export default function Projects() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const projects = [
    {
      title: "Conversational Image Recognition Chatbot",
      description: "Image-interpreting AI chatbot using Python, Flask, OpenCV, TensorFlow, HTML, CSS, JS",
      date: "Dec 2024",
      techStack: ["Python", "Flask", "TensorFlow", "OpenCV", "HTML/CSS/JS"],
      demoUrl: "#",
      codeUrl: "#",
      imageSrc: "/images/conversational-ai.png",
    },
    {
      title: "SwiftKart – E-Commerce Website",
      description: "Built with React, Bootstrap, Figma for smooth UI/UX and functional shopping flow",
      date: "Jun 2024",
      techStack: ["React", "Bootstrap", "Figma", "JavaScript"],
      demoUrl: "#",
      codeUrl: "#",
      imageSrc: "/images/swiftkart.png",
    },
  ]

  return (
    <section id="projects" className="py-20 relative scroll-mt-16">
      <SectionHeading title="Projects" subtitle="Some of my recent work" />

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className={cn(
              "opacity-0 transform translate-y-8 transition-all duration-700",
              mounted && "opacity-100 translate-y-0",
            )}
            style={{
              transitionDelay: mounted ? `${index * 200}ms` : "0ms",
            }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              date={project.date}
              techStack={project.techStack}
              demoUrl={project.demoUrl}
              codeUrl={project.codeUrl}
              imageSrc={project.imageSrc}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
