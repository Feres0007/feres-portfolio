import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Skills from "@/components/sections/skills"
import Experience from "@/components/sections/experience"
import Projects from "@/components/sections/projects"
import Education from "@/components/sections/education"
import Leadership from "@/components/sections/leadership"
import Contact from "@/components/sections/contact"
import { profile } from "@/lib/data"

const knowsAbout = [
  "Retrieval-augmented generation",
  "Deep learning",
  "MLOps",
  "Cloud infrastructure",
  "Telecommunications networks",
  "Network security",
]

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.about,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "TN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "École Nationale d'Ingénieurs de Tunis (ENIT)",
    },
    knowsAbout,
    knowsLanguage: ["Arabic", "French", "English"],
    sameAs: Object.values(profile.socials).filter(Boolean),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Leadership />
        <Contact />
      </main>
    </>
  )
}
