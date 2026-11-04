# 11-sinf Fizika — board lessons plan

Source: *Fizika 11* (N. Sh. Turdiyev, K. A. Tursunmetov, A. G. Ganiyev, K. T. Suyarov, J. E. Usarov, A. K. Avliyoqulov), "Niso Poligraf", 2018 — one volume, 192 pages, 7 chapters, 45 topics.
Lesson shape (same as matematika): everyday hook → board scenes (≤ 6) → worked example → summary → 7–10 interactive questions (grade-11 + grade-1 widgets).

## Structure
- One lesson per textbook topic (1–45), `label` = topic number, titles paraphrased, same order as the book.
- Chapter revision lessons: only the two already built (I bob "1–6" = fizika-7, II bob "7–10" = fizika-12) are kept. Decision 2026-10-24 (Baxtiyor): no revision lessons for chapters III–VII. The book's Mashq problems and chapter tests are used inside the topic lessons' questions instead.
- Lab works (topics 19, 26, 31) become board lessons that walk through the experiment with sample measurements and calculation questions.
- Subject page: one collapsible group per chapter ("I bob · Magnit maydon", …) instead of Algebra/Geometriya.
- ids: `fizika-N.ts` → `FIZ_N`, n in book order; `BOARD_LESSONS.fizika`. From topic 13 on, n = topic + 2 (topic 15 → n 17, topic 45 → n 47).

## Chapters and lessons
| Bob | Topics (book pages) | Lessons |
|---|---|---|
| I. Magnit maydon | 1–6 (4–25) | 6 + revision "1–6" (built) |
| II. Elektromagnit induksiya | 7–10 (26–40) | 4 + revision "7–10" (built) |
| III. Elektromagnit tebranishlar | 11–20 (41–75), lab 19 | 10 |
| IV. EM to‘lqinlar va to‘lqin optikasi | 21–31 (76–123), labs 26, 31 | 11 |
| V. Nisbiylik nazariyasi | 32–33 (124–134) | 2 |
| VI. Kvant fizikasi | 34–36 (135–150) | 3 |
| VII. Atom va yadro fizikasi | 37–45 (151–187) | 9 |
Total: 45 topic lessons + 2 revision lessons = 47.

## Sessions (about one per hour)
1. Setup (chapter groups, physics drawing helpers: field ⊗/⊙, magnets, circuit elements, waves) + topics 1–3
2. Topics 4–6 + I bob revision
3. Topics 7–10 + II bob revision
4. Topics 11–14
5. Topics 15–18 (n 17–20)
6. Topics 19–26 (labs 19, 26) (n 21–28)
7. Topics 27–34 (lab 31) (n 29–36)
8. Topics 35–42 (n 37–44)
9. Topics 43–45 (n 45–47), final browser pass, plan update

## Status
- Session 1 done (2026-10-24): chapter groups on the subject page (`group` field, `part` now optional), drawing helpers in `board/phys.ts` (vec, seg, rect, barMagnet, fieldMarks, fieldLines, battery), lessons fizika-1…3 written, registered and checked in the browser.
- Session 2 done (2026-10-24): fizika-4…6 (topics 4–6) and revision fizika-7 (label "1–6", 15 questions) written, registered, type-checked and checked in the browser. I bob complete.
- Session 3 done (2026-10-24): fizika-8…11 (topics 7–10, `BOB2` exported from fizika-8.ts) and revision fizika-12 (label "7–10", 14 questions). New helpers in phys.ts: `coil`, `meter`. II bob complete.
- Session 4 done (2026-10-24): fizika-13…16 (topics 11–14, `BOB3` exported from fizika-13.ts). New phys.ts helpers: `wave` (sample a function for `curve` on `axes`), `capacitor`, `vcoil`. Board.tsx: subscript map extended with ₘ ₚ ₜ ₗ ₛ ₕ ᵢ (they used to render in a fallback font).
- 2026-10-24: revision lessons for chapters III–VII dropped (user decision); sessions re-planned to 12.
- Session 5 done (2026-10-24): fizika-17…20 (topics 15–18: capacitor and coil in AC, RLC Ohm's law, resonance with three resonance curves). Notation on boards and in questions: XL, XC, UL, UC, UR (no underscores — the board has no subscript letters for L/C/R). Axis labels are not rich text, so avoid ₘ there ("I max").
- 2026-10-24: user asked to double the pace — 8 lessons per session from session 6 on; sessions re-planned to 9.
- Session 6 done (2026-10-24): fizika-21…28 (topics 19–26: resonance lab with sample data and UC/UL graph, AC power and cos φ, EM waves, wave properties, radio and radar, TV and Tashkent history, interference and diffraction, grating lab with sample data). `BOB4` exported from fizika-23.ts. III bob complete.
- Session 7 done (2026-10-24): fizika-29…36 (topics 27–34: dispersion with prism drawing, polarization + Malus graph, IR/UV/X-rays, photometry, illuminance lab with sample data and E(I)/E(r) graphs, relativity, E = mc² with m(v) graph, origin of quantum physics with black-body curves). `BOB5` exported from fizika-34.ts, `BOB6` from fizika-36.ts. IV and V bob complete.
- Session 8 done (2026-10-24): fizika-37…44 (topics 35–42: photoeffect with I(U) and U(ν) graphs, photon momentum and light pressure, Bohr model with hydrogen level diagram (`BOB7` exported from fizika-39.ts), lasers with ruby 3-level diagram, nucleus with E sol(A) curve, particle detectors, decay law with N(t) curve and α/β/γ split in B, nuclear reactions and displacement rule). VI bob complete.
- 2026-10-24: user asked for revision lessons back (so lesson numbers line up with the book): small revisions (4–5 questions, `revision: true`, no board steps) added at the end of chapters III–VI — fizika-48 (label 11–20), fizika-49 (21–31), fizika-50 (32–33), fizika-51 (34–36). n is only an id; position comes from the array order in board/index.ts.
- Next: session 9 — topics 43–45 (n 45–47; book from line ~6771: elementary particles, atomic energy, nuclear physics in Uzbekistan), then the VII bob revision fizika-52 (label 37–45, 4–5 questions from 7-mashq / VII bob test; place it after FIZ_47), then a final browser pass over all lessons.

## Notes
- Book answer typos (1-mashq): no. 1 ring flux — book 25.12 mWb, correct 2.51 mWb; no. 10 gives 4.5 T, not 1.2 T (skipped); no. 15 gives 1.8 A, not 0.4 A (skipped); no. 21 gives 2.5·10⁸ m/s, not 2.5·10⁷ (skipped). I bob test nos. 6, 7, 8 have no correct option (skipped). 2-mashq: no. 10 gives 1 mJ (book 2.5), no. 11 gives 0.4 mJ (book 4), no. 12 gives 13.3 mH (book 90) — used with corrected answers in lesson 11. 3-mashq: no. 3 gives 14 mA (book 0.012 A), no. 4 gives ω ≈ 632 rad/s (book 630·10⁶), no. 6 gives 39 μs (book 39·10⁻⁵ s) — used with corrected answers. 4-mashq: no. 16 gives 1.26 klm (book 1.6 klm) — used corrected. 4-mashq: no. 2 gives 60 km (book 30 km) — used corrected in lesson 23 (n 25). III bob test no. 9: correct answer is D (ω = 1/√LC). 3-mashq no. 10 gives 1.59 μF (book 5.3 μF) — used corrected; no. 12 (no book answer) = 0.67 A.
- 6-mashq answers check out. VI bob test no. 6: correct A = 3.3·10⁻¹⁹ J is not among the options (skipped). 7-mashq no. 1: book's 6.56·10⁻¹⁷ m should be 6.56·10⁻⁷ m (used as 656 nm → 3·10⁻¹⁹ J). 7-mashq no. 5 (deuteron 1.7233 MeV) disagrees with real data (2.22 MeV) — skipped. Book gives nuclear density 2·10¹¹ kg/m³; real ≈ 2·10¹⁷ — used the real value.
- 5-mashq no. 11: book answer 0.71c is for a √2-times shorter comet; for 2 times shorter it is 0.87c (skipped). VI bob test no. 5: correct λ ≈ 9.9·10⁻⁸ m, option B has 10⁻⁹ (skipped).
- Browser check: the board's SVG buttons ignore synthetic clicks; advance with focus + Enter keydown, and click the HTML fallback button when the board has no room for it.
