# G11 Geografiya — board lessons plan

**Textbook:** Geografiya (Amaliy geografiya), 10-sinf — Sh. M. Sharipov, V. N. Fedorko, N. I. Safarova, V. A. Rafiqov («Oʻzbekiston milliy ensiklopediyasi», 2017), 160 pages. 10 chapters (BOB), 33 topics (§) + §34 «Takrorlash darsi».

**Source text:** text layer OK — `pdftotext -layout` → scratchpad `geo10/g.txt`, cleaned copy `geo10/gc.txt` (watermark lines removed, spaces squeezed).

## Decisions (Baxtiyor, 2026-10-26)
- Subject `geografiya` (already in `content/g11/subjects.ts`) uses the **10th-grade** book; the subject page heading reads **«Mavzular boʻyicha (10-sinf)»** — geography only (`BOOK_GRADE` map in `components/g11/G11SubjectView.tsx`).
- **No revision lessons at all** (the big test button will cover review later). §34 is skipped.
- Same lesson format as other subjects: 2 board scenes, 3-point summary, 8 questions; paraphrase the book.
- **Do not mention Israel or Palestine** anywhere in geography lessons or questions (also removed from history: tarix-124 deleted, revision 152 Oslo item replaced).
- Skip book figures that are dated or doubtful (e.g. counts of reserves/biosphere reserves worldwide).

## Format
- `src/content/g11/board/geografiya-N.ts` exports `GEO_N: BoardLesson`, `n` = `label` = § number (1–33), `section: 'N-§'`.
- Chapter groups `{ kicker: 'N-bob', title }` exported from each chapter's first lesson as `GEO1…GEO10`.
- Registered in `board/index.ts` as `geografiya: [GEO_1, …]` (after `tarix`).

## Chapters
| BOB | Title | § | Group from |
|---|---|---|---|
| 1 | Geografiya fani va uning tarixi | 1–2 | geografiya-1 |
| 2 | Yer tabiati | 3–9 | geografiya-3 |
| 3 | Jamiyat va tabiat | 10–12 | geografiya-10 |
| 4 | Amaliy geografik tadqiqotlar | 13–16 | geografiya-13 |
| 5 | Dunyo aholisi | 17–19 | geografiya-17 |
| 6 | Dunyoning geosiyosiy manzarasi va global muammolar | 20–22 | geografiya-20 |
| 7 | Yevropa va Amerika subregionlari | 23–25 | geografiya-23 |
| 8 | Afrika subregionlari. Okeaniya davlatlari | 26–27 | geografiya-26 |
| 9 | Osiyo subregionlari | 28–30 | geografiya-28 |
| 10 | Oʻzbekiston Respublikasi | 31–33 | geografiya-31 |

Total: 33 lessons.

## Sessions
1. §1–12 (chapters 1–3).
2. §13–22 (chapters 4–6). `geo10/gc.txt` lines: 13 at 2261, 14 at 2454, 15 at 2633, 16 at 2886, 17 at 3047, 18 at 3192, 19 at 3340, 20 at 3459, 21 at 3587, 22 at 3788, 23 at 3933.
3. §23–33 (chapters 7–10) + final pass over all 33. Lines: 23 at 3933, 24 at 4246, 25 at 4523, 26 at 4660, 27 at 4813, 28 at 4944 (Janubi-gʻarbiy Osiyo — leave out Israel/Palestine), 29 at 5101, 30 at 5319, 31 at 5642, 32 at 5802, 33 at 6052, 34 at 6237.

## Notes
- §3: book gives the equator rotation speed as 455 m/s and the orbit length as 934 mln km — not used.
- §2: book dates the discovery of Antarctica 1821 and Magellan's voyage 1519–1521 — lesson gives the 1519 start only and no year for Antarctica.
- §18–19, §21: the book's mentions of Israel/Palestine (urbanisation, migration and Middle East paragraphs) left out per the rule; §21 Brexit «fully left in summer 2017» and China «1st by GDP» claims not used; US geopolitics wording kept neutral.
- §28: the book's line on cotton/tobacco/dates in Iraq, Syria «and Israel» left out per the rule; §28–29 subregion figures kept as the book's.
- §31: the first President's book quotation and the «6+2» group paragraph not used; geopolitical issues worded neutrally (transboundary rivers, exclaves, delimitation).
- §32: the book's 2010s growth-rate and world-rank figures (gold 4th, uranium 7th, etc.) not used as numbers — lesson says «oldingi oʻrinlarda»; kept the three periods, 2700 deposits, machine-building ~1/5 of industry (2016), railways and free economic zones.
- §12: Uzbekistan's counts of reserves/national parks are from 2017 — lesson names Ugom–Chotqol, Zomin and Quyi Amudaryo without counts.

## Status
- 2026-10-26: plan agreed. History lesson 24 removed; «(10-sinf)» heading added.
- Session 1 done (2026-10-26): geografiya-1…12 (`GEO1` from 1, `GEO2` from 3, `GEO3` from 10) — geographic-shell box diagram and sciences table, scientists and discoveries tables, Earth figures and motions tables, Earth layers chain and seismic belts, development stages and eras chains, shell structure levels and rhythms table, zonality boxes and azonal landscapes table, altitude list and Uzbekistan belts table, geosystem types and topological chain, environment table and impact bars, Milkov classes table and oasis bars, protected areas table and principles list. Registered, type-checked, subject page shows «Mavzular boʻyicha (10-sinf)» and 3 chapter groups, browser-stepped at 660×900.
- Session 2 done (2026-10-26): geografiya-13…22 (`GEO4` from 13, `GEO5` from 17, `GEO6` from 20) — exogenous processes table and natural/anthropogenic boxes, road-building assessment table and irrigation complexity chain, forecast terms table and scale chain, monitoring chain and agencies table, world population bars and natural-growth bars, urban-share bars and urbanisation chain, migration types table and immigrant bars, geopolitics approaches and periods tables, power-centre boxes and integration table, global problems list and figures table. Registered, type-checked, browser-stepped at 660×900.
- Session 3 done (2026-10-26): geografiya-23…33 (`GEO7` from 23, `GEO8` from 26, `GEO9` from 28, `GEO10` from 31) — Europe subregions tables, Latin America resources/agriculture tables, Caribbean archipelago boxes, Africa subregion population and specialisation tables, Oceania parts boxes and New Zealand list, Asia subregions list and South Asia table, East Asia states table and SE Asia peninsula/island boxes, Central Asia state boxes and specialisation table, Uzbekistan border bars and micro/meso/macro chain, economy periods chain and changes table, geoecological problem-type chain and local problems list. Registered, type-checked (tsc exit 0), browser-stepped at 660×900.
- Final pass (2026-10-26): all 33 lessons checked on the device — no curly quotes, straight apostrophes, Cyrillic or banned words; 2 steps, 3 summary points and 8 unique questions each; match_pairs prompts say «juftlang», sort_bins «ajrating»; no duplicate right-hand values; answer indexes and bins valid; board titles ≤ 36 chars; all 33 pages return 200.
- **G11 geografiya complete: 33 lessons.**
