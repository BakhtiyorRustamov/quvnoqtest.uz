import type { G11Question } from '../diagnostic';
import { R, pick, shuffle, mc, openN, tryGen, tryBlock, toQuestions, matchBlock, type Q } from './gen';

/**
 * Tarix — Milliy sertifikat formatidagi test generatori (DTM tafsiloti): 45 topshiriq, 90 daqiqa.
 * 1–20 siyosiy tarix, 21–26 ijtimoiy-iqtisodiy tarix, 27–32 madaniy tarix (Y-1);
 * 33–35 moslashtirish (Y-2); 36–44 siyosiy tarix, 45 ijtimoiy-iqtisodiy tarix — a/b bandli ochiq topshiriqlar.
 */
export const HIST_EXAM_MINUTES = 90;

/* ------------------------------- helpers ------------------------------- */
const yr = (y: number) => (y < 0 ? `mil. avv. ${-y}-yil` : `${y}-yil`);
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
const century = (y: number) => (y < 0 ? `mil. avv. ${ROMAN[Math.ceil(-y / 100)]} asr` : `${ROMAN[Math.ceil(y / 100)]} asr`);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** fact rows [question part, answer] → 4-option question; other answers + extra are distractors */
const pickFact = (title: string, rows: [string, string][], explain: (q: string, a: string) => string, extra: string[] = []) => () => {
  const [q, a] = pick(rows);
  const others = Array.from(new Set([...rows.map((r) => r[1]), ...extra].filter((x) => x !== a)));
  return mc(title.replace('{q}', q), a, others, explain(q, a));
};

/* ------------------------------- events ------------------------------- */
type Ev = [string, number];
/** siyosiy tarix: [voqea, yil] (manfiy — miloddan avvalgi) */
const POL: Ev[] = [
  ['Kir II ning Bobilni egallashi', -539],
  ['Kir II ning massagetlar bilan jangda halok boʻlishi', -530],
  ['Marafon jangi', -490],
  ['Salamin dengiz jangi', -480],
  ['Gavgamela jangi', -331],
  ['Spitamen boshchiligidagi qoʻzgʻolonning boshlanishi', -329],
  ['Aleksandr Makedonskiyning vafoti', -323],
  ['Rimda respublika tuzumining oʻrnatilishi', -509],
  ['Karfagenning rimliklar tomonidan vayron qilinishi', -146],
  ['Yuliy Sezarning oʻldirilishi', -44],
  ['Xitoyning Sin sulolasi davrida birlashtirilishi', -221],
  ['Rim imperiyasining Gʻarbiy va Sharqiy qismlarga boʻlinishi', 395],
  ['Gʻarbiy Rim imperiyasining qulashi', 476],
  ['Turk xoqonligining tashkil topishi', 552],
  ['Turk xoqonligining Gʻarbiy va Sharqiy xoqonliklarga boʻlinishi', 603],
  ['Puate jangi', 732],
  ['Talas (Atlax) jangi', 751],
  ['Buyuk Karlning imperator deb eʼlon qilinishi', 800],
  ['Verden shartnomasi', 843],
  ['Kiyev Rusida xristianlikning qabul qilinishi', 988],
  ['Somoniylar davlatining qoraxoniylar tomonidan tugatilishi', 999],
  ['Xristian cherkovining katolik va pravoslav cherkovlariga boʻlinishi', 1054],
  ['Gastings jangi', 1066],
  ['Birinchi salib yurishining boshlanishi', 1096],
  ['Temuchinning Chingizxon deb eʼlon qilinishi', 1206],
  ['Angliyada «Buyuk erkinliklar xartiyasi»ning qabul qilinishi', 1215],
  ['Moʻgʻullarning Oʻtrorni qamal qilishi', 1219],
  ['Moʻgʻullarning Buxoro va Samarqandni egallashi', 1220],
  ['Jaloliddin Manguberdining Parvon jangidagi gʻalabasi', 1221],
  ['Buxoroda Mahmud Torobiy qoʻzgʻoloni', 1238],
  ['Usmonli turklar davlatining tashkil topishi', 1299],
  ['Fransiyada General shtatlarning ilk bor chaqirilishi', 1302],
  ['Yuz yillik urushning boshlanishi', 1337],
  ['Amir Temurning Balx qurultoyida Movarounnahr hukmdori deb eʼlon qilinishi', 1370],
  ['Kulikovo jangi', 1380],
  ['Amir Temurning Terek daryosi boʻyida Toʻxtamish ustidan gʻalabasi', 1395],
  ['Anqara jangi', 1402],
  ['Amir Temurning vafoti', 1405],
  ['Mirzo Ulugʻbekning Samarqand hukmdori boʻlishi', 1409],
  ['Mirzo Ulugʻbekning oʻldirilishi', 1449],
  ['Usmonlilarning Konstantinopolni egallashi', 1453],
  ['Ugra daryosi boʻyidagi «turish» — rus yerlarining Oltin Oʻrda qaramligidan ozod boʻlishi', 1480],
  ['Kolumbning Amerikaga birinchi safari', 1492],
  ['Shayboniyxonning Samarqandni egallashi', 1500],
  ['Shayboniyxonning Hirotni egallashi', 1507],
  ['Shayboniyxonning Marv yaqinidagi jangda halok boʻlishi', 1510],
  ['Xiva xonligining tashkil topishi', 1512],
  ['Panipat jangi va Boburiylar davlatining asos solinishi', 1526],
  ['Buxoro xonligida ashtarxoniylar sulolasi hukmronligining boshlanishi', 1601],
  ['Angliya burjua inqilobining boshlanishi', 1640],
  ['Vestfal sulhi', 1648],
  ['Qoʻqon xonligining tashkil topishi', 1709],
  ['Nodirshohning Buxoro xonligiga yurishi', 1740],
  ['Buxoro amirligining (mangʻitlar sulolasi) tashkil topishi', 1756],
  ['AQSh Mustaqillik deklaratsiyasining qabul qilinishi', 1776],
  ['AQSh Konstitutsiyasining qabul qilinishi', 1787],
  ['Parijda Bastiliya qamoqxonasining olinishi', 1789],
  ['Napoleon Bonapartning imperator deb eʼlon qilinishi', 1804],
  ['Napoleonning Rossiyaga yurishi', 1812],
  ['Vaterloo jangi', 1815],
  ['AQShda fuqarolar urushining boshlanishi', 1861],
  ['Toshkentning Rossiya imperiyasi qoʻshinlari tomonidan bosib olinishi', 1865],
  ['Turkiston general-gubernatorligining tashkil etilishi', 1867],
  ['Yaponiyada Meydzi inqilobi', 1868],
  ['Buxoro amirligi ustidan Rossiya protektoratining oʻrnatilishi', 1868],
  ['Fransiya-Prussiya urushining boshlanishi', 1870],
  ['Germaniya imperiyasining eʼlon qilinishi', 1871],
  ['Xiva xonligi ustidan Rossiya protektoratining oʻrnatilishi (Gandimiyon shartnomasi)', 1873],
  ['Qoʻqon xonligining tugatilishi', 1876],
  ['Toshkentdagi «Vabo isyoni»', 1892],
  ['Andijon qoʻzgʻoloni', 1898],
  ['Rossiyada I Davlat dumasining ish boshlashi', 1906],
  ['Birinchi jahon urushining boshlanishi', 1914],
  ['Jizzax qoʻzgʻoloni', 1916],
  ['Turkiston Muxtoriyatining eʼlon qilinishi', 1917],
  ['Birinchi jahon urushining tugashi', 1918],
  ['Versal tinchlik shartnomasining imzolanishi', 1919],
  ['Buxoro amirligi va Xiva xonligining tugatilishi', 1920],
  ['SSSR ning tashkil topishi', 1922],
  ['Oʻzbekiston SSR ning tashkil topishi', 1924],
  ['Germaniyada natsistlarning hokimiyatga kelishi', 1933],
  ['Ikkinchi jahon urushining boshlanishi', 1939],
  ['Germaniyaning SSSR ga hujumi', 1941],
  ['Birlashgan Millatlar Tashkilotining tuzilishi', 1945],
  ['Hindistonning mustaqillikka erishishi', 1947],
  ['NATO ning tuzilishi', 1949],
  ['Xitoy Xalq Respublikasining tashkil topishi', 1949],
  ['Varshava shartnomasi tashkilotining tuzilishi', 1955],
  ['SSSRda «qayta qurish» siyosatining boshlanishi', 1985],
  ['Oʻzbek tiliga davlat tili maqomining berilishi', 1989],
  ['Berlin devorining qulashi', 1989],
  ['Germaniyaning birlashishi', 1990],
  ['Oʻzbekiston davlat mustaqilligining eʼlon qilinishi', 1991],
  ['Oʻzbekistonning BMT ga aʼzo boʻlishi', 1992],
  ['Oʻzbekiston Respublikasi Konstitutsiyasining qabul qilinishi', 1992],
  ['Shanxay hamkorlik tashkilotining tuzilishi', 2001]
];
/** ijtimoiy-iqtisodiy tarix voqealari */
const SOC: Ev[] = [
  ['Xitoy elchisi Chjan Szyanning Gʻarbiy oʻlkaga safari (Buyuk Ipak yoʻlining ochilishiga turtki)', -138],
  ['Rossiyada krepostnoylik huquqining bekor qilinishi', 1861],
  ['Krasnovodsk – Samarqand temir yoʻlining Samarqandga yetib kelishi', 1888],
  ['Orenburg – Toshkent temir yoʻlining qurib bitkazilishi', 1906],
  ['Rossiyada Stolipin agrar islohotining boshlanishi', 1906],
  ['Sovet Rossiyasida yangi iqtisodiy siyosat (NEP) ning joriy etilishi', 1921],
  ['Oʻzbekistonda «Hujum» harakatining boshlanishi', 1927],
  ['Jahon iqtisodiy inqirozining (Buyuk depressiya) boshlanishi', 1929],
  ['Oʻzbekistonda yoppasiga kollektivlashtirishning boshlanishi', 1929],
  ['AQShda F. Ruzveltning «Yangi kurs» siyosatining boshlanishi', 1933],
  ['«Marshall rejasi»ning eʼlon qilinishi', 1947],
  ['Oʻzbekistonda milliy valyuta — soʻmning muomalaga kiritilishi', 1994],
  ['Oʻzbekistonda lotin yozuviga asoslangan oʻzbek alifbosining qabul qilinishi', 1993]
];

/* ----------------------------- event templates ----------------------------- */
function yearChoices(y: number): string[] {
  const out = new Set<number>();
  while (out.size < 6) {
    const d = pick([1, 2, 3, 4, 5, 7, 10, 12, 15, 20, 25, 30, 40, 50]) * (Math.random() < 0.5 ? -1 : 1);
    const v = y + d;
    if (v === 0 || v === y || (y > 0 && v < 1) || v > 2017) continue;
    out.add(v);
  }
  return [...out].map(yr);
}
const evYear = (evs: Ev[]) => () => {
  const [e, y] = pick(evs);
  return mc(`${cap(e)} qaysi yilda sodir boʻlgan?`, yr(y), yearChoices(y), `${cap(e)} — ${yr(y)}.`);
};
const evCentury = (evs: Ev[]) => () => {
  const [e, y] = pick(evs);
  const c = Math.ceil(Math.abs(y) / 100) * Math.sign(y);
  const others = [c - 1, c + 1, c - 2, c + 2, c + 3].filter((v) => v !== 0 && v <= 21 && v >= -21).map((v) => century(v > 0 ? v * 100 : v * 100));
  return mc(`${cap(e)} qaysi asrda sodir boʻlgan?`, century(y), others, `${cap(e)} — ${yr(y)}, yaʼni ${century(y)}.`);
};
/** four events with distinct years */
function four(evs: Ev[], maxSpan = 2100): Ev[] {
  for (let t = 0; t < 50; t++) {
    const s = shuffle(evs).slice(0, 4);
    const ys = s.map((e) => e[1]);
    if (new Set(ys).size === 4 && Math.max(...ys) - Math.min(...ys) <= maxSpan) return s;
  }
  throw new Error('four');
}
const evEarliest = (evs: Ev[]) => () => {
  const s = four(evs, 400);
  const late = Math.random() < 0.5;
  const ans = [...s].sort((a, b) => (late ? b[1] - a[1] : a[1] - b[1]))[0];
  return mc(
    `Quyidagi voqealardan qaysi biri ${late ? 'eng keyin' : 'eng avval'} sodir boʻlgan?`,
    cap(ans[0]),
    s.filter((e) => e !== ans).map((e) => cap(e[0])),
    s.map((e) => `${cap(e[0])} — ${yr(e[1])}`).join('; ') + '.'
  );
};
const evOrder = (evs: Ev[]) => () => {
  const s = four(evs);
  const order = [0, 1, 2, 3].sort((a, b) => s[a][1] - s[b][1]).map((i) => i + 1).join(', ');
  const wrong = new Set<string>();
  while (wrong.size < 5) {
    const p = shuffle([1, 2, 3, 4]).join(', ');
    if (p !== order) wrong.add(p);
  }
  return mc(
    `Voqealarni xronologik ketma-ketlikda joylashtiring:\n1) ${s[0][0]};\n2) ${s[1][0]};\n3) ${s[2][0]};\n4) ${s[3][0]}.`,
    order,
    [...wrong],
    s.map((e, i) => `${i + 1}) ${yr(e[1])}`).join('; ') + `. Toʻgʻri tartib: ${order}.`
  );
};

/* ----------------------------- fact templates ----------------------------- */
const F_founder = pickFact(
  '{q} asoschisi kim?',
  [
    ['Ahamoniylar davlatining', 'Kir II'],
    ['Salavkiylar davlatining', 'Salavk I'],
    ['Yunon-Baqtriya podsholigining', 'Diodot'],
    ['Franklar davlatining', 'Xlodvig'],
    ['Moʻgʻullar imperiyasining', 'Chingizxon'],
    ['Oltin Oʻrda davlatining', 'Botuxon'],
    ['Usmonli turklar davlatining', 'Usmon I'],
    ['Saljuqiylar davlatining', 'Toʻgʻrulbek'],
    ['Qoʻqon xonligining', 'Shohruxbiy'],
    ['Buxoro amirligining (mangʻitlar sulolasi)', 'Muhammad Rahimbiy'],
    ['Xiva xonligining', 'Elbarsxon'],
    ['Buxoro xonligida ashtarxoniylar sulolasi hukmronligining', 'Boqi Muhammad']
  ],
  (q, a) => `${cap(q)} asoschisi — ${a}.`
);
const F_capital = pickFact(
  '{q} poytaxti qaysi shahar boʻlgan?',
  [
    ['Somoniylar davlatining', 'Buxoro'],
    ['Gʻaznaviylar davlatining', 'Gʻazna'],
    ['Xorazmshoh-anushteginiylar davlatining', 'Urganch'],
    ['Amir Temur saltanatining', 'Samarqand'],
    ['Shohrux davrida temuriylar davlatining', 'Hirot'],
    ['Qoʻqon xonligining', 'Qoʻqon'],
    ['Usmonli imperiyasining (1453-yildan)', 'Istanbul'],
    ['Oltin Oʻrdaning', 'Saroy'],
    ['Oʻzbekiston SSR ning 1924–1930-yillarda', 'Samarqand']
  ],
  (q, a) => `${cap(q)} poytaxti — ${a}.`,
  ['Termiz', 'Nasaf']
);
const F_fighter = pickFact(
  '{q} kimga (kimlarga) qarshi kurashgan?',
  [
    ['Spitamen', 'Aleksandr Makedonskiy qoʻshinlariga'],
    ['Massagetlar malikasi Tomiris', 'Kir II qoʻshinlariga'],
    ['Shiroq', 'Doro I qoʻshinlariga'],
    ['Muqanna', 'arab xalifaligiga'],
    ['Jaloliddin Manguberdi', 'moʻgʻul bosqinchilariga'],
    ['Temur Malik', 'moʻgʻul bosqinchilariga'],
    ['Dukchi eshon', 'Rossiya imperiyasi mustamlakachilariga']
  ],
  (q, a) => `${q} — ${a} qarshi kurashgan.`
);
const F_battle = pickFact(
  '{q} kimlar oʻrtasida boʻlib oʻtgan?',
  [
    ['Anqara jangi (1402)', 'Amir Temur va Usmonli sulton Boyazid I'],
    ['Talas jangi (751)', 'arablar va Xitoy (Tan imperiyasi) qoʻshinlari'],
    ['Gavgamela jangi (mil. avv. 331)', 'Aleksandr Makedonskiy va Doro III'],
    ['Panipat jangi (1526)', 'Bobur va Ibrohim Lodiy'],
    ['Kulikovo jangi (1380)', 'rus knyazliklari va Oltin Oʻrda'],
    ['Gastings jangi (1066)', 'normandlar va anglosakslar'],
    ['Vaterloo jangi (1815)', 'Napoleon va ittifoqchilar (Angliya, Prussiya)']
  ],
  (q, a) => `${q}: ${a}.`
);
const F_figure = pickFact(
  'Quyidagi tarixiy shaxs kim boʻlgan: {q}?',
  [
    ['K. P. fon Kaufman', 'Turkistonning birinchi general-gubernatori'],
    ['M. G. Chernyayev', 'Toshkentni bosib olgan rus generali'],
    ['O. fon Bismark', 'Germaniyani birlashtirgan kansler'],
    ['Jorj Vashington', 'AQShning birinchi prezidenti'],
    ['Javoharlal Neru', 'Hindistonning birinchi bosh vaziri'],
    ['Odoakr', 'Gʻarbiy Rim imperiyasining soʻnggi imperatorini taxtdan tushirgan german sarkardasi']
  ],
  (q, a) => `${q} — ${a}.`
);
const POL_POOL: (() => Q)[] = [evYear(POL), evYear(POL), evCentury(POL), evEarliest(POL), evOrder(POL), F_founder, F_capital, F_fighter, F_battle, F_figure];

const F_term = pickFact(
  '«{q}» atamasining mazmuni qaysi javobda toʻgʻri berilgan?',
  [
    ['iqtoʻ', 'xizmat evaziga vaqtincha foydalanishga beriladigan yer'],
    ['suyurgʻol', 'xizmat evaziga meros qilib beriladigan yer-mulk (Temuriylar davri)'],
    ['vaqf', 'diniy muassasalar ixtiyoridagi yer va mulk'],
    ['xiroj', 'yer soligʻi'],
    ['zakot', 'mol-mulk va savdodan olinadigan diniy soliq'],
    ['manufaktura', 'qoʻl mehnatiga va mehnat taqsimotiga asoslangan yirik korxona'],
    ['krepostnoy', 'yer egasiga qaram boʻlgan dehqon'],
    ['karvonsaroy', 'savdo yoʻllari boʻyidagi savdogarlar toʻxtaydigan bino'],
    ['kollektivlashtirish', 'yakka dehqon xoʻjaliklarini jamoa xoʻjaliklariga (kolxozlarga) birlashtirish'],
    ['protektorat', 'bir davlatning boshqa davlat ustidan homiylik (qaramlik) shakli']
  ],
  (q, a) => `${cap(q)} — ${a}.`
);
const F_socFixed = () =>
  pick([
    () => mc('Buyuk Ipak yoʻli qaysi hududlarni bogʻlagan?', 'Xitoyni Oʻrta Osiyo orqali Oʻrta yer dengizi mamlakatlari bilan', ['Hindistonni Afrika bilan', 'Yevropani Amerika bilan', 'Rossiyani Yaponiya bilan', 'Arabistonni Skandinaviya bilan'], 'Buyuk Ipak yoʻli Xitoydan Oʻrta Osiyo orqali Eron, Old Osiyo va Oʻrta yer dengizigacha choʻzilgan.'),
    () => mc('Ilk temir davriga oʻtish natijasida qaysi oʻzgarish roʻy berdi?', 'mehnat qurollari takomillashib, dehqonchilik maydonlari kengaydi', ['ovchilik yagona mashgʻulotga aylandi', 'davlatlar butunlay yoʻqoldi', 'savdo-sotiq toʻxtadi', 'aholi koʻchmanchilikka butunlay oʻtdi'], 'Temir qurollar yerni ishlashni osonlashtirib, dehqonchilik va hunarmandchilik rivojlandi.'),
    () => mc('Buyuk geografik kashfiyotlarning muhim oqibati qaysi?', 'jahon savdo yoʻllarining Atlantika okeaniga koʻchishi', ['Buyuk Ipak yoʻlining kengayishi', 'Yevropada feodalizmning kuchayishi', 'Amerika aholisining ortishi', 'Oʻrta yer dengizi savdosining jonlanishi'], 'Kashfiyotlardan keyin asosiy savdo yoʻllari okeanlarga koʻchdi, Yevropada kapital toʻplandi.'),
    () => mc('Sanoat toʻntarishi (inqilobi) birinchi boʻlib qaysi mamlakatda boshlangan?', 'Angliyada', ['Fransiyada', 'Germaniyada', 'AQShda', 'Rossiyada'], 'Sanoat toʻntarishi XVIII asrning ikkinchi yarmida Angliyada boshlangan.'),
    () => mc('Turkiston general-gubernatorligida Rossiya imperiyasi qaysi ekinni ekishni ayniqsa koʻpaytirgan?', 'paxta', ['bugʻdoy', 'sholi', 'qand lavlagi', 'tamaki'], 'Turkiston imperiya toʻqimachilik sanoati uchun paxta xomashyosi bazasiga aylantirilgan.'),
    () => mc('Orol dengizining qurishiga asosiy sabab nima boʻlgan?', 'Amudaryo va Sirdaryo suvining sugʻorishga haddan tashqari sarflanishi', ['zilzilalar', 'dengizning yer osti suvlariga oqib ketishi', 'iqlimning keskin sovishi', 'baliq ovining koʻpayishi'], 'Paxta yakkahokimligi sababli daryolar suvi sugʻorishga sarflanib, Orolga yetib bormay qolgan.')
  ])();
const SOC_POOL: (() => Q)[] = [evYear(SOC), evYear(SOC), F_term, F_term, F_socFixed, F_socFixed, evEarliest(SOC)];

const F_work = pickFact(
  '«{q}» asarining muallifi kim?',
  [
    ['Al-jabr val-muqobala', 'Muhammad al-Xorazmiy'],
    ['Qadimgi xalqlardan qolgan yodgorliklar', 'Abu Rayhon Beruniy'],
    ['Tib qonunlari', 'Abu Ali ibn Sino'],
    ['Devonu lugʻotit turk', 'Mahmud Koshgʻariy'],
    ['Qutadgʻu bilig', 'Yusuf Xos Hojib'],
    ['Hibat ul-haqoyiq', 'Ahmad Yugnakiy'],
    ['Muhokamat ul-lugʻatayn', 'Alisher Navoiy'],
    ['Boburnoma', 'Zahiriddin Muhammad Bobur'],
    ['Ziji jadidi Koʻragoniy', 'Mirzo Ulugʻbek'],
    ['Shajarai turk', 'Abulgʻozi Bahodirxon'],
    ['Al-jome as-sahih', 'Imom al-Buxoriy'],
    ['Fozil odamlar shahri', 'Abu Nasr Forobiy'],
    ['Buxoro tarixi', 'Abu Bakr Narshaxiy'],
    ['Padarkush', 'Mahmudxoʻja Behbudiy'],
    ['Oʻtgan kunlar', 'Abdulla Qodiriy'],
    ['Kecha va kunduz', 'Choʻlpon'],
    ['Shohnoma', 'Abulqosim Firdavsiy'],
    ['Ilohiy komediya', 'Dante Aligyeri'],
    ['Don Kixot', 'Migel de Servantes'],
    ['Iliada', 'Gomer']
  ],
  (q, a) => `«${q}» — ${a} asari.`
);
const F_monument = pickFact(
  '{q} qaysi shaharda (hududda) joylashgan?',
  [
    ['Registon ansambli', 'Samarqand'],
    ['Goʻri Amir maqbarasi', 'Samarqand'],
    ['Mirzo Ulugʻbek rasadxonasi', 'Samarqand'],
    ['Oqsaroy', 'Shahrisabz'],
    ['Ismoil Somoniy maqbarasi', 'Buxoro'],
    ['Minorai Kalon', 'Buxoro'],
    ['Kalta minor', 'Xiva'],
    ['Ichan qalʼa', 'Xiva'],
    ['Xudoyorxon oʻrdasi', 'Qoʻqon'],
    ['Ahmad Yassaviy maqbarasi', 'Turkiston shahri'],
    ['Fayoztepa buddaviylik ibodatxonasi', 'Termiz'],
    ['Tuproqqalʼa', 'Xorazm'],
    ['Teshiktosh gʻori (neandertal odam qoldiqlari)', 'Surxondaryo']
  ],
  (q, a) => `${q} — ${a}.`
);
const F_culture = pickFact(
  'Quyidagi madaniy yodgorlik qaysi sivilizatsiyaga (mamlakatga) tegishli: {q}?',
  [
    ['Xammurapi qonunlari', 'Bobil'],
    ['Giza piramidalari', 'Qadimgi Misr'],
    ['Buyuk Xitoy devori', 'Qadimgi Xitoy'],
    ['Parfenon ibodatxonasi', 'Qadimgi Yunoniston'],
    ['Kolizey', 'Qadimgi Rim'],
    ['«Avesto»', 'zardushtiylik (Qadimgi Oʻrta Osiyo va Eron)'],
    ['Persepol saroylari', 'Ahamoniylar davlati']
  ],
  (q, a) => `${q} — ${a}.`
);
const F_cultFixed = () =>
  pick([
    () => mc('Zardushtiylikning muqaddas kitobi qaysi?', '«Avesto»', ['«Qutadgʻu bilig»', '«Shohnoma»', '«Devonu lugʻotit turk»', '«Tib qonunlari»'], 'Zardushtiylik dinining muqaddas kitobi — «Avesto».'),
    () => mc('«Tarix otasi» deb kim ataladi?', 'Gerodot', ['Gomer', 'Arastu', 'Aflotun', 'Fukidid'], 'Yunon tarixchisi Gerodot «Tarix otasi» deb ataladi.'),
    () => mc('Kushon davlatida qaysi din keng tarqalgan?', 'buddaviylik', ['islom', 'xristianlik', 'iudaizm', 'konfutsiylik'], 'Kushonlar davrida, ayniqsa Kanishka hukmronligida, buddaviylik keng tarqalgan.'),
    () => mc('Jadidlar asosiy eʼtiborni nimaga qaratgan?', 'yangi usul maktablari, matbuot va maʼrifatni rivojlantirishga', ['qishloq xoʻjaligini mexanizatsiyalashga', 'harbiy islohotlarga', 'temir yoʻl qurilishiga', 'tashqi savdoni cheklashga'], 'Jadidlar maʼrifat, «usuli jadid» maktablari, gazeta va teatr orqali jamiyatni yangilashga intilgan.'),
    () => mc('Temuriylar davrida Samarqandda rasadxona qurdirgan hukmdor kim?', 'Mirzo Ulugʻbek', ['Shohrux', 'Husayn Boyqaro', 'Abdullaxon II', 'Amir Temur'], 'Rasadxona Mirzo Ulugʻbek tomonidan XV asrning 20-yillarida qurilgan.'),
    () => mc('Uygʻonish davri (Renessans) dastlab qaysi mamlakatda boshlangan?', 'Italiyada', ['Angliyada', 'Fransiyada', 'Ispaniyada', 'Germaniyada'], 'Uygʻonish davri XIV asrda Italiyada boshlangan.')
  ])();
const CULT_POOL: (() => Q)[] = [F_work, F_work, F_monument, F_culture, F_cultFixed, F_cultFixed];

/* ---------------------------- 33–35 matching ---------------------------- */
function histMatch(): Q[] {
  const t = R(0, 3);
  if (t === 0) {
    const rows = shuffle(POL.filter((e) => e[1] > 0));
    const used = new Set<number>();
    const picked = rows.filter((e) => (used.has(e[1]) ? false : (used.add(e[1]), true))).slice(0, 6);
    const asks = picked.slice(0, 3);
    return matchBlock('', '33–35-topshiriqlar uchun umumiy shart: voqealarni ular sodir boʻlgan yillar bilan moslashtiring.', asks.map((e) => [`${cap(e[0])} qaysi yilda boʻlgan?`, yr(e[1]), `${cap(e[0])} — ${yr(e[1])}.`] as [string, string, string]), picked.slice(3).map((e) => yr(e[1])));
  }
  const sets: [string, (x: string) => string, [string, string][]][] = [
    ['asarlarni ularning mualliflari bilan moslashtiring.', (x) => `«${x}» asarining muallifi kim?`, [['Tib qonunlari', 'Abu Ali ibn Sino'], ['Devonu lugʻotit turk', 'Mahmud Koshgʻariy'], ['Boburnoma', 'Zahiriddin Muhammad Bobur'], ['Qutadgʻu bilig', 'Yusuf Xos Hojib'], ['Shajarai turk', 'Abulgʻozi Bahodirxon'], ['Oʻtgan kunlar', 'Abdulla Qodiriy'], ['Al-jabr val-muqobala', 'Muhammad al-Xorazmiy']]],
    ['davlatlarni ularning asoschilari bilan moslashtiring.', (x) => `${x} asoschisi kim?`, [['Qoʻqon xonligi', 'Shohruxbiy'], ['Xiva xonligi', 'Elbarsxon'], ['Moʻgʻullar imperiyasi', 'Chingizxon'], ['Ahamoniylar davlati', 'Kir II'], ['Buxoro amirligi', 'Muhammad Rahimbiy'], ['Franklar davlati', 'Xlodvig']]],
    ['meʼmoriy yodgorliklarni ular joylashgan shaharlar bilan moslashtiring.', (x) => `${x} qayerda joylashgan?`, [['Oqsaroy', 'Shahrisabz'], ['Ismoil Somoniy maqbarasi', 'Buxoro'], ['Kalta minor', 'Xiva'], ['Xudoyorxon oʻrdasi', 'Qoʻqon'], ['Goʻri Amir maqbarasi', 'Samarqand'], ['Fayoztepa', 'Termiz'], ['Ahmad Yassaviy maqbarasi', 'Turkiston']]]
  ];
  const [h, q, rows] = sets[t - 1];
  const asks = shuffle(rows).slice(0, 3);
  return matchBlock('', `33–35-topshiriqlar uchun umumiy shart: ${h}`, asks.map(([a, b]) => [q(a), b, `${a} — ${b}.`] as [string, string, string]), rows.map((r) => r[1]));
}

/* ---------------------------- 36–45 open (a/b) ---------------------------- */
type OpenRec = [string, string, number, string, string];
/** [shart, a-savol (yil), yil, b-savol, b-javob] — miloddan avvalgi yillar musbat son bilan soʻraladi */
const OPEN_POL: OpenRec[] = [
  ['Amir Temur Anqara yaqinida Usmonli turklar qoʻshinini tor-mor etdi.', 'a) Jang qaysi yilda boʻlgan?', 1402, 'b) Magʻlub boʻlgan usmonli sultonning ismini yozing.', 'Boyazid'],
  ['Amir Temur Oltin Oʻrda xoni ustidan Terek daryosi boʻyida hal qiluvchi gʻalaba qozondi.', 'a) Jang qaysi yilda boʻlgan?', 1395, 'b) Magʻlub boʻlgan Oltin Oʻrda xonining ismini yozing.', 'Toʻxtamish'],
  ['Amir Temur qurultoyda Movarounnahr hukmdori deb eʼlon qilindi.', 'a) Bu qaysi yilda boʻlgan?', 1370, 'b) Qurultoy qaysi shaharda oʻtkazilgan?', 'Balx'],
  ['Moʻgʻul qoʻshinlari Xorazmshohlar davlatiga yurish boshlab, chegaradagi shaharni qamal qildi.', 'a) Qamal qaysi yilda boshlangan?', 1219, 'b) Qamal qilingan shaharning nomini yozing.', 'Oʻtror'],
  ['Buxoroda moʻgʻullarga qarshi hunarmandlar va dehqonlarning yirik qoʻzgʻoloni boʻldi.', 'a) Qoʻzgʻolon qaysi yilda boʻlgan?', 1238, 'b) Qoʻzgʻolon rahbarining ismini yozing.', 'Mahmud Torobiy'],
  ['Zahiriddin Muhammad Bobur Hindistonda Dehli sultoni ustidan gʻalaba qozonib, yangi davlatga asos soldi.', 'a) Jang qaysi yilda boʻlgan?', 1526, 'b) Jang boʻlib oʻtgan joy nomini yozing.', 'Panipat'],
  ['Muhammad Shayboniyxon Eron shohi Ismoil Safaviy bilan jangda halok boʻldi.', 'a) Bu qaysi yilda boʻlgan?', 1510, 'b) Jang qaysi shahar yaqinida boʻlgan?', 'Marv'],
  ['Fargʻona vodiysida yangi xonlikka asos solindi.', 'a) Xonlik qaysi yilda tashkil topgan?', 1709, 'b) Xonlik asoschisining ismini yozing.', 'Shohruxbiy'],
  ['Buxoroda mangʻitlar sulolasi hukmronligi rasman boshlandi.', 'a) Bu qaysi yilda boʻlgan?', 1756, 'b) Sulola asoschisining ismini yozing.', 'Muhammad Rahimbiy'],
  ['Xorazmda Dashti Qipchoqdan kelgan shayboniy sulolasi vakili yangi xonlikka asos soldi.', 'a) Xonlik qaysi yilda tashkil topgan?', 1512, 'b) Xonlik asoschisining ismini yozing.', 'Elbarsxon'],
  ['Rossiya imperiyasi qoʻshinlari Turkistonning eng yirik shahrini bosib oldi.', 'a) Bu qaysi yilda boʻlgan?', 1865, 'b) Qoʻshinga qoʻmondonlik qilgan generalning familiyasini yozing.', 'Chernyayev / Chernyaev'],
  ['Bosib olingan hududlarda Turkiston general-gubernatorligi tashkil etildi.', 'a) Bu qaysi yilda boʻlgan?', 1867, 'b) Birinchi general-gubernatorning familiyasini yozing.', 'Kaufman'],
  ['Andijonda mustamlakachilikka qarshi qoʻzgʻolon koʻtarildi.', 'a) Qoʻzgʻolon qaysi yilda boʻlgan?', 1898, 'b) Qoʻzgʻolon rahbari qanday nom bilan mashhur boʻlgan?', 'Dukchi eshon / Muhammadali'],
  ['Turkiston oʻlkasi musulmonlarining favqulodda qurultoyida Turkiston Muxtoriyati eʼlon qilindi.', 'a) Bu qaysi yilda boʻlgan?', 1917, 'b) Qurultoy qaysi shaharda boʻlgan?', 'Qoʻqon'],
  ['Milliy-hududiy chegaralanish natijasida Oʻzbekiston SSR tashkil topdi.', 'a) Bu qaysi yilda boʻlgan?', 1924, 'b) Respublikaning dastlabki poytaxti qaysi shahar boʻlgan?', 'Samarqand'],
  ['Germaniya kansleri «temir va qon» siyosati orqali mamlakatni birlashtirdi va imperiya eʼlon qilindi.', 'a) Imperiya qaysi yilda eʼlon qilingan?', 1871, 'b) Kanslerning familiyasini yozing.', 'Bismark'],
  ['Shimoliy Amerikadagi 13 ta ingliz koloniyasi mustaqillik deklaratsiyasini qabul qildi.', 'a) Deklaratsiya qaysi yilda qabul qilingan?', 1776, 'b) AQShning birinchi prezidenti familiyasini yozing.', 'Vashington'],
  ['German sarkardasi soʻnggi imperatorni taxtdan tushirdi va Gʻarbiy Rim imperiyasi barham topdi.', 'a) Bu qaysi yilda boʻlgan?', 476, 'b) Sarkardaning ismini yozing.', 'Odoakr'],
  ['Normandiya gersogi Angliyaga bostirib kirib, anglosakslar qoʻshinini yengdi.', 'a) Hal qiluvchi jang qaysi yilda boʻlgan?', 1066, 'b) Jang boʻlgan joy nomini yozing.', 'Gastings'],
  ['Ispaniya qirollari homiyligidagi ekspeditsiya Atlantika okeanini kesib oʻtib, Amerika qirgʻoqlariga yetib keldi.', 'a) Bu qaysi yilda boʻlgan?', 1492, 'b) Ekspeditsiya rahbarining familiyasini yozing.', 'Kolumb'],
  ['Arab xalifaligi qoʻshinlari Talas daryosi boʻyida Xitoy qoʻshinlarini yengdi.', 'a) Jang qaysi yilda boʻlgan?', 751, 'b) Xitoyda hukmronlik qilgan sulolaning nomini yozing.', 'Tan / Tang'],
  ['Sharqiy Yevropada «sovuq urush» ramzi boʻlgan devor quladi.', 'a) Bu qaysi yilda boʻlgan?', 1989, 'b) Devor qaysi shaharda boʻlgan?', 'Berlin'],
  ['Oʻzbekiston Respublikasi Oliy Kengashi mamlakatning davlat mustaqilligini eʼlon qildi.', 'a) Mustaqillik qaysi yilda eʼlon qilingan?', 1991, 'b) Oʻzbekiston Respublikasi Konstitutsiyasi qaysi yilda qabul qilingan?', '1992'],
  ['Oʻzbekiston Birlashgan Millatlar Tashkilotiga aʼzo boʻldi.', 'a) Bu qaysi yilda boʻlgan?', 1992, 'b) BMT qaysi yilda tuzilgan?', '1945'],
  ['Kir II Oʻrta Osiyoga yurish qilib, massagetlar bilan jangda halok boʻldi.', 'a) Bu miloddan avvalgi nechanchi yilda boʻlgan?', 530, 'b) Massagetlar malikasining ismini yozing.', 'Tomiris'],
  ['Soʻgʻdiyonada Aleksandr Makedonskiy qoʻshinlariga qarshi qoʻzgʻolon boshlandi.', 'a) Qoʻzgʻolon miloddan avvalgi nechanchi yilda boshlangan?', 329, 'b) Qoʻzgʻolon rahbarining ismini yozing.', 'Spitamen']
];
const OPEN_SOC: OpenRec[] = [
  ['Oʻzbekistonda yakka dehqon xoʻjaliklarini yoppasiga kolxozlarga birlashtirish boshlandi.', 'a) Bu qaysi yilda boshlangan?', 1929, 'b) Mulki tortib olinib surgun qilingan badavlat dehqonlar qanday atalgan?', 'quloq'],
  ['Sovet Rossiyasida «harbiy kommunizm» siyosati oʻrniga yangi iqtisodiy siyosat (NEP) joriy etildi.', 'a) Bu qaysi yilda boʻlgan?', 1921, 'b) Oziq-ovqat razvyorstkasi oʻrniga nima joriy etilgan?', 'oziq-ovqat soligʻi'],
  ['Rossiya imperiyasida dehqonlarni pomeshchiklarga qaramlikdan ozod qilgan manifest eʼlon qilindi.', 'a) Bu qaysi yilda boʻlgan?', 1861, 'b) Manifestni imzolagan imperatorni yozing.', 'Aleksandr II'],
  ['Oʻzbekistonda xotin-qizlarni ijtimoiy hayotga jalb etish bahonasida «Hujum» harakati boshlandi.', 'a) Bu qaysi yilda boshlangan?', 1927, 'b) Harakat davrida ayollardan nimani tashlash talab qilingan?', 'paranji'],
  ['AQShda birja inqirozi jahon iqtisodiy inqiroziga aylandi; keyinroq prezident «Yangi kurs»ni boshladi.', 'a) Inqiroz qaysi yilda boshlangan?', 1929, 'b) «Yangi kurs»ni boshlagan prezidentning familiyasini yozing.', 'Ruzvelt'],
  ['Oʻzbekistonda milliy valyuta muomalaga kiritildi.', 'a) Bu qaysi yilda boʻlgan?', 1994, 'b) Milliy valyutaning nomini yozing.', 'soʻm'],
  ['Rossiyada bosh vazir tashabbusi bilan dehqonlarga jamoadan chiqib, yer olishga ruxsat beruvchi agrar islohot boshlandi.', 'a) Islohot qaysi yilda boshlangan?', 1906, 'b) Bosh vazirning familiyasini yozing.', 'Stolipin / Stolypin'],
  ['Oʻzbekistonda lotin yozuviga asoslangan yangi oʻzbek alifbosi toʻgʻrisida qonun qabul qilindi.', 'a) Qonun qaysi yilda qabul qilingan?', 1993, 'b) 1940-yilda oʻzbek yozuvi qaysi alifboga oʻtkazilgan edi?', 'kirill / kirill yozuvi']
];
const openOf = (r: OpenRec): Q => openN(r[0], [[r[1], r[2]], [r[3], r[4]]], `${r[0]} Javob: a) ${r[2]}; b) ${r[4]}.`);

/* -------------------------------- assemble -------------------------------- */
function distinct(pool: (() => Q)[], n: number, seen: Set<string>): Q[] {
  const out: Q[] = [];
  for (let tries = 0; out.length < n && tries < 400; tries++) {
    try {
      const q = tryGen(pool[R(0, pool.length - 1)]);
      const key = q.text + '|' + (q.choices?.[q.answer ?? 0] ?? '');
      if (seen.has(q.text) || seen.has(key)) continue;
      seen.add(q.text);
      seen.add(key);
      out.push(q);
    } catch {
      /* again */
    }
  }
  if (out.length < n) throw new Error('pool too small');
  return out;
}

/** A fresh 45-task history variant (client side only — random). */
export function buildHistExam(): G11Question[] {
  const seen = new Set<string>();
  const pol = shuffle(OPEN_POL).slice(0, 9);
  const list: Q[] = [
    ...distinct(POL_POOL, 20, seen),
    ...distinct(SOC_POOL, 6, seen),
    ...distinct(CULT_POOL, 6, seen),
    ...tryBlock(histMatch),
    ...pol.map(openOf),
    openOf(pick(OPEN_SOC))
  ];
  return toQuestions(list, 'g11-tar');
}
