import 'server-only';
import { sendTelegramMessage, botToken } from './telegram';

/**
 * Owner-facing Telegram alerts, sent through the existing bot.
 *
 * Deliberately quiet: receipts are approved automatically and reconciled in
 * bulk once a month, so a ping per payment would be noise that trains you to
 * ignore the channel. Only genuinely actionable events are pushed — a blocked
 * duplicate, or a receipt that scraped through with a low score — plus one
 * daily summary.
 */

export function adminChatId(): string | null {
  return process.env.ADMIN_TELEGRAM_ID || null;
}

/** Escapes text for Telegram's HTML parse mode. */
export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function notify(text: string): Promise<boolean> {
  const chat = adminChatId();
  if (!chat || !botToken()) return false;
  return sendTelegramMessage(chat, text);
}

export async function alertFlaggedReceipt(p: {
  publicId: string;
  name: string | null;
  score: number;
  reasons: string[];
  cardTarget: string;
}): Promise<void> {
  await notify(
    [
      '⚠️ <b>Shubhali chek</b>',
      `Foydalanuvchi: <code>${esc(p.publicId)}</code>${p.name ? ` — ${esc(p.name)}` : ''}`,
      `Karta: ${esc(p.cardTarget)}`,
      `Ball: <b>${p.score}</b>/100`,
      `Sabab: ${esc(p.reasons.slice(0, 6).join(', '))}`,
      '',
      'Obuna ochildi. Admin panelda koʻrib chiqing.'
    ].join('\n')
  );
}

export async function alertDuplicateReceipt(p: {
  publicId: string;
  name: string | null;
}): Promise<void> {
  await notify(
    [
      '🚫 <b>Takroriy chek rad etildi</b>',
      `Foydalanuvchi: <code>${esc(p.publicId)}</code>${p.name ? ` — ${esc(p.name)}` : ''}`,
      'Bu chek avval yuborilgan (boshqa foydalanuvchi tomonidan boʻlishi mumkin).'
    ].join('\n')
  );
}

export type DailyDigest = {
  date: string;
  payments: number;
  humoCount: number;
  humoSum: number;
  visaCount: number;
  visaSum: number;
  flagged: number;
  duplicatesBlocked: number;
  newUsers: number;
};

export async function sendDailyDigest(d: DailyDigest): Promise<boolean> {
  const fmt = (n: number) => n.toLocaleString('ru-RU').replace(/,/g, ' ');
  return notify(
    [
      `📊 <b>QuvnoqTest — ${esc(d.date)}</b>`,
      '',
      `Toʻlovlar: <b>${d.payments}</b>`,
      `Humo:  ${d.humoCount} × → <b>${fmt(d.humoSum)}</b> soʻm`,
      `Visa:  ${d.visaCount} × → <b>${fmt(d.visaSum)}</b> soʻm`,
      `Jami:  <b>${fmt(d.humoSum + d.visaSum)}</b> soʻm`,
      '',
      `Yangi foydalanuvchilar: ${d.newUsers}`,
      d.flagged ? `⚠️ Shubhali: ${d.flagged}` : '',
      d.duplicatesBlocked ? `🚫 Takroriy rad etildi: ${d.duplicatesBlocked}` : '',
      '',
      'Kartalardagi summa bilan solishtiring.'
    ]
      .filter(Boolean)
      .join('\n')
  );
}
