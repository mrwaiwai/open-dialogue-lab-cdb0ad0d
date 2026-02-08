import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatingShapes from '@/components/FloatingShapes';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const } },
};

const features = [
  { icon: '🎯', title: '真實情境', desc: '基於日常互動設計' },
  { icon: '📊', title: '即時反饋', desc: '了解溝通效果' },
  { icon: '🏆', title: '個人化建議', desc: '獲得專屬改善方案' },
];

export default function Index() {
  const navigate = useNavigate();

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
            開放式回應學習遊戲
          </motion.h1>

          <motion.div variants={fadeUp} className="glass-card p-8 mb-8">
            <p className="text-xl font-medium mb-3">
              透過真實情境，提升與孩子溝通的技巧
            </p>
            <p className="text-muted-foreground">
              學習如何運用開放式回應，建立信任關係，促進有效對話
            </p>
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
              className="glass-button px-10 py-4 text-lg font-bold shadow-glass hover:shadow-glass-hover animate-glow"
              style={{
                background: 'linear-gradient(135deg, hsl(211 100% 50% / 0.9), hsl(270 80% 60% / 0.9))',
                color: 'white',
                borderRadius: '1rem',
              }}
            >
              開始學習
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
