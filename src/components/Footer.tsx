import React from 'react';
import { useI18n } from '../i18n/useI18n';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="w-full border-t border-white/10 bg-[#09090b]/90 backdrop-blur-lg py-8 text-center text-xs text-zinc-500 font-mono transition-colors">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-zinc-400 text-left">
          <span>{t.footer.bioNotice}</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-400">
          <a href="https://github.com/sCesar-dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <span className="text-zinc-600 select-none">•</span>
          <a href="https://www.linkedin.com/in/s-cesar/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
          <span className="text-zinc-600 select-none">•</span>
          <a href="mailto:samueljc003@gmail.com" className="hover:text-emerald-400 transition-colors">samueljc003@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
