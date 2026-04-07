"use client"

import Navbar from "@/components/ui/navbar"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const graphicDesignProjects = [
  {
    id: 1,
    title: "Hollard Insurance",
    description:
      "Hollard Insurance is one of the largest privately owned insurance companies in Africa, offering innovative life and short-term insurance solutions. It focuses on making insurance accessible through partnerships, technology, and customer-centric products.",
    images: [
      "/box.jpg",
      "/Brochure1.jpg",
      "/images/ann.jpg",
    
    ],
    category: "Design",
    tools: ["Adobe Illustrator", "| Adobe Photoshop", "| Adobe InDesign"],
    year: "",
  },
  {
    id: 2,
    title: "Sesiro Insurance",
    description:
      "Sesiro is a citizen-owned insurance company in Botswana that provides life insurance and financial protection solutions tailored to individuals, families, and businesses. It focuses on accessible, locally driven services that promote financial security and long-term stability.",
    images: ["/mining.jpg", "/back.jpg", "/stall.jpg", "/art1.jpg"],
    category: "Design",
    tools: ["Adobe Creative Suite", ""],
    year: "",
  },
  {
    id: 3,
    title: "Cresta Hotels",
    description:
      "Cresta Hotels is a leading hospitality group in Southern Africa, operating 17 hotels and resorts across Botswana, Zimbabwe, and South Africa. The brand is known for offering comfortable accommodation, conferencing facilities, and authentic African hospitality for both business and leisure travelers.",
    images: ["/t3.png", "/2.jpg", "/2.jpg"],
    category: "Corporate",
    tools: ["Adobe InDesign", " | Adobe Illustrator"],
    year: "",
  },
  {
    id: 4,
    title: "Botswana Life",
    description:
      "Botswana Life is the country’s leading life insurance provider, offering a wide range of protection, savings, and investment solutions for individuals and businesses. The company focuses on helping Batswana build long-term financial security and wealth.",
    images: ["/images/thedate.jpg", "/images/bus.jpg", "/images/pensioners.jpg", "/images/show.jpg", "/images/thanks.jpg" , "/images/article.jpg"],
    category: "Events",
    tools: ["Adobe Photoshop", "| Adobe Illustrator | Adobe InDesign"],
    year: "2023",
  },
  {
    id: 5,
    title: "Association of Life Underwriters Botswana",
    description:
      "Association of Life Underwriters Botswana is a professional body that represents life insurance advisors and underwriters in Botswana. It promotes ethical standards, professional development, and best practices within the life insurance industry. ",
    images: ["/alublogo.png",],
    category: "Logo design",
    tools: ["Adobe Illustrator"],
    year: "",
  },
  {
    id: 6,
    title: "Aasa Farms",
    description:
      "Aasa Farms is a growing startup farm in Botswana that recently expanded into a butchery, supplying fresh, locally sourced meat. The business is proudly run by a young female entrepreneur focused on quality, sustainability, and community-driven agriculture.",
    images: ["/images/branding.jpg", "/logo1.png",],
    category: "Logo design & Branding",
    tools: ["Adobe Illustrator", "| Adobe Photoshop"],
    year: "",
  },
  {
    id: 7,
    title: "Rockfall Lekgowe Law Group",
    description:
      "Rockfall Lekgowe Law Group is a Botswana-based legal practice providing professional legal services across areas such as corporate law, litigation, and advisory services. The firm focuses on delivering strategic legal solutions to individuals, businesses, and institutions.",
    images: ["/images/dia.jpg", "/images/happy.jpg", "/images/maun.jpg", "/images/chedza.jpg", ],
    category: "Comms",
    tools: ["Adobe Illustrator", "| Adobe Photoshop"],
    year: "",
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
