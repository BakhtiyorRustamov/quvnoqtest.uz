'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { pick } from '@/lib/i18n-config';
import type { G11Question } from '@/content/g11/diagnostic';
import { getG11Lesson, g11LessonHref } from '@/content/g11/lessons';
import { useSound } from '@/components/providers/SoundProvider';
import ReviewChat from './ReviewChat';

const S: Record<string, Record<string, string>> = {
  uz: { yourAnswer: 'Sizning javobingiz', correct: 'Toʻgʻri javob', noAnswer: 'Javob berilmadi', explanation: 'Tushuntirish', more: 'Batafsil', less: 'Yopish', topic: 'Mavzu', open: 'Mavzuni ochish' },
  ru: { yourAnswer: 'Ваш ответ', correct: 'Верный ответ', noAnswer: 'Нет ответа', explanation: 'Объяснение', more: 'Подробнее', less: 'Свернуть', topic: 'Тема', open: 'Открыть тему' },
  en: { yourAnswer: 'Your answer', correct: 'Correct answer', noAnswer: 'No answer', explanation: 'Explanation', more: 'Details', less: 'Close', topic: 'Topic', open: 'Open the topic' }
};

/** Expandable per-question review (used after a test and on the past-reviews page). */
export default function ReviewList({
  slug,
  questions,
  answers,
  subjectName,
  locale
}: {
  slug: string;
  questions: G11Question[];
  answers: (number | null)[];
  subjectName: string;
  locale: string;
}) {
  const t = S[locale] ?? S.uz;
  const [open, setOpen] = useState<number | null>(null);
  const { play } = useSound();
  return (
    <ol className="space-y-2.5 text-left">
      {questions.map((q, i) => (
        <ReviewItem
          key={q.id}
          n={i + 1}
          q={q}
          slug={slug}
          chosen={answers[i] ?? null}
          open={open === i}
          onToggle={() => {
            play('pop');
            setOpen(open === i ? null : i);
          }}
          subjectName={subjectName}
          locale={locale}
          t={t}
        />
      ))}
    </ol>
  );
}

function ReviewItem({
  n,
  q,
  slug,
  chosen,
  open,
  onToggle,
  subjectName,
  locale,
  t
}: {
  n: number;
  q: G11Question;
  slug: string;
  chosen: number | null;
  open: boolean;
  onToggle: () => void;
  subjectName: string;
  locale: string;
  t: Record<string, string>;
}) {
  const ok = chosen === q.answerIndex;
  const letter = (i: number) => String.fromCharCode(65 + i);
  const lesson = getG11Lesson(q.lessonN);
  // context the AI tutor gets with the student's first question
  const context = [
    `Fan: ${subjectName}. Savol ${n}: ${pick(q.prompt, locale)}`,
    `Variantlar: ${q.choices.map((c, i) => `${letter(i)}) ${pick(c, locale)}`).join('; ')}`,
    `Oʻquvchi javobi: ${chosen === null ? 'javob bermagan' : `${letter(chosen)}) ${pick(q.choices[chosen], locale)}`}`,
    `Toʻgʻri javob: ${letter(q.answerIndex)}) ${pick(q.choices[q.answerIndex], locale)}`,
    `Tushuntirish: ${pick(q.explanation, locale)}`
  ].join('\n');

  return (
    <li className={`card overflow-hidden border-l-8 ${ok ? 'border-l-brand-green' : 'border-l-error'}`}>
      <button onClick={onToggle} aria-expanded={open} className="flex w-full items-start gap-3 p-3.5 pb-2 text-left">
        <span className={`shrink-0 w-8 h-8 rounded-full grid place-items-center text-white font-black ${ok ? 'bg-brand-green' : 'bg-error'}`}>
          {ok ? '✓' : '✗'}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-extrabold text-ink leading-snug whitespace-pre-line">
            {n}. {pick(q.prompt, locale)}
          </span>
          <span className="block text-[14px] font-semibold mt-1 leading-snug">
            <span className="text-ink/55">{t.yourAnswer}: </span>
            <span className={ok ? 'text-brand-green' : 'text-error'}>
              {chosen === null ? t.noAnswer : pick(q.choices[chosen], locale)}
            </span>
          </span>
        </span>
        <span className="shrink-0 self-center text-xs font-black text-brand-blue">
          {open ? t.less : t.more}
          <svg viewBox="0 0 24 24" className={`ml-0.5 inline h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {/* the lesson that covers this question + a small link to it */}
      {lesson && (
        <div className="flex items-center gap-2 px-3.5 pb-3 pl-[58px]">
          <span className="min-w-0 truncate text-[13px] font-bold text-ink/55">
            📖 {t.topic}: <span className="text-ink/80">{lesson.n}. {pick(lesson.title, locale)}</span>
          </span>
          <Link
            href={g11LessonHref(slug, lesson.n)}
            aria-label={t.open}
            title={t.open}
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-blue/10 text-brand-blue transition-colors hover:bg-brand-blue/20"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      )}

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink/10 px-3.5 pb-4 pt-3">
              <ul className="grid gap-1.5">
                {q.choices.map((c, ci) => {
                  const isAns = ci === q.answerIndex;
                  const isMine = ci === chosen;
                  return (
                    <li
                      key={ci}
                      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-[15px] font-bold ${
                        isAns ? 'border-brand-green/50 bg-brand-green/10 text-ink' : isMine ? 'border-error/40 bg-error/10 text-ink' : 'border-ink/10 text-ink/60'
                      }`}
                    >
                      <span className="font-black text-ink/45">{letter(ci)})</span>
                      <span className="flex-1">{pick(c, locale)}</span>
                      {isAns && <span className="text-xs font-black text-brand-green">{t.correct}</span>}
                      {isMine && !isAns && <span className="text-xs font-black text-error">{t.yourAnswer}</span>}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-3 rounded-xl bg-brand-blue/[0.07] px-3.5 py-3">
                <div className="text-xs font-black uppercase tracking-wide text-brand-blue">{t.explanation}</div>
                <p className="mt-1 text-[15px] font-semibold leading-relaxed text-ink/80">{pick(q.explanation, locale)}</p>
              </div>

              <ReviewChat context={context} locale={locale} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
