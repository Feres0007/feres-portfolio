import { education } from "@/lib/data"
import SectionHeading from "@/components/lab/section-heading"
import Reveal from "@/components/lab/reveal"

export default function Education() {
  return (
    <section id="education" className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32 xl:pr-24">
        <SectionHeading
          index="05"
          eyebrow="Memory bank"
          title={
            <>
              Training
              <br />
              <span className="outline-text">log.</span>
            </>
          }
          description="Telecommunications engineering at ENIT, built on two years of intensive preparatory classes in mathematics, physics and engineering sciences."
          aside={
            <div className="border-l border-line pl-4 font-mono">
              <p className="text-3xl leading-none tracking-[-0.04em] text-silk">
                0x2027
              </p>
              <p className="mt-2 text-[8px] uppercase leading-relaxed tracking-[0.14em] text-dim">
                expected graduation
                <br />
                ENIT · Tunis
              </p>
            </div>
          }
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {education.map((entry, index) => (
            <Reveal key={entry.school} delay={index * 0.08}>
              <article className="bracket panel h-full">
                <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
                  <div className="flex items-center gap-3 font-mono text-[8px] uppercase tracking-[0.14em]">
                    <span className="text-gold">{entry.address}</span>
                    <span className="h-px w-6 bg-line" aria-hidden="true" />
                    <span className="text-dim">{entry.period}</span>
                  </div>
                  <span className="grid h-7 w-7 place-items-center border border-line font-mono text-[8px] text-dim">
                    0{index + 1}
                  </span>
                </header>

                <div className="p-5">
                  <h3 className="font-sans text-2xl font-medium leading-tight tracking-[-0.03em] text-silk">
                    {entry.school}
                  </h3>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-signal-strong">
                    {entry.degree}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-dim">
                    {entry.detail}
                  </p>

                  <div className="mt-5 border-t border-line pt-4">
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-gold">
                      Coursework highlights
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {entry.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="border border-line bg-ink px-2 py-1 font-mono text-[9px] leading-relaxed text-dim"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
