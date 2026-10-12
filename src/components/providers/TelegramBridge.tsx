'use client';

import { useEffect } from 'react';
import { inTelegram, tapFeedback, tgVersionAtLeast, whenTg } from '@/lib/tg';

/** Elements that count as a "tap target" for haptic feedback. */
const TAPPABLE = 'button, a[href], [role="button"], [role="tab"], label, summary, select, input[type="checkbox"], input[type="radio"]';

/**
 * App-wide glue for the Telegram Mini App + tap feedback:
 *  • inside Telegram: ready()/expand(), keeps --app-top/--app-bottom equal to
 *    Telegram's safe-area + content-safe-area insets (so our top bar sits below
 *    Telegram's Close / ⋯ buttons in fullscreen), and disables swipe-to-close so
 *    drawing downward with the pen doesn't minimise the app;
 *  • everywhere: a light haptic / vibration on taps (see tapFeedback()).
 */
export default function TelegramBridge() {
  useEffect(() => {
    if (!inTelegram()) return;
    let off = () => {};
    whenTg().then((w) => {
      if (!w) return;
      try {
        w.ready?.();
        w.expand?.();
        if (tgVersionAtLeast(w, '7.7')) w.disableVerticalSwipes?.();
      } catch {
        /* ignore */
      }
      const root = document.documentElement;
      const apply = () => {
        const sa = w.safeAreaInset ?? {};
        const ca = w.contentSafeAreaInset ?? {};
        root.style.setProperty('--app-top', `${(Number(sa.top) || 0) + (Number(ca.top) || 0)}px`);
        root.style.setProperty('--app-bottom', `${(Number(sa.bottom) || 0) + (Number(ca.bottom) || 0)}px`);
      };
      apply();
      const events = ['safeAreaChanged', 'contentSafeAreaChanged', 'fullscreenChanged', 'viewportChanged'];
      events.forEach((e) => w.onEvent?.(e, apply));
      off = () => events.forEach((e) => w.offEvent?.(e, apply));
    });
    return () => off();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.(TAPPABLE) as HTMLElement | null;
      if (!el || (el as HTMLButtonElement).disabled || el.getAttribute('aria-disabled') === 'true') return;
      tapFeedback();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
