'use client';

import { useEffect, useState } from 'react';
import { ms } from './strings';

const STR: Record<string, { lead: string; done: string }> = {
  uz: { lead: 'Qadamlarni tartib bilan bosing — birinchisidan boshlang', done: 'Barakalla, tartib toʻgʻri!' },
  ru: { lead: 'Нажимайте шаги по порядку — начните с первого', done: 'Отлично, порядок верный!' },
  en: { lead: 'Tap the steps in order — start with the first one', done: 'Well done, the order is right!' },
  kaa: { lead: 'Basqıshlardı tártip penen basıń — birinshisinen baslań', done: 'Barakalla, tártip durıs!' }
};

/**
 * StepOrder — put sentence-length solution steps in order. Steps are shown as
 * full-width cards; tapping the right next one moves it up into the numbered
 * list, a wrong one shakes. (OrderLine suits short emoji tiles; this one
 * suits written steps.)
 *
 * Props: { steps: string[] (in the correct order), lang, embedded, onAttempt(ok), onCorrect() }
 */
export default function StepOrder({
  steps,
  lang = 'uz',
  onAttempt,
  onCorrect
}: {
  steps: string[];
  lang?: string;
  embedded?: boolean;
  onAttempt?: (ok: boolean) => void;
  onCorrect?: () => void;
}) {
  const s = STR[lang] ?? STR.uz;
  const t = ms(lang);
  // shuffled after mount: a random order during server rendering would not match the client (hydration error)
  const [shuffled, setShuffled] = useState<number[]>(() => steps.map((_, i) => i));
  useEffect(() => {
    const idx = steps.map((_, i) => i);
    for (let k = idx.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [idx[k], idx[j]] = [idx[j], idx[k]];
    }
    // never start already in order
    if (idx.every((v, i) => v === i) && idx.length > 1) [idx[0], idx[1]] = [idx[1], idx[0]];
    setShuffled(idx);
  }, [steps]);
  const [placed, setPlaced] = useState<number[]>([]);
  const [bad, setBad] = useState<number | null>(null);
  const done = placed.length === steps.length;

  function tap(i: number) {
    if (done || placed.includes(i)) return;
    const ok = i === placed.length;
    onAttempt?.(ok);
    if (ok) {
      const next = [...placed, i];
      setPlaced(next);
      if (next.length === steps.length) onCorrect?.();
    } else {
      setBad(i);
      setTimeout(() => setBad(null), 450);
    }
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-3">
      <p className="text-center text-sm font-bold text-ink/55">{s.lead}</p>
      {placed.length > 0 && (
        <ol className="space-y-1.5">
          {placed.map((i, k) => (
            <li key={i} className="flex items-start gap-2 rounded-2xl border border-brand-green/40 bg-brand-green/10 px-3 py-2.5 font-bold text-ink">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-green text-[13px] font-black text-white">{k + 1}</span>
              <span className="leading-snug">{steps[i]}</span>
            </li>
          ))}
        </ol>
      )}
      {!done && (
        <div className="space-y-1.5">
          {shuffled
            .filter((i) => !placed.includes(i))
            .map((i) => (
              <button
                key={i}
                type="button"
                onClick={() => tap(i)}
                className={`block w-full rounded-2xl border-2 bg-white px-4 py-3 text-left font-bold leading-snug text-ink shadow-sm transition active:translate-y-px ${
                  bad === i ? 'animate-[shake_.35s] border-error bg-error/5' : 'border-ink/10 hover:border-brand-blue/50'
                }`}
              >
                {steps[i]}
              </button>
            ))}
        </div>
      )}
      <p role="status" className={`min-h-[1.5rem] text-center font-black ${done ? 'text-brand-green' : 'text-error'}`}>
        {done ? s.done : bad !== null ? t.again : ''}
      </p>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}`}</style>
    </div>
  );
}
