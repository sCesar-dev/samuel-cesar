import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

interface NotFoundContentProps {
  baseUrl: string;
}

export default function NotFoundContent({ baseUrl }: NotFoundContentProps) {
  const { t } = useI18n();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 font-display">
        <span className="text-cyan-400 font-mono block text-3xl sm:text-4xl mb-2 font-bold tracking-normal">{t.notFound.statusCode}</span>
        {t.notFound.title}
      </h1>

      <p className="text-base sm:text-lg text-zinc-300 max-w-md mx-auto mb-8 font-light leading-relaxed">
        {t.notFound.description}
      </p>

      <a
        href={`${baseUrl}/`}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
      >
        <Home size={15} aria-hidden="true" />
        <span>{t.notFound.backHome}</span>
      </a>
    </div>
  );
}
