import React from 'react';
import { Home } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

interface NotFoundContentProps {
  baseUrl: string;
}

export default function NotFoundContent({ baseUrl }: NotFoundContentProps) {
  const { t } = useI18n();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-ink mb-4 font-display">
        <span className="text-dominant-ink font-mono block text-3xl sm:text-4xl mb-2 font-bold tracking-normal">{t.notFound.statusCode}</span>
        {t.notFound.title}
      </h1>

      <p className="text-base sm:text-lg text-ink-secondary max-w-md mx-auto mb-8 leading-relaxed">
        {t.notFound.description}
      </p>

      <a
        href={`${baseUrl}/`}
        className="inline-flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-lg bg-dominant hover:bg-dominant-hover text-on-dominant font-sans font-semibold text-sm transition-colors transition-transform duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant cursor-pointer"
      >
        <Home size={16} aria-hidden="true" />
        <span>{t.notFound.backHome}</span>
      </a>
    </div>
  );
}
