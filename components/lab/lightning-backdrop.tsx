"use client"

import { useEffect, useRef } from "react"

type Point = { x: number; y: number }

/**
 * Builds an irregular lightning bolt plus a few smaller branches.
 * The main bolt starts near the top of the canvas and travels downwards.
 */
function createBolt(width: number, height: number, branchCount: number): Point[][] {
  const startX = width * (0.18 + Math.random() * 0.64)
  const drift = (Math.random() - 0.5) * width * 0.34
  const segments = 16 + Math.floor(Math.random() * 8)
  const endY = height * (0.45 + Math.random() * 0.35)

  const main: Point[] = []
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments
    const taper = 1 - Math.abs(t - 0.5) * 0.5
    const jitter = (Math.random() - 0.5) * width * 0.055 * taper
    main.push({
      x: startX + drift * t + jitter,
      y: endY * t,
    })
  }

  const paths: Point[][] = [main]

  for (let b = 0; b < branchCount; b += 1) {
    const originIndex = Math.floor(main.length * (0.25 + Math.random() * 0.5))
    const origin = main[originIndex]
    const direction = Math.random() > 0.5 ? 1 : -1
    const steps = 4 + Math.floor(Math.random() * 5)

    let x = origin.x
    let y = origin.y
    const branch: Point[] = [{ x, y }]

    for (let i = 0; i < steps; i += 1) {
      x += direction * (12 + Math.random() * 26)
      y += 8 + Math.random() * 18
      branch.push({ x, y })
    }

    paths.push(branch)
  }

  return paths
}

function tracePath(ctx: CanvasRenderingContext2D, path: Point[]) {
  ctx.beginPath()
  path.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y)
    else ctx.lineTo(point.x, point.y)
  })
}

function drawBolt(
  ctx: CanvasRenderingContext2D,
  paths: Point[][],
  strength: number,
  width: number,
  height: number,
) {
  ctx.save()
  ctx.globalCompositeOperation = "lighter"
  ctx.lineCap = "round"
  ctx.lineJoin = "round"

  paths.forEach((path, index) => {
    const weight = index === 0 ? 1 : 0.55

    tracePath(ctx, path)
    ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 * strength * weight})`
    ctx.lineWidth = index === 0 ? 8 : 4
    ctx.shadowBlur = 28
    ctx.shadowColor = "rgba(139, 92, 246, 0.9)"
    ctx.stroke()

    tracePath(ctx, path)
    ctx.strokeStyle = `rgba(168, 85, 247, ${0.72 * strength * weight})`
    ctx.lineWidth = index === 0 ? 2.4 : 1.4
    ctx.shadowBlur = 14
    ctx.stroke()

    tracePath(ctx, path)
    ctx.strokeStyle = `rgba(248, 250, 252, ${0.92 * strength * weight})`
    ctx.lineWidth = index === 0 ? 1 : 0.7
    ctx.shadowBlur = 8
    ctx.shadowColor = "rgba(192, 132, 252, 0.9)"
    ctx.stroke()
  })

  const main = paths[0]
  const middle = main[Math.floor(main.length / 2)]
  const radius = Math.max(width, height) * 0.28
  const glow = ctx.createRadialGradient(
    middle.x,
    middle.y,
    0,
    middle.x,
    middle.y,
    radius,
  )
  glow.addColorStop(0, `rgba(168, 85, 247, ${0.16 * strength})`)
  glow.addColorStop(1, "rgba(168, 85, 247, 0)")
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, width, height)

  ctx.restore()
}

export default function LightningBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return

    const context = canvasEl.getContext("2d")
    if (!context) return

    const canvas: HTMLCanvasElement = canvasEl
    const ctx: CanvasRenderingContext2D = context

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reducedMotion = motionQuery.matches

    let width = 0
    let height = 0
    let raf = 0
    let idleTimer = 0
    let visible = true
    let onScreen = true

    const isMobile = () => window.innerWidth < 768

    function resize() {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      width = rect.width
      height = rect.height
      const ratio = Math.min(window.devicePixelRatio || 1, isMobile() ? 1.5 : 2)
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    function clear() {
      ctx.clearRect(0, 0, width, height)
    }

    function stop() {
      window.cancelAnimationFrame(raf)
      window.clearTimeout(idleTimer)
      if (width && height) clear()
    }

    function flash() {
      if (!width || !height) return

      const branchCount = isMobile() ? 2 : 3
      const paths = createBolt(width, height, branchCount)
      const duration = 200 + Math.random() * 300
      const pulses = 2 + Math.floor(Math.random() * 3)
      const started = performance.now()

      function frame(now: number) {
        const t = (now - started) / duration
        if (t >= 1) {
          clear()
          schedule()
          return
        }

        const pulse = Math.abs(Math.sin(t * Math.PI * pulses))
        const strength = Math.pow(1 - t, 1.4) * pulse
        clear()
        drawBolt(ctx, paths, strength, width, height)
        raf = window.requestAnimationFrame(frame)
      }

      raf = window.requestAnimationFrame(frame)
    }

    function schedule() {
      window.clearTimeout(idleTimer)
      if (reducedMotion || !visible || !onScreen) return
      idleTimer = window.setTimeout(flash, 3000 + Math.random() * 5000)
    }

    function onVisibilityChange() {
      visible = !document.hidden
      if (visible) schedule()
      else stop()
    }

    function onMotionChange() {
      reducedMotion = motionQuery.matches
      if (reducedMotion) stop()
      else schedule()
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas)

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        if (onScreen) schedule()
        else stop()
      },
      { threshold: 0 },
    )
    intersectionObserver.observe(canvas)

    document.addEventListener("visibilitychange", onVisibilityChange)
    motionQuery.addEventListener("change", onMotionChange)

    resize()
    if (!reducedMotion) schedule()

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      motionQuery.removeEventListener("change", onMotionChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      aria-hidden="true"
    />
  )
}
