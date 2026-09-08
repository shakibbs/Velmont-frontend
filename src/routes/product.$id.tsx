import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ShieldCheck, Truck, Undo2 } from "lucide-react";
import { toast } from "sonner";

import { PageShell } from "@/components/page-shell";
import { ProductCard } from "@/components/product-card";
import { SIZES, money, useShop } from "@/lib/shop";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }: { params: { id: string } }) => ({
    meta: [
      { title: `Product ${params.id} — Velmont` },
      {
        name: "description",
        content: "Technical streetwear piece from the Velmont seasonal range. Sizes S–XL.",
      },
      { property: "og:title", content: "Velmont product" },
      {
        property: "og:description",
        content: "Technical streetwear engineered for movement. Sizes S–XL.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <PageShell>
      <h1 className="display-xl text-5xl">Piece not found</h1>
      <p className="mt-4 text-sm text-ink-soft">This product is no longer in the rail.</p>
      <Link
        to="/collection"
        className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground"
      >
        Back to collection
      </Link>
    </PageShell>
  ),
});

function ProductPage() {
  const { id } = Route.useParams();
  const { products, settings, addToCart, ready } = useShop();
  const product = products.find((p) => p.id === id);
  const [size, setSize] = useState(SIZES[1]!);
  const [qty, setQty] = useState(1);

  if (!product) {
    if (!ready) return null;
    throw notFound();
  }

  const related = products
    .filter((p) => p.active && p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const add = () => {
    addToCart(product.id, size, qty);
    toast.success(`${product.name} (${size} × ${qty}) added to cart`);
  };

  return (
    <PageShell>
      <Link to="/collection" className="eyebrow inline-flex items-center gap-1.5">
        <ArrowLeft className="size-3.5" /> Back to collection
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-ink shadow-[var(--shadow-card)]">
          <img
            src={product.img}
            alt={product.name}
            width={900}
            height={1125}
            className="aspect-4/5 w-full object-cover grayscale"
          />
        </div>

        <div>
          <p className="eyebrow">
            {product.category} · {product.tag}
          </p>
          <h1 className="display-xl mt-3 text-5xl sm:text-6xl">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold">{money(product.price, settings.currency)}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
            Heavyweight technical construction with a boxy, movement-first cut. Brushed inner face,
            reinforced seams and a matte monochrome finish that holds shape wash after wash.
          </p>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em]">Size</p>
          <div className="mt-2 flex gap-2">
            {SIZES.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`min-w-12 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  size === s ? "bg-ink text-primary-foreground" : "border border-ink/15 hover:bg-ink/5"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 rounded-full border border-ink/15 px-3 py-2">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty((n) => Math.max(1, n - 1))}
                className="text-sm"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-semibold">{qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty((n) => Math.min(product.stock || 99, n + 1))}
                className="text-sm"
              >
                +
              </button>
            </div>
            <button
              onClick={add}
              disabled={product.stock === 0}
              className="rounded-full bg-ink px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground transition-transform hover:scale-[1.03] disabled:opacity-40"
            >
              {product.stock === 0 ? "Sold out" : "Add to cart"}
            </button>
            <Link
              to="/cart"
              className="rounded-full border border-ink/20 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em]"
            >
              View cart
            </Link>
          </div>

          <p className="mt-3 text-xs text-ink-soft">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"} · Ships in 1–2
            business days
          </p>

          <ul className="mt-8 grid gap-3 border-t border-ink/10 pt-6 text-xs text-ink-soft sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Truck className="size-4" /> Free over {money(settings.freeShippingOver, settings.currency)}
            </li>
            <li className="flex items-center gap-2">
              <Undo2 className="size-4" /> 14-day returns
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="size-4" /> Secure checkout
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="display-xl text-3xl sm:text-4xl">You may also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
