import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { money, useCartDetails, useShop } from "@/lib/shop";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Velmont" },
      { name: "description", content: "Review the pieces in your Velmont bag before checkout." },
      { property: "og:title", content: "Your Bag — Velmont" },
      { property: "og:description", content: "Review your Velmont bag before checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { settings, setQty, removeLine } = useShop();
  const { lines, subtotal, shipping, total } = useCartDetails();

  return (
    <PageShell>
      <div className="mx-auto max-w-5xl">
        <h1 className="display-xl text-5xl sm:text-6xl">Your bag</h1>

            {lines.length === 0 ? (
              <div className="mt-10 rounded-2xl border border-ink/10 p-10 text-center">
                <p className="text-sm text-ink-soft">Your bag is empty.</p>
                <Link
                  to="/collection"
                  className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-foreground"
                >
                  Shop the collection
                </Link>
              </div>
            ) : (
              <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
                <ul className="space-y-4">
                  {lines.map((l) => (
                    <li
                      key={`${l.productId}-${l.size}`}
                      className="flex gap-4 rounded-2xl border border-ink/10 p-3"
                    >
                      <img
                        src={l.product.img}
                        alt={l.product.name}
                        className="size-24 rounded-xl object-cover grayscale"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold">{l.product.name}</p>
                            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                              Size {l.size} · {l.product.category}
                            </p>
                          </div>
                          <p className="text-sm font-semibold">
                            {money(l.product.price * l.qty, settings.currency)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => setQty(l.productId, l.size, l.qty - 1)}
                            className="grid size-7 place-items-center rounded-full border border-ink/15"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-semibold">{l.qty}</span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => setQty(l.productId, l.size, l.qty + 1)}
                            className="grid size-7 place-items-center rounded-full border border-ink/15"
                          >
                            <Plus className="size-3" />
                          </button>
                          <button
                            aria-label="Remove item"
                            onClick={() => removeLine(l.productId, l.size)}
                            className="ml-auto grid size-7 place-items-center rounded-full border border-ink/15 hover:bg-ink hover:text-primary-foreground"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <aside className="h-fit rounded-2xl bg-ink p-6 text-primary-foreground">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">Summary</p>
                  <dl className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-white/60">Subtotal</dt>
                      <dd>{money(subtotal, settings.currency)}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-white/60">Shipping</dt>
                      <dd>{shipping === 0 ? "Free" : money(shipping, settings.currency)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold">
                      <dt>Total</dt>
                      <dd>{money(total, settings.currency)}</dd>
                    </div>
                  </dl>
                  <Link
                    to="/checkout"
                    className="mt-6 block rounded-full bg-primary-foreground py-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
                  >
                    Checkout
                  </Link>
                </aside>
              </div>
        )}
      </div>
    </PageShell>
  );
}
