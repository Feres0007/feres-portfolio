import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import Reveal from "@/components/lab/reveal"

type SectionHeadingProps = {
  index: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  aside?: ReactNode
  className?: string
}

export default function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  aside,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-14 border-b border-line pb-6 md:mb-20", className)}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.18em] text-gold">
              ({index})
            </span>
            <span className="silk silk-w">{eyebrow}</span>
            <span className="h-px w-10 bg-line" />
          </div>
          <h2 className="display section-title mt-4 text-silk">
            {title}
          </h2>
        </div>
        {aside ? (
          <div className="max-w-[18rem] text-left md:text-right">{aside}</div>
        ) : null}
      </div>
      {description ? (
        <div className="mt-5 max-w-3xl text-base leading-relaxed text-dim md:text-lg">
          {description}
        </div>
      ) : null}
    </Reveal>
  )
}
