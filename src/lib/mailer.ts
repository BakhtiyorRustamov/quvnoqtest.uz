import 'server-only';

export function mailerConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

const BRAND = {
  orange: '#f39a1f',
  blue: '#1fa7e0',
  green: '#8dc63f',
  purple: '#5a2d82',
  ink: '#1e3a5f',
  bg: '#fcfcf8'
};

/** Branded, trilingual magic-link email. `link` already carries the token. */
function magicLinkHtml(link: string): string {
  // Site origin for the footer link (derived from the magic link itself).
  let origin = 'https://quvnoqtest.uz';
  try {
    origin = new URL(link).origin;
  } catch {
    /* keep default */
  }

  // The mark is the real QuvnoqTest magnifier drawn as an INLINE SVG (the same
  // vector the app uses in /public/logo-mark.svg) — no PNG, so nothing can 404 or
  // show a broken picture. If a mail client strips inline SVG, the coloured
  // wordmark beside it still carries the brand (never a wrong plain circle).
  const logoMark = `
                  <svg width="42" height="42" viewBox="0 0 124 124" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="QuvnoqTest">
                    <path d="M 62 18 A 44 44 0 0 1 101.88 43.4" stroke="${BRAND.orange}" stroke-width="17" stroke-linecap="round" fill="none"/>
                    <path d="M 104.5 50.61 A 44 44 0 0 1 90.28 95.71" stroke="#C2298A" stroke-width="17" stroke-linecap="round" fill="none"/>
                    <path d="M 84 100.11 A 44 44 0 0 1 36.76 98.04" stroke="${BRAND.purple}" stroke-width="17" stroke-linecap="round" fill="none"/>
                    <path d="M 30.89 93.11 A 44 44 0 0 1 20.65 46.95" stroke="${BRAND.blue}" stroke-width="17" stroke-linecap="round" fill="none"/>
                    <path d="M 23.89 40 A 44 44 0 0 1 54.36 18.67" stroke="${BRAND.green}" stroke-width="17" stroke-linecap="round" fill="none"/>
                    <line x1="88" y1="88" x2="112" y2="112" stroke="${BRAND.orange}" stroke-width="18" stroke-linecap="round"/>
                    <circle cx="62" cy="62" r="13" fill="none" stroke="${BRAND.orange}" stroke-width="9"/>
                  </svg>`;
  const logoHtml = `
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;background:#ffffff;border-radius:20px;box-shadow:0 3px 10px rgba(0,0,0,0.12);"><tr>
            <td style="padding:12px 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0"><tr>
                <td style="vertical-align:middle;font-size:0;line-height:0;width:42px;">${logoMark}</td>
                <td style="vertical-align:middle;padding-left:12px;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:26px;font-weight:800;letter-spacing:.2px;white-space:nowrap;">
                  <span style="color:${BRAND.orange};">Q</span><span style="color:${BRAND.blue};">u</span><span style="color:${BRAND.green};">v</span><span style="color:#C2298A;">n</span><span style="color:${BRAND.purple};">o</span><span style="color:${BRAND.orange};">q</span><span style="color:${BRAND.ink};">Test</span><span style="color:#8a97a8;">.uz</span>
                </td>
              </tr></table>
            </td>
          </tr></table>`;

  return `<!doctype html>
<html lang="uz">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>QuvnoqTest</title></head>
<body style="margin:0;padding:0;background:${BRAND.bg};font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:${BRAND.ink};">
  <span style="display:none;max-height:0;overflow:hidden;opacity:0;">QuvnoqTest hisobingizga kiring · Войдите в аккаунт · Sign in to your account</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bg};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 6px 24px rgba(30,58,95,0.10);">
        <!-- header -->
        <tr><td style="background:linear-gradient(135deg,${BRAND.orange},#ffb347);padding:26px 24px;text-align:center;">
${logoHtml}
        </td></tr>
        <!-- body -->
        <tr><td style="padding:30px 28px 8px;text-align:center;">
          <h1 style="margin:0 0 6px;font-size:22px;font-weight:800;color:${BRAND.ink};">Salom! 👋</h1>
          <p style="margin:0 0 22px;font-size:15px;line-height:1.5;color:#51627a;">
            Hisobingizga kirish uchun quyidagi tugmani bosing.<br>
            Нажмите кнопку ниже, чтобы войти.<br>
            Tap the button below to sign in.
          </p>
          <a href="${link}" style="display:inline-block;background:${BRAND.orange};color:#ffffff;font-size:17px;font-weight:800;text-decoration:none;padding:15px 38px;border-radius:999px;box-shadow:0 4px 0 #c97c12;">
            Kirish · Войти · Sign in
          </a>
          <p style="margin:22px 0 0;font-size:12.5px;line-height:1.5;color:#9aa6b5;">
            Havola 30 daqiqa amal qiladi. · Ссылка действует 30 минут. · Valid for 30 minutes.<br>
            Agar bu siz bo‘lmasangiz, bu xatni e’tiborsiz qoldiring.
          </p>
        </td></tr>
        <!-- divider accent -->
        <tr><td style="padding:18px 28px 0;">
          <table role="presentation" width="100%"><tr>
            <td style="height:4px;background:${BRAND.blue};border-radius:2px;"></td>
            <td style="width:6px;"></td>
            <td style="height:4px;background:${BRAND.green};border-radius:2px;"></td>
            <td style="width:6px;"></td>
            <td style="height:4px;background:${BRAND.purple};border-radius:2px;"></td>
          </tr></table>
        </td></tr>
        <!-- footer -->
        <tr><td style="padding:16px 28px 26px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#9aa6b5;">
            © QuvnoqTest.uz — O‘zbekiston maktab o‘quvchilari uchun qiziqarli test-darslar.<br>
            <a href="${origin}" style="color:${BRAND.blue};text-decoration:none;">quvnoqtest.uz</a>
          </p>
        </td></tr>
      </table>
      <p style="max-width:480px;margin:14px auto 0;font-size:11px;color:#b6c0cc;text-align:center;line-height:1.5;">
        Tugma ishlamasa, bu havolani brauzerga nusxalang / Если кнопка не работает, скопируйте ссылку:<br>
        <a href="${link}" style="color:#b6c0cc;word-break:break-all;">${link}</a>
      </p>
    </td></tr>
  </table>
</body>
</html>`;
}

function magicLinkText(link: string): string {
  return [
    'QuvnoqTest.uz — kirish havolasi',
    '',
    'Hisobingizga kirish uchun havolani oching (30 daqiqa amal qiladi):',
    'Откройте ссылку, чтобы войти (действует 30 минут):',
    'Open this link to sign in (valid for 30 minutes):',
    '',
    link,
    '',
    'Agar bu siz boʻlmasangiz, bu xatni eʼtiborsiz qoldiring.'
  ].join('\n');
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
      from: process.env.MAGIC_LINK_FROM || 'QuvnoqTest <login@quvnoqtest.uz>',
      to: [to],
      subject: 'QuvnoqTest — kirish havolasi / ссылка для входа / login link',
      html: magicLinkHtml(link),
      text: magicLinkText(link)
    })
  });
  if (!res.ok) {
    console.error('[mailer] resend failed', res.status, await res.text().catch(() => ''));
    return false;
  }
  return true;
}
