"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * TankTargets — four friendly robot tanks roll up, each with an expression on
 * its screen; the cannon shows a TARGET number. The child clicks the tank
 * whose expression equals the target — the cannon fires a light-ball, the
 * tank pops, the score grows.
 *
 * Arena: /games/tank-arena.webp (title removed, screens blanked, orb cleared —
 * the expressions, target number, projectile and effects are live overlays).
 *
 * Contract: single default export · pure generateProblem(config) ·
 * props in / callbacks out · STRINGS uz/ru/en · a11y + reduced motion.
 *
 * Props: difficulty?, lang?, total?, username?,
 *        onAttempt?, onCorrect?, onWrong?, onNext?, onFinish?
 */

const ARENA = "/games/tank-arena.webp";

// tank layout in % of the arena image (windshield-screen centre, tilt,
// label size in container-width units, clickable hotspot box)
const TANKS = [
  { sx: 19.0, sy: 50.1, rot: -4, fs: 3.0, box: { l: 3, t: 36, w: 27, h: 42 } },
  { sx: 39.8, sy: 43.9, rot: -2, fs: 2.4, box: { l: 30, t: 33, w: 19, h: 32 } },
  { sx: 59.6, sy: 43.5, rot: 2, fs: 2.4, box: { l: 51, t: 33, w: 19, h: 31 } },
  { sx: 80.8, sy: 49.7, rot: 4, fs: 3.0, box: { l: 70, t: 36, w: 27, h: 42 } }
];
const ORB = { x: 50, y: 72.7 };

/* ----------------------------- pure helpers ----------------------------- */

const randInt = (lo, hi) => Math.floor(Math.random() * (hi - lo + 1)) + lo;
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function makeExpr(value, max) {
  // build an a+b or a−b expression that equals `value` (0…max)
  if (value >= 2 && Math.random() < 0.5) {
    const b = randInt(1, value - 1);
    return { a: value - b + b, ...{ a: value - b, b, op: "+" }, value };
  }
  const b = randInt(1, Math.max(1, max - value));
  return { a: value + b, b, op: "−", value };
}

/** One round: a target and 4 tank expressions, exactly one matching. */
export function generateProblem({ max = 20 } = {}) {
  const target = randInt(2, max - 2);
  const values = new Set([target]);
  while (values.size < 4) {
    const v = target + randInt(1, 6) * (Math.random() < 0.5 ? -1 : 1);
    if (v >= 0 && v <= max) values.add(v);
  }
  const tanks = shuffle([...values]).map((v) => makeExpr(v, max));
  return { target, tanks, correctIdx: tanks.findIndex((t) => t.value === target) };
}

/* ------------------------------- strings -------------------------------- */

const STRINGS = {
  uz: {
    title: "Tank nishoni",
    subtitle: "Kanondagi songa teng misolli tankni bos!",
    start: "O‘yinni boshlash",
    exit: "O‘yindan chiqish",
    soundOn: "Ovoz: yoniq",
    soundOff: "Ovoz: o‘chiq",
    target: "Nishon",
    round: "Bosqich",
    score: "To‘g‘ri",
    correct: "Barakalla! Nishonga tegding!",
    wrong: "Hechqisi yo‘q, boshqa tankni sina!",
    hint: (t) => `Maslahat: qiymati ${t} ga teng misolni qidir.`,
    tankAria: (e, i) => `${i + 1}-tank: ${e.a} ${e.op} ${e.b}`,
    resTitle: "O‘yin tugadi!",
    moodTop: "Ajoyib merganlik!",
    moodMid: "Juda yaxshi!",
    moodLow: "Davom et — mashq mergan qiladi!",
    yourScore: "Natijang",
    replay: "Qaytadan o‘ynash",
    back: "Orqaga"
  },
  ru: {
    title: "Танковая цель",
    subtitle: "Нажми на танк с примером, равным числу на пушке!",
    start: "Начать игру",
    exit: "Выйти из игры",
    soundOn: "Звук: вкл",
    soundOff: "Звук: выкл",
    target: "Цель",
    round: "Раунд",
    score: "Верно",
    correct: "Молодец! Точно в цель!",
    wrong: "Ничего страшного, попробуй другой танк!",
    hint: (t) => `Подсказка: ищи пример со значением ${t}.`,
    tankAria: (e, i) => `Танк ${i + 1}: ${e.a} ${e.op} ${e.b}`,
    resTitle: "Игра окончена!",
    moodTop: "Отличная меткость!",
    moodMid: "Очень хорошо!",
    moodLow: "Продолжай — тренировка делает метким!",
    yourScore: "Твой счёт",
    replay: "Играть снова",
    back: "Назад"
  },
  en: {
    title: "Tank Targets",
    subtitle: "Tap the tank whose expression equals the cannon number!",
    start: "Start the game",
    exit: "Exit game",
    soundOn: "Sound: on",
    soundOff: "Sound: off",
    target: "Target",
    round: "Round",
    score: "Correct",
    correct: "Well done! Direct hit!",
    wrong: "No worries, try another tank!",
    hint: (t) => `Hint: look for the expression that makes ${t}.`,
    tankAria: (e, i) => `Tank ${i + 1}: ${e.a} ${e.op} ${e.b}`,
    resTitle: "Game finished!",
    moodTop: "Amazing aim!",
    moodMid: "Very good!",
    moodLow: "Keep going — practice makes sharp!",
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
    fire: () => { ensure(); blip(660, 0, .18, "square", .3, 220); },
    boom: () => { ensure(); blip(120, 0, .3, "sawtooth", .32, 60); [784, 988].forEach((f, i) => blip(f, .12 + i * .08, .14, "triangle", .3)); },
    wrong: () => { ensure(); blip(220, 0, .22, "sine", .26, 150); },
    win: () => { ensure(); [523, 659, 784, 1047, 1319].forEach((f, i) => blip(f, i * .11, .32, "triangle", .4)); }
  };
}

/* ----------------------------- the component ---------------------------- */

export default function TankTargets({
  difficulty = "easy",
  lang = "uz",
  total = 8,
  username = "",
  debug = false,
  onAttempt, onCorrect, onWrong, onNext, onFinish
}) {
  const S = STRINGS[lang] || STRINGS.uz;
  const max = difficulty === "hard" ? 50 : 20;

  const [phase, setPhase] = useState("intro"); // intro | playing | finished
  const [fs, setFs] = useState(false);
  const [round, setRound] = useState(null);
  const [roundNo, setRoundNo] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongIdx, setWrongIdx] = useState([]);
  const [hitIdx, setHitIdx] = useState(null);
  const [shot, setShot] = useState(null); // {x,y,flying}
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
    setRound(generateProblem({ max }));
    setWrongIdx([]); setHitIdx(null); setShot(null); setFeedback(null);
    firstTryRef.current = true;
    lockRef.current = false;
    onNext?.();
  }, [max, onNext]);

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

  const clickTank = useCallback((idx) => {
    if (phase !== "playing" || !round || lockRef.current || wrongIdx.includes(idx)) return;
    const ok = idx === round.correctIdx;
    onAttempt?.(ok, { ...round.tanks[idx], target: round.target });
    if (ok) {
      lockRef.current = true;
      const gained = firstTryRef.current ? 1 : 0;
      const newScore = score + gained;
      audioRef.current.fire();
      // projectile: from the orb to the tank screen
      setShot({ x: ORB.x, y: ORB.y, flying: false });
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setShot({ x: TANKS[idx].sx, y: TANKS[idx].sy, flying: true });
      }));
      setTimeout(() => {
        setHitIdx(idx); setShot(null); setFeedback("correct");
        setScore(newScore);
        audioRef.current.boom();
        onCorrect?.();
        if (!reducedRef.current) setConfetti((c) => c + 1);
      }, reducedRef.current ? 0 : 380);
      setTimeout(() => {
        if (roundNo >= total) finish(newScore);
        else { setRoundNo((n) => n + 1); nextRound(); }
      }, 1500);
    } else {
      firstTryRef.current = false;
      setWrongIdx((w) => [...w, idx]);
      setFeedback("wrong");
      audioRef.current.wrong();
      onWrong?.();
      setTimeout(() => setFeedback((f) => (f === "wrong" ? null : f)), 1400);
    }
  }, [phase, round, wrongIdx, score, roundNo, total, onAttempt, onCorrect, onWrong, nextRound, finish]);

  const quitGame = useCallback(() => {
    setPhase("intro"); setRound(null); setResults(null);
    exitFs();
  }, [exitFs]);

  const mood = results
    ? (results.score >= total - 1 ? S.moodTop : results.score >= Math.ceil(total * 0.6) ? S.moodMid : S.moodLow)
    : "";
  const liveText = feedback === "correct" ? S.correct : feedback === "wrong" ? S.wrong
    : round ? `${S.target}: ${round.target}` : "";

  return (
    <div ref={rootRef} className={"tk-root" + (fs ? " tk-fs" : "")} style={{ fontFamily: FONT }}>
      <style>{css}</style>
      <div className="tk-card">
        <div className="tk-head">
          <div>
            <div className="tk-title">{S.title}</div>
            <div className="tk-sub">{S.subtitle}</div>
          </div>
          <div className="tk-headbtns">
            <button className="tk-mute" aria-pressed={muted}
              onClick={() => { const m = !muted; setMuted(m); audioRef.current.setMuted(m); }}>
              {muted ? "🔇 " + S.soundOff : "🔊 " + S.soundOn}
            </button>
            {fs && <button className="tk-exit" onClick={quitGame} aria-label={S.exit} title={S.exit}>✕</button>}
          </div>
        </div>

        {phase === "playing" && (
          <div className="tk-hud" aria-hidden="true">
            <span className="tk-pill">{S.round}: <b>{roundNo}/{total}</b></span>
            <span className="tk-pill">{S.score}: <b>{score}</b></span>
            {round && <span className="tk-pill tk-pill-target">{S.target}: <b>{round.target}</b></span>}
          </div>
        )}

        {phase === "finished" && results ? (
          <div className="tk-results">
            <div className="tk-trophy" aria-hidden>🏆</div>
            <div className="tk-res-title">{S.resTitle}</div>
            <div className="tk-res-mood">{mood}</div>
            <div className="tk-scorecard">
              <span className="tk-scorecard-l">{S.yourScore}</span>
              <span className="tk-scorecard-v">{results.score}/{total}</span>
            </div>
            <div className="tk-res-btns">
              <button className="tk-start" onClick={start}>🔁 {S.replay}</button>
              <a className="tk-home" href="/dashboard/g1-math" onClick={exitFs}>← {S.back}</a>
            </div>
            {confetti > 0 && !reducedRef.current && <Confetti key={confetti} />}
          </div>
        ) : (
          <div className="tk-stage">
            <div className="tk-arena">
              <img className="tk-img" src={ARENA} alt="" draggable="false" />
              {round && TANKS.map((tk, i) => (
                <button
                  key={i}
                  className={"tk-tank"
                    + (hitIdx === i ? " is-hit" : "")
                    + (wrongIdx.includes(i) ? " is-no" : "")}
                  style={{ left: tk.box.l + "%", top: tk.box.t + "%", width: tk.box.w + "%", height: tk.box.h + "%" }}
                  onClick={() => clickTank(i)}
                  disabled={hitIdx !== null || wrongIdx.includes(i)}
                  aria-label={S.tankAria(round.tanks[i], i)}
                >
                  {hitIdx === i && <span className="tk-boom" aria-hidden>💥</span>}
                  {wrongIdx.includes(i) && <span className="tk-nope" aria-hidden>✕</span>}
                </button>
              ))}
              {/* expressions sit exactly on the blanked windshield screens */}
              {round && TANKS.map((tk, i) => (
                <span
                  key={"scr" + i}
                  className={"tk-screen" + (hitIdx === i ? " is-hit" : "")}
                  style={{
                    left: tk.sx + "%",
                    top: tk.sy + "%",
                    transform: `translate(-50%,-50%) rotate(${tk.rot}deg)`,
                    fontSize: `clamp(11px, ${tk.fs}cqw, 30px)`
                  }}
                  aria-hidden="true"
                >
                  {round.tanks[i].a} {round.tanks[i].op} {round.tanks[i].b}
                </span>
              ))}
              {round && (
                <div className="tk-orb" style={{ left: ORB.x + "%", top: ORB.y + "%" }} aria-hidden="true">
                  {round.target}
                </div>
              )}
              {shot && (
                <div
                  className={"tk-shot" + (shot.flying ? " fly" : "")}
                  style={{ left: shot.x + "%", top: shot.y + "%" }}
                  aria-hidden="true"
                />
              )}
              {phase === "intro" && (
                <div className="tk-cover">
                  <button className="tk-start" onClick={start}>{S.start}</button>
                </div>
              )}
            </div>
            {confetti > 0 && !reducedRef.current && <Confetti key={confetti} />}
          </div>
        )}

        <div className="tk-sr" aria-live="polite">{liveText}</div>

        {phase === "playing" && feedback === "wrong" && round && (
          <div className="tk-hint">✕ {S.hint(round.target)}</div>
        )}
        {phase === "playing" && feedback === "correct" && (
          <div className="tk-good">✓ {S.correct}</div>
        )}
      </div>
    </div>
  );
}

/* ----------------------------- confetti --------------------------------- */
function Confetti() {
  const colors = ["#3FBF4F", "#2BB6D6", "#7C5CFC", "#FF6B5C", "#FFC233"];
  return (
    <div className="tk-confetti" aria-hidden="true">
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
.tk-root{max-width:760px;margin:0 auto;color:#2b2f3a;}
.tk-fs{position:fixed;inset:0;z-index:2147483000;max-width:none;margin:0;background:#1c1206;overflow:auto;padding:max(10px,env(safe-area-inset-top)) 12px calc(12px + env(safe-area-inset-bottom));display:flex;flex-direction:column;}
.tk-fs .tk-card{flex:1;display:flex;flex-direction:column;width:100%;max-width:1080px;margin:0 auto;}
.tk-fs .tk-arena{width:min(100%,calc(62vh * 1.7917));}
.tk-card{background:#FFF3E0;border:3px solid #ffd9a8;border-radius:22px;padding:16px;box-shadow:0 12px 30px rgba(90,50,10,.12);}
.tk-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px;}
.tk-headbtns{display:flex;gap:8px;align-items:center;}
.tk-title{font-size:24px;font-weight:700;color:#d96b12;line-height:1.1;}
.tk-sub{font-size:13px;color:#8a6a45;margin-top:2px;}
.tk-mute{font-family:inherit;font-size:12px;font-weight:600;border:2px solid #ffd9a8;background:#fff;border-radius:999px;padding:7px 12px;cursor:pointer;min-height:34px;color:#8a6a45;}
.tk-mute:focus-visible,.tk-exit:focus-visible{outline:3px solid #5B8DEF;outline-offset:2px;}
.tk-exit{font-family:inherit;font-size:16px;font-weight:700;border:2px solid #ffd9a8;background:#fff;color:#8a6a45;border-radius:999px;width:44px;height:44px;min-height:44px;cursor:pointer;line-height:1;}
.tk-hud{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;}
.tk-pill{background:#fff;border:2px solid #ffd9a8;border-radius:999px;padding:5px 12px;font-size:13px;color:#8a6a45;}
.tk-pill b{color:#2b2f3a;}
.tk-pill-target{border-color:#ffc233;background:#fff7dc;}
.tk-stage{position:relative;}
/* the arena box is locked to the illustration's aspect ratio, so % overlay
   coordinates always land on the same pixels of the picture */
.tk-arena{position:relative;width:100%;aspect-ratio:1376/768;border-radius:16px;overflow:hidden;border:3px solid #ffd9a8;margin:0 auto;max-width:100%;container-type:inline-size;}
.tk-img{position:absolute;inset:0;width:100%;height:100%;user-select:none;-webkit-user-drag:none;}
.tk-tank{position:absolute;background:transparent;border:none;cursor:pointer;padding:0;border-radius:14px;touch-action:manipulation;}
.tk-tank:hover:not(:disabled){background:rgba(255,255,255,.10);box-shadow:inset 0 0 0 3px rgba(127,243,255,.45);}
.tk-tank:focus-visible{outline:4px solid #5B8DEF;outline-offset:-4px;}
.tk-tank.is-no{opacity:.55;cursor:default;}
.tk-tank.is-hit{animation:tk-hop .5s ease;}
.tk-screen{position:absolute;color:#7ff3ff;font-weight:700;letter-spacing:.06em;text-shadow:0 0 8px rgba(64,220,255,.9),0 0 2px rgba(64,220,255,.9);white-space:nowrap;pointer-events:none;}
.tk-screen.is-hit{opacity:0;transition:opacity .3s;}
.tk-boom{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);font-size:clamp(30px,7vw,64px);animation:tk-boom .7s ease forwards;pointer-events:none;}
.tk-nope{position:absolute;right:8%;top:8%;background:#E5484D;color:#fff;border-radius:999px;width:24px;height:24px;display:grid;place-items:center;font-size:14px;font-weight:700;pointer-events:none;}
.tk-orb{position:absolute;transform:translate(-50%,-50%);width:clamp(38px,8.2%,84px);aspect-ratio:1;display:grid;place-items:center;font-weight:700;font-size:clamp(20px,4.4vw,42px);color:#7a4c00;text-shadow:0 1px 0 rgba(255,255,255,.65);pointer-events:none;}
.tk-shot{position:absolute;width:clamp(14px,2.6%,24px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 35% 35%,#fff9d8,#ffd23e 60%,#ff9d00);box-shadow:0 0 14px 4px rgba(255,190,40,.75);transform:translate(-50%,-50%);pointer-events:none;}
.tk-shot.fly{transition:left .38s cubic-bezier(.2,.7,.5,1),top .38s cubic-bezier(.2,.7,.5,1);}
.tk-cover{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(40,22,4,.38);}
.tk-start{font-family:inherit;font-size:18px;font-weight:700;color:#fff;background:#d96b12;border:none;border-radius:14px;padding:14px 26px;cursor:pointer;min-height:52px;box-shadow:0 6px 0 #9d4c0a;transition:transform .08s;}
.tk-start:active{transform:translateY(3px);box-shadow:0 3px 0 #9d4c0a;}
.tk-start:focus-visible{outline:3px solid #FFC233;outline-offset:3px;}
.tk-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}
.tk-hint{margin-top:12px;text-align:center;color:#9a2b2f;font-size:15px;font-weight:600;}
.tk-good{margin-top:12px;text-align:center;color:#1fa888;font-weight:700;font-size:16px;}
.tk-results{position:relative;text-align:center;padding:8px 0 12px;}
.tk-trophy{font-size:56px;animation:tk-pop .6s ease;}
.tk-res-title{font-size:clamp(26px,5vw,40px);font-weight:700;color:#2b2f3a;}
.tk-res-mood{font-weight:700;color:#8a6a45;margin-top:2px;}
.tk-scorecard{display:inline-flex;align-items:baseline;gap:10px;background:#fff;border:2px solid #ffd9a8;border-radius:20px;padding:12px 26px;margin:14px 0;box-shadow:0 6px 16px rgba(90,50,10,.1);}
.tk-scorecard-l{font-size:13px;font-weight:700;color:#8a6a45;}
.tk-scorecard-v{font-size:34px;font-weight:700;color:#FF8A00;}
.tk-res-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.tk-home{display:inline-flex;align-items:center;gap:6px;font-family:inherit;font-size:16px;font-weight:700;color:#7a5a35;background:#fff;border:3px solid #ffd9a8;border-radius:14px;padding:13px 22px;min-height:52px;text-decoration:none;}
.tk-home:focus-visible{outline:3px solid #5B8DEF;outline-offset:3px;}
.tk-confetti{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
.tk-confetti span{position:absolute;top:26%;width:9px;height:14px;border-radius:2px;animation:tk-fall 1.1s ease-out forwards;}
@keyframes tk-fall{to{transform:translate(var(--dx),150px) rotate(360deg);opacity:0;}}
@keyframes tk-pop{0%{transform:scale(.3);opacity:0;}50%{transform:scale(1.15);opacity:1;}100%{transform:scale(1);}}
@keyframes tk-hop{0%{transform:none;}35%{transform:translateY(-3%) scale(1.03);}70%{transform:translateY(1%) scale(.99);}100%{transform:none;}}
@keyframes tk-boom{0%{opacity:0;transform:translate(-50%,-50%) scale(.4);}30%{opacity:1;transform:translate(-50%,-50%) scale(1.2);}100%{opacity:0;transform:translate(-50%,-50%) scale(1.6);}}
@media(prefers-reduced-motion:reduce){.tk-shot.fly{transition:none;}.tk-trophy,.tk-boom,.tk-confetti span{animation:none!important;}.tk-tank.is-hit{animation:none;}}
`;
