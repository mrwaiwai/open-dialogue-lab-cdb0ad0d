import { describe, expect, it } from 'vitest';
import {
  SCENARIO_TURNS,
  buildScenarioLens,
  continueScenarioSession,
  createScenarioSession,
  getTurnStarterPrompts,
} from '@/lib/conversationEngine';
import type { Scenario } from '@/types/game';

const scenario: Scenario = {
  id: 999,
  role: 'parent',
  category: '放學情緒',
  title: '孩子返屋企情緒低落',
  description:
    '小朋友返屋企之後低頭唔出聲，望住地下，好似忍住眼淚。你行近嘅時候，佢細聲講「我今日唔想講嘢……」',
  context: '客廳只得你同孩子兩個人，氣氛明顯比平時安靜。你記得佢最近幾次放學都特別沉默。',
  options: [
    {
      id: 'A',
      text: '「快啲講，發生咩事？」',
      type: 'closed',
      score: 1,
      childReaction: '孩子更加縮埋自己，低聲講「冇嘢啦……」',
      childReactionEmoji: '😣',
      explanation: '過快追問會令孩子更想退後。',
      explanationPoints: ['需要先接住情緒。'],
      color: 'red',
      responsePattern: '封閉式',
    },
    {
      id: 'B',
      text: '「你又係咁，成日返到屋企就擺款。」',
      type: 'judgmental',
      score: 0,
      childReaction: '孩子會覺得自己被責怪，皺眉講「算啦，你唔會明。」',
      childReactionEmoji: '😠',
      explanation: '批評會令孩子防衛。',
      explanationPoints: ['責備會阻斷對話。'],
      color: 'orange',
      responsePattern: '判斷式',
    },
    {
      id: 'C',
      text: '「你係咪今日好攰？要唔要食啲嘢先？」',
      type: 'semi-open',
      score: 5,
      childReaction: '孩子可能點頭，但未必講出真正困難，小聲講「我都唔知點講……」',
      childReactionEmoji: '😐',
      explanation: '有關心但仍帶住假設。',
      explanationPoints: ['可以再開放少少。'],
      color: 'yellow',
      responsePattern: '半開放式',
    },
    {
      id: 'D',
      text: '「我留意到你好似好難受。如果你願意，可以同我講下你而家最唔舒服係邊一部分？」',
      type: 'open',
      score: 10,
      childReaction: '孩子慢慢開始講出感受，紅住眼講「其實今日有人笑我……」',
      childReactionEmoji: '🥺',
      explanation: '先觀察再邀請表達，安全感較高。',
      explanationPoints: ['開放式探問有助對話展開。'],
      color: 'green',
      responsePattern: '開放式',
    },
  ],
};

describe('conversationEngine', () => {
  it('builds a richer scenario lens for multi-turn play', () => {
    const lens = buildScenarioLens(scenario);

    expect(lens.caseBrief.presentingState.length).toBeGreaterThan(0);
    expect(lens.caseBrief.scenePressure.length).toBeGreaterThan(0);
    expect(lens.caseBrief.backgroundClues.length).toBeGreaterThan(0);
    expect(lens.turnGoals).toHaveLength(SCENARIO_TURNS);
  });

  it('creates a playable session and starter prompts by turn', () => {
    const session = createScenarioSession(scenario);

    expect(session.currentTurn).toBe(0);
    expect(session.isComplete).toBe(false);
    expect(session.transcript.length).toBeGreaterThan(0);
    expect(getTurnStarterPrompts(0).length).toBeGreaterThan(0);
    expect(getTurnStarterPrompts(1).length).toBeGreaterThan(0);
    expect(getTurnStarterPrompts(2).length).toBeGreaterThan(0);
  });

  it('completes a scenario after three rounds and aggregates the result', () => {
    const session = createScenarioSession(scenario);
    const first = continueScenarioSession(
      scenario,
      session,
      '我留意到你好似好唔開心，如果你想，我可以陪你慢慢講。',
    );
    const second = continueScenarioSession(
      scenario,
      first.session,
      '聽落呢件事對你好重要，你最在意或者最難受係咩？',
    );
    const third = continueScenarioSession(
      scenario,
      second.session,
      '多謝你願意講到呢度。你而家最想我點陪你？我哋可以一齊諗。',
    );

    expect(first.session.isComplete).toBe(false);
    expect(second.session.currentTurn).toBe(2);
    expect(third.answer).toBeTruthy();
    expect(third.answer?.turnCount).toBe(SCENARIO_TURNS);
    expect(third.answer?.responses).toHaveLength(SCENARIO_TURNS);
    expect(third.answer?.score).toBeGreaterThanOrEqual(8);
    expect(third.answer?.turnAnalyses[0].sentenceAnalyses.length).toBeGreaterThan(0);
    expect(third.answer?.feedback.suggestedResponse.length).toBeGreaterThan(0);
  });

  it('captures repair when a weak first round improves later', () => {
    const session = createScenarioSession(scenario);
    const first = continueScenarioSession(scenario, session, '快啲講，做咩又唔出聲？');
    const second = continueScenarioSession(
      scenario,
      first.session,
      '我留意到你收埋自己，如果你願意，可以講下你最唔舒服係咩。',
    );
    const third = continueScenarioSession(
      scenario,
      second.session,
      '我聽到呢件事對你好大影響。你而家最想我點陪你？',
    );

    expect(first.session.turnAnalyses[0].type).not.toBe('open');
    expect(third.answer?.turnAnalyses[2].score).toBeGreaterThan(third.answer?.turnAnalyses[0].score ?? 0);
    expect(third.answer?.feedback.summary.length).toBeGreaterThan(0);
  });
});
