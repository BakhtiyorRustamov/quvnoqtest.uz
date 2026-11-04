import type { Metadata } from 'next';
import { G11_SUBJECTS, getG11Subject, g11SubjectHref, g11ExamHref } from '@/content/g11/subjects';
import { g11LessonsFor, getBoardLesson, hasG11Content, g11LessonLabel, type G11Lesson } from '@/content/g11/lessons';

/**
 * Search-engine helpers: site URL, per-subject keyword families (Uzbek Latin,
 * Uzbek Cyrillic, Russian, English and the exam names people actually type),
 * page metadata and JSON-LD.
 */
export const SITE_NAME = 'MoviyDaftar.uz';
export function siteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || '';
  return env && !/localhost|127\.0\.0\.1/.test(env) ? env.replace(/\/$/, '') : 'https://moviydaftar.uz';
}
export const abs = (path: string) => `${siteUrl()}${path.startsWith('/') ? path : `/${path}`}`;

/** Exam / search phrases shared by all senior subjects. */
const EXAM_WORDS = ['milliy sertifikat', 'DTM test', 'abituriyent', 'oliygohga tayyorlov', 'attestatsiya', 'onlayn test', 'bepul darslar', 'video dars', 'online dars'];
/** Cyrillic Uzbek and Russian names + extra topic words per subject. */
const SUBJECT_WORDS: Record<string, { cyr: string; ru: string; topics: string[] }> = {
  matematika: { cyr: 'математика', ru: 'математика', topics: ['algebra', 'geometriya', 'tenglamalar', 'logarifm', 'trigonometriya', 'hosila', 'integral', 'алгебра', 'геометрия'] },
  fizika: { cyr: 'физика', ru: 'физика', topics: ['mexanika', 'elektr', 'magnit maydon', 'optika', 'atom fizikasi', 'masalalar yechish', 'механика', 'электричество'] },
  kimyo: { cyr: 'кимё', ru: 'химия', topics: ['organik kimyo', 'anorganik kimyo', 'kimyoviy reaksiyalar', 'mol', 'masalalar', 'органическая химия'] },
  biologiya: { cyr: 'биология', ru: 'биология', topics: ['genetika', 'sitologiya', 'botanika', 'zoologiya', 'odam anatomiyasi', 'evolyutsiya', 'генетика'] },
  geografiya: { cyr: 'география', ru: 'география', topics: ['Oʻzbekiston geografiyasi', 'jahon iqtisodiy geografiyasi', 'materiklar', 'okeanlar', 'xarita', 'soat mintaqalari', 'экономическая география'] },
  tarix: { cyr: 'тарих', ru: 'история', topics: ['Oʻzbekiston tarixi', 'jahon tarixi', 'Amir Temur', 'Temuriylar', 'история Узбекистана', 'всемирная история'] },
  'ozbek-tili': { cyr: 'она тили ва адабиёт', ru: 'узбекский язык', topics: ['ona tili', 'adabiyot', 'grammatika', 'imlo', 'insho', 'Oʻtkan kunlar', 'Abdulla Qodiriy'] },
  'rus-tili': { cyr: 'рус тили', ru: 'русский язык', topics: ['русский язык 11 класс', 'грамматика', 'орфография', 'литература', 'rus tili grammatikasi'] },
  'ingliz-tili': { cyr: 'инглиз тили', ru: 'английский язык', topics: ['IELTS', 'Multilevel', 'CEFR', 'IELTS mock test', 'Multilevel test', 'speaking', 'writing', 'listening', 'reading', 'английский язык IELTS'] },
  informatika: { cyr: 'информатика', ru: 'информатика', topics: ['axborot texnologiyalari', 'dasturlash', 'Python', 'algoritm', 'Excel', 'информатика и ИТ'] },
  'qoraqalpoq-tili': { cyr: 'қорақалпоқ тили', ru: 'каракалпакский язык', topics: ['qaraqalpaq tili', 'qaraqalpaq ádebiyatı', 'grammatika'] }
};

export function subjectKeywords(slug: string): string[] {
  const s = getG11Subject(slug);
  if (!s) return [];
  const uz = s.name.uz.toLowerCase();
  const w = SUBJECT_WORDS[slug];
  return Array.from(
    new Set([
      `${uz} darslari`,
      `11-sinf ${uz}`,
      `${uz} 11-sinf`,
      `${uz} test`,
      `${uz} testlar`,
      `${uz} milliy sertifikat`,
      `DTM ${uz}`,
      `${uz} online`,
      `${uz} onlayn dars`,
      `${uz} masalalar yechish`,
      ...(w ? [w.cyr, `${w.cyr} 11-синф`, `${w.cyr} тест`, `${w.ru} 11 класс`, `${w.ru} тесты онлайн`, `${w.ru} уроки`, `национальный сертификат ${w.ru}`, ...w.topics] : []),
      `${s.name.en} grade 11 Uzbekistan`
    ])
  );
}

const BASE_KEYWORDS = [
  'MoviyDaftar',
  'moviy daftar',
  'moviydaftar.uz',
  'QuvnoqTest',
  'quvnoq test',
  'kvnoqtest',
  'onlayn darslar',
  'maktab darslari',
  'yuqori sinf',
  '11-sinf',
  'boshlangʻich sinf',
  '1-sinf',
  'milliy sertifikat testlari',
  'DTM testlari 2026',
  'abituriyentlar uchun testlar',
  'SI ustoz',
  'sunʼiy intellekt ustoz',
  'онлайн уроки Узбекистан',
  'тесты национальный сертификат',
  'школьные уроки онлайн',
  'IELTS mock test',
  'Multilevel CEFR test'
];

/** Site-wide defaults (root layout). */
export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: 'MoviyDaftar.uz — onlayn darslar va Milliy sertifikat testlari', template: `%s | ${SITE_NAME}` },
    description:
      'Oʻzbekiston maktab oʻquvchilari uchun bepul onlayn darslar: 1-sinf va 11-sinf fanlari, doskada tushuntirish, Milliy sertifikat (DTM) formatidagi testlar, IELTS va Multilevel mashqlari, SI ustoz.',
    keywords: BASE_KEYWORDS,
    applicationName: SITE_NAME,
    alternates: { canonical: '/' },
    openGraph: { type: 'website', siteName: SITE_NAME, locale: 'uz_UZ', alternateLocale: ['ru_RU', 'en_US'], url: '/' },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    formatDetection: { telephone: false }
  };
}

const lessonTitle = (l: G11Lesson, slug: string) => getBoardLesson(slug, l.n)?.title ?? l.title.uz;
const lessonDesc = (l: G11Lesson, slug: string) => {
  const b = getBoardLesson(slug, l.n);
  const text = b ? [b.summary?.join(' '), b.steps[0]?.say].filter(Boolean).join(' ') : l.body.map((p) => p.text.uz).join(' ');
  return text.replace(/\s+/g, ' ').trim();
};
const clip = (s: string, n = 158) => (s.length <= n ? s : `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}…`);

export function subjectMetadata(slug: string): Metadata {
  const s = getG11Subject(slug);
  if (!s) return {};
  const lessons = g11LessonsFor(slug).filter(hasG11Content);
  const title = `${s.name.uz} — 11-sinf onlayn darslari va Milliy sertifikat testlari`;
  const description = clip(
    `${s.name.uz} (${s.name.ru}) 11-sinf: ${lessons.length} ta dars doskada tushuntirish bilan, mashqlar, Milliy sertifikat (DTM) formatidagi har safar yangilanadigan test. Mavzular: ${lessons.slice(0, 4).map((l) => lessonTitle(l, slug)).join(', ')}.`
  );
  const url = g11SubjectHref(slug);
  return { title, description, keywords: subjectKeywords(slug), alternates: { canonical: url }, openGraph: { title, description, url, type: 'website' } };
}

export function lessonMetadata(slug: string, l: G11Lesson): Metadata {
  const s = getG11Subject(slug);
  if (!s) return {};
  const t = lessonTitle(l, slug);
  const title = `${t} — ${s.name.uz}, 11-sinf, ${g11LessonLabel(l)}-dars`;
  const description = clip(`${s.name.uz} 11-sinf, ${g11LessonLabel(l)}-dars: ${t}. ${lessonDesc(l, slug)}`);
  const url = `/lesson/g11/${slug}/${l.n}`;
  return { title, description, keywords: [t, `${t} ${s.name.uz.toLowerCase()}`, ...subjectKeywords(slug).slice(0, 12)], alternates: { canonical: url }, openGraph: { title, description, url, type: 'article' } };
}

export function examMetadata(slug: string): Metadata {
  const s = getG11Subject(slug);
  if (!s) return {};
  const eng = slug === 'ingliz-tili';
  const title = eng ? 'Ingliz tili: IELTS Academic va Multilevel (CEFR) onlayn mock test' : `${s.name.uz} — Milliy sertifikat (DTM) onlayn test`;
  const description = eng
    ? 'Bepul IELTS Academic va Multilevel (CEFR) mock testlari: Listening, Reading, Writing va Speaking; har urinishda yangi materiallar, SI baholashi.'
    : clip(`${s.name.uz} fanidan Milliy sertifikat formatidagi onlayn test: har safar yangi variant, vaqt hisoblagichi, natija va xatolar tahlili. ${s.name.ru} — тест национального сертификата онлайн.`);
  const url = g11ExamHref(slug);
  return { title, description, keywords: subjectKeywords(slug), alternates: { canonical: url }, openGraph: { title, description, url, type: 'website' } };
}

/* -------------------------------- JSON-LD -------------------------------- */
const ORG = { '@type': 'Organization', name: SITE_NAME, url: siteUrl() };
export function siteJsonLd() {
  return [
    { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, alternateName: ['Moviy Daftar', 'MoviyDaftar', 'QuvnoqTest.uz', 'Quvnoq Test'], url: siteUrl(), inLanguage: ['uz', 'ru', 'en'] },
    { '@context': 'https://schema.org', '@type': 'EducationalOrganization', name: SITE_NAME, url: siteUrl(), areaServed: 'UZ', description: 'Oʻzbekiston maktab oʻquvchilari uchun onlayn darslar va testlar.' }
  ];
}
export function subjectJsonLd(slug: string) {
  const s = getG11Subject(slug);
  if (!s) return null;
  const lessons = g11LessonsFor(slug).filter(hasG11Content);
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${s.name.uz} — 11-sinf`,
    alternateName: [`${s.name.ru} 11 класс`, `${s.name.en} grade 11`],
    description: subjectMetadata(slug).description,
    provider: ORG,
    inLanguage: slug === 'rus-tili' ? 'ru' : slug === 'ingliz-tili' ? 'en' : slug === 'qoraqalpoq-tili' ? 'kaa' : 'uz',
    educationalLevel: '11-sinf',
    isAccessibleForFree: true,
    url: abs(g11SubjectHref(slug)),
    hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'online', courseWorkload: `P${Math.max(1, lessons.length)}H` },
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'UZS', category: 'Free' },
    hasPart: lessons.slice(0, 60).map((l) => ({ '@type': 'LearningResource', name: lessonTitle(l, slug), url: abs(`/lesson/g11/${slug}/${l.n}`) }))
  };
}
export function lessonJsonLd(slug: string, l: G11Lesson) {
  const s = getG11Subject(slug);
  if (!s) return null;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: lessonTitle(l, slug),
      description: clip(lessonDesc(l, slug), 300),
      learningResourceType: 'Lesson',
      educationalLevel: '11-sinf',
      about: s.name.uz,
      isAccessibleForFree: true,
      inLanguage: getBoardLesson(slug, l.n)?.lang ?? 'uz',
      isPartOf: { '@type': 'Course', name: `${s.name.uz} — 11-sinf`, url: abs(g11SubjectHref(slug)) },
      provider: ORG,
      url: abs(`/lesson/g11/${slug}/${l.n}`)
    },
    breadcrumb([
      ['Yuqori sinf', '/dashboard/g11'],
      [s.name.uz, g11SubjectHref(slug)],
      [lessonTitle(l, slug), `/lesson/g11/${slug}/${l.n}`]
    ])
  ];
}
export function examJsonLd(slug: string) {
  const s = getG11Subject(slug);
  if (!s) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: examMetadata(slug).title,
    about: s.name.uz,
    educationalLevel: '11-sinf',
    educationalUse: 'Milliy sertifikat imtihoniga tayyorgarlik',
    isAccessibleForFree: true,
    provider: ORG,
    url: abs(g11ExamHref(slug))
  };
}
export function breadcrumb(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) }))
  };
}

/** All public, indexable URLs (sitemap). */
export function sitemapEntries(): { path: string; priority: number; freq: 'daily' | 'weekly' | 'monthly' }[] {
  const out: { path: string; priority: number; freq: 'daily' | 'weekly' | 'monthly' }[] = [
    { path: '/', priority: 1, freq: 'weekly' },
    { path: '/dashboard/g11', priority: 0.9, freq: 'weekly' },
    { path: '/leaderboard', priority: 0.3, freq: 'daily' }
  ];
  for (const s of G11_SUBJECTS) {
    out.push({ path: g11SubjectHref(s.slug), priority: 0.9, freq: 'weekly' });
    out.push({ path: g11ExamHref(s.slug), priority: 0.8, freq: 'monthly' });
    for (const l of g11LessonsFor(s.slug).filter(hasG11Content)) out.push({ path: `/lesson/g11/${s.slug}/${l.n}`, priority: 0.7, freq: 'monthly' });
  }
  for (const k of ['g1-math', 'g1-ona', 'g1-alifbe', 'g1-oqish', 'g1-fikr', 'g1-tabiiy', 'g1-ingliz', 'g1-informatika', 'g1-tarbiya', 'g1-art', 'g1-tex', 'g10-informatika']) out.push({ path: `/dashboard/${k}`, priority: 0.6, freq: 'monthly' });
  return out;
}

/** <script type="application/ld+json"> payload (escape "<" so it can't close the tag). */
export const ldJson = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, '\\u003c') });
