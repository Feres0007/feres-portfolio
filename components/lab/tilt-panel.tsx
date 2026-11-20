"use client"

import { useRef, type MouseEvent, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type TiltPanelProps = {
  children: ReactNode
  className?: string
  intensity?: number
}

export default function TiltPanel({
  children,
  className,
  intensity = 7,
}: TiltPanelProps) {
  const ref = useRef<HTMLDivElement>(null)

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    const element = ref.current
    if (!element) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const rect = element.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height

    element.style.setProperty("--mx", `${px * 100}%`)
    element.style.setProperty("--my", `${py * 100}%`)
    element.style.transform = `rotateX(${(0.5 - py) * intensity}deg) rotateY(${
      (px - 0.5) * intensity
    }deg)`
  }

  function handleLeave() {
    const element = ref.current
    if (!element) return
    element.style.transform = "rotateX(0deg) rotateY(0deg)"
    element.style.setProperty("--mx", "50%")
    element.style.setProperty("--my", "50%")
  }

  return (
    <div className={cn("tilt-stage", className)}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="tilt relative h-full"
      >
        <span className="tilt-sheen" aria-hidden="true" />
        {children}
      </div>
    </div>
  )
}
