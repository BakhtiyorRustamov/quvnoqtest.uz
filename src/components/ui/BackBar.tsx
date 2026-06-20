'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import MuteToggle from './MuteToggle';

/**
 * Consistent Back + To-Dashboard navigation (FR-NAV-1..3).
 * Large, thumb-reachable, localized, icon + label.
 */
export default function BackBar({
  onBack,
  backHref,
  showMute = true
}: {
  onBack?: () => void;
  backHref?: string;
  showMute?: boolean;
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
    <div className="flex items-center justify-between gap-2 w-full max-w-5xl mx-auto px-3 pt-3">
      <button onClick={back} className="btn-ghost text-base" aria-label={t('back')}>
        <span aria-hidden>⬅️</span> {t('back')}
      </button>
      <div className="flex items-center gap-2">
        {showMute && <MuteToggle />}
        <Link href="/dashboard" className="btn-blue text-base" aria-label={t('toDashboard')}>
          <span aria-hidden>🏠</span> {t('toDashboard')}
        </Link>
      </div>
    </div>
  );
}
