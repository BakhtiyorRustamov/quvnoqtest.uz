'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { pick } from '@/lib/i18n-config';
import { g11SubjectHref, type G11Subject } from '@/content/g11/subjects';

const BEST: Record<string, string> = { uz: 'Eng yaxshi natija', ru: 'Лучший результат', en: 'Best result' };

/** Compact grade-11 subject tile: same glass look as SubjectProgressCard at
 *  half the size — no play badge, no progress bar, just the name and a
 *  "best result" spot (shows `- -` until real results exist). */
export default function G11SubjectTile({ s, locale, index }: { s: G11Subject; locale: string; index: number }) {
  const reduce = useReducedMotion();
  return (
    <Link href={g11SubjectHref(s.slug)} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.04, 0.4) }}
        whileHover={reduce ? { y: -2 } : { y: -3, boxShadow: `0 10px 24px ${s.color}44, 0 4px 12px rgba(30,58,95,0.12)` }}
        whileTap={{ scale: 0.97 }}
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/70 p-2.5 shadow-card backdrop-blur-md"
      >
        <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-10" style={{ background: `linear-gradient(180deg, ${s.color}22, transparent)` }} />
        <span aria-hidden className="pointer-events-none absolute -right-4 -top-5 h-10 w-10 rounded-full blur-xl" style={{ background: s.color, opacity: 0.25 }} />

        <h3 className="relative line-clamp-2 min-h-[2.5em] text-[13px] font-black leading-tight text-ink sm:text-sm">{pick(s.name, locale)}</h3>

        <div className="relative mt-auto pt-1.5">
          <div className="text-[9.5px] font-extrabold uppercase tracking-wide text-ink/40 leading-tight">{BEST[locale] ?? BEST.uz}</div>
          <div className="text-xl font-black leading-none tracking-widest mt-0.5" style={{ color: s.color }}>
            - -
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
