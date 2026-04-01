import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { toast } from 'sonner';
import { useGameStore } from '@/store/gameStore';
import FloatingShapes from '@/components/FloatingShapes';
import ScenarioReviewCard from '@/components/ScenarioReviewCard';
import { getSupervisorModeLabel } from '@/lib/aiSupervisor';
import { buildSessionRecommendations, summarizeSignals } from '@/lib/conversationEngine';

const roleLabels = { teacher: '🎓 教師', parent: '🏠 家長', coach: '⚽ 教練' } as const;
const typeLabels = {
  open: '開放式',
  'semi-open': '半開放式',
  judgmental: '判斷式',
  closed: '封閉式',
} as const;

function getGrade(score: number, max: number) {
  const pct = max ? score / max : 0;
  if (pct >= 0.9) return { emoji: '🌟', label: '高安全感對話者' };
  if (pct >= 0.72) return { emoji: '🌿', label: '穩定發展中' };
  if (pct >= 0.5) return { emoji: '🪴', label: '有基礎，值得再練' };
  return { emoji: '🌱', label: '需要更多開放式練習' };
}

const PIE_COLORS = ['#0EA5E9', '#10B981', '#F59E0B', '#F97316'];

const phraseLibrary = [
  '我留意到你而家好似有啲唔容易。',
  '你而家心入面最大感覺係咩？',
  '你最在意或者最擔心嘅係咩？',
  '想唔想同我講多啲啱啱發生咩事？',
  '我哋可以一齊慢慢諗下一步。',
];

export default function Results() {
  const navigate = useNavigate();
  const {
    selectedRole,
    selectedMode,
    totalScore,
    answers,
    reflections,
    saveCompletedGame,
    resetGame,
    supervisorMode,
    deepseekModel,
    practiceSelectionMode,
  } =
    useGameStore();
  const [saved, setSaved] = useState(false);

  const maxScore = (selectedMode ?? 10) * 10;
  const grade = getGrade(totalScore, maxScore);
  const pct = Math.round((totalScore / maxScore) * 100);

  const patternData = useMemo(() => {
    const counts = {
      open: answers.filter((answer) => answer.type === 'open').length,
      'semi-open': answers.filter((answer) => answer.type === 'semi-open').length,
      judgmental: answers.filter((answer) => answer.type === 'judgmental').length,
      closed: answers.filter((answer) => answer.type === 'closed').length,
    };

    return Object.entries(counts).map(([type, value]) => ({
      name: typeLabels[type as keyof typeof typeLabels],
      value,
    }));
  }, [answers]);

  const signalMetrics = useMemo(() => summarizeSignals(answers), [answers]);
  const recommendations = useMemo(() => buildSessionRecommendations(answers), [answers]);
  const repairedCount = useMemo(
    () =>
      answers.filter((answer) => {
        const first = answer.turnAnalyses[0];
        const last = answer.turnAnalyses[answer.turnAnalyses.length - 1];
        return first && last && last.score > first.score;
      }).length,
    [answers],
  );

  const strongAnswers = useMemo(
    () => [...answers].sort((left, right) => right.score - left.score).slice(0, 3),
    [answers],
  );
  const growthAnswers = useMemo(
    () => [...answers].sort((left, right) => left.score - right.score).slice(0, 2),
    [answers],
  );

  const openRate = answers.length ? Math.round((answers.filter((answer) => answer.type === 'open').length / answers.length) * 100) : 0;
  const averageTurnScore = answers.length
    ? Math.round(
        answers.reduce((sum, answer) => sum + answer.turnAnalyses.reduce((turnSum, turn) => turnSum + turn.score, 0) / answer.turnCount, 0) /
          answers.length,
      )
    : 0;

  useEffect(() => {
    if (!saved && selectedRole && selectedMode) {
      saveCompletedGame();
      setSaved(true);
    }
  }, [saved, selectedRole, selectedMode, saveCompletedGame]);

  if (!selectedRole || !selectedMode) {
    navigate('/');
    return null;
  }

  const handleReplay = () => {
    const role = selectedRole;
    resetGame();
    useGameStore.getState().selectRole(role);
    navigate('/mode');
  };

  const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="gradient-bg relative overflow-hidden">
      <FloatingShapes />
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="app-shell">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.55 }} className="mb-8 pt-2">
            <div className="glass-card overflow-hidden p-6 sm:p-7 lg:p-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-center">
                <div>
                  <div className="flex flex-wrap gap-2">
                    <span className="glass-pill text-xs">{roleLabels[selectedRole]}</span>
                    <span className="glass-pill text-xs">{selectedMode} 個場景</span>
                    <span className="glass-pill text-xs">多輪 chat 訓練</span>
                    <span className="glass-pill text-xs">{practiceSelectionMode === 'custom' ? '自選題目' : '隨機抽題'}</span>
                    <span className="glass-pill text-xs">{getSupervisorModeLabel(supervisorMode, deepseekModel)}</span>
                  </div>

                  <p className="section-kicker mt-5">對話訓練完成</p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">完成咗一輪更貼近真實情境的對話練習</h1>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                    你今次以 {roleLabels[selectedRole]} 身份完成咗 {selectedMode} 個多輪 chat box 場景，
                    {practiceSelectionMode === 'custom' ? '而且係由你自己揀選主題組合出來。' : '由系統幫你隨機抽出作綜合練習。'}
                    每題都經過 3 輪來回，整體開放式回應比例為 {openRate}% ，對話安全感指數為 {pct}%。
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: '最穩定能力', value: signalMetrics.observation >= signalMetrics.emotion ? '先觀察再回應' : '先接住情緒' },
                      { label: '修復表現', value: `${repairedCount} 題後段有進步` },
                      { label: '整體評級', value: grade.label },
                    ].map((item) => (
                      <div key={item.label} className="metric-panel px-4 py-4">
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="mt-2 text-base font-semibold leading-relaxed">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="glass-card mx-auto flex h-52 w-52 flex-col items-center justify-center text-center"
                  style={{ borderRadius: '999px' }}
                >
                  <span className="section-kicker">總分</span>
                  <span className="mt-2 text-4xl font-bold text-gradient">
                    {totalScore}/{maxScore}
                  </span>
                  <span className="mt-3 text-4xl">{grade.emoji}</span>
                  <span className="mt-2 text-sm font-semibold">{grade.label}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {[
              { label: '開放式比率', value: `${openRate}%` },
              { label: '每輪平均分', value: `${averageTurnScore}/10` },
              { label: '觀察線索', value: `${signalMetrics.observation}%` },
              { label: '修復成功題數', value: `${repairedCount} 題` },
            ].map((metric) => (
              <div key={metric.label} className="metric-panel px-5 py-5">
                <p className="mb-2 text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-8 grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]"
          >
            <div className="glass-card p-6 sm:p-7">
              <p className="section-kicker">回應分布</p>
              <h3 className="mb-5 mt-2 text-xl font-bold">📊 回應風格分布</h3>
              <div className="flex flex-col items-center gap-5 lg:flex-row lg:items-center">
                <div className="h-60 w-60">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={patternData} cx="50%" cy="50%" outerRadius={78} innerRadius={40} dataKey="value" strokeWidth={2}>
                        {patternData.map((_, index) => (
                          <Cell key={index} fill={PIE_COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full space-y-3 text-sm">
                  {patternData.map((pattern, index) => (
                    <div key={pattern.name} className="nested-panel flex items-center justify-between gap-3 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full" style={{ background: PIE_COLORS[index] }} />
                        <span>{pattern.name}</span>
                      </div>
                      <span className="font-semibold">
                        {pattern.value} 題
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-card p-6 sm:p-7">
              <p className="section-kicker">教練總結</p>
              <h3 className="mb-5 mt-2 text-xl font-bold">🧠 本輪結論</h3>
              <div className="space-y-3 text-sm leading-relaxed">
                <div className="nested-panel p-4">
                  <p className="font-semibold">你最穩定嘅能力</p>
                  <p className="mt-1 text-muted-foreground">
                    {signalMetrics.observation >= signalMetrics.emotion
                      ? '你較願意先觀察現場線索，再回應，這對多輪對話很重要。'
                      : '你對情緒訊號較敏感，較容易用同理方式打開第一輪。'}
                  </p>
                </div>
                <div className="nested-panel p-4">
                  <p className="font-semibold">最值得再練嘅地方</p>
                  <p className="mt-1 text-muted-foreground">
                    {signalMetrics.curiosity < signalMetrics.emotion
                      ? '你已經會接情緒，但還可以再多留一點讓對方講下去的空間。'
                      : '你已經願意問，但可再多講一句觀察或感受，讓提問更有溫度。'}
                  </p>
                </div>
                <div className="nested-panel p-4">
                  <p className="font-semibold">下一輪建議</p>
                  <p className="mt-1 text-muted-foreground">
                    繼續用「第一輪接情緒、第二輪探核心、第三輪整理需要」這條節奏去練，分數通常會更穩。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-8"
          >
            <p className="section-kicker mb-2">改善方向</p>
            <h3 className="mb-4 text-xl font-bold">🎯 個人化改善建議</h3>
            <div className="grid gap-3 lg:grid-cols-2">
              {recommendations.map((item) => (
                <div key={item.title} className="glass-card p-5 sm:p-6">
                  <p className="font-semibold">
                    {item.icon} {item.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-8 grid gap-4 xl:grid-cols-2"
          >
            <div className="glass-card p-6 sm:p-7">
              <p className="section-kicker">亮點場景</p>
              <h3 className="mb-4 mt-2 text-xl font-bold">✨ 今次做得最好嘅場景</h3>
              <div className="space-y-3">
                {strongAnswers.map((answer) => (
                  <div key={answer.scenarioId} className="nested-panel p-4">
                    <p className="text-sm text-muted-foreground">{answer.category}</p>
                    <p className="font-semibold">{answer.scenarioTitle}</p>
                    <p className="mt-2 text-sm leading-relaxed">{answer.feedback.strengths[0]}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6 sm:p-7">
              <p className="section-kicker">回看重點</p>
              <h3 className="mb-4 mt-2 text-xl font-bold">🛠️ 最值得回看嘅場景</h3>
              <div className="space-y-3">
                {growthAnswers.map((answer) => (
                  <div key={answer.scenarioId} className="nested-panel p-4">
                    <p className="text-sm text-muted-foreground">{answer.category}</p>
                    <p className="font-semibold">{answer.scenarioTitle}</p>
                    <p className="mt-2 text-sm leading-relaxed">{answer.feedback.risks[0]}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {reflections.length > 0 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              transition={{ duration: 0.45 }}
              className="mb-8"
            >
              <p className="section-kicker mb-2">過程紀錄</p>
              <h3 className="mb-4 text-xl font-bold">📝 你的中途反思</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {reflections.map((reflection, index) => (
                  <div key={`${reflection}-${index}`} className="glass-card p-5 text-sm leading-relaxed">
                    {reflection}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-8"
          >
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="section-kicker mb-2">逐題分析</p>
                <h3 className="text-xl font-bold">🔎 逐題回顧</h3>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(phraseLibrary.join('\n'));
                  toast.success('已複製開放式回應句庫');
                }}
                className="glass-pill text-xs font-semibold"
              >
                複製句庫
              </button>
            </div>
            <div className="space-y-3">
              {answers.map((answer) => (
                <ScenarioReviewCard key={answer.scenarioId} answer={answer} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.45 }}
            className="mb-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            <button onClick={handleReplay} className="glass-card glass-card-hover p-5 text-center font-semibold">
              🔄 再做一輪
            </button>
            <button onClick={() => { resetGame(); navigate('/role'); }} className="glass-card glass-card-hover p-5 text-center font-semibold">
              🎭 換角色練習
            </button>
            <button onClick={() => navigate('/history')} className="glass-card glass-card-hover p-5 text-center font-semibold">
              📊 查看歷史
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`我喺「開放式回應學習遊戲」完成咗 ${selectedMode} 個聊天場景，總分 ${totalScore}/${maxScore}，開放式回應比率 ${openRate}%！`);
                toast.success('已複製分享文字');
              }}
              className="glass-card glass-card-hover p-5 text-center font-semibold"
            >
              📤 分享結果
            </button>
          </motion.div>

          <div className="pb-8 text-center">
            <button onClick={() => { resetGame(); navigate('/'); }} className="text-sm text-muted-foreground underline">
              返回首頁
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
