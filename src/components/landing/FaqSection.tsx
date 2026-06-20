'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';

/* Savol-javoblar — a standalone FAQ section (moved out of the flashlight zone).
   Native <details> accordion with a prominent round +/× toggle. */
export default function FaqSection() {
  const t = useTranslations('landing');
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
        <a href="mailto:info@quvnoqtest.uz" className="btn-blue">
          {t('discovery.contactCta')}
        </a>
      </div>
    </section>
  );
}
