// Preview gallery — renders every component in the registry, one section each.
// Visit http://localhost:3000/demo after `npm run dev`. Safe to delete later.
import { WIDGETS, WIDGET_LABELS } from "@/components/learning/registry";

export default function DemoPage() {
  const entries = Object.entries(WIDGETS);
  return (
    <main
      style={{
        maxWidth: 760,
        margin: "0 auto",
        padding: "32px 16px 80px",
        display: "grid",
        gap: 36,
        fontFamily: "'Fredoka', ui-rounded, 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <header>
        <h1 style={{ fontSize: 30, fontWeight: 700, margin: 0 }}>Interaktiv komponentlar</h1>
        <p style={{ color: "#9aa0a6", marginTop: 6 }}>
          {entries.length} ta komponent — har biri o'z misolini o'zi yaratadi.
        </p>
      </header>

      {entries.map(([key, Widget]) => (
        <section key={key}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#9aa0a6", margin: "0 0 12px" }}>
            {WIDGET_LABELS[key] || key}
          </h2>
          <Widget />
        </section>
      ))}
    </main>
  );
}
