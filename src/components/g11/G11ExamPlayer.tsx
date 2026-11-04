'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import { pick } from '@/lib/i18n-config';
import { getG11Subject, g11SubjectHref } from '@/content/g11/subjects';
import { buildG11Exam, certEstimate, g11ExamMinutes, g11Score, hasRealExam, isAnswered, questionPoints, G11_DIAG_COUNT, ESSAY_MAX, type G11Answer, type G11Question } from '@/content/g11/diagnostic';
import { useSound } from '@/components/providers/SoundProvider';
import { hapticNotify, hapticSelect } from '@/lib/tg';
import { addAttempt, addFlags } from '@/lib/g11Store';
import ReviewList from './ReviewList';
import ScoreRing from './ScoreRing';
import ArrowBack from './ArrowBack';
import QuestionSketchpad from './QuestionSketchpad';
import ScratchNotebook from './ScratchNotebook';
import { useTgScrollLock } from './useTgScrollLock';

type Phase = 'quiz' | 'done';

const S: Record<string, Record<string, string>> = {
  uz: {
    start: 'Testni boshlash', minutes: 'daqiqa', questions: 'ta savol', question: 'Savol', of: '/',
    finish: 'Yakunlash', next: 'Keyingi', back: 'Orqaga', yourScore: 'Sizning natijangiz', timeUp: 'Vaqt tugadi!',
    review: 'Savollar tahlili', yourAnswer: 'Sizning javobingiz', correct: 'Toʻgʻri javob', noAnswer: 'Javob berilmadi',
    retry: 'Qaytadan ishlash', swipe: 'yoki suring', typeHere: 'Javobni yozing', estimate: 'Taxminiy milliy sertifikat bali', loading: 'Yangi variant tayyorlanmoqda…', home: 'Fan sahifasi', explanation: 'Tushuntirish', more: 'Batafsil', less: 'Yopish', essayHere: 'Inshoni shu yerga yozing…', words: 'soʻz', essayCheck: 'SI bilan tekshirish', essayChecking: 'SI tekshirmoqda…', essayScore: 'SI bahosi', essayNote: 'Baho sunʼiy intellekt (SI) tomonidan berildi — u xato qilishi mumkin.', essayErr: 'Tekshirib boʻlmadi. Keyinroq qayta urinib koʻring.', essayAuto: 'Test yakunlanganda insho avtomatik tekshiriladi.'
  },
  ru: {
    start: 'Начать тест', minutes: 'минут', questions: 'вопросов', question: 'Вопрос', of: 'из',
    finish: 'Завершить', next: 'Далее', back: 'Назад', yourScore: 'Ваш результат', timeUp: 'Время вышло!',
    review: 'Разбор вопросов', yourAnswer: 'Ваш ответ', correct: 'Верный ответ', noAnswer: 'Нет ответа',
    retry: 'Пройти заново', swipe: 'или проведите пальцем', typeHere: 'Введите ответ', estimate: 'Примерный балл нац. сертификата', loading: 'Готовим новый вариант…', home: 'Страница предмета', explanation: 'Объяснение', more: 'Подробнее', less: 'Свернуть', essayHere: 'Напишите сочинение здесь…', words: 'слов', essayCheck: 'Проверить с ИИ', essayChecking: 'ИИ проверяет…', essayScore: 'Оценка ИИ', essayNote: 'Оценку выставил искусственный интеллект (ИИ) — возможны ошибки.', essayErr: 'Не удалось проверить. Попробуйте позже.', essayAuto: 'При завершении теста сочинение проверится автоматически.'
  },
  en: {
    start: 'Start the test', minutes: 'minutes', questions: 'questions', question: 'Question', of: 'of',
    finish: 'Finish', next: 'Next', back: 'Back', yourScore: 'Your score', timeUp: "Time's up!",
    review: 'Question review', yourAnswer: 'Your answer', correct: 'Correct answer', noAnswer: 'No answer',
    retry: 'Try again', swipe: 'or swipe', typeHere: 'Type your answer', estimate: 'Estimated national certificate score', loading: 'Preparing a new variant…', home: 'Subject page', explanation: 'Explanation', more: 'Details', less: 'Close', essayHere: 'Write your essay here…', words: 'words', essayCheck: 'Check with AI', essayChecking: 'AI is checking…', essayScore: 'AI score', essayNote: 'Scored by artificial intelligence (AI) — it can make mistakes.', essayErr: 'Could not check. Please try again later.', essayAuto: 'The essay is checked automatically when you finish.'
  }
};

/** AI essay check → stored answer [text, score, result JSON], or null on failure */
async function gradeEssay(q: G11Question, text: string): Promise<string[] | null> {
  try {
    const res = await fetch('/api/ai/essay', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ topic: q.prompt.uz, essay: text, lang: q.id.startsWith('g11-rus') ? 'ru' : q.id.startsWith('g11-qq') ? 'kaa' : 'uz' }) });
    if (!res.ok) return null;
    const { result } = await res.json();
    return [text, String(result.score), JSON.stringify(result)];
  } catch {
    return null;
  }
}

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
  const minutes = g11ExamMinutes(slug);

  const [phase, setPhase] = useState<Phase>('quiz');
  // a fresh variant every attempt — built on the client (random, so not during server rendering)
  const [questions, setQuestions] = useState<G11Question[]>([]);
  const count = questions.length || G11_DIAG_COUNT;
  const [idx, setIdxRaw] = useState(0);
  const [dir, setDir] = useState(1); // slide direction for the question animation
  const [answers, setAnswers] = useState<G11Answer[]>(() => Array(G11_DIAG_COUNT).fill(null));
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [attempt, setAttempt] = useState(0); // remounts the sketchpad (fresh drawings) on retry
  const pageRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const qs = buildG11Exam(slug);
    setQuestions(qs);
    setAnswers(Array(qs.length).fill(null));
  }, [slug, attempt]);

  const answersRef = useRef(answers);
  answersRef.current = answers;
  const [essayBusy, setEssayBusy] = useState(false);
  const [essayErr, setEssayErr] = useState(false);
  const { play } = useSound();
  const saved = useRef(false);
  const { scrollerRef, locked, scrollerClass, scrollToTop } = useTgScrollLock();

  // finish: remember the attempt + flag the lessons behind wrong answers
  const finish = useCallback(async () => {
    setPhase('done');
    if (saved.current) return;
    saved.current = true;
    let answers = answersRef.current;
    // an essay written but not yet checked → let the AI score it before saving
    const pending = questions.map((q, i) => (q.essay && Array.isArray(answers[i]) && (answers[i] as string[])[0]?.trim() && (answers[i] as string[])[1] === undefined ? i : -1)).filter((i) => i >= 0);
    for (const i of pending) {
      const r = await gradeEssay(questions[i], (answers[i] as string[])[0]);
      if (r) answers = answers.map((a, k) => (k === i ? r : a));
    }
    if (pending.length) setAnswers(answers);
    const { score, total } = g11Score(questions, answers);
    addAttempt(slug, { at: Date.now(), score, total, answers, ...(hasRealExam(slug) ? { questions } : {}) });
    addFlags(
      slug,
      questions
        .filter((q, i) => {
          const p = questionPoints(q, answers[i] ?? null);
          return p.got < p.max;
        })
        .map((q) => q.lessonN)
        .filter((n) => n > 0)
    );
    play('win');
    hapticNotify(score >= total / 2 ? 'success' : 'warning');
    scrollToTop(false);
  }, [questions, slug, play, scrollToTop]);

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

  function typeEssay(v: string) {
    const next = [...answers];
    next[idx] = [v]; // editing clears an earlier AI score
    setAnswers(next);
  }
  async function checkEssay() {
    const cur = answers[idx];
    const text = Array.isArray(cur) ? cur[0] : '';
    if (!text?.trim() || essayBusy) return;
    setEssayBusy(true);
    setEssayErr(false);
    const r = await gradeEssay(questions[idx], text);
    setEssayBusy(false);
    if (!r) return setEssayErr(true);
    const next = [...answersRef.current];
    next[idx] = r;
    setAnswers(next);
  }

  function typePart(pi: number, v: string) {
    const next = [...answers];
    const cur = Array.isArray(next[idx]) ? [...(next[idx] as string[])] : ['', ''];
    cur[pi] = v;
    next[idx] = cur;
    setAnswers(next);
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
    setIdxRaw(0);
    setSecondsLeft(minutes * 60);
    setAttempt((a) => a + 1);
    setPhase('quiz');
  }

  const subjectName = subject ? pick(subject.name, locale) : '';

  /* --------------------------- QUIZ --------------------------- */
  if (phase === 'quiz') {
    const q = questions[idx];
    if (!q)
      return (
        <main className="min-h-screen grid place-items-center">
          <p className="font-black text-ink/50">{t.loading}</p>
        </main>
      );
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
                {q.figure && <div className="mt-3 flex justify-center" dangerouslySetInnerHTML={{ __html: q.figure }} />}
              </div>

              {q.essay && (() => {
                const cur = Array.isArray(answers[idx]) ? (answers[idx] as string[]) : [];
                const text = cur[0] ?? '';
                const words = text.trim() ? text.trim().split(/\s+/).length : 0;
                const res = cur[2] ? (JSON.parse(cur[2]) as { score: number; mazmun: number; tuzilish: number; til: number; imlo: number; comment: string; errors: string[] }) : null;
                return (
                  <div className="mt-4 card p-4">
                    <textarea
                      value={text}
                      onChange={(e) => typeEssay(e.target.value)}
                      placeholder={t.essayHere}
                      spellCheck={false}
                      autoCorrect="off"
                      autoCapitalize="off"
                      rows={12}
                      className="w-full rounded-xl border-2 border-ink/15 bg-white px-3 py-2 text-[17px] font-semibold leading-relaxed text-ink outline-none focus:border-brand-blue"
                    />
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-bold text-ink/55">{words} {t.words}</span>
                      <button onClick={checkEssay} disabled={!words || essayBusy} className="btn-primary px-4 py-2 text-sm disabled:opacity-50">
                        {essayBusy ? t.essayChecking : t.essayCheck}
                      </button>
                    </div>
                    {essayErr && <p className="mt-2 text-sm font-bold text-error">{t.essayErr}</p>}
                    {!res && !essayErr && <p className="mt-2 text-xs font-semibold text-ink/50">{t.essayAuto} {t.essayNote}</p>}
                    {res && (
                      <div className="mt-3 rounded-xl bg-brand-blue/[0.07] px-3.5 py-3">
                        <div className="font-black text-brand-blue">{t.essayScore}: {res.score} / {ESSAY_MAX}</div>
                        <div className="mt-1 text-sm font-bold text-ink/70">{q.id.startsWith('g11-rus') ? `Содержание ${res.mazmun} · Композиция ${res.tuzilish} · Речь ${res.til} · Грамотность ${res.imlo}` : `Mazmun ${res.mazmun} · Tuzilish ${res.tuzilish} · Til ${res.til} · Imlo ${res.imlo}`}</div>
                        <p className="mt-1.5 text-[15px] font-semibold leading-relaxed text-ink/80">{res.comment}</p>
                        {res.errors.length > 0 && <ul className="mt-1.5 list-disc pl-5 text-sm font-semibold text-ink/70">{res.errors.map((x, k) => <li key={k}>{x}</li>)}</ul>}
                        <p className="mt-2 text-xs font-bold text-ink/45">ⓘ {t.essayNote}</p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {q.parts && (
                <div className="mt-4 grid gap-3">
                  {q.parts.map((p, pi) => (
                    <label key={pi} className="card block px-4 py-3">
                      <span className="block font-extrabold text-ink leading-snug">{pick(p.prompt, locale)}</span>
                      <input
                        value={(Array.isArray(answers[idx]) ? (answers[idx] as string[])[pi] : '') ?? ''}
                        onChange={(e) => typePart(pi, e.target.value)}
                        inputMode={/^[−\-]?\d+([.,]\d+)?(\/\d+)?$/.test(p.answer) ? 'decimal' : 'text'}
                        placeholder={t.typeHere}
                        className="mt-2 w-full rounded-xl border-2 border-ink/15 bg-white px-3 py-2 text-lg font-black text-ink outline-none focus:border-brand-blue"
                      />
                    </label>
                  ))}
                </div>
              )}

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

          {/* back / forward navigation between questions — small buttons, each with a "yoki suring" hint */}
          <div className="mt-5 flex items-start justify-between gap-3">
            <div className="flex flex-col items-center gap-0.5">
              <button
                onClick={() => {
                  play('pop');
                  setIdx(Math.max(0, idx - 1));
                }}
                disabled={idx === 0}
                className="btn-ghost text-xs px-3 py-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← {t.back}
              </button>
              <span className="text-[10px] font-bold text-ink/40">{t.swipe}</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              {idx < count - 1 ? (
                <button
                  onClick={() => {
                    play('pop');
                    setIdx(idx + 1);
                  }}
                  className="btn-primary text-xs px-3.5 py-1.5"
                >
                  {t.next} →
                </button>
              ) : (
                <button onClick={finish} className="btn-primary text-xs px-3.5 py-1.5">
                  ✓ {t.finish}
                </button>
              )}
              {idx < count - 1 && <span className="text-[10px] font-bold text-ink/40">{t.swipe}</span>}
            </div>
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
                    : isAnswered(answers[qi] ?? null)
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
          <ScratchNotebook />
        </div>

        <QuestionSketchpad key={attempt} containerRef={pageRef} pageKey={idx} locale={locale} />
      </main>
      </div>
    );
  }

  /* --------------------------- DONE --------------------------- */
  const { score, total } = g11Score(questions, answers);
  const est = hasRealExam(slug) ? certEstimate(score, total) : null;
  const timedOut = secondsLeft <= 0;

  return (
      <div ref={scrollerRef} className={scrollerClass} style={locked ? { paddingTop: 'var(--app-top)', WebkitOverflowScrolling: 'touch' } : undefined}>
    <main className="min-h-screen pb-16">
      <BackBar backHref={backHref} showLang />
      <div className="max-w-2xl mx-auto px-4 text-center">
        {timedOut && <p className="font-black text-error mt-4">{t.timeUp}</p>}
        <ScoreRing score={score} total={total} label={t.yourScore} />
        {est && (
          <p className="mt-2 text-[14px] font-bold text-ink/60">
            {t.estimate}: <span className="font-black text-brand-orange">{String(est.ball).replace('.', ',')} / 75</span>
            {est.level !== '—' && <span className="font-black text-ink/80"> ({est.level})</span>}
          </p>
        )}

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
