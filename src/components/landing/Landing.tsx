'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useSpring } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';
import LangSwitcher from '@/components/ui/LangSwitcher';
import { GRADES, isUnlockedSubject, type SubjectDef } from '@/content/taxonomy';
import { pick } from '@/lib/i18n-config';
import { useSound } from '@/components/providers/SoundProvider';
import GlassCard from './GlassCard';
import { ParticleField } from './Science';
import ScrollScene from './ScrollScene';
import Sections from './Sections';
import FlashlightDiscovery from './FlashlightDiscovery';
import FaqSection from './FaqSection';
import Marquee from './Marquee';
import SiteFooter from './SiteFooter';
import { useReveal, useScrollProgress, useScrolledPast, useSmoothScroll } from './scroll';

const GRADE_COLORS = ['#F39A1F', '#1FA7E0', '#8DC63F', '#C2298A', '#5A2D82'];
const gradeColor = (n: number) => GRADE_COLORS[(n - 1) % GRADE_COLORS.length];

/** glass-card accent, one per row of three (Task 2). */
const ROW_ACCENTS = ['#f39a1f', '#06b6d4', '#7c3aed', '#10b981'];
const accentFor = (n: number) => ROW_ACCENTS[Math.floor((n - 1) / 3) % ROW_ACCENTS.length];

type Phase = 'logo' | 'rise' | 'grades';

/** Subject card inside the opened grade book — glass styling that mirrors the
 *  grade grid (accent glow, cursor tilt, name pill, ▶/🚧 badge). The white sketch
 *  morphs into the full-screen flight via a shared layoutId. */
function SubjectChip({
  grade,
  s,
  onPick,
  locale
}: {
  grade: number;
  s: SubjectDef;
  onPick: (s: SubjectDef) => void;
  locale: string;
}) {
  const unlocked = isUnlockedSubject(grade, s.key);
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 250, damping: 18 });
  const ry = useSpring(0, { stiffness: 250, damping: 18 });

  function tilt(e: React.PointerEvent<HTMLButtonElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  }

  return (
    <motion.button
      variants={{
        hidden: { opacity: 0, scale: 0.4, y: 12 },
        show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }
      }}
      whileHover={reduce ? { scale: 1.03 } : { scale: 1.05, boxShadow: `0 0 26px ${s.color}aa, 0 16px 34px rgba(0,0,0,0.5)` }}
      whileTap={{ scale: 0.95 }}
      onPointerMove={tilt}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      onClick={() => onPick(s)}
      aria-label={pick(s.name, locale)}
      className={`glass relative block aspect-[5/4] w-full overflow-hidden rounded-2xl text-white shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70 ${
        unlocked ? 'ring-2 ring-brand-green/80' : ''
      }`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 700 }}
    >
      {/* accent wash + glow blob */}
      <span aria-hidden className="absolute inset-0" style={{ background: `radial-gradient(120% 110% at 50% 0%, ${s.color}66, transparent 60%)` }} />
      <span aria-hidden className="absolute -right-5 -top-6 h-20 w-20 rounded-full blur-2xl" style={{ background: s.color, opacity: 0.5 }} />

      {/* illustration + name */}
      <span className="relative z-10 flex h-full flex-col items-center justify-center gap-2 px-2 py-3">
        <motion.img
          layoutId={`subj-art-${grade}-${s.key}`}
          src={`/sketches/subj-${s.sketch}.svg`}
          alt=""
          aria-hidden
          draggable={false}
          className="h-11 w-11 shrink-0 pointer-events-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] sm:h-12 sm:w-12"
        />
        <span className="line-clamp-2 rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-center text-[11px] font-extrabold leading-tight backdrop-blur-sm">
          {pick(s.name, locale)}
        </span>
      </span>

      {/* status badge */}
      {unlocked ? (
        <span aria-hidden className="absolute right-1.5 top-1.5 z-10 grid h-6 w-6 place-items-center rounded-full bg-brand-green text-[11px] font-black text-white shadow">
          ▶
        </span>
      ) : (
        <span aria-hidden className="absolute right-1.5 top-1.5 z-10 rounded-full border border-amber-300/70 bg-amber-100/90 px-1.5 py-0.5 text-[10px] leading-none shadow">
          🚧
        </span>
      )}
    </motion.button>
  );
}

export default function Landing() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const reduce = useReducedMotion();
  const { play } = useSound();

  const [phase, setPhase] = useState<Phase>('logo');
  const [openGrade, setOpenGrade] = useState<number | null>(null);
  const [flight, setFlight] = useState<{ s: SubjectDef; grade: number } | null>(null);
  const active = phase === 'grades';

  // Scroll engine (all reduced-motion aware; progress/reveal wait for `active`).
  useSmoothScroll();
  useScrollProgress(active);
  useReveal(active);
  const scrolled = useScrolledPast(60);

  // Paint the deep-space backdrop on the document while the landing is mounted.
  useEffect(() => {
    const b = document.body.style;
    const prev = { background: b.background, color: b.color };
    b.background = '#0a0a2e';
    b.color = '#ffffff';
    return () => {
      b.background = prev.background;
      b.color = prev.color;
    };
  }, []);

  // Intro choreography (kept): logo alone → logo rises → content reveals.
  useEffect(() => {
    if (reduce || sessionStorage.getItem('qt_intro') === '1') {
      setPhase('grades');
      return;
    }
    sessionStorage.setItem('qt_intro', '1');
    const t1 = setTimeout(() => setPhase('rise'), 1700);
    const t2 = setTimeout(() => setPhase('grades'), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce]);

  useEffect(() => {
    router.prefetch('/lesson/g1-math-01');
    router.prefetch('/dashboard');
  }, [router]);

  const openDef = useMemo(() => GRADES.find((g) => g.grade === openGrade) ?? null, [openGrade]);

  function startDemo() {
    play('win');
    router.push('/lesson/g1-math-01');
  }

  function pickSubject(s: SubjectDef) {
    if (!openDef) return;
    play(isUnlockedSubject(openDef.grade, s.key) ? 'win' : 'pop');
    setFlight({ s, grade: openDef.grade });
    const dest = isUnlockedSubject(openDef.grade, s.key) ? '/lesson/g1-math-01' : `/subject/${openDef.grade}/${s.key}`;
    setTimeout(() => router.push(dest), reduce ? 0 : 700);
  }

  return (
    <LayoutGroup>
      <main className="relative min-h-screen overflow-x-clip" style={{ background: 'linear-gradient(180deg,#0a0a2e 0%,#0d1b4b 42%,#071a35 100%)' }}>
        {/* ---- Sticky header ---- */}
        {active && (
          <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
              scrolled ? 'bg-white/5 backdrop-blur-md border-b border-white/10' : ''
            }`}
          >
            {/* On mobile the wide wordmark and the language switch used to collide,
               so we stack them: switcher on top, logo dropped just below it. */}
            <div className="mx-auto flex max-w-6xl flex-col gap-1.5 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
              <div className="order-2 w-[150px] sm:order-1 sm:w-[180px]">
                <AnimatedLogo onDark />
              </div>
              <div className="order-1 self-end sm:order-2 sm:self-auto">
                <LangSwitcher />
              </div>
            </div>
          </motion.header>
        )}

        {/* ---- Hero + grade grid (Task 1 & 2) ---- */}
        {active && (
          <section className="relative z-10 px-4 pb-10 pt-24 sm:pt-28">
            <ParticleField count={40} />

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <span className="anim-first-hit -delay-1 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wide text-white/75 backdrop-blur-sm">
                {t('landing.kicker')}
              </span>
              <h1 className="mt-5 font-black leading-[1.05] text-white text-[clamp(30px,7vw,58px)]">
                <span className="anim-first-hit -delay-1 block">{t('landing.chooseGrade')}</span>
                <span className="anim-first-hit -delay-2 block bg-gradient-to-r from-brand-orange via-amber-300 to-brand-blue bg-clip-text text-transparent">
                  {t('landing.tagline')}
                </span>
              </h1>
            </div>

            {/* grade glass cards */}
            <div className="relative z-10 mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-3 sm:gap-5">
              {GRADES.map((g, i) => (
                <GlassCard
                  key={g.grade}
                  grade={g.grade}
                  index={i}
                  accent={accentFor(g.grade)}
                  label={t('common.grade', { n: g.grade })}
                  locked={g.grade !== 1}
                  comingSoon={t('common.comingSoon')}
                  onOpen={(n) => {
                    play('pop');
                    setOpenGrade(n);
                  }}
                />
              ))}
            </div>

            {/* scroll-down chevron (fades once scrolled) */}
            <div
              aria-hidden
              className="anim-first-hit -delay-3 relative z-10 mt-12 flex flex-col items-center gap-1 text-white/70 transition-opacity duration-500"
              style={{ opacity: scrolled ? 0 : 1 }}
            >
              <span className="text-xs font-bold uppercase tracking-widest">{t('landing.scrollHint')}</span>
              <svg className="scroll-chevron h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </section>
        )}

        {/* ---- Scroll-pinned scene (Task 3) ---- */}
        {active && <ScrollScene />}

        {/* ---- Reveal sections A–E (Task 4) ---- */}
        {active && <Sections onStart={startDemo} />}

        {/* ---- Flashlight discovery (learn, devices, pricing) ---- */}
        {active && <FlashlightDiscovery />}

        {/* ---- FAQ (moved out of the flashlight zone) ---- */}
        {active && <FaqSection />}

        {/* ---- Subject marquee (Task 5) ---- */}
        {active && <Marquee />}

        {/* ---- Footer (Task 6) ---- */}
        {active && <SiteFooter />}

        {/* ---- Grade → subjects book (existing flow preserved) ---- */}
        <AnimatePresence>
          {openDef && (
            <motion.div
              key="grade-panel"
              className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ perspective: 1400 }}
            >
              <motion.div className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]" onClick={() => setOpenGrade(null)} />
              <motion.div
                initial={{ scale: 0.85, y: 24, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 10, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                className="relative w-full max-w-3xl overflow-hidden shadow-2xl"
                style={{ borderRadius: 24, background: gradeColor(openDef.grade) }}
              >
                {/* opening front cover */}
                {!reduce && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 z-20"
                    style={{ background: gradeColor(openDef.grade), transformOrigin: 'left center', borderRadius: 24 }}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: -92, opacity: [1, 1, 0] }}
                    transition={{ duration: 0.6, delay: 0.18, ease: 'easeIn' }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20" />
                    <img src={`/sketches/tier${openDef.tier}.svg`} alt="" className="absolute inset-0 w-full h-full object-cover opacity-95" />
                    <div className="absolute inset-0 grid place-items-center text-white font-black text-6xl drop-shadow-[0_3px_0_rgba(0,0,0,0.25)]">
                      {openDef.grade}
                    </div>
                  </motion.div>
                )}

                {/* inside of the book: dark glass pages with the subjects */}
                <div
                  className="relative p-4 sm:p-6"
                  style={{ background: `radial-gradient(100% 55% at 50% 0%, ${gradeColor(openDef.grade)}33, transparent 62%), linear-gradient(180deg, #101f4a, #0a1330)` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-black text-white text-lg sm:text-2xl drop-shadow">📚 {t('landing.subjectsOf', { grade: openDef.grade })}</h2>
                    <button
                      onClick={() => setOpenGrade(null)}
                      aria-label={t('common.close')}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 font-black text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      ✕
                    </button>
                  </div>
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: reduce ? 0 : 0.45 } } }}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 max-h-[62vh] overflow-y-auto px-1 pt-3 pb-2"
                  >
                    {openDef.subjects.map((s) => (
                      <SubjectChip key={s.key} grade={openDef.grade} s={s} locale={locale} onPick={pickSubject} />
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- Subject open flight (preserved) ---- */}
        <AnimatePresence>
          {flight && (
            <motion.div
              key="flight"
              className="fixed inset-0 z-[70] grid place-items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              style={{ background: flight.s.color }}
            >
              <motion.img
                layoutId={`subj-art-${flight.grade}-${flight.s.key}`}
                src={`/sketches/subj-${flight.s.sketch}.svg`}
                alt=""
                className="w-44 sm:w-60"
                animate={reduce ? {} : { scale: [1, 1.45, 1.3], rotate: [0, -4, 4, 0] }}
                transition={{ duration: 0.6 }}
              />
              <motion.div className="absolute bottom-16 text-white font-black text-xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                {pick(flight.s.name, locale)}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- Intro overlay: logo alone → rises → reveals the page ---- */}
        <AnimatePresence>
          {!active && (
            <motion.div
              key="intro"
              className="fixed inset-0 z-[80] grid place-items-center px-6"
              style={{ background: 'linear-gradient(180deg,#0a0a2e,#071a35)' }}
              initial={false}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
            >
              <ParticleField count={26} />
              <motion.div
                className="relative w-[min(420px,82vw)]"
                animate={{ y: phase === 'rise' ? -34 : 0, scale: phase === 'rise' ? 0.84 : 1 }}
                transition={{ type: 'spring', stiffness: 90, damping: 16 }}
              >
                <AnimatedLogo drawIn onDark />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </LayoutGroup>
  );
}
