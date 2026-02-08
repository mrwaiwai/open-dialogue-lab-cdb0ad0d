import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FloatingShapes from '@/components/FloatingShapes';
import { useGameStore } from '@/store/gameStore';
import type { GameMode } from '@/types/game';

const roleLabels = { teacher: '🎓 教師', parent: '🏠 家長', coach: '⚽ 教練' } as const;

const modes: { mode: GameMode; icon: string; title: string; subtitle: string; duration: string; desc: string; scoreRange: string; recommended?: boolean }[] = [
  { mode: 5, icon: '⚡', title: '5 題模式', subtitle: '快速體驗', duration: '~5 分鐘', desc: '體驗核心概念，適合初次接觸或時間有限者', scoreRange: '滿分 50 分' },
  { mode: 10, icon: '🎯', title: '10 題模式', subtitle: '標準練習', duration: '~15 分鐘', desc: '深入多種情境，建立系統化理解與應用能力', scoreRange: '滿分 100 分', recommended: true },
  { mode: 20, icon: '🚀', title: '20 題模式', subtitle: '深度訓練', duration: '~30 分鐘', desc: '全面掌握各類場景，獲得詳細分析報告與學習路徑', scoreRange: '滿分 200 分' },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function QuestionCount() {
  const navigate = useNavigate();
  const { selectedRole, selectMode } = useGameStore();

  if (!selectedRole) { navigate('/role'); return null; }

  const handleSelect = (mode: GameMode) => {
    selectMode(mode);
    navigate('/play');
  };

  return (
    <div className="gradient-bg relative overflow-hidden">
      <FloatingShapes />
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-6">
            <button onClick={() => navigate('/role')} className="glass-pill flex items-center gap-1 hover:shadow-glass">
              <ArrowLeft size={16} /> 返回
            </button>
            <span className="text-sm text-muted-foreground">選擇身份 &gt; 選擇題數</span>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-8">
            <span className="glass-pill mb-4 inline-block">{roleLabels[selectedRole]}</span>
            <h2 className="text-3xl font-bold mt-4">選擇練習模式</h2>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="visible" className="space-y-4">
            {modes.map((m) => (
              <motion.button
                key={m.mode}
                variants={item}
                whileHover={{ y: -4, boxShadow: '0 12px 40px 0 rgba(31,38,135,0.25)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(m.mode)}
                className="glass-card w-full p-6 text-left relative overflow-hidden"
              >
                {m.recommended && (
                  <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'hsl(211 100% 50% / 0.15)', color: 'hsl(211 100% 50%)' }}>
                    推薦
                  </span>
                )}
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{m.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{m.title} <span className="text-sm font-normal text-muted-foreground ml-1">{m.subtitle}</span></h3>
                    <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                    <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                      <span>⏱ {m.duration}</span>
                      <span>📊 {m.scoreRange}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
