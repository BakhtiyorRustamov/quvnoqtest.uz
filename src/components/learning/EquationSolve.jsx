"use client";
import React, { useMemo, useState } from "react";

/**
 * EquationSolve — find the unknown (grades 1–4). Shows an equation with one
 * unknown (e.g. "70 + x = 75"); the child taps the number tile that makes it
 * true. The unknown box fills green when correct; wrong tiles shake.
 *
 * Props: { equation:"70 + x = 75", answer:5, choices:[5,6,4], unknown:"x",
 *          lang='uz', embedded=false, onAttempt, onCorrect, onNext }
 *   - equation: the full statement; the FIRST occurrence of `unknown` becomes
 *     the answer box. Operators may be + − ×; any digits are fine.
 */
const STR = {
  uz: { instr: "Nomaʼlum sonni top — tenglik toʻgʻri boʻlsin.", done: "Barakalla! Tenglik toʻgʻri!", retry: "Bu son toʻgʻri kelmadi", next: "Yana" },
  ru: { instr: "Найди неизвестное — сделай равенство верным.", done: "Молодец! Равенство верно!", retry: "Это число не подходит", next: "Ещё" },
  en: { instr: "Find the unknown — make the equation true.", done: "Great! The equation is true!", retry: "That number doesn't fit", next: "Again" },
};

function shuffle(a) {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function EquationSolve({ equation = "", answer = 0, choices = [], unknown = "x", lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const idx = equation.indexOf(unknown);
  const before = idx >= 0 ? equation.slice(0, idx) : equation + " ";
  const after = idx >= 0 ? equation.slice(idx + unknown.length) : "";
  const tiles = useMemo(() => shuffle(choices), [equation]);
  const [picked, setPicked] = useState(null);
  const [shake, setShake] = useState(null);
  const solved = picked !== null && Number(picked) === Number(answer);

  function tap(v) {
    if (solved) return;
    const ok = Number(v) === Number(answer);
    if (typeof onAttempt === "function") onAttempt(ok, { value: v });
    if (ok) {
      setPicked(v);
      if (typeof onCorrect === "function") onCorrect();
    } else {
      setShake(v);
      setTimeout(() => setShake(null), 440);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={S.eq}>
        <span>{before}</span>
        <span style={{ ...S.box, ...(solved ? S.boxOk : {}) }}>{solved ? picked : unknown}</span>
        <span>{after}</span>
      </div>
      <div style={S.tiles}>
        {tiles.map((v, i) => {
          const used = solved && Number(v) === Number(answer);
          return (
            <button
              key={i}
              onClick={() => tap(v)}
              disabled={solved}
              className={shake === v ? "esShake" : ""}
              style={{ ...S.tile, ...(used ? S.tileOk : {}), cursor: solved ? "default" : "pointer" }}
            >
              {v}
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

const CSS = `@keyframes esShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.esShake{animation:esShake .42s}`;
const S = {
  wrap: { maxWidth: 480, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  eq: { display: "flex", alignItems: "center", justifyContent: "center", gap: 4, fontSize: 30, fontWeight: 800, color: "#1f3a5f", whiteSpace: "pre" },
  box: { display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 46, height: 46, borderRadius: 12, border: "3px dashed #f39a1f", color: "#f39a1f", background: "#fff7e9", margin: "0 4px" },
  boxOk: { borderStyle: "solid", borderColor: "#46c06a", color: "#fff", background: "#46c06a" },
  tiles: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 18 },
  tile: { minWidth: 56, height: 56, borderRadius: 14, border: "2px solid #ece1c8", background: "#fff", fontFamily: "inherit", fontSize: 22, fontWeight: 800, color: "#1f3a5f", boxShadow: "0 4px 0 rgba(0,0,0,.06)" },
  tileOk: { borderColor: "#46c06a", background: "#eefcf2", color: "#2f9e54", boxShadow: "none" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "6px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" },
};
