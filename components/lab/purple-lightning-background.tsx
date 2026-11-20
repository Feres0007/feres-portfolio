"use client"

import { useEffect, useRef } from "react"

// Algorithmic inspiration:
// - chaseleantj/js-lightning-effect (recursive branching)
// - Kitolochi/frontend-craft (midpoint displacement)
// Original implementation for this project.

type Point = { x: number; y: number }

type BoltNode = {
  points: Point[]
  width: number
  alpha: number
  branches: BoltNode[]
}

type BoltTree = {
  trunk: BoltNode
  origin: Point
  maxY: number
}

const CONFIG = {
  desktop: {
    minInterval: 3000,
    maxInterval: 8000,
    dpr: 2,
    branchMin: 2,
    branchMax: 4,
    subdivisions: 6,
    branchDepth: 3,
    skipOuterGlow: false,
  },
  mobile: {
    minInterval: 5000,
    maxInterval: 10000,
    dpr: 1.5,
    branchMin: 2,
    branchMax: 3,
    subdivisions: 5,
    branchDepth: 2,
    skipOuterGlow: true,
  },
  revealMin: 60,
  revealMax: 140,
  flashMin: 200,
  flashMax: 500,
  fadeMin: 120,
  fadeMax: 260,
  pulsesMin: 2,
  pulsesMax: 4,
  secondBoltChance: 0.3,
  roughness: 0.24,
} as const

const PARTICLES = [
  { x: 7, y: 12, size: 2, delay: 3, duration: 18, blue: false },
  { x: 19, y: 68, size: 1.5, delay: 7, duration: 22, blue: true },
  { x: 28, y: 34, size: 2, delay: 11, duration: 20, blue: false },
  { x: 36, y: 82, size: 1, delay: 5, duration: 16, blue: false },
  { x: 44, y: 22, size: 2, delay: 13, duration: 24, blue: true },
  { x: 52, y: 58, size: 1.5, delay: 2, duration: 19, blue: false },
  { x: 61, y: 40, size: 1, delay: 9, duration: 17, blue: false },
  { x: 69, y: 76, size: 2, delay: 6, duration: 23, blue: true },
  { x: 77, y: 18, size: 1.5, delay: 14, duration: 21, blue: false },
  { x: 84, y: 52, size: 2, delay: 4, duration: 20, blue: false },
  { x: 91, y: 86, size: 1, delay: 10, duration: 18, blue: true },
  { x: 13, y: 92, size: 1.5, delay: 8, duration: 22, blue: false },
  { x: 47, y: 8, size: 1, delay: 12, duration: 16, blue: false },
  { x: 73, y: 95, size: 1.5, delay: 1, duration: 24, blue: true },
] as const

function random(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function clampPoint(point: Point, width: number, height: number): Point {
  return {
    x: clamp(point.x, -12, width + 12),
    y: clamp(point.y, -32, height * 0.92),
  }
}

/** Recursive midpoint displacement: produces an irregular, natural path. */
function midpointPath(
  a: Point,
  b: Point,
  roughness: number,
  depth: number,
): Point[] {
  if (depth <= 0) return [a, b]

  const dx = b.x - a.x
  const dy = b.y - a.y
  const length = Math.max(Math.hypot(dx, dy), 1)
  const offset = (Math.random() - 0.5) * roughness * length
  const mid: Point = {
    x: (a.x + b.x) / 2 + (-dy / length) * offset,
    y: (a.y + b.y) / 2 + (dx / length) * offset,
  }

  const left = midpointPath(a, mid, roughness * 0.72, depth - 1)
  const right = midpointPath(mid, b, roughness * 0.72, depth - 1)
  return [...left.slice(0, -1), ...right]
}

function createBranch(
  origin: Point,
  length: number,
  direction: number,
  depth: number,
  baseWidth: number,
  width: number,
  height: number,
): BoltNode {
  const angle = Math.PI / 2 + direction * random(0.32, 1.0)
  const rawEnd: Point = {
    x: origin.x + Math.cos(angle) * length,
    y: origin.y + Math.sin(angle) * length,
  }
  const end = clampPoint(rawEnd, width, height)
  const points = midpointPath(
    origin,
    end,
    CONFIG.roughness * 0.82,
    depth,
  ).map((point) => clampPoint(point, width, height))

  const branches: BoltNode[] = []
  if (depth > 1 && Math.random() < 0.55) {
    const branchOrigin = points[Math.floor(points.length * 0.6)]
    branches.push(
      createBranch(
        branchOrigin,
        length * random(0.3, 0.5),
        -direction,
        depth - 1,
        baseWidth * 0.6,
        width,
        height,
      ),
    )
  }

  return {
    points,
    width: baseWidth,
    alpha: random(0.45, 0.7),
    branches,
  }
}

function maxTreeY(node: BoltNode): number {
  let max = 0
  for (const point of node.points) {
    if (point.y > max) max = point.y
  }
  for (const branch of node.branches) {
    max = Math.max(max, maxTreeY(branch))
  }
  return max
}

function createBolt(width: number, height: number, mobile: boolean): BoltTree {
  const cfg = mobile ? CONFIG.mobile : CONFIG.desktop

  const start: Point =
    Math.random() < 0.8
      ? { x: random(0.12, 0.88) * width, y: random(-28, 8) }
      : {
          x:
            (Math.random() < 0.5
              ? random(0.02, 0.12)
              : random(0.88, 0.98)) * width,
          y: random(0.02, 0.26) * height,
        }

  const target: Point = {
    x: clamp(
      start.x + (Math.random() - 0.5) * width * 0.34,
      width * 0.08,
      width * 0.92,
    ),
    y: height * random(0.45, 0.76),
  }

  const points = midpointPath(
    start,
    target,
    CONFIG.roughness,
    cfg.subdivisions,
  ).map((point) => clampPoint(point, width, height))

  const trunk: BoltNode = { points, width: 1, alpha: 1, branches: [] }
  const branchCount = Math.floor(random(cfg.branchMin, cfg.branchMax + 1))

  for (let index = 0; index < branchCount; index += 1) {
    const originIndex = Math.floor(points.length * random(0.2, 0.72))
    const origin = points[originIndex]
    const remaining = Math.max(60, target.y - origin.y)
    trunk.branches.push(
      createBranch(
        origin,
        remaining * random(0.28, 0.55),
        Math.random() < 0.5 ? 1 : -1,
        cfg.branchDepth,
        random(0.42, 0.62),
        width,
        height,
      ),
    )
  }

  return { trunk, origin: start, maxY: maxTreeY(trunk) }
}

function tracePath(ctx: CanvasRenderingContext2D, points: Point[]) {
  if (points.length < 2) return
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let index = 1; index < points.length; index += 1) {
    ctx.lineTo(points[index].x, points[index].y)
  }
}

/** Multi-layer glow. Called once per strike onto the offscreen canvas. */
function renderNode(
  ctx: CanvasRenderingContext2D,
  node: BoltNode,
  skipOuterGlow: boolean,
) {
  const passes = [
    {
      color: `rgba(99, 102, 241, ${0.13 * node.alpha})`,
      width: 8 * node.width,
      blur: 30,
      glow: "rgba(139, 92, 246, 0.9)",
    },
    {
      color: `rgba(139, 92, 246, ${0.3 * node.alpha})`,
      width: 4.5 * node.width,
      blur: 20,
      glow: "rgba(139, 92, 246, 0.9)",
    },
    {
      color: `rgba(168, 85, 247, ${0.72 * node.alpha})`,
      width: 2.3 * node.width,
      blur: 13,
      glow: "rgba(168, 85, 247, 0.9)",
    },
    {
      color: `rgba(192, 132, 252, ${0.88 * node.alpha})`,
      width: 1.15 * node.width,
      blur: 8,
      glow: "rgba(192, 132, 252, 0.9)",
    },
    {
      color: `rgba(243, 232, 255, ${0.95 * node.alpha})`,
      width: 0.6 * node.width,
      blur: 5,
      glow: "rgba(243, 232, 255, 0.9)",
    },
  ]

  passes.forEach((pass, index) => {
    if (skipOuterGlow && index === 0) return
    tracePath(ctx, node.points)
    ctx.strokeStyle = pass.color
    ctx.lineWidth = Math.max(0.35, pass.width)
    ctx.shadowBlur = pass.blur
    ctx.shadowColor = pass.glow
    ctx.stroke()
  })

  for (const branch of node.branches) {
    renderNode(ctx, branch, skipOuterGlow)
  }
}

function pointAtY(points: Point[], y: number): Point {
  if (!points.length) return { x: 0, y }
  for (let index = 1; index < points.length; index += 1) {
    const a = points[index - 1]
    const b = points[index]
    if (b.y >= y || index === points.length - 1) {
      const span = b.y - a.y
      const t = span === 0 ? 0 : clamp((y - a.y) / span, 0, 1)
      return {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
      }
    }
  }
  return points[points.length - 1]
}

export default function PurpleLightningBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return

    const context = canvasEl.getContext("2d")
    if (!context) return

    const canvas: HTMLCanvasElement = canvasEl
    const ctx: CanvasRenderingContext2D = context

    const offscreen = document.createElement("canvas")
    const offscreenContext = offscreen.getContext("2d")
    if (!offscreenContext) return
    const offCtx: CanvasRenderingContext2D = offscreenContext

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reducedMotion = motionQuery.matches

    let width = 0
    let height = 0
    let ratio = 1
    let idleTimer = 0
    let raf = 0
    let resizeTimer = 0

    let strikeStart = 0
    let revealDuration = 120
    let flashDuration = 350
    let fadeDuration = 180
    let pulses = 3
    let origin: Point = { x: 0, y: 0 }
    let maxY = 0
    let trunkPoints: Point[] = []

    const isMobile = () => window.innerWidth < 768
    const config = () => (isMobile() ? CONFIG.mobile : CONFIG.desktop)

    function clear() {
      ctx.clearRect(0, 0, width, height)
    }

    function stop() {
      window.cancelAnimationFrame(raf)
      window.clearTimeout(idleTimer)
      raf = 0
      idleTimer = 0
      if (width && height) clear()
    }

    function schedule() {
      window.clearTimeout(idleTimer)
      if (reducedMotion || document.hidden || !width || !height) return
      const cfg = config()
      idleTimer = window.setTimeout(startStrike, random(cfg.minInterval, cfg.maxInterval))
    }

    function resize() {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return

      width = rect.width
      height = rect.height
      ratio = Math.min(window.devicePixelRatio || 1, config().dpr)

      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)

      offscreen.width = canvas.width
      offscreen.height = canvas.height
      offCtx.setTransform(ratio, 0, 0, ratio, 0, 0)

      clear()
      schedule()
    }

    function drawAmbient(alpha: number) {
      const centerY = clamp((origin.y + maxY) / 2, 0, height)
      const radius = Math.max(width, height) * 0.55
      const glow = ctx.createRadialGradient(
        origin.x,
        centerY,
        0,
        origin.x,
        centerY,
        radius,
      )
      glow.addColorStop(0, `rgba(139, 92, 246, ${0.12 * alpha})`)
      glow.addColorStop(0.45, `rgba(99, 102, 241, ${0.05 * alpha})`)
      glow.addColorStop(1, "rgba(139, 92, 246, 0)")

      ctx.save()
      ctx.globalCompositeOperation = "lighter"
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = `rgba(168, 85, 247, ${0.03 * alpha})`
      ctx.fillRect(0, 0, width, height)
      ctx.restore()
    }

    function drawLeader(y: number, alpha: number) {
      const point = pointAtY(trunkPoints, y)
      const radius = Math.max(26, Math.min(width, height) * 0.06)
      const glow = ctx.createRadialGradient(
        point.x,
        point.y,
        0,
        point.x,
        point.y,
        radius,
      )
      glow.addColorStop(0, `rgba(243, 232, 255, ${0.5 * alpha})`)
      glow.addColorStop(0.35, `rgba(192, 132, 252, ${0.24 * alpha})`)
      glow.addColorStop(1, "rgba(139, 92, 246, 0)")

      ctx.save()
      ctx.globalCompositeOperation = "lighter"
      ctx.fillStyle = glow
      ctx.fillRect(point.x - radius, point.y - radius, radius * 2, radius * 2)
      ctx.beginPath()
      ctx.arc(point.x, point.y, 1.6, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(243, 232, 255, ${0.8 * alpha})`
      ctx.fill()
      ctx.restore()
    }

    function drawFrame(alpha: number, revealProgress: number, revealY: number) {
      if (!width || !height) return
      clear()

      ctx.save()
      ctx.globalAlpha = clamp(alpha, 0, 1)
      ctx.drawImage(offscreen, 0, 0, width, height)

      if (revealProgress < 1) {
        ctx.globalCompositeOperation = "destination-in"
        const topStop = clamp((revealY - 90) / height, 0, 1)
        const bottomStop = clamp((revealY + 50) / height, 0.001, 1)
        const mask = ctx.createLinearGradient(0, 0, 0, height)
        mask.addColorStop(0, "rgba(0, 0, 0, 1)")
        mask.addColorStop(topStop, "rgba(0, 0, 0, 1)")
        mask.addColorStop(bottomStop, "rgba(0, 0, 0, 0)")
        mask.addColorStop(1, "rgba(0, 0, 0, 0)")
        ctx.fillStyle = mask
        ctx.fillRect(0, 0, width, height)
      }
      ctx.restore()

      if (revealProgress < 1) drawLeader(revealY, alpha)
      drawAmbient(alpha)
    }

    function frame(now: number) {
      const elapsed = now - strikeStart
      if (elapsed >= flashDuration) {
        clear()
        schedule()
        return
      }

      const progress = elapsed / flashDuration
      const revealProgress = clamp(elapsed / revealDuration, 0, 1)
      const easedReveal = 1 - Math.pow(1 - revealProgress, 3)
      const revealY = origin.y + (maxY - origin.y) * easedReveal

      const fadeStart = flashDuration - fadeDuration
      const envelope =
        elapsed < fadeStart ? 1 : clamp(1 - (elapsed - fadeStart) / fadeDuration, 0, 1)
      const flicker = 0.58 + 0.42 * Math.abs(Math.sin(progress * Math.PI * pulses))
      const attack = clamp(elapsed / 28, 0, 1)
      const alpha = envelope * flicker * attack

      drawFrame(alpha, revealProgress, revealY)
      raf = window.requestAnimationFrame(frame)
    }

    function startStrike() {
      if (reducedMotion || document.hidden || !width || !height) return

      const mobile = isMobile()
      const cfg = config()
      const bolt = createBolt(width, height, mobile)
      const secondary =
        !mobile && Math.random() < CONFIG.secondBoltChance
          ? createBolt(width, height, false)
          : null

      offCtx.clearRect(0, 0, width, height)
      offCtx.save()
      offCtx.globalCompositeOperation = "lighter"
      offCtx.lineCap = "round"
      offCtx.lineJoin = "round"
      renderNode(offCtx, bolt.trunk, cfg.skipOuterGlow)
      if (secondary) {
        offCtx.globalAlpha = 0.5
        renderNode(offCtx, secondary.trunk, true)
      }
      offCtx.restore()

      origin = bolt.origin
      maxY = bolt.maxY
      trunkPoints = bolt.trunk.points

      revealDuration = random(CONFIG.revealMin, CONFIG.revealMax)
      flashDuration = random(CONFIG.flashMin, CONFIG.flashMax)
      const availableFade = Math.max(60, flashDuration - revealDuration)
      fadeDuration = Math.min(random(CONFIG.fadeMin, CONFIG.fadeMax), availableFade)
      pulses = Math.floor(random(CONFIG.pulsesMin, CONFIG.pulsesMax + 1))
      strikeStart = performance.now()

      raf = window.requestAnimationFrame(frame)
    }

    function onVisibilityChange() {
      if (document.hidden) stop()
      else schedule()
    }

    function onMotionChange() {
      reducedMotion = motionQuery.matches
      if (reducedMotion) stop()
      else schedule()
    }

    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 120)
    })
    resizeObserver.observe(canvas)

    document.addEventListener("visibilitychange", onVisibilityChange)
    motionQuery.addEventListener("change", onMotionChange)

    resize()

    return () => {
      stop()
      window.clearTimeout(resizeTimer)
      resizeObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      motionQuery.removeEventListener("change", onMotionChange)
    }
  }, [])

  return (
    <div className="purple-atmosphere" aria-hidden="true">
      <div className="purple-atmosphere__cloud purple-atmosphere__cloud--one" />
      <div className="purple-atmosphere__cloud purple-atmosphere__cloud--two" />
      <div className="purple-atmosphere__cloud purple-atmosphere__cloud--three" />
      <div className="purple-atmosphere__particles">
        {PARTICLES.map((particle, index) => (
          <span
            key={index}
            className={
              particle.blue
                ? "purple-particle purple-particle--blue"
                : "purple-particle"
            }
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `-${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>
      <canvas ref={canvasRef} className="purple-atmosphere__canvas" />
    </div>
  )
}
