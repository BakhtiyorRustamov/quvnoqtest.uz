'use client';

import { useEffect, useState } from 'react';
import { animate, motion, useReducedMotion } from 'framer-motion';

/** Neutral results reveal: a ring fills to the score percentage while the
 *  number counts up. Same calm animation for any result. */
export default function ScoreRing({ score, total, label }: { score: number; total: number; label: string }) {
  const reduce = useReducedMotion();
  const pct = total ? score / total : 0;
  const [shown, setShown] = useState(reduce ? score : 0);
  const R = 54;
  const C = 2 * Math.PI * R;

  useEffect(() => {
    if (reduce) return setShown(score);
    const ctl = animate(0, score, { duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setShown(Math.round(v)) });
    return () => ctl.stop();
  }, [score, reduce]);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className="mx-auto mt-6 flex flex-col items-center"
    >
      <div className="relative h-40 w-40">
        <svg viewBox="0 0 128 128" className="h-full w-full -rotate-90" aria-hidden>
          <circle cx="64" cy="64" r={R} fill="none" stroke="rgba(30,58,95,0.1)" strokeWidth="12" />
          <motion.circle
            cx="64"
            cy="64"
            r={R}
            fill="none"
            stroke="#1FA7E0"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            animate={{ strokeDashoffset: C * (1 - pct) }}
            transition={reduce ? { duration: 0 } : { duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <div className="text-4xl font-black leading-none text-ink tabular-nums">{shown}</div>
            <div className="mt-1 text-sm font-extrabold text-ink/40">/ {total}</div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-sm font-extrabold text-ink/50">{label}</div>
    </motion.div>
  );
}
