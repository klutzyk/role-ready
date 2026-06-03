# RoleReady

RoleReady is a job-fit intelligence platform that matches a candidate's resume evidence against real job descriptions, scores fit, identifies skill gaps, and helps candidates decide where to apply.

## MVP

This first version includes:

- Resume and job description matching workflow
- Deterministic fit scoring API at `src/app/api/analyze/route.ts`
- Weighted skill taxonomy with aliases
- Matched skill extraction
- Missing skill detection
- Must-have requirement detection
- Role signal extraction
- Actionable resume/application recommendations
- Responsive SaaS landing page interface

The matching route works without paid model usage, so the product can be demoed immediately. Optional writing assistance can be added later for resume rewriting, cover letters, and richer explanations.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- lucide-react icons

Planned additions:

- Job URL import
- PDF resume upload and parsing
- PostgreSQL
- Prisma
- Auth
- Saved applications dashboard
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
