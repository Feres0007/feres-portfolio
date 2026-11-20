"use client"

import { motion, useReducedMotion, type Variants } from "framer-motion"
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  FileText,
} from "lucide-react"
import { mailtoLink, profile, stats } from "@/lib/data"
import PacketCanvas from "@/components/lab/packet-canvas"
import Oscilloscope from "@/components/lab/oscilloscope"
import IdBadge from "@/components/lab/id-badge"
import TiltPanel from "@/components/lab/tilt-panel"
import LocalClock from "@/components/lab/local-clock"
import LightningBackdrop from "@/components/lab/lightning-backdrop"

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
}

const cvs = [
  { label: "AI & RAG CV", href: profile.cv.ai },
  { label: "Infrastructure CV", href: profile.cv.infrastructure },
].filter(
  (entry): entry is { label: string; href: string } => Boolean(entry.href),
)

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <PacketCanvas className="opacity-60" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(9,9,15,0.15) 0%, rgba(9,9,15,0.45) 62%, #09090F 100%)",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <LightningBackdrop />
      </div>
      <div
        className="pointer-events-none absolute -right-40 top-1/4 z-0 h-[32rem] w-[32rem] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.10), transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] gap-12 px-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-10 xl:pr-24">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          variants={container}
        >
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[9px] uppercase tracking-[0.14em]"
          >
            <span className="inline-flex items-center gap-2 border border-line bg-panel px-2.5 py-1.5 text-signal-strong">
              <i className="led" aria-hidden="true" />
              {profile.availability}
            </span>
            <span className="text-dim">
              {profile.location} · <LocalClock />
            </span>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-8 font-mono text-[9px] uppercase tracking-[0.2em] text-gold"
          >
            Portfolio / {profile.board} / {profile.revision}
          </motion.p>

          <motion.h1
            variants={item}
            className="display hero-name mt-3"
            aria-label="Feres Boubakri"
          >
            <span className="block text-silk text-glow">FERES</span>
            <span className="outline-text block">BOUBAKRI</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-7 max-w-2xl border-l border-wire pl-5"
          >
            <p className="text-lg leading-snug text-silk md:text-2xl">
              {profile.role}
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-dim md:text-base">
              {profile.tagline}
            </p>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-2.5">
            <a href="#projects" className="btn btn-primary">
              Browse projects
              <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            {cvs.length ? (
              cvs.map((cv) => (
                <a
                  key={cv.label}
                  href={cv.href}
                  download
                  className="btn btn-outline"
                >
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  {cv.label}
                </a>
              ))
            ) : (
              <a
                href={mailtoLink(
                  "CV request — Feres Boubakri",
                  "Hi Feres,\n\nCould you send me your CV?\n",
                )}
                className="btn btn-outline"
              >
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                Request CV
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
            <a href="#contact" className="btn btn-ghost px-0 sm:px-5">
              Contact
            </a>
          </motion.div>

          {!cvs.length ? (
            <motion.p
              variants={item}
              className="mt-3 font-mono text-[8px] uppercase tracking-[0.12em] text-dim"
            >
              AI &amp; RAG and Infrastructure CVs available on request.
            </motion.p>
          ) : null}

          <motion.dl
            variants={item}
            className="mt-11 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-6 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
                  {stat.label}
                </dt>
                <dd className="mt-1.5 font-mono text-2xl leading-none tracking-[-0.03em] text-silk md:text-3xl">
                  {stat.value}
                </dd>
                <dd className="mt-1.5 font-mono text-[7px] uppercase tracking-[0.1em] text-dim">
                  {stat.note}
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:block"
        >
          <TiltPanel>
            <div className="panel relative overflow-hidden p-3">
              <div className="flex items-center justify-between gap-4 px-1.5 pb-2.5">
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-dim">
                  Diagnostics / U1
                </span>
                <span className="inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-signal-strong">
                  <i className="led" aria-hidden="true" />
                  Live signal
                </span>
              </div>

              <div className="border border-line bg-ink">
                <Oscilloscope className="h-24" />
              </div>

              <div className="mt-2 grid grid-cols-3 gap-px bg-line">
                {[
                  ["Routing", ">90%"],
                  ["RUL RMSE", "20.3"],
                  ["Banks", "07"],
                ].map(([label, value]) => (
                  <div key={label} className="bg-ink px-2 py-2.5 text-center">
                    <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-dim">
                      {label}
                    </p>
                    <p className="mt-1 font-mono text-sm text-silk">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <IdBadge className="max-w-[272px]" />
              </div>
            </div>
          </TiltPanel>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[8px] uppercase tracking-[0.22em] text-dim transition-colors hover:text-signal-strong md:flex"
      >
        Scroll
        <ArrowDown className="h-3 w-3 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  )
}
