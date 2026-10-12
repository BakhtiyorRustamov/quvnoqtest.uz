'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useSpring } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';
import LangSwitcher from '@/components/ui/LangSwitcher';
import { GRADES, isUnlockedSubject, type GradeDef, type SubjectDef } from '@/content/taxonomy';
import { pick } from '@/lib/i18n-config';
import { useSound } from '@/components/providers/SoundProvider';

const GRADE_COLORS = ['#F39A1F', '#1FA7E0', '#8DC63F', '#C2298A', '#5A2D82'];
const gradeColor = (n: number) => GRADE_COLORS[(n - 1) % GRADE_COLORS.length];

type Phase = 'logo' | 'rise' | 'grades';

/** 🚧 badge rendered over a tile name (SRS §7.2). */
function Hazard({ small = false }: { small?: boolean }) {
  return (
    <span
      aria-hidden
      className={`absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-amber-100/95 border border-amber-300 leading-none shadow ${
        small ? 'text-[11px] px-1.5 py-0.5' : 'text-sm px-2 py-0.5'
      }`}
    >
      🚧
    </span>
  );
}

function GradeTile({
  g,
  onOpen,
  gradeLabel,
  hidden
}: {
  g: GradeDef;
  onOpen: (n: number) => void;
  gradeLabel: string;
  hidden: boolean;
}) {
  const color = gradeColor(g.grade);
  const reduce = useReducedMotion();
  // 3D pointer-follow tilt
  const rx = useSpring(0, { stiffness: 260, damping: 18 });
  const ry = useSpring(0, { stiffness: 260, damping: 18 });

  function tilt(e: React.PointerEvent<HTMLButtonElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  }

  return (
    <motion.button
      layoutId={`grade-card-${g.grade}`}
      onClick={() => onOpen(g.grade)}
      onPointerMove={tilt}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      whileHover={{ y: -6, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="relative block w-full aspect-[5/4] focus-visible:outline-brand-blue"
      aria-label={gradeLabel}
      style={{
        borderRadius: 18,
        visibility: hidden ? 'hidden' : 'visible',
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 900
      }}
    >
      {/* stack-of-books-from-above */}
      <div className="absolute inset-0 rounded-2xl bg-ink/15 translate-x-2 translate-y-2.5 rotate-2" />
      <div
        className="absolute inset-0 rounded-2xl -rotate-1 translate-y-1"
        style={{ background: `${color}99` }}
      />
      <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-tile" style={{ background: color }}>
        <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20" />
        <div className="absolute left-3 top-0 bottom-0 w-[3px] bg-white/25" />
        <img
          src={`/sketches/tier${g.tier}.svg`}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-95"
          draggable={false}
        />
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative text-center">
            <div className="text-white font-black text-[clamp(30px,8vw,52px)] leading-none drop-shadow-[0_3px_0_rgba(0,0,0,0.25)]">
              {g.grade}
            </div>
            <div className="relative mt-0.5 text-white/95 font-extrabold text-[clamp(11px,2.6vw,15px)] drop-shadow">
              {gradeLabel}
              {g.grade !== 1 && <Hazard />}
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

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
  return (
    <motion.button
      variants={{
        hidden: { opacity: 0, scale: 0.35, y: 10 },
        show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 18 } }
      }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onPick(s)}
      className={`relative rounded-2xl p-2.5 pt-3 text-white shadow-card text-center ${
        unlocked ? 'ring-4 ring-white/70' : ''
      }`}
      style={{ background: s.color }}
    >
      <motion.img
        layoutId={`subj-art-${grade}-${s.key}`}
        src={`/sketches/subj-${s.sketch}.svg`}
        alt=""
        aria-hidden
        className="h-14 sm:h-16 mx-auto pointer-events-none"
        draggable={false}
      />
      <div className="relative mt-1.5 font-extrabold text-[11px] sm:text-xs leading-tight min-h-[2.2em] grid place-items-center">
        <span>{pick(s.name, locale)}</span>
        {!unlocked && <Hazard small />}
      </div>
      {unlocked && (
        <span className="absolute top-1 right-1 bg-brand-green text-white text-[10px] font-black rounded-full px-2 py-0.5 shadow">
          ▶
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

  // Intro choreography (FR-LND-2): logo alone → logo rises → grades fade in.
  // Plays on the first visit of the session; reduced-motion shows the settled state.
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

  function pickSubject(s: SubjectDef) {
    if (!openDef) return;
    play(isUnlockedSubject(openDef.grade, s.key) ? 'win' : 'pop');
    setFlight({ s, grade: openDef.grade });
    const dest = isUnlockedSubject(openDef.grade, s.key)
      ? '/lesson/g1-math-01'
      : `/subject/${openDef.grade}/${s.key}`;
    setTimeout(() => router.push(dest), reduce ? 0 : 700);
  }

  return (
    <LayoutGroup>
      <main className="min-h-screen flex flex-col overflow-x-hidden">
        {/* language switcher appears after the logo settles (FR-LND-2) */}
        <AnimatePresence>
          {phase !== 'logo' && (
            <motion.div
              className="fixed top-3 right-3 z-40"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <LangSwitcher />
            </motion.div>
          )}
        </AnimatePresence>

        {/* logo: centered alone, then rises to the top */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 80, damping: 16 }}
          className={
            phase === 'logo' ? 'flex-1 grid place-items-center px-6' : 'pt-5 pb-1 grid place-items-center px-6'
          }
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 80, damping: 16 }}
            className={phase === 'logo' ? 'w-[min(420px,82vw)]' : 'w-[min(290px,62vw)]'}
          >
            <AnimatedLogo drawIn />
          </motion.div>
        </motion.div>

        {/* grade tiles fade/slide in slowly, only after the logo has risen */}
        {phase === 'grades' && (
          <motion.section
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } }}
            className="w-full max-w-3xl mx-auto px-3 sm:px-6 pb-20"
          >
            <motion.h1
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              className="text-center text-ink/60 font-extrabold mb-4 mt-2"
            >
              {t('landing.chooseGrade')} · {t('landing.tagline')}
            </motion.h1>
            <div className="grid grid-cols-3 gap-3 sm:gap-5">
              {GRADES.map((g) => (
                <motion.div
                  key={g.grade}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
                  }}
                >
                  <GradeTile
                    g={g}
                    gradeLabel={t('common.grade', { n: g.grade })}
                    hidden={openGrade === g.grade}
                    onOpen={(n) => {
                      play('pop');
                      setOpenGrade(n);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* subjects expand FROM INSIDE the grade tile (FR-LND-5): the tile morphs
            into a book that opens, subjects pop out of it */}
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
              <motion.div
                className="absolute inset-0 bg-ink/45 backdrop-blur-[2px]"
                onClick={() => setOpenGrade(null)}
              />
              <motion.div
                layoutId={`grade-card-${openDef.grade}`}
                transition={{ type: 'spring', stiffness: 160, damping: 22 }}
                className="relative w-full max-w-3xl overflow-hidden shadow-2xl"
                style={{ borderRadius: 24, background: gradeColor(openDef.grade) }}
              >
                {/* opening front cover */}
                {!reduce && (
                  <motion.div
                    aria-hidden
                    className="absolute inset-0 z-20"
                    style={{
                      background: gradeColor(openDef.grade),
                      transformOrigin: 'left center',
                      borderRadius: 24
                    }}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: -92, opacity: [1, 1, 0] }}
                    transition={{ duration: 0.6, delay: 0.18, ease: 'easeIn' }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/20" />
                    <img
                      src={`/sketches/tier${openDef.tier}.svg`}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-95"
                    />
                    <div className="absolute inset-0 grid place-items-center text-white font-black text-6xl drop-shadow-[0_3px_0_rgba(0,0,0,0.25)]">
                      {openDef.grade}
                    </div>
                  </motion.div>
                )}

                {/* inside of the book: cream pages with the subjects */}
                <div className="relative bg-[#FFFBEF] p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-black text-ink text-lg sm:text-2xl">
                      📚 {t('landing.subjectsOf', { grade: openDef.grade })}
                    </h2>
                    <button
                      onClick={() => setOpenGrade(null)}
                      aria-label={t('common.close')}
                      className="w-11 h-11 rounded-full bg-white border border-ink/10 shadow-card font-black text-ink"
                    >
                      ✕
                    </button>
                  </div>
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.05, delayChildren: reduce ? 0 : 0.45 } }
                    }}
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

        {/* subject open animation (FR-LND-5a): the science sketch leads into the page */}
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
              <motion.div
                className="absolute bottom-16 text-white font-black text-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {pick(flight.s.name, locale)}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </LayoutGroup>
  );
}
