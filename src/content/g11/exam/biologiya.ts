import type { G11Question } from '../diagnostic';
import { R, pick, shuffle, num, mc, mcn, openN, fromPool, tryGen, tryBlock, toQuestions, matchBlock, type Q } from './gen';

/**
 * Biologiya — Milliy sertifikat formatidagi test generatori (DTM tafsiloti): 43 topshiriq, 180 daqiqa.
 * 1 biologiya fan sifatida; 2–11 hujayra, almashinuv, koʻpayish, genetika, seleksiya; 12 sistematika;
 * 13–19 oʻsimlik va hayvonot dunyosi; 20–23 odam; 24–28 tur va populyatsiya (evolutsiya);
 * 29–32 ekosistema, biosfera, filogenez (Y1); 33–35 moslashtirish (Y2);
 * 36–40 qisqa javobli (O1): nuklein kislotalar, almashinuv, duragaylash, birikkan/jins genetikasi, mitoz-meyoz;
 * 41–43 yozma ish (O2): bandlarga boʻlingan, har bandning son javobi tekshiriladi.
 */
export const BIO_EXAM_MINUTES = 180;

/* ----------------------------- helpers ----------------------------- */
type Calc = { text: string; ans: number; explain: string; unit: string; extra?: number[] };
const asMc = (c: () => Calc) => () => {
  const v = c();
  if (!Number.isInteger(v.ans)) return mcn(v.text, v.ans, v.explain, 0, v.extra);
  const x = v.ans;
  const cands = [...(v.extra ?? []), x * 2, x / 2, x * 3, x * 4, x + 2, x - 2, x + 10, x - 10]
    .filter((y) => Number.isInteger(y) && y > 0)
    .map(num);
  return mc(v.text, num(x), cands, v.explain);
};
const asOpen = (c: () => Calc) => () => {
  const v = c();
  return openN(v.text, [[v.unit ? `Javob (${v.unit}):` : 'Javob:', v.ans]], v.explain);
};
/** fact question from rows [question part, answer]; other rows' answers (+ extra) are distractors */
const pickFact = (title: string, rows: [string, string][], explain: (q: string, a: string) => string, extra: string[] = []) => () => {
  const [q, a] = pick(rows);
  const others = Array.from(new Set([...rows.map((r) => r[1]), ...extra].filter((x) => x !== a)));
  return mc(title.replace('{q}', q), a, others, explain(q, a));
};
/** fixed question with its own distractors */
const fixed = (rows: [string, string, string[], string][]) => () => {
  const [q, a, w, e] = pick(rows);
  return mc(q, a, w, e);
};
const NUC = 'Bitta nukleotidning uzunligi 0,34 nm, oʻrtacha molekulyar massasi 345 deb olinsin.';

/* ======================= 1. Biologiya fan sifatida ======================= */
const F_scientist = pickFact(
  'Quyidagi kashfiyot qaysi olimga tegishli: {q}?',
  [
    ['hujayrani birinchi boʻlib kuzatib, unga nom bergan (1665-yil)', 'R. Guk'],
    ['mikroorganizmlarni birinchi boʻlib mikroskopda kuzatgan', 'A. Levenguk'],
    ['irsiyat qonunlarini kashf etgan', 'G. Mendel'],
    ['viruslarni kashf etgan (1892-yil)', 'D. I. Ivanovskiy'],
    ['binar nomenklaturani joriy etgan', 'K. Linney'],
    ['tabiiy tanlanish nazariyasini yaratgan', 'Ch. Darvin'],
    ['biosfera haqidagi taʼlimotni yaratgan', 'V. I. Vernadskiy'],
    ['irsiyatning xromosoma nazariyasini yaratgan', 'T. Morgan'],
    ['DNK qoʻsh spiral modelini taklif etgan', 'J. Uotson va F. Krik'],
    ['irsiy oʻzgaruvchanlikning gomologik qatorlar qonunini yaratgan', 'N. I. Vavilov'],
    ['shartli reflekslar haqidagi taʼlimotni yaratgan', 'I. P. Pavlov'],
    ['penitsillinni kashf etgan', 'A. Fleming']
  ],
  (q, a) => `${a} — ${q}.`
);
const F_branch = pickFact(
  'Biologiyaning qaysi boʻlimi quyidagini oʻrganadi: {q}?',
  [
    ['hujayraning tuzilishi va faoliyati', 'sitologiya'],
    ['toʻqimalarning tuzilishi', 'gistologiya'],
    ['irsiyat va oʻzgaruvchanlik', 'genetika'],
    ['organizmlarning oʻzaro va muhit bilan munosabatlari', 'ekologiya'],
    ['zamburugʻlar', 'mikologiya'],
    ['hasharotlar', 'entomologiya'],
    ['qushlar', 'ornitologiya'],
    ['viruslar', 'virusologiya'],
    ['murtakning rivojlanishi', 'embriologiya']
  ],
  (q, a) => `${q.charAt(0).toUpperCase() + q.slice(1)} — ${a} fanining oʻrganish obyekti.`
);
const F_diversity = fixed([
  ['Prokariot organizmlarga qaysilar kiradi?', 'bakteriyalar va koʻk-yashil suvoʻtlar', ['zamburugʻlar va lishayniklar', 'yashil suvoʻtlar va moxlar', 'sodda hayvonlar va zamburugʻlar', 'qizil va qoʻngʻir suvoʻtlar'], 'Prokariotlarda shakllangan yadro yoʻq: bularga bakteriyalar va koʻk-yashil suvoʻtlar (sianobakteriyalar) kiradi.'],
  ['Lishayniklar qaysi organizmlarning simbiozidan iborat?', 'zamburugʻ va suvoʻt', ['bakteriya va zamburugʻ', 'mox va suvoʻt', 'zamburugʻ va mox', 'virus va bakteriya'], 'Lishaynik — zamburugʻ va suvoʻt (yoki sianobakteriya)ning simbiotik organizmi.'],
  ['Viruslarga xos xususiyatni aniqlang.', 'faqat tirik hujayra ichida koʻpayadi', ['mustaqil ravishda oqsil sintezlaydi', 'ribosomalari bor', 'boʻlinish yoʻli bilan koʻpayadi', 'hujayra devoriga ega'], 'Viruslar hujayrasiz hayot shakli: ular faqat xoʻjayin hujayra ichida koʻpayadi.'],
  ['Bakteriya hujayrasida qaysi tuzilma yoʻq?', 'shakllangan yadro', ['ribosoma', 'hujayra membranasi', 'sitoplazma', 'hujayra devori'], 'Bakteriyalar prokariotlar: ularda yadro qobigʻi bilan oʻralgan yadro yoʻq.'],
  ['Zamburugʻlarning hujayra devori asosan qaysi moddadan iborat?', 'xitin', ['sellyuloza', 'kraxmal', 'pektin', 'glikogen'], 'Zamburugʻlar hujayra devorida xitin boʻladi (oʻsimliklarda — sellyuloza).'],
  ['Tiriklikning tuzilish darajalari toʻgʻri ketma-ketlikda berilgan javobni toping.', 'molekula → hujayra → organizm → populyatsiya-tur → ekosistema → biosfera', ['hujayra → molekula → organizm → ekosistema → populyatsiya-tur → biosfera', 'molekula → organizm → hujayra → populyatsiya-tur → biosfera → ekosistema', 'molekula → hujayra → populyatsiya-tur → organizm → ekosistema → biosfera', 'hujayra → organizm → molekula → biosfera → ekosistema → populyatsiya-tur'], 'Tiriklik darajalari oddiydan murakkabga: molekula, hujayra, organizm, populyatsiya-tur, ekosistema, biosfera.'],
  ['Bakteriofag nima?', 'bakteriyalarda parazitlik qiluvchi virus', ['bakteriyalarni yutuvchi leykotsit', 'bakteriya sporasi', 'bakteriyalar hosil qiladigan zahar', 'zamburugʻ turi'], 'Bakteriofaglar — bakteriya hujayralarida koʻpayadigan viruslar.']
]);
const SCI: (() => Q)[] = [F_scientist, F_branch, F_diversity];

/* ============== 2–11. Hujayra, almashinuv, koʻpayish, genetika ============== */
const F_organelle = pickFact(
  'Qaysi organoid quyidagi vazifani bajaradi: {q}?',
  [
    ['oqsil sintezi', 'ribosoma'],
    ['ATF sintezi (hujayraning energetik stansiyasi)', 'mitoxondriya'],
    ['fotosintez', 'xloroplast'],
    ['moddalarni toʻplash, oʻzgartirish va hujayradan chiqarish', 'Golji apparati'],
    ['hujayra ichida moddalarni hazm qilish', 'lizosoma'],
    ['irsiy axborotni saqlash va uzatish', 'yadro'],
    ['boʻlinish duki hosil boʻlishida ishtirok etish', 'hujayra markazi (sentriolalar)'],
    ['moddalarni hujayra ichida tashish, lipid va oqsil sintezi', 'endoplazmatik toʻr']
  ],
  (q, a) => `${a.charAt(0).toUpperCase() + a.slice(1)}: ${q}.`
);
const F_cellFixed = fixed([
  ['Qaysi organoid membranasiz?', 'ribosoma', ['mitoxondriya', 'lizosoma', 'xloroplast', 'Golji apparati'], 'Ribosoma va hujayra markazi membranasiz organoidlar.'],
  ['Qaysi organoid ikki membranali?', 'mitoxondriya', ['ribosoma', 'lizosoma', 'Golji apparati', 'vakuola'], 'Ikki membranali organoidlar: mitoxondriya va plastidalar (shuningdek yadro qobigʻi ikki membranali).'],
  ['Hujayra nazariyasini kimlar yaratgan?', 'T. Shvann va M. Shleyden', ['R. Guk va A. Levenguk', 'G. Mendel va T. Morgan', 'J. Uotson va F. Krik', 'Ch. Darvin va A. Uolles'], 'Hujayra nazariyasini 1838–1839-yillarda M. Shleyden va T. Shvann yaratgan.'],
  ['Hayvon hujayrasida qaysi tuzilma boʻlmaydi?', 'plastidalar', ['mitoxondriya', 'ribosoma', 'lizosoma', 'Golji apparati'], 'Plastidalar (xloroplast, xromoplast, leykoplast) faqat oʻsimlik hujayralariga xos.'],
  ['Fermentlar kimyoviy tabiatiga koʻra qanday moddalar?', 'oqsillar', ['uglevodlar', 'lipidlar', 'nuklein kislotalar', 'mineral tuzlar'], 'Fermentlar — biologik katalizatorlar, oqsil tabiatli moddalar.'],
  ['RNK tarkibida timin oʻrniga qaysi azotli asos boʻladi?', 'uratsil', ['adenin', 'guanin', 'sitozin', 'timin'], 'RNKda A, G, S va U (uratsil) boʻladi.'],
  ['DNK nukleotidi tarkibidagi uglevod qaysi?', 'dezoksiriboza', ['riboza', 'glyukoza', 'fruktoza', 'saxaroza'], 'DNKda dezoksiriboza, RNKda riboza boʻladi.'],
  ['Aminokislotalarni ribosomaga tashiydigan molekula qaysi?', 'tRNK', ['iRNK', 'rRNK', 'DNK', 'ATF'], 'Transport RNK (tRNK) aminokislotani ribosomaga olib keladi.']
]);
const F_elements = pickFact(
  'Qaysi kimyoviy element haqida gap ketmoqda: {q}?',
  [
    ['gemoglobin tarkibiga kiradi', 'temir'],
    ['xlorofill tarkibiga kiradi', 'magniy'],
    ['qalqonsimon bez gormoni (tiroksin) tarkibiga kiradi', 'yod'],
    ['suyak va tishlar tarkibiga koʻp kiradi, qon ivishida qatnashadi', 'kalsiy'],
    ['tish emalini mustahkamlaydi', 'ftor'],
    ['nuklein kislotalar va ATF tarkibidagi kislota qoldigʻida boʻladi', 'fosfor']
  ],
  (q, a) => `${a.charAt(0).toUpperCase() + a.slice(1)} — ${q}.`
);
const F_biomol = pickFact(
  'Quyidagi taʼrif qaysi moddaga mos: {q}?',
  [
    ['oqsillarning monomeri', 'aminokislota'],
    ['nuklein kislotalarning monomeri', 'nukleotid'],
    ['kraxmal, glikogen va sellyulozaning monomeri', 'glyukoza'],
    ['hujayradagi universal energiya manbai', 'ATF'],
    ['hayvonlar hujayrasidagi zaxira polisaxarid', 'glikogen']
  ],
  (q, a) => `${a} — ${q}.`
);
const F_energy = fixed([
  ['Glikoliz natijasida 1 molekula glyukozadan sof necha molekula ATF hosil boʻladi?', '2', ['36', '38', '4', '6'], 'Glikolizda 1 glyukozadan 2 molekula PVK va sof 2 ATF hosil boʻladi.'],
  ['1 molekula glyukoza toʻliq oksidlanganda jami necha molekula ATF hosil boʻladi?', '38', ['2', '36', '34', '18'], 'Glikolizda 2 ATF + kislorodli bosqichda 36 ATF = 38 ATF.'],
  ['Energetik almashinuvning kislorodli bosqichi hujayraning qayerida boradi?', 'mitoxondriyada', ['sitoplazmada', 'ribosomada', 'yadroda', 'lizosomada'], 'Kislorodli (aerob) bosqich mitoxondriyada boradi.'],
  ['Glikoliz hujayraning qayerida boradi?', 'sitoplazmada', ['mitoxondriyada', 'ribosomada', 'yadroda', 'xloroplastda'], 'Glikoliz (kislorodsiz bosqich) sitoplazmada boradi.'],
  ['Fotosintezning yorugʻlik bosqichida kislorod qaysi moddaning parchalanishidan ajraladi?', 'suv', ['karbonat angidrid', 'glyukoza', 'ATF', 'xlorofill'], 'Suv fotolizi: 2H₂O → 4H⁺ + 4e⁻ + O₂.'],
  ['Fotosintezning qorongʻilik bosqichi xloroplastning qayerida boradi?', 'stromada', ['tilakoid membranasida', 'tashqi membranada', 'membranalararo boʻshliqda', 'granalarda'], 'Qorongʻilik bosqichi (CO₂ ning bogʻlanishi) stromada boradi.'],
  ['Qaysi organizmlar xemosintez qiladi?', 'nitrifikatsiyalovchi bakteriyalar', ['sut kislotali bakteriyalar', 'achitqi zamburugʻlari', 'chirituvchi bakteriyalar', 'yashil suvoʻtlar'], 'Xemosintezlovchilar (nitrifikatsiyalovchi, temir va oltingugurt bakteriyalari) noorganik moddalarni oksidlab energiya oladi.'],
  ['Oqsil biosintezida transkripsiya bu …', 'DNK asosida iRNK sintezlanishi', ['iRNK asosida oqsil sintezlanishi', 'DNK ning ikki hissalanishi', 'aminokislotalarning faollanishi', 'RNK asosida DNK sintezlanishi'], 'Transkripsiya yadroda boradi: DNK dagi axborot iRNK ga koʻchiriladi.'],
  ['Translyatsiya hujayraning qayerida boradi?', 'ribosomada', ['yadroda', 'lizosomada', 'Golji apparatida', 'vakuolada'], 'Translyatsiya — iRNK asosida ribosomada polipeptid zanjirining sintezi.']
]);
const F_mitosis = pickFact(
  'Hujayra boʻlinishining qaysi bosqichida {q}?',
  [
    ['xromosomalar ekvator tekisligida joylashadi', 'metafaza'],
    ['xromatidalar hujayra qutblariga tarqaladi', 'anafaza'],
    ['xromosomalar spirallashadi, yadro qobigʻi eriydi', 'profaza'],
    ['yadro qobigʻi qayta shakllanadi, sitoplazma boʻlinadi', 'telofaza'],
    ['DNK replikatsiyasi (ikki hissalanishi) boradi', 'interfaza']
  ],
  (q, a) => `Mitozning ${a} bosqichida ${q}.`
);
const F_meiosis = fixed([
  ['Krossingover meyozning qaysi bosqichida sodir boʻladi?', 'I profaza', ['I metafaza', 'II anafaza', 'II profaza', 'interfaza'], 'Gomologik xromosomalar konʼyugatsiyasi va krossingover meyoz I profazasida boradi.'],
  ['Meyozning qaysi bosqichida gomologik xromosomalar qutblarga tarqaladi?', 'I anafaza', ['II anafaza', 'I metafaza', 'II telofaza', 'I profaza'], 'Meyoz I anafazasida butun gomologik xromosomalar qutblarga tarqaladi — xromosomalar soni ikki marta kamayadi.'],
  ['Meyoz natijasida bitta diploid hujayradan nechta gaploid hujayra hosil boʻladi?', '4', ['2', '1', '8', '3'], 'Meyoz ikki ketma-ket boʻlinishdan iborat: 1 → 2 → 4 gaploid hujayra.'],
  ['Gulli oʻsimliklarda qoʻsh urugʻlanishni kim kashf etgan?', 'S. G. Navashin', ['G. Mendel', 'N. I. Vavilov', 'K. Linney', 'I. V. Michurin'], 'Qoʻsh urugʻlanishni 1898-yilda S. G. Navashin kashf etgan.'],
  ['Gulli oʻsimliklarda endosperm hujayralari qanday xromosomalar toʻplamiga ega?', 'triploid (3n)', ['gaploid (n)', 'diploid (2n)', 'tetraploid (4n)', 'geksaploid (6n)'], 'Spermiy (n) markaziy hujayra bilan (2n) qoʻshiladi — endosperm 3n.']
]);
const F_genterm = pickFact(
  'Qaysi tushunchaga taʼrif berilgan: {q}?',
  [
    ['bir gen allellari bir xil boʻlgan organizm', 'gomozigota'],
    ['bir gen allellari har xil boʻlgan organizm', 'geterozigota'],
    ['organizmdagi barcha genlar yigʻindisi', 'genotip'],
    ['organizmning barcha belgi va xossalari yigʻindisi', 'fenotip'],
    ['F₁ duragayni retsessiv gomozigota bilan chatishtirish', 'tahliliy chatishtirish'],
    ['bir juft belgisi bilan farq qiladigan organizmlarni chatishtirish', 'monoduragay chatishtirish']
  ],
  (q, a) => `${a.charAt(0).toUpperCase() + a.slice(1)} — ${q}.`
);
const F_ratio = pickFact(
  '{q}. Avlodda fenotip boʻyicha ajralish nisbatini toping.',
  [
    ['Aa × Aa chatishtirildi, dominantlik toʻliq', '3 : 1'],
    ['Aa × aa chatishtirildi, dominantlik toʻliq', '1 : 1'],
    ['AaBb × AaBb chatishtirildi (genlar mustaqil irsiylanadi), dominantlik toʻliq', '9 : 3 : 3 : 1'],
    ['AaBb × aabb chatishtirildi (genlar mustaqil irsiylanadi), dominantlik toʻliq', '1 : 1 : 1 : 1'],
    ['Aa × Aa chatishtirildi, dominantlik chala', '1 : 2 : 1'],
    ['AaBb × Aabb chatishtirildi (genlar mustaqil irsiylanadi), dominantlik toʻliq', '3 : 3 : 1 : 1']
  ],
  (q, a) => `${q}: fenotip nisbati ${a}.`
);
const F_genFixed = fixed([
  ['Qaysi biri noallel genlarning oʻzaro taʼsiri turi?', 'epistaz', ['chala dominantlik', 'toʻliq dominantlik', 'kodominantlik', 'oʻta dominantlik'], 'Epistaz, komplementarlik va polimeriya — noallel genlar taʼsiri; qolganlari allel genlar taʼsiri.'],
  ['Genlarning birikkan holda irsiylanishi qonunini kim aniqlagan?', 'T. Morgan', ['G. Mendel', 'N. I. Vavilov', 'Ch. Darvin', 'G. de Friz'], 'Bir xromosomada joylashgan genlarning birga irsiylanishini T. Morgan aniqlagan.'],
  ['Odamda gemofiliya qanday irsiylanadi?', 'X xromosomaga birikkan retsessiv belgi sifatida', ['autosom dominant belgi sifatida', 'Y xromosomaga birikkan belgi sifatida', 'autosom retsessiv belgi sifatida', 'X xromosomaga birikkan dominant belgi sifatida'], 'Gemofiliya va daltonizm geni X xromosomada joylashgan retsessiv gen.'],
  ['Daun sindromining sababi nima?', '21-juft xromosoma boʻyicha trisomiya', ['X xromosomaning yetishmasligi', 'qoʻshimcha Y xromosoma', 'gen mutatsiyasi natijasida gemoglobin oʻzgarishi', 'poliploidiya'], 'Daun sindromida 21-juft xromosoma uchta boʻladi (2n = 47).'],
  ['Odamda qaysi jinsiy xromosomalar toʻplami Klaynfelter sindromiga xos?', 'XXY', ['X0', 'XXX', 'XYY', 'XX'], 'Klaynfelter sindromi — XXY (erkaklarda qoʻshimcha X xromosoma).']
]);
const F_variation = pickFact(
  '{q} — oʻzgaruvchanlikning qaysi turiga misol?',
  [
    ['Bir xil genotipli oʻsimliklar turli tuproqda turlicha boʻyga ega boʻlishi', 'modifikatsion'],
    ['Quyosh nurida odam terisining qorayishi', 'modifikatsion'],
    ['Xromosoma tuzilishining oʻzgarishi', 'mutatsion'],
    ['Gen tarkibidagi nukleotid almashinishi', 'mutatsion'],
    ['Krossingover natijasida genlarning yangi birikmalari paydo boʻlishi', 'kombinativ']
  ],
  (q, a) => `${q} — ${a} oʻzgaruvchanlik.`,
  ['korrelyativ', 'ontogenetik']
);
const F_selection = pickFact(
  'Seleksiyada qoʻllaniladigan «{q}» tushunchasining mazmuni qaysi javobda toʻgʻri berilgan?',
  [
    ['inbriding', 'qarindosh organizmlarni chatishtirish'],
    ['autbriding', 'qarindosh boʻlmagan organizmlarni chatishtirish'],
    ['geterozis', 'F₁ duragaylarida hayotchanlik va mahsuldorlikning ortishi'],
    ['poliploidiya', 'xromosomalar sonining karrali ortishi'],
    ['sunʼiy mutagenez', 'mutatsiyalarni sunʼiy ravishda hosil qilish']
  ],
  (q, a) => `${q.charAt(0).toUpperCase() + q.slice(1)} — ${a}.`
);
const F_geneng = pickFact(
  'Gen injeneriyasida qaysi ferment yoki tuzilma quyidagi vazifani bajaradi: {q}?',
  [
    ['DNK ni maʼlum nukleotidlar ketma-ketligidan kesadi', 'restriktaza'],
    ['DNK boʻlaklarini bir-biriga ulaydi', 'ligaza'],
    ['RNK asosida DNK sintezlaydi', 'revertaza (teskari transkriptaza)'],
    ['begona genni bakteriya hujayrasiga olib kiradi', 'plazmida (vektor)']
  ],
  (q, a) => `${a.charAt(0).toUpperCase() + a.slice(1)}: ${q}.`,
  ['DNK-polimeraza', 'amilaza']
);

/* ------------------------------ calculations ------------------------------ */
/** DNA double strand: total T, adenine share p% (all counts integer) */
function dnaParams() {
  const T = pick([1200, 1500, 1800, 2000, 2400, 3000, 3600]);
  const p = pick([10, 15, 20, 30, 35, 40]);
  const A = (T * p) / 100;
  const G = T / 2 - A;
  if (!Number.isInteger(A) || !Number.isInteger(G) || A <= 0 || G <= 0) throw new Error('dna');
  return { T, p, A, G };
}
const C_chargaff: () => Calc = () => {
  const p = pick([12, 18, 22, 26, 28, 32, 34, 38]);
  return { text: `DNK molekulasida adenin nukleotidlari ${p}% ni tashkil etadi. Guanin nukleotidlari necha foizni tashkil etadi?`, ans: 50 - p, unit: '%', explain: `Chargaff qoidasi: A = T, G = S, A + G = 50% ⇒ G = 50 − ${p} = ${50 - p}%.`, extra: [100 - p, 100 - 2 * p] };
};
const C_dnaG: () => Calc = () => {
  const { T, p, A, G } = dnaParams();
  return { text: `DNK qoʻsh zanjirida ${A} ta adenin nukleotidi bor, bu umumiy nukleotidlarning ${p}% ini tashkil etadi. Guanin nukleotidlari sonini toping.`, ans: G, unit: 'ta', explain: `Jami = ${A}·100/${p} = ${T}; A = T = ${A}; G = S = (${T} − 2·${A})/2 = ${G}.`, extra: [T - A, T / 2] };
};
const C_hbond: () => Calc = () => {
  const { A, G } = dnaParams();
  return { text: `DNK qoʻsh zanjirida ${A} ta adenin va ${G} ta guanin nukleotidi bor. Azotli asoslar orasidagi vodorod bogʻlar sonini toping.`, ans: 2 * A + 3 * G, unit: 'ta', explain: `A–T juftida 2 ta, G–S juftida 3 ta vodorod bogʻ: 2·${A} + 3·${G} = ${2 * A + 3 * G}.`, extra: [3 * A + 2 * G, 2 * (A + G)] };
};
const C_dnaLen: () => Calc = () => {
  const { T } = dnaParams();
  return { text: `DNK qoʻsh zanjiri ${T} ta nukleotiddan iborat. ${NUC} DNK molekulasining uzunligini (nm) toping.`, ans: Math.round((T / 2) * 0.34 * 100) / 100, unit: 'nm', explain: `Juftlar soni ${T}/2 = ${T / 2}; L = ${T / 2}·0,34 = ${num((T / 2) * 0.34)} nm.`, extra: [T * 0.34] };
};
const C_protein: () => Calc = () => {
  const k = pick([100, 150, 200, 240, 300, 350, 400, 500]);
  const ask = pick(['mrna', 'gene', 'len']);
  if (ask === 'mrna') return { text: `Oqsil molekulasi ${k} ta aminokislotadan iborat. Uni kodlovchi iRNK necha nukleotiddan iborat? (stop-kodonni hisobga olmang)`, ans: 3 * k, unit: 'ta', explain: `Har bir aminokislotani 3 ta nukleotid (triplet) kodlaydi: ${k}·3 = ${3 * k}.`, extra: [6 * k, k] };
  if (ask === 'gene') return { text: `Oqsil molekulasi ${k} ta aminokislotadan iborat. Shu oqsilni kodlovchi gen (DNK ning ikkala zanjiri) necha nukleotiddan iborat? (stop-kodonni hisobga olmang)`, ans: 6 * k, unit: 'ta', explain: `iRNK: ${k}·3 = ${3 * k} nukleotid; gen ikki zanjirli: ${3 * k}·2 = ${6 * k}.`, extra: [3 * k, 9 * k] };
  return { text: `Oqsil molekulasi ${k} ta aminokislotadan iborat. ${NUC} Uni kodlovchi gen uzunligini (nm) toping. (stop-kodonni hisobga olmang)`, ans: Math.round(3 * k * 0.34 * 100) / 100, unit: 'nm', explain: `Gen ${3 * k} juft nukleotiddan iborat: L = ${3 * k}·0,34 = ${num(3 * k * 0.34)} nm.`, extra: [Math.round(6 * k * 0.34 * 100) / 100] };
};
const C_rna: () => Calc = () => {
  const a = pick([10, 14, 16, 20, 24]);
  const u = pick([12, 18, 22, 26, 30]);
  const g = pick([16, 20, 24, 28]);
  const c = 100 - a - u - g;
  if (c <= 4) throw new Error('rna');
  const ask = pick(['A', 'G']);
  const ans = ask === 'A' ? (a + u) / 2 : (g + c) / 2;
  return { text: `iRNK molekulasida adenin ${a}%, uratsil ${u}%, guanin ${g}%, sitozin ${c}% ni tashkil etadi. Shu iRNK sintezlangan DNK qoʻsh zanjiridagi ${ask === 'A' ? 'adenin' : 'guanin'} nukleotidlari ulushini (%) toping.`, ans, unit: '%', explain: `DNK qoʻsh zanjirida A = T = (A + U)ᵢᵣₙₖ/2 = (${a} + ${u})/2 = ${num((a + u) / 2)}%; G = S = (G + S)ᵢᵣₙₖ/2 = (${g} + ${c})/2 = ${num((g + c) / 2)}%.`, extra: [ask === 'A' ? a : g, ask === 'A' ? u : c] };
};
const C_glucose: () => Calc = () => {
  const n = pick([2, 3, 4, 5, 6, 8, 10]);
  const ask = pick(['atp', 'co2', 'o2v']);
  if (ask === 'atp') return { text: `Hujayrada ${n} mol glyukoza toʻliq (kislorodli) parchalandi. Necha mol ATF hosil boʻladi?`, ans: 38 * n, unit: 'mol', explain: `1 mol glyukoza toʻliq oksidlanganda 38 mol ATF: ${n}·38 = ${38 * n} mol.`, extra: [36 * n, 2 * n] };
  if (ask === 'co2') return { text: `Hujayrada ${n} mol glyukoza toʻliq parchalandi. Necha mol karbonat angidrid ajraladi?`, ans: 6 * n, unit: 'mol', explain: `C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O: ${n}·6 = ${6 * n} mol CO₂.`, extra: [2 * n, 12 * n] };
  return { text: `Hujayrada ${n} mol glyukoza toʻliq parchalandi. Bunda qancha hajm (l, n.sh.) kislorod sarflanadi?`, ans: Math.round(6 * n * 22.4 * 100) / 100, unit: 'l', explain: `n(O₂) = 6·${n} = ${6 * n} mol; V = ${6 * n}·22,4 = ${num(6 * n * 22.4)} l.` };
};
const C_partial: () => Calc = () => {
  const x = pick([4, 5, 6, 8, 10]);
  const y = R(1, x - 1);
  return { text: `Hujayrada ${x} mol glyukoza parchalandi, shundan ${y} moli toʻliq oksidlandi, qolgani faqat glikolizga uchradi. Jami necha mol ATF hosil boʻldi?`, ans: 2 * x + 36 * y, unit: 'mol', explain: `Glikoliz: ${x}·2 = ${2 * x} mol ATF; kislorodli bosqich: ${y}·36 = ${36 * y} mol; jami ${2 * x + 36 * y} mol.`, extra: [38 * y, 38 * x, 2 * x + 38 * y] };
};
const C_photo: () => Calc = () => {
  const n = pick([0.5, 1, 1.5, 2, 3, 5]);
  const ask = pick(['o2', 'co2']);
  return ask === 'o2'
    ? { text: `Fotosintez natijasida ${num(n * 180)} g glyukoza hosil boʻldi. Qancha hajm (l, n.sh.) kislorod ajralgan?`, ans: Math.round(6 * n * 22.4 * 100) / 100, unit: 'l', explain: `6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. n(glyukoza) = ${num(n * 180)}/180 = ${num(n)} mol; n(O₂) = ${num(6 * n)} mol; V = ${num(6 * n * 22.4)} l.`, extra: [Math.round(n * 22.4 * 100) / 100] }
    : { text: `Fotosintez natijasida ${num(n * 180)} g glyukoza hosil boʻldi. Necha gramm karbonat angidrid oʻzlashtirilgan?`, ans: 6 * n * 44, unit: 'g', explain: `n(CO₂) = 6·${num(n)} = ${num(6 * n)} mol; m = ${num(6 * n)}·44 = ${num(6 * n * 44)} g.`, extra: [n * 44] };
};
const ORGS: [string, number][] = [['Odam', 46], ['Drozofila', 8], ['Noʻxat', 14], ['Makkajoʻxori', 20], ['Piyoz', 16], ['It', 78], ['Mushuk', 38], ['Kartoshka', 48]];
const PHASES: [string, (n: number) => number, (n: number) => number][] = [
  ['mitozning metafazasida', (n) => 2 * n, (n) => 4 * n],
  ['mitozning anafazasida', (n) => 4 * n, (n) => 4 * n],
  ['mitoz tugagach har bir hosil boʻlgan hujayrada', (n) => 2 * n, (n) => 2 * n],
  ['meyoz I metafazasida', (n) => 2 * n, (n) => 4 * n],
  ['meyoz II metafazasida (har bir hujayrada)', (n) => n, (n) => 2 * n],
  ['hosil boʻlgan gametada', (n) => n, (n) => n]
];
const C_chrom: () => Calc = () => {
  const [org, d] = pick(ORGS);
  const n = d / 2;
  const [ph, chr, dna] = pick(PHASES);
  const askDna = Math.random() < 0.5;
  const ans = askDna ? dna(n) : chr(n);
  return { text: `${org} somatik hujayrasida 2n = ${d} ta xromosoma bor. ${ph.charAt(0).toUpperCase() + ph.slice(1)} nechta ${askDna ? 'DNK molekulasi (xromatida)' : 'xromosoma'} boʻladi?`, ans, unit: 'ta', explain: `n = ${n}. ${ph.charAt(0).toUpperCase() + ph.slice(1)}: ${chr(n)} ta xromosoma, ${dna(n)} ta DNK molekulasi.`, extra: [n, 2 * n, 4 * n, 8 * n].filter((v) => v !== ans) };
};
const C_gameto: () => Calc = () => {
  const k = pick([10, 25, 40, 50, 100, 120, 200]);
  const ask = pick(['sperm', 'egg', 'polar']);
  if (ask === 'sperm') return { text: `${k} ta birlamchi spermatotsit (I tartib spermatotsit)dan necha spermatozoid hosil boʻladi?`, ans: 4 * k, unit: 'ta', explain: `Har bir I tartib spermatotsit meyoz natijasida 4 ta spermatozoid beradi: ${k}·4 = ${4 * k}.`, extra: [k, 2 * k] };
  if (ask === 'egg') return { text: `${k} ta I tartib oositdan necha tuxum hujayra hosil boʻladi?`, ans: k, unit: 'ta', explain: `Har bir I tartib oositdan 1 ta tuxum hujayra va 3 ta yoʻnaltiruvchi tanacha hosil boʻladi: ${k} ta tuxum hujayra.`, extra: [4 * k, 3 * k, 2 * k] };
  return { text: `${k} ta I tartib oosit meyozni tugatdi. Jami necha yoʻnaltiruvchi (reduksion) tanacha hosil boʻladi? (birinchi tanacha ham boʻlinadi deb hisoblang)`, ans: 3 * k, unit: 'ta', explain: `Har bir oositdan 1 tuxum hujayra va 3 ta yoʻnaltiruvchi tanacha: ${k}·3 = ${3 * k}.`, extra: [k, 4 * k, 2 * k] };
};

const CELL: (() => Q)[] = [F_organelle, F_cellFixed, F_elements, F_biomol, F_energy, F_mitosis, F_meiosis, F_genterm, F_ratio, F_genFixed, F_variation, F_selection, F_geneng,
  asMc(C_chargaff), asMc(C_dnaG), asMc(C_hbond), asMc(C_protein), asMc(C_glucose), asMc(C_chrom), asMc(C_gameto)];

/* =========================== 12. Sistematika =========================== */
const RANKS = ['tur', 'avlod', 'oila', 'turkum', 'sinf', 'tip', 'dunyo'];
const F_rank = () => {
  if (Math.random() < 0.35) {
    const right = RANKS.join(' → ');
    const wrong = [
      ['tur', 'oila', 'avlod', 'turkum', 'sinf', 'tip', 'dunyo'],
      ['tur', 'avlod', 'turkum', 'oila', 'sinf', 'tip', 'dunyo'],
      ['tur', 'avlod', 'oila', 'sinf', 'turkum', 'tip', 'dunyo'],
      ['avlod', 'tur', 'oila', 'turkum', 'tip', 'sinf', 'dunyo']
    ].map((r) => r.join(' → '));
    return mc('Hayvonlar sistematikasida taksonomik birliklar kichigidan kattasiga qarab toʻgʻri joylashtirilgan javobni toping.', right, wrong, `Toʻgʻri tartib: ${right}.`);
  }
  const i = R(0, RANKS.length - 2);
  const up = Math.random() < 0.5 || i === 0;
  const q = up ? RANKS[i] : RANKS[i + 1];
  const a = up ? RANKS[i + 1] : RANKS[i];
  return mc(`Hayvonlar sistematikasida «${q}» birligidan bir pogʻona ${up ? 'yuqori' : 'quyi'} turadigan birlik qaysi?`, a, RANKS.filter((r) => r !== a && r !== q), `Tartib: ${RANKS.join(' → ')}. «${q}» dan bir pogʻona ${up ? 'yuqori' : 'quyi'} — «${a}».`);
};
const F_systFixed = fixed([
  ['Oʻsimliklar sistematikasida hayvonlardagi «tip» birligiga qaysi birlik mos keladi?', 'boʻlim', ['sinf', 'oila', 'turkum', 'avlod'], 'Oʻsimliklar sistematikasida «tip» oʻrniga «boʻlim» ishlatiladi.'],
  ['Binar nomenklaturaga koʻra tur nomi nechta soʻzdan iborat boʻladi?', 'ikkita (avlod va tur nomi)', ['bitta', 'uchta', 'toʻrtta', 'beshta'], 'K. Linney binar nomenklaturasi: avlod nomi + tur nomi.'],
  ['Sistematikaning eng kichik birligi qaysi?', 'tur', ['avlod', 'oila', 'sinf', 'populyatsiya'], 'Sistematikaning asosiy va eng kichik birligi — tur.']
]);
const SYST: (() => Q)[] = [F_rank, F_systFixed];

/* ===================== 13–19. Oʻsimlik va hayvonot dunyosi ===================== */
const F_plantFam = pickFact(
  '{q} qaysi oilaga mansub?',
  [
    ['Gʻoʻza', 'gulxayridoshlar'],
    ['Kartoshka', 'ituzumdoshlar'],
    ['Pomidor', 'ituzumdoshlar'],
    ['Karam', 'karamdoshlar (butguldoshlar)'],
    ['Noʻxat', 'dukkakdoshlar'],
    ['Loviya', 'dukkakdoshlar'],
    ['Bugʻdoy', 'bugʻdoydoshlar (gʻalladoshlar)'],
    ['Makkajoʻxori', 'bugʻdoydoshlar (gʻalladoshlar)'],
    ['Olma', 'raʼnoguldoshlar'],
    ['Kungaboqar', 'murakkabguldoshlar'],
    ['Piyoz', 'piyozdoshlar'],
    ['Lola', 'loladoshlar'],
    ['Sabzi', 'selderdoshlar (soyabonguldoshlar)']
  ],
  (q, a) => `${q} — ${a} oilasiga mansub.`
);
const F_plantGroup = pickFact(
  '{q} qaysi oʻsimliklar guruhiga mansub?',
  [
    ['Archa', 'ochiq urugʻlilar'],
    ['Qaragʻay', 'ochiq urugʻlilar'],
    ['Qirqquloq (paporotnik)', 'sporali yuksak oʻsimliklar'],
    ['Qirqboʻgʻim', 'sporali yuksak oʻsimliklar'],
    ['Kukushkin zigʻiri (yashil mox)', 'sporali yuksak oʻsimliklar'],
    ['Olma', 'yopiq urugʻlilar (gulli oʻsimliklar)'],
    ['Gʻoʻza', 'yopiq urugʻlilar (gulli oʻsimliklar)'],
    ['Xlorella', 'suvoʻtlar'],
    ['Spirogira', 'suvoʻtlar']
  ],
  (q, a) => `${q} — ${a}.`
);
const F_tissue = pickFact(
  'Oʻsimlikning qaysi toʻqimasi quyidagi vazifani bajaradi: {q}?',
  [
    ['suv va mineral moddalarni ildizdan yuqoriga oʻtkazadi', 'ksilema (yogʻochlik)'],
    ['organik moddalarni bargdan boshqa organlarga oʻtkazadi', 'floema (lub)'],
    ['hujayralari boʻlinib, oʻsimlikning oʻsishini taʼminlaydi', 'hosil qiluvchi toʻqima (meristema)'],
    ['fotosintez jarayoni boradi', 'asosiy (assimilyatsion) toʻqima'],
    ['ichki toʻqimalarni tashqi taʼsirdan himoya qiladi', 'qoplovchi toʻqima']
  ],
  (q, a) => `${a.charAt(0).toUpperCase() + a.slice(1)}: ${q}.`
);
const F_plantFixed = fixed([
  ['Qaysi belgi bir pallali oʻsimliklarga xos?', 'barglari parallel yoki yoysimon tomirlangan', ['urugʻi ikki urugʻpallali', 'oʻq ildiz tizimiga ega', 'barglari toʻrsimon tomirlangan', 'gul qismlari 4–5 tadan'], 'Bir pallalilar: bitta urugʻpalla, popuk ildiz, parallel yoki yoysimon tomirlanish, gul qismlari 3 tadan.'],
  ['Qaysi oʻsimlik bir pallali?', 'bugʻdoy', ['noʻxat', 'gʻoʻza', 'kartoshka', 'olma'], 'Bugʻdoy bugʻdoydoshlar oilasiga, bir pallalilar (lolasimonlar) sinfiga kiradi.'],
  ['Barg ogʻizchalari orqali qaysi jarayon amalga oshadi?', 'gaz almashinuvi va transpiratsiya', ['mineral moddalarning soʻrilishi', 'organik moddalarning toʻplanishi', 'changlanish', 'vegetativ koʻpayish'], 'Ogʻizchalar orqali gazlar almashinadi va suv bugʻlanadi (transpiratsiya).'],
  ['Sporali oʻsimliklarda urugʻlanish uchun qaysi sharoit zarur?', 'suv', ['shamol', 'hasharotlar', 'yorugʻlik', 'past harorat'], 'Mox va qirqquloqlarda spermatozoidlar tuxum hujayraga suv orqali yetib boradi.']
]);
const F_invert = pickFact(
  '{q} qaysi tipga (guruhga) mansub?',
  [
    ['Gidra', 'boʻshliqichlilar'],
    ['Meduza', 'boʻshliqichlilar'],
    ['Jigar qurti', 'yassi chuvalchanglar'],
    ['Exinokokk', 'yassi chuvalchanglar'],
    ['Askarida', 'toʻgarak chuvalchanglar'],
    ['Yomgʻir chuvalchangi', 'halqali chuvalchanglar'],
    ['Zuluk', 'halqali chuvalchanglar'],
    ['Tokshilliq', 'molluskalar'],
    ['Baqachanoq', 'molluskalar'],
    ['Daryo qisqichbaqasi', 'boʻgʻimoyoqlilar'],
    ['Oʻrgimchak', 'boʻgʻimoyoqlilar'],
    ['Asalari', 'boʻgʻimoyoqlilar'],
    ['Amyoba', 'bir hujayrali hayvonlar (sodda hayvonlar)'],
    ['Infuzoriya-tufelka', 'bir hujayrali hayvonlar (sodda hayvonlar)']
  ],
  (q, a) => `${q} — ${a}.`
);
const F_vert = pickFact(
  '{q} qaysi sinfga mansub?',
  [
    ['Akula', 'togʻayli baliqlar'],
    ['Zogʻora baliq', 'suyakli baliqlar'],
    ['Baqa', 'suvda hamda quruqlikda yashovchilar'],
    ['Kaltakesak', 'sudralib yuruvchilar'],
    ['Toshbaqa', 'sudralib yuruvchilar'],
    ['Pingvin', 'qushlar'],
    ['Koʻrshapalak', 'sut emizuvchilar'],
    ['Delfin', 'sut emizuvchilar'],
    ['Kit', 'sut emizuvchilar']
  ],
  (q, a) => `${q} — ${a}.`
);
const F_heart = pickFact(
  '{q} yuragi nechta kamerali?',
  [
    ['Baliqlar', '2 kamerali'],
    ['Suvda hamda quruqlikda yashovchilar', '3 kamerali'],
    ['Kaltakesaklar', '3 kamerali, qorinchasida chala toʻsiq bor'],
    ['Qushlar', '4 kamerali'],
    ['Sut emizuvchilar', '4 kamerali']
  ],
  (q, a) => `${q} — yuragi ${a}.`,
  ['1 kamerali']
);
const F_insect = pickFact(
  '{q} qanday rivojlanadi?',
  [
    ['Kapalak', 'toʻliq oʻzgarish bilan'],
    ['Asalari', 'toʻliq oʻzgarish bilan'],
    ['Pashsha', 'toʻliq oʻzgarish bilan'],
    ['Chigirtka', 'chala oʻzgarish bilan'],
    ['Ninachi', 'chala oʻzgarish bilan'],
    ['Suvarak', 'chala oʻzgarish bilan']
  ],
  (q, a) => `${q} — ${a}.`,
  ['oʻzgarishsiz', 'jinssiz yoʻl bilan', 'metamorfozsiz, tuxumdan voyaga yetgan holda']
);
const F_breath = pickFact(
  '{q} qanday organ yordamida nafas oladi?',
  [
    ['Baliqlar', 'jabralar'],
    ['Hasharotlar', 'traxeyalar'],
    ['Yomgʻir chuvalchangi', 'teri orqali'],
    ['Sut emizuvchilar', 'alveolali oʻpkalar']
  ],
  (q, a) => `${q} — ${a}.`,
  ['havo xaltachalari']
);
const PLANT_ANIMAL: (() => Q)[] = [F_plantFam, F_plantGroup, F_tissue, F_plantFixed, F_invert, F_vert, F_heart, F_insect, F_breath];

/* ============================== 20–23. Odam ============================== */
const F_gland = pickFact(
  '{q} gormoni qaysi bezda ishlab chiqariladi?',
  [
    ['Insulin', 'meʼda osti bezi'],
    ['Tiroksin', 'qalqonsimon bez'],
    ['Adrenalin', 'buyrak usti bezi'],
    ['Oʻsish gormoni (somatotropin)', 'gipofiz'],
    ['Testosteron', 'urugʻdon']
  ],
  (q, a) => `${q} — ${a} gormoni.`
);
const F_vitamin = pickFact(
  '{q} vitamini yetishmasa qaysi kasallik rivojlanadi?',
  [
    ['A', 'shabkoʻrlik'],
    ['D', 'raxit'],
    ['C', 'singa (skorbut)'],
    ['B₁', 'beri-beri'],
    ['K', 'qon ivishining buzilishi']
  ],
  (q, a) => `${q} vitamini yetishmasligi — ${a}.`
);
const F_organ = pickFact(
  'Odam organizmining qaysi qismi quyidagi vazifani bajaradi: {q}?',
  [
    ['oʻpkada gaz almashinuvi shu yerda boradi', 'alveolalar'],
    ['buyrakning siydik hosil qiluvchi tuzilish birligi', 'nefron'],
    ['ozuqa moddalar asosan shu yerda qonga soʻriladi', 'ingichka ichak'],
    ['harakatlarni muvofiqlashtiradi va muvozanatni saqlaydi', 'miyacha'],
    ['nafas va yurak faoliyatini boshqaruvchi markazlar joylashgan', 'uzunchoq miya'],
    ['koʻrish retseptorlari (tayoqcha va kolbachalar) joylashgan', 'toʻr parda']
  ],
  (q, a) => `${a.charAt(0).toUpperCase() + a.slice(1)}: ${q}.`
);
const F_blood = pickFact(
  'Qaysi qon hujayralari quyidagi vazifani bajaradi: {q}?',
  [
    ['kislorod va karbonat angidridni tashiydi', 'eritrotsitlar'],
    ['organizmni mikroblardan himoya qiladi (fagotsitoz)', 'leykotsitlar'],
    ['qon ivishida qatnashadi', 'trombotsitlar']
  ],
  (q, a) => `${a.charAt(0).toUpperCase() + a.slice(1)} ${q}.`,
  ['qon plazmasi oqsillari', 'limfa']
);
const F_digest = pickFact(
  'Quyidagi vazifani qaysi modda bajaradi: {q}?',
  [
    ['meʼdada oqsillarni parchalaydi', 'pepsin'],
    ['ogʻiz boʻshligʻida kraxmalni parchalaydi', 'amilaza'],
    ['yogʻlarni glitserin va yogʻ kislotalarigacha parchalaydi', 'lipaza'],
    ['yogʻlarni emulsiyalaydi (mayda tomchilarga ajratadi)', 'oʻt suyuqligi']
  ],
  (q, a) => `${a.charAt(0).toUpperCase() + a.slice(1)} ${q}.`,
  ['xlorid kislota', 'insulin']
);
const F_humanFixed = fixed([
  ['Qaysi qon guruhi egasi universal donor hisoblanadi?', 'I (0)', ['II (A)', 'III (B)', 'IV (AB)', 'Rh-musbat II (A)'], 'I (0) guruh eritrotsitlarida A va B antigenlari yoʻq.'],
  ['Qaysi qon guruhi egasi universal retsipient hisoblanadi?', 'IV (AB)', ['I (0)', 'II (A)', 'III (B)', 'Rh-manfiy I (0)'], 'IV (AB) guruh plazmasida α va β agglyutininlar yoʻq.'],
  ['Vaksina yuborilgandan keyin hosil boʻladigan immunitet qanday ataladi?', 'sunʼiy faol', ['sunʼiy sust', 'tabiiy tugʻma', 'tabiiy orttirilgan', 'passiv tugʻma'], 'Vaksinaga javoban organizm oʻzi antitana ishlab chiqaradi — sunʼiy faol immunitet.'],
  ['Davolovchi zardob yuborilganda qanday immunitet hosil boʻladi?', 'sunʼiy sust (passiv)', ['sunʼiy faol', 'tabiiy tugʻma', 'tabiiy orttirilgan', 'hujayraviy tugʻma'], 'Zardobda tayyor antitanalar boʻladi — sunʼiy sust immunitet.'],
  ['Odam skeletida qaysi suyaklar oʻzaro harakatsiz birikkan?', 'kalla qutisi suyaklari', ['yelka va bilak suyaklari', 'son va boldir suyaklari', 'umurtqalar va qovurgʻalar', 'barmoq falangalari'], 'Kalla qutisi suyaklari choklar orqali harakatsiz birikadi.'],
  ['Katta qon aylanish doirasi yurakning qaysi boʻlimidan boshlanadi?', 'chap qorinchadan', ['oʻng qorinchadan', 'chap boʻlmachadan', 'oʻng boʻlmachadan', 'oʻpka venasidan'], 'Katta qon aylanish doirasi chap qorinchadan aorta bilan boshlanib, oʻng boʻlmachada tugaydi.']
]);
const HUMAN: (() => Q)[] = [F_gland, F_vitamin, F_organ, F_blood, F_digest, F_humanFixed];

/* ===================== 24–28. Tur, populyatsiya, evolutsiya ===================== */
const F_selForm = pickFact(
  'Tabiiy tanlanishning qaysi shakli quyidagicha taʼsir etadi: {q}?',
  [
    ['muhit uzoq vaqt oʻzgarmasa, belgining oʻrtacha qiymatiga ega shakllarni saqlaydi', 'stabillashtiruvchi'],
    ['muhit oʻzgarganda belgining bir tomonga siljishiga olib keladi', 'harakatlantiruvchi'],
    ['ikki chetki shaklni saqlab, oʻrtacha shakllarni yoʻqotadi', 'dizruptiv (uzuvchi)']
  ],
  (q, a) => `${a.charAt(0).toUpperCase() + a.slice(1)} tanlanish ${q}.`,
  ['sunʼiy', 'jinsiy']
);
const F_direction = pickFact(
  '{q} evolutsiyaning qaysi yoʻnalishiga misol?',
  [
    ['Issiqqonlilikning paydo boʻlishi', 'aromorfoz'],
    ['Toʻrt kamerali yurakning paydo boʻlishi', 'aromorfoz'],
    ['Gul va urugʻning paydo boʻlishi', 'aromorfoz'],
    ['Kaktus barglarining tikanga aylanishi', 'idioadaptatsiya'],
    ['Hasharotlarda ogʻiz apparatining turlicha tuzilishi', 'idioadaptatsiya'],
    ['Lentasimon chuvalchanglarda hazm sistemasining yoʻqolishi', 'degeneratsiya'],
    ['Zarpechakda ildiz va barglarning reduksiyaga uchrashi', 'degeneratsiya']
  ],
  (q, a) => `${q} — ${a}.`,
  ['biologik regress', 'konvergensiya']
);
const F_struggle = pickFact(
  '{q} yashash uchun kurashning qaysi shakliga misol?',
  [
    ['Bir tur individlari orasida oziq uchun raqobat', 'tur ichidagi kurash'],
    ['Boʻrilarning quyonlarni ovlashi', 'turlararo kurash'],
    ['Choʻl oʻsimliklarining qurgʻoqchilikka chidashi', 'noqulay sharoitga qarshi kurash']
  ],
  (q, a) => `${q} — ${a}.`,
  ['sunʼiy tanlanish', 'modifikatsion oʻzgaruvchanlik']
);
const F_evidence = pickFact(
  '{q} evolutsiyaning qaysi dalillariga kiradi?',
  [
    ['Odam embrionida jabra yoriqlarining paydo boʻlishi', 'embriologik'],
    ['Arxeopteriks qoldiqlari', 'paleontologik'],
    ['Odam qoʻli, qush qanoti va kit kurakoyogʻining tuzilish oʻxshashligi', 'qiyosiy anatomik'],
    ['Odamda chuvalchangsimon oʻsimta va dum umurtqalari (rudimentlar)', 'qiyosiy anatomik'],
    ['Barcha organizmlarda genetik kodning bir xilligi', 'molekulyar-biologik']
  ],
  (q, a) => `${q} — ${a} dalil.`,
  ['biogeografik']
);
const F_adapt = pickFact(
  '{q} moslanishning qaysi turiga misol?',
  [
    ['Zaharsiz pashshaning tashqi koʻrinishi bilan arini eslatishi', 'mimikriya'],
    ['Xonqizi qoʻngʻizining yorqin qizil rangi', 'ogohlantiruvchi rang'],
    ['Chigirtkaning oʻt rangida boʻlishi', 'himoya rangi (niqoblanish)']
  ],
  (q, a) => `${q} — ${a}.`,
  ['atavizm', 'rudiment']
);
const F_evoFixed = fixed([
  ['Evolutsiyaning elementar birligi nima?', 'populyatsiya', ['tur', 'individ', 'avlod', 'biotsenoz'], 'Sintetik nazariyaga koʻra evolutsiyaning elementar birligi — populyatsiya.'],
  ['Qaysi biri evolutsiyaning elementar omili hisoblanadi?', 'mutatsion jarayon', ['modifikatsion oʻzgaruvchanlik', 'ontogenez', 'fotosintez', 'moddalar almashinuvi'], 'Elementar omillar: mutatsion jarayon, populyatsiya toʻlqinlari, izolyatsiya, genlar dreyfi.'],
  ['Populyatsiyalarning geografik toʻsiqlar bilan ajralib qolishi natijasida yangi tur paydo boʻlishi qanday ataladi?', 'geografik (allopatrik) tur hosil boʻlish', ['ekologik tur hosil boʻlish', 'poliploidiya yoʻli bilan tur hosil boʻlish', 'sunʼiy tanlanish', 'idioadaptatsiya'], 'Areal toʻsiqlar bilan boʻlinib, populyatsiyalar alohida evolutsiyalanadi — geografik tur hosil boʻlish.'],
  ['Turning asosiy mezoni boʻlib qaysi biri hisoblanadi?', 'oʻzaro chatishib, nasl beruvchi avlod berishi (genetik-reproduktiv)', ['tashqi koʻrinishining oʻxshashligi', 'bir hududda yashashi', 'bir xil oziqlanishi', 'bir xil rangda boʻlishi'], 'Bir tur individlari erkin chatishib, nasl beruvchi avlod beradi; boshqa turlar bilan reproduktiv izolyatsiyada boʻladi.']
]);
const EVO: (() => Q)[] = [F_selForm, F_direction, F_struggle, F_evidence, F_adapt, F_evoFixed];

/* ===================== 29–32. Ekosistema, biosfera, filogenez ===================== */
const CHAINS: string[][] = [
  ['oʻtlar', 'chigirtka', 'baqa', 'ilon', 'burgut'],
  ['fitoplankton', 'zooplankton', 'mayda baliq', 'yirik baliq', 'baliqchi qush'],
  ['bugʻdoy', 'sichqon', 'ilon', 'burgut']
];
const C_pyramid: () => Calc = () => {
  const chain = pick(CHAINS);
  const top = chain.length - 1;
  const m = pick([1, 2, 3, 5, 6, 8]);
  const fromProd = Math.random() < 0.5;
  if (fromProd) {
    const ans = m * 10 ** top;
    return { text: `Oziq zanjiri: ${chain.join(' → ')}. Ekologik piramida qoidasiga (10%) koʻra ${m} kg ${chain[top]} massasi ortishi uchun necha kg ${chain[0]} kerak?`, ans, unit: 'kg', explain: `Har bir pogʻonaga oldingisining 10% i oʻtadi: ${m}·10^${top} = ${ans} kg.`, extra: [m * 10 ** (top - 1), m * 10 ** (top + 1)] };
  }
  const lvl = R(1, top - 1);
  const ans = m * 10 ** (top - lvl);
  return { text: `Oziq zanjiri: ${chain.join(' → ')}. 10% qoidasiga koʻra ${m} kg ${chain[top]} massasi ortishi uchun necha kg ${chain[lvl]} kerak?`, ans, unit: 'kg', explain: `${chain[lvl]} → ${chain[top]}: ${top - lvl} ta pogʻona; ${m}·10^${top - lvl} = ${ans} kg.`, extra: [m * 10 ** (top - lvl + 1), m * (top - lvl) * 10, m * 10 ** top] };
};
const F_factor = pickFact(
  '{q} qaysi ekologik omillar guruhiga kiradi?',
  [
    ['Harorat', 'abiotik'],
    ['Yorugʻlik', 'abiotik'],
    ['Namlik', 'abiotik'],
    ['Yirtqichlik', 'biotik'],
    ['Parazitizm', 'biotik'],
    ['Oʻrmonlarning kesilishi', 'antropogen'],
    ['Yerlarni shudgorlash', 'antropogen']
  ],
  (q, a) => `${q} — ${a} omil.`,
  ['genetik', 'evolutsion']
);
const F_trophic = pickFact(
  'Ekosistemada {q} qanday funksional guruhga kiradi?',
  [
    ['yashil oʻsimliklar', 'produtsentlar'],
    ['oʻtxoʻr hayvonlar', 'I tartib konsumentlar'],
    ['oʻtxoʻrlar bilan oziqlanuvchi yirtqichlar', 'II tartib konsumentlar'],
    ['chirituvchi bakteriyalar va zamburugʻlar', 'redutsentlar']
  ],
  (q, a) => `${q.charAt(0).toUpperCase() + q.slice(1)} — ${a}.`
);
const F_relation = pickFact(
  '{q} organizmlar oʻrtasidagi munosabatlarning qaysi turiga misol?',
  [
    ['Tuganak bakteriyalar va dukkakli oʻsimliklar', 'mutualizm (simbioz)'],
    ['Askarida va odam', 'parazitizm'],
    ['Boʻri va quyon', 'yirtqichlik'],
    ['Bir oʻtloqda oziqlanuvchi ikki tur oʻtxoʻr', 'raqobat']
  ],
  (q, a) => `${q} — ${a}.`,
  ['neytralizm']
);
const F_ecoFixed = fixed([
  ['«Ekologiya» atamasini fanga kim kiritgan?', 'E. Gekkel', ['V. I. Vernadskiy', 'Ch. Darvin', 'A. Tensli', 'V. N. Sukachev'], 'Atamani 1866-yilda E. Gekkel kiritgan.'],
  ['Biosferaning yuqori chegarasini nima belgilaydi?', 'ozon qatlami', ['bulutlar qatlami', 'troposferaning quyi qismi', 'togʻ choʻqqilari', 'ionosfera'], 'Ozon qatlami (taxminan 20–25 km) ultrabinafsha nurlarni ushlab qoladi — hayotning yuqori chegarasi.'],
  ['Inson aqli bilan boshqariladigan biosfera bosqichi qanday ataladi?', 'noosfera', ['litosfera', 'gidrosfera', 'troposfera', 'biogenez'], 'Noosfera — aql sferasi (V. I. Vernadskiy).'],
  ['Sunʼiy ekosistemaga (agrotsenozga) qaysi biri misol?', 'gʻoʻza dalasi', ['togʻ oʻrmoni', 'choʻl', 'koʻl', 'toʻqay'], 'Agrotsenoz inson tomonidan yaratiladi va uning yordamisiz uzoq mavjud boʻla olmaydi.'],
  ['Oʻsimliklar evolutsiyasida qaysi aromorfoz quruqlikka chiqishga imkon bergan?', 'oʻtkazuvchi toʻqimalar va qoplovchi toʻqimalarning paydo boʻlishi', ['gulning paydo boʻlishi', 'qoʻsh urugʻlanish', 'mevaning paydo boʻlishi', 'endospermning hosil boʻlishi'], 'Quruqlikka chiqishda oʻtkazuvchi va qoplovchi toʻqimalar hal qiluvchi aromorfoz boʻlgan.']
]);
const F_phylo = fixed([
  ['Hayvonlarning qaysi guruhida birinchi marta yopiq qon aylanish sistemasi paydo boʻlgan?', 'halqali chuvalchanglar', ['yassi chuvalchanglar', 'toʻgarak chuvalchanglar', 'boʻshliqichlilar', 'bir hujayrali hayvonlar'], 'Yopiq qon aylanish sistemasi birinchi marta halqali chuvalchanglarda paydo boʻlgan.'],
  ['Qaysi hayvonlarda birinchi marta ikkita qon aylanish doirasi paydo boʻlgan?', 'suvda hamda quruqlikda yashovchilarda', ['baliqlarda', 'sudralib yuruvchilarda', 'qushlarda', 'sut emizuvchilarda'], 'Amfibiyalarda oʻpka bilan birga kichik qon aylanish doirasi paydo boʻlgan.'],
  ['Diffuz (toʻrsimon) nerv sistemasi qaysi hayvonlarga xos?', 'boʻshliqichlilarga', ['halqali chuvalchanglarga', 'hasharotlarga', 'molluskalarga', 'baliqlarga'], 'Boʻshliqichlilarda nerv hujayralari tana boʻylab toʻr hosil qiladi — diffuz nerv sistemasi.'],
  ['Hayvonlar evolutsiyasida oʻpka bilan nafas olish birinchi marta qaysi guruhda paydo boʻlgan?', 'ikki xil nafas oluvchi va panjaqanotli baliqlarda', ['togʻayli baliqlarda', 'halqali chuvalchanglarda', 'qushlarda', 'molluskalarda'], 'Oʻpkaning dastlabki shakllari ikki xil nafas oluvchi va panjaqanotli baliqlarda paydo boʻlgan.']
]);
const ECO: (() => Q)[] = [asMc(C_pyramid), F_factor, F_trophic, F_relation, F_ecoFixed, F_phylo];

/* ---------------------------- 33–35 matching ---------------------------- */
const MATCH_SETS: { h: string; q: (x: string) => string; rows: [string, string][] }[] = [
  { h: 'organoidlarni ularning vazifasi bilan moslashtiring.', q: (x) => `${x} qanday vazifani bajaradi?`, rows: [['Ribosoma', 'oqsil sintezi'], ['Mitoxondriya', 'ATF sintezi'], ['Xloroplast', 'fotosintez'], ['Lizosoma', 'hujayra ichida hazm qilish'], ['Golji apparati', 'moddalarni toʻplash va chiqarish'], ['Yadro', 'irsiy axborotni saqlash'], ['Hujayra markazi', 'boʻlinish dukini hosil qilish']] },
  { h: 'gormonlarni ularni ishlab chiqaruvchi bezlar bilan moslashtiring.', q: (x) => `${x} qaysi bezda hosil boʻladi?`, rows: [['Insulin', 'meʼda osti bezi'], ['Tiroksin', 'qalqonsimon bez'], ['Adrenalin', 'buyrak usti bezi'], ['Somatotropin', 'gipofiz'], ['Testosteron', 'urugʻdon'], ['Estrogen', 'tuxumdon']] },
  { h: 'vitaminlarni ularning yetishmasligida rivojlanadigan kasalliklar bilan moslashtiring.', q: (x) => `${x} vitamini yetishmasa qaysi kasallik rivojlanadi?`, rows: [['A', 'shabkoʻrlik'], ['D', 'raxit'], ['C', 'singa (skorbut)'], ['B₁', 'beri-beri'], ['K', 'qon ivishining buzilishi']] },
  { h: 'hayvonlarni ular mansub tiplar bilan moslashtiring.', q: (x) => `${x} qaysi tipga mansub?`, rows: [['Gidra', 'boʻshliqichlilar'], ['Jigar qurti', 'yassi chuvalchanglar'], ['Askarida', 'toʻgarak chuvalchanglar'], ['Zuluk', 'halqali chuvalchanglar'], ['Tokshilliq', 'molluskalar'], ['Oʻrgimchak', 'boʻgʻimoyoqlilar'], ['Lansetnik', 'xordalilar']] },
  { h: 'oʻsimliklarni ular mansub oilalar bilan moslashtiring.', q: (x) => `${x} qaysi oilaga mansub?`, rows: [['Gʻoʻza', 'gulxayridoshlar'], ['Kartoshka', 'ituzumdoshlar'], ['Karam', 'karamdoshlar'], ['Noʻxat', 'dukkakdoshlar'], ['Bugʻdoy', 'bugʻdoydoshlar'], ['Olma', 'raʼnoguldoshlar'], ['Kungaboqar', 'murakkabguldoshlar']] },
  { h: 'misollarni evolutsiyaning yoʻnalishlari bilan moslashtiring.', q: (x) => `${x} — qaysi yoʻnalish?`, rows: [['Issiqqonlilikning paydo boʻlishi', 'aromorfoz'], ['Kaktus barglarining tikanga aylanishi', 'idioadaptatsiya'], ['Parazit chuvalchangda hazm sistemasining yoʻqolishi', 'degeneratsiya']] }
];
function bioMatch(): Q[] {
  const set = pick(MATCH_SETS);
  const H = `33–35-topshiriqlar uchun umumiy shart: ${set.h}`;
  const asks = shuffle(set.rows).slice(0, 3);
  const extra = set.rows.map((r) => r[1]);
  if (set.rows.length < 6) extra.push(...(set === MATCH_SETS[5] ? ['biologik regress', 'konvergensiya', 'divergensiya'] : ['pellagra', 'kamqonlik', 'qandli diabet']));
  return matchBlock('', H, asks.map(([s, c]) => [set.q(s), c, `${s} — ${c}.`] as [string, string, string]), extra);
}

/* ---------------------------- 36–40 short open ---------------------------- */
// nuklein kislotalar
const O1_NUC = [asOpen(C_dnaG), asOpen(C_hbond), asOpen(C_dnaLen), asOpen(C_protein), asOpen(C_rna), asOpen(C_chargaff)];
// almashinuv va fotosintez
const O1_MET = [asOpen(C_glucose), asOpen(C_partial), asOpen(C_photo)];
// mono-, di-, triduragay va noallel genlar
const C_mono: () => Calc = () => {
  const N = pick([120, 160, 200, 240, 320, 400, 480]);
  const t = pick(['rec', 'het', 'test', 'incomplete']);
  if (t === 'rec') return { text: `Noʻxatda sariq rang (A) yashil rang (a) ustidan toʻliq dominantlik qiladi. Geterozigota oʻsimliklar oʻzaro chatishtirilib, ${N} ta urugʻ olindi. Ulardan nechtasi yashil boʻladi?`, ans: N / 4, unit: 'ta', explain: `Aa × Aa → 1AA : 2Aa : 1aa; yashil (aa) — 1/4: ${N}/4 = ${N / 4}.`, extra: [N / 2, (3 * N) / 4] };
  if (t === 'het') return { text: `Aa × Aa chatishtirishdan ${N} ta avlod olindi (dominantlik toʻliq). Ulardan nechtasi geterozigota boʻladi?`, ans: N / 2, unit: 'ta', explain: `Aa × Aa → 1AA : 2Aa : 1aa; geterozigotalar 2/4: ${N}/2 = ${N / 2}.`, extra: [N / 4, (3 * N) / 4] };
  if (t === 'test') return { text: `Tahliliy chatishtirishda (Aa × aa) ${N} ta avlod olindi. Ulardan nechtasi dominant fenotipga ega boʻladi?`, ans: N / 2, unit: 'ta', explain: `Aa × aa → 1Aa : 1aa; dominant fenotip 1/2: ${N / 2}.`, extra: [N / 4, (3 * N) / 4] };
  return { text: `Tungi goʻzalda qizil rang (A) oq rang (a) ustidan chala dominantlik qiladi, geterozigotalar pushti. Pushti oʻsimliklar oʻzaro chatishtirilib, ${N} ta oʻsimlik olindi. Ulardan nechtasi pushti boʻladi?`, ans: N / 2, unit: 'ta', explain: `Aa × Aa → 1AA (qizil) : 2Aa (pushti) : 1aa (oq): ${N}/2 = ${N / 2}.`, extra: [N / 4, (3 * N) / 4] };
};
const C_di: () => Calc = () => {
  const N = pick([160, 320, 480, 640, 800, 960]);
  const t = pick(['Abb', 'aabb', 'AaBb', 'gam', 'tri']);
  if (t === 'Abb') return { text: `Noʻxatda sariq rang (A) yashil (a) ustidan, silliq shakl (B) burishgan (b) ustidan toʻliq dominantlik qiladi. Diduragay AaBb oʻsimliklar oʻzaro chatishtirilib, ${N} ta urugʻ olindi. Ulardan nechtasi sariq va burishgan boʻladi? (genlar turli xromosomalarda)`, ans: (3 * N) / 16, unit: 'ta', explain: `9 A_B_ : 3 A_bb : 3 aaB_ : 1 aabb; sariq burishgan (A_bb) — 3/16: ${N}·3/16 = ${(3 * N) / 16}.`, extra: [(9 * N) / 16, N / 16, N / 4] };
  if (t === 'aabb') return { text: `AaBb × AaBb chatishtirishdan ${N} ta avlod olindi (dominantlik toʻliq, genlar mustaqil irsiylanadi). Ulardan nechtasi ikkala belgi boʻyicha retsessiv fenotipga ega?`, ans: N / 16, unit: 'ta', explain: `aabb — 1/16: ${N}/16 = ${N / 16}.`, extra: [(3 * N) / 16, (9 * N) / 16, N / 4] };
  if (t === 'AaBb') return { text: `AaBb × AaBb chatishtirishdan ${N} ta avlod olindi (genlar mustaqil irsiylanadi). Ulardan nechtasi ikkala gen boʻyicha geterozigota (AaBb) boʻladi?`, ans: N / 4, unit: 'ta', explain: `P(Aa) = 1/2, P(Bb) = 1/2 ⇒ P(AaBb) = 1/4: ${N}/4 = ${N / 4}.`, extra: [N / 16, (9 * N) / 16, (3 * N) / 16] };
  if (t === 'gam') {
    const k = R(2, 5);
    const g = 'AaBbCcDdEe'.slice(0, 2 * k);
    return { text: `${g} genotipli organizm necha xil gameta hosil qiladi? (genlar turli xromosomalarda)`, ans: 2 ** k, unit: 'xil', explain: `Geterozigota juftlar soni n = ${k}: gametalar turi 2ⁿ = ${2 ** k}.`, extra: [2 * k, 3 ** k, k] };
  }
  const ask = pick(['geno', 'feno']);
  return { text: `AaBbCc × AaBbCc chatishtirishda (dominantlik toʻliq, genlar mustaqil) avlodda necha xil ${ask === 'geno' ? 'genotip' : 'fenotip'} hosil boʻladi?`, ans: ask === 'geno' ? 27 : 8, unit: 'xil', explain: `Genotiplar 3ⁿ = 27, fenotiplar 2ⁿ = 8 (n = 3).`, extra: ask === 'geno' ? [8, 64, 9] : [27, 6, 16] };
};
const C_blood: () => Calc = () => {
  const [par, kid, p, e] = pick([
    ['II (Iᴬi) va III (Iᴮi)', 'I (0)', 25, 'Iᴬi × Iᴮi → IᴬIᴮ, Iᴬi, Iᴮi, ii — har biri 1/4; ii (I guruh) = 25%.'],
    ['II (Iᴬi) va III (Iᴮi)', 'IV (AB)', 25, 'Iᴬi × Iᴮi → IᴬIᴮ, Iᴬi, Iᴮi, ii — har biri 1/4; IᴬIᴮ = 25%.'],
    ['IV (IᴬIᴮ) va I (ii)', 'II (A)', 50, 'IᴬIᴮ × ii → Iᴬi, Iᴮi — har biri 1/2; II guruh = 50%.'],
    ['II (Iᴬi) va I (ii)', 'I (0)', 50, 'Iᴬi × ii → Iᴬi, ii — har biri 1/2; I guruh = 50%.'],
    ['IV (IᴬIᴮ) va IV (IᴬIᴮ)', 'IV (AB)', 50, 'IᴬIᴮ × IᴬIᴮ → 1IᴬIᴬ : 2IᴬIᴮ : 1IᴮIᴮ; IV guruh = 50%.']
  ] as [string, string, number, string][]);
  return { text: `Ota-onaning qon guruhlari ${par}. Farzandning ${kid} qon guruhiga ega boʻlish ehtimolini (%) toping.`, ans: p, unit: '%', explain: e, extra: [p === 25 ? 50 : 25, 75, 100] };
};
const O1_HYB = [asOpen(C_mono), asOpen(C_di), asOpen(C_blood)];
// birikkan irsiylanish va jins genetikasi
const C_link: () => Calc = () => {
  const d = pick([6, 10, 12, 16, 20, 24, 30, 40]);
  const N = pick([200, 400, 500, 1000]);
  if (!Number.isInteger((N * d) / 200)) throw new Error('link');
  const ask = pick(['rec', 'one', 'par']);
  const base = `A va B genlari bir xromosomada ${d} morganida (${d}%) masofada joylashgan. AB/ab digeterozigota organizm ab/ab bilan chatishtirilib, ${N} ta avlod olindi.`;
  if (ask === 'rec') return { text: `${base} Ulardan nechtasi krossover (rekombinant) boʻladi?`, ans: (N * d) / 100, unit: 'ta', explain: `Rekombinantlar ulushi ${d}%: ${N}·${d}/100 = ${(N * d) / 100}.`, extra: [(N * d) / 200, (N * (100 - d)) / 100] };
  if (ask === 'one') return { text: `${base} Ulardan nechtasi Aabb genotipga ega boʻladi?`, ans: (N * d) / 200, unit: 'ta', explain: `Ab gameta — krossover gameta, ulushi ${d}/2 = ${num(d / 2)}%: ${N}·${num(d / 2)}/100 = ${(N * d) / 200}.`, extra: [(N * d) / 100, (N * (100 - d)) / 200] };
  return { text: `${base} Ulardan nechtasi AaBb genotipga ega boʻladi?`, ans: (N * (100 - d)) / 200, unit: 'ta', explain: `AB gameta — krossoversiz, ulushi (100 − ${d})/2 = ${num((100 - d) / 2)}%: ${(N * (100 - d)) / 200}.`, extra: [(N * d) / 200, (N * (100 - d)) / 100] };
};
const C_sex: () => Calc = () => {
  const dis = pick(['gemofiliya', 'daltonizm']);
  const t = pick(['all', 'sons', 'dcarrier', 'sons100']);
  const g = dis === 'gemofiliya' ? 'H' : 'D';
  if (t === 'all') return { text: `${dis.charAt(0).toUpperCase() + dis.slice(1)} geni (${g.toLowerCase()}) X xromosomada joylashgan retsessiv gen. Tashuvchi ayol (X${g}X${g.toLowerCase()}) sogʻlom erkakka turmushga chiqdi. Barcha farzandlar orasida ${dis} bilan kasallanganlar ehtimolini (%) toping.`, ans: 25, unit: '%', explain: `X${g}X${g.toLowerCase()} × X${g}Y → X${g}X${g}, X${g}X${g.toLowerCase()}, X${g}Y, X${g.toLowerCase()}Y; kasal faqat X${g.toLowerCase()}Y — 1/4 = 25%.`, extra: [50, 0, 75] };
  if (t === 'sons') return { text: `${dis.charAt(0).toUpperCase() + dis.slice(1)} geni X xromosomada joylashgan retsessiv gen. Tashuvchi ayol sogʻlom erkakka turmushga chiqdi. Oʻgʻil farzandlarning necha foizi kasal boʻladi?`, ans: 50, unit: '%', explain: `Oʻgʻillar X xromosomani onadan oladi: X${g}Y yoki X${g.toLowerCase()}Y — 50% kasal.`, extra: [25, 100, 0] };
  if (t === 'dcarrier') return { text: `${dis.charAt(0).toUpperCase() + dis.slice(1)} geni X xromosomada joylashgan retsessiv gen. Sogʻlom ayol (X${g}X${g}) kasal erkakka (X${g.toLowerCase()}Y) turmushga chiqdi. Qiz farzandlarning necha foizi tashuvchi boʻladi?`, ans: 100, unit: '%', explain: `Qizlar otadan X${g.toLowerCase()}, onadan X${g} oladi — hammasi X${g}X${g.toLowerCase()} (tashuvchi).`, extra: [50, 25, 0] };
  return { text: `${dis.charAt(0).toUpperCase() + dis.slice(1)} geni X xromosomada joylashgan retsessiv gen. Kasal ayol (X${g.toLowerCase()}X${g.toLowerCase()}) sogʻlom erkakka turmushga chiqdi. Oʻgʻil farzandlarning necha foizi kasal boʻladi?`, ans: 100, unit: '%', explain: `Oʻgʻillar X xromosomani onadan oladi — hammasi X${g.toLowerCase()}Y (kasal).`, extra: [50, 25, 0] };
};
const O1_LINK = [asOpen(C_link), asOpen(C_sex)];
// mitoz, meyoz, ontogenez
const C_endo: () => Calc = () => {
  const [org, d] = pick([['Makkajoʻxori', 20], ['Bugʻdoy (yumshoq)', 42], ['Noʻxat', 14], ['Javdar', 14], ['Gʻoʻza', 52]] as [string, number][]);
  const ask = pick(['endo', 'sperm', 'zyg']);
  const n = d / 2;
  if (ask === 'endo') return { text: `${org} somatik hujayrasida 2n = ${d} ta xromosoma bor. Uning endosperm hujayrasida nechta xromosoma boʻladi?`, ans: 3 * n, unit: 'ta', explain: `Endosperm = spermiy (n) + markaziy hujayra (2n) = 3n = ${3 * n}.`, extra: [n, d, 2 * d] };
  if (ask === 'sperm') return { text: `${org} somatik hujayrasida 2n = ${d} ta xromosoma bor. Uning spermiysida nechta xromosoma boʻladi?`, ans: n, unit: 'ta', explain: `Spermiy gaploid: n = ${n}.`, extra: [d, 3 * n, n / 2] };
  return { text: `${org} somatik hujayrasida 2n = ${d} ta xromosoma bor. Urugʻ murtagi (zigota) hujayrasida nechta xromosoma boʻladi?`, ans: d, unit: 'ta', explain: `Tuxum hujayra (n) + spermiy (n) = zigota 2n = ${d}.`, extra: [n, 3 * n, 2 * d] };
};
const O1_MIT = [asOpen(C_chrom), asOpen(C_gameto), asOpen(C_endo)];

/* ------------------------- 41–43 written tasks (O2) ------------------------- */
function W41(): Q {
  if (Math.random() < 0.6) {
    let T = 0, p = 0, A = 0, G = 0;
    for (;;) {
      T = pick([1200, 1800, 2400, 3000, 3600, 4200, 6000]);
      p = pick([10, 15, 20, 30, 35, 40]);
      A = (T * p) / 100;
      G = T / 2 - A;
      if (Number.isInteger(A) && Number.isInteger(G) && G > 0) break;
    }
    const k = T / 6;
    return openN(
      `DNK qoʻsh zanjirida ${A} ta adenin nukleotidi boʻlib, u umumiy nukleotidlarning ${p}% ini tashkil etadi. ${NUC} Bitta aminokislotaning oʻrtacha molekulyar massasi 110 deb olinsin (stop-kodonni hisobga olmang).`,
      [
        ['a) DNK dagi jami nukleotidlar sonini toping.', T],
        ['b) Guanin nukleotidlari sonini toping.', G],
        ['c) Vodorod bogʻlar sonini toping.', 2 * A + 3 * G],
        ['d) DNK uzunligini (nm) toping.', Math.round((T / 2) * 0.34 * 100) / 100],
        ['e) Shu DNK bir zanjirida kodlangan oqsildagi aminokislotalar sonini toping.', k],
        ['f) Shu oqsilning molekulyar massasini toping.', k * 110]
      ],
      `Jami = ${A}·100/${p} = ${T}; A = T = ${A}, G = S = (${T} − ${2 * A})/2 = ${G}; H-bogʻlar = 2·${A} + 3·${G} = ${2 * A + 3 * G}; L = ${T / 2}·0,34 = ${num((T / 2) * 0.34)} nm; aminokislotalar = ${T / 2}/3 = ${k}; M(oqsil) = ${k}·110 = ${k * 110}.`
    );
  }
  const x = pick([4, 5, 6, 8, 10]);
  const y = R(2, x - 1);
  return openN(
    `Odam muskul hujayralarida ${x} mol glyukoza parchalandi. Shundan ${y} moli toʻliq (kislorodli) oksidlandi, qolgani kislorod yetishmasligi sababli faqat glikolizga (sut kislotagacha) uchradi. 1 mol ATF da 40 kJ energiya toʻplanadi deb hisoblang.`,
    [
      ['a) Glikolizda hosil boʻlgan ATF miqdorini (mol) toping.', 2 * x],
      ['b) Kislorodli bosqichda hosil boʻlgan ATF miqdorini (mol) toping.', 36 * y],
      ['c) Hosil boʻlgan sut kislota miqdorini (mol) toping.', 2 * (x - y)],
      ['d) Ajralgan CO₂ miqdorini (mol) toping.', 6 * y],
      ['e) ATF da toʻplangan jami energiyani (kJ) toping.', (2 * x + 36 * y) * 40]
    ],
    `Glikoliz: ${x}·2 = ${2 * x} mol ATF; kislorodli bosqich: ${y}·36 = ${36 * y} mol ATF; sut kislota: 2·(${x} − ${y}) = ${2 * (x - y)} mol; CO₂: 6·${y} = ${6 * y} mol; E = ${2 * x + 36 * y}·40 = ${(2 * x + 36 * y) * 40} kJ.`
  );
}
function W42(): Q {
  if (Math.random() < 0.55) {
    const N = pick([320, 480, 640, 800, 960, 1600]);
    return openN(
      `Noʻxatda sariq rang (A) yashil (a) ustidan, silliq shakl (B) burishgan (b) ustidan toʻliq dominantlik qiladi; genlar turli xromosomalarda joylashgan. Ikkala belgi boʻyicha geterozigota oʻsimliklar oʻzaro chatishtirilib, ${N} ta urugʻ olindi.`,
      [
        ['a) Bitta ota-ona oʻsimlik necha xil gameta hosil qiladi?', 4],
        ['b) Avlodda necha xil genotip hosil boʻladi?', 9],
        ['c) Avlodda necha xil fenotip hosil boʻladi?', 4],
        ['d) Sariq silliq urugʻlar sonini toping.', (9 * N) / 16],
        ['e) Yashil burishgan urugʻlar sonini toping.', N / 16],
        ['f) Ikkala gen boʻyicha geterozigota (AaBb) urugʻlar sonini toping.', N / 4],
        ['g) Ikkala gen boʻyicha gomozigota urugʻlar sonini toping.', N / 4]
      ],
      `AaBb × AaBb: gametalar AB, Ab, aB, ab (4 xil); genotiplar 3² = 9, fenotiplar 2² = 4 (9 : 3 : 3 : 1). Sariq silliq 9/16 = ${(9 * N) / 16}; yashil burishgan 1/16 = ${N / 16}; AaBb 4/16 = ${N / 4}; gomozigotalar (AABB, AAbb, aaBB, aabb) 4/16 = ${N / 4}.`
    );
  }
  let d = 0, N = 0;
  for (;;) {
    d = pick([8, 10, 12, 16, 20, 24, 30]);
    N = pick([400, 500, 800, 1000, 1200]);
    if (Number.isInteger((N * d) / 200)) break;
  }
  return openN(
    `Drozofilada kulrang tana (A) qora tana (a) ustidan, normal qanot (B) kalta qanot (b) ustidan dominantlik qiladi. Bu genlar bitta xromosomada ${d} morganida masofada joylashgan. Digeterozigota urgʻochi (AB/ab) qora tanali kalta qanotli erkak (ab/ab) bilan chatishtirilib, ${N} ta pashsha olindi.`,
    [
      ['a) Urgʻochi pashsha necha xil gameta hosil qiladi?', 4],
      ['b) Krossover gametalar ulushini (%) toping.', d],
      ['c) Kulrang tanali normal qanotli pashshalar sonini toping.', (N * (100 - d)) / 200],
      ['d) Qora tanali kalta qanotli pashshalar sonini toping.', (N * (100 - d)) / 200],
      ['e) Kulrang tanali kalta qanotli pashshalar sonini toping.', (N * d) / 200],
      ['f) Jami rekombinant pashshalar sonini toping.', (N * d) / 100]
    ],
    `Gametalar: AB va ab — krossoversiz, har biri (100 − ${d})/2 = ${num((100 - d) / 2)}%; Ab va aB — krossover, har biri ${num(d / 2)}% (jami ${d}%). Kulrang normal (AaBb) = ${(N * (100 - d)) / 200}; qora kalta (aabb) = ${(N * (100 - d)) / 200}; kulrang kalta (Aabb) = ${(N * d) / 200}; rekombinantlar = ${(N * d) / 100}.`
  );
}
function W43(): Q {
  const t = R(0, 2);
  if (t === 0) {
    const [org, d] = pick(ORGS);
    const n = d / 2;
    return openN(
      `${org} somatik hujayrasida 2n = ${d} ta xromosoma bor.`,
      [
        ['a) Mitoz metafazasida nechta xromatida boʻladi?', 4 * n],
        ['b) Mitoz anafazasida nechta xromosoma boʻladi?', 4 * n],
        ['c) Meyoz II metafazasida (bitta hujayrada) nechta xromosoma boʻladi?', n],
        ['d) Gametada nechta xromosoma boʻladi?', n]
      ],
      `n = ${n}. Mitoz metafazasi: 2n4c — ${4 * n} xromatida; anafaza: 4n4c — ${4 * n} xromosoma; meyoz II metafazasi: n2c — ${n} xromosoma; gameta: nc — ${n}.`
    );
  }
  if (t === 1) {
    const chain = pick(CHAINS);
    const top = chain.length - 1;
    const m = pick([2, 3, 5, 6, 8]);
    return openN(
      `Oziq zanjiri: ${chain.join(' → ')}. Ekologik piramida qoidasiga (10%) amal qilinadi; ${chain[top]} massasi ${m} kg ga ortdi.`,
      [
        [`a) Buning uchun necha kg ${chain[top - 1]} kerak boʻladi?`, m * 10],
        [`b) Buning uchun necha kg ${chain[0]} kerak boʻladi?`, m * 10 ** top],
        ['c) Bu zanjirda nechta trofik daraja bor?', chain.length]
      ],
      `Har bir pogʻonada 10% oʻtadi: ${chain[top - 1]} — ${m}·10 = ${m * 10} kg; ${chain[0]} — ${m}·10^${top} = ${m * 10 ** top} kg; trofik darajalar soni ${chain.length}.`
    );
  }
  const k = pick([20, 25, 40, 50, 100]);
  return openN(
    `Hayvonning tuxumdonida ${k} ta I tartib oosit va urugʻdonida ${k} ta I tartib spermatotsit meyozni toʻliq tugatdi.`,
    [
      ['a) Necha tuxum hujayra hosil boʻladi?', k],
      ['b) Necha yoʻnaltiruvchi tanacha hosil boʻladi?', 3 * k],
      ['c) Necha spermatozoid hosil boʻladi?', 4 * k],
      ['d) Hosil boʻlgan tuxum hujayralarning barchasi urugʻlansa, nechta zigota hosil boʻladi?', k]
    ],
    `Oogenez: 1 oosit → 1 tuxum + 3 yoʻnaltiruvchi tanacha: ${k} va ${3 * k}. Spermatogenez: 1 spermatotsit → 4 spermatozoid: ${4 * k}. Har bir tuxumga bitta spermatozoid: ${k} zigota.`
  );
}

/* -------------------------------- assemble -------------------------------- */
function distinct(pool: (() => Q)[], n: number): Q[] {
  const out: Q[] = [];
  const texts = new Set<string>();
  for (let tries = 0; out.length < n && tries < 200; tries++) {
    const g = pool[tries < pool.length ? tries : R(0, pool.length - 1)];
    try {
      const q = tryGen(g);
      if (texts.has(q.text)) continue;
      texts.add(q.text);
      out.push(q);
    } catch {
      /* skip */
    }
  }
  if (out.length < n) throw new Error('pool too small');
  return out;
}
const sh = (p: (() => Q)[]) => shuffle(p);

/** A fresh 43-task biology variant (client side only — random). */
export function buildBioExam(): G11Question[] {
  const list: Q[] = [
    ...distinct(sh(SCI), 1),
    ...distinct(sh(CELL), 10),
    ...distinct(sh(SYST), 1),
    ...distinct(sh(PLANT_ANIMAL), 7),
    ...distinct(sh(HUMAN), 4),
    ...distinct(sh(EVO), 5),
    ...distinct(sh(ECO), 4),
    ...tryBlock(bioMatch),
    fromPool(O1_NUC),
    fromPool(O1_MET),
    fromPool(O1_HYB),
    fromPool(O1_LINK),
    fromPool(O1_MIT),
    tryGen(W41),
    tryGen(W42),
    tryGen(W43)
  ];
  return toQuestions(list, 'g11-bio');
}
