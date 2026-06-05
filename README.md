# ApplyPilot

ApplyPilot is a job-search workspace that matches a candidate's resume evidence against real job descriptions, scores fit, identifies skill gaps, and helps candidates decide where to apply.

## Product

This version includes:

- Resume and job description matching workflow
- Deterministic fit scoring API at `src/app/api/analyze/route.ts`
- Job URL import API at `src/app/api/import-job/route.ts`
- Resume PDF extraction API at `src/app/api/extract-resume/route.ts`
- Weighted skill taxonomy with aliases
- Matched skill extraction
- Missing skill detection
- Must-have requirement detection
- Role signal extraction
- Apply / tailor / build-evidence recommendation
- Next-best-action and time-to-apply estimate
- Score explanation with weighted coverage, evidence bonus, and must-have penalty
- Keyword plan with keep/add priorities
- Resume bullet drafts
- Interview prep prompts
- Outreach note draft
- ATS sanity checks
- Job metadata capture for title, company, location, and source URL
- Browser-saved resume profile
- Local application tracker with status and notes
- Copy/download fit report export
- Responsive SaaS landing page interface

Saved applications and the saved resume profile are stored in browser `localStorage` for this local-first version. A production version should add account auth, database storage, payments, analytics, and optional AI writing assistance.

Job URL import works best with company career pages and public ATS pages. Some large job boards block automated extraction, so the app keeps manual paste as the fallback.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- lucide-react icons
- cheerio
- pdfjs-dist

Planned additions:

- PostgreSQL
- Prisma
- Auth
- Optional AI writing assistant

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

```bash
npm run dev
npm run build
npm run lint
```
