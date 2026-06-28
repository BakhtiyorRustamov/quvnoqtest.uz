'use client';

import { useLocale } from 'next-intl';
import { pick, type L10n } from '@/lib/i18n-config';

/* Task 5 — infinite subject pill strip. Two rows scrolling in opposite
   directions. Each row's items are duplicated so the -50% keyframe loops
   seamlessly. */

type Pill = { label: L10n; color: string };

const ROW1: Pill[] = [
  { label: { uz: 'Matematika', ru: 'Математика', en: 'Maths' }, color: '#f39a1f' },
  { label: { uz: 'Fizika', ru: 'Физика', en: 'Physics' }, color: '#7c3aed' },
  { label: { uz: 'Kimyo', ru: 'Химия', en: 'Chemistry' }, color: '#10b981' },
  { label: { uz: 'Biologiya', ru: 'Биология', en: 'Biology' }, color: '#c2298a' },
  { label: { uz: 'Tarix', ru: 'История', en: 'History' }, color: '#06b6d4' },
  { label: { uz: 'Geografiya', ru: 'География', en: 'Geography' }, color: '#1fa7e0' }
];

const ROW2: Pill[] = [
  { label: { uz: 'Ingliz tili', ru: 'Английский', en: 'English' }, color: '#1fa7e0' },
  { label: { uz: 'Ona tili', ru: 'Родной язык', en: 'Native language' }, color: '#f39a1f' },
  { label: { uz: 'Informatika', ru: 'Информатика', en: 'Informatics' }, color: '#06b6d4' },
  { label: { uz: 'Musiqa', ru: 'Музыка', en: 'Music' }, color: '#5a2d82' },
  { label: { uz: 'Chizmachilik', ru: 'Черчение', en: 'Tech drawing' }, color: '#10b981' }
];

function Row({ items, dir }: { items: Pill[]; dir: 'left' | 'right' }) {
  const locale = useLocale();
  const doubled = [...items, ...items];
  return (
    <div className={`marquee-track ${dir === 'left' ? 'marquee-left' : 'marquee-right'}`}>
      {doubled.map((p, i) => (
        <span
          key={i}
          className="mx-2 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-6 py-3 text-lg font-extrabold text-white"
          aria-hidden={i >= items.length}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: p.color }} />
          {pick(p.label, locale)}
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="py-14" aria-label="Fanlar">
      <div
        className="marquee-mask space-y-4 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)'
        }}
      >
        <Row items={ROW1} dir="left" />
        <Row items={ROW2} dir="right" />
      </div>
    </section>
  );
}
