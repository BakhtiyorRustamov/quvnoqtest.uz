'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Slot } from '@/content/types';
import ShapeArt, { artLabel } from '../ShapeArt';
import { useDrag, DragGhost, FingerCue } from '../dragEngine';
import { useSound } from '@/components/providers/SoundProvider';
import { pick } from '@/lib/i18n-config';
import type { ItemComponentProps } from './ClickCorrect';

/**
 * Drag pieces onto target slots. Two layouts:
 *  - drag_order → a numbered row (size ordering, book "compare sizes")
 *  - build      → a little scene: build a house from shapes (creative item)
 */
export default function DragToSlots({ item, locale, cue, done, onResult }: ItemComponentProps) {
  const { play } = useSound();
  const scene = item.type === 'build';
  const [placed, setPlaced] = useState<Record<string, string>>({}); // slotId -> itemId
  const [shakeId, setShakeId] = useState<string | null>(null);
  const mistakes = useRef(0);
  const finished = useRef(false);

  const items = item.items ?? [];
  const slots = item.slots ?? [];
  const placedItems = new Set(Object.values(placed));
  const tray = items.filter((it) => !placedItems.has(it.id));

  const { drag, hot, bind } = useDrag((id, zone) => {
    if (done || finished.current || !zone) return;
    const slot = slots.find((s) => s.id === zone);
    if (!slot || placed[slot.id]) return;
    if (slot.accept === id) {
      play('pop');
      setPlaced((p) => ({ ...p, [slot.id]: id }));
    } else {
      mistakes.current += 1;
      play('wrong');
      setShakeId(id);
      setTimeout(() => setShakeId(null), 500);
    }
  });

  useEffect(() => {
    if (!done && !finished.current && slots.length > 0 && Object.keys(placed).length === slots.length) {
      finished.current = true;
      onResult(mistakes.current === 0);
    }
  }, [placed, slots.length, onResult, done]);

  const dragItem = drag ? items.find((i) => i.id === drag.id) : null;
  const allDone = Object.keys(placed).length === slots.length && slots.length > 0;

  const slotBox = (s: Slot, style?: React.CSSProperties, size = 84) => {
    const filled = placed[s.id] ? items.find((i) => i.id === placed[s.id]) : null;
    return (
      <div
        key={s.id}
        data-zone={s.id}
        style={style}
        className={`grid place-items-center rounded-2xl transition-all ${
          filled ? '' : 'border-[3px] border-dashed border-ink/25 bg-white/50'
        } ${hot === s.id && !filled ? 'dropzone-hot' : ''} ${cue && !filled ? 'cue-pulse' : ''}`}
        aria-label={s.label ? pick(s.label, locale) : undefined}
      >
        {filled ? (
          <motion.div initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 16 }}>
            <ShapeArt art={filled.art} size={size} />
          </motion.div>
        ) : (
          <div className="opacity-80 pointer-events-none p-1.5">
            <ShapeArt art={s.ghost} size={size} ghost />
          </div>
        )}
        {s.label && !scene && (
          <span className="absolute -bottom-7 font-black text-ink/60 text-lg" aria-hidden>
            {pick(s.label, locale)}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="py-4 select-none">
      {scene ? (
        /* ----- build-a-house scene ----- */
        <div className="relative rounded-2xl overflow-hidden border-2 border-brand-blue/20 h-[300px] sm:h-[340px]">
          <div className="absolute inset-0 bg-gradient-to-b from-[#CDEFFF] to-[#EFFAF5]" />
          <div className="absolute bottom-0 inset-x-0 h-[52px] bg-[#A8D878]" />
          {allDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-3 left-4 text-2xl"
              aria-hidden
            >
              🐦
            </motion.div>
          )}
          {/* roof above wall, sun in the sky */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[44px]" style={{ width: 132, height: 132 }}>
            <div className="absolute inset-0">{slotBox(slots.find((s) => s.id === 'wall')!, { width: 132, height: 132, position: 'absolute', inset: 0 }, 112)}</div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[164px]" style={{ width: 152, height: 110 }}>
            {slotBox(slots.find((s) => s.id === 'roof')!, { width: 152, height: 110, position: 'absolute', inset: 0 }, 124)}
          </div>
          <div className="absolute right-[6%] top-3" style={{ width: 96, height: 96 }}>
            {slotBox(slots.find((s) => s.id === 'sun')!, { width: 96, height: 96, position: 'absolute', inset: 0 }, 80)}
          </div>
        </div>
      ) : (
        /* ----- ordered row ----- */
        <div className="flex items-end justify-center gap-4 sm:gap-8 pt-2 pb-10">
          {slots.map((s) => (
            <div key={s.id} className="relative" style={{ width: 96 + 18 * (s.ghost.scale ?? 1), height: 110 }}>
              {slotBox(s, { position: 'absolute', inset: 0 }, 74)}
            </div>
          ))}
        </div>
      )}

      {/* tray */}
      <div className="relative flex items-end justify-center gap-3 sm:gap-6 min-h-[92px] mt-5 flex-wrap">
        {cue && tray.length > 0 && <FingerCue className="absolute -top-5 z-10" />}
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
            <ShapeArt art={it.art} size={62} />
          </div>
        ))}
        {tray.length === 0 && <div className="text-3xl" aria-hidden>🎉</div>}
      </div>

      <DragGhost drag={drag}>{dragItem && <ShapeArt art={dragItem.art} size={62} />}</DragGhost>
    </div>
  );
}
