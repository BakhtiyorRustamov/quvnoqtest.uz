'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import AnimatedLogo from '@/components/landing/AnimatedLogo';
import BackBar from '@/components/ui/BackBar';
import { api } from '@/lib/client';
import { pick } from '@/lib/i18n-config';
import { G1_MATH_TOPICS, getTopic } from '@/content';
import type { ProgressRow } from '@/lib/store/types';

/**
 * Parents' dashboard. Two modes:
 *  • Telegram mini app — validated via /api/telegram/auth; the children list
 *    lives server-side (used for weekly reports & reminders in the bot).
 *  • Plain web — the children list lives in this device's localStorage.
 * A child is added with QT-ID + name; both must match.
 */

const LS_KEY = 'qt_parent_children';

type ChildRef = { publicId: string; name: string };
type Billing = { paidUntil: string | null; isPaid: boolean };
type ChildData = {
  ref: ChildRef;
  state: 'loading' | 'ok' | 'not_found' | 'error';
  grade?: number;
  billing?: Billing;
  progress?: ProgressRow[];
};

const L = {
  title: { uz: 'Ota-onalar sahifasi', ru: 'Страница для родителей', en: 'Parents’ page' },
  lead: {
    uz: 'Farzandingizning oʻqishini shu yerda kuzating. Bola profilidagi QT-ID raqamini va ismini kiriting.',
    ru: 'Следите за учёбой ребёнка здесь. Введите QT-ID из профиля ребёнка и его имя.',
    en: 'Follow your child’s learning here. Enter the QT-ID from the child’s profile and their name.'
  },
  tgHello: {
    uz: 'Telegram orqali kirdingiz. Qoʻshilgan farzandlaringiz botdagi haftalik hisobot va eslatmalarga ulanadi.',
    ru: 'Вы вошли через Telegram. Добавленные дети будут получать недельные отчёты и напоминания в боте.',
    en: 'Signed in via Telegram. Added children are connected to weekly reports and reminders in the bot.'
  },
  addTitle: { uz: 'Farzand qoʻshish', ru: 'Добавить ребёнка', en: 'Add a child' },
  idLabel: { uz: 'Oʻquvchi ID (profil sahifasida)', ru: 'ID ученика (в профиле)', en: 'Student ID (on the profile)' },
  nameLabel: { uz: 'Oʻquvchi ismi', ru: 'Имя ученика', en: 'Student name' },
  namePh: { uz: 'Masalan: Aziza', ru: 'Например: Азиза', en: 'For example: Aziza' },
  add: { uz: 'Qoʻshish', ru: 'Добавить', en: 'Add' },
  checking: { uz: 'Tekshirilmoqda…', ru: 'Проверяем…', en: 'Checking…' },
  notFound: {
    uz: 'Topilmadi: ID va ism mos kelmadi. Bola profilida ism yozilganiga ishonch hosil qiling.',
    ru: 'Не найдено: ID и имя не совпали. Убедитесь, что имя указано в профиле ребёнка.',
    en: 'Not found: the ID and name didn’t match. Make sure the name is set in the child’s profile.'
  },
  already: { uz: 'Bu farzand allaqachon qoʻshilgan.', ru: 'Этот ребёнок уже добавлен.', en: 'This child is already added.' },
  netErr: { uz: 'Xatolik. Keyinroq urinib koʻring.', ru: 'Ошибка. Попробуйте позже.', en: 'Something went wrong. Try again later.' },
  myChildren: { uz: 'Farzandlarim', ru: 'Мои дети', en: 'My children' },
  empty: {
    uz: 'Hozircha farzand qoʻshilmagan. Yuqoridagi shakl orqali qoʻshing.',
    ru: 'Пока никто не добавлен. Добавьте через форму выше.',
    en: 'No children added yet. Use the form above.'
  },
  grade: { uz: '-sinf', ru: ' класс', en: ' grade' },
  lessonsDone: { uz: 'Oʻtilgan darslar', ru: 'Пройдено уроков', en: 'Lessons completed' },
  avgScore: { uz: 'Oʻrtacha ball', ru: 'Средний балл', en: 'Average score' },
  lastActive: { uz: 'Oxirgi faollik', ru: 'Последняя активность', en: 'Last activity' },
  recent: { uz: 'Oxirgi darslar', ru: 'Последние уроки', en: 'Recent lessons' },
  noProgress: {
    uz: 'Hali dars tugatilmagan — birinchi natijalarni shu yerda koʻrasiz.',
    ru: 'Уроки ещё не пройдены — первые результаты появятся здесь.',
    en: 'No lessons finished yet — the first results will show up here.'
  },
  refresh: { uz: 'Yangilash', ru: 'Обновить', en: 'Refresh' },
  remove: { uz: 'Olib tashlash', ru: 'Убрать', en: 'Remove' },
  billing: { uz: 'Toʻlov', ru: 'Оплата', en: 'Billing' },
  premium: { uz: 'Premium', ru: 'Премиум', en: 'Premium' },
  freePlan: { uz: 'Bepul reja', ru: 'Бесплатный план', en: 'Free plan' },
  validUntil: { uz: 'Amal qilish muddati', ru: 'Действует до', en: 'Valid until' },
  daysLeft: (d: number) => ({ uz: `${d} kun qoldi`, ru: `Осталось ${d} дн.`, en: `${d} day(s) left` }),
  expired: { uz: 'Muddati tugagan', ru: 'Срок истёк', en: 'Expired' },
  renew: { uz: 'Obunani uzaytirish', ru: 'Продлить подписку', en: 'Renew subscription' },
  subscribe: { uz: 'Obuna boʻlish', ru: 'Оформить подписку', en: 'Subscribe' },
  never: { uz: '—', ru: '—', en: '—' }
};

function loadRefs(): ChildRef[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr.filter((c) => c?.publicId && c?.name).slice(0, 8) : [];
  } catch {
    return [];
  }
}
function saveRefs(refs: ChildRef[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(refs));
  } catch {
    /* private mode */
  }
}

type ApiChild = {
  child: { publicId: string; name: string | null; grade: number; paidUntil: string | null; isPaid: boolean };
  progress: ProgressRow[];
};

function toData(ref: ChildRef, d: ApiChild): ChildData {
  return {
    ref: { publicId: d.child.publicId, name: d.child.name ?? ref.name },
    state: 'ok',
    grade: d.child.grade,
    billing: { paidUntil: d.child.paidUntil, isPaid: d.child.isPaid },
    progress: d.progress ?? []
  };
}

export default function ParentDashboard() {
  const locale = useLocale();
  const [tgMode, setTgMode] = useState(false);
  const [children, setChildren] = useState<ChildData[]>([]);
  const [pid, setPid] = useState('QT-');
  const [name, setName] = useState('');
  const [formState, setFormState] = useState<'idle' | 'busy' | 'not_found' | 'already' | 'error'>('idle');

  const fetchChild = useCallback(async (ref: ChildRef): Promise<ChildData> => {
    const { ok, status, data } = await api<ApiChild>('/api/parent', { method: 'POST', json: ref });
    if (ok && data?.child) return toData(ref, data);
    return { ref, state: status === 404 ? 'not_found' : 'error' };
  }, []);

  // Boot: Telegram mini app first (validated sign-in + server children),
  // otherwise this device's saved list.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const tg = typeof window !== 'undefined' ? (window as any).Telegram?.WebApp : null;
      if (tg?.initData) {
        try {
          tg.ready?.();
          tg.expand?.();
        } catch {
          /* ignore */
        }
        const auth = await api<{ ok: boolean }>('/api/telegram/auth', { method: 'POST', json: { initData: tg.initData } });
        if (auth.ok) {
          const { data } = await api<{ telegram: boolean; children: ApiChild[] }>('/api/parent');
          if (!cancelled && data?.telegram) {
            setTgMode(true);
            setChildren((data.children ?? []).map((c) => toData({ publicId: c.child.publicId, name: c.child.name ?? '' }, c)));
            return;
          }
        }
      }
      // plain web fallback
      const refs = loadRefs();
      if (cancelled) return;
      setChildren(refs.map((ref) => ({ ref, state: 'loading' })));
      refs.forEach(async (ref) => {
        const d = await fetchChild(ref);
        if (!cancelled) setChildren((cur) => cur.map((c) => (c.ref.publicId === ref.publicId ? d : c)));
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [fetchChild]);

  const addChild = useCallback(async () => {
    const cleanId = pid.trim().toUpperCase();
    const cleanName = name.trim();
    if (!/^QT-\d{4,6}$/.test(cleanId) || cleanName.length < 2 || formState === 'busy') return;
    if (children.some((c) => c.ref.publicId === cleanId)) {
      setFormState('already');
      return;
    }
    setFormState('busy');
    const d = await fetchChild({ publicId: cleanId, name: cleanName });
    if (d.state === 'ok') {
      const next = [...children, d];
      setChildren(next);
      if (!tgMode) saveRefs(next.map((c) => c.ref));
      setPid('QT-');
      setName('');
      setFormState('idle');
    } else {
      setFormState(d.state === 'not_found' ? 'not_found' : 'error');
    }
  }, [pid, name, children, formState, fetchChild, tgMode]);

  const removeChild = useCallback(
    (publicId: string) => {
      if (tgMode) api('/api/parent', { method: 'DELETE', json: { publicId } }).catch(() => {});
      setChildren((cur) => {
        const next = cur.filter((c) => c.ref.publicId !== publicId);
        if (!tgMode) saveRefs(next.map((c) => c.ref));
        return next;
      });
    },
    [tgMode]
  );

  const refreshChild = useCallback(
    async (ref: ChildRef) => {
      setChildren((cur) => cur.map((c) => (c.ref.publicId === ref.publicId ? { ...c, state: 'loading' } : c)));
      const d = await fetchChild(ref);
      setChildren((cur) => cur.map((c) => (c.ref.publicId === ref.publicId ? d : c)));
    },
    [fetchChild]
  );

  const totalTopics = G1_MATH_TOPICS.length;
  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString(locale === 'en' ? 'en-GB' : locale);

  return (
    <main className="min-h-screen pb-16">
      <div className="flex justify-center pt-4">
        <Link href="/" aria-label="QuvnoqTest.uz" className="block w-[140px]">
          <AnimatedLogo />
        </Link>
      </div>
      <BackBar backHref="/dashboard" showLang />

      <div className="max-w-3xl mx-auto px-3">
        <h1 className="font-black text-ink text-[clamp(26px,6vw,40px)] mt-4 text-center">{pick(L.title, locale)}</h1>
        <p className="font-bold text-ink/55 mt-2 text-center max-w-xl mx-auto">
          {pick(tgMode ? L.tgHello : L.lead, locale)}
        </p>

        {/* add-child form */}
        <section className="mt-6 card p-5">
          <h2 className="font-black text-ink text-lg mb-3">{pick(L.addTitle, locale)}</h2>
          <div className="grid sm:grid-cols-[180px_1fr_auto] gap-2.5">
            <label className="block">
              <span className="block text-xs font-extrabold text-ink/50 mb-1">{pick(L.idLabel, locale)}</span>
              <input
                value={pid}
                onChange={(e) => setPid(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && addChild()}
                placeholder="QT-12345"
                inputMode="numeric"
                maxLength={9}
                className="w-full rounded-xl border-2 border-ink/15 px-3 py-2.5 font-extrabold text-ink focus:outline-none focus:border-brand-blue"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-extrabold text-ink/50 mb-1">{pick(L.nameLabel, locale)}</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addChild()}
                placeholder={pick(L.namePh, locale)}
                maxLength={60}
                className="w-full rounded-xl border-2 border-ink/15 px-3 py-2.5 font-extrabold text-ink focus:outline-none focus:border-brand-blue"
              />
            </label>
            <button
              onClick={addChild}
              disabled={formState === 'busy'}
              className="self-end btn-primary px-6 py-2.5 min-h-[46px] disabled:opacity-60"
            >
              {formState === 'busy' ? pick(L.checking, locale) : pick(L.add, locale)}
            </button>
          </div>
          {formState === 'not_found' && <p className="mt-3 text-sm font-bold text-error">{pick(L.notFound, locale)}</p>}
          {formState === 'already' && <p className="mt-3 text-sm font-bold text-ink/60">{pick(L.already, locale)}</p>}
          {formState === 'error' && <p className="mt-3 text-sm font-bold text-error">{pick(L.netErr, locale)}</p>}
        </section>

        {/* children list */}
        <section className="mt-8">
          <h2 className="font-black text-ink/70 text-lg mb-3">{pick(L.myChildren, locale)}</h2>
          {children.length === 0 && <p className="font-bold text-ink/45 card p-5 text-center">{pick(L.empty, locale)}</p>}
          <div className="space-y-4">
            {children.map((c, i) => {
              const done = (c.progress ?? []).filter((p) => p.status === 'completed');
              const avg = done.length ? Math.round((done.reduce((s, p) => s + p.score, 0) / done.length) * 10) / 10 : null;
              const last = done
                .map((p) => p.completedAt)
                .filter(Boolean)
                .sort()
                .pop();
              const pct = Math.round((done.length / Math.max(totalTopics, 1)) * 100);
              const recent = done
                .slice()
                .sort((a, b) => (b.completedAt ?? '').localeCompare(a.completedAt ?? ''))
                .slice(0, 5);
              const paidUntil = c.billing?.paidUntil ?? null;
              const daysLeft = paidUntil ? Math.ceil((new Date(paidUntil).getTime() - Date.now()) / 86_400_000) : null;
              return (
                <motion.div
                  key={c.ref.publicId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="card p-5"
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="w-11 h-11 rounded-full grid place-items-center text-lg font-black text-white bg-brand-blue" aria-hidden>
                      {(c.ref.name || '?').charAt(0).toUpperCase()}
                    </span>
                    <div className="flex-1 leading-tight">
                      <div className="font-black text-ink text-lg">{c.ref.name}</div>
                      <div className="text-[12.5px] font-bold text-ink/45">
                        {c.ref.publicId}
                        {c.grade ? ` · ${c.grade}${pick(L.grade, locale)}` : ''}
                      </div>
                    </div>
                    <button onClick={() => refreshChild(c.ref)} className="btn-ghost text-sm px-3 py-2">
                      {pick(L.refresh, locale)}
                    </button>
                    <button onClick={() => removeChild(c.ref.publicId)} className="btn-ghost text-sm px-3 py-2 text-error">
                      {pick(L.remove, locale)}
                    </button>
                  </div>

                  {c.state === 'loading' && <p className="mt-4 font-bold text-ink/45">{pick(L.checking, locale)}</p>}
                  {(c.state === 'not_found' || c.state === 'error') && (
                    <p className="mt-4 font-bold text-error text-sm">
                      {pick(c.state === 'not_found' ? L.notFound : L.netErr, locale)}
                    </p>
                  )}

                  {c.state === 'ok' && (
                    <>
                      <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
                        <div className="rounded-2xl bg-brand-green/10 border border-brand-green/30 py-3">
                          <div className="font-black text-2xl text-brand-green">
                            {done.length}/{totalTopics}
                          </div>
                          <div className="text-[11px] font-extrabold text-ink/50 uppercase">{pick(L.lessonsDone, locale)}</div>
                        </div>
                        <div className="rounded-2xl bg-brand-orange/10 border border-brand-orange/30 py-3">
                          <div className="font-black text-2xl text-brand-orange">{avg ?? pick(L.never, locale)}</div>
                          <div className="text-[11px] font-extrabold text-ink/50 uppercase">{pick(L.avgScore, locale)}</div>
                        </div>
                        <div className="rounded-2xl bg-brand-blue/10 border border-brand-blue/30 py-3">
                          <div className="font-black text-base text-brand-blue pt-1">
                            {last ? fmtDate(last) : pick(L.never, locale)}
                          </div>
                          <div className="text-[11px] font-extrabold text-ink/50 uppercase mt-1">{pick(L.lastActive, locale)}</div>
                        </div>
                      </div>

                      {/* progress bar */}
                      <div
                        className="mt-3 h-3.5 rounded-full bg-ink/10 overflow-hidden"
                        role="progressbar"
                        aria-valuenow={pct}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div className="h-full rounded-full bg-gradient-to-r from-brand-green to-brand-blue" style={{ width: pct + '%' }} />
                      </div>

                      {/* billing */}
                      <div className="mt-4 rounded-2xl border-2 border-ink/10 bg-white/70 p-3.5">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-xs font-extrabold text-ink/50 uppercase">{pick(L.billing, locale)}</span>
                          {c.billing?.isPaid ? (
                            <span className="px-3 py-1 rounded-full bg-brand-green/15 border border-brand-green/40 text-brand-green text-[12.5px] font-black">
                              {pick(L.premium, locale)}
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-ink/8 border border-ink/20 text-ink/60 text-[12.5px] font-black">
                              {paidUntil ? pick(L.expired, locale) : pick(L.freePlan, locale)}
                            </span>
                          )}
                          {c.billing?.isPaid && paidUntil && (
                            <span className="text-[12.5px] font-bold text-ink/55">
                              {pick(L.validUntil, locale)}: {fmtDate(paidUntil)}
                              {daysLeft !== null && daysLeft >= 0 && (
                                <span className={daysLeft <= 3 ? ' text-error font-black' : ''}> · {pick(L.daysLeft(daysLeft), locale)}</span>
                              )}
                            </span>
                          )}
                          <a
                            href="/upgrade"
                            className="ml-auto text-[13px] font-black text-brand-blue underline underline-offset-2"
                          >
                            {c.billing?.isPaid ? pick(L.renew, locale) : pick(L.subscribe, locale)}
                          </a>
                        </div>
                      </div>

                      {done.length === 0 ? (
                        <p className="mt-3 text-sm font-bold text-ink/45">{pick(L.noProgress, locale)}</p>
                      ) : (
                        <div className="mt-4">
                          <div className="text-xs font-extrabold text-ink/50 uppercase mb-1.5">{pick(L.recent, locale)}</div>
                          <ul className="space-y-1.5">
                            {recent.map((p) => {
                              const topic = getTopic(p.topicKey);
                              return (
                                <li key={p.topicKey} className="flex items-center gap-2 text-[13.5px] font-bold text-ink/75">
                                  <span className="text-brand-green" aria-hidden>✓</span>
                                  <span className="flex-1 truncate">
                                    {topic ? `${topic.n}. ${pick(topic.title, locale)}` : p.topicKey}
                                  </span>
                                  <span className="text-brand-purple">{p.score}/{p.answers?.length || 10}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
