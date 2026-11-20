import { ArrowUpRight } from "lucide-react"
import { experience, mailtoLink } from "@/lib/data"
import SectionHeading from "@/components/lab/section-heading"
import Reveal from "@/components/lab/reveal"

export default function Experience() {
  return (
    <section id="experience" className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32 xl:pr-24">
        <SectionHeading
          index="03"
          eyebrow="Work log"
          title={
            <>
              Field
              <br />
              <span className="outline-text">experience.</span>
            </>
          }
          description="Two internships between applied AI and telecommunications operations — one focused on document-grounded retrieval, one inside a national telecom operator."
          aside={
            <div className="border-l border-line pl-4 font-mono">
              <p className="text-3xl leading-none tracking-[-0.04em] text-silk">
                02
              </p>
              <p className="mt-2 text-[8px] uppercase leading-relaxed tracking-[0.14em] text-dim">
                positions
                <br />
                2025 — 2026
              </p>
            </div>
          }
        />

        <div className="relative">
          <span
            className="absolute bottom-2 left-[5px] top-2 w-px bg-line"
            aria-hidden="true"
          />

          <div className="space-y-4">
            {experience.map((entry, index) => {
              const requestHref = mailtoLink(
                `Tunisie Telecom internship — details request`,
                "Hi Feres,\n\nCould you share the technical scope of your Tunisie Telecom internship?\n",
              )

              return (
                <Reveal key={entry.company} delay={index * 0.08}>
                  <article className="relative pl-8 md:pl-10">
                    <span
                      className="absolute left-0 top-7 h-2.5 w-2.5 rounded-full border border-signal bg-ink shadow-[0_0_10px_rgba(0,255,157,0.35)]"
                      aria-hidden="true"
                    />

                    <div className="bracket panel p-6">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[8px] uppercase tracking-[0.14em]">
                        <span className="text-gold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-silk">{entry.period}</span>
                        <span className="h-1 w-1 rounded-full bg-wire" aria-hidden="true" />
                        <span className="text-dim">{entry.location}</span>
                        <span className="ml-auto inline-flex items-center gap-2 text-signal">
                          <i className="led" aria-hidden="true" />
                          {entry.status}
                        </span>
                      </div>

                      <h3 className="mt-4 font-sans text-2xl font-medium leading-tight tracking-[-0.03em] text-silk md:text-3xl">
                        {entry.role}
                      </h3>
                      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-signal">
                        {entry.company}
                      </p>

                      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-dim">
                        {entry.summary}
                      </p>

                      {entry.bullets.length ? (
                        <ul className="mt-5 space-y-2.5">
                          {entry.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-3 text-sm leading-relaxed text-silk"
                            >
                              <span
                                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
                                aria-hidden="true"
                              />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="mt-5 border-l border-wire pl-4">
                          <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-dim">
                            Detailed missions and technical scope are available
                            on request.
                          </p>
                          <a
                            href={requestHref}
                            className="mt-2 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-silk transition-colors hover:text-signal"
                          >
                            Request details
                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                          </a>
                        </div>
                      )}

                      <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                        {entry.stack.map((tag) => (
                          <span
                            key={tag}
                            className="border border-line bg-ink px-2 py-1 font-mono text-[9px] text-dim"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
