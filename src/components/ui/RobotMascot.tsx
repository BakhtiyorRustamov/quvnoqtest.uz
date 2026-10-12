'use client';

/* Friendly QuvnoqTest AI robot — replaces the book mascot. The brand "Q" mark
   (the interlocking colourful arcs) sits on the robot's chest screen. */

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

export default function RobotMascot({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 150" className={className} aria-hidden role="img">
      {/* antenna */}
      <line x1="60" y1="24" x2="60" y2="12" stroke="#9fb2c4" strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="9" r="6" fill="#f39a1f" />
      <circle cx="60" cy="9" r="9" fill="#f39a1f" opacity="0.25" />

      {/* ears / bolts */}
      <rect x="17" y="40" width="8" height="16" rx="4" fill="#cdd9e5" />
      <rect x="95" y="40" width="8" height="16" rx="4" fill="#cdd9e5" />

      {/* head */}
      <rect x="24" y="22" width="72" height="52" rx="18" fill="#eef4fa" stroke="#c3d2e0" strokeWidth="2.5" />
      {/* face screen */}
      <rect x="32" y="30" width="56" height="36" rx="13" fill="#0e2238" />
      {/* eyes */}
      <circle cx="48" cy="46" r="6.5" fill="#5ee0e6" />
      <circle cx="72" cy="46" r="6.5" fill="#5ee0e6" />
      <circle cx="49.6" cy="44" r="2" fill="#ffffff" opacity="0.9" />
      <circle cx="73.6" cy="44" r="2" fill="#ffffff" opacity="0.9" />
      {/* smile */}
      <path d="M47 56 Q60 64 73 56" fill="none" stroke="#5ee0e6" strokeWidth="3" strokeLinecap="round" />

      {/* neck */}
      <rect x="53" y="72" width="14" height="8" rx="3" fill="#cdd9e5" />

      {/* arms */}
      <rect x="13" y="84" width="11" height="30" rx="5.5" fill="#dbe6f0" stroke="#c3d2e0" strokeWidth="2" />
      <circle cx="18.5" cy="116" r="6.5" fill="#1fa7e0" />
      <rect x="96" y="84" width="11" height="30" rx="5.5" fill="#dbe6f0" stroke="#c3d2e0" strokeWidth="2" />
      <circle cx="101.5" cy="116" r="6.5" fill="#1fa7e0" />

      {/* body */}
      <rect x="28" y="78" width="64" height="50" rx="16" fill="#e6eef7" stroke="#c3d2e0" strokeWidth="2.5" />
      {/* chest screen */}
      <rect x="40" y="88" width="40" height="32" rx="9" fill="#0d1f36" />

      {/* brand Q on the chest */}
      <g>
        {ARCS.map(([a0, a1, color], i) => (
          <path key={i} d={arcPath(60, 102, 9, a0, a1)} stroke={color} strokeWidth="3.4" strokeLinecap="round" fill="none" />
        ))}
        <line x1="66.4" y1="108.4" x2="72" y2="114" stroke="#F39A1F" strokeWidth="3.6" strokeLinecap="round" />
        <circle cx="60" cy="102" r="2.6" fill="none" stroke="#F39A1F" strokeWidth="2" />
      </g>

      {/* feet */}
      <rect x="38" y="126" width="18" height="11" rx="4" fill="#cdd9e5" />
      <rect x="64" y="126" width="18" height="11" rx="4" fill="#cdd9e5" />
    </svg>
  );
}
