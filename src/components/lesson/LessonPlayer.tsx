'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import type { Lesson } from '@/content/types';
import BackBar from '@/components/ui/BackBar';
import AnimatedLogo from '@/components/landing/AnimatedLogo';
import Recall from './Recall';
import ItemShell from './ItemShell';
import Completion from './Completion';
import DrawOverlay from './DrawOverlay';
import { useUser } from '@/components/providers/UserProvider';
import { api } from '@/lib/client';

/**
 * Flow (SRS §6.2): Recall → 10 items one at a time → Completion.
 * step 0 = recall · steps 1..N = items · step N+1 = completion.
 */
export default function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const router = useRouter();
  const locale = useLocale();
  const { ensureUser } = useUser();
  const total = lesson.items.length;
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
      {/* usual brand logo at the top — hidden on the topic-explanation step,
         where the lesson's own topic image is shown at the top instead */}
      {step !== 0 && (
        <div className="flex justify-center pt-3">
          <Link href="/" aria-label="QuvnoqTest.uz" className="block w-[120px] sm:w-[140px]">
            <AnimatedLogo />
          </Link>
        </div>
      )}

      {/* Back + Sound + Dashboard + Language on every step (FR-QZ-12 / FR-NAV-1) */}
      <BackBar onBack={onBack} showLang />

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
