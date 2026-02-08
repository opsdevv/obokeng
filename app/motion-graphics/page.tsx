"use client"

import Navbar from "@/components/ui/navbar"
import {
  ArrowLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ExternalLink,
  PlayCircle,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useRef, useCallback } from "react"

type MotionProject = {
  id: number
  title: string
  description: string
  videoUrl: string
  videoSrc?: string // optional direct MP4 for custom player
  category: string
  tools: string[]
  year: string
  thumbnail: string
  duration?: string
}

const motionGraphicsProjects: MotionProject[] = [
  {
    id: 1,
    title: "FNB Animation",
    description:
      "Dynamic brand animation for FNB featuring smooth transitions and engaging visual elements.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    category: "Brand Animation",
    tools: ["Adobe After Effects", "Adobe Illustrator"],
    year: "2024",
    thumbnail: "/placeholder-1ged5.png",
    duration: "1:25",
  },
  {
    id: 2,
    title: "Hollard *174#",
    description:
      "Interactive service animation showcasing Hollard's USSD service with clear call-to-action elements.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    category: "Service Animation",
    tools: ["Adobe After Effects", "Adobe Photoshop"],
    year: "2024",
    thumbnail: "/placeholder-d8445.png",
    duration: "2:15",
  },
  {
    id: 3,
    title: "Text Animation",
    description:
      "Creative typography animation demonstrating dynamic text effects and motion design principles.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    category: "Typography",
    tools: ["Adobe After Effects", "Adobe Illustrator"],
    year: "2023",
    thumbnail: "/corporate-presentation-templates.png",
    duration: "0:45",
  },
  {
    id: 4,
    title: "Hollard | Claims submission",
    description:
      "Step-by-step animation guide for the claims submission process with intuitive visual flow.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    category: "Process Animation",
    tools: ["Adobe After Effects", "Adobe Illustrator"],
    year: "2023",
    thumbnail: "/social-media-marketing-campaign.png",
    duration: "1:50",
  },
  {
    id: 5,
    title: "Hollard | Track claims",
    description:
      "Interactive animation showing how users can track their insurance claims status.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    category: "Process Animation",
    tools: ["Adobe After Effects", "Adobe Illustrator"],
    year: "2023",
    thumbnail: "/consumer-goods-packaging.png",
    duration: "1:10",
  },
  {
    id: 6,
    title: "Cresta Mahalapye",
    description:
      "Luxury hotel brand animation highlighting premium amenities and elegant design aesthetic.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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

const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2]

export default function MotionGraphicsPage() {
  const [particlePositions, setParticlePositions] = useState<
    Array<{ left: string; top: string; delay: string; duration: string }>
  >([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackSpeedIndex, setPlaybackSpeedIndex] = useState(2) // 1x
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentProject = motionGraphicsProjects[currentIndex]
  const hasNativeVideo = Boolean(currentProject?.videoSrc)

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

  const loadVideo = useCallback((index: number) => {
    const project = motionGraphicsProjects[index]
    if (!project) return
    setCurrentIndex(index)
    // Effect below syncs video element and auto-plays
  }, [])

  useEffect(() => {
    if (!currentProject?.videoSrc || !videoRef.current) return
    videoRef.current.src = currentProject.videoSrc
    videoRef.current.load()
    videoRef.current.play().catch(() => {})
    setIsPlaying(true)
  }, [currentIndex, currentProject?.videoSrc])

  const togglePlayPause = useCallback(() => {
    if (!hasNativeVideo) return
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [hasNativeVideo])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !hasNativeVideo) return
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onTimeUpdate = () => setCurrentTime(video.currentTime)
    const onLoadedMetadata = () => setDuration(video.duration)
    const onEnded = () => {
      setIsPlaying(false)
      if (currentIndex < motionGraphicsProjects.length - 1) {
        const next = motionGraphicsProjects.findIndex((p, i) => i > currentIndex && p.videoSrc)
        if (next >= 0) loadVideo(next)
      }
    }
    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)
    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("loadedmetadata", onLoadedMetadata)
    video.addEventListener("ended", onEnded)
    return () => {
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("loadedmetadata", onLoadedMetadata)
      video.removeEventListener("ended", onEnded)
    }
  }, [hasNativeVideo, currentIndex, loadVideo])

  const setProgress = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!hasNativeVideo || !videoRef.current) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const newTime = x * duration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    },
    [hasNativeVideo, duration]
  )

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }, [isMuted])

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value) / 100
    setVolume(v)
    if (videoRef.current) {
      videoRef.current.volume = v
      videoRef.current.muted = v === 0
      setIsMuted(v === 0)
    }
  }, [])

  const cyclePlaybackSpeed = useCallback(() => {
    if (!videoRef.current) return
    const next = (playbackSpeedIndex + 1) % PLAYBACK_SPEEDS.length
    setPlaybackSpeedIndex(next)
    videoRef.current.playbackRate = PLAYBACK_SPEEDS[next]
  }, [playbackSpeedIndex])

  const toggleFullscreen = useCallback(() => {
    const container = containerRef.current
    if (!container) return
    if (!document.fullscreenElement) {
      container.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }, [])

  const rewind = useCallback(() => {
    if (videoRef.current) videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10)
  }, [])
  const forward = useCallback(() => {
    if (videoRef.current)
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + 10
      )
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!hasNativeVideo) return
      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault()
          togglePlayPause()
          break
        case "m":
          toggleMute()
          break
        case "f":
          toggleFullscreen()
          break
        case "ArrowLeft":
          e.preventDefault()
          if (videoRef.current)
            videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5)
          break
        case "ArrowRight":
          e.preventDefault()
          if (videoRef.current)
            videoRef.current.currentTime = Math.min(
              videoRef.current.duration,
              videoRef.current.currentTime + 5
            )
          break
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [hasNativeVideo, togglePlayPause, toggleMute, toggleFullscreen])

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
          {/* Video container with custom controls */}
          <div
            ref={containerRef}
            className="flex-[3] rounded-xl overflow-hidden bg-black shadow-xl relative group"
          >
            {hasNativeVideo ? (
              <>
                <video
                  ref={videoRef}
                  className="w-full h-auto block bg-black"
                  preload="auto"
                  onClick={togglePlayPause}
                  playsInline
                  autoPlay
                />
                {/* Preload other videos so they're ready when user switches */}
                {motionGraphicsProjects.map(
                  (project, index) =>
                    project.videoSrc &&
                    index !== currentIndex && (
                      <video
                        key={index}
                        preload="auto"
                        src={project.videoSrc}
                        className="hidden"
                        aria-hidden
                      />
                    )
                )}
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {/* Progress bar */}
                  <div
                    className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer"
                    onClick={setProgress}
                  >
                    <div
                      className="h-full bg-brand rounded-full transition-[width] duration-100"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={togglePlayPause}
                        className="w-11 h-11 rounded-full bg-brand hover:opacity-90 flex items-center justify-center text-white transition-opacity"
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={rewind}
                        className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                      >
                        <SkipBack size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={forward}
                        className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                      >
                        <SkipForward size={18} />
                      </button>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={toggleMute}
                          className="p-2 text-white/90 hover:text-white rounded-full transition-colors"
                        >
                          {isMuted || volume === 0 ? (
                            <VolumeX size={18} />
                          ) : (
                            <Volume2 size={18} />
                          )}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={isMuted ? 0 : volume * 100}
                          onChange={handleVolumeChange}
                          className="w-16 h-1 accent-brand cursor-pointer"
                        />
                      </div>
                      <span className="text-[#9ba1a6] text-sm font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={cyclePlaybackSpeed}
                        className="px-2 py-1 text-sm text-[#9ba1a6] hover:text-white hover:bg-white/10 rounded transition-colors"
                      >
                        {PLAYBACK_SPEEDS[playbackSpeedIndex]}x
                      </button>
                      <button
                        type="button"
                        onClick={toggleFullscreen}
                        className="p-2 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                      >
                        {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="aspect-video flex items-center justify-center bg-[#151718]">
                <iframe
                  src={currentProject?.videoUrl}
                  title={currentProject?.title ?? "Video"}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
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
            href={currentProject?.videoUrl?.replace("/embed/", "/watch?v=")}
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
