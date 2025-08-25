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
      className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-teal-500/50 transition-all duration-300 group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div
        className={cn(
          "absolute inset-0 bg-teal-500/10 blur-xl rounded-full scale-0 transition-transform duration-700",
          isHovered && "scale-100",
        )}
      ></div>

      <div className="relative z-10">
        <div className="flex items-start gap-4">
          <div className="text-2xl">{icon}</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-200 group-hover:text-teal-400 transition-colors">{title}</h3>
            {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
