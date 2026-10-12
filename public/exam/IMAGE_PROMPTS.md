# Prezident maktabiga tayyorgarlik — exam images

There are **exactly 4** images in the whole exam. They are **standard and
value-independent**: the numbers only ever appear in the question *text*, so one
picture per item works for every randomized attempt. Create these 4 files and
drop them in this folder (`public/exam/`). Until a file exists, the app shows the
prompt as a dashed placeholder automatically.

Recommended: square-ish PNGs, transparent or white background, ~600×400 px,
simple flat kids-textbook style, bold outlines, no photorealism.

---

## 1. `polygons.png`  → used by the "how many sides" question
**Prompt (EN):** Four polygons in a row: triangle (3 sides), quadrilateral (4), pentagon (5), hexagon (6). Each labelled, simple colourful kids-textbook style, white background.
**UZ:** Toʻrtta koʻpburchak yonma-yon: uchburchak (3 tomon), toʻrtburchak (4 tomon), beshburchak (5 tomon), oltiburchak (6 tomon). Har biri belgilangan, sodda rangli bolalar darsligi uslubida, oq fon.
**RU:** Четыре многоугольника в ряд: треугольник (3 стороны), четырёхугольник (4), пятиугольник (5), шестиугольник (6). Каждый подписан, простой цветной детский учебный стиль, белый фон.

## 2. `square.png`  → used by the "square perimeter" question
**Prompt (EN):** A single square with each side labelled "a cm" (no number), simple textbook style, white background.
**UZ:** Bitta kvadrat, har bir tomoni "a sm" deb belgilangan (raqamsiz), sodda darslik uslubida, oq fon.
**RU:** Один квадрат, каждая сторона подписана «a см» (без числа), простой учебный стиль, белый фон.

## 3. `solids.png`  → used by the "which 3D shape" question
**Prompt (EN):** Four 3D shapes in a row: sphere, cube, pyramid, cylinder. Each labelled, simple solid look, kids style, white background.
**UZ:** Toʻrtta hajmli shakl yonma-yon: shar, kub, piramida, silindr. Har biri belgilangan, sodda hajmli koʻrinish, bolalar uslubida, oq fon.
**RU:** Четыре объёмные фигуры в ряд: шар, куб, пирамида, цилиндр. Каждая подписана, простой объёмный вид, детский стиль, белый фон.

## 4. `broken-line.png`  → used by the "broken-line total length" question
**Prompt (EN):** A 3-segment broken (zig-zag) line with parts labelled a, b, d (letters, no numbers), simple textbook style, white background.
**UZ:** Uch boʻlakli siniq (zigzag) chiziq, boʻlaklari a, b, d harflari bilan belgilangan (raqamsiz), sodda darslik uslubida, oq fon.
**RU:** Ломаная (зигзаг) из трёх звеньев, звенья подписаны буквами a, b, d (без чисел), простой учебный стиль, белый фон.

---

*Source of truth: `EXAM_IMAGES` in `src/content/g1-math/exam.ts`. If you rename a
file here, update the `src` there to match.*
