import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Eye,
  Folder,
  LoaderCircle,
  MessageCircleReply,
  Plus,
  Search,
  SendHorizontal,
  Sparkles,
  Tag,
  Undo2,
} from 'lucide-react';
import { toast } from 'sonner';
import { useGameStore } from '@/store/gameStore';
import ReflectionModal from '@/components/ReflectionModal';
import ConversationBubble from '@/components/ConversationBubble';
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
const roleFolderLabels = {
  teacher: ['課堂互動', '學生情緒', '支援跟進'],
  parent: ['家庭對話', '情緒承接', '生活界線'],
  coach: ['訓練現場', '情緒修復', '團隊互動'],
} as const;
const typeLabels = {
  open: '開放式',
  'semi-open': '半開放式',
  judgmental: '判斷式',
  closed: '封閉式',
} as const;
const labelColors = ['#5A8F69', '#4A7CDA', '#D78333', '#C05B73', '#7B63C9'] as const;
const labelIcons = ['R', 'H', 'C', 'S', 'T'] as const;

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
  const [showLabelMenu, setShowLabelMenu] = useState(false);
  const [showCreateLabel, setShowCreateLabel] = useState(false);
  const [labelName, setLabelName] = useState('Heart');
  const [labelDescription, setLabelDescription] = useState('重要互動線索');
  const [labelIcon, setLabelIcon] = useState<(typeof labelIcons)[number]>('R');
  const [labelColor, setLabelColor] = useState<(typeof labelColors)[number]>('#5A8F69');
  const [conversationLabel, setConversationLabel] = useState<{
    name: string;
    description: string;
    icon: string;
    color: string;
  } | null>(null);
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
    setShowLabelMenu(false);
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
  const folderLabels = roleFolderLabels[selectedRole];

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

  const handleCreateLabel = () => {
    if (!labelName.trim()) {
      toast.error('請先輸入 label 名稱。');
      return;
    }

    setConversationLabel({
      name: labelName.trim(),
      description: labelDescription.trim(),
      icon: labelIcon,
      color: labelColor,
    });
    setShowCreateLabel(false);
    setShowLabelMenu(false);
    toast.success('Label added');
  };

  return (
    <div className="missive-shell">
      <div className="missive-layout">
        <aside className="missive-nav">
          <div className="missive-nav-top">
            <div className="missive-avatar">A</div>
            <div className="missive-nav-actions">
              <button className="missive-icon-button" onClick={() => navigate('/mode')}>
                <ArrowLeft size={16} />
              </button>
              <button className="missive-icon-button">
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="missive-nav-section">
            <button className="missive-nav-item missive-nav-item-active">
              <span className="missive-nav-item-main">
                <Folder size={16} />
                Inbox
              </span>
              <span className="missive-count-chip">{selectedMode}</span>
            </button>
            {folderLabels.map((item, index) => (
              <button key={item} className="missive-nav-item">
                <span className="missive-nav-item-main">
                  <Folder size={16} />
                  {item}
                </span>
                <span className="missive-count-muted">{Math.max(selectedMode - index - 1, 1)}</span>
              </button>
            ))}
          </div>

          <div className="missive-nav-section">
            <p className="missive-section-title">Role</p>
            <div className="missive-role-card">
              <p className="missive-role-title">{roleLabels[selectedRole]}</p>
              <p className="missive-role-sub">對話對象：{dialoguePartnerLabel}</p>
            </div>
          </div>

          <div className="missive-nav-section">
            <p className="missive-section-title">Training</p>
            <div className="missive-progress-card">
              <div className="missive-progress-row">
                <span>完成進度</span>
                <span>{answeredCount}/{selectedMode}</span>
              </div>
              <div className="missive-progress-bar">
                <div className="missive-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <p className="missive-progress-note">模型：{getSupervisorModeLabel(activeSupervisorMode, deepseekModel)}</p>
            </div>
          </div>
        </aside>

        <section className="missive-list-panel">
          <div className="missive-searchbar">
            <Search size={18} />
            <span>Search</span>
          </div>

          <div className="missive-list-header">
            <span>Today</span>
            <span>{selectedScenarios.length} conversations</span>
          </div>

          <div className="missive-thread-list">
            {selectedScenarios.map((item, index) => {
              const itemAnswer = answers.find((answer) => answer.scenarioId === item.id);
              const isActive = item.id === scenario.id;
              const isDone = Boolean(itemAnswer);

              return (
                <article
                  key={item.id}
                  className={`missive-thread-card ${isActive ? 'missive-thread-card-active' : ''} ${isDone ? 'missive-thread-card-done' : ''}`}
                >
                  <div className="missive-thread-card-top">
                    <div>
                      <p className="missive-thread-title">{item.title}</p>
                      <p className="missive-thread-sub">{item.category}</p>
                    </div>
                    <div className="missive-thread-meta">
                      <span>{isDone ? `${itemAnswer?.score}/10` : `${index + 1}/${selectedMode}`}</span>
                    </div>
                  </div>

                  <p className="missive-thread-preview">
                    {isDone
                      ? itemAnswer?.feedback.summary
                      : buildScenarioLens(item).turnGoals[0]?.description ?? item.description}
                  </p>

                  <div className="missive-thread-footer">
                    <span className="missive-thread-pill">{isDone ? 'Done' : isActive ? 'Open now' : 'Queued'}</span>
                    <span className="missive-thread-time">{isDone ? 'Reviewed' : 'Today'}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <main className="missive-main-panel">
          <header className="missive-main-header">
            <div>
              <div className="missive-header-meta">
                <button className="missive-pill-button" onClick={() => navigate('/mode')}>
                  <ArrowLeft size={14} />
                  Close
                </button>
                <button className="missive-pill-button">
                  <Calendar size={14} />
                  {currentAnswer ? 'Reviewed' : 'Jul 01'}
                  <ChevronDown size={14} />
                </button>
              </div>
              <h1 className="missive-conversation-title">{scenario.title}</h1>
              <p className="missive-conversation-subtitle">
                對話對象：{dialoguePartnerLabel} · {scenario.category}
              </p>
            </div>

            <div className="missive-toolbar">
              {conversationLabel ? (
                <span className="missive-label-pill" style={{ '--label-color': conversationLabel.color } as CSSProperties}>
                  <span className="missive-label-icon">{conversationLabel.icon}</span>
                  {conversationLabel.name}
                </span>
              ) : null}
              <span className="missive-toolbar-chip">
                <CheckCircle2 size={16} />
                1/{SCENARIO_TURNS}
              </span>
              <button
                className={`missive-toolbar-icon ${showLabelMenu ? 'missive-toolbar-icon-active' : ''}`}
                onClick={() => setShowLabelMenu((value) => !value)}
              >
                <Tag size={16} />
              </button>
              <button className="missive-toolbar-icon">
                <Eye size={16} />
              </button>
            </div>

            {showLabelMenu ? (
              <div className="missive-label-menu">
                <div className="missive-label-menu-search">
                  <Search size={16} />
                  <span>Add label...</span>
                </div>
                <div className="missive-label-menu-section">
                  <p className="missive-label-menu-title">Organization Labels</p>
                  <button className="missive-label-menu-item">
                    <span>Refero</span>
                    <ChevronDown size={14} />
                  </button>
                </div>
                <div className="missive-label-menu-section">
                  <p className="missive-label-menu-title">Email Labels</p>
                  <button className="missive-label-menu-item">
                    <span>{scenario.category}</span>
                    <ChevronDown size={14} />
                  </button>
                </div>
                <button className="missive-label-create" onClick={() => setShowCreateLabel(true)}>
                  Create new label
                </button>
              </div>
            ) : null}
          </header>

          <div className="missive-main-body">
            <div className="missive-thread-column">
              <div ref={transcriptRef} className="missive-transcript">
                <div className="space-y-4">
                  {visibleConversation.map((message) => (
                    <ConversationBubble key={message.id} message={message} expanded={showExpandedDetails} />
                  ))}
                </div>
              </div>

              {currentAnswer ? (
                <div className="missive-composer missive-summary-panel">
                  <div className="missive-summary-card">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-800">
                      <MessageCircleReply size={16} />
                      本題 3 輪對話已完成
                    </div>
                    <p className="text-sm leading-relaxed text-emerald-900">{currentAnswer.feedback.summary}</p>
                  </div>

                  <button
                    onClick={handleNext}
                    className="missive-send-button"
                  >
                    {currentQuestionIndex + 1 >= selectedMode ? '查看總分析' : '下一個場景'}
                  </button>
                </div>
              ) : (
                <div className="missive-composer">
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
                    placeholder={`Chat with your ${dialoguePartnerLabel}...`}
                    className="missive-textarea"
                  />

                  <div className="missive-composer-footer">
                    <div className="missive-composer-hint">
                      <Bot size={14} />
                      <span>{session?.latestCoachHint ?? scenarioLens.turnGoals[currentTurn]?.description}</span>
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={!draft.trim() || isSubmitting}
                      className="missive-send-button"
                    >
                      {isSubmitting ? <LoaderCircle size={16} className="animate-spin" /> : <SendHorizontal size={16} />}
                      {isSubmitting ? '整理中...' : `送出第 ${currentTurn + 1} 輪`}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <aside className="missive-inspector">
              <div className="missive-inspector-card">
                <p className="missive-inspector-title">Scenario brief</p>
                <p className="missive-inspector-text">{scenario.description}</p>
              </div>

              <div className="missive-inspector-card">
                <div className="flex items-center justify-between gap-3">
                  <p className="missive-inspector-title">Coach notes</p>
                  <button className="missive-text-button" onClick={() => setShowExpandedDetails((value) => !value)}>
                    {showExpandedDetails ? 'Hide details' : 'Show details'}
                  </button>
                </div>
                {latestCoachSummary ? (
                  <div className="mt-3 space-y-3">
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
                        <p className="analysis-card-kicker">Suggested reply</p>
                        <p className="mt-3 text-sm leading-relaxed text-slate-900">「{latestRewrite.text}」</p>
                      </div>
                    ) : null}

                    {sentenceBreakdownBlocks.length > 0 ? (
                      <details className="nested-panel overflow-hidden px-4 py-4">
                        <summary className="flex cursor-pointer items-center justify-between gap-3">
                          <div>
                            <p className="section-kicker">逐句拆解</p>
                            <p className="mt-1 text-sm font-medium text-slate-800">
                              已整理 {sentenceBreakdownBlocks.length} 句亮點與問題
                            </p>
                          </div>
                          <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-600">Expand</span>
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
                    ) : null}
                  </div>
                ) : (
                  <p className="missive-inspector-text mt-3">
                    每送出一輪後，教練即時分析、下輪建議同改寫版本會整理喺呢邊。
                  </p>
                )}
              </div>

              {showExpandedDetails ? (
                <div className="missive-inspector-card">
                  <p className="missive-inspector-title">Case details</p>
                  <div className="mt-3 space-y-3">
                    <div className="nested-panel px-4 py-3">
                      <p className="section-kicker">當下狀態</p>
                      <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
                        {scenarioLens.caseBrief.presentingState.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="nested-panel px-4 py-3">
                      <p className="section-kicker">現場壓力</p>
                      <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
                        {scenarioLens.caseBrief.scenePressure.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="nested-panel px-4 py-3">
                      <p className="section-kicker">隱藏需要</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">{scenarioLens.caseBrief.hiddenNeed}</p>
                    </div>
                  </div>
                </div>
              ) : null}

              {turnSnapshots.length > 0 ? (
                <div className="missive-inspector-card">
                  <p className="missive-inspector-title">Turn snapshots</p>
                  <div className="mt-3 space-y-2">
                    {turnSnapshots.map((turn) => (
                      <div key={turn.turn} className="missive-turn-item">
                        <div>
                          <p className="font-semibold">第 {turn.turn} 輪</p>
                          <p className="text-xs text-slate-500">{typeLabels[turn.type]}</p>
                        </div>
                        <span className="missive-turn-score">{turn.score}/10</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </main>
      </div>

      {showCreateLabel ? (
        <div className="missive-modal-backdrop" onClick={() => setShowCreateLabel(false)}>
          <div className="missive-modal" onClick={(event) => event.stopPropagation()}>
            <h2 className="missive-modal-title">Create label</h2>

            <div className="missive-field">
              <label>Location</label>
              <div className="missive-select">Refero</div>
            </div>

            <div className="missive-field">
              <label>Name</label>
              <input value={labelName} onChange={(event) => setLabelName(event.target.value)} className="missive-input" />
            </div>

            <div className="missive-field">
              <label>Description</label>
              <input value={labelDescription} onChange={(event) => setLabelDescription(event.target.value)} className="missive-input" />
            </div>

            <div className="missive-field">
              <label>Nested under</label>
              <div className="missive-select">-</div>
            </div>

            <div className="missive-field">
              <label>Label is visible to</label>
              <div className="missive-select">Everyone in the organization</div>
            </div>

            <div className="missive-field">
              <label>Auto-shared users</label>
              <div className="missive-users-row">
                <span className="missive-user-dot">A</span>
                <span className="missive-user-dot">R</span>
                <ChevronDown size={14} />
              </div>
            </div>

            <div className="missive-field">
              <label>Color and icon</label>
              <div className="missive-palette-row">
                <div className="missive-color-grid">
                  {labelColors.map((color) => (
                    <button
                      key={color}
                      className={`missive-color-dot ${labelColor === color ? 'missive-color-dot-active' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setLabelColor(color)}
                    />
                  ))}
                </div>
                <div className="missive-icon-grid">
                  {labelIcons.map((icon) => (
                    <button
                      key={icon}
                      className={`missive-icon-choice ${labelIcon === icon ? 'missive-icon-choice-active' : ''}`}
                      onClick={() => setLabelIcon(icon)}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="missive-modal-actions">
              <button className="missive-secondary-button" onClick={() => setShowCreateLabel(false)}>
                Cancel
              </button>
              <button className="missive-primary-button" onClick={handleCreateLabel}>
                Create
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <ReflectionModal
        isOpen={showReflection}
        onClose={handleReflectionClose}
        questionsDone={currentQuestionIndex + 1}
      />
    </div>
  );
}
