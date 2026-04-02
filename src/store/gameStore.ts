import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Answer,
  CompletedGame,
  GameMode,
  GameRole,
  PracticeSelectionMode,
  Scenario,
  SupervisorMode,
  SupervisorModel,
} from '@/types/game';
import { getScenariosByRole } from '@/data/scenarios';
import { resolveSupervisorMode } from '@/lib/aiSupervisor';

interface GameState {
  selectedRole: GameRole | null;
  selectedMode: GameMode | null;
  practiceSelectionMode: PracticeSelectionMode;
  currentQuestionIndex: number;
  selectedScenarios: Scenario[];
  answers: Answer[];
  totalScore: number;
  completedGames: CompletedGame[];
  reflections: string[];
  supervisorMode: SupervisorMode;
  deepseekApiKey: string;
  deepseekModel: SupervisorModel;

  selectRole: (role: GameRole) => void;
  selectMode: (mode: GameMode) => void;
  selectCustomScenarios: (scenarios: Scenario[]) => void;
  answerQuestion: (answer: Answer) => void;
  nextQuestion: () => void;
  addReflection: (text: string) => void;
  setSupervisorMode: (mode: SupervisorMode) => void;
  setDeepseekApiKey: (apiKey: string) => void;
  setDeepseekModel: (model: SupervisorModel) => void;
  resetGame: () => void;
  saveCompletedGame: () => void;
  clearHistory: () => void;
}

const defaultDeepseekApiKey = (import.meta.env.VITE_DEEPSEEK_API_KEY ?? '').trim();

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function buildPracticeState(
  scenarios: Scenario[],
  mode: GameMode | null,
  practiceSelectionMode: PracticeSelectionMode,
) {
  return {
    selectedMode: mode,
    practiceSelectionMode,
    selectedScenarios: scenarios,
    currentQuestionIndex: 0,
    answers: [],
    totalScore: 0,
    reflections: [],
  };
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      selectedRole: null,
      selectedMode: null,
      practiceSelectionMode: 'random',
      currentQuestionIndex: 0,
      selectedScenarios: [],
      answers: [],
      totalScore: 0,
      completedGames: [],
      reflections: [],
      supervisorMode: 'deepseek',
      deepseekApiKey: defaultDeepseekApiKey,
      deepseekModel: 'deepseek-chat',

      selectRole: (role) =>
        set({
          selectedRole: role,
          ...buildPracticeState([], null, 'random'),
        }),

      selectMode: (mode) => {
        const { selectedRole } = get();
        if (!selectedRole) return;
        const allScenarios = getScenariosByRole(selectedRole);
        const shuffled = shuffleArray(allScenarios);
        const selected = shuffled.slice(0, mode);
        set(buildPracticeState(selected, mode, 'random'));
      },

      selectCustomScenarios: (scenarios) => {
        if (!scenarios.length) return;
        const uniqueScenarios = Array.from(new Map(scenarios.map((scenario) => [scenario.id, scenario])).values());
        set(buildPracticeState(uniqueScenarios, uniqueScenarios.length, 'custom'));
      },

      answerQuestion: (answer) => {
        set((state) => ({
          answers: [...state.answers.filter((item) => item.scenarioId !== answer.scenarioId), answer],
          totalScore:
            state.answers
              .filter((item) => item.scenarioId !== answer.scenarioId)
              .reduce((sum, item) => sum + item.score, 0) + answer.score,
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

      setSupervisorMode: (mode) => set({ supervisorMode: mode }),

      setDeepseekApiKey: (apiKey) => set({ deepseekApiKey: apiKey }),

      setDeepseekModel: (model) => set({ deepseekModel: model }),

      resetGame: () => {
        set({
          selectedRole: null,
          selectedMode: null,
          practiceSelectionMode: 'random',
          currentQuestionIndex: 0,
          selectedScenarios: [],
          answers: [],
          totalScore: 0,
          reflections: [],
        });
      },

      saveCompletedGame: () => {
        const { selectedRole, selectedMode, totalScore, answers, reflections, supervisorMode, deepseekApiKey, deepseekModel, practiceSelectionMode } = get();
        if (!selectedRole || !selectedMode) return;
        const activeSupervisorMode = resolveSupervisorMode(supervisorMode, deepseekApiKey);
        const game: CompletedGame = {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          role: selectedRole,
          mode: selectedMode,
          score: totalScore,
          maxScore: selectedMode * 10,
          answers,
          reflections,
          supervisorMode: activeSupervisorMode,
          supervisorModel: activeSupervisorMode === 'deepseek' ? deepseekModel : null,
          practiceSelectionMode,
        };
        set((state) => ({
          completedGames: [game, ...state.completedGames].slice(0, 50),
        }));
      },

      clearHistory: () => set({ completedGames: [] }),
    }),
    {
      name: 'open-response-game',
      merge: (persistedState, currentState) => {
        const persisted = (persistedState as Partial<GameState> | undefined) ?? {};
        const persistedApiKey = typeof persisted.deepseekApiKey === 'string' ? persisted.deepseekApiKey.trim() : '';

        return {
          ...currentState,
          ...persisted,
          supervisorMode: 'deepseek',
          deepseekModel: 'deepseek-chat',
          deepseekApiKey: persistedApiKey || currentState.deepseekApiKey,
        };
      },
      partialize: (state) => ({
        completedGames: state.completedGames,
        supervisorMode: state.supervisorMode,
        deepseekApiKey: state.deepseekApiKey,
        deepseekModel: state.deepseekModel,
      }),
    }
  )
);
