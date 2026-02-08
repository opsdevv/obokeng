"use client"

import Navbar from "@/components/ui/navbar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const graphicDesignProjects = [
  {
    id: 1,
    title: "Marathon Countdown",
    description:
      "Complete brand identity package including logo, color palette, and brand guidelines for a tech startup.",
    images: [
      "/box.jpg",
      "/Brochure1.jpg",
      "/images/countdown 3.jpg",
      "/images/countdown 2.jpg",
      "/images/countdown 1.jpg",
    ],
    category: "Branding",
    tools: ["Adobe Illustrator", "Adobe Photoshop"],
    year: "2024",
  },
  {
    id: 2,
    title: "Marketing Campaign Visuals",
    description:
      "Social media graphics and print materials for a comprehensive marketing campaign, including banners, flyers, and promotional assets.",
    images: ["/mining.jpg", "/back.jpg", "/stall.jpg", "/art1.jpg"],
    category: "Marketing",
    tools: ["Adobe Creative Suite", "Figma"],
    year: "2024",
  },
  {
    id: 3,
    title: "Corporate Presentation Design",
    description:
      "Professional presentation templates and infographics for corporate communications, designed for clarity and brand consistency.",
    images: ["/t3.png", "/2.jpg", "/consumer-goods-packaging.png"],
    category: "Corporate",
    tools: ["Adobe InDesign", "Adobe Illustrator"],
    year: "2023",
  },
  {
    id: 4,
    title: "Event Poster Series",
    description:
      "Eye-catching poster designs for music events and cultural festivals, with bold typography and vibrant visuals.",
    images: ["/skoonologo.jpg", "/product.jpg", "/20l.jpg"],
    category: "Events",
    tools: ["Adobe Photoshop", "Adobe Illustrator"],
    year: "2023",
  },
  {
    id: 5,
    title: "Package Design",
    description:
      "Product packaging design for consumer goods with focus on shelf appeal and brand recognition.",
    images: ["/alublogo.png", "/placeholder-d8445.png", "/corporate-presentation-templates.png"],
    category: "Packaging",
    tools: ["Adobe Illustrator", "Adobe Dimension"],
    year: "2021",
  },
  {
    id: 6,
    title: "Digital Illustrations",
    description:
      "Custom digital illustrations for web and print applications, including branding assets and editorial artwork.",
    images: ["/images/branding.jpg", "/logo1.png", "/consumer-goods-packaging.png"],
    category: "Illustration",
    tools: ["Adobe Illustrator", "Procreate"],
    year: "2024",
  },
]

export default function GraphicDesignPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-[#0f0f0f] text-[#11181c] dark:text-[#ecedee] transition-colors duration-300">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-24 pb-24">
        {/* Header */}
        <header className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#687076] dark:text-[#9ba1a6] hover:text-brand transition-colors mb-8 text-sm"
          >
            <ArrowLeft size={18} />
            Back to Portfolio
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#11181c] dark:text-[#ecedee] tracking-tight mb-3">
            Graphic Design
          </h1>
          <p className="text-[#687076] dark:text-[#9ba1a6] text-lg leading-relaxed">
            A scroll-through showcase of branding, marketing, and visual communications.
          </p>
        </header>

        {/* Projects: one per section, scroll to see work */}
        <div className="space-y-24">
          {graphicDesignProjects.map((project) => (
            <section
              key={project.id}
              id={`project-${project.id}`}
              className="scroll-mt-24"
            >
              {/* Project title & meta - consistent format: Category·Year / Title / Description / Tools */}
              <div className="mb-10">
                <p className="text-sm text-[#687076] dark:text-[#9ba1a6] mb-2">
                  {project.category}·{project.year}
                </p>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#11181c] dark:text-[#ecedee] mb-3">
                  {project.title}
                </h2>
                <p className="text-[#687076] dark:text-[#9ba1a6] leading-relaxed max-w-2xl mb-2">
                  {project.description}
                </p>
                <p className="text-xs text-[#687076] dark:text-[#9ba1a6]">
                  {project.tools.join(" ")}
                </p>
              </div>

              {/* Images: vertical stack, full width so user can scroll and see clearly */}
              <div className="space-y-8">
                {project.images.map((src, i) => (
                  <div
                    key={`${project.id}-${i}`}
                    className="relative w-full rounded-lg overflow-hidden bg-[#f1f3f5] dark:bg-[#1a1a1a]"
                  >
                    <Image
                      src={src}
                      alt={`${project.title} — ${i + 1}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain"
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer CTA */}
        <footer className="mt-24 pt-16 border-t border-[#e6e8eb] dark:border-[#262626] text-center">
          <p className="text-[#687076] dark:text-[#9ba1a6] mb-6">
            Want to work together on your next project?
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-[#11181c] dark:bg-[#ecedee] text-[#fafafa] dark:text-[#0f0f0f] px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Get in touch
          </Link>
        </footer>
      </div>
    </main>
  )
}
