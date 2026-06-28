'use client';

import { useLocale, useTranslations } from 'next-intl';
import { pick, type L10n } from '@/lib/i18n-config';

/* Task 6 — bold brand-orange footer. */

const LINKS: { head: 'product' | 'company' | 'contact'; items: L10n[] }[] = [
  {
    head: 'product',
    items: [
      { uz: 'Fanlar', ru: 'Предметы', en: 'Subjects' },
      { uz: 'Sinflar', ru: 'Классы', en: 'Grades' },
      { uz: 'Sinov darslari', ru: 'Пробные уроки', en: 'Demo lessons' },
      { uz: 'AI yordamchi', ru: 'AI помощник', en: 'AI helper' }
    ]
  },
  {
    head: 'company',
    items: [
      { uz: 'Biz haqimizda', ru: 'О нас', en: 'About us' },
      { uz: 'Blog', ru: 'Блог', en: 'Blog' },
      { uz: 'Hamkorlik', ru: 'Партнёрам', en: 'Partners' },
      { uz: 'Yangiliklar', ru: 'Новости', en: 'News' }
    ]
  },
  {
    head: 'contact',
    items: [
      { uz: 'Aloqa', ru: 'Контакты', en: 'Contact' },
      { uz: 'Yordam', ru: 'Помощь', en: 'Help' },
      { uz: 'Maxfiylik', ru: 'Конфиденциальность', en: 'Privacy' },
      { uz: 'Shartlar', ru: 'Условия', en: 'Terms' }
    ]
  }
];

function Social({ label, d }: { label: string; d: string }) {
  return (
    <a
      href="#"
      onClick={(e) => e.preventDefault()}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full bg-ink/10 text-ink transition-colors hover:bg-ink hover:text-white focus-visible:ring-2 focus-visible:ring-ink"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d={d} />
      </svg>
    </a>
  );
}

export default function SiteFooter() {
  const t = useTranslations('landing');
  const locale = useLocale();

  return (
    <footer className="relative overflow-hidden text-ink" style={{ background: 'linear-gradient(180deg,#ffb347,#f39a1f)' }}>
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* giant display text with self-drawing wavy underline */}
        <div data-scroll-offset className="relative inline-block">
          <h2 className="text-4xl font-black leading-none text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.18)] sm:text-6xl">
            {t('footer.big')}
          </h2>
          <svg className="wavy-underline absolute -bottom-3 left-0 h-4 w-full" viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden>
            <path d="M2 9 Q 38 0 75 9 T 150 9 T 225 9 T 298 9" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
        <p className="mt-6 max-w-md font-bold text-ink/75">{t('footer.tagline')}</p>

        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {LINKS.map((col) => (
            <div key={col.head}>
              <h3 className="text-sm font-black uppercase tracking-wide text-ink/60">{t(`footer.${col.head}`)}</h3>
              <ul className="mt-3 space-y-2">
                {col.items.map((it, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="font-bold text-ink/85 underline-offset-4 hover:text-ink hover:underline"
                    >
                      {pick(it, locale)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-ink/15 pt-8 sm:flex-row sm:items-center">
          <div className="flex gap-3">
            <Social label="Telegram" d="M21.9 4.3 18.6 20c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9-8.1c.4-.3-.1-.5-.6-.2L6.4 13.6l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.4 1z" />
            <Social label="Instagram" d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3zm6.8-11.2a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z" />
            <Social label="YouTube" d="M23 7.5a3 3 0 0 0-2.1-2.1C19 4.9 12 4.9 12 4.9s-7 0-8.9.5A3 3 0 0 0 1 7.5 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.5 31 31 0 0 0-.5-4.5zM9.8 15.3V8.7l5.7 3.3z" />
          </div>
          <div className="text-sm font-bold text-ink/70">
            <span>{t('footer.address')}</span>
            <span className="mx-2">·</span>
            <span>{t('footer.rights')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
