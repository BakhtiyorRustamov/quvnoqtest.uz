'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import { pick } from '@/lib/i18n-config';
import { getG11Subject, g11SubjectHref } from '@/content/g11/subjects';
import { buildG11Diagnostic, G11_DIAG_COUNT, G11_DIAG_MINUTES } from '@/content/g11/diagnostic';
import { useSound } from '@/components/providers/SoundProvider';
import { hapticNotify, hapticSelect } from '@/lib/tg';
import { addAttempt, addFlags } from '@/lib/g11Store';
import ReviewList from './ReviewList';
import ScoreRing from './ScoreRing';
import ArrowBack from './ArrowBack';
import QuestionSketchpad from './QuestionSketchpad';
import { useTgScrollLock } from './useTgScrollLock';

type Phase = 'quiz' | 'done';

const S: Record<string, Record<string, string>> = {
  uz: {
    start: 'Testni boshlash', minutes: 'daqiqa', questions: 'ta savol', question: 'Savol', of: '/',
    finish: 'Yakunlash', next: 'Keyingi', back: 'Orqaga', yourScore: 'Sizning natijangiz', timeUp: 'Vaqt tugadi!',
    review: 'Savollar tahlili', yourAnswer: 'Sizning javobingiz', correct: 'Toʻgʻri javob', noAnswer: 'Javob berilmadi',
    retry: 'Qaytadan ishlash', home: 'Fan sahifasi', explanation: 'Tushuntirish', more: 'Batafsil', less: 'Yopish'
  },
  ru: {
    start: 'Начать тест', minutes: 'минут', questions: 'вопросов', question: 'Вопрос', of: 'из',
    finish: 'Завершить', next: 'Далее', back: 'Назад', yourScore: 'Ваш результат', timeUp: 'Время вышло!',
    review: 'Разбор вопросов', yourAnswer: 'Ваш ответ', correct: 'Верный ответ', noAnswer: 'Нет ответа',
    retry: 'Пройти заново', home: 'Страница предмета', explanation: 'Объяснение', more: 'Подробнее', less: 'Свернуть'
  },
  en: {
    start: 'Start the test', minutes: 'minutes', questions: 'questions', question: 'Question', of: 'of',
    finish: 'Finish', next: 'Next', back: 'Back', yourScore: 'Your score', timeUp: "Time's up!",
    review: 'Question review', yourAnswer: 'Your answer', correct: 'Correct answer', noAnswer: 'No answer',
    retry: 'Try again', home: 'Subject page', explanation: 'Explanation', more: 'Details', less: 'Close'
  }
};

function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Grade-11 "Sinov testi" — same layout as the grade-1 Matematika mock
 * test (ExamPlayer), plus a ruled scratch notebook under each question and a
 * whole-page cursor / pen / eraser layer whose drawings are kept per question.
 * Dummy content. Finished attempts + lessons to revisit are kept on the device.
 */
export default function G11ExamPlayer({ slug }: { slug: string }) {
  const locale = useLocale();
  const t = S[locale] || S.uz;
  const subject = getG11Subject(slug);
  const backHref = g11SubjectHref(slug);
  const count = G11_DIAG_COUNT;
  const minutes = G11_DIAG_MINUTES;

  const [phase, setPhase] = useState<Phase>('quiz');
  const [questions] = useState(() => buildG11Diagnostic(slug));
  const [idx, setIdxRaw] = useState(0);
  const [dir, setDir] = useState(1); // slide direction for the question animation
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(count).fill(null));
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [attempt, setAttempt] = useState(0); // remounts the sketchpad (fresh drawings) on retry
  const pageRef = useRef<HTMLElement | null>(null);

  const { play } = useSound();
  const saved = useRef(false);
  const { scrollerRef, locked, scrollerClass, scrollToTop } = useTgScrollLock();

  // finish: remember the attempt + flag the lessons behind wrong answers
  const finish = useCallback(() => {
    setPhase('done');
    if (saved.current) return;
    saved.current = true;
    const score = questions.filter((q, i) => answers[i] === q.answerIndex).length;
    addAttempt(slug, { at: Date.now(), score, total: questions.length, answers });
    addFlags(
      slug,
      questions.filter((q, i) => answers[i] !== q.answerIndex).map((q) => q.lessonN)
    );
    play('win');
    hapticNotify(score >= questions.length / 2 ? 'success' : 'warning');
    scrollToTop(false);
  }, [answers, questions, slug, play, scrollToTop]);

  useEffect(() => {
    if (phase !== 'quiz') return;
    if (secondsLeft <= 0) {
      finish();
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, secondsLeft, finish]);

  // jump to the top when the question changes so the prompt is in view
  useEffect(() => {
    if (phase === 'quiz') scrollToTop(true);
  }, [idx, phase, scrollToTop]);

  function setIdx(n: number) {
    setDir(n >= idx ? 1 : -1);
    setIdxRaw(n);
  }
  // swipe left / right between questions (cursor mode; pen mode blocks touches)
  const swipe = useRef<{ x: number; y: number; t: number } | null>(null);
  function onTouchStart(e: React.TouchEvent) {
    // pen / eraser active → touches are drawing, never navigation
    if (document.documentElement.classList.contains('sketch-lock')) {
      swipe.current = null;
      return;
    }
    const p = e.touches[0];
    swipe.current = e.touches.length === 1 ? { x: p.clientX, y: p.clientY, t: Date.now() } : null;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const s0 = swipe.current;
    swipe.current = null;
    if (!s0) return;
    const p = e.changedTouches[0];
    const dx = p.clientX - s0.x;
    const dy = p.clientY - s0.y;
    if (Date.now() - s0.t > 700 || Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
    if (dx < 0 && idx < count - 1) {
      play('pop');
      setIdx(idx + 1);
    } else if (dx > 0 && idx > 0) {
      play('pop');
      setIdx(idx - 1);
    }
  }

  function choose(ci: number) {
    const next = [...answers];
    next[idx] = ci;
    setAnswers(next);
    play('click');
    hapticSelect();
  }

  function retry() {
    saved.current = false;
    play('pop');
    setAnswers(Array(count).fill(null));
    setIdxRaw(0);
    setSecondsLeft(minutes * 60);
    setAttempt((a) => a + 1);
    setPhase('quiz');
  }

  const subjectName = subject ? pick(subject.name, locale) : '';

  /* --------------------------- QUIZ --------------------------- */
  if (phase === 'quiz') {
    const q = questions[idx];
    const low = secondsLeft <= 60;
    return (
      <div ref={scrollerRef} className={scrollerClass} style={locked ? { paddingTop: 'var(--app-top)', WebkitOverflowScrolling: 'touch' } : undefined}>
      <main ref={pageRef} className="relative min-h-screen pb-24" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <BackBar backHref={backHref} showLang />
        <div className="max-w-2xl mx-auto px-4">
          {/* timer + progress */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-sm font-black text-ink/60">
              {t.question} {idx + 1} {t.of} {count}
            </span>
            <span className={`text-lg font-black tabular-nums px-3 py-1 rounded-full ${low ? 'bg-error/15 text-error animate-pulse' : 'bg-brand-blue/10 text-brand-blue'}`}>
              ⏱️ {fmt(secondsLeft)}
            </span>
          </div>
          <div className="h-2 rounded-full bg-ink/10 mt-2 overflow-hidden">
            <div className="h-full bg-brand-green transition-all" style={{ width: `${(idx / count) * 100}%` }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 48 * dir }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -48 * dir }}
              transition={{ duration: 0.22 }}
            >
              <div className="card p-5 mt-4">
                <p className="font-black text-ink text-xl leading-snug whitespace-pre-line">{pick(q.prompt, locale)}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {q.choices.map((c, ci) => (
                  <button
                    key={ci}
                    onClick={() => choose(ci)}
                    className={`card px-4 py-4 text-left font-extrabold text-lg text-ink hover:-translate-y-0.5 transition-transform ${
                      answers[idx] === ci ? 'ring-4 ring-brand-blue bg-brand-blue/10' : ''
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`mr-2.5 inline-grid h-7 w-7 shrink-0 place-items-center rounded-full border-[2.5px] align-middle transition-colors ${
                        answers[idx] === ci ? 'border-ink' : 'border-ink/35'
                      }`}
                    >
                      {answers[idx] === ci && <span className="h-3.5 w-3.5 rounded-full bg-ink" />}
                    </span>
                    <span className="mr-1 font-black text-ink/55">{String.fromCharCode(65 + ci)})</span>
                    {pick(c, locale)}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* back / forward navigation between questions */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                play('pop');
                setIdx(Math.max(0, idx - 1));
              }}
              disabled={idx === 0}
              className="btn-ghost px-6 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← {t.back}
            </button>
            {idx < count - 1 ? (
              <button
                onClick={() => {
                  play('pop');
                  setIdx(idx + 1);
                }}
                className="btn-primary px-8 py-3"
              >
                {t.next} →
              </button>
            ) : (
              <button onClick={finish} className="btn-primary px-8 py-3">
                ✓ {t.finish}
              </button>
            )}
          </div>

          {/* question numbers — round buttons to jump straight to a question */}
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {questions.map((_, qi) => (
              <button
                key={qi}
                onClick={() => {
                  if (qi === idx) return;
                  play('pop');
                  setIdx(qi);
                }}
                aria-label={`${t.question} ${qi + 1}`}
                aria-current={qi === idx ? 'step' : undefined}
                className={`grid h-9 w-9 place-items-center rounded-full text-[13px] font-black tabular-nums transition-all active:scale-90 ${
                  qi === idx
                    ? 'bg-brand-blue text-white shadow-[0_3px_0_#0f6a92] scale-110'
                    : answers[qi] !== null
                      ? 'bg-brand-green/20 text-[#5b8a1f] border-2 border-brand-green/60 shadow-[0_2px_0_rgba(141,198,63,0.45)]'
                      : 'bg-white text-ink/60 border-2 border-ink/12 shadow-[0_2px_0_rgba(30,58,95,0.12)] hover:border-brand-blue/50'
                }`}
              >
                {qi + 1}
              </button>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button onClick={finish} className="btn-ghost text-sm px-5 py-2.5">
              {t.finish} →
            </button>
          </div>

          {/* scratch notebook (spiral + ruled lines) — draw on it with the pen */}
          <section className="mt-8">
            <div className="relative rounded-2xl border border-ink/10 shadow-card overflow-hidden">
              <div
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-9 z-10"
                style={{
                  background:
                    'radial-gradient(circle at 14px 17px, #fff 0 4px, #8E9AA6 4px 6.5px, transparent 6.5px), linear-gradient(#EDF1F4,#EDF1F4)',
                  backgroundSize: '100% 34px, 100% 100%'
                }}
              />
              <div className="notebook relative pl-[56px] pr-4 pt-[6px] min-h-[min(60vh,520px)]">
                {/* doodle sits in the margin strip between the spiral and the red line */}
                <PencilDoodle />
              </div>
            </div>
          </section>
        </div>

        <QuestionSketchpad key={attempt} containerRef={pageRef} pageKey={idx} locale={locale} />
      </main>
      </div>
    );
  }

  /* --------------------------- DONE --------------------------- */
  const correctFlags = questions.map((q, i) => answers[i] === q.answerIndex);
  const score = correctFlags.filter(Boolean).length;
  const timedOut = secondsLeft <= 0;

  return (
      <div ref={scrollerRef} className={scrollerClass} style={locked ? { paddingTop: 'var(--app-top)', WebkitOverflowScrolling: 'touch' } : undefined}>
    <main className="min-h-screen pb-16">
      <BackBar backHref={backHref} showLang />
      <div className="max-w-2xl mx-auto px-4 text-center">
        {timedOut && <p className="font-black text-error mt-4">{t.timeUp}</p>}
        <ScoreRing score={score} total={count} label={t.yourScore} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.35 }}
          className="flex flex-wrap justify-center gap-3 mt-6"
        >
          <button onClick={retry} className="btn-primary text-lg px-8 py-4">
            🔄 {t.retry}
          </button>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35 }}
          className="font-black text-ink text-xl mt-10 mb-3 text-left"
        >
          {t.review}
        </motion.h2>
        <ReviewList slug={slug} questions={questions} answers={answers} subjectName={subjectName} locale={locale} revealDelay={1.4} />

        <div className="mt-8 flex justify-center">
          <ArrowBack href={backHref} label={t.home} />
        </div>
      </div>
    </main>
    </div>
  );
}

/* Vertical zigzag + pencil in the notebook margin (between spiral and red line). */
function PencilDoodle() {
  return (
    <svg
      viewBox="0 0 20 240"
      className="pointer-events-none absolute left-[37px] top-6 h-[240px] w-[18px] select-none opacity-60"
      aria-hidden
    >
      <path
        d="M10 4 L16 12 L4 22 L16 32 L4 42 L16 52 L4 62 L16 72 L4 82 L16 92 L4 102 L16 112 L10 120"
        fill="none"
        stroke="#8B7FD6"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* pencil, tip up, touching the end of the line */}
      <polygon points="10,122 5,136 15,136" fill="#E9C59A" />
      <polygon points="10,122 8.2,127 11.8,127" fill="#2E2A4F" />
      <rect x="5" y="136" width="10" height="92" rx="1.5" fill="#3E3A78" />
      <rect x="5" y="136" width="3.4" height="92" rx="1.5" fill="#5A55A0" />
      <rect x="5" y="224" width="10" height="10" rx="1.5" fill="#2E2A5A" />
    </svg>
  );
}
