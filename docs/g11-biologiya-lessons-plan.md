# G11 Biologiya — board lessons plan

**Textbook:** "Biologiya", 11-sinf (A. Gʻafurov, A. Abdukarimov, J. Tolipova, O. Ishankulov, M. Umaraliyeva, I. Abdurahmonova; «Sharq», 2018), 240 pages. 4 chapters (BOB), 44 topics (§), 5 lab sessions (laboratoriya mashgʻuloti), glossary (Atamalar izohi, pp. 233–236).

**Source text:** the PDF has a real text layer — extracted with `pdftotext -layout` to scratchpad `bio/all.txt` (no OCR needed). Topics end with "Bilimlaringizni qoʻllang" questions (no answer key; answers are in the text).

## Format (same as fizika / kimyo)
- `src/content/g11/board/biologiya-N.ts` exports `BIO_N: BoardLesson`; registered in `board/index.ts` under `biologiya: [...]` (subject slug from `content/g11/subjects.ts`; array order = subject-page order; `n` is only an id).
- Topic lessons: `n` = topic number (1–44), `label` = '1'…'44', `section` = 'N-mavzu'. Hook → ≤ 6 board scenes → example/summary scene → 3-point summary → 8 questions with varied widgets (biology has almost no calculations, so mostly sort_bins, match_pairs, memory_match, order_line, odd_one_out, pick_many, fill_blanks, statement_check, mcq; number_answer only where the book gives numbers, e.g. the 10 % rule in ecological pyramids).
- Chapter revisions: `revision: true`, no steps, 4–5 questions, ids n 45–48, placed after the chapter's last topic, label = topic range.
- Chapter groups: export `BOBk = { kicker: 'k-bob', title }` from the first lesson of each chapter.
- Lab sessions (5) are hands-on practicals (microscope, field work) — not turned into board lessons; their key ideas are folded into the neighbouring topic questions.

## Chapters and lessons
| BOB | Title | Topics | Revision |
|---|---|---|---|
| 1 | Ekologiya va hayot | 1–2 | n 45 (1–2) |
| 2 | Hayotning ekosistema darajasidagi umumbiologik qonuniyatlari | 3–23 | n 46 (3–23) |
| 3 | Hayotning biosfera darajasining umumbiologik qonuniyatlari | 24–34 | n 47 (24–34) |
| 4 | Organik olam filogenezi | 35–44 | n 48 (35–44) |

Total: 44 topic lessons + 4 revisions = 48.

## Sessions (8 lessons each, hourly reminder)
1. Topics 1–2 + revision 45, topics 3–7 (`BOB1` from biologiya-1, `BOB2` from biologiya-3).
2. Topics 8–15.
3. Topics 16–23.
4. Revision 46 (3–23), topics 24–30 (`BOB3` from biologiya-24).
5. Topics 31–34 + revision 47, topics 35–37 (`BOB4` from biologiya-35).
6. Topics 38–44 + revision 48; final pass over all 48.

## Status
- 2026-10-25: text extracted, plan written.
- Session 1 done (2026-10-25): biologiya-1, 2 (`BOB1` from biologiya-1), revision biologiya-45 (1–2), biologiya-3…7 (`BOB2` from biologiya-3): biosystems and the levels ladder (box diagram), ecology branches/methods; biogeotsenoz = biotsenoz + biotop (box + arrow diagram), ecosystem sizes; ekotop/klimatop/edafotop, producer → consumer → reducer chain; four habitats, water properties, algae depth layers, plankton/nekton/bentos; land-air (gas bar chart), soil, parasites; factor classification, optimum bell curve, Liebig barrel, eury/steno, savanna niches. Registered as `biologiya: [...]`, type-checked, browser-stepped at 660×900 (one axis label overlap fixed). `box` + `arrow` ops work well for biology diagrams.
- Session 2 done (2026-10-25): biologiya-8…15 — light (spectrum table, phototropism/photonasty, light groups, photoperiodism), temperature (poikilo/homoiotherm boxes, plant and animal adaptation tables), humidity (xero-/meso-/hygrophyte boxes, succulents vs sclerophytes), soil and topography (Dokuchayev's factors, altitude bar chart 32 → 6 °C, slope exposure triangle), biotic relations (sign table 0 0 … − −, mutualism vs protocooperation, commensalism forms, Gauze competition curves), anthropogenic factors (direct → indirect arrow diagram), population structure (density, dynamics curve, age pyramids as polygons, birth/death table) and its continuation (dominance bars, forest tiers, even/random/clumped tree icons, ethological groups). Registered, type-checked, browser-stepped at 660×900 (one stray label removed; a match_pairs with duplicate answers replaced by sort_bins — avoid duplicate right-hand values in match_pairs).
- Session 3 done (2026-10-25): biologiya-16…23 — trophic structure (4-box food chain, consumer orders, grazing vs detritus chains, 5-box marine trophic levels, 6-node food web with arrows), productivity (bar chart 2200/140/125/3 g/m², biomass boxes, 1 % rule), ecological pyramids (10 % chain 1000 → 1 kJ, stacked-rect pyramid, number/biomass/energy table; lab-2 problems as number questions: 100 foxes, 300 000 kg phytoplankton, 200 kg clover, 70 g insects), natural ecosystems/biomes, Central Asia and Uzbekistan zones (altitude table, desert soil types, toʻqay/adir/mountain tables), artificial ecosystems (urbano/agro, monoculture, natural vs artificial table), stability and succession (lichen → tree chain, climax curve), human ecology (health factors, 2500 kcal, iodised salt, adaptive types). Registered, type-checked, browser-stepped at 660×900.
- Session 4 done (2026-10-25): revision biologiya-46 (II bob, 3–23), biologiya-24…30 (`BOB3` from biologiya-24) — biosphere history (Lamark, Zyuss, Vernadskiy) and global ecosystem diagram, boundaries (ozone 20–22 km, hydrosphere/lithosphere limits, temperature number questions), Vernadskiy's 7 substance groups, living-matter properties and 7 functions, biomass (land vs ocean table 2420 / 3,2 mlrd t, species bars tundra 500 → tropics 8000, earthworms 25 t/ha), geological vs biological cycle (two 4-box cycle diagrams, comparison table), biogeochemical cycles (cycle-time table C 300 / O₂ 2000 / water 2 mln yil, carbon / nitrogen / water arrow diagrams with labelled arrows, P and S table). Registered, type-checked, browser-stepped at 660×900. Arrow `label` works for cycle diagrams.
- Session 5 done (2026-10-25): biologiya-31…34, revision biologiya-47 (III bob, 24–34), biologiya-35…37 (`BOB4` from biologiya-35) — biosphere evolution stages (3-box diagram, biogenesis chain, eras table, land-colonisation bars 475/380/300/215 mln yil), noosphere and noogenesis (Lerua, Vernadskiy, antropobiosfera, noogenika), human impact (population bars 0,6 → 7,5 mlrd, resource types table, forest 70 → 30 %, Aral, greenhouse chain), conservation (TMQXI 1948, WWF 1961, Rio 1992, Red Book 4 groups, 63/163 species, protected-area table, Uzbek reserves), phylogeny (arogenez/allogenez/katagenez diagram and tables), plant vegetative-organ phylogeny (land problems table, Palaeozoic chain, Mesozoic table), generative organs (iso-/hetero-/oogamy, 4-box alternation of generations, spore vs seed table, ovule → seed, ovary → fruit). Registered, type-checked, browser-stepped at 660×900. Avoid two opposite arrows between the same two boxes (labels overlap) — use a 4-box cycle. Browser runner: the SVG next button is `g[role=button]` whose aria-label ≠ 'Soddaroq'; call its React `onClick` prop directly (synthetic DOM clicks don't always register).
- Session 6 done (2026-10-25): biologiya-38…44 and revision biologiya-48 (IV bob, 35–44) — animal phylogeny (protobiont → colonial flagellates chain, invertebrate novelties table, fish → stegocephalians chain, amniote heart table), self-regulation (nerve-system types diffuse → stem → chain → tubular, brain table, immunity chain), integument and skeletons (skin-derivatives and skeleton-type tables), respiration (gill → swim bladder → lung chain, lung table), circulation (heart-rate bars 45/500, fish single-circuit triangle, heart-chamber bars 0/2/3/4/4), digestion (vacuole → anus table, ruminant chain), excretion and reproduction (embryo kidney stages, nephridia table, three kidney stages, amniote reproduction chain). Labs 4–5 folded into aromorfoz/idioadaptatsiya questions.
- Final pass (2026-10-25): all 48 lessons registered (dashboard: 1-bob 3, 2-bob 22, 3-bob 12, 4-bob 11), all 48 pages return 200, type-check clean. Static lint over all files (question counts, mcq indexes, unique ids, sort_bins bins, fill_blanks banks, odd_one_out, duplicate match_pairs answers, curly quotes, empty table cells) — fixed: biologiya-10 match_pairs with duplicate answers → sort_bins, stray ‘ in biologiya-3 and 10, empty table cells in biologiya-23.
- **G11 biologiya complete: 44 topic lessons + 4 chapter revisions = 48.**

## Notes
- 37-§: book says «ochiq urugʻli oʻsimliklarda meva va urugʻ hosil qiladigan gul» — should be yopiq urugʻli; lesson uses the correct form.
- 19-§: book gives sea water salinity as «30 % gacha» (should be ‰ — about 3,5 %); not used in lessons. It also lists «Shimoliy Afrika» among tropical-forest regions — left out.
