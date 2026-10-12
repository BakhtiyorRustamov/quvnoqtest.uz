"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * ElephantGame — a NUT RACE. Four elephants sit around a glowing plate; the
 * child IS the blue elephant, the other three are competitors. Each round a
 * word appears on the plate and four word-nuts sit next to the trunks; the
 * child must tap the synonym (maʼnodosh) or antonym (zid maʼnoli) before the
 * competitors snatch it. Competitors nibble at nuts — sometimes they fumble —
 * but the slower the child is, or the more wrong words they tap, the bolder
 * (and more successful) the competitors get. First elephant to 5 nuts wins.
 *
 * Art (all 1376×768, /public/games) — corners: orange top-left, yellow top-right,
 * blue (the CHILD) bottom-left, red bottom-right:
 *   fillar-base.webp        everyone standing around the plate
 *   fillar-eat-blue.webp    blue (the child, bottom-left) eating
 *   fillar-eat-yellow.webp  yellow (top-right) eating
 *   fillar-eat-orange.webp  orange (top-left) eating
 *   fillar-eat-red.webp     red (bottom-right) eating
 *
 * Layout: full-screen on start. Landscape/desktop → the four word-nut choices
 * cluster tightly around the central question plate. Portrait/mobile → the full
 * artwork is a band up top (where the eating animations play) and the four
 * word-nuts become big colour-coded chips below.
 *
 * Contract: single default export · pure generateProblem(config) ·
 * props in / callbacks out · STRINGS uz/ru/en · a11y + reduced motion.
 *
 * Props: lang?, target? (nuts to win), maxRounds?, roundMs?, username?,
 *        onAttempt?, onCorrect?, onWrong?, onNext?, onFinish?
 */

const BASE = "/games/fillar-base.webp";
const EAT = [
  "/games/fillar-eat-blue.webp",   // 0 — the child
  "/games/fillar-eat-yellow.webp", // 1
  "/games/fillar-eat-orange.webp", // 2
  "/games/fillar-eat-red.webp"     // 3
];
const COLORS = ["#4a9be8", "#f0c930", "#f09030", "#e8564a"];

// Desktop/landscape answer layout: the four word-nut choices cluster tightly
// around the central plate (question) in a 2×2 grid. The grid order mirrors each
// elephant's corner in the artwork — orange top-left, yellow top-right,
// blue (the child) bottom-left, red bottom-right — as a gentle spatial cue.
const CENTER_ORDER = [2, 1, 0, 3];

/* ----------------------------- pure helpers ----------------------------- */

const randInt = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** word pairs per language: [word, match] — syn = maʼnodosh, ant = zid maʼnoli */
const PAIRS = {
  uz: {
    syn: [
      ["katta", "ulkan"], ["chiroyli", "goʻzal"], ["tez", "chaqqon"],
      ["doʻst", "oʻrtoq"], ["xursand", "shod"], ["aqlli", "dono"],
      ["yurt", "vatan"], ["ish", "mehnat"], ["osmon", "falak"],
      ["kuch", "quvvat"], ["yuz", "chehra"], ["odobli", "tarbiyali"]
    ],
    ant: [
      ["katta", "kichik"], ["uzun", "qisqa"], ["issiq", "sovuq"],
      ["kun", "tun"], ["oq", "qora"], ["baland", "past"],
      ["yangi", "eski"], ["tez", "sekin"], ["ogʻir", "yengil"],
      ["shirin", "achchiq"], ["kulmoq", "yigʻlamoq"], ["ertalab", "kechqurun"]
    ]
  },
  ru: {
    syn: [
      ["большой", "огромный"], ["красивый", "прекрасный"], ["быстрый", "шустрый"],
      ["друг", "товарищ"], ["весёлый", "радостный"], ["умный", "мудрый"],
      ["родина", "отчизна"], ["работа", "труд"], ["смелый", "храбрый"],
      ["сила", "мощь"], ["дом", "жилище"], ["вежливый", "воспитанный"]
    ],
    ant: [
      ["большой", "маленький"], ["длинный", "короткий"], ["горячий", "холодный"],
      ["день", "ночь"], ["белый", "чёрный"], ["высокий", "низкий"],
      ["новый", "старый"], ["быстрый", "медленный"], ["тяжёлый", "лёгкий"],
      ["сладкий", "горький"], ["смеяться", "плакать"], ["утро", "вечер"]
    ]
  },
  en: {
    syn: [
      ["big", "huge"], ["pretty", "beautiful"], ["fast", "quick"],
      ["friend", "buddy"], ["happy", "glad"], ["smart", "wise"],
      ["home", "house"], ["work", "labor"], ["brave", "bold"],
      ["strong", "mighty"], ["small", "tiny"], ["kind", "gentle"]
    ],
    ant: [
      ["big", "small"], ["long", "short"], ["hot", "cold"],
      ["day", "night"], ["white", "black"], ["high", "low"],
      ["new", "old"], ["fast", "slow"], ["heavy", "light"],
      ["sweet", "bitter"], ["laugh", "cry"], ["morning", "evening"]
    ]
  }
};

/** One round: a word, its match (syn or ant) and 3 distractors on 4 nut spots. */
export function generateProblem({ lang = "uz", mode } = {}) {
  const bank = PAIRS[lang] || PAIRS.uz;
  const m = mode || (Math.random() < 0.5 ? "syn" : "ant");
  const list = bank[m];
  const pi = randInt(0, list.length - 1);
  const [word, match] = list[pi];
  const others = shuffle(
    list.filter((_, i) => i !== pi).map(([, b]) => b)
      .filter((w) => w !== word && w !== match)
  ).slice(0, 3);
  const options = shuffle([match, ...others]);
  return { mode: m, word, match, options, correctIdx: options.indexOf(match) };
}

/* ------------------------------- strings -------------------------------- */

const STRINGS = {
  uz: {
    title: "Fillar oʻyini",
    subtitle: "Toʻgʻri soʻzli yongʻoqni fillardan oldin ye!",
    start: "Oʻyinni boshlash",
    exit: "Oʻyindan chiqish",
    soundOn: "Ovoz: yoniq",
    soundOff: "Ovoz: oʻchiq",
    qSyn: "MAʼNODOSHINI top:",
    qAnt: "ZID MAʼNOLISINI top:",
    you: "Sen",
    names: ["Koʻk", "Sariq", "Olovrang", "Qizil"],
    youAte: "Barakalla! Yongʻoq seniki!",
    compAte: (n) => `${n} fil yongʻoqni yeb qoʻydi!`,
    compFail: (n) => `${n} fil yeb olomadi!`,
    wrong: "Notoʻgʻri soʻz! Ehtiyot boʻl!",
    tooSlow: "Tezroq boʻl!",
    optAria: (w) => `Yongʻoq: ${w}`,
    resWin: "Sen yutding! 🏆",
    resLose: "Oʻyin tugadi!",
    standings: "Natijalar",
    nuts: "yongʻoq",
    moodTop: "Ajoyib! Sen soʻz ustasisan!",
    moodMid: "Juda yaxshi! Yana bir bor sinab koʻr!",
    moodLow: "Davom et — soʻzlar mashq bilan yod boʻladi!",
    yourScore: "Natijang",
    replay: "Qaytadan oʻynash",
    back: "Orqaga"
  },
  ru: {
    title: "Игра со слонами",
    subtitle: "Съешь орех с верным словом раньше слонов!",
    start: "Начать игру",
    exit: "Выйти из игры",
    soundOn: "Звук: вкл",
    soundOff: "Звук: выкл",
    qSyn: "Найди СИНОНИМ:",
    qAnt: "Найди АНТОНИМ:",
    you: "Ты",
    names: ["Синий", "Жёлтый", "Оранжевый", "Красный"],
    youAte: "Молодец! Орех твой!",
    compAte: (n) => `${n} слон съел орех!`,
    compFail: (n) => `${n} слон промахнулся!`,
    wrong: "Не то слово! Будь внимательнее!",
    tooSlow: "Поторопись!",
    optAria: (w) => `Орех: ${w}`,
    resWin: "Ты победил! 🏆",
    resLose: "Игра окончена!",
    standings: "Результаты",
    nuts: "орехов",
    moodTop: "Отлично! Ты мастер слов!",
    moodMid: "Очень хорошо! Попробуй ещё раз!",
    moodLow: "Продолжай — слова запомнятся с практикой!",
    yourScore: "Твой счёт",
    replay: "Играть снова",
    back: "Назад"
  },
  en: {
    title: "Elephant Game",
    subtitle: "Eat the nut with the right word before the elephants do!",
    start: "Start the game",
    exit: "Exit game",
    soundOn: "Sound: on",
    soundOff: "Sound: off",
    qSyn: "Find the SYNONYM of:",
    qAnt: "Find the OPPOSITE of:",
    you: "You",
    names: ["Blue", "Yellow", "Orange", "Red"],
    youAte: "Well done! The nut is yours!",
    compAte: (n) => `${n} elephant ate the nut!`,
    compFail: (n) => `${n} elephant missed!`,
    wrong: "Wrong word! Careful!",
    tooSlow: "Hurry up!",
    optAria: (w) => `Nut: ${w}`,
    resWin: "You win! 🏆",
    resLose: "Game over!",
    standings: "Standings",
    nuts: "nuts",
    moodTop: "Amazing! You are a word master!",
    moodMid: "Very good! Try once more!",
    moodLow: "Keep going — words stick with practice!",
    yourScore: "Your score",
    replay: "Play again",
    back: "Back"
  }
};

const FONT = "'Fredoka', 'Baloo 2', system-ui, sans-serif";

/* ------------------------------ tiny audio ------------------------------ */

function createAudio() {
  let ctx = null, master = null, muted = false;
  const ensure = () => {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.9;
      master.connect(ctx.destination);
    }
  };
  const blip = (f, s, d, type = "triangle", v = .3, to = null) => {
    if (!ctx || muted) return;
    const t0 = ctx.currentTime + s;
    const o = ctx.createOscillator(); o.type = type;
    o.frequency.setValueAtTime(f, t0);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + d);
    const g = ctx.createGain();
    g.gain.setValueAtTime(.0001, t0);
    g.gain.exponentialRampToValueAtTime(v, t0 + .012);
    g.gain.exponentialRampToValueAtTime(.0001, t0 + d);
    o.connect(g); g.connect(master); o.start(t0); o.stop(t0 + d + .03);
  };
  return {
    resume: async () => { ensure(); if (ctx.state === "suspended") await ctx.resume(); },
    setMuted: (m) => { muted = m; if (master) master.gain.value = m ? 0 : .9; },
    munch: () => { ensure(); blip(330, 0, .08, "square", .22, 240); blip(330, .1, .08, "square", .22, 240); },
    trumpet: () => { ensure(); blip(392, 0, .3, "sawtooth", .18, 587); },
    fumble: () => { ensure(); blip(500, 0, .12, "sine", .2, 320); blip(280, .12, .16, "sine", .2, 180); },
    correct: () => { ensure(); [523, 659, 784].forEach((f, i) => blip(f, i * .085, .16, "triangle", .34)); },
    wrong: () => { ensure(); blip(220, 0, .22, "sine", .26, 150); },
    beep: () => { ensure(); blip(880, 0, .1, "square", .18); },
    win: () => { ensure(); [523, 659, 784, 1047, 1319].forEach((f, i) => blip(f, i * .11, .32, "triangle", .4)); }
  };
}

/* ----------------------------- the component ---------------------------- */

export default function ElephantGame({
  lang = "uz",
  target = 5,
  maxRounds = 10,
  roundMs = 9000,
  username = "",
  debug = false,
  onAttempt, onCorrect, onWrong, onNext, onFinish
}) {
  const S = STRINGS[lang] || STRINGS.uz;

  const [phase, setPhase] = useState("intro"); // intro | playing | finished
  const [round, setRound] = useState(null);
  const [roundNo, setRoundNo] = useState(0);
  const [nuts, setNuts] = useState([0, 0, 0, 0]); // 0 = the child (blue)
  const [eater, setEater] = useState(null);       // { idx, success } during animation
  const [wrongSpot, setWrongSpot] = useState(null);
  const [toast, setToast] = useState(null);       // { kind, text }
  const [muted, setMuted] = useState(false);
  const [results, setResults] = useState(null);
  const [confetti, setConfetti] = useState(0);
  const [portrait, setPortrait] = useState(false);

  const rootRef = useRef(null);
  const nutsRef = useRef([0, 0, 0, 0]); // mirror of `nuts` for event handlers
  const barRef = useRef(null);
  const audioRef = useRef(null);
  const reducedRef = useRef(false);
  const lockRef = useRef(false);
  const deadlineRef = useRef(0);
  const pausedRemainRef = useRef(null);
  const missesRef = useRef(0);        // wrong taps + timeouts → competitor boldness
  const nibbleFiredRef = useRef(false); // theatrical fail fired this round
  const nibbleAtRef = useRef(0.5);
  const timeoutsRef = useRef([]);     // pending setTimeout ids
  const latest = useRef({});          // latest-state bridge for the rAF loop
  if (!audioRef.current) audioRef.current = createAudio();

  useEffect(() => {
    if (document.getElementById("gpa-font")) return;
    const l = document.createElement("link");
    l.id = "gpa-font"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap";
    document.head.appendChild(l);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => (reducedRef.current = mq.matches);
    apply(); mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const apply = () => setPortrait(mq.matches);
    apply(); mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // lock page scroll while the full-screen game is up
  useEffect(() => {
    if (phase === "intro") return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [phase]);

  useEffect(() => () => {
    timeoutsRef.current.forEach(clearTimeout);
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  }, []);

  // preload the eating variants so swaps are instant
  useEffect(() => {
    [BASE, ...EAT].forEach((src) => { const im = new Image(); im.src = src; });
  }, []);

  const later = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  const enterFs = useCallback(() => {
    rootRef.current?.requestFullscreen?.({ navigationUI: "hide" }).catch(() => {});
  }, []);
  const exitFs = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  }, []);

  /* --------------------------- race mechanics --------------------------- */

  const pauseTimer = useCallback(() => {
    pausedRemainRef.current = Math.max(0, deadlineRef.current - performance.now());
  }, []);
  const resumeTimer = useCallback((minMs = 0) => {
    const rem = Math.max(pausedRemainRef.current ?? roundMs, minMs);
    deadlineRef.current = performance.now() + rem;
    pausedRemainRef.current = null;
  }, [roundMs]);

  const nextRound = useCallback((no) => {
    setRound(generateProblem({ lang }));
    setRoundNo(no);
    setEater(null); setWrongSpot(null); setToast(null);
    nibbleFiredRef.current = false;
    nibbleAtRef.current = 0.35 + Math.random() * 0.35; // theatrical nibble moment
    deadlineRef.current = performance.now() + roundMs;
    pausedRemainRef.current = null;
    lockRef.current = false;
    audioRef.current.beep();
    onNext?.();
  }, [lang, roundMs, onNext]);

  const finishRace = useCallback((finalNuts) => {
    const my = finalNuts[0];
    const bestOther = Math.max(finalNuts[1], finalNuts[2], finalNuts[3]);
    const place = 1 + finalNuts.filter((n, i) => i > 0 && n > my).length;
    audioRef.current.win();
    if (my > bestOther && !reducedRef.current) setConfetti((c) => c + 1);
    setResults({ nuts: finalNuts, place, won: my > bestOther });
    setPhase("finished");
    onFinish?.(my, { score: my, total: target, place });
  }, [onFinish, target]);

  /** somebody eats a nut for real */
  const scoreNut = useCallback((idx) => {
    const next = nutsRef.current.slice();
    next[idx] += 1;
    nutsRef.current = next;
    setNuts(next);
    const done = next[idx] >= target;
    later(() => {
      setEater(null); setToast(null);
      if (done || latest.current.roundNo >= maxRounds) finishRace(next);
      else nextRound(latest.current.roundNo + 1);
    }, 1250);
  }, [target, maxRounds, later, finishRace, nextRound]);

  /** a competitor tries to snatch the correct nut */
  const competitorAttempt = useCallback((baseP) => {
    lockRef.current = true;
    pauseTimer();
    const idx = randInt(1, 3);
    const p = Math.min(0.9, baseP + missesRef.current * 0.06);
    const success = Math.random() < p;
    setEater({ idx, success });
    if (success) {
      audioRef.current.munch();
      audioRef.current.trumpet();
      setToast({ kind: "bad", text: S.compAte(S.names[idx]) });
      scoreNut(idx);
    } else {
      audioRef.current.fumble();
      setToast({ kind: "ok", text: S.compFail(S.names[idx]) });
      later(() => {
        setEater(null); setToast(null);
        lockRef.current = false;
        resumeTimer(4000); // give the child at least 4 more seconds
      }, 950);
    }
  }, [S, pauseTimer, resumeTimer, scoreNut, later]);

  /** theatrical mid-round nibble that always fails (pure fun, no lock) */
  const nibble = useCallback(() => {
    if (lockRef.current) return;
    const idx = randInt(1, 3);
    setEater({ idx, success: false });
    audioRef.current.fumble();
    later(() => { setEater((e) => (e && !e.success ? null : e)); }, 800);
  }, [later]);

  const handleTimeout = useCallback(() => {
    if (lockRef.current) return;
    missesRef.current += 1;
    setToast({ kind: "bad", text: S.tooSlow });
    onAttempt?.(false, { reason: "timeout" });
    competitorAttempt(0.8);
  }, [S, onAttempt, competitorAttempt]);

  // keep the rAF loop in sync with the latest state/handlers
  latest.current = { phase, roundNo, handleTimeout, nibble };

  // round countdown (drives the timer bar via direct DOM writes)
  useEffect(() => {
    if (phase !== "playing") return;
    let raf;
    const tick = () => {
      const L = latest.current;
      if (L.phase !== "playing") return;
      if (!lockRef.current) {
        const rem = deadlineRef.current - performance.now();
        const pct = Math.max(0, Math.min(1, rem / roundMs));
        if (barRef.current) {
          barRef.current.style.width = pct * 100 + "%";
          barRef.current.style.background = pct > 0.4 ? "#3FBF4F" : pct > 0.2 ? "#FFC233" : "#E5484D";
        }
        if (!nibbleFiredRef.current && pct < 1 - nibbleAtRef.current) {
          nibbleFiredRef.current = true;
          L.nibble();
        }
        if (rem <= 0) L.handleTimeout();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, roundMs]);

  const start = useCallback(async () => {
    enterFs();
    await audioRef.current.resume();
    audioRef.current.setMuted(muted);
    nutsRef.current = [0, 0, 0, 0];
    setNuts([0, 0, 0, 0]); setResults(null); setConfetti(0);
    missesRef.current = 0;
    setPhase("playing");
    nextRound(1);
  }, [enterFs, muted, nextRound]);

  /** the child taps a word-nut */
  const pick = useCallback((spotIdx) => {
    if (phase !== "playing" || !round || lockRef.current || wrongSpot === spotIdx) return;
    const ok = spotIdx === round.correctIdx;
    onAttempt?.(ok, { mode: round.mode, word: round.word, chosen: round.options[spotIdx] });
    if (ok) {
      lockRef.current = true;
      pauseTimer();
      setEater({ idx: 0, success: true });
      setToast({ kind: "good", text: S.youAte });
      audioRef.current.correct();
      audioRef.current.munch();
      onCorrect?.();
      if (!reducedRef.current) setConfetti((c) => c + 1);
      scoreNut(0);
    } else {
      missesRef.current += 1;
      setWrongSpot(spotIdx);
      setToast({ kind: "bad", text: S.wrong });
      audioRef.current.wrong();
      onWrong?.();
      later(() => setWrongSpot((x) => (x === spotIdx ? null : x)), 1000);
      // a wrong word wakes the competitors up
      later(() => { if (!lockRef.current) competitorAttempt(0.55); }, 450);
    }
  }, [phase, round, wrongSpot, S, onAttempt, onCorrect, onWrong,
      pauseTimer, scoreNut, competitorAttempt, later]);

  const quitGame = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setPhase("intro"); setRound(null); setResults(null); setEater(null);
    exitFs();
  }, [exitFs]);

  const question = round ? (round.mode === "syn" ? S.qSyn : S.qAnt) : "";
  const artSrc = eater ? EAT[eater.idx] : BASE;
  const liveText = toast ? toast.text : round ? `${question} ${round.word}` : "";

  const nutPills = (
    <div className="fg-nuts" aria-hidden="true">
      {nuts.map((n, i) => (
        <span key={i}
          className={"fg-nutpill" + (i === 0 ? " is-you" : "") + (eater && eater.idx === i && eater.success ? " is-eating" : "")}
          style={{ borderColor: COLORS[i] }}>
          <i className="fg-dot" style={{ background: COLORS[i] }} />
          {i === 0
            ? <span className="fg-youtag">🔵 {username || S.you}</span>
            : S.names[i]} 🥜<b>{n}</b>
        </span>
      ))}
    </div>
  );

  const plate = round && (
    <div className={"fg-plate" + (portrait ? " fg-plate-flow" : "")}>
      <span className="fg-mode">{question}</span>
      <span className={"fg-word" + (round.mode === "ant" ? " is-ant" : "")}>{round.word.toUpperCase()}</span>
      <span className="fg-timer"><i ref={barRef} /></span>
    </div>
  );

  const bubble = (i, extra) => round && (
    <button
      key={i}
      className={"fg-bubble"
        + (wrongSpot === i ? " is-no" : "")
        + (eater && eater.success && i === round.correctIdx ? " is-taken" : "")}
      style={{ borderColor: COLORS[i], ...extra }}
      onClick={() => pick(i)}
      disabled={lockRef.current || wrongSpot === i}
      aria-label={S.optAria(round.options[i])}
    >
      🥜 {round.options[i]}
      {wrongSpot === i && <span className="fg-x" aria-hidden>✕</span>}
    </button>
  );

  /* --------------------------- intro (card view) --------------------------- */
  if (phase === "intro") {
    return (
      <div ref={rootRef} className="fg-root" style={{ fontFamily: FONT }}>
        <style>{css}</style>
        <div className="fg-card">
          <div className="fg-head">
            <div>
              <div className="fg-title">{S.title}</div>
              <div className="fg-sub">{S.subtitle}</div>
            </div>
            <button className="fg-mute" aria-pressed={muted}
              onClick={() => { const m = !muted; setMuted(m); audioRef.current.setMuted(m); }}>
              {muted ? "🔇 " + S.soundOff : "🔊 " + S.soundOn}
            </button>
          </div>
          <div className="fg-cover-box">
            <img className="fg-cover-img" src={BASE} alt="" draggable="false" />
            <div className="fg-cover">
              <button className="fg-start" onClick={start}>{S.start}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* --------------------- playing / finished (full screen) --------------------- */
  return (
    <div ref={rootRef} className="fg-root fg-full" style={{ fontFamily: FONT }}>
      <style>{css}</style>
      <div className="fg-bgfill" aria-hidden="true" />

      <div className="fg-top">
        <div className="fg-title fg-title-sm">{S.title}</div>
        {phase === "playing" && nutPills}
        <div className="fg-headbtns">
          <button className="fg-mute" aria-pressed={muted}
            onClick={() => { const m = !muted; setMuted(m); audioRef.current.setMuted(m); }}>
            {muted ? "🔇" : "🔊"}
          </button>
          <button className="fg-exit" onClick={quitGame} aria-label={S.exit} title={S.exit}>✕</button>
        </div>
      </div>

      {phase === "finished" && results ? (
        <div className="fg-results">
          <div className="fg-trophy" aria-hidden>{results.won ? "🏆" : "🥜"}</div>
          <div className="fg-res-title">{results.won ? S.resWin : S.resLose}</div>
          <div className="fg-res-mood">
            {results.won ? S.moodTop : results.place <= 2 ? S.moodMid : S.moodLow}
          </div>
          <div className="fg-standings">
            <div className="fg-standings-t">{S.standings}</div>
            {[0, 1, 2, 3]
              .sort((a, b) => results.nuts[b] - results.nuts[a] || a - b)
              .map((i, rank) => (
                <div key={i} className={"fg-standrow" + (i === 0 ? " is-you" : "")}>
                  <span className="fg-rank">{rank + 1}.</span>
                  <i className="fg-dot" style={{ background: COLORS[i] }} />
                  <span className="fg-standname">{i === 0 ? `🔵 ${username || S.you}` : S.names[i]}</span>
                  <span className="fg-standnuts">🥜 {results.nuts[i]}</span>
                </div>
              ))}
          </div>
          <div className="fg-res-btns">
            <button className="fg-start" onClick={start}>🔁 {S.replay}</button>
            <a className="fg-home" href="/dashboard/g1-ona" onClick={exitFs}>← {S.back}</a>
          </div>
          {confetti > 0 && !reducedRef.current && <Confetti key={confetti} />}
        </div>
      ) : portrait ? (
        /* ---------- portrait: art band on top, big chips below ---------- */
        <>
          <div className="fg-artband">
            <img className="fg-art" src={artSrc} alt="" draggable="false" />
            {eater && (
              <span className={"fg-flash" + (eater.success ? " is-good" : " is-fail")} aria-hidden>
                {eater.success ? "🥜✓" : "✕"}
              </span>
            )}
          </div>
          {plate}
          {toast && <div className={"fg-toast is-" + toast.kind}>{toast.text}</div>}
          <div className="fg-chips">
            {round && [0, 1, 2, 3].map((i) => bubble(i))}
          </div>
          {confetti > 0 && !reducedRef.current && <Confetti key={confetti} />}
        </>
      ) : (
        /* ---------- landscape: choices clustered around the centre plate ---------- */
        <div className="fg-stagewrap">
          <div className="fg-artbox">
            <img className="fg-art" src={artSrc} alt="" draggable="false" />
            {round && (
              <div className="fg-centercluster">
                <div className="fg-plate fg-plate-center">
                  <span className="fg-mode">{question}</span>
                  <span className={"fg-word" + (round.mode === "ant" ? " is-ant" : "")}>{round.word.toUpperCase()}</span>
                  <span className="fg-timer"><i ref={barRef} /></span>
                </div>
                <div className="fg-centerbubbles">
                  {CENTER_ORDER.map((i) => bubble(i))}
                </div>
              </div>
            )}
            {toast && <div className={"fg-toast fg-toast-abs is-" + toast.kind}>{toast.text}</div>}
          </div>
          {confetti > 0 && !reducedRef.current && <Confetti key={confetti} />}
        </div>
      )}

      <div className="fg-sr" aria-live="polite">{liveText}</div>
    </div>
  );
}

/* ----------------------------- confetti --------------------------------- */
function Confetti() {
  const colors = ["#3FBF4F", "#2BB6D6", "#7C5CFC", "#FF6B5C", "#FFC233"];
  return (
    <div className="fg-confetti" aria-hidden="true">
      {Array.from({ length: 16 }).map((_, i) => (
        <span key={i} style={{
          left: 38 + Math.random() * 24 + "%", background: colors[i % colors.length],
          animationDelay: Math.random() * 0.2 + "s",
          "--dx": (Math.random() * 220 - 110) + "px"
        }} />
      ))}
    </div>
  );
}

/* --------------------------------- css ---------------------------------- */
const css = `
.fg-root{max-width:760px;margin:0 auto;color:#2b2f3a;}
/* ---------- full-screen game ---------- */
.fg-full{position:fixed;inset:0;z-index:2147483000;max-width:none;margin:0;display:flex;flex-direction:column;overflow:hidden;padding:max(8px,env(safe-area-inset-top)) 10px calc(10px + env(safe-area-inset-bottom));}
.fg-bgfill{position:absolute;inset:0;background:linear-gradient(#8fd05f,#5cab3c);z-index:-1;}
.fg-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.fg-title{font-size:24px;font-weight:700;color:#2e8b57;line-height:1.1;}
.fg-title-sm{font-size:15px;color:#1d5c39;background:rgba(255,255,255,.85);border-radius:999px;padding:6px 12px;}
.fg-sub{font-size:13px;color:#587a58;margin-top:2px;}
.fg-headbtns{display:flex;gap:8px;align-items:center;margin-left:auto;}
.fg-mute{font-family:inherit;font-size:14px;font-weight:600;border:2px solid rgba(255,255,255,.9);background:rgba(255,255,255,.85);border-radius:999px;padding:7px 12px;cursor:pointer;min-height:40px;color:#456b42;}
.fg-mute:focus-visible,.fg-exit:focus-visible{outline:3px solid #4CAF50;outline-offset:2px;}
.fg-exit{font-family:inherit;font-size:16px;font-weight:700;border:2px solid rgba(255,255,255,.9);background:rgba(255,255,255,.85);color:#456b42;border-radius:999px;width:42px;height:42px;min-height:42px;cursor:pointer;line-height:1;}
/* nut counters */
.fg-nuts{display:flex;gap:6px;flex-wrap:wrap;}
.fg-nutpill{display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.9);border:2.5px solid;border-radius:999px;padding:4px 10px;font-size:12.5px;font-weight:700;color:#2b2f3a;}
.fg-nutpill b{font-size:14px;}
.fg-nutpill.is-you{box-shadow:0 0 0 3px rgba(74,155,232,.55);background:rgba(74,155,232,.16);border-color:#4a9be8;border-width:3px;}
.fg-youtag{display:inline-flex;align-items:center;gap:3px;background:#4a9be8;color:#fff;border-radius:999px;padding:1px 9px;font-weight:800;}
.fg-nutpill.is-eating{animation:fg-bounce .6s ease;}
.fg-dot{width:12px;height:12px;border-radius:999px;display:inline-block;}
/* stage (landscape) — full artwork, exact aspect, bubbles glued to trunks */
.fg-stagewrap{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;position:relative;}
.fg-artbox{position:relative;aspect-ratio:1376/768;max-width:100%;max-height:100%;width:auto;height:100%;border-radius:16px;overflow:hidden;box-shadow:0 10px 28px rgba(30,70,30,.3);}
.fg-artbox .fg-art{position:absolute;inset:0;width:100%;height:100%;user-select:none;-webkit-user-drag:none;}
/* portrait art band */
.fg-artband{position:relative;width:100%;aspect-ratio:1376/768;border-radius:14px;overflow:hidden;margin-top:8px;box-shadow:0 8px 20px rgba(30,70,30,.3);flex-shrink:0;}
.fg-artband .fg-art{position:absolute;inset:0;width:100%;height:100%;}
.fg-flash{position:absolute;right:4%;top:6%;font-size:clamp(22px,6vw,40px);font-weight:700;background:rgba(255,255,255,.9);border-radius:999px;padding:4px 12px;}
.fg-flash.is-fail{color:#E5484D;}
.fg-flash.is-good{color:#1fa888;}
/* plate: mode + word + timer */
.fg-plate{position:absolute;left:49.5%;top:44%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:4px;background:rgba(255,255,255,.94);border:3px solid #cfe0d5;border-radius:18px;padding:10px 18px;box-shadow:0 6px 18px rgba(20,60,30,.25);max-width:44%;}
.fg-plate-flow{position:static;transform:none;margin:10px auto 0;max-width:96%;flex-shrink:0;}
/* landscape centre cluster: the four choices hug the question plate */
.fg-centercluster{position:absolute;left:50%;top:49%;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:5px;width:min(66%,540px);z-index:6;}
.fg-plate-center{position:static;transform:none;max-width:100%;width:100%;}
.fg-centerbubbles{display:grid;grid-template-columns:1fr 1fr;gap:7px;width:100%;}
.fg-centerbubbles .fg-bubble{width:100%;}
.fg-centerbubbles .fg-bubble:hover:not(:disabled){transform:scale(1.05);}
.fg-centerbubbles .fg-bubble.is-no{animation:fg-shake-flow .5s;}
.fg-mode{font-size:clamp(11px,1.8vh,15px);font-weight:700;color:#587a58;letter-spacing:.04em;}
.fg-word{font-size:clamp(20px,4.2vh,38px);font-weight:700;color:#2e8b57;line-height:1.05;white-space:nowrap;}
.fg-word.is-ant{color:#d9663c;}
.fg-timer{width:100%;height:8px;border-radius:999px;background:#e6efe6;overflow:hidden;}
.fg-timer i{display:block;height:100%;width:100%;background:#3FBF4F;border-radius:999px;transition:background .3s;}
/* word-nut bubbles / chips */
.fg-bubble{font-family:inherit;display:inline-flex;align-items:center;justify-content:center;gap:6px;background:rgba(255,255,255,.95);border:3px solid;border-radius:999px;padding:10px 16px;font-weight:700;font-size:clamp(15px,2.6vh,26px);color:#2b2f3a;cursor:pointer;box-shadow:0 5px 14px rgba(20,50,20,.3);min-height:46px;touch-action:manipulation;position:relative;white-space:nowrap;transition:transform .1s;}
.fg-bubble:hover:not(:disabled){transform:translate(-50%,-50%) scale(1.06);}
.fg-chips .fg-bubble:hover:not(:disabled){transform:scale(1.04);}
.fg-bubble:focus-visible{outline:4px solid #4CAF50;outline-offset:2px;}
.fg-bubble.is-no{animation:fg-shake .5s;background:#fdecec;}
.fg-bubble.is-taken{opacity:.25;transition:opacity .4s;}
.fg-x{position:absolute;right:-8px;top:-8px;width:24px;height:24px;border-radius:999px;background:#E5484D;color:#fff;font-size:14px;display:grid;place-items:center;}
/* portrait chips grid */
.fg-chips{flex:1;min-height:0;display:grid;grid-template-columns:1fr 1fr;gap:clamp(8px,2vw,14px);align-content:center;padding:10px 2px;}
.fg-chips .fg-bubble{width:100%;min-height:clamp(56px,9vh,86px);font-size:clamp(17px,4.6vw,26px);white-space:normal;line-height:1.1;}
/* toast */
.fg-toast{align-self:center;background:rgba(255,255,255,.95);border-radius:999px;padding:6px 16px;font-weight:700;font-size:clamp(13px,2.2vh,18px);margin-top:6px;box-shadow:0 4px 12px rgba(20,50,20,.25);flex-shrink:0;}
.fg-toast-abs{position:absolute;left:50%;bottom:4%;transform:translateX(-50%);margin:0;}
.fg-toast.is-good{color:#1fa888;}
.fg-toast.is-bad{color:#c53030;}
.fg-toast.is-ok{color:#587a58;}
/* ---------- intro card ---------- */
.fg-card{background:#F1FAEE;border:3px solid #c9e5c2;border-radius:22px;padding:16px;box-shadow:0 12px 30px rgba(40,90,40,.12);}
.fg-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px;}
.fg-cover-box{position:relative;width:100%;aspect-ratio:1376/768;border-radius:16px;overflow:hidden;border:3px solid #c9e5c2;}
.fg-cover-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;user-select:none;-webkit-user-drag:none;}
.fg-cover{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(30,70,40,.30);}
.fg-start{font-family:inherit;font-size:18px;font-weight:700;color:#fff;background:#2e8b57;border:none;border-radius:14px;padding:14px 26px;cursor:pointer;min-height:52px;box-shadow:0 6px 0 #1d5c39;transition:transform .08s;}
.fg-start:active{transform:translateY(3px);box-shadow:0 3px 0 #1d5c39;}
.fg-start:focus-visible{outline:3px solid #FFC233;outline-offset:3px;}
.fg-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}
/* ---------- results ---------- */
.fg-results{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:rgba(255,255,255,.88);border-radius:20px;margin:10px auto;padding:18px;max-width:520px;width:100%;overflow:auto;}
.fg-trophy{font-size:52px;animation:fg-pop .6s ease;}
.fg-res-title{font-size:clamp(24px,4.6vw,38px);font-weight:700;color:#2b2f3a;}
.fg-res-mood{font-weight:700;color:#587a58;margin-top:2px;}
.fg-standings{width:100%;max-width:340px;background:#fff;border:2px solid #c9e5c2;border-radius:16px;padding:10px 14px;margin:12px 0;}
.fg-standings-t{font-size:12px;font-weight:700;color:#587a58;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px;}
.fg-standrow{display:flex;align-items:center;gap:8px;padding:5px 4px;font-weight:700;font-size:15px;}
.fg-standrow.is-you{background:rgba(74,155,232,.16);border:2px solid rgba(74,155,232,.5);border-radius:10px;}
.fg-rank{width:20px;color:#587a58;}
.fg-standname{flex:1;text-align:left;}
.fg-standnuts{font-variant-numeric:tabular-nums;}
.fg-res-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.fg-home{display:inline-flex;align-items:center;gap:6px;font-family:inherit;font-size:16px;font-weight:700;color:#3d5478;background:#fff;border:3px solid #c9e5c2;border-radius:14px;padding:13px 22px;min-height:52px;text-decoration:none;}
.fg-home:focus-visible{outline:3px solid #4CAF50;outline-offset:3px;}
.fg-confetti{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
.fg-confetti span{position:absolute;top:26%;width:9px;height:14px;border-radius:2px;animation:fg-fall 1.1s ease-out forwards;}
@keyframes fg-fall{to{transform:translate(var(--dx),150px) rotate(360deg);opacity:0;}}
@keyframes fg-pop{0%{transform:scale(.3);opacity:0;}50%{transform:scale(1.15);opacity:1;}100%{transform:scale(1);}}
@keyframes fg-bounce{0%,100%{transform:none;}35%{transform:translateY(-6px) scale(1.08);}70%{transform:translateY(2px);}}
@keyframes fg-shake{0%,100%{transform:translate(-50%,-50%);}20%,60%{transform:translate(-56%,-50%);}40%,80%{transform:translate(-44%,-50%);}}
.fg-chips .fg-bubble.is-no{animation:fg-shake-flow .5s;}
@keyframes fg-shake-flow{0%,100%{transform:none;}20%,60%{transform:translateX(-6px);}40%,80%{transform:translateX(6px);}}
@media(prefers-reduced-motion:reduce){.fg-trophy,.fg-confetti span,.fg-bubble.is-no,.fg-nutpill.is-eating{animation:none!important;}}
`;
