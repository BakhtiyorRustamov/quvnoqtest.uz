import 'server-only';

export function mailerConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

export async function sendMagicLinkEmail(to: string, link: string): Promise<boolean> {
  if (!mailerConfigured()) return false;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.MAGIC_LINK_FROM || 'QuvnoqTest <onboarding@resend.dev>',
      to: [to],
      subject: 'QuvnoqTest — kirish havolasi / ссылка для входа / login link',
      html: `<div style="font-family:sans-serif;font-size:16px;color:#1E3A5F">
        <p>Salom! 👋</p>
        <p><a href="${link}" style="background:#F39A1F;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:bold">QuvnoqTest hisobiga kirish</a></p>
        <p style="color:#888;font-size:13px">Havola 30 daqiqa amal qiladi. · Ссылка действует 30 минут. · The link is valid for 30 minutes.</p>
      </div>`
    })
  });
  if (!res.ok) {
    console.error('[mailer] resend failed', res.status, await res.text().catch(() => ''));
    return false;
  }
  return true;
}
