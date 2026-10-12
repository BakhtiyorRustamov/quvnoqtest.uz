'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pick } from '@/lib/i18n-config';

/**
 * Quvnoq Olimpiada — big dummy announcement section at the bottom of the grade
 * dashboard (under "Mening natijalarim"). All subjects, fixed question counts,
 * competition date 1 August with a live countdown. No registration yet.
 */

// 1 August 2026, 00:00 Tashkent time (UTC+5)
const START_AT = Date.UTC(2026, 6, 31, 19, 0, 0);

const L = {
  title: { uz: 'Quvnoq Olimpiada', ru: 'Весёлая Олимпиада', en: 'Quvnoq Olympiad' },
  soon: { uz: 'Tez kunda', ru: 'Скоро', en: 'Coming soon' },
  lead: {
    uz: 'Barcha fanlar boʻyicha katta bellashuv! Bilimingni sinab koʻr va gʻolib boʻl!',
    ru: 'Большое состязание по всем предметам! Проверь свои знания и стань победителем!',
    en: 'A big competition across all subjects! Test your knowledge and become a champion!'
  },
  date: { uz: 'Boshlanish sanasi: 1-avgust', ru: 'Дата начала: 1 августа', en: 'Starts: August 1st' },
  countdownTitle: { uz: 'Boshlanishiga qoldi', ru: 'До начала осталось', en: 'Starts in' },
  started: { uz: 'Olimpiada boshlandi! 🎉', ru: 'Олимпиада началась! 🎉', en: 'The Olympiad has started! 🎉' },
  days: { uz: 'kun', ru: 'дн', en: 'days' },
  hours: { uz: 'soat', ru: 'час', en: 'hrs' },
  minutes: { uz: 'daqiqa', ru: 'мин', en: 'min' },
  seconds: { uz: 'soniya', ru: 'сек', en: 'sec' },
  q: { uz: 'savol', ru: 'вопросов', en: 'questions' },
  totalNote: {
    uz: 'Jami 30 savol: Matematika — 10, Ona tili — 5, Oʻqish savodxonligi — 5, Ingliz tili — 5, Tabiiy fanlar — 5',
    ru: 'Всего 30 вопросов: Математика — 10, Родной язык — 5, Читательская грамотность — 5, Английский язык — 5, Естественные науки — 5',
    en: '30 questions in total: Maths — 10, Native language — 5, Reading literacy — 5, English — 5, Natural science — 5'
  }
};

function remaining(): { d: number; h: number; m: number; s: number; over: boolean } {
  const ms = START_AT - Date.now();
  if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0, over: true };
  const sTot = Math.floor(ms / 1000);
  return {
    d: Math.floor(sTot / 86400),
    h: Math.floor((sTot % 86400) / 3600),
    m: Math.floor((sTot % 3600) / 60),
    s: sTot % 60,
    over: false
  };
}

export default function OlympiadSection({ locale }: { locale: string }) {
  // render zeros on the server, tick on the client (avoids hydration mismatch)
  const [t, setT] = useState<{ d: number; h: number; m: number; s: number; over: boolean } | null>(null);

  useEffect(() => {
    setT(remaining());
    const id = setInterval(() => setT(remaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const cells = [
    { v: t?.d ?? 0, label: pick(L.days, locale) },
    { v: t?.h ?? 0, label: pick(L.hours, locale) },
    { v: t?.m ?? 0, label: pick(L.minutes, locale) },
    { v: t?.s ?? 0, label: pick(L.seconds, locale) }
  ];

  return (
    <section className="max-w-2xl mx-auto px-3 mt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        className="relative overflow-hidden rounded-3xl border-2 border-brand-purple/50 bg-gradient-to-br from-brand-purple via-[#6d3a99] to-brand-magenta text-white shadow-xl px-4 py-5 sm:px-6 sm:py-6 text-center"
      >
        {/* decorative sparkles */}
        <div aria-hidden className="absolute -top-4 -left-4 text-4xl opacity-20 rotate-12">🏆</div>
        <div aria-hidden className="absolute -bottom-5 -right-4 text-5xl opacity-15 -rotate-12">🎓</div>

        <h2 className="font-black text-[clamp(20px,4.5vw,30px)] leading-tight drop-shadow">
          🏆 {pick(L.title, locale)}
        </h2>
        <p className="mt-1 text-[13px] font-bold text-white/85 max-w-md mx-auto text-balance">{pick(L.lead, locale)}</p>

        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-yellow text-ink font-black text-[13px] shadow">
          📅 {pick(L.date, locale)}
        </div>

        {/* compact countdown */}
        <div className="mt-4">
          <div className="text-[11px] font-black uppercase tracking-widest text-white/70">
            {t?.over ? pick(L.started, locale) : pick(L.countdownTitle, locale)}
          </div>
          {!t?.over && (
            <div className="mt-2 grid grid-cols-4 gap-1.5 sm:gap-2.5 max-w-sm mx-auto" role="timer" aria-live="off">
              {cells.map((c, i) => (
                <div key={i} className="rounded-xl bg-white/15 border border-white/25 backdrop-blur px-1 py-1.5 sm:py-2.5">
                  <div className="font-black tabular-nums text-[clamp(18px,5vw,32px)] leading-none drop-shadow">
                    {String(c.v).padStart(2, '0')}
                  </div>
                  <div className="mt-1 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide text-white/75">
                    {c.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="mt-3 mx-auto max-w-md text-[12px] font-bold text-white/70 text-balance">
          🚧 {pick(L.totalNote, locale)}
        </p>
      </motion.div>
    </section>
  );
}
