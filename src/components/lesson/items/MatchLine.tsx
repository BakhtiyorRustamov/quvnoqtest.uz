'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ShapeArt, { artLabel, COLOR_HEX } from '../ShapeArt';
import { useSound } from '@/components/providers/SoundProvider';
import type { ItemComponentProps } from './ClickCorrect';

type Pt = { x: number; y: number };

/** Connect each picture to its shape with a line (book ex. 5). Tap-tap pairing. */
export default function MatchLine({ item, locale, cue, done, onResult }: ItemComponentProps) {
  const { play } = useSound();
  const left = useMemo(() => item.left ?? [], [item.left]);
  const right = useMemo(() => item.right ?? [], [item.right]);

  const allPairs = useMemo(() => {
    const m: Record<string, string> = {};
    left.forEach((l) => {
      if (l.match) m[l.id] = l.match;
    });
    return m;
  }, [left]);

  const [matched, setMatched] = useState<Record<string, string>>(done ? allPairs : {});
  const [sel, setSel] = useState<{ side: 'l' | 'r'; id: string } | null>(null);
  const [flash, setFlash] = useState<{ l: string; r: string } | null>(null);
  const [tick, setTick] = useState(0);
  const mistakes = useRef(0);
  const finished = useRef(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef(new Map<string, HTMLElement>());
  const setNode = useCallback((id: string) => (el: HTMLElement | null) => {
    if (el) nodeRefs.current.set(id, el);
  }, []);

  useLayoutEffect(() => {
    const ro = new ResizeObserver(() => setTick((t) => t + 1));
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!done && !finished.current && left.length > 0 && Object.keys(matched).length === left.length) {
      finished.current = true;
      onResult(mistakes.current === 0);
    }
  }, [matched, left.length, onResult, done]);

  function anchor(id: string, side: 'l' | 'r'): Pt | null {
    const el = nodeRefs.current.get(id);
    const c = containerRef.current;
    if (!el || !c) return null;
    const r = el.getBoundingClientRect();
    const cr = c.getBoundingClientRect();
    return { x: (side === 'l' ? r.right : r.left) - cr.left, y: r.top + r.height / 2 - cr.top };
  }

  function tap(side: 'l' | 'r', id: string) {
    if (done || finished.current) return;
    if (side === 'l' && matched[id]) return;
    if (side === 'r' && Object.values(matched).includes(id)) return;

    if (!sel || sel.side === side) {
      play('click');
      setSel({ side, id });
      return;
    }
    const lId = side === 'l' ? id : sel.id;
    const rId = side === 'r' ? id : sel.id;
    if (allPairs[lId] === rId) {
      play('pop');
      setMatched((m) => ({ ...m, [lId]: rId }));
    } else {
      mistakes.current += 1;
      play('wrong');
      setFlash({ l: lId, r: rId });
      setTimeout(() => setFlash(null), 480);
    }
    setSel(null);
  }

  // lines
  const lines: Array<{ from: Pt; to: Pt; color: string; dashed?: boolean; red?: boolean }> = [];
  if (typeof window !== 'undefined') {
    void tick;
    for (const [lId, rId] of Object.entries(matched)) {
      const from = anchor(lId, 'l');
      const to = anchor(rId, 'r');
      const art = left.find((x) => x.id === lId)?.art;
      if (from && to) lines.push({ from, to, color: art?.color ? COLOR_HEX[art.color] : '#1FA7E0' });
    }
    if (flash) {
      const from = anchor(flash.l, 'l');
      const to = anchor(flash.r, 'r');
      if (from && to) lines.push({ from, to, color: '#E14B4B', red: true });
    }
    if (cue) {
      const firstOpen = left.find((l) => !matched[l.id]);
      if (firstOpen?.match) {
        const from = anchor(firstOpen.id, 'l');
        const to = anchor(firstOpen.match, 'r');
        if (from && to) lines.push({ from, to, color: '#9AA7B4', dashed: true });
      }
    }
  }

  const cell = (side: 'l' | 'r') => (o: { id: string; art: any }) => {
    const isMatched = side === 'l' ? !!matched[o.id] : Object.values(matched).includes(o.id);
    const isSel = sel?.side === side && sel.id === o.id;
    return (
      <button
        key={o.id}
        ref={setNode(o.id) as any}
        onClick={() => tap(side, o.id)}
        aria-label={artLabel(o.art, locale)}
        aria-pressed={isSel}
        disabled={isMatched || done}
        className={`rounded-2xl p-2 bg-white shadow-card border-[3px] grid place-items-center min-h-[76px] transition-all ${
          isMatched
            ? 'border-brand-green/70 opacity-90'
            : isSel
              ? 'border-brand-blue ring-4 ring-brand-blue/30 scale-105'
              : 'border-ink/10 hover:border-brand-blue/40'
        }`}
      >
        <ShapeArt art={o.art} size={58} />
      </button>
    );
  };

  return (
    <div ref={containerRef} className="relative py-4">
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" aria-hidden>
        {lines.map((ln, i) => (
          <motion.line
            key={i}
            x1={ln.from.x}
            y1={ln.from.y}
            x2={ln.to.x}
            y2={ln.to.y}
            stroke={ln.color}
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={ln.dashed ? '8 8' : undefined}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: ln.dashed ? 0.6 : 1 }}
            transition={{ duration: 0.3 }}
            className={ln.dashed ? 'cue-arrow' : ''}
          />
        ))}
      </svg>
      <div className="grid grid-cols-2 gap-x-[clamp(48px,18vw,150px)] gap-y-3 max-w-md mx-auto">
        <div className="flex flex-col gap-3">{left.map(cell('l'))}</div>
        <div className="flex flex-col gap-3">{right.map(cell('r'))}</div>
      </div>
    </div>
  );
}
