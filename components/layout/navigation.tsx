"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { navItems, profile } from "@/lib/data"
import { useActiveSection } from "@/hooks/use-active-section"
import LocalClock from "@/components/lab/local-clock"
import { cn } from "@/lib/utils"

const sectionIds = navItems.map((item) => item.id)

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })

  useEffect(() => {
    if (!open) return
    const previous = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.documentElement.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-[rgba(9,9,15,0.92)] backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1500px] items-center justify-between gap-4 px-5 lg:px-10">
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="group flex shrink-0 items-center gap-3"
          aria-label="Feres Boubakri — back to top"
        >
          <span className="relative grid h-8 w-8 place-items-center border border-wire bg-panel2 font-mono text-[10px] tracking-[0.1em] text-silk transition-colors group-hover:border-signal group-hover:text-signal-strong">
            {profile.initials}
            <span className="absolute -right-[2px] -top-[2px] h-1 w-1 rounded-full bg-signal shadow-[0_0_8px_rgba(56, 189, 248,0.6)]" />
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-medium leading-tight tracking-[-0.02em] text-silk">
              {profile.name}
            </span>
            <span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.18em] text-dim">
              AI × Infrastructure
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center xl:flex">
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group relative flex h-16 items-center gap-1.5 px-2.5 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors",
                  isActive ? "text-signal-strong" : "text-dim hover:text-silk",
                )}
              >
                <span className="text-[7px] text-dim">{item.code}</span>
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-2 bottom-0 h-px bg-signal transition-opacity",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                  aria-hidden="true"
                />
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-dim 2xl:flex">
            <i className="led" aria-hidden="true" />
            {profile.availabilityDetail}
          </span>
          <a
            href="#contact"
            className="hidden h-9 items-center gap-2 border border-signal bg-signal px-4 font-mono text-[9px] uppercase tracking-[0.14em] text-on-signal transition-colors hover:bg-transparent hover:text-signal-strong sm:inline-flex"
          >
            Let&apos;s talk
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-9 w-9 place-items-center border border-line text-silk transition-colors hover:border-signal hover:text-signal-strong xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <motion.div
        style={{ scaleX: progress }}
        className="h-px origin-left bg-signal"
        aria-hidden="true"
      />

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full h-[calc(100svh-4rem)] overflow-y-auto overscroll-contain border-t border-line bg-ink xl:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto max-w-[1500px] px-5 py-5">
              <div className="grid gap-px bg-line sm:grid-cols-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between gap-4 bg-ink px-4 py-3.5 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors hover:bg-panel",
                      active === item.id ? "text-signal-strong" : "text-silk",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-[8px] text-dim">{item.code}</span>
                      {item.label}
                    </span>
                    <span
                      className={cn(
                        "h-1 w-1 rounded-full",
                        active === item.id ? "bg-signal" : "bg-border",
                      )}
                      aria-hidden="true"
                    />
                  </a>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-silk transition-colors hover:text-signal-strong"
                >
                  {profile.email}
                </a>
                <LocalClock />
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
