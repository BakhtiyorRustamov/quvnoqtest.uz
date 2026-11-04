/**
 * MoviyDaftar.uz brand: the "MD" monogram (an M with notebook pages + a D) and the wordmark.
 * Shown before / above the QuvnoqTest logo everywhere; when only one logo fits, this one.
 */
export function MdMark({ className = 'h-8 w-auto', onDark = false }: { className?: string; onDark?: boolean }) {
  const a = onDark ? '#7cc4f2' : '#1f6fbf';
  const b = onDark ? '#bfe3fb' : '#123d7a';
  return (
    <svg viewBox="0 0 132 84" className={className} aria-hidden>
      <defs>
        <linearGradient id="md-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      {/* notebook pages behind the M */}
      <path d="M10 20 V70 M17 16 V72" stroke={onDark ? '#9fd3f6' : '#5aa8e0'} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* M */}
      <path d="M25 72 V14 L47 46 L69 14 V72" stroke="url(#md-g)" strokeWidth="12" strokeLinejoin="round" strokeLinecap="round" fill="none" />
      {/* D */}
      <path d="M62 10 H88 A32 32 0 0 1 88 74 H56" stroke="url(#md-g)" strokeWidth="9" strokeLinecap="round" fill="none" opacity=".92" />
    </svg>
  );
}

export default function MoviyDaftarLogo({
  size = 'md',
  onDark = false,
  className = '',
  stacked = false
}: {
  size?: 'sm' | 'md' | 'lg';
  onDark?: boolean;
  className?: string;
  /** mark above the wordmark (big hero use) */
  stacked?: boolean;
}) {
  const mark = size === 'sm' ? 'h-6 w-auto' : size === 'lg' ? 'h-16 w-auto' : 'h-9 w-auto';
  const text = size === 'sm' ? 'text-[15px]' : size === 'lg' ? 'text-[34px]' : 'text-[20px]';
  return (
    <span className={`inline-flex ${stacked ? 'flex-col' : ''} items-center gap-1.5 ${className}`} aria-label="MoviyDaftar.uz">
      <MdMark className={mark} onDark={onDark} />
      <span className={`${text} font-black leading-none tracking-tight ${onDark ? 'text-white' : 'text-[#123d7a]'}`}>
        MoviyDaftar<span className={onDark ? 'text-[#7cc4f2]' : 'text-[#1f8fd6]'}>.uz</span>
      </span>
    </span>
  );
}
