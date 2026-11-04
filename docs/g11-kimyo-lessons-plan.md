# G11 Kimyo — board lessons plan

**Textbook:** "Umumiy kimyo", 11-sinf (Masharipov, Mutalibov, Murodov, Islomova; Gʻafur Gʻulom, 2018), 160 pages, one volume. 8 chapters (BOB), 33 topics (§). Every topic ends with "Mavzuga doir masalalar"; answers are on pp. 155–156.

**Source text:** the PDF has no text layer (text is vector outlines), so it was OCR'd (tesseract, Uzbek model, 220 dpi). OCR drops superscripts and mangles formulas (e.g. "1s? 2s?" for 1s² 2s²), so every formula and number is re-derived, not copied. Working text: scratchpad `km/all.txt` (one `=== p-NNN` marker per page).

## Format (same as fizika)
- `src/content/g11/board/kimyo-N.ts` exports `KIM_N: BoardLesson`; registered in `board/index.ts` under `kimyo: [...]` (array order = subject-page order; `n` is only an id).
- Topic lessons: `n` = topic number (1–33), `label` = '1'…'33', `section` = 'N-mavzu'. Hook → ≤ 6 board scenes → worked example → 3-point summary → 8 questions using varied widgets.
- Chapter revisions (user asked for them so numbering lines up with the book): `revision: true`, no steps, 4–5 questions, ids n 34–41, placed after the chapter's last topic, label = topic range (e.g. '1–4').
- Chapter groups: export `BOBk = { kicker: 'k-bob', title }` from the first lesson of each chapter.
- Chemistry notation on boards: subscripts ₀–₉ (H₂SO₄), charges with superscripts (Fe³⁺, SO₄²⁻), arrows → ⇄. Use ʻ (U+02BB) and ʼ.

## Chapters and lessons
| BOB | Title | Topics | Revision |
|---|---|---|---|
| 1 | Atom va molekulalar tuzilishi. Davriy qonun | 1–4 | n 34 (1–4) |
| 2 | Modda miqdori | 5–8 | n 35 (5–8) |
| 3 | Kuchli va kuchsiz elektrolitlar. Dissotsilanish. Gidroliz | 9–11 | n 36 (9–11) |
| 4 | Eritma | 12–21 | n 37 (12–21) |
| 5 | Reaksiya tezligi | 22–24 | n 38 (22–24) |
| 6 | Kimyoviy muvozanat | 25–27 | n 39 (25–27) |
| 7 | Oksidlanish-qaytarilish reaksiyalari | 28–30 | n 40 (28–30) |
| 8 | Elektroliz | 31–33 | n 41 (31–33) |

Total: 33 topic lessons + 8 revisions = 41.

## Sessions (8 lessons each, hourly reminder)
1. Topics 1–4 + revision 34, topics 5–7.
2. Topic 8 + revision 35, topics 9–11 + revision 36, topics 12–13.
3. Topics 14–21 + revision 37.
4. Topics 22–24 + revision 38, topics 25–27 + revision 39.
5. Topics 28–30 + revision 40, topics 31–33 + revision 41; final browser pass.

## Status
- 2026-10-24: book OCR'd, plan written.
- Session 1 done (2026-10-24): kimyo-1…7 and revision kimyo-34 (label 1–4) written, registered (`kimyo: [...]` in board/index.ts), type-checked and checked in the browser. New helper file `board/chem.ts`: `cells()` (orbital boxes with ↑↓ arrows, default size 6) and `block()` (labelled box). `BOB1` exported from kimyo-1.ts, `BOB2` from kimyo-5.ts.
- Session 2 done (2026-10-24): kimyo-8 (PV = nRT with P–V isotherm), revision kimyo-35 (5–8), kimyo-9…11 (electrolytes with conductivity rig drawing, dissociation degree and ionic equations, hydrolysis with pH scale and indicator table; `BOB3` from kimyo-9), revision kimyo-36 (9–11), kimyo-12…13 (solutions, solubility with KNO₃/NaCl solubility curves; `BOB4` from kimyo-12). Registered, type-checked, browser-checked (one table shortened).
- Session 3 done (2026-10-24): kimyo-14…21 (solubility problems with the 100 g water — S — (100+S) scheme and crystallisation on cooling; % concentration; % problems with water-reacting substances, gas/precipitate subtraction and mixing; ρ = m/V; molar; normal; % ⇄ M; % ⇄ N and M ⇄ N) and revision kimyo-37 (12–21). IV bob complete. Registered, type-checked, browser-checked.
- Session 4 done (2026-10-25): kimyo-22…24 (rate v = Δn/(V·Δt) with C–t curves, mass-action law, pressure/volume factor nᵃ⁺ᵇ, Vant-Goff, activation-energy profile with/without catalyst, enzymes; rate problems from grams; `BOB5` from kimyo-22), revision kimyo-38 (22–24), kimyo-25…27 (reversible/irreversible, forward/reverse rate curves meeting at equilibrium, K; Le-Shatelye with pressure table and the brown NO₂ ⇄ colourless N₂O₄ example; initial/consumed/equilibrium tables and K with unknown x; `BOB6` from kimyo-25), revision kimyo-39 (25–27). Registered, type-checked, browser-stepped at 660×900. Note: `ellipse` takes cx/cy; `list` has no size.
- Next: session 5 — topics 28–30 (redox, OCR line 6666+; `BOB7` from kimyo-28) + revision kimyo-40 (28–30), topics 31–33 (electrolysis, line 7312+; `BOB8` from kimyo-31) + revision kimyo-41 (31–33); then a final pass over all 41 lessons.

## Notes
- 1-mavzu: answer key gives 5)A for "l = 3 → max electrons" — correct is 14, which is not among the options (skipped). Worked example 3 says Zr is "in the 5th group" in one sentence and IV group in the next — correct: 5th period, IV B group (used).
- 2-mavzu: worked example 2 asks about Al, Mg, Si, P but answers with Na, Mg, Al, Si — correct order Mg > Al > Si > P (used).
- 3-mavzu: worked example 2 (⁵¹Cr) counts 24 + 24 + 27 = 78; the sum is 75, so neutrons are 36 % (option B), not 34,6 % (used corrected).
- 5-mavzu: text gives CO₂ as 22,27 % C — correct 27,27 % (used).
- 8-mavzu: worked example 2 in the OCR is "3 l 0,4 M" nitrous acid (reads as "370,4 Mli"); answer 3,612·10²¹ checks out. 11-mavzu: book says salts of a weak acid and weak base give a neutral medium — lesson says "≈ neutral" (it depends on the relative strengths).
- 20-mavzu: worked example 2 (1,5 M HNO₃, ρ = 1,26) gives 75 % in the book — correct is 7,5 % (used). 18-mavzu exercise 7 says "0,5 M HCl" for an NaCl solution (typo; treated as NaCl). 16-mavzu worked example 2 rounds 20,5/216 to 9,4 % (it is 9,49 %; lesson says ≈ 9,5 %).
- OCR reading tip: superscripts come out as "?", "!", "9", "“" (e.g. "1s? 2s? 2p9" = 1s² 2s² 2p⁶); "4" before a number is often "+"; "Y0"/"Yo" is "%"; "$"/"8"/"S" after a topic number is "§".
- 25-mavzu, worked example 1: the book says the reverse rate is twice the forward rate at equilibrium — wrong (rates are equal at equilibrium; K = k₁/k₂ = 2 is a ratio of rate constants). Lesson states it correctly.
- 27-mavzu, worked example 3 (4HCl + O₂, K = 1, [HCl] = 1, [Cl₂] = [H₂O] = 3): book gets [O₂] = 27; correct is 3²·3²/1⁴ = 81 (used).
