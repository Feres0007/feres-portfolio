import { profile } from "@/lib/data"
import SectionHeading from "@/components/lab/section-heading"
import Reveal from "@/components/lab/reveal"
import SystemDiagram from "@/components/lab/system-diagram"

const glance = [
  ["Focus", "AI · RAG · MLOps"],
  ["Secondary", "Networks · Cloud · Security"],
  ["Education", "ENIT · Telecommunications"],
  ["Programme", "I3C · 2024—2027"],
  ["Based in", profile.location],
  ["Languages", "Arabic · French · English"],
]

const principles = [
  {
    title: "Traceable",
    body: "Answers carry their sources. Missing information is stated, never guessed.",
  },
  {
    title: "Measured",
    body: "Validation sets and error metrics come before claims. RMSE, routing accuracy, response time.",
  },
  {
    title: "Reproducible",
    body: "Containers, configuration and documented steps — so a pipeline can run again without its author.",
  },
]

export default function About() {
  return (
    <section id="about" className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32 xl:pr-24">
        <SectionHeading
          index="01"
          eyebrow="System overview"
          title={
            <>
              Grounded AI,
              <br />
              <span className="outline-text">reliable systems.</span>
            </>
          }
          description={
            <>
              <p>{profile.about}</p>
              <p className="mt-4">
                The through-line is reliability: a model is only useful when its
                answers can be traced, its errors measured, and its deployment
                repeated.
              </p>
            </>
          }
          aside={
            <div className="border-l border-line pl-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-gold">
                ENIT / 0x2027
              </p>
              <p className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-dim">
                Telecommunications engineering
                <br />
                I3C — converged infrastructures
              </p>
              <p className="mt-3 inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-signal-strong">
                <i className="led" aria-hidden="true" />
                {profile.availabilityDetail}
              </p>
            </div>
          }
        />

        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-4">
            <Reveal>
              <div className="panel p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                  At a glance
                </p>
                <dl className="mt-4 divide-y divide-line border-t border-line">
                  {glance.map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3"
                    >
                      <dt className="w-24 shrink-0 font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
                        {label}
                      </dt>
                      <dd className="text-sm text-silk">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <div className="grid gap-px bg-line sm:grid-cols-3">
              {principles.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 0.06} y={14}>
                  <div className="h-full bg-ink p-5">
                    <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-gold">
                      0{index + 1}
                    </span>
                    <h3 className="mt-3 font-sans text-base font-medium text-silk">
                      {principle.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-dim">
                      {principle.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-dim">
                  System map / U1—U5
                </span>
                <span className="inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-signal-strong">
                  <i className="led" aria-hidden="true" />
                  Nominal
                </span>
              </div>
              <div className="p-3 sm:p-4">
                <SystemDiagram />
              </div>
            </div>
            <p className="mt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
              FIG. 01 — Academic, internship and community subsystems mapped to
              one profile.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
