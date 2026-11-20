import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

import "./globals.css"
import { profile } from "@/lib/data"
import Navigation from "@/components/layout/navigation"
import Footer from "@/components/layout/footer"
import BootScreen from "@/components/layout/boot-screen"
import ScrollRail from "@/components/layout/scroll-rail"
import Crosshair from "@/components/layout/crosshair"
import { Toaster } from "@/components/ui/toaster"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

const title = `${profile.name} — AI × Infrastructure`

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  keywords: [
    "Feres Boubakri",
    "AI engineer",
    "RAG",
    "MLOps",
    "GenAI",
    "Telecommunications",
    "ENIT",
    "cloud infrastructure",
    "network engineering",
    "Tunisia",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: `${profile.name} — Portfolio`,
    title,
    description: profile.tagline,
    images: ["/opengraph-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.tagline,
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#0e1116",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="scanlines font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-signal focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-silk"
        >
          Skip to content
        </a>

        <BootScreen />
        <Crosshair />
        <Navigation />
        <ScrollRail />

        {children}

        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
