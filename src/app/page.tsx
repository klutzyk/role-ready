"use client";

import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  FileText,
  Gauge,
  Loader2,
  MapPin,
  Plus,
  Radar,
  Sparkles,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

type AnalysisResult = {
  score: number;
  level: string;
  matchedSkills: string[];
  missingSkills: string[];
  roleSignals: string[];
  bullets: string[];
  summary: string;
};

const sampleResume = `Software Engineer with 4 years of experience building web applications, REST APIs, dashboards, and data pipelines. Skilled in Python, TypeScript, React, PostgreSQL, machine learning, data analysis, cloud deployment, and stakeholder communication. Completed a Master of Data Science in Australia with projects in NLP, predictive modelling, and business analytics.`;

const sampleJob = `We are hiring a Data Analyst / AI Product Engineer in Sydney. The role requires Python, SQL, dashboards, machine learning, stakeholder communication, experimentation, API integration, and experience turning messy business data into actionable insights. Knowledge of React, cloud platforms, and LLM tools is a strong advantage.`;

const applicationRows = [
  ["Data Analyst", "Sydney", "72%", "Tailor resume"],
  ["AI Product Engineer", "Remote", "84%", "Ready"],
  ["BI Developer", "Melbourne", "66%", "Close gaps"],
];

const featureCards: Array<[string, string, LucideIcon]> = [
  ["Fit score", "Role-by-role signal, not generic advice", Gauge],
  ["Skill gaps", "See what the ad is really asking for", Target],
  ["Resume bullets", "Rewrite around measurable evidence", FileText],
];

export default function Home() {
  const [resume, setResume] = useState(sampleResume);
  const [job, setJob] = useState(sampleJob);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const canAnalyze = useMemo(
    () => resume.trim().length > 80 && job.trim().length > 80,
    [resume, job],
  );

  async function analyzeRole(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, job }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = (await response.json()) as AnalysisResult;
      setResult(data);
    } catch {
      setError("RoleReady could not analyze this role yet. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const activeResult =
    result ??
    ({
      score: 78,
      level: "Strong match",
      matchedSkills: ["Python", "SQL", "React", "PostgreSQL", "Machine learning"],
      missingSkills: ["Experimentation", "LLM tools", "Cloud platforms"],
      roleSignals: ["Sydney", "AI product", "Stakeholder-facing", "Dashboards"],
      bullets: [
        "Built data-backed web applications using Python, TypeScript, React, and PostgreSQL.",
        "Created dashboards and analytics workflows that convert messy business data into clear decisions.",
        "Applied NLP and predictive modelling through Master of Data Science projects in Australia.",
      ],
      summary:
        "Your profile is credible for this role. Emphasize data products, stakeholder outcomes, and AI/LLM project work before applying.",
    } satisfies AnalysisResult);

  return (
    <main className="min-h-screen bg-[#f4f7f2] text-[#17211b]">
      <section className="border-b border-[#17211b]/15 bg-[#f9fbf7]">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-5 md:px-8 lg:px-10">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-md bg-[#17211b] text-[#f9fbf7]">
                <Radar size={21} aria-hidden="true" />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-tight">RoleReady</p>
                <p className="text-xs uppercase tracking-[0.28em] text-[#5f6f62]">
                  Job intelligence
                </p>
              </div>
            </div>
            <a
              href="#analyze"
              className="inline-flex h-10 items-center gap-2 rounded-md bg-[#d84f39] px-4 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(216,79,57,0.22)] transition hover:bg-[#bf432f]"
            >
              Analyze role
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </nav>

          <div className="grid gap-8 pb-8 pt-4 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-md border border-[#17211b]/15 bg-white px-3 py-2 text-sm font-medium text-[#314437]">
                <Sparkles size={16} className="text-[#d84f39]" aria-hidden="true" />
                Built for targeted, evidence-backed job applications
              </p>
              <h1 className="max-w-3xl text-balance text-5xl font-black leading-[0.98] tracking-tight text-[#17211b] md:text-7xl">
                Know which roles are worth your next application.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#425044]">
                RoleReady reads a resume and job ad, scores the match, reveals the
                gaps, and turns the evidence into sharper resume bullets.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {featureCards.map(([title, copy, Icon]) => (
                <div
                  key={title}
                  className="rounded-md border border-[#17211b]/15 bg-white p-4 shadow-[0_20px_50px_rgba(23,33,27,0.06)]"
                >
                  <Icon size={20} className="mb-5 text-[#0f766e]" aria-hidden="true" />
                  <h2 className="text-sm font-bold uppercase tracking-[0.18em]">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#5a675d]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="analyze" className="mx-auto grid max-w-7xl gap-5 px-5 py-6 md:px-8 lg:grid-cols-[1.03fr_0.97fr] lg:px-10">
        <form
          onSubmit={analyzeRole}
          className="rounded-md border border-[#17211b]/15 bg-white p-4 shadow-[0_24px_70px_rgba(23,33,27,0.08)] md:p-5"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black tracking-tight">Application lab</h2>
              <p className="text-sm text-[#637066]">
                Paste a resume summary and job description to generate a match report.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setResume("");
                setJob("");
                setResult(null);
              }}
              className="inline-grid size-10 place-items-center rounded-md border border-[#17211b]/15 text-[#4e5d52] transition hover:bg-[#f4f7f2]"
              title="Start new analysis"
              aria-label="Start new analysis"
            >
              <Plus size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="flex items-center gap-2 text-sm font-bold">
                <FileText size={16} aria-hidden="true" />
                Resume evidence
              </span>
              <textarea
                value={resume}
                onChange={(event) => setResume(event.target.value)}
                className="min-h-44 resize-y rounded-md border border-[#17211b]/15 bg-[#fbfcfa] p-4 text-sm leading-6 outline-none transition focus:border-[#0f766e] focus:bg-white focus:ring-4 focus:ring-[#0f766e]/10"
                placeholder="Paste your resume summary, project notes, skills, or experience here."
              />
            </label>

            <label className="grid gap-2">
              <span className="flex items-center gap-2 text-sm font-bold">
                <BriefcaseBusiness size={16} aria-hidden="true" />
                Job description
              </span>
              <textarea
                value={job}
                onChange={(event) => setJob(event.target.value)}
                className="min-h-44 resize-y rounded-md border border-[#17211b]/15 bg-[#fbfcfa] p-4 text-sm leading-6 outline-none transition focus:border-[#0f766e] focus:bg-white focus:ring-4 focus:ring-[#0f766e]/10"
                placeholder="Paste the target job ad here."
              />
            </label>
          </div>

          {error ? <p className="mt-3 text-sm font-semibold text-[#b33324]">{error}</p> : null}

          <button
            type="submit"
            disabled={!canAnalyze || isLoading}
            className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-[#17211b] px-5 text-sm font-bold text-white transition hover:bg-[#26382d] disabled:cursor-not-allowed disabled:bg-[#9aa49c]"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} aria-hidden="true" /> : <Sparkles size={18} aria-hidden="true" />}
            {isLoading ? "Analyzing role" : "Generate fit report"}
          </button>
        </form>

        <aside className="grid gap-5">
          <section className="rounded-md border border-[#17211b]/15 bg-[#17211b] p-5 text-white shadow-[0_24px_70px_rgba(23,33,27,0.18)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-[#b9c9bd]">
                  Match signal
                </p>
                <h2 className="mt-2 text-3xl font-black">{activeResult.level}</h2>
              </div>
              <div className="grid size-24 place-items-center rounded-md bg-[#f6c64f] text-[#17211b]">
                <span className="text-4xl font-black">{activeResult.score}</span>
              </div>
            </div>
            <p className="mt-5 leading-7 text-[#dce6df]">{activeResult.summary}</p>
          </section>

          <section className="grid gap-4 rounded-md border border-[#17211b]/15 bg-white p-5 shadow-[0_18px_50px_rgba(23,33,27,0.06)]">
            <ResultBlock title="Matched skills" icon={<CheckCircle2 size={18} aria-hidden="true" />} items={activeResult.matchedSkills} tone="match" />
            <ResultBlock title="Gaps to cover" icon={<Target size={18} aria-hidden="true" />} items={activeResult.missingSkills} tone="gap" />
            <ResultBlock title="Role signals" icon={<MapPin size={18} aria-hidden="true" />} items={activeResult.roleSignals} tone="signal" />
          </section>

          <section className="rounded-md border border-[#17211b]/15 bg-white p-5 shadow-[0_18px_50px_rgba(23,33,27,0.06)]">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-black">
              <ClipboardList size={19} aria-hidden="true" />
              Tailored resume bullets
            </h2>
            <div className="grid gap-3">
              {activeResult.bullets.map((bullet) => (
                <p
                  key={bullet}
                  className="rounded-md border border-[#17211b]/12 bg-[#fbfcfa] p-3 text-sm leading-6 text-[#344438]"
                >
                  {bullet}
                </p>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8 lg:px-10">
        <div className="rounded-md border border-[#17211b]/15 bg-white shadow-[0_18px_50px_rgba(23,33,27,0.06)]">
          <div className="flex flex-col justify-between gap-3 border-b border-[#17211b]/10 p-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-black">Application tracker preview</h2>
              <p className="text-sm text-[#637066]">
                The next build can persist analyses, roles, notes, and response rates.
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead className="bg-[#f4f7f2] text-xs uppercase tracking-[0.16em] text-[#637066]">
                <tr>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Fit</th>
                  <th className="px-5 py-3">Next move</th>
                </tr>
              </thead>
              <tbody>
                {applicationRows.map(([role, location, fit, move]) => (
                  <tr key={role} className="border-t border-[#17211b]/10">
                    <td className="px-5 py-4 font-semibold">{role}</td>
                    <td className="px-5 py-4 text-[#5a675d]">{location}</td>
                    <td className="px-5 py-4 font-bold text-[#0f766e]">{fit}</td>
                    <td className="px-5 py-4 text-[#5a675d]">{move}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

function ResultBlock({
  title,
  icon,
  items,
  tone,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  tone: "match" | "gap" | "signal";
}) {
  const toneClass = {
    match: "bg-[#e8f5ef] text-[#0f624f] border-[#0f766e]/20",
    gap: "bg-[#fff2dc] text-[#865200] border-[#f6c64f]/40",
    signal: "bg-[#eef2ff] text-[#3d4c8c] border-[#5967b3]/20",
  }[tone];

  return (
    <div>
      <h3 className="mb-2 flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-[#314437]">
        {icon}
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.length ? (
          items.map((item) => (
            <span
              key={item}
              className={`rounded-md border px-2.5 py-1.5 text-xs font-bold ${toneClass}`}
            >
              {item}
            </span>
          ))
        ) : (
          <span className="rounded-md border border-[#17211b]/12 px-2.5 py-1.5 text-xs font-bold text-[#5a675d]">
            No strong signals found yet
          </span>
        )}
      </div>
    </div>
  );
}
