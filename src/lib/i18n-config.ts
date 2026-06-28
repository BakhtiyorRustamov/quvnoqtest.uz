export const LOCALES = ['uz', 'ru', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'uz';

export const LOCALE_LABELS: Record<Locale, string> = {
  uz: "O'z",
  ru: 'Ру',
  en: 'En'
};

/** Pick a localized string out of a {uz,ru,en} record. */
export type L10n = Record<Locale, string>;
export function pick(l10n: L10n | undefined, locale: string): string {
  if (!l10n) return '';
  return l10n[(locale as Locale) in l10n ? (locale as Locale) : DEFAULT_LOCALE] ?? l10n.uz;
}
