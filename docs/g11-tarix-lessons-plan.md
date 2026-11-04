# G11 Tarix — board lessons plan

**Textbooks (one subject `tarix`, two parts):**
- **Oʻzbekiston tarixi (Mustaqillik davri)**, 11-sinf — N. Joʻrayev, A. Zamonov (Gʻafur Gʻulom, 2018), 144 pages. 9 chapters (BOB), 22 topics (mavzu).
- **Jahon tarixi (1991–2017-yillar)**, 11-sinf — Sh. Ergashev, B. Xodjayev, J. Abdullayev (Turon-Iqbol, 2018), 154 pages. 3 chapters, 29 topics.

**Source text:** both PDFs have a text layer — `pdftotext -layout` to scratchpad `tarix/uz.txt` and `tarix/jh.txt` (Jahon tarixi has OCR spacing glitches such as «Y A N G I», but is readable).

## Decisions (agreed with Baxtiyor, 2026-10-25)
- One subject `tarix` (already in `content/g11/subjects.ts`); Oʻzbekiston tarixi first, then Jahon tarixi.
- **Simple board: 2 scenes per topic lesson** — (1) the story: short narration + key-facts list; (2) key dates: a small `yil | voqea` table or a short box chain. Then 3-point summary and 8 questions (timelines, date/event matching, sorting, statement checks, mcq; number_answer only for years/figures from the book).
- **Revisions follow the book's chapters (BOB):** one revision after each chapter, 3–5 questions, label = topic range.
- Lesson numbers match each book (labels restart at 1 for Jahon tarixi).
- **Paraphrase** the book in our own words — no copied passages.
- Live political topics in Jahon tarixi (Russia–Ukraine/Crimea, Israel–Palestine, Syria, Afghanistan) follow the book, neutral wording; coverage stops at 2017 as in the book.

## Format
- `src/content/g11/board/tarix-N.ts` exports `TARIX_N: BoardLesson`; registered in `board/index.ts` under `tarix: [...]` (array order = subject-page order).
- `n` (URL id) scheme: Oʻzbekiston tarixi topics 1–22, its revisions 51–59; Jahon tarixi topics 101–129, its revisions 151–153.
- `label` = book topic number ('1'…'22', '1'…'29'); `section` = 'Oʻzbekiston tarixi, N-mavzu' / 'Jahon tarixi, N-mavzu'.
- Chapter groups: `{ kicker: 'Oʻzbekiston tarixi · I bob', title }` / `{ kicker: 'Jahon tarixi · I bob', title }`, exported from the chapter's first lesson as `UZ1…UZ9`, `JH1…JH3`.

## Chapters
### Oʻzbekiston tarixi
| BOB | Title | Topics | Revision n |
|---|---|---|---|
| I | Mustaqillikning eʼlon qilinishi va ijtimoiy-siyosiy islohotlar | 1–2 | 51 |
| II | Fuqarolik jamiyatining shakllanishi va rivojlanishi | 3–4 | 52 |
| III | Iqtisodiy islohotlar va ijtimoiy siyosat | 5–7 | 53 |
| IV | Etnik va konfessiyalararo munosabatlar | 8–9 | 54 |
| V | Taʼlim tizimi islohotlari va kadrlar tayyorlash | 10–11 | 55 |
| VI | Ilm-fan va sportning rivojlanishi | 12–14 | 56 |
| VII | Maʼnaviy va madaniy taraqqiyot | 15–16 | 57 |
| VIII | Tashqi siyosat va ikki tomonlama munosabatlar | 17–20 | 58 |
| IX | Koʻp tomonlama hamkorlik aloqalari | 21–22 | 59 |

### Jahon tarixi
| BOB | Title | Topics | Revision n |
|---|---|---|---|
| I | XX asr oxiri – XXI asr boshlarida dunyo mamlakatlari | 1–3 | 151 |
| II | 1991–2017-yillarda dunyo mamlakatlari | 4–26 | 152 |
| III | Yangi ming yillik boshlarida jahon sivilizatsiyasi muammolari | 27–29 | 153 |

Total: 50 topic lessons + 12 revisions = 62 (Jahon 24-mavzu removed 2026-10-26).

## Sessions (hourly reminder)
1. Oʻzbekiston tarixi 1–2 + R51, 3–4 + R52, 5–7 + R53.
2. Oʻzbekiston tarixi 8–9 + R54, 10–11 + R55, 12–14 + R56.
3. Oʻzbekiston tarixi 15–16 + R57, 17–20 + R58, 21–22 + R59.
4. Jahon tarixi 1–3 + R151, 4–11.
5. Jahon tarixi 12–21.
6. Jahon tarixi 22–26 + R152, 27–29 + R153; final pass over all 63.

## Notes
- 10-mavzu: book lists the basic school as «4–9-sinf»; lessons use 5–9 (1–4 is primary).
- Jahon 3-mavzu: book says «80 mln rus» left outside Russia — figure skipped (lesson mentions the issue only).
- Jahon 4-mavzu: book dates the Chechen war «1996–2000» — lesson says «ogʻir urush» without dates.
- Jahon 5-mavzu: book puts Dodon's election in «2017-yil may» — lesson gives no date.
- Jahon 8-mavzu: the Tojikiston page (p. 41) has no text layer; lesson covers only independence (9 Sep 1991) and the civil war.
- Jahon 13-mavzu: book dates the Schengen agreement «1990-yil yanvar» and Macron's win «aprel» — lesson gives neither date.
- Jahon 15-mavzu: book's sweeping labels on religious movements left out; lesson keeps the book's point that religion must be told apart from extremists who misuse it.
- Jahon 16/20/21-mavzu: Xinjiang attack figure, Turkey's direct-election law date and Iran execution figures skipped; wording kept neutral.
- Jahon 23-mavzu: book implies S. Husayn was executed in 2003 (captured Dec 2003, executed 2006) — lesson says «keyinroq qatl etildi» without a date.
- Jahon 24-mavzu: book calls the 1947 partition plan a «Xavfsizlik Kengashi» resolution and dates Arafat's death 2006 — lesson says «BMT qarori» and gives no death date; Israel–Palestine wording kept neutral.
- Jahon 26/29-mavzu: book's label of «Musulmon birodarlar» as radical and its value judgement on Western social laws left out.

## Status
- 2026-10-25: books checked, plan agreed and written.
- Session 1 done (2026-10-25): tarix-1, 2 + revision 51 (`UZ1` from tarix-1), tarix-3, 4 + revision 52 (`UZ2` from tarix-3), tarix-5, 6, 7 + revision 53 (`UZ3` from tarix-5) — independence timeline, branches-of-power diagram, parliament stages, local government boxes, parties table, Konsepsiya/Harakatlar strategiyasi, five principles list, soʻm/transport/Asaka table, small-business stages, free economic zones, life-expectancy bars. Registered as `tarix: [...]`, type-checked, subject page shows the three chapter groups, browser-stepped at 660×900.
- Session 2 done (2026-10-25): tarix-8, 9 + revision 54 (`UZ4` from tarix-8), tarix-10, 11 + revision 55 (`UZ5` from tarix-10), tarix-12, 13, 14 + revision 56 (`UZ6` from tarix-12) — national-cultural centres bars (10 → 138), conscience-freedom timeline, education-law timeline and school-system table, bachelor → master boxes, foreign university branches, science timeline (OAK, Maʼmun academy, 32 academicians), three-tier school games chain, kurash/Olympics table, youth-organisation chain. Registered, type-checked, browser-stepped at 660×900 (a split bullet list beside a bar chart replaced by two short text lines — keep side lists to one-line items).
- Session 3 done (2026-10-25): tarix-15, 16 + revision 57 (`UZ7` from tarix-15), tarix-17…20 + revision 58 (`UZ8` from tarix-17), tarix-21, 22 + revision 59 (`UZ9` from tarix-21) — jubilee table and memorial days, museum bars and UNESCO list, geopolitics pros/cons table and foreign-policy principles, five-neighbours box diagram, Central Asia timeline, 2017 deals bars (China 23 / Russia 16 mlrd $), Russia/China/USA table, Korea/India enterprise bars, UN/UNESCO/«6+2» timeline, CIS chain and SCO table. **Oʻzbekiston tarixi complete: 22 topics + 9 revisions.** Registered, type-checked, browser-stepped at 660×900.
- Session 4 done (2026-10-25): tarix-101, 102, 103 + revision 151 (`JH1` from tarix-101), tarix-104…111 (`JH2` from tarix-104) — bipolar → multipolar chain and G-20 bars, Eastern Europe tables, December 1991 chain, Russia reforms chain and dates, Ukraine dates and Belarus/Moldova table, Baltic table and «Boltiq yoʻlbarslari» chain, Caucasus table and Georgia leaders chain, Kazakhstan/Turkmenistan table and Kyrgyzstan leaders chain, EU enlargement chain and dates, US economy chain and presidents table, Germany chain and GDP ranking. Registered, type-checked, browser-stepped at 660×900 (3-column tables need short cells; boxes wrap at ~16 chars).
- Session 5 done (2026-10-25): tarix-112…121 (group `JH2`) — UK prime-ministers table and two-referendum bars, France presidents table and post-industrial chain, Italy «Halol qoʻllar» chain, modernisation list and three-region table, China reform chain and «Xitoy orzusi» chain, Japan share bars and dates, SE Asia table and «Osiyo yoʻlbarslari» list, India Rao chain and PM table, Turkey dates and 2014–2017 chain, Iran presidents chain and achievements/problems table. Registered, type-checked, browser-stepped at 660×900.
- Session 6 done (2026-10-25): tarix-122…126 + revision 152 (label '4–26', `JH2`), tarix-127, 128, 129 + revision 153 (`JH3` from tarix-127) — Pakistan table and Afghanistan chain, Syria chain and Iraq dates, Israel economy list and peace-process dates, Latin America neoliberal chain and big-states table, North Africa dates and Africa problems list, globalisation boxes and ecology list (Orol), sustainable-development boxes and ethno-social table, population bars and books table.
- **Final pass (2026-10-25):** all 63 lessons registered in order (63 unique entries), type-check clean, lint clean (no curly quotes, straight apostrophes or Cyrillic; 8 questions per topic, 3–5 per revision; 2 steps and 3 summary points per topic; unique question ids; no duplicate match values or choices; answer indexes in range; sort_bins ids valid), all 63 pages return 200, subject page shows the 12 chapter groups. **G11 tarix complete: 51 topics + 12 revisions.**

- 2026-10-26: at Baxtiyor's request removed Jahon 24-mavzu (Isroil va Falastin): tarix-124 unregistered and moved out of src (`q/_removed/tarix-124.ts.bak`); revision 152 «Oslo kelishuvlari» item replaced by «Yevrotunnel ochildi» (1994). Jahon tarixi now goes 23 → 25. 62 lessons.
