"use client"

import { navItems } from "@/lib/data"
import { useActiveSection } from "@/hooks/use-active-section"
import { cn } from "@/lib/utils"

const sectionIds = navItems.map((item) => item.id)

export default function ScrollRail() {
  const active = useActiveSection(sectionIds)

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 xl:flex"
    >
      {navItems.map((item) => {
        const isActive = active === item.id
        return (
          <a
            key={item.id}
            href={item.href}
            className="group flex items-center justify-end gap-2"
            aria-current={isActive ? "true" : undefined}
          >
            <span className="pointer-events-none max-w-0 overflow-hidden whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.16em] text-dim opacity-0 transition-all duration-200 group-hover:max-w-[90px] group-hover:opacity-100">
              {item.label}
            </span>
            <span className="font-mono text-[8px] text-dim">{item.code}</span>
            <span
              className={cn(
                "h-px transition-all duration-300",
                isActive
                  ? "w-7 bg-signal shadow-[0_0_8px_rgba(0,255,157,0.4)]"
                  : "w-3 bg-wire group-hover:w-5 group-hover:bg-signal",
              )}
              aria-hidden="true"
            />
          </a>
        )
      })}
    </nav>
  )
}
