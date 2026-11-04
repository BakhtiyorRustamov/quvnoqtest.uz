import type { G11Question } from '../diagnostic';
import { R, pick, shuffle, num, mc, mcn, openN, fromPool, tryGen, tryBlock, toQuestions, matchBlock, type Q } from './gen';

/**
 * Kimyo — Milliy sertifikat formatidagi test generatori (DTM tafsiloti): 43 topshiriq, 180 daqiqa.
 * 1–13 umumiy, 14–19 anorganik, 20–29 organik, 30–32 kimyoviy tahlil (Y1); 33–35 moslashtirish (Y2);
 * 36–40 qisqa javobli ochiq (O1): umumiy 2, anorganik 1, organik 2; 41–43 yozma ish (O2):
 * umumiy, organik, anorganik — bandlarga boʻlingan, har bandning son javobi tekshiriladi.
 */
export const CHEM_EXAM_MINUTES = 180;

/* ------------------------------- data ------------------------------- */
const AM: Record<string, number> = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 64, Zn: 65, Ag: 108, Ba: 137, P: 31 };
const SUBS = '₀₁₂₃₄₅₆₇₈₉';
/** "H2SO4" → "H₂SO₄" (digits after a letter or a bracket become subscripts) */
export const chem = (f: string) => f.replace(/([A-Za-z)])(\d+)/g, (_, a: string, d: string) => a + d.split('').map((c) => SUBS[Number(c)]).join(''));
/** molar mass of a simple formula like Ca(OH)2, Al2(SO4)3, C6H12O6 */
function M(f: string): number {
  const parse = (s: string): number => {
    let i = 0;
    let total = 0;
    while (i < s.length) {
      if (s[i] === '(') {
        let depth = 1;
        let j = i + 1;
        while (depth) {
          if (s[j] === '(') depth++;
          if (s[j] === ')') depth--;
          j++;
        }
        const inner = parse(s.slice(i + 1, j - 1));
        const m = s.slice(j).match(/^\d+/);
        total += inner * (m ? Number(m[0]) : 1);
        i = j + (m ? m[0].length : 0);
      } else {
        const m = s.slice(i).match(/^([A-Z][a-z]?)(\d*)/);
        if (!m) throw new Error('formula ' + s);
        total += AM[m[1]] * (m[2] ? Number(m[2]) : 1);
        i += m[0].length;
      }
    }
    return total;
  };
  return Math.round(parse(f) * 100) / 100;
}
const r2 = (x: number) => Math.round(x * 100) / 100;

/** a numeric calculation usable both as a 4-option task and as a short open answer */
type Calc = { text: string; ans: number; explain: string; unit: string; extra?: number[] };
const asMc = (c: () => Calc) => () => {
  const v = c();
  return mcn(v.text, v.ans, v.explain, 0, v.extra);
};
const asOpen = (c: () => Calc) => () => {
  const v = c();
  return openN(v.text, [[`Javob (${v.unit}):`, v.ans]], v.explain);
};

/* --------------------------- calculation templates --------------------------- */
const C_molar: () => Calc = () => {
  const f = pick(['H2SO4', 'HNO3', 'CaCO3', 'NaOH', 'Ca(OH)2', 'Al2(SO4)3', 'CuSO4', 'Fe2O3', 'Na2CO3', 'C6H12O6', 'Mg(NO3)2', 'H3PO4']);
  return { text: `${chem(f)} ning molyar massasini (g/mol) toping.`, ans: M(f), unit: 'g/mol', explain: `Atom massalarini qoʻshamiz: M(${chem(f)}) = ${num(M(f))} g/mol.` };
};
const C_moles: () => Calc = () => {
  const f = pick(['H2O', 'CO2', 'NaOH', 'CaCO3', 'H2SO4', 'NaCl', 'O2', 'Fe2O3']);
  const n = pick([0.2, 0.25, 0.5, 1.5, 2, 3]);
  const m = r2(n * M(f));
  return { text: `${num(m)} g ${chem(f)} necha mol boʻladi?`, ans: n, unit: 'mol', explain: `n = m/M = ${num(m)}/${num(M(f))} = ${num(n)} mol.`, extra: [m / 22.4] };
};
const C_gasVol: () => Calc = () => {
  const f = pick(['O2', 'CO2', 'N2', 'CH4', 'NH3', 'H2', 'SO2']);
  const n = pick([0.25, 0.5, 1.5, 2, 3]);
  const m = r2(n * M(f));
  return { text: `${num(m)} g ${chem(f)} normal sharoitda qancha hajmni (l) egallaydi?`, ans: r2(n * 22.4), unit: 'l', explain: `n = ${num(m)}/${M(f)} = ${num(n)} mol; V = n·22,4 = ${num(r2(n * 22.4))} l.` };
};
const C_density: () => Calc = () => {
  const [f, by] = pick([['SO2', 'H2'], ['CO2', 'H2'], ['O2', 'H2'], ['CH4', 'H2'], ['NH3', 'H2'], ['C4H10', 'havo'], ['N2', 'H2']] as const);
  const Mg = M(f);
  const d = by === 'H2' ? Mg / 2 : r2(Mg / 29);
  return { text: `${chem(f)} gazining ${by === 'H2' ? 'vodorodga' : 'havoga'} nisbatan zichligini toping.`, ans: d, unit: '', explain: `D = M(gaz)/M(${by === 'H2' ? 'H₂' : 'havo'}) = ${Mg}/${by === 'H2' ? 2 : 29} = ${num(d)}.` };
};
const C_fraction: () => Calc = () => {
  const [f, el, cnt] = pick([['H2SO4', 'S', 1], ['CaCO3', 'Ca', 1], ['NaOH', 'Na', 1], ['Fe2O3', 'Fe', 2], ['SO3', 'O', 3], ['NH4NO3', 'N', 2], ['CuO', 'Cu', 1], ['MgO', 'Mg', 1], ['CO2', 'C', 1]] as [string, string, number][]);
  const w = r2(((AM[el] * cnt) / M(f)) * 100);
  return { text: `${chem(f)} tarkibidagi ${el} ning massa ulushini (%) toping.`, ans: w, unit: '%', explain: `ω = ${cnt > 1 ? cnt + '·' : ''}${AM[el]}/${num(M(f))}·100% = ${num(w)}%.` };
};
const C_percent: () => Calc = () => {
  const ms = pick([10, 20, 25, 30, 40, 50]);
  const water = pick([150, 175, 200, 225, 250]);
  const w = r2((ms / (ms + water)) * 100);
  return { text: `${ms} g tuz ${water} g suvda eritildi. Eritmaning massa ulushini (%) toping.`, ans: w, unit: '%', explain: `ω = m(tuz)/m(eritma)·100% = ${ms}/${ms + water}·100% = ${num(w)}%.`, extra: [r2((ms / water) * 100)] };
};
const C_molarity: () => Calc = () => {
  const f = pick(['NaOH', 'NaCl', 'KOH', 'H2SO4', 'HNO3']);
  const n = pick([0.1, 0.2, 0.25, 0.5, 1]);
  const V = pick([200, 250, 500, 1000]);
  return { text: `${num(r2(n * M(f)))} g ${chem(f)} suvda eritilib, ${V} ml eritma tayyorlandi. Eritmaning molyar konsentratsiyasini (mol/l) toping.`, ans: r2(n / (V / 1000)), unit: 'mol/l', explain: `n = ${num(r2(n * M(f)))}/${M(f)} = ${num(n)} mol; C = n/V = ${num(n)}/${num(V / 1000)} = ${num(r2(n / (V / 1000)))} mol/l.` };
};
const C_mix: () => Calc = () => {
  const m1 = pick([100, 200, 300]);
  const w1 = pick([10, 20, 30]);
  const m2 = pick([100, 200, 300]);
  const w2 = pick([5, 15, 40]);
  const w = r2((m1 * w1 + m2 * w2) / (m1 + m2));
  return { text: `${m1} g ${w1}% li va ${m2} g ${w2}% li eritmalar aralashtirildi. Hosil boʻlgan eritmaning massa ulushini (%) toping.`, ans: w, unit: '%', explain: `ω = (${m1}·${w1} + ${m2}·${w2})/(${m1} + ${m2}) = ${num(w)}%.`, extra: [(w1 + w2) / 2] };
};
const C_metalAcid: () => Calc = () => {
  const [met, val] = pick([['Zn', 2], ['Mg', 2], ['Fe', 2], ['Al', 3], ['Ca', 2]] as [string, number][]);
  const n = pick([0.1, 0.2, 0.3, 0.4, 0.5]);
  const m = r2(n * AM[met]);
  const V = r2((n * val) / 2 * 22.4);
  return { text: `${num(m)} g ${met} xlorid kislotaning moʻl miqdori bilan reaksiyaga kirishdi. Ajralgan vodorod hajmini (l, n.sh.) toping.`, ans: V, unit: 'l', explain: `n(${met}) = ${num(n)} mol. ${met === 'Al' ? '2Al + 6HCl → 2AlCl₃ + 3H₂: n(H₂) = 1,5·n(Al)' : `${met} + 2HCl → ${met}Cl₂ + H₂: n(H₂) = n(${met})`} = ${num((n * val) / 2)} mol; V = ${num(V)} l.`, extra: [r2(n * 22.4 * (val === 3 ? 1 : 2))] };
};
const C_alkali: () => Calc = () => {
  const [met] = pick([['Na'], ['K']] as [string][]);
  const n = pick([0.2, 0.4, 0.5, 1]);
  const m = r2(n * AM[met]);
  return { text: `${num(m)} g ${met} suv bilan toʻliq reaksiyaga kirishdi. Ajralgan vodorod hajmini (l, n.sh.) toping.`, ans: r2((n / 2) * 22.4), unit: 'l', explain: `2${met} + 2H₂O → 2${met}OH + H₂: n(H₂) = n(${met})/2 = ${num(n / 2)} mol; V = ${num(r2((n / 2) * 22.4))} l.`, extra: [r2(n * 22.4)] };
};
const C_caco3: () => Calc = () => {
  const m = pick([10, 25, 50, 100, 200]);
  const ask = pick(['V', 'm']);
  const n = m / 100;
  return ask === 'V'
    ? { text: `${m} g kalsiy karbonat qizdirilib toʻliq parchalandi. Ajralgan CO₂ hajmini (l, n.sh.) toping.`, ans: r2(n * 22.4), unit: 'l', explain: `CaCO₃ → CaO + CO₂. n = ${m}/100 = ${num(n)} mol; V = ${num(r2(n * 22.4))} l.` }
    : { text: `${m} g kalsiy karbonat toʻliq parchalanganda necha gramm kalsiy oksid hosil boʻladi?`, ans: r2(n * 56), unit: 'g', explain: `CaCO₃ → CaO + CO₂. n = ${num(n)} mol; m(CaO) = ${num(n)}·56 = ${num(r2(n * 56))} g.` };
};
const C_fert: () => Calc = () => {
  const [f, nN, name] = pick([['NH4NO3', 2, 'ammiakli selitra'], ['CO(NH2)2', 2, 'karbamid'], ['NH4Cl', 1, 'ammoniy xlorid'], ['(NH4)2SO4', 2, 'ammoniy sulfat'], ['NaNO3', 1, 'natriyli selitra']] as [string, number, string][]);
  const w = r2(((14 * nN) / M(f)) * 100);
  return { text: `${name.charAt(0).toUpperCase() + name.slice(1)} (${chem(f)}) tarkibidagi azotning massa ulushini (%) toping.`, ans: w, unit: '%', explain: `ω(N) = ${nN}·14/${num(M(f))}·100% = ${num(w)}%.` };
};
const C_burnAlkane: () => Calc = () => {
  const n = R(1, 5);
  const V = pick([2, 4, 5, 10]);
  const names = ['metan', 'etan', 'propan', 'butan', 'pentan'];
  return { text: `${V} l ${names[n - 1]} (${chem(n === 1 ? 'CH4' : `C${n}H${2 * n + 2}`)}) toʻliq yonishi uchun qancha hajm (l) kislorod kerak? (hajmlar bir xil sharoitda)`, ans: r2(((3 * n + 1) / 2) * V), unit: 'l', explain: `CₙH₂ₙ₊₂ + (3n+1)/2 O₂ → nCO₂ + (n+1)H₂O; n = ${n}: ${num((3 * n + 1) / 2)} hajm O₂ ⇒ ${num(r2(((3 * n + 1) / 2) * V))} l.` };
};
const C_ferment: () => Calc = () => {
  const n = pick([0.5, 1, 2, 2.5]);
  const yld = pick([100, 80, 75, 50]);
  const ans = r2(n * 2 * 46 * (yld / 100));
  return { text: `${num(n * 180)} g glyukoza spirtli bijgʻitildi${yld < 100 ? ` (unum ${yld}%)` : ''}. Necha gramm etanol hosil boʻladi?`, ans, unit: 'g', explain: `C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. n(glyukoza) = ${num(n)} mol ⇒ n(C₂H₅OH) = ${num(2 * n)} mol; m = ${num(2 * n)}·46${yld < 100 ? `·${yld / 100}` : ''} = ${num(ans)} g.`, extra: [r2(n * 46)] };
};
const C_mirror: () => Calc = () => {
  const [name, f, kAg] = pick([['chumoli aldegid (HCHO)', 'CH2O', 4], ['sirka aldegid (CH₃CHO)', 'C2H4O', 2], ['propanal (C₂H₅CHO)', 'C3H6O', 2]] as [string, string, number][]);
  const n = pick([0.1, 0.2, 0.25, 0.5]);
  const m = r2(n * M(f));
  return { text: `${num(m)} g ${name} kumush oksidning ammiakdagi eritmasi bilan toʻliq oksidlandi. Necha gramm kumush ajraladi?`, ans: r2(n * kAg * 108), unit: 'g', explain: `n = ${num(m)}/${M(f)} = ${num(n)} mol; har mol ${kAg === 4 ? 'formaldegid 4' : 'aldegid 2'} mol Ag beradi: m(Ag) = ${num(n * kAg)}·108 = ${num(r2(n * kAg * 108))} g.`, extra: [r2(n * (6 - kAg) * 108)] };
};
const C_nitro: () => Calc = () => {
  const n = pick([0.5, 1, 2]);
  return { text: `${num(n * 78)} g benzol nitrolanganda necha gramm nitrobenzol hosil boʻladi? (unum 100%)`, ans: r2(n * 123), unit: 'g', explain: `C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O. n = ${num(n)} mol; m = ${num(n)}·123 = ${num(r2(n * 123))} g.` };
};
const C_ester: () => Calc = () => {
  const n = pick([0.2, 0.5, 1, 2]);
  return { text: `${num(n * 60)} g sirka kislota moʻl etanol bilan eterifikatsiyalandi. Necha gramm etil asetat hosil boʻladi? (unum 100%)`, ans: r2(n * 88), unit: 'g', explain: `CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O. n = ${num(n)} mol; m = ${num(n)}·88 = ${num(r2(n * 88))} g.` };
};
const C_polymer: () => Calc = () => {
  const [mono, Mm] = pick([['etilen', 28], ['propilen', 42], ['vinilxlorid', 62.5]] as [string, number][]);
  const n = pick([500, 1000, 1500, 2000]);
  return { text: `Oʻrtacha molyar massasi ${num(n * Mm)} g/mol boʻlgan poli${mono}ning polimerlanish darajasini toping.`, ans: n, unit: '', explain: `n = M(polimer)/M(monomer) = ${num(n * Mm)}/${Mm} = ${n}.` };
};
const C_tempCoef: () => Calc = () => {
  const g = pick([2, 3]);
  const dT = pick([20, 30, 40]);
  return { text: `Reaksiyaning harorat koeffitsiyenti ${g} ga teng. Harorat ${dT} °C ga oshirilsa, reaksiya tezligi necha marta ortadi?`, ans: g ** (dT / 10), unit: 'marta', explain: `Vant-Goff qoidasi: v₂/v₁ = γ^(Δt/10) = ${g}^${dT / 10} = ${g ** (dT / 10)}.`, extra: [g * (dT / 10)] };
};
const C_pH: () => Calc = () => {
  const k = pick([1, 2, 3]);
  const base = Math.random() < 0.5;
  return { text: `${base ? 'NaOH' : 'HCl'} ning ${num(10 ** -k)} M eritmasining pH ini toping (toʻliq dissotsilanadi deb hisoblang).`, ans: base ? 14 - k : k, unit: '', explain: base ? `[OH⁻] = 10⁻${k} ⇒ pOH = ${k}, pH = 14 − ${k} = ${14 - k}.` : `[H⁺] = 10⁻${k} ⇒ pH = ${k}.`, extra: [base ? k : 14 - k] };
};
const C_electro: () => Calc = () => {
  const F = pick([0.5, 1, 2, 4]);
  const [met, z] = pick([['Cu', 2], ['Ag', 1], ['Zn', 2]] as [string, number][]);
  return { text: `${met}${met === 'Ag' ? 'NO₃' : 'SO₄'} eritmasi orqali ${num(F)} F (faradey) elektr miqdori oʻtkazildi. Katodda necha gramm ${met} ajraladi?`, ans: r2((F / z) * AM[met]), unit: 'g', explain: `Faradey qonuni: n(${met}) = Q/(zF) = ${num(F)}/${z} mol; m = ${num(F / z)}·${AM[met]} = ${num(r2((F / z) * AM[met]))} g.`, extra: [r2(F * AM[met])] };
};
const C_prep: () => Calc = () => {
  const m = pick([100, 200, 250, 400, 500]);
  const w = pick([5, 10, 15, 20]);
  const ask = pick(['salt', 'water']);
  return { text: `${m} g ${w}% li osh tuzi eritmasini tayyorlash uchun necha gramm ${ask === 'salt' ? 'tuz' : 'suv'} kerak?`, ans: ask === 'salt' ? (m * w) / 100 : m - (m * w) / 100, unit: 'g', explain: `m(tuz) = ${m}·${w}/100 = ${(m * w) / 100} g; m(suv) = ${m} − ${(m * w) / 100} = ${m - (m * w) / 100} g.` };
};

/* ----------------------------- fact templates ----------------------------- */
const pickFact = (title: string, rows: [string, string][], explain: (q: string, a: string) => string) => () => {
  const [q, a] = pick(rows);
  const others = Array.from(new Set(rows.map((r) => r[1]).filter((x) => x !== a)));
  return mc(title.replace('{q}', q), a, others, explain(q, a));
};
const F_bond = pickFact('{q} da qanday kimyoviy bogʻlanish mavjud?', [['NaCl', 'ion'], ['KF', 'ion'], ['H₂', 'kovalent qutbsiz'], ['Cl₂', 'kovalent qutbsiz'], ['HCl', 'kovalent qutbli'], ['H₂O', 'kovalent qutbli'], ['Fe', 'metall'], ['Cu', 'metall']], (q, a) => `${q} — ${a} bogʻlanish.`);
const F_oxstate = pickFact('{q} birikmasida belgilangan elementning oksidlanish darajasini toping.', [['KMnO₄ (Mn)', '+7'], ['K₂Cr₂O₇ (Cr)', '+6'], ['H₂SO₄ (S)', '+6'], ['HNO₃ (N)', '+5'], ['KClO₃ (Cl)', '+5'], ['Na₂SO₃ (S)', '+4'], ['NH₃ (N)', '−3'], ['H₂O₂ (O)', '−1'], ['Fe₂O₃ (Fe)', '+3']], (q, a) => `Molekula elektroneytral: kislorod −2, vodorod +1, ishqoriy metall +1 deb hisoblasak, ${q} da ${a}.`);
const F_hydro = pickFact('{q} tuzining suvli eritmasi qanday muhitga ega?', [['Na₂CO₃', 'ishqoriy'], ['K₂S', 'ishqoriy'], ['CH₃COONa', 'ishqoriy'], ['NH₄Cl', 'kislotali'], ['ZnCl₂', 'kislotali'], ['Al₂(SO₄)₃', 'kislotali'], ['NaCl', 'neytral'], ['KNO₃', 'neytral']], (q, a) => `${q}: ${a === 'neytral' ? 'kuchli asos va kuchli kislotadan hosil boʻlgan — gidrolizlanmaydi' : a === 'ishqoriy' ? 'kuchsiz kislota anioni boʻyicha gidrolizlanadi' : 'kuchsiz asos kationi boʻyicha gidrolizlanadi'}: muhit ${a}.`);
const F_ions = pickFact('{q} ning 1 molekulasi toʻliq dissotsilanganda nechta ion hosil boʻladi?', [['NaCl', '2'], ['CaCl₂', '3'], ['Na₂SO₄', '3'], ['AlCl₃', '4'], ['K₃PO₄', '4'], ['Al₂(SO₄)₃', '5'], ['Fe₂(SO₄)₃', '5']], (q, a) => `${q} → kationlar + anionlar: jami ${a} ta ion.`);
const F_oxide = pickFact('{q} qanday oksid?', [['CO₂', 'kislotali'], ['SO₃', 'kislotali'], ['P₂O₅', 'kislotali'], ['Na₂O', 'asosli'], ['CaO', 'asosli'], ['ZnO', 'amfoter'], ['Al₂O₃', 'amfoter'], ['CO', 'befarq (tuz hosil qilmaydigan)'], ['NO', 'befarq (tuz hosil qilmaydigan)']], (q, a) => `${q} — ${a} oksid.`);
const F_hybrid = pickFact('{q} molekulasida uglerod atomlari qanday gibridlangan?', [['CH₄', 'sp³'], ['C₂H₆', 'sp³'], ['C₂H₄', 'sp²'], ['C₆H₆', 'sp²'], ['C₂H₂', 'sp'], ['CO₂', 'sp']], (q, a) => `${q} da uglerod ${a} gibridlangan.`);
const F_class = pickFact('{q} birikmasi qaysi sinfga mansub?', [['CH₃COOH', 'karbon kislota'], ['HCOOH', 'karbon kislota'], ['CH₃CHO', 'aldegid'], ['HCHO', 'aldegid'], ['C₂H₅OH', 'spirt'], ['CH₃OH', 'spirt'], ['CH₃COOC₂H₅', 'murakkab efir'], ['C₆H₅OH', 'fenol'], ['CH₃NH₂', 'amin'], ['CH₃COCH₃', 'keton']], (q, a) => `${q} — ${a}.`);
const F_isomer = pickFact('{q} tarkibli alkanning nechta tuzilish izomeri bor?', [['C₄H₁₀', '2'], ['C₅H₁₂', '3'], ['C₆H₁₄', '5'], ['C₇H₁₆', '9']], (q, a) => `${q} uchun ${a} ta struktur izomer mavjud.`);
const F_rxn = pickFact('Reaksiya turini aniqlang: {q}', [['CH₄ + Cl₂ → CH₃Cl + HCl', 'oʻrin olish'], ['C₆H₆ + Br₂ → C₆H₅Br + HBr', 'oʻrin olish'], ['C₂H₄ + H₂ → C₂H₆', 'birikish'], ['C₂H₂ + 2Br₂ → C₂H₂Br₄', 'birikish'], ['C₂H₅OH → C₂H₄ + H₂O', 'ajralish (degidratlanish)'], ['nCH₂=CH₂ → (–CH₂–CH₂–)ₙ', 'polimerlanish']], (q, a) => `${q} — ${a} reaksiyasi.`);
const F_formula = pickFact('{q}ning molekulyar formulasini toping.', [['Glyukoza', 'C₆H₁₂O₆'], ['Saxaroza', 'C₁₂H₂₂O₁₁'], ['Etanol', 'C₂H₆O'], ['Benzol', 'C₆H₆'], ['Glitserin', 'C₃H₈O₃'], ['Sirka kislota', 'C₂H₄O₂'], ['Glitsin (aminosirka kislota)', 'C₂H₅NO₂']], (q, a) => `${q} — ${a}.`);
const F_qual = pickFact('{q}ni aniqlash uchun qaysi reaktivdan foydalaniladi?', [['Cl⁻ ioni', 'AgNO₃ (oq suzmasimon choʻkma)'], ['SO₄²⁻ ioni', 'BaCl₂ (oq choʻkma)'], ['CO₃²⁻ ioni', 'kislota (CO₂ gazi ajraladi)'], ['NH₄⁺ ioni', 'ishqor (ammiak hidi)'], ['Fe³⁺ ioni', 'KSCN (qon-qizil rang)'], ['Kraxmal', 'yod eritmasi (koʻk rang)'], ['Fenol', 'FeCl₃ (binafsha rang)']], (q, a) => `${q} uchun sifat reaksiyasi: ${a}.`);
const F_sep = pickFact('Aralashmani ajratish usulini tanlang: {q}', [['qum va suv', 'filtrlash'], ['osh tuzi eritmasidan tuzni olish', 'bugʻlatish'], ['temir kukuni va oltingugurt', 'magnit bilan ajratish'], ['spirt va suv', 'distillash (haydash)'], ['oʻsimlik yogʻi va suv', 'tindirish (ajratgich voronka)']], (q, a) => `${q}: ${a}.`);
const F_period = pickFact('{q} elektron konfiguratsiyali element qaysi?', [['1s²2s²2p⁴', 'kislorod'], ['1s²2s²2p⁶3s¹', 'natriy'], ['1s²2s²2p⁶3s²3p⁴', 'oltingugurt'], ['1s²2s²2p⁶3s²3p⁵', 'xlor'], ['1s²2s²2p⁶3s²', 'magniy'], ['1s²2s²2p³', 'azot'], ['1s²2s²2p⁶3s²3p¹', 'alyuminiy']], (q, a) => `Elektronlar soni = tartib raqami: ${q} — ${a}.`);
const F_equil = pickFact('N₂ + 3H₂ ⇌ 2NH₃ + Q sistemada {q} muvozanat qaysi tomonga siljiydi?', [['bosim oshirilganda', 'oʻngga (NH₃ hosil boʻlishi tomon)'], ['harorat oshirilganda', 'chapga (parchalanish tomon)'], ['NH₃ chiqarib turilganda', 'oʻngga (NH₃ hosil boʻlishi tomon)'], ['katalizator qoʻshilganda', 'siljimaydi'], ['harorat pasaytirilganda', 'oʻngga (NH₃ hosil boʻlishi tomon)'], ['N₂ konsentratsiyasi kamaytirilganda', 'chapga (parchalanish tomon)']], (q, a) => `Le-Shatelye prinsipi: ${q} muvozanat ${a} siljiydi.`);
const F_atom = () => {
  const [el, Z, A] = pick([['Cl', 17, 35], ['S', 16, 32], ['K', 19, 39], ['Ca', 20, 40], ['Fe', 26, 56], ['P', 15, 31], ['Na', 11, 23]] as [string, number, number][]);
  const ask = pick(['n', 'e']);
  if (ask === 'n') return mc(`${A}${el} (Z = ${Z}) atomi yadrosida nechta neytron bor?`, String(A - Z), [String(Z), String(A), String(A + Z), String(A - Z + 1)], `N = A − Z = ${A} − ${Z} = ${A - Z}.`);
  const ION: Record<string, [string, number]> = { Cl: ['−', 1], S: ['2−', 2], P: ['3−', 3], K: ['+', -1], Na: ['+', -1], Ca: ['2+', -2], Fe: [pick(['2+', '3+']), 0] };
  const ion = ION[el];
  if (el === 'Fe') ion[1] = ion[0] === '2+' ? -2 : -3;
  return mc(`${el}${ion[0]} ionida (Z = ${Z}) nechta elektron bor?`, String(Z + ion[1]), [String(Z), String(Z - ion[1]), String(A - Z), String(Z + ion[1] + 1)], `Elektronlar = Z ${ion[1] > 0 ? '+' : '−'} ${Math.abs(ion[1])} = ${Z + ion[1]}.`);
};
const F_peptide = () => {
  const n = R(3, 12);
  return mc(`${n} ta aminokislota qoldigʻidan iborat chiziqli polipeptidda nechta peptid bogʻ bor?`, String(n - 1), [String(n), String(n + 1), String(2 * n), String(n - 2)], `Chiziqli zanjirda peptid bogʻlar soni n − 1 = ${n - 1}.`);
};

/* --------------------------- pools by section --------------------------- */
const GENERAL: (() => Q)[] = [asMc(C_molar), asMc(C_moles), asMc(C_gasVol), asMc(C_density), asMc(C_fraction), asMc(C_percent), asMc(C_molarity), asMc(C_mix), asMc(C_tempCoef), asMc(C_pH), asMc(C_electro), F_bond, F_oxstate, F_hydro, F_ions, F_atom, F_period, F_equil];
const INORG: (() => Q)[] = [asMc(C_metalAcid), asMc(C_alkali), asMc(C_caco3), asMc(C_fert), F_oxide, () => mc('Suvning vaqtinchalik qattiqligini qaysi usul bilan yoʻqotish mumkin?', 'qaynatish', ['NaCl qoʻshish', 'filtrlash', 'sovitish', 'xlorlash'], 'Vaqtinchalik qattiqlik Ca(HCO₃)₂ va Mg(HCO₃)₂ bilan bogʻliq; qaynatilganda ular parchalanib, karbonatlar choʻkmaga tushadi.'),
  () => {
    const [q, a] = pick([['Qaysi metall suv bilan oddiy sharoitda shiddatli reaksiyaga kirishadi?', 'natriy'], ['Qaysi metall suyultirilgan xlorid kislotadan vodorodni siqib chiqara olmaydi?', 'mis'], ['Qaysi metall eng yengil?', 'litiy'], ['Qaysi metall xona haroratida suyuq?', 'simob']] as [string, string][]);
    return mc(q, a, ['natriy', 'mis', 'litiy', 'simob', 'temir', 'alyuminiy'], `Javob: ${a}.`);
  }];
const ORG: (() => Q)[] = [asMc(C_burnAlkane), asMc(C_ferment), asMc(C_mirror), asMc(C_nitro), asMc(C_ester), asMc(C_polymer), F_class, F_isomer, F_rxn, F_formula, F_hybrid, F_peptide];
const ANAL: (() => Q)[] = [F_qual, F_sep, asMc(C_prep)];

/* ---------------------------- 33–35 matching ---------------------------- */
function chemMatch(): Q[] {
  const H = '33–35-topshiriqlar uchun umumiy shart: moddalarni ular mansub boʻlgan sinf bilan moslashtiring.';
  if (Math.random() < 0.5) {
    const rows: [string, string][] = shuffle([['NaHCO₃', 'nordon tuz'], ['Na₂SO₄', 'oʻrta tuz'], ['Ca(OH)₂', 'asos'], ['H₃PO₄', 'kislota'], ['SO₂', 'kislotali oksid'], ['Zn(OH)₂', 'amfoter gidroksid'], ['KHSO₄', 'nordon tuz'], ['CaO', 'asosli oksid']]);
    const used = new Set<string>();
    const asks = rows.filter(([, c]) => (used.has(c) ? false : (used.add(c), true))).slice(0, 3);
    const classes = ['oʻrta tuz', 'nordon tuz', 'asos', 'kislota', 'kislotali oksid', 'asosli oksid', 'amfoter gidroksid'];
    return matchBlock('', H, asks.map(([s, c]) => [`${s} qaysi sinfga mansub?`, c, `${s} — ${c}.`] as [string, string, string]), classes);
  }
  const rows: [string, string][] = shuffle([['CH₃OH', 'spirt'], ['HCOH', 'aldegid'], ['C₂H₅COOH', 'karbon kislota'], ['HCOOCH₃', 'murakkab efir'], ['C₆H₅NH₂', 'amin'], ['C₆H₅OH', 'fenol'], ['C₃H₈', 'alkan']]);
  const asks = rows.slice(0, 3);
  return matchBlock('', H, asks.map(([s, c]) => [`${s} qaysi sinfga mansub?`, c, `${s} — ${c}.`] as [string, string, string]), ['spirt', 'aldegid', 'karbon kislota', 'murakkab efir', 'amin', 'fenol', 'alkan', 'keton']);
}

/* ---------------------------- 36–40 short open ---------------------------- */
const O1_GEN = [asOpen(C_percent), asOpen(C_molarity), asOpen(C_mix), asOpen(C_gasVol), asOpen(C_prep), asOpen(C_electro)];
const O1_INORG = [asOpen(C_metalAcid), asOpen(C_caco3), asOpen(C_alkali)];
const O1_ORG = [asOpen(C_burnAlkane), asOpen(C_ferment), asOpen(C_mirror), asOpen(C_ester), asOpen(C_nitro)];

/* ------------------------- 41–43 written tasks (O2) ------------------------- */
function W_general(): Q {
  if (Math.random() < 0.5) {
    const n = pick([0.1, 0.2, 0.25, 0.5]);
    const V = pick([250, 500]);
    const m = r2(n * 40);
    return openN(
      `${num(m)} g natriy gidroksid suvda eritilib, ${V} ml eritma tayyorlandi. Bu eritma xlorid kislota bilan toʻliq neytrallandi.`,
      [
        ['a) NaOH modda miqdorini (mol) toping.', n],
        ['b) Eritmaning molyar konsentratsiyasini (mol/l) toping.', r2(n / (V / 1000))],
        ['c) Neytrallash uchun sarflangan HCl massasini (g) toping.', r2(n * 36.5)],
        ['d) Hosil boʻlgan NaCl massasini (g) toping.', r2(n * 58.5)]
      ],
      `NaOH + HCl → NaCl + H₂O. n = ${num(m)}/40 = ${num(n)} mol; C = ${num(n)}/${num(V / 1000)} = ${num(r2(n / (V / 1000)))} M; m(HCl) = ${num(n)}·36,5 = ${num(r2(n * 36.5))} g; m(NaCl) = ${num(n)}·58,5 = ${num(r2(n * 58.5))} g.`
    );
  }
  const m1 = pick([200, 300]);
  const w1 = pick([10, 20]);
  const add = pick([50, 100]);
  const salt = (m1 * w1) / 100;
  const w2 = r2((salt / (m1 + add)) * 100);
  const evap = pick([50, 100]);
  const w3 = r2((salt / (m1 + add - evap)) * 100);
  return openN(
    `${m1} g ${w1}% li osh tuzi eritmasiga ${add} g suv qoʻshildi, keyin hosil boʻlgan eritmadan ${evap} g suv bugʻlatildi.`,
    [
      ['a) Dastlabki eritmadagi tuz massasini (g) toping.', salt],
      ['b) Suv qoʻshilgandan keyingi massa ulushini (%) toping.', w2],
      ['c) Bugʻlatilgandan keyingi massa ulushini (%) toping.', w3]
    ],
    `m(tuz) = ${m1}·${w1}/100 = ${salt} g; ω₂ = ${salt}/${m1 + add}·100% = ${num(w2)}%; ω₃ = ${salt}/${m1 + add - evap}·100% = ${num(w3)}%.`
  );
}
function W_organic(): Q {
  const n = R(2, 5);
  const k = pick([0.1, 0.2, 0.25, 0.5]);
  const Mal = 14 * n;
  const names = ['', '', 'eten', 'propen', 'buten', 'penten'];
  return openN(
    `${num(r2(k * Mal))} g alken bromli suv bilan toʻliq reaksiyaga kirishib, ${num(r2(k * 160))} g bromni biriktirdi.`,
    [
      ['a) Reaksiyaga kirishgan brom modda miqdorini (mol) toping.', k],
      ['b) Alkenning molyar massasini (g/mol) toping.', Mal],
      ['c) Alken molekulasidagi uglerod atomlari sonini toping.', n],
      ['d) Shu miqdor alkenni yoqish uchun kerak boʻladigan kislorod hajmini (l, n.sh.) toping.', r2(k * 1.5 * n * 22.4)]
    ],
    `CₙH₂ₙ + Br₂ → CₙH₂ₙBr₂: n(alken) = n(Br₂) = ${num(r2(k * 160))}/160 = ${num(k)} mol. M = ${num(r2(k * Mal))}/${num(k)} = ${Mal} g/mol = 14n ⇒ n = ${n} (${names[n]}). CₙH₂ₙ + 1,5n O₂: V = ${num(k)}·${num(1.5 * n)}·22,4 = ${num(r2(k * 1.5 * n * 22.4))} l.`
  );
}
function W_inorganic(): Q {
  const [met, val] = pick([['Zn', 2], ['Mg', 2], ['Fe', 2]] as [string, number][]);
  const n = pick([0.1, 0.2, 0.3, 0.5]);
  const salt = `${met}Cl2`;
  return openN(
    `${num(r2(n * AM[met]))} g ${met} xlorid kislotaning moʻl miqdorida toʻliq eritildi.`,
    [
      [`a) ${met} modda miqdorini (mol) toping.`, n],
      ['b) Ajralgan vodorod hajmini (l, n.sh.) toping.', r2(n * 22.4)],
      [`c) Hosil boʻlgan ${chem(salt)} massasini (g) toping.`, r2(n * M(salt))],
      ['d) Reaksiyaga kirishgan HCl massasini (g) toping.', r2(n * 2 * 36.5)]
    ],
    `${met} + 2HCl → ${chem(salt)} + H₂. n = ${num(n)} mol; V(H₂) = ${num(r2(n * 22.4))} l; m(${chem(salt)}) = ${num(n)}·${num(M(salt))} = ${num(r2(n * M(salt)))} g; m(HCl) = ${num(2 * n)}·36,5 = ${num(r2(n * 73))} g.${val ? '' : ''}`
  );
}

/* -------------------------------- assemble -------------------------------- */
function distinct(pool: (() => Q)[], n: number): Q[] {
  const out: Q[] = [];
  for (const g of shuffle(pool)) {
    if (out.length >= n) break;
    try {
      out.push(tryGen(g));
    } catch {
      /* skip */
    }
  }
  if (out.length < n) throw new Error('pool too small');
  return out;
}

/** A fresh 43-task chemistry variant (client side only — random). */
export function buildChemExam(): G11Question[] {
  const list: Q[] = [
    ...distinct(GENERAL, 13),
    ...distinct(INORG, 6),
    ...distinct(ORG, 10),
    ...distinct(ANAL, 3),
    ...tryBlock(chemMatch),
    ...distinct(O1_GEN, 2),
    fromPool(O1_INORG),
    ...distinct(O1_ORG, 2),
    tryGen(W_general),
    tryGen(W_organic),
    tryGen(W_inorganic)
  ];
  return toQuestions(list, 'g11-kim');
}
