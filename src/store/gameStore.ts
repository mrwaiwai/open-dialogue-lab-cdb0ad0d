import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Scenario, Answer, CompletedGame, GameRole, GameMode } from '@/types/game';
import { getScenariosByRole } from '@/data/scenarios';

interface GameState {
  selectedRole: GameRole | null;
  selectedMode: GameMode | null;
  currentQuestionIndex: number;
  selectedScenarios: Scenario[];
  answers: Answer[];
  totalScore: number;
  completedGames: CompletedGame[];
  reflections: string[];

  selectRole: (role: GameRole) => void;
  selectMode: (mode: GameMode) => void;
  answerQuestion: (answer: Answer) => void;
  nextQuestion: () => void;
  addReflection: (text: string) => void;
  resetGame: () => void;
  saveCompletedGame: () => void;
  clearHistory: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      selectedRole: null,
      selectedMode: null,
      currentQuestionIndex: 0,
      selectedScenarios: [],
      answers: [],
      totalScore: 0,
      completedGames: [],
      reflections: [],

      selectRole: (role) => set({ selectedRole: role }),

      selectMode: (mode) => {
        const { selectedRole } = get();
        if (!selectedRole) return;
        const allScenarios = getScenariosByRole(selectedRole);
        const shuffled = shuffleArray(allScenarios);
        const selected = shuffled.slice(0, mode);
        set({
          selectedMode: mode,
          selectedScenarios: selected,
          currentQuestionIndex: 0,
          answers: [],
          totalScore: 0,
          reflections: [],
        });
      },

      answerQuestion: (answer) => {
        set((state) => ({
          answers: [...state.answers, answer],
          totalScore: state.totalScore + answer.score,
        }));
      },

      nextQuestion: () => {
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
        }));
      },

      addReflection: (text) => {
        set((state) => ({
          reflections: [...state.reflections, text],
        }));
      },

      resetGame: () => {
        set({
          selectedRole: null,
          selectedMode: null,
          currentQuestionIndex: 0,
          selectedScenarios: [],
          answers: [],
          totalScore: 0,
          reflections: [],
        });
      },

      saveCompletedGame: () => {
        const { selectedRole, selectedMode, totalScore, answers } = get();
        if (!selectedRole || !selectedMode) return;
        const game: CompletedGame = {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          role: selectedRole,
          mode: selectedMode,
          score: totalScore,
          maxScore: selectedMode * 10,
          answers,
        };
        set((state) => ({
          completedGames: [game, ...state.completedGames].slice(0, 50),
        }));
      },

      clearHistory: () => set({ completedGames: [] }),
    }),
    {
      name: 'open-response-game',
      partialize: (state) => ({
        completedGames: state.completedGames,
      }),
    }
  )
);
