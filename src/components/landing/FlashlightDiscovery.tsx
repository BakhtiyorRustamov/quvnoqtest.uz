'use client';

import * as React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from 'framer-motion';
import { useSound } from '@/components/providers/SoundProvider';
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
function DeviceTrio() {
  return (
    <svg viewBox="0 0 200 110" className="h-24 w-auto" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
      <rect x="40" y="14" width="110" height="68" rx="6" />
      <line x1="30" y1="90" x2="160" y2="90" strokeWidth="5" strokeLinecap="round" />
      <rect x="158" y="40" width="34" height="58" rx="6" />
      <circle cx="175" cy="90" r="2.4" fill="currentColor" />
      <circle cx="95" cy="48" r="13" />
      <path d="M88 48a7 7 0 0 1 14 0" />
    </svg>
  );
}

/* ---- hidden science scattered across the dark space ---- */
type Sci = { x: string; y: string; node: React.ReactNode; cls?: string };
const SCIENCE: Sci[] = [
  { x: '5%', y: '6%', node: 'E = mc²', cls: 'text-3xl font-black' },
  { x: '68%', y: '4%', node: 'a² + b² = c²', cls: 'text-2xl font-bold' },
  { x: '30%', y: '11%', node: 'πr²', cls: 'text-2xl font-bold text-cyan-200' },
  { x: '85%', y: '14%', node: <BarChart />, cls: 'text-emerald-300' },
  { x: '8%', y: '20%', node: 'F = ma', cls: 'text-xl font-bold' },
  { x: '52%', y: '17%', node: 'x = (−b ± √(b²−4ac)) / 2a', cls: 'text-lg font-semibold text-violet-200' },
  { x: '74%', y: '24%', node: 'φ = (1 + √5) / 2', cls: 'text-xl font-bold text-yellow-200' },
  { x: '12%', y: '33%', node: <SineWave />, cls: 'text-sky-300' },
  { x: '60%', y: '31%', node: 'PV = nRT', cls: 'text-xl font-bold' },
  { x: '34%', y: '40%', node: '1 1 2 3 5 8 13 21 34 55', cls: 'text-base font-semibold text-cyan-200' },
  { x: '82%', y: '38%', node: <GoldenSpiral />, cls: 'text-amber-200' },
  { x: '6%', y: '48%', node: 'H₂O · CO₂ · NaCl', cls: 'text-lg font-bold text-emerald-200' },
  { x: '55%', y: '47%', node: 'v = λf', cls: 'text-xl font-bold' },
  { x: '24%', y: '56%', node: 'E = hf', cls: 'text-xl font-bold text-violet-200' },
  { x: '70%', y: '57%', node: '∑ n = n(n+1)/2', cls: 'text-lg font-semibold' },
  { x: '88%', y: '63%', node: <Atom className="h-16 w-16" />, cls: 'text-fuchsia-300' },
  { x: '10%', y: '66%', node: '∫ f(x) dx', cls: 'text-2xl font-bold text-cyan-200' },
  { x: '44%', y: '70%', node: 'sin²θ + cos²θ = 1', cls: 'text-lg font-semibold' },
  { x: '74%', y: '76%', node: <Dna className="h-16 w-16" />, cls: 'text-emerald-300' },
  { x: '16%', y: '80%', node: 'c = 299 792 458 m/s', cls: 'text-base font-semibold text-yellow-200' },
  { x: '52%', y: '85%', node: 'p = mv', cls: 'text-xl font-bold' },
  { x: '30%', y: '90%', node: 'λ = h / p', cls: 'text-lg font-semibold text-violet-200' }
];

/* periodic-table style cell used inside the hidden layer */
function PeriodicCell({ x, y }: { x: string; y: string }) {
  return (
    <div className="sci-item" style={{ left: x, top: y }} aria-hidden>
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
  const router = useRouter();
  const { play } = useSound();
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

  const goUpgrade = () => {
    play('pop');
    router.push('/upgrade');
  };
  const goDemo = () => {
    play('win');
    router.push('/lesson/g1-math-01');
  };

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
          <span key={i} className={`sci-item ${s.cls ?? ''}`} style={{ left: s.x, top: s.y }}>
            {s.node}
          </span>
        ))}
        <PeriodicCell x="62%" y="66%" />
        <div className="sci-item" style={{ left: '40%', top: '24%' }} aria-hidden>
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

      {/* content boxes */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-24">
        <div data-scroll-offset className="text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl">{t('discovery.title')}</h2>
          <p className="mt-2 text-sm font-semibold text-white/55">{interactive ? t('discovery.hint') : t('discovery.hintTap')}</p>
        </div>

        <div className="mt-16 space-y-24">
          {/* learning is fun (left) */}
          <div className="flex justify-start">
            <div data-scroll-offset className="from-left discovery-box glass relative z-10 w-full max-w-2xl rounded-3xl p-6 text-white sm:p-8">
              <h3 className="text-2xl font-black text-brand-orange">{t('discovery.learnTitle')}</h3>
              <p className="mt-4 leading-relaxed text-white/80">{t('discovery.learnBody')}</p>
              <ul className="mt-5 space-y-2.5">
                {[t('discovery.c1'), t('discovery.c2'), t('discovery.c3'), t('discovery.c4')].map((c, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/85">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-green/25 text-brand-green">✓</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* devices (right) */}
          <div className="flex justify-end">
            <div data-scroll-offset className="from-right discovery-box glass relative z-10 flex w-full max-w-xl flex-col items-start gap-5 rounded-3xl p-6 text-white sm:flex-row sm:items-center sm:p-8">
              <div className="text-cyan-300">
                <DeviceTrio />
              </div>
              <div>
                <h3 className="text-2xl font-black">{t('discovery.devTitle')}</h3>
                <p className="mt-2 text-sm text-white/75">{t('discovery.devBody')}</p>
              </div>
            </div>
          </div>

          {/* pricing (left) */}
          <div className="flex justify-start">
            <div data-scroll-offset className="from-left relative z-10 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
              <div className="discovery-box glass rounded-3xl p-6 text-white">
                <h3 className="text-lg font-black">{t('discovery.p1t')}</h3>
                <p className="mt-1 text-sm text-white/70">{t('discovery.p1b')}</p>
                <div className="mt-5 text-3xl font-black text-brand-orange">{t('discovery.p1price')}</div>
                <button onClick={goUpgrade} className="btn-primary mt-5 w-full text-base">
                  {t('discovery.p1cta')}
                </button>
              </div>
              <div className="discovery-box glass rounded-3xl border-brand-green/30 p-6 text-white">
                <h3 className="text-lg font-black">{t('discovery.p2t')}</h3>
                <p className="mt-1 text-sm text-white/70">{t('discovery.p2b')}</p>
                <div className="mt-5 text-3xl font-black text-brand-green">{t('discovery.p2price')}</div>
                <button onClick={goDemo} className="btn-blue mt-5 w-full text-base">
                  {t('discovery.p2cta')}
                </button>
              </div>
            </div>
          </div>
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
