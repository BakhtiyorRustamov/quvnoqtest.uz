'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { inTelegram } from '@/lib/tg';

/**
 * Hard swipe-down lock for the grade-11 test inside Telegram.
 *
 * Telegram's swipe-to-minimise/close gesture fires when the WebView's own
 * document is scrolled to the very top and the finger pulls down. Instead of
 * relying only on Telegram's disableVerticalSwipes(), the test is moved into
 * its own fixed, scrollable box while the document itself is parked 100px down
 * with scrolling switched off — so the WebView is never "at the top" and the
 * gesture has nothing to grab. Content scrolls normally inside the box.
 *
 * Outside Telegram nothing changes (the box is a plain div, the window scrolls).
 */
export function useTgScrollLock() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!inTelegram()) return;
    const OVERFLOW = 100;
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflowY: body.style.overflowY,
      bodyMarginTop: body.style.marginTop,
      bodyHeight: body.style.height,
      bodyPaddingBottom: body.style.paddingBottom
    };
    const apply = () => {
      html.style.overflow = 'hidden';
      body.style.overflowY = 'hidden';
      body.style.marginTop = `${OVERFLOW}px`;
      body.style.height = `${window.innerHeight + OVERFLOW}px`;
      body.style.paddingBottom = `${OVERFLOW}px`;
      window.scrollTo(0, OVERFLOW);
    };
    apply();
    // keep the document parked even if something else scrolls the window
    const repark = () => {
      if (Math.abs(window.scrollY - OVERFLOW) > 1) window.scrollTo(0, OVERFLOW);
    };
    window.addEventListener('scroll', repark, { passive: true });
    const raf = requestAnimationFrame(repark);
    html.classList.add('tg-scroll-lock');
    setLocked(true);
    window.addEventListener('resize', apply);
    return () => {
      window.removeEventListener('resize', apply);
      window.removeEventListener('scroll', repark);
      cancelAnimationFrame(raf);
      html.classList.remove('tg-scroll-lock');
      html.style.overflow = prev.htmlOverflow;
      body.style.overflowY = prev.bodyOverflowY;
      body.style.marginTop = prev.bodyMarginTop;
      body.style.height = prev.bodyHeight;
      body.style.paddingBottom = prev.bodyPaddingBottom;
      window.scrollTo(0, 0);
    };
  }, []);

  // Touch guard on the scroll box (all tools, not just the pen): cancel the
  // touch move when it would pull the box down past its top, and during
  // sideways swipes (question navigation), so a slightly diagonal swipe can't
  // tug the Telegram window. Ordinary up/down scrolling and taps are untouched.
  useEffect(() => {
    if (!locked) return;
    const el = scrollerRef.current;
    if (!el) return;
    let x0 = 0;
    let y0 = 0;
    let axis: 'x' | 'y' | null = null;
    const start = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
      axis = null;
    };
    const move = (e: TouchEvent) => {
      if (!e.cancelable || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - x0;
      const dy = e.touches[0].clientY - y0;
      if (!axis && Math.abs(dx) + Math.abs(dy) > 6) axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      const pullingDownAtTop = dy > 0 && el.scrollTop <= 0;
      if (axis === 'x' || pullingDownAtTop) e.preventDefault();
    };
    el.addEventListener('touchstart', start, { passive: true });
    el.addEventListener('touchmove', move, { passive: false });
    return () => {
      el.removeEventListener('touchstart', start);
      el.removeEventListener('touchmove', move);
    };
  }, [locked]);

  /** scroll the test back to its top (the box when locked, else the window) */
  const scrollToTop = useCallback(
    (smooth = true) => {
      const behavior: ScrollBehavior = smooth ? 'smooth' : 'auto';
      if (locked && scrollerRef.current) scrollerRef.current.scrollTo({ top: 0, behavior });
      else if (!inTelegram()) window.scrollTo({ top: 0, behavior });
      // in Telegram the window stays parked; never scroll it back to 0
    },
    [locked]
  );

  /** classes for the wrapper box */
  const scrollerClass = locked ? 'fixed inset-0 z-0 overflow-y-auto overscroll-contain' : '';

  return { scrollerRef, locked, scrollerClass, scrollToTop };
}
