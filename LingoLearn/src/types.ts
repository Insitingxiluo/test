export type Pronunciation = {
  audio: string
  accent: 'us' | 'uk'
}

export type Word = {
  id: string
  term: string
  translation: string
  example: string
  image: string
  pronunciations: Pronunciation[]
  tags: string[]
}

export type QuizChoiceQuestion = {
  id: string
  type: 'choice'
  prompt: string
  options: string[]
  answer: string
}

export type QuizFillQuestion = {
  id: string
  type: 'fill'
  prompt: string
  answer: string
  bank: string[]
}

export type QuizOrderQuestion = {
  id: string
  type: 'order'
  prompt: string
  sentence: string[]
}

export type QuizListeningQuestion = {
  id: string
  type: 'listening'
  audio: string
  prompt: string
  answer: string
}

export type QuizQuestion =
  | QuizChoiceQuestion
  | QuizFillQuestion
  | QuizOrderQuestion
  | QuizListeningQuestion

export type ProgressSummary = {
  streakDays: number
  vocabularySize: number
  minutesStudied: number
  badges: { id: string; title: string; description: string; icon: string }[]
  history: { date: string; wordsLearned: number; minutes: number }[]
}

export type LessonData = {
  words: Word[]
  quizzes: QuizQuestion[]
  progress: ProgressSummary
}
