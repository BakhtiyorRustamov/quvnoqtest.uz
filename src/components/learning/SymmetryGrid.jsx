"use client";
import React, { useState } from "react";

/**
 * SymmetryGrid — complete the mirror image (grades 1–4). The left half of a
 * figure is shown coloured; the child taps the right-half cells that mirror it
 * across the vertical axis. Correct cells lock green; wrong cells shake. Done
 * when the right side perfectly mirrors the left.
 *
 * Props: { rows=5, cols=6, left:[[r,c],…], color='#1fa7e0',
 *          lang='uz', embedded=false, onAttempt, onCorrect, onNext }
 *   - cols must be even; the axis runs down the middle.
 *   - left: filled cells on the LEFT half (each c < cols/2).
 */
const STR = {
  uz: { instr: "Oʻng tomonni bos — shakl simmetrik boʻlsin.", done: "Barakalla! Shakl simmetrik!", retry: "Bu yer mos kelmadi", next: "Yana" },
  ru: { instr: "Нажми справа — сделай фигуру симметричной.", done: "Молодец! Фигура симметрична!", retry: "Эта клетка не подходит", next: "Ещё" },
  en: { instr: "Tap the right side — make the figure symmetric.", done: "Great! It's symmetric!", retry: "That cell doesn't match", next: "Again" },
};

export default function SymmetryGrid({ rows = 5, cols = 6, left = [], color = "#1fa7e0", lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const mid = cols / 2;
  const leftSet = new Set(left.map(([r, c]) => `${r},${c}`));
  const targetRight = new Set(left.map(([r, c]) => `${r},${cols - 1 - c}`));
  const [filled, setFilled] = useState(() => new Set());
  const [shake, setShake] = useState(null);
  const solved = targetRight.size > 0 && filled.size === targetRight.size;

  function tap(r, c) {
    if (solved || c < mid) return;
    const key = `${r},${c}`;
    if (filled.has(key)) return;
    const ok = targetRight.has(key);
    if (typeof onAttempt === "function") onAttempt(ok, { r, c });
    if (ok) {
      const nf = new Set(filled);
      nf.add(key);
      setFilled(nf);
      if (nf.size === targetRight.size && typeof onCorrect === "function") onCorrect();
    } else {
      setShake(key);
      setTimeout(() => setShake(null), 440);
    }
  }

  const CELL = 30, GAP = 3;
  const W = cols * CELL + (cols - 1) * GAP;

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={{ position: "relative", width: W, margin: "0 auto" }}>
        {/* mirror axis */}
        <div style={{ position: "absolute", left: mid * CELL + (mid - 0.5) * GAP, top: -4, bottom: -4, width: 0, borderLeft: "2px dashed #f39a1f" }} />
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, ${CELL}px)`, gap: GAP }}>
          {Array.from({ length: rows * cols }, (_, i) => {
            const r = Math.floor(i / cols), c = i % cols;
            const key = `${r},${c}`;
            const isLeft = c < mid;
            const leftOn = isLeft && leftSet.has(key);
            const rightOn = !isLeft && filled.has(key);
            const bg = leftOn ? color : rightOn ? "#46c06a" : "#fff";
            const tappable = !isLeft && !solved && !rightOn;
            return (
              <button
                key={i}
                onClick={() => tap(r, c)}
                disabled={!tappable}
                aria-label="cell"
                className={shake === key ? "sgShake" : ""}
                style={{ width: CELL, height: CELL, borderRadius: 6, border: "1.5px solid #e4dcc4", background: bg, cursor: tappable ? "pointer" : "default", padding: 0 }}
              />
            );
          })}
        </div>
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

const CSS = `@keyframes sgShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}.sgShake{animation:sgShake .42s}`;
const S = {
  wrap: { maxWidth: 480, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "6px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" },
};
