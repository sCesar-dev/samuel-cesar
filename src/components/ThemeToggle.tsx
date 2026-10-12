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
      className={`min-w-[36px] min-h-[36px] p-2 rounded-lg inline-flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:scale-95 text-zinc-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 ${className}`}
    >
      {isDark ? (
        <Sun size={17} className="text-amber-400 shrink-0" aria-hidden="true" />
      ) : (
        <Moon size={17} className="text-cyan-600 shrink-0" aria-hidden="true" />
      )}
      {showLabel && (
        <span className="text-xs font-mono font-medium">
          {isDark ? t.theme.darkLabel : t.theme.lightLabel}
        </span>
      )}
    </button>
  );
}
