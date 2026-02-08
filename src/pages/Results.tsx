import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useGameStore } from '@/store/gameStore';
import FloatingShapes from '@/components/FloatingShapes';
import { toast } from 'sonner';

const roleLabels = { teacher: '🎓 教師', parent: '🏠 家長', coach: '⚽ 教練' } as const;
const roleMetric4 = { teacher: '專業界線', parent: '家庭氛圍', coach: '治療敏感度' } as const;

function getGrade(score: number, max: number) {
  const pct = score / max;
  if (max === 50) {
    if (pct >= 0.72) return { emoji: '🌳', label: '熟練溝通者' };
    if (pct >= 0.42) return { emoji: '🌿', label: '學習中溝通者' };
    return { emoji: '🌱', label: '新手溝通者' };
  }
  if (pct >= 0.91) return { emoji: '💎', label: '鑽石' };
  if (pct >= 0.76) return { emoji: '🥇', label: '金章' };
  if (pct >= 0.51) return { emoji: '🥈', label: '銀章' };
  return { emoji: '🥉', label: '銅章' };
}

const PIE_COLORS = ['hsl(4,100%,59%)', 'hsl(45,100%,45%)', 'hsl(134,58%,49%)'];

const phrases: { cat: string; items: string[] }[] = [
  { cat: '📍 描述觀察類', items: ['「我見到你...」', '「我留意到你好似...」', '「你嘅表情/身體語言話俾我知...」'] },
  { cat: '🎭 情緒探索類', items: ['「你而家感覺係點？」', '「聽落你好似覺得...」', '「呢件事令你有咩感受？」'] },
  { cat: '🤔 邀請表達類', items: ['「可以講多啲嗎？」', '「你點睇呢件事？」', '「想唔想同我分享下？」'] },
  { cat: '🔍 澄清理解類', items: ['「即係話...係咪？」', '「我想確認下我有冇理解錯...」', '「你意思係唔係...？」'] },
  { cat: '🤝 共同解決類', items: ['「我哋可以點做？」', '「你諗到咩辦法？」', '「一齊諗下有咩選擇？」'] },
];

export default function Results() {
  const navigate = useNavigate();
  const { selectedRole, selectedMode, totalScore, answers, saveCompletedGame, resetGame } = useGameStore();
  const [saved, setSaved] = useState(false);
  const [expandedPhrase, setExpandedPhrase] = useState<number | null>(null);

  const maxScore = (selectedMode ?? 10) * 10;
  const grade = getGrade(totalScore, maxScore);
  const pct = Math.round((totalScore / maxScore) * 100);

  // Response patterns
  const patterns = useMemo(() => {
    let closed = 0, semiOpen = 0, open = 0;
    answers.forEach((a) => {
      if (a.type === 'closed' || a.type === 'judgmental') closed++;
      else if (a.type === 'semi-open') semiOpen++;
      else open++;
    });
    return [
      { name: '封閉式回應', value: closed },
      { name: '半開放回應', value: semiOpen },
      { name: '開放式回應', value: open },
    ];
  }, [answers]);

  // Metrics
  const openPct = answers.length ? Math.round((answers.filter((a) => a.type === 'open').length / answers.length) * 100) : 0;
  const avgScore = answers.length ? Math.round((totalScore / (answers.length * 10)) * 100) : 0;
  const metrics = selectedRole ? [
    { label: '溝通開放度', value: openPct },
    { label: '情緒辨識能力', value: Math.min(100, avgScore + 5) },
    { label: '同理心表達', value: Math.min(100, openPct + 10) },
    { label: roleMetric4[selectedRole], value: Math.min(100, avgScore) },
  ] : [];

  // Recommendations
  const recommendations = useMemo(() => {
    const recs: { icon: string; title: string; desc: string }[] = [];
    if (openPct < 60) recs.push({ icon: '📝', title: '練習描述觀察', desc: '嘗試用「我見到你...」、「我留意到...」開始對話，描述行為而非評價。' });
    if (avgScore < 70) recs.push({ icon: '⏱️', title: '給予等待時間', desc: '提問後，數 3-5 秒才追問，讓小朋友有空間整理思緒。' });
    const closedPct = answers.length ? (answers.filter((a) => a.type === 'closed' || a.type === 'judgmental').length / answers.length) * 100 : 0;
    if (closedPct > 40) recs.push({ icon: '🚫', title: '避免「點解」開場', desc: '將「點解你咁做？」改為「發生咗咩事？」或「你嗰陣感覺點？」' });
    recs.push({ icon: '🎭', title: '擴充情緒詞彙', desc: '除咗「開心」「唔開心」，嘗試用「失望」「焦慮」「挫折」等更精準詞語。' });
    recs.push({ icon: '👂', title: '反思性聆聽', desc: '覆述小朋友嘅說話，確認理解：「即係話你覺得...係咪？」' });
    return recs.slice(0, 5);
  }, [openPct, avgScore, answers]);

  // Save once
  useMemo(() => {
    if (!saved && selectedRole && selectedMode) {
      saveCompletedGame();
      setSaved(true);
    }
  }, [saved, selectedRole, selectedMode, saveCompletedGame]);

  if (!selectedRole || !selectedMode) { navigate('/'); return null; }

  const handleReplay = () => {
    const role = selectedRole;
    resetGame();
    useGameStore.getState().selectRole(role);
    navigate('/mode');
  };

  const handleCopyPhrase = (phrase: string) => {
    navigator.clipboard.writeText(phrase);
    toast.success('✓ 已複製句式');
  };

  const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="gradient-bg relative overflow-hidden">
      <FloatingShapes />
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-3xl mx-auto">

          {/* Section 1: Score Reveal */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12 pt-8">
            <p className="text-lg mb-4">🎉 完成訓練！</p>
            <div className="glass-card inline-block p-8 mb-6" style={{ borderRadius: '50%', width: 180, height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <motion.span
                className="text-4xl font-bold text-gradient block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                {totalScore}/{maxScore}
              </motion.span>
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: 'spring' }} className="text-3xl mt-1">
                {grade.emoji}
              </motion.span>
              <span className="text-sm font-medium mt-1">{grade.label}</span>
            </div>
            <p className="text-muted-foreground">你嘅開放式回應能力：{pct >= 76 ? '優秀' : pct >= 51 ? '良好' : '需要加強'}</p>
          </motion.div>

          {/* Section 2: Metrics */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }} className="grid grid-cols-2 gap-4 mb-8">
            {metrics.map((m) => (
              <div key={m.label} className="glass-card p-5">
                <p className="text-sm text-muted-foreground mb-2">{m.label}</p>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: m.value >= 76 ? 'hsl(134,58%,49%)' : m.value >= 51 ? 'hsl(35,100%,50%)' : 'hsl(4,100%,59%)' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
                <p className="text-lg font-bold">{m.value}%</p>
              </div>
            ))}
          </motion.div>

          {/* Section 3: Response Pattern Chart */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }} className="glass-card p-6 mb-8">
            <h3 className="text-lg font-bold mb-4">📊 你嘅慣性回應模式</h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-48 h-48">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={patterns} cx="50%" cy="50%" outerRadius={70} innerRadius={40} dataKey="value" strokeWidth={2}>
                      {patterns.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 text-sm">
                {patterns.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} />
                    <span>{p.name}: {answers.length ? Math.round((p.value / answers.length) * 100) : 0}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Section 4: Recommendations */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }} className="mb-8">
            <h3 className="text-lg font-bold mb-4">🎯 個人化改善建議</h3>
            <div className="space-y-3">
              {recommendations.map((r) => (
                <div key={r.title} className="glass-card p-5">
                  <p className="font-semibold mb-1">{r.icon} {r.title}</p>
                  <p className="text-sm text-muted-foreground">{r.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 5: Phrase Library */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }} className="mb-8">
            <h3 className="text-lg font-bold mb-4">💬 實用開放式回應句式範例</h3>
            <div className="space-y-2">
              {phrases.map((cat, ci) => (
                <div key={cat.cat} className="glass-card overflow-hidden">
                  <button
                    onClick={() => setExpandedPhrase(expandedPhrase === ci ? null : ci)}
                    className="w-full p-4 text-left font-medium flex justify-between items-center"
                  >
                    <span>{cat.cat}</span>
                    <span className="text-muted-foreground">{expandedPhrase === ci ? '−' : '+'}</span>
                  </button>
                  {expandedPhrase === ci && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-4 pb-4 space-y-2">
                      {cat.items.map((phrase) => (
                        <button
                          key={phrase}
                          onClick={() => handleCopyPhrase(phrase)}
                          className="w-full text-left text-sm p-3 rounded-xl hover:bg-muted/50 flex justify-between items-center transition-colors"
                        >
                          <span>{phrase}</span>
                          <span className="text-xs text-muted-foreground shrink-0 ml-2">📋 複製</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 6: Action Buttons */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }} className="grid grid-cols-2 gap-4 mb-12">
            <button onClick={handleReplay} className="glass-card glass-card-hover p-5 text-center font-semibold">
              🔄 再玩一次
            </button>
            <button onClick={() => { resetGame(); navigate('/role'); }} className="glass-card glass-card-hover p-5 text-center font-semibold">
              🎭 換個身份
            </button>
            <button onClick={() => navigate('/history')} className="glass-card glass-card-hover p-5 text-center font-semibold">
              📊 查看歷史
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`我在「開放式回應學習遊戲」以${roleLabels[selectedRole]}身份完成了${selectedMode}題練習，獲得 ${totalScore}/${maxScore} 分 ${grade.emoji} ${grade.label}！`);
                toast.success('已複製分享文字');
              }}
              className="glass-card glass-card-hover p-5 text-center font-semibold"
            >
              📤 分享結果
            </button>
          </motion.div>

          {/* Back to Home */}
          <div className="text-center pb-8">
            <button onClick={() => { resetGame(); navigate('/'); }} className="text-sm text-muted-foreground underline">
              返回首頁
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
