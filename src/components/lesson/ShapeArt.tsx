'use client';

import { useId } from 'react';
import type { Art, ArtColor, ArtKind } from '@/content/types';
import type { L10n } from '@/lib/i18n-config';
import { pick } from '@/lib/i18n-config';

export const COLOR_HEX: Record<ArtColor, string> = {
  red: '#E14B4B',
  blue: '#1FA7E0',
  green: '#8DC63F',
  yellow: '#F8C81C',
  orange: '#F39A1F',
  magenta: '#C2298A',
  purple: '#5A2D82',
  gray: '#B9C4CF'
};

const DARK: Record<ArtColor, string> = {
  red: '#B23434',
  blue: '#157FAB',
  green: '#6EA02C',
  yellow: '#C9A40F',
  orange: '#C97C12',
  magenta: '#93216A',
  purple: '#43215F',
  gray: '#8E9AA6'
};

/** Lightened tints used for 3D highlight faces on solid shapes. */
const LIGHT: Record<ArtColor, string> = {
  red: '#F19A9A',
  blue: '#8FD6F4',
  green: '#C2E68A',
  yellow: '#FBE584',
  orange: '#F9C684',
  magenta: '#E085C0',
  purple: '#A684C9',
  gray: '#DCE3E9'
};

const KIND_NAMES: Record<ArtKind, L10n> = {
  circle: { uz: 'doira', ru: 'круг', en: 'circle' },
  square: { uz: 'kvadrat', ru: 'квадрат', en: 'square' },
  triangle: { uz: 'uchburchak', ru: 'треугольник', en: 'triangle' },
  rect: { uz: 'toʻrtburchak', ru: 'прямоугольник', en: 'rectangle' },
  rhombus: { uz: 'romb', ru: 'ромб', en: 'rhombus' },
  star: { uz: 'yulduz', ru: 'звезда', en: 'star' },
  ball: { uz: 'koptok', ru: 'мяч', en: 'ball' },
  apple: { uz: 'olma', ru: 'яблоко', en: 'apple' },
  clock: { uz: 'soat', ru: 'часы', en: 'clock' },
  window: { uz: 'deraza', ru: 'окно', en: 'window' },
  kite: { uz: 'varrak', ru: 'воздушный змей', en: 'kite' },
  roof: { uz: 'tom', ru: 'крыша', en: 'roof' },
  fish: { uz: 'baliq', ru: 'рыбка', en: 'fish' },
  sun: { uz: 'quyosh', ru: 'солнышко', en: 'sun' },
  sphere: { uz: 'shar', ru: 'шар', en: 'sphere' },
  cube: { uz: 'kub', ru: 'куб', en: 'cube' },
  cone: { uz: 'konus', ru: 'конус', en: 'cone' },
  cylinder: { uz: 'silindr', ru: 'цилиндр', en: 'cylinder' }
};

const COLOR_NAMES: Record<ArtColor, L10n> = {
  red: { uz: 'qizil', ru: 'красный', en: 'red' },
  blue: { uz: 'koʻk', ru: 'синий', en: 'blue' },
  green: { uz: 'yashil', ru: 'зелёный', en: 'green' },
  yellow: { uz: 'sariq', ru: 'жёлтый', en: 'yellow' },
  orange: { uz: 'toʻq sariq', ru: 'оранжевый', en: 'orange' },
  magenta: { uz: 'pushti', ru: 'малиновый', en: 'magenta' },
  purple: { uz: 'binafsha', ru: 'фиолетовый', en: 'purple' },
  gray: { uz: 'kulrang', ru: 'серый', en: 'gray' }
};

/** Localized accessible label, grammar-safe: "yulduz (qizil)" / "звезда (красный)" / "star (red)". */
export function artLabel(art: Art, locale: string): string {
  const kind = pick(KIND_NAMES[art.kind], locale);
  const color = art.color ? pick(COLOR_NAMES[art.color], locale) : '';
  return color ? `${kind} (${color})` : kind;
}

function starPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 === 0 ? r : r * 0.46;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + rr * Math.cos(a)).toFixed(1)},${(cy + rr * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(' ');
}

export default function ShapeArt({
  art,
  size = 72,
  ghost = false,
  className = ''
}: {
  art: Art;
  size?: number;
  ghost?: boolean;
  className?: string;
}) {
  const s = Math.round(size * (art.scale ?? 1));
  const color: ArtColor = art.color ?? 'blue';
  const fill = ghost ? 'rgba(185,196,207,0.22)' : COLOR_HEX[color];
  const stroke = ghost ? '#9AA7B4' : DARK[color];
  const dash = ghost ? '7 6' : undefined;
  const sw = 4;
  const light = LIGHT[color];
  const uid = useId().replace(/[:]/g, '');
  // soft ground shadow that makes solid shapes read as 3D
  const groundShadow = !ghost && <ellipse cx="50" cy="93" rx="29" ry="5.5" fill="#000" opacity="0.16" />;
  const shine = !ghost && (
    <ellipse cx="38" cy="33" rx="11" ry="6" fill="#fff" opacity="0.35" transform="rotate(-22 38 33)" />
  );

  let body: React.ReactNode = null;
  switch (art.kind) {
    case 'circle':
      body = (
        <>
          <circle cx="50" cy="50" r="36" fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />
          {shine}
        </>
      );
      break;
    case 'square':
      body = (
        <>
          <rect x="18" y="18" width="64" height="64" rx="10" fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />
          {shine}
        </>
      );
      break;
    case 'triangle':
      body = (
        <>
          <path d="M50 14 L87 84 L13 84 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeDasharray={dash} />
          {!ghost && <ellipse cx="46" cy="52" rx="8" ry="5" fill="#fff" opacity="0.3" transform="rotate(-20 46 52)" />}
        </>
      );
      break;
    case 'rect':
      body = (
        <>
          <rect x="8" y="29" width="84" height="42" rx="10" fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />
          {shine}
        </>
      );
      break;
    case 'rhombus':
      body = (
        <>
          <path d="M50 10 L88 50 L50 90 L12 50 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeDasharray={dash} />
          {!ghost && <ellipse cx="44" cy="40" rx="8" ry="5" fill="#fff" opacity="0.32" transform="rotate(-30 44 40)" />}
        </>
      );
      break;
    case 'star':
      body = (
        <polygon points={starPoints(50, 53, 40)} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeDasharray={dash} />
      );
      break;
    case 'ball':
      body = (
        <>
          <circle cx="50" cy="50" r="36" fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />
          {!ghost && (
            <>
              <path d="M24 26 Q52 50 24 74" fill="none" stroke="#fff" strokeWidth="3.6" opacity="0.55" />
              <path d="M76 26 Q48 50 76 74" fill="none" stroke="#fff" strokeWidth="3.6" opacity="0.55" />
              {shine}
            </>
          )}
        </>
      );
      break;
    case 'apple':
      body = (
        <>
          <path
            d="M50 31 C 34 21 17 34 21 55 C 24 74 38 87 50 87 C 62 87 76 74 79 55 C 83 34 66 21 50 31 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth={sw}
            strokeDasharray={dash}
          />
          {!ghost && (
            <>
              <path d="M50 29 Q 51 17 61 12" fill="none" stroke="#7A4A21" strokeWidth="5" strokeLinecap="round" />
              <ellipse cx="64" cy="18" rx="9" ry="5" fill="#8DC63F" transform="rotate(-25 64 18)" />
              <ellipse cx="38" cy="44" rx="8" ry="5" fill="#fff" opacity="0.35" transform="rotate(-24 38 44)" />
            </>
          )}
        </>
      );
      break;
    case 'clock':
      body = (
        <>
          <circle cx="50" cy="52" r="34" fill={ghost ? fill : '#FFFDF5'} stroke={ghost ? stroke : COLOR_HEX[color]} strokeWidth={ghost ? sw : 7} strokeDasharray={dash} />
          {!ghost && (
            <>
              {[0, 90, 180, 270].map((a) => {
                const r1 = 26;
                const r2 = 30;
                const x1 = 50 + r1 * Math.cos((a * Math.PI) / 180);
                const y1 = 52 + r1 * Math.sin((a * Math.PI) / 180);
                const x2 = 50 + r2 * Math.cos((a * Math.PI) / 180);
                const y2 = 52 + r2 * Math.sin((a * Math.PI) / 180);
                return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1E3A5F" strokeWidth="3" strokeLinecap="round" />;
              })}
              <line x1="50" y1="52" x2="50" y2="33" stroke="#1E3A5F" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="50" y1="52" x2="64" y2="58" stroke="#1E3A5F" strokeWidth="4.5" strokeLinecap="round" />
              <circle cx="50" cy="52" r="3.6" fill="#1E3A5F" />
              <circle cx="30" cy="22" r="6" fill={COLOR_HEX[color]} />
              <circle cx="70" cy="22" r="6" fill={COLOR_HEX[color]} />
            </>
          )}
        </>
      );
      break;
    case 'window':
      body = (
        <>
          <rect x="16" y="14" width="68" height="72" rx="8" fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />
          {!ghost && (
            <>
              <rect x="26" y="24" width="48" height="52" rx="3" fill="#DFF3FF" />
              <line x1="50" y1="24" x2="50" y2="76" stroke={stroke} strokeWidth="4" />
              <line x1="26" y1="50" x2="74" y2="50" stroke={stroke} strokeWidth="4" />
              <rect x="12" y="86" width="76" height="7" rx="3.5" fill={stroke} />
            </>
          )}
        </>
      );
      break;
    case 'kite':
      body = (
        <>
          <path d="M50 6 L82 42 L50 78 L18 42 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeDasharray={dash} />
          {!ghost && (
            <>
              <line x1="50" y1="6" x2="50" y2="78" stroke="#fff" strokeWidth="2.6" opacity="0.6" />
              <line x1="18" y1="42" x2="82" y2="42" stroke="#fff" strokeWidth="2.6" opacity="0.6" />
              <path d="M50 78 Q 46 86 50 92 Q 55 96 52 99" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
              <path d="M44 86 l 6 -3 l 1 7 z" fill={COLOR_HEX.yellow} />
              <path d="M54 94 l 6 -3 l 1 7 z" fill={COLOR_HEX.blue} />
            </>
          )}
        </>
      );
      break;
    case 'roof':
      body = (
        <>
          {!ghost && <rect x="30" y="56" width="40" height="30" rx="3" fill="#F4E8D2" stroke="#D8C9A8" strokeWidth="3" />}
          <path d="M50 12 L92 56 L8 56 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeDasharray={dash} />
          {!ghost && (
            <>
              <line x1="34" y1="40" x2="66" y2="40" stroke="#fff" strokeWidth="2.4" opacity="0.45" />
              <rect x="44" y="66" width="12" height="20" rx="2" fill="#C97C12" />
            </>
          )}
        </>
      );
      break;
    case 'fish':
      body = (
        <>
          <ellipse cx="42" cy="52" rx="30" ry="20" fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />
          <path d="M68 52 L92 36 L92 68 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeDasharray={dash} />
          {!ghost && (
            <>
              <circle cx="30" cy="46" r="5" fill="#fff" />
              <circle cx="31" cy="47" r="2.4" fill="#1E3A5F" />
              <path d="M38 62 Q 44 66 50 62" fill="none" stroke="#1E3A5F" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M44 36 Q 50 28 58 34" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
            </>
          )}
        </>
      );
      break;
    case 'sun':
      body = (
        <>
          {!ghost &&
            [0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
              const x1 = 50 + 28 * Math.cos((a * Math.PI) / 180);
              const y1 = 50 + 28 * Math.sin((a * Math.PI) / 180);
              const x2 = 50 + 40 * Math.cos((a * Math.PI) / 180);
              const y2 = 50 + 40 * Math.sin((a * Math.PI) / 180);
              return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth="5" strokeLinecap="round" />;
            })}
          <circle cx="50" cy="50" r="24" fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />
          {!ghost && (
            <>
              <circle cx="43" cy="46" r="2.6" fill="#7A4A21" />
              <circle cx="57" cy="46" r="2.6" fill="#7A4A21" />
              <path d="M42 55 Q 50 62 58 55" fill="none" stroke="#7A4A21" strokeWidth="2.6" strokeLinecap="round" />
            </>
          )}
        </>
      );
      break;
    case 'sphere':
      body = ghost ? (
        <circle cx="50" cy="50" r="36" fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />
      ) : (
        <>
          <defs>
            <radialGradient id={`${uid}-sph`} cx="37%" cy="32%" r="72%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="20%" stopColor={light} />
              <stop offset="70%" stopColor={COLOR_HEX[color]} />
              <stop offset="100%" stopColor={DARK[color]} />
            </radialGradient>
          </defs>
          {groundShadow}
          <circle cx="50" cy="49" r="37" fill={`url(#${uid}-sph)`} stroke={DARK[color]} strokeWidth="2.5" />
          <ellipse cx="38" cy="31" rx="10" ry="6" fill="#fff" opacity="0.5" transform="rotate(-22 38 31)" />
        </>
      );
      break;
    case 'cube':
      body = ghost ? (
        <rect x="22" y="22" width="56" height="56" rx="6" fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} />
      ) : (
        <>
          {groundShadow}
          {/* right (darkest), left (base), top (lightest) */}
          <path d="M50 50 L50 86 L80 69 L80 33 Z" fill={DARK[color]} stroke={DARK[color]} strokeWidth="2" strokeLinejoin="round" />
          <path d="M20 33 L20 69 L50 86 L50 50 Z" fill={COLOR_HEX[color]} stroke={DARK[color]} strokeWidth="2" strokeLinejoin="round" />
          <path d="M50 14 L80 33 L50 50 L20 33 Z" fill={light} stroke={DARK[color]} strokeWidth="2" strokeLinejoin="round" />
        </>
      );
      break;
    case 'cone':
      body = ghost ? (
        <path d="M50 16 L82 84 L18 84 Z" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" strokeDasharray={dash} />
      ) : (
        <>
          <defs>
            <linearGradient id={`${uid}-cone`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={light} />
              <stop offset="48%" stopColor={COLOR_HEX[color]} />
              <stop offset="100%" stopColor={DARK[color]} />
            </linearGradient>
          </defs>
          {groundShadow}
          <ellipse cx="50" cy="76" rx="30" ry="9.5" fill={DARK[color]} stroke={DARK[color]} strokeWidth="2" />
          <path d="M50 12 L79 76 A30 9.5 0 0 1 21 76 Z" fill={`url(#${uid}-cone)`} stroke={DARK[color]} strokeWidth="2.5" strokeLinejoin="round" />
        </>
      );
      break;
    case 'cylinder':
      body = ghost ? (
        <g fill={fill} stroke={stroke} strokeWidth={sw} strokeDasharray={dash}>
          <ellipse cx="50" cy="28" rx="28" ry="9" />
          <rect x="22" y="28" width="56" height="48" />
        </g>
      ) : (
        <>
          <defs>
            <linearGradient id={`${uid}-cyl`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={light} />
              <stop offset="48%" stopColor={COLOR_HEX[color]} />
              <stop offset="100%" stopColor={DARK[color]} />
            </linearGradient>
          </defs>
          {groundShadow}
          {/* bottom rim */}
          <ellipse cx="50" cy="76" rx="28" ry="9" fill={DARK[color]} stroke={DARK[color]} strokeWidth="2" />
          {/* body */}
          <path d="M22 28 L22 76 A28 9 0 0 0 78 76 L78 28 Z" fill={`url(#${uid}-cyl)`} stroke={DARK[color]} strokeWidth="2.5" />
          {/* top lid */}
          <ellipse cx="50" cy="28" rx="28" ry="9" fill={light} stroke={DARK[color]} strokeWidth="2.5" />
          <ellipse cx="44" cy="26" rx="9" ry="3" fill="#fff" opacity="0.4" />
        </>
      );
      break;
  }

  return (
    <svg viewBox="0 0 100 100" width={s} height={s} className={className} aria-hidden focusable="false">
      {body}
    </svg>
  );
}
