'use client';

import { useLocale } from 'next-intl';
import { WIDGETS, WIDGET_LABELS } from '@/components/learning/registry';
import { pick } from '@/lib/i18n-config';
import BackBar from '@/components/ui/BackBar';

/**
 * Dev gallery: renders every learning widget in the registry, one section
 * each, in the active language. Client component so registry widgets that are
 * client-only (e.g. the Grand Prix game) load correctly. Safe to remove in
 * production.
 */
export default function DemoPage() {
  const locale = useLocale();
  const entries = Object.entries(WIDGETS);
  return (
    <main className="min-h-screen pb-24">
      <BackBar />
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="font-black text-ink text-3xl mt-4">🧩 Interaktiv komponentlar</h1>
        <p className="font-bold text-ink/50 mt-1">
          {entries.length} ta komponent — har biri oʻz misolini oʻzi yaratadi. (dev gallereya)
        </p>
        {entries.map(([key, Widget]) => (
          <section key={key} className="mt-10">
            <h2 className="font-extrabold text-ink/55 text-sm uppercase tracking-wide mb-3">
              {WIDGET_LABELS[key] ? pick(WIDGET_LABELS[key], locale) : key} · <code>{key}</code>
            </h2>
            <Widget lang={locale} />
          </section>
        ))}
      </div>
    </main>
  );
}
