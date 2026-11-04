'use client';

import { useEffect, useRef, useState } from 'react';
import { readNumber } from './mathExpr';
import { ms } from './strings';

/**
 * NumberAnswer — the student types a number (decimal comma, minus sign and
 * simple fractions like 3/4 are all accepted). Retry until right; after two
 * misses a "show the answer" button appears.
 *
 * Props: { answer: number | number[], tolerance?: number (absolute),
 *          prefix?: string (e.g. "v ="), unit?: string (e.g. "km/soat"),
 *          lang, embedded, onAttempt(ok), onCorrect() }
 */
export default function NumberAnswer({
  answer,
  tolerance = 1e-9,
  prefix,
  unit,
  lang = 'uz',
  autoFocus = false,
  onAttempt,
  onCorrect
}: {
  answer: number | number[];
  /** put the cursor in the box as soon as the question appears */
  autoFocus?: boolean;
  tolerance?: number;
  prefix?: string;
  unit?: string;
  lang?: string;
  embedded?: boolean;
  onAttempt?: (ok: boolean) => void;
  onCorrect?: () => void;
}) {
  const t = ms(lang);
  const accepted = Array.isArray(answer) ? answer : [answer];
  const [val, setVal] = useState('');
  const [state, setState] = useState<'idle' | 'wrong' | 'unclear' | 'right' | 'shown'>('idle');
  const [misses, setMisses] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const finished = state === 'right' || state === 'shown';

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  // a finished question gives up focus, so no caret is left behind in the locked box
  useEffect(() => {
    if (finished && document.activeElement === inputRef.current) inputRef.current?.blur();
  }, [finished]);

  /** Shake the same box (no re-mount, so the student can keep typing). */
  function shake() {
    inputRef.current?.animate?.(
      [{ transform: 'translateX(0)' }, { transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }],
      { duration: 350, easing: 'ease-in-out' }
    );
  }

  function check() {
    if (finished) return;
    const v = readNumber(val);
    if (v === null) return setState('unclear');
    const ok = accepted.some((a) => Math.abs(a - v) <= tolerance);
    onAttempt?.(ok);
    if (ok) {
      setState('right');
      onCorrect?.();
    } else {
      setState('wrong');
      setMisses((m) => m + 1);
      shake();
    }
  }

  const fmt = (n: number) => String(Math.round(n * 1e6) / 1e6).replace('.', ',');

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3">
      <form
        className="flex w-full items-center justify-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          check();
        }}
      >
        {prefix && <span className="text-xl font-black text-ink">{prefix}</span>}
        <input
          ref={inputRef}
          value={state === 'shown' ? fmt(accepted[0]) : val}
          onChange={(e) => {
            setVal(e.target.value);
            if (!finished) setState('idle');
          }}
          inputMode="decimal"
          autoComplete="off"
          disabled={finished}
          placeholder={t.typeHere}
          aria-label={t.typeHere}
          className={`w-40 rounded-2xl border-2 bg-white px-4 py-3 text-center text-2xl font-black text-ink outline-none transition ${
            state === 'right' ? 'border-brand-green bg-brand-green/10' : state === 'wrong' ? 'border-error' : 'border-ink/15 focus:border-brand-blue'
          }`}
        />
        {unit && <span className="text-lg font-black text-ink/60">{unit}</span>}
      </form>
      {!finished && (
        <button type="button" onClick={check} disabled={!val.trim()} className="btn-blue px-8 py-2.5 disabled:opacity-50">
          {t.check}
        </button>
      )}
      <Feedback state={state} t={t} />
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

export function Feedback({ state, t, unclearKey = 'unclear', custom }: { state: string; t: Record<string, string>; unclearKey?: string; custom?: string }) {
  const msg = custom ?? (state === 'right' ? t.right : state === 'wrong' ? t.again : state === 'unclear' ? t[unclearKey] : state === 'shown' ? t.answer : '');
  if (!msg) return <div className="min-h-[1.5rem]" />;
  const cls = state === 'right' ? 'text-brand-green' : state === 'shown' ? 'text-brand-blue' : 'text-error';
  return (
    <p role="status" className={`min-h-[1.5rem] text-center font-black ${cls}`}>
      {msg}
    </p>
  );
}
