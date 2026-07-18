"use client";
import React, { useMemo, useState } from "react";

/**
 * StorySequence — "voqealar ketma-ketligini aniqlang". Event cards from a story
 * are shown SCRAMBLED; the child taps them in the order the events actually
 * happened. Each correct tap stamps the next number (1, 2, 3 …) on the card and
 * turns it green; a wrong tap shakes. It checks whether the child followed the
 * plot, not just recognised words. Self-grading.
 *
 * Props: {
 *   events: [{ text: string|{uz,ru,en} }],  // IN CORRECT chronological order
 *   clue?: {uz,ru,en}, emoji?,
 *   lang='uz', embedded=false, onAttempt, onCorrect, onNext
 * }
 */
const STR = {
  uz: { instr: "Voqealarni roʻy bergan tartibida bosing", done: "Barakalla! 🎉", retry: "Bu voqea keyinroq boʻlgan", next: "Yana" },
  ru: { instr: "Нажимай события в порядке, как они произошли", done: "Молодец! 🎉", retry: "Это событие было позже", next: "Ещё" },
  en: { instr: "Tap the events in the order they happened", done: "Great! 🎉", retry: "That one comes later", next: "Again" }
};
const DEMO = {
  events: [
    { text: { uz: "Podsho vazirlaridan eng kuchli narsa nima deb soʻrabdi.", ru: "Царь спросил визирей, что самое сильное.", en: "The king asked his viziers what is the most powerful thing." } },
    { text: { uz: "Vazirlar turlicha javob berishibdi.", ru: "Визири ответили по-разному.", en: "The viziers gave different answers." } },
    { text: { uz: "Podshoga hech qaysi javob yoqmabdi.", ru: "Царю не понравился ни один ответ.", en: "The king liked none of the answers." } },
    { text: { uz: "Dono kishi «Eng kuchlisi — kitob» debdi.", ru: "Мудрец сказал: «Самое сильное — книга».", en: "A wise man said, “The most powerful thing is a book.”" } }
  ]
};

function pickL(v, lang) {
  return v == null ? "" : typeof v === "string" ? v : v[lang] ?? v.uz ?? "";
}
function shuffle(a) {
  const x = a.map((v) => ({ ...v, _r: Math.random() }));
  return x.sort((p, q) => p._r - q._r);
}

export default function StorySequence({ events, clue, emoji, lang = "uz", embedded = false, onAttempt, onCorrect, onNext }) {
  const t = STR[lang] || STR.uz;
  if (!events || !events.length) events = DEMO.events;
  const n = events.length;
  const cards = useMemo(() => shuffle(events.map((e, i) => ({ ...e, i }))), [events]);
  const [placed, setPlaced] = useState({}); // {originalIndex: orderNumber}
  const [shake, setShake] = useState(null);
  const count = Object.keys(placed).length;
  const solved = count >= n;
  const clueText = pickL(clue, lang);

  function tap(card) {
    if (solved || placed[card.i] != null) return;
    const ok = card.i === count;
    if (typeof onAttempt === "function") onAttempt(ok, { at: card.i });
    if (ok) {
      const np = { ...placed, [card.i]: count + 1 };
      setPlaced(np);
      if (Object.keys(np).length >= n && typeof onCorrect === "function") onCorrect();
    } else {
      setShake(card.i);
      setTimeout(() => setShake(null), 420);
    }
  }

  return (
    <div style={S.wrap}>
      <style>{CSS}</style>
      {(clueText || emoji) && (
        <div style={S.clue}>
          {emoji && <span style={{ fontSize: 24 }}>{emoji}</span>}
          {clueText && <span>{clueText}</span>}
        </div>
      )}
      <p style={S.instr}>{t.instr}</p>

      <div style={S.list}>
        {cards.map((card) => {
          const num = placed[card.i];
          const on = num != null;
          return (
            <button
              key={card.i}
              onClick={() => tap(card)}
              disabled={solved || on}
              className={shake === card.i ? "ssShake" : ""}
              style={{ ...S.card, ...(on ? S.on : {}), cursor: solved || on ? "default" : "pointer" }}
            >
              <span style={{ ...S.badge, ...(on ? S.badgeOn : {}) }}>{on ? num : "•"}</span>
              <span style={S.txt}>{pickL(card.text, lang)}</span>
            </button>
          );
        })}
      </div>

      <div style={S.status} aria-live="polite">
        {solved ? <span style={S.ok}>{t.done}</span> : shake != null ? <span style={S.retry}>{t.retry}</span> : <span>&nbsp;</span>}
      </div>

      {!embedded && solved && (
        <button onClick={() => typeof onNext === "function" && onNext()} style={S.next}>{t.next} →</button>
      )}
    </div>
  );
}

const CSS = `@keyframes ssShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}.ssShake{animation:ssShake .42s}`;
const S = {
  wrap: { maxWidth: 560, margin: "0 auto", padding: "6px 6px 8px", fontFamily: "inherit", color: "#33302b" },
  clue: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: "#5a2d82" },
  instr: { textAlign: "center", margin: "0 0 12px", fontSize: 14, fontWeight: 700, color: "#9aa0a6" },
  list: { display: "flex", flexDirection: "column", gap: 10 },
  card: { display: "flex", alignItems: "center", gap: 12, textAlign: "left", padding: "12px 14px", borderRadius: 14, border: "2px solid #ece1c8", background: "#fff", color: "#1f3a5f", fontFamily: "inherit", fontSize: 15.5, fontWeight: 700, boxShadow: "0 4px 0 rgba(0,0,0,.06)", lineHeight: 1.4 },
  on: { border: "2px solid #46c06a", background: "#eefcf2", color: "#2f9e54", boxShadow: "0 4px 0 rgba(70,192,106,.25)" },
  badge: { flexShrink: 0, width: 30, height: 30, borderRadius: 999, background: "#e9edf5", color: "#8a93a3", display: "grid", placeItems: "center", fontSize: 15, fontWeight: 900 },
  badgeOn: { background: "#2f9e54", color: "#fff" },
  txt: { flex: 1 },
  status: { minHeight: 26, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 14 },
  ok: { fontSize: 16, fontWeight: 800, color: "#46c06a" },
  retry: { fontSize: 14, fontWeight: 700, color: "#e8553e" },
  next: { display: "block", margin: "8px auto 0", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: 800, color: "#fff", background: "#ff7a4d", padding: "9px 22px", borderRadius: 999, boxShadow: "0 5px 0 #ef663a" }
};
