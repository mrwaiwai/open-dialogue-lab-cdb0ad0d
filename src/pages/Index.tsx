import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatingShapes from '@/components/FloatingShapes';
import { canUseDeepSeekSupervisor } from '@/lib/aiSupervisor';
import { useGameStore } from '@/store/gameStore';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
};

const features = [
  { icon: '💬', title: '多輪 Chat 互動', desc: '每題 3 輪來回練習回應' },
  { icon: '🎭', title: '60+ 真實場景', desc: '案主狀態、背景、現場壓力更完整' },
  { icon: '📊', title: '完結分析', desc: '回顧回應風格、修復能力與改善方向' },
];

export default function Index() {
  const navigate = useNavigate();
  const supervisorMode = useGameStore((state) => state.supervisorMode);
  const deepseekApiKey = useGameStore((state) => state.deepseekApiKey);
  const canStart = supervisorMode === 'local' || canUseDeepSeekSupervisor(deepseekApiKey);

  return (
    <div className="gradient-bg relative overflow-hidden">
      <FloatingShapes />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="max-w-3xl w-full text-center"
        >
          <motion.div variants={fadeUp} className="text-6xl mb-4">💬</motion.div>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            開放式回應 Chat Lab
          </motion.h1>

          <motion.div variants={fadeUp} className="glass-card p-8 mb-8">
            <p className="text-xl font-medium mb-3">
              透過 chat box 對話訓練，提升與孩子溝通的技巧
            </p>
            <p className="text-muted-foreground">
              用真實互動場景做 3 輪對話訓練，完成後即睇對話分析、修復節奏與個人化建議
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-8 flex flex-col items-center gap-3">
            {!canStart && (
              <p className="text-sm text-amber-800">目前尚未讀取到 DeepSeek API key，所以暫時未能開始 AI 督導訓練。</p>
            )}
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {features.map((f) => (
              <div key={f.title} className="glass-card glass-card-hover p-6 text-center cursor-default">
                <div className="text-3xl mb-2">{f.icon}</div>
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <button
              onClick={() => navigate('/role')}
              disabled={!canStart}
              className="glass-button px-10 py-4 text-lg font-bold shadow-glass hover:shadow-glass-hover animate-glow"
              style={{
                background: 'linear-gradient(135deg, hsl(211 100% 50% / 0.9), hsl(270 80% 60% / 0.9))',
                color: 'white',
                borderRadius: '1rem',
                opacity: canStart ? 1 : 0.6,
              }}
            >
              開始進行開放式回應訓練
            </button>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-8 text-sm text-muted-foreground">
            適合教師、家長、運動與遊戲治療教練
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
