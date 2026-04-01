/// <reference types="vite/client" />

interface Window {
  openDialogueLabConfig?: {
    deepseekProxyUrl?: string;
    deepseekProxyEnabled?: boolean;
  };
}

interface ImportMetaEnv {
  readonly VITE_DEEPSEEK_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
