'use client';

/**
 * Telegram Mini App helpers (client only).
 *
 * The SDK (telegram-web-app.js) is injected by the inline detector in
 * app/layout.tsx ONLY when the page runs inside Telegram; that detector also
 * adds `tg` to <html>. Outside Telegram every helper here is a no-op.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
type TgWebApp = any;

/** True when the page is running inside Telegram (set before hydration). */
export function inTelegram(): boolean {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('tg');
}

/** The live WebApp object, or null (outside Telegram / SDK not loaded yet). */
export function tgApp(): TgWebApp | null {
  if (!inTelegram()) return null;
  const w = (window as any).Telegram?.WebApp;
  return w && w.platform !== 'unknown' ? w : null;
}

let readyPromise: Promise<TgWebApp | null> | null = null;

/** Resolves with the WebApp once the SDK has loaded (null outside Telegram). */
export function whenTg(): Promise<TgWebApp | null> {
  if (typeof window === 'undefined' || !inTelegram()) return Promise.resolve(null);
  if (!readyPromise) {
    readyPromise = new Promise((resolve) => {
      const started = Date.now();
      const tick = () => {
        const w = (window as any).Telegram?.WebApp;
        if (w) return resolve(w.platform !== 'unknown' ? w : null);
        if (Date.now() - started > 8000) return resolve(null);
        setTimeout(tick, 50);
      };
      tick();
    });
  }
  return readyPromise;
}

export function tgVersionAtLeast(w: TgWebApp, v: string): boolean {
  try {
    return !!w?.isVersionAtLeast?.(v);
  } catch {
    return false;
  }
}

/* ------------------------------ Back button ------------------------------ */

// A stack, so nested/overlapping pages always run the newest handler.
const backStack: Array<() => void> = [];
let backBound = false;

function onTgBack() {
  backStack[backStack.length - 1]?.();
}

function syncBack() {
  whenTg().then((w) => {
    if (!w || !w.BackButton || !tgVersionAtLeast(w, '6.1')) return;
    if (!backBound) {
      w.BackButton.onClick(onTgBack);
      backBound = true;
    }
    if (backStack.length) w.BackButton.show();
    else w.BackButton.hide();
  });
}

/** Shows Telegram's native Back button wired to `handler`; returns a cleanup. */
export function pushTgBack(handler: () => void): () => void {
  backStack.push(handler);
  syncBack();
  return () => {
    const i = backStack.lastIndexOf(handler);
    if (i >= 0) backStack.splice(i, 1);
    syncBack();
  };
}

/* -------------------------------- Haptics -------------------------------- */

let lastTap = 0;

/** Light tap feedback: Telegram haptics inside Telegram, vibration on Android
 *  browsers, nothing elsewhere (iOS Safari has no vibration API). */
export function tapFeedback() {
  const now = Date.now();
  if (now - lastTap < 40) return; // one buzz per tap, even if events bubble twice
  lastTap = now;
  if (inTelegram()) {
    const w = tgApp();
    if (w && tgVersionAtLeast(w, '6.1')) {
      try {
        w.HapticFeedback?.impactOccurred?.('light');
      } catch {
        /* ignore */
      }
    }
    return;
  }
  if (typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent) && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(12);
    } catch {
      /* ignore */
    }
  }
}
