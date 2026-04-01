import { describe, expect, it } from 'vitest';
import { buildScenarioLens } from '@/lib/conversationEngine';
import { getSupervisorModeLabel, normalizeSupervisorTurnPayload } from '@/lib/aiSupervisor';
import type { Scenario } from '@/types/game';

const scenario: Scenario = {
  id: 1001,
  role: 'teacher',
  category: '課堂情緒',
  title: '學生上堂突然低頭沉默',
  description: '你見到學生上堂時一直低頭，手指拗住校服角，眼眶有少少紅，好似忍住唔想喊。',
  context: '課室入面其他同學都在做練習，四周算安靜，但學生明顯好緊繃。你記得佢今朝返學已經比平時沉默。',
  options: [
    {
      id: 'A',
      text: '「你快啲專心做嘢，唔好再發呆。」',
      type: 'closed',
      score: 1,
      childReaction: '學生肩膀更僵，細聲講「我知啦……」',
      childReactionEmoji: '😣',
      explanation: '太快糾正，情緒未被接住。',
      explanationPoints: ['先停一停，接住學生當下狀態。'],
      color: 'red',
      responsePattern: '封閉式',
    },
    {
      id: 'B',
      text: '「你又做咩情緒化成咁？」',
      type: 'judgmental',
      score: 0,
      childReaction: '學生即刻縮返入去，皺眉講「冇嘢。」',
      childReactionEmoji: '😠',
      explanation: '批評式開場會令學生防衛。',
      explanationPoints: ['避免一開口就定性對方。'],
      color: 'orange',
      responsePattern: '判斷式',
    },
    {
      id: 'C',
      text: '「你係咪因為做唔切所以唔開心？」',
      type: 'semi-open',
      score: 5,
      childReaction: '學生望一望你，但仍然未講真實原因，小聲講「唔知點講……」',
      childReactionEmoji: '😐',
      explanation: '有關心，但先替對方落咗判斷。',
      explanationPoints: ['第二句可以少啲假設，多啲空間。'],
      color: 'yellow',
      responsePattern: '半開放式',
    },
    {
      id: 'D',
      text: '「我見到你好似好頂住。如果你願意，可以同我講下而家最難受係咩？」',
      type: 'open',
      score: 10,
      childReaction: '學生慢慢鬆一點，紅住眼講「我唔想俾人見到我喊……」',
      childReactionEmoji: '🥺',
      explanation: '先觀察後邀請，會較容易令學生打開。',
      explanationPoints: ['先讓學生感到被看見，再進入內容。'],
      color: 'green',
      responsePattern: '開放式',
    },
  ],
};

describe('aiSupervisor', () => {
  it('normalizes AI turn payload into app-ready turn analysis', () => {
    const lens = buildScenarioLens(scenario);
    const result = normalizeSupervisorTurnPayload(
      {
        responseType: 'open',
        score: 9,
        sceneShift: '學生眼神終於望向你，但仍然好怕被人留意。',
        childReply: '我其實係驚一陣真係忍唔住喊出嚟。',
        childReactionEmoji: '🥺',
        coachSummary: '你先接近到情緒，所以學生開始願意講真正擔心。',
        coachHint: '下一輪可再問佢最擔心被人點睇，唔好太快安慰完就算。',
        suggestedResponse: '我聽到你而家最怕係俾人見到自己頂唔順。你最擔心接住會發生咩？',
        sentenceAnalyses: [
          {
            index: 1,
            sentence: '我見到你好似好辛苦。',
            type: 'open',
            tone: 'strength',
            label: '有先講觀察，安全感較高。',
            feedback: '學生會較易感到你真係睇到佢狀態。',
            rewrite: '我見到你而家似乎頂住好多唔舒服。',
          },
        ],
      },
      scenario,
      '我見到你好似好辛苦。',
      1,
      lens,
    );

    expect(result.turnAnalysis.type).toBe('open');
    expect(result.turnAnalysis.score).toBe(9);
    expect(result.turnAnalysis.followUpPrompt).toContain('驚');
    expect(result.turnAnalysis.sentenceAnalyses[0].feedback).toContain('學生');
    expect(result.finalFeedback).toBeUndefined();
  });

  it('fills missing AI fields with stable fallbacks and keeps final feedback when complete', () => {
    const lens = buildScenarioLens(scenario);
    const result = normalizeSupervisorTurnPayload(
      {
        responseType: 'semi-open',
        finalFeedback: {
          summary: '整體上你有慢慢由關心走向理解，但中段仍然有少少代入得太快。',
          strengths: ['你有停低睇到學生當下狀態。'],
          risks: ['第二輪仲可以少啲替學生估原因。'],
          suggestedResponse: '我而家最想先聽你講，你最在意係邊一部分？',
          nextStep: '下一次先觀察，再問最在意咩。',
        },
      },
      scenario,
      '你係咪因為做唔切所以唔開心？',
      3,
      lens,
    );

    expect(result.turnAnalysis.sentenceAnalyses.length).toBeGreaterThan(0);
    expect(result.turnAnalysis.suggestedResponse.length).toBeGreaterThan(0);
    expect(result.finalFeedback?.summary).toContain('整體上');
    expect(result.finalFeedback?.recommendedReply.length).toBeGreaterThan(0);
  });

  it('returns readable supervisor labels', () => {
    expect(getSupervisorModeLabel('local')).toBe('本地規則督導');
    expect(getSupervisorModeLabel('deepseek', 'deepseek-reasoner')).toContain('推理模式');
  });
});
