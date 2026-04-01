import type { ConversationMessage } from '@/types/game';
import { cn } from '@/lib/utils';

interface ConversationBubbleProps {
  message: ConversationMessage;
  expanded?: boolean;
}

function parseSentenceBreakdown(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
      const title = lines[0] ?? '';
      const insightLine = lines.find((line) => /^(亮點|問題|可再打開)：/.test(line)) ?? '';
      const rewriteLine = lines.find((line) => line.startsWith('可改成：')) ?? '';
      const insightLabel = insightLine.split('：')[0] ?? '';
      const insightText = insightLine.split('：').slice(1).join('：').trim();
      const rewrite = rewriteLine.replace(/^可改成：/, '').trim();

      return {
        title,
        insightLabel,
        insightText,
        rewrite,
        tone:
          insightLabel === '亮點'
            ? 'strength'
            : insightLabel === '問題'
              ? 'risk'
              : 'mixed',
      };
    });
}

function renderAnalysisContent(message: ConversationMessage, expanded: boolean) {
  const isCoachSummary = message.label === '教練即時分析';
  const isSentenceBreakdown = message.label === '逐句拆解';
  const isRewrite = message.label === '可改成咁講';

  if (isCoachSummary) {
    const [summary, hintLine] = message.text.split(/\n\s*\n/);

    return (
      <div className="space-y-3">
        <div className="analysis-card-summary">
          <p className="analysis-card-kicker">互動觀察</p>
          <p className="mt-2 text-base font-semibold leading-relaxed text-slate-900 md:text-[1.05rem]">{summary}</p>
        </div>
        <div className="analysis-card-hint">
          <p className="analysis-card-kicker">下一輪最值得做</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">{hintLine?.replace(/^這輪建議：/, '')}</p>
        </div>
      </div>
    );
  }

  if (isSentenceBreakdown) {
    const blocks = parseSentenceBreakdown(message.text);

    if (!expanded) {
      return (
        <div className="analysis-card-compact">
          <p className="analysis-card-kicker">逐句拆解已收起</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">
            系統已替你整理 {blocks.length} 句亮點與問題。勾選上方選項後，就會展開完整逐句分析與改寫建議。
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {blocks.map((block, index) => (
          <div
            key={`${message.id}-${index}`}
            className={cn(
              'analysis-sentence-card',
              block.tone === 'strength' && 'analysis-sentence-card-strength',
              block.tone === 'mixed' && 'analysis-sentence-card-mixed',
              block.tone === 'risk' && 'analysis-sentence-card-risk',
            )}
          >
            <p className="analysis-card-kicker">{block.title}</p>
            <p className="mt-2 text-base font-semibold leading-relaxed text-slate-900 md:text-[1.02rem]">{block.insightLabel}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-700 md:text-base">{block.insightText}</p>
            {block.rewrite ? (
              <div className="analysis-sentence-rewrite">
                <p className="analysis-card-kicker text-sky-800/80">可改成咁講</p>
                <p className="mt-2 text-sm leading-relaxed text-sky-950 md:text-base">{block.rewrite}</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  if (isRewrite) {
    return (
      <div className="analysis-card-rewrite">
        <p className="analysis-card-kicker">示範回應</p>
        <p className="mt-3 text-base font-semibold leading-relaxed text-slate-950 md:text-[1.08rem]">「{message.text}」</p>
      </div>
    );
  }

  return <p className="whitespace-pre-wrap text-sm leading-relaxed md:text-base">{message.text}</p>;
}

export default function ConversationBubble({ message, expanded = false }: ConversationBubbleProps) {
  const isUser = message.speaker === 'user';
  const isGuide = message.speaker === 'guide';
  const isAnalysis = message.speaker === 'analysis';
  const isScene = message.speaker === 'scene';
  const isCoachSummary = isAnalysis && message.label === '教練即時分析';
  const isSentenceBreakdown = isAnalysis && message.label === '逐句拆解';
  const isRewrite = isAnalysis && message.label === '可改成咁講';

  return (
    <div className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[94%] rounded-[1.45rem] border px-4 py-3.5 shadow-[0_10px_26px_rgba(15,23,42,0.08)] sm:max-w-[88%] lg:px-5 lg:py-4',
          isAnalysis ? 'w-full xl:max-w-[92%]' : 'xl:max-w-[78%]',
          isUser && 'chat-bubble-user border-transparent',
          isGuide && 'chat-bubble-guide',
          isAnalysis && 'chat-bubble-analysis',
          isScene && 'chat-bubble-scene',
          !isUser && !isGuide && !isAnalysis && !isScene && 'chat-bubble-child',
        )}
      >
        <p
          className={cn(
            'mb-2 text-[11px] font-semibold uppercase tracking-[0.16em]',
            isUser || isGuide ? 'text-white/70' : 'text-muted-foreground',
          )}
        >
          {message.label}
        </p>
        {isAnalysis ? (
          renderAnalysisContent(message, expanded)
        ) : (
          <p
            className={cn(
              'whitespace-pre-wrap text-[15px] leading-relaxed md:text-[1.03rem]',
              isUser || isGuide ? 'text-white' : 'text-foreground',
              isCoachSummary && 'text-slate-900',
              isSentenceBreakdown && 'text-slate-900',
              isRewrite && 'text-slate-900',
            )}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}
