"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * AnagramGame — a REAL crossword built from grade-1 words. On start the game
 * takes over the whole screen (mobile & desktop): the forest artwork becomes
 * a full-bleed background, the crossword fills the upper area as big stone
 * cells, and the active word's scrambled letters wait in a large tray at the
 * bottom. The child taps letters in order; each one flies into its grid cell
 * until the whole crossword is filled.
 *
 * Art: /games/anagram-arena.webp (used as a cover background).
 *
 * Uzbek letter-pairs sh, ch and the modifier-letter forms oʻ / gʻ are kept
 * together as ONE cell/tile, matching grade-1 Ona tili. Words containing the
 * "ng" pair are intentionally excluded from the banks.
 *
 * Contract: single default export · pure generatePuzzle(config) ·
 * props in / callbacks out · STRINGS uz/ru/en · a11y + reduced motion.
 *
 * Props: lang?, puzzles? (crosswords per game), wordsPerPuzzle?, username?,
 *        onAttempt?, onCorrect?, onWrong?, onNext?, onFinish?
 */

const ARENA = "/games/anagram-arena.webp";

/* ----------------------------- pure helpers ----------------------------- */

const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Grade-1 friendly word banks (3–6 cells, decent letter overlap, no "ng"). */
const WORDS = {
  uz: [
    "olma", "anor", "non", "nok", "ona", "ota", "osmon", "olti", "oltin",
    "bola", "lola", "atlas", "salom", "kitob", "tok", "tosh", "gul", "uzum",
    "suv", "sut", "soat", "olam", "maktab", "qalam", "vatan", "savat",
    "daftar", "bahor", "choy", "oʻrik", "gʻoz", "anhor"
  ],
  ru: [
    "мама", "дом", "кот", "ток", "сок", "оса", "сон", "нос", "лес", "лето",
    "село", "сила", "лиса", "мост", "стол", "слон", "окно", "нота", "лимон",
    "молоко", "сад", "рома", "море", "роса", "гора"
  ],
  en: [
    "cat", "sun", "star", "tree", "book", "moon", "nose", "stone", "note",
    "ten", "net", "sand", "rose", "nest", "tent", "salt", "lamp", "milk",
    "corn", "rain", "seed", "leaf"
  ]
};

/** Split a word into letter cells, keeping uz letter-pairs together (no ng). */
export function splitUnits(word, lang) {
  if (lang !== "uz") return Array.from(word);
  const units = [];
  let i = 0;
  while (i < word.length) {
    const two = word.slice(i, i + 2).toLowerCase();
    if (two === "oʻ" || two === "gʻ" || two === "o'" || two === "g'" ||
        two === "sh" || two === "ch") {
      units.push(word.slice(i, i + 2));
      i += 2;
    } else {
      units.push(word[i]);
      i += 1;
    }
  }
  return units;
}

const key = (r, c) => r + "," + c;

/** Try to place `w` (units) crossing the existing grid; returns placement or null. */
function tryPlace(units, grid) {
  const options = [];
  for (let i = 0; i < units.length; i++) {
    const u = units[i].toLowerCase();
    for (const [k, cell] of grid) {
      if (cell.u !== u) continue;
      const [cr, cc] = k.split(",").map(Number);
      for (const dir of shuffle(["h", "v"])) {
        if (cell.dirs.has(dir)) continue; // a word already runs this way here
        const r0 = dir === "h" ? cr : cr - i;
        const c0 = dir === "h" ? cc - i : cc;
        let ok = true;
        for (let j = 0; j < units.length && ok; j++) {
          const r = dir === "h" ? r0 : r0 + j;
          const c = dir === "h" ? c0 + j : c0;
          const existing = grid.get(key(r, c));
          if (existing) {
            // must be the intersection letter and not already in our direction
            if (existing.u !== units[j].toLowerCase() || existing.dirs.has(dir)) ok = false;
          } else {
            // side neighbours (perpendicular) must be empty for clean layout
            const n1 = dir === "h" ? key(r - 1, c) : key(r, c - 1);
            const n2 = dir === "h" ? key(r + 1, c) : key(r, c + 1);
            if (grid.has(n1) || grid.has(n2)) ok = false;
          }
        }
        // cells directly before and after the word must be empty
        const before = dir === "h" ? key(r0, c0 - 1) : key(r0 - 1, c0);
        const after = dir === "h" ? key(r0, c0 + units.length) : key(r0 + units.length, c0);
        if (grid.has(before) || grid.has(after)) ok = false;
        if (ok) options.push({ r0, c0, dir });
      }
    }
  }
  return options.length ? options[Math.floor(Math.random() * options.length)] : null;
}

/**
 * Build one crossword: `count` words from the bank placed across/down with
 * shared letters. Pure & self-retrying; returns { words, rows, cols } where
 * each word = { word, units, r, c, dir }.
 */
export function generatePuzzle({ lang = "uz", count = 4 } = {}) {
  const bank = [...new Set(WORDS[lang] || WORDS.uz)];
  let best = null;
  for (let attempt = 0; attempt < 40; attempt++) {
    const pool = shuffle(bank);
    const grid = new Map(); // "r,c" -> { u, dirs:Set }
    const placed = [];
    const put = (units, r0, c0, dir) => {
      for (let j = 0; j < units.length; j++) {
        const r = dir === "h" ? r0 : r0 + j;
        const c = dir === "h" ? c0 + j : c0;
        const k = key(r, c);
        const cell = grid.get(k) || { u: units[j].toLowerCase(), dirs: new Set() };
        cell.dirs.add(dir);
        grid.set(k, cell);
      }
      placed.push({ word: null, units, r: r0, c: c0, dir });
    };
    // first word horizontal at origin
    const first = pool[0];
    const fu = splitUnits(first, lang);
    put(fu, 0, 0, "h");
    placed[0].word = first;
    // keep the puzzle inside a compact box so cells can render big
    const MAX_COLS = 9, MAX_ROWS = 7;
    let bMinR = 0, bMaxR = 0, bMinC = 0, bMaxC = fu.length - 1;
    for (let p = 1; p < pool.length && placed.length < count; p++) {
      const w = pool[p];
      if (w === first) continue;
      const units = splitUnits(w, lang);
      const spot = tryPlace(units, grid);
      if (!spot) continue;
      const endR = spot.dir === "h" ? spot.r0 : spot.r0 + units.length - 1;
      const endC = spot.dir === "h" ? spot.c0 + units.length - 1 : spot.c0;
      const nMinR = Math.min(bMinR, spot.r0), nMaxR = Math.max(bMaxR, endR);
      const nMinC = Math.min(bMinC, spot.c0), nMaxC = Math.max(bMaxC, endC);
      if (nMaxR - nMinR + 1 > MAX_ROWS || nMaxC - nMinC + 1 > MAX_COLS) continue;
      put(units, spot.r0, spot.c0, spot.dir);
      placed[placed.length - 1].word = w;
      bMinR = nMinR; bMaxR = nMaxR; bMinC = nMinC; bMaxC = nMaxC;
    }
    if (!best || placed.length > best.placed.length) best = { placed, grid };
    if (placed.length >= count) break;
  }
  // normalise to a 0-based bounding box
  let minR = Infinity, minC = Infinity, maxR = -Infinity, maxC = -Infinity;
  for (const k of best.grid.keys()) {
    const [r, c] = k.split(",").map(Number);
    if (r < minR) minR = r; if (r > maxR) maxR = r;
    if (c < minC) minC = c; if (c > maxC) maxC = c;
  }
  const words = best.placed.map((w) => ({ ...w, r: w.r - minR, c: w.c - minC }));
  return { words, rows: maxR - minR + 1, cols: maxC - minC + 1 };
}

/** cells of one placed word */
const wordCells = (w) =>
  w.units.map((u, j) => ({
    u,
    r: w.dir === "h" ? w.r : w.r + j,
    c: w.dir === "h" ? w.c + j : w.c
  }));

/* ------------------------------- strings -------------------------------- */

const STRINGS = {
  uz: {
    title: "Anagramma oʻyini",
    subtitle: "Harflarni bosib, krossvordni toʻldir!",
    start: "Oʻyinni boshlash",
    exit: "Oʻyindan chiqish",
    soundOn: "Ovoz: yoniq",
    soundOff: "Ovoz: oʻchiq",
    question: "Krossvordni toʻldir!",
    puzzle: "Krossvord",
    words: "Soʻzlar",
    score: "Toʻgʻri",
    correct: "Barakalla!",
    wrong: "Hechqisi yoʻq, boshqa harfni sina!",
    wordDone: (w) => `Ajoyib! Soʻz topildi: ${w.toUpperCase()}`,
    puzzleDone: "Krossvord toʻldi! Barakalla!",
    tileAria: (u) => `Harf ${u}`,
    resTitle: "Oʻyin tugadi!",
    moodTop: "Ajoyib! Sen krossvord ustasisan!",
    moodMid: "Juda yaxshi!",
    moodLow: "Davom et — harflar mashq bilan doʻst boʻladi!",
    yourScore: "Natijang",
    replay: "Qaytadan oʻynash",
    back: "Orqaga"
  },
  ru: {
    title: "Игра «Анаграмма»",
    subtitle: "Нажимай буквы и заполни кроссворд!",
    start: "Начать игру",
    exit: "Выйти из игры",
    soundOn: "Звук: вкл",
    soundOff: "Звук: выкл",
    question: "Заполни кроссворд!",
    puzzle: "Кроссворд",
    words: "Слова",
    score: "Верно",
    correct: "Молодец!",
    wrong: "Ничего, попробуй другую букву!",
    wordDone: (w) => `Отлично! Слово найдено: ${w.toUpperCase()}`,
    puzzleDone: "Кроссворд заполнен! Молодец!",
    tileAria: (u) => `Буква ${u}`,
    resTitle: "Игра окончена!",
    moodTop: "Отлично! Ты мастер кроссвордов!",
    moodMid: "Очень хорошо!",
    moodLow: "Продолжай — с практикой буквы станут друзьями!",
    yourScore: "Твой счёт",
    replay: "Играть снова",
    back: "Назад"
  },
  en: {
    title: "Anagram Game",
    subtitle: "Tap the letters and fill the crossword!",
    start: "Start the game",
    exit: "Exit game",
    soundOn: "Sound: on",
    soundOff: "Sound: off",
    question: "Fill the crossword!",
    puzzle: "Crossword",
    words: "Words",
    score: "Correct",
    correct: "Well done!",
    wrong: "No worries, try another letter!",
    wordDone: (w) => `Great! You found: ${w.toUpperCase()}`,
    puzzleDone: "Crossword complete! Well done!",
    tileAria: (u) => `Letter ${u}`,
    resTitle: "Game finished!",
    moodTop: "Amazing! You are a crossword master!",
    moodMid: "Very good!",
    moodLow: "Keep going — letters become friends with practice!",
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
    tile: () => { ensure(); blip(660, 0, .09, "triangle", .26, 880); },
    correct: () => { ensure(); [523, 659, 784].forEach((f, i) => blip(f, i * .085, .16, "triangle", .34)); },
    wrong: () => { ensure(); blip(220, 0, .22, "sine", .26, 150); },
    beep: () => { ensure(); blip(880, 0, .1, "square", .18); },
    win: () => { ensure(); [523, 659, 784, 1047, 1319].forEach((f, i) => blip(f, i * .11, .32, "triangle", .4)); }
  };
}

/* ----------------------------- the component ---------------------------- */

export default function AnagramGame({
  lang = "uz",
  puzzles = 2,
  wordsPerPuzzle = 4,
  username = "",
  debug = false,
  onAttempt, onCorrect, onWrong, onNext, onFinish
}) {
  const S = STRINGS[lang] || STRINGS.uz;

  const [phase, setPhase] = useState("intro"); // intro | playing | finished
  const [puzzle, setPuzzle] = useState(null);
  const [puzzleNo, setPuzzleNo] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);   // index into puzzle.words
  const [progress, setProgress] = useState(0);     // letters entered of active word
  const [solved, setSolved] = useState([]);        // solved word indexes
  const [tray, setTray] = useState([]);            // [{u, id, used}] scrambled
  const [wrongTile, setWrongTile] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [muted, setMuted] = useState(false);
  const [results, setResults] = useState(null);
  const [confetti, setConfetti] = useState(0);
  const [box, setBox] = useState({ w: 0, h: 0 }); // measured crossword area

  const rootRef = useRef(null);
  const gridAreaRef = useRef(null);
  const audioRef = useRef(null);
  const reducedRef = useRef(false);
  const firstTryRef = useRef(true);
  const lockRef = useRef(false);
  const totalWordsRef = useRef(0);
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

  // lock page scroll while the full-screen game is up
  useEffect(() => {
    if (phase === "intro") return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [phase]);

  useEffect(() => () => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  }, []);

  // measure the crossword area so cells render as big as possible
  useEffect(() => {
    if (phase !== "playing") return;
    const el = gridAreaRef.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [phase, puzzle]);

  const enterFs = useCallback(() => {
    rootRef.current?.requestFullscreen?.({ navigationUI: "hide" }).catch(() => {});
  }, []);
  const exitFs = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  }, []);

  /** point the tray at word `idx` of `p` */
  const armWord = useCallback((p, idx) => {
    setActiveIdx(idx);
    setProgress(0);
    let t = shuffle(p.words[idx].units.map((u) => ({ u })));
    // ensure the scramble differs from the solution when possible
    let guard = 0;
    while (t.length > 1 && t.every((x, i) => x.u === p.words[idx].units[i]) && guard++ < 10) {
      t = shuffle(t);
    }
    setTray(t.map((x, i) => ({ ...x, id: i, used: false })));
    firstTryRef.current = true;
    setWrongTile(null);
  }, []);

  const nextPuzzle = useCallback((no) => {
    const p = generatePuzzle({ lang, count: wordsPerPuzzle });
    totalWordsRef.current += p.words.length;
    setPuzzle(p);
    setPuzzleNo(no);
    setSolved([]);
    setFeedback(null);
    lockRef.current = false;
    armWord(p, 0);
    audioRef.current.beep();
    onNext?.();
  }, [lang, wordsPerPuzzle, armWord, onNext]);

  const start = useCallback(async () => {
    enterFs();
    await audioRef.current.resume();
    audioRef.current.setMuted(muted);
    setScore(0); setResults(null); setConfetti(0);
    totalWordsRef.current = 0;
    setPhase("playing");
    nextPuzzle(1);
  }, [enterFs, muted, nextPuzzle]);

  const finish = useCallback((finalScore) => {
    audioRef.current.win();
    if (!reducedRef.current) setConfetti((c) => c + 1);
    setResults({ score: finalScore, total: totalWordsRef.current });
    setPhase("finished");
    onFinish?.(finalScore, { score: finalScore, total: totalWordsRef.current });
  }, [onFinish]);

  /** Tap a tray tile. Only the next letter of the active word is accepted. */
  const pick = useCallback((tid) => {
    if (phase !== "playing" || !puzzle || lockRef.current) return;
    const tile = tray.find((x) => x.id === tid);
    if (!tile || tile.used) return;
    const w = puzzle.words[activeIdx];
    const ok = tile.u.toLowerCase() === w.units[progress].toLowerCase();
    onAttempt?.(ok, { word: w.word, tile: tile.u, slot: progress });
    if (!ok) {
      firstTryRef.current = false;
      setWrongTile(tid); setFeedback("wrong");
      audioRef.current.wrong();
      onWrong?.();
      setTimeout(() => {
        setWrongTile((x) => (x === tid ? null : x));
        setFeedback((f) => (f === "wrong" ? null : f));
      }, 1100);
      return;
    }
    const newProgress = progress + 1;
    setTray((t) => t.map((x) => (x.id === tid ? { ...x, used: true } : x)));
    setProgress(newProgress);
    setWrongTile(null);
    if (newProgress < w.units.length) {
      audioRef.current.tile();
      return;
    }
    // word complete
    lockRef.current = true;
    const gained = firstTryRef.current ? 1 : 0;
    const newScore = score + gained;
    setScore(newScore);
    const newSolved = [...solved, activeIdx];
    setSolved(newSolved);
    audioRef.current.correct();
    onCorrect?.();
    if (!reducedRef.current) setConfetti((c) => c + 1);
    const remaining = puzzle.words.map((_, i) => i).filter((i) => !newSolved.includes(i));
    if (remaining.length > 0) {
      setFeedback("word");
      setTimeout(() => {
        setFeedback(null);
        lockRef.current = false;
        armWord(puzzle, remaining[0]);
        audioRef.current.tile();
      }, 1100);
    } else {
      setFeedback("puzzle");
      setTimeout(() => {
        if (puzzleNo >= puzzles) finish(newScore);
        else { setFeedback(null); nextPuzzle(puzzleNo + 1); }
      }, 1600);
    }
  }, [phase, puzzle, tray, activeIdx, progress, score, solved, puzzleNo, puzzles,
      onAttempt, onCorrect, onWrong, armWord, nextPuzzle, finish]);

  const quitGame = useCallback(() => {
    setPhase("intro"); setPuzzle(null); setResults(null);
    exitFs();
  }, [exitFs]);

  /* ------- derived render data: the crossword grid ------- */
  let cells = null, cellPx = 0, gapPx = 0;
  if (puzzle) {
    const map = new Map(); // "r,c" -> { u, show, active, next }
    const active = puzzle.words[activeIdx];
    for (let i = 0; i < puzzle.words.length; i++) {
      const w = puzzle.words[i];
      const isSolved = solved.includes(i);
      wordCells(w).forEach((cell) => {
        const k = key(cell.r, cell.c);
        const prev = map.get(k) || { u: cell.u, show: false, active: false, next: false };
        if (isSolved) prev.show = true;
        map.set(k, prev);
      });
    }
    if (!solved.includes(activeIdx)) {
      wordCells(active).forEach((cell, j) => {
        const k = key(cell.r, cell.c);
        const prev = map.get(k);
        prev.active = true;
        if (j < progress) prev.show = true;
        if (j === progress) prev.next = true;
      });
    }
    cells = map;
    // biggest cells that fit the measured area (gap = 12% of a cell)
    if (box.w > 0 && box.h > 0) {
      const gapR = 0.12;
      const fitW = box.w * 0.96 / (puzzle.cols + (puzzle.cols - 1) * gapR);
      const fitH = box.h * 0.96 / (puzzle.rows + (puzzle.rows - 1) * gapR);
      cellPx = Math.max(20, Math.floor(Math.min(fitW, fitH, 96)));
      gapPx = Math.round(cellPx * gapR);
    }
  }

  const mood = results
    ? (results.score >= results.total - 1 ? S.moodTop
      : results.score >= Math.ceil(results.total * 0.6) ? S.moodMid : S.moodLow)
    : "";
  const activeWord = puzzle ? puzzle.words[activeIdx] : null;
  const liveText =
    feedback === "puzzle" ? S.puzzleDone
    : feedback === "word" && activeWord ? S.wordDone(activeWord.word)
    : feedback === "wrong" ? S.wrong : S.question;

  /* --------------------------- intro (card view) --------------------------- */
  if (phase === "intro") {
    return (
      <div ref={rootRef} className="ag-root" style={{ fontFamily: FONT }}>
        <style>{css}</style>
        <div className="ag-card">
          <div className="ag-head">
            <div>
              <div className="ag-title">{S.title}</div>
              <div className="ag-sub">{S.subtitle}</div>
            </div>
            <button className="ag-mute" aria-pressed={muted}
              onClick={() => { const m = !muted; setMuted(m); audioRef.current.setMuted(m); }}>
              {muted ? "🔇 " + S.soundOff : "🔊 " + S.soundOn}
            </button>
          </div>
          <div className="ag-cover-box">
            <img className="ag-cover-img" src={ARENA} alt="" draggable="false" />
            <div className="ag-cover">
              <button className="ag-start" onClick={start}>{S.start}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* --------------------- playing / finished (full screen) --------------------- */
  return (
    <div ref={rootRef} className="ag-root ag-full" style={{ fontFamily: FONT }}>
      <style>{css}</style>
      <img className="ag-bg" src={ARENA} alt="" draggable="false" />
      <div className="ag-scrim" aria-hidden="true" />

      {/* top bar */}
      <div className="ag-top">
        <div className="ag-title ag-title-sm">{S.title}</div>
        {phase === "playing" && puzzle && (
          <div className="ag-hud" aria-hidden="true">
            <span className="ag-pill">{S.puzzle}: <b>{puzzleNo}/{puzzles}</b></span>
            <span className="ag-pill">{S.words}: <b>{solved.length}/{puzzle.words.length}</b></span>
            <span className="ag-pill">{S.score}: <b>{score}</b></span>
          </div>
        )}
        <div className="ag-headbtns">
          <button className="ag-mute" aria-pressed={muted}
            onClick={() => { const m = !muted; setMuted(m); audioRef.current.setMuted(m); }}>
            {muted ? "🔇" : "🔊"}
          </button>
          <button className="ag-exit" onClick={quitGame} aria-label={S.exit} title={S.exit}>✕</button>
        </div>
      </div>

      {phase === "finished" && results ? (
        <div className="ag-results">
          <div className="ag-trophy" aria-hidden>🏆</div>
          <div className="ag-res-title">{S.resTitle}</div>
          <div className="ag-res-mood">{mood}</div>
          <div className="ag-scorecard">
            <span className="ag-scorecard-l">{S.yourScore}</span>
            <span className="ag-scorecard-v">{results.score}/{results.total}</span>
          </div>
          <div className="ag-res-btns">
            <button className="ag-start" onClick={start}>🔁 {S.replay}</button>
            <a className="ag-home" href="/dashboard/g1-ona" onClick={exitFs}>← {S.back}</a>
          </div>
          {confetti > 0 && !reducedRef.current && <Confetti key={confetti} />}
        </div>
      ) : (
        <>
          <div className="ag-question">
            {feedback === "wrong" ? "✕ " + S.wrong
              : feedback === "word" && activeWord ? "✓ " + S.wordDone(activeWord.word)
              : feedback === "puzzle" ? "✓ " + S.puzzleDone
              : S.question}
          </div>

          {/* the crossword — fills all free space */}
          <div className="ag-gridarea" ref={gridAreaRef}>
            {puzzle && cells && cellPx > 0 && (
              <div className="ag-panel" role="group" aria-label={S.question}>
                <div
                  className="ag-grid"
                  style={{
                    gridTemplateColumns: `repeat(${puzzle.cols}, ${cellPx}px)`,
                    gridAutoRows: `${cellPx}px`,
                    gap: `${gapPx}px`
                  }}
                >
                  {Array.from({ length: puzzle.rows * puzzle.cols }).map((_, n) => {
                    const r = Math.floor(n / puzzle.cols);
                    const c = n % puzzle.cols;
                    const cell = cells.get(key(r, c));
                    if (!cell) return <span key={n} className="ag-void" />;
                    return (
                      <span
                        key={n}
                        className={"ag-cell"
                          + (cell.show ? " is-filled" : "")
                          + (cell.active ? " is-active" : "")
                          + (cell.next ? " is-next" : "")}
                        style={{ fontSize: Math.round(cellPx * 0.52) + "px" }}
                      >
                        {cell.show ? cell.u.toUpperCase() : ""}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* big letter tray at the bottom */}
          <div className="ag-tray" role="group">
            {puzzle && activeWord && !solved.includes(activeIdx) && tray.map((tile) => (
              <button
                key={tile.id}
                className={"ag-tile"
                  + (tile.used ? " is-used" : "")
                  + (wrongTile === tile.id ? " is-no" : "")}
                onClick={() => pick(tile.id)}
                disabled={tile.used || lockRef.current}
                aria-label={S.tileAria(tile.u)}
              >
                {tile.u.toUpperCase()}
              </button>
            ))}
          </div>
          {confetti > 0 && !reducedRef.current && <Confetti key={confetti} />}
        </>
      )}

      <div className="ag-sr" aria-live="polite">{liveText}</div>
    </div>
  );
}

/* ----------------------------- confetti --------------------------------- */
function Confetti() {
  const colors = ["#3FBF4F", "#2BB6D6", "#7C5CFC", "#FF6B5C", "#FFC233"];
  return (
    <div className="ag-confetti" aria-hidden="true">
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
.ag-root{max-width:760px;margin:0 auto;color:#2b2f3a;}
/* ---------- full-screen game (playing / finished) ---------- */
.ag-full{position:fixed;inset:0;z-index:2147483000;max-width:none;margin:0;display:flex;flex-direction:column;overflow:hidden;padding:max(8px,env(safe-area-inset-top)) 10px calc(10px + env(safe-area-inset-bottom));}
.ag-bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;user-select:none;-webkit-user-drag:none;z-index:-2;}
.ag-scrim{position:absolute;inset:0;background:linear-gradient(rgba(255,255,255,.16),rgba(20,50,20,.14));z-index:-1;}
.ag-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
.ag-title{font-size:24px;font-weight:700;color:#2e8b3a;line-height:1.1;}
.ag-title-sm{font-size:16px;color:#1d5c26;background:rgba(255,255,255,.82);border-radius:999px;padding:6px 12px;}
.ag-sub{font-size:13px;color:#5e7a58;margin-top:2px;}
.ag-headbtns{display:flex;gap:8px;align-items:center;margin-left:auto;}
.ag-hud{display:flex;gap:6px;flex-wrap:wrap;}
.ag-pill{background:rgba(255,255,255,.85);border:2px solid rgba(255,255,255,.9);border-radius:999px;padding:4px 10px;font-size:12.5px;color:#456b42;}
.ag-pill b{color:#2b2f3a;}
.ag-mute{font-family:inherit;font-size:14px;font-weight:600;border:2px solid rgba(255,255,255,.9);background:rgba(255,255,255,.85);border-radius:999px;padding:7px 12px;cursor:pointer;min-height:40px;color:#456b42;}
.ag-mute:focus-visible,.ag-exit:focus-visible{outline:3px solid #4CAF50;outline-offset:2px;}
.ag-exit{font-family:inherit;font-size:16px;font-weight:700;border:2px solid rgba(255,255,255,.9);background:rgba(255,255,255,.85);color:#456b42;border-radius:999px;width:42px;height:42px;min-height:42px;cursor:pointer;line-height:1;}
.ag-question{text-align:center;font-size:clamp(15px,2.6vh,24px);font-weight:700;color:#1d3a1d;background:rgba(255,255,255,.78);border-radius:999px;padding:5px 16px;margin:8px auto 4px;max-width:96%;}
/* crossword area — takes every spare pixel */
.ag-gridarea{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;}
.ag-panel{background:rgba(215,238,255,.6);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);border:2px solid rgba(255,255,255,.75);border-radius:16px;padding:clamp(8px,1.6vh,16px);box-shadow:0 8px 24px rgba(30,60,110,.2);}
.ag-grid{display:grid;}
.ag-void{width:100%;height:100%;}
.ag-cell{display:grid;place-items:center;border-radius:16%;font-weight:700;color:#4a463c;border:2px dashed rgba(255,255,255,.95);background:rgba(255,255,255,.3);}
.ag-cell.is-active{border-style:solid;border-color:#FFC233;box-shadow:0 0 10px rgba(255,194,51,.65);}
.ag-cell.is-next{animation:ag-pulse 1.1s ease-in-out infinite;}
.ag-cell.is-filled{border-style:solid;border-color:#b7b2a6;background:linear-gradient(160deg,#f6f3ea 0%,#dedbd0 55%,#c9c5b8 100%);box-shadow:0 3px 0 #a8a294,0 5px 10px rgba(40,60,30,.22);animation:ag-drop .25s ease;}
/* big letter tray at the bottom */
.ag-tray{display:flex;flex-wrap:wrap;gap:clamp(8px,1.6vw,14px);justify-content:center;align-items:center;padding:10px 4px 4px;min-height:clamp(64px,12vh,110px);}
.ag-tile{font-family:inherit;width:clamp(52px,13.5vw,86px);height:clamp(52px,13.5vw,86px);border-radius:18%;border:2px solid #b7b2a6;cursor:pointer;font-weight:700;font-size:clamp(24px,6vw,42px);color:#4a463c;background:linear-gradient(160deg,#f6f3ea 0%,#dedbd0 55%,#c9c5b8 100%);box-shadow:0 5px 0 #a8a294,0 10px 16px rgba(40,60,30,.32);transition:transform .1s;touch-action:manipulation;}
.ag-tile:hover:not(:disabled){transform:translateY(-3px);}
.ag-tile:active:not(:disabled){transform:translateY(2px);box-shadow:0 2px 0 #a8a294;}
.ag-tile:focus-visible{outline:4px solid #4CAF50;outline-offset:2px;}
.ag-tile.is-used{opacity:0;pointer-events:none;transform:scale(.3);transition:all .28s ease;}
.ag-tile.is-no{animation:ag-shake .5s;background:linear-gradient(160deg,#f7d9d9,#e5b5b5);border-color:#d98a8a;}
/* ---------- intro card ---------- */
.ag-card{background:#F3FAEF;border:3px solid #cfe8c6;border-radius:22px;padding:16px;box-shadow:0 12px 30px rgba(40,90,40,.12);}
.ag-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px;}
.ag-cover-box{position:relative;width:100%;aspect-ratio:1376/768;border-radius:16px;overflow:hidden;border:3px solid #cfe8c6;}
.ag-cover-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;user-select:none;-webkit-user-drag:none;}
.ag-cover{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(30,70,30,.30);}
.ag-start{font-family:inherit;font-size:18px;font-weight:700;color:#fff;background:#2e8b3a;border:none;border-radius:14px;padding:14px 26px;cursor:pointer;min-height:52px;box-shadow:0 6px 0 #1d5c26;transition:transform .08s;}
.ag-start:active{transform:translateY(3px);box-shadow:0 3px 0 #1d5c26;}
.ag-start:focus-visible{outline:3px solid #FFC233;outline-offset:3px;}
.ag-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}
/* ---------- results ---------- */
.ag-results{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:rgba(255,255,255,.82);border-radius:20px;margin:10px auto;padding:20px;max-width:520px;width:100%;}
.ag-trophy{font-size:56px;animation:ag-pop .6s ease;}
.ag-res-title{font-size:clamp(26px,5vw,40px);font-weight:700;color:#2b2f3a;}
.ag-res-mood{font-weight:700;color:#5e7a58;margin-top:2px;}
.ag-scorecard{display:inline-flex;align-items:baseline;gap:10px;background:#fff;border:2px solid #cfe8c6;border-radius:20px;padding:12px 26px;margin:14px 0;box-shadow:0 6px 16px rgba(40,90,40,.1);}
.ag-scorecard-l{font-size:13px;font-weight:700;color:#5e7a58;}
.ag-scorecard-v{font-size:34px;font-weight:700;color:#FF8A00;}
.ag-res-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.ag-home{display:inline-flex;align-items:center;gap:6px;font-family:inherit;font-size:16px;font-weight:700;color:#3d5478;background:#fff;border:3px solid #cfe8c6;border-radius:14px;padding:13px 22px;min-height:52px;text-decoration:none;}
.ag-home:focus-visible{outline:3px solid #4CAF50;outline-offset:3px;}
.ag-confetti{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
.ag-confetti span{position:absolute;top:26%;width:9px;height:14px;border-radius:2px;animation:ag-fall 1.1s ease-out forwards;}
@keyframes ag-fall{to{transform:translate(var(--dx),150px) rotate(360deg);opacity:0;}}
@keyframes ag-pop{0%{transform:scale(.3);opacity:0;}50%{transform:scale(1.15);opacity:1;}100%{transform:scale(1);}}
@keyframes ag-drop{0%{transform:translateY(-14px);opacity:.4;}100%{transform:translateY(0);opacity:1;}}
@keyframes ag-pulse{0%,100%{box-shadow:0 0 6px rgba(255,194,51,.5);}50%{box-shadow:0 0 16px rgba(255,194,51,.95);}}
@keyframes ag-shake{0%,100%{transform:none;}20%,60%{transform:translateX(-6px);}40%,80%{transform:translateX(6px);}}
@media(prefers-reduced-motion:reduce){.ag-trophy,.ag-confetti span,.ag-tile.is-no,.ag-cell.is-next{animation:none!important;}}
`;
