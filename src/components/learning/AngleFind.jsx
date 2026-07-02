"use client";
import React, { useState } from "react";

/**
 * AngleFind — tap all angles of a given type (grades 1–4). Renders several
 * angles (two rays from a vertex) at different openings; the child taps every
 * angle whose type matches `target`. Right = 90°, acute < 90°, obtuse > 90°.
 *
 * Props: { angles:[{id, deg}], target:'right'|'acute'|'obtuse',
 *          lang='uz', embedded=false, onAttempt, onCorrect, onNext }
 */
const WORD = {
  uz: { right: "toʻgʻri", acute: "oʻtkir", obtuse: "oʻtmas" },
  ru: { right: "прямые", acute: "острые", obtuse: "тупые" },
  en: { right: "right", acute: "acute", obtuse: "obtuse" },
};
const STR = {
  uz: { instr: (w) => `Hamma ${w} burchaklarni bos!`, done: "Barakalla!", retry: "Bu boshqa burchak", next: "Yana" },
  ru: { instr: (w) => `Нажми на все ${w} углы!`, done: "Молодец!", retry: "Это другой угол", next: "Ещё" },
  en: { instr: (w) => `Tap all the ${w} angles!`, done: "Well done!", retry: "That's a different angle", next: "Again" },
};

const isType = (deg, target) => (target === "right" ? deg === 90 : target === "acute" ? deg < 90 : deg > 90);

export default function AngleFind({ angles = [], target = "right", lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const w = (WORD[lang] || WORD.uz)[target];
  const [found, setFound] = useState([]); // ids of correctly tapped angles
  const [shake, setShake] = useState(null);
  const targetIds = angles.filter((a) => isType(a.deg, target)).map((a) => a.id);
  const solved = targetIds.length > 0 && found.length === targetIds.length;

  function tap(a) {
    if (solved || found.includes(a.id)) return;
    const ok = isType(a.deg, target);
    if (typeof onAttempt === "function") onAttempt(ok, { id: a.id });
    if (ok) {
      const nf = [...found, a.id];
      setFound(nf);
      if (nf.length === targetIds.length && typeof onCorrect === "function") onCorrect();
    } else {
      setShake(a.id);
      setTimeout(() => setShake(null), 460);
    }
  }

  const V = [16, 74], LEN = 60; // vertex + ray length
  const ray = (deg) => [V[0] + LEN * Math.cos((deg * Math.PI) / 180), V[1] - LEN * Math.sin((deg * Math.PI) / 180)];

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr(w)}</p>
      <div style={S.grid}>
        {angles.map((a) => {
          const [ex, ey] = ray(a.deg);
          const on = found.includes(a.id);
          const col = on ? "#46c06a" : "#1f3a5f";
          return (
            <button
              key={a.id}
              onClick={() => tap(a)}
              disabled={solved}
              aria-label="angle"
              className={shake === a.id ? "afShake" : ""}
              style={{ ...S.cell, ...(on ? S.cellOk : {}) }}
            >
              <svg viewBox="0 0 95 90" width="84" height="80">
                <line x1={V[0]} y1={V[1]} x2={V[0] + LEN} y2={V[1]} stroke={col} strokeWidth="4" strokeLinecap="round" />
                <line x1={V[0]} y1={V[1]} x2={ex} y2={ey} stroke={col} strokeWidth="4" strokeLinecap="round" />
                {/* right-angle marker */}
                {a.deg === 90 && <rect x={V[0]} y={V[1] - 12} width="12" height="12" fill="none" stroke={col} strokeWidth="2" />}
                <circle cx={V[0]} cy={V[1]} r="3.5" fill={col} />
              </svg>
            </button>
          );
        })}
      </div>
      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : shake != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes afShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.afShake{animation:afShake .45s}`;
const S = {
  wrap: { maxWidth: 520, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 10px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  grid: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 },
  cell: { border: "2px solid #ece1c8", background: "#fff", borderRadius: 16, padding: 4, cursor: "pointer", boxShadow: "0 4px 0 rgba(0,0,0,.05)" },
  cellOk: { borderColor: "#46c06a", background: "#eefcf2", cursor: "default", boxShadow: "none" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "6px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" },
};
