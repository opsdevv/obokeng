"use client"

import Navbar from "@/components/ui/navbar"
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"

const webDevelopmentProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.",
    images: [
      "/placeholder-1ged5.png",
      "/placeholder-d8445.png",
      "/corporate-presentation-templates.png",
      "/social-media-marketing-campaign.png"
    ],
    category: "E-Commerce",
    tools: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    year: "2024",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Modern, responsive portfolio website built with Next.js and TypeScript. Features smooth animations, dark mode, and optimized performance.",
    images: [
      "/consumer-goods-packaging.png",
      "/custom-digital-artwork.png",
      "/placeholder-1ged5.png",
      "/placeholder-d8445.png"
    ],
    category: "Portfolio",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    year: "2024",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    images: [
      "/corporate-presentation-templates.png",
      "/social-media-marketing-campaign.png",
      "/consumer-goods-packaging.png",
      "/custom-digital-artwork.png"
    ],
    category: "Web App",
    tools: ["Vue.js", "Firebase", "Vuex", "Vuetify"],
    year: "2023",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Restaurant Website",
    description: "Beautiful restaurant website with online ordering, menu management, and reservation system. Fully responsive and SEO optimized.",
    images: [
      "/placeholder-d8445.png",
      "/corporate-presentation-templates.png",
      "/social-media-marketing-campaign.png",
      "/consumer-goods-packaging.png"
    ],
    category: "Business",
    tools: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    year: "2023",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "Interactive weather dashboard with real-time data, charts, and location-based forecasting. Built with modern web technologies.",
    images: [
      "/social-media-markaging-campaign.png",
      "/consumer-goods-packaging.png",
      "/custom-digital-artwork.png",
      "/placeholder-1ged5.png"
    ],
    category: "Dashboard",
    tools: ["React", "Chart.js", "OpenWeather API", "CSS Grid"],
    year: "2023",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 6,
    title: "Blog Platform",
    description: "Content management system for blogs with markdown support, user roles, and advanced search functionality.",
    images: [
      "/custom-digital-artwork.png",
      "/placeholder-1ged5.png",
      "/placeholder-d8445.png",
      "/corporate-presentation-templates.png"
    ],
    category: "CMS",
    tools: ["Next.js", "Prisma", "PostgreSQL", "NextAuth"],
    year: "2023",
    liveUrl: "#",
    githubUrl: "#"
  },
]

export default function WebDevelopmentPage() {
  const [selectedProject, setSelectedProject] = useState<typeof webDevelopmentProjects[0] | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [particlePositions, setParticlePositions] = useState<Array<{left: string, top: string, delay: string, duration: string}>>([])

  useEffect(() => {
    // Generate particle positions only on client side to avoid hydration mismatch
    const positions = Array(15).fill(null).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 4}s`
    }))
    setParticlePositions(positions)
  }, [])

  const openGallery = (project: typeof webDevelopmentProjects[0]) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeGallery = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      )
    }
  }

  return (
    <main className="min-h-screen bg-[#151718] text-[#ecedee] transition-colors duration-300">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/15 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {particlePositions.map((particle, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 bg-brand/30 rounded-full animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration
              }}
            />
          ))}
        </div>
        
        {/* Grid Pattern */}
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
      </div>
      
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand hover:opacity-80 transition-opacity mb-6"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand">
              Web Development
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-[#9ba1a6] max-w-2xl">
            Building modern, responsive web applications with cutting-edge technologies. 
            From simple websites to complex web applications, I create digital experiences that engage and inspire.
          </p>
        </div>

        {/* Temporary Notice */}
        <div className="mb-8 rounded-xl border border-dashed border-brand/40 bg-brand/5 px-4 py-3 text-sm text-[#9ba1a6]">
          Projects will be uploaded here soon. Please check back shortly to see the latest web development work.
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-brand/10 rounded-xl p-6 sm:p-8 border border-brand/20">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-foreground">
              Let's Build Something Amazing Together
            </h2>
            <p className="text-[#9ba1a6] mb-6 max-w-2xl mx-auto text-sm">
              Ready to bring your web development ideas to life? I'd love to discuss your next project.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

    </main>
  )
}
