'use client';

import * as React from 'react';
import { GRADE_ICONS } from './Science';

/* A single 3D glass grade card (Task 2). Cursor-following tilt is driven by CSS
   custom properties; glow, spring-back, icon hover behaviour and the entrance
   stagger all live in globals.css. Clicking calls `onOpen` — the existing
   grade → subjects flow is preserved by the parent. */
export default function GlassCard({
  grade,
  label,
  accent,
  locked,
  comingSoon,
  index,
  onOpen
}: {
  grade: number;
  label: string;
  accent: string;
  locked: boolean;
  comingSoon: string;
  index: number;
  onOpen: (grade: number) => void;
}) {
  const { Comp, anim } = GRADE_ICONS[grade] ?? GRADE_ICONS[1];

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`);
    e.currentTarget.style.setProperty('--rx', `${(y * -12).toFixed(2)}deg`);
  };
  const reset = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  };

  return (
    <div className="card-reveal" style={{ animationDelay: `${index * 80}ms` }}>
      <button
        type="button"
        onClick={() => onOpen(grade)}
        onPointerMove={onMove}
        onPointerLeave={reset}
        aria-label={label}
        className="grade-card glass relative block w-full aspect-[5/4] rounded-3xl overflow-hidden text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/80"
        style={{ '--card-accent': accent } as React.CSSProperties}
      >
        {/* accent wash + glow blob */}
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ background: `radial-gradient(120% 120% at 50% 0%, ${accent}55, transparent 62%)` }}
        />
        <span
          aria-hidden
          className="absolute -right-7 -top-9 h-24 w-24 rounded-full blur-2xl"
          style={{ background: accent, opacity: 0.5 }}
        />

        {/* per-grade science illustration — pinned to the right edge so it never
           overlaps the big grade number on small (mobile) cards */}
        <span className="gc-icon absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 text-white/90 sm:h-9 sm:w-9" data-anim={anim} aria-hidden>
          <Comp className="h-full w-full" />
        </span>

        {/* big grade number + label pill */}
        <span className="absolute inset-0 flex flex-col items-center justify-end pb-5">
          <span className="font-black leading-none text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.25)] text-[clamp(32px,8.5vw,60px)]">
            {grade}
          </span>
          <span className="mt-2 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-extrabold backdrop-blur-sm sm:text-xs">
            {label}
          </span>
        </span>

        {locked && (
          <span className="gc-ribbon" aria-hidden>
            {comingSoon}
          </span>
        )}
      </button>
    </div>
  );
}
