'use client';

import { useEffect, useState } from 'react';
import Mcq from '@/components/learning/Mcq';
import McqCard from '@/components/learning/McqCard';

const noop = () => {};
const handlers = { onAttempt: noop, onCorrect: noop, onNext: noop };

/**
 * Throwaway preview page: current Mcq vs. the shadcn/ui restyle (McqCard),
 * side by side, with the same props. Delete once a direction is chosen.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO: any = {
  prompt: 'Qaysi son eng katta?',
  choices: ['12', '48', '7', '30'],
  answerIndex: 1,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEMO_TEXT: any = {
  prompt: 'Quyosh qachon chiqadi?',
  choices: [
    { uz: 'Ertalab', ru: 'Утром', en: 'In the morning' },
    { uz: 'Kechqurun', ru: 'Вечером', en: 'In the evening' },
    { uz: 'Tunda', ru: 'Ночью', en: 'At night' },
  ],
  answerIndex: 0,
};

export default function ShadcnDemoPage() {
  const [lang, setLang] = useState('uz');
  // the widgets shuffle choices with Math.random(); rendering them only after
  // mount avoids a server/client order mismatch (hydration warning).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <main className="min-h-screen bg-bg px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-3">
          <h1 className="text-2xl font-black text-ink">Quiz widget — shadcn/ui demo</h1>
          <div className="flex gap-1">
            {['uz', 'ru', 'en'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-lg px-3 py-1.5 text-sm font-black uppercase ${
                  lang === l ? 'bg-brand-blue text-white' : 'bg-white text-ink/60 border-2 border-ink/10'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {mounted && (
          <>
            <div className="grid gap-10 md:grid-cols-2">
              <section>
                <h2 className="mb-3 text-center text-sm font-black uppercase tracking-wide text-ink/50">
                  Current
                </h2>
                <Mcq key={`old-${lang}`} {...DEMO} lang={lang} {...handlers} />
              </section>
              <section>
                <h2 className="mb-3 text-center text-sm font-black uppercase tracking-wide text-ink/50">
                  shadcn/ui restyle
                </h2>
                <McqCard key={`new-${lang}`} {...DEMO} lang={lang} {...handlers} />
              </section>
            </div>

            <div className="mt-14 grid gap-10 md:grid-cols-2">
              <section>
                <h2 className="mb-3 text-center text-sm font-black uppercase tracking-wide text-ink/50">
                  Current (text choices)
                </h2>
                <Mcq key={`oldt-${lang}`} {...DEMO_TEXT} lang={lang} {...handlers} />
              </section>
              <section>
                <h2 className="mb-3 text-center text-sm font-black uppercase tracking-wide text-ink/50">
                  shadcn/ui restyle (text choices)
                </h2>
                <McqCard key={`newt-${lang}`} {...DEMO_TEXT} lang={lang} {...handlers} />
              </section>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
