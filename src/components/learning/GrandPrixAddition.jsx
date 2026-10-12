"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { CAR_SPRITE } from "./carSprite";

/**
 * GrandPrixAddition — "race to the answer" addition drill on a real closed
 * circuit: the racing_track illustration with a traced centreline path.
 *
 * Contract (platform interactive-learning-components skill):
 *   - single default export · pure generateProblem(config) · props in / callbacks out
 *   - copy centralised in STRINGS (uz default, ru/en included) · a11y + reduced motion
 *   - gentle wrong feedback · celebration on wins
 *
 * v2 changes:
 *   - starts FULL SCREEN (native API + CSS overlay fallback; mobile friendly)
 *   - player name comes from the app user (username prop) — no typing
 *   - canvas road replaced by /games/race-track.webp + traced closed loop
 *   - finish shows a quiz-completion-style result screen
 *
 * Props: problems?, difficulty?, lang?, total?, username?,
 *        onAttempt?, onCorrect?, onWrong?, onNext?, onFinish?
 */

/* ------------------------- track (closed circuit) ------------------------ */
// Centreline traced from public/games/race-track.webp (see scripts/process-game-art.py).
// 96 normalized [x,y] points, clockwise, index 0 on the top straight.
const TRACK = [
  [0.4764,0.3505],[0.4904,0.3430],[0.5050,0.3379],[0.5199,0.3354],[0.5349,0.3355],[0.5498,0.3389],
  [0.5642,0.3445],[0.5775,0.3534],[0.5895,0.3648],[0.6000,0.3803],[0.6101,0.3973],[0.6193,0.4168],
  [0.6300,0.4342],[0.6414,0.4496],[0.6537,0.4632],[0.6667,0.4748],[0.6795,0.4864],[0.6925,0.4973],
  [0.7056,0.5055],[0.7195,0.5105],[0.7332,0.5157],[0.7451,0.5253],[0.7553,0.5409],[0.7635,0.5615],
  [0.7706,0.5835],[0.7768,0.6063],[0.7795,0.6304],[0.7781,0.6546],[0.7723,0.6769],[0.7626,0.6965],
  [0.7509,0.7131],[0.7385,0.7273],[0.7255,0.7390],[0.7120,0.7486],[0.6979,0.7557],[0.6833,0.7601],
  [0.6683,0.7625],[0.6533,0.7634],[0.6383,0.7624],[0.6235,0.7598],[0.6094,0.7530],[0.5961,0.7440],
  [0.5830,0.7334],[0.5700,0.7225],[0.5566,0.7126],[0.5432,0.7027],[0.5293,0.6946],[0.5149,0.6889],
  [0.5000,0.6858],[0.4847,0.6849],[0.4695,0.6858],[0.4545,0.6891],[0.4400,0.6945],[0.4259,0.7015],
  [0.4124,0.7112],[0.3992,0.7219],[0.3858,0.7323],[0.3726,0.7428],[0.3589,0.7518],[0.3452,0.7604],
  [0.3310,0.7671],[0.3162,0.7714],[0.3011,0.7734],[0.2858,0.7735],[0.2706,0.7716],[0.2558,0.7673],
  [0.2416,0.7607],[0.2280,0.7518],[0.2157,0.7393],[0.2060,0.7222],[0.2000,0.7016],[0.1988,0.6772],
  [0.2016,0.6540],[0.2085,0.6324],[0.2182,0.6140],[0.2298,0.5984],[0.2419,0.5846],[0.2540,0.5710],
  [0.2664,0.5586],[0.2795,0.5487],[0.2938,0.5438],[0.3085,0.5436],[0.3231,0.5440],[0.3369,0.5415],
  [0.3506,0.5364],[0.3644,0.5290],[0.3779,0.5206],[0.3912,0.5116],[0.4031,0.4984],[0.4139,0.4825],
  [0.4229,0.4626],[0.4305,0.4408],[0.4368,0.4173],[0.4434,0.3950],[0.4522,0.3760],[0.4631,0.3609]
];
const TRACK_IMG = "/games/race-track.webp";
const IMG_W = 1376, IMG_H = 768;
// Visible crop of the illustration (trims the empty margins around the island)
const CROP = { x: 90, y: 84, w: 1200, h: 640 };
const ROAD_HALF = 24; // road half-width in illustration pixels

// Pre-sampled arc-length table for constant-speed motion around the loop.
const PATH = (() => {
  const px = TRACK.map(([x, y]) => [x * IMG_W, y * IMG_H]);
  const n = px.length;
  const seg = [];
  let total = 0;
  for (let i = 0; i < n; i++) {
    const [x0, y0] = px[i];
    const [x1, y1] = px[(i + 1) % n];
    const len = Math.hypot(x1 - x0, y1 - y0);
    seg.push(total);
    total += len;
  }
  return { px, seg, total, n };
})();

/** Point on the circuit at progress p ∈ [0,1) → {x,y,ang} in illustration px. */
function trackAt(p) {
  const t = ((p % 1) + 1) % 1 * PATH.total;
  let lo = 0, hi = PATH.n - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (PATH.seg[mid] <= t) lo = mid; else hi = mid - 1;
  }
  const i = lo, j = (lo + 1) % PATH.n;
  const [x0, y0] = PATH.px[i];
  const [x1, y1] = PATH.px[j];
  const segLen = Math.hypot(x1 - x0, y1 - y0) || 1;
  const f = (t - PATH.seg[i]) / segLen;
  return {
    x: x0 + (x1 - x0) * f,
    y: y0 + (y1 - y0) * f,
    ang: Math.atan2(y1 - y0, x1 - x0)
  };
}

/* ----------------------------- pure helpers ----------------------------- */

const randInt = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const RANGES = { easy: [1, 9], medium: [5, 20], hard: [10, 50] };

export function generateProblem({ difficulty = "easy" } = {}) {
  const [lo, hi] = RANGES[difficulty] || RANGES.easy;
  const a = randInt(lo, hi);
  const b = randInt(lo, hi);
  return { a, b, answer: a + b };
}

function makeOptions(answer) {
  const set = new Set([answer]);
  while (set.size < 4) {
    const v = answer + randInt(1, 6) * (Math.random() < 0.5 ? -1 : 1);
    if (v > 0) set.add(v);
  }
  return shuffle([...set]);
}

/* ------------------------------- strings -------------------------------- */

const STRINGS = {
  uz: {
    title: "Qo‘shish Gran Prisi",
    subtitle: "To‘g‘ri javob ber — mashinang oldinga uchadi!",
    racer: "O‘yinchi",
    rivals: "Raqiblaring",
    start: "Poygani boshlash",
    soundOn: "Ovoz: yoniq",
    soundOff: "Ovoz: o‘chiq",
    exit: "O‘yindan chiqish",
    go: "MARSH!",
    question: "Qancha bo‘ladi?",
    correct: "Barakalla!",
    wrong: "Hechqisi yo‘q, yana ko‘r!",
    hint: (a, b) => `Maslahat: ${a} dan boshlab ${b} marta oldinga sana.`,
    guest: "Mehmon",
    place: "O‘rin",
    time: "Vaqt",
    score: "To‘g‘ri",
    sprint: "Marraga uchamiz!",
    replay: "Qaytadan o‘ynash",
    back: "Orqaga",
    resTitle: "Poyga tugadi!",
    moodTop: "Ajoyib natija!",
    moodMid: "Juda yaxshi!",
    moodLow: "Davom et, keyingi safar tezroq!",
    yourScore: "Natijang",
    win: "G‘olib bo‘lding! 🏆",
    youFinished: (n) => `${n}-o‘rinni egalladingiz!`,
    finishLine: "MARRA",
    sec: "s",
    aiNames: ["Chaqmoq", "Shamol", "Olov"]
  },
  ru: {
    title: "Гран-при сложения",
    subtitle: "Отвечай верно — и твоя машина мчится вперёд!",
    racer: "Игрок",
    rivals: "Соперники",
    start: "Начать гонку",
    soundOn: "Звук: вкл",
    soundOff: "Звук: выкл",
    exit: "Выйти из игры",
    go: "МАРШ!",
    question: "Сколько будет?",
    correct: "Молодец!",
    wrong: "Ничего страшного, попробуй ещё!",
    hint: (a, b) => `Подсказка: начни с ${a} и отсчитай ${b} вперёд.`,
    guest: "Гость",
    place: "Место",
    time: "Время",
    score: "Верно",
    sprint: "Летим к финишу!",
    replay: "Играть снова",
    back: "Назад",
    resTitle: "Гонка окончена!",
    moodTop: "Отличный результат!",
    moodMid: "Очень хорошо!",
    moodLow: "Продолжай — в следующий раз быстрее!",
    yourScore: "Твой счёт",
    win: "Ты победил! 🏆",
    youFinished: (n) => `Ты занял ${n}-е место!`,
    finishLine: "ФИНИШ",
    sec: "с",
    aiNames: ["Молния", "Ветер", "Огонь"]
  },
  en: {
    title: "Addition Grand Prix",
    subtitle: "Answer right — your car speeds ahead!",
    racer: "Player",
    rivals: "Your rivals",
    start: "Start the race",
    soundOn: "Sound: on",
    soundOff: "Sound: off",
    exit: "Exit game",
    go: "GO!",
    question: "How much is",
    correct: "Well done!",
    wrong: "No worries, try again!",
    hint: (a, b) => `Hint: start at ${a} and count ${b} forward.`,
    guest: "Guest",
    place: "Place",
    time: "Time",
    score: "Correct",
    sprint: "Sprinting to the finish!",
    replay: "Play again",
    back: "Back",
    resTitle: "Race finished!",
    moodTop: "Amazing result!",
    moodMid: "Very good!",
    moodLow: "Keep going — faster next time!",
    yourScore: "Your score",
    win: "You won! 🏆",
    youFinished: (n) => `You finished ${n}${n === 2 ? "nd" : n === 3 ? "rd" : "th"}!`,
    finishLine: "FINISH",
    sec: "s",
    aiNames: ["Bolt", "Wind", "Blaze"]
  }
};

/* per-racer look: hue rotation for the sprite + a matching chip colour */
const RACER_STYLE = [
  { hue: 0, chip: "#3FBF4F" }, // player — original green/blue
  { hue: 135, chip: "#2BB6D6" },
  { hue: 215, chip: "#7C5CFC" },
  { hue: 310, chip: "#FF6B5C" }
];
const FONT = "'Fredoka', 'Baloo 2', system-ui, sans-serif";

/* ------------------------------ audio engine ---------------------------- */

function createAudio() {
  let ctx = null, master = null, engine = null, muted = false;
  const ensure = () => {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.9;
      master.connect(ctx.destination);
    }
    return ctx;
  };
  const resume = async () => { ensure(); if (ctx.state === "suspended") await ctx.resume(); };
  const setMuted = (m) => { muted = m; if (master) master.gain.value = m ? 0 : 0.9; };
  const blip = (freq, start, dur, type = "triangle", vol = 0.3, toFreq = null) => {
    if (!ctx || muted) return;
    const t0 = ctx.currentTime + start;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t0);
    if (toFreq) o.frequency.exponentialRampToValueAtTime(toFreq, t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0 + dur + 0.03);
  };
  const correct = () => { ensure(); [523.25, 659.25, 783.99].forEach((f, i) => blip(f, i * 0.085, 0.16, "triangle", 0.34)); };
  const wrong = () => { ensure(); blip(220, 0, 0.22, "sine", 0.26, 150); };
  const finish = () => { ensure(); [523, 659, 784, 1047, 1319].forEach((f, i) => blip(f, i * 0.11, 0.32, "triangle", 0.4)); };
  const count = () => { ensure(); blip(440, 0, 0.14, "square", 0.28); };
  const go = () => { ensure(); blip(880, 0, 0.42, "square", 0.4); };
  const engineStart = () => {
    ensure(); if (engine) return;
    const o1 = ctx.createOscillator(), o2 = ctx.createOscillator();
    o1.type = "sawtooth"; o2.type = "square"; o2.detune.value = -14;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 800;
    const g = ctx.createGain(); g.gain.value = 0.0001;
    o1.frequency.value = 70; o2.frequency.value = 70;
    o1.connect(lp); o2.connect(lp); lp.connect(g); g.connect(master);
    o1.start(); o2.start();
    g.gain.linearRampToValueAtTime(0.055, ctx.currentTime + 0.3);
    engine = { o1, o2, g, lp };
  };
  const engineSpeed = (v) => {
    if (!engine || !ctx) return;
    const x = clamp(v, 0, 1), f = 70 + x * 260;
    engine.o1.frequency.setTargetAtTime(f, ctx.currentTime, 0.07);
    engine.o2.frequency.setTargetAtTime(f, ctx.currentTime, 0.07);
    engine.lp.frequency.setTargetAtTime(700 + x * 1700, ctx.currentTime, 0.1);
  };
  const engineStop = () => {
    if (!engine || !ctx) return;
    const e = engine; engine = null;
    e.g.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.18);
    e.o1.stop(ctx.currentTime + 0.7); e.o2.stop(ctx.currentTime + 0.7);
  };
  return { resume, setMuted, correct, wrong, finish, count, go, engineStart, engineSpeed, engineStop };
}

/* ----------------------------- the component ---------------------------- */

export default function GrandPrixAddition({
  problems = null,
  difficulty = "easy",
  lang = "uz",
  total = 8,
  username: usernameProp = "",
  debug = false,
  onAttempt, onCorrect, onWrong, onNext, onFinish
}) {
  const S = STRINGS[lang] || STRINGS.uz;

  const [phase, setPhase] = useState("intro"); // intro | countdown | racing | finished
  const [countdown, setCountdown] = useState(null);
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [wrongSet, setWrongSet] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [sprinting, setSprinting] = useState(false);
  const [hud, setHud] = useState({ time: 0, place: 1, score: 0 });
  const [results, setResults] = useState(null);
  const [muted, setMuted] = useState(false);
  const [confetti, setConfetti] = useState(0);
  const [fs, setFs] = useState(false);
  const [thumbs, setThumbs] = useState([]);
  const [events, setEvents] = useState([]);

  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const roRef = useRef(null);
  const sizeRef = useRef({ w: 800, h: 380 });
  const audioRef = useRef(null);
  const raceRef = useRef(null);
  const rafRef = useRef(0);
  const lastTRef = useRef(0);
  const phaseRef = useRef("intro");
  const fsRef = useRef(false);
  const scoreRef = useRef(0);
  const qIndexRef = useRef(0);
  const hudTimerRef = useRef(0);
  const reducedRef = useRef(false);
  const spritesRef = useRef([]);
  const trackImgRef = useRef(null);
  const playerNameRef = useRef("");

  if (!audioRef.current) audioRef.current = createAudio();
  useEffect(() => { phaseRef.current = phase; }, [phase]);
  useEffect(() => { fsRef.current = fs; }, [fs]);

  const playerName = (usernameProp || "").trim().slice(0, 12) || S.guest;

  // display font
  useEffect(() => {
    if (document.getElementById("gpa-font")) return;
    const l = document.createElement("link");
    l.id = "gpa-font"; l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap";
    document.head.appendChild(l);
  }, []);

  // reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => (reducedRef.current = mq.matches);
    apply(); mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // circuit illustration
  useEffect(() => {
    const img = new Image();
    img.onload = () => { trackImgRef.current = img; };
    img.src = TRACK_IMG;
  }, []);

  // lock page scroll while the game owns the screen
  useEffect(() => {
    if (!fs) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [fs]);

  const logEvent = useCallback((label) => {
    if (!debug) return;
    setEvents((e) => [...e.slice(-7), { id: Date.now() + Math.random(), label }]);
  }, [debug]);

  // build recoloured sprites + thumbnails once the art loads
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const sprites = [];
      const thumbURLs = [];
      RACER_STYLE.forEach(({ hue }) => {
        const c = document.createElement("canvas");
        c.width = img.width; c.height = img.height;
        const cx = c.getContext("2d");
        cx.filter = `hue-rotate(${hue}deg) saturate(1.15)`;
        cx.translate(c.width, 0); cx.scale(-1, 1);
        cx.drawImage(img, 0, 0);
        sprites.push(c);
        const tw = 150, th = Math.round((img.height * tw) / img.width);
        const t = document.createElement("canvas");
        t.width = tw; t.height = th;
        const tcx = t.getContext("2d");
        tcx.filter = `hue-rotate(${hue}deg) saturate(1.15)`;
        tcx.drawImage(img, 0, 0, tw, th);
        thumbURLs.push(t.toDataURL());
      });
      spritesRef.current = sprites;
      setThumbs(thumbURLs);
    };
    img.src = CAR_SPRITE;
  }, []);

  /* ------------------------------ drawing ------------------------------- */

  const drawCar = (ctx, lane, x, y, ang, vel, name, chip, carW) => {
    const reduced = reducedRef.current;
    const sprite = spritesRef.current[lane];
    const sw = sprite ? carW : 40;
    const sh = sprite ? (sw * sprite.height) / sprite.width : 18;
    if (!reduced && vel > 0.02) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
      if (Math.cos(ang) < 0) ctx.scale(1, -1);
      ctx.strokeStyle = "rgba(255,255,255,.6)"; ctx.lineWidth = 2;
      const n = Math.min(6, Math.floor(vel * 12) + 1);
      for (let i = 0; i < n; i++) {
        const len = 10 + vel * 45 * Math.random();
        const yy = -sh * 0.3 + Math.random() * sh * 0.6;
        ctx.globalAlpha = 0.2 + Math.random() * 0.4;
        ctx.beginPath(); ctx.moveTo(-sw / 2 - len, yy); ctx.lineTo(-sw / 2, yy); ctx.stroke();
      }
      ctx.restore();
    }
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    if (Math.cos(ang) < 0) ctx.scale(1, -1); // keep wheels down when driving left
    ctx.fillStyle = "rgba(0,0,0,.18)";
    ctx.beginPath(); ctx.ellipse(0, sh * 0.34, sw * 0.4, 4, 0, 0, Math.PI * 2); ctx.fill();
    if (sprite) ctx.drawImage(sprite, -sw / 2, -sh / 2, sw, sh);
    else { ctx.fillStyle = chip; roundRect(ctx, -sw / 2, -sh / 2, sw, sh, 6); ctx.fill(); }
    ctx.restore();
    drawNamePill(ctx, name, chip, x, y - sh * 0.85);
  };

  const draw = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const { w, h } = sizeRef.current;
    const r = raceRef.current;

    // letterbox background matches the illustration's own backdrop
    ctx.fillStyle = "#EFF1F5";
    ctx.fillRect(0, 0, w, h);

    const img = trackImgRef.current;
    const sc = Math.min(w / CROP.w, h / CROP.h);
    const dw = CROP.w * sc, dh = CROP.h * sc;
    const ox = (w - dw) / 2, oy = (h - dh) / 2;
    const map = (px, py) => [ox + (px - CROP.x) * sc, oy + (py - CROP.y) * sc];
    if (img) ctx.drawImage(img, CROP.x, CROP.y, CROP.w, CROP.h, ox, oy, dw, dh);

    // start / finish gate at p = 0
    const fp = trackAt(0);
    const [fx, fy] = map(fp.x, fp.y);
    const half = ROAD_HALF * sc;
    ctx.save(); ctx.translate(fx, fy); ctx.rotate(fp.ang);
    const cell = Math.max(4, half / 3.4);
    for (let yy = -half; yy < half; yy += cell) {
      for (let cix = 0; cix < 2; cix++) {
        ctx.fillStyle = (Math.floor((yy + half) / cell) + cix) % 2 === 0 ? "#1f2430" : "#ffffff";
        ctx.fillRect(cix * cell - cell, yy, cell, cell);
      }
    }
    ctx.restore();
    ctx.font = `700 ${Math.max(10, 12 * sc * 2.2)}px ${FONT}`;
    ctx.fillStyle = "#2b2f3a"; ctx.textAlign = "center";
    ctx.fillText("🏁 " + S.finishLine, fx, fy - half - 8);

    if (!r) return;

    const carW = clamp(58 * sc, 26, 84);
    const racers = [
      { lane: 0, pos: r.player.pos, vel: r.player.vel, name: r.player.name, chip: RACER_STYLE[0].chip, laneIdx: r.player.laneIdx },
      ...r.ai.map((a, i) => ({ lane: i + 1, pos: a.pos, vel: a.vel, name: a.name, chip: RACER_STYLE[i + 1].chip, laneIdx: a.laneIdx }))
    ];
    racers
      .map((rc) => {
        const pt = trackAt(rc.pos);
        const off = (rc.laneIdx - 1.5) * 7; // lane offset in illustration px
        const nx = -Math.sin(pt.ang), ny = Math.cos(pt.ang);
        const [x, y] = map(pt.x + nx * off, pt.y + ny * off);
        return { ...rc, x, y, ang: pt.ang };
      })
      .sort((a, b) => a.y - b.y)
      .forEach((rc) => drawCar(ctx, rc.lane, rc.x, rc.y, rc.ang, rc.vel, rc.name, rc.chip, carW));

    // standings panel
    const order = [...racers].sort((a, b) => b.pos - a.pos);
    ctx.font = `600 12px ${FONT}`; ctx.textAlign = "left";
    order.forEach((rc, i) => {
      const py = 10 + i * 16;
      ctx.fillStyle = "rgba(255,255,255,.85)"; roundRect(ctx, 8, py - 2, 158, 13, 6); ctx.fill();
      ctx.fillStyle = rc.chip; roundRect(ctx, 10, py, 4 + rc.pos * 124, 9, 4); ctx.fill();
      ctx.fillStyle = "#222530";
      ctx.fillText(`${i + 1}. ${trunc(rc.name, 10)}`, 13, py + 8.5);
    });
  }, [S]);

  /* ---------------------------- simulation ----------------------------- */

  const endRace = useCallback(() => {
    const r = raceRef.current;
    r.running = false;
    audioRef.current.engineStop();
    audioRef.current.finish();
    clearInterval(hudTimerRef.current);
    const finished = r.finishOrder.slice();
    const unfinished = [
      ...(r.player.done ? [] : [{ name: r.player.name, lane: 0, time: null, isPlayer: true, pos: r.player.pos }]),
      ...r.ai.filter((a) => !a.done).map((a) => ({ name: a.name, lane: a.lane, time: null, isPlayer: false, pos: a.pos }))
    ].sort((a, b) => b.pos - a.pos);
    const standings = [...finished, ...unfinished];
    const placement = standings.findIndex((s) => s.isPlayer) + 1;
    setResults({ standings, placement, score: scoreRef.current });
    setPhase("finished");
    setProblem(null); setSprinting(false);
    if (placement === 1 && !reducedRef.current) setConfetti((c) => c + 1);
    onFinish?.(placement, { standings, score: scoreRef.current });
    logEvent(`onFinish → ${placement}-place · score ${scoreRef.current}/${total}`);
  }, [onFinish, logEvent, total]);

  const update = useCallback((dt) => {
    const r = raceRef.current;
    if (!r || !r.running) return;
    const now = performance.now();
    const k = reducedRef.current ? 22 : 6;
    const prev = r.player.pos;
    r.player.pos += (r.player.target - r.player.pos) * (1 - Math.exp(-k * dt));
    // final sprint: guarantee steady progress across the finish line
    if (r.player.target > 1 && !r.player.done) r.player.pos += 0.05 * dt;
    r.player.vel = (r.player.pos - prev) / Math.max(dt, 1e-4);
    r.ai.forEach((a) => {
      if (a.done) return;
      const surge = 1 + 0.25 * Math.sin((now / 1000) * a.surgeFreq + a.surgePhase);
      const jitter = 0.9 + Math.random() * 0.2;
      a.pos += a.speed * surge * jitter * dt;
      a.vel = a.speed * surge;
      if (a.pos >= 1) {
        a.pos = 1; a.done = true; a.vel = 0;
        r.finishOrder.push({ name: a.name, lane: a.lane, time: (now - r.startTime) / 1000, isPlayer: false });
      }
    });
    audioRef.current.engineSpeed(r.player.vel / 0.8);
    if (r.player.pos >= 1 && !r.player.done) {
      r.player.pos = 1; r.player.done = true;
      r.finishOrder.push({ name: r.player.name, lane: 0, time: (now - r.startTime) / 1000, isPlayer: true });
      endRace();
    }
  }, [endRace]);

  const startLoop = useCallback(() => {
    if (rafRef.current) return;
    lastTRef.current = performance.now();
    const frame = (t) => {
      const dt = Math.min(0.05, (t - lastTRef.current) / 1000) || 0;
      lastTRef.current = t;
      if (phaseRef.current === "racing") update(dt);
      draw();
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);
  }, [draw, update]);

  // ref callback: wires up sizing whenever the <canvas> actually mounts
  const setCanvasNode = useCallback((node) => {
    if (roRef.current) { roRef.current.disconnect(); roRef.current = null; }
    canvasRef.current = node;
    if (!node) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      const w = Math.max(300, cr.width);
      // full-screen: fill the stage; embedded: derive height from width
      const h = fsRef.current && cr.height > 140
        ? Math.round(cr.height)
        : Math.round(clamp(w * 0.5, 240, 360));
      const dpr = window.devicePixelRatio || 1;
      node.width = Math.round(w * dpr); node.height = Math.round(h * dpr);
      node.style.height = h + "px";
      node.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      draw();
    });
    ro.observe(node.parentElement);
    roRef.current = ro;
  }, [draw]);

  useEffect(() => () => {
    cancelAnimationFrame(rafRef.current);
    clearInterval(hudTimerRef.current);
    roRef.current?.disconnect();
    audioRef.current.engineStop();
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  }, []);

  /* ------------------------- fullscreen control ------------------------- */

  const enterFs = useCallback(() => {
    setFs(true);
    const el = rootRef.current;
    el?.requestFullscreen?.({ navigationUI: "hide" }).catch(() => {});
    try { window.screen?.orientation?.lock?.("landscape").catch(() => {}); } catch { /* unsupported */ }
  }, []);

  const exitFs = useCallback(() => {
    setFs(false);
    try { window.screen?.orientation?.unlock?.(); } catch { /* unsupported */ }
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  }, []);

  const quitGame = useCallback(() => {
    const r = raceRef.current; if (r) r.running = false;
    clearInterval(hudTimerRef.current);
    audioRef.current.engineStop();
    setPhase("intro"); setProblem(null); setSprinting(false); setResults(null);
    exitFs();
  }, [exitFs]);

  /* --------------------------- problem flow ---------------------------- */

  const nextProblem = useCallback(() => {
    const idx = qIndexRef.current;
    let p;
    if (problems && problems[idx]) { const { a, b } = problems[idx]; p = { a, b, answer: a + b }; }
    else p = generateProblem({ difficulty });
    setProblem(p); setOptions(makeOptions(p.answer));
    setSelected(null); setWrongSet([]); setFeedback(null);
    onNext?.();
    logEvent("onNext → " + `${p.a} + ${p.b}`);
  }, [problems, difficulty, onNext, logEvent]);

  const initRace = useCallback(() => {
    const lanes = shuffle([0, 1, 2, 3]);
    raceRef.current = {
      running: false, startTime: 0, finishOrder: [],
      player: { pos: 0, target: 0, vel: 0, done: false, name: playerNameRef.current, lane: 0, laneIdx: lanes[0] },
      ai: S.aiNames.map((name, i) => {
        const secs = 32 + Math.random() * 16;
        return {
          name, lane: i + 1, laneIdx: lanes[i + 1],
          pos: 0, vel: 0, done: false, speed: 1 / secs,
          surgeFreq: 0.5 + Math.random(), surgePhase: Math.random() * Math.PI * 2
        };
      })
    };
    scoreRef.current = 0; qIndexRef.current = 0;
    setHud({ time: 0, place: 1, score: 0 });
  }, [S]);

  const beginRacing = useCallback(() => {
    const r = raceRef.current;
    r.running = true; r.startTime = performance.now();
    audioRef.current.engineStart();
    setPhase("racing"); nextProblem();
    clearInterval(hudTimerRef.current);
    hudTimerRef.current = setInterval(() => {
      const rr = raceRef.current; if (!rr) return;
      const positions = [rr.player.pos, ...rr.ai.map((a) => a.pos)];
      const place = 1 + positions.filter((p) => p > rr.player.pos).length;
      setHud({ time: (performance.now() - rr.startTime) / 1000, place, score: scoreRef.current });
    }, 200);
  }, [nextProblem]);

  const start = useCallback(async () => {
    playerNameRef.current = playerName;
    enterFs();
    await audioRef.current.resume();
    audioRef.current.setMuted(muted);
    initRace(); startLoop();
    setResults(null); setPhase("countdown");
    audioRef.current.count(); setCountdown("3");
    setTimeout(() => { audioRef.current.count(); setCountdown("2"); }, 700);
    setTimeout(() => { audioRef.current.count(); setCountdown("1"); }, 1400);
    setTimeout(() => { audioRef.current.go(); setCountdown(S.go); }, 2100);
    setTimeout(() => { setCountdown(null); beginRacing(); }, 2850);
  }, [playerName, muted, initRace, startLoop, beginRacing, S, enterFs]);

  const answer = useCallback((opt) => {
    if (phase !== "racing" || sprinting || feedback === "correct") return;
    const p = problem, correct = opt === p.answer;
    onAttempt?.(correct, { a: p.a, b: p.b, answer: p.answer, chosen: opt });
    logEvent(`onAttempt → ${correct ? "✓" : "✗"} ${p.a}+${p.b}=${p.answer} (chose ${opt})`);
    if (correct) {
      scoreRef.current += 1; setSelected(opt); setFeedback("correct");
      // overshoot past 1 on the last answer — the eased position approaches its
      // target asymptotically, so an exact 1.0 target would never cross MARRA
      const t = scoreRef.current / total;
      raceRef.current.player.target = t >= 1 ? 1.06 : t;
      qIndexRef.current += 1;
      audioRef.current.correct(); onCorrect?.(); logEvent("onCorrect");
      if (!reducedRef.current) setConfetti((c) => c + 1);
      if (scoreRef.current >= total) setSprinting(true);
      else setTimeout(nextProblem, 750);
    } else {
      setSelected(opt); setFeedback("wrong");
      setWrongSet((w) => (w.includes(opt) ? w : [...w, opt]));
      audioRef.current.wrong(); onWrong?.(); logEvent("onWrong");
      setTimeout(() => { setFeedback(null); setSelected(null); }, 700);
    }
  }, [phase, sprinting, feedback, problem, total, onAttempt, onCorrect, onWrong, nextProblem, logEvent]);

  /* ------------------------------- render ------------------------------ */

  const liveText = feedback === "correct" ? S.correct : feedback === "wrong" ? S.wrong
    : problem ? `${problem.a} + ${problem.b}` : "";
  const medals = ["🥇", "🥈", "🥉"];
  const mood = results
    ? (results.score >= total - 1 && results.placement === 1 ? S.moodTop
      : results.score >= Math.ceil(total * 0.6) ? S.moodMid : S.moodLow)
    : "";

  return (
    <div ref={rootRef} className={"gpa-root" + (fs ? " gpa-fs" : "")} style={{ fontFamily: FONT }}>
      <style>{css}</style>
      <div className="gpa-card">
        <div className="gpa-head">
          <div>
            <div className="gpa-title">{S.title}</div>
            <div className="gpa-sub">{S.subtitle}</div>
          </div>
          <div className="gpa-headbtns">
            <button className="gpa-mute" aria-pressed={muted}
              onClick={() => { const m = !muted; setMuted(m); audioRef.current.setMuted(m); }}>
              {muted ? "🔇 " + S.soundOff : "🔊 " + S.soundOn}
            </button>
            {fs && (
              <button className="gpa-exit" onClick={quitGame} aria-label={S.exit} title={S.exit}>✕</button>
            )}
          </div>
        </div>

        {phase === "racing" && (
          <div className="gpa-hud" aria-hidden="true">
            <span className="gpa-pill">{S.place}: <b>{hud.place}/4</b></span>
            <span className="gpa-pill">{S.score}: <b>{hud.score}/{total}</b></span>
            <span className="gpa-pill">{S.time}: <b>{hud.time.toFixed(1)}{S.sec}</b></span>
          </div>
        )}

        {phase === "intro" ? (
          <div className="gpa-introcard">
            <img className="gpa-hero" src={CAR_SPRITE} alt="" />
            <div className="gpa-me">
              <span className="gpa-me-label">{S.racer}:</span>
              {thumbs[0] && <img src={thumbs[0]} alt="" />}
              <span className="gpa-me-name">{playerName}</span>
            </div>
            <div className="gpa-rivals">
              <span className="gpa-rivals-t">{S.rivals}:</span>
              {S.aiNames.map((nm, i) => (
                <span className="gpa-rival" key={nm}>
                  {thumbs[i + 1] ? <img src={thumbs[i + 1]} alt="" /> :
                    <span className="gpa-cdot" style={{ background: RACER_STYLE[i + 1].chip }} />}
                  {nm}
                </span>
              ))}
            </div>
            <button className="gpa-start" onClick={start}>{S.start}</button>
          </div>
        ) : phase === "finished" && results ? (
          <div className="gpa-results">
            <div className="gpa-trophy" aria-hidden>🏆</div>
            <div className="gpa-res-title">{S.resTitle}</div>
            <div className="gpa-res-mood">{mood}</div>
            <div className={"gpa-podium" + (results.placement === 1 ? " win" : "")}>
              {thumbs[0] && <img className="gpa-podium-car" src={thumbs[0]} alt="" />}
              <div className="gpa-podium-medal">{medals[results.placement - 1] || "🏁"}</div>
              <div className="gpa-podium-text">
                {results.placement === 1 ? S.win : S.youFinished(results.placement)}
              </div>
            </div>
            <div className="gpa-scorecard">
              <span className="gpa-scorecard-l">{S.yourScore}</span>
              <span className="gpa-scorecard-v">{results.score}/{total}</span>
            </div>
            <ol className="gpa-standings-list">
              {results.standings.map((s, i) => (
                <li key={i} className={s.isPlayer ? "me" : ""}>
                  <span className="gpa-rank">{i + 1}</span>
                  {thumbs[s.lane] ? <img className="gpa-mini" src={thumbs[s.lane]} alt="" />
                    : <span className="gpa-dot" style={{ background: RACER_STYLE[s.lane].chip }} />}
                  <span className="gpa-rname">{s.name}</span>
                  <span className="gpa-t">{s.time != null ? `${s.time.toFixed(1)}${S.sec}` : "—"}</span>
                </li>
              ))}
            </ol>
            <div className="gpa-res-btns">
              <button className="gpa-start" onClick={start}>🔁 {S.replay}</button>
              <a className="gpa-home" href="/dashboard/g1-math" onClick={exitFs}>← {S.back}</a>
            </div>
            {confetti > 0 && !reducedRef.current && <Confetti key={confetti} />}
          </div>
        ) : (
          <div className="gpa-stage">
            <canvas ref={setCanvasNode} className="gpa-canvas" />
            {phase === "countdown" && countdown && (
              <div className="gpa-overlay gpa-no-bg">
                <div key={countdown} className="gpa-count">{countdown}</div>
              </div>
            )}
            {confetti > 0 && !reducedRef.current && <Confetti key={confetti} />}
          </div>
        )}

        <div className="gpa-sr" aria-live="polite">{liveText}</div>

        {phase === "racing" && problem && !sprinting && (
          <div className="gpa-quiz">
            <div className="gpa-q">{S.question} <b>{problem.a} + {problem.b} = ?</b></div>
            <div className="gpa-options" role="group" aria-label={S.question}>
              {options.map((opt) => {
                const isSel = selected === opt, isWrong = wrongSet.includes(opt);
                const cls = "gpa-opt"
                  + (isSel && feedback === "correct" ? " is-correct" : "")
                  + (isSel && feedback === "wrong" ? " is-wrong" : "")
                  + (isWrong && !isSel ? " is-dim" : "");
                return (
                  <button key={opt} className={cls} onClick={() => answer(opt)}
                    disabled={isWrong || feedback === "correct"} aria-label={`${S.question} ${opt}`}>
                    <span>{opt}</span>
                    {isSel && feedback === "correct" && <span className="gpa-mark">✓</span>}
                    {isSel && feedback === "wrong" && <span className="gpa-mark">✕</span>}
                  </button>
                );
              })}
            </div>
            {feedback === "wrong" && <div className="gpa-hint">✕ {S.hint(problem.a, problem.b)}</div>}
            {feedback === "correct" && <div className="gpa-good">✓ {S.correct}</div>}
          </div>
        )}

        {sprinting && <div className="gpa-sprint">{S.sprint} 🏎️💨</div>}

        {debug && (
          <div className="gpa-debug">
            <div className="gpa-debug-h">⚙︎ Callback hodisalari (onAttempt, onCorrect, onWrong, onNext, onFinish). Ishlatishda <code>debug={"{false}"}</code> qiling.</div>
            <div className="gpa-debug-log">
              {events.length
                ? events.map((ev) => <div key={ev.id} className="gpa-debug-row">{ev.label}</div>)
                : <div className="gpa-debug-empty">Hali hodisa yo‘q — o‘ynab ko‘ring…</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ----------------------------- confetti --------------------------------- */
function Confetti() {
  const colors = ["#3FBF4F", "#2BB6D6", "#7C5CFC", "#FF6B5C", "#FFC233"];
  return (
    <div className="gpa-confetti" aria-hidden="true">
      {Array.from({ length: 16 }).map((_, i) => (
        <span key={i} style={{
          left: 38 + Math.random() * 24 + "%", background: colors[i % colors.length],
          animationDelay: Math.random() * 0.2 + "s", transform: `rotate(${Math.random() * 360}deg)`,
          "--dx": (Math.random() * 220 - 110) + "px"
        }} />
      ))}
    </div>
  );
}

/* ------------------------------ canvas utils ---------------------------- */
function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
function trunc(s, n) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }
function drawNamePill(ctx, name, color, x, y) {
  const label = trunc(name, 12);
  ctx.font = `600 11px ${FONT}`; ctx.textAlign = "center";
  const w = ctx.measureText(label).width + 14;
  ctx.fillStyle = color; roundRect(ctx, x - w / 2, y - 9, w, 16, 8); ctx.fill();
  ctx.fillStyle = "#fff"; ctx.fillText(label, x, y + 3);
}

/* --------------------------------- css ---------------------------------- */
const css = `
.gpa-root{max-width:760px;margin:0 auto;color:#2b2f3a;}
.gpa-fs{position:fixed;inset:0;z-index:2147483000;max-width:none;margin:0;background:#10141d;overflow:auto;padding:max(10px,env(safe-area-inset-top)) 12px calc(12px + env(safe-area-inset-bottom));display:flex;flex-direction:column;}
.gpa-fs .gpa-card{flex:1;display:flex;flex-direction:column;width:100%;max-width:1080px;margin:0 auto;padding:10px 12px;}
/* hard height budget: track shrinks, quiz always fits on screen */
.gpa-fs .gpa-stage{flex:none;height:clamp(160px,calc(100dvh - 350px),62dvh);}
.gpa-fs .gpa-sub{display:none;}
.gpa-fs .gpa-title{font-size:19px;}
.gpa-fs .gpa-head{margin-bottom:6px;}
.gpa-fs .gpa-hud{margin-bottom:6px;}
.gpa-fs .gpa-quiz{margin-top:10px;}
.gpa-fs .gpa-q{margin-bottom:8px;font-size:16px;}
.gpa-fs .gpa-q b{font-size:20px;}
.gpa-fs .gpa-opt{min-height:54px;padding:11px 4px;font-size:23px;}
@media(max-width:520px){.gpa-fs .gpa-stage{height:clamp(150px,calc(100dvh - 420px),52dvh);}}
.gpa-card{background:#FFF7EC;border:3px solid #ffe6c7;border-radius:22px;padding:16px;box-shadow:0 12px 30px rgba(80,50,20,.12);}
.gpa-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px;}
.gpa-headbtns{display:flex;gap:8px;align-items:center;}
.gpa-title{font-size:24px;font-weight:700;color:#FF5A3C;line-height:1.1;}
.gpa-sub{font-size:13px;color:#7a6a55;margin-top:2px;}
.gpa-mute{font-family:inherit;font-size:12px;font-weight:600;border:2px solid #ffd9b0;background:#fff;border-radius:999px;padding:7px 12px;cursor:pointer;min-height:34px;color:#7a6a55;}
.gpa-mute:focus-visible{outline:3px solid #5B8DEF;outline-offset:2px;}
.gpa-exit{font-family:inherit;font-size:16px;font-weight:700;border:2px solid #ffd9b0;background:#fff;color:#7a6a55;border-radius:999px;width:44px;height:44px;min-height:44px;cursor:pointer;line-height:1;}
.gpa-exit:focus-visible{outline:3px solid #5B8DEF;outline-offset:2px;}
.gpa-hud{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;}
.gpa-pill{background:#fff;border:2px solid #ffe6c7;border-radius:999px;padding:5px 12px;font-size:13px;color:#7a6a55;}
.gpa-pill b{color:#2b2f3a;}
.gpa-stage{position:relative;border-radius:16px;overflow:hidden;border:3px solid #ffe6c7;background:#EFF1F5;}
.gpa-introcard{border-radius:16px;border:3px solid #ffe6c7;padding:22px 16px 20px;display:flex;flex-direction:column;align-items:center;gap:12px;background:radial-gradient(120% 90% at 50% 0%,#2b3756 0%,#161d2e 72%);}
.gpa-canvas{display:block;width:100%;height:100%;}
.gpa-overlay{position:absolute;inset:0;display:flex;flex-direction:column;gap:12px;align-items:center;justify-content:center;background:rgba(20,30,45,.5);padding:14px;}
.gpa-no-bg{background:transparent;}
.gpa-hero{width:min(60%,300px);height:auto;display:block;filter:drop-shadow(0 12px 20px rgba(0,0,0,.45));animation:gpa-bob 2.4s ease-in-out infinite;}
.gpa-me{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.14);border:2px solid rgba(255,255,255,.35);padding:7px 14px;border-radius:999px;}
.gpa-me img{width:42px;height:auto;}
.gpa-me-label{color:#cfe0ff;font-size:12px;font-weight:600;}
.gpa-me-name{color:#fff;font-size:16px;font-weight:700;}
.gpa-rivals{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center;background:rgba(0,0,0,.25);padding:6px 10px;border-radius:12px;}
.gpa-rivals-t{color:#fff;font-size:12px;font-weight:600;}
.gpa-rival{display:flex;align-items:center;gap:4px;color:#fff;font-size:12px;font-weight:600;}
.gpa-rival img{width:34px;height:auto;}
.gpa-cdot{width:12px;height:12px;border-radius:50%;}
.gpa-start{font-family:inherit;font-size:18px;font-weight:700;color:#fff;background:#FF5A3C;border:none;border-radius:14px;padding:14px 26px;cursor:pointer;min-height:52px;box-shadow:0 6px 0 #c8442b;transition:transform .08s;}
.gpa-start:active{transform:translateY(3px);box-shadow:0 3px 0 #c8442b;}
.gpa-start:focus-visible{outline:3px solid #5B8DEF;outline-offset:3px;}
.gpa-count{font-size:84px;font-weight:700;color:#fff;text-shadow:0 4px 16px rgba(0,0,0,.4);animation:gpa-pop .6s ease;}
.gpa-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}
.gpa-quiz{margin-top:14px;}
.gpa-q{font-size:18px;text-align:center;margin-bottom:12px;color:#5a4a35;}
.gpa-q b{color:#2b2f3a;font-size:22px;}
.gpa-options{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
@media(max-width:520px){.gpa-options{grid-template-columns:repeat(2,1fr);}}
.gpa-opt{position:relative;font-family:inherit;font-size:26px;font-weight:700;color:#2b2f3a;background:#fff;border:3px solid #ffd9b0;border-radius:16px;padding:16px 4px;min-height:62px;cursor:pointer;transition:transform .08s,background .15s,border-color .15s;touch-action:manipulation;}
.gpa-opt:hover:not(:disabled){transform:translateY(-2px);border-color:#FF5A3C;}
.gpa-opt:focus-visible{outline:3px solid #5B8DEF;outline-offset:2px;}
.gpa-opt.is-correct{background:#34C9A3;border-color:#1fa888;color:#fff;}
.gpa-opt.is-wrong{background:#FFD7D2;border-color:#E5484D;color:#9a2b2f;}
.gpa-opt.is-dim{opacity:.4;}
.gpa-opt:disabled{cursor:default;}
.gpa-mark{position:absolute;top:4px;right:8px;font-size:15px;}
.gpa-hint{margin-top:10px;text-align:center;color:#9a2b2f;font-size:14px;}
.gpa-good{margin-top:10px;text-align:center;color:#1fa888;font-weight:700;font-size:16px;}
.gpa-sprint{margin-top:16px;text-align:center;font-size:22px;font-weight:700;color:#FF5A3C;animation:gpa-pulse 1s ease-in-out infinite;}
.gpa-results{position:relative;margin-top:6px;text-align:center;padding-bottom:10px;}
.gpa-trophy{font-size:56px;animation:gpa-pop .6s ease;}
.gpa-res-title{font-size:clamp(26px,5vw,40px);font-weight:700;color:#2b2f3a;}
.gpa-res-mood{font-weight:700;color:#7a6a55;margin-top:2px;}
.gpa-podium{background:#fff;border:2px solid #ffe6c7;border-radius:16px;padding:14px;margin:14px auto;max-width:420px;}
.gpa-podium.win{background:#FFF3C9;border-color:#FFC233;}
.gpa-podium-car{width:140px;height:auto;filter:drop-shadow(0 8px 14px rgba(0,0,0,.25));}
.gpa-podium-medal{font-size:34px;margin-top:-6px;}
.gpa-podium-text{font-size:20px;font-weight:700;color:#5a4a35;}
.gpa-podium.win .gpa-podium-text{color:#8a6b00;}
.gpa-scorecard{display:inline-flex;align-items:baseline;gap:10px;background:#fff;border:2px solid #ffe6c7;border-radius:20px;padding:12px 26px;margin-bottom:14px;box-shadow:0 6px 16px rgba(80,50,20,.08);}
.gpa-scorecard-l{font-size:13px;font-weight:700;color:#7a6a55;}
.gpa-scorecard-v{font-size:34px;font-weight:700;color:#FF8A00;}
.gpa-standings-list{list-style:none;padding:0;margin:0 auto 16px;max-width:380px;text-align:left;}
.gpa-standings-list li{display:flex;align-items:center;gap:10px;background:#fff;border:2px solid #ffe6c7;border-radius:12px;padding:8px 12px;margin-bottom:7px;}
.gpa-standings-list li.me{border-color:#FF5A3C;background:#FFF0EA;}
.gpa-rank{font-weight:700;width:18px;color:#7a6a55;}
.gpa-mini{width:40px;height:auto;flex:none;}
.gpa-dot{width:14px;height:14px;border-radius:50%;flex:none;}
.gpa-rname{flex:1;font-weight:600;}
.gpa-t{color:#7a6a55;font-size:14px;}
.gpa-res-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.gpa-home{display:inline-flex;align-items:center;gap:6px;font-family:inherit;font-size:16px;font-weight:700;color:#5a4a35;background:#fff;border:3px solid #ffd9b0;border-radius:14px;padding:13px 22px;min-height:52px;text-decoration:none;}
.gpa-home:focus-visible{outline:3px solid #5B8DEF;outline-offset:3px;}
.gpa-confetti{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
.gpa-confetti span{position:absolute;top:26%;width:9px;height:14px;border-radius:2px;animation:gpa-fall 1.1s ease-out forwards;}
@keyframes gpa-fall{to{transform:translate(var(--dx),150px) rotate(360deg);opacity:0;}}
@keyframes gpa-pop{0%{transform:scale(.3);opacity:0;}50%{transform:scale(1.15);opacity:1;}100%{transform:scale(1);}}
@keyframes gpa-bob{0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-10px) rotate(1deg);}}
@keyframes gpa-pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.06);}}
@media(prefers-reduced-motion:reduce){.gpa-hero,.gpa-count,.gpa-sprint,.gpa-trophy,.gpa-confetti span{animation:none!important;}}
.gpa-debug{margin-top:14px;background:#10141d;border-radius:12px;padding:10px 12px;}
.gpa-debug-h{color:#9fb4d8;font-size:11px;font-weight:600;margin-bottom:6px;line-height:1.4;}
.gpa-debug-h code{background:#222b3a;padding:1px 5px;border-radius:5px;color:#ffd9b0;}
.gpa-debug-log{display:flex;flex-direction:column;gap:3px;font-family:ui-monospace,Menlo,monospace;}
.gpa-debug-row{color:#bfe3c0;font-size:11.5px;}
.gpa-debug-empty{color:#5b6678;font-size:11.5px;}
`;
