import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bot, Layers3, LoaderCircle, MessageCircleReply, SendHorizontal, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useGameStore } from '@/store/gameStore';
import ReflectionModal from '@/components/ReflectionModal';
import ConversationBubble from '@/components/ConversationBubble';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { continueScenarioSessionWithSupervisor, getSupervisorModeLabel, resolveSupervisorMode } from '@/lib/aiSupervisor';
import {
  SCENARIO_TURNS,
  buildScenarioLens,
  createScenarioSession,
  getRolePartnerLabel,
} from '@/lib/conversationEngine';
import type { ScenarioSession } from '@/types/game';

const roleLabels = { teacher: '🎓 教師', parent: '🏠 家長', coach: '⚽ 教練' } as const;
const typeLabels = {
  open: '開放式',
  'semi-open': '半開放式',
  judgmental: '判斷式',
  closed: '封閉式',
} as const;

function parseSentenceBreakdown(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
      const title = lines[0] ?? '';
      const insightLine = lines.find((line) => /^(亮點|問題|可再打開)：/.test(line)) ?? '';
      const rewriteLine = lines.find((line) => line.startsWith('可改成：')) ?? '';

      return {
        title,
        insightLabel: insightLine.split('：')[0] ?? '',
        insightText: insightLine.split('：').slice(1).join('：').trim(),
        rewrite: rewriteLine.replace(/^可改成：/, '').trim(),
      };
    });
}

export default function GamePlay() {
  const navigate = useNavigate();
  const {
    selectedRole,
    selectedMode,
    selectedScenarios,
    currentQuestionIndex,
    totalScore,
    answers,
    answerQuestion,
    nextQuestion,
    addReflection,
    supervisorMode,
    deepseekApiKey,
    deepseekModel,
  } = useGameStore();

  const [draft, setDraft] = useState('');
  const [showReflection, setShowReflection] = useState(false);
  const [session, setSession] = useState<ScenarioSession | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExpandedDetails, setShowExpandedDetails] = useState(false);
  const transcriptRef = useRef<HTMLDivElement | null>(null);

  const scenario = selectedScenarios[currentQuestionIndex];
  const currentAnswer = useMemo(
    () => answers.find((answer) => answer.scenarioId === scenario?.id),
    [answers, scenario?.id],
  );
  const scenarioLens = useMemo(() => (scenario ? buildScenarioLens(scenario) : null), [scenario]);
  const activeSupervisorMode = useMemo(
    () => resolveSupervisorMode(supervisorMode, deepseekApiKey),
    [supervisorMode, deepseekApiKey],
  );
  const dialoguePartnerLabel = useMemo(() => getRolePartnerLabel(selectedRole), [selectedRole]);

  useEffect(() => {
    if (!scenario || currentAnswer) return;
    setSession(createScenarioSession(scenario));
  }, [scenario, currentAnswer]);

  useEffect(() => {
    setDraft('');
  }, [scenario?.id]);

  const conversation = useMemo(
    () => currentAnswer?.transcript ?? session?.transcript ?? [],
    [currentAnswer?.transcript, session?.transcript],
  );
  const visibleConversation = useMemo(
    () => conversation.filter((message) => message.speaker !== 'analysis'),
    [conversation],
  );
  const analysisMessages = useMemo(
    () => conversation.filter((message) => message.speaker === 'analysis'),
    [conversation],
  );
  const currentTurn = currentAnswer?.turnCount ?? session?.currentTurn ?? 0;
  const latestCoachSummary = analysisMessages.findLast((message) => message.label === '教練即時分析');
  const latestSentenceBreakdown = analysisMessages.findLast((message) => message.label === '逐句拆解');
  const latestRewrite = analysisMessages.findLast((message) => message.label === '可改成咁講');
  const sentenceBreakdownBlocks = useMemo(
    () => (latestSentenceBreakdown ? parseSentenceBreakdown(latestSentenceBreakdown.text) : []),
    [latestSentenceBreakdown],
  );
  const turnSnapshots = currentAnswer?.turnAnalyses ?? session?.turnAnalyses ?? [];

  useEffect(() => {
    const viewport = transcriptRef.current;
    if (!viewport) return;
    viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' });
  }, [visibleConversation]);

  if (!selectedRole || !selectedMode || selectedScenarios.length === 0) {
    navigate('/');
    return null;
  }

  if (!scenario || !scenarioLens) {
    navigate('/results');
    return null;
  }

  const answeredCount = currentQuestionIndex + (currentAnswer ? 1 : 0);
  const progress = (answeredCount / selectedMode) * 100;

  const handleSubmit = async () => {
    const text = draft.trim();
    if (!text || !session || currentAnswer || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const result = await continueScenarioSessionWithSupervisor(scenario, session, text, {
        mode: activeSupervisorMode,
        deepseekApiKey,
        deepseekModel,
      });

      setSession(result.session);
      setDraft('');

      if (result.warning) {
        toast.warning(result.warning);
      }

      if (result.answer) {
        answerQuestion(result.answer);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= selectedMode) {
      navigate('/results');
      return;
    }

    if (nextIndex % 5 === 0) {
      setShowReflection(true);
      return;
    }

    setSession(null);
    nextQuestion();
  };

  const handleReflectionClose = (text: string) => {
    if (text) addReflection(text);
    setShowReflection(false);
    setSession(null);
    nextQuestion();
  };

  return (
    <div className="gradient-bg-subtle relative min-h-screen">
      <div className="sticky top-0 z-40 border-b border-white/35 bg-white/60 px-4 py-3 backdrop-blur-xl">
        <div className="app-shell flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/mode')} className="glass-pill flex items-center gap-1 hover:shadow-glass">
              <ArrowLeft size={16} />
              返回
            </button>
            <span className="glass-pill text-xs">{roleLabels[selectedRole]}</span>
          </div>
          <div className="flex items-center gap-3 text-sm sm:gap-4">
            <span className="font-medium">
              場景 {Math.min(currentQuestionIndex + 1, selectedMode)}/{selectedMode}
            </span>
            <span className="font-bold text-gradient">{totalScore} 分</span>
          </div>
        </div>
        <div className="app-shell mt-3 h-2 overflow-hidden rounded-full bg-white/50">
          <motion.div
            className="h-full progress-gradient"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          />
        </div>
      </div>

      <div className="app-shell py-5">
        <div className="mb-5 flex justify-center">
          <label className="glass-pill inline-flex cursor-pointer items-center gap-3 px-5 py-3 text-sm font-semibold text-slate-700">
            <Checkbox
              checked={showExpandedDetails}
              onCheckedChange={(checked) => setShowExpandedDetails(Boolean(checked))}
              className="h-5 w-5 rounded-md border-sky-300 data-[state=checked]:bg-sky-500"
            />
            展開完整個案背景與督導詳解
          </label>
        </div>

        <div
          className={`grid gap-5 ${
            showExpandedDetails
              ? 'lg:grid-cols-[minmax(320px,360px)_minmax(0,1fr)] lg:items-start xl:gap-6'
              : 'xl:grid-cols-[minmax(0,1fr)_minmax(280px,320px)] xl:items-start'
          }`}
        >
        <section className="order-1 glass-card flex min-h-[68vh] flex-col overflow-hidden lg:order-2 lg:min-h-[78vh]">
          <div className="border-b border-white/35 px-4 py-4 sm:px-5 sm:py-5 lg:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="glass-pill text-xs">{scenario.category}</span>
                  <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white">
                    {currentAnswer ? '本題已完成' : `第 ${currentTurn + 1}/${SCENARIO_TURNS} 輪進行中`}
                  </span>
                </div>

                <div className="xl:hidden">
                  <p className="section-kicker">場景速讀</p>
                  <h2 className="mt-2 text-2xl font-bold leading-tight">{scenario.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground sm:line-clamp-none">{scenario.description}</p>
                </div>

                <div className="hidden sm:block">
                  <p className="text-sm font-semibold">Chat Dialogue Lab</p>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {currentAnswer
                      ? `已完成 ${currentAnswer.turnCount}/${SCENARIO_TURNS} 輪對話，下面係你今題的整理分析。`
                      : `正在進行第 ${currentTurn + 1}/${SCENARIO_TURNS} 輪，試住用自然、真實的語氣接住對方。`}
                  </p>
                </div>
              </div>

              <div className="space-y-2 xl:min-w-[220px]">
                <div className="rounded-[1.1rem] border border-sky-200/70 bg-sky-50/80 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sky-700">對話對象</p>
                  <p className="mt-1 text-sm font-semibold text-sky-950">你而家正同{dialoguePartnerLabel}對話</p>
                  <p className="mt-1 text-xs leading-relaxed text-sky-800/80">場景：{scenario.title}</p>
                </div>

                {currentAnswer ? (
                  <div className="rounded-[1.1rem] bg-emerald-500/12 px-4 py-3 text-sm font-semibold text-emerald-800">
                    最終判讀：{typeLabels[currentAnswer.type]} · {currentAnswer.score}/10 分
                  </div>
                ) : (
                  <>
                    <div className="rounded-[1.1rem] bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
                      目前重點：{scenarioLens.turnGoals[currentTurn]?.title}
                    </div>
                    <div className="rounded-[1.1rem] bg-white/75 px-4 py-3 text-xs font-semibold text-slate-700">
                      <span className="inline-flex items-center gap-2">
                        <Bot size={14} />
                        {getSupervisorModeLabel(activeSupervisorMode, deepseekModel)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 hidden gap-3 md:grid md:grid-cols-2 xl:hidden">
              <div className="nested-panel px-4 py-3">
                <p className="section-kicker">隱藏需要提示</p>
                <p className="mt-2 text-sm leading-relaxed">{scenarioLens.caseBrief.hiddenNeed}</p>
              </div>
              <div className="nested-panel px-4 py-3">
                <p className="section-kicker">教練焦點</p>
                <p className="mt-2 text-sm leading-relaxed">
                  {currentAnswer ? currentAnswer.feedback.summary : scenarioLens.turnGoals[currentTurn]?.description}
                </p>
              </div>
            </div>
          </div>

          <div ref={transcriptRef} className="chat-scroll flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 lg:min-h-[52vh] lg:px-6">
            <div className="space-y-4">
              {visibleConversation.map((message) => (
                <ConversationBubble key={message.id} message={message} expanded={showExpandedDetails} />
              ))}
            </div>
          </div>

          <div className="border-t border-white/35 bg-white/45 px-4 py-4 sm:px-5 lg:px-6">
            {!currentAnswer ? (
              <div className="space-y-4">
                <div className="grid gap-3">
                  <div className="rounded-[1.5rem] border border-sky-200/70 bg-sky-50/80 p-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700">教練雷達</p>
                    <p className="text-sm leading-relaxed text-sky-950">
                      {session?.latestCoachHint ?? scenarioLens.turnGoals[currentTurn]?.description}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px] lg:items-end">
                  <div>
                    <Textarea
                      value={draft}
                      disabled={isSubmitting}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey && !isSubmitting) {
                          event.preventDefault();
                          handleSubmit();
                        }
                      }}
                      placeholder="輸入你這一輪會怎樣回應對方..."
                      className="min-h-[120px] resize-none border-white/60 bg-white/85 text-sm shadow-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    />
                    <p className="mt-2 text-xs text-muted-foreground">按 Enter 送出這一輪，Shift + Enter 換行</p>
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={!draft.trim() || isSubmitting}
                    className="glass-button inline-flex w-full items-center justify-center gap-2 px-5 py-3 font-semibold text-foreground disabled:cursor-not-allowed disabled:opacity-50 lg:min-h-[120px]"
                  >
                    {isSubmitting ? <LoaderCircle size={16} className="animate-spin" /> : <SendHorizontal size={16} />}
                    {isSubmitting ? '整理回應中...' : `送出第 ${currentTurn + 1} 輪`}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-[1.75rem] border border-emerald-200/70 bg-emerald-50/80 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-800">
                    <MessageCircleReply size={16} />
                    本題 3 輪對話已完成
                  </div>
                  <p className="text-sm leading-relaxed text-emerald-900">{currentAnswer.feedback.summary}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                  {currentAnswer.turnAnalyses.map((turn) => (
                    <div key={turn.turn} className="nested-panel p-4">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">第 {turn.turn} 輪</p>
                          <p className="mt-1 text-sm font-semibold">
                            {typeLabels[turn.type]} · {turn.score}/10
                          </p>
                        </div>
                        <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-medium text-muted-foreground">
                          {turn.childReactionEmoji} 對方接續
                        </span>
                      </div>
                      <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{turn.coachHint}</p>
                      <div className="space-y-2">
                        {turn.sentenceAnalyses.map((sentence) => (
                          <div key={`${turn.turn}-${sentence.index}`} className="rounded-xl bg-white/78 px-3 py-3 text-sm leading-relaxed">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                              第 {sentence.index} 句
                            </p>
                            <p className="mt-1 font-medium text-foreground/90">{sentence.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-3 xl:grid-cols-2">
                  <div className="nested-panel p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">這題亮點</p>
                    <ul className="space-y-2 text-sm leading-relaxed">
                      {currentAnswer.feedback.strengths.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="nested-panel p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">下一題可以帶住</p>
                    <ul className="space-y-2 text-sm leading-relaxed">
                      {currentAnswer.feedback.risks.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-900 px-4 py-4 text-white">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/60">最後可以咁回應</p>
                  <p className="text-sm leading-relaxed">「{currentAnswer.feedback.suggestedResponse}」</p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="glass-button w-full px-6 py-3 font-semibold shadow-glass hover:shadow-glass-hover sm:w-auto"
                    style={{
                      background: 'linear-gradient(135deg, hsl(211 100% 50% / 0.92), hsl(157 70% 42% / 0.92))',
                      color: 'white',
                      borderRadius: '1rem',
                    }}
                  >
                    {currentQuestionIndex + 1 >= selectedMode ? '查看總分析' : '下一個場景'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {!showExpandedDetails ? (
          <aside className="order-2 space-y-4 xl:sticky xl:top-24">
            <details className="glass-card p-5 sm:p-6 xl:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-3">
                <div>
                  <p className="section-kicker">回合筆記</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">查看分析、逐句拆解同改寫建議</p>
                </div>
                <span className="glass-pill text-xs">展開</span>
              </summary>

              {latestCoachSummary ? (
                <div className="mt-4 space-y-4">
                  <div className="analysis-card-summary">
                    <p className="analysis-card-kicker">教練即時分析</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-800">
                      {latestCoachSummary.text.split(/\n\s*\n/)[0]}
                    </p>
                  </div>

                  <div className="analysis-card-hint">
                    <p className="analysis-card-kicker">下輪最值得做</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-800">
                      {latestCoachSummary.text.split(/\n\s*\n/)[1]?.replace(/^這輪建議：/, '')}
                    </p>
                  </div>

                  {latestRewrite ? (
                    <div className="analysis-card-rewrite">
                      <p className="analysis-card-kicker">可改成咁講</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-900">「{latestRewrite.text}」</p>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="mt-4 nested-panel px-4 py-4">
                  <p className="text-sm leading-relaxed text-slate-700">
                    每送出一輪後，教練即時分析、下輪建議同改寫版本都會整理喺呢邊。
                  </p>
                </div>
              )}
            </details>

            <div className="hidden xl:block">
              <div className="glass-card p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="section-kicker">回合筆記</p>
                  <h3 className="mt-2 text-xl font-bold">分析放側邊，主對話留返順住行</h3>
                </div>
                <span className="glass-pill text-xs">低干擾模式</span>
              </div>

              {latestCoachSummary ? (
                <div className="mt-4 space-y-4">
                  <div className="analysis-card-summary">
                    <p className="analysis-card-kicker">教練即時分析</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-800">
                      {latestCoachSummary.text.split(/\n\s*\n/)[0]}
                    </p>
                  </div>

                  <div className="analysis-card-hint">
                    <p className="analysis-card-kicker">下輪最值得做</p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-800">
                      {latestCoachSummary.text.split(/\n\s*\n/)[1]?.replace(/^這輪建議：/, '')}
                    </p>
                  </div>

                  <details className="nested-panel overflow-hidden px-4 py-4">
                    <summary className="flex cursor-pointer items-center justify-between gap-3">
                      <div>
                        <p className="section-kicker">逐句拆解</p>
                        <p className="mt-1 text-sm font-medium text-slate-800">
                          已整理 {sentenceBreakdownBlocks.length} 句亮點與問題
                        </p>
                      </div>
                      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600">點擊展開</span>
                    </summary>

                    <div className="mt-4 space-y-3">
                      {sentenceBreakdownBlocks.map((block) => (
                        <div key={block.title} className="rounded-2xl bg-white/75 px-4 py-4">
                          <p className="analysis-card-kicker">{block.title}</p>
                          <p className="mt-2 text-sm font-semibold text-slate-900">{block.insightLabel}</p>
                          <p className="mt-2 text-sm leading-relaxed text-slate-700">{block.insightText}</p>
                          {block.rewrite ? (
                            <div className="analysis-sentence-rewrite">
                              <p className="analysis-card-kicker text-sky-800/80">可改成咁講</p>
                              <p className="mt-2 text-sm leading-relaxed text-sky-950">{block.rewrite}</p>
                            </div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </details>

                  {latestRewrite ? (
                    <div className="analysis-card-rewrite">
                      <p className="analysis-card-kicker">可改成咁講</p>
                      <p className="mt-3 text-sm leading-relaxed text-slate-900">「{latestRewrite.text}」</p>
                    </div>
                  ) : null}

                  {turnSnapshots.length > 0 ? (
                    <div className="nested-panel px-4 py-4">
                      <p className="section-kicker">進度回看</p>
                      <div className="mt-3 space-y-2">
                        {turnSnapshots.map((turn) => (
                          <div key={turn.turn} className="flex items-center justify-between gap-3 rounded-2xl bg-white/72 px-3 py-3 text-sm">
                            <div>
                              <p className="font-semibold">第 {turn.turn} 輪</p>
                              <p className="text-xs text-muted-foreground">{typeLabels[turn.type]}</p>
                            </div>
                            <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white">
                              {turn.score}/10
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="mt-4 nested-panel px-4 py-4">
                  <p className="text-sm leading-relaxed text-slate-700">
                    每送出一輪後，教練即時分析、下輪建議、逐句拆解同可改寫版本都會整理喺呢邊，唔會直接插入聊天中間。
                  </p>
                </div>
              )}
              </div>
            </div>
          </aside>
        ) : null}

        {showExpandedDetails ? (
          <aside className="order-2 space-y-4 lg:order-1 lg:sticky lg:top-24">
          <div className="glass-card p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="glass-pill text-xs">{scenario.category}</span>
              <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-muted-foreground">
                {SCENARIO_TURNS} 輪情境模擬
              </span>
            </div>

            <p className="section-kicker">場景 brief</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight">{scenario.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{scenario.description}</p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="metric-panel px-4 py-4">
                <p className="section-kicker">角色目標</p>
                <p className="mt-2 text-sm leading-relaxed">{scenarioLens.practiceGoal}</p>
              </div>
              <div className="metric-panel px-4 py-4">
                <p className="section-kicker">教練焦點</p>
                <p className="mt-2 text-sm leading-relaxed">{scenarioLens.coachFocus}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 sm:p-6">
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold">
              <Sparkles size={16} />
              個案現場資訊
            </p>

            <div className="space-y-4">
              <div>
                <p className="mb-2 section-kicker">當下狀態</p>
                <div className="space-y-2">
                  {scenarioLens.caseBrief.presentingState.map((item, index) => (
                    <div key={`${scenario.id}-present-${index}`} className="nested-panel px-4 py-3 text-sm leading-relaxed">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 section-kicker">現場壓力</p>
                <div className="space-y-2">
                  {scenarioLens.caseBrief.scenePressure.map((item, index) => (
                    <div key={`${scenario.id}-pressure-${index}`} className="nested-panel px-4 py-3 text-sm leading-relaxed">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 sm:p-6">
            <div className="space-y-4">
              <div>
                <p className="mb-2 section-kicker">你已知的背景</p>
                <div className="space-y-2">
                  {scenarioLens.caseBrief.backgroundClues.map((item, index) => (
                    <div key={`${scenario.id}-background-${index}`} className="nested-panel px-4 py-3 text-sm leading-relaxed">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 section-kicker">隱藏需要提示</p>
                <p className="nested-panel px-4 py-3 text-sm leading-relaxed">{scenarioLens.caseBrief.hiddenNeed}</p>
              </div>

              <div>
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Layers3 size={16} />
                  三輪目標
                </p>
                <div className="space-y-3">
                  {scenarioLens.turnGoals.map((goal, index) => {
                    const isActive = !currentAnswer && index === currentTurn;
                    const isDone = currentAnswer ? index < currentAnswer.turnCount : index < currentTurn;

                    return (
                      <div
                        key={goal.title}
                        className={`nested-panel px-4 py-4 text-sm leading-relaxed ${
                          isActive ? 'ring-2 ring-sky-400/35' : ''
                        }`}
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <p className="font-semibold">
                            {index + 1}. {goal.title}
                          </p>
                          <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                            {isDone ? '已完成' : isActive ? '進行中' : '待練習'}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{goal.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          </aside>
        ) : null}
        </div>
      </div>

      <ReflectionModal
        isOpen={showReflection}
        onClose={handleReflectionClose}
        questionsDone={currentQuestionIndex + 1}
      />
    </div>
  );
}
