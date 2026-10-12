import React from 'react';

import { useI18n } from '../i18n/useI18n';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export default function LanguageSwitcher({ className = '', variant = 'compact' }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n();

  if (variant === 'full') {
    return (
      <div className={`flex flex-col gap-2 w-full ${className}`} role="group" aria-label={t.locale.language}>
        <button
          type="button"
          lang="pt-BR"
          onClick={() => setLocale('pt-BR')}
          aria-pressed={locale === 'pt-BR'}
          aria-label={t.locale.switchPt}
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer min-h-[36px] min-w-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 border ${
            locale === 'pt-BR'
              ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/40 font-bold'
              : 'bg-white/[0.03] text-zinc-400 hover:text-white border-white/10 hover:border-white/20'
          }`}
        >
          <span>Português (Brasil)</span>
          {locale === 'pt-BR' && <span className="text-[11px] font-semibold text-cyan-400 uppercase">Ativo</span>}
        </button>

        <button
          type="button"
          lang="en-US"
          onClick={() => setLocale('en-US')}
          aria-pressed={locale === 'en-US'}
          aria-label={t.locale.switchEn}
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer min-h-[36px] min-w-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 border ${
            locale === 'en-US'
              ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/40 font-bold'
              : 'bg-white/[0.03] text-zinc-400 hover:text-white border-white/10 hover:border-white/20'
          }`}
        >
          <span>English (US)</span>
          {locale === 'en-US' && <span className="text-[11px] font-semibold text-cyan-400 uppercase">Active</span>}
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`inline-flex items-center p-0.5 rounded-lg bg-white/[0.04] border border-white/10 ${className}`}
      role="group" 
      aria-label={t.locale.language}
    >
      <button
        type="button"
        lang="pt-BR"
        onClick={() => setLocale('pt-BR')}
        aria-pressed={locale === 'pt-BR'}
        aria-label={`PT - ${t.locale.switchPt}`}
        title="Português (Brasil)"
        className={`px-2 py-1 rounded-md text-xs font-mono font-semibold transition-all duration-150 cursor-pointer min-h-[30px] min-w-[30px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
          locale === 'pt-BR'
            ? 'bg-cyan-500/20 text-cyan-400 shadow-sm'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        PT
      </button>

      <span className="text-zinc-600 text-xs px-0.5 select-none" aria-hidden="true">|</span>

      <button
        type="button"
        lang="en-US"
        onClick={() => setLocale('en-US')}
        aria-pressed={locale === 'en-US'}
        aria-label={`EN - ${t.locale.switchEn}`}
        title="English (US)"
        className={`px-2 py-1 rounded-md text-xs font-mono font-semibold transition-all duration-150 cursor-pointer min-h-[30px] min-w-[30px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
          locale === 'en-US'
            ? 'bg-cyan-500/20 text-cyan-400 shadow-sm'
            : 'text-zinc-400 hover:text-zinc-200'
        }`}
      >
        EN
      </button>
    </div>
  );
}
