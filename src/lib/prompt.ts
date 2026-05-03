// src/lib/prompt.ts

export function getPrompt(topic: string, grade: string): string {
  return `
You are an AI teacher.

Your task is to generate structured learning content.

IMPORTANT:
- Return ONLY valid JSON
- Do NOT include explanations outside JSON
- Keep language appropriate for grade ${grade}

Topic: ${topic}
Grade: ${grade}

Format:
{
  "summary": "Simple explanation of the topic",
  "keyPoints": ["Point 1", "Point 2", "Point 3"],
  "quiz": [
    {
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "answer": "Correct option"
    }
  ]
}
`;
}