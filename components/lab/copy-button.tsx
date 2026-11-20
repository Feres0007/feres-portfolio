"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type CopyButtonProps = {
  value: string
  label?: string
  className?: string
}

export default function CopyButton({
  value,
  label = "Copy",
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast({
        title: "Copied",
        description: `${label} copied to clipboard.`,
      })
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      toast({
        title: "Copy failed",
        description: "Your browser blocked clipboard access.",
      })
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={className}
      aria-label={`Copy ${label}`}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  )
}
