import ParentDashboard from '@/components/parent/ParentDashboard';

export default function ParentPage() {
  return (
    <>
      {/* The Telegram Mini App SDK is loaded app-wide (only inside Telegram) by
          the detector in app/layout.tsx; ParentDashboard waits for it. */}
      <ParentDashboard />
    </>
  );
}
