'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import MuteToggle from './MuteToggle';
import LangSwitcher from './LangSwitcher';

/** Shared styling for the small image nav buttons: pale (desaturated + faded)
 *  by default, full colour on hover/press. */
export const IMG_BTN_CLASS =
  'block h-10 w-auto select-none transition duration-150 opacity-50 saturate-[0.25] hover:opacity-100 hover:saturate-100 active:opacity-100 active:saturate-100 focus-visible:opacity-100 focus-visible:saturate-100 hover:-translate-y-0.5';

/**
 * Consistent top navigation (FR-NAV-1..3): Back image button top-left; sound +
 * language cluster top-right; optional page title in between. Small pale image buttons, localized aria-labels.
 * `showLang` adds the UZ/RU/EN language switch (used on subject pages and
 * inside the lesson).
 */
export default function BackBar({
  onBack,
  backHref,
  showMute = true,
  showLang = false,
  title
}: {
  onBack?: () => void;
  backHref?: string;
  showMute?: boolean;
  showLang?: boolean;
  /** optional page title shown on the same line, between back and the toggles */
  title?: string;
}) {
  const t = useTranslations('common');
  const router = useRouter();

  function back() {
    if (onBack) return onBack();
    if (backHref) return router.push(backHref);
    if (window.history.length > 1) router.back();
    else router.push('/dashboard');
  }

  if (title) {
    // three columns so the title is truly centred whatever the side widths;
    // back, sound and language graphics share one height (h-10).
    return (
      <div className="mx-auto grid w-full max-w-5xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 pt-3">
        <div className="flex justify-start">
          <button onClick={back} aria-label={t('back')} title={t('back')} className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/buttons/goBackButton.png" alt="" className={IMG_BTN_CLASS} draggable={false} />
          </button>
        </div>
        <h1 className="max-w-[52vw] truncate text-center font-black text-ink text-[clamp(20px,5.5vw,30px)] leading-tight sm:max-w-md">{title}</h1>
        <div className="flex items-center justify-end gap-2">
          {showMute && <MuteToggle />}
          {showLang && <LangSwitcher imgClassName="h-10" />}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 gap-y-2 flex-wrap w-full max-w-5xl mx-auto px-3 pt-3">
      <button onClick={back} aria-label={t('back')} title={t('back')} className="shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/buttons/goBackButton.png" alt="" className={IMG_BTN_CLASS} draggable={false} />
      </button>
      <div className="ml-auto flex shrink-0 items-center gap-2">
        {showMute && <MuteToggle />}
        {showLang && <LangSwitcher />}
      </div>
    </div>
  );
}
