'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import type { Lesson } from '@/content/types';
import MuteToggle from '@/components/ui/MuteToggle';
import LangSwitcher from '@/components/ui/LangSwitcher';
import { IMG_BTN_CLASS } from '@/components/ui/BackBar';
import AnimatedLogo from '@/components/landing/AnimatedLogo';
import Recall from './Recall';
import ItemShell from './ItemShell';
import Completion from './Completion';
import DrawOverlay from './DrawOverlay';
import { useUser } from '@/components/providers/UserProvider';
import { api } from '@/lib/client';

/** Reading-passage widget types (Oʻqish savodxonligi). */
const READING_TYPES = new Set(['poem_reading', 'story_reading', 'karaoke_reading']);

/**
 * Flow (SRS §6.2): Recall → 10 items one at a time → Completion.
 * step 0 = recall · steps 1..N = items · step N+1 = completion.
 */
export default function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('common');
  const { ensureUser } = useUser();
  const total = lesson.items.length;
  // Oʻqish: the lesson's reading passage (first poem/story/karaoke item), reused
  // by the "read again" button on every comprehension question.
  const passageItem = lesson.items.find(
    (it) => it.type === 'widget' && it.widget && READING_TYPES.has(it.widget.type)
  );
  const passage = passageItem?.widget;
  const passageItemId = passageItem?.id;
  // Game/review lessons skip the read-aloud intro and start on the first item.
  const startStep = lesson.skipRecall ? 1 : 0;
  const [step, setStep] = useState(startStep);
  const [results, setResults] = useState<(boolean | null)[]>(() => Array(total).fill(null));
  const saved = useRef(false);

  // Silent registration fires when the demo starts (FR-LND-8, §6.6.1)
  useEffect(() => {
    ensureUser(1);
  }, [ensureUser]);

  const save = useCallback(
    async (finalResults: (boolean | null)[]) => {
      if (saved.current) return;
      saved.current = true;
      const answers = finalResults.map(Boolean);
      const score = answers.filter(Boolean).length;
      await api('/api/progress', {
        method: 'POST',
        json: { topicKey: lesson.topicId, score, answers }
      }).catch(() => {});
    },
    [lesson.topicId]
  );

  function onItemDone(i: number, correct: boolean) {
    const next = [...results];
    next[i] = correct;
    setResults(next);
    if (i === total - 1) save(next); // last item → persist (FR-QZ-10)
    setStep(i + 1 === total ? total + 1 : i + 2);
  }

  function onBack() {
    if (step <= startStep) {
      // leave the lesson → return to the page the child came from
      if (window.history.length > 1) router.back();
      else router.push('/dashboard');
      return;
    }
    if (step > total) return setStep(total); // completion → last item
    setStep(step - 1);
  }

  const isItem = step >= 1 && step <= total;

  return (
    <main className="min-h-screen flex flex-col pb-8">
      {/* Top bar (FR-QZ-12 / FR-NAV-1): Back top-left · framed brand logo
         truly centred (hidden on the topic-explanation step, where the
         lesson's own topic image is shown instead) · language + sound
         top-right (stacked with sound underneath on mobile, side by side on
         desktop). */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2 w-full max-w-5xl mx-auto px-3 pt-3">
        <div className="justify-self-start">
          <button onClick={onBack} aria-label={t('back')} title={t('back')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/buttons/goBackButton.png" alt="" className={IMG_BTN_CLASS} draggable={false} />
          </button>
        </div>
        <div className="justify-self-center">
          {step !== 0 && (
            <Link
              href="/"
              aria-label="QuvnoqTest.uz"
              className="block w-fit rounded-2xl border-2 border-ink/15 bg-white/80 px-3 py-1 shadow-card transition duration-150 opacity-60 hover:opacity-100 focus-visible:opacity-100 hover:-translate-y-0.5"
            >
              <AnimatedLogo compact />
            </Link>
          )}
        </div>
        <div className="justify-self-end flex flex-col-reverse items-center gap-2 sm:flex-row">
          <MuteToggle />
          <LangSwitcher />
        </div>
      </div>

      <div className="flex-1 relative mt-2">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="recall" exit={{ opacity: 0, x: -40 }}>
              <Recall lesson={lesson} locale={locale} onStart={() => setStep(1)} />
            </motion.div>
          )}

          {isItem && (
            <motion.div
              key={`item-${step}`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.28 }}
            >
              <ItemShell
                item={lesson.items[step - 1]}
                index={step - 1}
                total={total}
                locale={locale}
                priorResult={results[step - 1]}
                passage={passage}
                passageItemId={passageItemId}
                onDone={(c) => onItemDone(step - 1, c)}
                onForward={() => setStep(step + 1 > total ? (results.every((r) => r !== null) ? total + 1 : step) : step + 1)}
              />
            </motion.div>
          )}

          {step === total + 1 && (
            <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Completion lesson={lesson} results={results.map(Boolean)} locale={locale} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* pen / cursor drawing overlay on quiz item steps (not on game lessons) */}
      {isItem && !lesson.skipRecall && <DrawOverlay />}
    </main>
  );
}
