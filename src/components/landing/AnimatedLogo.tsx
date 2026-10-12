'use client';

import { motion, useReducedMotion } from 'framer-motion';

const ARCS: Array<[number, number, string]> = [
  [-90, -25, '#F39A1F'],
  [-15, 50, '#C2298A'],
  [60, 125, '#5A2D82'],
  [135, 200, '#1FA7E0'],
  [210, 260, '#8DC63F']
];

function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (a: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  return `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`;
}

/** The colorful interlocking-Q logo, with an optional draw-in intro animation. */
export default function AnimatedLogo({
  drawIn = false,
  className = '',
  onDark = false,
  compact = false
}: {
  drawIn?: boolean;
  className?: string;
  /** Light wordmark for use over the dark landing theme. */
  onDark?: boolean;
  /** fixed, small, self-contained size (used in the centred dashboard header) */
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  const animate = drawIn && !reduce;

  return (
    <div className={`flex items-center ${compact ? 'gap-2 w-fit' : 'gap-3 sm:gap-4'} ${className}`}>
      <svg viewBox="0 0 124 124" className={`${compact ? 'w-7 h-7' : 'w-[34%] max-w-[120px]'} shrink-0`} aria-hidden>
        {ARCS.map(([a0, a1, color], i) => (
          <motion.path
            key={i}
            d={arcPath(62, 62, 44, a0, a1)}
            stroke={color}
            strokeWidth={17}
            strokeLinecap="round"
            fill="none"
            initial={animate ? { pathLength: 0, opacity: 0 } : false}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.12, duration: 0.45, ease: 'easeOut' }}
          />
        ))}
        <motion.line
          x1={88}
          y1={88}
          x2={112}
          y2={112}
          stroke="#F39A1F"
          strokeWidth={18}
          strokeLinecap="round"
          initial={animate ? { opacity: 0, scale: 0.3 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.75, type: 'spring', stiffness: 260, damping: 14 }}
        />
        <motion.circle
          cx={62}
          cy={62}
          r={13}
          fill="none"
          stroke="#F39A1F"
          strokeWidth={9}
          initial={animate ? { opacity: 0, scale: 0 } : false}
          animate={{ opacity: 0.95, scale: 1 }}
          transition={{ delay: 0.85, type: 'spring', stiffness: 240, damping: 12 }}
        />
      </svg>
      <motion.div
        initial={animate ? { opacity: 0, y: 14 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: animate ? 1.0 : 0, duration: 0.4 }}
        className="leading-none"
      >
        <span
          className={`block font-black tracking-tight ${compact ? 'text-2xl' : 'text-[clamp(26px,7vw,44px)]'} ${
            onDark ? 'text-white' : 'text-ink'
          }`}
        >
          Quvnoq<span className="text-brand-orange">Test</span>
          <span className="text-brand-blue text-[0.45em] align-super">.uz</span>
        </span>
      </motion.div>
    </div>
  );
}
