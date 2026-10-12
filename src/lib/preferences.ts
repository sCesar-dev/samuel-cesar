export type Theme = 'light' | 'dark';
export type Locale = 'pt-BR' | 'en-US';

export const THEMES: readonly Theme[] = ['light', 'dark'] as const;
export const LOCALES: readonly Locale[] = ['pt-BR', 'en-US'] as const;

export const STORAGE_KEY_THEME = 'scesar_theme';
export const STORAGE_KEY_LOCALE = 'scesar_locale';

export const DEFAULT_THEME: Theme = 'dark';
export const DEFAULT_LOCALE: Locale = 'pt-BR';

/**
 * Safely accesses localStorage without throwing errors in restricted environments.
 */
export function safeGetStorage(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Safely writes to localStorage without throwing errors in restricted environments.
 */
export function safeSetStorage(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Graceful fallback for blocked or full storage
  }
}

/**
 * Resolves the initial theme based on:
 * 1. Valid stored choice
 * 2. System preference (prefers-color-scheme)
 * 3. Default fallback (dark)
 */
export function resolveTheme(explicitValue?: string | null): Theme {
  if (explicitValue === 'light' || explicitValue === 'dark') {
    return explicitValue;
  }

  const stored = safeGetStorage(STORAGE_KEY_THEME);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }

  return DEFAULT_THEME;
}

/**
 * Resolves the initial locale based on:
 * 1. Valid stored choice
 * 2. URL search parameter (?lang=)
 * 3. navigator.languages (pt* -> pt-BR, en* -> en-US)
 * 4. Default fallback (pt-BR)
 */
export function resolveLocale(explicitValue?: string | null): Locale {
  if (explicitValue === 'pt-BR' || explicitValue === 'en-US') {
    return explicitValue;
  }

  const stored = safeGetStorage(STORAGE_KEY_LOCALE);
  if (stored === 'pt-BR' || stored === 'en-US') {
    return stored;
  }

  if (typeof window !== 'undefined') {
    // Check URL query param if present
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang');
      if (urlLang === 'pt' || urlLang === 'pt-BR') return 'pt-BR';
      if (urlLang === 'en' || urlLang === 'en-US') return 'en-US';
    } catch {
      // Ignore URL parsing errors
    }

    // Check navigator.languages
    const langs = window.navigator.languages || [window.navigator.language || ''];
    for (const lang of langs) {
      const normalized = (lang || '').toLowerCase();
      if (normalized.startsWith('pt')) return 'pt-BR';
      if (normalized.startsWith('en')) return 'en-US';
    }
  }

  return DEFAULT_LOCALE;
}

/**
 * Applies the given theme to the document and updates theme-color meta tag.
 */
export function applyTheme(theme: Theme, persist = true): void {
  if (typeof document === 'undefined') return;

  const validTheme: Theme = (theme === 'light' || theme === 'dark') ? theme : DEFAULT_THEME;
  const root = document.documentElement;
  
  root.setAttribute('data-theme', validTheme);
  root.style.colorScheme = validTheme;

  // Update theme-color meta tag
  let metaTheme = document.querySelector('meta[name="theme-color"]');
  if (!metaTheme) {
    metaTheme = document.createElement('meta');
    metaTheme.setAttribute('name', 'theme-color');
    document.head.appendChild(metaTheme);
  }
  metaTheme.setAttribute('content', validTheme === 'light' ? '#f8fafc' : '#09090b');

  if (persist) {
    safeSetStorage(STORAGE_KEY_THEME, validTheme);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('scesar-theme-change', { detail: { theme: validTheme } }));
  }
}

/**
 * Applies the given locale to the document and dispatches change event.
 */
export function applyLocale(locale: Locale, persist = true): void {
  if (typeof document === 'undefined') return;

  const validLocale: Locale = (locale === 'pt-BR' || locale === 'en-US') ? locale : DEFAULT_LOCALE;
  const root = document.documentElement;

  root.setAttribute('lang', validLocale);
  root.setAttribute('data-locale', validLocale);

  if (persist) {
    safeSetStorage(STORAGE_KEY_LOCALE, validLocale);
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('scesar-locale-change', { detail: { locale: validLocale } }));
  }
}

/**
 * Sets up OS media query listener when no explicit theme is saved.
 */
export function listenToSystemThemeChanges(): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return () => {};
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const listener = (e: MediaQueryListEvent) => {
    // Only follow OS if user hasn't explicitly set a preference
    const stored = safeGetStorage(STORAGE_KEY_THEME);
    if (!stored || (stored !== 'light' && stored !== 'dark')) {
      applyTheme(e.matches ? 'dark' : 'light', false);
    }
  };

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  } else if (typeof (mediaQuery as any).addListener === 'function') {
    (mediaQuery as any).addListener(listener);
    return () => (mediaQuery as any).removeListener(listener);
  }

  return () => {};
}
