import { ArrowUpRight } from "lucide-react"
import { languages, leadership, mailtoLink, profile } from "@/lib/data"
import SectionHeading from "@/components/lab/section-heading"
import Reveal from "@/components/lab/reveal"

const tags = ["Visual content", "Social media", "Digital presence", "IT collaboration"]

export default function Leadership() {
  return (
    <section id="leadership" className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32 xl:pr-24">
        <SectionHeading
          index="06"
          eyebrow="Auxiliary circuits"
          title={
            <>
              Beyond the
              <br />
              <span className="outline-text">terminal.</span>
            </>
          }
          description="Community work around visual communication and digital presence, plus the languages used every day across engineering and collaboration."
          aside={
            <div className="border-l border-line pl-4 font-mono">
              <p className="text-3xl leading-none tracking-[-0.04em] text-silk">
                03
              </p>
              <p className="mt-2 text-[8px] uppercase leading-relaxed tracking-[0.14em] text-dim">
                languages
                <br />
                Arabic · French · English
              </p>
            </div>
          }
        />

        <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          <div className="space-y-4">
            {leadership.map((entry, index) => (
              <Reveal key={entry.organisation}>
                <article className="bracket panel relative overflow-hidden p-6">
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 opacity-40"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(0,229,255,0.14), transparent 68%)",
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[8px] uppercase tracking-[0.14em]">
                    <span className="text-gold">
                      ORG / {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-6 bg-line" aria-hidden="true" />
                    <span className="text-dim">{entry.period}</span>
                    <span className="ml-auto inline-flex items-center gap-2 text-signal">
                      <i className="led" aria-hidden="true" />
                      Member
                    </span>
                  </div>

                  <div className="relative mt-5 flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-sans text-2xl font-medium tracking-[-0.03em] text-silk md:text-3xl">
                        {entry.organisation}
                      </h3>
                      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-signal">
                        {entry.role}
                      </p>
                    </div>
                    <span className="grid h-12 w-12 place-items-center border border-wire bg-panel2 font-mono text-sm text-silk">
                      G2
                    </span>
                  </div>

                  <p className="relative mt-4 max-w-2xl text-sm leading-relaxed text-dim">
                    {entry.description}
                  </p>

                  <div className="relative mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-line bg-ink px-2 py-1 font-mono text-[9px] text-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="space-y-4">
            <Reveal delay={0.06}>
              <div className="panel p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                  Languages
                </p>
                <dl className="mt-4 divide-y divide-line border-t border-line">
                  {languages.map((language) => (
                    <div
                      key={language.name}
                      className="flex items-center justify-between gap-4 py-3"
                    >
                      <dt className="text-sm text-silk">{language.name}</dt>
                      <dd className="border border-line bg-ink px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
                        {language.level}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="panel p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                  Currently
                </p>
                <p className="mt-4 text-sm leading-relaxed text-silk">
                  AI &amp; Telecommunications Engineering student at ENIT,
                  specializing in I3C.
                </p>
                <p className="mt-3 inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.14em] text-signal">
                  <i className="led" aria-hidden="true" />
                  {profile.availability}
                </p>
                <div className="mt-5 border-t border-line pt-4">
                  <a
                    href={mailtoLink(
                      "Conversation — Feres Boubakri",
                      "Hi Feres,\n\nI would like to discuss a role or collaboration.\n",
                    )}
                    className="group inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-silk transition-colors hover:text-signal"
                  >
                    Open a conversation
                    <ArrowUpRight
                      className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
