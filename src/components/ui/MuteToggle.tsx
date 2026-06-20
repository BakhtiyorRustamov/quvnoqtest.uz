'use client';

import { useTranslations } from 'next-intl';
import { useSound } from '@/components/providers/SoundProvider';

export default function MuteToggle({ className = '' }: { className?: string }) {
  const { muted, toggleMuted } = useSound();
  const t = useTranslations('common');
  return (
    <button
      onClick={toggleMuted}
      aria-label={muted ? t('soundOff') : t('soundOn')}
      title={muted ? t('soundOff') : t('soundOn')}
      className={`w-11 h-11 rounded-full bg-white/90 border border-ink/10 shadow-card text-xl grid place-items-center ${className}`}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  );
}
