'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import AIMascotButton from '@/components/ui/AIMascotButton';
import TopicRecommendation from './TopicRecommendation';
import CollapsibleGrid from './CollapsibleGrid';
import { useUser } from '@/components/providers/UserProvider';
import { api } from '@/lib/client';
import { G1_OQISH_PARTS, G1_OQISH_LESSONS, type OqishLesson } from '@/content/g1-oqish/structure';
import { getOqishLesson } from '@/content/g1-oqish/structure';
import { pick } from '@/lib/i18n-config';
import { SUBJECTS } from '@/content/taxonomy';
import type { ProgressRow } from '@/lib/store/types';

/**
 * Grade-1 "Oʻqish savodxonligi" (reading literacy) subject view. The course is a
 * PART → SECTION → LESSON tree (2 parts × 4 sections × 7–10 lessons). Lesson 1 is
 * a real, free lesson (a poem + comprehension); the rest are "coming soon"
 * placeholder buttons. Includes a recommendation card and a learned summary.
 */
export default function OqishSubjectView() {
  const t = useTranslations();
  const locale = useLocale();
  const { user, ensureUser } = useUser();
  const [progress, setProgress] = useState<ProgressRow[]>([]);

  useEffect(() => {
    ensureUser(1);
  }, [ensureUser]);

  useEffect(() => {
    api<{ progress: ProgressRow[] }>('/api/progress').then(({ data }) => setProgress(data?.progress ?? []));
  }, []);

  const completedKeys = new Set(progress.filter((p) => p.status === 'completed').map((p) => p.topicKey));
  const scoreOf = (key: string) => progress.find((p) => p.topicKey === key)?.score;
  const learned = G1_OQISH_LESSONS.filter((l) => l.built && completedKeys.has(l.key));
  const firstLesson = G1_OQISH_LESSONS[0];
  const nextLesson = G1_OQISH_LESSONS.find((l) => l.built && !completedKeys.has(l.key)) ?? firstLesson;

  const s = (uz: string, ru: string, en: string) => pick({ uz, ru, en }, locale);
  // Book-style numbering: "N-boʻlim · M-dars" (section · lesson) instead of the
  // continuous 1..34 index.
  const numLabel = (l: OqishLesson) =>
    s(
      `${l.sectionN}-boʻlim · ${l.lessonN}-dars`,
      `Раздел ${l.sectionN}, урок ${l.lessonN}`,
      `Section ${l.sectionN}, lesson ${l.lessonN}`
    );

  const renderLesson = (l: OqishLesson, i: number) => {
    const delay = Math.min(i * 0.02, 0.4);
    if (l.built) {
      const done = completedKeys.has(l.key);
      return (
        <motion.div key={l.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
          <Link
            href={`/lesson/${l.key}`}
            className="card h-full flex items-center gap-2 px-3 py-2.5 hover:-translate-y-0.5 transition-transform"
          >
            <span
              title={numLabel(l)}
              className={`shrink-0 w-8 h-8 rounded-full grid place-items-center font-black text-white text-sm ${done ? 'bg-brand-green' : 'bg-brand-blue'}`}
            >
              {done ? '✓' : l.lessonN}
            </span>
            <span className="flex-1 font-extrabold text-ink text-[12.5px] leading-snug">{pick(l.title, locale)}</span>
            <span className="shrink-0 text-brand-orange font-black" aria-hidden>▶</span>
          </Link>
        </motion.div>
      );
    }
    return (
      <motion.div
        key={l.key}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        title={`${numLabel(l)} · ${t('common.comingSoon')}`}
        aria-label={t('common.comingSoon')}
        className="card h-full flex items-center gap-2 px-3 py-2.5 opacity-70 cursor-default"
      >
        <span className="shrink-0 w-8 h-8 rounded-full grid place-items-center font-black text-white text-sm bg-ink/30">{l.lessonN}</span>
        <span className="flex-1 font-extrabold text-ink/70 text-[12.5px] leading-snug">{pick(l.title, locale)}</span>
        <span className="shrink-0 text-base" aria-hidden>🔒</span>
      </motion.div>
    );
  };

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref="/dashboard" showLang />

      <div className="max-w-3xl mx-auto px-3">
        <div className="flex items-center gap-3 mt-4">
          <h1 className="font-black text-ink text-2xl sm:text-3xl">
            {t('common.grade', { n: 1 })} · {pick(SUBJECTS['oqish-savodxonligi'].name, locale)}
          </h1>
        </div>

        {/* what this subject is */}
        <section className="card p-5 mt-5 text-[15px] leading-relaxed font-semibold text-ink/80">
          {s(
            'Oʻqish savodxonligi — sheʼr va hikoyalarni oʻqib, tushunib, ular haqidagi savollarga javob beramiz. Har bir dars bitta asar atrofida quriladi: avval matnni oʻqiymiz, soʻng maʼnosini, soʻzlarini va gʻoyasini oʻrganamiz.',
            'Читательская грамотность — читаем стихи и рассказы, понимаем их и отвечаем на вопросы. Каждый урок строится вокруг одного произведения: сначала читаем текст, затем разбираем смысл, слова и идею.',
            'Reading literacy — we read poems and stories, understand them and answer questions. Each lesson is built around one text: first we read it, then we explore its meaning, words and message.'
          )}
        </section>

        {/* recommendation / continue */}
        <section className="mt-5">
          <Link
            href={`/lesson/${nextLesson.key}`}
            className="block rounded-3xl border-2 border-brand-green/60 bg-gradient-to-br from-brand-green/15 to-brand-blue/15 px-5 py-5 hover:-translate-y-0.5 transition-transform"
          >
            <div className="flex items-center gap-4">
              <span className="shrink-0 w-14 h-14 rounded-full bg-white grid place-items-center text-3xl shadow-card" aria-hidden>📖</span>
              <div className="flex-1 leading-snug">
                <span className="block font-black text-ink text-lg">
                  {learned.length ? s('Davom etish', 'Продолжить', 'Continue') : s('Birinchi darsdan boshlash', 'Начать с первого урока', 'Start with lesson 1')}
                </span>
                <span className="block font-bold text-ink/55 text-[13px]">
                  {numLabel(nextLesson)} · {pick(nextLesson.title, locale)}
                </span>
              </div>
              <span className="shrink-0 text-brand-green font-black text-xl" aria-hidden>▶</span>
            </div>
          </Link>
        </section>

        {/* learned so far */}
        {learned.length > 0 && (
          <section className="mt-6">
            <h2 className="font-black text-ink/70 text-lg mb-2">📒 {t('dashboard.learnedTitle')}</h2>
            <div className="flex flex-wrap gap-2">
              {learned.map((l) => (
                <Link
                  key={l.key}
                  href={`/lesson/${l.key}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-green/15 border-2 border-brand-green/50 px-3 py-1.5 font-extrabold text-ink hover:bg-brand-green/25 transition-colors"
                >
                  ✅ {l.sectionN}.{l.lessonN} {pick(l.title, locale)}
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white text-brand-purple border border-brand-purple/30">
                    ⭐ {scoreOf(l.key) ?? 0}/10
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* parts → sections → lessons */}
        <section className="mt-8 space-y-8">
          {G1_OQISH_PARTS.map((part, pi) => (
            <div key={pi}>
              <h2 className="font-black text-ink text-xl mb-3 flex items-center gap-2">
                <span className="inline-grid place-items-center w-8 h-8 rounded-full bg-brand-purple/15 text-brand-purple text-sm">{pi + 1}</span>
                {pick(part.title, locale)}
              </h2>
              <div className="space-y-5">
                {part.sections.map((sec, si) => (
                  <div key={si}>
                    <h3 className="font-black text-ink/60 text-sm uppercase tracking-wide mb-2">
                      {si + 1}-boʻlim · {pick(sec.title, locale)}
                    </h3>
                    <CollapsibleGrid>{sec.lessons.map((l, i) => renderLesson(l, i))}</CollapsibleGrid>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* subscribe / more coming hint */}
        <section className="card p-5 mt-8 text-center">
          <div className="text-3xl" aria-hidden>🔜</div>
          <p className="font-bold text-ink/70 mt-1">
            {s(
              'Yangi darslar tez orada qoʻshiladi. Hozircha 1-dars bepul ochiq!',
              'Новые уроки скоро появятся. Пока урок 1 доступен бесплатно!',
              'New lessons are coming soon. For now, lesson 1 is free!'
            )}
          </p>
        </section>
      

        {/* personalized focused-review recommendation (same as maths) */}
        <TopicRecommendation
          progress={progress}
          name={user?.name ?? null}
          isPaid={user?.isPaid ?? false}
          locale={locale}
          getTopicMeta={getOqishLesson}
          startHref="/lesson/g1-oqish-01"
        />
      </div>

      <AIMascotButton />
    </main>
  );
}
