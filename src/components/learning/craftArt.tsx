import React from 'react';

/**
 * Step-by-step illustrations for Texnologiya crafts. Each craft key maps to an
 * ordered list of SVG fragments (inner content of a 0 0 100 100 viewBox) that
 * show what the child's work looks like AFTER that step — so the steps are shown
 * accurately, not just described. Pure vector, no emojis. Rendered by CraftSteps.
 */
export const CRAFT_ART: Record<string, React.ReactNode[]> = {
  // ── Caterpillar: cut circles → glue in a row → add the face ──────
  caterpillar: [
    (<>
      <circle cx="24" cy="52" r="12" fill="#5bbf5b" />
      <circle cx="50" cy="52" r="12" fill="#f7d13a" />
      <circle cx="76" cy="52" r="12" fill="#e4443a" />
    </>),
    (<>
      <circle cx="26" cy="52" r="13" fill="#5bbf5b" />
      <circle cx="44" cy="52" r="13" fill="#f7d13a" />
      <circle cx="62" cy="52" r="13" fill="#e4443a" />
      <circle cx="80" cy="52" r="13" fill="#1fa7e0" />
    </>),
    (<>
      <circle cx="20" cy="55" r="12" fill="#5bbf5b" />
      <circle cx="36" cy="55" r="12" fill="#f7d13a" />
      <circle cx="52" cy="55" r="12" fill="#e4443a" />
      <circle cx="71" cy="52" r="14" fill="#f39a1f" />
      <path d="M72 38 l5 -9 M63 39 l-4 -9" fill="none" />
      <circle cx="75" cy="49" r="2.2" fill="#2b2b2b" stroke="none" />
      <circle cx="67" cy="50" r="2.2" fill="#2b2b2b" stroke="none" />
      <path d="M66 58 q6 5 12 0" fill="none" />
    </>)
  ],

  // ── Rainbow: cut arcs → assemble → add clouds ───────────────────
  rainbow: [
    (<>
      <path d="M20 72 A30 30 0 0 1 80 72" fill="none" stroke="#e4443a" strokeWidth={5} />
      <path d="M30 72 A20 20 0 0 1 70 72" fill="none" stroke="#f7d13a" strokeWidth={5} />
      <path d="M40 72 A10 10 0 0 1 60 72" fill="none" stroke="#1fa7e0" strokeWidth={5} />
    </>),
    (<>
      <path d="M14 74 A36 36 0 0 1 86 74" fill="none" stroke="#e4443a" strokeWidth={5} />
      <path d="M21 74 A29 29 0 0 1 79 74" fill="none" stroke="#f39a1f" strokeWidth={5} />
      <path d="M28 74 A22 22 0 0 1 72 74" fill="none" stroke="#f7d13a" strokeWidth={5} />
      <path d="M35 74 A15 15 0 0 1 65 74" fill="none" stroke="#5bbf5b" strokeWidth={5} />
      <path d="M42 74 A8 8 0 0 1 58 74" fill="none" stroke="#1fa7e0" strokeWidth={5} />
    </>),
    (<>
      <path d="M18 74 A32 32 0 0 1 82 74" fill="none" stroke="#e4443a" strokeWidth={4.5} />
      <path d="M24 74 A26 26 0 0 1 76 74" fill="none" stroke="#f39a1f" strokeWidth={4.5} />
      <path d="M30 74 A20 20 0 0 1 70 74" fill="none" stroke="#f7d13a" strokeWidth={4.5} />
      <path d="M36 74 A14 14 0 0 1 64 74" fill="none" stroke="#5bbf5b" strokeWidth={4.5} />
      <ellipse cx="16" cy="76" rx="12" ry="8" fill="#fff" stroke="#b9c6d6" strokeWidth={2} />
      <ellipse cx="84" cy="76" rx="12" ry="8" fill="#fff" stroke="#b9c6d6" strokeWidth={2} />
    </>)
  ],

  // ── Apple (plastilin): ball → stem → leaf ───────────────────────
  apple: [
    (<>
      <circle cx="50" cy="56" r="27" fill="#e4443a" />
    </>),
    (<>
      <circle cx="50" cy="56" r="27" fill="#e4443a" />
      <path d="M50 30 q2 -12 10 -15" fill="none" stroke="#7a4a1e" strokeWidth={4.5} />
    </>),
    (<>
      <circle cx="50" cy="56" r="27" fill="#e4443a" />
      <path d="M50 30 q2 -12 10 -15" fill="none" stroke="#7a4a1e" strokeWidth={4.5} />
      <path d="M60 22 q16 -7 22 5 q-13 7 -22 -5 z" fill="#5bbf5b" />
    </>)
  ],

  // ── Bunny: two circles → ears → face ────────────────────────────
  bunny: [
    (<>
      <circle cx="50" cy="66" r="22" fill="#fff" />
      <circle cx="50" cy="34" r="15" fill="#fff" />
    </>),
    (<>
      <ellipse cx="43" cy="16" rx="5" ry="15" fill="#fff" />
      <ellipse cx="57" cy="16" rx="5" ry="15" fill="#fff" />
      <circle cx="50" cy="66" r="22" fill="#fff" />
      <circle cx="50" cy="34" r="15" fill="#fff" />
    </>),
    (<>
      <ellipse cx="43" cy="16" rx="5" ry="15" fill="#fff" />
      <ellipse cx="57" cy="16" rx="5" ry="15" fill="#fff" />
      <circle cx="50" cy="66" r="22" fill="#fff" />
      <circle cx="50" cy="34" r="15" fill="#fff" />
      <circle cx="45" cy="32" r="2" fill="#2b2b2b" stroke="none" />
      <circle cx="55" cy="32" r="2" fill="#2b2b2b" stroke="none" />
      <path d="M48 38 h4 l-2 3 z" fill="#f28ec2" stroke="none" />
      <path d="M50 40 v3 M40 39 h-8 M40 42 h-8 M60 39 h8 M60 42 h8" fill="none" strokeWidth={1.4} />
    </>)
  ],

  // ── Vase: cut shape → glue on card → add flowers ────────────────
  vase: [
    (<>
      <path d="M38 46 Q34 76 50 88 Q66 76 62 46 Z" fill="#1fa7e0" />
      <path d="M36 40 L64 40 L62 48 L38 48 Z" fill="#1fa7e0" />
    </>),
    (<>
      <rect x="14" y="10" width="72" height="80" rx="4" fill="#fdf6e3" stroke="#d9c9a3" strokeWidth={2} />
      <path d="M38 48 Q34 78 50 90 Q66 78 62 48 Z" fill="#1fa7e0" />
      <path d="M36 42 L64 42 L62 50 L38 50 Z" fill="#1fa7e0" />
    </>),
    (<>
      <rect x="14" y="10" width="72" height="80" rx="4" fill="#fdf6e3" stroke="#d9c9a3" strokeWidth={2} />
      <path d="M40 54 L60 54 L58 20 M50 54 L50 18 M40 54 L42 22" fill="none" stroke="#4f9e46" strokeWidth={2} />
      <circle cx="42" cy="22" r="7" fill="#e4443a" />
      <circle cx="50" cy="18" r="7" fill="#f7d13a" />
      <circle cx="58" cy="20" r="7" fill="#8a4bd0" />
      <path d="M38 52 Q34 78 50 88 Q66 78 62 52 Z" fill="#1fa7e0" />
      <path d="M36 46 L64 46 L62 54 L38 54 Z" fill="#1fa7e0" />
    </>)
  ],

  // ── Photo frame: rectangle → cut hole → decorate ────────────────
  frame: [
    (<>
      <rect x="26" y="18" width="48" height="64" rx="3" fill="#f4a941" />
    </>),
    (<>
      <rect x="26" y="18" width="48" height="64" rx="3" fill="#f4a941" />
      <rect x="35" y="30" width="30" height="40" rx="2" fill="#fff" />
    </>),
    (<>
      <rect x="26" y="18" width="48" height="64" rx="3" fill="#f4a941" />
      <rect x="35" y="30" width="30" height="40" rx="2" fill="#fff" />
      <circle cx="31" cy="23" r="3" fill="#e4443a" stroke="none" />
      <circle cx="69" cy="23" r="3" fill="#1fa7e0" stroke="none" />
      <circle cx="31" cy="77" r="3" fill="#5bbf5b" stroke="none" />
      <circle cx="69" cy="77" r="3" fill="#8a4bd0" stroke="none" />
      <circle cx="50" cy="76" r="3" fill="#f7d13a" stroke="none" />
    </>)
  ],

  hedgehog: [
    (<>
      <ellipse cx="54" cy="64" rx="30" ry="17" fill="#c88a4a" />
      <path d="M26 62 l-12 4 l12 6 z" fill="#c88a4a" />
    </>),
    (<>
      <ellipse cx="54" cy="64" rx="30" ry="17" fill="#c88a4a" />
      <path d="M26 62 l-12 4 l12 6 z" fill="#c88a4a" />
      <path d="M30 50 l5 -13 l5 13 M42 48 l5 -14 l5 14 M54 48 l5 -14 l5 14 M66 50 l5 -13 l5 13 M76 54 l4 -10 l4 10" fill="#8a5a2a" />
    </>),
    (<>
      <ellipse cx="54" cy="64" rx="30" ry="17" fill="#c88a4a" />
      <path d="M26 62 l-12 4 l12 6 z" fill="#c88a4a" />
      <path d="M30 50 l5 -13 l5 13 M42 48 l5 -14 l5 14 M66 50 l5 -13 l5 13 M76 54 l4 -10 l4 10" fill="#8a5a2a" />
      <circle cx="57" cy="42" r="9" fill="#e4443a" />
      <path d="M57 34 q1 -4 5 -5" fill="none" stroke="#5a7a2a" />
      <circle cx="15" cy="66" r="2" fill="#2b2b2b" stroke="none" />
      <circle cx="22" cy="62" r="1.6" fill="#2b2b2b" stroke="none" />
    </>)
  ],

  ladybug: [
    (<>
      <circle cx="50" cy="56" r="28" fill="#e4443a" />
      <path d="M38 34 a12 12 0 0 1 24 0 z" fill="#2b2b2b" stroke="none" />
    </>),
    (<>
      <circle cx="50" cy="56" r="28" fill="#e4443a" />
      <path d="M38 34 a12 12 0 0 1 24 0 z" fill="#2b2b2b" stroke="none" />
      <path d="M50 34 L50 84" />
    </>),
    (<>
      <circle cx="50" cy="56" r="28" fill="#e4443a" />
      <path d="M38 34 a12 12 0 0 1 24 0 z" fill="#2b2b2b" stroke="none" />
      <path d="M50 34 L50 84" />
      <circle cx="38" cy="52" r="4" fill="#2b2b2b" stroke="none" />
      <circle cx="62" cy="52" r="4" fill="#2b2b2b" stroke="none" />
      <circle cx="41" cy="68" r="4" fill="#2b2b2b" stroke="none" />
      <circle cx="59" cy="68" r="4" fill="#2b2b2b" stroke="none" />
      <circle cx="45" cy="26" r="2" fill="#fff" stroke="none" />
      <circle cx="55" cy="26" r="2" fill="#fff" stroke="none" />
      <path d="M43 24 l-6 -8 M57 24 l6 -8" />
    </>)
  ],

  chestnut: [
    (<>
      <ellipse cx="50" cy="54" rx="22" ry="24" fill="#8a5a2a" />
      <path d="M28 58 a22 24 0 0 0 44 0 z" fill="#c88a4a" />
    </>),
    (<>
      <ellipse cx="50" cy="54" rx="22" ry="24" fill="#8a5a2a" />
      <path d="M28 58 a22 24 0 0 0 44 0 z" fill="#c88a4a" />
      <path d="M29 52 l-14 -6 M71 52 l14 -6 M41 78 l-6 14 M59 78 l6 14" stroke="#7a4a1e" />
    </>),
    (<>
      <ellipse cx="50" cy="54" rx="22" ry="24" fill="#8a5a2a" />
      <path d="M28 58 a22 24 0 0 0 44 0 z" fill="#c88a4a" />
      <path d="M29 52 l-14 -6 M71 52 l14 -6 M41 78 l-6 14 M59 78 l6 14" stroke="#7a4a1e" />
      <circle cx="44" cy="48" r="2" fill="#2b2b2b" stroke="none" />
      <circle cx="56" cy="48" r="2" fill="#2b2b2b" stroke="none" />
      <path d="M44 56 q6 5 12 0" fill="none" />
    </>)
  ],

  cutglue: [
    (<>
      <rect x="16" y="28" width="26" height="26" fill="#e4443a" />
      <rect x="54" y="28" width="26" height="26" fill="#1fa7e0" />
      <rect x="36" y="60" width="26" height="26" fill="#f7d13a" />
    </>),
    (<>
      <rect x="18" y="24" width="12" height="12" fill="#e4443a" /><rect x="34" y="24" width="12" height="12" fill="#1fa7e0" /><rect x="50" y="24" width="12" height="12" fill="#f7d13a" />
      <rect x="18" y="40" width="12" height="12" fill="#8a4bd0" /><rect x="34" y="40" width="12" height="12" fill="#5bbf5b" /><rect x="50" y="40" width="12" height="12" fill="#e4443a" />
      <rect x="66" y="30" width="12" height="12" fill="#f39a1f" /><rect x="66" y="46" width="12" height="12" fill="#1fa7e0" />
    </>),
    (<>
      <rect x="40" y="26" width="9" height="9" fill="#e4443a" /><rect x="51" y="26" width="9" height="9" fill="#e4443a" />
      <rect x="34" y="37" width="9" height="9" fill="#e4443a" /><rect x="45" y="37" width="9" height="9" fill="#8a4bd0" /><rect x="56" y="37" width="9" height="9" fill="#e4443a" />
      <rect x="40" y="48" width="9" height="9" fill="#8a4bd0" /><rect x="51" y="48" width="9" height="9" fill="#e4443a" />
      <rect x="45" y="59" width="9" height="9" fill="#e4443a" />
    </>)
  ],

  papersnowflake: [
    (<>
      <path d="M50 18 L78 80 L22 80 Z" fill="#eaf2fb" />
    </>),
    (<>
      <path d="M50 18 L78 80 L22 80 Z" fill="#eaf2fb" />
      <path d="M50 40 l8 8 l-8 8 l-8 -8 z" fill="#fff" stroke="none" />
      <path d="M30 74 l7 -6 l3 8 z" fill="#fff" stroke="none" />
      <path d="M70 74 l-7 -6 l-3 8 z" fill="#fff" stroke="none" />
    </>),
    (<>
      <path d="M50 16 L50 84 M22 32 L78 68 M78 32 L22 68" strokeWidth={3} />
      <path d="M50 24 l-7 8 M50 24 l7 8 M50 76 l-7 -8 M50 76 l7 -8" strokeWidth={2} />
      <path d="M29 36 l1 11 M29 36 l11 1 M71 64 l-1 -11 M71 64 l-11 -1 M71 36 l-1 11 M71 36 l-11 1 M29 64 l1 -11 M29 64 l11 -1" strokeWidth={2} />
      <circle cx="50" cy="50" r="7" fill="#eaf2fb" />
    </>)
  ],

  cloud: [
    (<>
      <path d="M30 66 a13 13 0 0 1 3 -25 a16 16 0 0 1 30 -2 a13 13 0 0 1 8 27 z" fill="#eef4fb" />
    </>),
    (<>
      <path d="M30 66 a13 13 0 0 1 3 -25 a16 16 0 0 1 30 -2 a13 13 0 0 1 8 27 z" fill="#eef4fb" />
      <circle cx="38" cy="52" r="6" fill="#fff" stroke="none" /><circle cx="50" cy="46" r="7" fill="#fff" stroke="none" /><circle cx="60" cy="54" r="6" fill="#fff" stroke="none" />
    </>),
    (<>
      <path d="M30 60 a13 13 0 0 1 3 -25 a16 16 0 0 1 30 -2 a13 13 0 0 1 8 27 z" fill="#eef4fb" />
      <path d="M38 66 l-3 10 M50 68 l-3 12 M62 66 l-3 10" stroke="#1fa7e0" strokeWidth={3} />
    </>)
  ],

  fish: [
    (<>
      <ellipse cx="46" cy="54" rx="26" ry="18" fill="#f39a1f" />
      <path d="M70 54 l18 -12 l0 24 z" fill="#f39a1f" />
    </>),
    (<>
      <ellipse cx="46" cy="54" rx="26" ry="18" fill="#f39a1f" />
      <path d="M70 54 l18 -12 l0 24 z" fill="#f39a1f" />
      <path d="M38 38 q8 -12 16 -1 z" fill="#e07f10" />
      <circle cx="30" cy="50" r="3.4" fill="#fff" /><circle cx="30" cy="50" r="1.6" fill="#2b2b2b" stroke="none" />
    </>),
    (<>
      <ellipse cx="46" cy="54" rx="26" ry="18" fill="#f39a1f" />
      <path d="M70 54 l18 -12 l0 24 z" fill="#f39a1f" />
      <path d="M38 38 q8 -12 16 -1 z" fill="#e07f10" />
      <circle cx="30" cy="50" r="3.4" fill="#fff" /><circle cx="30" cy="50" r="1.6" fill="#2b2b2b" stroke="none" />
      <path d="M44 46 a6 6 0 0 1 0 12 M54 46 a6 6 0 0 1 0 12 M64 48 a5 5 0 0 1 0 10" fill="none" strokeWidth={1.6} />
      <circle cx="20" cy="34" r="3" fill="none" /><circle cx="14" cy="42" r="2" fill="none" />
    </>)
  ],

  house: [
    (<>
      <rect x="28" y="46" width="46" height="40" fill="#f7d13a" />
    </>),
    (<>
      <rect x="28" y="46" width="46" height="40" fill="#f7d13a" />
      <path d="M22 46 L51 22 L80 46 Z" fill="#e4443a" />
    </>),
    (<>
      <rect x="28" y="46" width="46" height="40" fill="#f7d13a" />
      <path d="M22 46 L51 22 L80 46 Z" fill="#e4443a" />
      <rect x="45" y="64" width="13" height="22" fill="#8a5a2a" />
      <rect x="33" y="52" width="11" height="11" fill="#1fa7e0" />
      <rect x="59" y="52" width="11" height="11" fill="#1fa7e0" />
    </>)
  ],

  aquarium: [
    (<>
      <rect x="16" y="26" width="68" height="56" rx="8" fill="#bfe4f5" />
    </>),
    (<>
      <rect x="16" y="26" width="68" height="56" rx="8" fill="#bfe4f5" />
      <ellipse cx="44" cy="52" rx="12" ry="8" fill="#f39a1f" /><path d="M56 52 l9 -6 l0 12 z" fill="#f39a1f" />
      <circle cx="38" cy="50" r="1.5" fill="#2b2b2b" stroke="none" />
    </>),
    (<>
      <rect x="16" y="26" width="68" height="56" rx="8" fill="#bfe4f5" />
      <ellipse cx="44" cy="48" rx="11" ry="7" fill="#f39a1f" /><path d="M55 48 l8 -5 l0 10 z" fill="#f39a1f" />
      <circle cx="39" cy="46" r="1.5" fill="#2b2b2b" stroke="none" />
      <path d="M68 82 q2 -20 8 -26 M74 82 q-2 -16 2 -22" fill="none" stroke="#4f9e46" strokeWidth={3} />
      <rect x="20" y="74" width="60" height="8" rx="3" fill="#e0cba0" stroke="none" />
      <circle cx="30" cy="40" r="2" fill="none" /><circle cx="26" cy="50" r="1.5" fill="none" />
    </>)
  ],

  chick: [
    (<>
      <circle cx="48" cy="60" r="22" fill="#f7d13a" />
    </>),
    (<>
      <circle cx="48" cy="60" r="22" fill="#f7d13a" />
      <circle cx="66" cy="42" r="14" fill="#f7d13a" />
      <path d="M78 40 l11 3 l-11 4 z" fill="#f39a1f" />
    </>),
    (<>
      <circle cx="48" cy="60" r="22" fill="#f7d13a" />
      <circle cx="66" cy="42" r="14" fill="#f7d13a" />
      <path d="M78 40 l11 3 l-11 4 z" fill="#f39a1f" />
      <circle cx="68" cy="39" r="2" fill="#2b2b2b" stroke="none" />
      <path d="M40 58 a12 12 0 0 0 16 8" fill="none" />
      <path d="M42 82 l-3 8 M52 82 l3 8" stroke="#f39a1f" strokeWidth={2.5} />
    </>)
  ],

  swan: [
    (<>
      <ellipse cx="46" cy="64" rx="28" ry="15" fill="#ffffff" />
    </>),
    (<>
      <ellipse cx="46" cy="64" rx="28" ry="15" fill="#ffffff" />
      <path d="M64 56 q18 -2 14 -26 q-2 -12 -12 -12 q-8 0 -8 8 q6 0 6 6 q0 14 -8 20 z" fill="#ffffff" />
    </>),
    (<>
      <ellipse cx="46" cy="64" rx="28" ry="15" fill="#ffffff" />
      <path d="M64 56 q18 -2 14 -26 q-2 -12 -12 -12 q-8 0 -8 8 q6 0 6 6 q0 14 -8 20 z" fill="#ffffff" />
      <path d="M66 20 l10 2 l-9 5 z" fill="#f39a1f" />
      <circle cx="68" cy="22" r="1.6" fill="#2b2b2b" stroke="none" />
      <path d="M30 62 a14 10 0 0 1 28 0" fill="none" strokeWidth={1.6} />
    </>)
  ],

  boat: [
    (<>
      <path d="M20 60 L80 60 L70 82 L30 82 Z" fill="#e4443a" />
    </>),
    (<>
      <path d="M20 60 L80 60 L70 82 L30 82 Z" fill="#e4443a" />
      <path d="M50 60 L50 22" />
      <path d="M50 24 L74 54 L50 54 Z" fill="#ffffff" />
    </>),
    (<>
      <path d="M20 62 L80 62 L70 84 L30 84 Z" fill="#e4443a" />
      <path d="M50 62 L50 22" />
      <path d="M50 24 L74 54 L50 54 Z" fill="#ffffff" />
      <path d="M50 22 l12 4 l-12 4 z" fill="#f39a1f" />
      <path d="M14 74 q6 -5 12 0 q6 5 12 0 M62 74 q6 -5 12 0" fill="none" stroke="#1fa7e0" strokeWidth={2} />
    </>)
  ],

  bug: [
    (<>
      <ellipse cx="52" cy="56" rx="24" ry="17" fill="#f7d13a" />
      <circle cx="24" cy="52" r="10" fill="#2b2b2b" stroke="none" />
    </>),
    (<>
      <ellipse cx="52" cy="56" rx="24" ry="17" fill="#f7d13a" />
      <circle cx="24" cy="52" r="10" fill="#2b2b2b" stroke="none" />
      <path d="M44 42 L40 70 M56 41 L60 71 M68 46 L70 66" stroke="#2b2b2b" strokeWidth={5} />
    </>),
    (<>
      <ellipse cx="52" cy="56" rx="24" ry="17" fill="#f7d13a" />
      <circle cx="24" cy="52" r="10" fill="#2b2b2b" stroke="none" />
      <path d="M44 42 L40 70 M56 41 L60 71 M68 46 L70 66" stroke="#2b2b2b" strokeWidth={5} />
      <ellipse cx="48" cy="34" rx="12" ry="8" fill="#eaf2fb" /><ellipse cx="64" cy="34" rx="10" ry="7" fill="#eaf2fb" />
      <circle cx="21" cy="49" r="1.6" fill="#fff" stroke="none" />
      <path d="M18 44 l-6 -8 M22 43 l-2 -9" strokeWidth={1.6} />
    </>)
  ],

  food: [
    (<>
      <path d="M32 56 L68 56 L62 86 L38 86 Z" fill="#e0a060" />
      <path d="M40 56 L37 86 M50 56 L50 86 M60 56 L63 86" strokeWidth={1.4} />
    </>),
    (<>
      <path d="M32 56 L68 56 L62 86 L38 86 Z" fill="#e0a060" />
      <path d="M40 56 L37 86 M50 56 L50 86 M60 56 L63 86" strokeWidth={1.4} />
      <path d="M30 56 q3 -28 20 -28 q17 0 20 28 z" fill="#f28ec2" />
    </>),
    (<>
      <path d="M32 56 L68 56 L62 86 L38 86 Z" fill="#e0a060" />
      <path d="M40 56 L37 86 M50 56 L50 86 M60 56 L63 86" strokeWidth={1.4} />
      <path d="M30 56 q3 -28 20 -28 q17 0 20 28 z" fill="#f28ec2" />
      <circle cx="50" cy="24" r="5" fill="#e4443a" /><path d="M50 19 l3 -6" />
      <circle cx="42" cy="44" r="1.6" fill="#f7d13a" stroke="none" /><circle cx="58" cy="46" r="1.6" fill="#5bbf5b" stroke="none" /><circle cx="50" cy="50" r="1.6" fill="#1fa7e0" stroke="none" />
    </>)
  ],

  giftcard: [
    (<>
      <rect x="27" y="22" width="46" height="58" rx="3" fill="#ffffff" />
      <path d="M50 22 L50 80" strokeWidth={1.4} />
    </>),
    (<>
      <rect x="27" y="22" width="46" height="58" rx="3" fill="#ffffff" />
      <path d="M50 22 L50 80" strokeWidth={1.4} />
      <path d="M58 66 L58 44" stroke="#4f9e46" strokeWidth={2} />
      <path d="M52 44 q0 -10 6 -13 q6 3 6 13 q-3 -5 -6 -1 q-3 -4 -6 1 z" fill="#e4443a" />
      <path d="M40 66 L40 48" stroke="#4f9e46" strokeWidth={2} />
      <path d="M35 48 q0 -9 5 -12 q5 3 5 12 q-3 -4 -5 -1 q-2 -3 -5 1 z" fill="#f39a1f" />
    </>),
    (<>
      <rect x="27" y="22" width="46" height="58" rx="3" fill="#ffffff" />
      <path d="M50 22 L50 80" strokeWidth={1.4} />
      <path d="M58 66 L58 44" stroke="#4f9e46" strokeWidth={2} />
      <path d="M52 44 q0 -10 6 -13 q6 3 6 13 q-3 -5 -6 -1 q-3 -4 -6 1 z" fill="#e4443a" />
      <path d="M40 66 L40 48" stroke="#4f9e46" strokeWidth={2} />
      <path d="M35 48 q0 -9 5 -12 q5 3 5 12 q-3 -4 -5 -1 q-2 -3 -5 1 z" fill="#f39a1f" />
      <path d="M36 30 q-3 -4 -6 0 q-3 4 6 8 q9 -4 6 -8 q-3 -4 -6 0 z" fill="#f28ec2" stroke="none" />
      <circle cx="64" cy="72" r="2" fill="#8a4bd0" stroke="none" /><circle cx="36" cy="72" r="2" fill="#1fa7e0" stroke="none" />
    </>)
  ],

  domino: [
    (<>
      <rect x="36" y="22" width="28" height="56" rx="4" fill="#ffffff" />
      <path d="M36 50 L64 50" />
    </>),
    (<>
      <rect x="36" y="22" width="28" height="56" rx="4" fill="#ffffff" />
      <path d="M36 50 L64 50" />
      <circle cx="45" cy="31" r="2.6" fill="#2b2b2b" stroke="none" /><circle cx="55" cy="31" r="2.6" fill="#2b2b2b" stroke="none" /><circle cx="50" cy="41" r="2.6" fill="#2b2b2b" stroke="none" />
      <circle cx="45" cy="60" r="2.6" fill="#2b2b2b" stroke="none" /><circle cx="55" cy="69" r="2.6" fill="#2b2b2b" stroke="none" />
    </>),
    (<>
      <rect x="20" y="26" width="26" height="50" rx="4" fill="#ffffff" />
      <path d="M20 51 L46 51" />
      <circle cx="33" cy="34" r="2.4" fill="#2b2b2b" stroke="none" /><circle cx="33" cy="43" r="2.4" fill="#2b2b2b" stroke="none" /><circle cx="33" cy="60" r="2.4" fill="#2b2b2b" stroke="none" /><circle cx="33" cy="69" r="2.4" fill="#2b2b2b" stroke="none" />
      <rect x="54" y="26" width="26" height="50" rx="4" fill="#ffffff" />
      <path d="M54 51 L80 51" />
      <circle cx="67" cy="38" r="2.4" fill="#2b2b2b" stroke="none" /><circle cx="61" cy="61" r="2.4" fill="#2b2b2b" stroke="none" /><circle cx="73" cy="61" r="2.4" fill="#2b2b2b" stroke="none" /><circle cx="67" cy="69" r="2.4" fill="#2b2b2b" stroke="none" />
    </>)
  ],

  garden: [
    (<>
      <path d="M12 82 L88 82" strokeWidth={3} />
      <rect x="60" y="52" width="9" height="30" fill="#8a5a2a" />
    </>),
    (<>
      <path d="M12 82 L88 82" strokeWidth={3} />
      <rect x="60" y="52" width="9" height="30" fill="#8a5a2a" />
      <circle cx="64" cy="42" r="19" fill="#5bbf5b" />
    </>),
    (<>
      <path d="M12 82 L88 82" strokeWidth={3} />
      <rect x="60" y="54" width="9" height="28" fill="#8a5a2a" />
      <circle cx="64" cy="44" r="18" fill="#5bbf5b" />
      <circle cx="58" cy="40" r="3" fill="#e4443a" stroke="none" /><circle cx="70" cy="46" r="3" fill="#f7d13a" stroke="none" />
      <path d="M22 82 L22 68" stroke="#4f9e46" strokeWidth={2} /><circle cx="22" cy="64" r="5" fill="#e4443a" />
      <path d="M34 82 L34 70" stroke="#4f9e46" strokeWidth={2} /><circle cx="34" cy="66" r="5" fill="#8a4bd0" />
      <circle cx="22" cy="24" r="9" fill="#f7d13a" /><path d="M22 11 L22 6 M9 24 L4 24 M13 15 L9 11" strokeWidth={1.6} />
    </>)
  ],

  tulip: [
    (<>
      <path d="M50 84 L50 44" stroke="#4f9e46" strokeWidth={3} />
      <path d="M50 66 q-16 -3 -20 -18 q14 0 20 12 z" fill="#5bbf5b" />
      <path d="M50 60 q16 -3 20 -18 q-14 0 -20 12 z" fill="#5bbf5b" />
    </>),
    (<>
      <path d="M50 84 L50 44" stroke="#4f9e46" strokeWidth={3} />
      <path d="M50 66 q-16 -3 -20 -18 q14 0 20 12 z" fill="#5bbf5b" />
      <path d="M50 60 q16 -3 20 -18 q-14 0 -20 12 z" fill="#5bbf5b" />
      <path d="M38 46 q0 -18 12 -22 q12 4 12 22 q-6 -8 -12 -2 q-6 -6 -12 2 z" fill="#e4443a" />
    </>),
    (<>
      <path d="M32 84 L32 54" stroke="#4f9e46" strokeWidth={2.5} /><path d="M32 60 q-10 -2 -13 -12 q9 0 13 8 z" fill="#5bbf5b" />
      <path d="M24 54 q0 -13 8 -16 q8 3 8 16 q-4 -6 -8 -1 q-4 -5 -8 1 z" fill="#f39a1f" />
      <path d="M68 84 L68 54" stroke="#4f9e46" strokeWidth={2.5} /><path d="M68 60 q10 -2 13 -12 q-9 0 -13 8 z" fill="#5bbf5b" />
      <path d="M60 54 q0 -13 8 -16 q8 3 8 16 q-4 -6 -8 -1 q-4 -5 -8 1 z" fill="#8a4bd0" />
      <path d="M50 84 L50 44" stroke="#4f9e46" strokeWidth={3} />
      <path d="M38 44 q0 -18 12 -22 q12 4 12 22 q-6 -8 -12 -2 q-6 -6 -12 2 z" fill="#e4443a" />
    </>)
  ],

  pattern: [
    (<>
      <rect x="20" y="44" width="14" height="14" fill="#e4443a" /><rect x="43" y="44" width="14" height="14" fill="#1fa7e0" /><rect x="66" y="44" width="14" height="14" fill="#f7d13a" />
    </>),
    (<>
      <rect x="20" y="44" width="14" height="14" fill="#e4443a" /><rect x="43" y="44" width="14" height="14" fill="#1fa7e0" /><rect x="66" y="44" width="14" height="14" fill="#f7d13a" />
      <circle cx="38" cy="51" r="5" fill="#5bbf5b" /><circle cx="61" cy="51" r="5" fill="#8a4bd0" />
    </>),
    (<>
      <rect x="20" y="32" width="13" height="13" fill="#e4443a" /><circle cx="43" cy="38" r="6" fill="#5bbf5b" /><rect x="53" y="32" width="13" height="13" fill="#f7d13a" /><circle cx="76" cy="38" r="6" fill="#8a4bd0" />
      <circle cx="26" cy="58" r="6" fill="#1fa7e0" /><rect x="37" y="52" width="13" height="13" fill="#f39a1f" /><circle cx="60" cy="58" r="6" fill="#e4443a" /><rect x="70" y="52" width="13" height="13" fill="#5bbf5b" />
    </>)
  ],

  seaanimal: [
    (<>
      <path d="M28 58 q0 -30 22 -30 q22 0 22 30 z" fill="#8a4bd0" />
    </>),
    (<>
      <path d="M28 58 q0 -30 22 -30 q22 0 22 30 z" fill="#8a4bd0" />
      <path d="M28 58 q-4 12 2 18 q4 -6 6 -12 M39 58 q-2 14 2 20 q4 -8 4 -16 M50 58 l0 22 M61 58 q2 14 -2 20 q-4 -8 -4 -16 M72 58 q4 12 -2 18 q-4 -6 -6 -12" fill="none" strokeWidth={2.5} stroke="#8a4bd0" />
    </>),
    (<>
      <path d="M28 58 q0 -30 22 -30 q22 0 22 30 z" fill="#8a4bd0" />
      <path d="M28 58 q-4 12 2 18 q4 -6 6 -12 M39 58 q-2 14 2 20 q4 -8 4 -16 M50 58 l0 22 M61 58 q2 14 -2 20 q-4 -8 -4 -16 M72 58 q4 12 -2 18 q-4 -6 -6 -12" fill="none" strokeWidth={2.5} stroke="#8a4bd0" />
      <circle cx="43" cy="44" r="4" fill="#fff" /><circle cx="43" cy="44" r="1.8" fill="#2b2b2b" stroke="none" />
      <circle cx="57" cy="44" r="4" fill="#fff" /><circle cx="57" cy="44" r="1.8" fill="#2b2b2b" stroke="none" />
      <circle cx="78" cy="30" r="2.4" fill="none" /><circle cx="84" cy="22" r="1.6" fill="none" />
    </>)
  ]
};

export function getCraftArt(key: string): React.ReactNode[] | undefined {
  return CRAFT_ART[key];
}
