import type { L10n } from '@/lib/i18n-config';
import { getG11Subject, g11SubjectHref } from '@/content/g11/subjects';

export type SubjectDef = {
  /** stable slug, unique within a grade */
  key: string;
  name: L10n;
  /** sketch id → /public/sketches/subj-<sketch>.svg + mascot icon theme */
  sketch: string;
  /** accent color used for tiles + templated mascots */
  color: string;
};

export type GradeDef = {
  grade: number;
  /** sketch tier per SRS §5.5 (1: grades 1–2 … 5: grades 10–11) */
  tier: 1 | 2 | 3 | 4 | 5;
  subjects: SubjectDef[];
};

const S = (key: string, uz: string, ru: string, en: string, sketch: string, color: string): SubjectDef => ({
  key,
  name: { uz, ru, en },
  sketch,
  color
});

/** Master subject registry (names per §7.1, trilingual). */
export const SUBJECTS: Record<string, SubjectDef> = {
  alifbe: S('alifbe', 'Alifbe', 'Алифбе (букварь)', 'Alphabet primer', 'lang', '#F4693B'),
  'ona-tili-savod': S('ona-tili-savod', 'Ona tili', 'Родной язык', 'Native language', 'lang', '#1FA7E0'),
  'oqish-savodxonligi': S('oqish-savodxonligi', 'Oʻqish savodxonligi', 'Читательская грамотность', 'Reading literacy', 'lit', '#C2298A'),
  matematika: S('matematika', 'Matematika', 'Математика', 'Mathematics', 'math', '#F39A1F'),
  fikrlash: S('fikrlash', 'Fikrlash qobiliyati mashqlari', 'Упражнения на мышление', 'Thinking skills practice', 'info', '#5A2D82'),
  'tabiiy-fanlar': S('tabiiy-fanlar', 'Tabiiy fanlar', 'Естественные науки', 'Natural science', 'nature', '#8DC63F'),
  tarbiya: S('tarbiya', 'Tarbiya', 'Воспитание', 'Character education', 'heart', '#C2298A'),
  'tasviriy-sanat': S('tasviriy-sanat', 'Tasviriy sanʼat', 'Изобразительное искусство', 'Visual arts', 'art', '#E14B4B'),
  musiqa: S('musiqa', 'Musiqa', 'Музыка', 'Music', 'music', '#5A2D82'),
  texnologiya: S('texnologiya', 'Texnologiya', 'Технология', 'Technology', 'tech', '#1E3A5F'),
  'ingliz-tili': S('ingliz-tili', 'Ingliz tili', 'Английский язык', 'English', 'english', '#1FA7E0'),
  informatika: S('informatika', 'Informatika va axborot texnologiyalari', 'Информатика и ИТ', 'Informatics & IT', 'info', '#12A6A0'),
  'ona-tili': S('ona-tili', 'Ona tili', 'Родной язык', 'Native language', 'lang', '#1FA7E0'),
  adabiyot: S('adabiyot', 'Adabiyot', 'Литература', 'Literature', 'lit', '#C2298A'),
  'ozbek-tili': S('ozbek-tili', 'Oʻzbek tili', 'Узбекский язык', 'Uzbek language', 'lang', '#C2298A'),
  'qoraqalpoq-tili': S('qoraqalpoq-tili', 'Qoraqalpoq tili', 'Каракалпакский язык', 'Karakalpak language', 'lang', '#1E3A5F'),
  'rus-tili': S('rus-tili', 'Rus tili', 'Русский язык', 'Russian', 'rus', '#E14B4B'),
  'ozbekiston-tarixi': S('ozbekiston-tarixi', 'Oʻzbekiston tarixi', 'История Узбекистана', 'History of Uzbekistan', 'uzhist', '#8DC63F'),
  'jahon-tarixi': S('jahon-tarixi', 'Jahon tarixi', 'Всемирная история', 'World history', 'worldhist', '#F39A1F'),
  tarix: S('tarix', 'Tarix (Oʻzbekiston va Jahon tarixi)', 'История (Узбекистан и мир)', 'History (Uzbekistan & world)', 'uzhist', '#8DC63F'),
  algebra: S('algebra', 'Algebra', 'Алгебра', 'Algebra', 'algebra', '#F39A1F'),
  geometriya: S('geometriya', 'Geometriya', 'Геометрия', 'Geometry', 'geometry', '#1FA7E0'),
  fizika: S('fizika', 'Fizika', 'Физика', 'Physics', 'physics', '#5A2D82'),
  kimyo: S('kimyo', 'Kimyo', 'Химия', 'Chemistry', 'chem', '#8DC63F'),
  biologiya: S('biologiya', 'Biologiya', 'Биология', 'Biology', 'bio', '#8DC63F'),
  geografiya: S('geografiya', 'Geografiya', 'География', 'Geography', 'geo', '#1FA7E0'),
  iqtisodiyot: S('iqtisodiyot', 'Iqtisodiyot asoslari', 'Основы экономики', 'Basics of economics', 'econ', '#F39A1F'),
  chizmachilik: S('chizmachilik', 'Chizmachilik', 'Черчение', 'Technical drawing', 'draft', '#1E3A5F'),
  'ona-tili-adabiyot': S('ona-tili-adabiyot', 'Ona tili va adabiyot', 'Родной язык и литература', 'Native language & literature', 'langlit', '#C2298A'),
  'algebra-analiz': S('algebra-analiz', 'Algebra va analiz asoslari', 'Алгебра и начала анализа', 'Algebra & basic calculus', 'calculus', '#F39A1F'),
  'davlat-huquq': S('davlat-huquq', 'Davlat va huquq asoslari', 'Основы государства и права', 'State & law basics', 'law', '#1E3A5F'),
  tadbirkorlik: S('tadbirkorlik', 'Tadbirkorlik va biznes', 'Предпринимательство и бизнес', 'Entrepreneurship & business', 'biz', '#8DC63F'),
  chbt: S('chbt', 'ChBT / Tarbiya', 'НВП / Воспитание', 'Pre-conscription training', 'chbt', '#C2298A'),
  astronomiya: S('astronomiya', 'Astronomiya', 'Астрономия', 'Astronomy', 'astro', '#5A2D82')
};

const G = (grade: number, tier: GradeDef['tier'], keys: string[]): GradeDef => ({
  grade,
  tier,
  subjects: keys.map((k) => SUBJECTS[k])
});

/** Grade → subject map, order preserved exactly per SRS §7.1. */
export const GRADES: GradeDef[] = [
  G(1, 1, ['alifbe', 'ona-tili-savod', 'oqish-savodxonligi', 'matematika', 'fikrlash', 'tabiiy-fanlar', 'informatika', 'tarbiya', 'tasviriy-sanat', 'texnologiya', 'ingliz-tili']),
  G(2, 1, ['ona-tili-savod', 'matematika', 'tabiiy-fanlar', 'tarbiya', 'tasviriy-sanat', 'musiqa', 'texnologiya', 'ingliz-tili']),
  G(3, 2, ['ona-tili-savod', 'matematika', 'tabiiy-fanlar', 'informatika', 'tarbiya', 'tasviriy-sanat', 'musiqa', 'texnologiya', 'ingliz-tili']),
  G(4, 2, ['ona-tili-savod', 'matematika', 'tabiiy-fanlar', 'informatika', 'tarbiya', 'tasviriy-sanat', 'musiqa', 'texnologiya', 'ingliz-tili']),
  G(5, 3, ['ona-tili', 'adabiyot', 'rus-tili', 'matematika', 'tabiiy-fanlar', 'informatika', 'ozbekiston-tarixi', 'tarbiya', 'tasviriy-sanat', 'musiqa', 'texnologiya', 'ingliz-tili']),
  G(6, 3, ['ona-tili', 'adabiyot', 'rus-tili', 'matematika', 'biologiya', 'geografiya', 'tarix', 'informatika', 'tarbiya', 'tasviriy-sanat', 'musiqa', 'texnologiya', 'ingliz-tili']),
  G(7, 4, ['ona-tili', 'adabiyot', 'rus-tili', 'algebra', 'geometriya', 'fizika', 'kimyo', 'biologiya', 'geografiya', 'ozbekiston-tarixi', 'jahon-tarixi', 'informatika', 'tarbiya', 'tasviriy-sanat', 'musiqa', 'texnologiya', 'ingliz-tili']),
  G(8, 4, ['ona-tili', 'adabiyot', 'rus-tili', 'algebra', 'geometriya', 'fizika', 'kimyo', 'biologiya', 'geografiya', 'ozbekiston-tarixi', 'jahon-tarixi', 'iqtisodiyot', 'informatika', 'tarbiya', 'chizmachilik', 'texnologiya', 'ingliz-tili']),
  G(9, 4, ['ona-tili', 'adabiyot', 'rus-tili', 'algebra', 'geometriya', 'fizika', 'kimyo', 'biologiya', 'geografiya', 'ozbekiston-tarixi', 'jahon-tarixi', 'iqtisodiyot', 'informatika', 'tarbiya', 'chizmachilik', 'ingliz-tili']),
  G(10, 5, ['ona-tili-adabiyot', 'rus-tili', 'algebra-analiz', 'geometriya', 'fizika', 'kimyo', 'biologiya', 'geografiya', 'ozbekiston-tarixi', 'jahon-tarixi', 'davlat-huquq', 'tadbirkorlik', 'informatika', 'chbt', 'ingliz-tili']),
  // Grade 11 = diagnostic-test track (see src/content/g11/subjects.ts).
  G(11, 5, ['biologiya', 'kimyo', 'matematika', 'fizika', 'geografiya', 'ozbek-tili', 'rus-tili', 'qoraqalpoq-tili', 'tarix'])
];

export function getGrade(n: number): GradeDef | undefined {
  return GRADES.find((g) => g.grade === n);
}

export function getSubject(gradeNum: number, subjectKey: string): SubjectDef | undefined {
  return getGrade(gradeNum)?.subjects.find((s) => s.key === subjectKey);
}

/** Interactive subjects in v1.0: grade-1 Matematika, Ona tili, Fikrlash, Oʻqish, Tabiiy fanlar. */
export function isUnlockedSubject(gradeNum: number, subjectKey: string): boolean {
  if (gradeNum === 11) return !!getG11Subject(subjectKey);
  return (
    gradeNum === 1 &&
    (subjectKey === 'matematika' ||
      subjectKey === 'ona-tili-savod' ||
      subjectKey === 'fikrlash' ||
      subjectKey === 'oqish-savodxonligi' ||
      subjectKey === 'tabiiy-fanlar' ||
      subjectKey === 'alifbe' ||
      subjectKey === 'informatika' ||
      subjectKey === 'tarbiya' ||
      subjectKey === 'tasviriy-sanat' ||
      subjectKey === 'texnologiya' ||
      subjectKey === 'ingliz-tili')
  );
}

/** Route to the built subject view for an unlocked subject (else null). */
export function unlockedSubjectHref(gradeNum: number, subjectKey: string): string | null {
  if (gradeNum === 11) return getG11Subject(subjectKey) ? g11SubjectHref(subjectKey) : null;
  if (gradeNum === 1 && subjectKey === 'alifbe') return '/dashboard/g1-alifbe';
  if (gradeNum === 1 && subjectKey === 'informatika') return '/dashboard/g1-informatika';
  if (gradeNum === 1 && subjectKey === 'tarbiya') return '/dashboard/g1-tarbiya';
  if (gradeNum === 1 && subjectKey === 'tasviriy-sanat') return '/dashboard/g1-art';
  if (gradeNum === 1 && subjectKey === 'texnologiya') return '/dashboard/g1-tex';
  if (gradeNum === 1 && subjectKey === 'matematika') return '/dashboard/g1-math';
  if (gradeNum === 1 && subjectKey === 'ona-tili-savod') return '/dashboard/g1-ona';
  if (gradeNum === 1 && subjectKey === 'fikrlash') return '/dashboard/g1-fikr';
  if (gradeNum === 1 && subjectKey === 'oqish-savodxonligi') return '/dashboard/g1-oqish';
  if (gradeNum === 1 && subjectKey === 'tabiiy-fanlar') return '/dashboard/g1-tabiiy';
  if (gradeNum === 1 && subjectKey === 'ingliz-tili') return '/dashboard/g1-ingliz';
  return null;
}

/** progress subject key, e.g. `g1-math` for grade-1 Matematika. */
export function progressSubjectKey(gradeNum: number, subjectKey: string): string {
  if (gradeNum === 1 && subjectKey === 'alifbe') return 'g1-alifbe';
  if (gradeNum === 1 && subjectKey === 'informatika') return 'g1-informatika';
  if (gradeNum === 1 && subjectKey === 'tarbiya') return 'g1-tarbiya';
  if (gradeNum === 1 && subjectKey === 'tasviriy-sanat') return 'g1-art';
  if (gradeNum === 1 && subjectKey === 'texnologiya') return 'g1-tex';
  if (gradeNum === 1 && subjectKey === 'matematika') return 'g1-math';
  if (gradeNum === 1 && subjectKey === 'ona-tili-savod') return 'g1-ona';
  if (gradeNum === 1 && subjectKey === 'fikrlash') return 'g1-fikr';
  if (gradeNum === 1 && subjectKey === 'oqish-savodxonligi') return 'g1-oqish';
  if (gradeNum === 1 && subjectKey === 'tabiiy-fanlar') return 'g1-tabiiy';
  if (gradeNum === 1 && subjectKey === 'ingliz-tili') return 'g1-ingliz';
  return `g${gradeNum}-${subjectKey}`;
}
