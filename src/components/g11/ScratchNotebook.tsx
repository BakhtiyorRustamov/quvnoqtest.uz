/** Ruled scratch notebook (spiral + margin doodle) — students draw on it with the page pen (QuestionSketchpad). */
export default function ScratchNotebook() {
  return (
      <section className="mt-8">
        <div className="relative rounded-2xl border border-ink/10 shadow-card overflow-hidden">
          <div
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-9 z-10"
            style={{
              background:
                'radial-gradient(circle at 14px 17px, #fff 0 4px, #8E9AA6 4px 6.5px, transparent 6.5px), linear-gradient(#EDF1F4,#EDF1F4)',
              backgroundSize: '100% 34px, 100% 100%'
            }}
          />
          <div className="notebook relative pl-[56px] pr-4 pt-[6px] min-h-[min(60vh,520px)]">
            {/* doodle sits in the margin strip between the spiral and the red line */}
            <PencilDoodle />
          </div>
        </div>
      </section>
  );
}

/* Vertical zigzag + pencil in the notebook margin (between spiral and red line). */
function PencilDoodle() {
  return (
    <svg
      viewBox="0 0 20 240"
      className="pointer-events-none absolute left-[37px] top-6 h-[240px] w-[18px] select-none opacity-60"
      aria-hidden
    >
      <path
        d="M10 4 L16 12 L4 22 L16 32 L4 42 L16 52 L4 62 L16 72 L4 82 L16 92 L4 102 L16 112 L10 120"
        fill="none"
        stroke="#8B7FD6"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* pencil, tip up, touching the end of the line */}
      <polygon points="10,122 5,136 15,136" fill="#E9C59A" />
      <polygon points="10,122 8.2,127 11.8,127" fill="#2E2A4F" />
      <rect x="5" y="136" width="10" height="92" rx="1.5" fill="#3E3A78" />
      <rect x="5" y="136" width="3.4" height="92" rx="1.5" fill="#5A55A0" />
      <rect x="5" y="224" width="10" height="10" rx="1.5" fill="#2E2A5A" />
    </svg>
  );
}
