import type { G11Question } from '../diagnostic';
import { R, pick, shuffle, mc, mcn, openN, tryGen, tryBlock, toQuestions, matchBlock, num, type Q } from './gen';

/**
 * Geografiya — Milliy sertifikat formatidagi test generatori (DTM tafsiloti): 45 topshiriq, 150 daqiqa.
 * 1 fan tarixi, 2 xaritalar, 3–4 geografik qobiq, 5–6 okeanlar, 7–10 materiklar, 11–12 Oʻrta Osiyo,
 * 13–15 Oʻzbekiston tabiati, 16–17 Oʻzbekiston iqtisodiyoti, 18–21 jahon xoʻjaligi, 22–24 tabiiy resurslar,
 * 25 geoekologiya, 26–28 aholi, 29–32 xarita (koordinatalar), 33–35 moslashtirish (Y-2),
 * 36–45 a/b bandli ochiq topshiriqlar (vaqt, masshtab, geografik qobiq, materiklar, iqtisodiyot, aholi, siyosiy xarita).
 */
export const GEO_EXAM_MINUTES = 150;

/* ------------------------------- helpers ------------------------------- */
type Row = [string, string];
type Own = [string, string, string[]];
/** [savol qismi, javob] qatorlari → 4 variantli savol; boshqa javoblar — chalgʻituvchilar */
const fact = (title: string, rows: Row[], extra: string[] = []) => () => {
  const [q, a] = pick(rows);
  const others = [...rows.map((r) => r[1]), ...extra].filter((x) => x !== a);
  return mc(title.replace('{q}', q), a, others, `${q} — ${a}.`);
};
/** teskari: javob berilgan, savol qismi soʻraladi */
const factRev = (title: string, rows: Row[], extra: string[] = []) => () => {
  const [q, a] = pick(rows);
  const others = [...rows.filter((r) => r[1] !== a).map((r) => r[0]), ...extra];
  return mc(title.replace('{a}', a), q, others, `${q} — ${a}.`);
};
/** oʻz chalgʻituvchilari bilan berilgan savollar */
const own = (rows: Own[]) => () => {
  const [q, a, w] = pick(rows);
  return mc(q, a, w, `Toʻgʻri javob: ${a}.`);
};
const coord = (lat: number, lon: number) => `${Math.abs(lat)}° ${lat >= 0 ? 'sh.k.' : 'j.k.'}, ${Math.abs(lon)}° ${lon >= 0 ? 'sh.u.' : 'gʻ.u.'}`;
const hm = (m: number) => {
  const x = ((m % 1440) + 1440) % 1440;
  const h = Math.floor(x / 60);
  const mm = String(x % 60).padStart(2, '0');
  return h < 10 ? `0${h}:${mm} / ${h}:${mm}` : `${h}:${mm}`;
};
const hmShow = (m: number) => hm(m).split(' / ')[0];

/* ------------------------------ 1. fan tarixi ------------------------------ */
const EXPLORERS: Row[] = [
  ['«Geografiya» atamasini fanga kiritgan va Yer aylanasini birinchi boʻlib oʻlchagan olim', 'Eratosfen'],
  ['8 kitobdan iborat «Geografiya» asarini yozib, xaritalarda daraja toʻrini qoʻllagan olim', 'Klavdiy Ptolemey'],
  ['Yer globusini yasagan va «Hindiston» asarini yozgan qomusiy olim', 'Abu Rayhon Beruniy'],
  ['«Kitob surat al-arz» asarining muallifi', 'Muhammad al-Xorazmiy'],
  ['«Devonu lugʻotit turk» asariga dumaloq dunyo xaritasini ilova qilgan olim', 'Mahmud Koshgʻariy'],
  ['1492-yilda Atlantika okeanini kesib oʻtib, Amerika qirgʻoqlariga yetib kelgan dengizchi', 'Xristofor Kolumb'],
  ['1498-yilda Afrikani aylanib oʻtib, Hindistonga dengiz yoʻlini ochgan dengizchi', 'Vasko da Gama'],
  ['1519–1522-yillardagi birinchi dunyo boʻylab sayohatga boshchilik qilgan dengizchi', 'Fernan Magellan'],
  ['1911-yilda Janubiy qutbga birinchi boʻlib yetib borgan sayyoh', 'Rual Amundsen'],
  ['Tyan-Shan togʻlarini tadqiq etgani uchun familiyasiga «Tyan-Shanskiy» qoʻshilgan olim', 'P. P. Semyonov'],
  ['Pomir-Oloy togʻlarini tadqiq etgan, nomi Pomirdagi yirik muzlikka berilgan olim', 'A. P. Fedchenko'],
  ['Orol dengizini atroflicha tadqiq etgan geograf', 'L. S. Berg'],
  ['Avstraliyaning sharqiy qirgʻoqlarini tadqiq etgan ingliz dengizchisi', 'Jeyms Kuk'],
  ['1820-yilda Antarktidani kashf etgan ekspeditsiya rahbarlari', 'F. Bellinsgauzen va M. Lazarev']
];
const BRANCHES: Row[] = [
  ['Yer yuzasi relyefini oʻrganadigan fan', 'geomorfologiya'],
  ['Iqlimni oʻrganadigan fan', 'klimatologiya'],
  ['Quruqlik suvlarini (daryo, koʻl) oʻrganadigan fan', 'gidrologiya'],
  ['Okean va dengizlarni oʻrganadigan fan', 'okeanologiya'],
  ['Tuproqlarni oʻrganadigan fan', 'tuproqshunoslik'],
  ['Xaritalar tuzish usullarini oʻrganadigan fan', 'kartografiya'],
  ['Muzliklarni oʻrganadigan fan', 'glyatsiologiya'],
  ['Ob-havoni oʻrganadigan fan', 'meteorologiya'],
  ['Aholi soni va tarkibining oʻzgarishini oʻrganadigan fan', 'demografiya']
];
const HIST_POOL = [fact('{q} kim?', EXPLORERS), fact('{q} qanday ataladi?', BRANCHES)];

/* ------------------------------ 2. xaritalar ------------------------------ */
const dist = (m: number) => (m < 1000 ? `${num(m)} m` : `${num(m / 1000)} km`);
const SCALES = [10000, 25000, 50000, 100000, 200000, 250000, 500000, 1000000, 2500000];
const scaleQ = () => {
  const M = pick(SCALES);
  const m = M / 100;
  return mc(`1:${M.toLocaleString('ru-RU')} masshtabli xaritada 1 sm ga joyda qancha masofa toʻgʻri keladi?`, dist(m), [dist(m * 10), dist(m / 10), dist(m * 100), m >= 100 ? dist(m / 100) : dist(m * 1000)], `Sonli masshtab 1:${M} → 1 sm = ${M} sm = ${dist(m)}.`);
};
const mapDist = () => {
  const M = pick([100000, 200000, 250000, 500000, 1000000]);
  const d = R(2, 9);
  const km = (d * M) / 100000;
  return mcn(`1:${M.toLocaleString('ru-RU')} masshtabli xaritada ikki shahar orasidagi masofa ${d} sm. Joyda ular orasidagi masofa necha km?`, km, `1 sm = ${M / 100000} km → ${d} × ${num(M / 100000)} = ${num(km)} km.`);
};
const DIRS: [string, number][] = [['shimol', 0], ['shimoli-sharq', 45], ['sharq', 90], ['janubi-sharq', 135], ['janub', 180], ['janubi-gʻarb', 225], ['gʻarb', 270], ['shimoli-gʻarb', 315]];
const azimuth = () => {
  const [d, a] = pick(DIRS);
  return mc(`Sayyoh ${d} tomonga yurmoqda. Uning harakat azimuti necha gradus?`, `${a}°`, DIRS.filter((x) => x[1] !== a).map((x) => `${x[1]}°`), `Azimut shimoldan soat mili yoʻnalishida oʻlchanadi: ${d} — ${a}°.`);
};
const backAz = () => {
  const a = R(2, 16) * 10 + 5 * R(0, 1);
  const b = (a + 180) % 360;
  return mc(`Obyektga borishdagi azimut ${a}°. Qaytishdagi (teskari) azimut necha gradus?`, `${b}°`, [`${360 - a}°`, `${Math.abs(180 - a)}°`, `${(a + 90) % 360}°`, `${(a + 270) % 360}°`], `Teskari azimut = ${a}° + 180° = ${b}°.`);
};
const meridianDist = () => {
  const l1 = R(30, 60);
  const l2 = l1 - R(3, 25);
  const km = (l1 - l2) * 111;
  return mcn(`A nuqta ${l1}° sh.k. da, B nuqta ${l2}° sh.k. da, ikkalasi bitta meridianda joylashgan. Ular orasidagi masofa necha km (1° ≈ 111 km)?`, km, `(${l1} − ${l2}) × 111 = ${km} km.`);
};
const ISO: Row[] = [
  ['bir xil balandlikdagi nuqtalarni tutashtiruvchi chiziq', 'gorizontal (izogips)'],
  ['bir xil chuqurlikdagi nuqtalarni tutashtiruvchi chiziq', 'izobata'],
  ['bir xil haroratli nuqtalarni tutashtiruvchi chiziq', 'izoterma'],
  ['bir xil atmosfera bosimli nuqtalarni tutashtiruvchi chiziq', 'izobara'],
  ['bir xil yogʻin miqdorli nuqtalarni tutashtiruvchi chiziq', 'izogieta'],
  ['bir xil zilzila kuchiga ega nuqtalarni tutashtiruvchi chiziq', 'izoseysta']
];
const MAP_POOL = [scaleQ, mapDist, azimuth, backAz, meridianDist, fact('Xaritada {q} qanday ataladi?', ISO)];

/* ---------------------------- 3. geografik qobiq ---------------------------- */
const ATM: Row[] = [
  ['ob-havo hodisalari roʻy beradigan, havo massasining qariyb 80 % i toʻplangan', 'troposfera'],
  ['ozon qatlami joylashgan', 'stratosfera'],
  ['meteorlar yonib ketadigan, harorat −80 °C gacha pasayadigan', 'mezosfera'],
  ['qutb yogʻdusi kuzatiladigan, harorat keskin koʻtariladigan', 'termosfera'],
  ['havo zarralari koinotga tarqaladigan eng yuqori', 'ekzosfera']
];
const ROCKS: Record<string, string[]> = { magmatik: ['granit', 'bazalt', 'andezit'], choʻkindi: ['ohaktosh', 'qumtosh', 'toshkoʻmir', 'osh tuzi'], metamorfik: ['marmar', 'gneys', 'kvarsit'] };
const rockQ = () => {
  const kind = pick(Object.keys(ROCKS));
  const a = pick(ROCKS[kind]);
  const w = Object.entries(ROCKS).filter(([k]) => k !== kind).flatMap(([, v]) => v);
  return mc(`Quyidagilardan qaysi biri ${kind} togʻ jinsi?`, a, w, `${a} — ${kind} togʻ jinsi.`);
};
const WINDS: Row[] = [
  ['Tropik kengliklardan ekvatorga doimiy esadigan shamol', 'passat'],
  ['Fasllarga qarab yoʻnalishini oʻzgartiradigan shamol', 'musson'],
  ['Kunduzi dengizdan quruqlikka, kechasi quruqlikdan dengizga esadigan shamol', 'briz'],
  ['Togʻdan vodiyga tushadigan iliq va quruq shamol', 'fyon'],
  ['Moʻtadil kengliklarda gʻarbdan sharqqa esadigan doimiy shamol', 'gʻarbiy shamollar'],
  ['Past togʻlardan iliq dengiz tomon esadigan kuchli sovuq shamol', 'bora']
];
const DATES: Row[] = [
  ['Shimoliy yarimsharda eng uzun kun (yozgi quyosh turishi)', '22-iyun'],
  ['Shimoliy yarimsharda eng qisqa kun (qishki quyosh turishi)', '22-dekabr'],
  ['Bahorgi kun-tun tengligi', '21-mart'],
  ['Kuzgi kun-tun tengligi', '23-sentyabr']
];
const EARTH: Own[] = [
  ['Yer oʻz oʻqi atrofida bir marta toʻliq qancha vaqtda aylanadi?', '23 soat 56 daqiqa', ['24 soat 30 daqiqa', '22 soat 56 daqiqa', '25 soat']],
  ['Yer Quyosh atrofida bir marta qancha vaqtda aylanadi?', '365 kun 6 soat', ['360 kun', '366 kun 12 soat', '354 kun']],
  ['Shimoliy tropik qaysi kenglikdan oʻtadi?', '23,5° sh.k.', ['66,5° sh.k.', '30° sh.k.', '45° sh.k.']],
  ['Shimoliy qutb doirasi qaysi kenglikdan oʻtadi?', '66,5° sh.k.', ['23,5° sh.k.', '60° sh.k.', '75° sh.k.']],
  ['Yerning oʻrtacha radiusi qancha?', '6371 km', ['3671 km', '12 742 km', '1737 km']],
  ['Ekvatorning uzunligi taxminan qancha?', '40 076 km', ['20 038 km', '6378 km', '52 000 km']],
  ['Yerdan Quyoshgacha boʻlgan oʻrtacha masofa qancha?', '150 mln km', ['384 ming km', '15 mln km', '1,5 mlrd km']],
  ['Yer oʻqi orbita tekisligiga qanday burchak ostida ogʻgan?', '66,5°', ['23,5°', '90°', '45°']],
  ['Troposferaning qalinligi ekvatorda taxminan qancha?', '16–18 km', ['8–10 km', '50–55 km', '2–3 km']]
];
const EXTREMES: Row[] = [
  ['Dunyoning eng baland choʻqqisi', 'Everest (Jomolungma)'],
  ['Dunyo okeanining eng chuqur joyi', 'Mariana botigʻi'],
  ['Dunyodagi eng chuqur koʻl', 'Baykal'],
  ['Dunyodagi eng katta koʻl', 'Kaspiy dengizi'],
  ['Dunyodagi eng uzun daryo', 'Nil'],
  ['Dunyodagi eng sersuv daryo', 'Amazonka'],
  ['Dunyodagi eng katta orol', 'Grenlandiya'],
  ['Dunyodagi eng katta yarimorol', 'Arabiston'],
  ['Dunyodagi eng baland sharshara', 'Anxel'],
  ['Dunyodagi eng katta tropik choʻl', 'Sahroi Kabir']
];
const SOILS: Row[] = [
  ['tundra', 'tundra-glevli tuproqlar'],
  ['tayga', 'podzol tuproqlar'],
  ['dasht', 'qora tuproqlar'],
  ['savanna', 'qizil-qoʻngʻir tuproqlar'],
  ['doimiy nam ekvatorial oʻrmonlar', 'qizil-sariq ferrallit tuproqlar'],
  ['keng bargli oʻrmonlar', 'qoʻngʻir oʻrmon tuproqlari']
];
const SHELL_POOL = [fact('Atmosferaning {q} qatlami qaysi?', ATM), rockQ, fact('{q} qanday ataladi?', WINDS), fact('{q} qaysi sanaga toʻgʻri keladi?', DATES, ['1-yanvar', '1-iyul', '22-may']), own(EARTH), fact('{q} qaysi?', EXTREMES), fact('{q} zonasi uchun qaysi tuproqlar xos?', SOILS)];

/* ------------------------------ 4. okeanlar ------------------------------ */
const OCEANS = ['Tinch okeani', 'Atlantika okeani', 'Hind okeani', 'Shimoliy Muz okeani'];
const OCEAN_Q: Row[] = [
  ['Maydoni va chuqurligi boʻyicha eng katta okean qaysi?', 'Tinch okeani'],
  ['Eng kichik va eng sayoz okean qaysi?', 'Shimoliy Muz okeani'],
  ['Suvining oʻrtacha shoʻrligi eng yuqori boʻlgan okean qaysi?', 'Atlantika okeani'],
  ['Mariana botigʻi qaysi okeanda joylashgan?', 'Tinch okeani'],
  ['Puerto-Riko botigʻi qaysi okeanda joylashgan?', 'Atlantika okeani'],
  ['Zond (Yava) botigʻi qaysi okeanda joylashgan?', 'Hind okeani'],
  ['Lomonosov suvosti tizmasi qaysi okeanda joylashgan?', 'Shimoliy Muz okeani'],
  ['Shimoliy qismida oqimlar musson taʼsirida yil fasllariga qarab yoʻnalishini oʻzgartiradigan okean qaysi?', 'Hind okeani'],
  ['Dunyodagi eng shoʻr dengiz — Qizil dengiz qaysi okean havzasiga kiradi?', 'Hind okeani'],
  ['Qirgʻoqsiz Sargasso dengizi qaysi okeanda?', 'Atlantika okeani'],
  ['«Olov halqasi» deb ataladigan vulqonlar mintaqasi qaysi okean atrofida joylashgan?', 'Tinch okeani'],
  ['Yilning koʻp qismida muz bilan qoplanadigan, asosan Yevrosiyo va Shimoliy Amerika bilan oʻralgan okean qaysi?', 'Shimoliy Muz okeani']
];
const oceanQ = () => {
  const [q, a] = pick(OCEAN_Q);
  return mc(q, a, OCEANS, `Toʻgʻri javob: ${a}.`);
};
type Cur = [string, string, boolean];
const CURRENTS: Cur[] = [
  ['Golfstrim', 'Atlantika okeani', true], ['Shimoliy Atlantika', 'Atlantika okeani', true], ['Braziliya', 'Atlantika okeani', true], ['Gviana', 'Atlantika okeani', true],
  ['Labrador', 'Atlantika okeani', false], ['Kanar', 'Atlantika okeani', false], ['Benguela', 'Atlantika okeani', false],
  ['Kurosio', 'Tinch okeani', true], ['Sharqiy Avstraliya', 'Tinch okeani', true], ['Alyaska', 'Tinch okeani', true],
  ['Kaliforniya', 'Tinch okeani', false], ['Peru', 'Tinch okeani', false], ['Kuril (Oyasio)', 'Tinch okeani', false],
  ['Mozambik', 'Hind okeani', true], ['Igna burni', 'Hind okeani', true], ['Gʻarbiy Avstraliya', 'Hind okeani', false]
];
const curOcean = () => {
  const [n, o, w] = pick(CURRENTS);
  return mc(`${n} oqimi qaysi okeanda joylashgan?`, o, OCEANS, `${n} — ${o}dagi ${w ? 'iliq' : 'sovuq'} oqim.`);
};
const curKind = () => {
  const warm = R(0, 1) === 1;
  const a = pick(CURRENTS.filter((c) => c[2] === warm))[0];
  return mc(`Quyidagi oqimlardan qaysi biri ${warm ? 'iliq' : 'sovuq'} oqim?`, a, CURRENTS.filter((c) => c[2] !== warm).map((c) => c[0]), `${a} — ${warm ? 'iliq' : 'sovuq'} oqim.`);
};
const SEAS: Row[] = [
  ['Oʻrta yer dengizi', 'Atlantika okeani'], ['Qora dengiz', 'Atlantika okeani'], ['Boltiq dengizi', 'Atlantika okeani'], ['Shimoliy dengiz', 'Atlantika okeani'], ['Karib dengizi', 'Atlantika okeani'],
  ['Arab dengizi', 'Hind okeani'], ['Qizil dengiz', 'Hind okeani'], ['Andaman dengizi', 'Hind okeani'],
  ['Yapon dengizi', 'Tinch okeani'], ['Sariq dengiz', 'Tinch okeani'], ['Bering dengizi', 'Tinch okeani'], ['Oxota dengizi', 'Tinch okeani'],
  ['Barens dengizi', 'Shimoliy Muz okeani'], ['Kara dengizi', 'Shimoliy Muz okeani'], ['Laptevlar dengizi', 'Shimoliy Muz okeani'], ['Chukotka dengizi', 'Shimoliy Muz okeani']
];
const seaQ = () => {
  const [s, o] = pick(SEAS);
  return mc(`${s} qaysi okean havzasiga kiradi?`, o, OCEANS, `${s} — ${o} havzasida.`);
};
const OCEAN_POOL = [oceanQ, oceanQ, curOcean, curKind, seaQ];

/* ------------------------------ 5. materiklar ------------------------------ */
const CONTS = ['Afrika', 'Yevrosiyo', 'Janubiy Amerika', 'Shimoliy Amerika', 'Antarktida', 'Avstraliya'];
const PEAKS: Row[] = [
  ['Afrika', 'Kilimanjaro'], ['Yevrosiyo', 'Everest (Jomolungma)'], ['Janubiy Amerika', 'Akonkagua'],
  ['Shimoliy Amerika', 'Denali (Mak-Kinli)'], ['Antarktida', 'Vinson massivi'], ['Avstraliya', 'Kostyushko togʻi']
];
const OBJECTS: Row[] = [
  ['Kongo daryosi', 'Afrika'], ['Zambezi daryosi', 'Afrika'], ['Niger daryosi', 'Afrika'], ['Tanganika koʻli', 'Afrika'], ['Viktoriya koʻli', 'Afrika'], ['Kalaxari choʻli', 'Afrika'], ['Namib choʻli', 'Afrika'], ['Atlas togʻlari', 'Afrika'], ['Efiopiya togʻligi', 'Afrika'],
  ['Murrey daryosi', 'Avstraliya'], ['Eyr koʻli', 'Avstraliya'], ['Katta Viktoriya choʻli', 'Avstraliya'], ['Katta Suvayirgʻich tizmasi', 'Avstraliya'],
  ['Amazonka daryosi', 'Janubiy Amerika'], ['Parana daryosi', 'Janubiy Amerika'], ['Orinoko daryosi', 'Janubiy Amerika'], ['Titikaka koʻli', 'Janubiy Amerika'], ['Atakama choʻli', 'Janubiy Amerika'], ['And togʻlari', 'Janubiy Amerika'], ['Braziliya yassitogʻligi', 'Janubiy Amerika'],
  ['Missisipi daryosi', 'Shimoliy Amerika'], ['Makkenzi daryosi', 'Shimoliy Amerika'], ['Yukon daryosi', 'Shimoliy Amerika'], ['Yuqori koʻl', 'Shimoliy Amerika'], ['Appalachi togʻlari', 'Shimoliy Amerika'], ['Kordilyera togʻlari', 'Shimoliy Amerika'],
  ['Yanszi daryosi', 'Yevrosiyo'], ['Ob daryosi', 'Yevrosiyo'], ['Gang daryosi', 'Yevrosiyo'], ['Dunay daryosi', 'Yevrosiyo'], ['Baykal koʻli', 'Yevrosiyo'], ['Gobi choʻli', 'Yevrosiyo'], ['Ural togʻlari', 'Yevrosiyo'], ['Tibet togʻligi', 'Yevrosiyo']
];
const objCont = () => {
  const [o, c] = pick(OBJECTS);
  return mc(`${o} qaysi materikda joylashgan?`, c, CONTS, `${o} — ${c}da.`);
};
const CAPES: Row[] = [
  ['Yevrosiyoning eng shimoliy nuqtasi', 'Chelyuskin burni'], ['Yevrosiyoning eng gʻarbiy nuqtasi', 'Roka burni'], ['Yevrosiyoning eng sharqiy nuqtasi', 'Dejnyov burni'], ['Yevrosiyoning eng janubiy nuqtasi', 'Piay burni'],
  ['Afrikaning eng janubiy nuqtasi', 'Igna burni'], ['Afrikaning eng gʻarbiy nuqtasi', 'Almadi burni'], ['Afrikaning eng sharqiy nuqtasi', 'Hofun burni'], ['Afrikaning eng shimoliy nuqtasi', 'Ras-Engela (Bin-Sekka) burni'],
  ['Avstraliyaning eng shimoliy nuqtasi', 'York burni'], ['Avstraliyaning eng sharqiy nuqtasi', 'Bayron burni'],
  ['Janubiy Amerikaning eng shimoliy nuqtasi', 'Galinas burni'], ['Janubiy Amerikaning eng janubiy nuqtasi', 'Froyard burni'],
  ['Shimoliy Amerikaning eng shimoliy nuqtasi', 'Merchison burni'], ['Shimoliy Amerikaning eng janubiy nuqtasi', 'Mariato burni']
];
const FEATURES: Row[] = [
  ['Eng quruq materik', 'Avstraliya'],
  ['Oʻrtacha balandligi eng katta va eng sovuq materik', 'Antarktida'],
  ['Ekvator deyarli oʻrtasidan kesib oʻtadigan materik', 'Afrika'],
  ['Eng katta materik', 'Yevrosiyo'],
  ['Eng koʻp yogʻin oladigan (eng nam) materik', 'Janubiy Amerika'],
  ['Barcha iqlim mintaqalari mavjud boʻlgan yagona materik', 'Yevrosiyo'],
  ['Hududi toʻla Janubiy va Sharqiy yarimsharlarda joylashgan materik', 'Avstraliya'],
  ['Hududi toʻla Shimoliy va Gʻarbiy yarimsharlarda joylashgan materik', 'Shimoliy Amerika']
];
const CONT_POOL = [
  fact('{q} materigining eng baland nuqtasi qaysi?', PEAKS),
  factRev('{a} qaysi materikda joylashgan?', PEAKS),
  objCont, objCont,
  fact('{q} qaysi?', CAPES, ['Yaxshi Umid burni']),
  fact('{q} qaysi?', FEATURES, ['Afrika', 'Antarktida'])
];

/* ------------------------------ 6. Oʻrta Osiyo ------------------------------ */
const CA: Own[] = [
  ['Oʻrta Osiyoning eng baland nuqtasi qaysi?', 'Ismoil Somoniy choʻqqisi', ['Xazrati Sulton choʻqqisi', 'Gʻalaba choʻqqisi', 'Abu Ali ibn Sino choʻqqisi']],
  ['Oʻrta Osiyoning eng past nuqtasi qaysi?', 'Qoragiyo botigʻi', ['Mingbuloq botigʻi', 'Sariqamish botigʻi', 'Oqchaqaya botigʻi']],
  ['Oʻrta Osiyodagi eng katta togʻ koʻli, qishda muzlamaydigan koʻl qaysi?', 'Issiqkoʻl', ['Sarez koʻli', 'Iskandarkoʻl', 'Qorakoʻl']],
  ['1911-yilgi kuchli zilzilada togʻ qulab, Murgʻob daryosini toʻsib qoʻyishidan hosil boʻlgan koʻl qaysi?', 'Sarez koʻli', ['Issiqkoʻl', 'Iskandarkoʻl', 'Sonkoʻl']],
  ['Gʻarbiy qismi chuchuk, sharqiy qismi shoʻr suvli koʻl qaysi?', 'Balxash', ['Issiqkoʻl', 'Aydar koʻli', 'Sarez koʻli']],
  ['Oʻrta Osiyodagi eng uzun daryo qaysi?', 'Sirdaryo', ['Amudaryo', 'Zarafshon', 'Ili']],
  ['Oʻrta Osiyodagi eng sersuv daryo qaysi?', 'Amudaryo', ['Sirdaryo', 'Zarafshon', 'Chu']],
  ['Pomirdagi eng uzun togʻ-vodiy muzligi qaysi?', 'Fedchenko muzligi', ['Zarafshon muzligi', 'Inilchek muzligi', 'Abramov muzligi']],
  ['Amudaryo va Sirdaryo oraligʻida joylashgan choʻl qaysi?', 'Qizilqum', ['Qoraqum', 'Moʻyinqum', 'Betpakdala']],
  ['Asosan Turkmaniston hududida, Amudaryodan janubi-gʻarbda joylashgan choʻl qaysi?', 'Qoraqum', ['Qizilqum', 'Moʻyinqum', 'Orolqum']],
  ['Kaspiy dengizi va Orol dengizi oraligʻidagi plato qaysi?', 'Ustyurt platosi', ['Turgʻay platosi', 'Pomir togʻligi', 'Mangʻishloq togʻlari']],
  ['Oʻrta Osiyo iqlimining asosiy xususiyati qanday?', 'keskin kontinental, quruq', ['mussonli, nam', 'moʻtadil dengiz iqlimi', 'subekvatorial, nam']],
  ['Tyan-Shan va Pomir-Oloy togʻlari qaysi burmalanishda qayta koʻtarilgan?', 'alp burmalanishi', ['kaledon burmalanishi', 'baykal burmalanishi', 'arxey burmalanishi']],
  ['Oʻrta Osiyodagi eng katta pasttekislik qaysi?', 'Turon pasttekisligi', ['Gʻarbiy Sibir pasttekisligi', 'Hind-Gang pasttekisligi', 'Mesopotamiya pasttekisligi']]
];
const CA_POOL = [own(CA), own(CA), own(CA)];

/* ------------------------- 7. Oʻzbekiston tabiati ------------------------- */
const UZN: Own[] = [
  ['Oʻzbekistonning eng baland nuqtasi qaysi?', 'Xazrati Sulton choʻqqisi (4643 m)', ['Ismoil Somoniy choʻqqisi (7495 m)', 'Adelung choʻqqisi (4301 m)', 'Bobotogʻ choʻqqisi (3769 m)']],
  ['Oʻzbekistonning eng past nuqtasi qaysi?', 'Mingbuloq botigʻi', ['Qoragiyo botigʻi', 'Sariqamish botigʻi', 'Oqchaqaya botigʻi']],
  ['Oʻzbekiston qaysi davlat bilan eng uzun chegaraga ega?', 'Qozogʻiston', ['Turkmaniston', 'Tojikiston', 'Qirgʻiziston']],
  ['Oʻzbekiston qaysi davlat bilan eng qisqa chegaraga ega?', 'Afgʻoniston', ['Qirgʻiziston', 'Tojikiston', 'Turkmaniston']],
  ['Oʻzbekiston dengizga chiqishi uchun kamida nechta davlat hududini kesib oʻtishi kerak?', 'ikkita', ['bitta', 'uchta', 'toʻrtta']],
  ['Oʻzbekistonda eng yuqori harorat (+50 °C gacha) qayd etilgan hudud qaysi?', 'Termiz', ['Nukus', 'Toshkent', 'Andijon']],
  ['Chirchiq daryosi qaysi daryolarning qoʻshilishidan hosil boʻladi?', 'Chotqol va Piskom', ['Norin va Qoradaryo', 'Vaxsh va Panj', 'Matcho va Fon']],
  ['Sirdaryo qaysi daryolarning qoʻshilishidan hosil boʻladi?', 'Norin va Qoradaryo', ['Chotqol va Piskom', 'Vaxsh va Panj', 'Oqdaryo va Qoradaryo']],
  ['Amudaryo qaysi daryolarning qoʻshilishidan hosil boʻladi?', 'Vaxsh va Panj', ['Norin va Qoradaryo', 'Chotqol va Piskom', 'Surxon va Sherobod']],
  ['Zarafshon daryosi qayerdan boshlanadi?', 'Zarafshon muzligidan', ['Issiqkoʻldan', 'Fedchenko muzligidan', 'Chorvoq suv omboridan']],
  ['Oʻzbekiston hududining taxminan qancha qismini tekisliklar egallaydi?', '4/5 qismini', ['1/2 qismini', '1/3 qismini', '1/5 qismini']]
];
const DEPOSITS: Row[] = [
  ['Muruntov', 'oltin'], ['Olmaliq (Qalmoqqir)', 'mis'], ['Gazli', 'tabiiy gaz'], ['Shoʻrtan', 'tabiiy gaz'], ['Angren', 'qoʻngʻir koʻmir'],
  ['Shargʻun', 'toshkoʻmir'], ['Xoʻjaikon', 'osh tuzi'], ['Jeroy-Sardara', 'fosforit'], ['Koʻkdumaloq', 'neft va gaz kondensati'], ['Mingbuloq', 'neft']
];
const RESERVOIRS: Row[] = [
  ['Chorvoq', 'Chirchiq'], ['Tuyamoʻyin', 'Amudaryo'], ['Kattaqoʻrgʻon', 'Zarafshon'], ['Chimqoʻrgʻon', 'Qashqadaryo'], ['Andijon', 'Qoradaryo'], ['Janubiy Surxon', 'Surxondaryo'], ['Pachkamar', 'Gʻuzordaryo']
];
const RESERVES: Row[] = [
  ['Chotqol', 'Toshkent viloyati'], ['Zomin', 'Jizzax viloyati'], ['Hisor', 'Qashqadaryo viloyati'], ['Zarafshon', 'Samarqand viloyati'], ['Surxon', 'Surxondaryo viloyati'], ['Baday-Toʻqay', 'Qoraqalpogʻiston Respublikasi']
];
const OKRUGS: Row[] = [
  ['Toshkent viloyatining katta qismini egallagan, Chirchiq va Ohangaron vodiylarini oʻz ichiga olgan okrug', 'Chirchiq-Ohangaron'],
  ['Har tomondan togʻlar bilan oʻralgan, faqat gʻarbdan ochiq botiq', 'Fargʻona'],
  ['Sirdaryoning chap sohilidagi, oʻzlashtirilgan qadimiy choʻl', 'Mirzachoʻl'],
  ['Amudaryo deltasida joylashgan, Xorazm vohasini oʻz ichiga olgan okrug', 'Quyi Amudaryo'],
  ['Oʻzbekistonning eng janubiy va eng issiq okrugi', 'Surxondaryo'],
  ['Atrofi tik jarliklar (chinklar) bilan oʻralgan plato', 'Ustyurt'],
  ['Zarafshon daryosining oʻrta oqimidagi, Samarqand vohasini oʻz ichiga olgan okrug', 'Oʻrta Zarafshon'],
  ['Buxoro va Qorakoʻl vohalarini oʻz ichiga olgan okrug', 'Quyi Zarafshon']
];
const UZN_POOL = [
  own(UZN), own(UZN),
  fact('{q} koni qaysi foydali qazilma bilan mashhur?', DEPOSITS),
  factRev('Quyidagi konlardan qaysi birida {a} qazib olinadi?', DEPOSITS),
  fact('{q} suv ombori qaysi daryoda qurilgan?', RESERVOIRS),
  fact('{q} qoʻriqxonasi qayerda joylashgan?', RESERVES, ['Navoiy viloyati', 'Xorazm viloyati']),
  fact('{q} qaysi tabiiy geografik okrug?', OKRUGS, ['Qizilqum', 'Qashqadaryo'])
];

/* ----------------------- 8. Oʻzbekiston iqtisodiyoti ----------------------- */
const IND: Row[] = [
  ['Asaka', 'avtomobilsozlik'], ['Bekobod', 'qora metallurgiya'], ['Olmaliq', 'rangli metallurgiya'], ['Chirchiq', 'azotli oʻgʻitlar ishlab chiqarish'],
  ['Muborak', 'gazni qayta ishlash'], ['Angren', 'koʻmir qazib olish'], ['Qorovulbozor', 'neftni qayta ishlash'], ['Navoiy', 'oltin qazib olish va qayta ishlash']
];
const REGIONS: Row[] = [
  ['Toshkent', 'Toshkent shahri va Toshkent viloyati'],
  ['Mirzachoʻl', 'Sirdaryo va Jizzax viloyatlari'],
  ['Fargʻona', 'Andijon, Namangan va Fargʻona viloyatlari'],
  ['Zarafshon', 'Samarqand, Buxoro va Navoiy viloyatlari'],
  ['Janubiy', 'Qashqadaryo va Surxondaryo viloyatlari'],
  ['Quyi Amudaryo', 'Qoraqalpogʻiston Respublikasi va Xorazm viloyati']
];
const UZE: Own[] = [
  ['Oʻzbekistondagi eng yirik gidroelektr stansiyasi qaysi?', 'Chorvoq GES', ['Farhod GES', 'Andijon GES', 'Tuyamoʻyin GES']],
  ['Oʻzbekistondagi eng yirik issiqlik elektr stansiyasi qaysi?', 'Sirdaryo IES', ['Angren IES', 'Navoiy IES', 'Toshkent IES']],
  ['Oʻzbekiston milliy iqtisodiyotining tayanch tarmogʻi qaysi?', 'sanoat', ['qishloq xoʻjaligi', 'turizm', 'savdo']],
  ['Qorakoʻlchilik Oʻzbekistonning qaysi hududlarida rivojlangan?', 'Buxoro, Navoiy va Qashqadaryo choʻl yaylovlarida', ['Fargʻona vodiysida', 'Toshkent vohasida', 'Chotqol togʻlarida']],
  ['Ustyurt gaz-kimyo majmuasi qayerda joylashgan?', 'Qoraqalpogʻiston Respublikasida', ['Qashqadaryo viloyatida', 'Buxoro viloyatida', 'Navoiy viloyatida']]
];
const UZE_POOL = [
  fact('{q} shahri qaysi sanoat tarmogʻi markazi sifatida mashhur?', IND),
  factRev('Quyidagi shaharlardan qaysi biri {a} markazi?', IND),
  fact('{q} iqtisodiy rayoni tarkibiga nimalar kiradi?', REGIONS),
  own(UZE)
];

/* --------------------------- 9. jahon xoʻjaligi --------------------------- */
const HQ: Row[] = [
  ['BMT', 'Nyu-York'], ['YUNESKO', 'Parij'], ['Jahon savdo tashkiloti', 'Jeneva'], ['Yevropa Ittifoqi', 'Bryussel'], ['OPEK', 'Vena'],
  ['Shanxay hamkorlik tashkiloti', 'Pekin'], ['Mustaqil Davlatlar Hamdoʻstligi', 'Minsk'], ['ASEAN', 'Jakarta'], ['Xalqaro valyuta jamgʻarmasi', 'Vashington']
];
const LEADERS: Row[] = [
  ['kofe', 'Braziliya'], ['kakao', 'Kot-dʼIvuar'], ['mis rudasi', 'Chili'], ['uran', 'Qozogʻiston'], ['temir rudasi', 'Avstraliya'],
  ['toshkoʻmir', 'Xitoy'], ['tabiiy kauchuk', 'Tailand'], ['zaytun moyi', 'Ispaniya'], ['neft', 'AQSh'], ['avtomobil', 'Xitoy']
];
const CANALS: Row[] = [
  ['Suvaysh kanali', 'Oʻrta yer dengizi va Qizil dengiz'], ['Panama kanali', 'Atlantika va Tinch okeanlari'], ['Kil kanali', 'Shimoliy dengiz va Boltiq dengizi'],
  ['Bosfor boʻgʻozi', 'Qora dengiz va Marmar dengizi'], ['Gibraltar boʻgʻozi', 'Oʻrta yer dengizi va Atlantika okeani'], ['Bering boʻgʻozi', 'Shimoliy Muz va Tinch okeanlari'],
  ['Malakka boʻgʻozi', 'Andaman dengizi va Janubiy Xitoy dengizi'], ['Hormuz boʻgʻozi', 'Fors qoʻltigʻi va Ummon qoʻltigʻi']
];
const COUNTRY_FEAT: Row[] = [
  ['Rur koʻmir havzasi', 'Germaniya'], ['Silikon vodiysi', 'AQSh'], ['Bangalor — axborot texnologiyalari markazi', 'Hindiston'], ['Tokaydo megalopolisi', 'Yaponiya'],
  ['elektr energiyasining katta qismi atom elektr stansiyalarida ishlab chiqariladi', 'Fransiya'], ['Milan–Turin–Genuya sanoat uchburchagi', 'Italiya'],
  ['Karajas temir rudasi koni', 'Braziliya'], ['Vitvatersrand oltin koni', 'JAR'], ['Pilbara temir rudasi havzasi', 'Avstraliya'], ['Galkinish tabiiy gaz koni', 'Turkmaniston'],
  ['Qumtor oltin koni', 'Qirgʻiziston'], ['Tursunzoda alyuminiy zavodi', 'Tojikiston'], ['Qaragʻanda koʻmir havzasi', 'Qozogʻiston'], ['Gʻarbiy Sibir neft-gaz havzasi', 'Rossiya'],
  ['Rotterdam porti', 'Niderlandiya'], ['palma yogʻi eksporti boʻyicha yetakchilardan biri', 'Malayziya'], ['Niger daryosi deltasidagi neft konlari', 'Nigeriya'],
  ['London Siti — jahon moliya markazi', 'Buyuk Britaniya'], ['dunyodagi eng koʻp orolli davlat', 'Indoneziya'], ['elektronika va kemasozlik — «yangi industrial mamlakat»', 'Koreya Respublikasi']
];
const WORLD: Own[] = [
  ['«Yangi industrial mamlakatlar»ga qaysi davlat kiradi?', 'Koreya Respublikasi', ['Efiopiya', 'Mongoliya', 'Afgʻoniston']],
  ['«Katta yettilik» (G7) tarkibiga qaysi davlat kiradi?', 'Kanada', ['Xitoy', 'Hindiston', 'Braziliya']],
  ['OPEK aʼzosi boʻlgan davlat qaysi?', 'Saudiya Arabistoni', ['Norvegiya', 'AQSh', 'Buyuk Britaniya']],
  ['Moskva va Vladivostokni bogʻlovchi temir yoʻl magistrali qanday ataladi?', 'Transsibir', ['Baykal-Amur', 'Transkaspiy', 'Turksib']],
  ['Xalqaro mehnat taqsimotida «dunyo ustaxonasi» deb ataladigan mamlakat qaysi?', 'Xitoy', ['Kanada', 'Avstraliya', 'Argentina']]
];
const WORLD_POOL = [
  fact('{q} shtab-kvartirasi qaysi shaharda joylashgan?', HQ),
  fact('{q} ishlab chiqarish (qazib olish) boʻyicha dunyoda yetakchi mamlakat qaysi?', LEADERS, ['Hindiston', 'Rossiya', 'Kanada']),
  fact('{q} nimalarni tutashtiradi?', CANALS),
  fact('Quyidagi xususiyat qaysi mamlakatga tegishli: {q}?', COUNTRY_FEAT),
  fact('Quyidagi xususiyat qaysi mamlakatga tegishli: {q}?', COUNTRY_FEAT),
  own(WORLD)
];

/* ---------------------- 10. tabiiy resurslar va mintaqalar ---------------------- */
const BASINS: Row[] = [
  ['Fors qoʻltigʻi havzasi', 'neft va tabiiy gaz'], ['Rur havzasi', 'toshkoʻmir'], ['Karajas', 'temir rudasi'], ['Mis kamari (Zambiya, KDR)', 'mis'],
  ['Vitvatersrand', 'oltin'], ['Kimberli', 'olmos'], ['Appalachi havzasi', 'toshkoʻmir'], ['Meksika qoʻltigʻi havzasi', 'neft va tabiiy gaz']
];
const RES: Own[] = [
  ['Quyidagilardan qaysi biri tugamaydigan tabiiy resurs?', 'quyosh energiyasi', ['neft', 'oʻrmon', 'tuproq']],
  ['Quyidagilardan qaysi biri tugaydigan, ammo tiklanadigan resurs?', 'oʻrmon resurslari', ['toshkoʻmir', 'temir rudasi', 'quyosh energiyasi']],
  ['Quyidagilardan qaysi biri tiklanmaydigan resurs?', 'tabiiy gaz', ['shamol energiyasi', 'oʻrmon', 'quyosh energiyasi']],
  ['Oʻrmon maydoni boʻyicha dunyoda birinchi oʻrindagi mamlakat qaysi?', 'Rossiya', ['Braziliya', 'Kanada', 'AQSh']],
  ['Chuchuk suv resurslari boʻyicha dunyoda birinchi oʻrindagi mamlakat qaysi?', 'Braziliya', ['Rossiya', 'Kanada', 'Xitoy']],
  ['Dunyodagi eng katta tropik oʻrmon massivi qayerda?', 'Amazoniya (selva)', ['Kongo havzasi', 'Indoneziya orollari', 'Hindixitoy yarimoroli']],
  ['Gidroenergetika resurslari boʻyicha dunyoda yetakchi mamlakat qaysi?', 'Xitoy', ['Misr', 'Saudiya Arabistoni', 'Niderlandiya']],
  ['Yerning hayot tarqalgan qobigʻi qanday ataladi?', 'biosfera', ['litosfera', 'gidrosfera', 'atmosfera']],
  ['Dunyo okeanining tokchalaridan (shelfdan) asosan qanday mineral resurslar qazib olinadi?', 'neft va tabiiy gaz', ['olmos', 'boksit', 'toshkoʻmir']]
];
const REG_POOL = [fact('{q} qaysi tabiiy resurs bilan mashhur?', BASINS), own(RES), own(RES)];

/* ----------------------------- 11. geoekologiya ----------------------------- */
const ECO: Own[] = [
  ['Orol dengizining qurishiga asosiy sabab nima?', 'Amudaryo va Sirdaryo suvining sugʻorishga koʻplab olinishi', ['iqlimning keskin sovishi', 'yer qimirlashlari', 'dengiz tubining koʻtarilishi']],
  ['Ozon qatlamining yemirilishiga asosan qaysi moddalar sabab boʻladi?', 'freonlar (xlorftoruglerodlar)', ['kislorod', 'azot', 'suv bugʻi']],
  ['Issiqxona effektini kuchaytiruvchi asosiy gaz qaysi?', 'karbonat angidrid (CO₂)', ['kislorod', 'azot', 'argon']],
  ['Kislotali yomgʻirlarning asosiy sababi nima?', 'havoga oltingugurt va azot oksidlarining chiqarilishi', ['vulqon kulining yogʻishi', 'okean suvining bugʻlanishi', 'oʻrmonlarning koʻpayishi']],
  ['Orol dengizining qurigan tubida hosil boʻlgan choʻl qanday ataladi?', 'Orolqum', ['Qizilqum', 'Qoraqum', 'Moʻyinqum']],
  ['Inson faoliyati natijasida oʻzgargan tabiat komplekslari qanday ataladi?', 'antropogen landshaftlar', ['tabiiy landshaftlar', 'zonal komplekslar', 'azonal komplekslar']],
  ['Yoʻqolib ketish xavfi ostidagi oʻsimlik va hayvon turlari qaysi kitobga kiritiladi?', 'Qizil kitob', ['Yashil kitob', 'Oq kitob', 'Oltin kitob']],
  ['Togʻ yonbagʻirlaridagi oʻrmonlarning kesilishi koʻpincha nimaga olib keladi?', 'tuproq eroziyasi va sel hodisalari', ['tuproqning shoʻrlanishi', 'yerosti suvlarining koʻtarilishi', 'iqlimning namlanishi']],
  ['Sugʻoriladigan yerlarda ortiqcha suv berish va drenajning yomonligi nimaga olib keladi?', 'tuproqning ikkilamchi shoʻrlanishi', ['gumusning koʻpayishi', 'eroziyaning toʻxtashi', 'choʻllanishning kamayishi']],
  ['Yirik shaharlarda havo ifloslanishidan hosil boʻladigan zaharli tuman qanday ataladi?', 'smog', ['briz', 'fyon', 'musson']]
];
const ECO_POOL = [own(ECO)];

/* --------------------------------- 12. aholi --------------------------------- */
const POP: Own[] = [
  ['Tugʻilish va oʻlim koʻrsatkichlari oʻrtasidagi farq nima deb ataladi?', 'tabiiy oʻsish', ['mexanik oʻsish', 'urbanizatsiya', 'migratsiya']],
  ['Shahar aholisi ulushining ortishi va shaharlar rolining kuchayishi qanday ataladi?', 'urbanizatsiya', ['migratsiya', 'depopulyatsiya', 'demografik portlash']],
  ['Aholining doimiy yashash uchun boshqa davlatga koʻchib ketishi qanday ataladi?', 'emigratsiya', ['immigratsiya', 'urbanizatsiya', 'reemigratsiya']],
  ['Bir necha aglomeratsiyalarning qoʻshilib ketishidan hosil boʻlgan yirik shahar tizimi qanday ataladi?', 'megalopolis', ['aglomeratsiya', 'shaharcha', 'posyolka']],
  ['Aholi sonining juda tez oʻsishi qanday ataladi?', 'demografik portlash', ['demografik inqiroz', 'depopulyatsiya', 'urbanizatsiya']],
  ['Oʻlim tugʻilishdan koʻp boʻlishi natijasida aholi sonining kamayishi qanday ataladi?', 'depopulyatsiya', ['demografik portlash', 'urbanizatsiya', 'immigratsiya']],
  ['Aholisi soni boʻyicha dunyoda birinchi oʻrindagi davlat qaysi?', 'Hindiston', ['Xitoy', 'AQSh', 'Indoneziya']],
  ['Afrikadagi eng koʻp aholili davlat qaysi?', 'Nigeriya', ['Efiopiya', 'Misr', 'JAR']],
  ['Janubiy Amerikadagi eng koʻp aholili davlat qaysi?', 'Braziliya', ['Argentina', 'Kolumbiya', 'Peru']],
  ['Oʻzbekistonda aholisi eng koʻp viloyat qaysi?', 'Samarqand viloyati', ['Fargʻona viloyati', 'Qashqadaryo viloyati', 'Toshkent viloyati']],
  ['Oʻzbekistonda aholi zichligi eng yuqori viloyat qaysi?', 'Andijon viloyati', ['Fargʻona viloyati', 'Samarqand viloyati', 'Namangan viloyati']],
  ['Oʻzbekistonda aholisi eng kam viloyat qaysi?', 'Sirdaryo viloyati', ['Navoiy viloyati', 'Jizzax viloyati', 'Xorazm viloyati']],
  ['Oʻzbekistonda aholi zichligi eng past viloyat qaysi?', 'Navoiy viloyati', ['Buxoro viloyati', 'Jizzax viloyati', 'Surxondaryo viloyati']],
  ['Dunyodagi eng kichik davlat qaysi?', 'Vatikan', ['Monako', 'San-Marino', 'Lixtenshteyn']]
];
const MEGA: Row[] = [['Bosvash', 'AQSh'], ['Chipits', 'AQSh'], ['Sansan', 'AQSh'], ['Tokaydo', 'Yaponiya'], ['Reyn-Rur', 'Germaniya'], ['Angliya (London–Liverpul)', 'Buyuk Britaniya']];
const densQ = () => {
  const d = R(4, 60) * 5;
  const S = R(2, 40) * 10;
  const P = (d * S) / 1000;
  return mcn(`Mamlakatning maydoni ${S} ming km², aholisi ${num(P)} mln kishi. Aholining oʻrtacha zichligi necha kishi/km²?`, d, `${num(P)} mln : ${S} ming km² = ${d} kishi/km².`);
};
const growthQ = () => {
  const b = R(14, 34);
  const dd = R(4, 12);
  return mcn(`Mamlakatda tugʻilish koeffitsiyenti ${b} ‰, oʻlim koeffitsiyenti ${dd} ‰. Tabiiy oʻsish koeffitsiyenti necha promille?`, b - dd, `${b} − ${dd} = ${b - dd} ‰.`, 0, [b + dd]);
};
const POP_POOL = [own(POP), own(POP), own(POP), fact('{q} megalopolisi qaysi mamlakatda joylashgan?', MEGA, ['Xitoy', 'Fransiya', 'Hindiston']), densQ, growthQ];

/* ------------------------------ 29–32 xarita ------------------------------ */
type Pt = [string, number, number];
const OCEAN_PTS: [string, number, number, string][] = [
  ['Mariana botigʻi', 11, 142, 'Tinch okeani'], ['Bermud orollari', 32, -65, 'Atlantika okeani'], ['Madagaskar oroli', -20, 47, 'Hind okeani'], ['Islandiya oroli', 65, -18, 'Atlantika okeani'],
  ['Gavayi orollari', 20, -157, 'Tinch okeani'], ['Shri-Lanka oroli', 8, 81, 'Hind okeani'], ['Kanar orollari', 28, -16, 'Atlantika okeani'], ['Yangi Zelandiya', -41, 174, 'Tinch okeani'], ['Shpitsbergen orollari', 78, 16, 'Shimoliy Muz okeani']
];
const CONT_PTS: Pt[] = [
  ['Kilimanjaro', -3, 37], ['Everest', 28, 87], ['Akonkagua', -33, -70], ['Viktoriya koʻli', -1, 33], ['Baykal koʻli', 53, 108], ['Denali', 63, -151], ['Titikaka koʻli', -16, -69], ['Eyr koʻli', -29, 137], ['Yuqori koʻl', 48, -88], ['Kostyushko togʻi', -36, 148]
];
const CA_PTS: Pt[] = [['Issiqkoʻl', 42, 77], ['Balxash koʻli', 46, 75], ['Ismoil Somoniy choʻqqisi', 39, 72], ['Orol dengizi', 45, 60], ['Qoragiyo botigʻi', 43, 52], ['Qoraqum choʻli', 39, 60]];
const UZ_PTS: Pt[] = [['Toshkent', 41.3, 69.2], ['Samarqand', 39.7, 67], ['Buxoro', 39.8, 64.4], ['Nukus', 42.5, 59.6], ['Termiz', 37.2, 67.3], ['Andijon', 40.8, 72.3], ['Qarshi', 38.9, 65.8]];
const round = (p: Pt): Pt => [p[0], Math.round(p[1]), Math.round(p[2])];
const coordQ = (title: string, pts: Pt[]) => () => {
  const all = pts.map(round);
  const p = pick(all);
  return mc(`${title} Koordinatalari (taxminan) ${coord(p[1], p[2])} boʻlgan obyekt qaysi?`, p[0], all.filter((x) => x[0] !== p[0]).map((x) => x[0]), `${p[0]} — ${coord(p[1], p[2])}.`);
};
const extremeQ = (title: string, pts: Pt[]) => () => {
  const four = shuffle(pts).slice(0, 4);
  const kinds: [string, (p: Pt) => number][] = [['eng shimolda', (p) => p[1]], ['eng janubda', (p) => -p[1]], ['eng sharqda', (p) => p[2]], ['eng gʻarbda', (p) => -p[2]]];
  const [k, f] = pick(kinds);
  const sorted = [...four].sort((a, b) => f(b) - f(a));
  if (f(sorted[0]) - f(sorted[1]) < 1.5) throw new Error('close');
  return mc(`${title} Quyidagi obyektlardan qaysi biri ${k} joylashgan?`, sorted[0][0], sorted.slice(1).map((p) => p[0]), `${sorted.map((p) => `${p[0]} (${coord(Math.round(p[1]), Math.round(p[2]))})`).join(', ')}.`);
};
const oceanPtQ = () => {
  const [n, , , o] = pick(OCEAN_PTS);
  return mc(`Okeanlar xaritasida ${n} qaysi okeanda joylashgan?`, o, OCEANS, `${n} — ${o}da.`);
};
const UZ_MAP: Own[] = [
  ['Oʻzbekistonning qaysi viloyati Afgʻoniston bilan chegaradosh?', 'Surxondaryo viloyati', ['Qashqadaryo viloyati', 'Buxoro viloyati', 'Navoiy viloyati']],
  ['Oʻzbekistonning eng shimoliy nuqtasi qayerda joylashgan?', 'Ustyurt platosida (Qoraqalpogʻiston)', ['Toshkent viloyatida', 'Namangan viloyatida', 'Navoiy viloyatida']],
  ['Oʻzbekistonning eng sharqiy nuqtasi qaysi viloyatda?', 'Andijon viloyatida', ['Namangan viloyatida', 'Toshkent viloyatida', 'Surxondaryo viloyatida']],
  ['Oʻzbekistonning eng janubiy nuqtasi qaysi viloyatda?', 'Surxondaryo viloyatida', ['Qashqadaryo viloyatida', 'Buxoro viloyatida', 'Xorazm viloyatida']]
];
const MAP_OCEAN = [coordQ('Okeanlar xaritasi.', OCEAN_PTS.map((p) => [p[0], p[1], p[2]] as Pt)), oceanPtQ];
const MAP_CONT = [coordQ('Materiklar xaritasi.', CONT_PTS), extremeQ('Materiklar xaritasi.', CONT_PTS)];
const MAP_CA = [coordQ('Oʻrta Osiyo xaritasi.', CA_PTS), extremeQ('Oʻrta Osiyo xaritasi.', CA_PTS)];
const MAP_UZ = [coordQ('Oʻzbekiston xaritasi.', UZ_PTS), extremeQ('Oʻzbekiston xaritasi.', UZ_PTS), own(UZ_MAP)];

/* ------------------------------ 33–35 moslashtirish ------------------------------ */
function matchSet(what: string, ask: (x: string) => string, rows: Row[]): Q[] {
  const seen = new Set<string>();
  const uniq = shuffle(rows).filter((r) => (seen.has(r[1]) ? false : (seen.add(r[1]), true)));
  const asks = uniq.slice(0, 3);
  return matchBlock('', `33–35-topshiriqlar uchun umumiy shart: ${what}`, asks.map(([a, b]) => [ask(a), b, `${a} — ${b}.`] as [string, string, string]), rows.map((r) => r[1]));
}
function geoMatch(): Q[] {
  const sets: (() => Q[])[] = [
    () => matchSet('xaritadagi chiziqlarni ularning nomlari bilan moslashtiring.', (x) => `Xaritada ${x} qanday ataladi?`, ISO),
    () => matchSet('konlarni u yerda qazib olinadigan foydali qazilmalar bilan moslashtiring.', (x) => `${x} konida nima qazib olinadi?`, DEPOSITS),
    () => matchSet('suv omborlarini ular qurilgan daryolar bilan moslashtiring.', (x) => `${x} suv ombori qaysi daryoda?`, RESERVOIRS),
    () => matchSet('xalqaro tashkilotlarni ularning shtab-kvartiralari bilan moslashtiring.', (x) => `${x} shtab-kvartirasi qayerda?`, HQ),
    () => matchSet('choʻqqilarni ular joylashgan materiklar bilan moslashtiring.', (x) => `${x} qaysi materikda?`, PEAKS.map(([c, p]) => [p, c] as Row)),
    () => matchSet('kanal va boʻgʻozlarni ular tutashtiradigan suv havzalari bilan moslashtiring.', (x) => `${x} nimalarni tutashtiradi?`, CANALS),
    () => matchSet('shaharlarni ular markazi boʻlgan sanoat tarmoqlari bilan moslashtiring.', (x) => `${x} — qaysi tarmoq markazi?`, IND)
  ];
  return pick(sets)();
}

/* ------------------------------ 36–45 ochiq ------------------------------ */
const CITIES: [string, number][] = [['London', 0], ['Parij', 1], ['Qohira', 2], ['Moskva', 3], ['Dubay', 4], ['Toshkent', 5], ['Bangkok', 7], ['Pekin', 8], ['Tokio', 9], ['Sidney', 10], ['Rio-de-Janeyro', -3], ['Nyu-York', -5], ['Chikago', -6], ['Los-Anjeles', -8]];
const utc = (o: number) => `UTC${o >= 0 ? '+' : '−'}${Math.abs(o)}`;
const openTZ = (): Q => {
  const [a, b, c] = shuffle(CITIES);
  const t = R(0, 23) * 60 + pick([0, 30]);
  const tb = t + (b[1] - a[1]) * 60;
  const tc = t + (c[1] - a[1]) * 60;
  return openN(
    `${a[0]}da (${utc(a[1])}) mintaqaviy vaqt boʻyicha soat ${hmShow(t)}. (Yozgi vaqt va sana hisobga olinmasin; javobni SS:DD shaklida yozing.)`,
    [[`a) Shu paytda ${b[0]}da (${utc(b[1])}) soat necha boʻladi?`, hm(tb)], [`b) Shu paytda ${c[0]}da (${utc(c[1])}) soat necha boʻladi?`, hm(tc)]],
    `Vaqt farqi = mintaqalar farqi. a) ${hmShow(t)} ${b[1] - a[1] >= 0 ? '+' : '−'} ${Math.abs(b[1] - a[1])} soat = ${hmShow(tb)}; b) ${hmShow(t)} ${c[1] - a[1] >= 0 ? '+' : '−'} ${Math.abs(c[1] - a[1])} soat = ${hmShow(tc)}.`
  );
};
const openLocal = (): Q => {
  const l1 = R(20, 80);
  const l2 = l1 + pick([-1, 1]) * R(5, 40);
  const diff = (l2 - l1) * 4;
  const t = R(8, 16) * 60;
  return openN(
    `A nuqta ${l1}° sh.u. da, B nuqta ${l2}° sh.u. da joylashgan. A nuqtada mahalliy vaqt ${hmShow(t)}. (Javobni SS:DD shaklida yozing.)`,
    [['a) A va B nuqtalar orasidagi mahalliy vaqt farqi necha daqiqa?', Math.abs(diff)], ['b) B nuqtada mahalliy vaqt qancha?', hm(t + diff)]],
    `1° uzunlik = 4 daqiqa. a) ${Math.abs(l2 - l1)} × 4 = ${Math.abs(diff)} daqiqa; b) B ${l2 > l1 ? 'sharqda — vaqt oldinda' : 'gʻarbda — vaqt orqada'}: ${hmShow(t + diff)}.`
  );
};
const openScale = (): Q => {
  for (;;) {
    const M1 = pick([100000, 200000, 250000, 500000, 1000000]);
    const d = R(2, 12);
    const km = (d * M1) / 100000;
    const M2 = pick([50000, 100000, 200000, 250000, 500000].filter((m) => m !== M1));
    const sm = (km * 100000) / M2;
    if (!Number.isInteger(sm * 2) || sm > 100) continue;
    return openN(
      `1:${M1.toLocaleString('ru-RU')} masshtabli xaritada ikki aholi punkti orasidagi masofa ${d} sm.`,
      [['a) Joyda ular orasidagi masofa necha km?', km], [`b) Shu masofa 1:${M2.toLocaleString('ru-RU')} masshtabli xaritada necha sm boʻladi?`, sm]],
      `a) ${d} × ${num(M1 / 100000)} = ${num(km)} km; b) ${num(km)} km : ${num(M2 / 100000)} = ${num(sm)} sm.`
    );
  }
};
const openTemp = (): Q => {
  const T0 = pick([12, 18, 24, 30]);
  const H = R(3, 10) * 500;
  const T = T0 - (6 * H) / 1000;
  return openN(
    `Togʻ etagida havo harorati +${T0} °C. Har 1 km balandlikda harorat 6 °C ga pasayadi.`,
    [[`a) Etakdan ${H} m balanddagi choʻqqida harorat necha °C?`, T], ['b) Etakdan qancha balandlikda (m) harorat 0 °C boʻladi?', (T0 / 6) * 1000]],
    `a) ${T0} − 6 × ${num(H / 1000)} = ${num(T)} °C; b) ${T0} : 6 = ${num(T0 / 6)} km = ${(T0 / 6) * 1000} m.`
  );
};
const openPressure = (): Q => {
  const k = R(5, 30);
  const j = R(5, 30);
  if (j === k) throw new Error('same');
  return openN(
    'Dengiz sathida atmosfera bosimi 760 mm sim. ust. Har 10,5 m koʻtarilganda bosim 1 mm ga kamayadi.',
    [[`a) ${k * 105} m balandlikda bosim necha mm sim. ust. boʻladi?`, 760 - k * 10], [`b) Bosim ${760 - j * 10} mm sim. ust. boʻlgan joyning balandligi necha m?`, j * 105]],
    `a) ${k * 105} : 10,5 = ${k * 10} mm → 760 − ${k * 10} = ${760 - k * 10}; b) (760 − ${760 - j * 10}) × 10,5 = ${j * 105} m.`
  );
};
const openHumidity = (): Q => {
  const S = pick([10, 15, 17, 20, 25, 30]);
  const p = pick([20, 40, 50, 60, 80]);
  const a = (S * p) / 100;
  if (!Number.isInteger(a)) throw new Error('frac');
  return openN(
    `Havo harorati shunday ekanki, 1 m³ havo eng koʻpi bilan ${S} g suv bugʻini saqlay oladi. Hozir 1 m³ havoda ${a} g suv bugʻi bor.`,
    [['a) Havoning nisbiy namligi necha foiz?', p], ['b) Havo toʻyinishi uchun 1 m³ ga yana necha g suv bugʻi kerak?', S - a]],
    `a) ${a} : ${S} × 100 = ${p} %; b) ${S} − ${a} = ${S - a} g.`
  );
};
const openAmplitude = (): Q => {
  const v = [R(5, 15), R(8, 20), R(18, 32)];
  let last = R(10, 22);
  last += (4 - ((v[0] + v[1] + v[2] + last) % 4)) % 4;
  const all = [v[0], v[1], v[2], last];
  const avg = all.reduce((s, x) => s + x, 0) / 4;
  return openN(
    `Sutka davomida havo harorati oʻlchandi: soat 1 da +${all[0]} °C, soat 7 da +${all[1]} °C, soat 13 da +${all[2]} °C, soat 19 da +${all[3]} °C.`,
    [['a) Sutkalik oʻrtacha harorat necha °C?', avg], ['b) Sutkalik harorat amplitudasi necha °C?', Math.max(...all) - Math.min(...all)]],
    `a) (${all.join(' + ')}) : 4 = ${avg}; b) ${Math.max(...all)} − ${Math.min(...all)} = ${Math.max(...all) - Math.min(...all)}.`
  );
};
const SHELL_OPEN = [openTemp, openPressure, openHumidity, openAmplitude];

type OpenRec = [string, string, string, string, string];
const openOf = (r: OpenRec): Q => openN(r[0], [[r[1], r[2]], [r[3], r[4]]], `${r[0]} Javob: a) ${r[2].split(' / ')[0]}; b) ${r[4].split(' / ')[0]}.`);
const OPEN_CONT: OpenRec[] = [
  ['Afrikaning eng baland nuqtasi soʻngan vulqon hisoblanadi.', 'a) Uning nomini yozing.', 'Kilimanjaro', 'b) U qaysi davlat hududida joylashgan?', 'Tanzaniya'],
  ['Janubiy Amerikaning eng baland choʻqqisi And togʻlarida joylashgan.', 'a) Choʻqqi nomini yozing.', 'Akonkagua', 'b) U qaysi davlat hududida joylashgan?', 'Argentina'],
  ['Dunyodagi eng baland sharshara Janubiy Amerikada joylashgan.', 'a) Sharshara nomini yozing.', 'Anxel', 'b) U qaysi davlat hududida?', 'Venesuela'],
  ['Ekvatorni ikki marta kesib oʻtuvchi Afrika daryosi.', 'a) Daryo nomini yozing.', 'Kongo', 'b) U qaysi okeanga quyiladi?', 'Atlantika / Atlantika okeani'],
  ['Viktoriya sharsharasi joylashgan Afrika daryosi.', 'a) Daryo nomini yozing.', 'Zambezi', 'b) U qaysi okeanga quyiladi?', 'Hind / Hind okeani'],
  ['Avstraliyaning eng past nuqtasi boʻlgan shoʻr koʻl dengiz sathidan 16 m past.', 'a) Koʻl nomini yozing.', 'Eyr', 'b) Avstraliyaning eng uzun daryosini yozing.', 'Murrey'],
  ['Shimoliy Amerikaning eng uzun daryo tizimi Meksika qoʻltigʻiga quyiladi.', 'a) Daryo nomini yozing.', 'Missisipi', 'b) Uning eng yirik irmogʻini yozing.', 'Missuri'],
  ['Yevrosiyoning eng uzun daryosi Sharqiy Xitoy dengiziga quyiladi.', 'a) Daryo nomini yozing.', 'Yanszi / Yangtszi', 'b) U qaysi okean havzasiga kiradi?', 'Tinch / Tinch okeani'],
  ['Antarktidaning eng baland nuqtasi.', 'a) Uning nomini yozing.', 'Vinson / Vinson massivi', 'b) Antarktidani 1820-yilda kashf etgan ekspeditsiya rahbarlaridan birini yozing.', 'Bellinsgauzen / Lazarev'],
  ['Shimoliy Amerikadagi beshta yirik chuchuk suvli koʻl tizimi — Buyuk koʻllar.', 'a) Ulardan eng kattasini yozing.', 'Yuqori / Yuqori koʻl', 'b) Koʻllar oraligʻidagi mashhur sharshara nomini yozing.', 'Niagara'],
  ['Afrikaning shimolidagi dunyodagi eng katta tropik choʻl.', 'a) Choʻl nomini yozing.', 'Sahroi Kabir / Sahara', 'b) Afrikaning janubi-gʻarbidagi qirgʻoq choʻli nomini yozing.', 'Namib']
];
const OPEN_UZE: OpenRec[] = [
  ['Oʻzbekistondagi yirik avtomobil zavodi Andijon viloyatida joylashgan.', 'a) Zavod joylashgan shahar nomini yozing.', 'Asaka', 'b) Andijon viloyati qaysi iqtisodiy rayonga kiradi?', 'Fargʻona / Fargʻona iqtisodiy rayoni'],
  ['Oʻzbekistonning qora metallurgiya markazi Toshkent viloyatida joylashgan.', 'a) Shahar nomini yozing.', 'Bekobod', 'b) Mis va rux ishlab chiqaruvchi rangli metallurgiya kombinati qaysi shaharda?', 'Olmaliq'],
  ['Navoiy kon-metallurgiya kombinati Qizilqumdagi yirik kondan oltin qazib oladi.', 'a) Kon nomini yozing.', 'Muruntov', 'b) Navoiy viloyati qaysi iqtisodiy rayonga kiradi?', 'Zarafshon / Zarafshon iqtisodiy rayoni'],
  ['Oʻzbekistondagi eng yirik GES Toshkent viloyatida joylashgan.', 'a) GES nomini yozing.', 'Chorvoq / Chorvoq GES', 'b) U qaysi daryoda qurilgan?', 'Chirchiq'],
  ['Qashqadaryo viloyatidagi yirik gaz-kimyo majmuasi polietilen ishlab chiqaradi.', 'a) Majmua nomini yozing.', 'Shoʻrtan / Shoʻrtan GKM', 'b) Qashqadaryo viloyatidagi yirik gazni qayta ishlash zavodi joylashgan shaharni yozing.', 'Muborak'],
  ['Chirchiq shahri kimyo sanoati markazi hisoblanadi.', 'a) Bu yerda asosan qanday oʻgʻitlar ishlab chiqariladi?', 'azotli / azot', 'b) Chirchiq daryosidagi eng yirik suv omborini yozing.', 'Chorvoq'],
  ['Mirzachoʻl iqtisodiy rayoni ikki viloyatdan iborat.', 'a) Ulardan biri Sirdaryo viloyati. Ikkinchisini yozing.', 'Jizzax', 'b) Sirdaryo viloyatidagi Oʻzbekistonning eng yirik IESi qaysi shaharda joylashgan?', 'Shirin']
];
const OPEN_WORLD: OpenRec[] = [
  ['Oʻrta yer dengizi va Qizil dengizni tutashtiruvchi kanal.', 'a) Kanal nomini yozing.', 'Suvaysh', 'b) U qaysi davlat hududida joylashgan?', 'Misr'],
  ['Atlantika va Tinch okeanlarini tutashtiruvchi kanal.', 'a) Kanal nomini yozing.', 'Panama', 'b) Kanal qaysi davlat hududida?', 'Panama'],
  ['Neft eksport qiluvchi mamlakatlar tashkiloti 1960-yilda tuzilgan.', 'a) Tashkilotning qisqa nomini yozing.', 'OPEK', 'b) Uning shtab-kvartirasi qaysi shaharda?', 'Vena'],
  ['Yaponiyaning asosiy sanoat markazlari Tinch okean sohilida megalopolis hosil qilgan.', 'a) Megalopolis nomini yozing.', 'Tokaydo', 'b) Yaponiyaning poytaxtini yozing.', 'Tokio'],
  ['Germaniyaning eng yirik koʻmir-metallurgiya havzasi.', 'a) Havza nomini yozing.', 'Rur', 'b) U qaysi daryo havzasida joylashgan?', 'Reyn'],
  ['Yevropaning eng yirik porti Reyn daryosining quyilishida joylashgan.', 'a) Port nomini yozing.', 'Rotterdam', 'b) U qaysi davlatda?', 'Niderlandiya / Gollandiya'],
  ['Moskva va Vladivostokni bogʻlovchi dunyodagi eng uzun temir yoʻl magistrali.', 'a) Magistral nomini yozing.', 'Transsibir', 'b) U qaysi okean sohilida tugaydi?', 'Tinch / Tinch okeani'],
  ['Mis rudasi qazib olish boʻyicha dunyoda birinchi oʻrindagi mamlakat Janubiy Amerikada joylashgan.', 'a) Mamlakat nomini yozing.', 'Chili', 'b) Uning poytaxtini yozing.', 'Santyago']
];
const openGrowth = (): Q => {
  const N = R(5, 60);
  const b = R(15, 32);
  const d = R(4, 11);
  return openN(
    `Mamlakat aholisi ${N} mln kishi. Tugʻilish koeffitsiyenti ${b} ‰, oʻlim koeffitsiyenti ${d} ‰.`,
    [['a) Tabiiy oʻsish koeffitsiyenti necha ‰?', b - d], ['b) Bir yilda aholi tabiiy oʻsish hisobiga necha ming kishiga koʻpayadi?', N * (b - d)]],
    `a) ${b} − ${d} = ${b - d} ‰; b) ${N} mln × ${b - d} ‰ = ${N * (b - d)} ming kishi.`
  );
};
const openDensity = (): Q => {
  const S = R(5, 50) * 10;
  const d = R(4, 40) * 5;
  const k = R(1, 6) * 5;
  const P = (S * d) / 1000;
  const P2 = (S * (d + k)) / 1000;
  return openN(
    `Mamlakatning maydoni ${S} ming km², aholisi ${num(P)} mln kishi.`,
    [['a) Aholining oʻrtacha zichligi necha kishi/km²?', d], [`b) Aholi ${num(P2)} mln kishiga yetsa, zichlik necha kishi/km² boʻladi?`, d + k]],
    `a) ${num(P)} mln : ${S} ming km² = ${d}; b) ${num(P2)} mln : ${S} ming km² = ${d + k}.`
  );
};
const openUrban = (): Q => {
  const N = R(1, 4) * 20;
  const p = R(4, 17) * 5;
  const u = (N * p) / 100;
  return openN(
    `Mamlakat aholisi ${N} mln kishi, urbanizatsiya darajasi ${p} %.`,
    [['a) Shahar aholisi necha mln kishi?', u], ['b) Qishloq aholisi necha mln kishi?', N - u]],
    `a) ${N} × ${p} : 100 = ${u} mln; b) ${N} − ${u} = ${N - u} mln.`
  );
};
const openTotal = (): Q => {
  const B = R(30, 90) * 10;
  const D = R(10, 40) * 10;
  const I = R(2, 20) * 5;
  const E = R(2, 30) * 5;
  return openN(
    `Bir yilda mamlakatda ${B} ming kishi tugʻildi, ${D} ming kishi vafot etdi. ${I} ming kishi koʻchib keldi, ${E} ming kishi koʻchib ketdi.`,
    [['a) Tabiiy oʻsish necha ming kishi?', B - D], ['b) Aholining umumiy (tabiiy + mexanik) oʻsishi necha ming kishi?', B - D + I - E]],
    `a) ${B} − ${D} = ${B - D}; b) ${B - D} + (${I} − ${E}) = ${B - D + I - E} ming kishi.`
  );
};
const POP_OPEN = [openGrowth, openDensity, openUrban, openTotal];
const STATES: [string, string, string][] = [
  ['Avstraliya Ittifoqi', 'Kanberra', 'federativ'], ['Kanada', 'Ottava', 'federativ'], ['Braziliya', 'Braziliya', 'federativ'], ['Germaniya', 'Berlin', 'federativ'],
  ['Hindiston', 'Dehli / Nyu-Dehli', 'federativ'], ['AQSh', 'Vashington', 'federativ'], ['Pokiston', 'Islomobod', 'federativ'], ['Nigeriya', 'Abuja', 'federativ'],
  ['Meksika', 'Mexiko', 'federativ'], ['Argentina', 'Buenos-Ayres', 'federativ'], ['Fransiya', 'Parij', 'unitar'], ['Yaponiya', 'Tokio', 'unitar'],
  ['Turkiya', 'Anqara', 'unitar'], ['Misr', 'Qohira', 'unitar'], ['Qozogʻiston', 'Astana', 'unitar'], ['Italiya', 'Rim', 'unitar'], ['Indoneziya', 'Jakarta', 'unitar']
];
const RULE: [string, string, string][] = [
  ['Buyuk Britaniya', 'London', 'konstitutsion monarxiya'], ['Yaponiya', 'Tokio', 'konstitutsion monarxiya'], ['Ispaniya', 'Madrid', 'konstitutsion monarxiya'], ['Shvetsiya', 'Stokgolm', 'konstitutsion monarxiya'],
  ['Saudiya Arabistoni', 'Ar-Riyod / Riyod', 'absolyut monarxiya'], ['Ummon', 'Masqat', 'absolyut monarxiya'], ['Fransiya', 'Parij', 'respublika'], ['Italiya', 'Rim', 'respublika'], ['Braziliya', 'Braziliya', 'respublika']
];
const openPol = (): Q => {
  if (R(0, 1)) {
    const [s, c, f] = pick(STATES);
    return openN(`Davlat: ${s}.`, [['a) Uning poytaxtini yozing.', c], ['b) Davlat tuzilishi shakli qanday (unitar yoki federativ)?', f]], `${s}: poytaxti — ${c.split(' / ')[0]}, ${f} davlat.`);
  }
  const [s, c, f] = pick(RULE);
  return openN(`Davlat: ${s}.`, [['a) Uning poytaxtini yozing.', c], ['b) Boshqaruv shakli qanday (respublika, konstitutsion monarxiya yoki absolyut monarxiya)?', f]], `${s}: poytaxti — ${c.split(' / ')[0]}, boshqaruv shakli — ${f}.`);
};

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

/** A fresh 45-task geography variant (client side only — random). */
export function buildGeoExam(): G11Question[] {
  const seen = new Set<string>();
  const [s1, s2] = shuffle(SHELL_OPEN);
  const [p1, p2] = shuffle(POP_OPEN);
  const list: Q[] = [
    ...distinct(HIST_POOL, 1, seen),
    ...distinct(MAP_POOL, 1, seen),
    ...distinct(SHELL_POOL, 2, seen),
    ...distinct(OCEAN_POOL, 2, seen),
    ...distinct(CONT_POOL, 4, seen),
    ...distinct(CA_POOL, 2, seen),
    ...distinct(UZN_POOL, 3, seen),
    ...distinct(UZE_POOL, 2, seen),
    ...distinct(WORLD_POOL, 4, seen),
    ...distinct(REG_POOL, 3, seen),
    ...distinct(ECO_POOL, 1, seen),
    ...distinct(POP_POOL, 3, seen),
    ...distinct(MAP_OCEAN, 1, seen),
    ...distinct(MAP_CONT, 1, seen),
    ...distinct(MAP_CA, 1, seen),
    ...distinct(MAP_UZ, 1, seen),
    ...tryBlock(geoMatch),
    tryGen(openTZ),
    tryGen(pick([openLocal, openScale])),
    tryGen(s1),
    tryGen(s2),
    openOf(pick(OPEN_CONT)),
    openOf(pick(OPEN_UZE)),
    openOf(pick(OPEN_WORLD)),
    tryGen(p1),
    tryGen(p2),
    tryGen(openPol)
  ];
  return toQuestions(list, 'g11-geo');
}
