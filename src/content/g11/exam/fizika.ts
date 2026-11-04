import type { G11Question } from '../diagnostic';
import { R, pick, shuffle, num, fr, mc, mcn, open, fromPool, tryGen, tryBlock, toQuestions, matchBlock, fig, type Q } from './gen';
import { velocityGraph, mixedCircuit, rlcCircuit, lensScheme, atwood, verticalThrow } from './svg';

/**
 * Fizika — Milliy sertifikat formatidagi test generatori (DTM tafsiloti): 45 topshiriq, 150 daqiqa.
 * 1–10 mexanika, 11–15 molekulyar fizika, 16–25 elektr va magnitizm, 26–28 optika va nisbiylik,
 * 29–31 kvant, atom va yadro fizikasi, 32 mantiqiy-hayotiy (Y-1); 33–35 moslashtirish (Y-2);
 * 36–45 ochiq (a, b): mexanika 3, molekulyar 2, elektr 2, optika 2, kvant 1.
 * Hisoblashlarda g = 10 m/s². Har bir javob kodda hisoblanadi.
 */
export const PHYS_EXAM_MINUTES = 150;
const G = 10;

/* ------------------------------ 1–10. Mexanika ------------------------------ */
const MECH: (() => Q)[] = [
  () => {
    const v = pick([10, 12, 15, 20, 30]);
    const a = pick([1, 2, 4, 5]);
    const s = (v * v) / (2 * a);
    return mcn(`Avtomobilning boshlangʻich tezligi ${v} m/s, tezlanishi −${a} m/s² ga teng. U toʻxtaguncha qancha masofa (m) bosib oʻtadi?`, s, `s = v₀²/(2a) = ${v * v}/${2 * a} = ${num(s)} m.`, 0, [(v * v) / a]);
  },
  () => {
    const m = pick([2, 4, 5, 10]);
    const F1 = R(2, 8) * 5;
    const F2 = F1 + R(2, 8) * 5;
    const ask = pick(['min', 'max']);
    const a = ask === 'min' ? (F2 - F1) / m : (F1 + F2) / m;
    return mcn(`Silliq gorizontal sirtdagi ${m} kg massali jismga ${F1} N va ${F2} N kuchlar taʼsir qilmoqda. Jismning ${ask === 'min' ? 'minimal' : 'maksimal'} tezlanishini (m/s²) toping.`, a, `Kuchlar ${ask === 'min' ? 'qarama-qarshi' : 'bir tomonga'} yoʻnalganda: a = ${ask === 'min' ? `(${F2} − ${F1})` : `(${F1} + ${F2})`}/${m} = ${num(a)} m/s².`, 0, [ask === 'min' ? (F1 + F2) / m : (F2 - F1) / m]);
  },
  () => {
    const kmh = pick([36, 72, 108, 216]);
    const v = kmh / 3.6;
    const h = pick([1000, 1800, 3600, 7200]);
    const ratio = (G * h) / ((v * v) / 2);
    if (!Number.isInteger(ratio * 10)) throw new Error('ugly');
    return mcn(`${h} m balandlikda ${kmh} km/h tezlik bilan uchayotgan samolyotning potensial energiyasi kinetik energiyasidan necha marta katta?`, ratio, `v = ${v} m/s. Ep/Ek = gh/(v²/2) = ${G * h}/${(v * v) / 2} = ${num(ratio)}.`);
  },
  () => {
    const v1 = R(1, 4) * 10;
    const v2 = R(1, 4) * 10;
    if (v1 === v2) throw new Error('same');
    const t1 = R(1, 4) * 10;
    const dt = R(1, 4) * 10;
    fig.cur = velocityGraph(t1, t1 + dt, v1, v2);
    const s = ((v1 + v2) / 2) * dt;
    return mcn(`Toʻgʻri chiziqli harakatlanayotgan jismning tezligi ${t1} s dan ${t1 + dt} s gacha ${v1} m/s dan ${v2} m/s gacha tekis oʻzgardi. Shu vaqt oraligʻida bosib oʻtilgan masofani (m) toping.`, s, `Tezlik grafigi ostidagi yuz: s = (v₁ + v₂)/2 · Δt = ${(v1 + v2) / 2}·${dt} = ${s} m.`, 0, [v2 * dt, v1 * dt]);
  },
  () => {
    const v = pick([10, 12, 15, 20]);
    const mu = pick([0.4, 0.5, 0.25, 0.8]);
    const s = (v * v) / (2 * mu * G);
    return mcn(`Tormoz bergan avtomobil asfaltda ${num(s)} m iz qoldirib toʻxtadi. Ishqalanish koeffitsiyenti ${num(mu)} boʻlsa, avtomobilning dastlabki tezligini (m/s) toping.`, v, `μmg·s = mv²/2 ⇒ v = √(2μgs) = √${num(2 * mu * G * s)} = ${v} m/s.`);
  },
  () => {
    const m = pick([0.5, 1, 2]);
    const L = pick([0.5, 1, 2]);
    const v = pick([2, 3, 4]);
    const T = m * (G + (v * v) / L);
    return mcn(`${num(L)} m uzunlikdagi ipga bogʻlangan ${num(m)} kg massali shar vertikal tekislikda aylantirilmoqda. Pastki nuqtada tezligi ${v} m/s boʻlsa, ipning tarangligini (N) toping.`, T, `Pastki nuqtada T − mg = mv²/L ⇒ T = ${num(m)}(${G} + ${v * v}/${num(L)}) = ${num(T)} N.`, 0, [m * ((v * v) / L - G), m * G]);
  },
  () => {
    const V = pick([4, 6, 9, 12]);
    const S = pick([1, 1.5, 2, 3]);
    const rho = pick([2000, 2500, 2800]);
    const p = (rho * V * G) / S / 1000;
    if (!Number.isInteger(p * 10)) throw new Error('ugly');
    return mcn(`Hajmi ${V} m³, asosining yuzi ${num(S)} m² boʻlgan ustun zichligi ${rho} kg/m³ boʻlgan toshdan yasalgan. Ustun poydevorga qancha bosim (kPa) beradi?`, p, `p = mg/S = ρVg/S = ${rho}·${V}·${G}/${num(S)} = ${num(p * 1000)} Pa = ${num(p)} kPa.`);
  },
  () => {
    const k = pick([3, 4, 5]);
    const d = pick([20, 30, 40, 60]);
    const v = pick([0.1, 0.2, 0.5]);
    const T = d / 100 / (k - 1) / v;
    return mcn(`Suv sirtidagi toʻlqinning 1- va ${k}-doʻngliklari orasidagi masofa ${d} cm, tarqalish tezligi ${num(v)} m/s. Toʻlqinning tebranish davrini (s) toping.`, T, `${k - 1} ta toʻlqin uzunligi ${d} cm ⇒ λ = ${num(d / 100 / (k - 1))} m. T = λ/v = ${num(T)} s.`, 0, [d / 100 / k / v, d / 100 / v]);
  },
  () => {
    const m1 = pick([2, 3, 4]);
    const m2 = pick([1, 2, 6]);
    const v1 = pick([3, 4, 6, 8]);
    const u = (m1 * v1) / (m1 + m2);
    if (!Number.isInteger(u * 10)) throw new Error('ugly');
    return mcn(`${m1} kg massali ${v1} m/s tezlikda harakatlanayotgan arava tinch turgan ${m2} kg massali aravaga urilib, unga ilashib qoldi. Aravalarning birgalikdagi tezligini (m/s) toping.`, u, `Impuls saqlanadi: ${m1}·${v1} = (${m1} + ${m2})u ⇒ u = ${num(u)} m/s.`);
  },
  () => {
    const m = pick([20, 50, 100, 200]);
    const h = pick([5, 10, 12, 15]);
    const t = pick([10, 20, 25, 50]);
    const P = (m * G * h) / t;
    return mcn(`Kran ${m} kg yukni ${t} s da ${h} m balandlikka tekis koʻtardi. Kranning quvvatini (W) toping.`, P, `P = A/t = mgh/t = ${m}·${G}·${h}/${t} = ${num(P)} W.`);
  },
  () => {
    const V = pick([0.002, 0.005, 0.01, 0.02]);
    const rho = pick([1000, 800]);
    const F = rho * G * V;
    return mcn(`Hajmi ${num(V * 1000)} dm³ boʻlgan jism ${rho === 1000 ? 'suvga' : 'kerosinga (ρ = 800 kg/m³)'} toʻliq botirildi. Unga taʼsir etuvchi Arximed kuchini (N) toping.`, F, `F = ρgV = ${rho}·${G}·${num(V)} = ${num(F)} N.`);
  },
  () => {
    const h = pick([5, 20, 45, 80, 125]);
    const ask = pick(['t', 'v']);
    const t = Math.sqrt((2 * h) / G);
    return ask === 't'
      ? mcn(`Jism ${h} m balandlikdan boshlangʻich tezliksiz erkin tushmoqda. U yerga qancha vaqtda (s) tushadi?`, t, `h = gt²/2 ⇒ t = √(2h/g) = √${(2 * h) / G} = ${num(t)} s.`, 0, [h / G])
      : mcn(`Jism ${h} m balandlikdan boshlangʻich tezliksiz erkin tushmoqda. Yerga urilish paytidagi tezligini (m/s) toping.`, G * t, `v = √(2gh) = √${2 * G * h} = ${num(G * t)} m/s.`, 0, [G * t * t]);
  },
  () => {
    const h = pick([5, 20, 45, 80]);
    const v0 = pick([5, 10, 15, 20]);
    const t = Math.sqrt((2 * h) / G);
    return mcn(`${h} m balandlikdan ${v0} m/s tezlik bilan gorizontal otilgan jism qancha uzoqlikka (m) borib tushadi?`, v0 * t, `Uchish vaqti t = √(2h/g) = ${num(t)} s; uzoqlik l = v₀t = ${num(v0 * t)} m.`, 0, [v0 * t * 2, h]);
  },
  () => {
    const k = pick([100, 200, 400, 500]);
    const x = pick([2, 4, 5, 10]);
    const E = (k * (x / 100) ** 2) / 2;
    return mcn(`Bikrligi ${k} N/m boʻlgan prujina ${x} cm ga choʻzildi. Prujinaning potensial energiyasini (J) toping.`, E, `E = kx²/2 = ${k}·${num(x / 100)}²/2 = ${num(E)} J.`, 0, [k * (x / 100) ** 2, (k * x * x) / 2 / 1000]);
  },
  () => {
    const F1 = pick([50, 100, 200]);
    const S1 = pick([2, 4, 5]);
    const S2 = S1 * pick([10, 20, 50]);
    return mcn(`Gidravlik pressning kichik porsheni yuzi ${S1} cm², katta porsheni yuzi ${S2} cm². Kichik porshenga ${F1} N kuch qoʻyilsa, katta porshen qanday kuch (N) beradi?`, (F1 * S2) / S1, `F₂/F₁ = S₂/S₁ ⇒ F₂ = ${F1}·${S2}/${S1} = ${(F1 * S2) / S1} N.`);
  },
  () => {
    const v = pick([10, 20, 30]);
    const r = pick([50, 100, 200]);
    return mcn(`Avtomobil radiusi ${r} m boʻlgan burilishda ${v} m/s tezlik bilan tekis harakatlanmoqda. Markazga intilma tezlanishni (m/s²) toping.`, (v * v) / r, `a = v²/R = ${v * v}/${r} = ${num((v * v) / r)} m/s².`, 0, [v / r]);
  }
];

/* ------------------- 11–15. Molekulyar fizika va termodinamika ------------------- */
const MOL: (() => Q)[] = [
  () => {
    const v = pick([300, 400, 500, 600]);
    const rho = pick([1.2, 3, 6, 12]);
    const p = (rho * v * v) / 3;
    return mcn(`Ideal gazning bosimi ${num(p)} Pa, zichligi ${num(rho)} kg/m³. Molekulalarning oʻrtacha kvadratik tezligini (m/s) toping.`, v, `p = ρv²/3 ⇒ v = √(3p/ρ) = √${num((3 * p) / rho)} = ${v} m/s.`);
  },
  () => {
    const [name, c] = pick([['alyuminiy', 920], ['temir', 460], ['mis', 400], ['suv', 4200]] as const);
    const m = pick([0.2, 0.4, 0.5, 2]);
    return mcn(`${num(m)} kg massali ${name} berilgan (c = ${c} J/(kg·K)). Uning issiqlik sigʻimini (J/K) toping.`, c * m, `C = cm = ${c}·${num(m)} = ${num(c * m)} J/K.`, 0, [c / m]);
  },
  () => {
    const m = pick([0.5, 1, 2, 3]);
    const dt = pick([10, 20, 40, 50]);
    const Q = (4200 * m * dt) / 1000;
    return mcn(`${num(m)} kg suvni ${dt} °C ga isitish uchun qancha issiqlik miqdori (kJ) kerak? (c = 4200 J/(kg·K))`, Q, `Q = cmΔt = 4200·${num(m)}·${dt} = ${num(Q * 1000)} J = ${num(Q)} kJ.`);
  },
  () => {
    const p = pick([100, 200, 150]);
    const dV = pick([2, 3, 5, 10]);
    const A = p * dV;
    return mcn(`Gaz ${p} kPa oʻzgarmas bosimda kengayib, hajmi ${dV} l ga ortdi. Gaz bajargan ishni (J) toping.`, A, `A = pΔV = ${p}·10³·${dV}·10⁻³ = ${A} J.`, 0, [A * 1000, A / 10]);
  },
  () => {
    const T1 = pick([400, 500, 600, 800]);
    const T2 = pick([300, 200]);
    const eta = (1 - T2 / T1) * 100;
    return mcn(`Ideal issiqlik mashinasi isitgichining temperaturasi ${T1} K, sovitgichiniki ${T2} K. Mashinaning maksimal FIKini (%) toping.`, eta, `η = (1 − T₂/T₁)·100% = (1 − ${T2}/${T1})·100% = ${num(eta)}%.`, 0, [(T2 / T1) * 100]);
  },
  () => {
    const Q = pick([500, 800, 1000, 1200]);
    const A = pick([200, 300, 400]);
    return mcn(`Gazga ${Q} J issiqlik berildi va gaz ${A} J ish bajardi. Gazning ichki energiyasi qanchaga (J) oʻzgardi?`, Q - A, `Termodinamikaning I qonuni: ΔU = Q − A = ${Q} − ${A} = ${Q - A} J.`, 0, [Q + A]);
  },
  () => {
    const m = pick([0.2, 0.5, 2, 3]);
    return mcn(`0 °C dagi ${num(m)} kg muzni eritish uchun qancha issiqlik (kJ) kerak? (λ = 330 kJ/kg)`, 330 * m, `Q = λm = 330·${num(m)} = ${num(330 * m)} kJ.`);
  },
  () => {
    const p = pick([100, 200, 300]);
    const V = pick([2, 4, 5, 10]);
    const U = 1.5 * p * V;
    return mcn(`Bir atomli ideal gazning bosimi ${p} kPa, hajmi ${V} l. Gazning ichki energiyasini (J) toping.`, U, `U = (3/2)pV = 1,5·${p}·10³·${V}·10⁻³ = ${num(U)} J.`, 0, [p * V, 2.5 * p * V]);
  },
  () => {
    const p1 = pick([100, 200, 300]);
    const V1 = pick([2, 4, 6]);
    const k = pick([2, 3, 4]);
    return mcn(`Gaz izotermik siqildi: hajmi ${V1 * k} l dan ${V1} l gacha kamaydi. Dastlabki bosim ${p1} kPa boʻlsa, oxirgi bosimni (kPa) toping.`, p1 * k, `Boyl–Mariott qonuni: p₁V₁ = p₂V₂ ⇒ p₂ = ${p1}·${V1 * k}/${V1} = ${p1 * k} kPa.`, 0, [p1 / k]);
  },
  () => {
    const T1 = pick([300, 250, 400]);
    const T2 = T1 + pick([60, 100, 150]);
    const p1 = pick([100, 150, 200]);
    const p2 = (p1 * T2) / T1;
    if (!Number.isInteger(p2 * 10)) throw new Error('ugly');
    return mcn(`Yopiq idishdagi gaz ${T1} K dan ${T2} K gacha isitildi. Dastlabki bosim ${p1} kPa boʻlsa, oxirgi bosimni (kPa) toping.`, p2, `Izoxorik jarayon: p/T = const ⇒ p₂ = ${p1}·${T2}/${T1} = ${num(p2)} kPa.`, 0, [(p1 * T1) / T2]);
  },
  () => {
    const [t, rho0] = pick([[15, 12.8], [17, 14.5], [19, 16.3], [20, 17.3]] as const);
    const phi = pick([40, 50, 60, 80]);
    const rho = (rho0 * phi) / 100;
    return mcn(`${t} °C da toʻyingan bugʻ zichligi ${num(rho0)} g/m³. Havoning absolyut namligi ${num(rho)} g/m³ boʻlsa, nisbiy namlikni (%) toping.`, phi, `φ = ρ/ρ₀·100% = ${num(rho)}/${num(rho0)}·100% = ${phi}%.`);
  }
];

/* ------------------------- 16–25. Elektr va magnitizm ------------------------- */
const ELEC: (() => Q)[] = [
  () => {
    const [q, r, F] = pick([[2, 0.3, 0.4], [3, 0.3, 0.9], [1, 0.1, 0.9], [4, 0.6, 0.4], [2, 0.2, 0.9]] as const);
    return mcn(`Har birining zaryadi ${q} μC boʻlgan ikkita nuqtaviy zaryad havoda bir-biridan ${num(r * 100)} cm masofada turibdi. Ularning oʻzaro taʼsir kuchini (N) toping. (k = 9·10⁹ N·m²/C²)`, F, `F = kq²/r² = 9·10⁹·(${q}·10⁻⁶)²/${num(r)}² = ${num(F)} N.`, 0, [F * r, F / r]);
  },
  () => {
    const k = pick([2, 3, 4]);
    return mc(`Ikki nuqtaviy zaryad orasidagi masofa ${k} marta kamaytirilsa, oʻzaro taʼsir kuchi qanday oʻzgaradi?`, `${k * k} marta ortadi`, [`${k} marta ortadi`, `${k * k} marta kamayadi`, `${k} marta kamayadi`, 'oʻzgarmaydi'], `Kulon qonuni: F ~ 1/r². Masofa ${k} marta kamaysa, kuch ${k * k} marta ortadi.`);
  },
  () => {
    const E = pick([6, 9, 12, 24]);
    const r = pick([0.25, 0.5, 1]);
    const I = pick([2, 3, 4]);
    const U = E - I * r;
    if (U <= 0) throw new Error('neg');
    return mcn(`Tok manbaining EYuKi ${E} V, ichki qarshiligi ${num(r)} Ω. Manba zanjirga ${I} A tok berayotgan boʻlsa, uning qutblaridagi kuchlanishni (V) toping.`, U, `U = ℰ − Ir = ${E} − ${I}·${num(r)} = ${num(U)} V.`, 0, [E + I * r, E]);
  },
  () => {
    const R1 = pick([2, 4, 6]);
    const R2 = pick([3, 6, 12]);
    const R3 = R2;
    const U = pick([12, 24, 36]);
    const Rt = R1 + R2 / 2;
    const I = U / Rt;
    if (!Number.isInteger(I * 100)) throw new Error('ugly');
    fig.cur = mixedCircuit(`${R1} Ω`, `${R2} Ω`, `${U} V`);
    return mcn(`${R1} Ω li rezistorga ketma-ket ravishda bir-biriga parallel ulangan ${R2} Ω va ${R3} Ω li rezistorlar ulangan. Zanjirga ${U} V kuchlanish berilsa, umumiy tok kuchini (A) toping.`, I, `Parallel qism: ${R2}/2 = ${num(R2 / 2)} Ω; umumiy R = ${num(Rt)} Ω. I = U/R = ${num(I)} A.`, 0, [U / (R1 + R2 + R3)]);
  },
  () => {
    const [U, P] = pick([[220, 1100], [220, 100], [110, 100], [220, 40], [110, 1100], [220, 2200]] as const);
    const Rr = (U * U) / P;
    return mcn(`${U} V kuchlanishga moʻljallangan lampaning quvvati ${P} W. Uning ishchi holatdagi qarshiligini (Ω) toping.`, Rr, `P = U²/R ⇒ R = U²/P = ${U * U}/${P} = ${num(Rr)} Ω.`, 0, [P / U, U / P]);
  },
  () => {
    const C = pick([2, 4, 5, 10]);
    const U = pick([10, 20, 50, 100]);
    const W = (C * U * U) / 2 / 1000;
    return mcn(`Sigʻimi ${C} μF boʻlgan kondensator ${U} V kuchlanishgacha zaryadlandi. Kondensator energiyasini (mJ) toping.`, W, `W = CU²/2 = ${C}·10⁻⁶·${U * U}/2 = ${num(W)}·10⁻³ J.`, 0, [W * 2]);
  },
  () => {
    const R0 = pick([2, 3.5, 5, 10]);
    const a = pick([0.004, 0.0028, 0.005]);
    const t = pick([50, 100, 200]);
    const dR = R0 * a * t;
    return mcn(`Simning 0 °C dagi qarshiligi ${num(R0)} Ω. Uning qarshiligi ${t} °C da qanchaga (Ω) ortadi? (α = ${num(a)} K⁻¹)`, dR, `ΔR = R₀αΔt = ${num(R0)}·${num(a)}·${t} = ${num(dR)} Ω.`, 0, [R0 + dR]);
  },
  () => {
    const B = pick([0.1, 0.2, 0.5]);
    const I = pick([2, 4, 5, 10]);
    const L = pick([0.2, 0.4, 0.5]);
    const ang = pick([90, 30]);
    const F = B * I * L * (ang === 90 ? 1 : 0.5);
    return mcn(`Induksiyasi ${num(B)} T boʻlgan magnit maydonda uzunligi ${num(L * 100)} cm boʻlgan oʻtkazgich induksiya chiziqlariga ${ang}° burchak ostida joylashgan. Undan ${I} A tok oʻtsa, Amper kuchini (N) toping.`, F, `F = BIL·sin ${ang}° = ${num(B)}·${I}·${num(L)}·${ang === 90 ? 1 : '0,5'} = ${num(F)} N.`, 1, [B * I * L * (ang === 90 ? 0.5 : 1)]);
  },
  () => {
    const a = pick([2, 3, 4]);
    const b = pick([3, 5, 6]);
    const B = pick([1, 2, 5, 10]);
    const I = pick([1, 2, 4]);
    const M = (B * I * a * b) / 10; // mN·m: S in cm² → 10⁻⁴ m²
    return mcn(`Oʻlchamlari ${a} cm va ${b} cm boʻlgan ramka induksiyasi ${B} T boʻlgan magnit maydonda turibdi. Ramkadan ${I} A tok oʻtsa, unga taʼsir etuvchi maksimal kuch momentini (mN·m) toping.`, M, `M = BIS = ${B}·${I}·${a * b}·10⁻⁴ = ${num(M)}·10⁻³ N·m.`, 2, [M * 10, M / 10]);
  },
  () => {
    const [Rr, X, Z] = pick([[8, 6, 10], [3, 4, 5], [6, 8, 10], [12, 5, 13]] as const);
    const XC = pick([X + 3, X + 6, 2 * X]);
    const XL = XC - X;
    const U = Z * pick([10, 14, 20]);
    const I = U / Z;
    fig.cur = rlcCircuit(`${Rr} Ω`, `${XL} Ω`, `${XC} Ω`, `${U} V`);
    return mcn(`${Rr} Ω aktiv, ${XC} Ω sigʻim va ${XL} Ω induktiv qarshiliklar ketma-ket ulangan zanjirga effektiv qiymati ${U} V boʻlgan oʻzgaruvchan kuchlanish berildi. Zanjirdagi foydali (aktiv) quvvatni (W) toping.`, I * I * Rr, `Z = √(${Rr}² + (${XC} − ${XL})²) = ${Z} Ω; I = ${U}/${Z} = ${I} A; P = I²R = ${I * I * Rr} W.`, 19, [U * I, I * I * Z]);
  },
  () => {
    const dPhi = pick([0.2, 0.5, 1, 2]);
    const dt = pick([0.1, 0.2, 0.5]);
    const N = pick([1, 10, 50, 100]);
    const e = (N * dPhi) / dt;
    return mcn(`${N} oʻramli gʻaltakdagi magnit oqimi ${num(dt)} s da ${num(dPhi)} Wb ga tekis oʻzgardi. Induksiya EYuKini (V) toping.`, e, `ℰ = NΔΦ/Δt = ${N}·${num(dPhi)}/${num(dt)} = ${num(e)} V.`, 8, [(dPhi / dt)]);
  },
  () => {
    const f = pick([1, 2, 3, 5, 6, 10]);
    return mcn(`Radiostansiya ${f} MHz chastotada ishlamoqda. U nurlantirayotgan elektromagnit toʻlqin uzunligini (m) toping. (c = 3·10⁸ m/s)`, 300 / f, `λ = c/ν = 3·10⁸/(${f}·10⁶) = ${num(300 / f)} m.`, 23, [f * 300, 3 / f]);
  },
  () => {
    const k = pick([4, 9, 16]);
    return mc(`Tebranish konturidagi kondensator sigʻimi ${k} marta oshirilsa, xususiy tebranish davri qanday oʻzgaradi?`, `${Math.sqrt(k)} marta ortadi`, [`${k} marta ortadi`, `${Math.sqrt(k)} marta kamayadi`, `${k} marta kamayadi`, 'oʻzgarmaydi'], `Tomson formulasi T = 2π√(LC): sigʻim ${k} marta ortsa, T √${k} = ${Math.sqrt(k)} marta ortadi.`, 13);
  },
  () => {
    const U1 = pick([220, 110, 380]);
    const N1 = pick([500, 1000, 2000]);
    const N2 = N1 / pick([2, 4, 5, 10]);
    return mcn(`Transformatorning birlamchi chulgʻamida ${N1}, ikkilamchisida ${N2} oʻram bor. Birlamchi chulgʻamga ${U1} V berilsa, ikkilamchi chulgʻamdagi kuchlanishni (V) toping.`, (U1 * N2) / N1, `U₂/U₁ = N₂/N₁ ⇒ U₂ = ${U1}·${N2}/${N1} = ${num((U1 * N2) / N1)} V.`, 0, [(U1 * N1) / N2]);
  },
  () => {
    const I = pick([2, 4, 5]);
    const t = pick([1800, 3600]);
    const k = 0.33; // mg/C for copper
    const m = (k * I * t) / 1000;
    return mcn(`Mis kuporosi eritmasidan ${I} A tok ${t / 60} minut davomida oʻtdi. Katodda qancha mis (g) ajraladi? (k = 0,33 mg/C)`, m, `m = kIt = 0,33·10⁻⁶·${I}·${t} kg = ${num(m)} g.`, 0, [m * 60, m / 2]);
  }
];

/* --------------------- 26–28. Optika va nisbiylik nazariyasi --------------------- */
const OPT: (() => Q)[] = [
  () => {
    const d = pick([20, 30, 40, 60]);
    const G2 = pick([2, 3, 4]);
    const f = d / G2; // virtual image, diverging lens: 1/F = 1/d − 1/f
    const D = 100 / d - (100 * G2) / d;
    fig.cur = lensScheme(`d = ${d} cm`, '', true);
    return mcn(`Linza oʻzidan ${d} cm masofadagi buyumning ${G2} marta kichiklashgan mavhum tasvirini hosil qildi. Linzaning optik kuchini (dptr) toping.`, D, `Mavhum kichik tasvir — sochuvchi linza. f = d/${G2} = ${num(f)} cm; D = 1/d − 1/f = ${num(100 / d)} − ${num((100 * G2) / d)} = ${num(D)} dptr.`, 0, [-D, 100 / d + (100 * G2) / d]);
  },
  () => {
    const F = pick([10, 20, 25]);
    const d = F * pick([2, 3, 1.5]);
    const f = (d * F) / (d - F);
    fig.cur = lensScheme(`d = ${num(d)} cm`, `F = ${F} cm`);
    return mcn(`Fokus masofasi ${F} cm boʻlgan yigʻuvchi linzadan ${num(d)} cm masofada buyum turibdi. Tasvir linzadan qancha masofada (cm) hosil boʻladi?`, f, `1/F = 1/d + 1/f ⇒ f = dF/(d − F) = ${num(f)} cm.`, 0, [(d * F) / (d + F), d - F]);
  },
  () => {
    const [name, n] = pick([['suv', 4 / 3], ['shisha', 1.5], ['olmos', 2.4]] as const);
    const ask = pick(['v', 'nu']);
    if (ask === 'nu') return mc(`Yorugʻlik nuri havodan ${name}ga oʻtdi. Bunda nurning chastotasi qanday oʻzgaradi?`, 'oʻzgarmaydi', [`${n === 4 / 3 ? '4/3' : num(n)} marta kamayadi`, `${n === 4 / 3 ? '4/3' : num(n)} marta ortadi`, 'ikki marta ortadi', 'nolga teng boʻladi'], 'Bir muhitdan ikkinchisiga oʻtganda chastota oʻzgarmaydi; tezlik va toʻlqin uzunligi n marta kamayadi.');
    const v = 300 / n;
    return mcn(`${name.charAt(0).toUpperCase() + name.slice(1)}ning sindirish koʻrsatkichi ${n === 4 / 3 ? '4/3' : num(n)}. Unda yorugʻlik tezligini (ming km/s) toping.`, v, `v = c/n = 300 ming km/s ÷ ${n === 4 / 3 ? '4/3' : num(n)} = ${num(v)} ming km/s.`, 0, [300 * n]);
  },
  () => {
    const [b, g, gs] = pick([[0.6, 1.25, '1,25'], [0.8, 5 / 3, '5/3']] as const);
    const ask = pick(['m', 'v']);
    if (ask === 'm') return mc(`Jism ${num(b)}c tezlik bilan harakatlanmoqda. Uning massasi tinchlikdagi massasidan necha marta katta?`, gs, ['1,25', '5/3', '1,6', '2', '0,8', '0,6'].filter((x) => x !== gs), `m = m₀/√(1 − v²/c²) = m₀/√(1 − ${num(b * b)}) = ${gs}·m₀.`, 34);
    return mc(`Harakatdagi jismning massasi m = ${gs}·m₀ (m₀ — tinchlikdagi massa). Jism tezligini toping.`, `${num(b)}c`, ['0,6c', '0,8c', '0,5c', '0,9c', '0,75c'].filter((x) => x !== `${num(b)}c`), `√(1 − v²/c²) = 1/${gs} ⇒ v = ${num(b)}c.`, 34);
  },
  () => {
    const dmm = pick([0.01, 0.005, 0.002]);
    const lam = pick([400, 500, 600]);
    const k = 1;
    const sin = (k * lam * 1e-9) / (dmm * 1e-3);
    return mcn(`Davri ${num(dmm)} mm boʻlgan difraksion panjaraga ${lam} nm toʻlqin uzunlikli yorugʻlik tik tushmoqda. Birinchi tartibli maksimum uchun sin φ ni toping.`, sin, `d·sin φ = kλ ⇒ sin φ = ${lam}·10⁻⁹/(${num(dmm)}·10⁻³) = ${num(sin)}.`, 27, [sin * 2, sin / 2, sin * 10]);
  },
  () => {
    const d = pick([1, 1.5, 2, 3]);
    const x = pick([0.5, 1]);
    return mcn(`Odam yassi koʻzgudan ${num(d)} m uzoqlikda turibdi. U koʻzguga ${num(x)} m yaqinlashsa, odam bilan uning tasviri orasidagi masofa (m) qancha boʻladi?`, 2 * (d - x), `Tasvir koʻzgudan odam bilan bir xil masofada: 2(${num(d)} − ${num(x)}) = ${num(2 * (d - x))} m.`, 0, [d - x, 2 * d]);
  }
];

/* --------------------- 29–31. Kvant, atom va yadro fizikasi --------------------- */
const ISO: [string, number, number][] = [
  ['Po', 84, 209],
  ['U', 92, 235],
  ['U', 92, 238],
  ['Ra', 88, 226],
  ['Pb', 82, 207],
  ['C', 6, 14],
  ['Co', 27, 60],
  ['Rn', 86, 222]
];
const QUANT: (() => Q)[] = [
  () => {
    const [el, Z, A] = pick(ISO);
    return mc(`${A}/${Z} ${el} (massa soni ${A}, zaryad soni ${Z}) yadrosining tarkibini aniqlang.`, `${Z} proton, ${A - Z} neytron`, [`${A - Z} proton, ${Z} neytron`, `${Z} proton, ${A} neytron`, `${A} proton, ${Z} neytron`, `${Z} proton, ${A + Z} neytron`], `Protonlar soni Z = ${Z}, neytronlar soni A − Z = ${A - Z}.`, 41);
  },
  () => {
    const [n1, n2] = pick([[2, 1], [4, 2], [4, 1], [3, 1]] as const);
    const E = 13.6 * (1 / (n2 * n2) - 1 / (n1 * n1));
    return mcn(`Vodorod atomidagi elektron ${n1}-kvant holatdan ${n2}-kvant holatga oʻtdi. Nurlangan foton energiyasini (eV) toping. (Eₙ = −13,6/n² eV)`, Math.round(E * 100) / 100, `E = 13,6(1/${n2 * n2} − 1/${n1 * n1}) = ${num(Math.round(E * 100) / 100)} eV.`, 39, [13.6 / (n1 * n1), 13.6 / (n2 * n2)]);
  },
  () => {
    const Eph = pick([4, 5, 6, 8]);
    const A = pick([2, 2.5, 3]);
    const ask = pick(['E', 'U']);
    return mcn(`Chiqish ishi ${num(A)} eV boʻlgan metallga energiyasi ${Eph} eV boʻlgan fotonlar tushmoqda. Fotoelektronlarning ${ask === 'E' ? 'maksimal kinetik energiyasini (eV)' : 'tutib qoluvchi kuchlanishini (V)'} toping.`, Eph - A, `Eynshteyn tenglamasi: E_k = hν − A = ${Eph} − ${num(A)} = ${num(Eph - A)} ${ask === 'E' ? 'eV' : 'eV ⇒ U = E_k/e = ' + num(Eph - A) + ' V'}.`, 37, [Eph + A]);
  },
  () => {
    const T = pick([2, 3, 5, 8]);
    const n = pick([2, 3, 4]);
    return mc(`Radioaktiv izotopning yarim yemirilish davri ${T} sutka. ${T * n} sutkadan soʻng dastlabki yadrolarning qanday qismi yemirilmay qoladi?`, fr(1, 2 ** n), [fr(1, 2 * n), fr(1, n), fr(2 ** n - 1, 2 ** n), fr(1, 2 ** (n + 1))], `N = N₀·2^(−t/T) = N₀·2^(−${n}) = N₀/${2 ** n}.`, 43);
  },
  () => {
    const [el, Z, A] = pick(ISO.filter((x) => x[1] > 80));
    const a = R(1, 3);
    const b = R(1, 3);
    const Z2 = Z - 2 * a + b;
    const A2 = A - 4 * a;
    return mc(`${A}/${Z} ${el} yadrosi ${a} ta α va ${b} ta β⁻ yemirilishdan soʻng hosil boʻlgan yadroning massa va zaryad sonlarini toping.`, `A = ${A2}, Z = ${Z2}`, [`A = ${A - 2 * a}, Z = ${Z - 2 * a + b}`, `A = ${A2}, Z = ${Z - 2 * a - b}`, `A = ${A2 - b}, Z = ${Z2}`, `A = ${A2}, Z = ${Z - a + b}`], `α: A −4, Z −2; β⁻: Z +1. A = ${A} − 4·${a} = ${A2}, Z = ${Z} − 2·${a} + ${b} = ${Z2}.`, 44);
  },
  () => {
    const lam = pick([248, 310, 400, 496, 620]);
    return mcn(`Toʻlqin uzunligi ${lam} nm boʻlgan foton energiyasini (eV) toping. (hc ≈ 1240 eV·nm)`, 1240 / lam, `E = hc/λ = 1240/${lam} = ${num(1240 / lam)} eV.`, 37, [lam / 1240 * 10]);
  }
];

/* ---------------------- 32. Mantiqiy va hayotiy topshiriq ---------------------- */
const LOGIC: (() => Q)[] = [
  () => {
    const x = pick([12.5, 17.2, 25, 40, 50]);
    const d = pick([0.05, 0.1, 0.25, 0.5]);
    const e = (d / x) * 100;
    return mcn(`Oʻquvchi arqon uzunligini oʻlchab, natijani l = (${num(x)} ± ${num(d)}) m deb yozdi. Oʻlchashning nisbiy xatoligini (%) toping.`, Math.round(e * 100) / 100, `ε = Δl/l·100% = ${num(d)}/${num(x)}·100% ≈ ${num(Math.round(e * 100) / 100)}%.`, 0, [d * 100, (x / d) / 100]);
  },
  () => {
    const P = pick([1000, 1500, 2000]);
    const h = pick([2, 3, 4]);
    const days = 30;
    const price = pick([600, 800, 1000]);
    const kwh = (P / 1000) * h * days;
    return mcn(`Quvvati ${P} W boʻlgan elektr choynak har kuni ${h} soatdan ishlatiladi. 1 kW·soat elektr energiyasi ${price} soʻm boʻlsa, 30 kunda qancha pul (soʻm) toʻlanadi?`, kwh * price, `E = Pt = ${P / 1000} kW·${h * days} soat = ${kwh} kW·soat. Narxi ${kwh}·${price} = ${kwh * price} soʻm.`, 22, [P * h * days * price / 1000 / 2]);
  }
];

/* ------------------------- 33–35. Moslashtirish (Y-2) ------------------------- */
function physMatch(): Q[] {
  const H = '33–35-topshiriqlar uchun umumiy shart:';
  const kind = pick(['throw', 'circuit', 'lens']);
  if (kind === 'throw') {
    const v = pick([10, 20, 30, 40]);
    const hmax = (v * v) / (2 * G);
    fig.cur = verticalThrow(`${v} m/s`);
    return matchBlock(`Jism yerdan ${v} m/s tezlik bilan vertikal yuqoriga otildi (havo qarshiligini hisobga olmang).`, H, [
      ['Jism koʻtarilgan maksimal balandlikni (m) toping.', num(hmax), `h = v₀²/(2g) = ${num(hmax)} m.`],
      ['Koʻtarilish vaqtini (s) toping.', num(v / G), `t = v₀/g = ${num(v / G)} s.`],
      ['Jismning yerga qaytib tushish vaqtini (s, otilgandan boshlab) toping.', num((2 * v) / G), `t = 2v₀/g = ${num((2 * v) / G)} s.`]
    ], [num(hmax * 2), num(v), num((4 * v) / G), num(hmax / 2), num((3 * v) / G)]);
  }
  if (kind === 'circuit') {
    const R1 = pick([2, 4, 6]);
    const R2 = pick([4, 6, 12]);
    const U = (R1 + R2 / 2) * pick([1, 2, 3]);
    const Rt = R1 + R2 / 2;
    const I = U / Rt;
    fig.cur = mixedCircuit(`${R1} Ω`, `${R2} Ω`, `${num(U)} V`);
    return matchBlock(`${R1} Ω li rezistorga ketma-ket ravishda parallel ulangan ikkita ${R2} Ω li rezistor ulangan; zanjirga ${num(U)} V kuchlanish berilgan.`, H, [
      ['Zanjirning umumiy qarshiligini (Ω) toping.', num(Rt), `R = ${R1} + ${R2}/2 = ${num(Rt)} Ω.`],
      ['Umumiy tok kuchini (A) toping.', num(I), `I = U/R = ${num(I)} A.`],
      ['Zanjirda ajraladigan umumiy quvvatni (W) toping.', num(U * I), `P = UI = ${num(U * I)} W.`]
    ], [num(R1 + 2 * R2), num(I / 2), num(U * I * 2), num(I * 2), num(Rt + R1)], 0);
  }
  const F = pick([10, 20]);
  const d = F * pick([1.5, 2, 3]);
  const f = (d * F) / (d - F);
  fig.cur = lensScheme(`d = ${num(d)} cm`, `F = ${F} cm`);
  return matchBlock(`Fokus masofasi ${F} cm boʻlgan yigʻuvchi linzadan ${num(d)} cm masofada buyum joylashgan.`, H, [
    ['Linzaning optik kuchini (dptr) toping.', num(100 / F), `D = 1/F = 1/${num(F / 100)} m = ${num(100 / F)} dptr.`],
    ['Tasvirgacha boʻlgan masofani (cm) toping.', num(f), `f = dF/(d − F) = ${num(f)} cm.`],
    ['Linzaning kattalashtirishini toping.', num(f / d), `Γ = f/d = ${num(f / d)}.`]
  ], [num(F / 10), num(f * 2), num(d / f), num(d - F), num(f + d)]);
}

/* --------------------------- 36–45. Ochiq topshiriqlar --------------------------- */
const O_MECH: (() => Q)[] = [
  () => {
    const v0 = pick([0, 5, 10, 15]);
    const n = pick([2, 3]);
    const sn = v0 + (G * (2 * n - 1)) / 2;
    const t = pick([3, 4]);
    return open(
      `Baland joydan boshlangʻich tezlik bilan pastga tashlangan jism ${n}-sekundda ${num(sn)} m yoʻl oʻtdi.`,
      ['a) Jismning boshlangʻich tezligini (m/s) toping.', v0],
      [`b) Jism dastlabki ${t} s da qancha masofa (m) bosib oʻtadi?`, v0 * t + (G * t * t) / 2],
      `n-sekunddagi yoʻl sₙ = v₀ + g(2n − 1)/2 ⇒ v₀ = ${num(sn)} − ${num((G * (2 * n - 1)) / 2)} = ${v0} m/s. s = v₀t + gt²/2 = ${num(v0 * t + (G * t * t) / 2)} m.`
    );
  },
  () => {
    const [m1, m2] = pick([[3, 1], [4, 1], [3, 2], [6, 4], [9, 1]] as [number, number][]);
    const a = ((m1 - m2) * G) / (m1 + m2);
    const T = (2 * m1 * m2 * G) / (m1 + m2);
    fig.cur = atwood(`${m1} kg`, `${m2} kg`);
    return open(
      `Vaznsiz qoʻzgʻalmas blok orqali oʻtkazilgan ipning uchlariga ${m1} kg va ${m2} kg massali yuklar osilgan.`,
      ['a) Yuklarning tezlanishini (m/s²) toping.', a],
      ['b) Ipning taranglik kuchini (N) toping.', T],
      `a = (m₁ − m₂)g/(m₁ + m₂) = ${num(a)} m/s²; T = 2m₁m₂g/(m₁ + m₂) = ${num(T)} N.`
    );
  },
  () => {
    const [Mk, Rk, g2, ratio] = pick([[1, 2, 2.5, 2], [4, 1, 40, 0.5], [9, 3, 10, 1], [2, 2, 5, Math.SQRT2]] as [number, number, number, number][]);
    if (!Number.isInteger(ratio * 10)) throw new Error('irrational');
    return open(
      `Sayyoraning massasi Yernikidan ${Mk === 1 ? 'farq qilmaydi' : `${Mk} marta katta`}, radiusi esa ${Rk === 1 ? 'Yer radiusiga teng' : `${Rk} marta katta`}. (Yerda g = 10 m/s²)`,
      ['a) Sayyora sirtida erkin tushish tezlanishini (m/s²) toping.', g2],
      ['b) Matematik mayatnikning sayyoradagi tebranish davri Yerdagidan necha marta katta?', ratio],
      `g′ = g·M/R² = 10·${Mk}/${Rk * Rk} = ${num(g2)} m/s². T ~ 1/√g ⇒ T′/T = √(10/${num(g2)}) = ${num(ratio)}.`
    );
  },
  () => {
    const m = pick([1, 2, 5]);
    const h = pick([5, 20, 45]);
    const v = Math.sqrt(2 * G * h);
    return open(
      `${m} kg massali jism ${h} m balandlikdan boshlangʻich tezliksiz tushdi (havo qarshiligi hisobga olinmaydi).`,
      ['a) Yerga urilish paytidagi tezligini (m/s) toping.', v],
      ['b) Shu paytdagi kinetik energiyasini (J) toping.', m * G * h],
      `v = √(2gh) = ${num(v)} m/s; E_k = mgh = ${m * G * h} J.`
    );
  }
];
const O_MOL: (() => Q)[] = [
  () => {
    const Q = pick([2, 5, 6, 10]);
    return open(
      `Bir atomli ideal gazga izobarik jarayonda ${Q} kJ issiqlik berildi.`,
      ['a) Gaz bajargan ishni (kJ) toping.', 0.4 * Q],
      ['b) Gaz ichki energiyasining oʻzgarishini (kJ) toping.', 0.6 * Q],
      `Izobarik jarayonda Q = (5/2)pΔV, A = pΔV = 0,4Q = ${num(0.4 * Q)} kJ; ΔU = (3/2)pΔV = 0,6Q = ${num(0.6 * Q)} kJ.`
    );
  },
  () => {
    const V = pick([2, 4, 5]);
    const [t, rho0] = pick([[17, 14.5], [19, 16.3], [20, 17.3]] as const);
    const phi = pick([40, 50, 60]);
    const m = (rho0 * phi * V) / 100;
    return open(
      `Hajmi ${V} m³ boʻlgan xonadagi ${t} °C haroratli havoda ${num(m)} g suv bugʻi bor. Bu haroratda toʻyingan bugʻ zichligi ${num(rho0)} g/m³.`,
      ['a) Havoning absolyut namligini (g/m³) toping.', m / V],
      ['b) Havoning nisbiy namligini (%) toping.', phi],
      `ρ = m/V = ${num(m / V)} g/m³; φ = ρ/ρ₀·100% = ${phi}%.`
    );
  },
  () => {
    const T1 = pick([300, 400]);
    const k = pick([2, 3]);
    const p = pick([100, 200]);
    const V1 = pick([2, 3, 5]);
    return open(
      `Ideal gaz ${p} kPa oʻzgarmas bosimda ${T1} K dan ${T1 * k} K gacha isitildi. Gazning dastlabki hajmi ${V1} l.`,
      ['a) Gazning oxirgi hajmini (l) toping.', V1 * k],
      ['b) Gaz bajargan ishni (J) toping.', p * V1 * (k - 1)],
      `V/T = const ⇒ V₂ = ${V1 * k} l. A = pΔV = ${p}·10³·${V1 * (k - 1)}·10⁻³ = ${p * V1 * (k - 1)} J.`
    );
  }
];
const O_ELEC: (() => Q)[] = [
  () => {
    const C = pick([2, 5, 10, 20]);
    const U = pick([10, 50, 100, 200]);
    return open(
      `Sigʻimi ${C} μF boʻlgan kondensator ${U} V kuchlanishli manbaga ulandi.`,
      ['a) Kondensator zaryadini (μC) toping.', C * U],
      ['b) Kondensator energiyasini (mJ) toping.', (C * U * U) / 2000],
      `q = CU = ${C * U} μC; W = CU²/2 = ${num((C * U * U) / 2000)} mJ.`
    );
  },
  () => {
    const [Rr, X, Z] = pick([[8, 6, 10], [3, 4, 5], [6, 8, 10], [12, 5, 13]] as const);
    const XL = X + pick([2, 4, 6]);
    const XC = XL - X;
    const U = Z * pick([2, 5, 10, 22]);
    fig.cur = rlcCircuit(`${Rr} Ω`, `${XL} Ω`, `${XC} Ω`, `${U} V`);
    return open(
      `${Rr} Ω aktiv qarshilik, induktiv qarshiligi ${XL} Ω boʻlgan gʻaltak va sigʻim qarshiligi ${XC} Ω boʻlgan kondensator ketma-ket ulanib, ${U} V effektiv kuchlanishga ulandi.`,
      ['a) Zanjirning toʻla qarshiligini (Ω) toping.', Z],
      ['b) Zanjirdagi tok kuchining effektiv qiymatini (A) toping.', U / Z],
      `Z = √(${Rr}² + (${XL} − ${XC})²) = ${Z} Ω; I = U/Z = ${num(U / Z)} A.`,
      19
    );
  },
  () => {
    const E = pick([12, 24]);
    const r = pick([1, 2]);
    const Rr = pick([4, 6, 10]);
    const I = E / (Rr + r);
    if (!Number.isInteger(I * 100) || !Number.isInteger((Rr / (Rr + r)) * 1000)) throw new Error('ugly');
    return open(
      `EYuKi ${E} V, ichki qarshiligi ${r} Ω boʻlgan manbaga ${Rr} Ω li rezistor ulandi.`,
      ['a) Zanjirdagi tok kuchini (A) toping.', I],
      ['b) Manbaning FIKini (%) toping.', (Rr / (Rr + r)) * 100],
      `I = ℰ/(R + r) = ${num(I)} A; η = R/(R + r)·100% = ${num((Rr / (Rr + r)) * 100)}%.`
    );
  }
];
const O_OPT: (() => Q)[] = [
  () => {
    const [d, Gm] = pick([[30, 2], [20, 1], [40, 1], [60, 0.5], [15, 2], [30, 1]] as [number, number][]);
    const f = Gm * d;
    const D = 100 / d + 100 / f;
    if (!Number.isInteger(D * 10)) throw new Error('ugly');
    fig.cur = lensScheme(`d = ${d} cm`, '');
    return open(
      `Yigʻuvchi linza oʻzidan ${d} cm masofadagi buyumning ${num(Gm)} marta ${Gm >= 1 ? 'kattalashgan' : 'kichiklashgan'} haqiqiy tasvirini hosil qildi.`,
      ['a) Linzadan tasvirgacha masofani (cm) toping.', f],
      ['b) Linzaning optik kuchini (dptr) toping.', D],
      `f = Γd = ${num(f)} cm; D = 1/d + 1/f = ${num(100 / d)} + ${num(100 / f)} = ${num(D)} dptr.`
    );
  },
  () => {
    const [b, g, ek] = pick([[0.6, 1.25, 0.25], [0.8, 5 / 3, 2 / 3]] as [number, number, number][]);
    return open(
      `Zarra ${num(b)}c tezlik bilan harakatlanmoqda.`,
      ['a) Zarra massasi tinchlikdagi massasidan necha marta katta?', b === 0.6 ? '1,25' : '5/3'],
      ['b) Kinetik energiyasining tinchlikdagi energiyasiga (m₀c²) nisbatini toping.', b === 0.6 ? '0,25' : '2/3'],
      `γ = 1/√(1 − ${num(b * b)}) = ${b === 0.6 ? '1,25' : '5/3'}; E_k = (γ − 1)m₀c² ⇒ nisbat ${b === 0.6 ? '0,25' : '2/3'}.${g && ek ? '' : ''}`,
      34
    );
  },
  () => {
    const [name, n, ns, nu] = pick([['shisha', 1.5, '1,5', 5], ['suv', 4 / 3, '4/3', 5], ['suv', 4 / 3, '4/3', 6], ['olmos', 2.4, '2,4', 5]] as [string, number, string, number][]);
    return open(
      `Chastotasi ${nu}·10¹⁴ Hz boʻlgan yorugʻlik havodan sindirish koʻrsatkichi ${ns} boʻlgan ${name}ga oʻtdi. (c = 3·10⁸ m/s)`,
      ['a) Muhitda yorugʻlik tezligini (10⁸ m/s birlikda) toping.', 3 / n],
      ['b) Muhitdagi toʻlqin uzunligini (nm) toping.', Math.round(300000 / (n * nu * 100)) ],
      `v = c/n = ${num(3 / n)}·10⁸ m/s; λ = v/ν = ${num(3 / n)}·10⁸/(${nu}·10¹⁴) ≈ ${Math.round(300000 / (n * nu * 100))} nm.`
    );
  }
];
const O_QUANT: (() => Q)[] = [
  () => {
    const [n1, n2] = pick([[2, 1], [4, 2], [4, 1]] as const);
    const E = Math.round(13.6 * (1 / (n2 * n2) - 1 / (n1 * n1)) * 100) / 100;
    return open(
      `Vodorod atomidagi elektron ${n1}-energetik sathdan ${n2}-sathga oʻtdi (Eₙ = −13,6/n² eV).`,
      ['a) Nurlangan foton energiyasini (eV) toping.', E],
      [`b) Atomni ${n2}-sathdan ionlashtirish uchun qancha energiya (eV) kerak?`, Math.round((13.6 / (n2 * n2)) * 100) / 100],
      `E = 13,6(1/${n2 * n2} − 1/${n1 * n1}) = ${num(E)} eV; ionlash energiyasi 13,6/${n2 * n2} = ${num(13.6 / (n2 * n2))} eV.`,
      39
    );
  },
  () => {
    const A = pick([2, 2.5, 3.1, 4]);
    const Eph = pick([5, 6, 8]);
    return open(
      `Chiqish ishi ${num(A)} eV boʻlgan metallga ${Eph} eV energiyali fotonlar tushmoqda.`,
      ['a) Fotoelektronlarning maksimal kinetik energiyasini (eV) toping.', Eph - A],
      ['b) Fotoeffektning qizil chegarasiga mos toʻlqin uzunligini (nm) toping. (hc ≈ 1240 eV·nm)', 1240 / A],
      `E_k = hν − A = ${num(Eph - A)} eV; λ_max = hc/A = 1240/${num(A)} = ${num(1240 / A)} nm.`,
      37
    );
  }
];

/* ---------------------------------- assemble ---------------------------------- */
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

/** A fresh 45-task physics variant (client side only — random). */
export function buildPhysicsExam(): G11Question[] {
  const list: Q[] = [
    ...distinct(MECH, 10),
    ...distinct(MOL, 5),
    ...distinct(ELEC, 10),
    ...distinct(OPT, 3),
    ...distinct(QUANT, 3),
    fromPool(LOGIC),
    ...tryBlock(physMatch),
    ...distinct(O_MECH, 3),
    ...distinct(O_MOL, 2),
    ...distinct(O_ELEC, 2),
    ...distinct(O_OPT, 2),
    fromPool(O_QUANT)
  ];
  return toQuestions(list, 'g11-fiz');
}
