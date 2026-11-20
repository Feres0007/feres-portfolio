"use client"

import { useEffect, useState } from "react"

function formatTime() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Tunis",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date())
}

export default function LocalClock({ className }: { className?: string }) {
  const [time, setTime] = useState("--:--:--")

  useEffect(() => {
    setTime(formatTime())
    const interval = window.setInterval(() => setTime(formatTime()), 1000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <span className={className} suppressHydrationWarning>
      {time} TN
    </span>
  )
}
