"use client";
import React, { useMemo, useState } from "react";

/**
 * LabelDiagram — label the parts of a plant. An inline SVG plant is drawn with
 * five anchor points (flower, leaf, fruit, stem, root); the child taps a label
 * chip, then taps the matching part of the plant. Correct labels lock onto the
 * plant in colour. Data-driven: `parts` supplies which anchors to use and their
 * localized captions, so the same SVG serves many label tasks.
 *
 * Props: { parts: [{ id, label }], lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - id ∈ {flower, leaf, fruit, stem, root}; label is string | {uz,ru,en}.
 */
const STR = {
  uz: { instr: "Nomni bos, keyin oʻsimlikning shu qismini bos!", done: "Barakalla! Hammasi joyida!", retry: "Bu boshqa qism", pick: "Avval nomni tanla", next: "Yana" },
  ru: { instr: "Нажми название, затем эту часть растения!", done: "Молодец! Всё верно!", retry: "Это другая часть", pick: "Сначала выбери название", next: "Ещё" },
  en: { instr: "Tap a name, then tap that part of the plant!", done: "Great! All labeled!", retry: "That's another part", pick: "Pick a name first", next: "Again" },
};
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");
const COLORS = { flower: "#e05aa0", leaf: "#46c06a", fruit: "#e8553e", stem: "#7bbf3a", root: "#a9743e" };
// anchor pixel positions inside the 260×380 viewBox
const ANCHOR = {
  flower: { x: 120, y: 62 },
  leaf: { x: 196, y: 150 },
  fruit: { x: 62, y: 196 },
  stem: { x: 138, y: 250 },
  root: { x: 120, y: 340 },
};

function shuffle(a) {
  const x = a.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function LabelDiagram({ parts = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const used = parts.filter((p) => ANCHOR[p.id]);
  const chips = useMemo(() => shuffle(used.map((p) => p.id)), [used.length]);
  const [sel, setSel] = useState(null);
  const [matched, setMatched] = useState({}); // id -> true
  const [shakeId, setShakeId] = useState(null);
  const [nudge, setNudge] = useState(false);
  const doneN = Object.keys(matched).length;
  const won = used.length > 0 && doneN === used.length;
  const labelOf = (id) => L(used.find((p) => p.id === id)?.label, lang);

  function pickChip(id) {
    if (won || matched[id]) return;
    setSel((s) => (s === id ? null : id));
    setNudge(false);
  }
  function tapAnchor(id) {
    if (won || matched[id]) return;
    if (sel == null) {
      setNudge(true);
      return;
    }
    const ok = sel === id;
    if (typeof onAttempt === "function") onAttempt(ok, { part: id });
    if (ok) {
      const nm = { ...matched, [id]: true };
      setMatched(nm);
      setSel(null);
      if (Object.keys(nm).length === used.length && typeof onCorrect === "function") onCorrect();
    } else {
      setShakeId(id);
      setTimeout(() => setShakeId(null), 460);
    }
  }

  const pct = (id) => ({ left: `${(ANCHOR[id].x / 260) * 100}%`, top: `${(ANCHOR[id].y / 380) * 100}%` });

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{nudge ? t.pick : t.instr}</p>

      <div style={S.stage}>
        <svg viewBox="0 0 260 380" style={S.svg} aria-hidden>
          {/* soil */}
          <rect x="0" y="300" width="260" height="80" fill="#e7d8bf" />
          <rect x="0" y="300" width="260" height="8" fill="#cbb896" />
          {/* root */}
          <path d="M120 300 L120 356 M120 320 L96 352 M120 322 L146 350 M120 336 L108 360 M120 336 L134 360" stroke="#a9743e" strokeWidth="4" fill="none" strokeLinecap="round" />
          {/* stem */}
          <path d="M120 300 C118 240 122 180 120 96" stroke="#7bbf3a" strokeWidth="7" fill="none" strokeLinecap="round" />
          {/* leaves */}
          <path d="M122 168 C150 150 186 150 202 138 C182 168 150 182 124 178 Z" fill="#59b23c" />
          <path d="M118 205 C92 190 60 192 44 182 C64 210 96 222 120 214 Z" fill="#4aa233" />
          {/* fruit (pepper) */}
          <path d="M62 188 C50 188 44 200 48 214 C52 230 74 234 80 218 C86 202 76 188 62 188 Z" fill="#e8553e" />
          <rect x="60" y="182" width="6" height="10" rx="2" fill="#3f8f2e" />
          {/* flower */}
          <g>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx={120 + 15 * Math.cos((a * Math.PI) / 180)} cy={62 + 15 * Math.sin((a * Math.PI) / 180)} rx="9" ry="6" fill="#fff" stroke="#e6e0cf" transform={`rotate(${a} ${120 + 15 * Math.cos((a * Math.PI) / 180)} ${62 + 15 * Math.sin((a * Math.PI) / 180)})`} />
            ))}
            <circle cx="120" cy="62" r="7" fill="#f4c430" />
          </g>
        </svg>

        {/* anchor dots + locked captions */}
        {used.map((p) => {
          const on = matched[p.id];
          return (
            <button
              key={p.id}
              onClick={() => tapAnchor(p.id)}
              disabled={on}
              aria-label={labelOf(p.id)}
              className={shakeId === p.id ? "ldShake" : ""}
              style={{ ...S.dot, ...pct(p.id), ...(on ? { ...S.dotOn, borderColor: COLORS[p.id] } : {}) }}
            >
              {on ? (
                <span style={{ ...S.pin, background: COLORS[p.id] }}>{labelOf(p.id)}</span>
              ) : (
                <span style={S.q} aria-hidden>?</span>
              )}
            </button>
          );
        })}
      </div>

      {/* label chips */}
      <div style={S.tray}>
        {chips.map((id) =>
          matched[id] ? null : (
            <button
              key={id}
              onClick={() => pickChip(id)}
              aria-pressed={sel === id}
              style={{ ...S.chip, ...(sel === id ? { ...S.chipSel, borderColor: COLORS[id], color: COLORS[id] } : {}) }}
            >
              {labelOf(id)}
            </button>
          )
        )}
        {won && <span style={{ fontSize: 26 }} aria-hidden>🎉</span>}
      </div>

      <div style={S.status} aria-live="polite">
        {won ? <span style={S.ok}>🎉 {t.done}</span> : shakeId != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && won && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes ldShake{0%,100%{transform:translate(-50%,-50%)}25%{transform:translate(calc(-50% - 5px),-50%)}75%{transform:translate(calc(-50% + 5px),-50%)}}.ldShake{animation:ldShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 460, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  stage: { position: "relative", width: "min(300px, 86vw)", margin: "0 auto", aspectRatio: "260 / 380", borderRadius: 22, background: "linear-gradient(#eaf6ff, #f4fbe9)", border: "3px solid #d9e6c4", overflow: "hidden" },
  svg: { position: "absolute", inset: 0, width: "100%", height: "100%" },
  dot: { position: "absolute", transform: "translate(-50%,-50%)", minWidth: 30, height: 30, padding: 0, borderRadius: 999, border: "3px solid #2f9fe0", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 8px -3px rgba(0,0,0,.4)", zIndex: 2 },
  dotOn: { background: "#fff", cursor: "default", padding: "0 2px", width: "auto" },
  q: { fontSize: 16, fontWeight: 900, color: "#2f9fe0" },
  pin: { display: "inline-block", padding: "3px 9px", borderRadius: 999, color: "#fff", fontSize: 13, fontWeight: 900, whiteSpace: "nowrap" },
  tray: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 16, minHeight: 44 },
  chip: { padding: "10px 16px", borderRadius: 14, border: "3px solid #d9e6c4", background: "#fff", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#3c5a1e", boxShadow: "0 4px 0 rgba(80,90,40,.10)" },
  chipSel: { background: "#eef7fd", boxShadow: "0 0 0 3px rgba(47,159,224,.2), 0 4px 0 rgba(47,159,224,.2)", transform: "translateY(-2px)" },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 12 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
