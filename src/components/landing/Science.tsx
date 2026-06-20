import * as React from 'react';

/* =============================================================================
   QuvnoqTest landing — inline science illustrations (no emoji, no .riv files).
   Each icon draws with currentColor so it inherits the surrounding text colour.
   Looping / hover behaviour is handled in globals.css via the .gc-icon classes.
   ============================================================================= */

type IconProps = { className?: string };

const svg = (className?: string): React.SVGProps<SVGSVGElement> => ({
  viewBox: '0 0 64 64',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  className
});

export function Flask({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M26 8h12M28 8v16L15 47a6 6 0 0 0 5 9h24a6 6 0 0 0 5-9L36 24V8" />
      <path d="M22 40h20" />
      <path d="M24 44c4 3 12 3 16 0" fill="currentColor" opacity={0.35} stroke="none" />
      <circle cx="29" cy="49" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="37" cy="51" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Telescope({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M9 33 47 19l5 11-38 14z" />
      <path d="M44 17l4 9" />
      <path d="M22 38l6 14M30 35l7 13" />
      <path d="M24 52h12" />
      <path d="M52 14l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" opacity={0.8} />
    </svg>
  );
}

export function Globe({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <circle cx="32" cy="28" r="18" />
      <path d="M14 28h36M32 10v36M20 16c8 8 16 8 24 0M20 40c8-8 16-8 24 0" />
      <path d="M32 46v8M24 54h16" />
    </svg>
  );
}

export function Magnet({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M16 14v22a16 16 0 0 0 32 0V14" />
      <path d="M16 14h12v22a4 4 0 0 0 8 0V14h12" />
      <path d="M16 24h12M36 24h12" />
    </svg>
  );
}

export function LightningIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M36 6 14 36h14l-4 22 24-32H34l6-20z" fill="currentColor" opacity={0.25} />
      <path d="M36 6 14 36h14l-4 22 24-32H34l6-20z" />
    </svg>
  );
}

export function TestTubes({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M22 8v40a7 7 0 0 1-14 0V8M18 6h-14" />
      <path d="M56 8v40a7 7 0 0 1-14 0V8M52 6H38" />
      <path d="M8 34c4 2 6 2 14 0M42 30c4 2 6 2 14 0" />
      <path d="M8 40h14M42 36h14" opacity={0.5} />
    </svg>
  );
}

export function Dna({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M22 6c0 12 20 16 20 28s-20 16-20 28" />
      <path d="M42 6c0 12-20 16-20 28s20 16 20 28" />
      <path d="M24 14h16M22 24h20M22 44h20M24 54h16" opacity={0.85} />
    </svg>
  );
}

export function Planet({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <circle cx="32" cy="30" r="13" />
      <ellipse className="gc-orbit" cx="32" cy="30" rx="26" ry="9" transform="rotate(-22 32 30)" opacity={0.85} />
      <circle cx="26" cy="26" r="2" fill="currentColor" stroke="none" opacity={0.6} />
      <circle cx="36" cy="33" r="3" fill="currentColor" stroke="none" opacity={0.4} />
    </svg>
  );
}

export function Microscope({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M30 10l8 5-10 16-8-5z" />
      <path d="M26 31c-8 5-12 14-10 23h34" />
      <path d="M40 54a16 16 0 0 0-9-22" />
      <path d="M16 54h34M22 46h12" />
    </svg>
  );
}

export function Rocket({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M32 4c8 6 12 16 12 28l-6 8H26l-6-8C20 20 24 10 32 4z" />
      <circle cx="32" cy="24" r="5" />
      <path d="M20 34l-8 6 2 10 8-6M44 34l8 6-2 10-8-6" />
      <path d="M28 48c0 6 4 10 4 10s4-4 4-10" opacity={0.9} />
    </svg>
  );
}

export function Lightbulb({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M32 6a18 18 0 0 0-11 32c2 2 3 4 3 7h16c0-3 1-5 3-7A18 18 0 0 0 32 6z" />
      <path d="M25 53h14M27 59h10" />
      <path d="M27 30l5 6 5-9" opacity={0.85} />
    </svg>
  );
}

export function Atom({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <circle cx="32" cy="32" r="4" fill="currentColor" stroke="none" />
      <ellipse cx="32" cy="32" rx="26" ry="11" />
      <ellipse cx="32" cy="32" rx="26" ry="11" transform="rotate(60 32 32)" />
      <ellipse cx="32" cy="32" rx="26" ry="11" transform="rotate(120 32 32)" />
    </svg>
  );
}

export function Gear({ className }: IconProps) {
  const teeth = Array.from({ length: 8 }, (_, i) => {
    const a = (i * 360) / 8;
    return <rect key={i} x="30" y="2" width="4" height="9" rx="1.5" fill="currentColor" stroke="none" transform={`rotate(${a} 32 32)`} />;
  });
  return (
    <svg {...svg(className)}>
      {teeth}
      <circle cx="32" cy="32" r="20" />
      <circle cx="32" cy="32" r="7" />
    </svg>
  );
}

export function Comet({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <circle cx="44" cy="20" r="9" fill="currentColor" stroke="none" opacity={0.9} />
      <path d="M37 27 8 56M44 30 20 54M50 28 34 52" opacity={0.8} />
    </svg>
  );
}

export function StarIcon({ className }: IconProps) {
  return (
    <svg {...svg(className)}>
      <path d="M32 6l7 17 18 1-14 12 5 18-16-10-16 10 5-18L11 24l18-1z" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* Per-grade icon + its hover behaviour (consumed by GlassCard). */
export const GRADE_ICONS: Record<number, { Comp: React.FC<IconProps>; anim: string }> = {
  1: { Comp: Flask, anim: 'wobble' },
  2: { Comp: Telescope, anim: 'bob' },
  3: { Comp: Globe, anim: 'spin' },
  4: { Comp: Magnet, anim: 'wobble' },
  5: { Comp: LightningIcon, anim: 'bob' },
  6: { Comp: TestTubes, anim: 'wobble' },
  7: { Comp: Dna, anim: 'bob' },
  8: { Comp: Planet, anim: 'orbit' },
  9: { Comp: Microscope, anim: 'bob' },
  10: { Comp: Rocket, anim: 'rocket' },
  11: { Comp: Lightbulb, anim: 'bob' }
};

/* ---- Floating particle field (Task 1) -------------------------------------
   Deterministic (seeded) so the server and client render identical markup and
   hydration never mismatches. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PARTICLE_COLORS = ['#ffffff', '#7dd3fc', '#f8c06b', '#c4b5fd', '#86efac'];

type Particle = {
  left: number;
  top: number;
  size: number;
  op: number;
  dur: number;
  delay: number;
  dx: number;
  dy: number;
  color: string;
};

const PARTICLES: Particle[] = (() => {
  const rand = mulberry32(20260616);
  return Array.from({ length: 40 }, () => {
    const size = 2 + rand() * 6;
    return {
      left: rand() * 100,
      top: rand() * 100,
      size,
      op: 0.25 + rand() * 0.6,
      dur: 7 + rand() * 9,
      delay: -rand() * 12,
      dx: (rand() - 0.5) * 40,
      dy: -(14 + rand() * 34),
      color: PARTICLE_COLORS[Math.floor(rand() * PARTICLE_COLORS.length)]
    };
  });
})();

export function ParticleField({ count = 40, className = '' }: { count?: number; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {PARTICLES.slice(0, count).map((p, i) => (
        <span
          key={i}
          className="qt-particle"
          style={
            {
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              opacity: p.op,
              boxShadow: `0 0 ${Math.round(p.size * 2)}px ${p.color}`,
              '--pdx': `${p.dx}px`,
              '--pdy': `${p.dy}px`,
              '--pdur': `${p.dur}s`,
              '--pdelay': `${p.delay}s`
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
