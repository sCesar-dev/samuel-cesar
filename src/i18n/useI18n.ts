import { useState, useEffect, useCallback } from 'react';
import { 
  type Locale, 
  type Theme, 
  DEFAULT_LOCALE, 
  DEFAULT_THEME, 
  resolveLocale, 
  resolveTheme, 
  applyLocale, 
  applyTheme 
} from '../lib/preferences';
import { dictionaries, type TranslationSchema } from './translations';

export function useI18n() {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const initialLocale = resolveLocale();
    const initialTheme = resolveTheme();
    setLocaleState(initialLocale);
    setThemeState(initialTheme);

    const onLocaleChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ locale: Locale }>;
      if (customEvent.detail && customEvent.detail.locale) {
        setLocaleState(customEvent.detail.locale);
      }
    };

    const onThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ theme: Theme }>;
      if (customEvent.detail && customEvent.detail.theme) {
        setThemeState(customEvent.detail.theme);
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'scesar_locale' && (e.newValue === 'pt-BR' || e.newValue === 'en-US')) {
        setLocaleState(e.newValue);
      }
      if (e.key === 'scesar_theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setThemeState(e.newValue);
      }
    };

    window.addEventListener('scesar-locale-change', onLocaleChange);
    window.addEventListener('scesar-theme-change', onThemeChange);
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('scesar-locale-change', onLocaleChange);
      window.removeEventListener('scesar-theme-change', onThemeChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const changeLocale = useCallback((newLocale: Locale) => {
    applyLocale(newLocale);
    setLocaleState(newLocale);
  }, []);

  const changeTheme = useCallback((newTheme: Theme) => {
    applyTheme(newTheme);
    setThemeState(newTheme);
  }, []);

  const t: TranslationSchema = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];

  return {
    locale,
    theme,
    setLocale: changeLocale,
    setTheme: changeTheme,
    t,
    isMounted,
  };
}
