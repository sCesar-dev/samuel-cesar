import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { useI18n } from '../i18n/useI18n';

interface HeaderNavProps {
  baseUrl: string;
  isHome: boolean;
}

export default function HeaderNav({ baseUrl, isHome }: HeaderNavProps) {
  const { t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const prefix = isHome ? '' : `${baseUrl}/`;

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full h-16 md:h-18 bg-[#09090b]/85 backdrop-blur-xl border-b border-white/10 z-50 flex items-center justify-center transition-colors">
      <div className="w-full max-w-6xl px-4 md:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href={isHome ? "#home" : `${baseUrl}/`} 
          aria-label={`sCesar.dev - ${t.nav.logoAria}`}
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg p-1"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform duration-300" aria-hidden="true"></span>
          <span className="text-white text-base md:text-lg font-extrabold tracking-tight font-display group-hover:text-cyan-400 transition-colors">
            sCesar<span className="text-cyan-400 font-mono text-sm">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1 p-1 rounded-xl glass-panel" aria-label={t.nav.menuAria}>
          <a href={`${prefix}#home`} className="px-3.5 py-1.5 text-zinc-300 text-xs font-medium transition-all rounded-lg hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500">
            {t.nav.home}
          </a>
          <a href={`${prefix}#projects`} className="px-3.5 py-1.5 text-zinc-300 text-xs font-medium transition-all rounded-lg hover:text-cyan-400 hover:bg-cyan-400/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500">
            {t.nav.projects}
          </a>
          <a href={`${prefix}#about`} className="px-3.5 py-1.5 text-zinc-300 text-xs font-medium transition-all rounded-lg hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500">
            {t.nav.about}
          </a>
          <a href={`${prefix}#curriculum`} className="px-3.5 py-1.5 text-zinc-300 text-xs font-medium transition-all rounded-lg hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500">
            {t.nav.curriculum}
          </a>
          <a href={`${prefix}#contact`} className="px-3.5 py-1.5 text-emerald-400 text-xs font-semibold transition-all rounded-lg hover:text-emerald-300 hover:bg-emerald-400/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500">
            {t.nav.contact}
          </a>
        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-2.5">
          <LanguageSwitcher variant="compact" />
          <ThemeToggle />
          <a 
            href="https://www.linkedin.com/in/s-cesar/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={t.nav.linkedInAria}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-semibold transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            {t.nav.linkedInText}
          </a>
        </div>

        {/* Mobile Header Controls: Theme + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t.nav.menuClose : t.nav.menuOpen}
            aria-controls="mobile-menu-drawer"
            className="p-2 rounded-lg text-zinc-300 hover:text-white bg-white/[0.04] border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          id="mobile-menu-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menuAria}
          className="fixed inset-0 top-16 z-40 bg-[#09090b]/95 backdrop-blur-2xl md:hidden flex flex-col p-6 overflow-y-auto border-b border-white/10"
        >
          <nav className="flex flex-col gap-2 pt-2 pb-6 border-b border-white/10 text-sm font-medium">
            <a 
              href={`${prefix}#home`} 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-zinc-200 hover:bg-white/10 active:bg-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              {t.nav.home}
            </a>
            <a 
              href={`${prefix}#projects`} 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-zinc-200 hover:bg-white/10 active:bg-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              {t.nav.projects}
            </a>
            <a 
              href={`${prefix}#about`} 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-zinc-200 hover:bg-white/10 active:bg-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              {t.nav.about}
            </a>
            <a 
              href={`${prefix}#curriculum`} 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-zinc-200 hover:bg-white/10 active:bg-white/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              {t.nav.curriculum}
            </a>
            <a 
              href={`${prefix}#contact`} 
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-3 rounded-lg text-emerald-400 font-semibold hover:bg-emerald-500/10 active:bg-emerald-500/15 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Preferences & Actions in Mobile Menu */}
          <div className="flex flex-col gap-4 pt-6">
            <div>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                {t.locale.language}
              </span>
              <LanguageSwitcher variant="full" />
            </div>

            <div>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                {t.theme.toggleLight.split(' ')[0]} / {t.theme.toggleDark.split(' ')[0]}
              </span>
              <div className="flex items-center gap-2">
                <ThemeToggle showLabel className="w-full justify-start px-3 py-2.5" />
              </div>
            </div>

            <div className="pt-2">
              <a 
                href="https://www.linkedin.com/in/s-cesar/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={t.nav.linkedInAria}
                className="w-full py-3 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-semibold flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                {t.nav.linkedInText}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
