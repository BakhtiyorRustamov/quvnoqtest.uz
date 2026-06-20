import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/i18n-config';

export default getRequestConfig(async () => {
  const raw = (await cookies()).get('qt_locale')?.value ?? DEFAULT_LOCALE;
  const locale: Locale = (LOCALES as readonly string[]).includes(raw)
    ? (raw as Locale)
    : DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
