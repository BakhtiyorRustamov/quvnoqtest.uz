'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { Lesson } from '@/content/types';
import { pick } from '@/lib/i18n-config';
import { subjectHome } from '@/lib/subjectHome';
import { bigCelebration } from '@/lib/confetti';
import { useSound } from '@/components/providers/SoundProvider';

/** Completion screen (FR-QZ-8): congratulations, score, big CTA, per-item review. */
export default function Completion({
  lesson,
  results,
  locale
}: {
  lesson: Lesson;
  results: boolean[];
  locale: string;
}) {
  const t = useTranslations('lesson');
  const { play } = useSound();
  const fired = useRef(false);
  const score = results.filter(Boolean).length;
  const total = lesson.items.length;

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    play('win');
    bigCelebration();
  }, [play]);

  const mood = score >= 9 ? t('perfect') : score >= 6 ? t('good') : t('keepGoing');
  const home = subjectHome(lesson.subjectKey);

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl mx-auto px-4 text-center pb-16">
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
        className="text-6xl mt-4"
        aria-hidden
      >
        🏆
      </motion.div>
      <h1 className="font-black text-ink text-[clamp(28px,7vw,44px)] mt-2">{t('completionTitle')}</h1>
      <p className="font-extrabold text-ink/60 mt-1">{mood}</p>

      <div className="inline-flex items-baseline gap-2 mt-4 px-8 py-4 rounded-3xl bg-white shadow-card border border-ink/10">
        <span className="text-sm font-extrabold text-ink/50">{t('yourScore')}</span>
        <span className="text-4xl font-black text-brand-orange">{t('scoreOf', { score, total })}</span>
      </div>

      <div className="mt-6">
        {/* large Go-to-Subject button (FR-QZ-8) — returns to this subject's page */}
        <Link href={home?.href ?? '/dashboard'} className="btn-primary text-2xl px-12 py-5 inline-flex">
          🏠 {home ? pick(home.label, locale) : t('goDashboard')}
        </Link>
      </div>

      {/* per-item review with explanations */}
      <h2 className="font-black text-ink text-xl mt-10 mb-3">{t('reviewTitle')}</h2>
      <ol className="space-y-2.5 text-left">
        {lesson.items.map((item, i) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.06 * i }}
            className={`card p-3.5 flex gap-3 items-start border-l-8 ${results[i] ? 'border-l-brand-green' : 'border-l-error'}`}
          >
            <span
              className={`shrink-0 w-9 h-9 rounded-full grid place-items-center text-white font-black ${
                results[i] ? 'bg-brand-green' : 'bg-error'
              }`}
              aria-label={results[i] ? 'correct' : 'incorrect'}
            >
              {results[i] ? '✓' : '✗'}
            </span>
            <div>
              <div className="font-extrabold text-ink leading-snug">
                {i + 1}. {pick(item.prompt, locale)}
              </div>
              <div className="text-[15px] font-semibold text-ink/65 mt-1 leading-snug">{pick(item.explanation, locale)}</div>
            </div>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}
