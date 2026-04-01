import type {
  Answer,
  ContinueSessionResult,
  ConversationMessage,
  GameRole,
  Option,
  ResponseSignalBreakdown,
  ResponseType,
  SentenceAnalysis,
  Scenario,
  ScenarioCaseBrief,
  ScenarioFeedback,
  ScenarioLens,
  ScenarioSession,
  SupervisorMode,
  SupervisorModel,
  TurnAnalysis,
  TurnGoal,
} from '@/types/game';

export const SCENARIO_TURNS = 3;

const ROLE_PARTNER_LABEL: Record<GameRole, string> = {
  teacher: '學生',
  parent: '孩子',
  coach: '學員',
};

const OBSERVATION_PATTERNS = ['我見到', '我留意到', '我聽到', '我發現', '見你', '睇到', '望到', '你而家'];
const EMOTION_PATTERNS = ['感覺', '心情', '嬲', '唔開心', '難過', '驚', '緊張', '失望', '委屈', '傷心', '焦慮', '壓力'];
const CURIOSITY_PATTERNS = ['可以同我講', '可唔可以講', '想唔想講', '你覺得', '發生咩事', '發生咗咩事', '點樣', '咩感覺', '最擔心', '最在意'];
const COLLABORATION_PATTERNS = ['一齊', '我陪你', '陪住你', '同你', '我哋可以', '一齊諗', '一齊睇', '慢慢嚟'];
const JUDGMENT_PATTERNS = ['點解你', '你又', '你成日', '你要', '唔乖', '無禮貌', '懶', '差', '錯', '曳', '討厭'];
const COMMAND_PATTERNS = ['快啲', '即刻', '立即', '唔好', '停止', '返去', '坐好', '收起', '冷靜', '出去', '先去'];
const CLOSED_PATTERNS = ['係咪', '要唔要', '好唔好', '有冇'];
const SOFT_GUIDE_PATTERNS = ['不如', '或者', '先', '可以'];
const BODY_CUE_KEYWORDS = ['眼', '手', '肩', '心', '淚', '哭', '震', '低頭', '望', '攬', '發白', '發抖', '面色', '呼吸', '咬', '縮', '拳', '腳'];
const PRESSURE_KEYWORDS = ['全班', '其他', '旁邊', '門口', '走廊', '觀眾', '家長', '同學', '隊友', '時間', '客廳', '課室', '操場', '飯桌', '體育館', '排隊', '氣氛'];
const BACKGROUND_KEYWORDS = ['上次', '最近', '呢排', '一直', '今日', '今朝', '尋日', '上個月', '上星期', '之前', '啱啱', '記得', '知道', '已經'];

const TURN_GOALS: TurnGoal[] = [
  { title: '第 1 輪', description: '先接住當下情緒，讓對方覺得你有看見他現在的狀態。' },
  { title: '第 2 輪', description: '開始探核心需要、壓力來源，避免太快跳去解決。' },
  { title: '第 3 輪', description: '陪對方整理最需要的支持或下一步，讓對話有收束感。' },
];

const SUMMARY_BY_TYPE: Record<ResponseType, string> = {
  open: '你嘅回應偏向開放式，較能接住情緒同打開對話。',
  'semi-open': '你有關心同引導，但仍然稍為限制咗對方表達方向。',
  judgmental: '你嘅回應帶有批評或預設，對方較容易進入防衛。',
  closed: '你嘅回應較快落入指令或封閉提問，對話空間比較窄。',
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalizeText(text: string) {
  return text.replace(/\s+/g, '').toLowerCase();
}

function splitSentences(text: string) {
  return text
    .split(/[。！？!?]/)
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function splitInputSentences(text: string) {
  return text
    .split(/\n|[。！？!?]/)
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function splitFragments(text: string) {
  return text
    .split(/[，。！？!?；;、]/)
    .map((segment) => segment.trim())
    .filter((segment) => segment.length >= 4);
}

function countPatternHits(text: string, patterns: string[]) {
  return patterns.reduce((total, pattern) => total + (text.includes(pattern) ? 1 : 0), 0);
}

function getQuestionCount(text: string) {
  return (text.match(/[?？]/g) ?? []).length;
}

function unique<T>(items: T[]) {
  return [...new Set(items)];
}

function getBestOption(scenario: Scenario) {
  return [...scenario.options].sort((a, b) => b.score - a.score)[0];
}

function getOptionByType(scenario: Scenario, type: ResponseType) {
  return scenario.options.find((option) => option.type === type);
}

export function getRolePartnerLabel(role: GameRole) {
  return ROLE_PARTNER_LABEL[role];
}

export function toSignalBreakdown(text: string): ResponseSignalBreakdown {
  return {
    observation: countPatternHits(text, OBSERVATION_PATTERNS),
    emotion: countPatternHits(text, EMOTION_PATTERNS),
    curiosity: countPatternHits(text, CURIOSITY_PATTERNS) + getQuestionCount(text),
    collaboration: countPatternHits(text, COLLABORATION_PATTERNS),
    judgment: countPatternHits(text, JUDGMENT_PATTERNS),
    command: countPatternHits(text, COMMAND_PATTERNS),
  };
}

function inferResponseType(text: string, signals: ResponseSignalBreakdown): ResponseType {
  const trimmed = text.trim();
  const normalized = normalizeText(trimmed);
  const shortReply = normalized.length <= 12;
  const startsWithWhy = /^(點解|为什么|為什麼)/.test(trimmed);
  const hasClosedPattern = CLOSED_PATTERNS.some((pattern) => trimmed.includes(pattern));
  const hasSoftGuide = SOFT_GUIDE_PATTERNS.some((pattern) => trimmed.includes(pattern));

  const scores = {
    open:
      signals.observation * 3 +
      signals.emotion * 3 +
      signals.curiosity * 2 +
      signals.collaboration * 2 +
      (trimmed.includes('可以') ? 1 : 0) +
      (trimmed.includes('想唔想') ? 2 : 0) +
      (shortReply ? -1 : 1),
    'semi-open':
      signals.observation +
      signals.curiosity * 2 +
      (hasClosedPattern ? 2 : 0) +
      (hasSoftGuide ? 2 : 0) +
      (trimmed.includes('先') ? 1 : 0),
    judgmental:
      signals.judgment * 3 +
      (startsWithWhy ? 3 : 0) +
      (trimmed.includes('又') ? 2 : 0) +
      (trimmed.includes('應該') ? 2 : 0),
    closed:
      signals.command * 3 +
      (hasClosedPattern ? 2 : 0) +
      (shortReply ? 2 : 0) +
      (signals.curiosity === 0 ? 1 : 0),
  } as const;

  let selectedType = (Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'semi-open') as ResponseType;

  if (selectedType === 'open' && signals.curiosity === 0 && signals.collaboration === 0) {
    selectedType = hasClosedPattern ? 'semi-open' : 'closed';
  }

  if (selectedType === 'closed' && signals.judgment > 0) {
    selectedType = 'judgmental';
  }

  if (selectedType === 'semi-open' && signals.observation > 0 && signals.emotion > 0 && signals.curiosity > 0) {
    selectedType = 'open';
  }

  return selectedType;
}

function overlapScore(option: Option, normalizedReply: string) {
  const tokens = option.text
    .replace(/[「」]/g, '')
    .split(/[，。！？!?、\s]/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2);

  return tokens.reduce((score, token) => score + (normalizedReply.includes(normalizeText(token)) ? 1 : 0), 0);
}

export function getMatchedOption(scenario: Scenario, responseType: ResponseType, text: string) {
  const directMatch = getOptionByType(scenario, responseType);
  if (directMatch) return directMatch;

  const normalized = normalizeText(text);

  return [...scenario.options].sort((left, right) => {
    const leftScore = overlapScore(left, normalized);
    const rightScore = overlapScore(right, normalized);
    return rightScore - leftScore;
  })[0];
}

function summarizeSentenceLabel(type: ResponseType, signals: ResponseSignalBreakdown) {
  if (type === 'open' && signals.observation > 0 && signals.emotion > 0) return '有接住情緒';
  if (type === 'open') return '有打開對話';
  if (type === 'semi-open') return '有關心但帶少量假設';
  if (type === 'judgmental') return '帶批評或預設';
  return '太快進入處理';
}

function buildSentenceFeedback(type: ResponseType, signals: ResponseSignalBreakdown) {
  if (type === 'open' && signals.observation > 0 && signals.emotion > 0) {
    return '這句先講觀察，再碰感受，對方較容易覺得你真的有看見他。';
  }
  if (type === 'open') {
    return '這句有留下說下去的空間，能幫對方把內容慢慢講出來。';
  }
  if (type === 'semi-open') {
    return '這句有善意，但仍然替對方預設了原因，容易把真正重點收窄。';
  }
  if (type === 'judgmental') {
    return '這句聽起來像在指責或定性，對方通常會先防衛，而不是繼續講。';
  }
  return '這句太快進入指令、追問或處理，情緒還未被接住。';
}

function buildSentenceRewrite(
  sentence: string,
  type: ResponseType,
  turn: number,
  lens: ScenarioLens,
  signals: ResponseSignalBreakdown,
) {
  if (type === 'open' && signals.observation > 0 && signals.curiosity > 0) {
    return sentence;
  }

  const observation = lens.caseBrief.presentingState[0] ?? '我留意到你而家好似有啲唔容易';
  const turnPrompt =
    turn === 1
      ? '你而家最大感覺係咩？'
      : turn === 2
        ? '你最在意或者最擔心係咩？'
        : '你而家最想我點陪你？';

  const baseObservation = observation.replace(/[。！？!?]+$/, '');

  if (type === 'judgmental') {
    return `${baseObservation}，${turnPrompt}`;
  }

  if (type === 'closed') {
    return `${baseObservation}，${turnPrompt}`;
  }

  if (type === 'semi-open') {
    return `${baseObservation}。${turnPrompt}`;
  }

  if (type === 'open') {
    return signals.emotion === 0 ? `${baseObservation}，${turnPrompt}` : `${sentence.replace(/[。！？!?]+$/, '')}。`;
  }

  return `${baseObservation}，${turnPrompt}`;
}

export function buildSentenceAnalyses(responseText: string, turn: number, lens: ScenarioLens): SentenceAnalysis[] {
  const sentences = splitInputSentences(responseText);

  return sentences.map((sentence, index) => {
    const signals = toSignalBreakdown(sentence);
    const type = inferResponseType(sentence, signals);
    const tone: SentenceAnalysis['tone'] =
      type === 'open' ? 'strength' : type === 'semi-open' ? 'mixed' : 'risk';

    return {
      index: index + 1,
      sentence,
      type,
      tone,
      label: summarizeSentenceLabel(type, signals),
      feedback: buildSentenceFeedback(type, signals),
      rewrite: buildSentenceRewrite(sentence, type, turn, lens, signals),
    };
  });
}

function buildSentenceAnalysisMessage(sentenceAnalyses: SentenceAnalysis[]) {
  return sentenceAnalyses
    .map((analysis) => {
      const toneLabel = analysis.tone === 'strength' ? '亮點' : analysis.tone === 'mixed' ? '可再打開' : '問題';
      return `第 ${analysis.index} 句：「${analysis.sentence}」\n${toneLabel}：${analysis.feedback}\n可改成：${analysis.rewrite}`;
    })
    .join('\n\n');
}

export function buildSuggestedResponse(lens: ScenarioLens, turn: number, sentenceAnalyses: SentenceAnalysis[]) {
  const strongSentence = sentenceAnalyses.find((analysis) => analysis.tone === 'strength');
  const repairedSentence = sentenceAnalyses.find((analysis) => analysis.tone !== 'strength');
  const baseObservation = (strongSentence?.sentence || lens.caseBrief.presentingState[0] || '我留意到你而家好似有啲唔容易').replace(/[。！？!?]+$/, '');

  const turnPrompt =
    turn === 1
      ? '你而家最大感覺係咩？'
      : turn === 2
        ? '你最在意或者最擔心係咩？'
        : '你而家最想我點陪你？';

  if (repairedSentence) {
    return `${baseObservation}。${turnPrompt}`;
  }

  return strongSentence?.sentence ?? `${baseObservation}。${turnPrompt}`;
}

function buildFinalSuggestedResponse(bestOption: Option) {
  const cleaned = bestOption.text.replace(/[「」]/g, '').replace(/^[（(].*?[)）]\s*/, '');
  if (cleaned.includes('陪') || cleaned.includes('一齊')) return cleaned;
  return `${cleaned} 如果你願意，我會陪你一齊慢慢講。`;
}

function buildTurnScore(baseScore: number, signals: ResponseSignalBreakdown, turn: number) {
  const bonus =
    (signals.observation > 0 ? 1 : 0) +
    (signals.emotion > 0 ? 1 : 0) +
    (signals.collaboration > 0 ? 1 : 0) +
    (turn > 1 && signals.curiosity > 0 ? 1 : 0);
  const penalty = (signals.judgment > 0 ? 1 : 0) + (signals.command > 1 ? 1 : 0);
  return clamp(Math.round(baseScore + bonus * 0.5 - penalty * 0.5), 0, 10);
}

function getQuotedLines(text: string) {
  return [...text.matchAll(/「([^」]+)」/g)].map((match) => match[1].trim()).filter(Boolean);
}

function pickFragments(source: string, keywords: string[], fallbackSource: string, limit: number) {
  const primary = splitFragments(source).filter((fragment) => keywords.some((keyword) => fragment.includes(keyword)));
  const fallback = splitFragments(fallbackSource);
  return unique([...primary, ...fallback]).slice(0, limit);
}

function buildCaseBrief(scenario: Scenario, bestOption: Option): ScenarioCaseBrief {
  return {
    presentingState: pickFragments(scenario.description, BODY_CUE_KEYWORDS, scenario.description, 3),
    scenePressure: pickFragments(scenario.context, PRESSURE_KEYWORDS, `${scenario.context}，${scenario.description}`, 3),
    backgroundClues: pickFragments(`${scenario.description}，${scenario.context}`, BACKGROUND_KEYWORDS, scenario.context, 3),
    hiddenNeed: bestOption.explanationPoints[0] ?? bestOption.explanation,
  };
}

function getStarterPromptsForTurn(turn: number) {
  if (turn === 0) {
    return [
      '我留意到你而家好似有啲唔容易。',
      '你而家心入面最大感覺係咩？',
      '如果你願意，可以同我講下發生咩事。',
    ];
  }

  if (turn === 1) {
    return [
      '聽落呢件事對你好重要。',
      '你最在意或者最擔心係咩？',
      '可唔可以同我講多一點背後發生咩事？',
    ];
  }

  return [
    '多謝你願意講到呢度。',
    '你而家最想我點陪你？',
    '我哋可以一齊諗下下一步會點。',
  ];
}

function buildOpeningLines(scenario: Scenario, caseBrief: ScenarioCaseBrief) {
  const quotedLines = getQuotedLines(scenario.description);
  if (quotedLines.length) return quotedLines.slice(0, 2);

  const openQuote = getQuoteFromOption(getOptionByType(scenario, 'open') ?? getBestOption(scenario));
  if (openQuote) return [openQuote];

  return ['我而家有啲亂，不知點同你講。'];
}

export function buildScenarioLens(scenario: Scenario): ScenarioLens {
  const bestOption = getBestOption(scenario);
  const caseBrief = buildCaseBrief(scenario, bestOption);

  return {
    openingLines: buildOpeningLines(scenario, caseBrief),
    emotionalSignals: caseBrief.presentingState,
    practiceGoal: `今題會用 ${SCENARIO_TURNS} 輪對話，由接情緒、探核心到整理下一步。`,
    coachFocus: bestOption.explanationPoints[0] ?? bestOption.explanation,
    starterPrompts: getStarterPromptsForTurn(0),
    caseBrief,
    turnGoals: TURN_GOALS,
  };
}

export function getTurnStarterPrompts(turn: number) {
  return getStarterPromptsForTurn(turn);
}

export function buildScenarioMessages(scenario: Scenario): ConversationMessage[] {
  const lens = buildScenarioLens(scenario);

  return [
    {
      id: `${scenario.id}-guide-intro`,
      speaker: 'guide',
      label: '訓練教練',
      text: `場景已開啟：${scenario.title}。呢題會做 ${SCENARIO_TURNS} 輪對話，先接情緒，再慢慢探核心。`,
    },
    {
      id: `${scenario.id}-scene-context`,
      speaker: 'scene',
      label: '當下場景',
      text: scenario.context,
    },
    ...lens.openingLines.map((line, index) => ({
      id: `${scenario.id}-child-${index}`,
      speaker: 'child' as const,
      label: ROLE_PARTNER_LABEL[scenario.role],
      text: `「${line.replace(/[「」]/g, '')}」`,
    })),
  ];
}

export function createScenarioSession(scenario: Scenario): ScenarioSession {
  const lens = buildScenarioLens(scenario);

  return {
    scenarioId: scenario.id,
    currentTurn: 0,
    maxTurns: SCENARIO_TURNS,
    transcript: buildScenarioMessages(scenario),
    turnAnalyses: [],
    latestCoachHint: lens.turnGoals[0]?.description ?? '',
    isComplete: false,
  };
}

function getQuoteFromOption(option: Option) {
  return getQuotedLines(option.childReaction)[0];
}

function getFallbackDisclosureLine(turn: number, responseType: ResponseType) {
  const byType: Record<ResponseType, string[]> = {
    open: [
      '其實我都忍咗一陣，我唔知點同人講。',
      '我最卡住嘅，其實唔止係表面嗰件事。',
      '如果可以，我其實想有人陪我一齊面對。',
    ],
    'semi-open': [
      '我都唔知點講好……',
      '可能係因為我一直都好擔心。',
      '我想先有人肯聽我講完。',
    ],
    judgmental: [
      '算啦，講咗都冇用。',
      '你唔會明我點解會咁。',
      '我而家想自己靜一下。',
    ],
    closed: [
      '冇嘢啦。',
      '都係算啦，我唔想再講。',
      '我想自己靜一下。',
    ],
  };

  return byType[responseType][turn - 1] ?? byType[responseType][byType[responseType].length - 1];
}

function getClosingLine(responseType: ResponseType) {
  if (responseType === 'open') return '多謝你肯咁樣聽我講，我而家覺得冇咁頂住。';
  if (responseType === 'semi-open') return '起碼你肯停低聽我講，我而家冇頭先咁逼。';
  return '我而家都仲想自己靜下先。';
}

function buildFollowUpPrompt(
  scenario: Scenario,
  matchedOption: Option,
  turn: number,
  responseType: ResponseType,
  isLastTurn: boolean,
) {
  if (isLastTurn) return getClosingLine(responseType);

  const preferredOption =
    responseType === 'open'
      ? getOptionByType(scenario, 'open') ?? matchedOption
      : responseType === 'semi-open'
        ? getOptionByType(scenario, 'semi-open') ?? getOptionByType(scenario, 'open') ?? matchedOption
        : getOptionByType(scenario, responseType) ?? matchedOption;

  const quoted = getQuoteFromOption(preferredOption);
  return quoted ?? getFallbackDisclosureLine(turn, responseType);
}

function getCoachHint(turn: number, responseType: ResponseType) {
  if (turn >= SCENARIO_TURNS) {
    return '對話已完成，準備睇返你點樣由第一句帶到最後一輪。';
  }

  if (turn === 1) {
    if (responseType === 'open') return '對方開始鬆動。第二輪試探核心擔心或最在意嘅位置。';
    if (responseType === 'semi-open') return '對方開始有反應，但仲保留住。第二輪少啲假設，多啲真正好奇。';
    return '對方開始防衛。下一句先講觀察，放慢節奏，仲有機會修復返。';
  }

  if (responseType === 'open') return '最後一輪可以幫對方整理需要，或者一齊諗下一步。';
  if (responseType === 'semi-open') return '最後一輪可先確認感受，再問對方而家最需要咩支持。';
  return '最後一輪先穩定關係，唔好急住糾正或講道理。';
}

function aggregateSignalsFromTurns(turnAnalyses: TurnAnalysis[]): ResponseSignalBreakdown {
  return turnAnalyses.reduce(
    (acc, turn) => ({
      observation: acc.observation + turn.signalBreakdown.observation,
      emotion: acc.emotion + turn.signalBreakdown.emotion,
      curiosity: acc.curiosity + turn.signalBreakdown.curiosity,
      collaboration: acc.collaboration + turn.signalBreakdown.collaboration,
      judgment: acc.judgment + turn.signalBreakdown.judgment,
      command: acc.command + turn.signalBreakdown.command,
    }),
    { observation: 0, emotion: 0, curiosity: 0, collaboration: 0, judgment: 0, command: 0 },
  );
}

function getDominantResponseType(turnAnalyses: TurnAnalysis[]) {
  const weighted = turnAnalyses.reduce<Record<ResponseType, number>>(
    (acc, turn) => ({
      ...acc,
      [turn.type]: acc[turn.type] + turn.score + 1,
    }),
    { open: 0, 'semi-open': 0, judgmental: 0, closed: 0 },
  );

  return (Object.entries(weighted).sort((a, b) => b[1] - a[1])[0]?.[0] ?? 'semi-open') as ResponseType;
}

function buildFinalFeedback(
  scenario: Scenario,
  turnAnalyses: TurnAnalysis[],
  signals: ResponseSignalBreakdown,
): ScenarioFeedback {
  const bestOption = getBestOption(scenario);
  const strengths: string[] = [];
  const risks: string[] = [];
  const openTurns = turnAnalyses.filter((turn) => turn.type === 'open').length;
  const supportiveTurns = turnAnalyses.filter((turn) => turn.type === 'open' || turn.type === 'semi-open').length;
  const improved = turnAnalyses.at(-1) && turnAnalyses[0] ? turnAnalyses.at(-1)!.score > turnAnalyses[0].score : false;

  if (openTurns >= 2) strengths.push('你能夠用多輪開放式回應，把對話由情緒帶到較深層需要。');
  if (signals.observation > 0) strengths.push('你有重覆回到現場線索同情緒狀態，令對方較容易覺得被看見。');
  if (signals.collaboration > 0 || turnAnalyses.some((turn) => turn.responseText.includes('一齊') || turn.responseText.includes('陪'))) {
    strengths.push('你有傳達陪伴感，而唔係只想快啲處理問題。');
  }
  if (improved) strengths.push('你中後段有修復到對話，代表你開始掌握多輪回應節奏。');

  if (supportiveTurns <= 1) risks.push('三輪入面仍有較多句子偏向糾正或處理，對方容易一再縮返入去。');
  if (signals.judgment > 0) risks.push('字句帶住預設或批評時，對方會先保護自己，真實內容就較難再講出嚟。');
  if (signals.command > 1) risks.push('你有幾次太快跳去指令或解決，情緒未完全被承接。');
  if (signals.curiosity < 2) risks.push('可以再多用「最在意」「最擔心」呢類問題，讓第二、三輪更有深度。');

  if (strengths.length === 0) strengths.push(bestOption.explanationPoints[0] ?? '你願意停低聽，已經係建立信任嘅起點。');
  if (risks.length === 0) risks.push(bestOption.explanationPoints[1] ?? '下一步可以更穩定地先觀察、再接情緒、最後先談下一步。');

  let summary = '你已經完成多輪來回，但仍可再加強由情緒走向核心需要嘅節奏。';
  if (openTurns >= 2) {
    summary = '你能夠用多輪開放式回應，逐步接情緒、探核心，再把對話帶去需要與支持。';
  } else if (improved) {
    summary = '你後段有修復到對話，說明你已開始掌握多輪互動中「拉返近」對方嘅能力。';
  } else if (supportiveTurns <= 1) {
    summary = '你嘅多輪對話仍較多停留喺糾正或處理，對方比較難真正打開心扉。';
  }

  return {
    summary,
    strengths: unique(strengths).slice(0, 3),
    risks: unique(risks).slice(0, 3),
    recommendedReply: bestOption.text.replace(/[「」]/g, ''),
    suggestedResponse: buildFinalSuggestedResponse(bestOption),
    nextStep: bestOption.explanationPoints[0] ?? bestOption.explanation,
  };
}

function buildScenarioScore(turnAnalyses: TurnAnalysis[]) {
  if (turnAnalyses.length === 0) return 0;

  const average = turnAnalyses.reduce((sum, turn) => sum + turn.score, 0) / turnAnalyses.length;
  const improvementBonus = turnAnalyses.at(-1) && turnAnalyses[0] && turnAnalyses.at(-1)!.score > turnAnalyses[0].score ? 1 : 0;
  const openBonus = turnAnalyses.filter((turn) => turn.type === 'open').length >= 2 ? 1 : 0;
  const repairBonus =
    turnAnalyses.some((turn) => turn.type === 'judgmental' || turn.type === 'closed') &&
    (turnAnalyses.at(-1)?.type === 'open' || turnAnalyses.at(-1)?.type === 'semi-open')
      ? 1
      : 0;

  return clamp(Math.round(average + improvementBonus + openBonus + repairBonus), 0, 10);
}

function finalizeAnswer(
  scenario: Scenario,
  lens: ScenarioLens,
  transcript: ConversationMessage[],
  turnAnalyses: TurnAnalysis[],
  options?: {
    feedbackOverride?: ScenarioFeedback;
    supervisorMode?: SupervisorMode;
    supervisorModel?: SupervisorModel | null;
  },
): Answer {
  const signals = aggregateSignalsFromTurns(turnAnalyses);
  const score = buildScenarioScore(turnAnalyses);
  const type = getDominantResponseType(turnAnalyses);
  const feedback = options?.feedbackOverride ?? buildFinalFeedback(scenario, turnAnalyses, signals);
  const lastTurn = turnAnalyses[turnAnalyses.length - 1];

  return {
    scenarioId: scenario.id,
    scenarioTitle: scenario.title,
    selectedOptionId: lastTurn.selectedOptionId,
    score,
    type,
    category: scenario.category,
    responseText: turnAnalyses.map((turn, index) => `第 ${index + 1} 輪：${turn.responseText}`).join('\n'),
    responses: turnAnalyses.map((turn) => turn.responseText),
    matchedOptionText: lastTurn.matchedOptionText,
    childReaction: lastTurn.childReaction,
    childReactionEmoji: lastTurn.childReactionEmoji,
    transcript,
    turnAnalyses,
    turnCount: turnAnalyses.length,
    signalBreakdown: signals,
    feedback,
    caseBrief: lens.caseBrief,
    supervisorMode: options?.supervisorMode ?? 'local',
    supervisorModel: options?.supervisorModel ?? null,
  };
}

export function applyTurnAnalysisToSession(
  scenario: Scenario,
  session: ScenarioSession,
  turnAnalysis: TurnAnalysis,
  options?: {
    feedbackOverride?: ScenarioFeedback;
    supervisorMode?: SupervisorMode;
    supervisorModel?: SupervisorModel | null;
  },
): ContinueSessionResult {
  const lens = buildScenarioLens(scenario);
  const isLastTurn = turnAnalysis.turn >= session.maxTurns;

  const transcript: ConversationMessage[] = [
    ...session.transcript,
    {
      id: `${scenario.id}-user-${turnAnalysis.turn}`,
      speaker: 'user',
      label: '你',
      text: turnAnalysis.responseText,
    },
    {
      id: `${scenario.id}-coach-summary-${turnAnalysis.turn}`,
      speaker: 'analysis',
      label: '教練即時分析',
      text: `${turnAnalysis.coachSummary}\n\n這輪建議：${turnAnalysis.coachHint}`,
    },
    {
      id: `${scenario.id}-coach-sentences-${turnAnalysis.turn}`,
      speaker: 'analysis',
      label: '逐句拆解',
      text: buildSentenceAnalysisMessage(turnAnalysis.sentenceAnalyses),
    },
    {
      id: `${scenario.id}-coach-rewrite-${turnAnalysis.turn}`,
      speaker: 'analysis',
      label: '可改成咁講',
      text: turnAnalysis.suggestedResponse,
    },
    {
      id: `${scenario.id}-scene-shift-${turnAnalysis.turn}`,
      speaker: 'scene',
      label: '現場變化',
      text: turnAnalysis.childReaction,
    },
    {
      id: `${scenario.id}-child-followup-${turnAnalysis.turn}`,
      speaker: 'child',
      label: ROLE_PARTNER_LABEL[scenario.role],
      text: `「${turnAnalysis.followUpPrompt.replace(/[「」]/g, '')}」`,
    },
  ];

  const turnAnalyses = [...session.turnAnalyses, turnAnalysis];
  const updatedSession: ScenarioSession = {
    scenarioId: session.scenarioId,
    currentTurn: turnAnalysis.turn,
    maxTurns: session.maxTurns,
    transcript,
    turnAnalyses,
    latestCoachHint: turnAnalysis.coachHint,
    isComplete: isLastTurn,
  };

  if (!isLastTurn) {
    return {
      session: updatedSession,
      usedSupervisorMode: options?.supervisorMode ?? 'local',
    };
  }

  return {
    session: updatedSession,
    answer: finalizeAnswer(scenario, lens, transcript, turnAnalyses, options),
    usedSupervisorMode: options?.supervisorMode ?? 'local',
  };
}

export function continueScenarioSession(
  scenario: Scenario,
  session: ScenarioSession,
  responseText: string,
): ContinueSessionResult {
  const normalizedResponse = responseText.trim();
  const lens = buildScenarioLens(scenario);
  const turn = session.currentTurn + 1;
  const signals = toSignalBreakdown(normalizedResponse);
  const responseType = inferResponseType(normalizedResponse, signals);
  const matchedOption = getMatchedOption(scenario, responseType, normalizedResponse);
  const isLastTurn = turn >= session.maxTurns;
  const followUpPrompt = buildFollowUpPrompt(scenario, matchedOption, turn, responseType, isLastTurn);
  const coachHint = getCoachHint(turn, responseType);
  const sentenceAnalyses = buildSentenceAnalyses(normalizedResponse, turn, lens);
  const suggestedResponse = buildSuggestedResponse(lens, turn, sentenceAnalyses);
  const coachSummary = SUMMARY_BY_TYPE[matchedOption.type];

  const turnAnalysis: TurnAnalysis = {
    turn,
    selectedOptionId: matchedOption.id,
    score: buildTurnScore(matchedOption.score, signals, turn),
    type: matchedOption.type,
    responseText: normalizedResponse,
    matchedOptionText: matchedOption.text.replace(/[「」]/g, ''),
    childReaction: matchedOption.childReaction,
    childReactionEmoji: matchedOption.childReactionEmoji,
    followUpPrompt,
    coachHint,
    coachSummary,
    suggestedResponse,
    signalBreakdown: signals,
    sentenceAnalyses,
  };

  return applyTurnAnalysisToSession(scenario, session, turnAnalysis, {
    supervisorMode: 'local',
    supervisorModel: null,
  });
}

export function summarizeSignals(answers: Answer[]) {
  const totalTurns = answers.reduce((sum, answer) => sum + answer.turnCount, 0) || 1;
  const combined = answers.reduce(
    (acc, answer) => ({
      observation: acc.observation + answer.signalBreakdown.observation,
      emotion: acc.emotion + answer.signalBreakdown.emotion,
      curiosity: acc.curiosity + answer.signalBreakdown.curiosity,
      collaboration: acc.collaboration + answer.signalBreakdown.collaboration,
      judgment: acc.judgment + answer.signalBreakdown.judgment,
      command: acc.command + answer.signalBreakdown.command,
    }),
    { observation: 0, emotion: 0, curiosity: 0, collaboration: 0, judgment: 0, command: 0 },
  );

  return {
    observation: clamp(Math.round((combined.observation / totalTurns) * 35), 0, 100),
    emotion: clamp(Math.round((combined.emotion / totalTurns) * 35), 0, 100),
    curiosity: clamp(Math.round((combined.curiosity / totalTurns) * 24), 0, 100),
    collaboration: clamp(Math.round((combined.collaboration / totalTurns) * 35), 0, 100),
    judgment: clamp(Math.round((combined.judgment / totalTurns) * 42), 0, 100),
    command: clamp(Math.round((combined.command / totalTurns) * 36), 0, 100),
  };
}

export function buildSessionRecommendations(answers: Answer[]) {
  const signals = summarizeSignals(answers);
  const recommendations: { icon: string; title: string; desc: string }[] = [];

  if (signals.observation < 40) {
    recommendations.push({
      icon: '👀',
      title: '先講觀察',
      desc: '多輪對話入面，第一句愈清楚描述現場線索，後面兩輪就愈容易走向真實內容。',
    });
  }

  if (signals.emotion < 40) {
    recommendations.push({
      icon: '💗',
      title: '多接住情緒',
      desc: '可多用「你而家好似好委屈／緊張／失望」去命名情緒，幫對方更容易講第二句、第三句。',
    });
  }

  if (signals.curiosity < 35) {
    recommendations.push({
      icon: '🗣️',
      title: '第二輪問深一層',
      desc: '第二輪可多用「最在意」「最擔心」「最卡住」呢類問題，唔好停留喺表面事件。',
    });
  }

  if (signals.judgment > 18 || signals.command > 18) {
    recommendations.push({
      icon: '⏸️',
      title: '先修復再處理',
      desc: '當第一句令對方縮返入去，第二句先修復關係，比急住解決問題更重要。',
    });
  }

  recommendations.push({
    icon: '🧩',
    title: '記住三輪節奏',
    desc: '第一輪接情緒，第二輪探核心，第三輪整合需要。把這個節奏練熟，整體對話會自然好多。',
  });

  return recommendations.slice(0, 5);
}
