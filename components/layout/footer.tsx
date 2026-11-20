import { ArrowUp, ArrowUpRight, Mail } from "lucide-react"
import { navItems, profile } from "@/lib/data"
import LocalClock from "@/components/lab/local-clock"

const socialEntries = Object.entries(profile.socials).filter(
  ([, href]) => Boolean(href),
)

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div className="relative overflow-hidden border-b border-line py-7">
        <div className="marquee flex w-max items-center gap-10 whitespace-nowrap" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className="flex items-center gap-10">
              <span className="outline-text display text-5xl md:text-7xl">
                FERES BOUBAKRI
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-dim">
                AI × INFRASTRUCTURE
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1500px] gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative grid h-9 w-9 place-items-center border border-wire bg-panel2 font-mono text-[10px] text-silk">
              {profile.initials}
              <span className="absolute -right-[2px] -top-[2px] h-1 w-1 rounded-full bg-signal" />
            </span>
            <div>
              <p className="text-sm font-medium text-silk">{profile.name}</p>
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-dim">
                {profile.board} / {profile.revision}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-dim">
            Document-grounded AI, predictive pipelines and the infrastructure
            that keeps them running.
          </p>
          <p className="mt-5 font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-dim">
            Next.js · TypeScript · Tailwind CSS · Framer Motion
          </p>
        </div>

        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
            Index
          </p>
          <nav aria-label="Footer" className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-dim transition-colors hover:text-silk"
              >
                <span className="text-[7px]">{item.code}</span>
                {item.label}
                <ArrowUpRight className="ml-auto h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
            Contact
          </p>
          <div className="mt-4 space-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-start gap-2 text-sm text-silk transition-colors hover:text-signal"
            >
              <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-dim" aria-hidden="true" />
              <span className="break-all">{profile.email}</span>
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="block font-mono text-[10px] tracking-[0.08em] text-dim transition-colors hover:text-silk"
            >
              {profile.phone}
            </a>
            <p className="font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-dim">
              {profile.location} · {profile.availability}
            </p>
          </div>

          {socialEntries.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {socialEntries.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-line bg-panel px-3 py-2 font-mono text-[8px] uppercase tracking-[0.14em] text-silk transition-colors hover:border-signal hover:text-signal"
                >
                  {label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex w-full max-w-[1500px] flex-wrap items-center justify-between gap-3 px-5 py-4 font-mono text-[8px] uppercase tracking-[0.14em] text-dim lg:px-10">
          <span>© {year} {profile.name}</span>
          <span className="flex items-center gap-2">
            <i className="led" aria-hidden="true" />
            Open to internships / AI · GenAI · MLOps
          </span>
          <span className="flex items-center gap-4">
            <LocalClock />
            <a
              href="#home"
              className="inline-flex items-center gap-1.5 text-silk transition-colors hover:text-signal"
            >
              Top
              <ArrowUp className="h-3 w-3" aria-hidden="true" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
