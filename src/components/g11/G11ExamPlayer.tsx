'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import { pick } from '@/lib/i18n-config';
import { getG11Subject, g11SubjectHref } from '@/content/g11/subjects';
import { buildG11Diagnostic, G11_DIAG_COUNT, G11_DIAG_MINUTES, G11_DIAG_INTRO, G11_DIAG_TITLE } from '@/content/g11/diagnostic';
import QuestionSketchpad from './QuestionSketchpad';

type Phase = 'intro' | 'quiz' | 'done';

const S: Record<string, Record<string, string>> = {
  uz: {
    start: 'Testni boshlash', minutes: 'daqiqa', questions: 'ta savol', question: 'Savol', of: '/',
    finish: 'Yakunlash', next: 'Keyingi', back: 'Orqaga', yourScore: 'Sizning natijangiz', timeUp: 'Vaqt tugadi!',
    review: 'Savollar tahlili', yourAnswer: 'Sizning javobingiz', correct: 'Toʻgʻri javob', noAnswer: 'Javob berilmadi',
    retry: 'Qaytadan ishlash', home: 'Fan sahifasi', notebook: 'Qoralama daftar',
    notebookHint: 'Qalamni tanlang va shu yerda (yoki sahifaning istalgan joyida) yozing. Har bir savolning yozuvlari alohida saqlanadi.'
  },
  ru: {
    start: 'Начать тест', minutes: 'минут', questions: 'вопросов', question: 'Вопрос', of: 'из',
    finish: 'Завершить', next: 'Далее', back: 'Назад', yourScore: 'Ваш результат', timeUp: 'Время вышло!',
    review: 'Разбор вопросов', yourAnswer: 'Ваш ответ', correct: 'Верный ответ', noAnswer: 'Нет ответа',
    retry: 'Пройти заново', home: 'Страница предмета', notebook: 'Черновик',
    notebookHint: 'Выберите ручку и пишите здесь (или в любом месте страницы). Записи каждого вопроса хранятся отдельно.'
  },
  en: {
    start: 'Start the test', minutes: 'minutes', questions: 'questions', question: 'Question', of: 'of',
    finish: 'Finish', next: 'Next', back: 'Back', yourScore: 'Your score', timeUp: "Time's up!",
    review: 'Question review', yourAnswer: 'Your answer', correct: 'Correct answer', noAnswer: 'No answer',
    retry: 'Try again', home: 'Subject page', notebook: 'Scratch notebook',
    notebookHint: 'Pick the pen and write here (or anywhere on the page). Each question keeps its own notes.'
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
 * Dummy content: results are shown but not saved yet.
 */
export default function G11ExamPlayer({ slug }: { slug: string }) {
  const locale = useLocale();
  const t = S[locale] || S.uz;
  const subject = getG11Subject(slug);
  const backHref = g11SubjectHref(slug);
  const count = G11_DIAG_COUNT;
  const minutes = G11_DIAG_MINUTES;

  const [phase, setPhase] = useState<Phase>('intro');
  const [questions] = useState(() => buildG11Diagnostic(slug));
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(count).fill(null));
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [attempt, setAttempt] = useState(0); // remounts the sketchpad (fresh drawings) on retry
  const pageRef = useRef<HTMLElement | null>(null);

  const finish = useCallback(() => setPhase('done'), []);

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
    if (phase === 'quiz') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [idx, phase]);

  function choose(ci: number) {
    const next = [...answers];
    next[idx] = ci;
    setAnswers(next);
  }

  function retry() {
    setAnswers(Array(count).fill(null));
    setIdx(0);
    setSecondsLeft(minutes * 60);
    setAttempt((a) => a + 1);
    setPhase('quiz');
  }

  const subjectName = subject ? pick(subject.name, locale) : '';
  const accent = subject?.color ?? '#1FA7E0';

  /* --------------------------- INTRO --------------------------- */
  if (phase === 'intro') {
    return (
      <main className="min-h-screen pb-16">
        <BackBar backHref={backHref} showLang />
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mt-6">
            <div className="inline-block rounded-full px-4 py-1.5 text-sm font-extrabold text-white" style={{ background: accent }}>
              11 · {subjectName}
            </div>
            <h1 className="font-black text-ink text-[clamp(24px,6vw,38px)] mt-3">{pick(G11_DIAG_TITLE, locale)}</h1>
          </div>
          <div className="card p-5 mt-6 text-[15.5px] leading-relaxed font-semibold text-ink/80">{pick(G11_DIAG_INTRO, locale)}</div>
          <div className="flex justify-center gap-3 mt-5">
            <div className="card px-5 py-3 text-center">
              <div className="text-3xl font-black text-brand-orange">{count}</div>
              <div className="text-xs font-bold text-ink/50">{t.questions}</div>
            </div>
            <div className="card px-5 py-3 text-center">
              <div className="text-3xl font-black text-brand-blue">{minutes}</div>
              <div className="text-xs font-bold text-ink/50">{t.minutes}</div>
            </div>
          </div>
          <div className="mt-7 text-center">
            <button onClick={() => setPhase('quiz')} className="btn-primary text-2xl px-12 py-5 inline-flex">
              ⏱️ {t.start}
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* --------------------------- QUIZ --------------------------- */
  if (phase === 'quiz') {
    const q = questions[idx];
    const low = secondsLeft <= 60;
    return (
      <main ref={pageRef} className="relative min-h-screen pb-24">
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
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
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
              onClick={() => setIdx(Math.max(0, idx - 1))}
              disabled={idx === 0}
              className="btn-ghost px-6 py-3 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← {t.back}
            </button>
            {idx < count - 1 ? (
              <button onClick={() => setIdx(idx + 1)} className="btn-primary px-8 py-3">
                {t.next} →
              </button>
            ) : (
              <button onClick={finish} className="btn-primary px-8 py-3">
                ✓ {t.finish}
              </button>
            )}
          </div>

          {/* question dots — tap any to jump; answered ones are filled */}
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {questions.map((_, qi) => (
              <button
                key={qi}
                onClick={() => setIdx(qi)}
                aria-label={`${t.question} ${qi + 1}`}
                className={`w-6 h-6 rounded-full text-[10px] font-black grid place-items-center transition-colors ${
                  qi === idx
                    ? 'bg-brand-blue text-white'
                    : answers[qi] !== null
                      ? 'bg-brand-green/25 text-brand-green'
                      : 'bg-ink/10 text-ink/50'
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
            <h2 className="font-black text-ink/70 text-lg mb-2">
              📒 {t.notebook} <span className="text-ink/40 text-sm font-extrabold">· {t.question} {idx + 1}</span>
            </h2>
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
                <p className="text-[13px] font-bold leading-[var(--line-h)] text-ink/35 select-none">{t.notebookHint}</p>
              </div>
            </div>
          </section>
        </div>

        <QuestionSketchpad key={attempt} containerRef={pageRef} pageKey={idx} locale={locale} />
      </main>
    );
  }

  /* --------------------------- DONE --------------------------- */
  const correctFlags = questions.map((q, i) => answers[i] === q.answerIndex);
  const score = correctFlags.filter(Boolean).length;
  const timedOut = secondsLeft <= 0;

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref={backHref} showLang />
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="text-6xl mt-4">{score >= count * 0.8 ? '🏆' : score >= count * 0.5 ? '🎉' : '💪'}</div>
        {timedOut && <p className="font-black text-error mt-1">{t.timeUp}</p>}
        <div className="inline-flex items-baseline gap-2 mt-3 px-8 py-4 rounded-3xl bg-white shadow-card border border-ink/10">
          <span className="text-sm font-extrabold text-ink/50">{t.yourScore}</span>
          <span className="text-4xl font-black text-brand-orange">
            {score}/{count}
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <button onClick={retry} className="btn-primary text-lg px-8 py-4">
            🔄 {t.retry}
          </button>
          <Link href={backHref} className="btn-ghost text-lg px-8 py-4">
            🏠 {t.home}
          </Link>
        </div>

        <h2 className="font-black text-ink text-xl mt-10 mb-3 text-left">{t.review}</h2>
        <ol className="space-y-2.5 text-left">
          {questions.map((q, i) => {
            const ok = correctFlags[i];
            const chosen = answers[i];
            return (
              <li key={q.id} className={`card p-3.5 border-l-8 ${ok ? 'border-l-brand-green' : 'border-l-error'}`}>
                <div className="flex gap-3 items-start">
                  <span className={`shrink-0 w-8 h-8 rounded-full grid place-items-center text-white font-black ${ok ? 'bg-brand-green' : 'bg-error'}`}>
                    {ok ? '✓' : '✗'}
                  </span>
                  <div className="min-w-0">
                    <div className="font-extrabold text-ink leading-snug whitespace-pre-line">
                      {i + 1}. {pick(q.prompt, locale)}
                    </div>
                    <div className="text-[14px] font-semibold mt-1 leading-snug">
                      <span className="text-ink/55">{t.yourAnswer}: </span>
                      <span className={ok ? 'text-brand-green' : 'text-error'}>
                        {chosen === null ? t.noAnswer : pick(q.choices[chosen], locale)}
                      </span>
                      {!ok && (
                        <>
                          <span className="text-ink/40"> · </span>
                          <span className="text-ink/55">{t.correct}: </span>
                          <span className="text-brand-green">{pick(q.choices[q.answerIndex], locale)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </main>
  );
}
