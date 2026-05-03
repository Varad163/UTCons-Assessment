// src/app/api/generate/route.ts

import { NextRequest, NextResponse } from "next/server";
import { model } from "@/lib/langchain";
import { getPrompt } from "@/lib/prompt";
import { validateResponse } from "@/lib/validator";
import { simplifySummary } from "@/lib/ paraphrase"; // ✅ FIXED import

// 🔧 Extract JSON safely (for Groq responses)
function extractJSON(text: string) {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : null;
}

export async function POST(req: NextRequest) {
  try {
    const { topic, grade } = await req.json();

    // ✅ Input validation
    if (!topic || !grade) {
      return NextResponse.json(
        { error: "Topic and grade are required" },
        { status: 400 }
      );
    }

    const prompt = getPrompt(topic, grade);

    let parsed: any = null;

    // 🔁 Retry logic (important for Groq)
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const aiRes = await model.invoke(prompt);

        const raw = aiRes.content as string;

        const jsonString = extractJSON(raw);
        if (!jsonString) throw new Error("No JSON found");

        parsed = JSON.parse(jsonString);

        // ✅ Validate structure
        parsed = validateResponse(parsed);

        break; // success
      } catch (err) {
        console.log("Attempt failed:", err);

        if (attempt === 1) {
          return NextResponse.json(
            { error: "Failed to process AI response" },
            { status: 500 }
          );
        }
      }
    }

    // 🧠 Paraphrasing (core requirement)
    const simplifiedSummary = await simplifySummary(parsed.summary);

    const finalResponse = {
      ...parsed,
      summary: simplifiedSummary,
    };

    return NextResponse.json(finalResponse);
  } catch (err) {
    console.error("Server Error:", err);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}