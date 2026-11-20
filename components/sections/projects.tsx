"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { projectFilters, projects } from "@/lib/data"
import SectionHeading from "@/components/lab/section-heading"
import ProjectCard from "@/components/lab/project-card"
import { cn } from "@/lib/utils"

const visibleProjects = projects.filter((project) => project.visible)

export default function Projects() {
  const [filter, setFilter] = useState("all")

  const availableFilters = projectFilters.filter(
    (entry) =>
      entry.id === "all" ||
      visibleProjects.some((project) => project.filter.includes(entry.id)),
  )

  const filtered =
    filter === "all"
      ? visibleProjects
      : visibleProjects.filter((project) => project.filter.includes(filter))

  function countFor(id: string) {
    if (id === "all") return visibleProjects.length
    return visibleProjects.filter((project) => project.filter.includes(id))
      .length
  }

  return (
    <section id="projects" className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32 xl:pr-24">
        <SectionHeading
          index="04"
          eyebrow="Project dossier"
          title={
            <>
              Selected
              <br />
              <span className="outline-text">builds.</span>
            </>
          }
          description="Retrieval, predictive maintenance, biomedical signals, distributed architecture, automated cloud deployment and network observability. Open a datasheet for the problem, approach and measured outcome."
          aside={
            <div className="border-l border-line pl-4 font-mono">
              <p className="text-3xl leading-none tracking-[-0.04em] text-silk">
                {String(visibleProjects.length).padStart(2, "0")}
              </p>
              <p className="mt-2 text-[8px] uppercase leading-relaxed tracking-[0.14em] text-dim">
                documented projects
                <br />
                datasheets in place
              </p>
            </div>
          }
        />

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filter projects"
            className="flex flex-wrap gap-1.5"
          >
            {availableFilters.map((entry) => {
              const active = filter === entry.id
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => setFilter(entry.id)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center gap-2 border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] transition-colors",
                    active
                      ? "border-signal bg-signal text-on-signal"
                      : "border-line bg-panel text-dim hover:border-wire hover:text-silk",
                  )}
                >
                  {entry.label}
                  <span
                    className={cn(
                      "text-[7px]",
                      active ? "text-on-signal" : "text-dim",
                    )}
                  >
                    {String(countFor(entry.id)).padStart(2, "0")}
                  </span>
                </button>
              )
            })}
          </div>

          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-dim">
            {String(filtered.length).padStart(2, "0")} /{" "}
            {String(visibleProjects.length).padStart(2, "0")} shown
          </p>
        </div>

        <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border border-line bg-panel px-5 py-4">
          <p className="max-w-xl font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-dim">
            Datasheets open in place. Detailed documentation and demo access are
            shared on request.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-silk transition-colors hover:text-signal-strong"
          >
            Discuss a project
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
