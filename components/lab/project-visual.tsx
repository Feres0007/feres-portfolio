import type { ReactElement } from "react"
import type { Project } from "@/lib/data"
import { cn } from "@/lib/utils"

type ProjectVisualProps = {
  type: Project["visual"]
  className?: string
}

const signal = "#7DD3FC"
const gold = "#3B82F6"
const dim = "#A1A1AA"
const line = "#1B2F52"
const panel = "#0A1020"

const captions: Record<Project["visual"], string> = {
  rag: "RAG / DOCUMENT GROUNDING",
  mlops: "MLOPS / RUL PIPELINE",
  eeg: "EEG / SIGNAL CLASSIFICATION",
  microservices: "SVC / API GATEWAY",
  cloud: "CLOUD / DEPLOYMENT PATH",
  network: "NET / OBSERVABILITY",
}

const descriptions: Record<Project["visual"], string> = {
  rag: "Documents flow into a hybrid retrieval store and produce a cited answer.",
  mlops: "Sensor windows are scored by an ensemble of sequence models to estimate remaining useful life.",
  eeg: "EEG signals are preprocessed and classified by a deep-learning model.",
  microservices: "A client reaches independent services through an API gateway and service discovery.",
  cloud: "A repository moves through CI and a registry into a container runtime.",
  network: "A mesh of network nodes is observed through a monitoring panel.",
}

function Label({
  x,
  y,
  children,
  color = dim,
  size = 6.2,
  anchor = "start",
  spacing = 0.8,
}: {
  x: number | string
  y: number | string
  children: string
  color?: string
  size?: number
  anchor?: "start" | "middle" | "end"
  spacing?: number
}) {
  return (
    <text
      x={x}
      y={y}
      fill={color}
      fontSize={size}
      letterSpacing={spacing}
      textAnchor={anchor}
      fontFamily="var(--font-geist-mono)"
    >
      {children}
    </text>
  )
}

function Rag() {
  return (
    <g>
      <rect x="18" y="34" width="64" height="88" fill={panel} stroke={line} />
      <rect x="24" y="40" width="52" height="10" fill="#05070F" stroke={line} />
      <Label x="78" y="47" anchor="end" color={gold} size={5.4}>
        PDF
      </Label>
      {[58, 70, 82, 94, 106].map((y, index) => (
        <rect
          key={y}
          x="28"
          y={y}
          width={index % 2 === 0 ? 40 : 30}
          height="2.5"
          fill={dim}
          opacity="0.45"
        />
      ))}
      <rect x="22" y="76" width="8" height="30" fill="#05070F" stroke={line} />
      <rect x="26" y="82" width="6" height="22" fill="#0F1E3D" stroke={line} />
      <Label x="50" y="140" anchor="middle">
        PDF · CSV · XLSX
      </Label>

      <path d="M82 82 H116" stroke={signal} strokeWidth="1" />
      <path d="M116 82 l-4 -2.6 v5.2 z" fill={signal} />
      <Label x="99" y="76" anchor="middle" color={signal} size={5.4}>
        CHUNKS
      </Label>

      <ellipse cx="153" cy="56" rx="26" ry="6" fill="#05070F" stroke={line} />
      <path d="M127 56 V104 A26 6 0 0 0 179 104 V56" fill={panel} stroke={line} />
      <ellipse cx="153" cy="104" rx="26" ry="6" fill="#05070F" stroke={line} />
      <g fill={signal}>
        {[
          [141, 74],
          [153, 68],
          [165, 76],
          [147, 88],
          [160, 92],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.6" opacity="0.8" />
        ))}
      </g>
      <Label x="153" y="140" anchor="middle">
        VECTOR + FTS5
      </Label>

      <path d="M185 82 H220" stroke={signal} strokeWidth="1" />
      <path d="M220 82 l-4 -2.6 v5.2 z" fill={signal} />
      <Label x="202" y="76" anchor="middle" color={signal} size={5.4}>
        RANK
      </Label>

      <rect x="224" y="34" width="78" height="88" fill={panel} stroke={line} strokeWidth="1" />
      <rect x="224" y="34" width="78" height="2" fill={signal} opacity="0.7" />
      <Label x="234" y="50" color={gold} size={5.4}>
        ANSWER
      </Label>
      {[62, 72, 82, 92].map((y, index) => (
        <rect
          key={y}
          x="234"
          y={y}
          width={index === 3 ? 38 : 56}
          height="2.5"
          fill={dim}
          opacity="0.45"
        />
      ))}
      <rect x="234" y="104" width="24" height="8" fill="#05070F" stroke={signal} />
      <Label x="246" y="109.5" anchor="middle" color={signal} size={4.8}>
        [1]
      </Label>
      <rect x="262" y="104" width="24" height="8" fill="#05070F" stroke={gold} />
      <Label x="274" y="109.5" anchor="middle" color={gold} size={4.8}>
        [2]
      </Label>
      <Label x="263" y="140" anchor="middle">
        CITED ANSWER
      </Label>
    </g>
  )
}

function Mlops() {
  const wave = Array.from({ length: 48 }, (_, index) => {
    const x = 22 + index * 1.65
    const y =
      82 +
      Math.sin(index * 0.62) * 13 +
      Math.sin(index * 1.55) * 4 +
      Math.cos(index * 0.21) * 3
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(" ")

  return (
    <g>
      <rect x="16" y="34" width="92" height="90" fill="#05070F" stroke={line} />
      {[50, 66, 82, 98, 114].map((y) => (
        <line key={y} x1="20" y1={y} x2="104" y2={y} stroke={line} opacity="0.4" />
      ))}
      <path d={wave} fill="none" stroke={signal} strokeWidth="1.2" />
      <path
        d="M118 82 H130"
        stroke={signal}
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <Label x="62" y="140" anchor="middle">
        SENSOR WINDOWS
      </Label>

      <rect x="132" y="34" width="66" height="90" fill={panel} stroke={line} />
      {["CNN-LSTM", "LSTM", "BiLSTM", "TRANSFORMER", "TCRSANET"].map(
        (model, index) => (
          <g key={model}>
            <rect
              x="138"
              y={42 + index * 15}
              width="54"
              height="11"
              fill={index === 0 ? "#05070F" : "#0F1E3D"}
              stroke={index === 0 ? signal : line}
            />
            <Label
              x="165"
              y={49 + index * 15}
              anchor="middle"
              color={index === 0 ? signal : dim}
              size={4.9}
            >
              {model}
            </Label>
          </g>
        )
      )}
      <Label x="165" y="140" anchor="middle">
        MODEL STACK
      </Label>

      <path d="M204 82 H226" stroke={signal} strokeWidth="1" />
      <path d="M226 82 l-4 -2.6 v5.2 z" fill={signal} />
      <Label x="214" y="76" anchor="middle" color={signal} size={5}>
        ENSEMBLE
      </Label>

      <rect x="230" y="34" width="72" height="90" fill="#05070F" stroke={line} />
      <path
        d="M242 98 A24 24 0 0 1 290 98"
        fill="none"
        stroke={line}
        strokeWidth="3"
      />
      <path
        d="M242 98 A24 24 0 0 1 283 82"
        fill="none"
        stroke={signal}
        strokeWidth="3"
      />
      <line x1="266" y1="98" x2="281" y2="80" stroke={gold} strokeWidth="1.2" />
      <circle cx="266" cy="98" r="2" fill={gold} />
      <Label x="266" y="58" anchor="middle" color={gold} size={8}>
        RUL
      </Label>
      <Label x="266" y="112" anchor="middle" color={signal} size={5.4}>
        20.3 RMSE
      </Label>
      <Label x="266" y="140" anchor="middle">
        PREDICTION
      </Label>
    </g>
  )
}

function Eeg() {
  const waveA = Array.from({ length: 60 }, (_, index) => {
    const x = 22 + index * 2.65
    const y =
      62 +
      Math.sin(index * 0.48) * 11 +
      Math.sin(index * 1.8) * 3.5 +
      Math.cos(index * 0.13) * 4
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(" ")

  const waveB = Array.from({ length: 60 }, (_, index) => {
    const x = 22 + index * 2.65
    const y =
      88 +
      Math.sin(index * 0.57 + 1.2) * 8 +
      Math.sin(index * 1.35) * 2.8
    return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`
  }).join(" ")

  return (
    <g>
      <rect x="18" y="34" width="166" height="70" fill="#05070F" stroke={line} />
      <path d={waveA} fill="none" stroke={signal} strokeWidth="1.1" />
      <path d={waveB} fill="none" stroke={gold} strokeWidth="1" opacity="0.8" />
      {[42, 74, 106, 138, 170].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="28" r="2" fill="#0F1E3D" stroke={line} />
          <line x1={cx} y1="30" x2={cx} y2="34" stroke={line} />
        </g>
      ))}
      <Label x="26" y="41" color={signal} size={5}>
        EEG 19CH
      </Label>
      <Label x="177" y="41" anchor="end" color={dim} size={5}>
        256 HZ
      </Label>

      <path d="M101 108 V118" stroke={dim} strokeWidth="0.8" strokeDasharray="2 2" />

      <rect x="18" y="122" width="78" height="28" fill={panel} stroke={line} />
      <Label x="57" y="134" anchor="middle" color={gold} size={5.2}>
        FILTER
      </Label>
      <Label x="57" y="143" anchor="middle" size={4.8}>
        NORMALIZE
      </Label>
      <rect x="106" y="122" width="78" height="28" fill={panel} stroke={signal} />
      <Label x="145" y="134" anchor="middle" color={signal} size={5.2}>
        DL MODEL
      </Label>
      <Label x="145" y="143" anchor="middle" size={4.8}>
        CNN / LSTM
      </Label>
      <path d="M96 136 H106" stroke={signal} strokeWidth="1" />
      <path d="M106 136 l-4 -2.4 v4.8 z" fill={signal} />
      <path d="M184 136 H212" stroke={signal} strokeWidth="1" />
      <path d="M212 136 l-4 -2.4 v4.8 z" fill={signal} />

      <rect x="218" y="34" width="84" height="116" fill="#05070F" stroke={line} />
      <Label x="260" y="48" anchor="middle" color={gold} size={5.2}>
        CLASS
      </Label>
      {[
        ["CN", 58, 46],
        ["AD", 98, 68],
      ].map(([label, y, width]) => (
        <g key={String(label)}>
          <Label x="228" y={Number(y) + 7} color={signal} size={6}>
            {String(label)}
          </Label>
          <rect
            x="242"
            y={Number(y)}
            width="48"
            height="8"
            fill="#0F1E3D"
            stroke={line}
          />
          <rect
            x="242"
            y={Number(y)}
            width={Number(width)}
            height="8"
            fill={signal}
            opacity="0.7"
          />
        </g>
      ))}
      <line x1="228" y1="122" x2="292" y2="122" stroke={line} />
      <Label x="260" y="134" anchor="middle" color={signal} size={4.8}>
        PREDICTION
      </Label>
      <Label x="260" y="143" anchor="middle" size={4.8}>
        BINARY
      </Label>
    </g>
  )
}

function Microservices() {
  const services = [
    { label: "IDENTITY", y: 36 },
    { label: "FEED", y: 75 },
    { label: "CONTENT", y: 114 },
  ]

  return (
    <g>
      <circle cx="30" cy="86" r="8" fill={panel} stroke={line} />
      <circle cx="30" cy="83" r="2" fill={dim} />
      <path d="M25 92 c1 -4 9 -4 10 0" fill="none" stroke={dim} />
      <Label x="30" y="108" anchor="middle">
        CLIENT
      </Label>

      <path d="M39 86 H60" stroke={signal} strokeWidth="1" />
      <path d="M60 86 l-4 -2.4 v4.8 z" fill={signal} />

      <rect x="64" y="64" width="66" height="44" fill={panel} stroke={signal} />
      <Label x="97" y="80" anchor="middle" color={signal} size={5.6}>
        API
      </Label>
      <Label x="97" y="91" anchor="middle" color={signal} size={5.6}>
        GATEWAY
      </Label>
      <Label x="97" y="100" anchor="middle" size={4.6}>
        ROUTING
      </Label>

      <rect x="64" y="126" width="66" height="28" fill="#05070F" stroke={line} />
      <Label x="97" y="139" anchor="middle" color={gold} size={4.8}>
        DISCOVERY
      </Label>
      <Label x="97" y="148" anchor="middle" size={4.4}>
        REGISTRY
      </Label>
      <line x1="97" y1="108" x2="97" y2="126" stroke={gold} strokeWidth="0.8" strokeDasharray="2 2" />

      {services.map((service) => (
        <g key={service.label}>
          <path
            d={`M130 86 H152 V${service.y + 16} H178`}
            fill="none"
            stroke={line}
            strokeWidth="1"
          />
          <path
            d={`M178 ${service.y + 16} l-4 -2.4 v4.8 z`}
            fill={dim}
          />
          <rect
            x="180"
            y={service.y}
            width="120"
            height="32"
            fill={panel}
            stroke={line}
          />
          <circle cx="192" cy={service.y + 11} r="2" fill={signal} opacity="0.8" />
          <Label x="200" y={service.y + 14} color="#F8FAFC" size={5.6}>
            {service.label}
          </Label>
          <line
            x1="200"
            y1={service.y + 21}
            x2="286"
            y2={service.y + 21}
            stroke={line}
          />
          <Label x="200" y={service.y + 27} size={4.4}>
            HTTP / SERVICE
          </Label>
        </g>
      ))}
      <Label x="240" y="160" anchor="middle" color={gold} size={4.8}>
        LOOSELY COUPLED
      </Label>
    </g>
  )
}

function Cloud() {
  const stages = [
    { x: 14, label: "REPO", sub: "GIT" },
    { x: 94, label: "CI/CD", sub: "BUILD" },
    { x: 174, label: "IMAGE", sub: "REGISTRY" },
  ]

  return (
    <g>
      {stages.map((stage, index) => (
        <g key={stage.label}>
          <rect x={stage.x} y="58" width="62" height="58" fill={panel} stroke={line} />
          <Label x={stage.x + 31} y="76" anchor="middle" color={index === 1 ? signal : "#F8FAFC"} size={5.4}>
            {stage.label}
          </Label>
          <line
            x1={stage.x + 12}
            y1="84"
            x2={stage.x + 50}
            y2="84"
            stroke={line}
          />
          <Label x={stage.x + 31} y="95" anchor="middle" size={4.5}>
            {stage.sub}
          </Label>
          <Label x={stage.x + 31} y="106" anchor="middle" color={dim} size={4.2}>
            {index === 0 ? "COMMIT" : index === 1 ? "TEST" : "TAG"}
          </Label>
        </g>
      ))}

      {[76, 156].map((x) => (
        <g key={x}>
          <path d={`M${x} 87 H${x + 18}`} stroke={signal} strokeWidth="1" />
          <path d={`M${x + 18} 87 l-4 -2.4 v4.8 z`} fill={signal} />
        </g>
      ))}

      <rect x="236" y="44" width="70" height="86" fill="#05070F" stroke={signal} />
      <Label x="271" y="58" anchor="middle" color={signal} size={5.4}>
        K8S
      </Label>
      {[0, 1, 2, 3, 4, 5].map((index) => {
        const col = index % 3
        const row = Math.floor(index / 3)
        return (
          <g key={index}>
            <rect
              x={252 + col * 16}
              y={68 + row * 18}
              width="12"
              height="12"
              fill={panel}
              stroke={line}
            />
            <rect
              x={255 + col * 16}
              y={71 + row * 18}
              width="6"
              height="6"
              fill={index === 0 ? signal : "#0F1E3D"}
            />
          </g>
        )
      })}
      <Label x="271" y="122" anchor="middle" color={gold} size={4.6}>
        PODS
      </Label>

      <Label x="16" y="152" color={dim} size={5}>
        REPRODUCIBLE PATH
      </Label>
      <Label x="304" y="152" anchor="end" color={signal} size={5}>
        ● RUNNING
      </Label>
    </g>
  )
}

function Network() {
  const nodes = [
    [42, 52],
    [96, 40],
    [62, 98],
    [112, 90],
    [38, 136],
    [100, 138],
  ]

  const edges = [
    [0, 1],
    [0, 2],
    [1, 3],
    [2, 3],
    [2, 4],
    [3, 5],
    [4, 5],
    [1, 2],
  ]

  return (
    <g>
      {edges.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke={line}
          strokeWidth="1"
        />
      ))}
      {nodes.map(([x, y], index) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="10" fill={panel} stroke={index === 2 ? signal : line} />
          <circle cx={x} cy={y} r="2" fill={index === 2 ? signal : dim} />
        </g>
      ))}
      <Label x="72" y="166" anchor="middle">
        MESH / NODES
      </Label>

      <path d="M126 96 H152" stroke={gold} strokeWidth="1" strokeDasharray="2 3" />
      <path d="M152 96 l-4 -2.4 v4.8 z" fill={gold} />

      <rect x="156" y="34" width="146" height="118" fill="#05070F" stroke={line} />
      <rect x="156" y="34" width="146" height="2" fill={gold} opacity="0.7" />
      <Label x="168" y="50" color={gold} size={5.4}>
        OBSERVE
      </Label>
      <circle cx="288" cy="47" r="2" fill={signal} />
      <Label x="283" y="50" anchor="end" color={signal} size={4.4}>
        LIVE
      </Label>

      {[
        ["AVAILABILITY", 62, 76],
        ["LATENCY", 84, 54],
        ["LOSS", 106, 34],
      ].map(([label, y, width]) => (
        <g key={String(label)}>
          <Label x="168" y={Number(y)} color={dim} size={4.6}>
            {String(label)}
          </Label>
          <rect
            x="168"
            y={Number(y) + 5}
            width="122"
            height="5"
            fill="#0F1E3D"
            stroke={line}
          />
          <rect
            x="168"
            y={Number(y) + 5}
            width={Number(width)}
            height="5"
            fill={Number(y) === 106 ? gold : signal}
            opacity="0.75"
          />
        </g>
      ))}
      <line x1="168" y1="124" x2="290" y2="124" stroke={line} />
      <Label x="168" y="136" color={signal} size={4.6}>
        ALERT / THRESHOLD
      </Label>
      <Label x="168" y="145" color={dim} size={4.4}>
        OPERATIONAL RESPONSE
      </Label>
    </g>
  )
}

const visuals: Record<Project["visual"], () => ReactElement> = {
  rag: Rag,
  mlops: Mlops,
  eeg: Eeg,
  microservices: Microservices,
  cloud: Cloud,
  network: Network,
}

export default function ProjectVisual({ type, className }: ProjectVisualProps) {
  const Visual = visuals[type]

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-line bg-ink",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(rgba(56, 189, 248, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.07) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
      role="img"
      aria-label={descriptions[type]}
    >
      <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden="true">
        <Visual />
        <Label x="8" y="14" color={dim} size={4.6} spacing={0.9}>
          {captions[type]}
        </Label>
        <path d="M8 20 h8 M8 20 v-8" stroke={line} strokeWidth="0.8" fill="none" />
        <path d="M312 166 h-8 M312 166 v-8" stroke={line} strokeWidth="0.8" fill="none" />
      </svg>
    </div>
  )
}
