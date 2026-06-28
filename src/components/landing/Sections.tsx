'use client';

import * as React from 'react';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { pick, type L10n } from '@/lib/i18n-config';
import { CountUp } from './scroll';
import { Atom, Flask, Dna, Gear, Globe, Planet, Rocket, Telescope, StarIcon, Lightbulb } from './Science';

type IconC = React.FC<{ className?: string }>;
type Subject = { name: L10n; desc: L10n; color: string; Icon?: IconC; glyph?: string };

const TABS: { label: L10n; items: Subject[] }[] = [
  {
    label: { uz: 'Tabiiy fanlar', ru: 'Естественные', en: 'Natural' },
    items: [
      { name: { uz: 'Fizika', ru: 'Физика', en: 'Physics' }, desc: { uz: 'Kuch, energiya, harakat', ru: 'Сила, энергия, движение', en: 'Force, energy, motion' }, color: '#7c3aed', Icon: Atom },
      { name: { uz: 'Kimyo', ru: 'Химия', en: 'Chemistry' }, desc: { uz: 'Moddalar va reaksiyalar', ru: 'Вещества и реакции', en: 'Matter & reactions' }, color: '#10b981', Icon: Flask },
      { name: { uz: 'Biologiya', ru: 'Биология', en: 'Biology' }, desc: { uz: 'Tirik organizmlar olami', ru: 'Мир живых организмов', en: 'The living world' }, color: '#c2298a', Icon: Dna }
    ]
  },
  {
    label: { uz: 'Aniq fanlar', ru: 'Точные', en: 'Exact' },
    items: [
      { name: { uz: 'Matematika', ru: 'Математика', en: 'Maths' }, desc: { uz: 'Sonlar va mantiq', ru: 'Числа и логика', en: 'Numbers & logic' }, color: '#f39a1f', glyph: 'π' },
      { name: { uz: 'Informatika', ru: 'Информатика', en: 'Informatics' }, desc: { uz: 'Algoritm va kod', ru: 'Алгоритмы и код', en: 'Algorithms & code' }, color: '#06b6d4', Icon: Gear },
      { name: { uz: 'Geometriya', ru: 'Геометрия', en: 'Geometry' }, desc: { uz: 'Shakllar va fazo', ru: 'Формы и пространство', en: 'Shapes & space' }, color: '#1fa7e0', Icon: StarIcon }
    ]
  },
  {
    label: { uz: 'Koinot', ru: 'Космос', en: 'Cosmos' },
    items: [
      { name: { uz: 'Astronomiya', ru: 'Астрономия', en: 'Astronomy' }, desc: { uz: 'Yulduzlar va sayyoralar', ru: 'Звёзды и планеты', en: 'Stars & planets' }, color: '#5a2d82', Icon: Planet },
      { name: { uz: 'Geografiya', ru: 'География', en: 'Geography' }, desc: { uz: 'Yer va tabiat', ru: 'Земля и природа', en: 'Earth & nature' }, color: '#1fa7e0', Icon: Globe },
      { name: { uz: 'Kosmonavtika', ru: 'Космонавтика', en: 'Spaceflight' }, desc: { uz: 'Raketalar va parvoz', ru: 'Ракеты и полёт', en: 'Rockets & flight' }, color: '#f39a1f', Icon: Rocket }
    ]
  }
];

const LEADERS = [
  { name: 'Madina', pts: 980 },
  { name: 'Bekzod', pts: 910 },
  { name: 'Dilnoza', pts: 845 },
  { name: 'Javohir', pts: 760 },
  { name: 'Aziz', pts: 690 }
];
const MEDALS = ['🥇', '🥈', '🥉', '4', '5'];

/* ---- Section A — Why QuvnoqTest? (slide from LEFT) ----------------------- */
function SectionWhy() {
  const t = useTranslations('landing');
  const features: { Icon: IconC; t: string; b: string; c: string }[] = [
    { Icon: StarIcon, t: t('why.f1t'), b: t('why.f1b'), c: '#f39a1f' },
    { Icon: Globe, t: t('why.f2t'), b: t('why.f2b'), c: '#06b6d4' },
    { Icon: Atom, t: t('why.f3t'), b: t('why.f3b'), c: '#7c3aed' }
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-24">
      <div data-scroll-offset className="from-left grid items-center gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-black text-white sm:text-4xl">{t('why.title')}</h2>
          <div className="mt-6 flex items-end gap-3">
            <span className="text-6xl font-black text-brand-orange sm:text-7xl">
              <CountUp to={10000} suffix="+" />
            </span>
            <span className="mb-2 max-w-[12ch] text-sm font-bold text-white/70">{t('why.counterLabel')}</span>
          </div>
          <ul className="mt-8 space-y-4">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-4" style={{ '--index': i } as React.CSSProperties}>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white" style={{ background: `${f.c}33`, color: f.c }}>
                  <f.Icon className="h-7 w-7" />
                </span>
                <span>
                  <span className="block font-extrabold text-white">{f.t}</span>
                  <span className="block text-sm text-white/70">{f.b}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* lab-scene illustration */}
        <div className="relative mx-auto grid h-64 w-full max-w-sm place-items-center sm:h-72">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 to-white/0 blur-xl" aria-hidden />
          <div className="glass relative grid h-full w-full place-items-center rounded-[2rem]" aria-hidden>
            <span className="animate-floaty text-violet-300">
              <Atom className="h-24 w-24" />
            </span>
            <span className="absolute left-6 top-6 text-emerald-300">
              <Flask className="h-12 w-12" />
            </span>
            <span className="absolute bottom-6 right-7 text-cyan-300">
              <Telescope className="h-12 w-12" />
            </span>
            <span className="absolute right-8 top-7 text-yellow-300">
              <StarIcon className="h-7 w-7" />
            </span>
            <span className="absolute bottom-8 left-9 text-fuchsia-300">
              <Dna className="h-12 w-12" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Section B — Fanlar tabs (fade from BOTTOM) -------------------------- */
function SectionSubjects() {
  const t = useTranslations('landing');
  const locale = useLocale();
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <section className="relative overflow-hidden py-24">
      {/* stable parallax backdrop */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-10 -z-0 -translate-x-1/2 text-white/5" data-scroll-speed="0.12">
        <Atom className="h-80 w-80" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">
        <div data-scroll-offset className="text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl">{t('subjects.title')}</h2>
          <p className="mt-2 text-white/70">{t('subjects.lead')}</p>
        </div>

        {/* pill tab bar */}
        <div className="mt-8 flex justify-center">
          <div className="flex max-w-full gap-2 overflow-x-auto rounded-full bg-white/5 p-1.5">
            {TABS.map((tb, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-extrabold transition-colors ${
                  active === i ? 'bg-white text-ink' : 'text-white/75 hover:bg-white/10'
                }`}
              >
                {pick(tb.label, locale)}
              </button>
            ))}
          </div>
        </div>

        {/* tab content */}
        <div data-scroll-offset className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tab.items.map((s, i) => (
            <div
              key={`${active}-${i}`}
              className="c-tile-animated rounded-3xl p-6 text-white"
              style={{
                '--index': i,
                background: `linear-gradient(150deg, ${s.color}, ${s.color}cc)`,
                boxShadow: `0 14px 34px ${s.color}55`
              } as React.CSSProperties}
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/20 text-white">
                {s.glyph ? <span className="text-3xl font-black">{s.glyph}</span> : s.Icon ? <s.Icon className="h-8 w-8" /> : null}
              </span>
              <h3 className="mt-4 text-xl font-black">{pick(s.name, locale)}</h3>
              <p className="mt-1 text-sm text-white/85">{pick(s.desc, locale)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Section C — Leaderboard (slide from RIGHT) -------------------------- */
function SectionLeaderboard() {
  const t = useTranslations('landing');
  const max = LEADERS[0].pts;
  return (
    <section className="mx-auto max-w-3xl px-5 py-24">
      <div data-scroll-offset className="from-right glass rounded-[2rem] p-7 sm:p-9">
        <h2 className="text-2xl font-black text-white sm:text-3xl">{t('leaderboard.title')}</h2>
        <p className="mt-1 text-sm text-white/65">{t('leaderboard.lead')}</p>
        <ul className="mt-7 space-y-4">
          {LEADERS.map((l, i) => (
            <li key={i} className="flex items-center gap-4" style={{ '--index': i } as React.CSSProperties}>
              <span className="w-7 shrink-0 text-center text-lg font-black text-white/90">{MEDALS[i]}</span>
              <span className="w-20 shrink-0 font-extrabold text-white">{l.name}</span>
              <span className="relative h-3 flex-1 overflow-hidden rounded-full bg-white/10">
                <span
                  className="score-bar absolute inset-y-0 left-0 rounded-full"
                  style={{ '--bar': `${Math.round((l.pts / max) * 100)}%`, background: 'linear-gradient(90deg,#f39a1f,#fbbf24)' } as React.CSSProperties}
                />
              </span>
              <span className="w-20 shrink-0 text-right text-sm font-bold text-white/80">
                {l.pts} {t('leaderboard.points')}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---- Section D — How It Works (sequential fade + self-drawing path) ------ */
function SectionHow() {
  const t = useTranslations('landing');
  const steps: { Icon: IconC; t: string; b: string; c: string }[] = [
    { Icon: Telescope, t: t('how.s1t'), b: t('how.s1b'), c: '#06b6d4' },
    { Icon: Atom, t: t('how.s2t'), b: t('how.s2b'), c: '#7c3aed' },
    { Icon: StarIcon, t: t('how.s3t'), b: t('how.s3b'), c: '#f39a1f' }
  ];
  return (
    <section className="mx-auto max-w-5xl px-5 py-24">
      <h2 data-scroll-offset className="text-center text-3xl font-black text-white sm:text-4xl">{t('how.title')}</h2>
      <div data-scroll-offset className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-6">
        {/* connecting line that draws itself (md+) */}
        <svg className="pointer-events-none absolute left-0 top-9 hidden h-2 w-full md:block" viewBox="0 0 800 20" preserveAspectRatio="none" aria-hidden>
          <path className="timeline-path" d="M 130 10 H 670" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="3" strokeDasharray="8 10" strokeLinecap="round" />
        </svg>
        {steps.map((s, i) => (
          <div key={i} className="relative text-center" style={{ '--index': i } as React.CSSProperties}>
            <span
              className="relative z-10 mx-auto grid h-20 w-20 place-items-center rounded-full text-white"
              style={{ background: `linear-gradient(160deg, ${s.c}, ${s.c}aa)`, boxShadow: `0 10px 28px ${s.c}66` }}
            >
              <s.Icon className="h-10 w-10" />
              <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-white text-sm font-black text-ink">{i + 1}</span>
            </span>
            <h3 className="mt-5 text-xl font-black text-white">{s.t}</h3>
            <p className="mx-auto mt-1 max-w-[24ch] text-sm text-white/70">{s.b}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---- Section E — Parallax science banner --------------------------------- */
function SectionBanner({ onStart }: { onStart: () => void }) {
  const t = useTranslations('landing');
  return (
    <section className="relative overflow-hidden py-28">
      {/* parallax background layer */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0" data-scroll-speed="-0.18">
        <div className="absolute left-[12%] top-[20%] text-cyan-300/30">
          <Atom className="h-20 w-20 animate-floaty" />
        </div>
        <div className="absolute right-[14%] top-[30%] text-yellow-300/40">
          <StarIcon className="h-10 w-10" />
        </div>
        <div className="absolute bottom-[18%] left-[24%] text-fuchsia-300/30">
          <Lightbulb className="h-16 w-16 animate-floaty" />
        </div>
        <div className="absolute bottom-[24%] right-[20%] text-emerald-300/30">
          <Planet className="h-20 w-20" />
        </div>
      </div>

      <div data-scroll-offset className="relative mx-auto max-w-3xl px-5 text-center">
        <h2 className="relative inline-block text-3xl font-black leading-tight text-white sm:text-5xl">
          {t('banner.title')}
          <svg className="wavy-underline absolute -bottom-4 left-0 h-4 w-full" viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden>
            <path d="M2 9 Q 38 0 75 9 T 150 9 T 225 9 T 298 9" fill="none" stroke="#f39a1f" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </h2>
        <div className="mt-12">
          <button onClick={onStart} className="cta-pulse btn-primary text-xl" aria-label={t('banner.cta')}>
            {t('banner.cta')}
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Sections({ onStart }: { onStart: () => void }) {
  return (
    <>
      <SectionWhy />
      <SectionSubjects />
      <SectionLeaderboard />
      <SectionHow />
      <SectionBanner onStart={onStart} />
    </>
  );
}
