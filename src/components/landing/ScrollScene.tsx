'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Atom, Dna, Rocket, Flask, Planet, Microscope, LightningIcon, TestTubes, Gear, Comet, StarIcon } from './Science';
import { CountUp } from './scroll';

/* =============================================================================
   Task 3 — the scroll-pinned "journey" scene.
   A 400vh section holds a sticky 100vh panel. The scroll engine (useScrollProgress)
   writes --progress (0→1) onto this section, the background hue-rotates through it,
   and the .transform-element children drift / tumble / travel at different speeds.
   ============================================================================= */

type Motion = Partial<
  Record<
    | 'tx-start'
    | 'tx-end'
    | 'ty-start'
    | 'ty-end'
    | 'rot-start'
    | 'rot-end'
    | 'scale-start'
    | 'scale-end'
    | 'op-start'
    | 'op-end'
    | 'prog-from'
    | 'prog-to',
    number
  >
>;

function dataProps(m: Motion) {
  const o: Record<string, string> = {};
  (Object.keys(m) as (keyof Motion)[]).forEach((k) => {
    o[`data-${k}`] = String(m[k]);
  });
  return o;
}

function TE({
  style,
  className = '',
  motion,
  spin = false,
  children
}: {
  style: React.CSSProperties;
  className?: string;
  motion: Motion;
  spin?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span className={`transform-element ${className}`} style={style} aria-hidden {...(dataProps(motion) as Record<string, string> as any)}>
      {spin ? <span className="spin-slow block h-full w-full">{children}</span> : children}
    </span>
  );
}

function SceneCard({ at, span = 0.26, children }: { at: number; span?: number; children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center px-4">
      <div className="scene-card glass w-[min(88vw,540px)] rounded-3xl px-7 py-8 text-center text-white shadow-2xl" data-appear-at={at} data-appear-span={span}>
        {children}
      </div>
    </div>
  );
}

export default function ScrollScene() {
  const t = useTranslations('landing');

  return (
    <section data-scroll-progress className="relative" style={{ minHeight: '260vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: 'linear-gradient(180deg,#0a0a2e,#071a35)' }}>
        {/* hue-shifting colour field — driven by --progress in CSS */}
        <div className="scene-bg" aria-hidden />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'radial-gradient(120% 80% at 50% 50%, transparent 38%, rgba(0,0,0,0.55))' }}
        />

        {/* 1 — atom: drifts right, floats up, full spin */}
        <TE style={{ left: '6%', top: '14%', width: 86 }} className="text-cyan-300" motion={{ 'tx-end': 200, 'ty-end': -150, 'rot-end': 360 }}>
          <Atom className="h-full w-full" />
        </TE>
        {/* 2 — DNA helix */}
        <TE style={{ left: '78%', top: '9%', width: 64 }} className="text-fuchsia-300" motion={{ 'tx-end': -150, 'ty-end': 100, 'rot-end': -20 }}>
          <Dna className="h-full w-full" />
        </TE>
        {/* 3 — rocket: shoots up */}
        <TE style={{ left: '11%', top: '54%', width: 76 }} className="text-orange-300" motion={{ 'ty-end': -300, 'tx-end': 80, 'rot-end': -15 }}>
          <Rocket className="h-full w-full" />
        </TE>
        {/* 4 — flask: bounces up + rotates */}
        <TE style={{ left: '7%', top: '76%', width: 70 }} className="text-emerald-300" motion={{ 'ty-end': -250, 'rot-end': 45 }}>
          <Flask className="h-full w-full" />
        </TE>
        {/* 5 — planet: drifts left */}
        <TE style={{ left: '72%', top: '52%', width: 104 }} className="text-violet-300" motion={{ 'tx-end': -180, 'ty-end': -40 }}>
          <Planet className="h-full w-full" />
        </TE>
        {/* 6 — microscope: slides down */}
        <TE style={{ left: '45%', top: '7%', width: 68 }} className="text-sky-200" motion={{ 'ty-end': 120, 'rot-end': 10 }}>
          <Microscope className="h-full w-full" />
        </TE>
        {/* 7 — lightning: zips across, fades */}
        <TE style={{ left: '90%', top: '34%', width: 56 }} className="text-yellow-300" motion={{ 'tx-end': -320, 'op-start': 1, 'op-end': 0.3 }}>
          <LightningIcon className="h-full w-full" />
        </TE>
        {/* 8 — star cluster: scatters outward from centre */}
        <TE style={{ left: '49%', top: '46%', width: 20 }} className="text-white" motion={{ 'tx-end': -170, 'ty-end': -120, 'scale-end': 1.4 }}>
          <StarIcon className="h-full w-full" />
        </TE>
        <TE style={{ left: '50%', top: '47%', width: 16 }} className="text-yellow-200" motion={{ 'tx-end': 190, 'ty-end': -90, 'scale-end': 1.3 }}>
          <StarIcon className="h-full w-full" />
        </TE>
        <TE style={{ left: '50%', top: '48%', width: 14 }} className="text-cyan-200" motion={{ 'tx-end': -120, 'ty-end': 150, 'scale-end': 1.2 }}>
          <StarIcon className="h-full w-full" />
        </TE>
        <TE style={{ left: '51%', top: '46%', width: 18 }} className="text-fuchsia-200" motion={{ 'tx-end': 150, 'ty-end': 140, 'scale-end': 1.35 }}>
          <StarIcon className="h-full w-full" />
        </TE>
        {/* 9 — math symbols: each drifts at its own speed */}
        <TE style={{ left: '20%', top: '30%' }} className="font-black text-white/80 text-5xl" motion={{ 'ty-end': -120, 'tx-end': 60 }}>
          π
        </TE>
        <TE style={{ left: '62%', top: '22%' }} className="font-black text-white/70 text-6xl" motion={{ 'ty-end': 90, 'tx-end': -50 }}>
          ∑
        </TE>
        <TE style={{ left: '34%', top: '78%' }} className="font-black text-white/70 text-5xl" motion={{ 'ty-end': -200, 'rot-end': 20 }}>
          ∫
        </TE>
        {/* 10 — test tube: big tumble */}
        <TE style={{ left: '60%', top: '72%', width: 60 }} className="text-emerald-200" motion={{ 'rot-start': -180, 'rot-end': 180, 'ty-end': -40 }}>
          <TestTubes className="h-full w-full" />
        </TE>
        {/* 11 — gear: continuous spin AND drift */}
        <TE style={{ left: '85%', top: '70%', width: 72 }} className="text-sky-300" spin motion={{ 'tx-end': -120, 'ty-end': -70 }}>
          <Gear className="h-full w-full" />
        </TE>
        {/* 12 — comet: diagonal streak across the scene */}
        <TE style={{ left: '66%', top: '10%', width: 92 }} className="text-white" motion={{ 'tx-start': 120, 'tx-end': -340, 'ty-start': -60, 'ty-end': 230 }}>
          <Comet className="h-full w-full" />
        </TE>

        {/* content cards that pop in at scroll thresholds */}
        <SceneCard at={0.04} span={0.34}>
          <div className="text-cyan-300">
            <span className="text-6xl font-black sm:text-7xl">
              <CountUp to={28} suffix="+" />
            </span>
          </div>
          <h3 className="mt-2 text-2xl font-black">{t('why.f2t')}</h3>
          <p className="mt-1 text-white/80">{t('why.f2b')}</p>
        </SceneCard>

        <SceneCard at={0.38} span={0.32}>
          <div className="mx-auto mb-3 h-14 w-14 text-yellow-300">
            <Atom className="h-full w-full" />
          </div>
          <h3 className="text-2xl font-black">{t('why.f3t')}</h3>
          <p className="mt-1 text-white/80">{t('why.f3b')}</p>
        </SceneCard>

        <SceneCard at={0.7} span={0.4}>
          <h3 className="text-3xl font-black leading-tight sm:text-4xl">{t('banner.title')}</h3>
          <div className="mt-4 flex justify-center gap-2 text-yellow-300">
            <span className="h-6 w-6">
              <StarIcon className="h-full w-full" />
            </span>
            <span className="h-6 w-6">
              <StarIcon className="h-full w-full" />
            </span>
            <span className="h-6 w-6">
              <StarIcon className="h-full w-full" />
            </span>
          </div>
        </SceneCard>

        {/* progress rail */}
        <div aria-hidden className="absolute bottom-6 left-1/2 h-1 w-40 -translate-x-1/2 overflow-hidden rounded-full bg-white/15">
          <div className="h-full origin-left bg-white/80" style={{ transform: 'scaleX(var(--progress,0))' }} />
        </div>
      </div>
    </section>
  );
}
