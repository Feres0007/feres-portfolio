"use client"

import { useEffect, useRef } from "react"

// Research inspiration:
// - kitlangton/psychopomp (stepped leader, return strokes, re-strikes)
// - LOSXinfinity/Zenitsu (fractal bolt + corona/sheath/core rendering)
// - diwsi/Javascript-Lightning-Effect (MIT, simple canvas lightning experiment)
// Original implementation for this project.

type Point = { x: number; y: number }
type Rng = () => number

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

type PhaseKind = "leader" | "gap" | "stroke" | "afterglow"

type Phase = {
  start: number
  end: number
  kind: PhaseKind
  intensity: number
  tree: BoltTree
}

const CONFIG = {
  desktop: {
    minInterval: 4000,
    maxInterval: 9000,
    dpr: 2,
    branchMin: 3,
    branchMax: 6,
    subdivisions: 6,
    branchDepth: 4,
    skipOuterGlow: false,
    scale: 1.2,
  },
  mobile: {
    minInterval: 6000,
    maxInterval: 11000,
    dpr: 1.5,
    branchMin: 2,
    branchMax: 4,
    subdivisions: 5,
    branchDepth: 3,
    skipOuterGlow: true,
    scale: 1.05,
  },
  roughness: 0.27,
  leaderDuration: 110,
  gapDuration: 20,
  strokeDuration: 240,
  afterglowDuration: 260,
  strokeIntensities: [1, 0.9, 0.8],
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

function mulberry32(seed: number): Rng {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function random(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function rand(rng: Rng, min: number, max: number) {
  return min + rng() * (max - min)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function clampPoint(point: Point, width: number, height: number): Point {
  return {
    x: clamp(point.x, -20, width + 20),
    y: clamp(point.y, -80, height * 0.94),
  }
}

/** Recursive midpoint displacement: produces an irregular, natural path. */
function midpointPath(
  a: Point,
  b: Point,
  roughness: number,
  depth: number,
  rng: Rng,
): Point[] {
  if (depth <= 0) return [a, b]

  const dx = b.x - a.x
  const dy = b.y - a.y
  const length = Math.max(Math.hypot(dx, dy), 1)
  const offset = (rng() - 0.5) * roughness * length
  const mid: Point = {
    x: (a.x + b.x) / 2 + (-dy / length) * offset,
    y: (a.y + b.y) / 2 + (dx / length) * offset,
  }

  const left = midpointPath(a, mid, roughness * 0.72, depth - 1, rng)
  const right = midpointPath(mid, b, roughness * 0.72, depth - 1, rng)
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
  rng: Rng,
): BoltNode {
  const angle = Math.PI / 2 + direction * rand(rng, 0.32, 1.0)
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
    rng,
  ).map((point) => clampPoint(point, width, height))

  const branches: BoltNode[] = []
  if (depth > 1 && rng() < 0.55) {
    const branchOrigin = points[Math.floor(points.length * 0.6)]
    branches.push(
      createBranch(
        branchOrigin,
        length * rand(rng, 0.3, 0.5),
        -direction,
        depth - 1,
        baseWidth * 0.6,
        width,
        height,
        rng,
      ),
    )
  }

  return {
    points,
    width: baseWidth,
    alpha: rand(rng, 0.45, 0.7),
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

function createBolt(
  width: number,
  height: number,
  mobile: boolean,
  rng: Rng,
): BoltTree {
  const cfg = mobile ? CONFIG.mobile : CONFIG.desktop

  const start: Point =
    rng() < 0.8
      ? { x: rand(rng, 0.08, 0.92) * width, y: rand(rng, -70, -10) }
      : {
          x:
            (rng() < 0.5
              ? rand(rng, 0.02, 0.12)
              : rand(rng, 0.88, 0.98)) * width,
          y: rand(rng, 0.02, 0.26) * height,
        }

  const target: Point = {
    x: clamp(
      start.x + (rng() - 0.5) * width * 0.76,
      width * 0.04,
      width * 0.96,
    ),
    y: height * rand(rng, 0.65, 0.9),
  }

  const points = midpointPath(
    start,
    target,
    CONFIG.roughness,
    cfg.subdivisions,
    rng,
  ).map((point) => clampPoint(point, width, height))

  const trunk: BoltNode = { points, width: 1, alpha: 1, branches: [] }
  const branchCount = Math.floor(rand(rng, cfg.branchMin, cfg.branchMax + 1))

  for (let index = 0; index < branchCount; index += 1) {
    const originIndex = Math.floor(points.length * rand(rng, 0.15, 0.8))
    const origin = points[originIndex]
    const remaining = Math.max(60, target.y - origin.y)
    trunk.branches.push(
      createBranch(
        origin,
        remaining * rand(rng, 0.38, 0.65),
        rng() < 0.5 ? 1 : -1,
        cfg.branchDepth,
        rand(rng, 0.42, 0.62),
        width,
        height,
        rng,
      ),
    )
  }

  return { trunk, origin: start, maxY: maxTreeY(trunk) }
}

/** Re-rolls fine detail while keeping the same coarse channel. */
function refineTree(
  base: BoltTree,
  width: number,
  height: number,
  detailSeed: number,
): BoltTree {
  const rng = mulberry32(detailSeed)
  const jitter = Math.min(width, height) * 0.012

  function refineNode(node: BoltNode): BoltNode {
    const last = node.points.length - 1
    const points = node.points.map((point, index) => {
      if (index === 0 || index === last) return point
      return clampPoint(
        {
          x: point.x + (rng() - 0.5) * jitter,
          y: point.y + (rng() - 0.5) * jitter * 0.7,
        },
        width,
        height,
      )
    })

    return {
      points,
      width: node.width,
      alpha: clamp(node.alpha * rand(rng, 0.85, 1.15), 0.25, 1),
      branches: node.branches.map(refineNode),
    }
  }

  const trunk = refineNode(base.trunk)
  return {
    trunk,
    origin: base.origin,
    maxY: maxTreeY(trunk),
  }
}

function tracePath(ctx: CanvasRenderingContext2D, points: Point[]) {
  if (points.length < 2) return
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let index = 1; index < points.length; index += 1) {
    ctx.lineTo(points[index].x, points[index].y)
  }
}

/** Multi-layer glow. Called once per phase onto the offscreen canvas. */
function renderNode(
  ctx: CanvasRenderingContext2D,
  node: BoltNode,
  skipOuterGlow: boolean,
  scale: number,
) {
  const passes = [
    {
      color: `rgba(99, 102, 241, ${0.13 * node.alpha})`,
      width: 8 * node.width * scale,
      blur: 30 * scale,
      glow: "rgba(139, 92, 246, 0.9)",
    },
    {
      color: `rgba(139, 92, 246, ${0.3 * node.alpha})`,
      width: 4.5 * node.width * scale,
      blur: 20 * scale,
      glow: "rgba(139, 92, 246, 0.9)",
    },
    {
      color: `rgba(168, 85, 247, ${0.72 * node.alpha})`,
      width: 2.3 * node.width * scale,
      blur: 13 * scale,
      glow: "rgba(168, 85, 247, 0.9)",
    },
    {
      color: `rgba(192, 132, 252, ${0.88 * node.alpha})`,
      width: 1.15 * node.width * scale,
      blur: 8 * scale,
      glow: "rgba(192, 132, 252, 0.9)",
    },
    {
      color: `rgba(243, 232, 255, ${0.95 * node.alpha})`,
      width: 0.6 * node.width * scale,
      blur: 5 * scale,
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
    renderNode(ctx, branch, skipOuterGlow, scale)
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

    let flashDuration = 0
    let strikeStart = 0
    let phases: Phase[] = []
    let activePhase = -1
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
      activePhase = -1
      if (width && height) clear()
    }

    function schedule() {
      window.clearTimeout(idleTimer)
      if (reducedMotion || document.hidden || !width || !height) return
      const cfg = config()
      idleTimer = window.setTimeout(startStrike, random(cfg.minInterval, cfg.maxInterval))
    }

    function resize() {
      stop()
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

    function buildPhases(base: BoltTree, seed: number) {
      const list: Phase[] = []
      let cursor = 0

      list.push({
        start: cursor,
        end: cursor + CONFIG.leaderDuration,
        kind: "leader",
        intensity: 0.45,
        tree: base,
      })
      cursor += CONFIG.leaderDuration

      list.push({
        start: cursor,
        end: cursor + CONFIG.gapDuration,
        kind: "gap",
        intensity: 0.05,
        tree: base,
      })
      cursor += CONFIG.gapDuration

      CONFIG.strokeIntensities.forEach((intensity, index) => {
        const tree = refineTree(base, width, height, seed + (index + 1) * 7919)
        list.push({
          start: cursor,
          end: cursor + CONFIG.strokeDuration,
          kind: "stroke",
          intensity,
          tree,
        })
        cursor += CONFIG.strokeDuration

        if (index < CONFIG.strokeIntensities.length - 1) {
          list.push({
            start: cursor,
            end: cursor + CONFIG.gapDuration,
            kind: "gap",
            intensity: 0.05,
            tree,
          })
          cursor += CONFIG.gapDuration
        }
      })

      list.push({
        start: cursor,
        end: cursor + CONFIG.afterglowDuration,
        kind: "afterglow",
        intensity: 0.45,
        tree: base,
      })
      cursor += CONFIG.afterglowDuration

      phases = list
      flashDuration = cursor
    }

    function renderPhase(phase: Phase) {
      offCtx.clearRect(0, 0, width, height)
      offCtx.save()
      offCtx.globalCompositeOperation = "lighter"
      offCtx.lineCap = "round"
      offCtx.lineJoin = "round"

      if (phase.kind !== "gap") {
        const cfg = config()
        renderNode(
          offCtx,
          phase.tree.trunk,
          phase.kind === "leader" ? true : cfg.skipOuterGlow,
          cfg.scale,
        )
      }
      offCtx.restore()

      origin = phase.tree.origin
      maxY = phase.tree.maxY
      trunkPoints = phase.tree.trunk.points
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
      const radius = Math.max(34, Math.min(width, height) * 0.085)
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

    function drawFrame(
      alpha: number,
      revealProgress: number,
      showLeader: boolean,
      ambientAlpha: number,
    ) {
      if (!width || !height) return
      clear()

      const easedReveal = 1 - Math.pow(1 - revealProgress, 3)
      const revealY = origin.y + (maxY - origin.y) * easedReveal

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

      if (showLeader) drawLeader(revealY, alpha)
      drawAmbient(ambientAlpha)
    }

    function frame(now: number) {
      const elapsed = now - strikeStart
      if (elapsed >= flashDuration) {
        clear()
        schedule()
        return
      }

      let index = phases.findIndex((phase) => elapsed >= phase.start && elapsed < phase.end)
      if (index < 0) index = phases.length - 1

      if (index !== activePhase) {
        activePhase = index
        renderPhase(phases[index])
      }

      const phase = phases[index]
      const phaseElapsed = elapsed - phase.start
      const local = clamp(phaseElapsed / (phase.end - phase.start), 0, 1)

      let alpha = 0
      let revealProgress = 1
      let showLeader = false
      let ambientAlpha = 0

      if (phase.kind === "leader") {
        alpha = phase.intensity * (0.55 + 0.45 * local)
        revealProgress = local
        showLeader = true
        ambientAlpha = alpha
      } else if (phase.kind === "gap") {
        ambientAlpha = phase.intensity
      } else if (phase.kind === "stroke") {
        const attack = clamp(phaseElapsed / 18, 0, 1)
        const decay = 1 - 0.12 * local
        const flicker = 0.9 + 0.1 * Math.abs(Math.sin(local * Math.PI * 2))
        alpha = phase.intensity * decay * flicker * attack
        ambientAlpha = alpha
      } else {
        alpha = phase.intensity * Math.pow(1 - local, 0.65)
        ambientAlpha = alpha
      }

      drawFrame(alpha, revealProgress, showLeader, ambientAlpha)
      raf = window.requestAnimationFrame(frame)
    }

    function startStrike() {
      if (reducedMotion || document.hidden || !width || !height) return

      const seed = Math.floor(Math.random() * 0xffffffff)
      const base = createBolt(width, height, isMobile(), mulberry32(seed))
      buildPhases(base, seed)
      strikeStart = performance.now()
      activePhase = -1

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
