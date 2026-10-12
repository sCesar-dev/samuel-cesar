import test from 'node:test';
import assert from 'node:assert';
import {
  resolveTheme,
  resolveLocale,
  safeGetStorage,
  safeSetStorage,
  applyTheme,
  applyLocale,
  STORAGE_KEY_THEME,
  STORAGE_KEY_LOCALE,
  DEFAULT_THEME,
  DEFAULT_LOCALE,
  THEMES,
  LOCALES,
} from '../src/lib/preferences.ts';

// Mock localStorage and window for Node environment
class MockStorage {
  private store = new Map<string, string>();
  public throws = false;

  getItem(key: string): string | null {
    if (this.throws) throw new Error('Storage disabled');
    return this.store.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    if (this.throws) throw new Error('Storage quota exceeded');
    this.store.set(key, value);
  }
  removeItem(key: string): void {
    if (this.throws) throw new Error('Storage error');
    this.store.delete(key);
  }
  clear(): void {
    if (this.throws) throw new Error('Storage error');
    this.store.clear();
  }
}

const mockStorage = new MockStorage();

// Setup global mock environment
(global as any).window = {
  localStorage: mockStorage,
  matchMedia: (query: string) => ({
    matches: false,
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
  navigator: {
    languages: ['pt-BR', 'pt'],
    language: 'pt-BR',
  },
  location: {
    search: '',
  },
  dispatchEvent: () => true,
};

(global as any).document = {
  documentElement: {
    setAttribute: () => {},
    getAttribute: () => null,
    style: {},
  },
  querySelector: () => null,
  createElement: () => ({
    setAttribute: () => {},
  }),
  head: {
    appendChild: () => {},
  },
};

test('safeGetStorage and safeSetStorage handle normal access and throwing storage gracefully', () => {
  mockStorage.throws = false;
  mockStorage.clear();

  safeSetStorage('testKey', 'hello');
  assert.strictEqual(safeGetStorage('testKey'), 'hello');

  // Throwing storage simulation (private mode / restricted cookies)
  mockStorage.throws = true;
  assert.doesNotThrow(() => safeSetStorage('failKey', 'val'));
  assert.doesNotThrow(() => {
    const res = safeGetStorage('failKey');
    assert.strictEqual(res, null);
  });

  mockStorage.throws = false;
  mockStorage.clear();
});

test('resolveTheme respects explicit values and validate against allowlist', () => {
  assert.strictEqual(resolveTheme('light'), 'light');
  assert.strictEqual(resolveTheme('dark'), 'dark');
  // Invalid explicit value falls back to stored/system
  mockStorage.clear();
  assert.strictEqual(resolveTheme('purple' as any), DEFAULT_THEME);
});

test('resolveTheme prioritizes valid stored preference over system preference', () => {
  mockStorage.clear();
  // With stored light
  mockStorage.setItem(STORAGE_KEY_THEME, 'light');
  (global as any).window.matchMedia = (q: string) => ({ matches: q.includes('dark') });
  assert.strictEqual(resolveTheme(), 'light');

  // With stored dark
  mockStorage.setItem(STORAGE_KEY_THEME, 'dark');
  (global as any).window.matchMedia = (q: string) => ({ matches: q.includes('light') });
  assert.strictEqual(resolveTheme(), 'dark');
});

test('resolveTheme falls back to system preference when no stored preference exists', () => {
  mockStorage.clear();
  // System prefers light
  (global as any).window.matchMedia = (q: string) => ({ matches: q.includes('light') });
  assert.strictEqual(resolveTheme(), 'light');

  // System prefers dark
  (global as any).window.matchMedia = (q: string) => ({ matches: q.includes('dark') });
  assert.strictEqual(resolveTheme(), 'dark');

  // Neither match
  (global as any).window.matchMedia = () => ({ matches: false });
  assert.strictEqual(resolveTheme(), DEFAULT_THEME);
});

test('resolveTheme handles invalid stored values safely', () => {
  mockStorage.setItem(STORAGE_KEY_THEME, 'invalid-theme');
  (global as any).window.matchMedia = () => ({ matches: false });
  assert.strictEqual(resolveTheme(), DEFAULT_THEME);
});

test('resolveLocale respects explicit values and validate against allowlist', () => {
  assert.strictEqual(resolveLocale('pt-BR'), 'pt-BR');
  assert.strictEqual(resolveLocale('en-US'), 'en-US');
  mockStorage.clear();
  assert.strictEqual(resolveLocale('fr-FR' as any), DEFAULT_LOCALE);
});

test('resolveLocale prioritizes valid stored preference over URL and navigator', () => {
  mockStorage.clear();
  mockStorage.setItem(STORAGE_KEY_LOCALE, 'en-US');
  (global as any).window.location.search = '?lang=pt-BR';
  (global as any).window.navigator.languages = ['pt-BR'];

  assert.strictEqual(resolveLocale(), 'en-US');
});

test('resolveLocale falls back to URL search parameter when no stored preference exists', () => {
  mockStorage.clear();
  (global as any).window.location.search = '?lang=en-US';
  (global as any).window.navigator.languages = ['pt-BR'];

  assert.strictEqual(resolveLocale(), 'en-US');

  (global as any).window.location.search = '?lang=pt';
  assert.strictEqual(resolveLocale(), 'pt-BR');

  (global as any).window.location.search = '';
});

test('resolveLocale resolves navigator.languages prefix matches', () => {
  mockStorage.clear();
  (global as any).window.location.search = '';

  (global as any).window.navigator.languages = ['pt-PT', 'pt'];
  assert.strictEqual(resolveLocale(), 'pt-BR');

  (global as any).window.navigator.languages = ['en-GB', 'en'];
  assert.strictEqual(resolveLocale(), 'en-US');

  (global as any).window.navigator.languages = ['es-ES', 'de-DE'];
  assert.strictEqual(resolveLocale(), DEFAULT_LOCALE);
});

test('Theme and Locale preferences are strictly independent', () => {
  mockStorage.clear();

  // Set theme, verify locale unaffected
  applyTheme('light');
  assert.strictEqual(mockStorage.getItem(STORAGE_KEY_THEME), 'light');
  assert.strictEqual(mockStorage.getItem(STORAGE_KEY_LOCALE), null);

  // Set locale, verify theme remains light
  applyLocale('en-US');
  assert.strictEqual(mockStorage.getItem(STORAGE_KEY_LOCALE), 'en-US');
  assert.strictEqual(mockStorage.getItem(STORAGE_KEY_THEME), 'light');

  // Change theme to dark, verify locale remains en-US
  applyTheme('dark');
  assert.strictEqual(mockStorage.getItem(STORAGE_KEY_THEME), 'dark');
  assert.strictEqual(mockStorage.getItem(STORAGE_KEY_LOCALE), 'en-US');

  // Change locale to pt-BR, verify theme remains dark
  applyLocale('pt-BR');
  assert.strictEqual(mockStorage.getItem(STORAGE_KEY_LOCALE), 'pt-BR');
  assert.strictEqual(mockStorage.getItem(STORAGE_KEY_THEME), 'dark');
});
