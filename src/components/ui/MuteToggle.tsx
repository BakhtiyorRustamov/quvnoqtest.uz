'use client';

import { useTranslations } from 'next-intl';
import { useSound } from '@/components/providers/SoundProvider';

/** Small image sound toggle — pale by default, full colour on hover/press.
 *  The sound PNG has ~35% soft/transparent edge, so it's scaled 1.5× by default to
 *  render at the same visible size as the back button. */
export default function MuteToggle({ className = '', imgClassName = 'scale-[1.5]' }: { className?: string; imgClassName?: string }) {
  const { muted, toggleMuted } = useSound();
  const t = useTranslations('common');
  return (
    <button
      onClick={toggleMuted}
      aria-label={muted ? t('soundOff') : t('soundOn')}
      title={muted ? t('soundOff') : t('soundOn')}
      className={`mx-1.5 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={muted ? '/buttons/soundOFF.png' : '/buttons/soundON.png'}
        alt=""
        className={`block h-10 w-auto select-none ${imgClassName} transition duration-150 opacity-50 saturate-[0.25] hover:opacity-100 hover:saturate-100 active:opacity-100 active:saturate-100 focus-visible:opacity-100 focus-visible:saturate-100 hover:-translate-y-0.5`}
        draggable={false}
      />
    </button>
  );
}
