import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatingShapes from '@/components/FloatingShapes';
import { getSupervisorModeLabel, resolveSupervisorMode } from '@/lib/aiSupervisor';
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

const steps = [
  {
    number: '01',
    title: '選擇身份',
    desc: '先揀你想代入的身份，例如教師、家長或教練，之後系統會帶你進入相應場景。',
  },
  {
    number: '02',
    title: '選擇練習方式',
    desc: '你可以用隨機抽題快速開始，或者自選題目，集中練某一類情境。',
  },
  {
    number: '03',
    title: '完成三輪對話',
    desc: '每題會做 3 輪來回，你可以直接輸入回應，也可以用起手式幫自己暖機。',
  },
  {
    number: '04',
    title: '查看分析與建議',
    desc: '完成後會看到逐句拆解、整體亮點、風險位，以及可直接參考的示範回應。',
  },
];

const tips = [
  '第一輪先接情緒，不用急著講道理。',
  '第二輪多問一點，幫對方講得更具體。',
  '第三輪先整理需要，再慢慢帶去下一步。',
];

export default function Index() {
  const navigate = useNavigate();
  const supervisorMode = useGameStore((state) => state.supervisorMode);
  const deepseekApiKey = useGameStore((state) => state.deepseekApiKey);
  const activeSupervisorMode = resolveSupervisorMode(supervisorMode, deepseekApiKey);
  const isUsingFallbackMode = activeSupervisorMode !== supervisorMode;

  return (
    <div className="gradient-bg relative overflow-hidden">
      <FloatingShapes />
      <div className="relative z-10 min-h-screen px-4 py-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto flex w-full max-w-5xl flex-col gap-10"
        >
          <div className="text-center">
            <motion.div variants={fadeUp} className="mb-4 text-6xl">💬</motion.div>
            <motion.h1 variants={fadeUp} className="mb-6 text-4xl font-bold text-gradient md:text-5xl">
              開放式回應 Chat Lab
            </motion.h1>

            <motion.div variants={fadeUp} className="glass-card mx-auto mb-8 max-w-3xl p-8">
              <p className="mb-3 text-xl font-medium">
                透過 chat box 對話訓練，提升與孩子溝通的技巧
              </p>
              <p className="text-muted-foreground">
                用真實互動場景做 3 輪對話訓練，完成後即睇對話分析、修復節奏與個人化建議
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mb-8 flex flex-col items-center gap-3">
              {isUsingFallbackMode ? (
                <p className="max-w-2xl text-sm text-amber-800">
                  目前網站以 {getSupervisorModeLabel(activeSupervisorMode)} 運作，你仍然可以正常開始訓練；較進階的 AI 互動分析會在支援伺服器版本啟用。
                </p>
              ) : null}
            </motion.div>

            <motion.div variants={fadeUp} className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="glass-card glass-card-hover p-6 text-center cursor-default">
                  <div className="mb-2 text-3xl">{f.icon}</div>
                  <h3 className="mb-1 font-semibold">{f.title}</h3>
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
                開始進行開放式回應訓練
              </button>
            </motion.div>

            <motion.p variants={fadeUp} className="mt-8 text-sm text-muted-foreground">
              適合教師、家長、運動與遊戲治療教練
            </motion.p>
          </div>

          <motion.section variants={fadeUp} className="glass-card p-7 sm:p-8">
            <div className="mb-6 text-left">
              <p className="section-kicker">使用說明</p>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">第一次使用，可以照住這個流程開始</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                整個訓練設計成由淺入深，你不需要一開始就回得很完美。先完成一題，看看分析，再慢慢調整自己的節奏就可以。
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {steps.map((step) => (
                <div key={step.number} className="metric-panel px-5 py-5 text-left">
                  <p className="text-sm font-semibold tracking-[0.14em] text-sky-700">{step.number}</p>
                  <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
              <div className="nested-panel p-5 text-left">
                <p className="section-kicker">練習小貼士</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-700 md:text-base">
                  {tips.map((tip) => (
                    <li key={tip}>• {tip}</li>
                  ))}
                </ul>
              </div>

              <div className="nested-panel p-5 text-left">
                <p className="section-kicker">建議開始方式</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                  如果你第一次用，建議先揀 `5 題模式` 或者直接去 `自選題目`，集中練一兩個你最常遇到的情境。
                </p>
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
