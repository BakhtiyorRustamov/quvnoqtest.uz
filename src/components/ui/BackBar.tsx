'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import MuteToggle from './MuteToggle';
import LangSwitcher from './LangSwitcher';

/**
 * Consistent Back + To-Dashboard navigation (FR-NAV-1..3).
 * Large, thumb-reachable, localized, icon + label.
 * `showLang` adds the UZ/RU/EN language switch to the right cluster
 * (used on subject pages and inside the lesson).
 */
export default function BackBar({
  onBack,
  backHref,
  showMute = true,
  showLang = false,
  homeHref,
  homeLabel
}: {
  onBack?: () => void;
  backHref?: string;
  showMute?: boolean;
  showLang?: boolean;
  /** Override the home button target (e.g. the subject page inside a lesson). */
  homeHref?: string;
  /** Override the home button label (e.g. "Matematika 1"). */
  homeLabel?: string;
}) {
  const t = useTranslations('common');
  const router = useRouter();

  function back() {
    if (onBack) return onBack();
    if (backHref) return router.push(backHref);
    if (window.history.length > 1) router.back();
    else router.push('/dashboard');
  }

  return (
    <div className="flex items-center justify-between gap-2 gap-y-2 flex-wrap w-full max-w-5xl mx-auto px-3 pt-3">
      <button onClick={back} className="btn-ghost text-base" aria-label={t('back')}>
        <span aria-hidden>⬅️</span> {t('back')}
      </button>
      <div className="flex items-center gap-2">
        {showLang && <LangSwitcher />}
        {showMute && <MuteToggle />}
        <Link href={homeHref ?? '/dashboard'} className="btn-blue text-base" aria-label={homeLabel ?? t('toDashboard')}>
          <span aria-hidden>🏠</span> {homeLabel ?? t('toDashboard')}
        </Link>
      </div>
    </div>
  );
}
