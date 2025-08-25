"use client"

import Navbar from "@/components/ui/navbar"
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

const graphicDesignProjects = [
  {
    id: 1,
    title: "Marathon Countdown",
    description:
      "Complete brand identity package including logo, color palette, and brand guidelines for a tech startup.",
    images: [
      "/images/countdown 5.jpg",
      "/images/countdown 4.jpg",
      "/images/countdown 3.jpg",
      "/images/countdown 2.jpg",
      "/images/countdown 1.jpg",
    ],
    category: "Social Media",
    tools: ["Adobe Illustrator", "Adobe Photoshop"],
    year: "2024",
  },
  {
    id: 2,
    title: "Marketing Campaign Visuals",
    description: "Social media graphics and print materials for a comprehensive marketing campaign.",
    images: ["/social-media-marketing-campaign.png", "/placeholder-1ged5.png", "/placeholder-d8445.png"],
    category: "Marketing",
    tools: ["Adobe Creative Suite", "Figma"],
    year: "2024",
  },
  {
    id: 3,
    title: "Corporate Presentation Design",
    description: "Professional presentation templates and infographics for corporate communications.",
    images: ["/corporate-presentation-templates.png", "/social-media-marketing-campaign.png", "/consumer-goods-packaging.png"],
    category: "Corporate",
    tools: ["Adobe InDesign", "Adobe Illustrator"],
    year: "2023",
  },
  {
    id: 4,
    title: "Event Poster Series",
    description: "Eye-catching poster designs for music events and cultural festivals.",
    images: ["/placeholder-d8445.png", "/custom-digital-artwork.png", "/placeholder-1ged5.png"],
    category: "Events",
    tools: ["Adobe Photoshop", "Adobe Illustrator"],
    year: "2023",
  },
  {
    id: 5,
    title: "Package Design",
    description: "Product packaging design for consumer goods with focus on shelf appeal.",
    images: ["/consumer-goods-packaging.png", "/placeholder-d8445.png", "/corporate-presentation-templates.png"],
    category: "Packaging",
    tools: ["Adobe Illustrator", "Adobe Dimension"],
    year: "2023",
  },
  {
    id: 6,
    title: "Digital Illustrations",
    description: "Custom digital illustrations for web and print applications.",
    images: ["/custom-digital-artwork.png", "/social-media-marketing-campaign.png", "/consumer-goods-packaging.png"],
    category: "Illustration",
    tools: ["Adobe Illustrator", "Procreate"],
    year: "2024",
  },
]

export default function GraphicDesignPage() {
  const [selectedProject, setSelectedProject] = useState<typeof graphicDesignProjects[0] | null>(null)
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

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedProject) {
        closeGallery()
      }
    }

    if (selectedProject) {
      document.addEventListener('keydown', handleEscKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [selectedProject])

  const openGallery = (project: typeof graphicDesignProjects[0]) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeGallery = () => {
    console.log('Closing gallery...')
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
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {particlePositions.map((particle, index) => (
            <div
              key={index}
              className="absolute w-2 h-2 bg-teal-400/30 rounded-full animate-float"
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
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 dark:opacity-20"></div>
      </div>
      
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400 dark:from-teal-400 dark:to-teal-200">
              Graphic Design
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl font-thin">
            Crafting visuals that captivate and inspire. A showcase of my graphic design work spanning branding,
            marketing, and visual communications.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {graphicDesignProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-teal-500/50 dark:hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {/* Square Image Container */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Gallery Button */}
                <button
                  onClick={() => openGallery(project)}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="bg-teal-500/90 text-white p-4 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ExternalLink size={24} />
                  </div>
                </button>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-teal-500/20 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
                
                {/* Year Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 dark:bg-gray-800/20 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors mb-3 line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3 font-thin">
                  {project.description}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tools.map((tool) => (
                    <span 
                      key={tool} 
                      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-lg text-xs font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* View Project Button */}
                <button 
                  onClick={() => openGallery(project)}
                  className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors text-sm font-medium group/btn"
                >
                  View Gallery
                  <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-teal-500/10 to-teal-400/10 dark:from-teal-500/20 dark:to-teal-400/20 rounded-2xl p-6 sm:p-8 border border-teal-500/20">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400 dark:from-teal-400 dark:to-teal-200">
              Let's Create Something Amazing Together
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto font-thin">
              Ready to bring your vision to life? I'd love to discuss your next graphic design project.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-teal-400 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-400 hover:to-teal-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            // Close modal when clicking on the backdrop
            if (e.target === e.currentTarget) {
              closeGallery()
            }
          }}
        >
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 z-10 bg-gray-800/80 text-white p-2 rounded-full hover:bg-gray-700/80 transition-colors cursor-pointer"
              aria-label="Close gallery"
            >
              <X size={24} />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 text-white p-3 rounded-full hover:bg-gray-700/80 transition-colors cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-gray-800/80 text-white p-3 rounded-full hover:bg-gray-700/80 transition-colors cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={selectedProject.images[currentImageIndex]}
                alt={`${selectedProject.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-800/80 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {selectedProject.images.length}
            </div>

            {/* Project Info */}
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">{selectedProject.title}</h3>
              <p className="text-gray-300 text-sm">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
