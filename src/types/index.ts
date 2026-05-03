export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface AIResponse {
  originalSummary: string;
  simplifiedSummary: string;
  keyPoints: string[];
  quiz: QuizQuestion[];
}