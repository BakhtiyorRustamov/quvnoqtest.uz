'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { LessonItem } from '@/content/types';
import { pick } from '@/lib/i18n-config';
import { useSound } from '@/components/providers/SoundProvider';
import { burstConfetti } from '@/lib/confetti';
import ClickCorrect, { type ItemComponentProps } from './items/ClickCorrect';
import MultiSelect from './items/MultiSelect';
import Sequence from './items/Sequence';
import DragSort from './items/DragSort';
import MatchLine from './items/MatchLine';
import DragToSlots from './items/DragToSlots';
import WidgetItem from './items/WidgetItem';

const COMPONENTS: Record<string, React.ComponentType<ItemComponentProps>> = {
  click_correct: ClickCorrect,
  multi_select: MultiSelect,
  sequence: Sequence,
  drag_sort: DragSort,
  match_line: MatchLine,
  drag_order: DragToSlots,
  build: DragToSlots,
  widget: WidgetItem
};

export default function ItemShell({
  item,
  index,
  total,
  locale,
  priorResult,
  onDone,
  onForward
}: {
  item: LessonItem;
  index: number; // 0-based
  total: number;
  locale: string;
  priorResult: boolean | null;
  onDone: (correct: boolean) => void;
  onForward: () => void;
}) {
  const t = useTranslations('lesson');
  const { play } = useSound();
  const [result, setResult] = useState<boolean | null>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const done = priorResult !== null;

  useEffect(() => {
    setResult(null);
    setHelpOpen(false);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [item.id]);

  const isWidget = item.type === 'widget';

  function handleResult(correct: boolean) {
    if (result !== null || done) return;
    setResult(correct);
    // widgets let the child retry until solved and show their own celebration,
    // so completing one always sounds positive; the score still records the
    // first attempt (passed in as `correct`).
    play(isWidget ? 'correct' : correct ? 'correct' : 'wrong');
    if (correct) burstConfetti();
    timer.current = setTimeout(() => onDone(correct), isWidget ? 1100 : correct ? 1500 : 2300);
  }

  const Body = COMPONENTS[item.type] ?? ClickCorrect;
  const shown = done ? priorResult : result;

  return (
    <div className="w-full max-w-2xl mx-auto px-3">
      {/* progress (FR-QZ-2) */}
      <div className="flex items-center justify-center gap-1.5 mt-2" aria-label={t('progress', { current: index + 1, total })}>
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`rounded-full transition-all ${
              i === index ? 'w-5 h-3 bg-brand-orange' : i < index ? 'w-3 h-3 bg-brand-green' : 'w-3 h-3 bg-ink/15'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-extrabold text-ink/60">{t('progress', { current: index + 1, total })}</span>
      </div>

      {/* prompt */}
      <h2 className="text-center font-black text-ink text-xl sm:text-2xl mt-4 text-balance">{pick(item.prompt, locale)}</h2>

      {/* Help / Yordam (FR-QZ-5) */}
      <div className="flex justify-center mt-3">
        <button
          onClick={() => setHelpOpen((o) => !o)}
          aria-expanded={helpOpen}
          className={`btn-ghost text-sm px-4 py-2 ${helpOpen ? 'ring-2 ring-brand-blue/50' : ''}`}
        >
          {t('help')} {helpOpen ? '▲' : '▼'}
        </button>
      </div>
      <AnimatePresence>
        {helpOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 mx-auto max-w-md flex items-start gap-2 rounded-2xl bg-brand-blue/10 border border-brand-blue/25 px-4 py-3 text-ink font-semibold text-[15px]">
              <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" fill="currentColor" aria-hidden>
                <path d="M9 21h6v-1H9v1zm3-19a7 7 0 0 0-4 12.74c.62.45 1 1.17 1 1.95V18h6v-1.31c0-.78.38-1.5 1-1.95A7 7 0 0 0 12 2z" />
              </svg>
              <span>{pick(item.hint, locale)}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the interactive body — visual cues activate while help is open */}
      <div className={done ? 'pointer-events-none opacity-90' : ''}>
        <Body item={item} locale={locale} cue={helpOpen && item.visualHint !== 'none'} done={done} onResult={handleResult} />
      </div>

      {/* feedback banner (FR-QZ-4) — widgets render their own celebration */}
      <div className={`${isWidget ? 'min-h-[12px]' : 'min-h-[64px]'} flex items-center justify-center`}>
        <AnimatePresence>
          {shown !== null && !isWidget && (
            <motion.div
              key={String(shown) + item.id}
              initial={{ y: 24, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`px-6 py-3 rounded-full font-black text-white text-lg shadow-lg ${
                shown ? 'bg-brand-green' : 'bg-brand-blue'
              }`}
              role="status"
            >
              {shown ? t('correct') : t('incorrect')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* revisit mode: continue forward */}
      {done && (
        <div className="text-center pb-4 -mt-2">
          <button onClick={onForward} className="btn-blue">
            {t('next')} ➡️
          </button>
        </div>
      )}
    </div>
  );
}
