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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {webDevelopmentProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-[#1c1c1c] rounded-xl overflow-hidden border border-[#2e2e2e] hover:border-[#3a3f42] transition-all duration-300 hover:scale-[1.02]"
            >
              {/* Image Gallery Preview */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Gallery Button */}
                <button
                  onClick={() => openGallery(project)}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="bg-brand text-white p-4 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ExternalLink size={24} />
                  </div>
                </button>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-brand/20 text-brand px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
                
                {/* Year Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#26292b] text-[#ecedee] px-2 py-1 rounded-full text-xs font-medium">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-[#ecedee] group-hover:text-brand transition-colors mb-3 line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-[#9ba1a6] mb-4 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tools.map((tool) => (
                    <span 
                      key={tool} 
                      className="bg-[#26292b] text-[#9ba1a6] px-2 py-1 rounded-md text-xs font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openGallery(project)}
                    className="inline-flex items-center gap-2 text-brand hover:opacity-80 transition-opacity text-sm font-medium group/btn"
                  >
                    View Gallery
                    <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
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

      {/* Image Gallery Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 z-10 bg-[#2e2e2e] text-white p-2 rounded-full hover:bg-[#3e3e3e] transition-colors"
            >
              <X size={24} />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[#2e2e2e] text-white p-3 rounded-full hover:bg-[#3e3e3e] transition-colors"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[#2e2e2e] text-white p-3 rounded-full hover:bg-[#3e3e3e] transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Main Image */}
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={selectedProject.images[currentImageIndex]}
                alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#2e2e2e] text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {selectedProject.images.length}
            </div>

            {/* Project Info */}
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">{selectedProject.title}</h3>
              <p className="text-[#9ba1a6] text-sm">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
