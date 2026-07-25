'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_TELEGRAM_HANDLE,
  CONTACT_TELEGRAM_URL
} from '@/lib/contact';

/**
 * "Get in touch" button + popup, reusable across the app.
 *
 * Same two channels as the landing page's FAQ section (Telegram and phone), but
 * themed for the light in-app screens rather than the dark marketing page. It
 * matters most on checkout: if a payment is refused or a receipt is rejected,
 * the user needs a way to reach a human immediately, or they simply leave.
 */

type Variant = 'inline' | 'subtle' | 'card';

export default function ContactButton({
  variant = 'inline',
  className = ''
}: {
  variant?: Variant;
  className?: string;
}) {
  const t = useTranslations('contact');
  const [open, setOpen] = React.useState(false);

  // Escape to close, and stop the page scrolling behind the popup.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const trigger =
    variant === 'card' ? (
      <div
        className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-ink/10 bg-ink/[0.02] px-4 py-3.5 ${className}`}
      >
        <span className="font-bold text-ink/65 text-sm">
          <span className="font-extrabold text-ink">{t('title')}</span> — {t('body')}
        </span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 rounded-xl bg-ink px-4 py-2 font-black text-white text-sm transition hover:bg-ink/85"
        >
          💬 {t('cta')}
        </button>
      </div>
    ) : variant === 'subtle' ? (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`text-[13px] font-bold text-ink/45 underline decoration-ink/20 underline-offset-2 transition hover:text-ink/75 ${className}`}
      >
        💬 {t('cta')}
      </button>
    ) : (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 rounded-2xl border-2 border-ink/12 bg-white px-4 py-2.5 font-extrabold text-ink transition hover:border-ink/30 ${className}`}
      >
        💬 {t('cta')}
      </button>
    );

  return (
    <>
      {trigger}

      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-[95] grid place-items-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={t('modalTitle')}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              className="card relative w-full max-w-sm p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-black text-ink">{t('modalTitle')}</h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t('close')}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink/12 font-black text-ink/60 transition hover:bg-ink/[0.06]"
                >
                  ✕
                </button>
              </div>

              <p className="mt-1.5 text-[13px] font-bold text-ink/55">{t('body')}</p>

              <div className="mt-5 space-y-3">
                <a
                  href={CONTACT_TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border-2 border-ink/10 px-4 py-3.5 font-extrabold text-ink transition hover:border-ink/25 hover:bg-ink/[0.03]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2AABEE] text-white">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                      <path d="M21.9 4.3 18.6 20c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9-8.1c.4-.3-.1-.5-.6-.2L6.4 13.6l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.4 1z" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wide text-ink/45">Telegram</span>
                    {CONTACT_TELEGRAM_HANDLE}
                  </span>
                </a>

                <a
                  href={`tel:${CONTACT_PHONE_TEL}`}
                  className="flex items-center gap-3 rounded-2xl border-2 border-ink/10 px-4 py-3.5 font-extrabold text-ink transition hover:border-ink/25 hover:bg-ink/[0.03]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-green text-white">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.3 0 .7-.2 1l-2.2 2.1z" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wide text-ink/45">{t('phone')}</span>
                    {CONTACT_PHONE_DISPLAY}
                  </span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
