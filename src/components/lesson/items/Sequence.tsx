'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ShapeArt, { artLabel } from '../ShapeArt';
import { FingerCue } from '../dragEngine';
import type { ItemComponentProps } from './ClickCorrect';

/** Pattern continuation on squared notebook paper (daftar katagi — book ex. 4). */
export default function Sequence({ item, locale, cue, done, onResult }: ItemComponentProps) {
  const [picked, setPicked] = useState<string | null>(null);
  const answer = item.answer?.[0];

  function choose(id: string) {
    if (picked || done) return;
    setPicked(id);
    onResult(id === answer);
  }

  const revealed = picked !== null || done;

  return (
    <div className="py-4">
      {/* the pattern row, on notebook grid */}
      <div className="grid-paper rounded-2xl border-2 border-brand-blue/20 px-3 py-5 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        {item.sequence?.map((a, i) => (
          <ShapeArt key={i} art={a} size={52} />
        ))}
        <motion.div
          animate={revealed ? {} : { scale: [1, 1.12, 1] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="w-[52px] h-[52px] rounded-xl border-[3px] border-dashed border-brand-magenta/70 grid place-items-center text-brand-magenta font-black text-2xl bg-white/70"
          aria-hidden
        >
          ?
        </motion.div>
      </div>

      {/* options */}
      <div className="relative flex items-center justify-center gap-4 sm:gap-6 mt-6">
        {cue && !revealed && <FingerCue className="absolute -top-6 left-[18%] z-10" />}
        {item.options?.map((o) => {
          const isAnswer = o.id === answer;
          const isPicked = o.id === picked;
          return (
            <motion.button
              key={o.id}
              onClick={() => choose(o.id)}
              whileHover={!revealed ? { y: -5 } : undefined}
              whileTap={!revealed ? { scale: 0.9 } : undefined}
              animate={
                revealed && isAnswer ? { scale: [1, 1.16, 1.06] } : revealed && isPicked ? { x: [0, -7, 7, -4, 4, 0] } : {}
              }
              aria-label={artLabel(o.art, locale)}
              disabled={revealed}
              className={`rounded-2xl p-3 bg-white shadow-card border-2 min-w-[80px] min-h-[80px] grid place-items-center ${
                revealed && isAnswer
                  ? 'border-brand-green ring-4 ring-brand-green/40'
                  : revealed && isPicked
                    ? 'border-error ring-4 ring-error/30'
                    : 'border-ink/10 hover:border-brand-blue/50'
              }`}
            >
              <ShapeArt art={o.art} size={62} />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
