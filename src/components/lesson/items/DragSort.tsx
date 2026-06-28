'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Bin } from '@/content/types';
import ShapeArt, { artLabel, COLOR_HEX } from '../ShapeArt';
import { useDrag, DragGhost, FingerCue } from '../dragEngine';
import { useSound } from '@/components/providers/SoundProvider';
import { pick } from '@/lib/i18n-config';
import type { ItemComponentProps } from './ClickCorrect';

/** Drag items into labelled bins (size sort, color sort — book ex. 1/3). */
export default function DragSort({ item, locale, cue, done, onResult }: ItemComponentProps) {
  const { play } = useSound();
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [shakeId, setShakeId] = useState<string | null>(null);
  const mistakes = useRef(0);
  const finished = useRef(false);

  const items = item.items ?? [];
  const bins = item.bins ?? [];
  const tray = items.filter((it) => !placed[it.id]);
  const firstUnplaced = tray[0];

  const { drag, hot, bind } = useDrag((id, zone) => {
    if (done || finished.current) return;
    if (!zone) return;
    const it = items.find((x) => x.id === id);
    if (!it) return;
    if (zone === it.bin) {
      play('pop');
      setPlaced((p) => ({ ...p, [id]: zone }));
    } else if (bins.some((b) => b.id === zone)) {
      mistakes.current += 1;
      play('wrong');
      setShakeId(id);
      setTimeout(() => setShakeId(null), 500);
    }
  });

  useEffect(() => {
    if (!done && !finished.current && items.length > 0 && Object.keys(placed).length === items.length) {
      finished.current = true;
      onResult(mistakes.current === 0);
    }
  }, [placed, items.length, onResult, done]);

  const dragItem = drag ? items.find((i) => i.id === drag.id) : null;

  return (
    <div className="py-4 select-none">
      {/* tray */}
      <div className="relative flex items-end justify-center gap-3 sm:gap-5 min-h-[96px] flex-wrap">
        {cue && firstUnplaced && <FingerCue className="absolute -top-5 z-10" />}
        {tray.map((it) => (
          <div
            key={it.id}
            {...bind(it.id)}
            role="button"
            aria-label={artLabel(it.art, locale)}
            className={`draggable rounded-2xl p-2 bg-white shadow-card border-2 border-ink/10 grid place-items-center min-w-[58px] min-h-[58px] ${
              drag?.id === it.id ? 'opacity-30' : ''
            } ${shakeId === it.id ? 'animate-shake' : ''}`}
          >
            <ShapeArt art={it.art} size={64} />
          </div>
        ))}
        {tray.length === 0 && <div className="text-3xl py-3" aria-hidden>🎉</div>}
      </div>

      {/* bins */}
      <div className={`grid gap-3 sm:gap-5 mt-6 ${bins.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {bins.map((b: Bin) => {
          const into = items.filter((it) => placed[it.id] === b.id);
          const isTarget = cue && firstUnplaced?.bin === b.id;
          const color = b.color ? COLOR_HEX[b.color] : '#1FA7E0';
          return (
            <div
              key={b.id}
              data-zone={b.id}
              className={`relative rounded-2xl border-[3px] border-dashed min-h-[120px] sm:min-h-[140px] p-2 pt-8 flex flex-wrap content-start justify-center gap-1.5 transition-all bg-white/70 ${
                hot === b.id ? 'dropzone-hot scale-[1.02]' : ''
              } ${isTarget ? 'cue-pulse' : ''}`}
              style={{ borderColor: color }}
              aria-label={pick(b.label, locale)}
            >
              <span
                className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-white text-sm font-extrabold whitespace-nowrap shadow"
                style={{ background: color }}
              >
                {pick(b.label, locale)}
              </span>
              {into.map((it) => (
                <motion.div key={it.id} initial={{ scale: 0.4 }} animate={{ scale: 1 }} className="pointer-events-none">
                  <ShapeArt art={it.art} size={44} />
                </motion.div>
              ))}
            </div>
          );
        })}
      </div>

      <DragGhost drag={drag}>{dragItem && <ShapeArt art={dragItem.art} size={64} />}</DragGhost>
    </div>
  );
}
