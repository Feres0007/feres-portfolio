import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1500px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        border: "var(--border)",
        input: "var(--border)",
        ring: "var(--signal)",
        background: "var(--sub)",
        foreground: "var(--silk)",
        primary: {
          DEFAULT: "var(--signal)",
          foreground: "var(--on-signal)",
        },
        secondary: {
          DEFAULT: "var(--sub-2)",
          foreground: "var(--silk)",
        },
        destructive: {
          DEFAULT: "#DC2626",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "var(--sub-2)",
          foreground: "var(--dim)",
        },
        accent: {
          DEFAULT: "var(--sub-3)",
          foreground: "var(--silk)",
        },
        popover: {
          DEFAULT: "var(--sub-2)",
          foreground: "var(--silk)",
        },
        card: {
          DEFAULT: "var(--sub-2)",
          foreground: "var(--silk)",
        },
        ink: "var(--sub)",
        panel: "var(--sub-2)",
        panel2: "var(--sub-3)",
        line: "var(--border)",
        trace: "var(--trace)",
        wire: "var(--wire)",
        gold: "var(--gold)",
        signal: "var(--signal)",
        "signal-strong": "var(--signal-strong)",
        "on-signal": "var(--on-signal)",
        silk: "var(--silk)",
        dim: "var(--dim)",
        led: "var(--led)",
        chip: "var(--chip-fg)",
      },
      borderRadius: {
        lg: "4px",
        md: "2px",
        sm: "1px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        led: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(234,88,12,.45)" },
          "50%": { opacity: ".55", boxShadow: "0 0 10px 2px rgba(234,88,12,.18)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        traceFlow: {
          "0%": { strokeDashoffset: "24" },
          "100%": { strokeDashoffset: "0" },
        },
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        led: "led 2.4s ease-in-out infinite",
        scan: "scan 9s linear infinite",
        traceFlow: "traceFlow 1.4s linear infinite",
        blink: "blink 1.1s step-end infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
