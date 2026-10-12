'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import BackBar from '@/components/ui/BackBar';
import { G1_INGLIZ_LESSONS } from '@/content';
import { pick } from '@/lib/i18n-config';
import { api } from '@/lib/client';
import {
  buildInglizMultilevelExam,
  normalizeWritten,
  INGLIZ_MULTILEVEL_TITLE,
  INGLIZ_MULTILEVEL_INTRO,
  INGLIZ_MULTILEVEL_MINUTES,
  INGLIZ_MULTILEVEL_COUNT,
  INGLIZ_MULTILEVEL_KEY,
  type MLQuestion,
  type MLSection
} from '@/content/g1-ingliz/multilevel-exam';

/**
 * Four-section player for the "Milliy Sertifikat Multilevelga tayyorlanish"
 * practice exam — a very simplified CEFR Multilevel / IELTS shape:
 * Listening (audio + choices), Reading (choices), Writing (typed one-word
 * answers) and an UNGRADED Speaking warm-up. Listening plays the seeded TTS
 * clip (public/audio/tts/en/<key>.wav) and falls back to the browser's en-US
 * speech synthesis; a "show text" escape hatch keeps every question answerable.
 */

type Phase = 'intro' | 'section' | 'quiz' | 'done';

const S: Record<string, Record<string, string>> = {
  uz: {
    start: 'Imtihonni boshlash',
    startSection: 'Boʻlimni boshlash',
    minutes: 'daqiqa',
    questions: 'ta savol',
    graded: 'baholanadi',
    question: 'Savol',
    of: '/',
    timeLeft: 'Qolgan vaqt',
    finish: 'Yakunlash',
    next: 'Keyingi',
    back: 'Orqaga',
    listen: 'Tinglash',
    showText: 'Matnni koʻrish',
    typeHere: 'Javobni shu yerga yoz…',
    iSaidIt: '✅ Men aytdim!',
    sample: 'Namuna javob',
    notGraded: 'Baholanmaydi',
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
    speakingDone: 'Ovoz chiqarib mashq qilding — barakalla!'
  },
  ru: {
    start: 'Начать экзамен',
    startSection: 'Начать секцию',
    minutes: 'минут',
    questions: 'вопросов',
    graded: 'оцениваются',
    question: 'Вопрос',
    of: 'из',
    timeLeft: 'Осталось времени',
    finish: 'Завершить',
    next: 'Далее',
    back: 'Назад',
    listen: 'Слушать',
    showText: 'Показать текст',
    typeHere: 'Напечатай ответ здесь…',
    iSaidIt: '✅ Я сказал(а)!',
    sample: 'Образец ответа',
    notGraded: 'Не оценивается',
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
    speakingDone: 'Ты потренировался(ась) говорить вслух — молодец!'
  },
  en: {
    start: 'Start the exam',
    startSection: 'Start the section',
    minutes: 'minutes',
    questions: 'questions',
    graded: 'graded',
    question: 'Question',
    of: 'of',
    timeLeft: 'Time left',
    finish: 'Finish',
    next: 'Next',
    back: 'Back',
    listen: 'Listen',
    showText: 'Show text',
    typeHere: 'Type your answer here…',
    iSaidIt: '✅ I said it!',
    sample: 'Sample answer',
    notGraded: 'Not graded',
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
    speakingDone: 'You practised speaking out loud — well done!'
  }
};

const SECTION_EMOJI: Record<string, string> = { listening: '🎧', reading: '📖', writing: '✍️', speaking: '🗣️' };

function fmt(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

type Flat = { q: MLQuestion; si: number };
type Answer = number | string | boolean | null;

/** Play a seeded English clip, falling back to browser speech synthesis. */
function useEnglishAudio() {
  const elRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const stop = useCallback(() => {
    elRef.current?.pause();
    if (elRef.current) elRef.current.currentTime = 0;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    setPlaying(false);
  }, []);

  const play = useCallback(
    async (audio: { key: string; text: string }) => {
      stop();
      try {
        const el = new Audio(`/audio/tts/en/${audio.key}.wav`);
        elRef.current = el;
        el.onended = () => setPlaying(false);
        await el.play();
        setPlaying(true);
        return;
      } catch {
        /* clip not seeded — fall back to the browser voice */
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(audio.text);
        u.lang = 'en-US';
        u.rate = 0.85;
        u.onend = () => setPlaying(false);
        window.speechSynthesis.speak(u);
        setPlaying(true);
      }
    },
    [stop]
  );

  useEffect(() => stop, [stop]);
  return { play, stop, playing };
}

export default function MultilevelExamPlayer() {
  const locale = useLocale();
  const t = S[locale] || S.uz;
  const backHref = '/dashboard/g1-ingliz';

  const [sections, setSections] = useState<MLSection[]>(() => buildInglizMultilevelExam());
  const flat = useMemo<Flat[]>(() => sections.flatMap((s, si) => s.questions.map((q) => ({ q, si }))), [sections]);
  const total = flat.length;

  const [phase, setPhase] = useState<Phase>('intro');
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(() => Array(total).fill(null));
  const [revealed, setRevealed] = useState<boolean[]>(() => Array(total).fill(false)); // listening transcript / speaking sample
  const [secondsLeft, setSecondsLeft] = useState(INGLIZ_MULTILEVEL_MINUTES * 60);
  const saved = useRef(false);
  const { play, stop, playing } = useEnglishAudio();

  const topicByN = useMemo(() => new Map(G1_INGLIZ_LESSONS.map((l) => [l.n, l])), []);

  const isCorrect = useCallback((q: MLQuestion, a: Answer): boolean => {
    if (q.kind === 'write') return typeof a === 'string' && q.answers.map(normalizeWritten).includes(normalizeWritten(a));
    if (q.kind === 'speak') return true; // ungraded
    return typeof a === 'number' && a === q.answerIndex;
  }, []);

  const finish = useCallback(
    (final: Answer[]) => {
      stop();
      setPhase('done');
      if (saved.current) return;
      saved.current = true;
      const correct = flat
        .map(({ q }, i) => ({ q, a: final[i] }))
        .filter(({ q }) => q.kind !== 'speak')
        .map(({ q, a }) => isCorrect(q, a));
      const score = correct.filter(Boolean).length;
      api('/api/progress', { method: 'POST', json: { topicKey: INGLIZ_MULTILEVEL_KEY, score, answers: correct } }).catch(() => {});
    },
    [flat, isCorrect, stop]
  );

  useEffect(() => {
    if (phase !== 'quiz' && phase !== 'section') return;
    if (secondsLeft <= 0) {
      finish(answers);
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [phase, secondsLeft, answers, finish]);

  function setAnswer(v: Answer) {
    const next = [...answers];
    next[idx] = v;
    setAnswers(next);
  }

  function reveal(i: number) {
    setRevealed((r) => r.map((v, j) => (j === i ? true : v)));
  }

  function goNext() {
    stop();
    if (idx >= total - 1) {
      finish(answers);
      return;
    }
    const next = idx + 1;
    if (flat[next].si !== flat[idx].si) {
      setIdx(next);
      setPhase('section'); // splash before the new section
    } else {
      setIdx(next);
    }
  }

  function goBack() {
    stop();
    if (idx === 0) return;
    setIdx(idx - 1);
  }

  function retry() {
    stop();
    saved.current = false;
    const s = buildInglizMultilevelExam();
    setSections(s);
    const n = s.reduce((acc, x) => acc + x.questions.length, 0);
    setAnswers(Array(n).fill(null));
    setRevealed(Array(n).fill(false));
    setIdx(0);
    setSecondsLeft(INGLIZ_MULTILEVEL_MINUTES * 60);
    setPhase('section');
  }

  /* --------------------------- INTRO --------------------------- */
  if (phase === 'intro') {
    return (
      <main className="min-h-screen pb-16">
        <BackBar backHref={backHref} showLang />
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mt-6">
            <img src="/dtm-logo.png" alt="" aria-hidden className="w-24 h-24 mx-auto rounded-full shadow-card object-cover" />
            <h1 className="font-black text-ink text-[clamp(24px,6vw,38px)] mt-2">{pick(INGLIZ_MULTILEVEL_TITLE, locale)}</h1>
          </div>
          <div className="card p-5 mt-6 text-[15.5px] leading-relaxed font-semibold text-ink/80">{pick(INGLIZ_MULTILEVEL_INTRO, locale)}</div>

          {/* the four sections, like the real paper's contents box */}
          <div className="grid grid-cols-2 gap-2.5 mt-5">
            {sections.map((s) => (
              <div key={s.id} className="card px-4 py-3 flex items-center gap-2.5">
                <span className="text-2xl" aria-hidden>{SECTION_EMOJI[s.id]}</span>
                <span className="font-extrabold text-ink text-[13px] leading-snug">
                  {pick(s.title, locale)}
                  <span className="block text-ink/45 font-bold">
                    {s.questions.length} {t.questions}{s.id === 'speaking' ? ` · ${t.notGraded}` : ''}
                  </span>
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 mt-5">
            <div className="card px-5 py-3 text-center">
              <div className="text-3xl font-black text-brand-orange">{INGLIZ_MULTILEVEL_COUNT}</div>
              <div className="text-xs font-bold text-ink/50">{t.questions} · {t.graded}</div>
            </div>
            <div className="card px-5 py-3 text-center">
              <div className="text-3xl font-black text-brand-blue">{INGLIZ_MULTILEVEL_MINUTES}</div>
              <div className="text-xs font-bold text-ink/50">{t.minutes}</div>
            </div>
          </div>
          <div className="mt-7 text-center">
            <button onClick={() => setPhase('section')} className="btn-primary text-2xl px-12 py-5 inline-flex">
              ⏱️ {t.start}
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* ---------------------- SECTION SPLASH ---------------------- */
  if (phase === 'section') {
    const s = sections[flat[idx].si];
    return (
      <main className="min-h-screen pb-16">
        <BackBar backHref={backHref} showLang />
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-6xl mt-10" aria-hidden>{SECTION_EMOJI[s.id]}</div>
          <h1 className="font-black text-ink text-2xl sm:text-3xl mt-3">{pick(s.title, locale)}</h1>
          <div className="card p-5 mt-5 text-left text-[15px] leading-relaxed font-semibold text-ink/80">{pick(s.instruction, locale)}</div>
          <div className="mt-3 font-bold text-ink/50 text-sm">
            {s.questions.length} {t.questions}{s.id === 'speaking' ? ` · ${t.notGraded}` : ''} · ⏱️ {fmt(secondsLeft)}
          </div>
          <div className="mt-6">
            <button onClick={() => setPhase('quiz')} className="btn-primary text-xl px-10 py-4">
              {t.startSection} →
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* --------------------------- QUIZ --------------------------- */
  if (phase === 'quiz') {
    const { q, si } = flat[idx];
    const section = sections[si];
    const sectionStart = flat.findIndex((f) => f.si === si);
    const inSectionIdx = idx - sectionStart;
    const low = secondsLeft <= 60;
    const isSpeak = q.kind === 'speak';

    return (
      <main className="min-h-screen pb-10">
        <BackBar backHref={backHref} showLang />
        <div className="max-w-2xl mx-auto px-4">
          {/* section badge + timer */}
          <div className="flex items-center justify-between mt-3 gap-2">
            <span className="text-sm font-black text-ink/60 leading-tight">
              {SECTION_EMOJI[section.id]} {pick(section.title, locale)}
              <span className="block text-ink/40">
                {t.question} {inSectionIdx + 1} {t.of} {section.questions.length}
              </span>
            </span>
            <span className={`text-lg font-black tabular-nums px-3 py-1 rounded-full shrink-0 ${low ? 'bg-error/15 text-error animate-pulse' : 'bg-brand-blue/10 text-brand-blue'}`}>
              ⏱️ {fmt(secondsLeft)}
            </span>
          </div>
          <div className="h-2 rounded-full bg-ink/10 mt-2 overflow-hidden">
            <div className="h-full bg-brand-green transition-all" style={{ width: `${(idx / total) * 100}%` }} />
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

                {/* listening / speaking audio controls */}
                {'audio' in q && q.audio && (
                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => play(q.audio!)}
                      className="btn-primary text-lg px-6 py-3 inline-flex items-center gap-2"
                    >
                      {playing ? '🔊' : '▶️'} {t.listen}
                    </button>
                    {q.kind === 'listen' &&
                      (revealed[idx] ? (
                        <span className="font-extrabold text-ink/70 text-[15px] px-3 py-2 rounded-xl bg-ink/[0.05] border border-ink/10">
                          “{q.audio.text}”
                        </span>
                      ) : (
                        <button onClick={() => reveal(idx)} className="btn-ghost text-sm px-4 py-2.5">
                          👀 {t.showText}
                        </button>
                      ))}
                  </div>
                )}
              </div>

              {/* answer area by question kind */}
              {(q.kind === 'listen' || q.kind === 'read') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {q.choices.map((c, ci) => (
                    <button
                      key={ci}
                      onClick={() => setAnswer(ci)}
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
              )}

              {q.kind === 'write' && (
                <div className="card p-4 mt-4">
                  <input
                    type="text"
                    value={typeof answers[idx] === 'string' ? (answers[idx] as string) : ''}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder={t.typeHere}
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    className="w-full rounded-xl border-2 border-brand-blue/40 focus:border-brand-blue outline-none px-4 py-3.5 font-extrabold text-xl text-ink bg-white"
                  />
                </div>
              )}

              {isSpeak && (
                <div className="mt-4">
                  {!revealed[idx] ? (
                    <button
                      onClick={() => {
                        reveal(idx);
                        setAnswer(true);
                      }}
                      className="btn-primary text-xl px-8 py-4"
                    >
                      {t.iSaidIt}
                    </button>
                  ) : (
                    <div className="card p-4 border-l-8 border-l-brand-green">
                      <div className="text-xs font-black text-ink/45 uppercase tracking-wide">{t.sample}</div>
                      <div className="font-extrabold text-ink text-lg mt-1">
                        “{(q as { sample: string }).sample}”
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* navigation */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button onClick={goBack} disabled={idx === 0} className="btn-ghost px-6 py-3 disabled:opacity-40 disabled:cursor-not-allowed">
              ← {t.back}
            </button>
            {idx < total - 1 ? (
              <button onClick={goNext} className="btn-primary px-8 py-3">
                {t.next} →
              </button>
            ) : (
              <button onClick={() => finish(answers)} className="btn-primary px-8 py-3">
                ✓ {t.finish}
              </button>
            )}
          </div>

          {/* question dots for THIS section */}
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {section.questions.map((_, qi) => {
              const fi = sectionStart + qi;
              const answered = answers[fi] !== null && answers[fi] !== '';
              return (
                <button
                  key={qi}
                  onClick={() => {
                    stop();
                    setIdx(fi);
                  }}
                  aria-label={`${t.question} ${qi + 1}`}
                  className={`w-6 h-6 rounded-full text-[10px] font-black grid place-items-center transition-colors ${
                    fi === idx ? 'bg-brand-blue text-white' : answered ? 'bg-brand-green/25 text-brand-green' : 'bg-ink/10 text-ink/50'
                  }`}
                >
                  {qi + 1}
                </button>
              );
            })}
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
  const gradedFlat = flat.map((f, i) => ({ ...f, i })).filter(({ q }) => q.kind !== 'speak');
  const correctFlags = gradedFlat.map(({ q, i }) => isCorrect(q, answers[i]));
  const score = correctFlags.filter(Boolean).length;
  const timedOut = secondsLeft <= 0;
  const recoNs = Array.from(
    new Set(
      gradedFlat
        .filter((_, gi) => !correctFlags[gi])
        .flatMap(({ q }) => (q.kind === 'speak' ? [] : q.reviewTopics))
    )
  ).sort((a, b) => a - b);

  const answerLabel = (q: MLQuestion, a: Answer): string | null => {
    if (q.kind === 'write') return typeof a === 'string' && a.trim() ? a : null;
    if (q.kind === 'speak') return null;
    return typeof a === 'number' ? pick(q.choices[a], locale) : null;
  };
  const correctLabel = (q: MLQuestion): string => {
    if (q.kind === 'write') return q.answers[0];
    if (q.kind === 'speak') return '';
    return pick(q.choices[q.answerIndex], locale);
  };

  let gi = -1; // running graded index for flags lookup inside the map below

  return (
    <main className="min-h-screen pb-16">
      <BackBar backHref={backHref} showLang />
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="text-6xl mt-4">{score >= INGLIZ_MULTILEVEL_COUNT * 0.8 ? '🏆' : score >= INGLIZ_MULTILEVEL_COUNT * 0.5 ? '🎉' : '💪'}</div>
        {timedOut && <p className="font-black text-error mt-1">{t.timeUp}</p>}
        <div className="inline-flex items-baseline gap-2 mt-3 px-8 py-4 rounded-3xl bg-white shadow-card border border-ink/10">
          <span className="text-sm font-extrabold text-ink/50">{t.yourScore}</span>
          <span className="text-4xl font-black text-brand-orange">
            {score}/{INGLIZ_MULTILEVEL_COUNT}
          </span>
        </div>
        <p className="font-bold text-ink/50 text-sm mt-2">🗣️ {t.speakingDone}</p>

        <div className="flex justify-center gap-3 mt-6">
          <button onClick={retry} className="btn-primary text-lg px-8 py-4">
            🔄 {t.retry}
          </button>
          <Link href={backHref} className="btn-ghost text-lg px-8 py-4">
            🏠 {t.dashboard}
          </Link>
        </div>

        {/* per-question review, grouped by section */}
        <h2 className="font-black text-ink text-xl mt-10 mb-3 text-left">{t.review}</h2>
        <div className="space-y-5 text-left">
          {sections.map((section, si) => {
            const sectionStart = flat.findIndex((f) => f.si === si);
            return (
              <div key={section.id}>
                <h3 className="font-black text-ink/60 text-[15px] mb-2">
                  {SECTION_EMOJI[section.id]} {pick(section.title, locale)}
                  {section.id === 'speaking' && <span className="text-ink/40"> · {t.notGraded}</span>}
                </h3>
                <ol className="space-y-2.5">
                  {section.questions.map((q, qi) => {
                    const fi = sectionStart + qi;
                    if (q.kind === 'speak') {
                      return (
                        <li key={q.id} className="card p-3.5 border-l-8 border-l-brand-blue/50">
                          <div className="font-extrabold text-ink leading-snug whitespace-pre-line">
                            {qi + 1}. {'audio' in q && q.audio ? q.audio.text : pick(q.prompt, locale)}
                          </div>
                          <div className="text-[14px] font-semibold mt-1 text-ink/55">
                            {t.sample}: <span className="text-brand-green">“{q.sample}”</span>
                          </div>
                        </li>
                      );
                    }
                    gi++;
                    const ok = correctFlags[gi];
                    const mine = answerLabel(q, answers[fi]);
                    return (
                      <li key={q.id} className={`card p-3.5 border-l-8 ${ok ? 'border-l-brand-green' : 'border-l-error'}`}>
                        <div className="flex gap-3 items-start">
                          <span className={`shrink-0 w-8 h-8 rounded-full grid place-items-center text-white font-black ${ok ? 'bg-brand-green' : 'bg-error'}`}>
                            {ok ? '✓' : '✗'}
                          </span>
                          <div className="min-w-0">
                            <div className="font-extrabold text-ink leading-snug whitespace-pre-line">
                              {qi + 1}. {pick(q.prompt, locale)}
                              {q.kind === 'listen' && q.audio && (
                                <span className="block text-ink/50 font-bold text-[13px] mt-0.5">🔊 “{q.audio.text}”</span>
                              )}
                            </div>
                            <div className="text-[14px] font-semibold mt-1 leading-snug">
                              <span className="text-ink/55">{t.yourAnswer}: </span>
                              <span className={ok ? 'text-brand-green' : 'text-error'}>{mine ?? t.noAnswer}</span>
                              {!ok && (
                                <>
                                  <span className="text-ink/40"> · </span>
                                  <span className="text-ink/55">{t.correct}: </span>
                                  <span className="text-brand-green">{correctLabel(q)}</span>
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
            );
          })}
        </div>

        {/* lessons to review */}
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

        <div className="mt-6">
          <button onClick={retry} className="btn-primary text-lg px-8 py-4">
            🔄 {t.retry}
          </button>
        </div>
      </div>
    </main>
  );
}
