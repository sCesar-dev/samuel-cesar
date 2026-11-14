import type { Locale } from '../lib/preferences';
import type { LocalizedString, LocalizedStringList } from '../../data/schemas/portfolio.ts';

/**
 * Resolves a localized { pt, en } string for the active UI locale.
 */
export function pickLocalized(value: LocalizedString, locale: Locale): string {
  return locale === 'en-US' ? value.en : value.pt;
}

/**
 * Resolves a localized { pt, en } string list for the active UI locale.
 */
export function pickLocalizedList(value: LocalizedStringList, locale: Locale): string[] {
  return locale === 'en-US' ? value.en : value.pt;
}
