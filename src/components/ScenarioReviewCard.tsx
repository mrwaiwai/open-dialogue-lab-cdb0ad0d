import { ChevronDown } from 'lucide-react';
import type { Answer } from '@/types/game';

const typeLabels = {
  open: '開放式',
  'semi-open': '半開放式',
  judgmental: '判斷式',
  closed: '封閉式',
} as const;

interface ScenarioReviewCardProps {
  answer: Answer;
}

export default function ScenarioReviewCard({ answer }: ScenarioReviewCardProps) {
  return (
    <details className="group glass-card overflow-hidden">
      <summary className="flex cursor-pointer list-none flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-muted-foreground">{answer.category}</span>
            <span className="rounded-full bg-white/55 px-3 py-1 text-xs font-medium text-muted-foreground">{answer.turnCount} 輪對話</span>
          </div>
          <h4 className="mt-3 text-lg font-semibold leading-snug">{answer.scenarioTitle}</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{answer.feedback.summary}</p>
        </div>

        <div className="flex items-center gap-3 self-start sm:shrink-0">
          <div className="rounded-[1.15rem] bg-white/80 px-4 py-3 text-right">
            <p className="text-sm font-semibold">{typeLabels[answer.type]}</p>
            <p className="text-xs text-muted-foreground">{answer.turnCount} 輪 · {answer.score}/10 分</p>
          </div>
          <div className="rounded-full bg-white/70 p-2 text-muted-foreground transition duration-300 group-open:rotate-180">
            <ChevronDown size={18} />
          </div>
        </div>
      </summary>

      <div className="border-t border-white/35 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <div className="grid gap-3 xl:grid-cols-[minmax(0,1.08fr)_minmax(280px,0.92fr)]">
          <div className="nested-panel p-4">
            <p className="section-kicker mb-3">場景背景回看</p>
            <div className="grid gap-3 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">當下狀態</p>
                <div className="mt-2 space-y-2 text-sm leading-relaxed">
                  {answer.caseBrief.presentingState.map((item) => (
                    <div key={item} className="rounded-xl bg-white/80 px-3 py-3">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">你已知的背景</p>
                  <div className="mt-2 space-y-2 text-sm leading-relaxed">
                    {answer.caseBrief.backgroundClues.map((item) => (
                      <div key={item} className="rounded-xl bg-white/80 px-3 py-3">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-white/80 px-3 py-3 text-sm leading-relaxed">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">隱藏需要</p>
                  <p className="mt-2">{answer.caseBrief.hiddenNeed}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="nested-panel p-4">
            <p className="section-kicker mb-3">最後建議回應</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{answer.feedback.nextStep}</p>
            <div className="mt-3 rounded-xl bg-white/80 px-3 py-3 text-sm leading-relaxed">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">最後現場反應</p>
              <p className="mt-2">{answer.childReactionEmoji} {answer.childReaction}</p>
            </div>
            <div className="mt-3 rounded-xl bg-slate-900 px-3 py-3 text-sm leading-relaxed text-white">
              「{answer.feedback.suggestedResponse}」
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {answer.turnAnalyses.map((turn) => (
            <div key={turn.turn} className="nested-panel p-4">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">第 {turn.turn} 輪</p>
                  <p className="mt-1 text-sm font-semibold">
                    {typeLabels[turn.type]} · {turn.score}/10
                  </p>
                </div>
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-muted-foreground">
                  {turn.childReactionEmoji} 對方接續
                </span>
              </div>

              <div className="mb-3 rounded-xl bg-white/80 px-3 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">你的回應</p>
                <p className="mt-2 text-sm leading-relaxed">{turn.responseText}</p>
              </div>

              <div className="space-y-2">
                {turn.sentenceAnalyses.map((sentence) => (
                  <div key={`${turn.turn}-${sentence.index}`} className="rounded-xl bg-white/82 px-3 py-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">第 {sentence.index} 句</p>
                    <p className="mt-2 text-sm font-medium leading-relaxed">{sentence.sentence}</p>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">{sentence.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{sentence.feedback}</p>
                    <div className="mt-2 rounded-lg bg-sky-50/80 px-3 py-2 text-sm leading-relaxed text-sky-950">
                      可改成：{sentence.rewrite}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-xl bg-slate-100 px-3 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">對方接續</p>
                <p className="mt-2 text-sm leading-relaxed">{turn.followUpPrompt}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 xl:grid-cols-2">
          <div className="nested-panel p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">這題亮點</p>
            <ul className="space-y-2 text-sm leading-relaxed">
              {answer.feedback.strengths.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="nested-panel p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">下次要留意</p>
            <ul className="space-y-2 text-sm leading-relaxed">
              {answer.feedback.risks.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </details>
  );
}
