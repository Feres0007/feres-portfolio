import { subsystems } from "@/lib/data"
import { cn } from "@/lib/utils"

type SystemDiagramProps = {
  className?: string
}

const positions = [
  { x: 24, y: 64 },
  { x: 440, y: 64 },
  { x: 24, y: 340 },
  { x: 440, y: 340 },
]

const traces = [
  "M180 106 H210 V168",
  "M440 106 H410 V168",
  "M180 382 H210 V292",
  "M440 382 H410 V292",
]

const pads = [
  [180, 106],
  [210, 106],
  [210, 168],
  [440, 106],
  [410, 106],
  [410, 168],
  [180, 382],
  [210, 382],
  [210, 292],
  [440, 382],
  [410, 382],
  [410, 292],
]

export default function SystemDiagram({ className }: SystemDiagramProps) {
  const [core, ...units] = subsystems

  return (
    <svg
      viewBox="0 0 620 460"
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label="System map: the AI core connects to networks, education, experience and community subsystems."
    >
      <text
        x="24"
        y="28"
        fill="#8ba39d"
        fontSize="9"
        letterSpacing="1.5"
        fontFamily="var(--font-geist-mono)"
      >
        SHEET 01 / BLOCK DIAGRAM
      </text>
      <text
        x="596"
        y="28"
        fill="#8ba39d"
        fontSize="9"
        letterSpacing="1.5"
        textAnchor="end"
        fontFamily="var(--font-geist-mono)"
      >
        FB-2026 / REV A
      </text>

      {traces.map((trace, index) => (
        <g key={trace}>
          <path
            d={trace}
            fill="none"
            stroke="#24505a"
            strokeWidth="1"
          />
          <path
            d={trace}
            fill="none"
            stroke="#00ff9d"
            strokeWidth="1"
            strokeDasharray="2 6"
            opacity="0.65"
            className="animate-traceFlow"
          />
        </g>
      ))}

      {pads.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x - 2}
          y={y - 2}
          width="4"
          height="4"
          fill="#00e5ff"
          opacity="0.8"
        />
      ))}

      {units.map((unit, index) => {
        const { x, y } = positions[index]
        return (
          <g key={unit.code}>
            <rect
              x={x}
              y={y}
              width="156"
              height="84"
              fill="#161b22"
              stroke="#29343d"
            />
            <rect x={x} y={y} width="3" height="84" fill="#1b3440" />
            <text
              x={x + 12}
              y={y + 18}
              fill="#00e5ff"
              fontSize="8.8"
              letterSpacing="1.4"
              fontFamily="var(--font-geist-mono)"
            >
              {unit.code}
            </text>
            <text
              x={x + 12}
              y={y + 38}
              fill="#edf7f3"
              fontSize="17"
              letterSpacing="1"
              fontFamily="var(--font-geist-mono)"
            >
              {unit.name}
            </text>
            <text
              x={x + 12}
              y={y + 55}
              fill="#8ba39d"
              fontSize="8.2"
              letterSpacing="0.8"
              fontFamily="var(--font-geist-mono)"
            >
              {unit.meta}
            </text>
            <text
              x={x + 12}
              y={y + 71}
              fill="#8ba39d"
              fontSize="7.6"
              letterSpacing="0.6"
              opacity="0.7"
              fontFamily="var(--font-geist-mono)"
            >
              {unit.lines[0]}
            </text>
            <circle cx={x + 140} cy={y + 14} r="2" fill="#29343d" />
            {unit.active ? (
              <circle cx={x + 132} cy={y + 14} r="2" fill="#00ff9d" />
            ) : null}
          </g>
        )
      })}

      <g>
        <rect x="210" y="168" width="200" height="124" fill="#0e1116" stroke="#24505a" />
        <rect x="210" y="168" width="200" height="3" fill="#00ff9d" opacity="0.65" />
        <text
          x="224"
          y="190"
          fill="#00e5ff"
          fontSize="8.8"
          letterSpacing="1.5"
          fontFamily="var(--font-geist-mono)"
        >
          {core.code} / CORE
        </text>
        <text
          x="224"
          y="218"
          fill="#edf7f3"
          fontSize="22"
          letterSpacing="1"
          fontFamily="var(--font-geist-mono)"
        >
          AI CORE
        </text>
        <text
          x="224"
          y="236"
          fill="#8ba39d"
          fontSize="8.2"
          letterSpacing="0.8"
          fontFamily="var(--font-geist-mono)"
        >
          {core.meta}
        </text>
        <line x1="224" y1="248" x2="396" y2="248" stroke="#29343d" />
        <text
          x="224"
          y="264"
          fill="#00ff9d"
          fontSize="8.2"
          letterSpacing="0.7"
          fontFamily="var(--font-geist-mono)"
        >
          {core.lines[0]}
        </text>
        <text
          x="224"
          y="278"
          fill="#00ff9d"
          fontSize="8.2"
          letterSpacing="0.7"
          fontFamily="var(--font-geist-mono)"
        >
          {core.lines[1]}
        </text>
        {[186, 210, 234, 258, 282].map((cy) => (
          <g key={cy}>
            <rect x="201" y={cy - 2} width="4" height="4" fill="#24505a" />
            <rect x="415" y={cy - 2} width="4" height="4" fill="#24505a" />
          </g>
        ))}
        <circle cx="398" cy="178" r="3" fill="#161b22" stroke="#24505a" />
      </g>

      <line x1="24" y1="440" x2="596" y2="440" stroke="#29343d" strokeDasharray="2 4" />
      <text
        x="24"
        y="454"
        fill="#8ba39d"
        fontSize="8"
        letterSpacing="1"
        fontFamily="var(--font-geist-mono)"
      >
        U1 AI CORE · U2 I/O · U3 MEMORY · U4 LOG · U5 AUX
      </text>
      <text
        x="596"
        y="454"
        fill="#8ba39d"
        fontSize="8"
        letterSpacing="1"
        textAnchor="end"
        fontFamily="var(--font-geist-mono)"
      >
        SCALE 1:1 / NOT TO SCALE
      </text>
    </svg>
  )
}
