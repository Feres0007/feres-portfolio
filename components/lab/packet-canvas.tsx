"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  accent: boolean
}

export default function PacketCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return

    const context = canvasEl.getContext("2d")
    if (!context) return

    const element: HTMLCanvasElement = canvasEl
    const ctx: CanvasRenderingContext2D = context
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let width = 0
    let height = 0
    let nodes: Node[] = []
    let frame = 0
    let running = true
    let pointer = { x: -1000, y: -1000, active: false }

    function buildNodes() {
      const area = Math.max(width * height, 1)
      const count = Math.max(26, Math.min(62, Math.round(area / 27000)))
      nodes = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 0.9 + Math.random() * 1.6,
        accent: index % 7 === 0,
      }))
    }

    function resize() {
      const rect = element.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      element.width = Math.floor(width * dpr)
      element.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildNodes()
    }

    function draw(time: number) {
      if (!width || !height) return
      ctx.clearRect(0, 0, width, height)

      const maxDistance = Math.min(170, Math.max(96, width * 0.12))

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.hypot(dx, dy)

          if (distance > maxDistance) continue

          const alpha = (1 - distance / maxDistance) * 0.2
          ctx.beginPath()
          ctx.strokeStyle = `rgba(234, 88, 12, ${alpha})`
          ctx.lineWidth = 0.6
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()

          if ((i + j) % 9 === 0) {
            const progress = (time * 0.000075 + ((i * 13 + j * 7) % 100) / 100) % 1
            const px = a.x + (b.x - a.x) * progress
            const py = a.y + (b.y - a.y) * progress
            ctx.beginPath()
            ctx.fillStyle = "rgba(234, 88, 12, 0.22)"
            ctx.arc(px, py, 4, 0, Math.PI * 2)
            ctx.fill()
            ctx.beginPath()
            ctx.fillStyle = "rgba(234, 88, 12, 0.9)"
            ctx.arc(px, py, 1.25, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      for (const node of nodes) {
        ctx.beginPath()
        ctx.fillStyle = node.accent
          ? "rgba(30, 58, 138, 0.8)"
          : "rgba(234, 88, 12, 0.45)"
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fill()

        if (node.accent) {
          ctx.beginPath()
          ctx.strokeStyle = "rgba(30, 58, 138, 0.25)"
          ctx.lineWidth = 0.6
          ctx.arc(node.x, node.y, node.r + 5, 0, Math.PI * 2)
          ctx.stroke()
        }
      }

      if (pointer.active) {
        const gradient = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          150,
        )
        gradient.addColorStop(0, "rgba(234, 88, 12, 0.065)")
        gradient.addColorStop(1, "rgba(234, 88, 12, 0)")
        ctx.fillStyle = gradient
        ctx.fillRect(pointer.x - 150, pointer.y - 150, 300, 300)
      }
    }

    function animate(time: number) {
      if (!running) return

      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy

        if (node.x < -20) node.x = width + 20
        if (node.x > width + 20) node.x = -20
        if (node.y < -20) node.y = height + 20
        if (node.y > height + 20) node.y = -20
      }

      draw(time)
      frame = window.requestAnimationFrame(animate)
    }

    function onPointerMove(event: PointerEvent) {
      const rect = element.getBoundingClientRect()
      pointer = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        active: true,
      }
    }

    function onPointerLeave() {
      pointer = { x: -1000, y: -1000, active: false }
    }

    function onVisibilityChange() {
      running = !document.hidden
      if (running) {
        frame = window.requestAnimationFrame(animate)
      } else {
        window.cancelAnimationFrame(frame)
      }
    }

    const observer = new ResizeObserver(() => {
      resize()
      if (reduceMotion) draw(0)
    })

    observer.observe(element)
    resize()

    if (reduceMotion) {
      draw(0)
    } else {
      frame = window.requestAnimationFrame(animate)
    }

    element.addEventListener("pointermove", onPointerMove)
    element.addEventListener("pointerleave", onPointerLeave)
    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      running = false
      window.cancelAnimationFrame(frame)
      observer.disconnect()
      element.removeEventListener("pointermove", onPointerMove)
      element.removeEventListener("pointerleave", onPointerLeave)
      document.removeEventListener("visibilitychange", onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    />
  )
}
