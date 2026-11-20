"use client"

import { useEffect, useRef, useState } from "react"

export default function Crosshair() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const finePointer = window.matchMedia("(pointer: fine)").matches
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (finePointer && !reduceMotion) setEnabled(true)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const element = ref.current
    if (!element) return

    const position = { x: -100, y: -100 }
    const target = { x: -100, y: -100 }
    let frame = 0

    function onPointerMove(event: PointerEvent) {
      target.x = event.clientX
      target.y = event.clientY
      if (element) element.style.opacity = "1"
    }

    function onPointerLeave() {
      if (element) element.style.opacity = "0"
    }

    function loop() {
      position.x += (target.x - position.x) * 0.2
      position.y += (target.y - position.y) * 0.2
      if (element) {
        element.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`
      }
      frame = window.requestAnimationFrame(loop)
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onPointerLeave)
    frame = window.requestAnimationFrame(loop)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onPointerMove)
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerLeave,
      )
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden opacity-0 transition-opacity duration-300 md:block"
      aria-hidden="true"
    >
      <span className="absolute left-0 top-0 h-3.5 w-px -translate-x-1/2 -translate-y-1/2 bg-signal" />
      <span className="absolute left-0 top-0 h-px w-3.5 -translate-x-1/2 -translate-y-1/2 bg-signal" />
      <span className="absolute left-0 top-0 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-signal" />
      <span className="absolute left-0 top-0 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
    </div>
  )
}
