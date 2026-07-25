'use client';

import { useTranslations } from 'next-intl';
import { CONTACT_TELEGRAM_URL } from '@/lib/contact';

/* Task 6 — bold brand-orange footer. */

function Social({ label, d, href }: { label: string; d: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
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


        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-ink/15 pt-8 sm:flex-row sm:items-center">
          <div className="flex gap-3">
            <Social href={CONTACT_TELEGRAM_URL} label="Telegram" d="M21.9 4.3 18.6 20c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9-8.1c.4-.3-.1-.5-.6-.2L6.4 13.6l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.4 1z" />
            <Social href="https://www.instagram.com/quvnoqtest.uz" label="Instagram" d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.1.4.3 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.1-1 .3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.8 3.8 0 0 1-1.4-.9 3.8 3.8 0 0 1-.9-1.4c-.1-.4-.3-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.1 1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3zm6.8-11.2a1.5 1.5 0 1 1-1.5-1.5 1.5 1.5 0 0 1 1.5 1.5z" />
          </div>
          <div className="text-sm font-bold text-ink/70">
            <span>{t('footer.rights')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
