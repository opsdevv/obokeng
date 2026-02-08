"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface GlowMenuItem {
  name: string
  href: string
  description?: string
}

interface GlowMenuProps {
  items: GlowMenuItem[]
  className?: string
}

export function GlowMenu({ items, className }: GlowMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const pathname = usePathname()

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center gap-0.5 p-1 rounded-lg bg-[#1c1c1c] border border-[#2e2e2e]">
        {items.map((item, index) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href)
          const isHovered = hoveredIndex === index
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                "text-[#9ba1a6] hover:text-[#ecedee]",
                (isActive || isHovered) && "text-[#ecedee]"
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {(isHovered || isActive) && (
                <div className="absolute inset-0 rounded-md bg-[#26292b] border border-[#313538]" />
              )}
              <span className="relative z-10">{item.name}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-brand rounded-full" />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
