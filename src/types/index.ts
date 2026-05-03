export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface AIResponse {
  summary: string;
  keyPoints: string[];
  quiz: QuizQuestion[];
}

