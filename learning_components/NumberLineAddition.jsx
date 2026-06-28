"use client";
import React, { useState, useEffect, useRef } from "react";

/**
 * NumberLineAddition — a data-driven, interactive addition trainer
 * for an Uzbek-language quiz platform (grades 1–2).
 *
 * This demo build uses pure SVG + CSS so it runs with ZERO dependencies.
 * In the Next.js app, prefer Framer Motion (`motion`) or GSAP for richer motion.
 *
 * Props (all optional — defaults keep it runnable in isolation):
 *   a, b        the two addends (omit → auto-generated)
 *   maxSum      difficulty ceiling for the number line (10 or 20)
 *   lang        'uz' (ru / en can be added to STRINGS)
 *   onAttempt   (correct: boolean, payload) => void   // wire to Supabase
 *   onCorrect   () => void
 *   onNext      () => void
 */

// ── i18n: ALL copy lives here so ru/en slot in later ──────────────────
const STRINGS = {
  uz: {
    grade: "Matematika · 1-sinf",
    prompt: "Qancha bo‘ladi?",
    countHint: "Mevalarni sanab ko‘r — ustiga bos",
    apples: "olma",
    oranges: "apelsin",
    show: "Sonlar chizig‘ida ko‘rsatish",
    replay: "Qaytadan ko‘rsatish",
    choose: "Javobni tanla",
    correct: "Barakalla!",
    tryAgain: "Yaqin qolding — yana urinib ko‘r",
    hint: "Maslahat: chiziqdagi sakrashlarni sanab chiq",
    next: "Yangi misol",
    to10: "10 gacha",
    to20: "20 gacha",
  },
};

// ── pure logic (so one component covers a whole grade band) ────────────
function makeProblem(maxSum) {
  const a = 1 + Math.floor(Math.random() * Math.min(9, maxSum - 1));
  const bMax = Math.max(1, Math.min(9, maxSum - a));
  const b = 1 + Math.floor(Math.random() * bMax);
  return { a, b };
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeChoices(answer, maxSum) {
  const pool = new Set([answer]);
  const candidates = [answer + 1, answer - 1, answer + 2, answer - 2];
  for (const c of candidates) {
    if (pool.size >= 4) break;
    if (c >= 0 && c <= maxSum + 2 && c !== answer) pool.add(c);
  }
  let n = answer + 3;
  while (pool.size < 4) {
    if (n >= 0) pool.add(n);
    n++;
  }
  return shuffle([...pool]);
}

// ── illustrated fruit (crisp SVG, tiny payload — beats emoji) ──────────
function Fruit({ kind, counted }) {
  const body = kind === "apple" ? "var(--apple)" : "var(--orange)";
  return (
    <svg viewBox="0 0 40 44" width="100%" height="100%" aria-hidden="true">
      {kind === "apple" ? (
        <path
          d="M20 9c-3-5-9-4-9 2 0 1 .2 2 .5 3C8 16 6 19 6 24c0 8 6 14 14 14s14-6 14-14c0-5-2-8-5.5-10 .3-1 .5-2 .5-3 0-6-6-7-9-2z"
          fill={body}
        />
      ) : (
        <circle cx="20" cy="24" r="15" fill={body} />
      )}
      <rect x="19" y="4" width="2.4" height="7" rx="1.2" fill="#7c5a3a" />
      <path d="M21 6c3-3 7-2 7-2s-1 5-5 5c-1.6 0-2.6-1.6-2-3z" fill="var(--apple-leaf)" />
      <ellipse cx="14" cy="21" rx="3" ry="4" fill="#fff" opacity="0.32" />
      {counted && (
        <g>
          <circle cx="32" cy="10" r="8" fill="var(--grass)" />
          <path
            d="M28.5 10.2l2.4 2.4 4.2-4.6"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
    </svg>
  );
}

function Basket({ label, count, counted, onTap, kind, tint }) {
  const items = Array.from({ length: count }, (_, i) => i);
  const done = counted >= count;
  return (
    <div style={{ ...styles.basket, background: tint }}>
      <div style={styles.fruitGrid}>
        {items.map((i) => (
          <button
            key={i}
            onClick={onTap}
            aria-label={label}
            style={styles.fruitBtn}
            className={i < counted ? "popped" : "pop"}
          >
            <Fruit kind={kind} counted={i < counted} />
          </button>
        ))}
      </div>
      <span style={{ ...styles.countChip, ...(done ? styles.countDone : {}) }}>
        {counted} / {count}
      </span>
    </div>
  );
}

export default function NumberLineAddition(props) {
  const { lang = "uz", onAttempt, onCorrect, onNext } = props;
  const t = STRINGS[lang] || STRINGS.uz;

  const [maxSum, setMaxSum] = useState(props.maxSum || 20);
  const [{ a, b }, setAB] = useState(() =>
    typeof props.a === "number" && typeof props.b === "number"
      ? { a: props.a, b: props.b }
      : makeProblem(props.maxSum || 20)
  );
  const answer = a + b;

  const [choices, setChoices] = useState(() => makeChoices(a + b, props.maxSum || 20));
  const [countedA, setCountedA] = useState(0);
  const [countedB, setCountedB] = useState(0);
  const [mascotVal, setMascotVal] = useState(0);
  const [hopKey, setHopKey] = useState(0);
  const [arcs, setArcs] = useState(0); // how many hop-arcs are drawn (0,1,2)
  const [status, setStatus] = useState("idle"); // idle | correct | wrong
  const [selected, setSelected] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);

  const timers = useRef([]);
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  // number-line geometry (all positions computed from data, never bitmap)
  const W = 580,
    H = 150,
    padL = 36,
    padR = 36,
    axisY = 100;
  const usable = W - padL - padR;
  const sx = (v) => padL + (v / maxSum) * usable;

  function playLine() {
    clearTimers();
    setArcs(0);
    setMascotVal(0);
    setHopKey((k) => k + 1);
    timers.current.push(
      setTimeout(() => {
        setMascotVal(a);
        setHopKey((k) => k + 1);
        setArcs(1);
      }, 260)
    );
    timers.current.push(
      setTimeout(() => {
        setMascotVal(a + b);
        setHopKey((k) => k + 1);
        setArcs(2);
      }, 1180)
    );
  }

  function choose(v) {
    if (status === "correct") return;
    setSelected(v);
    const correct = v === answer;
    if (typeof onAttempt === "function") onAttempt(correct, { a, b, chosen: v, answer });
    if (correct) {
      setStatus("correct");
      setShowHint(false);
      setArcs(2);
      setMascotVal(answer);
      setHopKey((k) => k + 1);
      setConfettiKey((k) => k + 1);
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setStatus("wrong");
      setShowHint(true);
      setShakeKey((k) => k + 1);
      playLine();
    }
  }

  function nextProblem() {
    clearTimers();
    const np = makeProblem(maxSum);
    setAB(np);
    setChoices(makeChoices(np.a + np.b, maxSum));
    setCountedA(0);
    setCountedB(0);
    setMascotVal(0);
    setArcs(0);
    setHopKey((k) => k + 1);
    setStatus("idle");
    setSelected(null);
    setShowHint(false);
    if (typeof onNext === "function") onNext();
  }

  function switchMax(m) {
    if (m === maxSum) return;
    clearTimers();
    setMaxSum(m);
    const np = makeProblem(m);
    setAB(np);
    setChoices(makeChoices(np.a + np.b, m));
    setCountedA(0);
    setCountedB(0);
    setMascotVal(0);
    setArcs(0);
    setStatus("idle");
    setSelected(null);
    setShowHint(false);
  }

  const buildArc = (v1, v2) => {
    const x1 = sx(v1),
      x2 = sx(v2);
    const mid = (x1 + x2) / 2;
    const peak = axisY - Math.min(64, 26 + (x2 - x1) * 0.45);
    return { d: `M ${x1} ${axisY} Q ${mid} ${peak} ${x2} ${axisY}`, mid, peak };
  };
  const arc1 = buildArc(0, a);
  const arc2 = buildArc(a, a + b);

  const ticks = [];
  for (let i = 0; i <= maxSum; i++) ticks.push(i);

  const confettiPieces = Array.from({ length: 26 }, (_, i) => i);
  const cColors = [
    "var(--apple)",
    "var(--orange)",
    "var(--sky)",
    "var(--grass)",
    "var(--gold)",
    "var(--primary)",
  ];

  return (
    <div style={styles.wrap}>
      <style>{css}</style>

      <div style={styles.headRow}>
        <span style={styles.pill}>{t.grade}</span>
        <div style={styles.toggle} role="group" aria-label="difficulty">
          <button
            onClick={() => switchMax(10)}
            style={{ ...styles.toggleBtn, ...(maxSum === 10 ? styles.toggleOn : {}) }}
          >
            {t.to10}
          </button>
          <button
            onClick={() => switchMax(20)}
            style={{ ...styles.toggleBtn, ...(maxSum === 20 ? styles.toggleOn : {}) }}
          >
            {t.to20}
          </button>
        </div>
      </div>

      <h2 style={styles.prompt}>{t.prompt}</h2>
      <p style={styles.sub}>{t.countHint}</p>

      <div style={styles.baskets}>
        <Basket
          label={t.apples}
          count={a}
          counted={countedA}
          onTap={() => setCountedA((c) => Math.min(a, c + 1))}
          kind="apple"
          tint="var(--apple-tint)"
        />
        <span style={styles.op}>+</span>
        <Basket
          label={t.oranges}
          count={b}
          counted={countedB}
          onTap={() => setCountedB((c) => Math.min(b, c + 1))}
          kind="orange"
          tint="var(--orange-tint)"
        />
        <span style={styles.op}>=</span>
        <span style={{ ...styles.qChip, ...(status === "correct" ? styles.qChipDone : {}) }}>
          {status === "correct" ? answer : "?"}
        </span>
      </div>

      <div style={styles.lineCard}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ display: "block" }}
          role="img"
          aria-label={`${a} + ${b}`}
        >
          <line
            x1={padL}
            y1={axisY}
            x2={W - padR}
            y2={axisY}
            stroke="var(--ink)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {ticks.map((i) => (
            <g key={i}>
              <line
                x1={sx(i)}
                y1={axisY - 6}
                x2={sx(i)}
                y2={axisY + 6}
                stroke="var(--ink)"
                strokeWidth="2"
              />
              <text x={sx(i)} y={axisY + 22} textAnchor="middle" style={styles.tickTxt}>
                {i}
              </text>
            </g>
          ))}

          <path
            d={arc1.d}
            fill="none"
            stroke="var(--sky)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength="1"
            className="arc"
            style={{ strokeDashoffset: arcs >= 1 ? 0 : 1, transition: "stroke-dashoffset .55s ease" }}
          />
          <path
            d={arc2.d}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinecap="round"
            pathLength="1"
            className="arc"
            style={{ strokeDashoffset: arcs >= 2 ? 0 : 1, transition: "stroke-dashoffset .55s ease .1s" }}
          />
          <text
            x={arc1.mid}
            y={arc1.peak - 6}
            textAnchor="middle"
            style={{ ...styles.arcTxt, fill: "var(--sky)", opacity: arcs >= 1 ? 1 : 0 }}
          >
            +{a}
          </text>
          <text
            x={arc2.mid}
            y={arc2.peak - 6}
            textAnchor="middle"
            style={{ ...styles.arcTxt, fill: "var(--primary)", opacity: arcs >= 2 ? 1 : 0 }}
          >
            +{b}
          </text>

          <g
            style={{
              transform: `translateX(${sx(mascotVal) - sx(0)}px)`,
              transition: "transform .8s cubic-bezier(.34,1.56,.64,1)",
            }}
          >
            <g
              key={hopKey}
              className="hopper"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <g transform={`translate(${sx(0) - 16}, ${axisY - 46})`}>
                <ellipse cx="16" cy="36" rx="13" ry="4" fill="rgba(0,0,0,0.12)" />
                <circle cx="16" cy="18" r="15" fill="var(--mascot)" />
                <circle cx="10.5" cy="15" r="4.2" fill="#fff" />
                <circle cx="21.5" cy="15" r="4.2" fill="#fff" />
                <circle cx="11.4" cy="15.6" r="2" fill="#22313a" />
                <circle cx="22.4" cy="15.6" r="2" fill="#22313a" />
                <path
                  d="M11 23q5 4 10 0"
                  fill="none"
                  stroke="#22313a"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </g>
            </g>
          </g>
        </svg>

        <button onClick={playLine} style={styles.showBtn}>
          {arcs > 0 ? t.replay : t.show}
        </button>
      </div>

      <p style={styles.choose}>{t.choose}</p>
      <div style={styles.choices} key={shakeKey}>
        {choices.map((c) => {
          const isSel = selected === c;
          const correctBtn = status !== "idle" && c === answer;
          const wrongBtn = isSel && status === "wrong";
          return (
            <button
              key={c}
              onClick={() => choose(c)}
              disabled={status === "correct"}
              aria-label={String(c)}
              className={wrongBtn ? "shake" : ""}
              style={{
                ...styles.choice,
                ...(correctBtn ? styles.choiceCorrect : {}),
                ...(wrongBtn ? styles.choiceWrong : {}),
              }}
            >
              {c}
              {correctBtn && <span style={styles.mark}>✓</span>}
              {wrongBtn && <span style={styles.mark}>✕</span>}
            </button>
          );
        })}
      </div>

      <div style={styles.statusArea} aria-live="polite">
        {status === "correct" && <span style={styles.ok}>🎉 {t.correct}</span>}
        {status === "wrong" && <span style={styles.bad}>{t.tryAgain}</span>}
        {showHint && status === "wrong" && <span style={styles.hint}>{t.hint}</span>}
      </div>

      <button onClick={nextProblem} style={styles.nextBtn}>
        {t.next} →
      </button>

      {status === "correct" && (
        <div key={confettiKey} style={styles.confettiLayer} aria-hidden="true">
          {confettiPieces.map((i) => {
            const left = Math.random() * 100;
            const dx = (Math.random() * 120 - 60).toFixed(0) + "px";
            const rot = (Math.random() * 720 - 360).toFixed(0) + "deg";
            const delay = (Math.random() * 0.25).toFixed(2) + "s";
            const color = cColors[i % cColors.length];
            const size = 7 + Math.round(Math.random() * 6);
            return (
              <span
                key={i}
                className="confetti"
                style={{
                  left: left + "%",
                  width: size,
                  height: size,
                  background: color,
                  ["--dx"]: dx,
                  ["--rot"]: rot,
                  animationDelay: delay,
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── styling: cohesive "schoolbook-meets-game" look ────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap');
:root{
  --paper:#fbf6ea; --ink:#33302b; --line:#ece1c8;
  --primary:#ff7a4d; --primary-press:#ef663a;
  --apple:#e8463c; --orange:#ff9e3d; --apple-leaf:#65bd5a;
  --apple-tint:#fdeceb; --orange-tint:#fff2e0;
  --sky:#2f9fe0; --grass:#46c06a; --gold:#ffce3a; --mist:#9aa0a6;
  --mascot:#5ec0d8;
}
.arc{ stroke-dasharray:1; }
.hopper{ animation: nlHop .7s ease; }
@keyframes nlHop{ 0%{transform:translateY(0)} 38%{transform:translateY(-26px)} 100%{transform:translateY(0)} }
.pop{ transition: transform .12s ease; }
.popped{ animation: nlPop .28s ease; }
@keyframes nlPop{ 0%{transform:scale(1)} 45%{transform:scale(1.28)} 100%{transform:scale(1)} }
.shake{ animation: nlShake .4s ease; }
@keyframes nlShake{ 0%,100%{transform:translateX(0)} 20%{transform:translateX(-7px)} 40%{transform:translateX(7px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
.confetti{ position:absolute; top:-12px; border-radius:2px; animation: nlFall 1.1s ease-in forwards; }
@keyframes nlFall{ 0%{ transform:translate(0,-10px) rotate(0); opacity:1 } 100%{ transform:translate(var(--dx), 260px) rotate(var(--rot)); opacity:0 } }
button:focus-visible{ outline:3px solid var(--sky); outline-offset:2px; }
@media (prefers-reduced-motion: reduce){
  .hopper,.popped,.shake,.confetti{ animation:none !important; }
  *{ transition:none !important; }
}
`;

const styles = {
  wrap: {
    position: "relative",
    maxWidth: 660,
    margin: "0 auto",
    padding: "22px 22px 26px",
    borderRadius: 26,
    border: "2px solid var(--line)",
    boxShadow: "0 18px 40px -22px rgba(80,60,20,.5)",
    backgroundColor: "var(--paper)",
    backgroundImage:
      "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
    backgroundSize: "27px 27px",
    fontFamily: "'Fredoka', ui-rounded, 'Segoe UI', system-ui, sans-serif",
    color: "var(--ink)",
    overflow: "hidden",
  },
  headRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    fontSize: 13,
    fontWeight: 600,
    color: "#fff",
    background: "var(--ink)",
    padding: "5px 12px",
    borderRadius: 999,
    letterSpacing: 0.2,
  },
  toggle: {
    display: "inline-flex",
    background: "#fff",
    border: "2px solid var(--line)",
    borderRadius: 999,
    padding: 3,
  },
  toggleBtn: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 600,
    color: "var(--mist)",
    padding: "5px 12px",
    borderRadius: 999,
  },
  toggleOn: { background: "var(--ink)", color: "#fff" },
  prompt: { margin: "10px 0 2px", fontSize: 30, fontWeight: 700, lineHeight: 1.05 },
  sub: { margin: "0 0 14px", fontSize: 14, color: "var(--mist)", fontWeight: 500 },
  baskets: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flexWrap: "wrap",
    marginBottom: 16,
  },
  basket: {
    borderRadius: 18,
    padding: "12px 12px 10px",
    minWidth: 120,
    border: "2px solid rgba(0,0,0,.04)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  fruitGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 26px)",
    gap: 6,
    justifyContent: "center",
  },
  fruitBtn: {
    width: 26,
    height: 30,
    padding: 0,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    lineHeight: 0,
  },
  countChip: {
    fontSize: 15,
    fontWeight: 700,
    background: "#fff",
    border: "2px solid var(--line)",
    borderRadius: 999,
    padding: "3px 12px",
    color: "var(--ink)",
  },
  countDone: { background: "var(--grass)", borderColor: "var(--grass)", color: "#fff" },
  op: { fontSize: 30, fontWeight: 700, color: "var(--ink)", padding: "0 2px" },
  qChip: {
    fontSize: 30,
    fontWeight: 700,
    width: 54,
    height: 54,
    display: "grid",
    placeItems: "center",
    borderRadius: 16,
    background: "#fff",
    border: "2px dashed var(--mist)",
    color: "var(--mist)",
  },
  qChipDone: {
    borderStyle: "solid",
    borderColor: "var(--grass)",
    color: "var(--grass)",
    background: "#f1faf2",
  },
  lineCard: {
    background: "#fff",
    borderRadius: 18,
    border: "2px solid var(--line)",
    padding: "12px 8px 14px",
    marginBottom: 16,
  },
  tickTxt: {
    fontSize: 11,
    fontFamily: "'Fredoka', system-ui, sans-serif",
    fill: "var(--ink)",
    fontWeight: 500,
  },
  arcTxt: {
    fontSize: 15,
    fontWeight: 700,
    fontFamily: "'Fredoka', system-ui, sans-serif",
    transition: "opacity .4s ease .2s",
  },
  showBtn: {
    display: "block",
    margin: "8px auto 0",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 15,
    fontWeight: 600,
    color: "var(--ink)",
    background: "var(--gold)",
    padding: "9px 18px",
    borderRadius: 999,
    boxShadow: "0 4px 0 #e0ae1f",
  },
  choose: { textAlign: "center", margin: "2px 0 10px", fontSize: 16, fontWeight: 600, color: "var(--ink)" },
  choices: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 8 },
  choice: {
    position: "relative",
    border: "2px solid var(--line)",
    background: "#fff",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 26,
    fontWeight: 700,
    color: "var(--ink)",
    padding: "14px 0",
    borderRadius: 16,
    minHeight: 56,
    boxShadow: "0 4px 0 rgba(0,0,0,.06)",
    transition: "transform .08s ease",
  },
  choiceCorrect: {
    background: "var(--grass)",
    borderColor: "var(--grass)",
    color: "#fff",
    boxShadow: "0 4px 0 #2f9b50",
  },
  choiceWrong: { background: "var(--apple-tint)", borderColor: "var(--apple)", color: "var(--apple)" },
  mark: { position: "absolute", top: 4, right: 8, fontSize: 14 },
  statusArea: {
    minHeight: 46,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    margin: "4px 0",
  },
  ok: { fontSize: 20, fontWeight: 700, color: "var(--grass)" },
  bad: { fontSize: 16, fontWeight: 600, color: "var(--apple)" },
  hint: { fontSize: 13, color: "var(--mist)", fontWeight: 500 },
  nextBtn: {
    display: "block",
    margin: "6px auto 0",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
    background: "var(--primary)",
    padding: "12px 26px",
    borderRadius: 999,
    boxShadow: "0 5px 0 var(--primary-press)",
  },
  confettiLayer: { position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" },
};
