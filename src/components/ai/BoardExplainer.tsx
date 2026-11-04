'use client';

import { useEffect, useRef, useState } from 'react';
import Board from '@/components/board/Board';
import { useSound } from '@/components/providers/SoundProvider';
import { hapticSelect } from '@/lib/tg';
import { api } from '@/lib/client';
import type { DrawOp } from '@/lib/lab/plan';

/* ------------------------------ shared types ------------------------------ */

export type AiBoardLesson = { title: string; steps: { say: string; next: string; draw: DrawOp[]; clear: true }[]; followUp: string };

/** A chat entry: a normal message, or a board explanation inside the chat. */
export type ChatMsg =
  | { role: 'user' | 'assistant'; content: string }
  | { role: 'board'; id: number; question: string; state: 'loading' | 'ready' | 'error'; lesson?: AiBoardLesson; error?: string };

export const BOARD_TEXT: Record<string, Record<string, string>> = {
  uz: {
    button: 'Doskada tushuntir',
    text: 'Oddiy tushuntir',
    detailed: 'Mufassal',
    brief: 'Muxtasar',
    detailedHint: 'chizmalar bilan qismlarga boʻlib, detallar bilan',
    briefHint: 'qisqa va oddiy matn koʻrinishida',
    lessons: 'Saytdagi tegishli darslar',
    reply: 'Javobingni yoz…',
    send: 'Yuborish',
    newQuestion: 'Yangi savol',
    making: 'Doskada tushuntirish tayyorlanmoqda…',
    back: '‹ Orqaga',
    again: 'Qayta koʻrish',
    error: 'Doskani tayyorlab boʻlmadi. Qaytadan urinib koʻring.',
    limit: 'SI limiti tugadi. Keyinroq yana urinib koʻring.',
    off: 'Doskada tushuntirish hozircha ulanmagan.'
  },
  ru: {
    button: 'Объясни на доске',
    text: 'Объясни текстом',
    detailed: 'Подробно',
    brief: 'Кратко',
    detailedHint: 'по шагам, с чертежами и деталями',
    briefHint: 'коротким и простым текстом',
    lessons: 'Уроки на сайте по теме',
    reply: 'Напиши ответ…',
    send: 'Отправить',
    newQuestion: 'Новый вопрос',
    making: 'Готовлю объяснение на доске…',
    back: '‹ Назад',
    again: 'Смотреть снова',
    error: 'Не получилось подготовить доску. Попробуйте ещё раз.',
    limit: 'Лимит AI исчерпан. Попробуйте позже.',
    off: 'Объяснение на доске пока не подключено.'
  },
  en: {
    button: 'Explain on the board',
    text: 'Explain in text',
    detailed: 'Detailed',
    brief: 'Brief',
    detailedHint: 'step by step, with drawings and details',
    briefHint: 'as short, simple text',
    lessons: 'Related lessons on the site',
    reply: 'Type your answer…',
    send: 'Send',
    newQuestion: 'New question',
    making: 'Preparing the board explanation…',
    back: '‹ Back',
    again: 'Watch again',
    error: 'Could not prepare the board. Please try again.',
    limit: 'The AI limit is used up. Try again later.',
    off: 'Board explanations are not connected yet.'
  }
};

/** Ask the server for a board explanation. */
export async function requestBoard(question: string, context?: string, voice = false) {
  return api<{ lesson?: AiBoardLesson; usage?: { messages: number; tokens: number }; error?: string }>('/api/ai/board', {
    method: 'POST',
    json: { question, context, voice }
  });
}

/** What Whisper should expect to hear: what is on the screen right now. */
export function voiceHint(msgs: ChatMsg[], base: string): string {
  const lastTutor = [...chatTurns(msgs)].reverse().find((m) => m.role === 'assistant')?.content ?? '';
  return `${base} ${lastTutor}`.trim();
}

/**
 * Chat history for /api/ai: a finished board counts as one tutor turn that
 * summarises what was shown, so follow-up questions know the explanation.
 */
export function chatTurns(msgs: ChatMsg[]): { role: 'user' | 'assistant'; content: string }[] {
  return msgs.flatMap((m) => {
    if (m.role !== 'board') return [m];
    if (m.state !== 'ready' || !m.lesson) return [];
    const l = m.lesson;
    const text = `[Board explanation "${l.title}"] ${l.steps.map((s, i) => `${i + 1}) ${s.say}`).join(' ')}`;
    return [{ role: 'assistant' as const, content: text.slice(0, 600) }];
  });
}

/* ------------------------------- the board -------------------------------- */

const COLOR = '#f59e0b';

/**
 * A short, silent board lesson inside the AI chat: each part is drawn, the
 * student taps the reply button, and at the end the parts are
 * shown together as one picture. `onDone` fires once, at the first finish.
 */
export function BoardExplainer({ lesson, locale, onDone }: { lesson: AiBoardLesson; locale: string; onDone?: () => void }) {
  const t = BOARD_TEXT[locale] ?? BOARD_TEXT.uz;
  const { play, muted } = useSound();
  const [step, setStep] = useState(0);
  // Gemini voice reads each part aloud (fetched per part, next part prefetched)
  const audioCache = useRef(new Map<number, Promise<string | null>>());
  const audioEl = useRef<HTMLAudioElement | null>(null);
  const voiceFor = (i: number) => {
    const s = lesson.steps[i];
    if (!s) return Promise.resolve(null);
    let p = audioCache.current.get(i);
    if (!p) {
      p = fetch('/api/ai/board/voice', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ text: s.say, lang: locale }) })
        .then((r) => (r.ok ? r.blob() : null))
        .then((b) => (b ? URL.createObjectURL(b) : null))
        .catch(() => null);
      audioCache.current.set(i, p);
    }
    return p;
  };
  const [fromStep, setFromStep] = useState(-1);
  const [runId, setRunId] = useState(1);
  const [ready, setReady] = useState(false);
  const [done, setDone] = useState(false);
  const finished = useRef(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    const cache = audioCache.current;
    return () => {
      audioEl.current?.pause();
      cache.forEach((p) => p.then((u) => u && URL.revokeObjectURL(u)));
    };
  }, []);

  useEffect(() => {
    audioEl.current?.pause();
    if (muted || done) return;
    let live = true;
    voiceFor(step).then((url) => {
      if (!live || !url) return;
      const a = new Audio(url);
      audioEl.current = a;
      a.play().catch(() => {});
    });
    void voiceFor(step + 1);
    return () => {
      live = false;
      audioEl.current?.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, runId, muted, done]);

  function show(i: number, prev: number = step) {
    setFromStep(prev);
    setStep(i);
    setRunId((r) => r + 1);
    setReady(false);
  }

  function next() {
    play('click');
    hapticSelect();
    if (step >= lesson.steps.length - 1) {
      setDone(true);
      if (!finished.current) {
        finished.current = true;
        onDone?.();
      }
      return;
    }
    show(step + 1);
  }

  const cur = lesson.steps[step];

  return (
    <div ref={rootRef} className="w-full">
      <Board
        plan={lesson}
        grid
        step={step}
        fromStep={fromStep}
        runId={runId}
        overview={done}
        onDrawn={() => setReady(true)}
        action={!done && cur ? { label: cur.next, color: COLOR, show: ready, onClick: next } : undefined}
      />
      {!done && cur && (
        <div className="mt-2">
          <div className="rounded-2xl bg-white px-3.5 py-2.5 text-[15.5px] font-semibold leading-relaxed text-ink" aria-live="polite">
            {cur.say}
          </div>
          {step > 0 && ready && (
            <button type="button" onClick={() => show(step - 1)} className="mt-1 rounded-full px-3 py-1.5 text-sm font-black text-ink/55">
              {t.back}
            </button>
          )}
        </div>
      )}
      {done && (
        <div className="mt-2 flex justify-center">
          <button
            type="button"
            onClick={() => {
              play('click');
              setDone(false);
              show(0, -1);
            }}
            className="rounded-full border border-ink/15 bg-white px-4 py-1.5 text-sm font-black text-ink"
          >
            {t.again}
          </button>
        </div>
      )}
    </div>
  );
}

/** Placeholder while the board is being prepared. */
export function BoardLoading({ locale }: { locale: string }) {
  const t = BOARD_TEXT[locale] ?? BOARD_TEXT.uz;
  return (
    <div
      className="grid w-full place-items-center rounded-2xl border border-ink/10 bg-white shadow-card"
      style={{ aspectRatio: '100 / 70', backgroundImage: 'linear-gradient(#edf2f8 1px, transparent 1px), linear-gradient(90deg, #edf2f8 1px, transparent 1px)', backgroundSize: '5% 7.14%' }}
      role="status"
    >
      <div className="px-4 text-center">
        <svg viewBox="0 0 40 40" className="mx-auto h-12 w-12 animate-bounce" aria-hidden>
          <g transform="rotate(-35 20 20)">
            <rect x="17" y="4" width="6" height="24" rx="2" fill="#2563eb" />
            <rect x="17" y="0" width="6" height="6" rx="2" fill="#1e3a8a" />
            <path d="M 17 28 L 23 28 L 20 35 Z" fill="#1f2937" />
          </g>
        </svg>
        <p className="mt-2 text-sm font-extrabold text-ink/55">{t.making}</p>
      </div>
    </div>
  );
}

/** The board entry as it appears inside a chat. */
export function BoardMessage({ msg, locale, onDone }: { msg: Extract<ChatMsg, { role: 'board' }>; locale: string; onDone?: () => void }) {
  if (msg.state === 'loading') return <BoardLoading locale={locale} />;
  if (msg.state === 'error' || !msg.lesson) return <p className="rounded-2xl bg-error/10 px-3 py-2 text-sm font-bold text-error">{msg.error}</p>;
  return <BoardExplainer lesson={msg.lesson} locale={locale} onDone={onDone} />;
}
