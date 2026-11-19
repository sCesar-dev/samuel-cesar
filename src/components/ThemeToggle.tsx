import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useI18n } from '../i18n/useI18n';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const { theme, setTheme, t } = useI18n();

  const isDark = theme === 'dark';
  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const label = isDark ? t.theme.toggleLight : t.theme.toggleDark;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className={`min-w-[36px] min-h-[36px] p-2 rounded-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-dominant active:scale-95 text-ink-secondary hover:text-ink bg-control hover:bg-control-hover border border-edge ${className}`}
    >
      {isDark ? (
        <Sun size={17} className="text-amber-400 shrink-0" aria-hidden="true" />
      ) : (
        <Moon size={17} className="text-dominant-ink shrink-0" aria-hidden="true" />
      )}
      {showLabel && (
        <span className="text-[13px] font-sans font-medium">
          {isDark ? t.theme.darkLabel : t.theme.lightLabel}
        </span>
      )}
    </button>
  );
}
