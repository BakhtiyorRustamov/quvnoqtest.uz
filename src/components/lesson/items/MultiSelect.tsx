'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ShapeArt, { artLabel } from '../ShapeArt';
import { FingerCue } from '../dragEngine';
import { useSound } from '@/components/providers/SoundProvider';
import type { ItemComponentProps } from './ClickCorrect';

/** Multi-select + explicit Check button. */
export default function MultiSelect({ item, locale, cue, done, onResult }: ItemComponentProps) {
  const t = useTranslations('lesson');
  const { play } = useSound();
  const [sel, setSel] = useState<Set<string>>(new Set());
  const [checked, setChecked] = useState(false);
  const answers = new Set(item.answer ?? []);

  function toggle(id: string) {
    if (checked || done) return;
    play('pop');
    setSel((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function check() {
    if (checked || done) return;
    setChecked(true);
    const ok = sel.size === answers.size && [...sel].every((id) => answers.has(id));
    onResult(ok);
  }

  return (
    <div className="py-4">
      <div className="relative flex flex-wrap items-center justify-center gap-3 sm:gap-5">
        {cue && !checked && <FingerCue className="absolute -top-4 left-[10%] z-10" />}
        {item.options?.map((o) => {
          const isSel = sel.has(o.id);
          const isAns = answers.has(o.id);
          return (
            <motion.button
              key={o.id}
              onClick={() => toggle(o.id)}
              whileTap={!checked ? { scale: 0.9 } : undefined}
              animate={checked && isSel && !isAns ? { x: [0, -7, 7, -4, 4, 0] } : {}}
              aria-pressed={isSel}
              aria-label={artLabel(o.art, locale)}
              disabled={checked || done}
              className={`relative rounded-2xl p-2.5 bg-white shadow-card border-[3px] min-w-[76px] min-h-[76px] grid place-items-center transition-all ${
                checked
                  ? isAns
                    ? 'border-brand-green ring-4 ring-brand-green/30'
                    : isSel
                      ? 'border-error'
                      : 'border-ink/10 opacity-60'
                  : isSel
                    ? 'border-brand-blue ring-4 ring-brand-blue/25 scale-105'
                    : 'border-ink/10'
              }`}
            >
              <ShapeArt art={o.art} size={64} />
              {isSel && !checked && (
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-blue text-white text-sm font-black grid place-items-center shadow">
                  ✓
                </span>
              )}
              {checked && isAns && (
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-green text-white text-sm font-black grid place-items-center shadow">
                  ✓
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
      {!checked && !done && (
        <div className="text-center mt-6">
          <button onClick={check} disabled={sel.size === 0} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
            {t('check')} ✅
          </button>
        </div>
      )}
    </div>
  );
}
