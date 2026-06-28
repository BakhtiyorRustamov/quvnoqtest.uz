'use client';

/**
 * Subject book mascot (SRS §5.6 / §7.6).
 * - `corner`: small persistent companion on every page of a subject (FR-MAS-2).
 * - inline: custom size, used large on the recall block (with the play overlay
 *   rendered by the caller).
 */
export default function Mascot({
  subjectKey,
  size = 90,
  corner = false,
  className = '',
  animate = true
}: {
  subjectKey: string;
  size?: number;
  corner?: boolean;
  className?: string;
  animate?: boolean;
}) {
  const img = (
    <img
      src={`/mascots/${subjectKey}.svg`}
      alt=""
      aria-hidden
      width={size}
      height={size * (240 / 220)}
      className={`select-none pointer-events-none ${animate ? 'animate-floaty' : ''} ${className}`}
      draggable={false}
    />
  );
  if (!corner) return img;
  return (
    <div className="pointer-events-none fixed bottom-2 right-2 z-30 opacity-90 w-[64px] sm:w-[88px]">
      <img
        src={`/mascots/${subjectKey}.svg`}
        alt=""
        aria-hidden
        className={`w-full ${animate ? 'animate-floaty' : ''}`}
        draggable={false}
      />
    </div>
  );
}
