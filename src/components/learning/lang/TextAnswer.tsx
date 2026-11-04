'use client';

import { useState } from 'react';
import { Feedback } from '../math/NumberAnswer';
import { ls, normText } from './strings';

/**
 * TextAnswer — the student types a word or short phrase into a gap in a
 * sentence ("вставьте пропущенное окончание / слово"). Case, ё/е and extra
 * spaces don't matter; several answers may be accepted. After two misses a
 * "show the answer" button appears.
 *
 * Props: { before?: string, after?: string, answer: string | string[],
 *          width?: number (input width in characters, default 10),
 *          formula?: boolean (spreadsheet formula: spaces, letter case and ; vs , don't matter),
 *          lang, embedded, onAttempt(ok), onCorrect() }
 */
export default function TextAnswer({
  before = '',
  after = '',
  answer,
  width = 10,
  formula = false,
  lang = 'uz',
  onAttempt,
  onCorrect
}: {
  before?: string;
  after?: string;
  answer: string | string[];
  width?: number;
  formula?: boolean;
  lang?: string;
  embedded?: boolean;
  onAttempt?: (ok: boolean) => void;
  onCorrect?: () => void;
}) {
  const t = ls(lang);
  const norm = (v: string) => (formula ? v.replace(/\s+/g, '').replace(/;/g, ',').replace(/[“”«»]/g, '"').toUpperCase() : normText(v));
  const accepted = (Array.isArray(answer) ? answer : [answer]).map(norm);
  const [val, setVal] = useState('');
  const [state, setState] = useState<'idle' | 'wrong' | 'right' | 'shown'>('idle');
  const [misses, setMisses] = useState(0);
  const [shake, setShake] = useState(0);
  const finished = state === 'right' || state === 'shown';

  function check() {
    if (finished || !val.trim()) return;
    const ok = accepted.includes(norm(val));
    onAttempt?.(ok);
    if (ok) {
      setState('right');
      onCorrect?.();
    } else {
      setState('wrong');
      setMisses((m) => m + 1);
      setShake((s) => s + 1);
    }
  }

  const shown = Array.isArray(answer) ? answer[0] : answer;

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-3">
      <form
        className="flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-2 text-center text-xl font-bold leading-relaxed text-ink"
        onSubmit={(e) => {
          e.preventDefault();
          check();
        }}
      >
        {before && <span>{before}</span>}
        <input
          key={shake}
          value={state === 'shown' ? shown : val}
          onChange={(e) => {
            setVal(e.target.value);
            if (!finished) setState('idle');
          }}
          autoComplete="off"
          autoCapitalize="off"
          inputMode={formula ? 'text' : undefined}
          spellCheck={false}
          disabled={finished}
          placeholder={t.typeHere}
          aria-label={t.typeHere}
          style={{ width: `${Math.max(4, width) + 2}ch` }}
          className={`max-w-full rounded-xl border-2 bg-white px-3 py-1.5 text-center text-xl font-black ${formula ? 'font-mono' : ''} text-ink outline-none transition ${
            state === 'right' ? 'border-brand-green bg-brand-green/10' : state === 'wrong' ? 'animate-[shake_.35s] border-error' : state === 'shown' ? 'border-brand-blue' : 'border-ink/15 focus:border-brand-blue'
          }`}
        />
        {after && <span>{after}</span>}
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
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}`}</style>
    </div>
  );
}
