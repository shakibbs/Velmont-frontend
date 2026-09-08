import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus, Check } from "lucide-react";
import { toast } from "sonner";

import { SIZES, money, useShop, type Product } from "@/lib/shop";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, settings } = useShop();
  const [size, setSize] = useState(SIZES[1]!);
  const [added, setAdded] = useState(false);

  const add = () => {
    addToCart(product.id, size);
    setAdded(true);
    toast.success(`${product.name} (${size}) added to cart`);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-ink shadow-[var(--shadow-card)]">
      <Link to="/product/$id" params={{ id: product.id }} aria-label={product.name}>
        <img
          src={product.img}
          alt={product.name}
          width={800}
          height={1000}
          loading="lazy"
          className="aspect-4/5 w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
        />
      </Link>

      <div className="absolute inset-x-3 top-3 flex items-center justify-between">
        <span className="rounded-full bg-shell/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] backdrop-blur">
          {product.tag}
        </span>
        {product.stock <= 10 && (
          <span className="rounded-full bg-ink/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-primary-foreground">
            Low stock
          </span>
        )}
      </div>

      <div className="absolute inset-x-3 bottom-3 rounded-xl bg-shell/92 p-3 backdrop-blur">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-[11px] font-semibold">{product.name}</p>
            <p className="text-[10px] text-ink-soft">{money(product.price, settings.currency)}</p>
          </div>
          <button
            onClick={add}
            aria-label={`Add ${product.name} to cart`}
            className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-primary-foreground transition-transform hover:scale-110"
          >
            {added ? <Check className="size-4" /> : <Plus className="size-4" />}
          </button>
        </div>
        <div className="mt-2 flex gap-1">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`flex-1 rounded-md py-1 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors ${
                size === s ? "bg-ink text-primary-foreground" : "bg-ink/8 hover:bg-ink/15"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
}
