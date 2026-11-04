'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTgNativeBack } from '@/lib/tg';

/** Shared styling for the small image nav buttons: pale (desaturated + faded)
 *  by default, full colour on hover/press. */
export const IMG_BTN_CLASS =
  'block h-10 w-auto select-none transition duration-150 opacity-50 saturate-[0.25] hover:opacity-100 hover:saturate-100 active:opacity-100 active:saturate-100 focus-visible:opacity-100 focus-visible:saturate-100 hover:-translate-y-0.5';

/**
 * Consistent top navigation (FR-NAV-1..3): Back image button top-left; sound +
 * language cluster top-right; optional page title in between. Small pale image buttons, localized aria-labels.
 * Sound and language moved to the app-wide sidebar (AppSidebar); the flags are kept for compatibility.
 */
export default function BackBar({
  onBack,
  backHref,
  showMute: _showMute = false,
  showLang: _showLang = false,
  title,
  subtle = false
}: {
  onBack?: () => void;
  backHref?: string;
  showMute?: boolean;
  showLang?: boolean;
  /** optional page title shown on the same line, between back and the toggles */
  title?: string;
  /** small, pale title (lesson pages: the subject name is secondary) */
  subtle?: boolean;
}) {
  const t = useTranslations('common');
  const router = useRouter();

  function back() {
    if (onBack) return onBack();
    if (backHref) return router.push(backHref);
    if (window.history.length > 1) router.back();
    else router.push('/dashboard');
  }
  // Telegram full screen: Telegram's own Back (top-left) replaces ours
  const tgFs = useTgNativeBack(back);

  if (title && tgFs) {
    // share Telegram's button row: the title sits centred between Telegram's
    // Back (left) and ⋯ menu (right); sound + language go on a row below.
    return (
      <div className="mx-auto w-full max-w-5xl" style={{ marginTop: 'calc(-1 * var(--tg-ca-top))' }}>
        <div className="flex items-center justify-center px-[100px]" style={{ height: 'var(--tg-ca-top)' }}>
          <h1 className={`min-w-0 truncate text-center font-black leading-tight ${subtle ? 'text-[15px] text-ink/40' : 'text-[20px] text-ink'}`}>{title}</h1>
        </div>
        <div className="flex items-center justify-end gap-1.5 px-3 pt-1">
          
          
        </div>
      </div>
    );
  }

  if (title) {
    // three columns so the title is truly centred whatever the side widths;
    // back, sound and language graphics share one height (h-10).
    return (
      <div className="mx-auto grid w-full max-w-5xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 pt-3 sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex min-w-0 justify-start">
          <button onClick={back} aria-label={t('back')} title={t('back')} className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/buttons/goBackButton.png" alt="" className={IMG_BTN_CLASS} draggable={false} />
          </button>
        </div>
        <h1 className={`min-w-0 truncate text-center sm:max-w-md font-black leading-tight ${subtle ? 'text-[15px] text-ink/40' : 'text-ink text-[clamp(20px,5.5vw,30px)]'}`}>{title}</h1>
        <div className="flex shrink-0 items-center justify-end gap-1.5">
          
          
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 gap-y-2 flex-wrap w-full max-w-5xl mx-auto px-3 pt-3">
      {!tgFs && (
        <button onClick={back} aria-label={t('back')} title={t('back')} className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/buttons/goBackButton.png" alt="" className={IMG_BTN_CLASS} draggable={false} />
        </button>
      )}
      <div className="ml-auto flex shrink-0 items-center gap-2">
        
        
      </div>
    </div>
  );
}
