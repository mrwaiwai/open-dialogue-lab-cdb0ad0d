import { Bot, BrainCircuit, KeyRound, Settings2 } from 'lucide-react';
import { useMemo } from 'react';
import { useGameStore } from '@/store/gameStore';
import { canUseDeepSeekSupervisor, getRuntimeDeepSeekConfig, getSupervisorModeLabel } from '@/lib/aiSupervisor';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { SupervisorMode, SupervisorModel } from '@/types/game';

const modeCards: { mode: SupervisorMode; title: string; desc: string; icon: typeof Settings2 }[] = [
  {
    mode: 'local',
    title: '基本分析模式',
    desc: '速度快，離線可用，但回饋會較模板化。',
    icon: Settings2,
  },
  {
    mode: 'deepseek',
    title: '互動分析模式',
    desc: '回應會更自然，逐句拆解與總結也會更貼近真實互動。',
    icon: BrainCircuit,
  },
];

const models: { model: SupervisorModel; title: string; desc: string }[] = [
  { model: 'deepseek-v4-flash', title: 'DeepSeek V4 Flash', desc: '官方新一代快速模型，回應較快，亦係目前 app 的預設分析模型。' },
];

export default function SupervisorSettingsDialog() {
  const supervisorMode = useGameStore((state) => state.supervisorMode);
  const deepseekApiKey = useGameStore((state) => state.deepseekApiKey);
  const deepseekModel = useGameStore((state) => state.deepseekModel);
  const setSupervisorMode = useGameStore((state) => state.setSupervisorMode);
  const setDeepseekApiKey = useGameStore((state) => state.setDeepseekApiKey);
  const setDeepseekModel = useGameStore((state) => state.setDeepseekModel);

  const runtime = useMemo(() => getRuntimeDeepSeekConfig(), []);
  const hasServerProxy = Boolean(runtime.deepseekProxyEnabled && runtime.deepseekProxyUrl);
  const aiReady = canUseDeepSeekSupervisor(deepseekApiKey);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="glass-pill inline-flex items-center gap-2 text-xs font-semibold">
          <Bot size={14} />
          督導設定
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl rounded-[1.75rem] border-white/45 bg-white/92 p-0 shadow-[0_28px_80px_rgba(15,23,42,0.22)]">
        <div className="space-y-6 p-6 sm:p-7">
          <DialogHeader className="space-y-3 text-left">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-800">
              <BrainCircuit size={14} />
              {getSupervisorModeLabel(supervisorMode, deepseekModel)}
            </div>
            <DialogTitle className="text-2xl">設定督導模式</DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              你而家可以繼續用基本分析，或者切去更自然的互動分析模式，讓個案回應、逐句分析同教學更貼近真人。
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 sm:grid-cols-2">
            {modeCards.map((item) => {
              const Icon = item.icon;
              const isActive = supervisorMode === item.mode;

              return (
                <button
                  key={item.mode}
                  onClick={() => setSupervisorMode(item.mode)}
                  className={cn(
                    'rounded-[1.4rem] border px-4 py-4 text-left transition',
                    isActive
                      ? 'border-sky-400/50 bg-sky-500/10 shadow-[0_10px_28px_rgba(14,165,233,0.14)]'
                      : 'border-white/50 bg-white/70 hover:bg-white',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-white/85 p-2 text-slate-700">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {supervisorMode === 'deepseek' && (
            <div className="space-y-4">
              <div className="nested-panel p-4 text-sm leading-relaxed">
                {hasServerProxy ? (
                  <p>已偵測到網站伺服器代理。這個頁面可以直接經網站服務處理分析請求，唔使把服務金鑰放入瀏覽器。</p>
                ) : (
                  <p>目前會由瀏覽器直接發送分析請求。服務金鑰只會儲存在你而家這個瀏覽器，方便測試，但正式公開部署仍建議改成 server proxy。</p>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {models.map((item) => {
                  const isActive = deepseekModel === item.model;

                  return (
                    <button
                      key={item.model}
                      onClick={() => setDeepseekModel(item.model)}
                      className={cn(
                        'rounded-[1.2rem] border px-4 py-4 text-left transition',
                        isActive ? 'border-emerald-400/55 bg-emerald-500/10' : 'border-white/50 bg-white/70 hover:bg-white',
                      )}
                    >
                      <p className="font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                    </button>
                  );
                })}
              </div>

              {!hasServerProxy && (
                <div className="space-y-2">
                  <label className="inline-flex items-center gap-2 text-sm font-semibold">
                    <KeyRound size={15} />
                    服務金鑰
                  </label>
                  <Input
                    type="password"
                    placeholder="sk-..."
                    value={deepseekApiKey}
                    onChange={(event) => setDeepseekApiKey(event.target.value)}
                    className="h-11 rounded-[1rem] border-white/55 bg-white/80"
                  />
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    如你只係本機試用，直接貼上服務金鑰就可以。之後開始訓練時，系統會用分析服務做逐句拆解與回應整理。
                  </p>
                </div>
              )}

              <div className="rounded-[1.2rem] bg-slate-900 px-4 py-3 text-sm text-white">
                {aiReady ? '互動分析已經可用。開始練習後，逐句分析、個案回應同最後總結都會一併處理。' : '請先輸入服務金鑰，之後先可以啟用互動分析。'}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
