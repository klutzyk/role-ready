import { NextRequest, NextResponse } from "next/server";

const skillMap = [
  "Python",
  "SQL",
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "PostgreSQL",
  "Machine learning",
  "NLP",
  "Dashboards",
  "Data analysis",
  "Power BI",
  "Tableau",
  "AWS",
  "Azure",
  "GCP",
  "Docker",
  "REST APIs",
  "LLM tools",
  "Experimentation",
  "Stakeholder communication",
  "ETL",
  "Data pipelines",
  "Cloud deployment",
];

const signalMap = [
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Remote",
  "Hybrid",
  "Graduate",
  "Junior",
  "Senior",
  "AI product",
  "Analytics",
  "Dashboarding",
  "Stakeholder-facing",
  "Customer-facing",
];

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { resume?: string; job?: string }
    | null;

  const resume = body?.resume?.trim() ?? "";
  const job = body?.job?.trim() ?? "";

  if (resume.length < 80 || job.length < 80) {
    return NextResponse.json(
      { error: "Resume and job description must both be at least 80 characters." },
      { status: 400 },
    );
  }

  const resumeSkills = extractTerms(resume, skillMap);
  const jobSkills = extractTerms(job, skillMap);
  const matchedSkills = jobSkills.filter((skill) => resumeSkills.includes(skill));
  const missingSkills = jobSkills.filter((skill) => !resumeSkills.includes(skill));
  const roleSignals = extractTerms(job, signalMap).slice(0, 5);

  const coverage = jobSkills.length ? matchedSkills.length / jobSkills.length : 0.45;
  const evidenceBonus = Math.min(resumeSkills.length * 2, 18);
  const score = Math.max(32, Math.min(96, Math.round(coverage * 74 + evidenceBonus + 12)));

  return NextResponse.json({
    score,
    level: score >= 82 ? "High-value target" : score >= 68 ? "Strong match" : score >= 52 ? "Possible fit" : "Stretch role",
    matchedSkills: matchedSkills.slice(0, 8),
    missingSkills: missingSkills.slice(0, 8),
    roleSignals: roleSignals.length ? roleSignals : ["Role intent unclear"],
    bullets: buildBullets(matchedSkills, missingSkills, roleSignals),
    summary: buildSummary(score, matchedSkills, missingSkills),
  });
}

function extractTerms(text: string, terms: string[]) {
  const normalized = text.toLowerCase();

  return terms.filter((term) => {
    const variants = termVariants(term);
    return variants.some((variant) => normalized.includes(variant));
  });
}

function termVariants(term: string) {
  const lower = term.toLowerCase();
  const variants = [lower];

  if (lower === "rest apis") variants.push("api", "apis", "rest");
  if (lower === "machine learning") variants.push("ml", "predictive modelling", "predictive modeling");
  if (lower === "llm tools") variants.push("llm", "large language model", "openai", "gemini");
  if (lower === "stakeholder communication") variants.push("stakeholder", "communication");
  if (lower === "dashboards") variants.push("dashboard", "reporting");
  if (lower === "data pipelines") variants.push("pipeline", "pipelines");
  if (lower === "cloud deployment") variants.push("cloud", "deployment", "vercel");
  if (lower === "ai product") variants.push("ai", "artificial intelligence", "llm");

  return variants;
}

function buildBullets(matched: string[], missing: string[], signals: string[]) {
  const matchedList = matched.slice(0, 4).join(", ") || "relevant technical skills";
  const signal = signals.find((item) => item !== "Role intent unclear") ?? "target role";
  const gap = missing[0] ?? "business impact";

  return [
    `Built role-relevant solutions using ${matchedList}, with emphasis on measurable delivery and practical business outcomes.`,
    `Translated messy requirements into clear technical workflows aligned with ${signal.toLowerCase()} role expectations.`,
    `Strengthened application positioning by connecting existing experience to ${gap} and the employer's stated priorities.`,
  ];
}

function buildSummary(score: number, matched: string[], missing: string[]) {
  if (score >= 82) {
    return `This is a high-priority application. Lead with ${matched.slice(0, 3).join(", ")} and apply with a tailored resume.`;
  }

  if (score >= 68) {
    return `This role is worth applying for if you rewrite your resume around the strongest overlaps and address ${missing[0] ?? "one clear gap"}.`;
  }

  if (score >= 52) {
    return `This is possible, but the resume needs sharper proof. Add a project or bullet that directly covers ${missing[0] ?? "the main missing skill"}.`;
  }

  return `This looks like a stretch. Save it only if the company is valuable, then build evidence for ${missing.slice(0, 2).join(" and ") || "the missing requirements"}.`;
}
