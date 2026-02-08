import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FloatingShapes from '@/components/FloatingShapes';
import { useGameStore } from '@/store/gameStore';
import type { GameRole } from '@/types/game';

const roles: { role: GameRole; icon: string; title: string; subtitle: string; desc: string; badge: string; glowColor: string }[] = [
  { role: 'teacher', icon: '🎓', title: '教師', subtitle: '課室校園版', desc: '學習如何在課室環境中運用開放式回應，處理學生情緒、學習困難、人際衝突等場景，提升師生溝通效率', badge: '包含 20+ 課室情境', glowColor: 'rgba(0, 122, 255, 0.2)' },
  { role: 'parent', icon: '🏠', title: '家長', subtitle: '家庭屋企版', desc: '透過日常家庭情境，包括親子衝突、情緒管理、手足爭執等，改善親子對話質素，建立信任與歸屬感', badge: '包含 20+ 家庭情境', glowColor: 'rgba(52, 199, 89, 0.2)' },
  { role: 'coach', icon: '⚽', title: '教練', subtitle: '運動與遊戲治療版', desc: '在運動訓練與遊戲治療環境中，以開放式回應促進兒童情緒發展、挫折處理、社交互動技巧', badge: '包含 20+ 訓練情境', glowColor: 'rgba(255, 149, 0, 0.2)' },
];

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const } },
};

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
            選擇你的身份
          </motion.h2>

          <motion.div variants={container} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((r) => (
              <motion.button
                key={r.role}
                variants={item}
                whileHover={{ y: -6, boxShadow: `0 12px 40px 0 rgba(31,38,135,0.2), 0 0 40px ${r.glowColor}` }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(r.role)}
                className="glass-card p-8 text-left transition-all"
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
