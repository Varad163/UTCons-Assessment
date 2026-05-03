
export function validateResponse(data: any) {
  if (!data) {
    throw new Error("Empty AI response");
  }

  // ✅ summary
  if (typeof data.summary !== "string") {
    throw new Error("Invalid summary");
  }

  // ✅ keyPoints
  if (!Array.isArray(data.keyPoints)) {
    throw new Error("KeyPoints must be an array");
  }

  if (data.keyPoints.length < 3 || data.keyPoints.length > 5) {
    throw new Error("KeyPoints must be between 3 and 5");
  }

  // ✅ quiz
  if (!Array.isArray(data.quiz)) {
    throw new Error("Quiz must be an array");
  }

  if (data.quiz.length !== 3) {
    throw new Error("Quiz must contain exactly 3 questions");
  }

  data.quiz.forEach((q: any, index: number) => {
    if (!q.question || typeof q.question !== "string") {
      throw new Error(`Invalid question at index ${index}`);
    }

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      throw new Error(`Each question must have 4 options (index ${index})`);
    }

    if (!q.answer || typeof q.answer !== "string") {
      throw new Error(`Invalid answer at index ${index}`);
    }
  });

  return data;
}