import { createFileRoute, Link } from "@tanstack/react-router";

import lookbook from "@/assets/lookbook.jpg";
import { PageShell, PageHeader } from "@/components/page-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Velmont — Monochrome Technical Streetwear" },
      {
        name: "description",
        content:
          "Velmont builds monochrome technical streetwear in small runs: engineered fabrics, boxy cuts and pieces made to move with you.",
      },
      { property: "og:title", content: "About Velmont" },
      {
        property: "og:description",
        content: "Small-run monochrome technical streetwear engineered for movement.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const STATS = [
  { k: "2021", v: "Founded in Dhaka" },
  { k: "12", v: "Pieces per season" },
  { k: "100%", v: "Monochrome palette" },
  { k: "14 days", v: "No-question returns" },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Our story"
        title={
          <>
            Built for <span className="font-normal">movement</span>, not moodboards
          </>
        }
        blurb="Velmont started with one frustration: technical clothing that looked like gym kit, and streetwear that fell apart in the cold. We make the overlap — heavyweight monochrome layers cut for real movement and worn every day."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div className="space-y-6 text-sm leading-relaxed text-ink-soft">
          <p>
            Every drop is designed around a small set of fabrics we know well: brushed heavy fleece,
            recycled ripstop and a dry-touch technical knit. We prototype in-house, wear-test through
            a full season, and only then commit to a production run.
          </p>
          <p>
            Runs are intentionally small. When a piece sells out we would rather re-open it next
            season with better construction than flood the rail with colourways nobody asked for.
          </p>
          <p>
            Everything ships from our own studio, packed in recycled mailers, with a printed size
            card so you can size confidently the next time.
          </p>
          <Link
            to="/collection"
            className="inline-block rounded-full bg-ink px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Shop the collection
          </Link>
        </div>

        <img
          src={lookbook}
          alt="Velmont studio lookbook shot"
          loading="lazy"
          className="w-full rounded-3xl object-cover shadow-[var(--shadow-card)] grayscale"
        />
      </div>

      <dl className="mt-16 grid gap-6 border-t border-ink/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.k}>
            <dt className="display-xl text-4xl">{s.k}</dt>
            <dd className="mt-1 text-xs uppercase tracking-[0.16em] text-ink-soft">{s.v}</dd>
          </div>
        ))}
      </dl>
    </PageShell>
  );
}
