'use client';

import { useEffect, useRef, useState } from 'react';
import { sameExpression, sameUpToConstant } from './mathExpr';
import { Feedback } from './NumberAnswer';
import { ms } from './strings';

/**
 * ExpressionAnswer — the student types an algebraic expression; it is checked
 * mathematically (3 + x = x + 3), not letter by letter. A small key row helps
 * on phones (x, ², brackets, ·, −).
 *
 * Props: { answer: string, vars?: string[] (default ['x']), prefix?: string,
 *          noFraction?: boolean (reject answers that still contain "/"),
 *          keys?: string[], plusC?: boolean (antiderivative: any constant / "+ C" accepted),
 *          lang, embedded, onAttempt(ok), onCorrect() }
 */
export default function ExpressionAnswer({
  answer,
  vars = ['x'],
  prefix,
  noFraction = false,
  keys,
  plusC = false,
  lang = 'uz',
  autoFocus = false,
  onAttempt,
  onCorrect
}: {
  answer: string;
  /** put the cursor in the box as soon as the question appears */
  autoFocus?: boolean;
  vars?: string[];
  prefix?: string;
  noFraction?: boolean;
  keys?: string[];
  plusC?: boolean;
  lang?: string;
  embedded?: boolean;
  onAttempt?: (ok: boolean) => void;
  onCorrect?: () => void;
}) {
  const t = ms(lang);
  const [val, setVal] = useState('');
  const [state, setState] = useState<'idle' | 'wrong' | 'unclear' | 'right' | 'shown' | 'fraction'>('idle');
  const [misses, setMisses] = useState(0);
  const autoFocusRef = useRef(autoFocus);
  const input = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (autoFocusRef.current) input.current?.focus({ preventScroll: true });
  }, []);
  const finished = state === 'right' || state === 'shown';
  const keyRow = keys ?? [...vars, '²', '(', ')', '+', '−', '·', '/'];

  function check() {
    if (finished || !val.trim()) return;
    if (noFraction && val.includes('/')) return setState('fraction');
    let ok: boolean;
    try {
      ok = plusC ? sameUpToConstant(val, answer, vars) : sameExpression(val, answer, vars);
    } catch {
      return setState('unclear');
    }
    onAttempt?.(ok);
    if (ok) {
      setState('right');
      onCorrect?.();
    } else {
      setState('wrong');
      setMisses((m) => m + 1);
    }
  }

  function insert(k: string) {
    const el = input.current;
    const s = el?.selectionStart ?? val.length;
    const e = el?.selectionEnd ?? val.length;
    const next = val.slice(0, s) + k + val.slice(e);
    setVal(next);
    if (!finished) setState('idle');
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(s + k.length, s + k.length);
    });
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-3">
      <form
        className="flex w-full items-center justify-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          check();
        }}
      >
        {prefix && <span className="shrink-0 text-xl font-black text-ink">{prefix}</span>}
        <input
          ref={input}
          value={state === 'shown' ? answer : val}
          onChange={(e) => {
            setVal(e.target.value);
            if (!finished) setState('idle');
          }}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          disabled={finished}
          placeholder={t.typeHere}
          aria-label={t.typeHere}
          className={`min-w-0 flex-1 rounded-2xl border-2 bg-white px-4 py-3 text-center text-2xl font-black text-ink outline-none ${
            state === 'right' ? 'border-brand-green bg-brand-green/10' : state === 'wrong' ? 'border-error' : 'border-ink/15 focus:border-brand-blue'
          }`}
        />
      </form>
      {!finished && (
        <div className="flex flex-wrap justify-center gap-1.5">
          {keyRow.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => insert(k === '−' ? '-' : k === '·' ? '*' : k)}
              className="h-10 min-w-10 rounded-xl border border-ink/15 bg-white px-3 text-lg font-black text-ink shadow-sm active:translate-y-px"
            >
              {k}
            </button>
          ))}
        </div>
      )}
      {!finished && (
        <button type="button" onClick={check} disabled={!val.trim()} className="btn-blue px-8 py-2.5 disabled:opacity-50">
          {t.check}
        </button>
      )}
      <Feedback state={state} t={t} unclearKey="unclearExpr" custom={state === 'fraction' ? t.noFraction : undefined} />
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
