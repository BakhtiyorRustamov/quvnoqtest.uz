'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Chunky 3D pill button: a coloured top sitting on a darker base. Pressing
 * pushes the top down onto the base; releasing springs it back up with a
 * little bounce (like a button on a spring). A soft glow pulses around it.
 */
export default function PressButton3D({
  href,
  color,
  onClick,
  children
}: {
  href: string;
  color: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const [down, setDown] = useState(false);
  const DEPTH = 9; // px of visible base under the top
  const release = () => setDown(false);

  return (
    <Link
      href={href}
      onClick={onClick}
      onPointerDown={() => setDown(true)}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      className="relative inline-block select-none rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/40"
      style={{ ['--glow' as string]: color, paddingBottom: DEPTH, WebkitTapHighlightColor: 'transparent' }}
    >
      {/* base (the "body" of the button) */}
      <span
        aria-hidden
        className="press3d-glow absolute inset-x-0 bottom-0 rounded-full"
        style={{
          top: DEPTH,
          background: `linear-gradient(180deg, color-mix(in srgb, ${color} 62%, #000), color-mix(in srgb, ${color} 48%, #000))`
        }}
      />
      {/* top (the part that moves) */}
      <motion.span
        animate={{ y: down ? DEPTH - 2 : 0 }}
        transition={reduce ? { duration: 0 } : down ? { type: 'spring', stiffness: 900, damping: 40 } : { type: 'spring', stiffness: 520, damping: 11, mass: 0.9 }}
        className="relative block rounded-full px-10 py-5 text-center font-black text-white text-[clamp(22px,6vw,30px)]"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, ${color} 82%, #fff), ${color} 55%, color-mix(in srgb, ${color} 86%, #000))`,
          boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.45), inset 0 -3px 0 rgba(0,0,0,0.12)',
          textShadow: '0 2px 0 rgba(0,0,0,0.2)'
        }}
      >
        {children}
      </motion.span>
    </Link>
  );
}
