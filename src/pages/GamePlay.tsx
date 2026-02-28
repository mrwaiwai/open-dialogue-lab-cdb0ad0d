import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useGameStore } from '@/store/gameStore';
import ReflectionModal from '@/components/ReflectionModal';
import type { Option } from '@/types/game';

const roleLabels = { teacher: '🎓 教師', parent: '🏠 家長', coach: '⚽ 教練' } as const;

const colorBorder: Record<string, string> = { red: 'border-option-red', orange: 'border-option-orange', yellow: 'border-option-yellow', green: 'border-option-green' };
const colorBg: Record<string, string> = { red: 'bg-option-red', orange: 'bg-option-orange', yellow: 'bg-option-yellow', green: 'bg-option-green' };
const scoreColors: Record<string, string> = { red: 'score-red', orange: 'score-orange', yellow: 'score-yellow', green: 'score-green' };

// Mulberry32 seeded PRNG for consistent yet well-distributed shuffles
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function shuffleOptions(options: Option[], seed: number): Option[] {
  const rng = mulberry32(seed);
  const shuffled = [...options];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function GamePlay() {
  const navigate = useNavigate();
  const { selectedRole, selectedMode, selectedScenarios, currentQuestionIndex, totalScore, answers, answerQuestion, nextQuestion } = useGameStore();
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [showReflection, setShowReflection] = useState(false);

  const scenario = selectedScenarios[currentQuestionIndex];
  
  // Randomize options order per scenario (stable per question)
  const shuffledOptions = useMemo(() => {
    if (!scenario) return [];
    return shuffleOptions(scenario.options, scenario.id * 1000 + currentQuestionIndex);
  }, [scenario, currentQuestionIndex]);

  if (!selectedRole || !selectedMode || selectedScenarios.length === 0) {
    navigate('/');
    return null;
  }

  if (!scenario) { navigate('/results'); return null; }

  const isAnswered = selectedOption !== null;
  const progress = ((currentQuestionIndex) / selectedMode) * 100;

  const handleSelect = (option: Option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    answerQuestion({
      scenarioId: scenario.id,
      selectedOptionId: option.id,
      score: option.score,
      type: option.type,
      category: scenario.category,
    });
  };

  const handleNext = () => {
    const nextIdx = currentQuestionIndex + 1;
    if (nextIdx >= selectedMode) {
      navigate('/results');
      return;
    }
    // Show reflection every 5 questions
    if (nextIdx % 5 === 0 && nextIdx < selectedMode) {
      setShowReflection(true);
    } else {
      setSelectedOption(null);
      nextQuestion();
    }
  };

  const handleReflectionClose = () => {
    setShowReflection(false);
    setSelectedOption(null);
    nextQuestion();
  };

  return (
    <div className="gradient-bg-subtle relative min-h-screen">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 glass-card px-4 py-3 flex items-center justify-between" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="p-1"><ArrowLeft size={20} /></button>
          <span className="glass-pill text-xs">{roleLabels[selectedRole]}</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="font-medium">{currentQuestionIndex + 1}/{selectedMode}</span>
          <span className="font-bold text-gradient">{totalScore} 分</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-muted">
        <motion.div
          className="h-full progress-gradient"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={scenario.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Scenario Card */}
            <div className="glass-card p-6 mb-6">
              <span className="glass-pill text-xs mb-3 inline-block">{scenario.category}</span>
              <h2 className="text-xl font-bold mb-3">📖 {scenario.title}</h2>
              <p className="leading-relaxed mb-4">{scenario.description}</p>
              <p className="text-sm text-muted-foreground italic">💭 背景環境：{scenario.context}</p>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {shuffledOptions.map((option, index) => {
                const isSelected = selectedOption?.id === option.id;
                const showDetails = isAnswered;
                return (
                  <motion.div
                    key={option.id}
                    layout
                    whileHover={!isAnswered ? { y: -2, boxShadow: '0 12px 40px 0 rgba(31,38,135,0.2)' } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  >
                    <button
                      onClick={() => handleSelect(option)}
                      disabled={isAnswered}
                      className={`glass-card w-full text-left p-5 transition-all ${
                        isAnswered && !isSelected ? 'opacity-50' : ''
                      } ${isAnswered && isSelected ? colorBorder[option.color] : ''} ${
                        !isAnswered ? 'cursor-pointer' : 'cursor-default'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="glass-pill text-xs font-bold shrink-0 mt-0.5">{String.fromCharCode(65 + index)}</span>
                        <p className="text-sm leading-relaxed">「{option.text.replace(/[「」]/g, '')}」</p>
                      </div>

                      {/* Expanded feedback */}
                      <AnimatePresence>
                        {showDetails && isSelected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
                              {/* Child Reaction */}
                              <div className={`${colorBg[option.color]} rounded-2xl p-4`}>
                                <p className="text-sm font-semibold mb-1">👶 小朋友的反應</p>
                                <p className="text-3xl mb-2">{option.childReactionEmoji}</p>
                                <p className="text-sm">{option.childReaction}</p>
                              </div>

                              {/* Explanation */}
                              <div>
                                <p className="text-sm font-semibold mb-2">📚 專業分析</p>
                                <span className={`glass-pill text-xs ${scoreColors[option.color]}`}>
                                  {option.responsePattern}
                                </span>
                                <p className="text-sm mt-2">{option.explanation}</p>
                                {option.explanationPoints.length > 0 && (
                                  <ul className="mt-2 space-y-1">
                                    {option.explanationPoints.map((pt, i) => (
                                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                                        <span>•</span> {pt}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>

                              {/* Score */}
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                                className={`inline-block glass-pill font-bold ${scoreColors[option.color]}`}
                              >
                                +{option.score} 分
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Show brief feedback for non-selected options */}
                      {showDetails && !isSelected && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-3 pt-3 border-t border-border/30">
                          <div className="flex items-center gap-2">
                            <span className={`text-lg`}>{option.childReactionEmoji}</span>
                            <span className={`glass-pill text-xs ${scoreColors[option.color]}`}>{option.responsePattern} · +{option.score} 分</span>
                          </div>
                        </motion.div>
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Next Button */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mt-8"
                >
                  <button
                    onClick={handleNext}
                    className="glass-button px-8 py-3 font-semibold shadow-glass hover:shadow-glass-hover"
                    style={{
                      background: 'linear-gradient(135deg, hsl(211 100% 50% / 0.9), hsl(270 80% 60% / 0.9))',
                      color: 'white',
                      borderRadius: '1rem',
                    }}
                  >
                    {currentQuestionIndex + 1 >= selectedMode ? '查看結果' : '下一題 →'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      <ReflectionModal
        isOpen={showReflection}
        onClose={handleReflectionClose}
        questionsDone={currentQuestionIndex + 1}
      />
    </div>
  );
}
