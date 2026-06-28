/**
 * Generates all original SVG art assets (no copyrighted material):
 *  - public/logo.svg + public/logo-mark.svg + src/app/icon.svg
 *  - public/sketches/tier1..tier5.svg   (grade-tile educational doodles, SRS §5.5)
 *  - public/sketches/subj-<id>.svg      (subject science sketches, SRS §5.6)
 *  - public/mascots/<subject_key>.svg   (book mascots; matematika = bespoke)
 *
 * Run: node scripts/gen-assets.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pub = (...p) => join(root, 'public', ...p);
mkdirSync(pub('sketches'), { recursive: true });
mkdirSync(pub('mascots'), { recursive: true });

const FONT = `font-family="Nunito, Arial, sans-serif" font-weight="800"`;

/* ----------------------------- LOGO ----------------------------- */
// Colorful interlocking-Q mark: segmented gradient ring + tail + small ring.
const BRAND = { orange: '#F39A1F', blue: '#1FA7E0', green: '#8DC63F', magenta: '#C2298A', purple: '#5A2D82', ink: '#1E3A5F' };

function arc(cx, cy, r, a0, a1, color, w = 17) {
  const rad = (a) => [(cx + r * Math.cos((a * Math.PI) / 180)).toFixed(2), (cy + r * Math.sin((a * Math.PI) / 180)).toFixed(2)];
  const [x0, y0] = rad(a0);
  const [x1, y1] = rad(a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `<path d="M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}" stroke="${color}" stroke-width="${w}" stroke-linecap="round" fill="none"/>`;
}

const qMarkInner = `
  ${arc(62, 62, 44, -90, -25, BRAND.orange)}
  ${arc(62, 62, 44, -15, 50, BRAND.magenta)}
  ${arc(62, 62, 44, 60, 125, BRAND.purple)}
  ${arc(62, 62, 44, 135, 200, BRAND.blue)}
  ${arc(62, 62, 44, 210, 260, BRAND.green)}
  <line x1="88" y1="88" x2="112" y2="112" stroke="${BRAND.orange}" stroke-width="18" stroke-linecap="round"/>
  <circle cx="62" cy="62" r="13" fill="none" stroke="${BRAND.orange}" stroke-width="9" opacity="0.95"/>
`;

const logoMark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 124">${qMarkInner}</svg>`;

const logoFull = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 124">
  ${qMarkInner}
  <text x="134" y="82" ${FONT} font-size="54" fill="${BRAND.ink}">QuvnoqTest</text>
  <text x="436" y="110" ${FONT} font-size="20" fill="${BRAND.blue}">.uz</text>
</svg>`;

writeFileSync(pub('logo-mark.svg'), logoMark);
writeFileSync(pub('logo.svg'), logoFull);
mkdirSync(join(root, 'src', 'app'), { recursive: true });
writeFileSync(join(root, 'src', 'app', 'icon.svg'), logoMark);

/* ------------------------ chalk doodle helpers ------------------------ */
const W = (inner) =>
  `<g stroke="#fff" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.92">${inner}</g>`;
const TXT = (x, y, s, size = 20) => `<text x="${x}" y="${y}" ${FONT} font-size="${size}" fill="#fff" opacity="0.92" stroke="none">${s}</text>`;
const wrap = (inner, vb = '0 0 200 200') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${inner}</svg>`;

const sun = (x, y, r = 11) =>
  `<circle cx="${x}" cy="${y}" r="${r}"/>` +
  [0, 45, 90, 135, 180, 225, 270, 315]
    .map((a) => {
      const dx = Math.cos((a * Math.PI) / 180);
      const dy = Math.sin((a * Math.PI) / 180);
      return `<line x1="${x + dx * (r + 4)}" y1="${y + dy * (r + 4)}" x2="${x + dx * (r + 10)}" y2="${y + dy * (r + 10)}"/>`;
    })
    .join('');
const apple = (x, y, s = 1) =>
  `<path d="M ${x} ${y} c -8 -2 -14 4 -13 12 c 1 9 7 15 13 15 c 6 0 12 -6 13 -15 c 1 -8 -5 -14 -13 -12 z" transform="scale(${s})"/>` +
  `<path d="M ${x} ${y - 1} q 1 -7 6 -9" transform="scale(${s})"/>`;
const leaf = (x, y) => `<path d="M ${x} ${y} q 14 -18 28 0 q -14 18 -28 0 z"/><line x1="${x + 4}" y1="${y}" x2="${x + 24}" y2="${y}"/>`;
const clock = (x, y, r = 13) => `<circle cx="${x}" cy="${y}" r="${r}"/><line x1="${x}" y1="${y}" x2="${x}" y2="${y - 8}"/><line x1="${x}" y1="${y}" x2="${x + 6}" y2="${y + 2}"/>`;
const globe = (x, y, r = 14) =>
  `<circle cx="${x}" cy="${y}" r="${r}"/><ellipse cx="${x}" cy="${y}" rx="${r * 0.45}" ry="${r}"/><line x1="${x - r}" y1="${y}" x2="${x + r}" y2="${y}"/>`;
const beaker = (x, y) => `<path d="M ${x} ${y} h 16 v 12 l 7 14 q 2 5 -3 5 h -24 q -5 0 -3 -5 l 7 -14 z"/><line x1="${x - 2}" y1="${y + 18}" x2="${x + 18}" y2="${y + 18}"/>`;
const note = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="6" ry="4.5"/><line x1="${x + 6}" y1="${y - 1}" x2="${x + 6}" y2="${y - 26}"/><path d="M ${x + 6} ${y - 26} q 10 2 12 9"/>`;
const atom = (x, y) =>
  `<circle cx="${x}" cy="${y}" r="3" fill="#fff"/><ellipse cx="${x}" cy="${y}" rx="20" ry="8"/><ellipse cx="${x}" cy="${y}" rx="20" ry="8" transform="rotate(60 ${x} ${y})"/><ellipse cx="${x}" cy="${y}" rx="20" ry="8" transform="rotate(120 ${x} ${y})"/>`;
const flask = (x, y) => `<path d="M ${x} ${y} v 12 l -12 20 q -3 6 4 6 h 22 q 7 0 4 -6 l -12 -20 v -12 z"/><line x1="${x - 4}" y1="${y}" x2="${x + 10}" y2="${y}"/><circle cx="${x + 1}" cy="${y + 26}" r="2" fill="#fff"/>`;
const dna = (x, y) =>
  `<path d="M ${x} ${y} q 12 8 0 16 q -12 8 0 16"/><path d="M ${x + 14} ${y} q -12 8 0 16 q 12 8 0 16"/>` +
  [4, 12, 20, 28].map((d) => `<line x1="${x + 2}" y1="${y + d}" x2="${x + 12}" y2="${y + d}"/>`).join('');
const planet = (x, y, r = 12) => `<circle cx="${x}" cy="${y}" r="${r}"/><ellipse cx="${x}" cy="${y}" rx="${r + 9}" ry="5" transform="rotate(-18 ${x} ${y})"/>`;
const telescope = (x, y) => `<line x1="${x}" y1="${y}" x2="${x + 26}" y2="${y - 16}" stroke-width="6"/><line x1="${x + 6}" y1="${y + 2}" x2="${x - 2}" y2="${y + 18}"/><line x1="${x + 10}" y1="${y - 1}" x2="${x + 18}" y2="${y + 16}"/>`;
const ruler = (x, y) =>
  `<rect x="${x}" y="${y}" width="44" height="12" rx="2" transform="rotate(-20 ${x} ${y})"/>` +
  [8, 16, 24, 32].map((d) => `<line x1="${x + d}" y1="${y}" x2="${x + d}" y2="${y + 5}" transform="rotate(-20 ${x} ${y})"/>`).join('');
const triangleAngles = (x, y) => `<path d="M ${x} ${y + 26} L ${x + 36} ${y + 26} L ${x + 28} ${y} z"/><path d="M ${x + 8} ${y + 26} a 8 8 0 0 0 6 -5"/>`;
const circuit = (x, y) => `<line x1="${x}" y1="${y}" x2="${x + 10}" y2="${y}"/><path d="M ${x + 10} ${y} l 3 -6 l 5 12 l 5 -12 l 5 12 l 3 -6"/><line x1="${x + 31}" y1="${y}" x2="${x + 41}" y2="${y}"/>`;
const scales = (x, y) =>
  `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 30}"/><line x1="${x - 20}" y1="${y + 6}" x2="${x + 20}" y2="${y + 6}"/><path d="M ${x - 20} ${y + 6} l -7 12 h 14 z"/><path d="M ${x + 20} ${y + 6} l -7 12 h 14 z"/><line x1="${x - 8}" y1="${y + 34}" x2="${x + 8}" y2="${y + 34}"/>`;
const gear = (x, y, r = 12) =>
  `<circle cx="${x}" cy="${y}" r="${r}"/><circle cx="${x}" cy="${y}" r="${r * 0.4}"/>` +
  [0, 60, 120, 180, 240, 300]
    .map((a) => {
      const dx = Math.cos((a * Math.PI) / 180);
      const dy = Math.sin((a * Math.PI) / 180);
      return `<line x1="${x + dx * r}" y1="${y + dy * r}" x2="${x + dx * (r + 6)}" y2="${y + dy * (r + 6)}"/>`;
    })
    .join('');
const book = (x, y) => `<path d="M ${x} ${y} q 14 -7 28 0 v 22 q -14 -7 -28 0 z"/><line x1="${x + 14}" y1="${y - 4}" x2="${x + 14}" y2="${y + 18}"/>`;
const quill = (x, y) => `<path d="M ${x} ${y} q 16 -22 30 -24 q -4 16 -22 28 z"/><line x1="${x + 2}" y1="${y + 2}" x2="${x - 6}" y2="${y + 12}"/>`;
const speech = (x, y) => `<path d="M ${x} ${y} h 34 a 7 7 0 0 1 7 7 v 14 a 7 7 0 0 1 -7 7 h -18 l -9 9 v -9 h -7 a 7 7 0 0 1 -7 -7 v -14 a 7 7 0 0 1 7 -7 z"/>`;
const coin = (x, y) => `<circle cx="${x}" cy="${y}" r="12"/><circle cx="${x}" cy="${y}" r="8"/>`;
const chartUp = (x, y) => `<polyline points="${x},${y + 24} ${x},${y} ${x + 34},${y}" transform="translate(0,0)"/><polyline points="${x + 4},${y + 16} ${x + 14},${y + 8} ${x + 20},${y + 12} ${x + 30},${y + 2}"/>`;
const arch = (x, y) => `<path d="M ${x} ${y + 28} v -16 a 14 14 0 0 1 28 0 v 16"/><line x1="${x - 6}" y1="${y + 28}" x2="${x + 34}" y2="${y + 28}"/>`;
const compassTool = (x, y) => `<path d="M ${x} ${y} l -10 28 M ${x} ${y} l 10 28"/><circle cx="${x}" cy="${y - 3}" r="3.5"/>`;
const monitor = (x, y) => `<rect x="${x}" y="${y}" width="36" height="24" rx="4"/><line x1="${x + 12}" y1="${y + 30}" x2="${x + 24}" y2="${y + 30}"/><line x1="${x + 18}" y1="${y + 24}" x2="${x + 18}" y2="${y + 30}"/>`;
const heart = (x, y) => `<path d="M ${x} ${y + 6} c -8 -12 -24 -2 -14 10 c 6 7 14 12 14 12 c 0 0 8 -5 14 -12 c 10 -12 -6 -22 -14 -10 z"/>`;
const star5 = (x, y, r = 12) => {
  let pts = [];
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 === 0 ? r : r * 0.45;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * Math.sin(a)).toFixed(1)}`);
  }
  return `<polygon points="${pts.join(' ')}"/>`;
};
const palette = (x, y) => `<path d="M ${x} ${y} a 18 16 0 1 0 14 26 q -8 -6 2 -10 a 18 16 0 0 0 -16 -16 z"/><circle cx="${x - 4}" cy="${y + 8}" r="2.4" fill="#fff"/><circle cx="${x + 3}" cy="${y + 4}" r="2.4" fill="#fff"/><circle cx="${x - 7}" cy="${y + 16}" r="2.4" fill="#fff"/>`;
const pencil = (x, y) => `<rect x="${x}" y="${y}" width="26" height="8" rx="2" transform="rotate(-35 ${x} ${y})"/><path d="M ${x - 5} ${y + 4} l 7 5 l -9 2 z" transform="rotate(-35 ${x} ${y})"/>`;
const mount = (x, y) => `<path d="M ${x} ${y + 22} l 12 -22 l 8 12 l 6 -8 l 10 18 z"/>`;
const shield = (x, y) => `<path d="M ${x} ${y} q 12 5 24 0 v 16 q 0 12 -12 18 q -12 -6 -12 -18 z"/>`;
const shapesRow = (x, y, s = 1) =>
  `<circle cx="${x}" cy="${y}" r="${9 * s}"/><rect x="${x + 16 * s}" y="${y - 9 * s}" width="${18 * s}" height="${18 * s}" rx="2"/><path d="M ${x + 44 * s} ${y + 9 * s} l ${9 * s} ${-18 * s} l ${9 * s} ${18 * s} z"/>`;
const dots = (x, y, n = 3, gap = 12) => Array.from({ length: n }, (_, i) => `<circle cx="${x + i * gap}" cy="${y}" r="3.4" fill="#fff" stroke="none"/>`).join('');

/* ------------------------- grade tier sketches ------------------------- */
const tiers = {
  tier1: W(`${shapesRow(28, 36)} ${sun(168, 34)} ${apple(40, 150)} ${dots(126, 168, 4)}`) + TXT(120, 64, '1 2 3', 22) + TXT(28, 178, '+', 24),
  tier2: W(`${ruler(24, 48)} ${leaf(132, 36)} ${clock(168, 150)} ${dots(30, 160, 3)} ${dots(30, 174, 3)}`) + TXT(120, 178, '½', 26) + TXT(60, 178, '×', 24),
  tier3: W(`${globe(168, 40)} ${beaker(34, 134)} ${note(150, 170)}`) + TXT(26, 52, 'x', 26) + TXT(54, 40, 'y', 22) + TXT(82, 52, '=', 24),
  tier4: W(`${triangleAngles(20, 28)} ${atom(166, 44)} ${flask(36, 128)} ${circuit(120, 172)}`) + TXT(118, 120, 'a²+b²', 19),
  tier5: W(`${dna(160, 24)} ${planet(40, 152)} ${telescope(140, 168)}`) + TXT(24, 56, '∫', 34) + TXT(52, 48, "f′(x)", 18)
};
for (const [name, inner] of Object.entries(tiers)) writeFileSync(pub('sketches', `${name}.svg`), wrap(inner));

/* ------------------------- subject sketches ------------------------- */
const subj = {
  math: W(shapesRow(40, 120, 1.1)) + TXT(40, 70, '1 2 3', 30) + TXT(140, 130, '+', 30),
  nature: W(`${sun(60, 56, 14)} ${leaf(110, 120)} <path d="M 60 130 q -10 16 0 24 q 10 -8 0 -24 z"/>`),
  heart: W(`${heart(94, 70)} ${star5(60, 140, 13)}`),
  art: W(`${palette(110, 60)} ${pencil(50, 140)}`),
  music: W(`${note(70, 120)} ${note(120, 100)} <path d="M 40 150 q 8 -6 16 0 q 8 6 16 0" />`),
  tech: W(`${gear(80, 80, 16)} ${gear(130, 130, 11)}`),
  english: W(speech(50, 60)) + TXT(64, 86, 'ABC', 22),
  info: W(monitor(60, 70)) + TXT(70, 130, '< / >', 20),
  lang: W(`${book(56, 70)} ${pencil(120, 140)}`) + TXT(120, 80, 'A b', 22),
  lit: W(`${book(50, 80)} ${quill(120, 120)}`),
  rus: W(book(50, 80)) + TXT(110, 100, 'Аа', 26),
  uzhist: W(`${arch(70, 60)} <line x1="60" y1="130" x2="140" y2="130"/> ${star5(140, 70, 9)}`),
  worldhist: W(`${globe(70, 80, 18)} <path d="M 120 130 v -34 m 10 34 v -34 m -16 0 h 22 m -24 34 h 26"/>`),
  algebra: W(`<path d="M 120 60 h 14 l 8 22 m 0 -22 l -8 22" opacity="0"/>`) + TXT(46, 84, 'x + y', 26) + TXT(60, 130, '= 5', 26) + W(`<path d="M 130 110 l 6 14 l 10 -28" />`),
  geometry: W(`${triangleAngles(50, 70)} ${compassTool(140, 110)}`),
  physics: W(`${atom(80, 80)} <line x1="130" y1="60" x2="130" y2="100"/> <circle cx="130" cy="110" r="8"/>`),
  chem: W(`${flask(80, 70)} <circle cx="120" cy="120" r="3" fill="#fff"/> <circle cx="130" cy="105" r="2.4" fill="#fff"/>`),
  bio: W(`${leaf(50, 80)} <circle cx="120" cy="120" r="20"/> <circle cx="126" cy="114" r="6"/>`),
  geo: W(`${globe(80, 80, 20)} ${mount(110, 120)}`),
  econ: W(`${coin(60, 70)} ${chartUp(100, 100)}`),
  draft: W(`${ruler(40, 90)} ${compassTool(130, 70)} <rect x="110" y="120" width="34" height="22" rx="2"/>`),
  langlit: W(`${book(56, 70)} ${quill(120, 130)}`) + TXT(124, 84, 'A', 24),
  calculus: W(`<path d="M 120 120 q 20 -36 40 -4" />`) + TXT(40, 90, '∫', 40) + TXT(70, 130, "f′(x)", 20),
  law: W(scales(100, 60)),
  biz: W(`<rect x="50" y="80" width="44" height="32" rx="6"/> <path d="M 62 80 v -8 h 20 v 8"/> ${chartUp(110, 70)}`),
  chbt: W(`${shield(80, 60)} ${star5(92, 80, 7)} ${heart(130, 120)}`),
  astro: W(`${planet(80, 80, 16)} ${telescope(110, 150)} ${star5(150, 60, 7)} ${star5(40, 130, 5)}`)
};
for (const [name, inner] of Object.entries(subj)) writeFileSync(pub('sketches', `subj-${name}.svg`), wrap(inner));

/* --------------------------- book mascots --------------------------- */
function shade(hex, f) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (sh) => Math.max(0, Math.min(255, Math.round(((n >> sh) & 255) * f)));
  return `#${((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, '0')}`;
}

function mascotSvg(color, motif, math = false) {
  const dark = shade(color, 0.72);
  const light = shade(color, 1.25);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 240">
  <!-- legs -->
  <line x1="92" y1="196" x2="88" y2="216" stroke="#1E3A5F" stroke-width="7" stroke-linecap="round"/>
  <line x1="128" y1="196" x2="132" y2="216" stroke="#1E3A5F" stroke-width="7" stroke-linecap="round"/>
  <ellipse cx="84" cy="222" rx="13" ry="7" fill="#1E3A5F"/>
  <ellipse cx="136" cy="222" rx="13" ry="7" fill="#1E3A5F"/>
  <!-- arms -->
  <path d="M 62 130 q -22 6 -26 26" stroke="#1E3A5F" stroke-width="7" fill="none" stroke-linecap="round"/>
  <circle cx="36" cy="158" r="8" fill="${color}" stroke="#1E3A5F" stroke-width="3"/>
  <path d="M 158 130 q 22 6 26 26" stroke="#1E3A5F" stroke-width="7" fill="none" stroke-linecap="round"/>
  <circle cx="184" cy="158" r="8" fill="${color}" stroke="#1E3A5F" stroke-width="3"/>
  <!-- book body -->
  <rect x="58" y="28" width="104" height="170" rx="14" fill="${color}" stroke="${dark}" stroke-width="4"/>
  <rect x="58" y="28" width="18" height="170" rx="9" fill="${dark}"/>
  <rect x="148" y="36" width="10" height="154" rx="4" fill="#FFF8E7"/>
  <line x1="153" y1="44" x2="153" y2="182" stroke="#E8D9B0" stroke-width="2"/>
  <!-- cover motif -->
  <g transform="translate(78,34) scale(0.42)">${motif}</g>
  ${math ? `<g font-family="Nunito, Arial, sans-serif" font-weight="800" fill="#fff" opacity="0.95">
    <text x="86" y="186" font-size="17">1+2=3</text>
  </g>
  <g stroke="#fff" stroke-width="2.6" fill="none" opacity="0.9">
    <circle cx="93" cy="64" r="7"/><rect x="106" y="57" width="14" height="14" rx="2"/><path d="M 128 71 l 7 -14 l 7 14 z"/>
  </g>` : ''}
  <!-- face -->
  <circle cx="96" cy="112" r="11" fill="#fff"/>
  <circle cx="128" cy="112" r="11" fill="#fff"/>
  <circle cx="98" cy="114" r="5" fill="#1E3A5F"/>
  <circle cx="130" cy="114" r="5" fill="#1E3A5F"/>
  <circle cx="100" cy="112" r="1.8" fill="#fff"/>
  <circle cx="132" cy="112" r="1.8" fill="#fff"/>
  <path d="M 100 138 q 12 12 24 0" stroke="#1E3A5F" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="86" cy="130" r="6" fill="#FF9DB0" opacity="0.7"/>
  <circle cx="138" cy="130" r="6" fill="#FF9DB0" opacity="0.7"/>
  <!-- shine -->
  <path d="M 70 40 q 14 -8 28 -6" stroke="${light}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.7"/>
</svg>`;
}

// subject key → {color, sketchId} (must mirror src/content/taxonomy.ts)
const MASCOTS = {
  'ona-tili-savod': ['#1FA7E0', 'lang'],
  matematika: ['#F39A1F', 'math'],
  'tabiiy-fanlar': ['#8DC63F', 'nature'],
  tarbiya: ['#C2298A', 'heart'],
  'tasviriy-sanat': ['#E14B4B', 'art'],
  musiqa: ['#5A2D82', 'music'],
  texnologiya: ['#1E3A5F', 'tech'],
  'ingliz-tili': ['#1FA7E0', 'english'],
  informatika: ['#5A2D82', 'info'],
  'ona-tili': ['#1FA7E0', 'lang'],
  adabiyot: ['#C2298A', 'lit'],
  'rus-tili': ['#E14B4B', 'rus'],
  'ozbekiston-tarixi': ['#8DC63F', 'uzhist'],
  'jahon-tarixi': ['#F39A1F', 'worldhist'],
  tarix: ['#8DC63F', 'uzhist'],
  algebra: ['#F39A1F', 'algebra'],
  geometriya: ['#1FA7E0', 'geometry'],
  fizika: ['#5A2D82', 'physics'],
  kimyo: ['#8DC63F', 'chem'],
  biologiya: ['#8DC63F', 'bio'],
  geografiya: ['#1FA7E0', 'geo'],
  iqtisodiyot: ['#F39A1F', 'econ'],
  chizmachilik: ['#1E3A5F', 'draft'],
  'ona-tili-adabiyot': ['#C2298A', 'langlit'],
  'algebra-analiz': ['#F39A1F', 'calculus'],
  'davlat-huquq': ['#1E3A5F', 'law'],
  tadbirkorlik: ['#8DC63F', 'biz'],
  chbt: ['#C2298A', 'chbt'],
  astronomiya: ['#5A2D82', 'astro']
};

for (const [key, [color, sk]] of Object.entries(MASCOTS)) {
  const motif = subj[sk] ?? subj.math;
  writeFileSync(pub('mascots', `${key}.svg`), mascotSvg(color, motif, key === 'matematika'));
}

console.log('✅ assets generated: logo, 5 tier sketches, %d subject sketches, %d mascots', Object.keys(subj).length, Object.keys(MASCOTS).length);
