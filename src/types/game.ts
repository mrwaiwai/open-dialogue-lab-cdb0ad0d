export interface Scenario {
  id: number;
  role: 'teacher' | 'parent' | 'coach';
  category: string;
  title: string;
  description: string;
  context: string;
  options: Option[];
}

export interface Option {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  type: 'closed' | 'judgmental' | 'semi-open' | 'open';
  score: number;
  childReaction: string;
  childReactionEmoji: string;
  explanation: string;
  explanationPoints: string[];
  color: 'red' | 'orange' | 'yellow' | 'green';
  responsePattern: string;
}

export interface Answer {
  scenarioId: number;
  selectedOptionId: 'A' | 'B' | 'C' | 'D';
  score: number;
  type: string;
  category: string;
}

export interface CompletedGame {
  id: string;
  date: string;
  role: 'teacher' | 'parent' | 'coach';
  mode: 5 | 10 | 20;
  score: number;
  maxScore: number;
  answers: Answer[];
}

export type GameRole = 'teacher' | 'parent' | 'coach';
export type GameMode = 5 | 10 | 20;
