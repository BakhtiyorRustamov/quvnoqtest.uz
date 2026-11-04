'use client';

import { useMemo, useState } from 'react';
import { Feedback } from '../math/NumberAnswer';
import { ls } from './strings';

/**
 * MarkPlace — "расставьте знаки препинания". The sentence is shown without
 * its inner punctuation; tapping the gap between two words cycles through the
 * allowed marks (by default only the comma). Check compares with the correct
 * sentence. After two misses the answer can be shown.
 *
 * Props: { sentence: string — the CORRECT sentence, e.g.
 *          "Мальчик, сидевший у окна, читал книгу."
 *          marks?: string[] (default [","]; e.g. [",", "—", ":"] for бессоюзные),
 *          lang, embedded, onAttempt(ok), onCorrect() }
 *   Only marks from `marks` are removed from the sentence and asked for;
 *   the final full stop / question mark stays.
 */
export default function MarkPlace({
  sentence,
  marks = [','],
  lang = 'uz',
  onAttempt,
  onCorrect
}: {
  sentence: string;
  marks?: string[];
  lang?: string;
  embedded?: boolean;
  onAttempt?: (ok: boolean) => void;
  onCorrect?: () => void;
}) {
  const t = ls(lang);
  // words and, for every gap after a word, the correct mark ('' = none)
  const { words, answer } = useMemo(() => {
    const tokens = sentence.trim().split(/\s+/);
    const w: string[] = [];
    const a: string[] = [];
    tokens.forEach((tok, idx) => {
      if (marks.includes(tok) && w.length) {
        // a free-standing mark such as "—"
        a[w.length - 1] = tok;
        return;
      }
      let word = tok;
      let mark = '';
      if (idx < tokens.length - 1) {
        for (const m of marks) {
          if (word.length > m.length && word.endsWith(m)) {
            word = word.slice(0, -m.length);
            mark = m;
            break;
          }
        }
      }
      w.push(word);
      a.push(mark);
    });
    return { words: w, answer: a };
  }, [sentence, marks]);

  const [put, setPut] = useState<string[]>(() => words.map(() => ''));
  const [state, setState] = useState<'idle' | 'wrong' | 'right' | 'shown'>('idle');
  const [why, setWhy] = useState('');
  const [misses, setMisses] = useState(0);
  const finished = state === 'right' || state === 'shown';
  const cycle = ['', ...marks];

  function toggle(i: number) {
    if (finished) return;
    setPut((p) => p.map((v, k) => (k === i ? cycle[(cycle.indexOf(v) + 1) % cycle.length] : v)));
    setState('idle');
    setWhy('');
  }

  function check() {
    if (finished) return;
    const inner = (arr: string[]) => arr.slice(0, -1);
    const a = inner(answer);
    const p = inner(put);
    const ok = a.every((m, i) => m === p[i]);
    onAttempt?.(ok);
    if (ok) {
      setState('right');
      onCorrect?.();
      return;
    }
    setState('wrong');
    setMisses((m) => m + 1);
    setWhy(p.some((m, i) => m && !a[i]) ? t.extra : a.some((m, i) => m && !p[i]) ? t.missing : t.wrongMark);
  }

  const view = state === 'shown' ? answer : put;

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-3">
      <p className="text-center text-sm font-bold text-ink/45">{t.tapGaps}</p>
      <div className="flex flex-wrap items-center justify-center gap-y-2 text-[20px] font-bold leading-relaxed text-ink">
        {words.map((w, i) => (
          <span key={i} className="flex items-center">
            <span>{w}</span>
            {i < words.length - 1 ? (
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-label={`${i + 1}`}
                className={`mx-0.5 grid h-9 min-w-[22px] place-items-center rounded-lg px-1 text-[22px] font-black leading-none transition ${
                  view[i] ? (state === 'right' || state === 'shown' ? 'text-brand-green' : 'text-brand-blue') : 'text-transparent hover:bg-ink/[0.06]'
                } ${!finished ? 'border border-dashed border-ink/15' : ''}`}
              >
                {view[i] || '·'}
              </button>
            ) : null}
          </span>
        ))}
      </div>
      {!finished && (
        <button type="button" onClick={check} className="btn-blue px-8 py-2.5">
          {t.check}
        </button>
      )}
      <Feedback state={state} t={t} custom={state === 'wrong' ? why : undefined} />
      {state === 'wrong' && misses >= 2 && (
        <button
          type="button"
          className="text-sm font-black text-brand-blue underline"
          onClick={() => {
            setState('shown');
            onCorrect?.();
          }}
        >
          {t.show}
        </button>
      )}
    </div>
  );
}
