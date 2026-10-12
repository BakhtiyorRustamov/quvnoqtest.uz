'use client';

import { useLocale } from 'next-intl';
import { pick, type L10n } from '@/lib/i18n-config';
import { GRADES, type SubjectDef } from '@/content/taxonomy';

/* Task 5 — infinite subject pill strip. Two rows scrolling in opposite
   directions. Each row's items are duplicated so the -50% keyframe loops
   seamlessly. */

type Pill = { label: L10n; color: string };

/* The pills mirror exactly the grade-1 subjects that are live in the app, so the
   strip never advertises something a child cannot open. Split into two rows. */
const GRADE1 = GRADES[0].subjects;
const toPill = (s: SubjectDef): Pill => ({ label: s.name, color: s.color });
const ROW1: Pill[] = GRADE1.slice(0, 6).map(toPill);
const ROW2: Pill[] = GRADE1.slice(6).map(toPill);

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
