import type { G11Question } from '../diagnostic';
import { R, pick, shuffle, mc, openN, tryGen, tryBlock, toQuestions, matchBlock, type Q } from './gen';

/**
 * Ana tili hám ádebiyat (qaraqalpaq tili) — Milliy sertifikat test generatorı (specifikaciya): 45 tapsırma, 180 minut.
 * 1–2 imla, 3–4 sóz baylıǵı, 5–6 stilistika, 7–11 grammatika, 12 punktuaciya, 13–17 ádebiyat (J-1);
 * 18–32 oqıw sawatxanlıǵı (3 tekst × 5 soraw); 33–35 sáykeslendiriw (J-2); 36–44 lingvistikalıq hám kórkem analiz (A-1);
 * 45 jazba sawatxanlıq — shıǵarma (A-2, AI tekseredi). Variantlar sanı az (minimal bank).
 */
export const KAA_EXAM_MINUTES = 180;

const pickFact = (title: string, rows: [string, string][], explain: (q: string, a: string) => string, extra: string[] = []) => () => {
  const [q, a] = pick(rows);
  const others = Array.from(new Set([...rows.map((r) => r[1]), ...extra].filter((x) => x !== a)));
  return mc(title.replace('{q}', q), a, others, explain(q, a));
};
const fixed = (rows: [string, string, string[], string][]) => () => {
  const [q, a, w, e] = pick(rows);
  return mc(q, a, w, e);
};
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* ============================== 1–2 imla ============================== */
/** [durıs, qáte] — únleslik nızamı (singarmonizm) */
const HARM: [string, string][] = [['kitaplar', 'kitapler'], ['balalar', 'balaler'], ['úyler', 'úylar'], ['mektepler', 'mekteplar'], ['qızlar', 'qızler'], ['kólder', 'kóllar'], ['dápterler', 'dápterlar'], ['taslar', 'tasler']];
const S_harm = () => {
  const s = shuffle(HARM).slice(0, 4);
  return mc('Qaysı sózde qosımta únleslik nızamına sáykes durıs jalǵanǵan?', s[0][0], s.slice(1).map((p) => p[1]), `Juwan buwınlı sózlerge -lar/-dar/-tar, jińishke buwınlı sózlerge -ler/-der/-ter jalǵanadı: ${s.map((p) => p[0]).join(', ')}.`);
};
const S_rule = fixed([
  ['Menshikli atlıqlar qalay jazıladı?', 'bas hárip penen', ['kishi hárip penen', 'defis penen', 'tırnaqshasız hám kishi hárip penen', 'bólek-bólek'], 'Adam atları, jer-suw atları sıyaqlı menshikli atlıqlar bas hárip penen jazıladı.'],
  ['Kitap, gazeta hám ádebiy shıǵarmalardıń atları qalay jazıladı?', 'bas hárip penen hám tırnaqsha ishinde', ['kishi hárip penen', 'tırnaqshasız kishi hárip penen', 'defis penen', 'qawsırma ishinde'], 'Mısalı: «Aqmaq patsha» dástanı.'],
  ['Juplıq sózler qalay jazıladı?', 'defis penen (ata-ana, úlken-kishi)', ['qosıp (ataana)', 'bólek (ata ana)', 'útir menen (ata, ana)', 'tırnaqsha ishinde'], 'Juplıq hám qaytalanǵan sózler defis penen jazıladı.']
]);
const SPELL_POOL = [S_harm, S_harm, S_rule];

/* ============================== 3–4 sóz baylıǵı ============================== */
const F_lex = pickFact(
  '«{q}» sózleri qanday leksikalıq toparǵa kiredi?',
  [
    ['batır – qaharman', 'sinonimler'], ['sulıw – gózzal', 'sinonimler'], ['aqıllı – dana', 'sinonimler'],
    ['ıssı – suwıq', 'antonimler'], ['dos – dushpan', 'antonimler'], ['uzın – qısqa', 'antonimler'],
    ['at (haywan) – at (adamnıń atı)', 'omonimler'], ['jaz (jıl máwsimi) – jaz (jazıw)', 'omonimler']
  ],
  (q, a) => `«${q}» — ${a}.`,
  ['terminler']
);
const F_lexFixed = fixed([
  ['Qaysı sóz termin?', 'fotosintez', ['sulıw', 'juwırıw', 'tátli', 'ana'], 'Termin — ilim yamasa kásipke tiyisli anıq túsinikti bildiretuǵın sóz.'],
  ['Qaysı sóz basqa tilden ózlestirilgen?', 'kompyuter', ['ana', 'suw', 'jer', 'qol'], '«Kompyuter» — basqa tilden kirgen sóz.'],
  ['Qaysı sóz kóp mánili?', 'kóz (adamnıń kózi, bulaqtıń kózi)', ['fotosintez', 'gramm', 'Nókis', 'kilometr'], 'Kóp mánili sózdiń bir neshe baylanıslı mánisi boladı.']
]);
const LEX = [F_lex, F_lex, F_lexFixed];

/* ============================== 5–6 stilistika ============================== */
const F_style = pickFact(
  'Tómendegi tekst qaysı stilge tiyisli?\n«{q}»',
  [
    ['Erteń saat segizde bekette kútemen, keshikpe, jaqsı ma?', 'sóylesiw stili'],
    ['Arza. Meni 1-sentyabrden baslap jumısqa qabıl etiwińizdi soraymán.', 'rásmiy is qaǵazları stili'],
    ['Fotosintez — jasıl ósimliklerde jaqtılıq energiyası esabınan organikalıq zatlardıń payda bolıw procesi.', 'ilimiy stil'],
    ['Suwdı únemlew — hámmemizdiń wazıypamız! Búgin saqlanǵan hár tamshı — erteńgi kúnniń kepili.', 'publicistikalıq stil'],
    ['Gúz kelip, baǵlar altın túske boyaldı, samal sarı japıraqlardı jerge aqırın tóseydi.', 'kórkem ádebiy stil']
  ],
  (q, a) => `Tekst — ${a}.`
);
const STYLE = [F_style, F_style];

/* ============================== 7–11 grammatika ============================== */
const F_pos = pickFact(
  '«{q}» sózi qaysı sóz shaqabına kiredi?',
  [['kitap', 'atlıq'], ['báhár', 'atlıq'], ['sulıw', 'kelbetlik'], ['qızıl', 'kelbetlik'], ['juwırıw', 'feyil'], ['oqıw', 'feyil'], ['besinshi', 'sanlıq'], ['olar', 'almasıq'], ['tez', 'ráwish'], ['ushın', 'tirkewish'], ['biraq', 'dáneker'], ['ǵana', 'janapay'], ['áttegene', 'tańlaq']],
  (q, a) => `«${q}» — ${a}.`
);
const F_case = pickFact(
  '«{q}» sózi qaysı seplikte turıptı?',
  [['mektepke', 'barıs seplik'], ['mektepte', 'orın seplik'], ['mektepten', 'shıǵıs seplik'], ['mektepti', 'tabıs seplik'], ['mekteptiń', 'iyelik seplik'], ['úyge', 'barıs seplik'], ['kitaptı', 'tabıs seplik']],
  (q, a) => `«${q}» — ${a}.`,
  ['atawısh seplik']
);
const F_num = pickFact(
  '«{q}» sanlıǵı qaysı túrge kiredi?',
  [['besinshi', 'tártip sanlıq'], ['besew', 'jıynaqlaw sanlıq'], ['bes-altı', 'shamalaw sanlıq'], ['onınshı', 'tártip sanlıq'], ['úshew', 'jıynaqlaw sanlıq']],
  (q, a) => `«${q}» — ${a}.`,
  ['bólshek sanlıq', 'esaplıq sanlıq']
);
const F_sent = pickFact(
  '«{q}» gápi mazmunına qaray qanday gáp?',
  [['Erteń kitapxanaǵa barasań ba?', 'soraw gáp'], ['Bul kitaptı kim jazǵan?', 'soraw gáp'], ['Esikti jabıp qoyıń.', 'buyrıq gáp'], ['Sabaqqa keshikpe.', 'buyrıq gáp'], ['Búgin hawa jıllı.', 'xabar gáp'], ['Inim mektepten qayttı.', 'xabar gáp'], ['Qanday ájayıp kún!', 'tańlaq gáp']],
  (q, a) => `«${q}» — ${a}.`
);
const GRAM = [F_pos, F_pos, F_case, F_num, F_sent];

/* ============================== 12 punktuaciya ============================== */
const PUNCT: [string, string[], string][] = [
  ['Dostım, erteń sózsiz kel.', ['Dostım erteń, sózsiz kel.', 'Dostım erteń sózsiz, kel.', 'Dostım: erteń sózsiz kel.'], 'Qaratpa sóz útir menen ajıratıladı.'],
  ['Ókinishke oray, ol jıynalısqa kele almadı.', ['Ókinishke oray ol, jıynalısqa kele almadı.', 'Ókinishke oray ol jıynalısqa, kele almadı.', 'Ókinishke oray: ol jıynalısqa kele almadı.'], 'Kirispe sózler útir menen ajıratıladı.'],
  ['Bazardan alma, almurt, júzim hám anar aldıq.', ['Bazardan alma almurt, júzim, hám anar aldıq.', 'Bazardan, alma, almurt, júzim hám anar aldıq.', 'Bazardan alma, almurt, júzim, hám, anar aldıq.'], 'Birgelkili aǵzalar arasına útir qoyıladı; «hám» dánekeri aldınan útir qoyılmaydı.'],
  ['Nókis — Qaraqalpaqstannıń paytaxtı.', ['Nókis, Qaraqalpaqstannıń paytaxtı.', 'Nókis: Qaraqalpaqstannıń paytaxtı.', 'Nókis Qaraqalpaqstannıń — paytaxtı.'], 'Baslawısh hám atlıqtan bolǵan bayanlawısh arasına sızıqsha qoyıladı.']
];
const F_punct = () => {
  const [c, w, e] = pick(PUNCT);
  return mc('Qaysı gápte irkilis belgileri durıs qoyılǵan?', c, w, e);
};

/* ============================== 13–17 ádebiyat ============================== */
const WORKS: [string, string, string][] = [
  ['Ájiniyaz benen Qız Meńeshtiń aytısı', 'Ájiniyaz Qosıbay ulı', 'aytıs'],
  ['Aqmaq patsha', 'Berdaq Ǵarǵabay ulı', 'dástan'],
  ['Shejire', 'Berdaq Ǵarǵabay ulı', 'tariyxıy dástan'],
  ['Qaraqalpaq dástanı', 'T. Qayıpbergenov', 'roman-trilogiya'],
  ['Ájiniyaz', 'K. Sultanov', 'roman'],
  ['Watan topıraǵı', 'I. Yusupov', 'qıssa'],
  ['Jámiyla', 'Sh. Aytmatov', 'povest']
];
const L_author = () => {
  const [w, a] = pick(WORKS);
  return mc(`«${w}» shıǵarmasınıń avtorı kim?`, a, [...WORKS.map((x) => x[1]), 'Zulfiya', 'Ájiniyaz Qosıbay ulı'].filter((x) => x !== a), `«${w}» — ${a} shıǵarması.`);
};
const L_genre = () => {
  const [w, a, g] = pick(WORKS.filter((x) => ['dástan', 'roman', 'qıssa', 'povest', 'aytıs'].includes(x[2])));
  return mc(`${a} — «${w}». Bul shıǵarma qaysı janrǵa kiredi?`, g, ['dástan', 'roman', 'qıssa', 'povest', 'aytıs', 'drama', 'ǵázzel'], `«${w}» — ${g}.`);
};
const F_term = pickFact(
  'Qaysı ádebiy termin táriyiplengen: {q}?',
  [
    ['bir zattı ekinshi zatqa salıstırıw («ayday júz»)', 'teńew'],
    ['jansız zatlarǵa tiri jan iyesiniń qásiyetlerin beriw', 'jandandırıw'],
    ['waqıya yamasa belgini asıra súwretlew', 'giperbola'],
    ['zattıń kórkem anıqlawıshı («altın gúz»)', 'epitet'],
    ['jasırın salıstırıw, bir nárseni ekinshisiniń atı menen ataw', 'metafora']
  ],
  (q, a) => `${cap(a)} — ${q}.`
);
const F_litFixed = fixed([
  ['Ádebiy túrler qaysı qatarda durıs berilgen?', 'epika, lirika, drama', ['roman, qıssa, gúrrińler', 'dástan, ertek, naqıl', 'tragediya, komediya, drama', 'ǵázzel, rubayı, muxammes'], 'Ádebiyat úsh túrge bólinedi: epika, lirika, drama.'],
  ['«Qırıq qız» qanday shıǵarma?', 'qaraqalpaq xalıq dástanı', ['roman', 'drama', 'gúrriń', 'ǵázzel'], '«Qırıq qız» — qaraqalpaq xalqınıń qaharmanlıq dástanı.'],
  ['Berdaq Ǵarǵabay ulı qaysı ásirde jasaǵan?', 'XIX ásirde', ['XV ásirde', 'XVII ásirde', 'XX ásirdiń ekinshi yarımında', 'XXI ásirde'], 'Berdaq 1827–1900-jıllarda jasaǵan.']
]);
const LIT = [L_author, L_author, L_genre, F_term, F_litFixed];

/* ===================== 18–32 oqıw sawatxanlıǵı ===================== */
type Passage = { title: string; text: string; qs: [string, string, string[], string][] };
const PASSAGES: Passage[] = [
  {
    title: 'Nókistegi kórkem óner muzeyi',
    text: 'Nókistegi Qaraqalpaqstan Respublikası Mámleketlik kórkem óner muzeyi 1966-jılı ashılǵan. Onı dúziwde súwretshi hám alım Igor Savickiy úlken miynet sińirgen. Ol Qaraqalpaqstan boylap sayaxat etip, xalıq ónerine tiyisli zergerlik buyımların, gilemlerdi hám kiyimlerdi jıynaǵan. Sonday-aq ol 1920–1930-jıllardaǵı súwretshilerdiń kóplegen shıǵarmaların saqlap qalǵan. Búgin muzey dúnyadaǵı eń iri kolleksiyalardıń birin saqlaydı hám oǵan hár jılı kóp sayaxatshılar keledi.',
    qs: [
      ['Muzey qaysı jılı ashılǵan?', '1966-jılı', ['1924-jılı', '1991-jılı', '1930-jılı', '2000-jılı'], 'Birinshi gápte aytılǵan.'],
      ['Muzeydi dúziwde kim úlken miynet sińirgen?', 'Igor Savickiy', ['Berdaq', 'Ájiniyaz', 'T. Qayıpbergenov', 'I. Yusupov'], 'Ekinshi gápte aytılǵan.'],
      ['Savickiy sayaxat waqtında neler jıynaǵan?', 'zergerlik buyımların, gilemlerdi hám kiyimlerdi', ['tek kitaplardı', 'paxta tuqımların', 'eski tańgalardı ǵana', 'qural-jaraqlardı'], 'Úshinshi gápte aytılǵan.'],
      ['Tekstegi «miynet sińirgen» sóz dizbeginiń mánisi qaysı?', 'úlken úles qosqan, kóp xızmet etken', ['dem alǵan', 'qarsılıq kórsetken', 'umıtqan', 'satıp jibergen'], '«Miynet sińiriw» — bir istiń ámelge asıwına úlken úles qosıw.'],
      ['Tekstiń tiykarǵı ideyası qaysı?', 'muzey bay kolleksiyası menen dúnyaǵa belgili', ['muzey jabılıp qalǵan', 'Savickiy tek gilem toqıǵan', 'sayaxatshılar muzeyge kelmeydi', 'muzey 2000-jılı ashılǵan'], 'Tekst muzeydiń tariyxı hám áhmiyeti haqqında.']
    ]
  },
  {
    title: 'Aral teńizi',
    text: 'Bir zamanlarda Aral teńizi dúnyadaǵı eń úlken kóllerdiń biri bolǵan. Biraq XX ásirdiń ekinshi yarımında Ámiwdárya hám Sırdárya suwları paxta atızların suwǵarıwǵa kóplep jumsalıp, teńizge jetpey qaldı. Nátiyjede teńiz kishireyip, onıń ornında qumlı-duzlı shól payda boldı. Búgin bul jerlerde sekseuil hám basqa shól ósimliklerin egiw arqalı jańa toǵaylar jaratılıp atır. Usınday ilajlar shańlı-duzlı boranlardı azaytıwǵa járdem beredi.',
    qs: [
      ['Aral teńiziniń kishireyiwine ne sebep bolǵan?', 'dárya suwlarınıń suwǵarıwǵa kóplep jumsalıwı', ['jer silkiniwi', 'teńizdiń suwıwı', 'balıq awlawdıń kóbeyiwi', 'jawınnıń kóp jawıwı'], 'Ekinshi gápte aytılǵan.'],
      ['Teńizdiń ornında ne payda boldı?', 'qumlı-duzlı shól', ['jańa teńiz', 'úlken qala', 'tawlar', 'orman'], 'Úshinshi gápte aytılǵan.'],
      ['Búgin bul jerlerde qanday ilajlar ámelge asırılmaqta?', 'sekseuil hám shól ósimliklerin egiw', ['jańa zavodlar qurıw', 'teńizdi qaytadan qazıw', 'paxta egislikin keńeytiw', 'qumdı basqa jerge tasıw'], 'Tórtinshi gápte aytılǵan.'],
      ['«Biraq» sóziniń tekstegi wazıypası qanday?', 'aldınǵı pikirge qarama-qarsı pikirdi baylanıstıradı', ['sebepti kórsetedi', 'mısal keltiredi', 'waqıttı bildiredi', 'juwmaq shıǵaradı'], '«Biraq» — qarsılas dáneker.'],
      ['Tekstke eń sáykes atama qaysı?', 'Aral máselesi hám onı sheshiw jolları', ['Paxta egiw tariyxı', 'Tawlardaǵı sayaxat', 'Teńiz balıqları', 'Qala qurılısı'], 'Tekst Araldıń qurıwı hám ilajlar haqqında.']
    ]
  },
  {
    title: 'Berdaq',
    text: 'Berdaq Ǵarǵabay ulı 1827-jılı tuwılǵan. Ol qaraqalpaq klassik ádebiyatınıń eń iri wákili esaplanadı. Shayır óz qosıqlarında xalıqtıń awır turmısın, ádalatsızlıqtı súwretledi hám xalıqtı bilim alıwǵa shaqırdı. Onıń «Aqmaq patsha» dástanı zalım hám aqılsız hákimlerdi sınǵa aladı. Sonday-aq «Shejire» shıǵarmasında qaraqalpaq urıwlarınıń tariyxın bayan etti. Berdaqtıń dóretpeleri búgin de xalıq arasında súyip oqıladı.',
    qs: [
      ['Berdaq qaysı jılı tuwılǵan?', '1827-jılı', ['1900-jılı', '1777-jılı', '1924-jılı', '1850-jılı'], 'Birinshi gápte aytılǵan.'],
      ['Shayır óz qosıqlarında neni súwretlegen?', 'xalıqtıń awır turmısın hám ádalatsızlıqtı', ['tek tábiyat kórinislerin', 'basqa eldiń tariyxın', 'sport jarısların', 'qala qurılısın'], 'Úshinshi gápte aytılǵan.'],
      ['«Aqmaq patsha» dástanında ne sınǵa alınadı?', 'zalım hám aqılsız hákimler', ['ilimpazlar', 'diyqanlar', 'balalar', 'sawdagerler'], 'Tórtinshi gápte aytılǵan.'],
      ['«Shejire» shıǵarmasında neler bayan etilgen?', 'qaraqalpaq urıwlarınıń tariyxı', ['teńiz sayaxatı', 'astronomiya', 'muhabbat qıssası', 'sport tariyxı'], 'Besinshi gápte aytılǵan.'],
      ['Tekstiń tiykarǵı ideyası qaysı?', 'Berdaq — xalıq ǵamın jırlaǵan ullı shayır', ['Berdaq tek tariyxshı bolǵan', 'Berdaqtıń shıǵarmaları umıtılǵan', 'Berdaq basqa elde jasaǵan', 'Berdaq jazıwshı emes edi'], 'Tekst shayırdıń dóretiwshiligi hám áhmiyeti haqqında.']
    ]
  }
];
function readingBlock(): Q[] {
  return shuffle(PASSAGES).flatMap((p, k) => shuffle(p.qs).map(([q, a, w, e]) => mc(`${18 + k * 5}–${22 + k * 5}-tapsırmalar ushın tekst («${p.title}»):\n\n${p.text}\n\n${q}`, a, w, e)));
}

/* ---------------------------- 33–35 sáykeslendiriw ---------------------------- */
function kaaMatch(): Q[] {
  if (Math.random() < 0.5) {
    const rows: [string, string][] = [['mektepke', 'barıs seplik'], ['mektepte', 'orın seplik'], ['mektepten', 'shıǵıs seplik'], ['mektepti', 'tabıs seplik'], ['mekteptiń', 'iyelik seplik'], ['mektep', 'atawısh seplik']];
    return matchBlock('', '33–35-tapsırmalar ushın ulıwma shárt: sózlerdi olar turǵan seplik penen sáykeslendiriń.', shuffle(rows).slice(0, 3).map(([a, b]) => [`«${a}» qaysı seplikte?`, b, `«${a}» — ${b}.`] as [string, string, string]), rows.map((r) => r[1]));
  }
  const used = new Set<string>();
  const uniq = shuffle(WORKS).filter((w) => (used.has(w[1]) ? false : (used.add(w[1]), true)));
  return matchBlock('', '33–35-tapsırmalar ushın ulıwma shárt: shıǵarmalardı olardıń avtorları menen sáykeslendiriń.', uniq.slice(0, 3).map(([w, a]) => [`«${w}» shıǵarmasınıń avtorı kim?`, a, `«${w}» — ${a}.`] as [string, string, string]), [...uniq.slice(3).map((w) => w[1]), 'Zulfiya', 'Ájiniyaz Qosıbay ulı']);
}

/* ---------------------- 36–44 lingvistikalıq hám kórkem analiz ---------------------- */
type Rec = [string, string, string, string, string];
const SUBJ: Rec[] = [
  ['Gáp: «Inim búgin mektepten erte keldi.»', 'a) Gáptiń baslawıshın jazıń.', 'inim', 'b) Bayanlawısh qaysı sóz shaqabı menen ańlatılǵan?', 'feyil'],
  ['Gáp: «Báhárde baǵdaǵı almalar gúlledi.»', 'a) Gáptiń baslawıshın jazıń.', 'almalar', 'b) Bayanlawısh qaysı sóz shaqabı menen ańlatılǵan?', 'feyil'],
  ['Gáp: «Apam — muǵallim.»', 'a) Gáptiń baslawıshın jazıń.', 'apam', 'b) Bayanlawısh qaysı sóz shaqabı menen ańlatılǵan?', 'atlıq'],
  ['Gáp: «Biz erteń Nókiske baramız.»', 'a) Gáptiń baslawıshın jazıń.', 'biz', 'b) Baslawısh qaysı sóz shaqabı menen ańlatılǵan?', 'almasıq / almasıǵı / betlik almasıq']
];
const MORPH: Rec[] = [
  ['Sóz: «kitaplarımızǵa»', 'a) Sózdiń túbirin jazıń.', 'kitap', 'b) Sózde neshe qosımta bar?', '3'],
  ['Sóz: «mekteplerde»', 'a) Sózdiń túbirin jazıń.', 'mektep', 'b) Sózde neshe qosımta bar?', '2'],
  ['Sóz: «balalarımız»', 'a) Sózdiń túbirin jazıń.', 'bala', 'b) Sózde neshe qosımta bar?', '2']
];
const ART: Rec[] = [
  ['Gáp: «Qızdıń júzi ayday nur shashtı.»', 'a) Gápte qollanılǵan kórkem súwretlew quralın atań.', 'teńew', 'b) Teńew mánisin beretuǵın qosımtanı jazıń.', '-day / day'],
  ['Gáp: «Samal terezeni qaǵıp, ishke úńildi.»', 'a) Gápte qollanılǵan kórkem súwretlew quralın atań.', 'jandandırıw', 'b) Jandandırılǵan zattı jazıń.', 'samal'],
  ['Gáp: «Batırdıń dawısı jeti taw asıp esitildi.»', 'a) Gápte qollanılǵan kórkem súwretlew quralın atań.', 'giperbola / ásirelew', 'b) Gáptegi sanlıqtı jazıń.', 'jeti']
];
const rec = (r: Rec): Q => openN(r[0], [[r[1], r[2]], [r[3], r[4]]], `${r[0]} Juwap: a) ${r[2]}; b) ${r[4]}.`);
const openBlock = (): Q[] => [...shuffle(SUBJ).slice(0, 3), ...shuffle(MORPH).slice(0, 3), ...shuffle(ART).slice(0, 3)].map(rec);

/* ------------------------------ 45 jazba sawatxanlıq ------------------------------ */
const ESSAY_TOPICS = [
  'Klaslasıńız kitap oqıwdı «eski ádet» dep esaplaydı hám waqtınıń kóbin telefonda ótkeredi. Onıń pikirine qatnasıńızdı bildiriń.',
  'Aral teńiziniń taǵdırı hám tábiyattı qorǵaw haqqında óz pikirińizdi jazıń.',
  'Dostıńız qaysı kásipti tańlawdı bilmey ikilenip júr. Oǵan qanday másláhát berer edińiz?',
  '«Ana tilin biliw — hár bir insannıń wazıypası» degen pikirge qatnasıńızdı bildiriń.'
];
const writing = (): Q => ({
  text: `Jazba sawatxanlıq (shıǵarma). Tómendegi jaǵdayǵa baha beriń hám usı jaǵday boyınsha 150–200 sózden ibarat tekst jazıń. Tekstte kirisiw, tiykarǵı bólim hám juwmaq bolsın, pikirińizdi dálilleń.\n\nJaǵday: ${pick(ESSAY_TOPICS)}`,
  explain: 'Shıǵarmanı AI 4 ólshem boyınsha bahalaydı: mazmunı, dúzilisi, tili, imlası (hár biri 2,5 ball, jámi 10 ball).',
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

/** Jańa 45 tapsırmalı variant (tek klient tárepinde — tosınnan). */
export function buildKaaExam(): G11Question[] {
  const seen = new Set<string>();
  const list: Q[] = [
    ...distinct(SPELL_POOL, 2, seen),
    ...distinct(LEX, 2, seen),
    ...distinct(STYLE, 2, seen),
    ...distinct(GRAM, 5, seen),
    tryGen(F_punct),
    ...distinct(LIT, 5, seen),
    ...readingBlock(),
    ...tryBlock(kaaMatch),
    ...openBlock(),
    writing()
  ];
  return toQuestions(list, 'g11-qq');
}
