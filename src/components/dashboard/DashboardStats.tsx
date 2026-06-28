'use client';

import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { pick } from '@/lib/i18n-config';
import { progressSubjectKey, type SubjectDef } from '@/content/taxonomy';
import { G1_MATH_TOPICS } from '@/content';
import type { ProgressRow } from '@/lib/store/types';

/* =============================================================================
   Grade dashboard — stats & charts, driven entirely by real /api/progress data.
   Custom lightweight SVG charts; graceful empty states until lessons accrue.
   ============================================================================= */

const DAY_LABELS: Record<string, string[]> = {
  uz: ['Du', 'Se', 'Cho', 'Pa', 'Ju', 'Sha', 'Ya'],
  ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};
const MONTH_LABELS: Record<string, string[]> = {
  uz: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'],
  ru: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};
const pickLabels = (m: Record<string, string[]>, locale: string) => m[locale] ?? m.en;

/** Topics that actually exist for a progress key (only grade-1 math today). */
const topicTotal = (pk: string) => (pk === 'g1-math' ? G1_MATH_TOPICS.length : 0);

function mondayStart(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return x;
}

function useMounted() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return on;
}

function Panel({ title, children, style }: { title: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className="card p-5" style={style}>
      <h3 className="mb-3 text-sm font-black uppercase tracking-wide text-ink/55">{title}</h3>
      {children}
    </div>
  );
}

function Empty({ label, cta, href }: { label: string; cta?: string; href?: string }) {
  return (
    <div className="grid place-items-center gap-2 py-6 text-center">
      <span aria-hidden className="text-3xl opacity-30">📊</span>
      <span className="text-sm font-bold text-ink/45">{label}</span>
      {cta && href && (
        <Link href={href} className="btn-blue mt-1 text-sm">
          {cta}
        </Link>
      )}
    </div>
  );
}

/* ---- progress ring ---- */
function Ring({ percent, learned, total, caption }: { percent: number; learned: number; total: number; caption: string }) {
  const R = 54;
  const C = 2 * Math.PI * R;
  const on = useMounted();
  const offset = C * (1 - (on ? percent : 0) / 100);
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <div className="relative shrink-0">
        <svg viewBox="0 0 140 140" className="h-32 w-32 -rotate-90">
          <circle cx="70" cy="70" r={R} fill="none" stroke="rgba(30,58,95,0.10)" strokeWidth="14" />
          <circle
            cx="70"
            cy="70"
            r={R}
            fill="none"
            stroke="url(#ringg)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.16,1,0.3,1)' }}
          />
          <defs>
            <linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f39a1f" />
              <stop offset="1" stopColor="#1fa7e0" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-3xl font-black text-ink">{percent}%</div>
        </div>
      </div>
      <div>
        <div className="text-4xl font-black text-ink">
          {learned}
          <span className="text-2xl text-ink/40"> / {total}</span>
        </div>
        <div className="mt-1 text-sm font-bold text-ink/55">{caption}</div>
      </div>
    </div>
  );
}

/* ---- weekly bars ---- */
function WeekBars({ data, dayLabels }: { data: number[]; dayLabels: string[] }) {
  const max = Math.max(...data, 1);
  const on = useMounted();
  return (
    <div className="flex items-end justify-between gap-1.5" style={{ height: 132 }}>
      {data.map((v, i) => (
        <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
          {v > 0 && <span className="text-[10px] font-black text-ink/55">{v}</span>}
          <div
            className="w-full rounded-md transition-[height] duration-700 ease-out"
            style={{
              height: on ? `${Math.max((v / max) * 100, v > 0 ? 8 : 3)}%` : '3%',
              background: v > 0 ? 'linear-gradient(180deg,#4cc3f0,#1fa7e0)' : 'rgba(30,58,95,0.08)'
            }}
          />
          <span className="text-[10px] font-bold text-ink/45">{dayLabels[i]}</span>
        </div>
      ))}
    </div>
  );
}

/* ---- yearly monthly trend ---- */
function YearTrend({ data, monthLabels }: { data: number[]; monthLabels: string[] }) {
  const W = 320;
  const H = 96;
  const pad = 8;
  const max = Math.max(...data, 1);
  const n = data.length;
  const x = (i: number) => pad + (i / (n - 1)) * (W - 2 * pad);
  const y = (v: number) => H - pad - (v / max) * (H - 2 * pad - 6);
  const line = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ');
  const area = `${line} L ${x(n - 1).toFixed(1)} ${H - pad} L ${x(0).toFixed(1)} ${H - pad} Z`;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 96 }}>
        <defs>
          <linearGradient id="yg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8dc63f" stopOpacity="0.45" />
            <stop offset="1" stopColor="#8dc63f" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#yg)" />
        <path d={line} fill="none" stroke="#8dc63f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((v, i) => (v > 0 ? <circle key={i} cx={x(i)} cy={y(v)} r="2.8" fill="#6fae2f" /> : null))}
      </svg>
      <div className="mt-1 flex justify-between px-1 text-[9px] font-bold text-ink/40">
        {monthLabels.map((m, i) => (
          <span key={i}>{m[0]}</span>
        ))}
      </div>
    </div>
  );
}

/* ---- subject donut ---- */
function Donut({ slices, centerTop, centerSub }: { slices: { label: string; value: number; color: string }[]; centerTop: string; centerSub: string }) {
  const total = slices.reduce((a, s) => a + s.value, 0) || 1;
  const R = 42;
  const C = 2 * Math.PI * R;
  let acc = 0;
  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0">
        <svg viewBox="0 0 120 120" className="h-28 w-28 -rotate-90">
          <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(30,58,95,0.07)" strokeWidth="16" />
          {slices.map((sl, i) => {
            const frac = sl.value / total;
            const dash = frac * C;
            const seg = (
              <circle
                key={i}
                cx="60"
                cy="60"
                r={R}
                fill="none"
                stroke={sl.color}
                strokeWidth="16"
                strokeLinecap="butt"
                strokeDasharray={`${dash.toFixed(2)} ${(C - dash).toFixed(2)}`}
                strokeDashoffset={(-acc * C).toFixed(2)}
              />
            );
            acc += frac;
            return seg;
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center leading-none">
            <div className="text-2xl font-black text-ink">{centerTop}</div>
            <div className="text-[10px] font-bold text-ink/45">{centerSub}</div>
          </div>
        </div>
      </div>
      <ul className="min-w-0 flex-1 space-y-1.5">
        {slices.map((sl, i) => (
          <li key={i} className="flex items-center gap-2 text-xs">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: sl.color }} />
            <span className="truncate font-bold text-ink/70">{sl.label}</span>
            <span className="ml-auto font-black text-ink">{sl.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DashboardStats({
  progress,
  grade,
  subjects,
  name,
  locale
}: {
  progress: ProgressRow[];
  grade: number;
  subjects: SubjectDef[];
  name: string | null;
  locale: string;
}) {
  const t = useTranslations('dashboard.stats');
  const completed = useMemo(() => progress.filter((p) => p.status === 'completed'), [progress]);

  const subjMeta = useMemo(() => {
    const m: Record<string, { name: string; color: string; total: number }> = {};
    for (const s of subjects) {
      const pk = progressSubjectKey(grade, s.key);
      m[pk] = { name: pick(s.name, locale), color: s.color, total: topicTotal(pk) };
    }
    return m;
  }, [subjects, grade, locale]);

  const totalTopics = Object.values(subjMeta).reduce((a, x) => a + x.total, 0);
  const totalLearned = completed.length;
  const percent = totalTopics ? Math.round((totalLearned / totalTopics) * 100) : 0;

  const week = useMemo(() => new Array(7).fill(0) as number[], []);
  const year = useMemo(() => new Array(12).fill(0) as number[], []);
  const bySubject: Record<string, number> = {};
  {
    const wkStart = mondayStart(new Date());
    const wkEnd = new Date(wkStart);
    wkEnd.setDate(wkEnd.getDate() + 7);
    const yr = new Date().getFullYear();
    for (let i = 0; i < 7; i++) week[i] = 0;
    for (let i = 0; i < 12; i++) year[i] = 0;
    for (const p of completed) {
      if (!p.completedAt) continue;
      const d = new Date(p.completedAt);
      if (d >= wkStart && d < wkEnd) week[(d.getDay() + 6) % 7]++;
      if (d.getFullYear() === yr) year[d.getMonth()]++;
      bySubject[p.subjectKey] = (bySubject[p.subjectKey] ?? 0) + 1;
    }
  }

  const slices = Object.entries(bySubject)
    .map(([pk, value]) => ({ label: subjMeta[pk]?.name ?? pk, value, color: subjMeta[pk]?.color ?? '#1fa7e0' }))
    .sort((a, b) => b.value - a.value);

  // recommendation
  const displayName = name || t('friend');
  let reco: string;
  if (totalLearned === 0) {
    reco = t('recoStart', { name: displayName });
  } else {
    const lag = subjects
      .map((s) => {
        const pk = progressSubjectKey(grade, s.key);
        const total = topicTotal(pk);
        const learned = completed.filter((c) => c.subjectKey === pk).length;
        return { name: pick(s.name, locale), total, ratio: total ? learned / total : 1 };
      })
      .filter((x) => x.total > 0 && x.ratio < 1)
      .sort((a, b) => a.ratio - b.ratio)[0];
    reco = lag ? t('recoLagging', { name: displayName, subject: lag.name }) : t('recoAllGood', { name: displayName });
  }

  const dayLabels = pickLabels(DAY_LABELS, locale);
  const monthLabels = pickLabels(MONTH_LABELS, locale);
  const hasAny = totalLearned > 0;

  return (
    <section className="mx-auto mt-12 max-w-4xl px-3">
      <h2 className="mb-4 text-2xl font-black text-ink sm:text-3xl">{t('title')}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Panel title={t('gradeLessons')}>
            <Ring percent={percent} learned={totalLearned} total={totalTopics} caption={t('lessons')} />
          </Panel>
        </div>

        <Panel title={t('week')}>{hasAny ? <WeekBars data={week} dayLabels={dayLabels} /> : <Empty label={t('empty')} />}</Panel>
        <Panel title={t('year')}>{hasAny ? <YearTrend data={year} monthLabels={monthLabels} /> : <Empty label={t('empty')} />}</Panel>

        <Panel title={t('bySubject')}>
          {slices.length ? (
            <Donut slices={slices} centerTop={String(totalLearned)} centerSub={t('lessons')} />
          ) : (
            <Empty label={t('empty')} cta={t('emptyCta')} href="/lesson/g1-math-01" />
          )}
        </Panel>

        <Panel title={t('recoTitle')} style={{ background: 'linear-gradient(135deg, rgba(243,154,31,0.10), rgba(31,167,224,0.10))' }}>
          <p className="font-bold leading-relaxed text-ink">{reco}</p>
          {totalLearned === 0 && (
            <Link href="/lesson/g1-math-01" className="btn-primary mt-3 text-sm">
              {t('emptyCta')}
            </Link>
          )}
        </Panel>
      </div>
    </section>
  );
}
