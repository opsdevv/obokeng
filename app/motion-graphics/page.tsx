"use client"

import Navbar from "@/components/ui/navbar"
import { ArrowLeft, ExternalLink, PlayCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

type MotionProject = {
  id: number
  title: string
  description: string
  videoUrl: string
  category: string
  tools: string[]
  year: string
  thumbnail: string
  duration?: string
}

const motionGraphicsProjects: MotionProject[] = [
  {
    id: 1,
    title: "Hollard ",
    description:
      "Brand awareness animation for Hollard, using bold typography and smooth transitions to highlight key insurance benefits.",
    videoUrl: "https://youtu.be/mZrXN_1EhqE",
    category: "Brand Animation",
    tools: ["Adobe After Effects", "Adobe Illustrator"],
    year: "2025",
    thumbnail: "/placeholder-1ged5.png",
    duration: "0:39",
  },
  {
    id: 2,
    title: "FNB Animation",
    description:
      "Energetic promo animation for FNB, showcasing core offerings with clean iconography and dynamic motion.",
    videoUrl: "https://youtu.be/nE2_jGaRIrM",
    category: "Service Animation",
    tools: ["Adobe After Effects", "Adobe Photoshop"],
    year: "2024",
    thumbnail: "/placeholder-d8445.png",
    duration: "2:15",
  },
  {
    id: 3,
    title: "Hollard | Track Claims",
    description:
      "Step-by-step explainer animation showing Hollard customers how to track their insurance claims from start to finish.",
    videoUrl: "https://www.youtube.com/watch?v=jrwJgFE1z20",
    category: "Process Animation",
    tools: ["Adobe After Effects", "Adobe Illustrator"],
    year: "2023",
    thumbnail: "/corporate-presentation-templates.png",
    duration: "0:45",
  },
  {
    id: 4,
    title: "Cresta | Slideshow",
    description:
      "Slideshow-style motion graphics piece for Cresta, highlighting rooms, amenities, and brand details with smooth camera moves.",
    videoUrl: "https://www.youtube.com/watch?v=aGDt2TnIU2I",
    category: "Brand Animation",
    tools: ["Adobe After Effects", "Adobe Illustrator"],
    year: "2023",
    thumbnail: "/social-media-marketing-campaign.png",
    duration: "1:50",
  },
  {
    id: 5,
    title: "Hollard | Submit claims",
    description:
      "Clear guided animation walking users through how to submit their insurance claims with Hollard, from first step to confirmation.",
    videoUrl: "https://www.youtube.com/watch?v=KplP_Wt3GiI",
    category: "Process Animation",
    tools: ["Adobe After Effects", "Adobe Illustrator"],
    year: "2023",
    thumbnail: "/consumer-goods-packaging.png",
    duration: "1:10",
  },
  {
    id: 6,
    title: "B SIDE",
    description:
      "Stylised B-SIDE visualizer featuring rhythmic motion, abstract graphics, and music-synced animations.",
    videoUrl: "https://www.youtube.com/watch?v=bNj1EV35bAs",
    category: "Brand Animation",
    tools: ["Adobe After Effects", "Adobe Illustrator"],
    year: "2023",
    thumbnail: "/custom-digital-artwork.png",
    duration: "1:00",
  },
]

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00"
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`
}

function getYouTubeId(url: string | undefined): string | undefined {
  if (!url) return undefined
  try {
    const parsed = new URL(url)
    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.replace("/", "")
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v")
      if (id) return id
      if (parsed.pathname.startsWith("/embed/")) {
        const parts = parsed.pathname.split("/")
        return parts[parts.length - 1] || undefined
      }
    }
  } catch {
    return undefined
  }
  return undefined
}

export default function MotionGraphicsPage() {
  const [particlePositions, setParticlePositions] = useState<
    Array<{ left: string; top: string; delay: string; duration: string }>
  >([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const playerRef = useRef<any | null>(null)
  const playerContainerRef = useRef<HTMLDivElement | null>(null)

  const currentProject = motionGraphicsProjects[currentIndex]

  useEffect(() => {
    const positions = Array(15)
      .fill(null)
      .map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 3}s`,
        duration: `${3 + Math.random() * 4}s`,
      }))
    setParticlePositions(positions)
  }, [])

  const loadVideo = (index: number) => {
    const project = motionGraphicsProjects[index]
    if (!project) return
    setCurrentIndex(index)
  }

  // Initialize YouTube IFrame API player once
  useEffect(() => {
    if (typeof window === "undefined") return

    const w = window as any

    const createPlayer = () => {
      if (!playerContainerRef.current || playerRef.current || !w.YT || !w.YT.Player) return

      const initialId = getYouTubeId(motionGraphicsProjects[0]?.videoUrl)

      playerRef.current = new w.YT.Player(playerContainerRef.current, {
        videoId: initialId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          modestBranding: 1,
          playsinline: 1,
        },
        events: {
          onStateChange: (event: any) => {
            const YTState = w.YT?.PlayerState
            if (YTState && event.data === YTState.ENDED) {
              setCurrentIndex((prev) => (prev + 1) % motionGraphicsProjects.length)
            }
          },
        },
      })
    }

    // If API already loaded, create player immediately
    if (w.YT && w.YT.Player) {
      createPlayer()
    } else {
      // Inject script if needed
      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script")
        tag.src = "https://www.youtube.com/iframe_api"
        tag.id = "youtube-iframe-api"
        document.body.appendChild(tag)
      }

      // Chain onto global callback
      const prevOnReady = w.onYouTubeIframeAPIReady
      w.onYouTubeIframeAPIReady = () => {
        if (typeof prevOnReady === "function") prevOnReady()
        createPlayer()
      }
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null
      }
    }
  }, [])

  // When the selected project changes, load the corresponding YouTube video
  useEffect(() => {
    const id = getYouTubeId(currentProject?.videoUrl)
    if (playerRef.current && id) {
      playerRef.current.loadVideoById(id)
    }
  }, [currentProject?.videoUrl, currentIndex])

  return (
    <main className="min-h-screen bg-[#151718] text-[#ecedee] transition-colors duration-300">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/15 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute inset-0">
          {particlePositions.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-brand/30 rounded-full animate-float"
              style={{
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />
      </div>

      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10 max-w-[1400px]">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand hover:opacity-80 transition-opacity mb-6"
          >
            <ArrowLeft size={20} />
            Back to Portfolio
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand">
              Motion Graphics
            </span>
          </h1>
          <p className="text-lg text-[#9ba1a6] max-w-2xl">
            Bringing visuals to life through dynamic motion design. A showcase of my motion graphics
            work spanning brand animations, process guides, and creative visual storytelling.
          </p>
        </div>

        {/* Player wrapper: main video + sidebar playlist (motion3 style) */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Video container with YouTube player */}
          <div className="flex-[3] rounded-xl overflow-hidden bg-black shadow-xl relative">
            <div className="aspect-video flex items-center justify-center bg-[#151718]">
              <div ref={playerContainerRef} className="w-full h-full" />
            </div>
          </div>

          {/* Sidebar playlist (motion3 style) */}
          <div className="flex flex-col gap-6 lg:min-w-[280px] lg:max-w-[320px]">
            <div className="bg-[#1c1c1c] rounded-lg p-4 border border-[#2e2e2e] max-h-[380px] overflow-y-auto">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#2e2e2e]">
                <h2 className="text-lg font-semibold text-brand">Motion Graphics</h2>
                <span className="bg-[#26292b] text-[#9ba1a6] text-xs px-2 py-1 rounded-md">
                  {motionGraphicsProjects.length} videos
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {motionGraphicsProjects.map((project, index) => (
                  <li
                    key={project.id}
                    onClick={() => loadVideo(index)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border-l-4 ${
                      index === currentIndex
                        ? "bg-brand/10 border-brand"
                        : "bg-[#26292b] border-transparent hover:bg-[#2b2f31] hover:translate-x-1"
                    }`}
                  >
                    <div className="w-14 h-9 rounded bg-[#151718] flex items-center justify-center text-brand shrink-0">
                      <PlayCircle size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-[#ecedee] text-sm truncate">
                        {project.title}
                      </div>
                      <div className="text-xs text-[#9ba1a6]">
                        {project.duration ?? "—"} • {project.year}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Video info section (motion3 style) */}
        <div className="bg-[#1c1c1c] rounded-lg p-6 border border-[#2e2e2e] mb-8">
          <h2 className="text-xl font-semibold text-[#ecedee] mb-2">{currentProject?.title}</h2>
          <p className="text-[#9ba1a6] text-sm leading-relaxed mb-4">
            {currentProject?.description}
          </p>
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="inline-flex items-center gap-1.5 text-brand text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              {currentProject?.category}
            </span>
            <span className="text-[#9ba1a6] text-sm">{currentProject?.year}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {currentProject?.tools.map((tool) => (
              <span
                key={tool}
                className="bg-[#26292b] text-[#9ba1a6] px-2 py-1 rounded-md text-xs font-medium"
              >
                {tool}
              </span>
            ))}
          </div>
          <a
            href={currentProject?.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand hover:opacity-80 transition-opacity text-sm font-medium"
          >
            Watch on YouTube
            <ExternalLink size={14} />
          </a>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-brand/10 rounded-xl p-6 sm:p-8 border border-brand/20">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-foreground">
              Let's Bring Your Ideas to Life
            </h2>
            <p className="text-[#9ba1a6] mb-6 max-w-2xl mx-auto text-sm">
              Ready to create engaging motion graphics that captivate your audience? I'd love to
              discuss your next animation project.
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
