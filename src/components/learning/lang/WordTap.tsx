'use client';

import { useMemo, useState } from 'react';
import { ls } from './strings';

/**
 * WordTap — a sentence; the student taps every word that plays a given role
 * (the subject, the predicate, all the attributes, the introductory words…).
 * Correct taps turn green, wrong taps shake. Solved when every target word is
 * found.
 *
 * Props: { sentence: string — targets marked with *asterisks*; a group like
 *          *в тени деревьев* makes every word in it a target,
 *          label?: string (e.g. "сказуемое", shown as a chip),
 *          lang, embedded, onAttempt(ok), onCorrect() }
 */
export default function WordTap({
  sentence,
  label,
  lang = 'uz',
  onAttempt,
  onCorrect
}: {
  sentence: string;
  label?: string;
  lang?: string;
  embedded?: boolean;
  onAttempt?: (ok: boolean) => void;
  onCorrect?: () => void;
}) {
  const t = ls(lang);
  const words = useMemo(() => {
    const out: { text: string; target: boolean }[] = [];
    sentence.split(/(\*[^*]+\*)/).forEach((part) => {
      const target = part.startsWith('*') && part.endsWith('*');
      part
        .replace(/^\*|\*$/g, '')
        .split(/\s+/)
        .filter(Boolean)
        .forEach((w) => {
          // punctuation glued to a word belongs to the word (",", "—" stays separate)
          if (/^[.,!?;:…»)]+$/.test(w) && out.length) out[out.length - 1].text += w;
          else if (/^[—–-]$/.test(w) && out.length) out[out.length - 1].text += ` ${w}`;
          else out.push({ text: w, target });
        });
    });
    return out;
  }, [sentence]);
  const need = words.filter((w) => w.target).length;
  const [picked, setPicked] = useState<number[]>([]);
  const [shake, setShake] = useState<number | null>(null);
  const solved = need > 0 && picked.length === need;

  function tap(i: number) {
    if (solved || picked.includes(i)) return;
    const ok = words[i].target;
    onAttempt?.(ok);
    if (ok) {
      const np = [...picked, i];
      setPicked(np);
      if (np.length === need) onCorrect?.();
    } else {
      setShake(i);
      setTimeout(() => setShake(null), 420);
    }
  }

  return (
    <div className="mx-auto max-w-xl text-center">
      <p className="mb-3 text-sm font-bold text-ink/45">
        {t.tapWords}
        {label && <span className="ml-2 rounded-full bg-brand-blue/10 px-2.5 py-0.5 font-black text-brand-blue">{label}</span>}
      </p>
      <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-2.5">
        {words.map((w, i) => {
          const on = picked.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => tap(i)}
              className={`rounded-xl border-2 px-2.5 py-1.5 text-[19px] font-bold transition ${
                on ? 'border-brand-green bg-brand-green/10 text-brand-green underline decoration-2 underline-offset-4' : 'border-transparent bg-ink/[0.04] text-ink hover:border-ink/15'
              } ${shake === i ? 'animate-[shake_.4s] border-error' : ''}`}
            >
              {w.text}
            </button>
          );
        })}
      </div>
      <p role="status" className="mt-3 min-h-[1.5rem] font-black">
        {solved ? <span className="text-brand-green">{t.right}</span> : shake !== null ? <span className="text-error">{t.again}</span> : null}
      </p>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style>
    </div>
  );
}
