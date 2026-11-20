import { profile } from "@/lib/data"
import { cn } from "@/lib/utils"

type IdBadgeProps = {
  className?: string
}

const barcode = [
  2, 1, 3, 1, 2, 2, 1, 3, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 3,
  1, 2, 2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 2, 3, 1,
]

export default function IdBadge({ className }: IdBadgeProps) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[300px]", className)}>
      <div className="relative overflow-hidden border border-line bg-panel">
        <div className="absolute left-1/2 top-3 h-1.5 w-14 -translate-x-1/2 rounded-full border border-wire bg-ink" />

        <div className="flex items-center justify-between border-b border-line px-4 pb-2 pt-7">
          <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-dim">
            ENIT / ACCESS
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-signal-strong">
            <i className="led" aria-hidden="true" />
            Active
          </span>
        </div>

        <div className="p-4">
          <div className="relative overflow-hidden border border-line bg-ink">
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(56, 189, 248, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.08) 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
              aria-hidden="true"
            />
            <div className="absolute left-2 top-2 h-3 w-3 border-l border-t border-signal" aria-hidden="true" />
            <div className="absolute right-2 top-2 h-3 w-3 border-r border-t border-signal" aria-hidden="true" />
            <div className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-signal" aria-hidden="true" />
            <div className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-signal" aria-hidden="true" />
            <div className="relative grid h-32 place-items-center">
              <span className="select-none font-sans text-6xl font-medium tracking-[-0.08em] text-silk">
                {profile.initials}
              </span>
              <span className="absolute bottom-3 font-mono text-[7px] uppercase tracking-[0.24em] text-dim">
                Monogram / {profile.board}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <p className="silk text-gold">PERSONNEL FILE</p>
            <h3 className="mt-1 font-sans text-2xl font-medium tracking-[-0.03em] text-silk">
              {profile.name}
            </h3>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-dim">
              AI × Infrastructure
            </p>
          </div>
        </div>

        <dl className="grid grid-cols-2 border-t border-line font-mono text-[8px] uppercase tracking-[0.12em]">
          {[
            ["ID", profile.board],
            ["REV", profile.revision.replace("REV ", "")],
            ["SITE", "TN / UTC+1"],
            ["CLASS", "STUDENT"],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={cn(
                "flex items-center justify-between px-4 py-2",
                index < 2 && "border-b border-line",
                index % 2 === 0 && "border-r border-line",
              )}
            >
              <dt className="text-dim">{label}</dt>
              <dd className="text-silk">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="border-t border-line px-4 py-3">
          <div className="flex h-9 items-end gap-[2px]" aria-hidden="true">
            {barcode.map((width, index) => (
              <span
                key={`${width}-${index}`}
                className="block h-full"
                style={{ width, backgroundColor: "#F8FAFC" }}
              />
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[7px] uppercase tracking-[0.18em] text-dim">
            <span>FB 2026 1105</span>
            <span>Valid / 2027</span>
          </div>
        </div>
      </div>

      <p className="mt-3 text-center font-mono text-[7px] uppercase tracking-[0.2em] text-dim">
        Property of FB Labs · Do not duplicate
      </p>
    </div>
  )
}
