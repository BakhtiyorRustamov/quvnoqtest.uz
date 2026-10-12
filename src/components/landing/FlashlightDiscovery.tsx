'use client';

import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'framer-motion';
import { Atom, Dna } from './Science';

/* =============================================================================
   Flashlight "discovery" section.
   The cursor becomes a branded flashlight; a hidden layer of science formulas,
   charts and tables is only revealed inside the light circle (a radial mask that
   tracks --mx/--my). A screen-blend glow brightens the info boxes it passes over.
   Works with mouse and touch; reverts to the normal cursor once you leave.
   ============================================================================= */

/* ---- branded flashlight cursor ---- */
function Flashlight() {
  return (
    <svg viewBox="0 0 120 120" width={120} height={120} aria-hidden>
      <circle cx="34" cy="34" r="22" fill="#fff7d0" opacity="0.22" />
      {/* handle */}
      <line x1="58" y1="58" x2="99" y2="99" stroke="#0a1020" strokeWidth="24" strokeLinecap="round" />
      <line x1="58" y1="58" x2="99" y2="99" stroke="#28344a" strokeWidth="15" strokeLinecap="round" />
      {/* grip ring */}
      <line x1="76" y1="76" x2="86" y2="86" stroke="#0a1020" strokeWidth="15" strokeLinecap="butt" opacity="0.55" />
      {/* head / bezel */}
      <line x1="40" y1="40" x2="60" y2="60" stroke="#33425e" strokeWidth="27" strokeLinecap="round" />
      {/* lens */}
      <circle cx="35" cy="35" r="11" fill="#fff6c8" stroke="#caa94e" strokeWidth="2.5" />
      <circle cx="35" cy="35" r="4.5" fill="#fffef0" />
      {/* QuvnoqTest brand dot */}
      <circle cx="83" cy="83" r="7" fill="#0a1020" />
      <path d="M83 77.5a5.5 5.5 0 1 1 -0.1 0" fill="none" stroke="#F39A1F" strokeWidth="2.4" />
      <line x1="86" y1="86" x2="90" y2="90" stroke="#F39A1F" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/* ---- small hidden-layer charts ---- */
function SineWave() {
  return (
    <svg viewBox="0 0 120 50" width={120} height={50} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
      <path d="M2 25 Q 17 0 32 25 T 62 25 T 92 25 T 118 25" />
      <line x1="2" y1="25" x2="118" y2="25" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
function BarChart() {
  return (
    <svg viewBox="0 0 110 60" width={110} height={60} aria-hidden>
      <g fill="currentColor">
        <rect x="6" y="34" width="16" height="24" rx="2" />
        <rect x="30" y="22" width="16" height="36" rx="2" />
        <rect x="54" y="12" width="16" height="46" rx="2" />
        <rect x="78" y="28" width="16" height="30" rx="2" />
      </g>
      <line x1="2" y1="58" x2="106" y2="58" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}
function GoldenSpiral() {
  return (
    <svg viewBox="0 0 90 90" width={90} height={90} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M89 1 A88 88 0 0 1 1 89 A55 55 0 0 1 56 34 A34 34 0 0 1 22 68 A21 21 0 0 1 43 47 A13 13 0 0 1 30 60" />
      <rect x="1" y="1" width="88" height="88" opacity="0.25" />
    </svg>
  );
}
/* ---- hidden science scattered across the dark space ---- */
type Sci = { x: string; y: string; mx?: string; my?: string; node: React.ReactNode; cls?: string };
/* Positioned in a RING around the centred hero box — the top/bottom bands and the
   left/right margins — so a lit formula never sits behind the headline text.
   `mx`/`my` are MOBILE positions (the card spans nearly the full width there, so
   everything is pushed into the top/bottom bands); items without them are hidden
   on mobile via the `m-hide` class. */
const SCIENCE: Sci[] = [
  // top band
  { x: '5%', y: '5%', mx: '4%', my: '2%', node: 'E = mc²', cls: 'text-3xl font-black' },
  { x: '68%', y: '4%', mx: '56%', my: '3%', node: 'a² + b² = c²', cls: 'text-2xl font-bold' },
  { x: '33%', y: '8%', mx: '35%', my: '7%', node: 'πr²', cls: 'text-2xl font-bold text-cyan-200' },
  { x: '87%', y: '11%', mx: '66%', my: '9%', node: <BarChart />, cls: 'text-emerald-300' },
  { x: '15%', y: '13%', mx: '8%', my: '11%', node: 'F = ma', cls: 'text-xl font-bold' },
  { x: '50%', y: '13%', node: 'x = (−b ± √(b²−4ac)) / 2a', cls: 'text-lg font-semibold text-violet-200' },
  // left margin
  { x: '3%', y: '30%', mx: '5%', my: '89%', node: <SineWave />, cls: 'text-sky-300' },
  { x: '2%', y: '46%', mx: '38%', my: '12%', node: 'H₂O · CO₂ · NaCl', cls: 'text-lg font-bold text-emerald-200' },
  { x: '4%', y: '58%', mx: '32%', my: '85%', node: 'E = hf', cls: 'text-xl font-bold text-violet-200' },
  { x: '2%', y: '70%', mx: '6%', my: '84%', node: '∫ f(x) dx', cls: 'text-2xl font-bold text-cyan-200' },
  // right margin
  { x: '86%', y: '28%', node: 'φ = (1 + √5) / 2', cls: 'text-xl font-bold text-yellow-200' },
  { x: '88%', y: '40%', mx: '72%', my: '88%', node: <GoldenSpiral />, cls: 'text-amber-200' },
  { x: '87%', y: '55%', mx: '78%', my: '2%', node: 'PV = nRT', cls: 'text-xl font-bold' },
  { x: '89%', y: '66%', mx: '82%', my: '11%', node: <Atom className="h-16 w-16" />, cls: 'text-fuchsia-300' },
  // bottom band
  { x: '10%', y: '84%', node: 'c = 299 792 458 m/s', cls: 'text-base font-semibold text-yellow-200' },
  { x: '34%', y: '88%', mx: '28%', my: '93%', node: '1 1 2 3 5 8 13 21 34 55', cls: 'text-base font-semibold text-cyan-200' },
  { x: '46%', y: '80%', mx: '4%', my: '96%', node: 'sin²θ + cos²θ = 1', cls: 'text-lg font-semibold' },
  { x: '64%', y: '88%', mx: '62%', my: '96%', node: 'p = mv', cls: 'text-xl font-bold' },
  { x: '76%', y: '80%', mx: '84%', my: '92%', node: <Dna className="h-16 w-16" />, cls: 'text-emerald-300' },
  { x: '22%', y: '92%', mx: '22%', my: '3%', node: 'λ = h / p', cls: 'text-lg font-semibold text-violet-200' },
  { x: '58%', y: '94%', node: '∑ n = n(n+1)/2', cls: 'text-lg font-semibold' },
  { x: '80%', y: '94%', mx: '88%', my: '87%', node: 'v = λf', cls: 'text-xl font-bold' }
];

/* periodic-table style cell used inside the hidden layer */
function PeriodicCell({ x, y, mx, my }: { x: string; y: string; mx?: string; my?: string }) {
  return (
    <div
      className={`sci-item ${mx ? 'm-repos' : 'm-hide'}`}
      style={{ left: x, top: y, ...(mx ? ({ '--m-left': mx, '--m-top': my } as React.CSSProperties) : {}) }}
      aria-hidden
    >
      <div className="rounded-md border border-cyan-300/50 px-3 py-1.5 text-center leading-tight">
        <div className="text-[10px] opacity-70">8</div>
        <div className="text-xl font-black">O</div>
        <div className="text-[10px] opacity-70">16.0</div>
      </div>
    </div>
  );
}

export default function FlashlightDiscovery() {
  const t = useTranslations('landing');
  const reduce = useReducedMotion();

  const ref = useRef<HTMLElement>(null);
  const last = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const [lit, setLit] = useState(false);

  const paint = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${last.current.x - r.left}px`);
    el.style.setProperty('--my', `${last.current.y - r.top}px`);
  }, []);

  const move = useCallback(
    (cx: number, cy: number) => {
      last.current = { x: cx, y: cy };
      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          raf.current = 0;
          paint();
        });
      }
    },
    [paint]
  );

  // keep the light under the pointer while the page scrolls
  useEffect(() => {
    if (!lit) return;
    const onScroll = () => {
      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          raf.current = 0;
          paint();
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lit, paint]);

  const interactive = !reduce;


  return (
    <section
      ref={ref}
      className={`flashlight-section relative overflow-hidden ${lit && interactive ? 'is-lit' : ''}`}
      style={{ background: 'linear-gradient(180deg,#071026 0%,#05060f 50%,#071026 100%)' }}
      onMouseEnter={interactive ? () => setLit(true) : undefined}
      onMouseLeave={interactive ? () => setLit(false) : undefined}
      onMouseMove={interactive ? (e) => move(e.clientX, e.clientY) : undefined}
      onTouchStart={
        interactive
          ? (e) => {
              setLit(true);
              const tch = e.touches[0];
              if (tch) move(tch.clientX, tch.clientY);
            }
          : undefined
      }
      onTouchMove={
        interactive
          ? (e) => {
              const tch = e.touches[0];
              if (tch) move(tch.clientX, tch.clientY);
            }
          : undefined
      }
    >
      {/* hidden science layer */}
      <div className={`discovery-hidden absolute inset-0 z-0 ${interactive ? '' : 'always-on'}`} aria-hidden>
        {SCIENCE.map((s, i) => (
          <span
            key={i}
            className={`sci-item ${s.mx ? 'm-repos' : 'm-hide'} ${s.cls ?? ''}`}
            style={{ left: s.x, top: s.y, ...(s.mx ? ({ '--m-left': s.mx, '--m-top': s.my } as React.CSSProperties) : {}) }}
          >
            {s.node}
          </span>
        ))}
        <PeriodicCell x="92%" y="76%" mx="46%" my="90%" />
        <div className="sci-item m-hide" style={{ left: '6%', top: '18%' }} aria-hidden>
          <table className="border-collapse text-xs text-cyan-200/90">
            <tbody>
              <tr>
                <td className="border border-cyan-300/40 px-2 py-0.5">x</td>
                <td className="border border-cyan-300/40 px-2 py-0.5">1</td>
                <td className="border border-cyan-300/40 px-2 py-0.5">2</td>
                <td className="border border-cyan-300/40 px-2 py-0.5">3</td>
              </tr>
              <tr>
                <td className="border border-cyan-300/40 px-2 py-0.5">x²</td>
                <td className="border border-cyan-300/40 px-2 py-0.5">1</td>
                <td className="border border-cyan-300/40 px-2 py-0.5">4</td>
                <td className="border border-cyan-300/40 px-2 py-0.5">9</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* single hero box, centred — the science elements live AROUND it (see the
          `sci-item` positions above), never behind the text. */}
      <div className="relative z-10 mx-auto grid min-h-[112vh] max-w-4xl place-items-center px-5 py-32">
        <div
          data-scroll-offset
          className="discovery-box glass relative z-10 w-full rounded-[28px] p-7 text-center text-white shadow-2xl sm:p-12"
        >
          <h3 className="text-3xl font-black leading-tight text-brand-orange sm:text-5xl">{t('discovery.learnTitle')}</h3>
          <p className="mx-auto mt-6 max-w-2xl text-base font-semibold leading-relaxed text-white/85 sm:text-lg">
            {t('discovery.learnBody')}
          </p>
          <ul className="mx-auto mt-8 max-w-2xl space-y-3.5 text-left">
            {[t('discovery.c1'), t('discovery.c2'), t('discovery.c3'), t('discovery.c4')].map((c, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] font-semibold text-white/90 sm:text-base">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-green/25 text-brand-green">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* warm light + flashlight cursor */}
      {interactive && (
        <>
          <div className="discovery-glow" aria-hidden />
          <div className="flashlight-cursor" aria-hidden>
            <Flashlight />
          </div>
        </>
      )}
    </section>
  );
}
