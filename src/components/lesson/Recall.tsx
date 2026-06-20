'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { Lesson } from '@/content/types';
import { pick } from '@/lib/i18n-config';
import { useRecallAudio } from '@/lib/useRecallAudio';
import { useSound } from '@/components/providers/SoundProvider';

/**
 * Recall block (FR-QZ-1): paraphrased emoji title + short explanation.
 * The read-aloud control is the LARGE Matematika book mascot with a big play
 * button (FR-TTS-2) — the only audio in the whole lesson (FR-TTS-1).
 */
export default function Recall({ lesson, locale, onStart }: { lesson: Lesson; locale: string; onStart: () => void }) {
  const t = useTranslations('lesson');
  const { play } = useSound();
  const text = `${pick(lesson.title, locale)}. ${pick(lesson.recall, locale)}`;
  const { state, toggle } = useRecallAudio(lesson.topicId, locale, text);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto px-4 text-center"
    >
      {/* unusual brand logo at the top of the quiz topic */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logoInsideQuizTopic.png"
        alt="QuvnoqTest"
        draggable={false}
        className="mx-auto mt-1 mb-1 w-24 sm:w-28 select-none drop-shadow"
      />

      <h1 className="font-black text-ink text-[clamp(24px,6vw,40px)] leading-tight mt-3 text-balance">
        {lesson.emojis.slice(0, 2)} {pick(lesson.title, locale)} {lesson.emojis.slice(-2)}
      </h1>

      <div className="card mt-5 p-5 sm:p-7 flex flex-col sm:flex-row items-center gap-5 text-left">
        {/* big play button = the read-aloud control — Uzbek only.
           Russian and English have no read-aloud (text is shown without audio). */}
        {locale === 'uz' && (
        <button
          onClick={() => {
            play('click');
            toggle();
          }}
          aria-label={state === 'playing' ? t('stop') : t('listen')}
          className="relative shrink-0 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/40 rounded-full"
        >
          <motion.img
            src="/play-button.png"
            alt=""
            aria-hidden
            draggable={false}
            className="w-[150px] sm:w-[180px] select-none drop-shadow-xl"
            animate={state === 'playing' ? { scale: [1, 1.06, 1] } : { y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: state === 'playing' ? 0.7 : 2.6 }}
          />
          {state === 'loading' && (
            <span className="absolute inset-0 grid place-items-center" aria-hidden>
              <span className="w-10 h-10 rounded-full border-[4px] border-white/50 border-t-white animate-spin" />
            </span>
          )}
          {state === 'playing' && (
            <span className="absolute inset-0 grid place-items-center" aria-hidden>
              <span className="flex items-end gap-[4px] h-8 drop-shadow">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="w-[6px] bg-white rounded-full"
                    animate={{ height: [10, 28, 12] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                  />
                ))}
              </span>
            </span>
          )}
        </button>
        )}

        <div className="flex-1">
          <p className="text-ink text-lg sm:text-xl font-bold leading-relaxed">{pick(lesson.recall, locale)}</p>
          {locale === 'uz' && state === 'error' && (
            <p className="mt-3 text-sm font-semibold text-ink/60 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
              {t('audioUnavailable')}
            </p>
          )}
        </div>
      </div>

      <motion.button
        onClick={() => {
          play('win');
          onStart();
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="btn-primary text-xl px-10 py-4 mt-7"
      >
        {t('letsStart')}
      </motion.button>
    </motion.div>
  );
}
