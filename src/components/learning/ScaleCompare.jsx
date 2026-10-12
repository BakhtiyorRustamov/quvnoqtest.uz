"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * ScaleCompare — two lab scales show a fruit/vegetable each with its weight in
 * grams; the child taps the HEAVIER (or LIGHTER) one. Reading and comparing
 * numbers, dressed as a science-lab weighing game.
 *
 * Arena: /games/scale-arena.webp (baked fruits removed, displays blanked —
 * fruit art and gram readouts are live overlays).
 *
 * Contract: single default export · pure generateProblem(config) ·
 * props in / callbacks out · STRINGS uz/ru/en · a11y + reduced motion.
 *
 * Props: lang?, total?, username?,
 *        onAttempt?, onCorrect?, onWrong?, onNext?, onFinish?
 */

const ARENA = "/games/scale-arena.webp";

// arena layout in % of the illustration (1027×569)
const SPOTS = [
  { fx: 30.5, fy: 55.0, lx: 29.0, ly: 69.0, box: { l: 9, t: 16, w: 39, h: 68 } },
  { fx: 71.5, fy: 54.6, lx: 71.7, ly: 69.5, box: { l: 52, t: 16, w: 39, h: 68 } }
];

/* ----------------------------- pure helpers ----------------------------- */

const randInt = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const pickTwo = (arr) => {
  const i = Math.floor(Math.random() * arr.length);
  let j = Math.floor(Math.random() * (arr.length - 1));
  if (j >= i) j += 1;
  return [arr[i], arr[j]];
};

// emoji + loosely realistic gram range + trilingual name
const FRUITS = [
  { e: "🍓", lo: 100, hi: 200, name: { uz: "qulupnay", ru: "клубника", en: "strawberry" } },
  { e: "🍊", lo: 150, hi: 300, name: { uz: "apelsin", ru: "апельсин", en: "orange" } },
  { e: "🍎", lo: 150, hi: 300, name: { uz: "olma", ru: "яблоко", en: "apple" } },
  { e: "🍐", lo: 150, hi: 300, name: { uz: "nok", ru: "груша", en: "pear" } },
  { e: "🍌", lo: 100, hi: 250, name: { uz: "banan", ru: "банан", en: "banana" } },
  { e: "🍇", lo: 300, hi: 600, name: { uz: "uzum", ru: "виноград", en: "grapes" } },
  { e: "🥕", lo: 100, hi: 250, name: { uz: "sabzi", ru: "морковь", en: "carrot" } },
  { e: "🥔", lo: 150, hi: 400, name: { uz: "kartoshka", ru: "картофель", en: "potato" } },
  { e: "🍅", lo: 100, hi: 300, name: { uz: "pomidor", ru: "помидор", en: "tomato" } },
  { e: "🥒", lo: 150, hi: 350, name: { uz: "bodring", ru: "огурец", en: "cucumber" } },
  { e: "🍆", lo: 300, hi: 600, name: { uz: "baqlajon", ru: "баклажан", en: "eggplant" } },
  { e: "🍋", lo: 100, hi: 200, name: { uz: "limon", ru: "лимон", en: "lemon" } }
];

/** One round: two different items, clearly different weights, ask heavier/lighter. */
export function generateProblem() {
  const [f1, f2] = pickTwo(FRUITS);
  let g1 = randInt(f1.lo / 10, f1.hi / 10) * 10;
  let g2 = randInt(f2.lo / 10, f2.hi / 10) * 10;
  let guard = 0;
  while (Math.abs(g1 - g2) < 30 && guard++ < 30) g2 = randInt(f2.lo / 10, f2.hi / 10) * 10;
  if (g1 === g2) g2 += 50;
  const mode = Math.random() < 0.5 ? "heavier" : "lighter";
  const correctIdx = mode === "heavier" ? (g1 > g2 ? 0 : 1) : (g1 < g2 ? 0 : 1);
  return { items: [{ ...f1, g: g1 }, { ...f2, g: g2 }], mode, correctIdx };
}

/* ------------------------------- strings -------------------------------- */

const STRINGS = {
  uz: {
    title: "Tarozi o‘yini",
    subtitle: "Gramlarni o‘qi va to‘g‘ri tarozini bos!",
    start: "O‘yinni boshlash",
    exit: "O‘yindan chiqish",
    soundOn: "Ovoz: yoniq",
    soundOff: "Ovoz: o‘chiq",
    qHeavier: "Qaysi biri OG‘IRROQ?",
    qLighter: "Qaysi biri YENGILROQ?",
    round: "Bosqich",
    score: "To‘g‘ri",
    correct: "Barakalla!",
    wrong: "Hechqisi yo‘q, sonlarni yana solishtir!",
    hint: (a, b) => `${Math.max(a, b)} g > ${Math.min(a, b)} g`,
    itemAria: (it, lang) => `${it.name[lang] || it.name.uz}, ${it.g} gramm`,
    resTitle: "O‘yin tugadi!",
    moodTop: "Ajoyib! Sen gramlarni zo‘r o‘qiysan!",
    moodMid: "Juda yaxshi!",
    moodLow: "Davom et — solishtirish mashq bilan oson bo‘ladi!",
    yourScore: "Natijang",
    replay: "Qaytadan o‘ynash",
    back: "Orqaga"
  },
  ru: {
    title: "Игра с весами",
    subtitle: "Читай граммы и нажимай на нужные весы!",
    start: "Начать игру",
    exit: "Выйти из игры",
    soundOn: "Звук: вкл",
    soundOff: "Звук: выкл",
    qHeavier: "Что ТЯЖЕЛЕЕ?",
    qLighter: "Что ЛЕГЧЕ?",
    round: "Раунд",
    score: "Верно",
    correct: "Молодец!",
    wrong: "Ничего, сравни числа ещё раз!",
    hint: (a, b) => `${Math.max(a, b)} г > ${Math.min(a, b)} г`,
    itemAria: (it, lang) => `${it.name[lang] || it.name.ru}, ${it.g} граммов`,
    resTitle: "Игра окончена!",
    moodTop: "Отлично! Ты здорово читаешь граммы!",
    moodMid: "Очень хорошо!",
    moodLow: "Продолжай — сравнивать станет легко!",
    yourScore: "Твой счёт",
    replay: "Играть снова",
    back: "Назад"
  },
  en: {
    title: "Scale Game",
    subtitle: "Read the grams and tap the right scale!",
    start: "Start the game",
    exit: "Exit game",
    soundOn: "Sound: on",
    soundOff: "Sound: off",
    qHeavier: "Which one is HEAVIER?",
    qLighter: "Which one is LIGHTER?",
    round: "Round",
    score: "Correct",
    correct: "Well done!",
    wrong: "No worries, compare the numbers again!",
    hint: (a, b) => `${Math.max(a, b)} g > ${Math.min(a, b)} g`,
    itemAria: (it, lang) => `${it.name[lang] || it.name.en}, ${it.g} grams`,
    resTitle: "Game finished!",
    moodTop: "Amazing! You read grams like a scientist!",
    moodMid: "Very good!",
    moodLow: "Keep going — comparing gets easy with practice!",
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
    correct: () => { ensure(); [523, 659, 784].forEach((f, i) => blip(f, i * .085, .16, "triangle", .34)); },
    wrong: () => { ensure(); blip(220, 0, .22, "sine", .26, 150); },
    beep: () => { ensure(); blip(880, 0, .1, "square", .18); },
    win: () => { ensure(); [523, 659, 784, 1047, 1319].forEach((f, i) => blip(f, i * .11, .32, "triangle", .4)); }
  };
}

/* ----------------------------- the component ---------------------------- */

export default function ScaleCompare({
  lang = "uz",
  total = 8,
  username = "",
  debug = false,
  onAttempt, onCorrect, onWrong, onNext, onFinish
}) {
  const S = STRINGS[lang] || STRINGS.uz;

  const [phase, setPhase] = useState("intro"); // intro | playing | finished
  const [fs, setFs] = useState(false);
  const [round, setRound] = useState(null);
  const [roundNo, setRoundNo] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);   // clicked index
  const [wrongIdx, setWrongIdx] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [muted, setMuted] = useState(false);
  const [results, setResults] = useState(null);
  const [confetti, setConfetti] = useState(0);

  const rootRef = useRef(null);
  const audioRef = useRef(null);
  const reducedRef = useRef(false);
  const firstTryRef = useRef(true);
  const lockRef = useRef(false);
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
    if (!fs) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [fs]);

  useEffect(() => () => {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  }, []);

  const enterFs = useCallback(() => {
    setFs(true);
    rootRef.current?.requestFullscreen?.({ navigationUI: "hide" }).catch(() => {});
  }, []);
  const exitFs = useCallback(() => {
    setFs(false);
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
  }, []);

  const nextRound = useCallback(() => {
    setRound(generateProblem());
    setPicked(null); setWrongIdx(null); setFeedback(null);
    firstTryRef.current = true;
    lockRef.current = false;
    audioRef.current.beep();
    onNext?.();
  }, [onNext]);

  const start = useCallback(async () => {
    enterFs();
    await audioRef.current.resume();
    audioRef.current.setMuted(muted);
    setScore(0); setRoundNo(1); setResults(null); setConfetti(0);
    setPhase("playing");
    nextRound();
  }, [enterFs, muted, nextRound]);

  const finish = useCallback((finalScore) => {
    audioRef.current.win();
    if (!reducedRef.current) setConfetti((c) => c + 1);
    setResults({ score: finalScore });
    setPhase("finished");
    onFinish?.(finalScore, { score: finalScore, total });
  }, [onFinish, total]);

  const pick = useCallback((idx) => {
    if (phase !== "playing" || !round || lockRef.current || wrongIdx === idx) return;
    const ok = idx === round.correctIdx;
    onAttempt?.(ok, { mode: round.mode, items: round.items.map((i) => i.g), chosen: idx });
    if (ok) {
      lockRef.current = true;
      const gained = firstTryRef.current ? 1 : 0;
      const newScore = score + gained;
      setScore(newScore);
      setPicked(idx); setFeedback("correct");
      audioRef.current.correct();
      onCorrect?.();
      if (!reducedRef.current) setConfetti((c) => c + 1);
      setTimeout(() => {
        if (roundNo >= total) finish(newScore);
        else { setRoundNo((n) => n + 1); nextRound(); }
      }, 1300);
    } else {
      firstTryRef.current = false;
      setWrongIdx(idx); setFeedback("wrong");
      audioRef.current.wrong();
      onWrong?.();
      setTimeout(() => setFeedback((f) => (f === "wrong" ? null : f)), 1600);
    }
  }, [phase, round, wrongIdx, score, roundNo, total, onAttempt, onCorrect, onWrong, nextRound, finish]);

  const quitGame = useCallback(() => {
    setPhase("intro"); setRound(null); setResults(null);
    exitFs();
  }, [exitFs]);

  const mood = results
    ? (results.score >= total - 1 ? S.moodTop : results.score >= Math.ceil(total * 0.6) ? S.moodMid : S.moodLow)
    : "";
  const question = round ? (round.mode === "heavier" ? S.qHeavier : S.qLighter) : "";
  const liveText = feedback === "correct" ? S.correct : feedback === "wrong" ? S.wrong : question;

  return (
    <div ref={rootRef} className={"sg-root" + (fs ? " sg-fs" : "")} style={{ fontFamily: FONT }}>
      <style>{css}</style>
      <div className="sg-card">
        <div className="sg-head">
          <div>
            <div className="sg-title">{S.title}</div>
            <div className="sg-sub">{S.subtitle}</div>
          </div>
          <div className="sg-headbtns">
            <button className="sg-mute" aria-pressed={muted}
              onClick={() => { const m = !muted; setMuted(m); audioRef.current.setMuted(m); }}>
              {muted ? "🔇 " + S.soundOff : "🔊 " + S.soundOn}
            </button>
            {fs && <button className="sg-exit" onClick={quitGame} aria-label={S.exit} title={S.exit}>✕</button>}
          </div>
        </div>

        {phase === "playing" && (
          <div className="sg-hud" aria-hidden="true">
            <span className="sg-pill">{S.round}: <b>{roundNo}/{total}</b></span>
            <span className="sg-pill">{S.score}: <b>{score}</b></span>
          </div>
        )}

        {phase === "playing" && round && (
          <div className="sg-question">{question}</div>
        )}

        {phase === "finished" && results ? (
          <div className="sg-results">
            <div className="sg-trophy" aria-hidden>🏆</div>
            <div className="sg-res-title">{S.resTitle}</div>
            <div className="sg-res-mood">{mood}</div>
            <div className="sg-scorecard">
              <span className="sg-scorecard-l">{S.yourScore}</span>
              <span className="sg-scorecard-v">{results.score}/{total}</span>
            </div>
            <div className="sg-res-btns">
              <button className="sg-start" onClick={start}>🔁 {S.replay}</button>
              <a className="sg-home" href="/dashboard/g1-math" onClick={exitFs}>← {S.back}</a>
            </div>
            {confetti > 0 && !reducedRef.current && <Confetti key={confetti} />}
          </div>
        ) : (
          <div className="sg-stage">
            <div className="sg-arena">
              <img className="sg-img" src={ARENA} alt="" draggable="false" />
              {round && SPOTS.map((sp, i) => (
                <button
                  key={i}
                  className={"sg-spot"
                    + (picked === i && feedback === "correct" ? " is-good" : "")
                    + (wrongIdx === i ? " is-no" : "")}
                  style={{ left: sp.box.l + "%", top: sp.box.t + "%", width: sp.box.w + "%", height: sp.box.h + "%" }}
                  onClick={() => pick(i)}
                  disabled={lockRef.current || wrongIdx === i}
                  aria-label={S.itemAria(round.items[i], lang)}
                >
                  {picked === i && feedback === "correct" && <span className="sg-tick" aria-hidden>✓</span>}
                  {wrongIdx === i && <span className="sg-cross" aria-hidden>✕</span>}
                </button>
              ))}
              {/* fruit on the platter + grams exactly on the blanked LCD display */}
              {round && SPOTS.map((sp, i) => (
                <React.Fragment key={"ov" + i}>
                  <span
                    className={"sg-fruit"
                      + (picked === i && feedback === "correct" ? " is-good" : "")
                      + (wrongIdx === i ? " is-no" : "")}
                    style={{ left: sp.fx + "%", top: sp.fy + "%" }}
                    aria-hidden="true"
                  >
                    {round.items[i].e}
                  </span>
                  <span className="sg-lcd" style={{ left: sp.lx + "%", top: sp.ly + "%" }} aria-hidden="true">
                    {round.items[i].g}<i>g</i>
                  </span>
                </React.Fragment>
              ))}
              {phase === "intro" && (
                <div className="sg-cover">
                  <button className="sg-start" onClick={start}>{S.start}</button>
                </div>
              )}
            </div>
            {confetti > 0 && !reducedRef.current && <Confetti key={confetti} />}
          </div>
        )}

        <div className="sg-sr" aria-live="polite">{liveText}</div>

        {phase === "playing" && feedback === "wrong" && round && (
          <div className="sg-hint">✕ {S.wrong} · {S.hint(round.items[0].g, round.items[1].g)}</div>
        )}
        {phase === "playing" && feedback === "correct" && (
          <div className="sg-good">✓ {S.correct}</div>
        )}
      </div>
    </div>
  );
}

/* ----------------------------- confetti --------------------------------- */
function Confetti() {
  const colors = ["#3FBF4F", "#2BB6D6", "#7C5CFC", "#FF6B5C", "#FFC233"];
  return (
    <div className="sg-confetti" aria-hidden="true">
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
.sg-root{max-width:760px;margin:0 auto;color:#2b2f3a;}
.sg-fs{position:fixed;inset:0;z-index:2147483000;max-width:none;margin:0;background:#dfe9f5;overflow:auto;padding:max(10px,env(safe-area-inset-top)) 12px calc(12px + env(safe-area-inset-bottom));display:flex;flex-direction:column;}
.sg-fs .sg-card{flex:1;display:flex;flex-direction:column;width:100%;max-width:1080px;margin:0 auto;}
.sg-fs .sg-arena{width:min(100%,calc(58vh * 1.8049));}
.sg-card{background:#F4F8FF;border:3px solid #cfe0f5;border-radius:22px;padding:16px;box-shadow:0 12px 30px rgba(30,60,110,.12);}
.sg-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px;}
.sg-headbtns{display:flex;gap:8px;align-items:center;}
.sg-title{font-size:24px;font-weight:700;color:#3a63c9;line-height:1.1;}
.sg-sub{font-size:13px;color:#5f7396;margin-top:2px;}
.sg-mute{font-family:inherit;font-size:12px;font-weight:600;border:2px solid #cfe0f5;background:#fff;border-radius:999px;padding:7px 12px;cursor:pointer;min-height:34px;color:#5f7396;}
.sg-mute:focus-visible,.sg-exit:focus-visible{outline:3px solid #5B8DEF;outline-offset:2px;}
.sg-exit{font-family:inherit;font-size:16px;font-weight:700;border:2px solid #cfe0f5;background:#fff;color:#5f7396;border-radius:999px;width:44px;height:44px;min-height:44px;cursor:pointer;line-height:1;}
.sg-hud{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;}
.sg-pill{background:#fff;border:2px solid #cfe0f5;border-radius:999px;padding:5px 12px;font-size:13px;color:#5f7396;}
.sg-pill b{color:#2b2f3a;}
.sg-question{text-align:center;font-size:clamp(18px,3.6vw,26px);font-weight:700;color:#2b2f3a;margin-bottom:10px;}
.sg-stage{position:relative;}
/* arena box locked to the illustration's aspect ratio — % overlays stay glued */
.sg-arena{position:relative;width:100%;aspect-ratio:1027/569;border-radius:16px;overflow:hidden;border:3px solid #cfe0f5;margin:0 auto;max-width:100%;container-type:inline-size;}
.sg-img{position:absolute;inset:0;width:100%;height:100%;user-select:none;-webkit-user-drag:none;}
.sg-spot{position:absolute;background:transparent;border:none;cursor:pointer;padding:0;border-radius:18px;touch-action:manipulation;}
.sg-spot:hover:not(:disabled){background:rgba(90,140,220,.10);box-shadow:inset 0 0 0 3px rgba(90,140,220,.35);}
.sg-spot:focus-visible{outline:4px solid #5B8DEF;outline-offset:-4px;}
.sg-spot.is-no{cursor:default;}
.sg-fruit{position:absolute;transform:translate(-50%,-100%);font-size:clamp(34px,9cqw,96px);line-height:1;filter:drop-shadow(0 6px 8px rgba(20,40,80,.28));pointer-events:none;}
.sg-fruit.is-no{filter:grayscale(.4) brightness(.9);}
.sg-fruit.is-good{animation:sg-bounce .7s ease;}
.sg-lcd{position:absolute;transform:translate(-50%,-50%);color:#dbe9ff;font-weight:700;font-size:clamp(14px,3.4cqw,34px);letter-spacing:.14em;text-shadow:0 0 10px rgba(120,180,255,.8);white-space:nowrap;pointer-events:none;font-variant-numeric:tabular-nums;}
.sg-lcd i{font-style:normal;font-size:.55em;margin-left:.18em;letter-spacing:0;}
.sg-tick,.sg-cross{position:absolute;left:50%;top:6%;transform:translateX(-50%);width:34px;height:34px;border-radius:999px;display:grid;place-items:center;color:#fff;font-weight:700;font-size:18px;pointer-events:none;}
.sg-tick{background:#1fa888;}
.sg-cross{background:#E5484D;}
.sg-cover{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(30,50,90,.30);}
.sg-start{font-family:inherit;font-size:18px;font-weight:700;color:#fff;background:#3a63c9;border:none;border-radius:14px;padding:14px 26px;cursor:pointer;min-height:52px;box-shadow:0 6px 0 #274590;transition:transform .08s;}
.sg-start:active{transform:translateY(3px);box-shadow:0 3px 0 #274590;}
.sg-start:focus-visible{outline:3px solid #FFC233;outline-offset:3px;}
.sg-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}
.sg-hint{margin-top:12px;text-align:center;color:#9a2b2f;font-size:15px;font-weight:600;}
.sg-good{margin-top:12px;text-align:center;color:#1fa888;font-weight:700;font-size:16px;}
.sg-results{position:relative;text-align:center;padding:8px 0 12px;}
.sg-trophy{font-size:56px;animation:sg-pop .6s ease;}
.sg-res-title{font-size:clamp(26px,5vw,40px);font-weight:700;color:#2b2f3a;}
.sg-res-mood{font-weight:700;color:#5f7396;margin-top:2px;}
.sg-scorecard{display:inline-flex;align-items:baseline;gap:10px;background:#fff;border:2px solid #cfe0f5;border-radius:20px;padding:12px 26px;margin:14px 0;box-shadow:0 6px 16px rgba(30,60,110,.1);}
.sg-scorecard-l{font-size:13px;font-weight:700;color:#5f7396;}
.sg-scorecard-v{font-size:34px;font-weight:700;color:#FF8A00;}
.sg-res-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.sg-home{display:inline-flex;align-items:center;gap:6px;font-family:inherit;font-size:16px;font-weight:700;color:#3d5478;background:#fff;border:3px solid #cfe0f5;border-radius:14px;padding:13px 22px;min-height:52px;text-decoration:none;}
.sg-home:focus-visible{outline:3px solid #5B8DEF;outline-offset:3px;}
.sg-confetti{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
.sg-confetti span{position:absolute;top:26%;width:9px;height:14px;border-radius:2px;animation:sg-fall 1.1s ease-out forwards;}
@keyframes sg-fall{to{transform:translate(var(--dx),150px) rotate(360deg);opacity:0;}}
@keyframes sg-pop{0%{transform:scale(.3);opacity:0;}50%{transform:scale(1.15);opacity:1;}100%{transform:scale(1);}}
@keyframes sg-bounce{0%,100%{transform:translate(-50%,-100%);}35%{transform:translate(-50%,-118%) scale(1.1);}70%{transform:translate(-50%,-96%);}}
@media(prefers-reduced-motion:reduce){.sg-trophy,.sg-confetti span{animation:none!important;}.sg-fruit.is-good{animation:none;}}
`;
