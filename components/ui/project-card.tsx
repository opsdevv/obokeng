"use client"

import { useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ProjectCardProps {
  title: string
  description: string
  date: string
  techStack: string[]
  demoUrl?: string
  codeUrl?: string
  imageSrc?: string
}

export default function ProjectCard({
  title,
  description,
  date,
  techStack,
  demoUrl,
  codeUrl,
  imageSrc,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden group transition-all duration-300 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageSrc && (
        <div className="w-full h-48 overflow-hidden">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            width={400}
            height={225}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}
      <div className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-200 group-hover:text-teal-400 transition-colors">{title}</h3>
            <span className="text-sm text-gray-500">{date}</span>
          </div>
          <p className="text-gray-400 mb-4">{description}</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-auto mb-4">
          {techStack.map((tech, index) => (
            <span key={index} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>

        <div
          className={cn(
            "flex gap-3 transition-all duration-300 transform",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
        >
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-teal-400 hover:text-teal-300 transition-colors"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
          {codeUrl && (
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-teal-400 hover:text-teal-300 transition-colors"
            >
              <Github size={16} />
              <span>View Code</span>
            </a>
          )}
        </div>
      </div>
      <div
        className={cn(
          "h-1 bg-gradient-to-r from-teal-500 to-teal-300 transition-all duration-500 transform origin-left",
          isHovered ? "scale-x-100" : "scale-x-0",
        )}
      ></div>
    </div>
  )
}
