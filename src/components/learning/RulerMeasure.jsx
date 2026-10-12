"use client";
import React, { useState } from "react";

/**
 * RulerMeasure — read a length off a ruler (grades 1–3). An object (pencil/ribbon)
 * lies along a centimetre ruler starting at 0; the child taps the cm mark where it
 * ends. Self-grading: the correct tick is `lengthCm`.
 *
 * Props: { lengthCm, maxCm=12, lang='uz', embedded=false, onAttempt, onCorrect, onNext }
 *   - lengthCm: the object's true length in cm (1..maxCm).
 *   - The unit is shown localized (uz "sm", ru "см", en "cm").
 */
const STRINGS = {
  uz: { instr: "Chizgʻichda oʻlcha: jism oxiri qaysi sonda tugaydi? Shu sonni bos.", unit: "cm", correct: "Barakalla!", retry: "Yana bir bor qara", next: "Yana" },
  ru: { instr: "Измерь по линейке: на каком числе кончается предмет? Нажми на него.", unit: "см", correct: "Молодец!", retry: "Посмотри ещё раз", next: "Ещё" },
  en: { instr: "Measure on the ruler: which number does the object end on? Tap it.", unit: "cm", correct: "Well done!", retry: "Look again", next: "Again" },
};

const PX = 32; // pixels per cm
const PAD = 22;
const RULER_TOP = 84;
const RULER_H = 42;

export default function RulerMeasure({ lengthCm = 5, maxCm = 12, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STRINGS[lang] || STRINGS.uz;
  const target = Math.max(1, Math.min(maxCm, lengthCm));
  const [solved, setSolved] = useState(false);
  const [shakeN, setShakeN] = useState(null);
  const W = PAD * 2 + maxCm * PX;
  const x = (cm) => PAD + cm * PX;

  function choose(n) {
    if (solved) return;
    const ok = n === target;
    if (typeof onAttempt === "function") onAttempt(ok, { picked: n, target });
    if (ok) {
      setSolved(true);
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setShakeN(n);
      setTimeout(() => setShakeN(null), 480);
    }
  }

  const ticks = [];
  for (let i = 0; i <= maxCm; i++) {
    ticks.push(i);
    if (i < maxCm) ticks.push(i + 0.5);
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <svg viewBox={`0 0 ${W} 150`} style={{ width: "100%", maxWidth: W, display: "block", margin: "0 auto" }} role="group">
        {/* object being measured (a pencil-like bar from 0 to lengthCm) */}
        <g>
          <rect x={x(0)} y={44} width={target * PX - 10} height={26} rx={7} fill="#f59c1e" stroke="#d97f12" strokeWidth="2" />
          <polygon
            points={`${x(target) - 12},44 ${x(target)},57 ${x(target) - 12},70`}
            fill="#caa23a"
            stroke="#a9842b"
            strokeWidth="1.5"
          />
        </g>

        {/* ruler body */}
        <rect x={PAD - 8} y={RULER_TOP} width={maxCm * PX + 16} height={RULER_H} rx={8} fill="#f6cf6b" stroke="#caa23a" strokeWidth="2.5" />

        {/* ticks + numbers */}
        {ticks.map((i) => {
          const isInt = Number.isInteger(i);
          const tx = x(i);
          return (
            <line key={`t${i}`} x1={tx} y1={RULER_TOP} x2={tx} y2={RULER_TOP + (isInt ? 18 : 9)} stroke="#6b561f" strokeWidth={isInt ? 2 : 1.3} />
          );
        })}

        {/* tappable number labels */}
        {Array.from({ length: maxCm + 1 }, (_, i) => i).map((i) => {
          const tx = x(i);
          const isAns = solved && i === target;
          return (
            <g key={`n${i}`} onClick={() => choose(i)} style={{ cursor: solved ? "default" : "pointer" }} className={shakeN === i ? "rmShake" : ""}>
              <rect x={tx - 13} y={RULER_TOP + 18} width={26} height={22} fill={isAns ? "#46c06a" : "transparent"} rx={6} />
              <text x={tx} y={RULER_TOP + 34} textAnchor="middle" fontSize="14" fontWeight="800" fill={isAns ? "#fff" : "#4a3c14"}>
                {i}
              </text>
            </g>
          );
        })}

        {/* solved marker: a flag at the endpoint */}
        {solved && (
          <g>
            <line x1={x(target)} y1={30} x2={x(target)} y2={RULER_TOP} stroke="#46c06a" strokeWidth="3" />
            <circle cx={x(target)} cy={30} r={9} fill="#46c06a" />
          </g>
        )}
      </svg>

      <div style={S.status} aria-live="polite">
        {solved ? (
          <span style={S.ok}>🎉 {t.correct} {target} {t.unit}</span>
        ) : shakeN != null ? (
          <span style={S.retry}>{t.retry}</span>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `
@keyframes rmShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}
.rmShake{animation:rmShake .4s}
`;
const S = {
  wrap: { maxWidth: 520, margin: "0 auto", padding: "8px 6px 6px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 8px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  status: { minHeight: 28, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 6 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" },
};
