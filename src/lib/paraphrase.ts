// src/lib/paraphrase.ts

import { model } from "@/lib/langchain";

export async function simplifySummary(text: string): Promise<string> {
  const prompt = `
You are a teacher explaining concepts to a beginner or young student.

Rewrite the following in very simple, easy-to-understand language.

Text:
${text}
`;

  try {
    const res = await model.invoke(prompt);
    return res.content as string;
  } catch (error) {
    return text;
  }
}