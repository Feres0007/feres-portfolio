import { stats } from "@/lib/data"
import { cn } from "@/lib/utils"

import Reveal from "@/components/lab/reveal"

type StatGridProps = {
  className?: string
}

export default function StatGrid({ className }: StatGridProps) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4",
        className,
      )}
    >
      {stats.map((stat, index) => (
        <Reveal key={stat.label} delay={index * 0.05} y={12}>
          <div className="h-full bg-ink p-4">
            <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
              {stat.label}
            </dt>
            <dd className="mt-2 font-mono text-3xl tracking-[-0.04em] text-silk">
              {stat.value}
            </dd>
            <dd className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-dim">
              {stat.note}
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  )
}
