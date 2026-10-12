"use client";
import React, { useMemo, useState } from "react";

/**
 * CapitalPick — tap the words that must start with a CAPITAL letter (bosh harf):
 * people's names and place names (proper nouns). The Alifbe primer asks "why are
 * Chimyon, Chirchiq… written with a capital?"; this widget turns that into a
 * choice: common nouns (fil, choy) stay lower-case, proper nouns get a capital.
 * A first grammar rule, taught by sorting words.
 *
 * Props: { words: [{ word, capital? }], lang='uz', embedded=false,
 *          onAttempt, onCorrect, onNext }
 *   - words are shown in lower case; capital:true marks the ones that need a
 *     capital. On solve they are revealed capitalised.
 *   - onAttempt(ok) fires on Check; onCorrect() when the picked set is exact.
 */
const STR = {
  uz: { instr: "Bosh harf bilan yoziladigan soʻzlarni belgila!", check: "Tekshirish", done: "Barakalla! Ism va joy nomlari bosh harf bilan!", retry: "Yana bir bor oʻyla", next: "Yana" },
  ru: { instr: "Отметь слова, которые пишутся с заглавной буквы!", check: "Проверить", done: "Молодец! Имена и названия — с заглавной!", retry: "Подумай ещё раз", next: "Ещё" },
  en: { instr: "Tap the words that need a CAPITAL letter!", check: "Check", done: "Great! Names and places take a capital!", retry: "Think once more", next: "Again" },
};
const cap = (w) => (w ? w.charAt(0).toLocaleUpperCase("en") + w.slice(1) : w);

function shuffle(a) {
  const x = a.map((v, i) => ({ ...v, _id: i }));
  for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; }
  return x;
}

export default function CapitalPick({ words = [], lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  const cards = useMemo(() => shuffle(words), [words]);
  const [picked, setPicked] = useState({});
  const [status, setStatus] = useState("idle"); // idle | wrong | correct
  const solved = status === "correct";

  function toggle(id) { if (solved) return; setStatus("idle"); setPicked((p) => ({ ...p, [id]: !p[id] })); }
  function check() {
    if (solved) return;
    const ok = cards.every((c) => !!picked[c._id] === !!c.capital);
    if (typeof onAttempt === "function") onAttempt(ok, {});
    if (ok) { setStatus("correct"); if (typeof onCorrect === "function") onCorrect(); }
    else { setStatus("wrong"); setTimeout(() => setStatus((s) => (s === "wrong" ? "idle" : s)), 900); }
  }
  const any = Object.values(picked).some(Boolean);

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      <p style={S.instr}>{t.instr}</p>
      <div style={S.grid}>
        {cards.map((c) => {
          const on = !!picked[c._id];
          const showRight = solved && c.capital;
          const text = (solved && c.capital) ? cap(c.word) : c.word;
          return (
            <button key={c._id} onClick={() => toggle(c._id)} disabled={solved} aria-pressed={on}
              className={status === "wrong" && on && !c.capital ? "cpShake" : ""}
              style={{ ...S.tile, ...(on ? S.sel : {}), ...(showRight ? S.ok : {}), cursor: solved ? "default" : "pointer" }}>
              {text}
              {solved && c.capital && <span style={S.badge} aria-hidden> ⬆</span>}
            </button>
          );
        })}
      </div>
      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.okMsg}>🎉 {t.done}</span> : status === "wrong" ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>
      {!solved && <button onClick={check} disabled={!any} style={{ ...S.check, ...(any ? {} : S.off) }}>{t.check}</button>}
      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes cpShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}.cpShake{animation:cpShake .44s}
button:focus-visible{outline:3px solid #2f9fe0;outline-offset:2px}
@media (prefers-reduced-motion: reduce){*{animation:none!important;transition:none!important}}`;
const S = {
  wrap: { maxWidth: 520, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b", textAlign: "center" },
  instr: { margin: "0 0 14px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  grid: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 },
  tile: { position: "relative", minWidth: 100, padding: "13px 18px", borderRadius: 14, border: "3px solid #d9e6c4", background: "#fff", fontFamily: "inherit", fontSize: 19, fontWeight: 800, color: "#33302b", boxShadow: "0 5px 0 rgba(80,90,40,.10)" },
  sel: { border: "3px solid #2f9fe0", background: "#eef7fd", boxShadow: "0 5px 0 rgba(47,159,224,.25)", transform: "translateY(-2px)" },
  ok: { border: "3px solid #46c06a", background: "#eefcf2", boxShadow: "0 5px 0 rgba(70,192,106,.28)" },
  badge: { color: "#2f9e54", fontWeight: 900 },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  okMsg: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  check: { display: "block", margin: "4px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: 800, color: "#fff", background: "#2f9fe0", padding: "11px 26px", borderRadius: 999, boxShadow: "0 5px 0 #2178b0" },
  off: { opacity: 0.5, cursor: "not-allowed", boxShadow: "0 5px 0 rgba(0,0,0,.12)" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#5aa02a", padding: "10px 24px", borderRadius: 999, boxShadow: "0 5px 0 #47801f" },
};
