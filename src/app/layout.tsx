import type { Metadata, Viewport } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Analytics } from '@vercel/analytics/next';
import { UserProvider } from '@/components/providers/UserProvider';
import { SoundProvider } from '@/components/providers/SoundProvider';
import NoticeBanner from '@/components/ui/NoticeBanner';
import TelegramBridge from '@/components/providers/TelegramBridge';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

/**
 * Runs before paint: detects the Telegram Mini App (launch params in the URL
 * hash, or remembered for this tab), marks <html class="tg"> and only then
 * loads Telegram's SDK — regular web visitors never download it.
 */
const TG_DETECT = `(function(){try{var d=document.documentElement,ss=null;try{ss=window.sessionStorage}catch(e){}
var inTg=/tgWebApp(Data|Platform|Version)=/.test(location.hash||'')||!!(ss&&ss.getItem('qt_tg')==='1')||!!window.TelegramWebviewProxy;
if(!inTg)return;d.classList.add('tg');try{ss&&ss.setItem('qt_tg','1')}catch(e){}
if(!(window.Telegram&&window.Telegram.WebApp)){var s=document.createElement('script');s.src='https://telegram.org/js/telegram-web-app.js';document.head.appendChild(s)}}catch(e){}})();`;

export const metadata: Metadata = {
  title: 'QuvnoqTest.uz — Quvnoq darslar!',
  description:
    "O'zbekiston maktab o'quvchilari uchun qiziqarli test-darslar. 1–11-sinf, o'yin orqali o'rganamiz!"
};

export const viewport: Viewport = {
  themeColor: '#f39a1f',
  width: 'device-width',
  initialScale: 1
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: TG_DETECT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Nunito: rounded, kid-friendly, full Latin-ext + Cyrillic (oʻ gʻ render correctly) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-round" suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <UserProvider>
            <SoundProvider>
              <TelegramBridge />
              <NoticeBanner />
              {children}
            </SoundProvider>
          </UserProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
