import 'server-only';
import type { BookPassage } from '../textbook';

/**
 * Matematika 11-sinf, I qism (Algebra va analiz asoslari), "Zamin nashr", 2018.
 * Sections 1–2 and 3–4 (pages 3–15), transcribed for the /lab textbook test
 * only. Formulas are written in plain Unicode; [Rasm: …] lines are short
 * descriptions of the book's figures (the figures themselves are not copied).
 *
 * © "ZAMIN NASHR" MCHJ. Check usage rights before any use outside the lab.
 */
export const MATH11_1: BookPassage[] = [
  {
    id: 'm11-1-p3a',
    section: '1–2',
    page: 3,
    heading: 'Oʻzgaruvchi miqdorlar orttirmalarining nisbati',
    text: `I BOB. HOSILA VA UNING TATBIQLARI. 1–2-mavzu: Oʻzgaruvchi miqdorlar orttirmalarining nisbati va uning maʼnosi. Urinma taʼrifi. Funksiya orttirmasi.
Turli oʻlchov birliklariga ega boʻlgan ikkita oʻzgaruvchi miqdor nisbatini hisoblash inson hayotida tez-tez uchrab turadi.
Masalan, avtomashinaning tezligi uning yurgan yoʻlining vaqtga nisbati km/soat yoki m/s larda oʻlchanadi, yoqilgʻi sarflashi esa km/litr yoki 100 km/litr larda oʻlchanadi.
Xuddi shunday, basketbolchining mahorati bir oʻyinda toʻplagan ochkolar soni bilan belgilanadi.`
  },
  {
    id: 'm11-1-p3b',
    section: '1–2',
    page: 3,
    heading: 'Misol: matn terish tezligi va sifati',
    text: `Misol. Oʻquv ishlab chiqarish majmuasida 11-sinf oʻquvchilari orasida matn terishning sifati va tezligi boʻyicha sinov oʻtkazilmoqda. Karim 3 minut mobaynida 213 ta soʻzni terib, 6 ta imloviy xatoga, Nargiza esa 4 minut mobaynida 260 ta soʻzni terib, 7 ta imloviy xatoga yoʻl qoʻygani maʼlum boʻldi. Ularning natijalarini solishtiring.
Yechish. Har bir oʻquvchi uchun tegishli nisbatlarni tuzamiz:
Karim: matn terishning tezligi = 213 ta soʻz / 3 min = 71 soʻz/min; matn terishning sifati = 6 ta xato / 213 ta soʻz ≈ 0,0282 xato/soʻz.
Nargiza: matn terishning tezligi = 260 ta soʻz / 4 min = 65 soʻz/min; matn terishning sifati = 7 ta xato / 260 ta soʻz ≈ 0,0269 xato/soʻz.
Demak, Karim matnni Nargizaga nisbatan tezroq tergan boʻlsa-da, Nargiza bu ishni sifatliroq bajargan.`
  },
  {
    id: 'm11-1-p4a',
    section: '1–2',
    page: 4,
    heading: 'Mashqlar 1–5',
    text: `Mashqlar.
1. Puls chastotasini tekshirish uchun barmoqlar uchi arteriya tomiri oʻtadigan joyga qoʻyiladi va zarbalarni his qilish uchun shu joy bosiladi. Madina pulsni oʻlchaganda bir minutda 67 ta zarbani his qildi. a) Puls chastotasining maʼnosini tushuntiring. U qanday kattalik (belgi)? b) Har soatda Madinaning yuragi necha marta uradi?
2. Karim uyida 14 bet matn terib, 8 ta imloviy xatoga yoʻl qoʻydi. Agar 1 betda oʻrtacha 380 ta soʻz boʻlsa: a) Karimning matn terish sifatini aniqlang va yuqoridagi misolda olingan natija bilan solishtiring. Karimning matn terish sifati yaxshilandimi? b) Karim 100 ta soʻz terganda oʻrtacha qancha xato qiladi?
3. Maʼruf 12 soat ishlab 148 m 20 cm, Murod esa 13 soat ishlab 157 m 95 cm ariq tozaladi. Ularning mehnat unumdorligini solishtiring.
4. Avtomashina yangi shina protektorining chuqurligi 8 mm ni tashkil qiladi. 32178 km yurilganidan soʻng yemirilish natijasida shina protektorining chuqurligi 2,3 mm boʻlgani maʼlum boʻldi. a) 1 km masofa yurilganda shina protektori chuqurligi qanday oʻzgaradi? b) 10000 km masofa yurilganda-chi?
5. Madina Qarshi shahridan soat 11:43 da chiqib, soat 15:49 da Guliston shahriga yetib keldi. Agar u 350 km masofa yurgan boʻlsa, uning oʻrtacha tezligi necha km/soat boʻldi?`
  },
  {
    id: 'm11-1-p4b',
    section: '1–2',
    page: 4,
    heading: 'Misol: silindrik idishga suv quyish',
    text: `Misol. Silindr shaklidagi idish suv bilan bir xil tezlikda toʻldirilmoqda. Bunda silindrik idish ichiga vaqtga proportsional boʻlgan suv (hajmi) quyilayotgani bois suv sathining (balandligining) vaqtga nisbatan bogʻlanishi chiziqli funksiya koʻrinishida boʻladi (1-rasm).
[Rasm 1: silindrik idish va "sath–vaqt" grafigi: koordinata boshidan chiquvchi toʻgʻri chiziq.]
Bu holda idishdagi suv sathining vaqtga boʻlgan nisbati (yaʼni sathning oʻzgarish tezligi) oʻzgarmas son boʻlib qolaveradi.
Endi boshqa shakldagi idishni qaraymiz (2-rasm).
[Rasm 2: yuqoriga qarab kengayib boruvchi stakan shaklidagi idish; "sath–vaqt" grafigi koordinata boshidan chiqib, tobora sekinroq oʻsuvchi (yotiqlashib boruvchi) egri chiziq.]
2-rasmda suv sathining oʻzgarish tezligining vaqtga nisbatan bogʻlanishi aks ettirilgan.`
  },
  {
    id: 'm11-1-p5',
    section: '1–2',
    page: 5,
    heading: '1-savol: konus va silindrdan iborat idish',
    text: `1-savol. 3-rasmda suv quyishga moʻljallangan idish tasvirlangan.
[Rasm 3: pastki qismi balandligi 1,5 m boʻlgan konus (uchi pastda), ustki qismi balandligi 1,5 m, diametri 1,0 m boʻlgan silindrdan iborat idish.]
Boshida unda suv yoʻq edi. Keyin u "bir sekundda bir litr" tezlikda toʻldirila boshlandi. Suv sathining vaqtga nisbatan oʻzgarishi 4-rasmdagi qaysi grafikda toʻgʻri koʻrsatilgan?
[Rasm 4 (6-bet): beshta "sath–vaqt" grafigi: a) avval toʻgʻri chiziq boʻylab oʻsib, keyin gorizontal; b) avval tez, keyin sekinlashib oʻsuvchi egri chiziq, soʻng deyarli toʻgʻri chiziq; c) toʻgʻri chiziq; d) avval sekin oʻsuvchi egri, soʻng tik toʻgʻri chiziq; e) tez oʻsib, keyin gorizontal boʻlib qoluvchi egri chiziq.]`
  },
  {
    id: 'm11-1-p7',
    section: '1–2',
    page: 7,
    heading: '2-savol: grafiklar va idishlar',
    text: `2-savol. Suv sathining vaqtga nisbatan oʻzgarishi 5-rasmdagi grafiklarda berilgan. Ular 6-rasmdagi qaysi idishlarga mos keladi?
[Rasm 5: toʻrtta "sath–vaqt" grafigi: a) toʻgʻri chiziq; b) sekin boshlanib, tobora tezlashib oʻsuvchi egri chiziq; c) avval sekin toʻgʻri chiziq, soʻng tez oʻsib, keyin sekinlashuvchi egri; d) avval egri, soʻng tikroq toʻgʻri chiziq.]
[Rasm 6: beshta idish: a) keng past silindr ustida tor silindr; b) pastga qarab kengayuvchi kesik konus; c) keng konussimon asos ustida tor silindr; d) ikki kesik konusdan iborat (oʻrtasi keng) idish; e) shar ustida tor silindr.]`
  },
  {
    id: 'm11-1-p8',
    section: '1–2',
    page: 8,
    heading: 'Oʻzgarishning oʻrtacha tezligi; 1-misol (FM kesuvchi)',
    text: `Oʻzgarishning oʻrtacha tezligi.
Ikkita oʻzgaruvchi miqdorning bir-biriga bogʻlanishi chiziqli funksiya koʻrinishida boʻlsa, bu miqdorlar orttirmalarining nisbati oʻzgarmas son boʻladi.
Ikkita oʻzgaruvchi miqdorning bir-biriga bogʻlanishi chiziqli funksiya koʻrinishida boʻlmasa, biz bu oʻzgaruvchi miqdorlarning berilgan oraliqdagi oʻrtacha nisbatini topa olamiz. Agar oraliqlar turlicha olinsa, hisoblangan oʻrtacha nisbatlar ham turlicha boʻladi.
1-misol. Moddiy nuqtaning vaqtga nisbatan toʻgʻri chiziq boʻylab harakat qonuni grafikda tasvirlangan (7-rasm). FM kesuvchining burchak koeffitsiyentini toping.
[Rasm 7: D (yoʻl) – t (vaqt) grafigi; egri chiziq F(2; 20) va M(4; 80) nuqtalardan oʻtadi; F va M orqali FM kesuvchi toʻgʻri chiziq oʻtkazilgan.]
Yechish. Grafikda t = 2 sekundga mos boʻlgan F nuqtani va undan farqli (masalan, t = 4 sekundga mos boʻlgan) M nuqtani belgilaylik. 2 ≤ t ≤ 4 vaqt oraligʻida oʻrtacha tezlik (80 − 20) m / (4 − 2) s = 30 m/s ga teng ekanligini topamiz. Koʻrinib turibdiki, FM kesuvchining burchak koeffitsiyenti 30 ga teng ekan.
Savol. F nuqtani qoʻzgʻalmas hisoblab, t ning 0; 1,5; 1,9; 1,99 va 3; 2,5; 2,1; 2,01 qiymatlariga mos boʻlgan M nuqtalar uchun FM kesuvchilarning burchak koeffitsiyentlarini hisoblab, jadvallarni toʻldiring. Qanday xulosaga keldingiz?`
  },
  {
    id: 'm11-1-p9',
    section: '1–2',
    page: 9,
    heading: '2-misol (sichqonlar populyatsiyasi) va oʻrtacha tezlik taʼrifi',
    text: `2-misol. Populyatsiyadagi sichqonlar soni haftalar kechishi bilan oʻzgaradi (8-rasm).
[Rasm 8: "sichqonlar soni – haftalar" grafigi; 0-haftada 50 ta, 3-haftada 110 ta, 6-haftada 240 ta, 7-haftada 315 ta sichqon; nuqtalar tobora tezroq oʻsuvchi siniq chiziq bilan tutashtirilgan.]
3- va 6-hafta oraligʻida sichqonlar soni oʻrtacha qanday oʻzgargan? 7 haftalik vaqt oraligʻida-chi?
Yechish. Sichqonlar populyatsiyasining oʻsish tezligi (240 − 110) ta sichqon / (6 − 3) ta hafta ≈ 43 sichqon/hafta, yaʼni 3- va 6-hafta oraligʻida sichqonlar soni haftasiga oʻrtacha 43 taga koʻpaygan. Xuddi shunday 7 haftada (315 − 50) ta sichqon / (7 − 0) ta hafta ≈ 38 sichqon/hafta. 7 hafta oraligʻida sichqonlar soni haftasiga oʻrtacha 38 taga koʻpaygan.
Asosiy maʼlumot. Umumiy holda: x miqdor a dan b gacha oʻzgarganda y = f(x) miqdor oʻzgarishining oʻrtacha tezligi (f(b) − f(a)) / (b − a) orttirmalar nisbatiga teng, bu yerda f(b) − f(a) – funksiya orttirmasi, b − a esa argument orttirmasi.
h = b − a deb belgilasak, oʻrtacha tezlik (f(a + h) − f(a)) / h koʻrinishni oladi.`
  },
  {
    id: 'm11-1-p10a',
    section: '1–2',
    page: 10,
    heading: 'Funksiya orttirmasi va ayirmali nisbat',
    text: `Asosiy maʼlumot. (f(a + h) − f(a)) / h kasr suratini y = f(x) funksiyaning argumenti x ning h orttirmasiga mos keluvchi orttirmasi deb atash qabul qilingan. Kasrning oʻzi esa ayirmali nisbat deb ataladi.`
  },
  {
    id: 'm11-1-p10b',
    section: '1–2',
    page: 10,
    heading: 'Mashq 6: yoʻl–vaqt grafigi',
    text: `6. Nuqtaning toʻgʻri chiziq boʻylab yurgan yoʻli vaqtga qanday bogʻlanganligi 9-rasmdagi grafikda tasvirlangan.
[Rasm 9: "yoʻl (m) – vaqt (s)" grafigi; 0 dan 2 sekundgacha yoʻl 2 m da oʻzgarmaydi (gorizontal), keyin tobora tezroq oʻsib, 8-sekundda 6 m ga yetadi.]
Nuqtaning a) dastlabki 4 sekund; b) soʻnggi 4 sekund; c) 8 sekund mobaynidagi oʻrtacha tezligini toping.`
  },
  {
    id: 'm11-1-p10c',
    section: '1–2',
    page: 10,
    heading: 'Mashq 7: dori dozasi va harakat qonuni grafiklari',
    text: `7. 1) Dalaga turli miqdordagi (dozadagi) dori bilan ishlov berilganda 1 m² da mavjud boʻlgan zararli hasharotlar sonining oʻzgarishi 10-rasmdagi grafikda koʻrsatilgan.
[Rasm 10 (11-bet): "soni (dona/kv.m) – doza (g)" grafigi; 0 g da 35 ta, 4 g da taxminan 29 ta, 10 g da taxminan 2 ta, 10 g dan 14 g gacha deyarli oʻzgarmaydi.]
a) 1) doza 0 grammdan 10 grammgacha oshirilsa; 2) 4 grammdan 7 grammgacha oshirilsa, 1 m² da mavjud boʻlgan zararli hasharotlar sonining oʻzgarishini toping. b) doza 10 grammdan 14 grammgacha oshirilsa, qanday hodisa roʻy beradi?
2) Moddiy nuqtaning toʻgʻri chiziq boʻyicha harakat qonuni s(t) ning grafigi rasmda berilgan.
[Rasm (11-bet): "yoʻl (m) – vaqt (s)" grafigi; s(1) = 2, s(2) = 4, s(3) = 6, s(4) = 6, s(5) = 5, s(6) = 3, s(7) = 2, s(8) = 3.]
a) s(2), s(3), s(5), s(7) sonlar nechaga teng? b) Qaysi oraliqlarda funksiya oʻsuvchi? c) Qaysi oraliqda funksiya kamayuvchi? d) s(3) − s(1), s(5) − s(4), s(7) − s(6), s(8) − s(6) orttirmalarni hisoblang.`
  },
  {
    id: 'm11-1-p12a',
    section: '3–4',
    page: 12,
    heading: 'Limit haqida tushuncha: chapdan va oʻngdan yaqinlashish',
    text: `3–4-mavzu: LIMIT HAQIDA TUSHUNCHA.
x ning qiymatlari 2 dan kichik boʻlib, 2 ga yaqinlasha borganda f(x) = x² funksiyaning qiymatlari jadvalini qaraylik:
x: 1; 1,9; 1,99; 1,999; 1,9999 → f(x): 1; 3,61; 3,9601; ≈ 3,99600; ≈ 3,99960.
Jadvaldan koʻrinib turibdiki, x ning qiymatlari 2 ga qancha yaqin boʻlaversa (yaqinlashsa), f(x) funksiyaning mos qiymatlari ham 4 soniga yaqinlashaveradi. Bunday holatda x argument (oʻzgaruvchi) 2 ga chapdan yaqinlashganda f(x) ning qiymatlari 4 soniga yaqinlashadi deymiz.
Endi x ning qiymatlari 2 dan katta boʻlib, 2 ga yaqinlasha borganida f(x) = x² funksiyaning qiymatlari jadvalini qaraylik:
x: 3; 2,1; 2,01; 2,001; 2,0001 → f(x): 9; 4,41; 4,0401; ≈ 4,00400; ≈ 4,00040.
Bunday holatda x argument 2 ga oʻngdan yaqinlashganda, f(x) funksiya qiymatlari 4 soniga yaqinlashadi deymiz.`
  },
  {
    id: 'm11-1-p12b',
    section: '3–4',
    page: 12,
    heading: 'Funksiya limiti taʼrifi',
    text: `Yuqoridagi ikki holatni umumlashtirib, x argument 2 ga yaqinlashganda, f(x) ning qiymatlari 4 soniga yaqinlashadi deymiz va buni quyidagicha yozamiz: lim (x→2) x² = 4.
Bu yozuv shunday oʻqiladi: x argument 2 ga yaqinlashganda, f(x) = x² funksiyaning limiti 4 ga teng.
Asosiy maʼlumot. Umumiy holda funksiya limiti tushunchasiga quyidagicha yondashiladi: x ≠ a boʻlib, uning qiymatlari a soniga yaqinlashsa, f(x) ning mos qiymatlari A soniga yaqinlashsin. Bu holda A sonni x a ga yaqinlashganda f(x) funksiyaning limiti deyiladi va bunday belgilanadi: lim (x→a) f(x) = A.
Ayrim hollarda mazkur holatni x ning qiymatlari a ga intilganda f(x) funksiya A ga intiladi, deymiz.`
  },
  {
    id: 'm11-1-p13',
    section: '3–4',
    page: 13,
    heading: 'Eslatma va misol: uzilish nuqtasi',
    text: `lim (x→a) f(x) = A yozuv oʻrniga x→a da f(x)→A yozuv ham qoʻllaniladi.
Eslatma. x ning qiymati a ga intilganda x ≠ a sharti bajarilishining muhimligini aytib oʻtish joiz.
Misol. x→0 boʻlganda f(x) = (5x + x²) / x funksiyaning limitini toping.
Yechish. x ≠ 0 sharti bajarilmasin, yaʼni x = 0 boʻlsin. x = 0 qiymatni f(x) ga bevosita qoʻyib koʻrsak, 0/0 koʻrinishdagi aniqmaslikka ega boʻlamiz. Boshqa tomondan, f(x) = x(5 + x) / x boʻlgani uchun bu funksiya ushbu koʻrinishni oladi: f(x) = 5 + x, agar x ≠ 0 boʻlsa; aniqlanmagan, agar x = 0 boʻlsa.
y = f(x) funksiyaning grafigi (0; 5) koordinatali nuqtasi "olib tashlangan" y = x + 5 toʻgʻri chiziq koʻrinishida boʻladi (11-rasm).
[Rasm 11: y = x + 5 toʻgʻri chiziq, x oʻqini −5 da kesadi; (0; 5) nuqtada boʻsh doiracha – uzilish nuqtasi.]
(0; 5) koordinatali nuqta y = f(x) funksiyaning uzilish nuqtasi deyiladi. Koʻrinib turibdiki, bu nuqtadan farqli boʻlgan nuqtalarda x ning qiymatlari 0 ga yaqinlashganda f(x) funksiyaning mos qiymatlari 5 ga yaqinlashadi, yaʼni uning limiti mavjud: lim (x→0) (5x + x²) / x = 5.`
  },
  {
    id: 'm11-1-p14a',
    section: '3–4',
    page: 14,
    heading: '1-misol: limitlarni hisoblash',
    text: `Amalda, funksiya limitini topish uchun, lozim boʻlsa, tegishli soddalashtirishlarni bajarish maqsadga muvofiq.
1-misol. Limitlarni hisoblang: a) lim (x→2) x²; b) lim (x→0) (x² + 3x) / x; c) lim (x→3) (x² − 9) / (x − 3).
Yechish. a) x ning qiymatlari 2 ga yaqinlashganda x² ning qiymatlari 4 ga yaqinlashadi, yaʼni lim (x→2) x² = 4.
b) x ≠ 0 boʻlgani uchun lim (x→0) (x² + 3x) / x = lim (x→0) x(x + 3) / x = lim (x→0) (x + 3) = 3.
c) x ≠ 3 boʻlgani uchun lim (x→3) (x² − 9) / (x − 3) = lim (x→3) (x + 3)(x − 3) / (x − 3) = lim (x→3) (x + 3) = 6.`
  },
  {
    id: 'm11-1-p14b',
    section: '3–4',
    page: 14,
    heading: 'Mashqlar 8–11: limitni hisoblang',
    text: `Mashqlar. Limitni hisoblang (8–11):
8. a) lim (x→3) (x + 4); b) lim (x→−1) (5 − 2x); c) lim (x→4) (3x − 1); d) lim (x→2) (5x² − 3x + 2); e) lim (h→0) h²(1 − h); f) lim (x→0) (x² + 5).
9. a) lim (x→5) 5; b) lim (h→2) 7; c) lim (x→0) c, c – oʻzgarmas son.
10. a) lim (x→1) (x² − 3x) / x; b) lim (h→2) (h² + 5h) / h; c) lim (x→0) (x − 1) / (x + 1); d) lim (x→0) x / x.
11. a) lim (x→0) (x² − 3x) / x; b) lim (x→0) (x² − 5x) / x; c) lim (x→0) (2x² − x) / x; d) lim (h→0) (2h² + 6h) / h; e) lim (h→0) (3h² − 4h) / h; f) lim (h→0) (h³ − 8h) / h; g) lim (x→1) (x² − x) / (x − 1); h) lim (x→2) (x² − 2x) / (x − 2); i) lim (x→3) (x² − x − 6) / (x − 3).`
  },
  {
    id: 'm11-1-p15',
    section: '3–4',
    page: 15,
    heading: 'Mashq 12: grafik boʻyicha limit',
    text: `12. Quyidagi funksiyalardan qaysi biri x→3 da limitga ega? Shu limitni toping.
[Rasm (15-bet): sakkizta grafik, har birida x = 3 da shtrix chiziq: 1) x = 3 da boʻsh doiracha, ikki tomondan 3 ga yaqinlashadi; 2) ikki tomondan 4 ga yaqinlashadi, lekin f(3) = 3 (toʻla nuqta); 3) ikki tomondan 4 ga yaqinlashadi, uzluksiz choʻqqi; 4) x = 3 da sakrash: chap va oʻng tomondan turli qiymatlarga (taxminan 3 va 4) yaqinlashadi; 5) x = 3 atrofida ikki tomondan cheksiz oʻsadi; 6) chapdan 3 ga yaqinlashadi, oʻngdan cheksiz oʻsadi; 7) x = 3 da sakrash: chap va oʻng tomondan turli qiymatlarga yaqinlashadi (oʻngdan 5 ga); 8) x = 3 da 0 ga teng, ikki tomondan 0 ga yaqinlashadi (V shaklida).]`
  }
];
