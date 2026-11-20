export type NavItem = {
  id: string
  label: string
  code: string
  href: string
}

export type SocialLink = {
  label: string
  href: string
  handle: string
}

export type Stat = {
  value: string
  label: string
  note: string
}

export type Subsystem = {
  code: string
  name: string
  meta: string
  lines: string[]
  active?: boolean
}

export type SkillBank = {
  code: string
  title: string
  subtitle: string
  pins: string[]
}

export type ExperienceItem = {
  company: string
  role: string
  period: string
  location: string
  summary: string
  bullets: string[]
  stack: string[]
  status: string
}

export type Project = {
  id: string
  index: string
  title: string
  category: string
  filter: string[]
  period: string
  context: string
  summary: string
  problem: string
  approach: string[]
  impact: string[]
  stack: string[]
  links: { label: string; href?: string }[]
  visual: "rag" | "mlops" | "eeg" | "microservices" | "cloud" | "network"
  visible: boolean
}

export type EducationItem = {
  address: string
  school: string
  degree: string
  detail: string
  period: string
  highlights: string[]
}

export type LeadershipItem = {
  organisation: string
  role: string
  period: string
  description: string
}

export const navItems: NavItem[] = [
  { id: "home", label: "Home", code: "00", href: "#home" },
  { id: "about", label: "About", code: "01", href: "#about" },
  { id: "skills", label: "Skills", code: "02", href: "#skills" },
  { id: "experience", label: "Experience", code: "03", href: "#experience" },
  { id: "projects", label: "Projects", code: "04", href: "#projects" },
  { id: "education", label: "Education", code: "05", href: "#education" },
  { id: "leadership", label: "Leadership", code: "06", href: "#leadership" },
  { id: "contact", label: "Contact", code: "07", href: "#contact" },
]

export const profile = {
  name: "Feres Boubakri",
  firstName: "Feres",
  lastName: "Boubakri",
  initials: "FB",
  role: "AI & Telecommunications Engineering Student",
  shortRole: "AI · RAG · MLOps",
  tagline:
    "Document-grounded AI, predictive-maintenance pipelines and reliable cloud infrastructure.",
  about:
    "I build AI systems that answer from real documents — and the infrastructure that keeps them running. Telecommunications Engineering student at ENIT, specializing in AI, RAG and MLOps, with an I3C grounding in converged infrastructures, cloud and cybersecurity. I care about traceable answers, measurable models and reproducible deployments.",
  location: "Tunisia",
  email: "feres.boubakri@etudiant-enit.utm.tn",
  phone: "+216 94 197 905",
  availability: "Seeking an internship · AI / GenAI / MLOps",
  availabilityDetail: "Tunisia · Remote",
  board: "FB-2026",
  revision: "REV A",
  status: "BUILDING THE NEXT LAYER",
  cv: {
    ai: "",
    infrastructure: "",
  },
  socials: {
    github: "",
    linkedin: "",
  },
}

export const stats: Stat[] = [
  { value: "02", label: "Internships", note: "DGRE · Tunisie Telecom" },
  { value: "06", label: "Projects", note: "AI · MLOps · Cloud · Networks" },
  { value: ">90%", label: "Routing accuracy", note: "30-question validation" },
  { value: "20.3", label: "RUL RMSE", note: "NASA C-MAPSS" },
]

export const subsystems: Subsystem[] = [
  {
    code: "U1",
    name: "CORE",
    meta: "AI / RAG / MLOps",
    lines: ["document grounding", "predictive models"],
    active: true,
  },
  {
    code: "U2",
    name: "I/O",
    meta: "NETWORKS / CLOUD",
    lines: ["TCP/IP · SDN", "Docker · Kubernetes"],
  },
  {
    code: "U3",
    name: "MEMORY",
    meta: "0x2027 ENIT",
    lines: ["Telecom Engineering", "I3C · in progress"],
  },
  {
    code: "U4",
    name: "LOG",
    meta: "02 internships",
    lines: ["DGRE · 2026", "Tunisie Telecom · 2025"],
  },
  {
    code: "U5",
    name: "AUX",
    meta: "G2FOSS · 3 languages",
    lines: ["visual content", "Arabic · French · English"],
  },
]

export const skillBanks: SkillBank[] = [
  {
    code: "A",
    title: "Programming & Scripting",
    subtitle: "Core languages and problem solving",
    pins: ["Python", "C/C++", "JavaScript", "SQL", "Java"],
  },
  {
    code: "B",
    title: "AI & GenAI",
    subtitle: "Retrieval, sequence models and NLP",
    pins: ["RAG", "Deep Learning", "LSTM", "CNN-LSTM", "Transformers", "NLP"],
  },
  {
    code: "C",
    title: "MLOps & Deployment",
    subtitle: "From notebook to running service",
    pins: ["Docker", "Kubernetes", "FastAPI", "Streamlit"],
  },
  {
    code: "D",
    title: "Data & Databases",
    subtitle: "Storage, indexing and structured queries",
    pins: ["SQLite", "MySQL", "NoSQL", "ChromaDB", "FTS5"],
  },
  {
    code: "E",
    title: "Networking",
    subtitle: "Telecommunications and protocols",
    pins: ["TCP/IP", "DNS", "DHCP", "Routing", "LAN", "IP/MPLS", "QoS", "SDN"],
  },
  {
    code: "F",
    title: "Systems, Cloud & Virtualization",
    subtitle: "Linux, virtualization and cloud operations",
    pins: [
      "Linux",
      "System Administration",
      "Cloud Infrastructure Fundamentals",
      "Virtualization",
      "High Availability",
      "Cloud Monitoring",
    ],
  },
  {
    code: "G",
    title: "DevOps & Tools",
    subtitle: "Version control and delivery workflow",
    pins: ["Git", "GitHub", "CI/CD"],
  },
]

export const experience: ExperienceItem[] = [
  {
    company: "DGRE — Direction Générale des Ressources en Eau",
    role: "AI / RAG Engineering Intern",
    period: "Jul — Aug 2026",
    location: "Tunisia",
    summary:
      "Built a local, source-aware RAG assistant for hydrological decision support across PDF, CSV and Excel data sources.",
    bullets: [
      "Implemented semantic routing and hybrid retrieval with SQLite FTS5 and ChromaDB.",
      "Validated the system on 30 test questions with over 90% routing accuracy and response times below 25 seconds.",
      "Added traceable citations, structured-data queries and explicit handling of missing information.",
    ],
    stack: ["Python", "RAG", "ChromaDB", "SQLite FTS5", "PDF extraction"],
    status: "Completed",
  },
  {
    company: "Tunisie Telecom",
    role: "Engineering Intern",
    period: "Aug 2025",
    location: "Tunisia",
    summary:
      "Telecommunications engineering internship within a national telecom operator.",
    bullets: [],
    stack: ["Telecommunications"],
    status: "Completed",
  },
]

export const projects: Project[] = [
  {
    id: "rag-water",
    index: "U1",
    title: "RAG Assistant for Water Resources",
    category: "AI & RAG",
    filter: ["ai"],
    period: "2026",
    context: "DGRE / CARTAGEN",
    summary:
      "A source-aware assistant that turns heterogeneous water-resource documents into traceable answers.",
    problem:
      "Hydrological teams work across PDF reports, CSV measurements and Excel tables. A generic chatbot cannot reliably combine those sources or show where an answer came from.",
    approach: [
      "Built a PDF extraction pipeline with source metadata preserved at chunk level.",
      "Combined semantic retrieval with lexical search to cover both meaning and exact terminology.",
      "Routed structured questions to SQLite for numerical processing instead of forcing them through an LLM.",
      "Exposed citations, structured-data answers and explicit missing-information states.",
    ],
    impact: [
      "Over 90% routing accuracy on a 30-question validation set.",
      "Response times below 25 seconds.",
      "Traceable answers across PDF, CSV and Excel sources.",
    ],
    stack: ["Python", "RAG", "ChromaDB", "SQLite", "FTS5", "PDF extraction"],
    links: [{ label: "Case study on request" }],
    visual: "rag",
    visible: true,
  },
  {
    id: "nasa-mlops",
    index: "U2",
    title: "Predictive Maintenance MLOps",
    category: "MLOps / Deep Learning",
    filter: ["mlops", "deep-learning"],
    period: "Academic project",
    context: "NASA C-MAPSS",
    summary:
      "An end-to-end Remaining Useful Life pipeline for aircraft engines, from signal windows to a deployed dashboard.",
    problem:
      "Predicting when an engine will fail requires careful sequence modelling, honest validation and a delivery path that a team can actually use.",
    approach: [
      "Prepared run-to-failure sensor sequences from the NASA C-MAPSS dataset.",
      "Trained and compared CNN-LSTM, LSTM, BiLSTM, Transformer Encoder and TCRSANet models.",
      "Combined model outputs with a Ridge ensemble and evaluated RUL error.",
      "Packaged predictions in a Streamlit dashboard and deployed it on Hugging Face Spaces.",
    ],
    impact: [
      "RMSE of 20.3 on the RUL task.",
      "Five sequence-model families compared under one pipeline.",
      "Interactive prediction dashboard deployed publicly.",
    ],
    stack: ["Python", "CNN-LSTM", "LSTM", "BiLSTM", "Transformer", "TCRSANet", "Ridge", "Streamlit"],
    links: [{ label: "Demo on request" }],
    visual: "mlops",
    visible: true,
  },
  {
    id: "eeg-alzheimer",
    index: "U3",
    title: "EEG Analysis — Alzheimer Detection",
    category: "Deep Learning / Health",
    filter: ["deep-learning", "ai"],
    period: "Academic project",
    context: "Biomedical signal processing",
    summary:
      "A deep-learning pipeline for Alzheimer classification from preprocessed EEG time-series signals.",
    problem:
      "EEG signals are noisy, high-dimensional and variable across recordings. The classification layer only works if the signal preparation is disciplined.",
    approach: [
      "Preprocessed EEG time-series signals for model-ready input.",
      "Trained deep-learning models for binary Alzheimer classification.",
      "Compared architectures on the same preparation and evaluation pipeline.",
    ],
    impact: [
      "End-to-end EEG preprocessing and classification workflow.",
      "Deep-learning baseline for neural-network-based Alzheimer detection.",
    ],
    stack: ["Python", "EEG", "Deep Learning", "Signal preprocessing"],
    links: [{ label: "Details on request" }],
    visual: "eeg",
    visible: true,
  },
  {
    id: "microservices-social",
    index: "U4",
    title: "Microservices-based Social Platform",
    category: "Software / Networks",
    filter: ["software", "networks"],
    period: "Academic project",
    context: "Distributed systems",
    summary:
      "A social platform split into independent services behind an API Gateway, with discovery and HTTP communication.",
    problem:
      "A single application becomes difficult to evolve when social features, identity and content have different scaling and failure profiles.",
    approach: [
      "Designed independent services around clear domain boundaries.",
      "Routed client traffic through an API Gateway.",
      "Added service discovery and HTTP-based inter-service communication.",
      "Applied distributed-system and scalable-architecture concepts.",
    ],
    impact: [
      "Loosely coupled service architecture.",
      "Centralised routing and service discovery.",
      "Clear separation between platform capabilities.",
    ],
    stack: ["Microservices", "API Gateway", "Service discovery", "HTTP", "Distributed systems"],
    links: [{ label: "Architecture on request" }],
    visual: "microservices",
    visible: true,
  },
  {
    id: "cloud-deployment",
    index: "U5",
    title: "Automated Cloud Deployment",
    category: "Cloud / DevOps",
    filter: ["cloud", "mlops"],
    period: "Lab",
    context: "Infrastructure track",
    summary:
      "An automated application deployment environment built around containerization and reproducible configuration.",
    problem:
      "Manual deployments are hard to reproduce and easy to drift. The lab focuses on a repeatable path from repository to running service.",
    approach: [
      "Containerized the application and its runtime dependencies.",
      "Used Kubernetes deployment configuration for orchestration.",
      "Applied Git-based workflows to make changes reproducible.",
    ],
    impact: [
      "Repeatable deployment workflow.",
      "Container-first application packaging.",
      "Infrastructure automation foundations.",
    ],
    stack: ["Docker", "Kubernetes", "CI/CD", "Git", "Linux"],
    links: [{ label: "Lab notes on request" }],
    visual: "cloud",
    visible: true,
  },
  {
    id: "network-monitoring",
    index: "U6",
    title: "Intelligent Network Monitoring",
    category: "Networks / Observability",
    filter: ["networks", "cloud"],
    period: "Lab",
    context: "Infrastructure track",
    summary:
      "A monitoring approach for observing infrastructure status, service availability and network performance.",
    problem:
      "An infrastructure is only as reliable as the signals used to observe it. The lab focuses on the metrics and alerts that make failures visible.",
    approach: [
      "Defined indicators for infrastructure status and service availability.",
      "Modelled network-performance observation and alerting.",
      "Connected supervision concepts to operational response.",
    ],
    impact: [
      "Clear monitoring and alerting model.",
      "Service-availability and performance indicators.",
      "Infrastructure supervision foundations.",
    ],
    stack: ["Network monitoring", "Performance indicators", "Alerting", "Linux"],
    links: [{ label: "Lab notes on request" }],
    visual: "network",
    visible: true,
  },
]

export const education: EducationItem[] = [
  {
    address: "0x2027",
    school: "École Nationale d'Ingénieurs de Tunis (ENIT)",
    degree: "Telecommunications Engineering",
    detail:
      "Specialization: Infrastructures Convergées, Cloud & Cybersécurité (I3C).",
    period: "2024 — Expected 2027",
    highlights: [
      "Computer Networks",
      "Routing Protocols",
      "Operating Systems",
      "System Administration",
      "Enterprise Networks",
      "Virtualization & High Availability",
      "Network & Cloud Monitoring",
      "SDN",
      "Network & Cloud Security",
    ],
  },
  {
    address: "0x2024",
    school: "IPEI Kairouan",
    degree: "Preparatory Classes PT",
    detail:
      "Foundations in mathematics, physics, engineering sciences, algorithms and problem-solving.",
    period: "2022 — 2024",
    highlights: ["Mathematics", "Physics", "Engineering sciences", "Algorithms"],
  },
]

export const leadership: LeadershipItem[] = [
  {
    organisation: "G2FOSS ENIT",
    role: "Member",
    period: "2025 — 2026",
    description:
      "Created visual content, managed social media and supported the club's digital presence with the IT team.",
  },
]

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "French", level: "B2" },
  { name: "English", level: "B2" },
]

export const projectFilters = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI & RAG" },
  { id: "mlops", label: "MLOps" },
  { id: "deep-learning", label: "Deep Learning" },
  { id: "networks", label: "Networks" },
  { id: "cloud", label: "Cloud" },
  { id: "software", label: "Software" },
]

export function mailtoLink(subject: string, body?: string) {
  const params = new URLSearchParams({ subject })
  if (body) params.set("body", body)
  return `mailto:${profile.email}?${params.toString()}`
}
