# RoleReady

RoleReady is an AI-powered job application platform that analyzes job ads, scores resume fit, identifies skill gaps, and helps candidates create targeted, data-backed applications.

## MVP

This first version includes:

- Resume and job description analysis workflow
- Deterministic fit scoring API at `src/app/api/analyze/route.ts`
- Matched skill extraction
- Missing skill detection
- Role signal extraction
- Tailored resume bullet suggestions
- Application tracker preview
- Responsive Next.js interface

The analysis route works without an AI API key so the product can be demoed immediately. The next step is to connect OpenAI or Gemini for richer extraction, rewriting, and report generation.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- lucide-react icons

Planned additions:

- PostgreSQL
- Prisma
- Auth
- File upload and PDF resume parsing
- AI provider integration
- Saved applications dashboard

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
