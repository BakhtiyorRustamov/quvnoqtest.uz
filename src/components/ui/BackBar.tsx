'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import MuteToggle from './MuteToggle';
import LangSwitcher from './LangSwitcher';
import { pushTgBack } from '@/lib/tg';

/** Shared styling for the small image nav buttons: pale (desaturated + faded)
 *  by default, full colour on hover/press. */
export const IMG_BTN_CLASS =
  'block h-10 w-auto select-none transition duration-150 opacity-50 saturate-[0.25] hover:opacity-100 hover:saturate-100 active:opacity-100 active:saturate-100 focus-visible:opacity-100 focus-visible:saturate-100 hover:-translate-y-0.5';

/**
 * Consistent top navigation (FR-NAV-1..3): Back image button top-left; sound +
 * language cluster top-right. Inside Telegram the back button is hidden and
 * Telegram's own Back button is used instead. Small pale image buttons, localized aria-labels.
 * `showLang` adds the UZ/RU/EN language switch (used on subject pages and
 * inside the lesson).
 */
export default function BackBar({
  onBack,
  backHref,
  showMute = true,
  showLang = false
}: {
  onBack?: () => void;
  backHref?: string;
  showMute?: boolean;
  showLang?: boolean;
}) {
  const t = useTranslations('common');
  const router = useRouter();

  function back() {
    if (onBack) return onBack();
    if (backHref) return router.push(backHref);
    if (window.history.length > 1) router.back();
    else router.push('/dashboard');
  }

  // Inside Telegram our back button is hidden (.tg-hide) and Telegram's native
  // Back button runs the same action instead.
  const backRef = useRef(back);
  backRef.current = back;
  useEffect(() => pushTgBack(() => backRef.current()), []);

  return (
    <div className="flex items-center justify-between gap-2 gap-y-2 flex-wrap w-full max-w-5xl mx-auto px-3 pt-3">
      <button onClick={back} aria-label={t('back')} title={t('back')} className="tg-hide">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/buttons/goBackButton.png" alt="" className={IMG_BTN_CLASS} draggable={false} />
      </button>
      <div className="ml-auto flex items-center gap-2">
        {showMute && <MuteToggle />}
        {showLang && <LangSwitcher />}
      </div>
    </div>
  );
}
