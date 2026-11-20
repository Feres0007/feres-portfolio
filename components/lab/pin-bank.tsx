import type { SkillBank } from "@/lib/data"
import { cn } from "@/lib/utils"

type PinBankProps = {
  bank: SkillBank
  className?: string
}

export default function PinBank({ bank, className }: PinBankProps) {
  return (
    <article className={cn("bracket panel group relative h-full p-5", className)}>
      <header className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
              BANK {bank.code}
            </span>
            <span className="h-px w-6 bg-line" />
          </div>
          <h3 className="mt-2 font-sans text-xl font-medium tracking-[-0.03em] text-silk">
            {bank.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-dim">{bank.subtitle}</p>
        </div>
        <span className="shrink-0 font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
          {String(bank.pins.length).padStart(2, "0")} pins
        </span>
      </header>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {bank.pins.map((pin) => (
          <span key={pin} className="pin">
            <span className="pad" aria-hidden="true" />
            {pin}
          </span>
        ))}
      </div>
    </article>
  )
}
