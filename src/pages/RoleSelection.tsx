import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FloatingShapes from '@/components/FloatingShapes';
import { useGameStore } from '@/store/gameStore';
import type { GameRole } from '@/types/game';

const roles: { role: GameRole; icon: string; title: string; subtitle: string; desc: string; badge: string; glowColor: string }[] = [
  { role: 'teacher', icon: '🎓', title: '教師', subtitle: '課室校園版', desc: '用 chat box 方式演練課室溝通，處理學生情緒、學習困難、人際衝突等高張力時刻', badge: '20+ 課室對話場景', glowColor: 'rgba(0, 122, 255, 0.2)' },
  { role: 'parent', icon: '🏠', title: '家長', subtitle: '家庭屋企版', desc: '模擬日常親子對話，包括衝突、情緒崩潰、功課拉鋸等場景，練習更有安全感嘅回應', badge: '20+ 家庭對話場景', glowColor: 'rgba(52, 199, 89, 0.2)' },
  { role: 'coach', icon: '⚽', title: '教練', subtitle: '運動與遊戲治療版', desc: '透過運動與團體互動場景，學習點樣回應挫敗、焦慮、分離感同衝突', badge: '20+ 訓練對話場景', glowColor: 'rgba(255, 149, 0, 0.2)' },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
};
const stableHover = { scale: 1.015, boxShadow: '0 16px 42px rgba(31, 38, 135, 0.2)' };
const stableTap = { scale: 0.992 };

export default function RoleSelection() {
  const navigate = useNavigate();
  const selectRole = useGameStore((s) => s.selectRole);

  const handleSelect = (role: GameRole) => {
    selectRole(role);
    navigate('/mode');
  };

  return (
    <div className="gradient-bg relative overflow-hidden">
      <FloatingShapes />
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-8">
            <button onClick={() => navigate('/')} className="glass-pill flex items-center gap-1 hover:shadow-glass">
              <ArrowLeft size={16} /> 返回
            </button>
            <span className="text-sm text-muted-foreground">選擇身份</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-center mb-8"
          >
            選擇你的訓練身份
          </motion.h2>

          <motion.div variants={container} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((r) => (
              <motion.button
                key={r.role}
                variants={item}
                whileHover={{ ...stableHover, boxShadow: `0 16px 42px rgba(31, 38, 135, 0.2), 0 0 34px ${r.glowColor}` }}
                whileTap={stableTap}
                onClick={() => handleSelect(r.role)}
                className="glass-card p-8 text-left"
              >
                <div className="text-5xl mb-4">{r.icon}</div>
                <h3 className="text-xl font-bold mb-1">{r.title} <span className="text-base font-normal text-muted-foreground">- {r.subtitle}</span></h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{r.desc}</p>
                <span className="glass-pill text-xs font-medium">{r.badge}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
