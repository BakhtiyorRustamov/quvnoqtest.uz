'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import { G1_MATH_TOPICS, G1_ONA_TOPICS, G1_TABIIY_TOPICS } from '@/content';
import { pick, type L10n } from '@/lib/i18n-config';
import { api } from '@/lib/client';
import { PRESIDENT_EXAM_CONFIG, type ExamQuestion } from '@/content/g1-math/exam';
import { DTM_EXAM_CONFIG } from '@/content/g1-math/dtm-exam';
import { ONA_DTM_EXAM_CONFIG } from '@/content/g1-ona/dtm-exam';
import { OQISH_DTM_EXAM_CONFIG } from '@/content/g1-oqish/dtm-exam';
import { G1_OQISH_LESSONS } from '@/content/g1-oqish/structure';
import { FIKR_EXAM_CONFIG } from '@/content/g1-fikr/exam';
import { FIKR2_EXAM_CONFIG } from '@/content/g1-fikr/exam2';
import { FIKR3_EXAM_CONFIG } from '@/content/g1-fikr/exam3';
import { FIZIKA_EXAM_CONFIG, KIMYO_EXAM_CONFIG, BIO_EXAM_CONFIG } from '@/content/g1-tabiiy/dtm-exams';

export type ExamVariant = 'president' | 'dtm' | 'ona' | 'adabiyot' | 'fikr' | 'fikr2' | 'fikr3' | 'fizika' | 'kimyo' | 'bio';

type Phase = 'intro' | 'quiz' | 'done';

const S: Record<string, Record<string, string>> = {
  uz: {
    start: 'Imtihonni boshlash',
    minutes: 'daqiqa',
    questions: 'ta savol',
    question: 'Savol',
    of: '/',
    timeLeft: 'Qolgan vaqt',
    finish: 'Yakunlash',
    next: 'Keyingi',
    imgNote: 'Rasm keyinroq qoʻshiladi',
    yourScore: 'Sizning natijangiz',
    timeUp: 'Vaqt tugadi!',
    review: 'Savollar tahlili',
    yourAnswer: 'Sizning javobingiz',
    correct: 'Toʻgʻri javob',
    noAnswer: 'Javob berilmadi',
    recoTitle: 'Qaysi darslarni takrorlash kerak',
    recoEmpty: 'Ajoyib! Barcha mavzularni yaxshi bilasiz. 🎉',
    retry: 'Qaytadan ishlash',
    dashboard: 'Bosh sahifa',
    back: 'Orqaga'
  },
  ru: {
    start: 'Начать экзамен',
    minutes: 'минут',
    questions: 'вопросов',
    question: 'Вопрос',
    of: 'из',
    timeLeft: 'Осталось времени',
    finish: 'Завершить',
    next: 'Далее',
    imgNote: 'Картинка будет добавлена позже',
    yourScore: 'Ваш результат',
    timeUp: 'Время вышло!',
    review: 'Разбор вопросов',
    yourAnswer: 'Ваш ответ',
    correct: 'Верный ответ',
    noAnswer: 'Нет ответа',
    recoTitle: 'Какие уроки стоит повторить',
    recoEmpty: 'Отлично! Ты хорошо знаешь все темы. 🎉',
    retry: 'Пройти заново',
    dashboard: 'Главная',
    back: 'Назад'
  },
  en: {
    start: 'Start the exam',
    minutes: 'minutes',
    questions: 'questions',
    question: 'Question',
    of: 'of',
    timeLeft: 'Time left',
    finish: 'Finish',
    next: 'Next',
    imgNote: 'Image will be added later',
    yourScore: 'Your score',
    timeUp: "Time's up!",
    review: 'Question review',
    yourAnswer: 'Your answer',
    correct: 'Correct answer',
    noAnswer: 'No answer',
    recoTitle: 'Lessons to review',
    recoEmpty: 'Excellent! You know every topic well. 🎉',
    retry: 'Try again',
    dashboard: 'Dashboard',
    back: 'Back'
  }
};

function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/** Standard illustration for a question. Shows the real image once its file
 *  exists at `image.src`; until then it falls back to the prompt placeholder. */
function ExamImage({ image, note, locale }: { image: { src: string; prompt: L10n }; note: string; locale: string }) {
  const [broken, setBroken] = useState(false);
  if (broken) {
    return (
      <div className="mt-3 rounded-xl border-2 border-dashed border-ink/25 bg-ink/[0.03] p-3 text-center">
        <div className="text-3xl">🖼️</div>
        <div className="text-[12px] font-semibold text-ink/55 mt-1 italic">{pick(image.prompt, locale)}</div>
        <div className="text-[10px] font-bold text-ink/35 mt-1 uppercase tracking-wide">{note}</div>
      </div>
    );
  }
  return (
    <img
      src={image.src}
      alt={pick(image.prompt, locale)}
      onError={() => setBroken(true)}
      className="mt-3 mx-auto max-h-52 rounded-xl border border-ink/10"
    />
  );
}

export default function ExamPlayer({ variant = 'president' }: { variant?: ExamVariant }) {
  // Pick the config on the client — passing the config object (which holds a
  // function) across the Server→Client boundary is not allowed by Next.js.
  const config =
    variant === 'fizika' ? FIZIKA_EXAM_CONFIG
    : variant === 'kimyo' ? KIMYO_EXAM_CONFIG
    : variant === 'bio' ? BIO_EXAM_CONFIG
    : variant === 'fikr3' ? FIKR3_EXAM_CONFIG
    : variant === 'fikr2' ? FIKR2_EXAM_CONFIG
    : variant === 'fikr' ? FIKR_EXAM_CONFIG
    : variant === 'ona' ? ONA_DTM_EXAM_CONFIG
    : variant === 'adabiyot' ? OQISH_DTM_EXAM_CONFIG
    : variant === 'dtm' ? DTM_EXAM_CONFIG
    : PRESIDENT_EXAM_CONFIG;
  const { title, intro, minutes, count, build, logoSrc, topicKey } = config;
  // Which subject's lessons the results screen links to for review, and where
  // "Back"/"Dashboard" return to. Fikrlash is a pure practice area — it has no
  // lessons of its own, so its results screen skips the review-topics card.
  const isTabiiy = variant === 'fizika' || variant === 'kimyo' || variant === 'bio';
  const reviewTopicsList = isTabiiy
    ? G1_TABIIY_TOPICS
    : variant === 'ona'
      ? G1_ONA_TOPICS
      : variant === 'adabiyot'
        ? G1_OQISH_LESSONS
        : G1_MATH_TOPICS;
  const isFikr = variant === 'fikr' || variant === 'fikr2' || variant === 'fikr3';
  const backHref = isFikr
    ? '/dashboard/g1-fikr'
    : isTabiiy
      ? '/dashboard/g1-tabiiy'
      : variant === 'ona'
        ? '/dashboard/g1-ona'
        : variant === 'adabiyot'
          ? '/dashboard/g1-oqish'
          : '/dashboard/g1-math';
  const hasLessonReco = !isFikr;
  const locale = useLocale();
  const t = S[locale] || S.uz;

  const [phase, setPhase] = useState<Phase>('intro');
  const [questions, setQuestions] = useState<ExamQuestion[]>(() => build());
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(count).fill(null));
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const saved = useRef(false);

  const topicByN = useMemo(() => new Map(reviewTopicsList.map((tp) => [tp.n, tp])), [reviewTopicsList]);

  const finish = useCallback(
    (final: (number | null)[]) => {
      setPhase('done');
      if (saved.current) return;
      saved.current = true;
      const correct = questions.map((q, i) => final[i] === q.answerIndex);
      const score = correct.filter(Boolean).length;
      api('/api/progress', {
        method: 'POST',
        json: { topicKey, score, answers: correct }
      }).catch(() => {});
    },
    [questions, topicKey]
  );

  // countdown while taking the exam
  useEffect(() => {
    if (phase !== 'quiz') return;
    if (secondsLeft <= 0) {
      finish(answers);
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, secondsLeft, answers, finish]);

  function startExam() {
    setPhase('quiz');
  }

  function choose(ci: number) {
    const next = [...answers];
    next[idx] = ci; // tapping again changes the answer; navigation is manual
    setAnswers(next);
  }

  function retry() {
    saved.current = false;
    setQuestions(build());
    setAnswers(Array(count).fill(null));
    setIdx(0);
    setSecondsLeft(minutes * 60);
    setPhase('quiz');
  }

  /* --------------------------- INTRO --------------------------- */
  if (phase === 'intro') {
    return (
      <main className="min-h-screen pb-16">
        <BackBar backHref={backHref} showLang />
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mt-6">
            <img src={logoSrc} alt="" aria-hidden className="w-24 h-24 mx-auto rounded-full shadow-card object-cover" />
            <h1 className="font-black text-ink text-[clamp(24px,6vw,38px)] mt-2">{pick(title, locale)}</h1>
          </div>
          <div className="card p-5 mt-6 text-[15.5px] leading-relaxed font-semibold text-ink/80">{pick(intro, locale)}</div>
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
            <button onClick={startExam} className="btn-primary text-2xl px-12 py-5 inline-flex">
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
      <main className="min-h-screen pb-10">
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
                {q.image && <ExamImage image={q.image} note={t.imgNote} locale={locale} />}
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
                    {/* OMR-style bubble: blank circle that fills with a black dot once chosen */}
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
              <button onClick={() => finish(answers)} className="btn-primary px-8 py-3">
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
            <button onClick={() => finish(answers)} className="btn-ghost text-sm px-5 py-2.5">
              {t.finish} →
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* --------------------------- DONE --------------------------- */
  const correctFlags = questions.map((q, i) => answers[i] === q.answerIndex);
  const score = correctFlags.filter(Boolean).length;
  const timedOut = secondsLeft <= 0;

  // recommend topics from wrong questions
  const recoNs = Array.from(
    new Set(questions.filter((_, i) => !correctFlags[i]).flatMap((q) => q.reviewTopics))
  ).sort((a, b) => a - b);

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

        <div className="flex justify-center gap-3 mt-6">
          <button onClick={retry} className="btn-primary text-lg px-8 py-4">
            🔄 {t.retry}
          </button>
          <Link href={backHref} className="btn-ghost text-lg px-8 py-4">
            🏠 {t.dashboard}
          </Link>
        </div>

        {/* per-question review (comes first) */}
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

        {/* topic-review recommendations — shown AFTER the question review
            (skipped for practice-only subjects with no lessons) */}
        {hasLessonReco && (
        <div className="card p-5 mt-8 text-left">
          <h2 className="font-black text-ink text-lg mb-2">📚 {t.recoTitle}</h2>
          {recoNs.length === 0 ? (
            <p className="font-bold text-brand-green">{t.recoEmpty}</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {recoNs.map((n) => {
                const tp = topicByN.get(n);
                if (!tp) return null;
                return (
                  <Link
                    key={n}
                    href={`/lesson/${tp.key}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-brand-blue/10 border border-brand-blue/30 px-3 py-1.5 font-extrabold text-ink text-[13px] hover:bg-brand-blue/20 transition-colors"
                  >
                    <span className="text-brand-blue">{n}.</span> {pick(tp.title, locale)}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
        )}

        <div className="mt-6">
          <button onClick={retry} className="btn-primary text-lg px-8 py-4">
            🔄 {t.retry}
          </button>
        </div>
      </div>
    </main>
  );
}
