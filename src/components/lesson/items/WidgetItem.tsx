'use client';

import { useRef } from 'react';
import { WIDGETS } from '@/components/learning/registry';
import { useSound } from '@/components/providers/SoundProvider';
import { useUser } from '@/components/providers/UserProvider';
import type { ItemComponentProps } from './ClickCorrect';

/**
 * Bridge between the lesson engine and the reusable learning widgets
 * (src/components/learning). Grading rule matches every other item type:
 * the FIRST attempt decides correct/incorrect for the score, but the child
 * keeps interacting until the widget is solved (gentle retry pedagogy),
 * then the shell advances.
 */
export default function WidgetItem({ item, locale, done, onResult }: ItemComponentProps) {
  const { play } = useSound();
  const { user } = useUser();
  const first = useRef<boolean | null>(null);
  const finished = useRef(false);

  const spec = item.widget;
  const Widget = spec ? WIDGETS[spec.type] : undefined;
  if (!spec || !Widget) return null;

  // Self-contained "game" widgets (e.g. the Grand Prix race) manage their own
  // multi-round flow and end screen, so the lesson must NOT advance on the first
  // correct answer — the child plays the whole game and leaves via the Back bar.
  const selfContained = spec.completeOn === 'finish';

  return (
    <div className="py-4">
      <Widget
        {...(spec.props ?? {})}
        lang={locale}
        username={user?.name ?? ''}
        embedded
        debug={false}
        onAttempt={(ok: boolean) => {
          if (selfContained || done || finished.current) return;
          if (first.current === null) first.current = ok;
          if (!ok) play('wrong');
        }}
        onCorrect={() => {
          if (selfContained || done || finished.current) return;
          finished.current = true;
          // let the widget's own little celebration play before advancing
          setTimeout(() => onResult(first.current ?? true), 800);
        }}
      />
    </div>
  );
}
