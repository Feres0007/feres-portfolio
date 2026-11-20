# Feres Boubakri — Portfolio

**Live:** https://feres007-portfolio.static.hf.space/

A dark, PCB-inspired personal portfolio built around one profile: **AI × Infrastructure**. AI, RAG and MLOps lead; networks, cloud and security form the supporting layer.

Built with Next.js App Router, TypeScript, Tailwind CSS and Framer Motion. Exported as a static site and hosted on Hugging Face Spaces. No light mode, no backend.

## Sections

- Hero with system-status board and quick metrics
- About — background and focus
- Skills — pin banks grouped by domain
- Experience — work log
- Projects — interactive datasheets in accessible dialogs
- Education, Leadership, Languages
- Contact — `mailto:` form (no data stored)

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS · Radix UI · Framer Motion · Geist fonts

## Local development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Production checks:

```bash
npm run typecheck
node node_modules/next/dist/bin/next build
```

> Note: in this environment `npm run build` can crash because of the npm wrapper; running the Next.js binary directly with Node works.

## Editing content

All content lives in **`lib/data.ts`**: profile, stats, skill banks, experience, projects, education, leadership, languages and navigation. No component edits are needed for content changes.

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) before building for canonical and Open Graph URLs.

## Deployment

The repository is configured for a **static export** (`output: "export"` in `next.config.mjs`). Build, then publish the `out/` folder to any static host:

```bash
node node_modules/next/dist/bin/next build
# publish ./out
```

Current live deployment: https://feres007-portfolio.static.hf.space/ (Hugging Face Space `feres007/portfolio`, SDK `static`).
