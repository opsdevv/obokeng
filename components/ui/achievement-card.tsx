"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface AchievementCardProps {
  icon: string
  title: string
  description?: string
}

export default function AchievementCard({ icon, title, description }: AchievementCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="bg-[#1c1c1c] border border-[#2e2e2e] rounded-lg p-6 hover:border-[#3a3f42] transition-colors group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <h3 className="text-base font-semibold text-[#ecedee] group-hover:text-brand transition-colors">{title}</h3>
          {description && <p className="text-sm text-[#9ba1a6] mt-1">{description}</p>}
        </div>
      </div>
    </div>
  )
}
