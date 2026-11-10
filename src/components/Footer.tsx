import React from 'react';
import { useI18n } from '../i18n/useI18n';

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="w-full border-t border-footer-edge bg-footer-bg py-8 text-center text-[13px] text-ink-tertiary font-sans transition-colors">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-ink-secondary text-left">
          <span>{t.footer.bioNotice}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 text-ink-secondary">
          <a href="https://github.com/sCesar-dev" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded">GitHub</a>
          <span className="text-edge-strong select-none" aria-hidden="true">•</span>
          <a href="https://www.linkedin.com/in/s-cesar/" target="_blank" rel="noopener noreferrer" className="hover:text-dominant-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded">LinkedIn</a>
          <span className="text-edge-strong select-none" aria-hidden="true">•</span>
          <a href="mailto:samueljc003@gmail.com" className="hover:text-accent-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded">samueljc003@gmail.com</a>
        </div>
      </div>
    </footer>
  );
}
