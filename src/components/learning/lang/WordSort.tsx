'use client';

import { useEffect, useState } from 'react';
import { ls } from './strings';

/**
 * WordSort — sort words, phrases or short sentences into groups by TAPPING:
 * tap a card, then tap its group (no dragging, so long sentences work on
 * phones too). Wrong groups shake; solved when every card is placed.
 *
 * Props: { bins: { id, label }[], tiles: { id, label, bin }[],
 *          lang, embedded, onAttempt(ok), onCorrect() }
 */
const COLORS = ['#1CB0F6', '#FF9600', '#58CC02', '#CE82FF'];

export default function WordSort({
  bins,
  tiles,
  lang = 'uz',
  onAttempt,
  onCorrect
}: {
  bins: { id: string; label: string }[];
  tiles: { id: string; label: string; bin: string }[];
  lang?: string;
  embedded?: boolean;
  onAttempt?: (ok: boolean) => void;
  onCorrect?: () => void;
}) {
  const t = ls(lang);
  const [order, setOrder] = useState(tiles);
  // shuffle after mount (the server render keeps the given order)
  useEffect(() => setOrder([...tiles].sort(() => Math.random() - 0.5)), [tiles]);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [sel, setSel] = useState<string | null>(null);
  const [shake, setShake] = useState<string | null>(null);
  const left = order.filter((x) => !placed[x.id]);
  const solved = left.length === 0;

  function drop(bin: string) {
    if (!sel) return;
    const tile = tiles.find((x) => x.id === sel)!;
    const ok = tile.bin === bin;
    onAttempt?.(ok);
    if (ok) {
      const np = { ...placed, [sel]: bin };
      setPlaced(np);
      setSel(null);
      if (Object.keys(np).length === tiles.length) onCorrect?.();
    } else {
      setShake(bin);
      setTimeout(() => setShake(null), 420);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="mb-3 text-center text-sm font-bold text-ink/45">{sel ? t.sortPickBin : t.sortPickCard}</p>
      <div className="flex min-h-[48px] flex-wrap justify-center gap-2">
        {left.map((x) => (
          <button
            key={x.id}
            type="button"
            onClick={() => setSel(sel === x.id ? null : x.id)}
            className={`rounded-xl border-2 bg-white px-3 py-2 text-[16.5px] font-bold leading-snug text-ink shadow-sm transition ${
              sel === x.id ? '-translate-y-0.5 border-brand-blue bg-brand-blue/10' : 'border-ink/15'
            }`}
          >
            {x.label}
          </button>
        ))}
        {solved && <p className="self-center font-black text-brand-green">{t.right}</p>}
      </div>
      <div className={`mt-4 grid gap-2.5 ${bins.length === 2 ? 'grid-cols-2' : bins.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'}`}>
        {bins.map((b, i) => (
          <button
            key={b.id}
            type="button"
            data-bin={b.id}
            onClick={() => drop(b.id)}
            className={`flex min-h-[64px] flex-col items-stretch rounded-2xl border-2 border-dashed p-2 text-left transition ${sel ? 'bg-ink/[0.03]' : ''} ${
              shake === b.id ? 'animate-[shake_.4s] border-error' : ''
            }`}
            style={{ borderColor: shake === b.id ? undefined : COLORS[i % COLORS.length] }}
          >
            <span className="mb-1 self-center rounded-full px-2.5 py-0.5 text-[13px] font-black text-white" style={{ background: COLORS[i % COLORS.length] }}>
              {b.label}
            </span>
            <span className="flex flex-wrap justify-center gap-1">
              {tiles
                .filter((x) => placed[x.id] === b.id)
                .map((x) => (
                  <span key={x.id} className="rounded-lg bg-brand-green/15 px-2 py-0.5 text-[14px] font-bold text-ink">
                    {x.label}
                  </span>
                ))}
            </span>
          </button>
        ))}
      </div>
      <p role="status" className="mt-2 min-h-[1.5rem] text-center font-black text-error">
        {shake ? t.again : ''}
      </p>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}`}</style>
    </div>
  );
}
