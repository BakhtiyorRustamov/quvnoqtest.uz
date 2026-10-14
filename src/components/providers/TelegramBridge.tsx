'use client';

import { useEffect, useState } from 'react';
import { inTelegram, tapFeedback, tgDiagnostics, tgTest, tgVersionAtLeast, whenTg, type TgDiag } from '@/lib/tg';

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Stop Telegram's swipe-down-to-minimise/close: the SDK call (Bot API 7.7+)
 *  plus the raw WebView event it sends, for clients where the helper is missing. */
function lockSwipes(w: any) {
  try {
    w.disableVerticalSwipes?.();
  } catch {
    /* ignore */
  }
  try {
    w.isVerticalSwipesEnabled = false;
  } catch {
    /* read-only on some SDK builds */
  }
  try {
    const tg = (window as any).Telegram?.WebView;
    tg?.postEvent?.('web_app_setup_swipe_behavior', false, { allow_vertical_swipe: false });
  } catch {
    /* ignore */
  }
}

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
      } catch {
        /* ignore */
      }
      lockSwipes(w);
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
      // Telegram can re-enable swipe-to-close after a resize / re-open: lock again.
      const relock = () => lockSwipes(w);
      const relockEvents = ['viewportChanged', 'activated', 'fullscreenChanged'];
      relockEvents.forEach((e) => w.onEvent?.(e, relock));
      // Older clients (< 7.7) have no swipe lock: keep the page scrolled 1px
      // away from the top, so a downward swipe scrolls the page instead of
      // dragging the mini-app window.
      const nudge = () => {
        if (window.scrollY <= 0) window.scrollTo(0, 1);
      };
      const legacy = !tgVersionAtLeast(w, '7.7');
      if (legacy) {
        root.classList.add('tg-legacy-swipe');
        window.addEventListener('touchstart', nudge, { passive: true });
        nudge();
      }
      off = () => {
        events.forEach((e) => w.offEvent?.(e, apply));
        relockEvents.forEach((e) => w.offEvent?.(e, relock));
        if (legacy) window.removeEventListener('touchstart', nudge);
      };
    });
    return () => off();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.('[data-qt-haptic]')) return; // our own iOS haptic switch
      const el = (e.target as Element | null)?.closest?.(TAPPABLE) as HTMLElement | null;
      if (!el || (el as HTMLButtonElement).disabled || el.getAttribute('aria-disabled') === 'true') return;
      tapFeedback();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // hidden diagnostics panel: tap the dashboard logo 5× (or open any page with ?tgtest=1)
  const [diag, setDiag] = useState<TgDiag | null>(null);
  useEffect(() => {
    const open = () => setDiag(tgDiagnostics());
    window.addEventListener('qt-tgdiag', open);
    if (new URLSearchParams(window.location.search).has('tgtest')) setTimeout(open, 1500);
    return () => window.removeEventListener('qt-tgdiag', open);
  }, []);

  if (!diag) return null;
  const btn = 'rounded-xl bg-brand-blue px-3 py-2 text-sm font-black text-white active:scale-95';
  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/50 p-4" style={{ paddingTop: 'calc(var(--app-top) + 1rem)' }}>
      <div className="mx-auto max-w-md rounded-2xl bg-white p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <b className="text-ink">Telegram / haptics test</b>
          <button className="rounded-full bg-ink/10 px-3 py-1 font-black text-ink" onClick={() => setDiag(null)}>
            ✕
          </button>
        </div>
        <table className="mt-3 w-full text-left text-[12px]">
          <tbody>
            {Object.entries(diag).map(([k, v]) => (
              <tr key={k} className="border-t border-ink/10 align-top">
                <td className="py-1 pr-2 font-bold text-ink/60">{k}</td>
                <td className="break-all py-1 font-mono text-ink">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 flex flex-wrap gap-2">
          <button data-qt-haptic="1" className={btn} onClick={tgTest.light}>light</button>
          <button data-qt-haptic="1" className={btn} onClick={tgTest.heavy}>heavy</button>
          <button data-qt-haptic="1" className={btn} onClick={tgTest.select}>select</button>
          <button data-qt-haptic="1" className={btn} onClick={tgTest.success}>success</button>
          <button data-qt-haptic="1" className={btn} onClick={tgTest.error}>error</button>
          <button data-qt-haptic="1" className={btn} onClick={tgTest.iosTick}>iOS tick</button>
          <button data-qt-haptic="1" className={btn} onClick={tgTest.vibrate}>vibrate()</button>
          <button className={btn} onClick={() => setDiag(tgDiagnostics())}>↻</button>
        </div>
      </div>
    </div>
  );
}
