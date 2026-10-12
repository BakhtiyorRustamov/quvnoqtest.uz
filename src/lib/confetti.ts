'use client';

const BRAND_COLORS = ['#F39A1F', '#1FA7E0', '#8DC63F', '#C2298A', '#5A2D82'];

function reduced(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export async function burstConfetti(origin?: { x: number; y: number }) {
  if (reduced()) return;
  const confetti = (await import('canvas-confetti')).default;
  confetti({
    particleCount: 70,
    spread: 75,
    startVelocity: 38,
    colors: BRAND_COLORS,
    origin: origin ?? { x: 0.5, y: 0.55 },
    disableForReducedMotion: true
  });
}

export async function bigCelebration() {
  if (reduced()) return;
  const confetti = (await import('canvas-confetti')).default;
  const opts = { colors: BRAND_COLORS, disableForReducedMotion: true };
  confetti({ ...opts, particleCount: 120, spread: 100, origin: { x: 0.5, y: 0.6 } });
  setTimeout(() => confetti({ ...opts, particleCount: 60, angle: 60, spread: 70, origin: { x: 0, y: 0.7 } }), 250);
  setTimeout(() => confetti({ ...opts, particleCount: 60, angle: 120, spread: 70, origin: { x: 1, y: 0.7 } }), 450);
}
