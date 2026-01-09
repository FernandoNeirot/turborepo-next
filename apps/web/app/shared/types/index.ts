
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}
export interface QuizStudyMaterial {
  question: string;
  options: string[];
  correctIndex: number;
}
export interface FlashcardStudyMaterial {
  question: string;
  answer: string;
}
export interface StudyMaterial {
  summary: string;
  flashcards: FlashcardStudyMaterial[];
  quiz: QuizStudyMaterial[];
}
