'use client';

import { useState } from 'react';
import { Feedback } from '../math/NumberAnswer';
import { ls } from '../lang/strings';

/**
 * BitToggle — eight switches with place values 128 … 1. The student turns bits
 * on and off until the byte equals the target (a number, or a character's
 * ASCII code). The decimal value is shown live.
 *
 * Props: { target: number, char?: string (shown instead of the number), bits?: number (default 8),
 *          lang, embedded, onAttempt(ok), onCorrect() }
 */
export default function BitToggle({
  target,
  char,
  bits = 8,
  lang = 'uz',
  onAttempt,
  onCorrect
}: {
  target: number;
  char?: string;
  bits?: number;
  lang?: string;
  embedded?: boolean;
  onAttempt?: (ok: boolean) => void;
  onCorrect?: () => void;
}) {
  const t = ls(lang);
  const [on, setOn] = useState<boolean[]>(() => Array(bits).fill(false));
  const [state, setState] = useState<'idle' | 'wrong' | 'right' | 'shown'>('idle');
  const [misses, setMisses] = useState(0);
  const finished = state === 'right' || state === 'shown';
  const place = (i: number) => 2 ** (bits - 1 - i);
  const value = on.reduce((s, b, i) => s + (b ? place(i) : 0), 0);

  function check() {
    if (finished) return;
    const ok = value === target;
    onAttempt?.(ok);
    if (ok) {
      setState('right');
      onCorrect?.();
    } else {
      setState('wrong');
      setMisses((m) => m + 1);
    }
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-3">
      <p className="text-lg font-black text-ink">
        {char !== undefined ? (
          <>
            <span className="rounded-lg bg-ink/[0.06] px-2 font-mono">{char}</span> = {target}
          </>
        ) : (
          <>Kerakli son: {target}</>
        )}
      </p>
      <div className="grid w-full gap-1" style={{ gridTemplateColumns: `repeat(${bits}, minmax(0, 1fr))` }}>
        {on.map((b, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="font-mono text-[11px] font-bold text-ink/45">{place(i)}</span>
            <button
              type="button"
              aria-label={`bit ${place(i)}`}
              aria-pressed={b}
              disabled={finished}
              onClick={() => {
                setOn((o) => o.map((x, k) => (k === i ? !x : x)));
                setState('idle');
              }}
              className={`grid h-12 w-full place-items-center rounded-xl border-2 font-mono text-xl font-black transition ${b ? 'border-[#0284c7] bg-[#0ea5e9] text-white' : 'border-ink/15 bg-white text-ink/40'}`}
            >
              {b ? 1 : 0}
            </button>
          </div>
        ))}
      </div>
      <p className="font-mono text-[15px] font-bold text-ink/70">
        {on.map((b) => (b ? 1 : 0)).join('')} = <span className="text-[#0369a1]">{value}</span>
      </p>
      {!finished && (
        <button type="button" onClick={check} className="btn-blue px-8 py-2.5">
          {t.check}
        </button>
      )}
      <Feedback state={state} t={t} />
      {state === 'wrong' && misses >= 2 && (
        <button
          type="button"
          className="text-sm font-black text-brand-blue underline"
          onClick={() => {
            setOn(Array.from({ length: bits }, (_, i) => (target & place(i)) > 0));
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
