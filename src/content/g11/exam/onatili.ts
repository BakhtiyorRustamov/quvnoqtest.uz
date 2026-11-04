import type { G11Question } from '../diagnostic';
import { R, pick, shuffle, mc, openN, tryGen, tryBlock, toQuestions, matchBlock, type Q } from './gen';

/**
 * Ona tili va adabiyot — Milliy sertifikat formatidagi test generatori (DTM tafsiloti): 45 topshiriq, 180 daqiqa.
 * 1–2 imlo, 3–4 lugʻat boyligi, 5–6 uslubiyat, 7–11 grammatika, 12 punktuatsiya, 13–17 adabiyot (Y-1);
 * 18–32 oʻqish savodxonligi (3 ta matn × 5 savol); 33–35 moslashtirish (Y-2);
 * 36–44 lingvistik va badiiy tahlil (a/b bandli O-1); 45 yozma savodxonlik (bu yerda — imlo tuzatish topshirigʻi;
 * haqiqiy imtihonda insho yoziladi).
 */
export const UZB_EXAM_MINUTES = 180;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const pickFact = (title: string, rows: [string, string][], explain: (q: string, a: string) => string, extra: string[] = []) => () => {
  const [q, a] = pick(rows);
  const others = Array.from(new Set([...rows.map((r) => r[1]), ...extra].filter((x) => x !== a)));
  return mc(title.replace('{q}', q), a, others, explain(q, a));
};

/* ================================ 1–2 imlo ================================ */
/** [toʻgʻri, xato] */
const SPELL: [string, string][] = [
  ['mashhur', 'mashur'], ['taassurot', 'tassurot'], ['shahar', 'shaxar'], ['jamiyat', 'jamiyyat'], ['buloq', 'bulogʻ'],
  ['oʻqituvchi', 'oʻqtuvchi'], ['tabassum', 'tabasum'], ['muhabbat', 'muxabbat'], ['xursand', 'hursand'], ['hayot', 'xayot'],
  ['fikr', 'fikir'], ['qishloq', 'qishlok'], ['sanʼat', 'sanat'], ['teatr', 'teatir'], ['aʼlo', 'alo'], ['ilhom', 'ilxom'],
  ['mehmon', 'mexmon'], ['xabar', 'habar'], ['maʼno', 'mano'], ['ishxona', 'ishhona'], ['hech kim', 'hechkim'], ['ota-ona', 'ota ona'],
  ['tez-tez', 'tez tez'], ['shoir', 'shoyir'], ['hikoya', 'xikoya'], ['mehnat', 'mexnat'], ['xalq', 'halq'], ['hurmat', 'xurmat']
];
const S_correct = () => {
  const s = shuffle(SPELL).slice(0, 4);
  return mc('Qaysi soʻz imlo qoidalariga muvofiq toʻgʻri yozilgan?', s[0][0], s.slice(1).map((p) => p[1]), `Toʻgʻri yozilishi: ${s.map((p) => p[0]).join(', ')}.`);
};
const S_wrong = () => {
  const s = shuffle(SPELL).slice(0, 4);
  return mc('Qaysi soʻzda imlo xatosi bor?', s[0][1], s.slice(1).map((p) => p[0]), `«${s[0][1]}» xato — toʻgʻrisi «${s[0][0]}».`);
};
const S_rule = () =>
  pick([
    () => mc('Juft soʻzlar qanday yoziladi?', 'chiziqcha bilan (ota-ona, katta-kichik)', ['qoʻshib (otaona)', 'ajratib (ota ona)', 'vergul bilan (ota, ona)', 'tutuq belgisi bilan'], 'Juft va takroriy soʻzlar chiziqcha bilan yoziladi.'),
    () => mc('«Hech», «har» soʻzlari bilan kelgan olmoshlar qanday yoziladi?', 'ajratib (hech kim, har kim)', ['qoʻshib (hechkim, harkim)', 'chiziqcha bilan (hech-kim)', 'bosh harf bilan', 'tutuq belgisi bilan'], '«Hech», «har» soʻzlari keyingi soʻzdan ajratib yoziladi.'),
    () => mc('Qaysi qatorda tutuq belgisi (ʼ) toʻgʻri ishlatilgan?', 'sanʼat, maʼno, taʼlim', ['sanat, maʼno, talim', 'sanʼat, mano, taʼlim', 'saʼnat, maʼno, taʼlim', 'sanʼat, maʼno, talʼim'], 'Arabchadan oʻzlashgan soʻzlarda tutuq belgisi: sanʼat, maʼno, taʼlim.')
  ])();
const SPELL_POOL = [S_correct, S_wrong, S_rule];

/* ============================ 3–4 lugʻat boyligi ============================ */
const F_lexgroup = pickFact(
  '«{q}» soʻzlari qanday leksik guruhga kiradi?',
  [
    ['chiroyli – goʻzal', 'sinonimlar'], ['botir – jasur', 'sinonimlar'], ['aqlli – dono', 'sinonimlar'], ['yuz – chehra', 'sinonimlar'],
    ['issiq – sovuq', 'antonimlar'], ['doʻst – dushman', 'antonimlar'], ['kirmoq – chiqmoq', 'antonimlar'], ['erta – kech', 'antonimlar'],
    ['ot (hayvon) – ot (ism)', 'omonimlar'], ['yoz (fasl) – yoz (yozmoq)', 'omonimlar'], ['tut (daraxt) – tut (tutmoq)', 'omonimlar'],
    ['asr – asir', 'paronimlar'], ['shox – shoh', 'paronimlar'], ['hol – xol', 'paronimlar']
  ],
  (q, a) => `«${q}» — ${a}.`
);
const F_idiom = pickFact(
  '«{q}» iborasining maʼnosini toping.',
  [
    ['boshi osmonga yetdi', 'juda xursand boʻldi'],
    ['qoʻli ochiq', 'saxiy'],
    ['ilonning yogʻini yalagan', 'juda ayyor'],
    ['yeng shimarib kirishmoq', 'astoydil ishga kirishmoq'],
    ['kapalagi uchib ketdi', 'qattiq qoʻrqdi'],
    ['qulogʻiga quyib olmoq', 'yaxshi eslab qolmoq'],
    ['tili qisiq', 'aybi borligi uchun gapira olmaydigan'],
    ['koʻz ochib yumguncha', 'juda tez, bir zumda']
  ],
  (q, a) => `«${q}» — ${a}.`
);
const F_lexFixed = () =>
  pick([
    () => mc('Qaysi soʻz koʻp maʼnoli?', 'koʻz (odamning koʻzi, uzukning koʻzi, buloqning koʻzi)', ['kompyuter', 'gramm', 'fotosintez', 'Toshkent'], 'Koʻp maʼnoli soʻzlar bir nechta bogʻliq maʼnoga ega: koʻz — aʼzo, uzuk koʻzi, buloq koʻzi.'),
    () => mc('Qaysi soʻz atama (termin)?', 'fotosintez', ['chiroyli', 'yugurmoq', 'shirin', 'ona'], 'Atama — fan yoki kasbga oid aniq tushunchani bildiruvchi soʻz.'),
    () => mc('Qaysi soʻz eskirgan (tarixiy) soʻz hisoblanadi?', 'mirshab', ['politsiyachi', 'muhandis', 'shifokor', 'dasturchi'], 'Mirshab — oʻtmishda tartib saqlovchi; hozir bunday lavozim yoʻq — tarixiy soʻz.'),
    () => mc('Qaysi soʻz yangi paydo boʻlgan soʻz (neologizm)?', 'smartfon', ['qalam', 'dehqon', 'tegirmon', 'chopon'], 'Smartfon — keyingi yillarda paydo boʻlgan yangi tushuncha nomi.')
  ])();
const LEX_POOL = [F_lexgroup, F_lexgroup, F_idiom, F_lexFixed];

/* ============================== 5–6 uslubiyat ============================== */
const STYLE_ROWS: [string, string][] = [
  ['Ertalab yetti yarimda bekatda kutib turaman, kechikma-ya!', 'soʻzlashuv uslubi'],
  ['Voy, qoʻy-e, shunaqa ham boʻladimi? Ishonmayman!', 'soʻzlashuv uslubi'],
  ['Ariza. Meni 2-oktabrdan boshlab ishga qabul qilishingizni soʻrayman.', 'rasmiy uslub'],
  ['Buyruq. Ish vaqti dushanbadan jumagacha soat 9:00 dan 18:00 gacha etib belgilansin.', 'rasmiy uslub'],
  ['Fotosintez — yashil oʻsimliklarda yorugʻlik energiyasi hisobiga organik moddalar hosil boʻlish jarayoni.', 'ilmiy uslub'],
  ['Kvadrat tenglama ikkitadan ortiq ildizga ega boʻla olmaydi.', 'ilmiy uslub'],
  ['Shahrimizda yangi kutubxona ochildi. Endi har bir yoshning kitobga yoʻli yanada yaqinlashdi!', 'publitsistik uslub'],
  ['Suvni tejash — barchamizning burchimiz. Bugun tejalgan har bir tomchi ertangi hosilning garovidir.', 'publitsistik uslub'],
  ['Kuz kirib, bogʻlar sargʻaygan yaproqlardan oltin toʻn kiydi, shamol ularni sekin-asta yerga toʻshardi.', 'badiiy uslub'],
  ['Tong otdi. Qishloq ustidagi tuman sut kabi oqib, adirlar ortiga chekindi.', 'badiiy uslub']
];
const F_style = pickFact('Quyidagi matn qaysi nutq uslubiga mansub?\n«{q}»', STYLE_ROWS, (q, a) => `Matn — ${a}.`);
const F_styleFixed = () =>
  pick([
    () => mc('Qaysi birikma «oʻldi» soʻzining evfemizmi (yumshatilgan ifodasi)?', 'vafot etdi', ['jon berdi', 'yiqildi', 'uxladi', 'ketdi-qoldi'], '«Vafot etdi» — «oʻldi» soʻzining hurmat bilan yumshatilgan ifodasi (evfemizm).'),
    () => mc('Rasmiy uslubga xos belgini toping.', 'qolipga solingan iboralar va aniq, loʻnda ifoda', ['koʻchma maʼnoli soʻzlar va obrazlilik', 'undov va taqlid soʻzlarning koʻpligi', 'shevaga xos soʻzlar', 'ritorik soʻroqlar'], 'Rasmiy uslubda qolip iboralar, aniqlik va betaraf ifoda ustun.'),
    () => mc('Badiiy uslubning asosiy belgisi qaysi?', 'obrazlilik, tasviriy vositalarning qoʻllanishi', ['atamalarning koʻpligi', 'qolip iboralar', 'faqat darak gaplar', 'raqam va formulalar'], 'Badiiy uslub obrazli tasvir va taʼsirchanlikka tayanadi.')
  ])();
const STYLE_POOL = [F_style, F_style, F_styleFixed];

/* ============================= 7–11 grammatika ============================= */
const F_pos = pickFact(
  '«{q}» soʻzi qaysi soʻz turkumiga kiradi?',
  [
    ['kitob', 'ot'], ['bahor', 'ot'], ['chiroyli', 'sifat'], ['shirin', 'sifat'], ['yugurmoq', 'feʼl'], ['oʻqimoq', 'feʼl'],
    ['beshinchi', 'son'], ['yuz', 'son'], ['tez-tez', 'ravish'], ['ertalab', 'ravish'], ['ular', 'olmosh'], ['kim', 'olmosh'],
    ['lekin', 'bogʻlovchi'], ['uchun', 'koʻmakchi'], ['faqat', 'yuklama'], ['voy', 'undov'], ['taq-tuq', 'taqlid soʻz'], ['albatta', 'modal soʻz']
  ],
  (q, a) => `«${q}» — ${a}.`
);
const F_voice = pickFact(
  '«{q}» feʼli qaysi nisbatda?',
  [['yozildi', 'majhul nisbat'], ['yozdirdi', 'orttirma nisbat'], ['yuvindi', 'oʻzlik nisbat'], ['kulishdi', 'birgalik nisbat'], ['yozdi', 'aniq nisbat'], ['kiyindi', 'oʻzlik nisbat'], ['ochildi', 'majhul nisbat'], ['oʻqitdi', 'orttirma nisbat']],
  (q, a) => `«${q}» — ${a}.`
);
const F_pron = pickFact(
  '«{q}» olmoshi qaysi turga kiradi?',
  [['men', 'kishilik olmoshi'], ['siz', 'kishilik olmoshi'], ['bu', 'koʻrsatish olmoshi'], ['oʻsha', 'koʻrsatish olmoshi'], ['kim', 'soʻroq olmoshi'], ['qanday', 'soʻroq olmoshi'], ['hech kim', 'boʻlishsizlik olmoshi'], ['hamma', 'belgilash olmoshi'], ['oʻzim', 'oʻzlik olmoshi']],
  (q, a) => `«${q}» — ${a}.`
);
const F_num = pickFact(
  '«{q}» soni qaysi ma’no guruhiga kiradi?',
  [['beshta', 'dona son'], ['beshinchi', 'tartib son'], ['beshovlon', 'jamlovchi son'], ['beshtacha', 'chama son'], ['beshtadan', 'taqsim son'], ['uchdan bir', 'kasr son']],
  (q, a) => `«${q}» — ${a}.`
);
const F_case = pickFact(
  '«{q}» soʻzi qaysi kelishikda?',
  [['maktabga', 'joʻnalish kelishigi'], ['maktabda', 'oʻrin-payt kelishigi'], ['maktabdan', 'chiqish kelishigi'], ['maktabni', 'tushum kelishigi'], ['maktabning', 'qaratqich kelishigi'], ['shaharga', 'joʻnalish kelishigi'], ['kitobni', 'tushum kelishigi'], ['uydan', 'chiqish kelishigi']],
  (q, a) => `«${q}» — ${a}.`,
  ['bosh kelishik']
);
const F_mood = pickFact(
  '«{q}» feʼli qaysi maylda?',
  [['oʻqisam', 'shart mayli'], ['kelsang', 'shart mayli'], ['oʻqi', 'buyruq-istak mayli'], ['kelaylik', 'buyruq-istak mayli'], ['oʻqidi', 'xabar mayli'], ['keladi', 'xabar mayli'], ['oʻqimoqchi', 'maqsad mayli']],
  (q, a) => `«${q}» — ${a}.`
);
const F_degree = pickFact(
  '«{q}» sifati qaysi darajada?',
  [['oq', 'oddiy daraja'], ['oqroq', 'qiyosiy daraja'], ['oppoq', 'orttirma daraja'], ['katta', 'oddiy daraja'], ['kattaroq', 'qiyosiy daraja'], ['juda katta', 'orttirma daraja'], ['qip-qizil', 'orttirma daraja']],
  (q, a) => `«${q}» — ${a}.`,
  ['ozaytirma daraja']
);
const F_sent = pickFact(
  '«{q}» gapi ifoda maqsadiga koʻra qanday gap?',
  [['Ertaga kutubxonaga borasanmi?', 'soʻroq gap'], ['Kim bu kitobni yozgan?', 'soʻroq gap'], ['Eshikni yopib qoʻying.', 'buyruq gap'], ['Darsga kechikma.', 'buyruq gap'], ['Bugun havo iliq.', 'darak gap'], ['Ukam maktabdan qaytdi.', 'darak gap']],
  (q, a) => `«${q}» — ${a}.`,
  ['atov gap', 'undalmali gap']
);
const F_compound = pickFact(
  '«{q}» gapi qoʻshma gapning qaysi turiga kiradi?',
  [
    ['Yomgʻir yogʻdi, lekin havo isimadi.', 'bogʻlangan qoʻshma gap'],
    ['Quyosh chiqdi va qor eriy boshladi.', 'bogʻlangan qoʻshma gap'],
    ['Agar vaqtim boʻlsa, sizga qoʻngʻiroq qilaman.', 'ergash gapli qoʻshma gap'],
    ['Kim mehnat qilsa, u murodiga yetadi.', 'ergash gapli qoʻshma gap'],
    ['Bahor keldi: daraxtlar gulladi.', 'bogʻlovchisiz qoʻshma gap'],
    ['Shamol turdi, chang koʻtarildi.', 'bogʻlovchisiz qoʻshma gap']
  ],
  (q, a) => `«${q}» — ${a}.`,
  ['sodda yoyiq gap']
);
const GRAM_POOL = [F_pos, F_pos, F_voice, F_pron, F_num, F_case, F_mood, F_degree, F_sent, F_compound];

/* ============================== 12 punktuatsiya ============================== */
const PUNCT: [string, string[], string][] = [
  ['Doʻstim, ertaga albatta keling.', ['Doʻstim ertaga, albatta keling.', 'Doʻstim ertaga albatta, keling.', 'Doʻstim: ertaga albatta keling.'], 'Undalma vergul bilan ajratiladi.'],
  ['Afsuski, u majlisga kela olmadi.', ['Afsuski u, majlisga kela olmadi.', 'Afsuski u majlisga, kela olmadi.', 'Afsuski: u majlisga kela olmadi.'], 'Kirish soʻz vergul bilan ajratiladi.'],
  ['Bozordan olma, nok, uzum va anor oldik.', ['Bozordan olma nok, uzum, va anor oldik.', 'Bozordan, olma, nok, uzum va anor oldik.', 'Bozordan olma, nok, uzum, va, anor oldik.'], 'Uyushiq boʻlaklar orasiga vergul qoʻyiladi; «va» oldidan vergul qoʻyilmaydi.'],
  ['Toshkent — Oʻzbekistonning poytaxti.', ['Toshkent, Oʻzbekistonning poytaxti.', 'Toshkent: Oʻzbekistonning poytaxti.', 'Toshkent Oʻzbekistonning — poytaxti.'], 'Ot kesim bilan ega orasiga tire qoʻyiladi.'],
  ['Stol ustida kitob, daftar, qalam — hammasi tartibli turardi.', ['Stol ustida kitob, daftar, qalam, hammasi — tartibli turardi.', 'Stol ustida: kitob, daftar, qalam hammasi tartibli turardi.', 'Stol ustida kitob daftar qalam — hammasi, tartibli turardi.'], 'Umumlashtiruvchi soʻz uyushiq boʻlaklardan keyin kelsa, undan oldin tire qoʻyiladi.'],
  ['Bahor keldi: bogʻlarda gullar ochildi.', ['Bahor keldi bogʻlarda: gullar ochildi.', 'Bahor, keldi bogʻlarda gullar ochildi.', 'Bahor keldi bogʻlarda gullar, ochildi.'], 'Bogʻlovchisiz qoʻshma gapda ikkinchi qism birinchisini izohlasa, ikki nuqta qoʻyiladi.']
];
const F_punct = () => {
  const [c, w, e] = pick(PUNCT);
  return mc('Qaysi gapda tinish belgilari toʻgʻri qoʻyilgan?', c, w, e);
};

/* ============================== 13–17 adabiyot ============================== */
const WORKS: [string, string, string][] = [
  ['Oʻtkan kunlar', 'Abdulla Qodiriy', 'roman'],
  ['Mehrobdan chayon', 'Abdulla Qodiriy', 'roman'],
  ['Kecha va kunduz', 'Abdulhamid Choʻlpon', 'roman'],
  ['Tushda kechgan umrlar', 'Oʻtkir Hoshimov', 'roman'],
  ['Dunyoning ishlari', 'Oʻtkir Hoshimov', 'qissa'],
  ['Otamdan qolgan dalalar', 'Togʻay Murod', 'roman'],
  ['Lolazor', 'Murod Muhammad Doʻst', 'roman'],
  ['Yulduzli tunlar', 'Pirimqul Qodirov', 'roman'],
  ['Ulugʻbek xazinasi', 'Odil Yoqubov', 'roman'],
  ['Qiyomat', 'Chingiz Aytmatov', 'roman'],
  ['Oq kema', 'Chingiz Aytmatov', 'qissa'],
  ['Sudxoʻrning oʻlimi', 'Sadriddin Ayniy', 'qissa'],
  ['Abulfayzxon', 'Abdurauf Fitrat', 'drama'],
  ['Temir xotin', 'Sharof Boshbekov', 'drama'],
  ['Ruhlar isyoni', 'Erkin Vohidov', 'doston'],
  ['Zarbulmasal', 'Gulxaniy', 'masal'],
  ['Mening oʻgʻrigina bolam', 'Gʻafur Gʻulom', 'hikoya'],
  ['Adabiyot muallimi', 'Abdulla Qahhor', 'hikoya'],
  ['Garov', 'Anton Chexov', 'hikoya'],
  ['Hayotga muhabbat', 'Jek London', 'hikoya'],
  ['Molxona', 'Jorj Oruell', 'qissa'],
  ['Kichkina shahzoda', 'Antuan de Sent-Ekzyuperi', 'qissa'],
  ['Gulliverning sayohatlari', 'Jonatan Svift', 'roman'],
  ['Zamonamiz qahramoni', 'Mixail Lermontov', 'roman'],
  ['Evrilish', 'Frans Kafka', 'hikoya'],
  ['Hellados', 'Nodar Dumbadze', 'hikoya'],
  ['Xamsa', 'Alisher Navoiy', 'besh dostondan iborat turkum'],
  ['Boburnoma', 'Zahiriddin Muhammad Bobur', 'tarixiy-memuar asar'],
  ['Padarkush', 'Mahmudxoʻja Behbudiy', 'drama']
];
const L_author = () => {
  const [w, a] = pick(WORKS);
  return mc(`«${w}» asarining muallifi kim?`, a, WORKS.map((x) => x[1]).filter((x) => x !== a), `«${w}» — ${a} asari.`);
};
const L_genre = () => {
  const [w, a, g] = pick(WORKS.filter((x) => ['roman', 'qissa', 'hikoya', 'drama', 'doston'].includes(x[2])));
  return mc(`${a}ning «${w}» asari qaysi janrga mansub?`, g, ['roman', 'qissa', 'hikoya', 'drama', 'doston', 'gʻazal'], `«${w}» — ${g}.`);
};
const F_term = pickFact(
  'Qaysi adabiy atamaga taʼrif berilgan: {q}?',
  [
    ['narsa yoki hodisani boshqasiga oʻxshatish', 'tashbeh'],
    ['jonsiz narsalarga jonli mavjudot xususiyatlarini koʻchirish', 'tashxis'],
    ['zid maʼnoli soʻzlarni qarama-qarshi qoʻyish', 'tazod'],
    ['voqea yoki belgini haddan tashqari oshirib tasvirlash', 'mubolagʻa'],
    ['misralar oxirida takrorlanadigan soʻz yoki soʻzlar guruhi', 'radif'],
    ['misralar oxiridagi ohangdosh soʻzlar', 'qofiya'],
    ['hajviy, kulgili asarlarda qahramonlarning illatlarini fosh etish', 'satira'],
    ['bir obrazni boshqa narsa nomi bilan atash (yashirin oʻxshatish)', 'istiora']
  ],
  (q, a) => `${cap(a)} — ${q}.`
);
const F_litFixed = () =>
  pick([
    () => mc('Barmoq vazni nimaga asoslanadi?', 'misralardagi boʻgʻinlar sonining tengligiga', ['choʻziq va qisqa boʻgʻinlar almashinuviga', 'urgʻuli va urgʻusiz boʻgʻinlar almashinuviga', 'qofiyaning yoʻqligiga', 'faqat radifga'], 'Barmoq vazni boʻgʻinlar soniga asoslanadi; aruz — choʻziq va qisqa boʻgʻinlarga.'),
    () => mc('Aruz vazni nimaga asoslanadi?', 'choʻziq va qisqa boʻgʻinlarning muayyan tartibda almashinuviga', ['boʻgʻinlar sonining tengligiga', 'soʻzlar soniga', 'faqat qofiyaga', 'urgʻuli soʻzlarga'], 'Aruz — mumtoz sheʼriyat vazni, choʻziq (V) va qisqa boʻgʻinlar tizimiga tayanadi.'),
    () => mc('Adabiy turlar qaysi qatorda toʻgʻri berilgan?', 'epik, lirik, dramatik', ['roman, qissa, hikoya', 'gʻazal, ruboiy, tuyuq', 'tragediya, komediya, drama', 'doston, ertak, maqol'], 'Adabiyot uch turga boʻlinadi: epos, lirika, drama.'),
    () => mc('Gʻazal necha baytdan iborat boʻladi (anʼanaviy)?', 'kamida 5 bayt (odatda 5–12 bayt)', ['faqat 2 bayt', 'faqat 4 misra', 'faqat 3 bayt', '100 baytdan ortiq'], 'Gʻazal anʼanaviy ravishda kamida 5 baytdan iborat boʻladi.'),
    () => mc('Ruboiy necha misradan iborat?', '4 misra', ['2 misra', '6 misra', '8 misra', '14 misra'], 'Ruboiy — toʻrt misrali sheʼr (aaba yoki aaaa qofiyalanadi).')
  ])();
const LIT_POOL = [L_author, L_author, L_genre, F_term, F_litFixed];

/* ===================== 18–32 oʻqish savodxonligi (matnlar) ===================== */
type Passage = { title: string; text: string; qs: [string, string, string[], string][] };
const PASSAGES: Passage[] = [
  {
    title: 'Asalarilar',
    text: 'Asalarilar oilasida har bir arining oʻz vazifasi bor. Yosh ishchi arilar dastlab uyani tozalaydi va lichinkalarni boqadi, keyinroq esa nektar yigʻishga uchib chiqadi. Ari yaxshi gulzorni topsa, uyaga qaytib, maxsus «raqs» ijro etadi: raqsning yoʻnalishi va davomiyligi orqali boshqa arilarga gulzorgacha boʻlgan yoʻl va masofa haqida xabar beradi. Olimlarning taʼkidlashicha, asalarilar faqat asal berib qolmay, koʻplab ekinlarning changlanishini taʼminlaydi. Shu sababli bogʻ va dalalarda zaharli kimyoviy moddalarni meʼyoridan ortiq ishlatish arilar soni kamayishiga, oxir-oqibat hosilning pasayishiga olib keladi.',
    qs: [
      ['Matnga koʻra ari «raqs» orqali nimani bildiradi?', 'gulzorgacha boʻlgan yoʻl va masofani', ['uyada xavf borligini', 'asal tayyor boʻlganini', 'yangi malika tugʻilganini', 'qish yaqinlashganini'], 'Matnda: raqsning yoʻnalishi va davomiyligi yoʻl va masofa haqida xabar beradi.'],
      ['Yosh ishchi arilar dastlab qanday ish bilan band boʻladi?', 'uyani tozalaydi va lichinkalarni boqadi', ['nektar yigʻadi', 'uyani qoʻriqlaydi', 'mum ishlab chiqarmaydi', 'boshqa uyalarga uchadi'], 'Matnning ikkinchi gapida aytilgan.'],
      ['Matndagi «oxir-oqibat» soʻzi qanday maʼnoda qoʻllangan?', 'pirovardida, natijada', ['avvalo', 'tasodifan', 'shu bilan birga', 'aksincha'], '«Oxir-oqibat» — natijada, pirovardida.'],
      ['Matnning asosiy gʻoyasi qaysi javobda toʻgʻri ifodalangan?', 'asalarilar tabiat va qishloq xoʻjaligi uchun muhim, ularni asrash kerak', ['asalarilar faqat asal beradi', 'arilar raqsga tushishni yaxshi koʻradi', 'kimyoviy moddalar hosilni oshiradi', 'arilarning hammasi bir xil ish qiladi'], 'Matn arilar ahamiyati va ularni asrash zarurligini taʼkidlaydi.'],
      ['Matnga koʻra kimyoviy moddalarni meʼyoridan ortiq ishlatish nimaga olib keladi?', 'arilar kamayib, hosil pasayishiga', ['asal koʻpayishiga', 'gullar ortishiga', 'arilarning tez koʻpayishiga', 'hosil oshishiga'], 'Matnning oxirgi gapida aytilgan.']
    ]
  },
  {
    title: 'Samarqand qogʻozi',
    text: 'Oʻrta asrlarda Samarqandda tayyorlangan qogʻoz Sharq mamlakatlarida juda mashhur boʻlgan. Ustalar tut daraxtining poʻstlogʻini suvda ivitib, uzoq vaqt toʻqmoqlar bilan ezgan, soʻng hosil boʻlgan massani maxsus elakda yupqa qatlam qilib quritgan. Tayyor varaq silliq boʻlishi uchun uni tosh yoki chigʻanoq bilan ishqalab sayqal berganlar. Bunday qogʻoz pishiq, yengil va uzoq saqlanishi bilan ajralib turgan. Hozirgi kunda Samarqand yaqinidagi ustaxonada bu qadimiy hunar qayta tiklangan: sayyohlar qogʻoz tayyorlash jarayonini oʻz koʻzlari bilan kuzatishlari mumkin.',
    qs: [
      ['Matnga koʻra Samarqand qogʻozi qaysi xomashyodan tayyorlangan?', 'tut daraxtining poʻstlogʻidan', ['paxta tolasidan', 'qamishdan', 'teridan', 'yogʻoch qipigʻidan'], 'Matnda tut poʻstlogʻi deyilgan.'],
      ['Varaqqa sayqal berishdan maqsad nima boʻlgan?', 'uning silliq boʻlishi', ['uning rangli boʻlishi', 'tez qurishi', 'ogʻir boʻlishi', 'yorilib ketmasligi uchun suv purkash'], 'Matnda: «silliq boʻlishi uchun».'],
      ['Matnda Samarqand qogʻozining qaysi xususiyati tilga olinmagan?', 'arzonligi', ['pishiqligi', 'yengilligi', 'uzoq saqlanishi', 'silliqligi'], 'Matnda arzonlik haqida gap yoʻq.'],
      ['Matndagi «qayta tiklangan» birikmasining maʼnosi qaysi?', 'yoʻqolib ketgan narsa yana yoʻlga qoʻyilgan', ['butunlay unutilgan', 'birinchi marta ixtiro qilingan', 'chet elga sotilgan', 'taqiqlangan'], '«Qayta tiklanmoq» — avval boʻlib, keyin yoʻqolgan narsani yana tiklash.'],
      ['Matnga eng mos sarlavhani toping.', 'Qadimiy hunarning yangi hayoti', ['Tut daraxtini parvarishlash', 'Samarqand bozorlari', 'Sayyohlik xizmatlari narxi', 'Qogʻozning zarari'], 'Matn qadimiy qogʻoz hunari va uning tiklanishi haqida.']
    ]
  },
  {
    title: 'Uyqu va xotira',
    text: 'Koʻpchilik uyquni vaqtni behuda oʻtkazish deb hisoblaydi. Biroq tadqiqotlar buning aksini koʻrsatadi: uyqu paytida miya kun davomida olingan maʼlumotlarni saralab, muhimlarini uzoq muddatli xotiraga koʻchiradi. Imtihon oldidan tun boʻyi uxlamay dars tayyorlagan oʻquvchi ertasi kuni oʻqiganlarining katta qismini eslay olmasligi shu bilan izohlanadi. Mutaxassislar oʻsmirlarga sutkasiga sakkiz-toʻqqiz soat uxlashni, uxlashdan oldin esa telefon ekraniga uzoq tikilmaslikni maslahat beradi, chunki ekran yorugʻligi uyquni kechiktiradi.',
    qs: [
      ['Matnga koʻra uyqu paytida miya nima qiladi?', 'maʼlumotlarni saralab, muhimlarini xotiraga koʻchiradi', ['butunlay dam olib, ishlamaydi', 'yangi maʼlumotlarni oʻchirib tashlaydi', 'faqat tush koʻradi', 'tanani isitadi'], 'Matnning ikkinchi gapida aytilgan.'],
      ['«Biroq» soʻzi matnda qanday vazifani bajaradi?', 'oldingi fikrga zid fikrni bogʻlaydi', ['sababni koʻrsatadi', 'misol keltiradi', 'xulosani bildiradi', 'vaqtni bildiradi'], '«Biroq» — zidlov bogʻlovchisi: oldingi fikrga qarama-qarshi fikr kiritadi.'],
      ['Matnga koʻra oʻsmirlar sutkasiga necha soat uxlashi tavsiya etiladi?', 'sakkiz-toʻqqiz soat', ['besh-olti soat', 'oʻn ikki soat', 'toʻrt soat', 'oʻn besh soat'], 'Matnda aytilgan.'],
      ['Uxlashdan oldin telefondan uzoq foydalanmaslik nima uchun maslahat beriladi?', 'ekran yorugʻligi uyquni kechiktiradi', ['telefon tez zaryadsizlanadi', 'koʻz rangini oʻzgartiradi', 'xotira kengayadi', 'telefon qiziydi'], 'Matnning oxirgi gapida sabab koʻrsatilgan.'],
      ['Matndan qanday xulosa chiqarish mumkin?', 'yaxshi oʻqish uchun yetarli uyqu zarur', ['imtihon oldidan uxlamaslik foydali', 'uyqu — vaqtni behuda oʻtkazish', 'telefon xotirani yaxshilaydi', 'kattalar uxlamasa ham boʻladi'], 'Matn uyquning xotira uchun ahamiyatini koʻrsatadi.']
    ]
  },
  {
    title: 'Suv tejamkorligi',
    text: 'Markaziy Osiyoda suv azaldan eng qimmatli boylik hisoblangan. Ota-bobolarimiz ariq qazish, korizlar qurish va suvni navbat bilan taqsimlash orqali uni oqilona ishlatganlar. Bugungi kunda tomchilatib sugʻorish usuli keng joriy etilmoqda: bunda suv quvurlar orqali toʻgʻridan-toʻgʻri oʻsimlik ildiziga yetkaziladi. Natijada an’anaviy egat usuliga nisbatan suv ancha kam sarflanadi, tuproqning shoʻrlanishi ham kamayadi. Shunga qaramay, mutaxassislarning fikricha, eng katta tejamkorlik har bir xonadonda boshlanadi: oqib turgan jumrakni oʻz vaqtida tuzatish ham katta ahamiyatga ega.',
    qs: [
      ['Tomchilatib sugʻorishda suv qayerga yetkaziladi?', 'toʻgʻridan-toʻgʻri oʻsimlik ildiziga', ['butun dala yuzasiga', 'egatlar boʻylab', 'barglar ustiga', 'koriz orqali hovuzga'], 'Matnda aytilgan.'],
      ['Matnga koʻra tomchilatib sugʻorishning afzalliklari qaysilar?', 'suv kam sarflanadi va shoʻrlanish kamayadi', ['hosil kamayadi, suv koʻp sarflanadi', 'quvurlar kerak boʻlmaydi', 'ariq qazish osonlashadi', 'tuproq shoʻrlanadi'], 'Matnning toʻrtinchi gapida aytilgan.'],
      ['«Shunga qaramay» birikmasi matnda qanday maʼno ifodalaydi?', 'oldingi fikrga qaramasdan boshqa jihatni taʼkidlaydi', ['sababni bildiradi', 'vaqt ketma-ketligini bildiradi', 'misol keltiradi', 'shartni bildiradi'], '«Shunga qaramay» — toʻsiqsizlik maʼnosi: oldingi fikrdan qatʼi nazar.'],
      ['Matnga koʻra eng katta tejamkorlik qayerdan boshlanadi?', 'har bir xonadondan', ['katta zavodlardan', 'faqat dalalardan', 'davlat idoralaridan', 'chet eldan'], 'Matnning oxirgi gapida aytilgan.'],
      ['Ota-bobolarimiz suvni qanday usullar bilan oqilona ishlatganlar?', 'ariq qazish, koriz qurish va navbat bilan taqsimlash', ['tomchilatib sugʻorish', 'suvni sotish', 'quvurlar yotqizish', 'hovuzlarni berkitish'], 'Matnning ikkinchi gapida aytilgan.']
    ]
  },
  {
    title: 'Kitob oʻqish',
    text: 'Soʻnggi yillarda oʻtkazilgan soʻrovnomalar yoshlarning kitob oʻqishga sarflaydigan vaqti kamayib borayotganini koʻrsatmoqda. Bunga ijtimoiy tarmoqlarda qisqa videolarni tomosha qilish odati sabab boʻlayotgani aytiladi. Holbuki, muntazam kitob oʻqish soʻz boyligini oshiradi, diqqatni bir joyga jamlash koʻnikmasini mustahkamlaydi va boshqa odamlarning his-tuygʻularini tushunishga yordam beradi. Psixologlar kuniga atigi yigirma daqiqa oʻqishdan boshlashni maslahat beradi: odat shakllangach, oʻqish vaqti oʻz-oʻzidan uzayadi.',
    qs: [
      ['Matnga koʻra yoshlarning kitob oʻqish vaqti kamayishiga nima sabab boʻlmoqda?', 'ijtimoiy tarmoqlarda qisqa videolarni koʻrish odati', ['kitoblarning qimmatlashuvi', 'kutubxonalarning yopilishi', 'darslarning koʻpligi', 'sport bilan shugʻullanish'], 'Matnning ikkinchi gapida aytilgan.'],
      ['«Holbuki» soʻzi matnda qanday vazifani bajaradi?', 'oldingi holatga qarshi muhim fikrni kiritadi', ['sababni koʻrsatadi', 'sanashni bildiradi', 'vaqtni bildiradi', 'shartni bildiradi'], '«Holbuki» — zidlov maʼnosini bildiradi.'],
      ['Matnda kitob oʻqishning qaysi foydasi tilga olinmagan?', 'koʻrish qobiliyatini yaxshilashi', ['soʻz boyligini oshirishi', 'diqqatni jamlashga yordam berishi', 'boshqalarning his-tuygʻularini tushunishga yordam berishi', 'hammasi tilga olingan'], 'Koʻrish qobiliyati haqida matnda gap yoʻq.'],
      ['Psixologlar kitob oʻqishni qanday boshlashni maslahat beradi?', 'kuniga yigirma daqiqadan', ['kuniga besh soatdan', 'haftada bir marta', 'faqat taʼtilda', 'bir kunda bitta kitobdan'], 'Matnning oxirgi gapida aytilgan.'],
      ['Matnning asosiy maqsadi nima?', 'kitob oʻqishning foydasini koʻrsatib, unga undash', ['ijtimoiy tarmoqlarni reklama qilish', 'soʻrovnoma natijalarini sanab berish', 'psixologlarni tanqid qilish', 'videolar tayyorlashni oʻrgatish'], 'Matn kitob oʻqish foydasi va uni odat qilishga undaydi.']
    ]
  }
];
/** parchalar asl matndan (mualliflik huquqi muddati oʻtgan asarlar) — ziyouz.com nashrlari asosida */
const LIT_PASSAGES: Passage[] = [
  {
    title: 'Abdulla Qodiriy. «Oʻtkan kunlar» romanidan',
    text: '1264-inchi hijriy, dalv oyining oʻn yettinchisi, qishki kunlarning biri, quyosh botqan, tevarakdan shom azoni eshitiladir...\nDarbozasi sharqi-janubiyga qaratib qurilgʻan bu dongʻdor saroyni Toshkand, Samarqand va Buxoro savdogarlari egallaganlar, saroydagi bir-ikki hujrani istisno qilish bilan boshqalari musofirlar ila toʻla. <…> Saroyning toʻrida boshqalargʻa qaragʻanda koʻrkamrak bir hujra, anovi hujralarga kiygiz toʻshalgani holda bu hujrada qip-qizil gilam, uttalarda boʻz koʻrpalar koʻrilgan boʻlsa, munda ipak va adras koʻrpalar, narigilarda qora charogʻ sasigʻanda, bu hujrada shamʼ yonadir <…>. Qandogʻdir bir xayol ichida oʻlturgʻuchi bu yigit Toshkandning mashhur aʼyonlaridan boʻlgʻan Yusufbek hojining oʻgʻli — Otabek.',
    qs: [
      ['Parchada tasvirlangan voqea yilning qaysi faslida boʻlib oʻtadi?', 'qishda', ['bahorda', 'yozda', 'kuzda', 'fasl aytilmagan'], 'Matnda: «dalv oyining oʻn yettinchisi, qishki kunlarning biri».'],
      ['Saroyni kimlar egallagan?', 'Toshkand, Samarqand va Buxoro savdogarlari', ['Margʻilon hunarmandlari', 'xon askarlari', 'madrasa talabalari', 'Qoʻqon amaldorlari'], 'Matnning ikkinchi gapida aytilgan.'],
      ['Otabekning hujrasi boshqa hujralardan nimasi bilan farq qiladi?', 'qizil gilam, ipak va adras koʻrpalar, yonib turgan shamʼi bilan', ['kichikligi va qorongʻiligi bilan', 'kiygiz toʻshalgani bilan', 'eshigi yoʻqligi bilan', 'boʻz koʻrpalari bilan'], 'Muallif Otabek hujrasini boshqa hujralarga qarama-qarshi qoʻyib tasvirlaydi.'],
      ['Matndagi «aʼyon» soʻzining maʼnosi qaysi?', 'davlatning obroʻli, nufuzli kishisi', ['savdogar', 'musofir', 'hunarmand', 'mehmonxona egasi'], 'Aʼyon — oʻtmishda xon saroyiga yaqin, obroʻli kishi (zodagon).'],
      ['Parchada hujralar tasvirida qaysi usuldan foydalanilgan?', 'qiyoslash (qarama-qarshi qoʻyish)', ['jonlantirish', 'mubolagʻa', 'savol-javob', 'ichki monolog'], '«Anovi hujralarga kiygiz… bu hujrada qip-qizil gilam» — qiyoslab, zidlab tasvirlash.']
    ]
  },
  {
    title: 'Abdulla Qodiriy. «Oʻtkan kunlar» romanidan',
    text: 'Kechki soat beshlarda qutidorning havlisi toʻrt koʻz bilan kuyav kelishini kutadir. <…> Nihoyat, soat besh yarimlarda kuyav keldi. Yigirma-oʻttiz chogʻliq yosh yigitlar — Rahmatning oʻrtoqlari, ular orasida Otabek — kuyav koʻrindi <…>. Oshlarini yeb boʻlsalar ham joʻrttaga kuyav koʻrish uchun oʻlturgʻan mahalla kishilari bir-birlarini turtishib: «Tuzuk-tuzuk, kuyavlikka arzigundek, chakki chakkiga tushmapti, olmayu-anor» deyishdilar. Tomda kuyav kutib oʻlturgʻan xotinlar ichidan Oftob oyimning egachisi oshiqib singlisi yonigʻa tushdi-da: «Oftob, darrav isiriq hozirla, kuyavingni yomon koʻzdan oʻzi asrasin!» dedi. Qutidor eshik ostida qoʻl qovishtirib mehmonlarni kutib oladir, yer ostidan kuyaviga koʻz qirini tashlab, kishiga sezdirmay oʻzicha kulimsirab qoʻyadir. <…> Koʻb tortishqandan soʻng quyidagʻi mablagʻlar mahr qilib belgulanadirlar: uch yuz oltin pul, mundan keyin olib berish vaʼdasi bilan Margʻilondan oʻradek bir havli, sogʻish uchun sigir, asbobi roʻzgor... Bunga Otabek ham oʻz rizoligʻini bildiradir.',
    qs: [
      ['Mahalla kishilari oshni yeb boʻlgach ham nima uchun oʻtirishgan?', 'kuyovni koʻrish uchun', ['domlani kutish uchun', 'mahr haqida tortishish uchun', 'Oftob oyimga yordam berish uchun', 'qorongʻi tushishini kutish uchun'], 'Matnda: «joʻrttaga kuyav koʻrish uchun oʻlturgʻan mahalla kishilari».'],
      ['«Olmayu-anor» iborasi bilan mahalla ahli nimani nazarda tutgan?', 'kuyov kelinga munosib ekanini', ['kuyovning boyligini', 'toʻy dasturxonining toʻkinligini', 'bogʻning hosildorligini', 'kuyovning kech qolganini'], 'Mahalla ahli kelin-kuyovni bir-biriga munosib deb baholaydi.'],
      ['Oftob oyimning egachisi nima qilishni buyurdi?', 'kuyovni yomon koʻzdan asrash uchun isiriq hozirlashni', ['dasturxon yozishni', 'mehmonlarni kutib olishni', 'palov damlashni', 'domlani chaqirishni'], 'Matnda: «darrav isiriq hozirla…».'],
      ['Qutidorning kuyoviga munosabati qanday tasvirlangan?', 'kishiga sezdirmay koʻz qirini tashlab, mamnun kulimsiraydi', ['kuyovni ochiq-oydin maqtaydi', 'kuyovdan norozi boʻladi', 'kuyovga eʼtibor bermaydi', 'mehmonlar bilan janjallashadi'], 'Matnda: «yer ostidan kuyaviga koʻz qirini tashlab… kulimsirab qoʻyadir».'],
      ['Mahr sifatida nimalar belgilangan?', 'uch yuz oltin pul, Margʻilondan hovli, sigir va roʻzgʻor buyumlari', ['ming oltin va ot', 'faqat hovli', 'Toshkanddan doʻkon', 'ipak matolar va gilam'], 'Matnning oxirida sanab oʻtilgan.']
    ]
  },
  {
    title: 'Mahmudxoʻja Behbudiy. «Padarkush» dramasidan',
    text: 'DOMULLA. Xoʻb, xoʻb, boyvachcha katta boʻlubdur, Xudo umr bersin, usuli jadida maktabigami oʻqiydur, yoinki eski maktabga?\nBOY. Ikkisiga ham bormaydur.\nDOMULLA. Oʻz hovlingizda oʻqutaturgonsiz?\nBOY. Yoʻq, yoʻq. Men oʻgʻlumni oʻqutmoqgʻa oʻylaganim yoʻq.\nDOMULLA. Ajoyib, sabab nedurki, oʻqutmaysuz? Vaholanki, oʻqumoq qarz va ilm sababi izzati dunyo va sharofati oxiratdur...\nBOY. Mani xayolimgʻa dunyoning sababi, izzati — boylik. Oxiratga boʻlsa, Xudoning qilgan taqdiri boʻlur. Chunonchi, biz koʻramizki, odamlar boyni mullodan ziyoda izzat qiladurlar.',
    qs: [
      ['Boy oʻgʻlini qaysi maktabda oʻqitadi?', 'hech qaysi maktabda oʻqitmaydi', ['usuli jadid maktabida', 'eski maktabda', 'uyda oʻqitadi', 'madrasada'], 'Boy: «Ikkisiga ham bormaydur… oʻqutmoqgʻa oʻylaganim yoʻq».'],
      ['Boyning fikricha, dunyoda izzat-hurmatning sababi nima?', 'boylik', ['ilm', 'mehnat', 'odob', 'kasb-hunar'], 'Boy: «dunyoning sababi, izzati — boylik».'],
      ['Domulla oʻqish haqida qanday fikr bildiradi?', 'oʻqish burch, ilm dunyo izzati va oxirat sharafiga sabab', ['oʻqish faqat boylarga kerak', 'ilm boylikdan keyin turadi', 'oʻqish vaqtni behuda oʻtkazish', 'faqat eski maktab foydali'], 'Domulla: «oʻqumoq qarz va ilm sababi izzati dunyo va sharofati oxiratdur».'],
      ['«Usuli jadida maktabi» deganda nima nazarda tutilgan?', 'yangi usuldagi (jadid) maktab', ['diniy madrasa', 'harbiy maktab', 'chet eldagi universitet', 'qizlar maktabi'], 'Usuli jadid — jadidlar ochgan yangi usuldagi maktablar.'],
      ['Parcha qaysi adabiy turga mansub?', 'dramatik tur', ['epik tur', 'lirik tur', 'xalq ogʻzaki ijodi', 'publitsistika'], 'Asar personajlar nutqi (dialog) va remarkalar asosida qurilgan — drama.']
    ]
  }
];
function readingBlock(): Q[] {
  // 2 ta asl badiiy parcha + 1 ta ilmiy-ommabop matn
  const ps = [...shuffle(LIT_PASSAGES).slice(0, 2), pick(PASSAGES)];
  return ps.flatMap((p, k) =>
    shuffle(p.qs).map(([q, a, w, e]) => mc(`${18 + k * 5}–${22 + k * 5}-topshiriqlar uchun matn («${p.title}»):\n\n${p.text}\n\n${q}`, a, w, e))
  );
}

/* ---------------------------- 33–35 matching ---------------------------- */
function langMatch(): Q[] {
  const t = R(0, 2);
  if (t === 0) {
    const rows = shuffle(WORKS.filter((w) => !['Alisher Navoiy', 'Zahiriddin Muhammad Bobur'].includes(w[1])));
    const used = new Set<string>();
    const uniq = rows.filter((w) => (used.has(w[1]) ? false : (used.add(w[1]), true)));
    const asks = uniq.slice(0, 3);
    return matchBlock('', '33–35-topshiriqlar uchun umumiy shart: asarlarni ularning mualliflari bilan moslashtiring.', asks.map(([w, a]) => [`«${w}» asarining muallifi kim?`, a, `«${w}» — ${a}.`] as [string, string, string]), uniq.slice(3).map((w) => w[1]));
  }
  if (t === 1) {
    const rows: [string, string][] = [['tashbeh', 'oʻxshatish'], ['tashxis', 'jonlantirish'], ['tazod', 'zidlash'], ['mubolagʻa', 'oshirib tasvirlash'], ['radif', 'qofiyadan keyin takrorlanuvchi soʻz'], ['istiora', 'yashirin oʻxshatish']];
    const asks = shuffle(rows).slice(0, 3);
    return matchBlock('', '33–35-topshiriqlar uchun umumiy shart: adabiy atamalarni ularning mazmuni bilan moslashtiring.', asks.map(([a, b]) => [`«${a}» nimani bildiradi?`, b, `${cap(a)} — ${b}.`] as [string, string, string]), rows.map((r) => r[1]));
  }
  const rows: [string, string][] = [['maktabga', 'joʻnalish kelishigi'], ['maktabda', 'oʻrin-payt kelishigi'], ['maktabdan', 'chiqish kelishigi'], ['maktabni', 'tushum kelishigi'], ['maktabning', 'qaratqich kelishigi'], ['maktab', 'bosh kelishik']];
  const asks = shuffle(rows).slice(0, 3);
  return matchBlock('', '33–35-topshiriqlar uchun umumiy shart: soʻzlarni ular turgan kelishik bilan moslashtiring.', asks.map(([a, b]) => [`«${a}» qaysi kelishikda?`, b, `«${a}» — ${b}.`] as [string, string, string]), rows.map((r) => r[1]));
}

/* ---------------------- 36–44 lingvistik va badiiy tahlil ---------------------- */
type Rec = [string, string, string, string, string];
/** [shart, a-savol, a-javob, b-savol, b-javob] — «A / B» muqobil javoblar */
const SUBJ: Rec[] = [
  ['Gap: «Ukam kecha kutubxonadan yangi kitob oldi.»', 'a) Gapning egasini yozing.', 'ukam', 'b) Kesim qaysi soʻz turkumi bilan ifodalangan?', 'feʼl'],
  ['Gap: «Bahorda bogʻimizdagi oʻriklar gulladi.»', 'a) Gapning egasini yozing.', 'oʻriklar', 'b) Kesim qaysi soʻz turkumi bilan ifodalangan?', 'feʼl'],
  ['Gap: «Opam — shifokor.»', 'a) Gapning egasini yozing.', 'opam', 'b) Kesim qaysi soʻz turkumi bilan ifodalangan?', 'ot'],
  ['Gap: «Bu yilgi hosil moʻl.»', 'a) Gapning egasini yozing.', 'hosil', 'b) Kesim qaysi soʻz turkumi bilan ifodalangan?', 'sifat'],
  ['Gap: «Oʻquvchilar maktabdan quvonib qaytishdi.»', 'a) Chiqish kelishigidagi soʻzni yozing.', 'maktabdan', 'b) Bu soʻz qaysi gap boʻlagi vazifasida kelgan?', 'hol / oʻrin holi'],
  ['Gap: «Dadam bozordan yangi velosiped olib keldi.»', 'a) Belgisiz tushum kelishigidagi toʻldiruvchini yozing.', 'velosiped', 'b) «Yangi» soʻzi qaysi gap boʻlagi?', 'aniqlovchi'],
  ['Gap: «Biz ertaga togʻga sayohatga boramiz.»', 'a) Gapning egasini yozing.', 'biz', 'b) Ega qaysi soʻz turkumi bilan ifodalangan?', 'olmosh / kishilik olmoshi']
];
const MORPH: Rec[] = [
  ['Soʻz: «kitobxonlarimizga»', 'a) Soʻzning oʻzagini yozing.', 'kitob', 'b) Soʻzda nechta qoʻshimcha bor?', '4'],
  ['Soʻz: «paxtakorlarning»', 'a) Soʻzning oʻzagini yozing.', 'paxta', 'b) Soʻzda nechta qoʻshimcha bor?', '3'],
  ['Soʻz: «ishchilarimiz»', 'a) Soʻzning oʻzagini yozing.', 'ish', 'b) Soʻzda nechta qoʻshimcha bor?', '3'],
  ['Soʻz: «gulzorlarda»', 'a) Soʻzning oʻzagini yozing.', 'gul', 'b) Soʻzda nechta qoʻshimcha bor?', '3'],
  ['Soʻz: «kitobchalar»', 'a) Soʻzning oʻzagini yozing.', 'kitob', 'b) Soʻzda nechta qoʻshimcha bor?', '2'],
  ['Soʻz: «yozuvchimizning»', 'a) Soʻzning oʻzagini yozing.', 'yoz', 'b) Soʻzda nechta qoʻshimcha bor?', '4']
];
const ART: Rec[] = [
  ['Gap: «Qizning yuzi oydek nur sochardi.»', 'a) Gapda qoʻllangan badiiy sanʼat nomini yozing.', 'tashbeh / oʻxshatish', 'b) Oʻxshatish vositasi boʻlib kelgan qoʻshimchani yozing.', '-dek / dek'],
  ['Gap: «Shamol derazani taqillatib, ichkariga moʻralardi.»', 'a) Gapda qoʻllangan badiiy sanʼat nomini yozing.', 'tashxis / jonlantirish', 'b) Jonlantirilgan narsani yozing.', 'shamol'],
  ['Gap: «Yigitning ovozi yetti togʻdan oshib eshitildi.»', 'a) Gapda qoʻllangan badiiy sanʼat nomini yozing.', 'mubolagʻa', 'b) Ramziy maʼnoda kelgan sonni yozing.', 'yetti'],
  ['Maqol: «Yaxshidan ot qoladi, yomondan dod qoladi.»', 'a) Maqolda qoʻllangan badiiy sanʼat nomini yozing.', 'tazod', 'b) «Yaxshi» soʻzining maqoldagi antonimini yozing.', 'yomon'],
  ['Gap: «Daryo jimgina oqib, oʻz dardini toshlarga soʻzlardi.»', 'a) Gapda qoʻllangan badiiy sanʼat nomini yozing.', 'tashxis / jonlantirish', 'b) Jonlantirilgan narsani yozing.', 'daryo']
];
const COMP: Rec[] = [
  ['Gap: «Yomgʻir yogʻdi, lekin havo isimadi.»', 'a) Qoʻshma gapning turini yozing.', 'bogʻlangan / bogʻlangan qoʻshma gap', 'b) Qismlarni bogʻlagan bogʻlovchini yozing.', 'lekin'],
  ['Gap: «Agar vaqtim boʻlsa, sizga albatta qoʻngʻiroq qilaman.»', 'a) Qoʻshma gapning turini yozing.', 'ergashgan / ergash gapli / ergash gapli qoʻshma gap', 'b) Ergash gapni bosh gapga bogʻlagan soʻzni yozing.', 'agar'],
  ['Gap: «Quyosh chiqdi va qor eriy boshladi.»', 'a) Qoʻshma gapning turini yozing.', 'bogʻlangan / bogʻlangan qoʻshma gap', 'b) Qismlarni bogʻlagan bogʻlovchini yozing.', 'va'],
  ['Gap: «Shamol turdi, chang koʻtarildi.»', 'a) Qoʻshma gapning turini yozing.', 'bogʻlovchisiz / bogʻlovchisiz qoʻshma gap', 'b) Gap nechta sodda gapdan tuzilgan?', '2']
];
const rec = (r: Rec): Q => openN(r[0], [[r[1], r[2]], [r[3], r[4]]], `${r[0]} Javob: a) ${r[2]}; b) ${r[4]}.`);
function openBlock(): Q[] {
  // 9 tasks: 3 sintaktik, 2 morfologik, 2 badiiy sanʼat, 2 qoʻshma gap
  return [...shuffle(SUBJ).slice(0, 3), ...shuffle(MORPH).slice(0, 2), ...shuffle(ART).slice(0, 2), ...shuffle(COMP).slice(0, 2)].map(rec);
}

/* ------------------------------ 45 yozma savodxonlik ------------------------------ */
const ESSAY_TOPICS: string[] = [
  'Sinfdoshingiz kunining katta qismini telefonda qisqa videolar koʻrish bilan oʻtkazadi va kitob oʻqishni «eskicha odat» deb hisoblaydi. Uning fikriga munosabat bildiring.',
  'Mahallangizdagi ariqqa chiqindi tashlanayotganini koʻrdingiz. Bu holatga baho bering va muammoni hal qilish yoʻllarini taklif eting.',
  'Doʻstingiz kelajakda qaysi kasbni tanlashni bilmay ikkilanmoqda: ota-onasi bir kasbni, oʻzi esa boshqasini xohlaydi. Unga qanday maslahat bergan boʻlardingiz?',
  'Ayrim yoshlar «Bilim olish uchun internet yetarli, ustozning keragi yoʻq» deb hisoblaydi. Bu fikrga qoʻshilasizmi? Fikringizni dalillang.',
  'Ukangiz sport bilan shugʻullanishni vaqtni behuda sarflash deb biladi. Sogʻlom turmush tarzining ahamiyati haqida unga fikringizni bildiring.',
  'Keksa qoʻshningiz yolgʻiz yashaydi va unga yordam kerak. Yoshlarning keksalarga munosabati haqida fikr yuriting.',
  '«Ona tilini bilish — har bir insonning burchi» degan fikrga munosabat bildiring.'
];
const writing = (): Q => ({
  text: `Yozma savodxonlik (insho). Quyidagi vaziyatga baho bering va shu vaziyat yuzasidan 150–200 soʻzdan iborat matn yozing. Matnda kirish, asosiy qism va xulosa boʻlsin, fikringizni dalillang.\n\nVaziyat: ${pick(ESSAY_TOPICS)}`,
  explain: 'Insho sunʼiy intellekt (SI) tomonidan 4 mezon boʻyicha baholanadi: mazmun, tuzilish, til, imlo (har biri 2,5 balldan, jami 10 ball).',
  essay: true
});

/* -------------------------------- assemble -------------------------------- */
function distinct(pool: (() => Q)[], n: number, seen: Set<string>): Q[] {
  const out: Q[] = [];
  for (let tries = 0; out.length < n && tries < 300; tries++) {
    try {
      const q = tryGen(pool[R(0, pool.length - 1)]);
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

/** A fresh 45-task «Ona tili va adabiyot» variant (client side only — random). */
export function buildUzbExam(): G11Question[] {
  const seen = new Set<string>();
  const list: Q[] = [
    ...distinct(SPELL_POOL, 2, seen),
    ...distinct(LEX_POOL, 2, seen),
    ...distinct(STYLE_POOL, 2, seen),
    ...distinct(GRAM_POOL, 5, seen),
    tryGen(F_punct),
    ...distinct(LIT_POOL, 5, seen),
    ...readingBlock(),
    ...tryBlock(langMatch),
    ...openBlock(),
    writing()
  ];
  return toQuestions(list, 'g11-uzb');
}
