"use client"

import { useState, type FormEvent, type ReactNode } from "react"
import {
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react"
import { mailtoLink, profile } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"
import SectionHeading from "@/components/lab/section-heading"
import Reveal from "@/components/lab/reveal"
import CopyButton from "@/components/lab/copy-button"

const socialEntries = Object.entries(profile.socials).filter(
  ([, href]) => Boolean(href),
)

function InfoItem({
  icon,
  label,
  children,
}: {
  icon: ReactNode
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-start gap-4 border-b border-line py-4 last:border-b-0">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center border border-line bg-panel2 text-dim">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-dim">
          {label}
        </p>
        <div className="mt-1.5 text-sm text-silk">{children}</div>
      </div>
    </div>
  )
}

export default function Contact() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [emailUser, emailDomain] = profile.email.split("@")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const subject = `Portfolio contact — ${name || "New message"}`
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message,
    ].join("\n")

    toast({
      title: "Opening your mail app",
      description: "The message is prepared in your default email client.",
    })

    window.location.href = mailtoLink(subject, body)
  }

  return (
    <section id="contact" className="relative border-t border-line">
      <div className="mx-auto w-full max-w-[1500px] px-5 py-24 lg:px-10 lg:py-32 xl:pr-24">
        <SectionHeading
          index="07"
          eyebrow="Open channel"
          title={
            <>
              Start a
              <br />
              <span className="outline-text">signal.</span>
            </>
          }
          description="Internships, research collaborations or a technical conversation — email is the fastest route. The form prepares a message in your own mail client."
          aside={
            <div className="border-l border-line pl-4">
              <p className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-signal-strong">
                <i className="led" aria-hidden="true" />
                Open to opportunities
              </p>
              <p className="mt-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-dim">
                AI · GenAI · MLOps
                <br />
                Tunisia · Remote
              </p>
            </div>
          }
        />

        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="panel h-full p-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                Direct channels
              </p>

              <div className="mt-4 border-t border-line">
                <InfoItem icon={<Mail className="h-3.5 w-3.5" />} label="Email">
                  <div className="flex items-start justify-between gap-3">
                    <a
                      href={`mailto:${profile.email}`}
                      className="break-words transition-colors hover:text-signal-strong"
                    >
                      {emailUser}@<wbr />
                      {emailDomain}
                    </a>
                    <CopyButton
                      value={profile.email}
                      label="Email address"
                      className="grid h-8 w-8 shrink-0 place-items-center border border-line text-dim transition-colors hover:border-signal hover:text-signal-strong"
                    />
                  </div>
                </InfoItem>

                <InfoItem icon={<Phone className="h-3.5 w-3.5" />} label="Phone">
                  <div className="flex items-center justify-between gap-3">
                    <a
                      href={`tel:${profile.phone.replace(/\s/g, "")}`}
                      className="font-mono text-[13px] tracking-[0.05em] transition-colors hover:text-signal-strong"
                    >
                      {profile.phone}
                    </a>
                    <CopyButton
                      value={profile.phone}
                      label="Phone number"
                      className="grid h-8 w-8 shrink-0 place-items-center border border-line text-dim transition-colors hover:border-signal hover:text-signal-strong"
                    />
                  </div>
                </InfoItem>

                <InfoItem icon={<MapPin className="h-3.5 w-3.5" />} label="Location">
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em]">
                    {profile.location} · UTC+1
                  </p>
                </InfoItem>

                <InfoItem
                  icon={<ShieldCheck className="h-3.5 w-3.5" />}
                  label="Availability"
                >
                  <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-signal-strong">
                    <i className="led" aria-hidden="true" />
                    {profile.availability}
                  </p>
                </InfoItem>
              </div>

              {socialEntries.length ? (
                <div className="mt-6 border-t border-line pt-4">
                  <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-dim">
                    Elsewhere
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {socialEntries.map(([label, href]) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 border border-line bg-panel2 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-silk transition-colors hover:border-signal hover:text-signal-strong"
                      >
                        {label}
                        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={handleSubmit}
              className="panel h-full p-6"
              aria-label="Compose an email"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold">
                  Compose transmission
                </p>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-dim">
                  No server · mailto
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="font-mono text-[8px] uppercase tracking-[0.16em] text-dim"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    autoComplete="name"
                    className="contact-input mt-2"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="font-mono text-[8px] uppercase tracking-[0.16em] text-dim"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    autoComplete="email"
                    className="contact-input mt-2"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="contact-message"
                  className="font-mono text-[8px] uppercase tracking-[0.16em] text-dim"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                  rows={7}
                  className="contact-input mt-2 h-auto min-h-40 resize-y py-3 leading-relaxed"
                  placeholder="What are you building, and where could I help?"
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                <p className="max-w-xs font-mono text-[8px] uppercase leading-relaxed tracking-[0.1em] text-dim">
                  Opens your email client with the message prefilled. Nothing is
                  stored on this site.
                </p>
                <button type="submit" className="btn btn-primary">
                  <Send className="h-3.5 w-3.5" aria-hidden="true" />
                  Prepare email
                </button>
              </div>

              <div className="mt-5 flex items-start gap-2 border border-line bg-ink px-3 py-2.5">
                <Check className="mt-0.5 h-3 w-3 shrink-0 text-signal-strong" aria-hidden="true" />
                <p className="font-mono text-[8px] uppercase leading-relaxed tracking-[0.1em] text-dim">
                  Prefer direct email? Use{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-silk underline decoration-wire underline-offset-2 transition-colors hover:text-signal-strong"
                  >
                    {profile.email}
                  </a>
                  .
                </p>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
