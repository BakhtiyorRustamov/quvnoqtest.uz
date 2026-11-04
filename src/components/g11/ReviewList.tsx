'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { pick } from '@/lib/i18n-config';
import { partCorrect, questionPoints, type G11Answer, type G11Question } from '@/content/g11/diagnostic';
import { getG11Lesson, g11LessonHref, g11LessonLabel } from '@/content/g11/lessons';
import { useSound } from '@/components/providers/SoundProvider';
import ReviewChat from './ReviewChat';

const S: Record<string, Record<string, string>> = {
  uz: { ai: 'SI', aiNone: 'SI tekshiruvi oʻtkazilmadi.', aiNote: 'Baho sunʼiy intellekt (SI) tomonidan berildi — u xato qilishi mumkin.', yourAnswer: 'Sizning javobingiz', correct: 'Toʻgʻri javob', noAnswer: 'Javob berilmadi', explanation: 'Izoh', more: 'Batafsil', less: 'Yopish', topic: 'Mavzu', open: 'Mavzuni ochish' },
  ru: { ai: 'ИИ', aiNone: 'Проверка ИИ не проводилась.', aiNote: 'Оценку выставил искусственный интеллект (ИИ) — возможны ошибки.', yourAnswer: 'Ваш ответ', correct: 'Верный ответ', noAnswer: 'Нет ответа', explanation: 'Пояснение', more: 'Подробнее', less: 'Свернуть', topic: 'Тема', open: 'Открыть тему' },
  en: { ai: 'AI', aiNone: 'The AI check was not run.', aiNote: 'Scored by artificial intelligence (AI) — it can make mistakes.', yourAnswer: 'Your answer', correct: 'Correct answer', noAnswer: 'No answer', explanation: 'Note', more: 'Details', less: 'Close', topic: 'Topic', open: 'Open the topic' }
};

/** nearest scrolling ancestor (the page itself when none) */
function scrollParent(el: HTMLElement): HTMLElement | null {
  for (let p = el.parentElement; p; p = p.parentElement) {
    const oy = getComputedStyle(p).overflowY;
    if ((oy === 'auto' || oy === 'scroll') && p.scrollHeight > p.clientHeight) return p;
  }
  return null;
}
/** while cards above open/close (animated), keep the clicked card at the same spot on screen */
function keepInPlace(el: HTMLElement) {
  const top0 = el.getBoundingClientRect().top;
  const sp = scrollParent(el);
  const end = performance.now() + 450;
  const step = () => {
    const d = el.getBoundingClientRect().top - top0;
    if (Math.abs(d) > 0.5) {
      if (sp) sp.scrollTop += d;
      else window.scrollBy(0, d);
    }
    if (performance.now() < end) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/** Expandable per-question review (used after a test and on the past-reviews page). */
export default function ReviewList({
  slug,
  questions,
  answers,
  subjectName,
  locale,
  revealDelay
}: {
  slug: string;
  questions: G11Question[];
  answers: G11Answer[];
  subjectName: string;
  locale: string;
  /** when set, the cards fade in one after another starting at this delay (s) */
  revealDelay?: number;
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
          onToggle={(el) => {
            play('pop');
            keepInPlace(el);
            setOpen(open === i ? null : i);
          }}
          subjectName={subjectName}
          locale={locale}
          t={t}
          delay={revealDelay === undefined ? undefined : revealDelay + Math.min(i * 0.05, 1.2)}
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
  t,
  delay
}: {
  delay?: number;
  n: number;
  q: G11Question;
  slug: string;
  chosen: G11Answer;
  open: boolean;
  onToggle: (el: HTMLElement) => void;
  subjectName: string;
  locale: string;
  t: Record<string, string>;
}) {
  const pts = questionPoints(q, chosen);
  const ok = q.essay ? pts.got >= pts.max * 0.6 : pts.got === pts.max;
  const half = !ok && pts.got > 0;
  const letter = (i: number) => String.fromCharCode(65 + i);
  const typed = Array.isArray(chosen) ? chosen : [];
  const pick1 = typeof chosen === 'number' ? chosen : null;
  const essayRes = q.essay && typed[2] ? (JSON.parse(typed[2]) as { score: number; mazmun: number; tuzilish: number; til: number; imlo: number; comment: string; errors: string[] }) : null;
  const answerText = q.essay
    ? typed[0]?.trim()
      ? `${typed[0].trim().slice(0, 90)}${typed[0].trim().length > 90 ? '…' : ''}${essayRes ? ` — ${essayRes.score}/${pts.max}` : ''}`
      : null
    : q.parts
    ? !typed.some((x) => x?.trim())
      ? null
      : q.parts.map((p, i) => `${p.label}) ${typed[i]?.trim() || '—'}`).join('   ')
    : pick1 === null
      ? null
      : pick(q.choices[pick1], locale);
  const lesson = getG11Lesson(q.lessonN, slug);
  // context the AI tutor gets with the student's first question
  const context = [
    `Fan: ${subjectName}. Savol ${n}: ${pick(q.prompt, locale)}`,
    q.parts
      ? q.parts.map((p, i) => `${pick(p.prompt, locale)} Oʻquvchi javobi: ${typed[i]?.trim() || 'javob bermagan'}. Toʻgʻri javob: ${p.answer}.`).join('\n')
      : [
          `Variantlar: ${q.choices.map((c, i) => `${letter(i)}) ${pick(c, locale)}`).join('; ')}`,
          `Oʻquvchi javobi: ${pick1 === null ? 'javob bermagan' : `${letter(pick1)}) ${pick(q.choices[pick1], locale)}`}`,
          `Toʻgʻri javob: ${letter(q.answerIndex)}) ${pick(q.choices[q.answerIndex], locale)}`
        ].join('\n'),
    `Tushuntirish: ${pick(q.explanation, locale)}`
  ].join('\n');

  return (
    <motion.li
      initial={delay === undefined ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay ?? 0, duration: 0.3 }}
      className={`card overflow-hidden border-l-8 ${ok ? 'border-l-brand-green' : half ? '' : 'border-l-error'}`}
      style={half ? { borderLeftColor: '#F5A524' } : undefined}
    >
      <button onClick={(e) => onToggle(e.currentTarget.closest('li') as HTMLElement)} aria-expanded={open} aria-label={open ? t.less : t.more} className="flex w-full items-start gap-3 p-3.5 text-left">
        <span className={`shrink-0 w-8 h-8 rounded-full grid place-items-center text-white font-black ${ok ? 'bg-brand-green' : half ? '' : 'bg-error'}`} style={half ? { background: '#F5A524' } : undefined}>
          {ok ? '✓' : half ? '½' : '✗'}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-extrabold text-ink leading-snug whitespace-pre-line">
            {n}. {pick(q.prompt, locale)}
          </span>
          <span className="block text-[14px] font-semibold mt-1 leading-snug">
            <span className="text-ink/55">{t.yourAnswer}: </span>
            <span className={ok ? 'text-brand-green' : 'text-error'}>
              {answerText === null ? t.noAnswer : answerText}
            </span>
          </span>
        </span>
        <span
          aria-hidden
          className={`grid h-10 w-10 shrink-0 self-center place-items-center rounded-full bg-brand-blue/10 text-brand-blue transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>


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
              {q.figure && <div className="mb-3 flex justify-center" dangerouslySetInnerHTML={{ __html: q.figure }} />}
              {q.essay && typed[0]?.trim() && (
                <div className="mb-3 rounded-xl border border-ink/10 px-3 py-2">
                  <p className="whitespace-pre-line text-[15px] font-semibold leading-relaxed text-ink/80">{typed[0]}</p>
                  {essayRes ? (
                    <div className="mt-2 border-t border-ink/10 pt-2 text-[14px] font-bold text-ink/70">
                      <div className="font-black text-brand-blue">{t.ai}: {essayRes.score} / {pts.max} · {q.id.startsWith('g11-rus') ? `Содержание ${essayRes.mazmun} · Композиция ${essayRes.tuzilish} · Речь ${essayRes.til} · Грамотность ${essayRes.imlo}` : `Mazmun ${essayRes.mazmun} · Tuzilish ${essayRes.tuzilish} · Til ${essayRes.til} · Imlo ${essayRes.imlo}`}</div>
                      <p className="mt-1 font-semibold">{essayRes.comment}</p>
                      {essayRes.errors.length > 0 && <ul className="mt-1 list-disc pl-5 font-semibold">{essayRes.errors.map((x, k) => <li key={k}>{x}</li>)}</ul>}
                      <p className="mt-1.5 text-xs font-bold text-ink/45">ⓘ {t.aiNote}</p>
                    </div>
                  ) : (
                    <p className="mt-2 text-[13px] font-bold text-error">{t.aiNone}</p>
                  )}
                </div>
              )}
              {q.parts && (
                <ul className="grid gap-1.5">
                  {q.parts.map((p, pi) => {
                    const good = partCorrect(typed[pi], p.answer);
                    return (
                      <li key={pi} className={`rounded-xl border px-3 py-2 text-[15px] font-bold ${good ? 'border-brand-green/50 bg-brand-green/10' : 'border-error/40 bg-error/10'}`}>
                        <span className="block text-ink/80">{pick(p.prompt, locale)}</span>
                        <span className="mt-0.5 block text-[14px]">
                          <span className="text-ink/55">{t.yourAnswer}: </span>
                          <span className={good ? 'text-brand-green' : 'text-error'}>{typed[pi]?.trim() || t.noAnswer}</span>
                          <span className="text-ink/55"> · {t.correct}: </span>
                          <span className="font-black text-brand-green">{p.answer}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
              <ul className="grid gap-1.5">
                {q.choices.map((c, ci) => {
                  const isAns = ci === q.answerIndex;
                  const isMine = ci === pick1;
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
                {/* the lesson that covers this question + a small link to it */}
                {lesson && (
                  <div className="mt-2.5 flex items-center gap-2 border-t border-brand-blue/15 pt-2.5">
                    <span className="min-w-0 truncate text-[13px] font-bold text-ink/55">
                      📖 {t.topic}: <span className="text-ink/80">{g11LessonLabel(lesson)}. {pick(lesson.title, locale)}</span>
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
              </div>

              <ReviewChat context={context} locale={locale} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
