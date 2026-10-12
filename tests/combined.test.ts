import test from 'node:test';
import assert from 'node:assert';
import {
  resolveTheme,
  resolveLocale,
  applyTheme,
  applyLocale,
  safeGetStorage,
  safeSetStorage,
  STORAGE_KEY_THEME,
  STORAGE_KEY_LOCALE,
  DEFAULT_THEME,
  DEFAULT_LOCALE,
} from '../src/lib/preferences.ts';
import { dictionaries } from '../src/i18n/translations.ts';

class MemoryStorage {
  private data = new Map<string, string>();
  public throws = false;

  getItem(key: string): string | null {
    if (this.throws) throw new Error('Storage blocked');
    return this.data.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    if (this.throws) throw new Error('Storage blocked');
    this.data.set(key, value);
  }
  removeItem(key: string): void {
    if (this.throws) throw new Error('Storage blocked');
    this.data.delete(key);
  }
  clear(): void {
    if (this.throws) throw new Error('Storage blocked');
    this.data.clear();
  }
}

const memoryStorage = new MemoryStorage();

(global as any).window = {
  localStorage: memoryStorage,
  matchMedia: (query: string) => ({
    matches: query.includes('dark'),
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
  navigator: {
    languages: ['pt-BR'],
    language: 'pt-BR',
  },
  location: { search: '' },
  dispatchEvent: () => true,
};

(global as any).document = {
  documentElement: {
    setAttribute: () => {},
    getAttribute: () => null,
    style: {},
  },
  querySelector: () => null,
  createElement: () => ({ setAttribute: () => {} }),
  head: { appendChild: () => {} },
};

test('Requirement 5.5: Combined state transition sequence', () => {
  memoryStorage.clear();

  // Step 1: Select dark
  applyTheme('dark');
  assert.strictEqual(resolveTheme(), 'dark');

  // Step 2: Select English
  applyLocale('en-US');
  assert.strictEqual(resolveLocale(), 'en-US');

  // Step 3 & 4: Simulate reload on another route -> confirm dark + English
  assert.strictEqual(resolveTheme(), 'dark');
  assert.strictEqual(resolveLocale(), 'en-US');
  const dictEn = dictionaries[resolveLocale()];
  assert.strictEqual(dictEn.nav.projects, 'Projects');

  // Step 5: Switch to Portuguese and confirm dark remains
  applyLocale('pt-BR');
  assert.strictEqual(resolveTheme(), 'dark', 'Dark theme must remain when switching to Portuguese');
  assert.strictEqual(resolveLocale(), 'pt-BR');
  const dictPt = dictionaries[resolveLocale()];
  assert.strictEqual(dictPt.nav.projects, 'Projetos');

  // Step 6: Switch to light and confirm Portuguese remains
  applyTheme('light');
  assert.strictEqual(resolveTheme(), 'light');
  assert.strictEqual(resolveLocale(), 'pt-BR', 'Portuguese must remain when switching to light theme');

  // Step 7: Reload simulation -> confirm light + Portuguese persist
  assert.strictEqual(resolveTheme(), 'light');
  assert.strictEqual(resolveLocale(), 'pt-BR');
});

test('Requirement 5.6: Storage and initialization edge cases', () => {
  // 1. Empty storage: falls back to system preferences / defaults
  memoryStorage.clear();
  (global as any).window.matchMedia = (q: string) => ({ matches: q.includes('light') });
  assert.strictEqual(resolveTheme(), 'light');
  assert.strictEqual(resolveLocale(), DEFAULT_LOCALE);

  // 2. Invalid values: theme="purple", locale="fr-FR", empty string, malformed JSON
  safeSetStorage(STORAGE_KEY_THEME, 'purple');
  safeSetStorage(STORAGE_KEY_LOCALE, 'fr-FR');
  assert.strictEqual(resolveTheme(), 'light'); // falls back to OS light
  assert.strictEqual(resolveLocale(), DEFAULT_LOCALE); // falls back to pt-BR

  safeSetStorage(STORAGE_KEY_THEME, '');
  safeSetStorage(STORAGE_KEY_LOCALE, '{"broken": json');
  assert.strictEqual(resolveTheme(), 'light');
  assert.strictEqual(resolveLocale(), DEFAULT_LOCALE);

  // 3. Storage that throws on access (e.g. private mode, cookies disabled)
  memoryStorage.throws = true;
  assert.doesNotThrow(() => {
    const t = resolveTheme();
    const l = resolveLocale();
    assert.ok(t === 'light' || t === 'dark');
    assert.strictEqual(l, DEFAULT_LOCALE);
  });
  memoryStorage.throws = false;

  // 4. Cleared storage mid-session
  applyTheme('dark');
  applyLocale('en-US');
  assert.strictEqual(resolveTheme(), 'dark');
  assert.strictEqual(resolveLocale(), 'en-US');

  // Clear mid-session
  memoryStorage.clear();
  // Safe fallbacks kick in smoothly without throwing
  assert.doesNotThrow(() => {
    assert.strictEqual(resolveLocale(), DEFAULT_LOCALE);
  });

  // 5. OS dark vs. light with no stored preference
  memoryStorage.clear();
  (global as any).window.matchMedia = (q: string) => ({ matches: q.includes('dark') });
  assert.strictEqual(resolveTheme(), 'dark');

  (global as any).window.matchMedia = (q: string) => ({ matches: q.includes('light') });
  assert.strictEqual(resolveTheme(), 'light');
});
