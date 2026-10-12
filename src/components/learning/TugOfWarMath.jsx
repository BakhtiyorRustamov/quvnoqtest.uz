"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * TugOfWarMath — knowledge tug-of-war on the water: every correct answer makes
 * the child's blue tugboat PULL the buoy flag toward their side; a wrong
 * answer lets the computer's yellow boat pull back. First to +5 pulls wins.
 *
 * Arena: /games/tug-arena.webp (baked text removed; boats + buoy are part of
 * the art, the rope + marker + name pills are live overlays).
 *
 * Contract: single default export · pure generateProblem(config) ·
 * props in / callbacks out · STRINGS uz/ru/en · a11y + reduced motion.
 *
 * Props: difficulty?, lang?, total? (max questions), winPulls?, username?,
 *        onAttempt?, onCorrect?, onWrong?, onNext?, onFinish?
 */

const ARENA = "/games/tug-arena.webp";

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

/** Grade-1 friendly: a+b or a−b, everything within 0…max (default 20). */
export function generateProblem({ max = 20 } = {}) {
  if (Math.random() < 0.5) {
    const a = randInt(1, max - 1);
    const b = randInt(1, max - a);
    return { a, b, op: "+", answer: a + b };
  }
  const a = randInt(2, max);
  const b = randInt(1, a - 1);
  return { a, b, op: "−", answer: a - b };
}

function makeOptions(answer) {
  const set = new Set([answer]);
  while (set.size < 4) {
    const v = answer + randInt(1, 5) * (Math.random() < 0.5 ? -1 : 1);
    if (v >= 0) set.add(v);
  }
  return shuffle([...set]);
}

/* ------------------------------- strings -------------------------------- */

const STRINGS = {
  uz: {
    title: "Kemalar bellashuvi",
    subtitle: "To‘g‘ri javob ber — kemang bayroqni o‘zi tomon tortadi!",
    start: "Bellashuvni boshlash",
    exit: "O‘yindan chiqish",
    soundOn: "Ovoz: yoniq",
    soundOff: "Ovoz: o‘chiq",
    opponent: "Kompyuter",
    guest: "Mehmon",
    question: "Qancha bo‘ladi?",
    correct: "Barakalla! Kemang tortdi!",
    wrong: "Hechqisi yo‘q! Raqib tortdi…",
    hint: (p) => p.op === "+"
      ? `Maslahat: ${p.a} dan boshlab ${p.b} marta oldinga sana.`
      : `Maslahat: ${p.a} dan boshlab ${p.b} marta orqaga sana.`,
    score: "To‘g‘ri",
    pulls: "Tortishlar",
    win: "Sen yutding! 🏆",
    lose: "Bu safar kompyuter yutdi. Yana urinib ko‘r!",
    resTitle: "Bellashuv tugadi!",
    moodTop: "Ajoyib natija!",
    moodMid: "Juda yaxshi!",
    moodLow: "Davom et — keyingi safar kuchliroq tort!",
    yourScore: "Natijang",
    replay: "Qaytadan o‘ynash",
    back: "Orqaga"
  },
  ru: {
    title: "Перетягивание буксиров",
    subtitle: "Отвечай верно — твой кораблик тянет флажок к себе!",
    start: "Начать состязание",
    exit: "Выйти из игры",
    soundOn: "Звук: вкл",
    soundOff: "Звук: выкл",
    opponent: "Компьютер",
    guest: "Гость",
    question: "Сколько будет?",
    correct: "Молодец! Твой кораблик тянет!",
    wrong: "Ничего! Соперник потянул…",
    hint: (p) => p.op === "+"
      ? `Подсказка: начни с ${p.a} и отсчитай ${p.b} вперёд.`
      : `Подсказка: начни с ${p.a} и отсчитай ${p.b} назад.`,
    score: "Верно",
    pulls: "Тяги",
    win: "Ты победил! 🏆",
    lose: "В этот раз победил компьютер. Попробуй ещё!",
    resTitle: "Состязание окончено!",
    moodTop: "Отличный результат!",
    moodMid: "Очень хорошо!",
    moodLow: "Продолжай — в следующий раз потянешь сильнее!",
    yourScore: "Твой счёт",
    replay: "Играть снова",
    back: "Назад"
  },
  en: {
    title: "Tugboat Tug-of-War",
    subtitle: "Answer right — your boat pulls the flag to your side!",
    start: "Start the match",
    exit: "Exit game",
    soundOn: "Sound: on",
    soundOff: "Sound: off",
    opponent: "Computer",
    guest: "Guest",
    question: "How much is",
    correct: "Well done! Your boat pulled!",
    wrong: "No worries! The rival pulled…",
    hint: (p) => p.op === "+"
      ? `Hint: start at ${p.a} and count ${p.b} forward.`
      : `Hint: start at ${p.a} and count ${p.b} back.`,
    score: "Correct",
    pulls: "Pulls",
    win: "You won! 🏆",
    lose: "The computer won this time. Try again!",
    resTitle: "Match finished!",
    moodTop: "Amazing result!",
    moodMid: "Very good!",
    moodLow: "Keep going — pull harder next time!",
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
    splash: () => { ensure(); blip(300, 0, .3, "sine", .2, 90); },
    win: () => { ensure(); [523, 659, 784, 1047, 1319].forEach((f, i) => blip(f, i * .11, .32, "triangle", .4)); }
  };
}

/* ----------------------------- the component ---------------------------- */

export default function TugOfWarMath({
  difficulty = "easy",
  lang = "uz",
  total = 12,
  winPulls = 5,
  username = "",
  debug = false,
  onAttempt, onCorrect, onWrong, onNext, onFinish
}) {
  const S = STRINGS[lang] || STRINGS.uz;
  const max = difficulty === "hard" ? 50 : 20;

  const [phase, setPhase] = useState("intro"); // intro | playing | finished
  const [fs, setFs] = useState(false);
  const [problem, setProblem] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [wrongSet, setWrongSet] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [pull, setPull] = useState(0); // −winPulls … +winPulls (+ = player)
  const [asked, setAsked] = useState(0);
  const [score, setScore] = useState(0);
  const [tugAnim, setTugAnim] = useState(null); // 'me' | 'foe'
  const [muted, setMuted] = useState(false);
  const [results, setResults] = useState(null);
  const [confetti, setConfetti] = useState(0);

  const rootRef = useRef(null);
  const audioRef = useRef(null);
  const reducedRef = useRef(false);
  const doneRef = useRef(false);
  if (!audioRef.current) audioRef.current = createAudio();

  const playerName = (username || "").trim().slice(0, 12) || S.guest;

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

  const nextProblem = useCallback(() => {
    const p = generateProblem({ max });
    setProblem(p); setOptions(makeOptions(p.answer));
    setSelected(null); setWrongSet([]); setFeedback(null);
    onNext?.();
  }, [max, onNext]);

  const start = useCallback(async () => {
    enterFs();
    await audioRef.current.resume();
    audioRef.current.setMuted(muted);
    doneRef.current = false;
    setPull(0); setAsked(0); setScore(0); setResults(null); setConfetti(0);
    setPhase("playing");
    nextProblem();
  }, [enterFs, muted, nextProblem]);

  const finish = useCallback((finalPull, finalScore, finalAsked) => {
    if (doneRef.current) return;
    doneRef.current = true;
    const won = finalPull > 0;
    audioRef.current.win();
    if (won && !reducedRef.current) setConfetti((c) => c + 1);
    setResults({ won, score: finalScore, asked: finalAsked });
    setPhase("finished");
    onFinish?.(won ? 1 : 2, { won, score: finalScore, asked: finalAsked });
  }, [onFinish]);

  const answer = useCallback((opt) => {
    if (phase !== "playing" || feedback === "correct" || doneRef.current) return;
    const p = problem, ok = opt === p.answer;
    onAttempt?.(ok, { ...p, chosen: opt });
    if (ok) {
      const newPull = Math.min(winPulls, pull + 1);
      const newScore = score + 1;
      const newAsked = asked + 1;
      setScore(newScore); setAsked(newAsked); setPull(newPull);
      setSelected(opt); setFeedback("correct");
      setTugAnim("me");
      audioRef.current.correct(); audioRef.current.splash();
      onCorrect?.();
      setTimeout(() => setTugAnim(null), 650);
      if (newPull >= winPulls || newAsked >= total) setTimeout(() => finish(newPull, newScore, newAsked), 900);
      else setTimeout(nextProblem, 900);
    } else {
      const newPull = Math.max(-winPulls, pull - 1);
      const newAsked = asked + 1;
      setAsked(newAsked); setPull(newPull);
      setSelected(opt); setFeedback("wrong");
      setWrongSet((w) => (w.includes(opt) ? w : [...w, opt]));
      setTugAnim("foe");
      audioRef.current.wrong(); onWrong?.();
      setTimeout(() => setTugAnim(null), 650);
      if (newPull <= -winPulls || newAsked >= total) setTimeout(() => finish(newPull, score, newAsked), 900);
      else setTimeout(() => { setFeedback(null); setSelected(null); nextProblem(); }, 900);
    }
  }, [phase, feedback, problem, pull, score, asked, winPulls, total, onAttempt, onCorrect, onWrong, nextProblem, finish]);

  const quitGame = useCallback(() => {
    setPhase("intro"); setProblem(null); setResults(null);
    exitFs();
  }, [exitFs]);

  /* ------------------------------- render ------------------------------ */

  // marker slides between the two boats: ±14% of arena width from centre
  const knotX = 50 + (pull / winPulls) * 14;
  const mood = results
    ? (results.won && results.score >= results.asked - 1 ? S.moodTop : results.won ? S.moodMid : S.moodLow)
    : "";
  const liveText = feedback === "correct" ? S.correct : feedback === "wrong" ? S.wrong
    : problem ? `${problem.a} ${problem.op} ${problem.b}` : "";

  return (
    <div ref={rootRef} className={"tug-root" + (fs ? " tug-fs" : "")} style={{ fontFamily: FONT }}>
      <style>{css}</style>
      <div className="tug-card">
        <div className="tug-head">
          <div>
            <div className="tug-title">{S.title}</div>
            <div className="tug-sub">{S.subtitle}</div>
          </div>
          <div className="tug-headbtns">
            <button className="tug-mute" aria-pressed={muted}
              onClick={() => { const m = !muted; setMuted(m); audioRef.current.setMuted(m); }}>
              {muted ? "🔇 " + S.soundOff : "🔊 " + S.soundOn}
            </button>
            {fs && <button className="tug-exit" onClick={quitGame} aria-label={S.exit} title={S.exit}>✕</button>}
          </div>
        </div>

        {phase === "playing" && (
          <div className="tug-hud" aria-hidden="true">
            <span className="tug-pill">{S.score}: <b>{score}/{asked}</b></span>
            <span className="tug-pill">{S.pulls}: <b>{pull > 0 ? "+" + pull : pull}</b></span>
          </div>
        )}

        {phase === "finished" && results ? (
          <div className="tug-results">
            <div className="tug-trophy" aria-hidden>{results.won ? "🏆" : "💪"}</div>
            <div className="tug-res-title">{S.resTitle}</div>
            <div className="tug-res-mood">{results.won ? S.win : S.lose}</div>
            <div className="tug-scorecard">
              <span className="tug-scorecard-l">{S.yourScore}</span>
              <span className="tug-scorecard-v">{results.score}/{results.asked}</span>
            </div>
            <div className="tug-res-mood2">{mood}</div>
            <div className="tug-res-btns">
              <button className="tug-start" onClick={start}>🔁 {S.replay}</button>
              <a className="tug-home" href="/dashboard/g1-math" onClick={exitFs}>← {S.back}</a>
            </div>
            {confetti > 0 && !reducedRef.current && <Confetti key={confetti} />}
          </div>
        ) : (
          <div className={"tug-stage" + (tugAnim === "me" ? " pull-me" : tugAnim === "foe" ? " pull-foe" : "")}>
            <div className="tug-arena">
              <img className="tug-img" src={ARENA} alt="" draggable="false" />
              {/* rope + sliding knot */}
              <svg className="tug-rope" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <path d={`M31 56 Q ${(31 + knotX) / 2} 58.4 ${knotX} 56.6`} fill="none" stroke="#8a5a2b" strokeWidth="0.7" />
                <path d={`M${knotX} 56.6 Q ${(knotX + 69) / 2} 58.4 69 56`} fill="none" stroke="#8a5a2b" strokeWidth="0.7" />
              </svg>
              <div className="tug-knot" style={{ left: knotX + "%" }} aria-hidden="true">🚩</div>
              {/* name pills, replacing the baked ones */}
              <div className="tug-name tug-name-l">🔵 {playerName}</div>
              <div className="tug-name tug-name-r">🟡 {S.opponent}</div>
              {tugAnim === "me" && !reducedRef.current && <div className="tug-splash" style={{ left: "24%" }}>💦</div>}
              {tugAnim === "foe" && !reducedRef.current && <div className="tug-splash" style={{ left: "72%" }}>💦</div>}
              {phase === "intro" && (
                <div className="tug-cover">
                  <button className="tug-start" onClick={start}>{S.start}</button>
                </div>
              )}
            </div>
            {confetti > 0 && !reducedRef.current && <Confetti key={confetti} />}
          </div>
        )}

        <div className="tug-sr" aria-live="polite">{liveText}</div>

        {phase === "playing" && problem && (
          <div className="tug-quiz">
            <div className="tug-q">{S.question} <b>{problem.a} {problem.op} {problem.b} = ?</b></div>
            <div className="tug-options" role="group" aria-label={S.question}>
              {options.map((opt) => {
                const isSel = selected === opt, isWrong = wrongSet.includes(opt);
                const cls = "tug-opt"
                  + (isSel && feedback === "correct" ? " is-correct" : "")
                  + (isSel && feedback === "wrong" ? " is-wrong" : "")
                  + (isWrong && !isSel ? " is-dim" : "");
                return (
                  <button key={opt} className={cls} onClick={() => answer(opt)}
                    disabled={isWrong || feedback === "correct"} aria-label={`${S.question} ${opt}`}>
                    <span>{opt}</span>
                    {isSel && feedback === "correct" && <span className="tug-mark">✓</span>}
                    {isSel && feedback === "wrong" && <span className="tug-mark">✕</span>}
                  </button>
                );
              })}
            </div>
            {feedback === "wrong" && <div className="tug-hint">✕ {S.hint(problem)}</div>}
            {feedback === "correct" && <div className="tug-good">✓ {S.correct}</div>}
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
    <div className="tug-confetti" aria-hidden="true">
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
.tug-root{max-width:760px;margin:0 auto;color:#2b2f3a;}
.tug-fs{position:fixed;inset:0;z-index:2147483000;max-width:none;margin:0;background:#0e2a3f;overflow:auto;padding:max(10px,env(safe-area-inset-top)) 12px calc(12px + env(safe-area-inset-bottom));display:flex;flex-direction:column;}
.tug-fs .tug-card{flex:1;display:flex;flex-direction:column;width:100%;max-width:1080px;margin:0 auto;}
.tug-fs .tug-arena{width:min(100%,calc(56vh * 1.7917));}
.tug-card{background:#EAF7FF;border:3px solid #bfe6ff;border-radius:22px;padding:16px;box-shadow:0 12px 30px rgba(20,60,90,.12);}
.tug-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px;}
.tug-headbtns{display:flex;gap:8px;align-items:center;}
.tug-title{font-size:24px;font-weight:700;color:#1279c2;line-height:1.1;}
.tug-sub{font-size:13px;color:#4d7b99;margin-top:2px;}
.tug-mute{font-family:inherit;font-size:12px;font-weight:600;border:2px solid #bfe6ff;background:#fff;border-radius:999px;padding:7px 12px;cursor:pointer;min-height:34px;color:#4d7b99;}
.tug-mute:focus-visible,.tug-exit:focus-visible{outline:3px solid #5B8DEF;outline-offset:2px;}
.tug-exit{font-family:inherit;font-size:16px;font-weight:700;border:2px solid #bfe6ff;background:#fff;color:#4d7b99;border-radius:999px;width:44px;height:44px;min-height:44px;cursor:pointer;line-height:1;}
.tug-hud{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px;}
.tug-pill{background:#fff;border:2px solid #bfe6ff;border-radius:999px;padding:5px 12px;font-size:13px;color:#4d7b99;}
.tug-pill b{color:#2b2f3a;}
.tug-stage{position:relative;}
/* arena box locked to the illustration's aspect ratio — % overlays stay glued */
.tug-arena{position:relative;width:100%;aspect-ratio:1376/768;border-radius:16px;overflow:hidden;border:3px solid #bfe6ff;margin:0 auto;max-width:100%;}
.tug-img{position:absolute;inset:0;width:100%;height:100%;user-select:none;-webkit-user-drag:none;}
.tug-rope{position:absolute;inset:0;width:100%;height:100%;}
.tug-knot{position:absolute;top:49%;transform:translate(-50%,-50%);font-size:clamp(20px,4.6vw,34px);filter:drop-shadow(0 3px 4px rgba(0,0,0,.3));transition:left .5s cubic-bezier(.3,1.4,.5,1);}
.tug-name{position:absolute;bottom:5%;background:rgba(255,255,255,.82);border:2px solid rgba(255,255,255,.9);backdrop-filter:blur(3px);border-radius:999px;padding:6px 14px;font-weight:700;font-size:clamp(11px,2.4vw,16px);color:#1e3a5f;box-shadow:0 4px 12px rgba(10,40,70,.25);}
.tug-name-l{left:4%;}
.tug-name-r{right:4%;}
.tug-splash{position:absolute;top:52%;font-size:30px;animation:tug-splash .6s ease-out forwards;}
.pull-me .tug-img{animation:tug-nudge-l .5s ease;}
.pull-foe .tug-img{animation:tug-nudge-r .5s ease;}
@keyframes tug-nudge-l{30%{transform:translateX(-1.6%);}100%{transform:none;}}
@keyframes tug-nudge-r{30%{transform:translateX(1.6%);}100%{transform:none;}}
@keyframes tug-splash{0%{opacity:0;transform:translateY(6px) scale(.6);}40%{opacity:1;}100%{opacity:0;transform:translateY(-14px) scale(1.25);}}
.tug-cover{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,30,50,.35);}
.tug-start{font-family:inherit;font-size:18px;font-weight:700;color:#fff;background:#1279c2;border:none;border-radius:14px;padding:14px 26px;cursor:pointer;min-height:52px;box-shadow:0 6px 0 #0b568c;transition:transform .08s;}
.tug-start:active{transform:translateY(3px);box-shadow:0 3px 0 #0b568c;}
.tug-start:focus-visible{outline:3px solid #FFC233;outline-offset:3px;}
.tug-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}
.tug-quiz{margin-top:14px;}
.tug-q{font-size:18px;text-align:center;margin-bottom:12px;color:#33607f;}
.tug-q b{color:#2b2f3a;font-size:22px;}
.tug-options{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
@media(max-width:520px){.tug-options{grid-template-columns:repeat(2,1fr);}}
.tug-opt{position:relative;font-family:inherit;font-size:26px;font-weight:700;color:#2b2f3a;background:#fff;border:3px solid #a9dcff;border-radius:16px;padding:16px 4px;min-height:62px;cursor:pointer;transition:transform .08s,background .15s,border-color .15s;touch-action:manipulation;}
.tug-opt:hover:not(:disabled){transform:translateY(-2px);border-color:#1279c2;}
.tug-opt:focus-visible{outline:3px solid #5B8DEF;outline-offset:2px;}
.tug-opt.is-correct{background:#34C9A3;border-color:#1fa888;color:#fff;}
.tug-opt.is-wrong{background:#FFD7D2;border-color:#E5484D;color:#9a2b2f;}
.tug-opt.is-dim{opacity:.4;}
.tug-opt:disabled{cursor:default;}
.tug-mark{position:absolute;top:4px;right:8px;font-size:15px;}
.tug-hint{margin-top:10px;text-align:center;color:#9a2b2f;font-size:14px;}
.tug-good{margin-top:10px;text-align:center;color:#1fa888;font-weight:700;font-size:16px;}
.tug-results{position:relative;text-align:center;padding:8px 0 12px;}
.tug-trophy{font-size:56px;animation:tug-pop .6s ease;}
.tug-res-title{font-size:clamp(26px,5vw,40px);font-weight:700;color:#2b2f3a;}
.tug-res-mood{font-weight:700;color:#33607f;margin-top:2px;font-size:18px;}
.tug-res-mood2{font-weight:600;color:#4d7b99;margin-bottom:14px;}
.tug-scorecard{display:inline-flex;align-items:baseline;gap:10px;background:#fff;border:2px solid #bfe6ff;border-radius:20px;padding:12px 26px;margin:14px 0 8px;box-shadow:0 6px 16px rgba(20,60,90,.1);}
.tug-scorecard-l{font-size:13px;font-weight:700;color:#4d7b99;}
.tug-scorecard-v{font-size:34px;font-weight:700;color:#FF8A00;}
.tug-res-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.tug-home{display:inline-flex;align-items:center;gap:6px;font-family:inherit;font-size:16px;font-weight:700;color:#33607f;background:#fff;border:3px solid #a9dcff;border-radius:14px;padding:13px 22px;min-height:52px;text-decoration:none;}
.tug-home:focus-visible{outline:3px solid #5B8DEF;outline-offset:3px;}
.tug-confetti{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
.tug-confetti span{position:absolute;top:26%;width:9px;height:14px;border-radius:2px;animation:tug-fall 1.1s ease-out forwards;}
@keyframes tug-fall{to{transform:translate(var(--dx),150px) rotate(360deg);opacity:0;}}
@keyframes tug-pop{0%{transform:scale(.3);opacity:0;}50%{transform:scale(1.15);opacity:1;}100%{transform:scale(1);}}
@media(prefers-reduced-motion:reduce){.tug-knot{transition:none;}.tug-trophy,.tug-confetti span,.tug-splash{animation:none!important;}.pull-me .tug-img,.pull-foe .tug-img{animation:none!important;}}
`;
