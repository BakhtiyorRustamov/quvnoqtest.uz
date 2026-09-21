import type { Metadata, Viewport } from 'next';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { UserProvider } from '@/components/providers/UserProvider';
import { SoundProvider } from '@/components/providers/SoundProvider';
import NoticeBanner from '@/components/ui/NoticeBanner';
import './globals.css';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
              <NoticeBanner />
              {children}
            </SoundProvider>
          </UserProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
