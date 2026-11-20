"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { profile } from "@/lib/data"

const lines = [
  "MOUNT  /core/ai",
  "LOAD   rag.engine",
  "LINK   cloud.runtime",
  "CHECK  networks",
  "READY  /portfolio",
]

export default function BootScreen() {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    let seen = false
    try {
      seen = window.sessionStorage.getItem("fb-boot") === "1"
    } catch {
      seen = false
    }
    if (seen) return
    try {
      window.sessionStorage.setItem("fb-boot", "1")
    } catch {
      // Storage can be unavailable in private contexts; the boot screen still works.
    }
    setVisible(true)
  }, [reduceMotion])

  useEffect(() => {
    if (!visible) return
    if (step >= lines.length) {
      const timeout = window.setTimeout(() => setVisible(false), 520)
      return () => window.clearTimeout(timeout)
    }
    const timeout = window.setTimeout(
      () => setStep((value) => value + 1),
      step === 0 ? 180 : 150,
    )
    return () => window.clearTimeout(timeout)
  }, [visible, step])

  useEffect(() => {
    if (!visible) return
    const previous = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        setVisible(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.documentElement.style.overflow = previous
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [visible])

  const progress = Math.min(step / lines.length, 1)

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-ink px-5"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42, ease: "easeOut" }}
          role="dialog"
          aria-label="Portfolio boot sequence"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(rgba(139, 92, 246, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.07) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-md border border-line bg-panel">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[8px] uppercase tracking-[0.18em]">
              <span className="text-gold">{profile.board} / BOOT</span>
              <span className="flex items-center gap-2 text-signal-strong">
                <i className="led" aria-hidden="true" />
                Online
              </span>
            </div>

            <div className="p-5">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-dim">
                Personal portfolio / Rev A
              </p>
              <p className="display mt-2 text-3xl text-silk sm:text-4xl">
                FERES BOUBAKRI
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-signal-strong">
                AI × Infrastructure
              </p>

              <div className="mt-6 space-y-1.5 font-mono text-[10px] text-dim">
                {lines.map((line, index) => {
                  const done = index < step
                  return (
                    <div
                      key={line}
                      className="flex items-center justify-between gap-4"
                    >
                      <span className={done ? "text-silk" : "text-dim"}>
                        {line}
                      </span>
                      <span
                        className={
                          done
                            ? "text-signal-strong"
                            : "text-dim opacity-40"
                        }
                      >
                        {done ? "[ OK ]" : "[ .. ]"}
                      </span>
                    </div>
                  )
                })}
                <div className="flex items-center gap-2 pt-1 text-signal-strong">
                  <span aria-hidden="true">&gt;</span>
                  <span className="inline-block h-3 w-1.5 animate-blink bg-signal align-middle" />
                </div>
              </div>

              <div className="mt-5 h-[3px] w-full bg-panel2">
                <motion.div
                  className="h-full bg-signal"
                  animate={{ width: `${progress * 100}%` }}
                  transition={{ ease: "linear", duration: 0.15 }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
                <span>FB-2026 / SYSTEM CHECK</span>
                <button
                  type="button"
                  onClick={() => setVisible(false)}
                  className="text-silk transition-colors hover:text-signal-strong"
                >
                  Skip [Esc]
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
