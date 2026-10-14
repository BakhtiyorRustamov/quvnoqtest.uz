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

const isAndroid = () => typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
const isIOS = () =>
  typeof navigator !== 'undefined' &&
  (/iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));

/**
 * iOS has no Vibration API. Since iOS 18, toggling a native
 * `<input type="checkbox" switch>` plays the system "tick" haptic, and it
 * works when triggered from a user tap — so we toggle an invisible one.
 * Older iOS versions simply do nothing.
 */
function iosTick() {
  try {
    const label = document.createElement('label');
    label.setAttribute('aria-hidden', 'true');
    label.dataset.qtHaptic = '1'; // ignored by the global tap listener
    label.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;pointer-events:none';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.setAttribute('switch', '');
    input.tabIndex = -1;
    label.appendChild(input);
    document.body.appendChild(label);
    label.click();
    label.remove();
  } catch {
    /* ignore */
  }
}

function androidVibrate(pattern: number | number[]) {
  if (isAndroid() && typeof navigator.vibrate === 'function') {
    try {
      navigator.vibrate(pattern);
    } catch {
      /* ignore */
    }
  }
}

/** Telegram haptics object when usable (inside Telegram, Bot API 6.1+). */
function tgHaptics(): any | null {
  if (!inTelegram()) return null;
  const w = tgApp();
  return w && tgVersionAtLeast(w, '6.1') && w.HapticFeedback ? w.HapticFeedback : null;
}

/** Run `tg` with Telegram's haptics, else fall back to the device. */
function buzz(tg: (h: any) => void, android: number | number[], ios = 1) {
  const h = tgHaptics();
  if (h) {
    try {
      tg(h);
      return;
    } catch {
      /* fall through to the device fallback */
    }
  }
  if (isAndroid()) androidVibrate(android);
  else if (isIOS()) for (let i = 0; i < ios; i++) setTimeout(iosTick, i * 90);
}

/** Light tap feedback for buttons and links. */
export function tapFeedback() {
  const now = Date.now();
  if (now - lastTap < 60) return; // one buzz per tap (also stops the iOS tick re-triggering itself)
  lastTap = now;
  buzz((h) => h.impactOccurred('light'), 20);
}

/** Result feedback: success / error / warning. */
export function hapticNotify(kind: 'success' | 'error' | 'warning') {
  lastTap = Date.now();
  buzz((h) => h.notificationOccurred(kind), kind === 'success' ? [30, 60, 30] : kind === 'error' ? [80, 50, 80] : 50, kind === 'success' ? 1 : 2);
}

/** Choosing an option (radio-like). */
export function hapticSelect() {
  lastTap = Date.now();
  buzz((h) => h.selectionChanged(), 15);
}

/* ------------------------------ diagnostics ------------------------------ */

export type TgDiag = Record<string, string>;

/** What the app currently knows about its Telegram / haptics environment. */
export function tgDiagnostics(): TgDiag {
  const w = (window as any).Telegram?.WebApp;
  return {
    'html.tg (Telegram aniqlandi)': String(inTelegram()),
    'SDK yuklandi': String(!!w),
    platform: String(w?.platform ?? '—'),
    version: String(w?.version ?? '—'),
    'HapticFeedback (6.1+)': String(!!tgHaptics()),
    'isVerticalSwipesEnabled': String(w?.isVerticalSwipesEnabled ?? '—'),
    'navigator.vibrate': String(typeof navigator.vibrate === 'function'),
    iOS: String(isIOS()),
    Android: String(isAndroid()),
    hash: location.hash ? location.hash.slice(0, 60) + '…' : '—',
    'TelegramWebviewProxy': `${typeof (window as any).TelegramWebviewProxy}${(window as any).__qtTgProxy ? ' (tiklandi)' : ''}`,
    'performAction handler': String(!!(window as any).webkit?.messageHandlers?.performAction),
    'webkit.messageHandlers': String(!!(window as any).webkit?.messageHandlers),
    'WebView.isIframe': String((window as any).Telegram?.WebView?.isIframe ?? '—'),
    'iframe (window≠parent)': String(window.parent !== window),
    'javoblar (Telegram → app)': String(pingReplies),
    host: location.host,
    'safeArea / content': `${JSON.stringify(w?.safeAreaInset ?? null)} / ${JSON.stringify(w?.contentSafeAreaInset ?? null)}`,
    UA: navigator.userAgent
  };
}

let pingReplies = 0;
let pingBound = false;

export const tgTest = {
  /** call Telegram's native bridge directly, bypassing the SDK */
  proxyHeavy: () => {
    try {
      (window as any).TelegramWebviewProxy?.postEvent('web_app_trigger_haptic_feedback', JSON.stringify({ type: 'impact', impact_style: 'heavy' }));
    } catch {
      /* ignore */
    }
  },
  /** ask Telegram for the theme — if a reply comes back, app→Telegram messages work */
  ping: () => {
    const wv = (window as any).Telegram?.WebView;
    if (!wv) return;
    if (!pingBound) {
      wv.onEvent?.('theme_changed', () => pingReplies++);
      pingBound = true;
    }
    wv.postEvent?.('web_app_request_theme', false);
  },
  light: () => buzz((h) => h.impactOccurred('light'), 20),
  heavy: () => buzz((h) => h.impactOccurred('heavy'), 60),
  success: () => buzz((h) => h.notificationOccurred('success'), [30, 60, 30]),
  error: () => buzz((h) => h.notificationOccurred('error'), [80, 50, 80], 2),
  select: () => buzz((h) => h.selectionChanged(), 15),
  iosTick: () => iosTick(),
  vibrate: () => {
    try {
      navigator.vibrate?.(200);
    } catch {
      /* ignore */
    }
  }
};
