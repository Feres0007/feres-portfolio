"use client"

import { useState, type MouseEvent } from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Project } from "@/lib/data"
import ProjectDialog from "@/components/lab/project-dialog"
import ProjectVisual from "@/components/lab/project-visual"

type ProjectCardProps = {
  project: Project
  className?: string
}

export default function ProjectCard({ project, className }: ProjectCardProps) {
  const [open, setOpen] = useState(false)

  function handleMove(event: MouseEvent<HTMLElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const target = event.currentTarget
    const rect = target.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    target.style.setProperty("--mx", `${px * 100}%`)
    target.style.setProperty("--my", `${py * 100}%`)
    target.style.transform = `perspective(1200px) rotateX(${(0.5 - py) * 3}deg) rotateY(${(px - 0.5) * 3}deg)`
  }

  function handleLeave(event: MouseEvent<HTMLElement>) {
    const target = event.currentTarget
    target.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg)"
  }

  return (
    <article
      className={cn(
        "bracket panel group relative h-full overflow-hidden transition-colors hover:border-signal",
        className,
      )}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      <span className="tilt-sheen" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative z-10 flex h-full w-full flex-col text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-signal"
        aria-haspopup="dialog"
        aria-label={`Open datasheet for ${project.title}`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
              {project.index}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-dim">
              {project.category}
            </span>
          </div>
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-dim">
            {project.period}
          </span>
        </div>

        <ProjectVisual
          type={project.visual}
          className="border-x-0 border-t-0"
        />

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-sans text-2xl font-medium leading-tight tracking-[-0.035em] text-silk">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-dim">{project.summary}</p>

          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <div className="min-w-0">
              <p className="truncate font-mono text-[9px] uppercase tracking-[0.12em] text-dim">
                {project.stack.slice(0, 3).join(" · ")}
              </p>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.14em] text-gold">
                {project.context}
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-silk transition-colors group-hover:text-signal-strong">
              Datasheet
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>
        </div>
      </button>

      <ProjectDialog project={project} open={open} onOpenChange={setOpen} />
    </article>
  )
}
