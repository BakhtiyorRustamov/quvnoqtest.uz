'use client';

import { useEffect, useRef, useState } from 'react';

/* =============================================================================
   QuvnoqTest landing — MindMarket-style scroll engine
   Layer 1: Lenis smooth scroll · Layer 2: --progress + transform interpolation
   All motion respects prefers-reduced-motion.
   ============================================================================= */

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function prefersReduced() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

/** LAYER 1 — Lenis smooth momentum scroll. No-op under reduced-motion or if the
 *  package is unavailable (native scroll keeps working). */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return;
    let lenis: any = null;
    let raf = 0;
    let cancelled = false;

    import('lenis')
      .then((mod) => {
        if (cancelled) return;
        const Lenis = mod.default;
        document.documentElement.classList.add('lenis');
        lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
        const loop = (time: number) => {
          lenis?.raf(time);
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
      })
      .catch(() => {
        /* lenis not installed → graceful fall-back to native scroll */
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy?.();
      document.documentElement.classList.remove('lenis');
    };
  }, []);
}

/** LAYER 2 — for every [data-scroll-progress] section, write a 0→1 `--progress`
 *  custom property, then drive its `.transform-element` children (translate /
 *  rotate / scale / opacity) and `.scene-card` thresholds. Also runs a subtle
 *  viewport-relative parallax for any [data-scroll-speed] element.
 *
 *  `active` gates the work until the landing content has actually mounted
 *  (the intro plays first), so the queries find real nodes. */
export function useScrollProgress(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const reduce = prefersReduced();

    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-progress]'));
    const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-speed]'));
    let raf = 0;
    let ticking = false;

    const apply = () => {
      const vh = window.innerHeight;
      // On small screens the drifting elements sit in narrow top/bottom bands
      // around the text card — damp their travel so they stay there and never
      // wander across the copy.
      const drift = window.innerWidth < 640 ? 0.35 : 1;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // Pin-relative progress: 0 when the section's top hits the viewport top
        // (sticky pin begins) → 1 when its bottom reaches the viewport bottom
        // (pin ends). This maps the whole pinned phase to 0→1 so the scene
        // animates across the entire time the panel is on screen.
        const progress = reduce ? 0.5 : clamp(-rect.top / (rect.height - vh || 1));
        section.style.setProperty('--progress', progress.toFixed(4));

        section.querySelectorAll<HTMLElement>('.transform-element').forEach((el) => {
          const d = el.dataset;
          const from = d.progFrom ? parseFloat(d.progFrom) : 0;
          const to = d.progTo ? parseFloat(d.progTo) : 1;
          const local = clamp((progress - from) / (to - from || 1));
          const tx = lerp(parseFloat(d.txStart || '0'), parseFloat(d.txEnd || '0'), local) * drift;
          const ty = lerp(parseFloat(d.tyStart || '0'), parseFloat(d.tyEnd || '0'), local) * drift;
          const rot = lerp(parseFloat(d.rotStart || '0'), parseFloat(d.rotEnd || '0'), local);
          const sc = lerp(parseFloat(d.scaleStart || '1'), parseFloat(d.scaleEnd || '1'), local);
          el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(3)})`;
          if (d.opStart || d.opEnd) {
            el.style.opacity = lerp(parseFloat(d.opStart || '1'), parseFloat(d.opEnd || '1'), local).toFixed(3);
          }
        });

        section.querySelectorAll<HTMLElement>('.scene-card[data-appear-at]').forEach((c) => {
          const at = parseFloat(c.dataset.appearAt || '0');
          const span = parseFloat(c.dataset.appearSpan || '0.26');
          const on = reduce ? true : progress >= at && progress < at + span;
          c.classList.toggle('is-visible', on);
        });
      }

      if (!reduce) {
        for (const el of parallax) {
          const speed = parseFloat(el.dataset.scrollSpeed || '0');
          const rect = el.getBoundingClientRect();
          const centerOffset = rect.top + rect.height / 2 - vh / 2;
          el.style.transform = `translate3d(0, ${(centerOffset * speed).toFixed(2)}px, 0)`;
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(() => {
        apply();
        ticking = false;
      });
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [active]);
}

/** Reveal — adds `.is-inview` to [data-scroll-offset] elements as they enter the
 *  viewport (rootMargin keeps the trigger 100px above the bottom edge). */
export function useReveal(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-offset]'));
    if (els.length === 0) return;

    if (prefersReduced()) {
      els.forEach((el) => el.classList.add('is-inview'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-inview');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -100px 0px', threshold: 0.05 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [active]);
}

/** Boolean that flips once the user scrolls past `threshold` px (header blur). */
export function useScrolledPast(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

/** Number that counts up from 0 → `to` the first time it scrolls into view. */
export function CountUp({
  to,
  duration = 1500,
  suffix = '',
  className = ''
}: {
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReduced()) {
      setVal(to);
      return;
    }
    let raf = 0;
    let started = false;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = clamp((now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(to * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {fmt(val)}
      {suffix}
    </span>
  );
}
