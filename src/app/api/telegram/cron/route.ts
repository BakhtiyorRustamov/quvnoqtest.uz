import { NextRequest, NextResponse } from 'next/server';
import { sendTelegramMessage, telegramConfigured } from '@/lib/telegram';
import { parentsConfigured, listAllParentsWithChildren } from '@/lib/parents';
import { isPaid } from '@/lib/store/types';
import { G1_MATH_TOPICS } from '@/content';

/**
 * Daily notification job — runs at 04:00 UTC (= 09:00 Tashkent) via Vercel
 * cron (see vercel.json). One run handles:
 *   • Sunday: weekly progress report for every parent
 *   • Quvnoq Olimpiada reminders at 7 / 3 / 1 days before 1 August
 *   • payment reminders 3 / 1 days before a child's subscription expires
 */

const DAY = 86_400_000;
const OLYMPIAD_AT = Date.UTC(2026, 6, 31, 19, 0, 0); // 1 Aug 2026, 00:00 Tashkent

const M = {
  uz: {
    weekTitle: '📊 <b>Haftalik hisobot — QuvnoqTest</b>',
    child: (n: string, g: number) => `👦 <b>${n}</b> (${g}-sinf)`,
    weekLine: (week: number, total: number, all: number, avg: string) =>
      `Bu hafta: <b>${week}</b> ta dars · Jami: <b>${total}/${all}</b> · Oʻrtacha ball: <b>${avg}</b>`,
    noWeek: 'Bu hafta dars tugatilmadi — birga mashq qilib koʻring!',
    olympiad: (d: number) =>
      `🏆 <b>Quvnoq Olimpiada</b>ga <b>${d} kun</b> qoldi!\n1-avgust kuni barcha fanlar boʻyicha katta bellashuv boshlanadi. Farzandingiz tayyormi?`,
    payment: (n: string, d: number) =>
      `💳 <b>Toʻlov eslatmasi:</b> ${n} uchun obuna muddati <b>${d} kun</b>dan keyin tugaydi. Uzaytirish: quvnoqtest.uz/upgrade`
  },
  ru: {
    weekTitle: '📊 <b>Недельный отчёт — QuvnoqTest</b>',
    child: (n: string, g: number) => `👦 <b>${n}</b> (${g} класс)`,
    weekLine: (week: number, total: number, all: number, avg: string) =>
      `За неделю: <b>${week}</b> уроков · Всего: <b>${total}/${all}</b> · Средний балл: <b>${avg}</b>`,
    noWeek: 'На этой неделе уроки не завершались — позанимайтесь вместе!',
    olympiad: (d: number) =>
      `🏆 До <b>Весёлой Олимпиады</b> осталось <b>${d} дн.</b>!\n1 августа начнётся большое состязание по всем предметам. Ваш ребёнок готов?`,
    payment: (n: string, d: number) =>
      `💳 <b>Напоминание об оплате:</b> подписка для ${n} закончится через <b>${d} дн.</b> Продлить: quvnoqtest.uz/upgrade`
  },
  en: {
    weekTitle: '📊 <b>Weekly report — QuvnoqTest</b>',
    child: (n: string, g: number) => `👦 <b>${n}</b> (grade ${g})`,
    weekLine: (week: number, total: number, all: number, avg: string) =>
      `This week: <b>${week}</b> lessons · Total: <b>${total}/${all}</b> · Average score: <b>${avg}</b>`,
    noWeek: 'No lessons finished this week — practice together!',
    olympiad: (d: number) =>
      `🏆 <b>${d} day(s)</b> left until the <b>Quvnoq Olympiad</b>!\nThe big all-subject competition starts on August 1st. Is your child ready?`,
    payment: (n: string, d: number) =>
      `💳 <b>Payment reminder:</b> the subscription for ${n} expires in <b>${d} day(s)</b>. Renew: quvnoqtest.uz/upgrade`
  }
};

function daysUntil(ts: number, now: number): number {
  return Math.ceil((ts - now) / DAY);
}

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization');
  const qs = req.nextUrl.searchParams.get('secret');
  if (!secret || (auth !== `Bearer ${secret}` && qs !== secret)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  if (!telegramConfigured() || !parentsConfigured()) {
    return NextResponse.json({ error: 'not_configured' }, { status: 501 });
  }

  const now = Date.now();
  const tashkent = new Date(now + 5 * 3_600_000);
  const isSunday = tashkent.getUTCDay() === 0;
  const olympiadDays = daysUntil(OLYMPIAD_AT, now);
  const all = await listAllParentsWithChildren();
  const totalTopics = G1_MATH_TOPICS.length;

  let sent = 0;
  const tasks: string[] = [];

  for (const { parent, children } of all) {
    const t = M[parent.locale as keyof typeof M] ?? M.uz;

    // 1) Olympiad countdown reminders — 7 / 3 / 1 days before, to every parent
    if ([7, 3, 1].includes(olympiadDays)) {
      if (await sendTelegramMessage(parent.telegramId, t.olympiad(olympiadDays))) sent++;
    }

    // 2) payment reminders — 3 / 1 days before a child's paid_until
    for (const { user } of children) {
      if (!user.paidUntil || !isPaid(user)) continue;
      const d = daysUntil(new Date(user.paidUntil).getTime(), now);
      if (d === 3 || d === 1) {
        const n = user.name || user.publicId;
        if (await sendTelegramMessage(parent.telegramId, t.payment(n, d))) sent++;
      }
    }

    // 3) Sunday 09:00 Tashkent — weekly progress report
    if (isSunday && children.length) {
      const lines: string[] = [t.weekTitle, ''];
      for (const { user, progress } of children) {
        const done = progress.filter((p) => p.status === 'completed');
        const week = done.filter((p) => p.completedAt && now - new Date(p.completedAt).getTime() <= 7 * DAY);
        const scored = week.length ? week : done;
        const avg = scored.length
          ? (scored.reduce((s, p) => s + p.score, 0) / scored.length).toFixed(1)
          : '—';
        lines.push(t.child(user.name || user.publicId, user.grade));
        lines.push(week.length || done.length ? t.weekLine(week.length, done.length, totalTopics, avg) : t.noWeek);
        lines.push('');
      }
      if (await sendTelegramMessage(parent.telegramId, lines.join('\n').trim())) sent++;
    }
  }

  if ([7, 3, 1].includes(olympiadDays)) tasks.push(`olympiad_${olympiadDays}d`);
  if (isSunday) tasks.push('weekly_report');
  tasks.push('payment_check');

  return NextResponse.json({ ok: true, parents: all.length, sent, tasks, olympiadDays });
}
