'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { pick, type L10n } from '@/lib/i18n-config';

type SubjectLike = { key: string; name: L10n; sketch: string; color: string };

/** Light-glassmorphism subject tab for the grade dashboard. Shows the subject
 *  name (big) and learned/total topics (big) with a progress bar. Mirrors the
 *  grade-grid feel — accent glow + cursor tilt — but stays on the white theme. */
export default function SubjectProgressCard({
  s,
  locale,
  href,
  learned,
  total,
  unlocked,
  index,
  soonLabel
}: {
  s: SubjectLike;
  locale: string;
  href: string;
  learned: number;
  total: number;
  unlocked: boolean;
  index: number;
  soonLabel: string;
}) {
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 250, damping: 20 });
  const ry = useSpring(0, { stiffness: 250, damping: 20 });
  const hasContent = total > 0;
  const pct = hasContent ? Math.round((learned / total) * 100) : 0;

  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  function tilt(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  }

  return (
    <Link href={href} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.04, 0.4) }}
        whileHover={reduce ? { y: -3 } : { y: -4, boxShadow: `0 14px 34px ${s.color}44, 0 6px 16px rgba(30,58,95,0.12)` }}
        whileTap={{ scale: 0.98 }}
        onPointerMove={tilt}
        onPointerLeave={() => {
          rx.set(0);
          ry.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 700 }}
        className={`relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white/70 p-4 shadow-card backdrop-blur-md ${
          hasContent ? '' : 'opacity-90'
        }`}
      >
        {/* accent wash + glow corner */}
        <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-16" style={{ background: `linear-gradient(180deg, ${s.color}22, transparent)` }} />
        <span aria-hidden className="pointer-events-none absolute -right-6 -top-7 h-16 w-16 rounded-full blur-2xl" style={{ background: s.color, opacity: 0.25 }} />

        {/* badge (top-right) */}
        <div className="relative flex min-h-[1.75rem] justify-end">
          {hasContent
            ? unlocked && (
                <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-brand-green text-xs font-black text-white shadow">
                  ▶
                </span>
              )
            : (
                <span className="rounded-full border border-amber-300 bg-amber-100 px-2.5 py-1 text-[11px] font-black text-amber-700 shadow-sm">
                  🚧 {soonLabel}
                </span>
              )}
        </div>

        {/* subject name (big) */}
        <h3 className="relative mt-1 line-clamp-2 min-h-[2.5em] text-lg font-black leading-tight text-ink sm:text-xl">
          {pick(s.name, locale)}
        </h3>

        {/* progress (big) + bar */}
        <div className="relative mt-auto pt-3">
          {hasContent ? (
            <>
              <div className="flex items-baseline gap-1.5">
                <span className="text-5xl font-black leading-none" style={{ color: s.color }}>
                  {learned}
                </span>
                <span className="text-xl font-extrabold text-ink/40">/ {total}</span>
              </div>
              <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-ink/10">
                <span
                  className="block h-full rounded-full transition-[width] duration-1000 ease-out"
                  style={{ width: `${shown ? pct : 0}%`, background: s.color }}
                />
              </div>
            </>
          ) : (
            <div className="text-lg font-extrabold text-ink/35">{soonLabel}</div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
