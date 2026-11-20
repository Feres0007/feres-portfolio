"use client"

import { ArrowUpRight, Mail } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import ProjectVisual from "@/components/lab/project-visual"
import { mailtoLink, type Project } from "@/lib/data"

type ProjectDialogProps = {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ProjectDialog({
  project,
  open,
  onOpenChange,
}: ProjectDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92svh] w-[calc(100vw-2rem)] max-w-4xl overflow-y-auto border border-line bg-panel p-0 shadow-2xl sm:rounded-none">
        <header className="border-b border-line bg-panel2 px-6 py-6 pr-14">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.16em]">
            <span className="text-gold">{project.index}</span>
            <span className="h-px w-6 bg-line" />
            <span className="text-dim">{project.category}</span>
            <span className="text-signal-strong">Datasheet</span>
          </div>
          <DialogTitle className="display mt-3 text-3xl text-silk md:text-4xl">
            {project.title}
          </DialogTitle>
          <DialogDescription className="mt-3 max-w-2xl text-sm leading-relaxed text-dim">
            {project.summary}
          </DialogDescription>
        </header>

        <div className="grid md:grid-cols-[1.55fr_1fr]">
          <div className="p-6">
            <ProjectVisual
              type={project.visual}
              className="mb-8 aspect-[16/9]"
            />

            <section>
              <h3 className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                01 / Problem
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-silk">
                {project.problem}
              </p>
            </section>

            <section className="mt-8">
              <h3 className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                02 / Approach
              </h3>
              <ol className="mt-4 space-y-3">
                {project.approach.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="mt-0.5 shrink-0 font-mono text-[9px] text-dim">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="border-l border-line pl-4 text-sm leading-relaxed text-dim">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-8">
              <h3 className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                03 / Outcome
              </h3>
              <ul className="mt-4 space-y-2.5">
                {project.impact.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-silk">
                    <span
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal shadow-[0_0_8px_rgba(234, 88, 12,0.5)]"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="border-t border-line bg-ink p-6 md:border-l md:border-t-0">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
              Record
            </h3>
            <dl className="mt-4 divide-y divide-line border-y border-line font-mono text-[10px] uppercase tracking-[0.08em]">
              {[
                ["Period", project.period],
                ["Context", project.context],
                ["Domain", project.category],
                ["Artifacts", "On request"],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4 py-2.5">
                  <dt className="w-20 shrink-0 text-dim">{label}</dt>
                  <dd className="text-silk">{value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-7 font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
              Stack
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 border border-line bg-panel px-2 py-1.5 font-mono text-[9px] text-silk"
                >
                  <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>

            <h3 className="mt-7 font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
              Access
            </h3>
            <div className="mt-3 space-y-2">
              {project.links.map((link) => {
                const request = !link.href
                const href =
                  link.href ??
                  mailtoLink(`Request: ${project.title}`, `Hi Feres,\n\nI would like to know more about "${project.title}".\n`)

                return (
                  <a
                    key={link.label}
                    href={href}
                    target={request ? undefined : "_blank"}
                    rel={request ? undefined : "noreferrer"}
                    className="group flex items-center justify-between gap-3 border border-line bg-panel px-3 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-silk transition-colors hover:border-signal hover:text-signal-strong"
                  >
                    <span className="flex items-center gap-2">
                      {request ? (
                        <Mail className="h-3 w-3" aria-hidden="true" />
                      ) : (
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      )}
                      {link.label}
                    </span>
                    <span className="text-dim transition-colors group-hover:text-signal-strong">
                      {request ? "Email" : "Open"}
                    </span>
                  </a>
                )
              })}
            </div>

            <p className="mt-6 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-dim">
              Detailed documentation and demo access are shared directly. No metrics shown without a source.
            </p>
          </aside>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-panel2 px-6 py-3 font-mono text-[8px] uppercase tracking-[0.16em] text-dim">
          <span>FB-2026 · {project.index} · Datasheet</span>
          <span>Sheet 1 of 1 · Rev A</span>
        </footer>
      </DialogContent>
    </Dialog>
  )
}
