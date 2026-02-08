import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import FloatingShapes from '@/components/FloatingShapes';

const roleLabels = { teacher: '🎓 教師', parent: '🏠 家長', coach: '⚽ 教練' } as const;

function getGradeEmoji(score: number, max: number) {
  const pct = score / max;
  if (max === 50) {
    if (pct >= 0.72) return '🌳';
    if (pct >= 0.42) return '🌿';
    return '🌱';
  }
  if (pct >= 0.91) return '💎';
  if (pct >= 0.76) return '🥇';
  if (pct >= 0.51) return '🥈';
  return '🥉';
}

export default function History() {
  const navigate = useNavigate();
  const { completedGames, clearHistory } = useGameStore();

  const totalGames = completedGames.length;
  const avgScore = totalGames ? Math.round(completedGames.reduce((sum, g) => sum + (g.score / g.maxScore) * 100, 0) / totalGames) : 0;
  const bestScore = totalGames ? Math.max(...completedGames.map((g) => Math.round((g.score / g.maxScore) * 100))) : 0;

  return (
    <div className="gradient-bg relative overflow-hidden">
      <FloatingShapes />
      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-8">
            <button onClick={() => navigate(-1)} className="glass-pill flex items-center gap-1 hover:shadow-glass">
              <ArrowLeft size={16} /> 返回
            </button>
            <span className="text-sm text-muted-foreground">我嘅學習歷程</span>
          </motion.div>

          <h2 className="text-3xl font-bold mb-6">📊 我嘅學習歷程</h2>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: '總完成次數', value: totalGames },
              { label: '平均分數', value: `${avgScore}%` },
              { label: '最高分數', value: `${bestScore}%` },
            ].map((s) => (
              <div key={s.label} className="glass-card p-4 text-center">
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* History List */}
          {totalGames === 0 ? (
            <div className="glass-card p-8 text-center">
              <p className="text-muted-foreground">暫時無歷史記錄</p>
              <button onClick={() => navigate('/')} className="mt-4 glass-button px-6 py-2 font-medium">
                開始第一次練習
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-8">
                {completedGames.map((g) => (
                  <div key={g.id} className="glass-card p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getGradeEmoji(g.score, g.maxScore)}</span>
                      <div>
                        <p className="font-medium">{roleLabels[g.role]} · {g.mode} 題</p>
                        <p className="text-xs text-muted-foreground">{new Date(g.date).toLocaleDateString('zh-HK')}</p>
                      </div>
                    </div>
                    <span className="font-bold">{g.score}/{g.maxScore}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <button
                  onClick={() => { if (confirm('確定清除所有歷史記錄？')) clearHistory(); }}
                  className="text-sm text-destructive underline"
                >
                  🗑️ 清除進度資料
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
