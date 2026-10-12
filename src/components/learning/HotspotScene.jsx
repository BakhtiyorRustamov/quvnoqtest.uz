"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

/**
 * HotspotScene — a simple room scene with objects placed around it; the child
 * taps the ones that match the task (e.g. "find the dangers"). Objects flagged
 * `danger` are the targets; tapping a safe object shakes. Wins when every target
 * is found. Spatial and open-ended — good for home-safety and "spot the X" tasks.
 *
 * Props: { spots: [{ id?, emoji, x, y, danger?, label? }], lang='uz',
 *          embedded=false, onAttempt, onCorrect, onNext }
 *   - x,y are percentages (0–100) inside the scene.
 *   - onAttempt(ok) on each tap; onCorrect() when all `danger` spots are found.
 */
const STR = {
  uz: { instr: "Xavfli narsalarni topib bos!", found: "topildi", safe: "Bu xavfsiz", done: "Barakalla! Hamma xavfni topding!", next: "Yana" },
  ru: { instr: "Найди и нажми опасные предметы!", found: "найдено", safe: "Это безопасно", done: "Молодец! Все опасности найдены!", next: "Ещё" },
  en: { instr: "Find and tap the dangerous things!", found: "found", safe: "This is safe", done: "Great! You found every danger!", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

export default function HotspotScene({ spots = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const list = useMemo(() => spots.map((s, i) => ({ ...s, _id: s.id ?? i })), [spots]);
  const dangerTotal = list.filter((s) => s.danger).length;
  const [found, setFound] = useState({}); // _id -> true (correct dangers)
  const [shake, setShake] = useState(null);
  const foundCount = Object.keys(found).length;
  const won = dangerTotal > 0 && foundCount === dangerTotal;
  const finished = useRef(false);

  // Advance the lesson (and trigger the shell's celebration) once every danger
  // is found — mirrors the onCorrect wiring in SortBins / MemoryMatch.
  useEffect(() => {
    if (!finished.current && won) {
      finished.current = true;
      if (typeof onCorrect === "function") onCorrect();
    }
  }, [won, onCorrect]);

  function tap(spot) {
    if (won || found[spot._id]) return;
    const ok = !!spot.danger;
    if (typeof onAttempt === "function") onAttempt(ok, { id: spot._id });
    if (ok) {
      setFound((f) => ({ ...f, [spot._id]: true }));
    } else {
      setShake(spot._id);
      setTimeout(() => setShake(null), 460);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr} <b style={{ color: "#e14b4b" }}>{foundCount}/{dangerTotal}</b></p>
      <div style={S.scene}>
        <span style={S.wall} aria-hidden />
        <span style={S.floor} aria-hidden />
        {list.map((s) => {
          const on = found[s._id];
          return (
            <button
              key={s._id}
              onClick={() => tap(s)}
              aria-label={L(s.label, lang) || undefined}
              className={shake === s._id ? "hsShake" : ""}
              style={{ ...S.spot, left: `${s.x}%`, top: `${s.y}%`, ...(on ? S.spotFound : {}) }}
            >
              <span aria-hidden>{s.emoji}</span>
              {on && <span style={S.ring} aria-hidden>✓</span>}
            </button>
          );
        })}
      </div>
      <div style={S.status} aria-live="polite">
        {won ? <span style={S.ok}>🎉 {t.done}</span> : shake != null ? <span style={S.safe}>{t.safe}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && won && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes hsShake{0%,100%{transform:translate(-50%,-50%)}25%{transform:translate(calc(-50% - 5px),-50%)}75%{transform:translate(calc(-50% + 5px),-50%)}}.hsShake{animation:hsShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important}}`;
const S = {
  wrap: { maxWidth: 520, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  scene: { position: "relative", width: "100%", aspectRatio: "3 / 2", borderRadius: 20, overflow: "hidden", border: "3px solid #d9e6c4", background: "#fdf6ea" },
  wall: { position: "absolute", inset: 0, background: "linear-gradient(#fdeec8, #f7e3b0)" },
  floor: { position: "absolute", left: 0, right: 0, bottom: 0, height: "28%", background: "#d9a86a" },
  spot: { position: "absolute", transform: "translate(-50%,-50%)", width: 52, height: 52, borderRadius: 14, border: "2px solid rgba(0,0,0,.08)", background: "rgba(255,255,255,.85)", cursor: "pointer", fontSize: 28, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 8px -3px rgba(0,0,0,.4)", zIndex: 2 },
  spotFound: { border: "3px solid #46c06a", background: "#eefcf2" },
  ring: { position: "absolute", top: -8, right: -8, width: 22, height: 22, borderRadius: 999, background: "#46c06a", color: "#fff", fontSize: 14, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  safe: { fontSize: 14, fontWeight: 700, color: "#2f9fe0" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
