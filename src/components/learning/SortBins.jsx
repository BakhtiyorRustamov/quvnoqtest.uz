"use client";
import React, { useMemo, useRef, useState, useEffect } from "react";

/**
 * SortBins — tap a picture, then tap the bin it belongs to. A tap-to-place
 * classifier (no dragging, so it's rock-solid on phones). Perfect for the
 * natural-science "sort into groups" tasks: living / non-living, natural /
 * man-made, wild / domestic animals, sort objects by material, etc.
 *
 * Props: { items: [{ id?, emoji, label?, bin }], bins: [{ id, label, color? }],
 *          lang='uz', embedded=false, onAttempt, onCorrect, onNext }
 *   - each item.bin must equal one bins[].id.
 *   - onAttempt(ok) fires on each placement; onCorrect() when every card is in
 *     its correct bin.
 */
const STR = {
  uz: { instr: "Avval rasmni, keyin uning qutisini bos!", done: "Barakalla! Hammasi joyida!", retry: "Boshqa quti — yana urin", next: "Yana" },
  ru: { instr: "Сначала картинку, потом её ящик!", done: "Молодец! Всё на месте!", retry: "Другой ящик — попробуй ещё", next: "Ещё" },
  en: { instr: "Tap a picture, then tap its box!", done: "Great! All sorted!", retry: "Wrong box — try again", next: "Again" },
};
const BIN_COLORS = ["#46c06a", "#2f9fe0", "#f39a1f", "#d63384"];
const L = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.uz ?? "" : v ?? "");

function shuffle(a) {
  const x = a.map((v, i) => ({ ...v, _id: v.id ?? i }));
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

export default function SortBins({ items = [], bins = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const cards = useMemo(() => shuffle(items), [items]);
  const [placed, setPlaced] = useState({}); // _id -> binId (correct only)
  const [sel, setSel] = useState(null); // selected card _id
  const [shakeBin, setShakeBin] = useState(null);
  const finished = useRef(false);
  const tray = cards.filter((c) => !placed[c._id]);
  const solved = cards.length > 0 && Object.keys(placed).length === cards.length;

  useEffect(() => {
    if (!finished.current && solved) {
      finished.current = true;
      if (typeof onCorrect === "function") onCorrect();
    }
  }, [solved, onCorrect]);

  function pickCard(id) {
    if (solved) return;
    setSel((s) => (s === id ? null : id));
  }
  function dropInto(binId) {
    if (solved || sel == null) return;
    const card = cards.find((c) => c._id === sel);
    if (!card) return;
    const ok = card.bin === binId;
    if (typeof onAttempt === "function") onAttempt(ok, { id: sel, bin: binId });
    if (ok) {
      setPlaced((p) => ({ ...p, [sel]: binId }));
      setSel(null);
    } else {
      setShakeBin(binId);
      setTimeout(() => setShakeBin(null), 460);
    }
  }
  const binColor = (i) => bins[i]?.color || BIN_COLORS[i % BIN_COLORS.length];

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>

      {/* tray */}
      <div style={S.tray}>
        {tray.length === 0 ? (
          <span style={{ fontSize: 30 }} aria-hidden>🎉</span>
        ) : (
          tray.map((c) => {
            const on = sel === c._id;
            const cap = L(c.label, lang);
            return (
              <button
                key={c._id}
                onClick={() => pickCard(c._id)}
                aria-label={cap || undefined}
                aria-pressed={on}
                style={{ ...S.card, ...(on ? S.cardSel : {}) }}
              >
                <span style={S.emoji} aria-hidden>{c.emoji}</span>
                {cap && <span style={S.cap}>{cap}</span>}
              </button>
            );
          })
        )}
      </div>

      {/* bins */}
      <div style={{ ...S.bins, gridTemplateColumns: `repeat(${Math.min(bins.length, 3)}, 1fr)` }}>
        {bins.map((b, i) => {
          const color = binColor(i);
          const inside = cards.filter((c) => placed[c._id] === b.id);
          return (
            <button
              key={b.id}
              onClick={() => dropInto(b.id)}
              aria-label={L(b.label, lang)}
              className={shakeBin === b.id ? "sbShake" : ""}
              style={{ ...S.bin, borderColor: color, ...(sel != null ? S.binReady : {}) }}
            >
              <span style={{ ...S.binTag, background: color }}>{L(b.label, lang)}</span>
              <span style={S.binGrid}>
                {inside.map((c) => (
                  <span key={c._id} style={S.chip} aria-hidden>{c.emoji}</span>
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>🎉 {t.done}</span> : shakeBin != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes sbShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.sbShake{animation:sbShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 580, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  tray: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, minHeight: 96 },
  card: { position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, minWidth: 84, minHeight: 88, padding: "8px 10px", borderRadius: 18, border: "3px solid #d9e6c4", background: "#fff", cursor: "pointer", boxShadow: "0 4px 0 rgba(80,90,40,.10)", transition: "transform .1s, border-color .15s" },
  cardSel: { border: "3px solid #2f9fe0", background: "#eef7fd", boxShadow: "0 0 0 3px rgba(47,159,224,.22), 0 4px 0 rgba(47,159,224,.25)", transform: "translateY(-3px)" },
  emoji: { fontSize: 38, lineHeight: 1 },
  cap: { fontSize: 12.5, fontWeight: 800, color: "#3c5a1e", textAlign: "center" },
  bins: { display: "grid", gap: 12, marginTop: 18 },
  bin: { position: "relative", cursor: "pointer", minHeight: 120, padding: "26px 8px 10px", borderRadius: 20, border: "3px dashed #ccc", background: "#fff", display: "flex", flexWrap: "wrap", alignContent: "flex-start", justifyContent: "center", gap: 6, transition: "transform .1s" },
  binReady: { transform: "translateY(-2px)", boxShadow: "0 6px 16px -8px rgba(0,0,0,.3)" },
  binTag: { position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", padding: "4px 14px", borderRadius: 999, color: "#fff", fontSize: 14, fontWeight: 900, whiteSpace: "nowrap", boxShadow: "0 3px 8px -3px rgba(0,0,0,.4)" },
  binGrid: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6 },
  chip: { fontSize: 32, lineHeight: 1 },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 17, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
