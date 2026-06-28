'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { LOCALES, LOCALE_LABELS, type Locale } from '@/lib/i18n-config';
import { setLocaleCookie, api } from '@/lib/client';
import { useUser } from '@/components/providers/UserProvider';

export default function LangSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const { user } = useUser();

  function choose(l: Locale) {
    if (l === locale) return;
    setLocaleCookie(l);
    if (user) api('/api/me', { method: 'PATCH', json: { locale: l } });
    router.refresh();
  }

  return (
    <div
      className={`flex items-center gap-1 rounded-full bg-white/90 border border-ink/10 p-1 shadow-card ${className}`}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => choose(l)}
          aria-pressed={l === locale}
          className={`px-3 py-1.5 rounded-full text-sm font-extrabold transition-colors min-w-[44px] ${
            l === locale ? 'bg-brand-blue text-white' : 'text-ink/70 hover:bg-brand-blue/10'
          }`}
        >
          {LOCALE_LABELS[l]}
        </button>
      ))}
    </div>
  );
}
