'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useUser } from '@/components/providers/UserProvider';
import { getGrade, GRADES } from '@/content/taxonomy';
import { pick } from '@/lib/i18n-config';
import { api } from '@/lib/client';
import type { ProgressRow } from '@/lib/store/types';
import BackBar from '@/components/ui/BackBar';
import ScratchNotebook from '@/components/g11/ScratchNotebook';
import QuestionSketchpad from '@/components/g11/QuestionSketchpad';
import MoviyDaftarLogo from '@/components/brand/MoviyDaftarLogo';
import { G11_SUBJECTS, g11ReviewsHref } from '@/content/g11/subjects';
import ContactButton from '@/components/ui/ContactButton';
import DashboardStats from '@/components/dashboard/DashboardStats';
import Leaderboard from '@/components/dashboard/Leaderboard';
import OlympiadSection from '@/components/dashboard/OlympiadSection';

const EMAIL_NOTE = {
  uz: 'Har bir hisob elektron pochta manziliga biriktiriladi. Obuna (pullik) hisobingizga istalgan qurilmadan shu email orqali kirishingiz mumkin.',
  ru: 'Каждый аккаунт привязывается к адресу электронной почты. В платный аккаунт можно войти с любого устройства через этот email.',
  en: 'Every account is linked to an email address. You can sign in to your paid account from any device with this email.'
};

/** Profile page (was the dashboard side drawer): account details, my progress, top students, olympiad, parents, contact. */
export default function ProfilePage() {
  const t = useTranslations('profile');
  const tc = useTranslations('common');
  const locale = useLocale();
  const { user, update, ensureUser } = useUser();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [savedFlash, setSavedFlash] = useState(false);
  const [progress, setProgress] = useState<ProgressRow[]>([]);

  useEffect(() => {
    ensureUser(1);
  }, [ensureUser]);
  useEffect(() => {
    api<{ progress: ProgressRow[] }>('/api/progress').then(({ data }) => setProgress(data?.progress ?? []));
  }, []);
  useEffect(() => {
    setName(user?.name ?? '');
    setPhone(user?.phone ?? '');
    setEmail(user?.email ?? '');
  }, [user?.name, user?.phone, user?.email]);

  async function saveDetails() {
    await update({ name, phone, email });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
  }

  const grade = user?.grade ?? 1;
  const gradeDef = getGrade(grade) ?? GRADES[0];
  const pageRef = useRef<HTMLElement | null>(null);
  const inputCls = 'w-full rounded-xl border-2 border-ink/15 bg-white px-3.5 py-2.5 font-semibold text-ink focus:border-brand-blue outline-none';

  return (
    <main ref={pageRef} className="relative min-h-screen pb-16">
      <BackBar backHref="/dashboard" />
      <div className="mx-auto max-w-md px-4">
        {/* brand on top, then the profile */}
        <div className="flex justify-center pt-1">
          <MoviyDaftarLogo size="lg" />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/moviydaftar-daftar.webp" alt="MoviyDaftar.uz daftari" className="mt-4 w-full rounded-3xl shadow-card" />
        <h1 className="mt-6 text-center text-[clamp(24px,6vw,32px)] font-black text-ink">{t('title')}</h1>
        {/* visible public ID (FR-PRF-1) */}
        <div className="card mt-3 p-4 text-center">
          <div className="text-xs font-extrabold uppercase tracking-wide text-ink/50">{t('idLabel')}</div>
          <div className="mt-1 text-lg font-semibold tracking-wider text-brand-purple">{user?.publicId ?? '…'}</div>
          {user?.email && <div className="mt-1.5 text-sm font-bold text-brand-green">✉️ {user.email}</div>}
          {user?.isPaid && user.paidUntil && <div className="mt-1 text-sm font-bold text-brand-green">✅ {new Date(user.paidUntil).toLocaleDateString()} ⏳</div>}
        </div>

        {/* grade (FR-PRF-2): the two tracks */}
        <label className="mt-5 block">
          <span className="text-sm font-extrabold text-ink/70">{t('gradeLabel')}</span>
          <select value={grade === 11 ? 11 : 1} onChange={(e) => update({ grade: Number(e.target.value) })} className={`${inputCls} mt-1.5`}>
            <option value={1}>{tc('grade', { n: 1 })}</option>
            <option value={11}>{tc('grade', { n: 11 })}</option>
          </select>
        </label>

        {/* optional details (FR-PRF-3) */}
        <label className="mt-4 block">
          <span className="text-sm font-extrabold text-ink/70">{t('nameLabel')}</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className={`${inputCls} mt-1.5`} />
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-extrabold text-ink/70">{t('phoneLabel')}</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" className={`${inputCls} mt-1.5`} placeholder="+998 …" />
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-extrabold text-ink/70">{t('emailLabel')}</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputCls} mt-1.5`} placeholder="aziza@example.uz" />
          <span className="mt-1.5 block rounded-xl bg-brand-blue/[0.07] px-3 py-2 text-[13px] font-bold leading-snug text-ink/70">ⓘ {pick(EMAIL_NOTE, locale)}</span>
        </label>
        <button onClick={saveDetails} className="btn-blue mt-4 w-full">{savedFlash ? tc('saved') : tc('save')}</button>

        <Link href="/signin" className="btn-ghost mt-4 w-full">{t('changeAccount')}</Link>
        <Link href="/upgrade" className="btn-primary mt-4 w-full">{t('upgradeEntry')}</Link>
        <Link href="/?home=1" className="btn-ghost mt-4 w-full">{pick({ uz: 'Bosh sahifa', ru: 'Главная страница', en: 'Home page' }, locale)}</Link>
      </div>

      {/* mock (Milliy sertifikat) test results per subject — moved here from the subject pages */}
      {grade === 11 && (
        <section className="mx-auto mt-8 max-w-md px-4">
          <h2 className="text-center text-lg font-black text-ink">🗓️ {pick({ uz: 'Fanlar boʻyicha namunaviy (mock) test natijalarim', ru: 'Мои результаты пробных (mock) тестов по предметам', en: 'My mock test results by subject' }, locale)}</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {G11_SUBJECTS.map((s) => (
              <Link
                key={s.slug}
                href={g11ReviewsHref(s.slug)}
                className="rounded-2xl border border-ink/10 bg-white px-3 py-2.5 text-center text-[15px] font-black shadow-card transition-transform hover:-translate-y-0.5"
                style={{ color: s.color }}
              >
                {pick(s.name, locale)}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* my progress (all of it), recommendations */}
      <DashboardStats progress={progress} grade={grade} subjects={gradeDef.subjects} name={user?.name ?? null} locale={locale} />
      {/* top students */}
      <Leaderboard />
      {/* olympiad */}
      <OlympiadSection locale={locale} />

      {/* parents' corner */}
      <div className="mx-auto mt-8 flex max-w-4xl justify-center px-3">
        <Link href="/parent" className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-8 py-3.5 text-lg font-black text-white shadow-lg shadow-brand-blue/30 transition-transform hover:-translate-y-0.5">
          {pick({ uz: 'Ota-onalar sahifasi', ru: 'Страница для родителей', en: 'Parents’ page' }, locale)}
        </Link>
      </div>
      {/* MoviyDaftar notebook: notes + the pen works on the whole page */}
      <section className="mx-auto mt-10 max-w-md px-4">
        <p className="mt-3 text-center text-sm font-bold text-ink/60">{pick({ uz: 'Shaxsiy daftaringiz: eslatmalar yozing, qalam bilan sahifaning istalgan joyiga chizing.', ru: 'Ваша тетрадь: пишите заметки и рисуйте ручкой в любом месте страницы.', en: 'Your notebook: write notes and draw with the pen anywhere on the page.' }, locale)}</p>
        <ScratchNotebook />
      </section>
      <QuestionSketchpad containerRef={pageRef} pageKey="profile" locale={locale} />

      {/* support contact */}
      <div className="mx-auto mt-4 flex max-w-4xl justify-center px-3">
        <ContactButton />
      </div>
    </main>
  );
}
