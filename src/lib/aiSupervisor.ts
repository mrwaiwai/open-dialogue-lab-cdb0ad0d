import {
  SCENARIO_TURNS,
  applyTurnAnalysisToSession,
  buildScenarioLens,
  buildSentenceAnalyses,
  buildSuggestedResponse,
  continueScenarioSession,
  getMatchedOption,
  getRolePartnerLabel,
  toSignalBreakdown,
} from '@/lib/conversationEngine';
import type {
  ContinueSessionResult,
  ResponseType,
  Scenario,
  ScenarioFeedback,
  ScenarioLens,
  ScenarioSession,
  SentenceAnalysis,
  SupervisorMode,
  SupervisorModel,
  TurnAnalysis,
} from '@/types/game';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const RESPONSE_TYPES: ResponseType[] = ['open', 'semi-open', 'judgmental', 'closed'];
const SENTENCE_TONES: SentenceAnalysis['tone'][] = ['strength', 'mixed', 'risk'];

const RESPONSE_SUMMARY_FALLBACK: Record<ResponseType, string> = {
  open: '你呢句有打開對話，對方會較容易慢慢講真實感受。',
  'semi-open': '你有想接住對方，但仲帶住少量假設，可以再開放一啲。',
  judgmental: '你呢句帶咗批評或定性，對方通常會即刻收埋自己。',
  closed: '你呢句太快進入追問或處理，情緒未真正被接住。',
};

const REACTION_EMOJI_FALLBACK: Record<ResponseType, string> = {
  open: '🥺',
  'semi-open': '😐',
  judgmental: '😠',
  closed: '😣',
};

type RawJson = Record<string, unknown>;

interface DeepSeekRuntimeConfig {
  deepseekProxyUrl?: string;
  deepseekProxyEnabled?: boolean;
}

interface SupervisorOptions {
  mode: SupervisorMode;
  deepseekApiKey: string;
  deepseekModel: SupervisorModel;
}

interface NormalizedSupervisorTurn {
  turnAnalysis: TurnAnalysis;
  finalFeedback?: ScenarioFeedback;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function asObject(value: unknown): RawJson | null {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as RawJson) : null;
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => asString(item)).filter(Boolean);
}

function cleanQuotedText(text: string) {
  return text.replace(/[「」]/g, '').trim();
}

function extractQuotedText(text: string) {
  const match = text.match(/「([^」]+)」/);
  return match?.[1]?.trim() ?? '';
}

function coerceResponseType(value: unknown, fallback: ResponseType): ResponseType {
  return RESPONSE_TYPES.includes(value as ResponseType) ? (value as ResponseType) : fallback;
}

function coerceTone(value: unknown, fallback: SentenceAnalysis['tone']): SentenceAnalysis['tone'] {
  return SENTENCE_TONES.includes(value as SentenceAnalysis['tone']) ? (value as SentenceAnalysis['tone']) : fallback;
}

function parseJsonContent(content: string): RawJson {
  const cleaned = content
    .trim()
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  try {
    return JSON.parse(cleaned) as RawJson;
  } catch {
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');

    if (start === -1 || end === -1 || end <= start) {
      throw new Error('AI 回傳內容不是有效 JSON。');
    }

    return JSON.parse(cleaned.slice(start, end + 1)) as RawJson;
  }
}

export function getRuntimeDeepSeekConfig(): DeepSeekRuntimeConfig {
  if (typeof window === 'undefined') return {};
  return window.openDialogueLabConfig ?? {};
}

export function canUseDeepSeekSupervisor(apiKey: string) {
  const runtime = getRuntimeDeepSeekConfig();
  return Boolean((runtime.deepseekProxyEnabled && runtime.deepseekProxyUrl) || apiKey.trim());
}

export function getSupervisorModeLabel(mode: SupervisorMode, model?: SupervisorModel | null) {
  if (mode === 'deepseek') {
    return model === 'deepseek-reasoner' ? '互動分析模式 · 深入版' : '互動分析模式';
  }

  return '基本分析模式';
}

function buildPromptHistory(session: ScenarioSession) {
  return session.transcript
    .filter((message) => message.speaker !== 'analysis' && message.speaker !== 'guide')
    .map((message) => `[${message.label}] ${message.text}`)
    .join('\n');
}

function buildSystemPrompt() {
  return `你是一位資深兒童溝通督導，同時要扮演場景中的個案角色。請只輸出 json，不要 markdown，不要補充說明。

你要同時完成兩件事：
1. 以場景中的孩子/學生/學員身份，回應使用者最新一句，語氣要自然、有人性、具體，不要機械式稱讚。
2. 以督導身份，對使用者最新一句做逐句分析、教學和改寫，要直接指出問題，也要提供可用的替代說法。

請使用繁體中文，口吻偏香港日常廣東話。輸出必須是 valid json。

json schema example:
{
  "responseType": "open",
  "score": 8,
  "sceneShift": "孩子肩膀鬆了一點，但仍然怕被批評。",
  "childReply": "我其實最驚你都會覺得係我自己搞出嚟。",
  "childReactionEmoji": "🥺",
  "coachSummary": "你先接近咗情緒，所以對方開始肯講真心話。",
  "coachHint": "下一輪可以再問對方最在意咩，唔好太快畀建議。",
  "suggestedResponse": "我聽到呢件事令你好委屈。你最在意、最頂住嘅係邊一部分？",
  "sentenceAnalyses": [
    {
      "index": 1,
      "sentence": "我留意到你好難受。",
      "type": "open",
      "tone": "strength",
      "label": "先觀察再接觸情緒，安全感較高。",
      "feedback": "這句幫對方感到被看見，所以比較容易再講落去。",
      "rewrite": "我留意到你而家似乎頂住好多唔舒服。"
    }
  ],
  "finalFeedback": {
    "summary": "你後段成功由承接情緒走向整理需要，整體節奏穩定。",
    "strengths": ["..."],
    "risks": ["..."],
    "recommendedReply": "...",
    "suggestedResponse": "...",
    "nextStep": "..."
  }
}

規則：
- responseType 只可以是 open、semi-open、judgmental、closed。
- tone 只可以是 strength、mixed、risk。
- score 必須是 0 到 10 的整數。
- sentenceAnalyses 必須覆蓋使用者最新一句的每個主要句子。
- sceneShift 是現場變化或情緒變化，不是重複 childReply。
- childReply 要承接前文，像真人一樣，有具體感受和顧慮。
- coachSummary 不要空泛稱讚，要點出這輪最重要的優點或問題。
- coachHint 要告訴使用者下一輪最應該怎樣回。
- suggestedResponse 要像真人會說的完整一句，不要只有提示詞。
- 如果未到最後一輪，finalFeedback 請回傳 null。
- 如果到了最後一輪，finalFeedback 必須完整。`;
}

function buildUserPrompt(
  scenario: Scenario,
  lens: ScenarioLens,
  session: ScenarioSession,
  responseText: string,
  model: SupervisorModel,
) {
  const turn = session.currentTurn + 1;
  const partnerLabel = getRolePartnerLabel(scenario.role);
  const bestOption = [...scenario.options].sort((left, right) => right.score - left.score)[0];

  return `請根據以下資料，用 json 回覆。

模型模式：${model}
對話對象：${partnerLabel}
場景分類：${scenario.category}
場景標題：${scenario.title}
場景描述：${scenario.description}
現場情境：${scenario.context}
個案當下狀態：${lens.caseBrief.presentingState.join(' / ')}
現場壓力：${lens.caseBrief.scenePressure.join(' / ')}
已知背景：${lens.caseBrief.backgroundClues.join(' / ')}
隱藏需要：${lens.caseBrief.hiddenNeed}
本輪目標：${lens.turnGoals[Math.min(turn - 1, lens.turnGoals.length - 1)]?.description ?? lens.practiceGoal}
理想回應方向：${cleanQuotedText(bestOption.text)}

已有對話紀錄：
${buildPromptHistory(session)}

使用者最新一句：
${responseText}

請特別做到：
1. 讓 ${partnerLabel} 的回應更像真人，而不是示範句。
2. 督導回饋要指出哪一句有問題、問題在哪、如何改。
3. 如果這句其實不錯，也要講明好在哪，不要只講「做得好」。
4. 如果這是第 ${turn} 輪，而且已經是最後一輪，finalFeedback 要給完整總結、亮點、風險、下一步和示範回應。

記住：只輸出 json。`;
}

async function callDeepSeek(
  requestPayload: RawJson,
  apiKey: string,
): Promise<RawJson> {
  const runtime = getRuntimeDeepSeekConfig();
  const useProxy = Boolean(runtime.deepseekProxyEnabled && runtime.deepseekProxyUrl);

  const response = await fetch(useProxy ? runtime.deepseekProxyUrl! : DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(useProxy ? {} : { Authorization: `Bearer ${apiKey.trim()}` }),
    },
    body: JSON.stringify(requestPayload),
  });

  const data = (await response.json().catch(() => null)) as RawJson | null;

  if (!response.ok) {
    const message =
      asString(data?.error) ||
      asString(asObject(data?.error)?.message) ||
      asString(data?.message) ||
      '系統暫時未能處理這次請求。';
    throw new Error(message);
  }

  return (data ?? {}) as RawJson;
}

function normalizeSentenceAnalyses(
  responseText: string,
  turn: number,
  lens: ScenarioLens,
  raw: unknown,
) {
  const fallback = buildSentenceAnalyses(responseText, turn, lens);
  if (!Array.isArray(raw) || raw.length === 0) return fallback;

  return fallback.map((item, index) => {
    const rawItem = asObject(raw[index]) ?? {};
    const type = coerceResponseType(rawItem.type, item.type);
    const tone = coerceTone(rawItem.tone, item.tone);

    return {
      index: index + 1,
      sentence: asString(rawItem.sentence) || item.sentence,
      type,
      tone,
      label: asString(rawItem.label) || item.label,
      feedback: asString(rawItem.feedback) || item.feedback,
      rewrite: asString(rawItem.rewrite) || item.rewrite,
    };
  });
}

export function normalizeSupervisorTurnPayload(
  raw: RawJson,
  scenario: Scenario,
  responseText: string,
  turn: number,
  lens: ScenarioLens,
): NormalizedSupervisorTurn {
  const normalizedResponse = responseText.trim();
  const fallbackType: ResponseType = 'semi-open';
  const responseType = coerceResponseType(raw.responseType, fallbackType);
  const matchedOption = getMatchedOption(scenario, responseType, normalizedResponse);
  const sentenceAnalyses = normalizeSentenceAnalyses(normalizedResponse, turn, lens, raw.sentenceAnalyses);
  const suggestedResponse = asString(raw.suggestedResponse) || buildSuggestedResponse(lens, turn, sentenceAnalyses);
  const sceneShift = asString(raw.sceneShift) || matchedOption.childReaction;
  const childReply = asString(raw.childReply) || extractQuotedText(matchedOption.childReaction) || matchedOption.childReaction;
  const score = clamp(Math.round(Number(raw.score) || matchedOption.score), 0, 10);
  const bestOption = [...scenario.options].sort((left, right) => right.score - left.score)[0];
  const finalFeedbackRaw = asObject(raw.finalFeedback);

  const turnAnalysis: TurnAnalysis = {
    turn,
    selectedOptionId: matchedOption.id,
    score,
    type: responseType,
    responseText: normalizedResponse,
    matchedOptionText: cleanQuotedText(matchedOption.text),
    childReaction: sceneShift,
    childReactionEmoji: asString(raw.childReactionEmoji) || matchedOption.childReactionEmoji || REACTION_EMOJI_FALLBACK[responseType],
    followUpPrompt: cleanQuotedText(childReply),
    coachHint:
      asString(raw.coachHint) ||
      lens.turnGoals[Math.min(turn, lens.turnGoals.length - 1)]?.description ||
      '下一輪再多問對方最在意嘅位置，先唔好急住講道理。',
    coachSummary: asString(raw.coachSummary) || RESPONSE_SUMMARY_FALLBACK[responseType],
    suggestedResponse,
    signalBreakdown: toSignalBreakdown(normalizedResponse),
    sentenceAnalyses,
  };

  let finalFeedback: ScenarioFeedback | undefined;

  if (turn >= SCENARIO_TURNS && finalFeedbackRaw) {
    const strengths = asStringArray(finalFeedbackRaw.strengths).slice(0, 3);
    const risks = asStringArray(finalFeedbackRaw.risks).slice(0, 3);
    const summary = asString(finalFeedbackRaw.summary);

    if (summary && strengths.length > 0 && risks.length > 0) {
      finalFeedback = {
        summary,
        strengths,
        risks,
        recommendedReply: asString(finalFeedbackRaw.recommendedReply) || cleanQuotedText(bestOption.text),
        suggestedResponse: asString(finalFeedbackRaw.suggestedResponse) || suggestedResponse,
        nextStep: asString(finalFeedbackRaw.nextStep) || turnAnalysis.coachHint,
      };
    }
  }

  return { turnAnalysis, finalFeedback };
}

export async function continueScenarioSessionWithSupervisor(
  scenario: Scenario,
  session: ScenarioSession,
  responseText: string,
  options: SupervisorOptions,
): Promise<ContinueSessionResult> {
  if (options.mode !== 'deepseek') {
    return continueScenarioSession(scenario, session, responseText);
  }

  if (!canUseDeepSeekSupervisor(options.deepseekApiKey)) {
    return {
      ...continueScenarioSession(scenario, session, responseText),
      warning: '系統設定未完成，所以這一輪已改用基本分析。',
    };
  }

  const lens = buildScenarioLens(scenario);
  const turn = session.currentTurn + 1;
  const requestPayload = {
    model: options.deepseekModel,
    messages: [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content: buildUserPrompt(scenario, lens, session, responseText.trim(), options.deepseekModel) },
    ],
    response_format: { type: 'json_object' },
    temperature: options.deepseekModel === 'deepseek-reasoner' ? 0.45 : 0.72,
    max_tokens: 1800,
    stream: false,
  };

  try {
    let rawResponse: RawJson | null = null;

    for (let attempt = 0; attempt < 2; attempt += 1) {
      const data = await callDeepSeek(requestPayload, options.deepseekApiKey);
      const firstChoice = Array.isArray(data.choices) ? asObject(data.choices[0]) : null;
      const choiceMessage = asObject(firstChoice?.message);
      const content = asString(choiceMessage?.content);

      if (!content) continue;

      rawResponse = parseJsonContent(content);
      break;
    }

    if (!rawResponse) {
      throw new Error('系統未有回傳可解析內容。');
    }

    const normalized = normalizeSupervisorTurnPayload(rawResponse, scenario, responseText, turn, lens);

    return applyTurnAnalysisToSession(scenario, session, normalized.turnAnalysis, {
      feedbackOverride: normalized.finalFeedback,
      supervisorMode: 'deepseek',
      supervisorModel: options.deepseekModel,
    });
  } catch (error) {
    const fallback = continueScenarioSession(scenario, session, responseText);
    const message = error instanceof Error ? error.message : '互動分析暫時未能回應。';

    return {
      ...fallback,
      warning: `互動分析暫時未能回應，已自動改用基本分析。${message}`,
    };
  }
}
