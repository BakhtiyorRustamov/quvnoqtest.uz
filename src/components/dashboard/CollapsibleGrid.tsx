'use client';

import { Children, useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * Wraps a Mavzular part grid and collapses it to 3 rows by default
 * (12 tiles on desktop @ 4 cols, 6 tiles on mobile @ 2 cols). A single
 * "Show all / Show less" toggle reveals the rest. Extra tiles are kept in the
 * DOM and hidden with responsive utility classes so the visible count matches
 * the active breakpoint without measuring it in JS.
 */
export default function CollapsibleGrid({ children }: { children: React.ReactNode }) {
  const t = useTranslations('dashboard');
  const [expanded, setExpanded] = useState(false);
  const items = Children.toArray(children);
  const hasMore = items.length > 6;

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {items.map((child, i) => {
          // collapsed: 0–5 always; 6–11 desktop-only; 12+ hidden
          let vis = '';
          if (!expanded && hasMore) {
            if (i >= 12) vis = 'hidden';
            else if (i >= 6) vis = 'hidden lg:block';
          }
          return (
            <div key={i} className={vis}>
              {child}
            </div>
          );
        })}
        {/* collapsed hint that more lessons follow: "…" after the last visible
            tile (6th on mobile, 12th on desktop) */}
        {!expanded && hasMore && (
          <>
            {items.length > 6 && (
              <div aria-hidden className="lg:hidden grid place-items-center font-black text-ink/40 text-2xl tracking-widest">
                …
              </div>
            )}
            {items.length > 12 && (
              <div aria-hidden className="hidden lg:grid place-items-center font-black text-ink/40 text-2xl tracking-widest">
                …
              </div>
            )}
          </>
        )}
      </div>

      {hasMore && (
        <div className="mt-3 flex justify-center">
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="btn-ghost text-sm px-4 py-2"
          >
            {expanded ? `▲ ${t('showLess')}` : `▼ ${t('showMore')}`}
          </button>
        </div>
      )}
    </>
  );
}
