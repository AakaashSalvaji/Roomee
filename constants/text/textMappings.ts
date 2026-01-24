import en from './locale/en.json';

type LocaleData = typeof en;

let currentLocale: LocaleData = en;

/**
 * Sets the active locale
 * @param locale - The locale data object
 */
export function setLocale(locale: LocaleData): void {
  currentLocale = locale;
}

/**
 * Gets a localized string by key
 * @param key - The key to look up (supports dot notation, e.g., "section.key")
 * @param fallback - Optional fallback value if key is not found
 * @returns The localized string or the key/fallback if not found
 */
export function getTextMapping(key: string, fallback?: string): string {
  const keys = key.split('.');
  let value: any = currentLocale;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return fallback ?? key;
    }
  }

  if (typeof value === 'string') {
    return value;
  }

  return fallback ?? key;
}
