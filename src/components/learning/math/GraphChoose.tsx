'use client';

import { useId, useState } from 'react';
import MiniGraph, { GH, GW, type GraphSpec } from './MiniGraph';
import { Feedback } from './NumberAnswer';
import { ms } from './strings';

/**
 * GraphChoose — pick the graph (or every graph) that fits a description.
 * Single answer: a tap decides. Several answers: tap to select, then check.
 *
 * Props: { graphs: { id, graph: GraphSpec, caption? }[], answer: string | string[],
 *          lang, embedded, onAttempt(ok), onCorrect() }
 */
export default function GraphChoose({
  graphs,
  answer,
  lang = 'uz',
  onAttempt,
  onCorrect
}: {
  graphs: { id: string; graph: GraphSpec; caption?: string }[];
  answer: string | string[];
  lang?: string;
  embedded?: boolean;
  onAttempt?: (ok: boolean) => void;
  onCorrect?: () => void;
}) {
  const t = ms(lang);
  const uid = useId().replace(/:/g, '');
  const want = new Set(Array.isArray(answer) ? answer : [answer]);
  const multi = want.size > 1;
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<Set<string>>(new Set());
  const [state, setState] = useState<'idle' | 'wrong' | 'right'>('idle');
  const done = state === 'right';

  function pick(id: string) {
    if (done) return;
    if (!multi) {
      const ok = want.has(id);
      onAttempt?.(ok);
      setSel(new Set([id]));
      if (ok) {
        setState('right');
        onCorrect?.();
      } else {
        setState('wrong');
        setWrong((w) => new Set(w).add(id));
      }
      return;
    }
    setState('idle');
    setSel((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  function checkMany() {
    const ok = sel.size === want.size && [...sel].every((x) => want.has(x));
    onAttempt?.(ok);
    if (ok) {
      setState('right');
      onCorrect?.();
    } else {
      setState('wrong');
      setWrong(new Set([...sel].filter((x) => !want.has(x))));
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-3">
      <p className="text-sm font-bold text-ink/55">{multi ? t.pickMany : t.pick}</p>
      <div className="grid w-full grid-cols-2 gap-2.5">
        {graphs.map((g, i) => {
          const on = sel.has(g.id);
          const bad = wrong.has(g.id) && (!multi || on);
          const good = done && want.has(g.id);
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => pick(g.id)}
              aria-pressed={on}
              className={`rounded-2xl border-2 bg-white p-1.5 text-left transition ${
                good ? 'border-brand-green ring-4 ring-brand-green/20' : bad ? 'border-error opacity-70' : on ? 'border-brand-blue ring-4 ring-brand-blue/20' : 'border-ink/10'
              }`}
            >
              <span className="ml-1 text-sm font-black text-ink/60">{g.caption ?? String.fromCharCode(97 + i) + ')'}</span>
              <svg viewBox={`0 0 ${GW} ${GH}`} className="block w-full">
                <MiniGraph g={g.graph} id={`${uid}-${g.id}`} />
              </svg>
            </button>
          );
        })}
      </div>
      {multi && !done && (
        <button type="button" onClick={checkMany} disabled={!sel.size} className="btn-blue px-8 py-2.5 disabled:opacity-50">
          {t.check}
        </button>
      )}
      <Feedback state={state} t={t} />
    </div>
  );
}
