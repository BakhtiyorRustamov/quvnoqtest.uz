'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import AIMascotButton from '@/components/ui/AIMascotButton';
import { api } from '@/lib/client';
import { FIKR_TITLE, FIKR_TEST1_TITLE, FIKR_COUNT, FIKR_MINUTES, G1_FIKR_EXAM_KEY } from '@/content/g1-fikr/exam';
import { FIKR2_TITLE, FIKR2_COUNT, FIKR2_MINUTES, G1_FIKR2_EXAM_KEY } from '@/content/g1-fikr/exam2';
import { FIKR3_TITLE, FIKR3_COUNT, FIKR3_MINUTES, G1_FIKR3_EXAM_KEY } from '@/content/g1-fikr/exam3';
import { pick } from '@/lib/i18n-config';
import type { ProgressRow } from '@/lib/store/types';

/**
 * Grade-1 "Fikrlash qobiliyati mashqlari" subject view — a pure PRACTICE AREA
 * (no lessons). It fronts the Presidential-School-style thinking-skills test:
 * logo, what-is-this card, best result so far, and the start button.
 */
export default function FikrSubjectView() {
  const t = useTranslations();
  const locale = useLocale();
  const [progress, setProgress] = useState<ProgressRow[]>([]);

  useEffect(() => {
    api<{ progress: ProgressRow[] }>('/api/progress').then(({ data }) => setProgress(data?.progress ?? []));
  }, []);

  const attempts = progress.filter(
    (p) => p.topicKey === G1_FIKR_EXAM_KEY || p.topicKey === G1_FIKR2_EXAM_KEY || p.topicKey === G1_FIKR3_EXAM_KEY
  );
  const best = attempts.length ? Math.max(...attempts.map((p) => p.score ?? 0)) : null;

  const s = (uz: string, ru: string, en: string) => pick({ uz, ru, en }, locale);

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref="/dashboard" showLang />

      <div className="max-w-2xl mx-auto px-3">
        <div className="flex items-center gap-3 mt-4">
          <h1 className="font-black text-ink text-2xl sm:text-3xl">
            {t('common.grade', { n: 1 })} · {pick(FIKR_TITLE, locale)}
          </h1>
        </div>

        {/* what this practice area is */}
        <section className="card p-5 mt-5 text-[15px] leading-relaxed font-semibold text-ink/80">
          {s(
            'Bu — mashq maydoni. Prezident maktablari kirish sinovida bilimdan tashqari FIKRLASH QOBILIYATI ham alohida tekshiriladi: mantiqiy zanjirlar, qonuniyatlar, shakllar va boshqotirmalar. Shu yerda xuddi shunday, lekin 1-sinfga moslangan savollar ustida mashq qilamiz.',
            'Это тренировочная площадка. На вступительном экзамене Президентской школы, кроме знаний, отдельно проверяется МЫШЛЕНИЕ: логические цепочки, закономерности, фигуры и головоломки. Здесь мы тренируемся на таких же вопросах, адаптированных для 1 класса.',
            'This is a practice area. Besides knowledge, the Presidential School entrance test separately assesses THINKING SKILLS: logic chains, patterns, shapes and puzzles. Here we practise the same kind of questions, adapted for grade 1.'
          )}
        </section>

        {/* the thinking-test cards — two live tests + a coming-soon third */}
        <section className="mt-5 space-y-4">
          {/* Test 1 */}
          <Link
            href="/exam/g1-fikr"
            className="block rounded-3xl border-2 border-brand-purple/60 bg-gradient-to-br from-brand-purple/15 to-brand-blue/15 px-5 py-5 hover:-translate-y-0.5 transition-transform"
          >
            <div className="flex items-center gap-4">
              <span aria-hidden className="shrink-0 w-14 h-14 rounded-full bg-white grid place-items-center text-3xl shadow-card">📝</span>
              <div className="flex-1 leading-snug">
                <span className="block font-black text-ink text-lg">{pick(FIKR_TEST1_TITLE, locale)}</span>
                <span className="block font-bold text-ink/50 text-[13px]">
                  {s(
                    `${FIKR_COUNT} ta savol · ${FIKR_MINUTES} daqiqa · savollar har safar oʻzgaradi`,
                    `${FIKR_COUNT} вопросов · ${FIKR_MINUTES} минут · вопросы меняются каждый раз`,
                    `${FIKR_COUNT} questions · ${FIKR_MINUTES} minutes · questions change every time`
                  )}
                </span>
              </div>
              <span className="shrink-0 text-brand-purple font-black text-xl" aria-hidden>▶</span>
            </div>
          </Link>

          {/* Test 2 — logical reasoning */}
          <Link
            href="/exam/g1-fikr-2"
            className="block rounded-3xl border-2 border-brand-blue/60 bg-gradient-to-br from-brand-blue/15 to-brand-green/15 px-5 py-5 hover:-translate-y-0.5 transition-transform"
          >
            <div className="flex items-center gap-4">
              <span aria-hidden className="shrink-0 w-14 h-14 rounded-full bg-white grid place-items-center text-3xl shadow-card">📝</span>
              <div className="flex-1 leading-snug">
                <span className="block font-black text-ink text-lg">{pick(FIKR2_TITLE, locale)}</span>
                <span className="block font-bold text-ink/50 text-[13px]">
                  {s(
                    `${FIKR2_COUNT} ta savol · ${FIKR2_MINUTES} daqiqa · mantiqiy fikrlash`,
                    `${FIKR2_COUNT} вопросов · ${FIKR2_MINUTES} минут · логическое мышление`,
                    `${FIKR2_COUNT} questions · ${FIKR2_MINUTES} minutes · logical reasoning`
                  )}
                </span>
              </div>
              <span className="shrink-0 text-brand-blue font-black text-xl" aria-hidden>▶</span>
            </div>
          </Link>

          {/* Test 3 — figures + generative value logic */}
          <Link
            href="/exam/g1-fikr-3"
            className="block rounded-3xl border-2 border-brand-green/60 bg-gradient-to-br from-brand-green/15 to-brand-orange/15 px-5 py-5 hover:-translate-y-0.5 transition-transform"
          >
            <div className="flex items-center gap-4">
              <span aria-hidden className="shrink-0 w-14 h-14 rounded-full bg-white grid place-items-center text-3xl shadow-card">📝</span>
              <div className="flex-1 leading-snug">
                <span className="block font-black text-ink text-lg">{pick(FIKR3_TITLE, locale)}</span>
                <span className="block font-bold text-ink/50 text-[13px]">
                  {s(
                    `${FIKR3_COUNT} ta savol · ${FIKR3_MINUTES} daqiqa · rasmli va sonli mantiq`,
                    `${FIKR3_COUNT} вопросов · ${FIKR3_MINUTES} минут · картинки и числа`,
                    `${FIKR3_COUNT} questions · ${FIKR3_MINUTES} minutes · pictures and numbers`
                  )}
                </span>
              </div>
              <span className="shrink-0 text-brand-green font-black text-xl" aria-hidden>▶</span>
            </div>
          </Link>
        </section>

        {/* best result so far */}
        <section className="card p-5 mt-5 flex items-center gap-4">
          <span className="text-3xl" aria-hidden>
            {best === null ? '🧠' : best >= FIKR_COUNT * 0.8 ? '🏆' : best >= FIKR_COUNT * 0.5 ? '🎉' : '💪'}
          </span>
          <div className="leading-snug">
            <div className="font-black text-ink">
              {s('Eng yaxshi natijang', 'Твой лучший результат', 'Your best result')}
            </div>
            <div className="font-bold text-ink/55 text-[14px]">
              {best === null
                ? s('Hali urinish yoʻq — birinchi testni boshla!', 'Пока нет попыток — начни первый тест!', 'No attempts yet — start your first test!')
                : `${best}/${FIKR_COUNT}`}
            </div>
          </div>
        </section>

        {/* what the questions cover */}
        <section className="card p-5 mt-5">
          <h2 className="font-black text-ink text-lg mb-2">
            {s('Savollar nimalar haqida?', 'О чём вопросы?', 'What are the questions about?')}
          </h2>
          <ul className="space-y-1.5 text-[14.5px] font-semibold text-ink/75">
            <li>🔷 {s('Shakllar qonuniyatini davom ettirish', 'Продолжить закономерность фигур', 'Continuing shape patterns')}</li>
            <li>🔺 {s('Rasmda yashiringan shakllarni sanash', 'Сосчитать скрытые фигуры на рисунке', 'Counting hidden shapes in a picture')}</li>
            <li>🧩 {s('Ortiqcha shaklni topish', 'Найти лишнюю фигуру', 'Finding the odd one out')}</li>
            <li>💭 {s('Mantiqiy zanjirlar: kim balandroq, nima ogʻirroq', 'Логические цепочки: кто выше, что тяжелее', 'Logic chains: who is taller, what is heavier')}</li>
            <li>🔢 {s('Sonlar qonuniyati va hafta kunlari', 'Числовые закономерности и дни недели', 'Number patterns and days of the week')}</li>
          </ul>
        </section>
      </div>

      <AIMascotButton />
    </main>
  );
}
