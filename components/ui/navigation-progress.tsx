"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export function NavigationProgress() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const navigatingRef = useRef(false)
  const intervalRef = useRef<number | null>(null)

  const clearProgressInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startProgress = useCallback(() => {
    if (navigatingRef.current) return

    navigatingRef.current = true
    setVisible(true)
    setProgress(12)
    clearProgressInterval()

    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev
        return Math.min(prev + Math.random() * 12, 90)
      })
    }, 180)
  }, [clearProgressInterval])

  const completeProgress = useCallback(() => {
    clearProgressInterval()
    setVisible(true)
    setProgress(100)

    window.setTimeout(() => {
      setVisible(false)
      setProgress(0)
      navigatingRef.current = false
    }, 220)
  }, [clearProgressInterval])

  useEffect(() => {
    completeProgress()

    const handleBeforeUnload = () => {
      setVisible(true)
      setProgress(95)
    }

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target as HTMLElement | null
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null
      if (!anchor) return
      if (anchor.target && anchor.target !== "_self") return
      if (anchor.hasAttribute("download")) return
      if (anchor.getAttribute("rel")?.includes("external")) return

      const href = anchor.getAttribute("href")
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return

      const destination = new URL(anchor.href, window.location.href)
      const current = new URL(window.location.href)

      if (destination.origin !== current.origin) return

      const isHashOnlyOnSamePage =
        destination.pathname === current.pathname &&
        destination.search === current.search &&
        destination.hash !== current.hash

      if (isHashOnlyOnSamePage || destination.href === current.href) return

      event.preventDefault()
      event.stopPropagation()

      startProgress()
      window.setTimeout(() => {
        window.location.assign(destination.toString())
      }, 80)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    document.addEventListener("click", handleClick, true)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
      document.removeEventListener("click", handleClick, true)
      clearProgressInterval()
    }
  }, [clearProgressInterval, completeProgress, startProgress])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-1 w-full origin-left bg-brand transition-transform duration-150 ease-out"
      style={{
        transform: `scaleX(${Math.max(progress, 0) / 100})`,
        opacity: visible ? 1 : 0,
      }}
    />
  )
}
