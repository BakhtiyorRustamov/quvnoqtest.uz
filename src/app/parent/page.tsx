import Script from 'next/script';
import ParentDashboard from '@/components/parent/ParentDashboard';

export default function ParentPage() {
  return (
    <>
      {/* Telegram Mini App SDK — provides window.Telegram.WebApp.initData when
          the page is opened from the bot's menu button; harmless elsewhere. */}
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      <ParentDashboard />
    </>
  );
}
