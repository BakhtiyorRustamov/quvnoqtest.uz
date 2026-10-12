'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { Howl } from 'howler';

export type SfxName = 'click' | 'pop' | 'correct' | 'wrong' | 'win';

const VOLUME: Record<SfxName, number> = {
  click: 0.5,
  pop: 0.6,
  correct: 0.7,
  wrong: 0.5,
  win: 0.8
};

type Ctx = { muted: boolean; toggleMuted: () => void; play: (name: SfxName) => void };
const SoundCtx = createContext<Ctx>({ muted: false, toggleMuted: () => {}, play: () => {} });

/** Royalty-free SFX via howler (FR-SFX-1/2). Library is loaded lazily on first
 *  user-triggered sound so SSR never touches audio APIs. */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(false);
  const cache = useRef<Partial<Record<SfxName, Howl>>>({});
  const mutedRef = useRef(false);

  useEffect(() => {
    const m = localStorage.getItem('qt_muted') === '1';
    setMuted(m);
    mutedRef.current = m;
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted((m) => {
      localStorage.setItem('qt_muted', m ? '0' : '1');
      mutedRef.current = !m;
      return !m;
    });
  }, []);

  const play = useCallback((name: SfxName) => {
    if (mutedRef.current) return;
    const cached = cache.current[name];
    if (cached) {
      cached.play();
      return;
    }
    import('howler')
      .then(({ Howl: HowlCls }) => {
        if (cache.current[name]) {
          cache.current[name]!.play();
          return;
        }
        const h = new HowlCls({ src: [`/audio/sfx/${name}.wav`], volume: VOLUME[name] });
        cache.current[name] = h;
        if (!mutedRef.current) h.play();
      })
      .catch(() => {});
  }, []);

  return <SoundCtx.Provider value={{ muted, toggleMuted, play }}>{children}</SoundCtx.Provider>;
}

export function useSound() {
  return useContext(SoundCtx);
}
