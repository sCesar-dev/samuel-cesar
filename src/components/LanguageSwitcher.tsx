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
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-sans transition-colors duration-200 cursor-pointer min-h-[40px] min-w-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant border ${
            locale === 'pt-BR'
              ? 'bg-dominant-soft text-dominant-ink border-dominant-edge font-semibold'
              : 'bg-control text-ink-tertiary hover:text-ink border-edge hover:border-edge-strong'
          }`}
        >
          <span>Português (Brasil)</span>
          {locale === 'pt-BR' && <span className="text-xs font-semibold text-dominant-ink">Ativo</span>}
        </button>

        <button
          type="button"
          lang="en-US"
          onClick={() => setLocale('en-US')}
          aria-pressed={locale === 'en-US'}
          aria-label={t.locale.switchEn}
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-sans transition-colors duration-200 cursor-pointer min-h-[40px] min-w-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant border ${
            locale === 'en-US'
              ? 'bg-dominant-soft text-dominant-ink border-dominant-edge font-semibold'
              : 'bg-control text-ink-tertiary hover:text-ink border-edge hover:border-edge-strong'
          }`}
        >
          <span>English (US)</span>
          {locale === 'en-US' && <span className="text-xs font-semibold text-dominant-ink">Active</span>}
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`inline-flex items-center p-0.5 rounded-lg bg-control border border-edge ${className}`}
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
        className={`px-2 py-1 rounded-md text-[13px] font-sans font-semibold transition-colors duration-150 cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant ${
          locale === 'pt-BR'
            ? 'bg-dominant-soft text-dominant-ink'
            : 'text-ink-tertiary hover:text-ink'
        }`}
      >
        PT
      </button>

      <span className="text-edge-strong text-xs px-0.5 select-none" aria-hidden="true">|</span>

      <button
        type="button"
        lang="en-US"
        onClick={() => setLocale('en-US')}
        aria-pressed={locale === 'en-US'}
        aria-label={`EN - ${t.locale.switchEn}`}
        title="English (US)"
        className={`px-2 py-1 rounded-md text-[13px] font-sans font-semibold transition-colors duration-150 cursor-pointer min-h-[32px] min-w-[32px] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant ${
          locale === 'en-US'
            ? 'bg-dominant-soft text-dominant-ink'
            : 'text-ink-tertiary hover:text-ink'
        }`}
      >
        EN
      </button>
    </div>
  );
}
