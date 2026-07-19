'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { LOCALES, LOCALE_LABELS, type Locale } from '@/lib/i18n-config';
import { setLocaleCookie, api } from '@/lib/client';
import { useUser } from '@/components/providers/UserProvider';

/** Toggle-style language graphics (flag + switch sign) cropped from the source
 *  artwork — public/flags. No text labels on the button. */
const FLAG: Record<Locale, string> = {
  uz: '/flags/uz.png',
  ru: '/flags/ru.png',
  en: '/flags/en.png'
};

/**
 * Language switcher — shows the CURRENT language as a flag/switch graphic. Tapping
 * it expands a popover with all three (UZ default). Choosing one sets the locale
 * cookie + user record and refreshes.
 */
export default function LangSwitcher({ className = '' }: { className?: string }) {
  const locale = (useLocale() as Locale) || 'uz';
  const router = useRouter();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  function choose(l: Locale) {
    setOpen(false);
    if (l === locale) return;
    setLocaleCookie(l);
    if (user) api('/api/me', { method: 'PATCH', json: { locale: l } });
    router.refresh();
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* current language graphic — the button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${LOCALE_LABELS[locale]}`}
        className="block rounded-2xl transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/40"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={FLAG[locale]} alt="" height={36} className="h-9 w-auto rounded-lg shadow-card" draggable={false} />
      </button>

      {/* popover with all three language graphics — roomy, not squished */}
      {open && (
        <ul role="listbox" className="absolute right-0 z-50 mt-2 flex w-max flex-col gap-2 rounded-2xl border border-ink/10 bg-white p-2.5 shadow-2xl">
          {LOCALES.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                aria-label={LOCALE_LABELS[l]}
                onClick={() => choose(l)}
                className={`block rounded-xl border-2 p-1.5 transition-colors ${
                  l === locale ? 'border-brand-blue bg-brand-blue/5' : 'border-transparent hover:bg-ink/[0.05]'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={FLAG[l]} alt="" height={44} className="block h-11 w-auto rounded-lg" draggable={false} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
