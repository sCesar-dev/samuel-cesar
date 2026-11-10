import React, { useState, useEffect, useRef } from 'react';
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef(false);

  const prefix = isHome ? '' : `${baseUrl}/`;

  const closeDrawer = (restoreFocus: boolean) => {
    restoreFocusRef.current = restoreFocus;
    setMobileMenuOpen(false);
  };

  // Focus management, Escape key, Focus Trap, and Body scroll lock for mobile drawer
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      if (restoreFocusRef.current) {
        restoreFocusRef.current = false;
        menuButtonRef.current?.focus();
      }
      return;
    }

    document.body.style.overflow = 'hidden';

    const getFocusableElements = (): HTMLElement[] => {
      const drawerEls = drawerRef.current
        ? Array.from(drawerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
        : [];
      return menuButtonRef.current ? [menuButtonRef.current, ...drawerEls] : drawerEls;
    };

    // Move initial keyboard focus to first link inside the drawer when opened
    const initialFrame = requestAnimationFrame(() => {
      const firstLink = drawerRef.current?.querySelector<HTMLElement>('a[href]');
      firstLink?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDrawer(true);
        return;
      }

      if (e.key === 'Tab') {
        const focusables = getFocusableElements();
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 bg-header-bg backdrop-blur-md border-b border-header-edge z-50 flex items-center justify-center transition-colors">
      <div className="w-full max-w-6xl px-4 md:px-8 flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <a 
          href={isHome ? "#home" : `${baseUrl}/`} 
          aria-label={`sCesar.dev - ${t.nav.logoAria}`}
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant rounded-lg p-1 shrink-0"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-dominant group-hover:scale-125 transition-transform duration-300" aria-hidden="true"></span>
          <span className="text-ink text-base md:text-lg font-extrabold font-display group-hover:text-dominant-ink transition-colors">
            sCesar<span className="text-dominant-ink font-mono text-sm">.dev</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1 p-1 rounded-xl bg-surface border border-edge" aria-label={t.nav.menuAria}>
          <a href={`${prefix}#home`} className="px-3.5 py-1.5 text-ink-secondary text-[13px] font-medium transition-colors rounded-lg hover:text-ink hover:bg-control-hover focus:outline-none focus-visible:ring-1 focus-visible:ring-dominant">
            {t.nav.home}
          </a>
          <a href={`${prefix}#projects`} className="px-3.5 py-1.5 text-ink-secondary text-[13px] font-medium transition-colors rounded-lg hover:text-dominant-ink hover:bg-dominant-soft focus:outline-none focus-visible:ring-1 focus-visible:ring-dominant">
            {t.nav.projects}
          </a>
          <a href={`${prefix}#about`} className="px-3.5 py-1.5 text-ink-secondary text-[13px] font-medium transition-colors rounded-lg hover:text-ink hover:bg-control-hover focus:outline-none focus-visible:ring-1 focus-visible:ring-dominant">
            {t.nav.about}
          </a>
          <a href={`${prefix}#curriculum`} className="px-3.5 py-1.5 text-ink-secondary text-[13px] font-medium transition-colors rounded-lg hover:text-ink hover:bg-control-hover focus:outline-none focus-visible:ring-1 focus-visible:ring-dominant">
            {t.nav.curriculum}
          </a>
          <a href={`${prefix}#contact`} className="px-3.5 py-1.5 text-accent-ink text-[13px] font-semibold transition-colors rounded-lg hover:bg-accent-soft focus:outline-none focus-visible:ring-1 focus-visible:ring-accent">
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
            className="px-3.5 py-1.5 min-h-[36px] inline-flex items-center rounded-lg bg-dominant-soft hover:bg-dominant-edge/30 border border-dominant-edge text-dominant-ink text-[13px] font-sans font-semibold transition-colors transition-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
          >
            {t.nav.linkedInText}
          </a>
        </div>

        {/* Mobile Header Controls: Language + Theme + Hamburger */}
        <div className="flex md:hidden items-center gap-1.5 shrink-0">
          <LanguageSwitcher variant="compact" />
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => (mobileMenuOpen ? closeDrawer(true) : setMobileMenuOpen(true))}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t.nav.menuClose : t.nav.menuOpen}
            aria-controls="mobile-menu-drawer"
            className="p-2 rounded-lg text-ink-secondary hover:text-ink bg-control hover:bg-control-hover border border-edge focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center transition-colors"
          >
            {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>

      </div>
    </header>

      {/* Mobile Drawer rendered outside backdrop-blur header so fixed inset-0 covers full viewport */}
      {mobileMenuOpen && (
        <div 
          ref={drawerRef}
          id="mobile-menu-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menuAria}
          className="fixed inset-0 top-16 z-40 bg-canvas md:hidden flex flex-col px-6 pt-4 pb-8 overflow-y-auto"
        >
          <nav className="flex flex-col gap-1.5 pb-6 border-b border-edge text-base font-medium">
            <a 
              href={`${prefix}#home`} 
              onClick={() => closeDrawer(false)}
              className="px-4 py-3 rounded-lg text-ink hover:bg-control-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
            >
              {t.nav.home}
            </a>
            <a 
              href={`${prefix}#projects`} 
              onClick={() => closeDrawer(false)}
              className="px-4 py-3 rounded-lg text-ink hover:bg-dominant-soft hover:text-dominant-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
            >
              {t.nav.projects}
            </a>
            <a 
              href={`${prefix}#about`} 
              onClick={() => closeDrawer(false)}
              className="px-4 py-3 rounded-lg text-ink hover:bg-control-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
            >
              {t.nav.about}
            </a>
            <a 
              href={`${prefix}#curriculum`} 
              onClick={() => closeDrawer(false)}
              className="px-4 py-3 rounded-lg text-ink hover:bg-control-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
            >
              {t.nav.curriculum}
            </a>
            <a 
              href={`${prefix}#contact`} 
              onClick={() => closeDrawer(false)}
              className="px-4 py-3 rounded-lg text-accent-ink font-semibold hover:bg-accent-soft transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Preferences & Actions in Mobile Menu */}
          <div className="flex flex-col gap-4 pt-6">
            <div>
              <span className="text-[13px] font-sans font-medium text-ink-tertiary block mb-2">
                {t.locale.language}
              </span>
              <LanguageSwitcher variant="full" />
            </div>

            <div>
              <span className="text-[13px] font-sans font-medium text-ink-tertiary block mb-2">
                {t.theme.label}
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
                className="w-full py-3 min-h-[44px] rounded-lg bg-dominant-soft hover:bg-dominant-edge/30 border border-dominant-edge text-dominant-ink text-sm font-sans font-semibold flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant"
              >
                {t.nav.linkedInText}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
