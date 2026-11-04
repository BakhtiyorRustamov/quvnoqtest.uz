import type { G11Question } from '../diagnostic';
import { R, pick, shuffle, mc, mcn, tryGen, tryBlock, toQuestions, matchBlock, type Q } from './gen';

/**
 * Informatika va axborot texnologiyalari — test generatori. Rasmiy tafsilot (attestatsiya, 2025): 40 ta topshiriq, 120 daqiqa,
 * 12 boʻlim: axborot olami 5, texnik/dasturiy taʼminot 2, mantiq 5, algoritmlash 3, dasturlash 5, MS Office 5 (shundan 3 tasi
 * moslashtirish), maʼlumotlar bazasi 3, grafik muharrirlar 2, internet 2, veb-texnologiya 4, axborot xavfsizligi 2, SMM/CMS/LMS/MOOC 2.
 * Turlari: Y1 (bitta toʻgʻri javob), Y2 (bir nechta toʻgʻri javob — raqamlar kombinatsiyasi), Y3 (moslashtirish).
 */
export const INF_EXAM_MINUTES = 120;

const NB = '\u00a0\u00a0\u00a0\u00a0'; // kod chekinishi (pre-line boʻsh joylarni yigʻmasligi uchun)
const fixed = (rows: [string, string, string[], string][]) => () => {
  const [q, a, w, e] = pick(rows);
  return mc(q, a, w, e);
};
const pickFact = (title: string, rows: [string, string][], explain: (q: string, a: string) => string, extra: string[] = []) => () => {
  const [q, a] = pick(rows);
  const others = Array.from(new Set([...rows.map((r) => r[1]), ...extra].filter((x) => x !== a)));
  return mc(title.replace('{q}', q), a, others, explain(q, a));
};
/** Y2: toʻgʻri tasdiqlar raqamlari kombinatsiyasi */
function multi(title: string, items: [string, boolean][]): Q {
  const s = shuffle(items).slice(0, 4);
  const right = s.map((x, i) => (x[1] ? i + 1 : 0)).filter(Boolean);
  if (right.length < 1 || right.length > 3) throw new Error('multi');
  const key = right.join(', ');
  const combos = new Set<string>();
  while (combos.size < 6) {
    const k = R(1, 3);
    const c = shuffle([1, 2, 3, 4]).slice(0, k).sort().join(', ');
    if (c !== key) combos.add(c);
  }
  return mc(`${title}\n${s.map((x, i) => `${i + 1}) ${x[0]}`).join('\n')}`, key, [...combos], `Toʻgʻri tasdiqlar: ${key}.`);
}
const intChoices = (x: number, extra: number[] = []) => [...extra, x + 1, x - 1, x * 2, x + 2, x - 2, Math.floor(x / 2), x + 10].filter((v) => Number.isInteger(v) && v >= 0 && v !== x).map(String);
const mci = (text: string, x: number, explain: string, extra: number[] = []) => mc(text, String(x), intChoices(x, extra), explain);

/* ====================== 1. Informatika va axborot olami (5) ====================== */
const A_dec2bin = () => {
  const n = R(10, 120);
  const b = n.toString(2);
  return mc(`${n}₁₀ sonini ikkilik sanoq sistemasiga oʻtkazing.`, b + '₂', [(n + 1).toString(2), (n - 1).toString(2), b.split('').reverse().join(''), (n * 2).toString(2), (n + 2).toString(2)].filter((x) => x !== b).map((x) => x + '₂'), `${n} ni 2 ga ketma-ket boʻlib, qoldiqlarni teskari tartibda yozamiz: ${b}₂.`);
};
const A_bin2dec = () => {
  const n = R(9, 200);
  return mci(`${n.toString(2)}₂ sonini oʻnlik sanoq sistemasiga oʻtkazing.`, n, `Har bir razryad 2 ning darajasiga koʻpaytirilib qoʻshiladi: ${n}.`);
};
const A_hex = () => {
  const n = R(26, 250);
  return mci(`${n.toString(16).toUpperCase()}₁₆ sonini oʻnlik sanoq sistemasiga oʻtkazing.`, n, `${n.toString(16).toUpperCase()}₁₆ = ${n}₁₀ (A=10, B=11, …, F=15).`, [n + 6, n - 6]);
};
const A_binAdd = () => {
  const a = R(5, 40);
  const b = R(5, 40);
  const s = (a + b).toString(2);
  return mc(`Ikkilik sonlarni qoʻshing: ${a.toString(2)}₂ + ${b.toString(2)}₂`, s + '₂', [(a + b + 1).toString(2), (a + b - 1).toString(2), (a + b + 4).toString(2), (a + b + 2).toString(2)].filter((x) => x !== s).map((x) => x + '₂'), `${a} + ${b} = ${a + b} = ${s}₂.`);
};
const A_text = () => {
  const pages = pick([2, 4, 8, 16]);
  const lines = pick([32, 64]);
  const chars = pick([32, 64]);
  const bits = pick([8, 16]);
  const kb = (pages * lines * chars * bits) / 8 / 1024;
  return mcn(`Matn ${pages} sahifadan iborat, har sahifada ${lines} qator, har qatorda ${chars} ta belgi bor. Har bir belgi ${bits} bit bilan kodlangan. Matnning axborot hajmini (Kbayt) toping.`, kb, `${pages}·${lines}·${chars}·${bits} bit = ${pages * lines * chars * bits} bit = ${(pages * lines * chars * bits) / 8} bayt = ${kb} Kbayt.`);
};
const A_image = () => {
  const w = pick([64, 128, 256]);
  const h = pick([64, 128, 256]);
  const colors = pick([2, 4, 16, 256]);
  const bits = Math.log2(colors);
  const kb = (w * h * bits) / 8 / 1024;
  return mcn(`${w}×${h} piksel oʻlchamli rasm ${colors} rangli palitrada saqlangan. Rasmning axborot hajmini (Kbayt) toping.`, kb, `Bir piksel uchun log₂${colors} = ${bits} bit; ${w}·${h}·${bits} bit = ${(w * h * bits) / 8} bayt = ${kb} Kbayt.`);
};
const A_units = fixed([
  ['1 Kbayt necha baytga teng?', '1024', ['1000', '512', '2048', '8'], '1 Kbayt = 2¹⁰ = 1024 bayt.'],
  ['1 bayt necha bitdan iborat?', '8', ['2', '4', '16', '1024'], '1 bayt = 8 bit.'],
  ['2 Mbayt necha Kbayt?', '2048', ['2000', '1024', '4096', '512'], '1 Mbayt = 1024 Kbayt ⇒ 2048 Kbayt.'],
  ['Axborotning eng kichik oʻlchov birligi qaysi?', 'bit', ['bayt', 'Kbayt', 'piksel', 'belgi'], 'Bit — axborotning eng kichik birligi (0 yoki 1).']
]);
const S1 = [A_dec2bin, A_bin2dec, A_hex, A_binAdd, A_text, A_image, A_units];

/* ================== 2. Kompyuterning texnik va dasturiy taʼminoti (2) ================== */
const B_fact = pickFact(
  'Quyidagilardan qaysi biri {q}?',
  [['operatsion tizim', 'Linux'], ['amaliy dastur', 'Microsoft Word'], ['kiritish qurilmasi', 'klaviatura'], ['chiqarish qurilmasi', 'printer'], ['tashqi xotira qurilmasi', 'fleshka (USB-disk)'], ['kompyuterning markaziy hisoblash qurilmasi', 'protsessor']],
  (q, a) => `${a} — ${q}.`
);
const B_multi = () =>
  multi('Toʻgʻri tasdiqlarni belgilang:', [
    ['Operativ xotira (RAM) dagi maʼlumotlar kompyuter oʻchirilganda yoʻqoladi', true],
    ['Drayver — qurilmaning operatsion tizim bilan ishlashini taʼminlovchi dastur', true],
    ['Monitor — kiritish qurilmasi', false],
    ['Windows va Linux — operatsion tizimlar', true],
    ['Protsessor — tashqi xotira qurilmasi', false],
    ['Antivirus — utilita (xizmat dasturi) turiga kiradi', true]
  ]);
const S2 = [B_fact, B_multi];

/* ====================== 3. Kompyuterning mantiqiy ishlash prinsipi (5) ====================== */
const OPS: [string, (a: boolean, b: boolean) => boolean, string][] = [
  ['∧', (a, b) => a && b, 'konyunksiya (VA)'],
  ['∨', (a, b) => a || b, 'dizyunksiya (YOKI)'],
  ['→', (a, b) => !a || b, 'implikatsiya'],
  ['≡', (a, b) => a === b, 'ekvivalensiya']
];
const v = (x: boolean) => (x ? '1' : '0');
const C_eval = () => {
  const A = Math.random() < 0.5, B = Math.random() < 0.5, C = Math.random() < 0.5;
  const [o1, f1] = pick(OPS);
  const [o2, f2] = pick(OPS);
  const notB = Math.random() < 0.5;
  const left = f1(A, notB ? !B : B);
  const res = f2(left, C);
  return mc(`A = ${v(A)}, B = ${v(B)}, C = ${v(C)} boʻlsa, (A ${o1} ${notB ? '¬B' : 'B'}) ${o2} C ifodaning qiymatini toping.`, v(res), [v(!res), 'aniqlab boʻlmaydi', '2'], `Qavs ichi: ${v(left)}; natija: ${v(left)} ${o2} ${v(C)} = ${v(res)}.`);
};
const C_rows = () => {
  const n = R(2, 5);
  return mci(`${n} ta oʻzgaruvchili mantiqiy ifodaning rostlik jadvalida nechta satr (toʻplam) boʻladi?`, 2 ** n, `Satrlar soni 2ⁿ = 2^${n} = ${2 ** n}.`, [n * 2, n ** 2]);
};
const C_count = () => {
  const [o, f, name] = pick(OPS);
  const cnt = [[0, 0], [0, 1], [1, 0], [1, 1]].filter(([a, b]) => f(!!a, !!b)).length;
  return mci(`A ${o} B (${name}) ifoda rostlik jadvalining nechta satrida 1 (rost) qiymat qabul qiladi?`, cnt, `00, 01, 10, 11 toʻplamlarda tekshiramiz: ${cnt} ta satrda 1.`);
};
const C_name = pickFact('«{q}» mantiqiy amali qanday ataladi?', OPS.map(([o, , n]) => [o, n] as [string, string]).concat([['¬', 'inversiya (EMAS)']]), (q, a) => `${q} — ${a}.`);
const S3 = [C_eval, C_eval, C_rows, C_count, C_name];

/* ============================ 4. Algoritmlash asoslari (3) ============================ */
const D_trace = () => {
  const n = R(3, 7);
  const k = pick([1, 2, 3]);
  let s = 0;
  for (let i = 1; i <= n; i++) s += i * k;
  return mci(`Algoritm bajarilgandan keyin s ning qiymati nechaga teng?\ns ← 0\ni ← 1 dan ${n} gacha takrorla:\n${NB}s ← s + i·${k}\nchiqar s`, s, `s = ${k}·(1 + … + ${n}) = ${s}.`, [s - n * k, s + (n + 1) * k]);
};
const D_fact = fixed([
  ['Blok-sxemada romb shakli nimani bildiradi?', 'shart tekshirish (tarmoqlanish)', ['algoritm boshi va oxiri', 'maʼlumot kiritish', 'amal bajarish', 'takrorlanish soni'], 'Romb — shart (tarmoqlanish) bloki.'],
  ['Algoritmning har bir qadami bir xil tushunilishi va bajarilishi qanday xossa deyiladi?', 'aniqlik', ['diskretlik', 'ommaviylik', 'natijaviylik', 'tezkorlik'], 'Aniqlik — har bir buyruq bir maʼnoli boʻlishi.'],
  ['Algoritmning alohida qadamlarga boʻlinishi qanday xossa?', 'diskretlik', ['aniqlik', 'ommaviylik', 'natijaviylik', 'tushunarlilik'], 'Diskretlik — algoritm ketma-ket qadamlardan iborat boʻladi.'],
  ['Bir xil turdagi koʻp masalalarni yechishga yaroqlilik qanday xossa?', 'ommaviylik', ['diskretlik', 'aniqlik', 'natijaviylik', 'qisqalik'], 'Ommaviylik — algoritm bir sinf masalalari uchun qoʻllanadi.']
]);
const D_while = () => {
  const n0 = R(20, 200);
  let n = n0, c = 0;
  while (n > 0) { n = Math.floor(n / 2); c++; }
  return mci(`Algoritm natijasida k nechaga teng?\nn ← ${n0}; k ← 0\nn > 0 boʻlguncha takrorla:\n${NB}n ← n div 2\n${NB}k ← k + 1\nchiqar k`, c, `n har qadamda 2 marta kamayadi; ${c} qadamdan keyin n = 0.`);
};
const S4 = [D_trace, D_while, D_fact];

/* ======================= 5. Dasturlash texnologiyasi va asoslari (5) ======================= */
const P_sum = () => {
  const a = R(1, 4), b = R(5, 10), st = pick([1, 2]);
  let s = 0;
  for (let i = a; i < b; i += st) s += i;
  return mci(`Python dasturi natijasini toping:\ns = 0\nfor i in range(${a}, ${b}${st > 1 ? `, ${st}` : ''}):\n${NB}s += i\nprint(s)`, s, `range(${a}, ${b}${st > 1 ? `, ${st}` : ''}) — ${b} kirmaydi; yigʻindi ${s}.`, [s + b, s - a]);
};
const P_mod = () => {
  const a = R(17, 99), b = R(3, 9);
  const op = pick(['//', '%']);
  const r = op === '//' ? Math.floor(a / b) : a % b;
  return mci(`Python: print(${a} ${op} ${b}) natijasi nima?`, r, `${op === '//' ? 'Butun boʻlish' : 'Qoldiq'}: ${a} ${op} ${b} = ${r}.`, [op === '//' ? a % b : Math.floor(a / b)]);
};
const P_str = () => {
  const w = pick(['informatika', 'dasturlash', 'algoritm', 'kompyuter', 'Toshkent']);
  const t = R(0, 2);
  if (t === 0) return mci(`Python: print(len("${w}")) natijasi nima?`, w.length, `"${w}" satrida ${w.length} ta belgi bor.`);
  if (t === 1) {
    const i = R(0, 4);
    return mc(`Python: print("${w}"[${i}]) natijasi nima?`, w[i], [w[i + 1], w[Math.max(0, i - 1)] === w[i] ? w[i + 2] : w[Math.max(0, i - 1)], w[w.length - 1], w[i + 2]].filter((x) => x && x !== w[i]), `Indekslash 0 dan boshlanadi: [${i}] → "${w[i]}".`);
  }
  return mc(`Python: print("${w}"[:3]) natijasi nima?`, w.slice(0, 3), [w.slice(0, 4), w.slice(1, 4), w.slice(-3), w.slice(0, 2)].filter((x) => x !== w.slice(0, 3)), `[:3] — 0, 1, 2-indeksdagi belgilar: "${w.slice(0, 3)}".`);
};
const P_list = () => {
  const xs = Array.from({ length: 5 }, () => R(1, 20));
  const t = R(0, 2);
  if (t === 0) return mci(`Python:\na = [${xs.join(', ')}]\nprint(a[-1] + a[1])`, xs[4] + xs[1], `a[-1] = ${xs[4]}, a[1] = ${xs[1]} ⇒ ${xs[4] + xs[1]}.`, [xs[4] + xs[0]]);
  if (t === 1) return mci(`Python:\na = [${xs.join(', ')}]\nprint(max(a) - min(a))`, Math.max(...xs) - Math.min(...xs), `max = ${Math.max(...xs)}, min = ${Math.min(...xs)}.`);
  const c = xs.filter((x) => x % 2 === 0).length;
  return mci(`Python:\na = [${xs.join(', ')}]\nk = 0\nfor x in a:\n${NB}if x % 2 == 0:\n${NB}${NB}k += 1\nprint(k)`, c, `Juft sonlar soni: ${c}.`, [5 - c]);
};
const P_js = () => {
  const xs = Array.from({ length: R(3, 6) }, () => R(1, 9));
  const t = R(0, 1);
  if (t === 0) return mci(`JavaScript: let a = [${xs.join(', ')}]; a.push(${R(1, 9)}); console.log(a.length);`, xs.length + 1, `push massiv oxiriga bitta element qoʻshadi: ${xs.length + 1}.`);
  return mc('JavaScript: console.log(typeof "5" + 3) natijasi nima?', 'string3', ['8', 'number', 'string', '53'], 'typeof "5" → "string"; "string" + 3 → "string3".');
};
const P_fact = fixed([
  ['Dastur matnini toʻliq mashina kodiga oʻgirib, keyin bajaradigan dastur qanday ataladi?', 'kompilyator', ['interpretator', 'drayver', 'brauzer', 'antivirus'], 'Kompilyator butun dasturni oldindan tarjima qiladi; interpretator — satrma-satr.'],
  ['Pythonda shart operatori qaysi kalit soʻz bilan boshlanadi?', 'if', ['for', 'def', 'while', 'print'], 'if — shart operatori.'],
  ['Pythonda funksiya qaysi kalit soʻz bilan eʼlon qilinadi?', 'def', ['function', 'func', 'let', 'var'], 'def nomi(parametrlar):']
]);
const S5 = [P_sum, P_mod, P_str, P_list, P_js, P_fact];

/* ============================ 6. Microsoft Office (2 + 3 moslashtirish) ============================ */
const O_excel = () => {
  const xs = Array.from({ length: 4 }, () => R(2, 30));
  const [f, val] = pick([
    ['SUM', xs.reduce((a, b) => a + b, 0)],
    ['MAX', Math.max(...xs)],
    ['MIN', Math.min(...xs)],
    ['AVERAGE', xs.reduce((a, b) => a + b, 0) / 4]
  ] as [string, number][]);
  return (Number.isInteger(val) ? mci : mcn)(`Excel: A1 = ${xs[0]}, A2 = ${xs[1]}, A3 = ${xs[2]}, A4 = ${xs[3]}. =${f}(A1:A4) formulasi natijasi nima?`, val, `${f} funksiyasi A1:A4 diapazoni boʻyicha: ${val}.`);
};
const O_fact = fixed([
  ['Excelda $A$1 qanday murojaat (ssilka)?', 'absolyut murojaat', ['nisbiy murojaat', 'aralash murojaat', 'formula xatosi', 'diapazon'], '$ belgisi ustun va satrni qotiradi — absolyut murojaat.'],
  ['Excelda formula qaysi belgi bilan boshlanadi?', '=', ['+', '#', '@', '$'], 'Formula «=» bilan boshlanadi.'],
  ['PowerPoint dasturi asosan nima uchun ishlatiladi?', 'taqdimotlar (slaydlar) yaratish uchun', ['jadval hisob-kitoblari uchun', 'maʼlumotlar bazasi uchun', 'rasm chizish uchun', 'dastur yozish uchun'], 'PowerPoint — taqdimot dasturi.']
]);
function officeMatch(): Q[] {
  const rows: [string, string][] = [['SUM', 'yigʻindini hisoblaydi'], ['AVERAGE', 'oʻrta arifmetikni hisoblaydi'], ['MAX', 'eng katta qiymatni topadi'], ['MIN', 'eng kichik qiymatni topadi'], ['COUNT', 'sonli kataklar sonini hisoblaydi'], ['IF', 'shartga koʻra qiymat tanlaydi']];
  return matchBlock('', 'Moslashtirish: Excel funksiyalarini ularning vazifasi bilan moslashtiring.', shuffle(rows).slice(0, 3).map(([a, b]) => [`=${a}() funksiyasi nima qiladi?`, b, `${a} — ${b}.`] as [string, string, string]), rows.map((r) => r[1]));
}
const S6 = [O_excel, O_fact];

/* ============================== 7. Maʼlumotlar bazasi (3) ============================== */
const DB_sql = pickFact(
  'SQL tilidagi {q} buyrugʻi nima vazifani bajaradi?',
  [['SELECT', 'jadvaldan maʼlumot tanlaydi'], ['INSERT', 'jadvalga yangi yozuv qoʻshadi'], ['UPDATE', 'mavjud yozuvlarni oʻzgartiradi'], ['DELETE', 'yozuvlarni oʻchiradi']],
  (q, a) => `${q} — ${a}.`
);
const DB_count = () => {
  const ages = Array.from({ length: 6 }, () => R(14, 19));
  const k = R(15, 17);
  const c = ages.filter((a) => a > k).length;
  return mci(`«Oʻquvchilar» jadvalida yosh maydoni qiymatlari: ${ages.join(', ')}.\nSELECT * FROM Oquvchilar WHERE yosh > ${k}; soʻrovi nechta yozuv qaytaradi?`, c, `${k} dan katta qiymatlar: ${c} ta.`, [ages.filter((a) => a >= k).length]);
};
const DB_fact = fixed([
  ['Relyatsion maʼlumotlar bazasida jadvalning satri qanday ataladi?', 'yozuv', ['maydon', 'kalit', 'soʻrov', 'forma'], 'Satr — yozuv, ustun — maydon.'],
  ['Jadvaldagi har bir yozuvni yagona aniqlaydigan maydon qanday ataladi?', 'birlamchi kalit', ['indeks', 'soʻrov', 'hisobot', 'filtr'], 'Birlamchi kalit (primary key) takrorlanmaydi.'],
  ['Qaysi dastur maʼlumotlar bazasini boshqarish tizimi (MBBT)?', 'Microsoft Access', ['Microsoft Word', 'Paint', 'PowerPoint', 'Notepad'], 'Access — MBBT.']
]);
const S7 = [DB_sql, DB_count, DB_fact];

/* ============================== 8. Grafik muharrirlar (2) ============================== */
const G_fact = fixed([
  ['Ekranda ranglarni hosil qilish uchun qaysi rang modeli ishlatiladi?', 'RGB', ['CMYK', 'HSB', 'Lab', 'BMP'], 'RGB — qizil, yashil, koʻk nurlar qoʻshilishi (ekran).'],
  ['Bosmaxonada (printerda) qaysi rang modeli ishlatiladi?', 'CMYK', ['RGB', 'HTML', 'PNG', 'JPEG'], 'CMYK — havorang, qirmizi, sariq, qora boʻyoqlar.'],
  ['Kattalashtirilganda sifatini yoʻqotmaydigan grafika turi qaysi?', 'vektorli grafika', ['rastrli grafika', 'piksel grafika', 'BMP grafika', 'skanerlangan rasm'], 'Vektorli tasvir formulalar bilan beriladi, masshtablashda buzilmaydi.'],
  ['Qaysi dastur rastrli grafik muharrir?', 'Adobe Photoshop', ['Microsoft Excel', 'Microsoft Access', 'Notepad', 'Python'], 'Photoshop, GIMP, Paint — rastrli muharrirlar.'],
  ['RGB modelida (255, 255, 255) qaysi rangni bildiradi?', 'oq', ['qora', 'qizil', 'kulrang', 'koʻk'], 'Uchala komponenta maksimal — oq rang.']
]);
const S8 = [G_fact];

/* ============================== 9. Internetda ishlash asoslari (2) ============================== */
const N_net = () => {
  const a = R(10, 200), b = R(0, 255), c = R(0, 255), d = R(1, 254);
  const pre = pick([24, 16]);
  const net = pre === 24 ? `${a}.${b}.${c}.0` : `${a}.${b}.0.0`;
  const mask = pre === 24 ? '255.255.255.0' : '255.255.0.0';
  return mc(`IP-manzil ${a}.${b}.${c}.${d}, tarmoq niqobi ${mask}. Tarmoq manzilini toping.`, net, [`${a}.${b}.${c}.${d}`, `${a}.0.0.0`, pre === 24 ? `${a}.${b}.0.0` : `${a}.${b}.${c}.0`, `0.0.${c}.${d}`, `${a}.${b}.${c}.255`].filter((x) => x !== net), `IP va niqob razryadma-razryad «VA» amali bilan koʻpaytiriladi: ${net}.`);
};
const N_hosts = () => {
  const p = pick([24, 25, 26, 27, 28]);
  return mci(`/${p} niqobli tarmoqda nechta xostga (qurilmaga) manzil berish mumkin?`, 2 ** (32 - p) - 2, `2^(32−${p}) − 2 = ${2 ** (32 - p) - 2} (tarmoq va broadcast manzillari ayiriladi).`, [2 ** (32 - p)]);
};
const N_fact = fixed([
  ['Veb-sahifalarni uzatish uchun qaysi protokol ishlatiladi?', 'HTTP(S)', ['FTP', 'SMTP', 'POP3', 'DNS'], 'HTTP/HTTPS — gipermatn uzatish protokoli.'],
  ['Domen nomini IP-manzilga aylantiruvchi xizmat qaysi?', 'DNS', ['DHCP', 'HTTP', 'FTP', 'SMTP'], 'DNS — domen nomlari tizimi.'],
  ['Elektron pochta xatlarini joʻnatish protokoli qaysi?', 'SMTP', ['HTTP', 'FTP', 'DNS', 'TCP'], 'SMTP — pochta yuborish protokoli.']
]);
const S9 = [N_net, N_hosts, N_fact];

/* ============================ 10. Veb-texnologiya va veb-dizayn (4) ============================ */
const W_tag = pickFact(
  'HTML da {q} uchun qaysi teg ishlatiladi?',
  [['giperhavola yaratish', '<a>'], ['rasm qoʻyish', '<img>'], ['jadval yaratish', '<table>'], ['tartiblanmagan roʻyxat', '<ul>'], ['eng katta sarlavha', '<h1>'], ['xat boshi (paragraf)', '<p>']],
  (q, a) => `${q} — ${a} tegi.`
);
const W_css = pickFact(
  'CSS da {q} qaysi xossa bilan beriladi?',
  [['matn rangi', 'color'], ['fon rangi', 'background-color'], ['shrift oʻlchami', 'font-size'], ['ichki chekinish', 'padding'], ['tashqi chekinish', 'margin']],
  (q, a) => `${q} — ${a}.`
);
const W_fact = fixed([
  ['Saytning foydalanuvchi koʻradigan va u bilan ishlaydigan qismi qanday ataladi?', 'front-end', ['back-end', 'hosting', 'domen', 'server'], 'Front-end — brauzerdagi interfeys; back-end — server tomoni.'],
  ['Sayt fayllari joylashtiriladigan va internetga ulanadigan server xizmati qanday ataladi?', 'hosting', ['domen', 'brauzer', 'protokol', 'teg'], 'Hosting — saytni serverda joylashtirish xizmati.'],
  ['HTML hujjatning koʻrinadigan mazmuni qaysi teg ichida joylashadi?', '<body>', ['<head>', '<title>', '<meta>', '<html>'], 'Sahifa mazmuni <body> ichida.']
]);
const S10 = [W_tag, W_tag, W_css, W_fact];

/* ======================= 11. Axborot xavfsizligi va elektron hukumat (2) ======================= */
const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const X_caesar = () => {
  const w = pick(['KOD', 'DATA', 'WEB', 'BAYT', 'NET']);
  const k = R(1, 4);
  const enc = (s: string, n: number) => s.split('').map((ch) => ALPHA[(ALPHA.indexOf(ch) + n + 26) % 26]).join('');
  const ans = enc(w, k);
  return mc(`Sezar shifrida har bir harf lotin alifbosida ${k} ta oʻngga siljitiladi. «${w}» soʻzi qanday shifrlanadi?`, ans, [enc(w, -k), enc(w, k + 1), enc(w, k - 1 || k + 2), w.split('').reverse().join('')].filter((x) => x !== ans), `Har bir harf ${k} ta oʻngga: ${w} → ${ans}.`);
};
const X_fact = fixed([
  ['Shifrlash va deshifrlash uchun bitta kalit ishlatiladigan usul qanday ataladi?', 'simmetrik shifrlash', ['asimmetrik shifrlash', 'xeshlash', 'autentifikatsiya', 'arxivlash'], 'Simmetrik — bitta umumiy kalit; asimmetrik — ochiq va yopiq kalitlar.'],
  ['Foydalanuvchining shaxsini (login va parol orqali) tekshirish qanday ataladi?', 'autentifikatsiya', ['avtorizatsiya', 'shifrlash', 'arxivlash', 'formatlash'], 'Autentifikatsiya — haqiqiylikni tekshirish; avtorizatsiya — huquq berish.'],
  ['Elektron hujjatning muallifi va oʻzgartirilmaganligini tasdiqlovchi vosita qaysi?', 'elektron raqamli imzo (ERI)', ['parol', 'antivirus', 'arxiv fayl', 'brauzer'], 'ERI hujjat yaxlitligi va muallifligini tasdiqlaydi.']
]);
const S11 = [X_caesar, X_fact];

/* ======================== 12. SMM, CMS, LMS, MOOC va Web-freelance (2) ======================== */
const M_fact = pickFact(
  '{q} qaysi turdagi platforma?',
  [['WordPress', 'CMS (kontentni boshqarish tizimi)'], ['Moodle', 'LMS (taʼlimni boshqarish tizimi)'], ['Coursera', 'MOOC (ommaviy ochiq onlayn kurslar)'], ['Upwork', 'web-frilans platformasi']],
  (q, a) => `${q} — ${a}.`,
  ['SMM (ijtimoiy tarmoqlarda marketing)']
);
const M_smm = fixed([
  ['SMM nimani anglatadi?', 'ijtimoiy tarmoqlar orqali marketing', ['saytni dasturlash', 'maʼlumotlar bazasini boshqarish', 'onlayn taʼlim', 'kompyuter tarmoqlarini sozlash'], 'SMM — Social Media Marketing.'],
  ['Bulutli texnologiyalarga misol qaysi?', 'Google Drive', ['Paint', 'Notepad', 'Kalkulyator', 'BIOS'], 'Google Drive — fayllarni bulutda saqlash xizmati.']
]);
const S12 = [M_fact, M_smm];

/* -------------------------------- assemble -------------------------------- */
function distinct(pool: (() => Q)[], n: number, seen: Set<string>): Q[] {
  const out: Q[] = [];
  for (let tries = 0; out.length < n && tries < 300; tries++) {
    try {
      const q = tryGen(pool[tries < pool.length ? tries : R(0, pool.length - 1)]);
      if (seen.has(q.text)) continue;
      seen.add(q.text);
      out.push(q);
    } catch {
      /* again */
    }
  }
  if (out.length < n) throw new Error('pool too small');
  return out;
}
const sh = <T,>(a: T[]) => shuffle(a);

/** Yangi 40 topshiriqli variant (faqat klient tomonida — tasodifiy). */
export function buildInfExam(): G11Question[] {
  const seen = new Set<string>();
  const list: Q[] = [
    ...distinct(sh(S1), 5, seen),
    ...distinct(sh(S2), 2, seen),
    ...distinct(sh(S3), 5, seen),
    ...distinct(sh(S4), 3, seen),
    ...distinct(sh(S5), 5, seen),
    ...distinct(sh(S6), 2, seen),
    ...tryBlock(officeMatch),
    ...distinct(sh(S7), 3, seen),
    ...distinct(sh(S8), 2, seen),
    ...distinct(sh(S9), 2, seen),
    ...distinct(sh(S10), 4, seen),
    ...distinct(sh(S11), 2, seen),
    ...distinct(sh(S12), 2, seen)
  ];
  return toQuestions(list, 'g11-inf');
}
