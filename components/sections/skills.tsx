import { skillBanks } from "@/lib/data"
import SectionHeading from "@/components/lab/section-heading"
import Reveal from "@/components/lab/reveal"
import PinBank from "@/components/lab/pin-bank"

const pinTotal = skillBanks.reduce((total, bank) => total + bank.pins.length, 0)

export default function Skills() {
  return (
    <section id="skills" className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32 xl:pr-24">
        <SectionHeading
          index="02"
          eyebrow="Component banks"
          title={
            <>
              A stack that
              <br />
              <span className="outline-text">connects.</span>
            </>
          }
          description="Seven banks covering languages, AI systems, deployment tooling, cloud infrastructure and network foundations used across internships and projects."
          aside={
            <div className="border-l border-line pl-4 font-mono">
              <p className="text-3xl leading-none tracking-[-0.04em] text-silk">
                {pinTotal}
              </p>
              <p className="mt-2 text-[8px] uppercase leading-relaxed tracking-[0.14em] text-dim">
                pins across
                <br />
                {skillBanks.length} component banks
              </p>
            </div>
          }
        />

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {skillBanks.map((bank, index) => (
            <Reveal key={bank.code} delay={(index % 3) * 0.05} y={16}>
              <PinBank bank={bank} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6 flex flex-wrap items-center justify-between gap-3 border border-line bg-panel px-5 py-4">
          <div className="flex items-center gap-5 font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
            <span className="inline-flex items-center gap-2">
              <i className="led" aria-hidden="true" />
              Active focus
            </span>
            <span className="inline-flex items-center gap-2">
              <i className="h-1.5 w-1.5 rounded-full bg-wire" aria-hidden="true" />
              Supporting skill
            </span>
          </div>
          <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-dim">
            Pins reflect coursework, internships and project work.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
