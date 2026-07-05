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
    uz: 'Jami 60 savol · barcha fanlar boʻyicha',
    ru: 'Всего 60 вопросов · по всем предметам',
    en: '60 questions in total · across all subjects'
  }
};

const SUBJECTS: { icon: string; count: number; name: { uz: string; ru: string; en: string } }[] = [
  { icon: '🔢', count: 10, name: { uz: 'Matematika', ru: 'Математика', en: 'Maths' } },
  { icon: '📖', count: 10, name: { uz: 'Ona tili', ru: 'Родной язык', en: 'Native language' } },
  { icon: '📚', count: 5, name: { uz: 'Oʻqish savodxonligi', ru: 'Читательская грамотность', en: 'Reading literacy' } },
  { icon: '🔤', count: 10, name: { uz: 'Ingliz tili', ru: 'Английский', en: 'English' } },
  { icon: '🌿', count: 10, name: { uz: 'Tabiiy fanlar', ru: 'Естествознание', en: 'Natural science' } },
  { icon: '❤️', count: 5, name: { uz: 'Tarbiya', ru: 'Воспитание', en: 'Upbringing' } },
  { icon: '🎨', count: 5, name: { uz: 'Tasviriy sanʼat', ru: 'ИЗО', en: 'Art' } },
  { icon: '🛠️', count: 5, name: { uz: 'Texnologiya', ru: 'Технология', en: 'Technology' } }
];

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
    <section className="max-w-4xl mx-auto px-3 mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        className="relative overflow-hidden rounded-[28px] border-4 border-brand-purple/50 bg-gradient-to-br from-brand-purple via-[#6d3a99] to-brand-magenta text-white shadow-2xl px-5 py-8 sm:px-10 sm:py-10 text-center"
      >
        {/* decorative sparkles */}
        <div aria-hidden className="absolute -top-6 -left-6 text-7xl opacity-20 rotate-12">🏆</div>
        <div aria-hidden className="absolute -bottom-8 -right-6 text-8xl opacity-15 -rotate-12">🎓</div>

        <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 border border-white/40 text-xs font-black uppercase tracking-widest">
          🚧 {pick(L.soon, locale)}
        </span>

        <h2 className="mt-3 font-black text-[clamp(30px,6vw,52px)] leading-tight drop-shadow">
          🏆 {pick(L.title, locale)}
        </h2>
        <p className="mt-2 font-bold text-white/85 max-w-xl mx-auto">{pick(L.lead, locale)}</p>

        <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-yellow text-ink font-black text-lg shadow-lg">
          📅 {pick(L.date, locale)}
        </div>

        {/* big countdown */}
        <div className="mt-7">
          <div className="text-sm font-black uppercase tracking-widest text-white/70">
            {t?.over ? pick(L.started, locale) : pick(L.countdownTitle, locale)}
          </div>
          {!t?.over && (
            <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto" role="timer" aria-live="off">
              {cells.map((c, i) => (
                <div key={i} className="rounded-2xl bg-white/15 border-2 border-white/25 backdrop-blur px-1 py-3 sm:py-5">
                  <div className="font-black tabular-nums text-[clamp(28px,7vw,56px)] leading-none drop-shadow">
                    {String(c.v).padStart(2, '0')}
                  </div>
                  <div className="mt-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-wide text-white/75">
                    {c.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* subjects + question counts */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 text-left">
          {SUBJECTS.map((s) => (
            <div key={s.name.uz} className="flex items-center gap-2.5 rounded-2xl bg-white/12 border border-white/20 px-3 py-2.5">
              <span className="text-2xl" aria-hidden>{s.icon}</span>
              <span className="leading-tight">
                <span className="block font-extrabold text-[13px]">{pick(s.name, locale)}</span>
                <span className="block text-[12px] font-bold text-brand-yellow">
                  {s.count} {pick(L.q, locale)}
                </span>
              </span>
            </div>
          ))}
          <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-white/30 px-3 py-2.5 font-black text-white/85 text-[13px]">
            = 60 {pick(L.q, locale)}
          </div>
        </div>

        <p className="mt-4 text-[13px] font-bold text-white/65">{pick(L.totalNote, locale)}</p>
      </motion.div>
    </section>
  );
}
