"use client";
import React, { useState } from "react";

/**
 * PolygonPerimeter — "walk" a polygon's sides to build its perimeter (grades 1–4).
 * Tap each side once; its length adds to a running total. When every side is
 * tapped the perimeter is complete. Teaches perimeter = sum of all side lengths.
 *
 * Props: { sides:[n,…], unit='cm', lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - sides: 3–6 side lengths (numbers). A rectangle is [a,b,a,b], a square [a,a,a,a].
 */
const STRINGS = {
  uz: { instr: "Har bir tomonni bos — perimetr qoʻshilib boradi.", per: "Perimetr", done: "Barakalla!", next: "Yana" },
  ru: { instr: "Нажми на каждую сторону — периметр складывается.", per: "Периметр", done: "Молодец!", next: "Ещё" },
  en: { instr: "Tap each side — the perimeter adds up.", per: "Perimeter", done: "Well done!", next: "Again" },
};

export default function PolygonPerimeter({ sides = [3, 4, 5], unit = "cm", lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STRINGS[lang] || STRINGS.uz;
  const n = sides.length;
  const [tapped, setTapped] = useState([]); // side indices in tap order
  const sum = tapped.reduce((a, i) => a + sides[i], 0);
  const total = sides.reduce((a, b) => a + b, 0);
  const solved = tapped.length === n;

  const cx = 150, cy = 132, R = 96;
  const ang = (i) => (i / n) * 2 * Math.PI - Math.PI / 2 + (n === 4 ? Math.PI / 4 : 0);
  const pts = sides.map((_, i) => [cx + R * Math.cos(ang(i)), cy + R * Math.sin(ang(i))]);

  function tap(i) {
    if (tapped.includes(i) || solved) return;
    const nt = [...tapped, i];
    if (typeof onAttempt === "function") onAttempt(true, { side: i });
    setTapped(nt);
    if (nt.length === n && typeof onCorrect === "function") onCorrect();
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <svg viewBox="0 0 300 250" style={{ width: "100%", maxWidth: 320, display: "block", margin: "0 auto" }}>
        <polygon points={pts.map((p) => p.join(",")).join(" ")} fill="rgba(31,167,224,0.08)" stroke="none" />
        {sides.map((len, i) => {
          const [x1, y1] = pts[i];
          const [x2, y2] = pts[(i + 1) % n];
          const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
          // push label outward from center
          const lx = mx + (mx - cx) * 0.22, ly = my + (my - cy) * 0.22;
          const on = tapped.includes(i);
          return (
            <g key={i} onClick={() => tap(i)} style={{ cursor: solved ? "default" : "pointer" }}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="transparent" strokeWidth="20" />
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={on ? "#46c06a" : "#1f3a5f"} strokeWidth={on ? 6 : 4} strokeLinecap="round" className={on ? "ppPop" : ""} />
              <g>
                <circle cx={lx} cy={ly} r="13" fill={on ? "#46c06a" : "#fff"} stroke={on ? "#46c06a" : "#1f3a5f"} strokeWidth="2" />
                <text x={lx} y={ly + 4} textAnchor="middle" fontSize="12" fontWeight="800" fill={on ? "#fff" : "#1f3a5f"}>{len}</text>
              </g>
            </g>
          );
        })}
        {pts.map((p, i) => (
          <circle key={"v" + i} cx={p[0]} cy={p[1]} r="4" fill="#1f3a5f" />
        ))}
      </svg>

      <div style={S.readout}>
        <span style={{ ...S.perPill, ...(solved ? S.perOk : {}) }}>
          {t.per}: {sum}{tapped.length ? "" : ""} {unit}
        </span>
        {!solved && <span style={S.frac}>{tapped.length}/{n}</span>}
      </div>
      <div style={S.status} aria-live="polite">
        {solved && <span style={S.ok}>🎉 {t.done} {total} {unit}</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes ppPop{0%{stroke-width:10}100%{stroke-width:6}}.ppPop{animation:ppPop .3s}`;
const S = {
  wrap: { maxWidth: 480, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 4px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  readout: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 2 },
  perPill: { fontSize: 17, fontWeight: 800, background: "#fff", border: "2px solid #ece1c8", borderRadius: 999, padding: "5px 16px", color: "#1f3a5f" },
  perOk: { background: "#46c06a", borderColor: "#46c06a", color: "#fff" },
  frac: { fontSize: 14, fontWeight: 800, color: "#9aa0a6" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 6 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  next: { display: "block", margin: "6px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" },
};
