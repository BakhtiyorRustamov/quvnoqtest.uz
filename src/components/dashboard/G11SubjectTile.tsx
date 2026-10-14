'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { pick } from '@/lib/i18n-config';
import { g11SubjectHref, type G11Subject } from '@/content/g11/subjects';
import { bestAttempt, useG11StoreVersion } from '@/lib/g11Store';
import { useSound } from '@/components/providers/SoundProvider';

/** Grade-11 subject tile: glass card with the subject name and the best test
 *  result on this device (`- -` until a test has been finished). */
export default function G11SubjectTile({ s, locale, index }: { s: G11Subject; locale: string; index: number }) {
  const reduce = useReducedMotion();
  const { play } = useSound();
  const v = useG11StoreVersion();
  const best = v ? bestAttempt(s.slug) : null; // v=0 on the server render → no storage read
  return (
    <Link href={g11SubjectHref(s.slug)} onClick={() => play('pop')} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.04, 0.4) }}
        whileHover={reduce ? { y: -2 } : { y: -3, boxShadow: `0 10px 24px ${s.color}44, 0 4px 12px rgba(30,58,95,0.12)` }}
        whileTap={{ scale: 0.97 }}
        className="relative flex h-full min-h-[104px] flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white/70 p-3 shadow-card backdrop-blur-md"
      >
        <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-12" style={{ background: `linear-gradient(180deg, ${s.color}22, transparent)` }} />
        <span aria-hidden className="pointer-events-none absolute -right-4 -top-5 h-12 w-12 rounded-full blur-xl" style={{ background: s.color, opacity: 0.25 }} />

        <h3 className="relative line-clamp-2 min-h-[2.5em] text-[15px] font-black leading-tight text-ink sm:text-base">{pick(s.name, locale)}</h3>

        <div className="relative mt-auto pt-2 text-2xl font-black leading-none tracking-wider" style={{ color: s.color }}>
          {best ? (
            <>
              {best.score}
              <span className="text-sm font-extrabold text-ink/35">/{best.total}</span>
            </>
          ) : (
            '- -'
          )}
        </div>
      </motion.div>
    </Link>
  );
}
