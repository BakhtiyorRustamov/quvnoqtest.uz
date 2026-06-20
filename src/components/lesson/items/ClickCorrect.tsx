'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { LessonItem } from '@/content/types';
import ShapeArt, { artLabel } from '../ShapeArt';
import { FingerCue } from '../dragEngine';

export type ItemComponentProps = {
  item: LessonItem;
  locale: string;
  cue: boolean;
  done: boolean;
  onResult: (correct: boolean) => void;
};

/** Single-answer tap item (also used for odd-one-out). */
export default function ClickCorrect({ item, locale, cue, done, onResult }: ItemComponentProps) {
  const [picked, setPicked] = useState<string | null>(null);
  const answer = item.answer?.[0];

  function choose(id: string) {
    if (picked || done) return;
    setPicked(id);
    onResult(id === answer);
  }

  return (
    <div className="relative flex flex-wrap items-end justify-center gap-4 sm:gap-7 py-6">
      {cue && !picked && <FingerCue className="absolute -top-2 right-[12%] z-10" />}
      {item.options?.map((o) => {
        const revealed = picked !== null || done;
        const isAnswer = o.id === answer;
        const isPicked = o.id === picked;
        return (
          <motion.button
            key={o.id}
            onClick={() => choose(o.id)}
            whileHover={!revealed ? { y: -6, scale: 1.05 } : undefined}
            whileTap={!revealed ? { scale: 0.92 } : undefined}
            animate={
              revealed && isAnswer
                ? { scale: [1, 1.18, 1.08] }
                : revealed && isPicked && !isAnswer
                  ? { x: [0, -8, 8, -5, 5, 0] }
                  : {}
            }
            transition={{ duration: 0.45 }}
            aria-label={artLabel(o.art, locale)}
            disabled={revealed}
            className={`rounded-2xl p-3 sm:p-4 bg-white shadow-card border-2 transition-colors min-w-[84px] min-h-[84px] grid place-items-center ${
              revealed && isAnswer
                ? 'border-brand-green ring-4 ring-brand-green/40'
                : revealed && isPicked
                  ? 'border-error ring-4 ring-error/30'
                  : 'border-ink/10 hover:border-brand-blue/50'
            }`}
          >
            <ShapeArt art={o.art} size={82} />
          </motion.button>
        );
      })}
    </div>
  );
}
