'use client';

import { useEffect, useState } from 'react';

/**
 * VideoLightbox — a small poster thumbnail (sized like a lesson tile) with a
 * play badge. Tapping it opens a fullscreen video player overlay (HTML5 video
 * with native controls). Esc or tapping the backdrop closes it.
 */
export default function VideoLightbox({ src, poster, label }: { src: string; poster: string; label: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={label}
        className="group card flex items-center gap-2 px-2 py-1.5 hover:-translate-y-0.5 transition-transform shrink-0"
      >
        <span className="relative block h-10 w-10 overflow-hidden rounded-lg ring-1 ring-ink/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt="" aria-hidden draggable={false} className="h-full w-full object-cover" />
          <span className="absolute inset-0 grid place-items-center bg-black/25 transition-colors group-hover:bg-black/10">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white/90 shadow">
              <svg viewBox="0 0 24 24" className="h-3 w-3 translate-x-[1px] text-brand-orange" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </span>
        <span className="pr-1 text-[12px] font-extrabold text-ink/70">{label}</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4 animate-[fadeIn_.15s_ease]"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-2xl font-black text-white hover:bg-white/25"
          >
            ✕
          </button>
          {/* stop backdrop-close when interacting with the player */}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <div onClick={(e) => e.stopPropagation()} className="flex max-h-full max-w-full items-center justify-center">
            <video
              src={src}
              poster={poster}
              controls
              autoPlay
              playsInline
              className="h-auto max-h-[88vh] w-auto max-w-[95vw] rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
