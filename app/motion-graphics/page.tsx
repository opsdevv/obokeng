"use client"

import Navbar from "@/components/ui/navbar"
import { ArrowLeft, Play, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const motionGraphicsProjects = [
  {
    id: 1,
    title: "FNB Animation",
    description: "Dynamic brand animation for FNB featuring smooth transitions and engaging visual elements.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual FNB video URL
    category: "Brand Animation",
    tools: ["Adobe After Effects", "Adobe Illustrator"],
    year: "2024",
    thumbnail: "/placeholder-1ged5.png",
  },
  {
    id: 2,
    title: "Hollard *174#",
    description: "Interactive service animation showcasing Hollard's USSD service with clear call-to-action elements.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual Hollard video URL
    category: "Service Animation",
    tools: ["Adobe After Effects", "Adobe Photoshop"],
    year: "2024",
    thumbnail: "/placeholder-d8445.png",
  },
  {
    id: 3,
    title: "Text Animation",
    description: "Creative typography animation demonstrating dynamic text effects and motion design principles.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual Text Animation video URL
    category: "Typography",
    tools: ["Adobe After Effects", "Adobe Illustrator"],
    year: "2023",
    thumbnail: "/corporate-presentation-templates.png",
  },
  {
    id: 4,
    title: "Hollard | Claims submission",
    description: "Step-by-step animation guide for the claims submission process with intuitive visual flow.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual Claims video URL
    category: "Process Animation",
    tools: ["Adobe After Effects", "Adobe Illustrator"],
    year: "2023",
    thumbnail: "/social-media-marketing-campaign.png",
  },
  {
    id: 5,
    title: "Hollard | Track claims",
    description: "Interactive animation showing how users can track their insurance claims status.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual Track Claims video URL
    category: "Process Animation",
    tools: ["Adobe After Effects", "Adobe Illustrator"],
    year: "2023",
    thumbnail: "/consumer-goods-packaging.png",
  },
  {
    id: 6,
    title: "Cresta Mahalapye",
    description: "Luxury hotel brand animation highlighting premium amenities and elegant design aesthetic.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual Cresta video URL
    category: "Brand Animation",
    tools: ["Adobe After Effects", "Adobe Illustrator"],
    year: "2023",
    thumbnail: "/custom-digital-artwork.png",
  },
]

export default function MotionGraphicsPage() {
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 transition-colors duration-300">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {particlePositions.map((particle, i) => (
            <div
              key={i}
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
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
      </div>
      
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors mb-6"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </Link>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">
              Motion Graphics
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl font-thin">
            Bringing visuals to life through dynamic motion design. A showcase of my motion graphics work 
            spanning brand animations, process guides, and creative visual storytelling.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {motionGraphicsProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {/* Video Player Container */}
              <div className="relative aspect-video overflow-hidden">
                <iframe
                  src={project.videoUrl}
                  title={project.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
                
                {/* Year Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gray-800/20 text-gray-200 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-100 group-hover:text-teal-300 transition-colors mb-3 line-clamp-2">
                  {project.title}
                </h3>

                <p className="text-gray-300 mb-4 text-sm leading-relaxed line-clamp-3 font-thin">
                  {project.description}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tools.map((tool) => (
                    <span 
                      key={tool} 
                      className="bg-gray-800 text-gray-300 px-2 py-1 rounded-lg text-xs font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Watch on YouTube Button */}
                <a 
                  href={project.videoUrl.replace('/embed/', '/watch?v=')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 transition-colors text-sm font-medium group/btn"
                >
                  Watch on YouTube
                  <ExternalLink size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-teal-500/20 to-teal-400/20 rounded-2xl p-6 sm:p-8 border border-teal-500/20">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-200">
              Let's Bring Your Ideas to Life
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto font-thin">
              Ready to create engaging motion graphics that captivate your audience? 
              I'd love to discuss your next animation project.
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
    </main>
  )
}
