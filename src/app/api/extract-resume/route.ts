import { NextRequest, NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const formData = await request.formData().catch(() => null);
  const file = formData?.get("resume");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Upload a PDF resume file." }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF resumes are supported right now." }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Resume PDF must be smaller than 5 MB." }, { status: 400 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const parser = new PDFParse({ data: buffer });
    const parsed = await parser.getText();
    const text = cleanText(parsed.text);

    if (text.length < 80) {
      return NextResponse.json(
        {
          error:
            "Could not extract enough text from this PDF. Try a text-based resume or paste your resume manually.",
        },
        { status: 422 },
      );
    }

    return NextResponse.json({
      filename: file.name,
      pages: parsed.pages.length,
      text: text.length > 10000 ? `${text.slice(0, 10000)}...` : text,
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Could not read this PDF. Try exporting the resume again or paste the text manually.",
      },
      { status: 422 },
    );
  }
}

function cleanText(value: string) {
  return value
    .replace(/\u0000/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
