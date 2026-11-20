"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export default function Oscilloscope({ className }: { className?: string }) {
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
    let frame = 0
    let running = true

    function resize() {
      const rect = element.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      element.width = Math.floor(width * dpr)
      element.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function draw(time: number) {
      if (!width || !height) return
      ctx.clearRect(0, 0, width, height)

      ctx.strokeStyle = "rgba(41, 52, 61, 0.55)"
      ctx.lineWidth = 0.5
      for (let x = 0; x < width; x += 24) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += 16) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      ctx.strokeStyle = "rgba(0, 255, 157, 0.16)"
      ctx.beginPath()
      ctx.moveTo(0, height / 2)
      ctx.lineTo(width, height / 2)
      ctx.stroke()

      const mid = height / 2
      const amp = height * 0.22

      ctx.beginPath()
      ctx.strokeStyle = "rgba(0, 255, 157, 0.9)"
      ctx.lineWidth = 1.3
      for (let x = 0; x <= width; x += 2) {
        const y =
          mid +
          Math.sin(x * 0.055 + time * 0.0024) * amp +
          Math.sin(x * 0.017 + time * 0.0011) * amp * 0.36
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      ctx.beginPath()
      ctx.strokeStyle = "rgba(0, 229, 255, 0.65)"
      ctx.lineWidth = 1
      for (let x = 0; x <= width; x += 2) {
        const y =
          mid +
          Math.sin(x * 0.032 - time * 0.0017) * amp * 0.58 +
          Math.sin(x * 0.09 + time * 0.0008) * amp * 0.15
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      const scanX = (time * 0.08) % width
      const gradient = ctx.createLinearGradient(scanX - 30, 0, scanX, 0)
      gradient.addColorStop(0, "rgba(0, 255, 157, 0)")
      gradient.addColorStop(1, "rgba(0, 255, 157, 0.16)")
      ctx.fillStyle = gradient
      ctx.fillRect(scanX - 30, 0, 30, height)
    }

    function animate(time: number) {
      if (!running) return
      draw(time)
      frame = window.requestAnimationFrame(animate)
    }

    function onVisibilityChange() {
      running = !document.hidden
      if (running) frame = window.requestAnimationFrame(animate)
      else window.cancelAnimationFrame(frame)
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

    document.addEventListener("visibilitychange", onVisibilityChange)

    return () => {
      running = false
      window.cancelAnimationFrame(frame)
      observer.disconnect()
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
