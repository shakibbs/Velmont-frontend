import { createFileRoute } from "@tanstack/react-router";

import { PageShell, PageHeader } from "@/components/page-shell";

export const Route = createFileRoute("/size-guide")({
  head: () => ({
    meta: [
      { title: "Size Guide — Velmont Fit & Measurements" },
      {
        name: "description",
        content:
          "Velmont size chart in centimetres: chest, length and sleeve for S to XL, plus how our boxy technical fit runs.",
      },
      { property: "og:title", content: "Velmont Size Guide" },
      {
        property: "og:description",
        content: "Chest, length and sleeve measurements for every Velmont size.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SizeGuidePage,
});

const ROWS = [
  { size: "S", chest: 108, length: 68, sleeve: 60, fits: "36–38 in" },
  { size: "M", chest: 114, length: 70, sleeve: 62, fits: "39–41 in" },
  { size: "L", chest: 120, length: 72, sleeve: 64, fits: "42–44 in" },
  { size: "XL", chest: 126, length: 74, sleeve: 66, fits: "45–47 in" },
];

function SizeGuidePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Fit"
        title={
          <>
            Size <span className="font-normal">guide</span>
          </>
        }
        blurb="Every Velmont piece is cut boxy with dropped shoulders. If you're between sizes and want a closer fit, size down; for a full layered look, stay true to size."
      />

      <div className="mt-10 overflow-hidden rounded-2xl border border-ink/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-ink text-primary-foreground">
            <tr className="text-[10px] uppercase tracking-[0.16em]">
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Chest (cm)</th>
              <th className="px-4 py-3">Length (cm)</th>
              <th className="px-4 py-3">Sleeve (cm)</th>
              <th className="px-4 py-3">Fits chest</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.size} className="border-t border-ink/10">
                <td className="px-4 py-3 font-semibold">{r.size}</td>
                <td className="px-4 py-3 text-ink-soft">{r.chest}</td>
                <td className="px-4 py-3 text-ink-soft">{r.length}</td>
                <td className="px-4 py-3 text-ink-soft">{r.sleeve}</td>
                <td className="px-4 py-3 text-ink-soft">{r.fits}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {[
          { t: "Chest", d: "Measure flat, armpit to armpit, and double it." },
          { t: "Length", d: "From the highest shoulder point down to the hem." },
          { t: "Sleeve", d: "From the centre back neck to the cuff edge." },
        ].map((c) => (
          <div key={c.t} className="rounded-2xl bg-ink/5 p-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-ink-soft">{c.t}</p>
            <p className="mt-2 text-sm">{c.d}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
