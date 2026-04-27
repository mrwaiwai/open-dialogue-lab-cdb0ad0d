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
  type: ResponseType;
  score: number;
  childReaction: string;
  childReactionEmoji: string;
  explanation: string;
  explanationPoints: string[];
  color: 'red' | 'orange' | 'yellow' | 'green';
  responsePattern: string;
}

export type ResponseType = 'closed' | 'judgmental' | 'semi-open' | 'open';
export type MessageSpeaker = 'guide' | 'scene' | 'child' | 'user' | 'analysis';
export type SupervisorMode = 'local' | 'deepseek';
export type SupervisorModel = 'deepseek-v4-flash';
export type PracticeSelectionMode = 'random' | 'custom';

export interface ConversationMessage {
  id: string;
  speaker: MessageSpeaker;
  label: string;
  text: string;
}

export interface ResponseSignalBreakdown {
  observation: number;
  emotion: number;
  curiosity: number;
  collaboration: number;
  judgment: number;
  command: number;
}

export interface ScenarioFeedback {
  summary: string;
  strengths: string[];
  risks: string[];
  recommendedReply: string;
  suggestedResponse: string;
  nextStep: string;
}

export interface SentenceAnalysis {
  index: number;
  sentence: string;
  type: ResponseType;
  tone: 'strength' | 'risk' | 'mixed';
  label: string;
  feedback: string;
  rewrite: string;
}

export interface ScenarioCaseBrief {
  presentingState: string[];
  scenePressure: string[];
  backgroundClues: string[];
  hiddenNeed: string;
}

export interface TurnGoal {
  title: string;
  description: string;
}

export interface ScenarioLens {
  openingLines: string[];
  emotionalSignals: string[];
  practiceGoal: string;
  coachFocus: string;
  starterPrompts: string[];
  caseBrief: ScenarioCaseBrief;
  turnGoals: TurnGoal[];
}

export interface TurnAnalysis {
  turn: number;
  selectedOptionId: 'A' | 'B' | 'C' | 'D';
  score: number;
  type: ResponseType;
  responseText: string;
  matchedOptionText: string;
  childReaction: string;
  childReactionEmoji: string;
  followUpPrompt: string;
  coachHint: string;
  coachSummary: string;
  suggestedResponse: string;
  signalBreakdown: ResponseSignalBreakdown;
  sentenceAnalyses: SentenceAnalysis[];
}

export interface ScenarioSession {
  scenarioId: number;
  currentTurn: number;
  maxTurns: number;
  transcript: ConversationMessage[];
  turnAnalyses: TurnAnalysis[];
  latestCoachHint: string;
  isComplete: boolean;
}

export interface ContinueSessionResult {
  session: ScenarioSession;
  answer?: Answer;
  warning?: string;
  usedSupervisorMode?: SupervisorMode;
}

export interface Answer {
  scenarioId: number;
  scenarioTitle: string;
  selectedOptionId: 'A' | 'B' | 'C' | 'D';
  score: number;
  type: ResponseType;
  category: string;
  responseText: string;
  responses: string[];
  matchedOptionText: string;
  childReaction: string;
  childReactionEmoji: string;
  transcript: ConversationMessage[];
  turnAnalyses: TurnAnalysis[];
  turnCount: number;
  signalBreakdown: ResponseSignalBreakdown;
  feedback: ScenarioFeedback;
  caseBrief: ScenarioCaseBrief;
  supervisorMode?: SupervisorMode;
  supervisorModel?: SupervisorModel | null;
}

export interface CompletedGame {
  id: string;
  date: string;
  role: 'teacher' | 'parent' | 'coach';
  mode: number;
  score: number;
  maxScore: number;
  answers: Answer[];
  reflections: string[];
  supervisorMode?: SupervisorMode;
  supervisorModel?: SupervisorModel | null;
  practiceSelectionMode?: PracticeSelectionMode;
}

export type GameRole = 'teacher' | 'parent' | 'coach';
export type GameMode = number;
