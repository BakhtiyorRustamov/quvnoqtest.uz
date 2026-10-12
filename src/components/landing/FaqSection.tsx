'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  CONTACT_TELEGRAM_HANDLE,
  CONTACT_TELEGRAM_URL
} from '@/lib/contact';

/* Savol-javoblar — a standalone FAQ section (moved out of the flashlight zone).
   Native <details> accordion with a prominent round +/× toggle. */
export default function FaqSection() {
  const t = useTranslations('landing');
  const [open, setOpen] = React.useState(false);
  const items = [
    { q: t('discovery.q1'), a: t('discovery.fa1') },
    { q: t('discovery.q2'), a: t('discovery.fa2') },
    { q: t('discovery.q3'), a: t('discovery.fa3') },
    { q: t('discovery.q4'), a: t('discovery.fa4') }
  ];

  return (
    <section className="mx-auto max-w-3xl px-5 py-24">
      <h2 data-scroll-offset className="text-center text-3xl font-black text-white sm:text-4xl">
        {t('discovery.faqTitle')}
      </h2>

      <div data-scroll-offset className="mt-10 space-y-3.5">
        {items.map((f, i) => (
          <details
            key={i}
            className="group overflow-hidden rounded-2xl border border-white/12 bg-white/[0.05] transition-colors open:border-brand-orange/40 open:bg-white/[0.08] [&_summary]:cursor-pointer"
            style={{ '--index': i } as React.CSSProperties}
          >
            <summary className="flex list-none items-center justify-between gap-4 p-5 text-base font-extrabold text-white marker:content-none [&::-webkit-details-marker]:hidden">
              <span>{f.q}</span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-orange text-2xl font-black leading-none text-white shadow-[0_4px_12px_rgba(243,154,31,0.45)] transition-transform duration-300 group-open:rotate-[135deg]">
                +
              </span>
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-white/75">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4">
        <span className="text-white/80">
          <span className="font-extrabold text-white">{t('discovery.contactTitle')}</span> — {t('discovery.contactBody')}
        </span>
        <button type="button" onClick={() => setOpen(true)} className="btn-blue">
          {t('discovery.contactCta')}
        </button>
      </div>

      {/* contact popup — Telegram channel + phone */}
      {open && (
        <div
          className="fixed inset-0 z-[90] grid place-items-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={t('discovery.contactModalTitle')}
        >
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-sm rounded-3xl border border-white/15 bg-[#101f4a] p-6 text-white shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-black">{t('discovery.contactModalTitle')}</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="✕"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 font-black transition-colors hover:bg-white/20"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <a
                href={CONTACT_TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3.5 font-extrabold transition-colors hover:bg-white/[0.12]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2AABEE] text-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                    <path d="M21.9 4.3 18.6 20c-.2 1-.9 1.3-1.8.8l-4.9-3.6-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9-8.1c.4-.3-.1-.5-.6-.2L6.4 13.6l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.6.2 1.4 1z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wide text-white/55">Telegram</span>
                  {CONTACT_TELEGRAM_HANDLE}
                </span>
              </a>

              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3.5 font-extrabold transition-colors hover:bg-white/[0.12]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-green text-white">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.3 0 .7-.2 1l-2.2 2.1z" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wide text-white/55">Telefon</span>
                  {CONTACT_PHONE_DISPLAY}
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
