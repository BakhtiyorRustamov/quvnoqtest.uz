'use client';

import { useEffect, useRef, useState } from 'react';
import { WIDGETS } from '@/components/learning/registry';
import { useSound } from '@/components/providers/SoundProvider';
import { hapticNotify, hapticSelect } from '@/lib/tg';
import { burstConfetti } from '@/lib/confetti';
import type { PracticeQuestion } from '@/content/g11/board/types';
import { lessonUi } from '@/content/g11/lessonUi';

/**
 * The 10 practice questions under a board lesson, one at a time. The first
 * attempt decides the score (gentle retry: the student keeps going until the
 * widget is solved), then the explanation shows and "Keyingi" moves on.
 */
export default function G11Practice({ questions, color, locale, lang }: { questions: PracticeQuestion[]; color: string; locale: string; /** language of a Russian / English lesson: its widgets and buttons speak it */ lang?: 'uz' | 'ru' | 'en' | 'kaa' }) {
  const { play } = useSound();
  const ui = lessonUi(lang);
  const wLang = lang && lang !== 'uz' ? lang : locale;
  const [i, setI] = useState(0);
  const [round, setRound] = useState(0);
  const [first, setFirst] = useState<(boolean | null)[]>(() => questions.map(() => null));
  const [solved, setSolved] = useState(false);
  const [hint, setHint] = useState(false);
  const [finished, setFinished] = useState(false);
  const attempt = useRef<boolean | null>(null);

  // local development only: ?pq=4 opens question 5 (for reviewing questions quickly)
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    const k = Number(new URLSearchParams(window.location.search).get('pq'));
    if (k > 0 && k < questions.length) setI(k);
  }, [questions.length]);

  const q = questions[i];
  const Widget = q ? WIDGETS[q.widget.type] : undefined;
  const score = first.filter(Boolean).length;

  function onAttempt(ok: boolean) {
    if (attempt.current === null) attempt.current = ok;
    if (!ok) play('wrong');
  }
  function onCorrect() {
    if (solved) return;
    const ok = attempt.current ?? true;
    setFirst((f) => f.map((v, k) => (k === i ? ok : v)));
    setSolved(true);
    play('correct');
    hapticNotify(ok ? 'success' : 'warning');
    if (ok) burstConfetti();
  }
  function next() {
    play('click');
    hapticSelect();
    attempt.current = null;
    setSolved(false);
    setHint(false);
    if (i >= questions.length - 1) {
      setFinished(true);
      play(score >= questions.length * 0.7 ? 'win' : 'pop');
      return;
    }
    setI(i + 1);
  }
  function restart() {
    play('pop');
    attempt.current = null;
    setFirst(questions.map(() => null));
    setI(0);
    setSolved(false);
    setHint(false);
    setFinished(false);
    setRound((r) => r + 1);
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="card p-6 text-center">
        <p className="text-5xl" aria-hidden>
          {pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '💪'}
        </p>
        <p className="mt-2 text-2xl font-black text-ink">
          {score} / {questions.length}
        </p>
        <p className="mt-1 font-semibold text-ink/60">
          {pct >= 80 ? ui.great : pct >= 50 ? ui.good : ui.again}
        </p>
        <button type="button" onClick={restart} className="mt-4 rounded-full border border-ink/15 bg-white px-6 py-2.5 font-black text-ink">
          {ui.redo}
        </button>
      </div>
    );
  }

  if (!q || !Widget) return null;

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-center justify-center gap-1.5" aria-label={`${i + 1} / ${questions.length}`}>
        {questions.map((_, k) => (
          <span
            key={k}
            className="h-2.5 rounded-full transition-all"
            style={{ width: k === i ? 20 : 10, background: k === i ? color : first[k] === true ? '#58CC02' : first[k] === false ? '#1CB0F6' : 'rgba(31,41,55,.15)' }}
          />
        ))}
        <span className="ml-2 text-sm font-extrabold text-ink/55">
          {i + 1} / {questions.length}
        </span>
      </div>

      <h3 className="mt-4 text-center text-[19px] font-black leading-snug text-ink text-balance">{q.prompt}</h3>

      <div className="mt-2 flex justify-center">
        <button type="button" onClick={() => setHint((h) => !h)} className="rounded-full border border-ink/15 bg-white px-3 py-1 text-sm font-black text-ink/70" aria-expanded={hint}>
          {ui.hint} {hint ? '▲' : '▼'}
        </button>
      </div>
      {hint && <p className="mx-auto mt-2 max-w-md rounded-2xl bg-brand-blue/10 px-4 py-2.5 text-center text-[15px] font-semibold text-ink">{q.hint}</p>}

      <div className={`mt-4 ${solved ? 'pointer-events-none' : ''}`}>
        <Widget key={`${round}-${q.id}`} {...q.widget.props} lang={wLang} embedded autoFocus onAttempt={onAttempt} onCorrect={onCorrect} />
      </div>

      {solved && (
        <div className="mt-4">
          <div className={`rounded-2xl px-4 py-3 text-[15.5px] font-semibold text-ink ${first[i] ? 'bg-brand-green/10' : 'bg-brand-blue/10'}`}>
            <span className={`mr-1 font-black ${first[i] ? 'text-brand-green' : 'text-brand-blue'}`}>{first[i] ? ui.right : ui.explain}</span>
            {q.explanation}
          </div>
          <div className="mt-3 flex justify-center">
            <button type="button" onClick={next} className="rounded-full px-8 py-3 font-black text-white shadow-card" style={{ background: color }}>
              {i >= questions.length - 1 ? ui.result : ui.next}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
