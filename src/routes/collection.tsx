import { createFileRoute, Link } from "@tanstack/react-router";

import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { useShop } from "@/lib/shop";

type Search = {
  category?: string | undefined;
  sort?: string | undefined;
  q?: string | undefined;
};

export const Route = createFileRoute("/collection")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    sort: typeof search["sort"] === "string" ? search["sort"] : undefined,
    q: typeof search["q"] === "string" ? search["q"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Full Collection — Velmont Technical Streetwear" },
      {
        name: "description",
        content:
          "Browse the full Velmont collection: men's, women's, trending and accessories. Filter, sort, search and add to cart.",
      },
      { property: "og:title", content: "Full Collection — Velmont" },
      {
        property: "og:description",
        content: "Every Velmont piece in one place — men, women, trending and accessories.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CollectionPage,
});

const FILTERS = [
  { label: "All", value: undefined },
  { label: "Men", value: "men" },
  { label: "Women", value: "women" },
  { label: "Trending", value: "trending" },
  { label: "Accessories", value: "accessories" },
] as const;

const SORTS = [
  { label: "Featured", value: undefined },
  { label: "Price ↑", value: "price-asc" },
  { label: "Price ↓", value: "price-desc" },
  { label: "Name", value: "name" },
] as const;

function CollectionPage() {
  const { category, sort, q } = Route.useSearch();
  const { products } = useShop();

  const term = (q ?? "").trim().toLowerCase();
  let items = products.filter(
    (p) =>
      p.active &&
      (!category || p.category === category) &&
      (!term ||
        p.name.toLowerCase().includes(term) ||
        p.tag.toLowerCase().includes(term) ||
        p.category.includes(term)),
  );
  if (sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
  if (sort === "name") items = [...items].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <PageShell>
      <p className="eyebrow">{term ? `Search results for “${q}”` : "Full collection"}</p>
      <h1 className="display-xl mt-3 text-5xl sm:text-7xl">
        Every piece, <span className="font-normal">one</span> rail
      </h1>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <Link
              key={f.label}
              to="/collection"
              search={(prev: any) => ({ ...prev, category: f.value })}
              className={`rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                category === f.value
                  ? "bg-ink text-primary-foreground"
                  : "border border-ink/15 hover:bg-ink/5"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {SORTS.map((s) => (
            <Link
              key={s.label}
              to="/collection"
              search={(prev: any) => ({ ...prev, sort: s.value })}
              className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                sort === s.value ? "bg-ink text-primary-foreground" : "border border-ink/15"
              }`}
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <p className="text-xs text-ink-soft">{items.length} products</p>
        {term ? (
          <Link
            to="/collection"
            search={(prev: any) => ({ ...prev, q: undefined })}
            className="text-xs underline text-ink-soft"
          >
            Clear search
          </Link>
        ) : null}
      </div>

      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-ink/10 p-12 text-center">
          <p className="display-xl text-3xl">Nothing here yet</p>
          <p className="mt-3 text-sm text-ink-soft">
            Try a different filter or search term — the full rail is one click away.
          </p>
          <Link
            to="/collection"
            search={{}}
            className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground"
          >
            View everything
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
