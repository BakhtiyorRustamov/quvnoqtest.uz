# 11-sinf Matematika — board lessons plan

Sources: *Matematika 11, I qism* and *II qism* (Mirzaahmedov, Ismailov, Amanov; geometriya — Xaydarov), 2018.
Lesson shape: everyday hook → board parts (≤ 6 scenes) → worked example → summary → 5–10 interactive questions.

## 1-qism: done — 40 lessons (algebra 1–46, geometry 1–9)
- 36 board lessons + 4 revision lessons (questions only): "15–17", "33–36", geometriya "4", geometriya "9".
- Labels: 1, 2, 3, 4, 5, 6, 7–8, 9, 10–12, 13, 14, 15–17 (R), 18, 19, 20, 21, 22–23, 24–25, 26–28, 29–30, 31–32, 33–36 (R), 37–38, 39, 40–41, 42–43, 44–45, 46; Geometriya: 1.1, 1.2–1.3, 2.1–2.3, 2.4, 3, 4 (R), 5, 6, 7, 8.1, 8.2, 9 (R).

## 2-qism: done — 38 lessons (`qism: 2`, ids 41–78)
Split by content; book ranges shown as labels; one revision lesson per review block.
Done (algebra):
- 41 "47–48" area between curves · 42 "49" volumes of revolution · 43 "50" work and distance · 44 "51" approximate integration
- 45 "52–56" (R) integral and differential equations
- 46 "57" counting, sum and product rules · 47 "58" arrangements and permutations · 48 "59" combinations · 49 "60" Newton binomial
- 50 "61–62" population and sample · 51 "63–64" frequency table, polygon, histogram · 52 "65–66" mean, mode, median · 53 "67" standard deviation
- 54 "68–69" scatter diagrams, direction and strength · 55 "70" correlation coefficient
- 56 "71" random events · 57 "72–73" probability: classical and statistical · 58 "74–77" operations on events, Euler–Venn
- 59 "78–79" adding probabilities, conditional probability · 60 "80" computing probabilities of compound events · 61 "81–83" Bernoulli scheme, binomial distribution · 62 "84–85" random variable, normal distribution
- 63 "86–93" (R) algebra review (16 questions)
Done (geometry, `qism: 2`, labels by book subsection): 64 "10.1" pyramid and its surface · 65 "10.2" frustum and its surface · 66 "10.3" pyramid volume · 67 "10.4–10.5" frustum volume, similar solids · 68 "11.1" cone and its surface · 69 "11.2" cone volume · 70 "11.3–11.4" truncated cone · 71 "12" (R) review of ch. III (16 questions) · 72 "13.1" sphere, sections, tangent plane · 73 "13.2" inscribed and circumscribed solids · 74 "14.1" sphere volume · 75 "14.2" parts of a sphere · 76 "15" sphere surface · 77 "16" (R) review of ch. IV (16 questions) · 78 "17" (R) stereometry test (19 questions)


## Notes
- Students see the textbook number (`label`); `n` is only the id (URL, audio folder). Order: BOARD_LESSONS.matematika in src/content/g11/board/index.ts.
- The subject page groups lessons in collapsible cards: 1-qism Algebra / 1-qism Geometriya / 2-qism Algebra …
- Widgets: grade-11 math widgets plus grade-1 widgets (odd_one_out, order_line, pick_many, memory_match, mcq, sort_bins…). Board ops include `ellipse` and `bars`; geo3d has cuboid, cylinder, cone, frustumCone, sector; board text draws the bar of x̄, ȳ, Ā correctly (precomposed Ā is normalised).
- To do by the user: audio for new lessons (lab section 5). Repo copy: docs/g11-matematika-lessons-plan.md
