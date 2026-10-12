'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WIDGETS } from '@/components/learning/registry';
import type { WidgetSpec } from '@/content/types';

/**
 * ReadAgain — a "📖 Read the text again" button shown on comprehension questions
 * in the Oʻqish savodxonligi subject. Tapping it opens the lesson's reading
 * passage (poem/story/karaoke) in a modal so the child can re-read (and re-hear)
 * the text before answering, then close it and continue — quiz progress is kept.
 * The passage is rendered read-only (`hideDone`) so it can't be "completed" from
 * inside the overlay.
 */
const STR: Record<string, { open: string; close: string }> = {
  uz: { open: '📖 Matnni qayta oʻqish', close: 'Yopish' },
  ru: { open: '📖 Перечитать текст', close: 'Закрыть' },
  en: { open: '📖 Read the text again', close: 'Close' }
};

export default function ReadAgain({ spec, locale }: { spec: WidgetSpec; locale: string }) {
  const [open, setOpen] = useState(false);
  const Widget = WIDGETS[spec.type];
  const t = STR[locale] ?? STR.uz;
  if (!Widget) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-ghost text-sm px-4 py-2 border-brand-orange/40 text-brand-orange"
      >
        {t.open}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal
          >
            <motion.div
              className="card w-full max-w-xl my-6 p-4 bg-white"
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end">
                <button onClick={() => setOpen(false)} className="btn-ghost text-sm px-3 py-1.5">
                  ✕ {t.close}
                </button>
              </div>
              <Widget {...(spec.props ?? {})} lang={locale} embedded hideDone />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
