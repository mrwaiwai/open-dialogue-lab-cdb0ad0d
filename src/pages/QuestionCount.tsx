import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Search, Shuffle, Target } from 'lucide-react';
import FloatingShapes from '@/components/FloatingShapes';
import { getScenariosByRole } from '@/data/scenarios';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useGameStore } from '@/store/gameStore';
import type { GameMode, GameRole, Scenario } from '@/types/game';

const roleLabels = { teacher: '🎓 教師', parent: '🏠 家長', coach: '⚽ 教練' } as const;

const modes: { mode: GameMode; icon: string; title: string; subtitle: string; duration: string; desc: string; scoreRange: string; recommended?: boolean }[] = [
  { mode: 5, icon: '⚡', title: '5 題模式', subtitle: '快速對話暖身', duration: '~5 分鐘', desc: '每題 3 輪來回，適合先熟習多輪 chat box 玩法', scoreRange: '滿分 50 分' },
  { mode: 10, icon: '🎯', title: '10 題模式', subtitle: '標準對話訓練', duration: '~15 分鐘', desc: '跨多種情境練習接情緒、探核心、整合下一步的節奏', scoreRange: '滿分 100 分', recommended: true },
  { mode: 20, icon: '🚀', title: '20 題模式', subtitle: '深度互動實戰', duration: '~30 分鐘', desc: '完整跑一輪高密度多輪場景，結果頁會得到更立體嘅對話分析', scoreRange: '滿分 200 分' },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stableHover = { scale: 1.012, boxShadow: '0 16px 40px rgba(31, 38, 135, 0.18)' };
const stableTap = { scale: 0.992 };

interface TopicSectionConfig {
  id: string;
  title: string;
  description: string;
  categories: string[];
}

interface TopicSection extends TopicSectionConfig {
  scenarios: Scenario[];
  selectedCount: number;
}

const topicSectionsByRole: Record<GameRole, TopicSectionConfig[]> = {
  teacher: [
    {
      id: 'teacher-learning',
      title: '學習與課堂節奏',
      description: '集中練習課堂參與、學業表現、拖延與專注相關對話。',
      categories: ['參與度低', '學業壓力', '學業表現', '學業進步', '時間管理', '課堂專注', '特殊需要'],
    },
    {
      id: 'teacher-emotion',
      title: '情緒與身心狀態',
      description: '處理學生壓力、情緒爆發、身體形象與內在感受。',
      categories: ['心理壓力', '情緒宣洩', '情緒爆發', '身心狀態', '身體形象'],
    },
    {
      id: 'teacher-social',
      title: '社交與校園互動',
      description: '針對同儕關係、小組合作、退縮和欺凌場景做練習。',
      categories: ['小組合作', '校園欺凌', '社交孤立', '社交技巧', '社交退縮'],
    },
    {
      id: 'teacher-support',
      title: '背景轉變與支援需要',
      description: '面對家庭狀況、環境變化和權威挑戰等較複雜的現場。',
      categories: ['家庭狀況', '環境轉變', '權威挑戰'],
    },
  ],
  parent: [
    {
      id: 'parent-emotion',
      title: '情緒承接與安全感',
      description: '適合練放學情緒、睡前崩潰、害怕和失落等日常情境。',
      categories: ['分享困難', '寵物離世', '恐懼處理', '情緒管理', '放學情緒', '睡前情緒'],
    },
    {
      id: 'parent-learning',
      title: '學習壓力與責任感',
      description: '聚焦功課、返學抗拒、誠實和責任承擔等拉鋸對話。',
      categories: ['功課壓力', '學業壓力', '誠實問題', '責任承擔', '返學抗拒'],
    },
    {
      id: 'parent-family',
      title: '家庭關係與社交受挫',
      description: '處理手足衝突、朋友關係與家庭張力的回應節奏。',
      categories: ['家庭關係', '手足衝突', '朋友衝突', '社交受挫'],
    },
    {
      id: 'parent-routines',
      title: '生活習慣與界線建立',
      description: '練習電子產品、飲食、自理和消費界線等實際日常。',
      categories: ['消費教育', '自理能力', '身體形象', '電子產品', '飲食習慣'],
    },
  ],
  coach: [
    {
      id: 'coach-entry',
      title: '安全感與進場適應',
      description: '適合面對分離焦慮、退縮、拒絕參與和恐懼挑戰。',
      categories: ['依附行為', '分離焦慮', '參與意願', '恐懼挑戰', '退出行為'],
    },
    {
      id: 'coach-regulation',
      title: '情緒調節與挫折恢復',
      description: '聚焦輸贏反應、失控、過度興奮和重建自我效能。',
      categories: ['成功態度', '挫折恢復', '挫折處理', '過度興奮', '攻擊行為', '自我效能'],
    },
    {
      id: 'coach-team',
      title: '團隊合作與規則互動',
      description: '集中處理輪候、競爭、跟隊友合作和接受規則轉變。',
      categories: ['合作意願', '競爭心態', '等待困難', '規則改變', '模仿行為'],
    },
    {
      id: 'coach-focus',
      title: '專注與器材整理',
      description: '練習專注轉換、器材使用、物品執著和收拾整理。',
      categories: ['器材使用', '專注困難', '收拾整理', '物品執著'],
    },
  ],
};

export default function QuestionCount() {
  const navigate = useNavigate();
  const { selectedRole, selectMode, selectCustomScenarios } = useGameStore();
  const [selectionView, setSelectionView] = useState<'random' | 'custom'>('random');
  const [query, setQuery] = useState('');
  const [selectedScenarioIds, setSelectedScenarioIds] = useState<number[]>([]);
  const [openSectionIds, setOpenSectionIds] = useState<string[]>([]);
  const activeRole = selectedRole ?? 'teacher';

  const availableScenarios = useMemo(
    () =>
      [...getScenariosByRole(activeRole)].sort(
        (left, right) =>
          left.category.localeCompare(right.category, 'zh-Hant') ||
          left.title.localeCompare(right.title, 'zh-Hant'),
      ),
    [activeRole],
  );

  const filteredScenarios = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return availableScenarios;

    return availableScenarios.filter((scenario) =>
      `${scenario.category} ${scenario.title} ${scenario.description}`.toLowerCase().includes(normalizedQuery),
    );
  }, [availableScenarios, query]);

  const selectedScenarioIdSet = useMemo(() => new Set(selectedScenarioIds), [selectedScenarioIds]);

  const selectedScenarios = useMemo(
    () => availableScenarios.filter((scenario) => selectedScenarioIdSet.has(scenario.id)),
    [availableScenarios, selectedScenarioIdSet],
  );

  const customSections = useMemo<TopicSection[]>(() => {
    const sectionConfigs = topicSectionsByRole[activeRole];
    const categoryToSectionId = new Map<string, string>();
    sectionConfigs.forEach((section) => {
      section.categories.forEach((category) => {
        categoryToSectionId.set(category, section.id);
      });
    });

    const sectionMap = new Map<string, TopicSection>(
      sectionConfigs.map((section) => [
        section.id,
        {
          ...section,
          scenarios: [],
          selectedCount: 0,
        },
      ]),
    );

    const fallbackSection: TopicSection = {
      id: `${activeRole}-other`,
      title: '其他主題',
      description: '暫時未細分分類的題目會放在這裡。',
      categories: [],
      scenarios: [],
      selectedCount: 0,
    };

    filteredScenarios.forEach((scenario) => {
      const sectionId = categoryToSectionId.get(scenario.category);
      const targetSection = sectionId ? sectionMap.get(sectionId) : fallbackSection;

      if (!targetSection) return;

      targetSection.scenarios.push(scenario);
      if (selectedScenarioIdSet.has(scenario.id)) {
        targetSection.selectedCount += 1;
      }
    });

    const orderedSections = sectionConfigs
      .map((section) => sectionMap.get(section.id))
      .filter((section): section is TopicSection => Boolean(section && section.scenarios.length > 0));

    if (fallbackSection.scenarios.length > 0) {
      orderedSections.push(fallbackSection);
    }

    return orderedSections;
  }, [activeRole, filteredScenarios, selectedScenarioIdSet]);

  useEffect(() => {
    setSelectionView('random');
    setQuery('');
    setSelectedScenarioIds([]);
  }, [activeRole]);

  useEffect(() => {
    setOpenSectionIds(topicSectionsByRole[activeRole].slice(0, 2).map((section) => section.id));
  }, [activeRole]);

  useEffect(() => {
    if (!query.trim()) return;
    setOpenSectionIds(customSections.map((section) => section.id));
  }, [query, customSections]);

  if (!selectedRole) {
    navigate('/role');
    return null;
  }

  const handleSelect = (mode: GameMode) => {
    selectMode(mode);
    navigate('/play');
  };

  const toggleScenario = (scenarioId: number) => {
    setSelectedScenarioIds((current) =>
      current.includes(scenarioId) ? current.filter((id) => id !== scenarioId) : [...current, scenarioId],
    );
  };

  const handleStartCustom = () => {
    if (!selectedScenarios.length) return;
    selectCustomScenarios(selectedScenarios);
    navigate('/play');
  };

  const handleSelectAllVisible = () => {
    setSelectedScenarioIds((current) => Array.from(new Set([...current, ...filteredScenarios.map((scenario) => scenario.id)])));
  };

  const handleExpandAll = () => {
    setOpenSectionIds(customSections.map((section) => section.id));
  };

  const handleCollapseAll = () => {
    setOpenSectionIds([]);
  };

  const selectionSummary =
    selectedScenarios.length === 0
      ? '未揀題目'
      : selectedScenarios.length === 1
        ? '已揀 1 題聚焦練習'
        : `已揀 ${selectedScenarios.length} 題自選訓練`;

  return (
    <div className="gradient-bg relative overflow-hidden">
      <FloatingShapes />
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate('/role')} className="glass-pill flex items-center gap-1 hover:shadow-glass">
              <ArrowLeft size={16} /> 返回
            </button>
            <span className="text-sm text-muted-foreground">選擇身份 &gt; 選擇方式</span>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
            <span className="glass-pill mb-4 inline-block">{roleLabels[selectedRole]}</span>
            <h2 className="text-3xl font-bold mt-4">選擇練習方式</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              你可以維持隨機抽題，亦可以直接揀想練嘅指定場景。
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card mb-6 p-2">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                onClick={() => setSelectionView('random')}
                className={cn(
                  'rounded-[1.1rem] px-4 py-4 text-left transition-colors',
                  selectionView === 'random' ? 'bg-slate-900 text-white shadow-lg' : 'bg-white/55 text-slate-700 hover:bg-white/75',
                )}
              >
                <div className="flex items-center gap-3">
                  <Shuffle size={18} />
                  <div>
                    <p className="font-semibold">隨機抽題模式</p>
                    <p className={cn('text-sm', selectionView === 'random' ? 'text-white/80' : 'text-slate-500')}>
                      由系統幫你配對一組場景，適合快速進入訓練。
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setSelectionView('custom')}
                className={cn(
                  'rounded-[1.1rem] px-4 py-4 text-left transition-colors',
                  selectionView === 'custom' ? 'bg-sky-600 text-white shadow-lg' : 'bg-white/55 text-slate-700 hover:bg-white/75',
                )}
              >
                <div className="flex items-center gap-3">
                  <Target size={18} />
                  <div>
                    <p className="font-semibold">自選題目模式</p>
                    <p className={cn('text-sm', selectionView === 'custom' ? 'text-white/85' : 'text-slate-500')}>
                      逐題揀你想練嘅場景，聚焦做指定主題訓練。
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>

          {selectionView === 'random' ? (
            <motion.div variants={container} initial="hidden" animate="visible" className="space-y-4">
              {modes.map((m) => (
                <motion.button
                  key={m.mode}
                  variants={item}
                  whileHover={stableHover}
                  whileTap={stableTap}
                  onClick={() => handleSelect(m.mode)}
                  className="glass-card w-full p-6 text-left relative overflow-hidden"
                >
                  {m.recommended && (
                    <span className="absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold" style={{ background: 'hsl(211 100% 50% / 0.15)', color: 'hsl(211 100% 50%)' }}>
                      推薦
                    </span>
                  )}
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{m.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold">
                        {m.title} <span className="ml-1 text-sm font-normal text-muted-foreground">{m.subtitle}</span>
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                      <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                        <span>⏱ {m.duration}</span>
                        <span>📊 {m.scoreRange}</span>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          ) : (
            <div className="space-y-5">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 sm:p-7">
                <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                  <div>
                    <p className="section-kicker">指定題目練習</p>
                    <h3 className="mt-2 text-2xl font-bold">挑你想集中練習嘅場景</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      適合針對某類情況反覆操練，例如功課拉鋸、課堂退縮、比賽失控。你可以只揀 1 題聚焦，亦可以自己組合一套訓練清單。
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-3 xl:items-end">
                    <span className="glass-pill text-xs font-semibold">{selectionSummary}</span>
                    <button
                      onClick={handleStartCustom}
                      disabled={selectedScenarios.length === 0}
                      className="glass-button px-5 py-3 text-sm font-semibold text-white shadow-glass disabled:cursor-not-allowed disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, hsl(198 93% 50% / 0.95), hsl(221 83% 53% / 0.95))' }}
                    >
                      {selectedScenarios.length <= 1 ? '開始 1 題聚焦訓練' : `開始 ${selectedScenarios.length} 題自選訓練`}
                    </button>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <Input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="搜尋題目、主題或情境，例如：功課、欺凌、輸波"
                      className="h-11 rounded-[1rem] border-white/40 bg-white/70 pl-10"
                    />
                  </div>
                  <button
                    onClick={handleSelectAllVisible}
                    disabled={filteredScenarios.length === 0}
                    className="glass-pill inline-flex items-center justify-center border-0 px-4 py-3 font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    全選目前題目
                  </button>
                  <button
                    onClick={() => setSelectedScenarioIds([])}
                    disabled={selectedScenarioIds.length === 0}
                    className="glass-pill inline-flex items-center justify-center border-0 px-4 py-3 font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    清空選擇
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-3">
                  <button
                    onClick={handleExpandAll}
                    disabled={customSections.length === 0}
                    className="glass-pill inline-flex items-center justify-center border-0 px-4 py-2.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    展開全部分類
                  </button>
                  <button
                    onClick={handleCollapseAll}
                    disabled={openSectionIds.length === 0}
                    className="glass-pill inline-flex items-center justify-center border-0 px-4 py-2.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    收起全部分類
                  </button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <Accordion type="multiple" value={openSectionIds} onValueChange={setOpenSectionIds} className="space-y-4">
                  {customSections.map((section) => (
                    <AccordionItem
                      key={section.id}
                      value={section.id}
                      className="glass-card overflow-hidden border-0 px-5 py-1 sm:px-6"
                    >
                      <AccordionTrigger className="py-5 text-left hover:no-underline">
                        <div className="flex min-w-0 flex-1 flex-col gap-3 pr-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-lg font-bold">{section.title}</p>
                              <span className="rounded-full bg-slate-900/8 px-3 py-1 text-xs font-semibold text-slate-600">
                                {section.scenarios.length} 題
                              </span>
                              {section.selectedCount > 0 && (
                                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                                  已揀 {section.selectedCount} 題
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{section.description}</p>
                          </div>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="pb-5">
                        <div className="grid gap-4 md:grid-cols-2">
                          {section.scenarios.map((scenario) => {
                            const isSelected = selectedScenarioIdSet.has(scenario.id);

                            return (
                              <motion.button
                                key={scenario.id}
                                whileHover={stableHover}
                                whileTap={stableTap}
                                onClick={() => toggleScenario(scenario.id)}
                                className={cn(
                                  'glass-card relative w-full p-5 text-left',
                                  isSelected
                                    ? 'border-sky-300 bg-white/90 shadow-[0_18px_40px_rgba(14,116,144,0.16)] ring-2 ring-sky-300/70'
                                    : 'border-white/40',
                                )}
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <span className="glass-pill px-3 py-1 text-xs font-semibold">{scenario.category}</span>
                                    <h4 className="mt-3 text-lg font-bold leading-snug">{scenario.title}</h4>
                                  </div>
                                  <CheckCircle2
                                    size={22}
                                    className={cn('mt-1 shrink-0 transition-colors', isSelected ? 'text-sky-500' : 'text-slate-300')}
                                  />
                                </div>

                                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{scenario.description}</p>

                                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                                  <span className="rounded-full bg-sky-100 px-3 py-1 font-medium text-sky-700">3 輪 chat 對話</span>
                                  <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700">逐句分析</span>
                                  <span className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-700">互動分析回饋</span>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>

              {customSections.length === 0 && (
                <div className="glass-card p-8 text-center">
                  <p className="font-semibold">搵唔到相符題目</p>
                  <p className="mt-2 text-sm text-muted-foreground">你可以試吓搜尋另一個關鍵字，或者先清空搜尋再慢慢揀題。</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
